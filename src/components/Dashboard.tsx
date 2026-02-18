'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, Progress } from '@/components/ui/primitives';
import { KSBS, QUESTIONS, GRADE_BOUNDARIES } from '@/lib/data';
import { BookOpen, FlaskConical, FileText, Target, Brain, Trophy, TrendingUp, Zap } from 'lucide-react';

interface DashboardProps {
    studiedKSBs: string[];
    testHistory: { score: number; total: number; date: string; mode: string }[];
    portfolioPieces: { id: number; title: string; completedSections: string[] }[];
    onNavigate: (tab: string) => void;
}

export default function Dashboard({ studiedKSBs, testHistory, portfolioPieces, onNavigate }: DashboardProps) {
    const totalKSBs = KSBS.length;
    const ksbProgress = Math.round((studiedKSBs.length / totalKSBs) * 100);
    const lastTest = testHistory[testHistory.length - 1];
    const avgScore = testHistory.length > 0
        ? Math.round(testHistory.reduce((a, b) => a + (b.score / b.total) * 100, 0) / testHistory.length)
        : 0;
    const portfolioComplete = portfolioPieces.filter(p => p.completedSections.length >= 4).length;

    const stats = [
        { label: 'KSBs Studied', value: `${studiedKSBs.length}/${totalKSBs}`, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10', progress: ksbProgress, tab: 'study' },
        { label: 'Tests Taken', value: testHistory.length, icon: FlaskConical, color: 'text-purple-400', bg: 'bg-purple-500/10', progress: Math.min(100, testHistory.length * 10), tab: 'quiz' },
        { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10', progress: avgScore, tab: 'quiz' },
        { label: 'Portfolio Pieces', value: `${portfolioComplete}/3`, icon: FileText, color: 'text-orange-400', bg: 'bg-orange-500/10', progress: Math.round((portfolioComplete / 3) * 100), tab: 'portfolio' },
    ];

    const quickActions = [
        { label: 'Start Mock Test', icon: FlaskConical, tab: 'quiz', color: 'from-blue-600 to-blue-700', desc: '30 questions · 45 min' },
        { label: 'Study KSBs', icon: BookOpen, tab: 'study', color: 'from-purple-600 to-purple-700', desc: 'All 36 KSBs covered' },
        { label: 'Write Portfolio', icon: FileText, tab: 'portfolio', color: 'from-orange-600 to-orange-700', desc: 'AI-assisted writing' },
        { label: 'Ask AI Tutor', icon: Brain, tab: 'ai', color: 'from-green-600 to-green-700', desc: 'Powered by Gemini' },
    ];

    const gradeInfo = [
        { grade: 'Pass', pct: '60%', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
        { grade: 'Merit', pct: '75%', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { grade: 'Distinction', pct: '85%', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    ];

    return (
        <div className="space-y-6">
            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-border glass p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/20"><Zap className="w-5 h-5 text-primary" /></div>
                        <Badge variant="default">Electrical Technician Pathway</Badge>
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-1">Level 3 MOET Study Hub</h1>
                    <p className="text-muted-foreground">City & Guilds End-Point Assessment Preparation · ST0154</p>
                    {lastTest && (
                        <div className="mt-4 flex items-center gap-2 text-sm">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-muted-foreground">Last test: </span>
                            <span className="font-medium">{lastTest.score}/{lastTest.total} ({Math.round((lastTest.score / lastTest.total) * 100)}%)</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="cursor-pointer hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 glass" onClick={() => onNavigate(stat.tab)}>
                            <CardContent className="p-4">
                                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
                                <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                                <Progress value={stat.progress} color={stat.color.replace('text-', 'bg-')} />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickActions.map((action, i) => (
                        <motion.button key={action.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                            onClick={() => onNavigate(action.tab)}
                            className={`relative overflow-hidden rounded-xl p-4 text-left bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 shadow-lg group`}>
                            <action.icon className="w-6 h-6 text-white/80 mb-2 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-semibold text-sm">{action.label}</div>
                            <div className="text-white/60 text-xs mt-0.5">{action.desc}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Grade Boundaries & EPA Overview */}
            <div className="grid lg:grid-cols-2 gap-4">
                <Card className="glass">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2"><Target className="w-4 h-4 text-primary" />Knowledge Test Grade Boundaries</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {gradeInfo.map(g => (
                            <div key={g.grade} className={`flex items-center justify-between rounded-lg border p-3 ${g.bg}`}>
                                <span className={`font-semibold ${g.color}`}>{g.grade}</span>
                                <span className="text-sm text-muted-foreground">{g.pct} ({g.grade === 'Pass' ? '18' : g.grade === 'Merit' ? '22' : '25'}/30)</span>
                            </div>
                        ))}
                        <p className="text-xs text-muted-foreground pt-1">30 questions · 45 minutes · Multiple choice</p>
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" />EPA Components</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { name: 'Knowledge Test', weight: '20%', ksbs: 'K1–K4', color: 'text-blue-400' },
                            { name: 'Practical Observation', weight: '40%', ksbs: 'S1–S12, B1–B4, B6–B7', color: 'text-green-400' },
                            { name: 'Technical Interview', weight: '40%', ksbs: 'K1–K4, S2/S4/S6/S8/S9–S12, B5', color: 'text-purple-400' },
                        ].map(c => (
                            <div key={c.name} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <div className={`text-sm font-medium ${c.color}`}>{c.name}</div>
                                    <div className="text-xs text-muted-foreground">{c.ksbs}</div>
                                </div>
                                <Badge variant="secondary">{c.weight}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
