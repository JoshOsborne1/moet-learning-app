'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from '@/components/Dashboard';
import Study from '@/components/Study';
import Quiz from '@/components/Quiz';
import Portfolio from '@/components/Portfolio';
import KSBTracker from '@/components/KSBTracker';
import AITutor from '@/components/AITutor';
import { LayoutDashboard, BookOpen, FlaskConical, FileText, Target, Brain, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/primitives';

type Tab = 'dashboard' | 'study' | 'quiz' | 'portfolio' | 'ksb' | 'ai' | 'settings';

export default function Home() {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Persisted State
    const [studiedKSBs, setStudiedKSBs] = useState<string[]>([]);
    const [testHistory, setTestHistory] = useState<{ score: number; total: number; date: string; mode: string }[]>([]);
    const [portfolioPieces, setPortfolioPieces] = useState<{ id: number; title: string; sections: Record<string, string>; completedSections: string[]; lastModified: number }[]>([]);
    const [apiKey, setApiKey] = useState('');

    // Hydrate from localStorage
    useEffect(() => {
        const load = (key: string, setter: (val: any) => void) => {
            const stored = localStorage.getItem(`moet_app_${key}`);
            if (stored) setter(JSON.parse(stored));
        };
        load('studiedKSBs', setStudiedKSBs);
        load('testHistory', setTestHistory);
        load('portfolioPieces', setPortfolioPieces);
        load('apiKey', setApiKey);
    }, []);

    // Save to localStorage
    useEffect(() => localStorage.setItem('moet_app_studiedKSBs', JSON.stringify(studiedKSBs)), [studiedKSBs]);
    useEffect(() => localStorage.setItem('moet_app_testHistory', JSON.stringify(testHistory)), [testHistory]);
    useEffect(() => localStorage.setItem('moet_app_portfolioPieces', JSON.stringify(portfolioPieces)), [portfolioPieces]);
    useEffect(() => localStorage.setItem('moet_app_apiKey', JSON.stringify(apiKey)), [apiKey]);

    const handleTestComplete = (score: number, total: number) => {
        setTestHistory(prev => [...prev, { score, total, date: new Date().toISOString(), mode: 'full' }]);
        setActiveTab('dashboard');
    };

    const menuItems = [
        { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'study' as const, label: 'Study Mode', icon: BookOpen },
        { id: 'quiz' as const, label: 'Mock Tests', icon: FlaskConical },
        { id: 'portfolio' as const, label: 'Portfolio', icon: FileText },
        { id: 'ksb' as const, label: 'KSB Tracker', icon: Target },
        { id: 'ai' as const, label: 'AI Tutor', icon: Brain },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className="border-r border-border bg-card/50 backdrop-blur-xl shrink-0 z-20 absolute md:relative h-full overflow-hidden flex flex-col"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 font-bold text-xl gradient-text mb-1">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-primary" />
                        </div>
                        MOET L3 App
                    </div>
                    <p className="text-xs text-muted-foreground ml-11">v1.0.0 • Electrical</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'hover:bg-accent/5 text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                {item.label}
                                {isActive && <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-secondary text-foreground' : 'hover:bg-accent/5 text-muted-foreground'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background">
                <header className="h-16 border-b border-border/40 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-10">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div className="flex-1" />
                    <div className="text-xs text-muted-foreground hidden md:block">
                        {apiKey ? <span className="text-green-400">● AI Connected</span> : <span className="text-orange-400">● AI Key Missing</span>}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'dashboard' && (
                                    <Dashboard
                                        studiedKSBs={studiedKSBs}
                                        testHistory={testHistory}
                                        portfolioPieces={portfolioPieces}
                                        onNavigate={(tab) => setActiveTab(tab as any)}
                                    />
                                )}
                                {activeTab === 'study' && (
                                    <Study
                                        studiedKSBs={studiedKSBs}
                                        onMarkStudied={(id) => setStudiedKSBs(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id])}
                                    />
                                )}
                                {activeTab === 'quiz' && (
                                    <Quiz onTestComplete={handleTestComplete} />
                                )}
                                {activeTab === 'portfolio' && (
                                    <Portfolio
                                        portfolioPieces={portfolioPieces}
                                        onUpdatePiece={(piece) => setPortfolioPieces(prev => prev.map(p => p.id === piece.id ? piece : p))}
                                        onDeletePiece={(id) => setPortfolioPieces(prev => prev.filter(p => p.id !== id))}
                                        onAddPiece={() => setPortfolioPieces(prev => [...prev, { id: Date.now(), title: '', sections: {}, completedSections: [], lastModified: Date.now() }])}
                                        apiKey={apiKey}
                                        onApiKeyChange={setApiKey}
                                    />
                                )}
                                {activeTab === 'ksb' && (
                                    <KSBTracker
                                        studiedKSBs={studiedKSBs}
                                        portfolioPieces={portfolioPieces}
                                        testHistory={testHistory}
                                    />
                                )}
                                {activeTab === 'ai' && (
                                    <AITutor apiKey={apiKey} onApiKeyChange={setApiKey} />
                                )}
                                {activeTab === 'settings' && (
                                    <div className="max-w-md mx-auto space-y-6">
                                        <h2 className="text-2xl font-bold">Settings</h2>
                                        <Card className="glass">
                                            <CardContent className="p-6 space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium mb-1 block">Gemini API Key</label>
                                                    <Input
                                                        type="password"
                                                        value={apiKey}
                                                        onChange={(e) => setApiKey(e.target.value)}
                                                        placeholder="AIzaSy..."
                                                        className="bg-secondary"
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Required for AI Tutor and Portfolio assistance.
                                                        Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-primary hover:underline">Google AI Studio</a>.
                                                        Keys are stored locally in your browser.
                                                    </p>
                                                </div>
                                                <div className="pt-4 border-t border-border">
                                                    <Button variant="destructive" onClick={() => {
                                                        localStorage.clear();
                                                        window.location.reload();
                                                    }} className="w-full">
                                                        <LogOut className="w-4 h-4 mr-2" /> Reset App Data
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
