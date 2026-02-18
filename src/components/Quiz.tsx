'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, Progress } from '@/components/ui/primitives';
import { QUESTIONS } from '@/lib/data';
import { getScoreGrade } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, ChevronRight, Zap, BookOpen } from 'lucide-react';

interface QuizProps {
    onTestComplete: (score: number, total: number) => void;
}

type QuizMode = 'select' | 'active' | 'results';

export default function Quiz({ onTestComplete }: QuizProps) {
    const [mode, setMode] = useState<QuizMode>('select');
    const [questions, setQuestions] = useState(QUESTIONS);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45 * 60);
    const [timerActive, setTimerActive] = useState(false);
    const [quizMode, setQuizMode] = useState<'full' | 'quick' | 'topic'>('full');
    const [selectedTopic, setSelectedTopic] = useState('K1');

    useEffect(() => {
        if (!timerActive || timeLeft <= 0) return;
        const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(t);
    }, [timerActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && mode === 'active') finishQuiz();
    }, [timeLeft]);

    const startQuiz = (type: 'full' | 'quick' | 'topic') => {
        setQuizMode(type);
        let qs = [...QUESTIONS];
        if (type === 'quick') qs = qs.sort(() => Math.random() - 0.5).slice(0, 10);
        else if (type === 'topic') qs = qs.filter(q => q.ksb === selectedTopic).sort(() => Math.random() - 0.5);
        else qs = qs.sort(() => Math.random() - 0.5);
        setQuestions(qs);
        setCurrent(0);
        setAnswers({});
        setSelected(null);
        setShowExplanation(false);
        setTimeLeft(type === 'full' ? 45 * 60 : type === 'quick' ? 15 * 60 : 20 * 60);
        setTimerActive(type !== 'topic');
        setMode('active');
    };

    const handleAnswer = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        setAnswers(prev => ({ ...prev, [questions[current].id]: opt }));
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        if (current < questions.length - 1) {
            setCurrent(p => p + 1);
            setSelected(null);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        setTimerActive(false);
        setMode('results');
        const score = questions.filter(q => answers[q.id] === q.answer || (q.id === questions[current].id && selected === q.answer)).length;
        onTestComplete(score, questions.length);
    };

    const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    const score = questions.filter(q => answers[q.id] === q.answer).length;
    const { grade, color } = getScoreGrade(score, questions.length);
    const q = questions[current];

    if (mode === 'select') return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold gradient-text">Mock Tests</h2>
                <p className="text-muted-foreground mt-1">Practice with {QUESTIONS.length} questions from the knowledge bank</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {[
                    { type: 'full' as const, title: 'Full Mock Test', desc: '30 questions · 45 minutes', icon: Trophy, color: 'from-blue-600 to-blue-700', badge: 'Exam Conditions' },
                    { type: 'quick' as const, title: 'Quick Quiz', desc: '10 questions · 15 minutes', icon: Zap, color: 'from-purple-600 to-purple-700', badge: 'No Timer' },
                    { type: 'topic' as const, title: 'Topic Practice', desc: 'Focus on one KSB area', icon: BookOpen, color: 'from-green-600 to-green-700', badge: 'Targeted' },
                ].map(m => (
                    <motion.div key={m.type} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card className="glass cursor-pointer hover:border-primary/40 transition-all" onClick={() => startQuiz(m.type)}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                                    <m.icon className="w-6 h-6 text-white" />
                                </div>
                                <Badge variant="secondary" className="mb-2">{m.badge}</Badge>
                                <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                                <p className="text-sm text-muted-foreground">{m.desc}</p>
                                {m.type === 'topic' && (
                                    <select className="mt-3 w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm" value={selectedTopic} onChange={e => { e.stopPropagation(); setSelectedTopic(e.target.value); }} onClick={e => e.stopPropagation()}>
                                        {['K1', 'K2', 'K3', 'K4'].map(k => <option key={k} value={k}>{k} – {k === 'K1' ? 'First Principles' : k === 'K2' ? 'Health & Safety' : k === 'K3' ? 'Maintenance Practices' : 'Engineering Theories'}</option>)}
                                    </select>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <Card className="glass">
                <CardHeader><CardTitle className="text-sm">Grade Boundaries</CardTitle></CardHeader>
                <CardContent className="flex gap-4">
                    {[['Pass', '60%', 'text-green-400'], ['Merit', '75%', 'text-blue-400'], ['Distinction', '85%', 'text-yellow-400']].map(([g, p, c]) => (
                        <div key={g} className="flex-1 text-center p-3 rounded-lg bg-secondary">
                            <div className={`text-lg font-bold ${c}`}>{p}</div>
                            <div className="text-xs text-muted-foreground">{g}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    if (mode === 'results') {
        const pct = Math.round((score / questions.length) * 100);
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <Card className="glass text-center">
                    <CardContent className="p-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-7xl font-black gradient-text mb-2">{pct}%</motion.div>
                        <div className={`text-2xl font-bold ${color} mb-1`}>{grade}</div>
                        <div className="text-muted-foreground">{score} / {questions.length} correct</div>
                        <Progress value={pct} className="mt-4 h-3" color={pct >= 85 ? 'bg-yellow-400' : pct >= 75 ? 'bg-blue-400' : pct >= 60 ? 'bg-green-400' : 'bg-red-400'} />
                    </CardContent>
                </Card>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {questions.map((q, i) => {
                        const userAns = answers[q.id];
                        const correct = userAns === q.answer;
                        return (
                            <Card key={q.id} className={`glass border ${correct ? 'border-green-500/30' : 'border-red-500/30'}`}>
                                <CardContent className="p-4">
                                    <div className="flex gap-3">
                                        {correct ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium mb-1">Q{i + 1}: {q.text.slice(0, 80)}{q.text.length > 80 ? '…' : ''}</p>
                                            {!correct && <p className="text-xs text-green-400">✓ {q.options[q.answer]}</p>}
                                            <p className="text-xs text-muted-foreground mt-1">{q.explanation.slice(0, 100)}…</p>
                                        </div>
                                        <Badge variant="secondary" className="shrink-0">{q.ksb}</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <Button onClick={() => setMode('select')} className="w-full" size="lg"><RotateCcw className="w-4 h-4" />Try Again</Button>
            </motion.div>
        );
    }

    // Active quiz
    const progress = ((current + 1) / questions.length) * 100;
    const isCorrect = selected === q.answer;
    const optionLabels = ['a', 'b', 'c', 'd'] as const;

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Q{current + 1}/{questions.length}</span>
                    <Badge variant="secondary">{q.ksb}</Badge>
                    <Badge variant="outline">{q.topic}</Badge>
                </div>
                {timerActive && (
                    <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-muted-foreground'}`}>
                        <Clock className="w-4 h-4" />{formatTime(timeLeft)}
                    </div>
                )}
            </div>
            <Progress value={progress} className="h-1.5" />

            <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <Card className="glass">
                        <CardContent className="p-6">
                            <p className="text-lg font-medium leading-relaxed mb-6">{q.text}</p>
                            <div className="space-y-3">
                                {optionLabels.map(opt => {
                                    const isSelected = selected === opt;
                                    const isAnswer = opt === q.answer;
                                    let cls = 'border-border hover:border-primary/50 hover:bg-primary/5';
                                    if (selected) {
                                        if (isAnswer) cls = 'border-green-500 bg-green-500/10';
                                        else if (isSelected) cls = 'border-red-500 bg-red-500/10';
                                        else cls = 'border-border opacity-50';
                                    }
                                    return (
                                        <motion.button key={opt} whileHover={!selected ? { scale: 1.01 } : {}} whileTap={!selected ? { scale: 0.99 } : {}}
                                            onClick={() => handleAnswer(opt)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${cls}`}>
                                            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 uppercase">{opt}</span>
                                            <span className="text-sm">{q.options[opt]}</span>
                                            {selected && isAnswer && <CheckCircle className="w-5 h-5 text-green-400 ml-auto shrink-0" />}
                                            {selected && isSelected && !isAnswer && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card className={`glass border ${isCorrect ? 'border-green-500/40' : 'border-orange-500/40'}`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-2">
                                            {isCorrect ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />}
                                            <div>
                                                <p className="text-sm font-semibold mb-1">{isCorrect ? 'Correct!' : `Correct answer: ${q.answer.toUpperCase()}`}</p>
                                                <p className="text-sm text-muted-foreground">{q.explanation}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Button onClick={nextQuestion} className="w-full mt-3" size="lg">
                                    {current < questions.length - 1 ? <><ChevronRight className="w-4 h-4" />Next Question</> : <><Trophy className="w-4 h-4" />See Results</>}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
