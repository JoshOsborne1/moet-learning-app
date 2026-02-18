'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, Progress } from '@/components/ui/primitives';
import { KSBS, KSB_CATEGORIES } from '@/lib/data';
import type { KSB } from '@/lib/data';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface StudyProps {
    studiedKSBs: string[];
    onMarkStudied: (id: string) => void;
}

export default function Study({ studiedKSBs, onMarkStudied }: StudyProps) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'knowledge' | 'skill' | 'behaviour'>('all');

    const filtered = KSBS.filter(k => filter === 'all' || k.type === filter);
    const progress = Math.round((studiedKSBs.length / KSBS.length) * 100);

    const typeColors: Record<string, string> = {
        knowledge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        skill: 'text-green-400 bg-green-500/10 border-green-500/20',
        behaviour: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };

    const assessmentBadge: Record<string, string> = {
        knowledge_test: 'KT',
        practical_observation: 'PO',
        technical_interview: 'TI',
    };

    return (
        <div className="space-y-5">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold gradient-text">Study Mode</h2>
                    <p className="text-muted-foreground mt-1">All 36 KSBs for the Electrical Technician pathway</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold">{studiedKSBs.length}/{KSBS.length}</div>
                    <div className="text-xs text-muted-foreground">studied</div>
                </div>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="flex gap-2 flex-wrap">
                {(['all', 'knowledge', 'skill', 'behaviour'] as const).map(f => (
                    <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">
                        {f === 'all' ? 'All KSBs' : f === 'knowledge' ? 'Knowledge (K1–K4)' : f === 'skill' ? 'Skills (S1–S25)' : 'Behaviours (B1–B7)'}
                    </Button>
                ))}
            </div>

            <div className="space-y-2">
                {filtered.map((ksb, i) => {
                    const isStudied = studiedKSBs.includes(ksb.id);
                    const isOpen = expanded === ksb.id;
                    return (
                        <motion.div key={ksb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                            <Card className={`glass transition-all duration-200 ${isStudied ? 'border-green-500/30' : 'border-border'} ${isOpen ? 'shadow-lg' : ''}`}>
                                <button className="w-full text-left" onClick={() => setExpanded(isOpen ? null : ksb.id)}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-sm shrink-0 ${typeColors[ksb.type]}`}>
                                                {ksb.id}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="font-semibold text-sm">{ksb.title}</span>
                                                    {ksb.specialist && <Badge variant="warning" className="text-xs">Specialist</Badge>}
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{ksb.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {isStudied && <CheckCircle className="w-5 h-5 text-green-400" />}
                                                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                            </div>
                                        </div>
                                    </CardContent>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-3">{ksb.description}</p>
                                                    <div className="flex gap-2 flex-wrap mb-3">
                                                        {ksb.assessedBy.map(a => (
                                                            <Badge key={a} variant="secondary">{assessmentBadge[a]} – {a.replace(/_/g, ' ')}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-sm font-semibold">Key Points to Know</span>
                                                    </div>
                                                    <ul className="space-y-1.5">
                                                        {ksb.keyPoints.map((pt, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                <span className="text-primary mt-1 shrink-0">•</span>
                                                                <span>{pt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <Button variant={isStudied ? 'outline' : 'success'} size="sm" onClick={() => onMarkStudied(ksb.id)} className="w-full">
                                                    {isStudied ? <><CheckCircle className="w-4 h-4" />Studied ✓</> : <><BookOpen className="w-4 h-4" />Mark as Studied</>}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
