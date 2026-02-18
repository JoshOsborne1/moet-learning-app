'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, Progress } from '@/components/ui/primitives';
import { KSBS, KSB_CATEGORIES } from '@/lib/data';
import { CheckCircle, Circle, BookOpen, FileText, FlaskConical, Filter } from 'lucide-react';

interface KSBTrackerProps {
    studiedKSBs: string[];
    portfolioPieces: { sections: Record<string, string> }[];
    testHistory: { score: number; total: number }[]; // Placeholder for more detailed test tracking if implemented
}

export default function KSBTracker({ studiedKSBs, portfolioPieces, testHistory }: KSBTrackerProps) {
    const [filter, setFilter] = useState<'all' | 'knowledge' | 'skill' | 'behaviour'>('all');
    const [selectedKSB, setSelectedKSB] = useState<string | null>(null);

    // Helper to check evidence
    const getEvidenceStatus = (ksbId: string) => {
        const isStudied = studiedKSBs.includes(ksbId);

        // Check all portfolio text for KSB keywords/ID
        const allPortfolioText = portfolioPieces.flatMap(p => Object.values(p.sections)).join(' ').toLowerCase();
        const portfolioEvidence = allPortfolioText.includes(ksbId.toLowerCase()); // Simple check, could be more robust

        // In a real app, we'd track exactly which questions covered which KSB
        const isTested = testHistory.length > 0 && Math.random() > 0.5; // Placeholder logic for demo

        if (portfolioEvidence && isTested) return { status: 'complete', color: 'bg-green-500', label: 'Completed' };
        if (portfolioEvidence) return { status: 'evidenced', color: 'bg-orange-500', label: 'Evidenced' };
        if (isStudied) return { status: 'studied', color: 'bg-blue-500', label: 'Studied' };
        return { status: 'pending', color: 'bg-secondary', label: 'Not Started' };
    };

    const filteredKSBs = KSBS.filter(k => filter === 'all' || k.type === filter);

    // Calculate stats
    const total = KSBS.length;
    const studied = studiedKSBs.length;
    const evidenced = KSBS.filter(k => getEvidenceStatus(k.id).status === 'evidenced' || getEvidenceStatus(k.id).status === 'complete').length;
    const complete = KSBS.filter(k => getEvidenceStatus(k.id).status === 'complete').length;

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold gradient-text">KSB Tracker</h2>
                    <p className="text-muted-foreground mt-1">Track your progress across all {total} standard requirements</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="text-center"><div className="font-bold text-blue-400">{studied}</div><div className="text-muted-foreground text-xs">Studied</div></div>
                    <div className="text-center"><div className="font-bold text-orange-400">{evidenced}</div><div className="text-muted-foreground text-xs">Evidenced</div></div>
                    {/* <div className="text-center"><div className="font-bold text-green-400">{complete}</div><div className="text-muted-foreground text-xs">Mastered</div></div> */}
                </div>
            </div>

            <div className="flex gap-2">
                {(['all', 'knowledge', 'skill', 'behaviour'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="flex flex-1 gap-6 min-h-0">
                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {filteredKSBs.map((ksb) => {
                            const { color, status } = getEvidenceStatus(ksb.id);
                            return (
                                <motion.button
                                    key={ksb.id}
                                    layoutId={ksb.id}
                                    onClick={() => setSelectedKSB(ksb.id)}
                                    className={`p-3 rounded-xl border text-left transition-all hover:scale-105 hover:shadow-lg relative overflow-hidden group ${selectedKSB === ksb.id ? 'ring-2 ring-primary border-primary' : 'border-border glass'
                                        }`}
                                >
                                    <div className={`absolute inset-0 opacity-10 ${color.replace('bg-', 'bg-')}`} />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`font-bold text-lg ${status !== 'pending' ? color.replace('bg-', 'text-') : 'text-muted-foreground'}`}>{ksb.id}</span>
                                            {status === 'complete' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{ksb.title}</p>
                                    </div>
                                    {/* Status indicator bar */}
                                    <div className={`absolute bottom-0 left-0 h-1 w-full ${color}`} />
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="w-80 shrink-0">
                    <Card className="h-full glass flex flex-col">
                        {selectedKSB ? (
                            <div className="h-full flex flex-col p-5">
                                <div className="mb-4">
                                    <Badge variant="outline" className="mb-2">{KSBS.find(k => k.id === selectedKSB)?.type.toUpperCase()}</Badge>
                                    <h3 className="text-xl font-bold mb-1">{selectedKSB}: {KSBS.find(k => k.id === selectedKSB)?.title}</h3>
                                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium mt-2 ${getEvidenceStatus(selectedKSB!).color} bg-opacity-20 text-white`}>
                                        <div className={`w-2 h-2 rounded-full ${getEvidenceStatus(selectedKSB!).color}`} />
                                        {getEvidenceStatus(selectedKSB!).label}
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-5 pr-2">
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
                                        <p className="text-sm leading-relaxed">{KSBS.find(k => k.id === selectedKSB)?.description}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Key Points</h4>
                                        <ul className="space-y-1.5">
                                            {KSBS.find(k => k.id === selectedKSB)?.keyPoints.map((kp, i) => (
                                                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                                    <span className="text-primary">•</span> {kp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Assessment Methods</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {KSBS.find(k => k.id === selectedKSB)?.assessedBy.map(m => (
                                                <Badge key={m} variant="secondary" className="text-[10px]">{m.replace(/_/g, ' ')}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                                <Filter className="w-12 h-12 mb-4 opacity-20" />
                                <p>Select a KSB from the grid to view details</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
