'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, Progress, Textarea, Input } from '@/components/ui/primitives';
import { PORTFOLIO_SECTIONS, KSBS } from '@/lib/data';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileText, Save, Sparkles, CheckCircle, ChevronRight, AlertCircle, Trash2, Plus, PenTool } from 'lucide-react';

interface PortfolioPiece {
    id: number;
    title: string;
    sections: Record<string, string>;
    completedSections: string[];
    lastModified: number;
}

interface PortfolioProps {
    portfolioPieces: PortfolioPiece[];
    onUpdatePiece: (piece: PortfolioPiece) => void;
    onDeletePiece: (id: number) => void;
    onAddPiece: () => void;
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}

export default function Portfolio({ portfolioPieces, onUpdatePiece, onDeletePiece, onAddPiece, apiKey, onApiKeyChange }: PortfolioProps) {
    const [activePieceId, setActivePieceId] = useState<number | null>(null);
    const [activeSectionId, setActiveSectionId] = useState<string>(PORTFOLIO_SECTIONS[0].id);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const activePiece = portfolioPieces.find(p => p.id === activePieceId) || null;

    // Auto-detect KSBs based on text content
    const getDetectedKSBs = (text: string) => {
        if (!text) return [];
        const textLower = text.toLowerCase();
        return KSBS.filter(ksb => {
            // Very basic keyword matching - in a real app this would be more sophisticated
            const keywords = ksb.keyPoints.flatMap(kp => kp.toLowerCase().split(' ').filter(w => w.length > 5));
            const matchCount = keywords.filter(k => textLower.includes(k)).length;
            return matchCount >= 2 || textLower.includes(ksb.id.toLowerCase());
        }).map(k => k.id);
    };

    const handleAIHelp = async (sectionId: string, currentText: string, prompt: string) => {
        if (!apiKey) {
            setAiError('Please enter your Google API Key in the Settings tab or below.');
            return;
        }
        setAiError(null);
        setIsGenerating(true);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const systemPrompt = `You are an expert tutor for the Level 3 Maintenance and Operations Engineering Technician apprenticeship. 
      Help the student write a portfolio entry for the section: "${prompt}". 
      The student has provided this context/draft: "${currentText}".
      Write a professional, first-person paragraph suitable for an engineering portfolio. 
      Focus on evidence for these KSBs: ${PORTFOLIO_SECTIONS.find(s => s.id === sectionId)?.ksbHints.join(', ')}.
      Keep it factual, concise, and focused on the student's actions ("I did...", "I checked...").`;

            const result = await model.generateContent(systemPrompt);
            const response = result.response.text();

            if (activePiece) {
                const updatedSections = { ...activePiece.sections, [sectionId]: response };
                onUpdatePiece({ ...activePiece, sections: updatedSections, lastModified: Date.now() });
            }
        } catch (err) {
            console.error('AI Error:', err);
            setAiError('Failed to generate content. Please check your API key and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const updateSection = (text: string) => {
        if (activePiece) {
            const updatedSections = { ...activePiece.sections, [activeSectionId]: text };
            // Mark section as complete if it has > 50 chars
            const completed = new Set(activePiece.completedSections);
            if (text.length > 50) completed.add(activeSectionId);
            else completed.delete(activeSectionId);

            onUpdatePiece({
                ...activePiece,
                sections: updatedSections,
                completedSections: Array.from(completed),
                lastModified: Date.now()
            });
        }
    };

    if (!activePiece) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold gradient-text">Portfolio Builder</h2>
                        <p className="text-muted-foreground mt-1">Create evidence for your End-Point Assessment</p>
                    </div>
                    <Button onClick={onAddPiece} size="lg" className="shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5" /> New Portfolio Piece
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolioPieces.map((piece) => (
                        <motion.div key={piece.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Card className="glass cursor-pointer hover:border-primary/40 transition-all h-full flex flex-col" onClick={() => setActivePieceId(piece.id)}>
                                <CardHeader>
                                    <CardTitle className="text-lg leading-tight">{piece.title || 'Untitled Piece'}</CardTitle>
                                    <CardDescription>Last edited: {new Date(piece.lastModified).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span>{piece.completedSections.length}/5 sections</span>
                                        </div>
                                        <Progress value={(piece.completedSections.length / 5) * 100} className="h-2" />
                                        <div className="flex gap-1 flex-wrap mt-3">
                                            {Object.values(piece.sections).join(' ').length > 0 && getDetectedKSBs(Object.values(piece.sections).join(' ')).slice(0, 5).map(k => (
                                                <Badge key={k} variant="secondary" className="text-[10px]">{k}</Badge>
                                            ))}
                                            {getDetectedKSBs(Object.values(piece.sections).join(' ')).length > 5 && (
                                                <Badge variant="outline" className="text-[10px]">+{getDetectedKSBs(Object.values(piece.sections).join(' ')).length - 5} more</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 flex justify-between">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">Edit</Button>
                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        onClick={(e) => { e.stopPropagation(); onDeletePiece(piece.id); }}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}

                    {portfolioPieces.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No portfolio pieces yet. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const currentSection = PORTFOLIO_SECTIONS.find(s => s.id === activeSectionId)!;
    const currentText = activePiece.sections[activeSectionId] || '';
    const detectedKSBs = getDetectedKSBs(currentText);

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-4">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setActivePieceId(null)}>← Back</Button>
                <Input
                    value={activePiece.title}
                    onChange={(e) => onUpdatePiece({ ...activePiece, title: e.target.value, lastModified: Date.now() })}
                    className="font-bold text-lg bg-transparent border-transparent hover:border-border focus:border-border h-auto py-1 px-2 w-full max-w-md"
                    placeholder="Untitled Portfolio Piece"
                />
                <div className="ml-auto text-sm text-muted-foreground">
                    {activePiece.completedSections.length}/5 sections completed
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 flex flex-col gap-1 overflow-y-auto pr-2 pb-10">
                    {PORTFOLIO_SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSectionId(section.id)}
                            className={`text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between group ${activeSectionId === section.id
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-secondary/50 text-muted-foreground'
                                }`}
                        >
                            <span>{section.title}</span>
                            {activePiece.completedSections.includes(section.id) && <CheckCircle className="w-3 h-3 text-green-500" />}
                        </button>
                    ))}
                </div>

                {/* Editor */}
                <Card className="flex-1 glass flex flex-col overflow-hidden">
                    <CardHeader className="pb-4">
                        <CardTitle>{currentSection.title}</CardTitle>
                        <CardDescription>{currentSection.prompt}</CardDescription>
                        <div className="flex gap-2 flex-wrap mt-2">
                            <span className="text-xs text-muted-foreground mr-1 self-center">Target KSBs:</span>
                            {currentSection.ksbHints.map(ksb => (
                                <Badge key={ksb} variant={detectedKSBs.includes(ksb) ? 'success' : 'outline'} className="text-xs">
                                    {ksb}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 flex flex-col gap-4">
                        <div className="relative flex-1">
                            <Textarea
                                value={currentText}
                                onChange={(e) => updateSection(e.target.value)}
                                placeholder={currentSection.placeholder}
                                className="h-full resize-none p-4 font-mono text-sm leading-relaxed bg-black/20 focus:bg-black/40 border-0"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="default" // Changed to 'default' as 'magic' isn't valid, but we'll style it to look special
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20"
                                    onClick={() => handleAIHelp(activeSectionId, currentText, currentSection.prompt)}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    {isGenerating ? 'Writing...' : 'AI Assist'}
                                </Button>
                            </div>
                        </div>

                        {aiError && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {aiError}
                            </div>
                        )}

                        {!apiKey && (
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 text-xs flex items-center justify-between">
                                <span>✨ Add your Gemini API Key to enable AI writing assistance</span>
                                <Input
                                    type="password"
                                    placeholder="Paste API Key here..."
                                    className="w-48 h-7 text-xs bg-black/20 border-blue-500/30"
                                    onChange={(e) => onApiKeyChange(e.target.value)}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
