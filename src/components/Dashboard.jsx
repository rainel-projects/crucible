import { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { CodeTyper } from './CodeTyper';
import { LogOut, Trophy, Zap, Activity, BarChart } from 'lucide-react';

export const Dashboard = ({ theme, language }) => {
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'finished'
    const [finalStats, setFinalStats] = useState(null);

    const handleEndSession = (stats) => {
        setFinalStats(stats);
        setGameStatus('finished');
    };

    return (
        <div className="min-h-screen p-8 flex flex-col relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary -z-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10" />

            <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <Logo />
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${gameStatus === 'playing' ? 'bg-green-500 animate-pulse' : 'bg-red-500'} `} />
                        {gameStatus === 'playing' ? 'System Online' : 'Session Ended'}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                <motion.div
                    key={gameStatus}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex flex-col"
                >
                    {gameStatus === 'playing' ? (
                        <>
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                                        CRUCIBLE <span className="text-primary">///</span> {language?.toUpperCase()}
                                    </h1>
                                    <p className="text-white/40 text-sm font-mono">
                                        NEURAL LINK ESTABLISHED • READY FOR INPUT
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="px-3 py-1 rounded-md border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase">
                                        {theme.replace('-', ' ')} PROTOCOL
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <CodeTyper
                                    language={language?.toLowerCase() || 'javascript'}
                                    theme={theme}
                                    onEndSession={handleEndSession}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="space-y-4"
                            >
                                <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white">
                                    SESSION TERMINATED
                                </h1>
                                <p className="text-xl text-white/50 font-light">
                                    Neural link severed. Data synchronized.
                                </p>
                            </motion.div>

                            {finalStats && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                                    <StatBox label="Final Rank" value={finalStats.rank} icon={Trophy} />
                                    <StatBox label="Level Reached" value={finalStats.level} icon={Zap} />
                                    <StatBox label="Total XP" value={finalStats.xp} icon={Activity} />
                                    <StatBox label="Chars Typed" value={finalStats.totalChars} icon={BarChart} />
                                </div>
                            )}

                            <div className="pt-12">
                                <p className="text-primary text-lg font-mono tracking-widest uppercase animate-pulse">
                                    Come back soon for further training
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            <footer className="mt-8 flex justify-between items-end text-white/20 text-xs font-mono border-t border-white/5 pt-4">
                <div>
                    SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
                <div className="text-right">
                    CRUCIBLE v2.0.0 <br />
                    {gameStatus === 'playing' ? 'NEURAL INTERFACE ACTIVE' : 'SYSTEM STANDBY'}
                </div>
            </footer>
        </div>
    );
};

const StatBox = ({ label, value, icon: Icon }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
        <div className="p-3 rounded-full bg-white/5 text-white/50">
            <Icon size={24} />
        </div>
        <div>
            <div className="text-xs text-white/30 font-mono uppercase tracking-widest mb-1">{label}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
        </div>
    </div>
);
