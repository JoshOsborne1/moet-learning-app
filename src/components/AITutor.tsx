'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/primitives';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Bot, User, Sparkles, AlertCircle, Trash2, StopCircle } from 'lucide-react';

interface Message {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

interface AITutorProps {
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}

export default function AITutor({ apiKey, onApiKeyChange }: AITutorProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hello! I\'m your AI Tutor for the Level 3 MOET Electrical Technician course. Ask me anything about KSBs, technical concepts, or the EPA assessment.', timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isGenerating) return;
        if (!apiKey) {
            setError('Please enter your Gemini API Key first.');
            return;
        }

        const userMsg = { role: 'user' as const, text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsGenerating(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const chat = model.startChat({
                history: messages.map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const result = await chat.sendMessage(input);
            const response = result.response.text();

            setMessages(prev => [...prev, { role: 'model', text: response, timestamp: Date.now() }]);
        } catch (err: any) {
            console.error('AI Error:', err);
            setError(err.message || 'Failed to generate response.');
        } finally {
            setIsGenerating(false);
        }
    };

    const clearChat = () => {
        setMessages([{ role: 'model', text: 'Chat cleared. How can I help you studying today?', timestamp: Date.now() }]);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold gradient-text flex items-center gap-2"><Sparkles className="w-6 h-6 text-purple-400" /> AI Tutor</h2>
                    <p className="text-muted-foreground text-sm">Powered by Gemini 1.5 Flash</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground hover:text-red-400">
                    <Trash2 className="w-4 h-4 mr-2" /> Clear History
                </Button>
            </div>

            <Card className="flex-1 glass border-primary/20 flex flex-col overflow-hidden shadow-2xl shadow-primary/5">
                <CardContent className="flex-1 p-0 flex flex-col h-full">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <motion.div
                                key={m.timestamp}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {m.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                <div className={`rounded-2xl p-4 max-w-[80%] shadow-md ${m.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                        : 'bg-secondary/40 backdrop-blur-md border border-white/5 rounded-tl-sm'
                                    }`}>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
                                </div>

                                {m.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isGenerating && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 animate-pulse">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-secondary/20 rounded-2xl p-4 rounded-tl-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        )}

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center my-2">
                                <div className="bg-red-500/10 text-red-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-red-500/20">
                                    <AlertCircle className="w-3 h-3" /> {error}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-lg">
                        {!apiKey ? (
                            <div className="flex items-center gap-3">
                                <Input
                                    type="password"
                                    placeholder="Paste your Gemini API Key here to start chatting..."
                                    className="bg-secondary/50 border-primary/20 focus:border-primary/50"
                                    onChange={(e) => onApiKeyChange(e.target.value)}
                                />
                                <Button disabled>Enter Key</Button>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex gap-2"
                            >
                                <input
                                    className="flex-1 bg-secondary/50 border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/50"
                                    placeholder="Ask a question about the EPA..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isGenerating}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || isGenerating}
                                    className={`rounded-xl transition-all duration-300 ${input.trim() ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-secondary text-muted-foreground'}`}
                                >
                                    {isGenerating ? <StopCircle className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                                </Button>
                            </form>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
