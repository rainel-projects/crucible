import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomSnippet, getNextUnlock } from '../data/snippets';
import { RefreshCw, Trophy, Zap, Activity, BookOpen, BarChart, Lock, Flame, LogOut } from 'lucide-react';

export const CodeTyper = ({ language, theme, onEndSession }) => {
    // Gamification State
    const [stats, setStats] = useState({ xp: 0, level: 1, rank: 'SCRIPT KIDDIE', totalChars: 0 });
    const [history, setHistory] = useState([]);

    const [snippet, setSnippet] = useState(null);
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [completed, setCompleted] = useState(false);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [multiplier, setMultiplier] = useState(1);

    const inputRef = useRef(null);

    // Initialize first snippet
    useEffect(() => {
        loadNewSnippet();
    }, [language]);

    // Focus input on load and click
    useEffect(() => {
        if (!completed) {
            inputRef.current?.focus();
        }
    }, [completed, snippet]);

    const loadNewSnippet = () => {
        // Pass history to avoid repeats
        setSnippet(getRandomSnippet(language, stats.level, history));
        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setCompleted(false);
        setCombo(0);
        setMultiplier(1);
    };

    const calculateStats = (currentInput) => {
        if (!snippet) return;

        // Calculate Accuracy
        let errors = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (currentInput[i] !== snippet.code[i]) {
                errors++;
            }
        }
        const acc = Math.max(0, Math.floor(((currentInput.length - errors) / currentInput.length) * 100));
        setAccuracy(isNaN(acc) ? 100 : acc);

        // Calculate WPM
        if (startTime) {
            const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
            const words = currentInput.length / 5;
            const currentWpm = Math.floor(words / timeElapsed);
            setWpm(currentWpm);
        }
    };

    const handleInput = (e) => {
        if (!snippet || completed) return;

        const val = e.target.value;
        const lastCharTyped = val.slice(-1);
        const expectedChar = snippet.code[val.length - 1];

        if (!startTime) {
            setStartTime(Date.now());
        }

        // Combo Logic
        if (val.length > input.length) { // Only on addition
            if (lastCharTyped === expectedChar) {
                const newCombo = combo + 1;
                setCombo(newCombo);
                setMaxCombo(Math.max(maxCombo, newCombo));

                // Multiplier Logic
                if (newCombo >= 50) setMultiplier(4);
                else if (newCombo >= 20) setMultiplier(2);
                else if (newCombo >= 10) setMultiplier(1.5);
                else setMultiplier(1);
            } else {
                setCombo(0);
                setMultiplier(1);
            }
        }

        setInput(val);
        calculateStats(val);

        if (val === snippet.code) {
            handleCompletion();
        }
    };

    const handleCompletion = () => {
        if (!snippet) return;

        setCompleted(true);

        // Add to history
        if (snippet.id) {
            setHistory(prev => {
                const newHistory = [...prev, snippet.id];
                // Optional: Limit history size to prevent localStorage bloat, e.g., last 100
                if (newHistory.length > 100) return newHistory.slice(-100);
                return newHistory;
            });
        }

        const charsTyped = snippet.code.length;

        // XP Calculation with Multiplier
        const baseXP = charsTyped;
        const accuracyBonus = accuracy / 100;
        const totalXP = Math.floor(baseXP * accuracyBonus * multiplier);

        setStats(prev => {
            const newTotal = prev.totalChars + charsTyped;
            const newXp = prev.xp + totalXP;

            // Incremental Infinite Level Logic (IO Bound - Linear Growth)
            // Every ~50 characters typed (approx 1 snippet) grants a level
            const newLevel = 1 + Math.floor(newTotal / 50);

            let newRank = 'SCRIPT KIDDIE';
            if (newLevel >= 100) newRank = 'SINGULARITY';
            else if (newLevel >= 75) newRank = 'ORACLE';
            else if (newLevel >= 50) newRank = 'ATLAS';
            else if (newLevel >= 40) newRank = 'ARCHITECT';
            else if (newLevel >= 30) newRank = 'PRINCIPAL';
            else if (newLevel >= 20) newRank = 'SENIOR';
            else if (newLevel >= 10) newRank = 'DEVELOPER';
            else if (newLevel >= 5) newRank = 'JUNIOR';

            return {
                xp: newXp,
                level: newLevel,
                rank: newRank,
                totalChars: newTotal
            };
        });
    };

    // Render the code with highlighting and effects
    const renderCode = () => {
        if (!snippet) return null;

        return snippet.code.split('').map((char, index) => {
            let className = "transition-colors duration-75 relative font-medium"; // Faster transition
            let style = {};

            if (index < input.length) {
                if (input[index] === char) {
                    // Correct character - Crisp, no blur
                    className += " text-primary opacity-100";
                    style = {
                        textShadow: "0 0 2px var(--primary)" // Minimal glow
                    };
                } else {
                    // Incorrect character
                    className += " text-red-500 opacity-100 bg-red-500/10";
                }
            } else {
                // Untyped character
                className += " text-white/20";
            }

            // Cursor Logic - Simple Block Cursor
            const isCursor = index === input.length;

            return (
                <span key={index} className={className} style={style}>
                    {isCursor && (
                        <span className="absolute inset-0 bg-primary/50 -z-10 animate-pulse" />
                    )}
                    {char}
                </span>
            );
        });
    };

    if (!snippet) return null;

    const nextUnlock = getNextUnlock(stats.level);

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 min-h-full pb-20 font-sans">
            {/* Stats Header - Fintech Style */}
            <div className="flex gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <StatCard label="RANK" value={stats.rank} icon={Trophy} color="text-primary" />
                    <StatCard label="LEVEL" value={stats.level} icon={Zap} color="text-white" />
                    <StatCard label="SPEED" value={`${wpm} WPM`} icon={Activity} color="text-white" />
                    <StatCard
                        label="ACCURACY"
                        value={`${accuracy}%`}
                        icon={BarChart}
                        color={accuracy >= 95 ? 'text-green-400' : accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'}
                    />
                </div>
                <button
                    onClick={() => onEndSession(stats)}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-red-500/20 transition-colors w-24"
                >
                    <LogOut size={20} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">End</span>
                </button>
            </div>

            {/* Main Typing Area - Premium Glassmorphism */}
            <div
                className={`relative flex-1 min-h-[500px] bg-[#050505]/80 backdrop-blur-xl border rounded-3xl p-10 overflow-hidden group transition-all duration-500 shadow-2xl
                    ${multiplier >= 4 ? 'border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.1)]' : 'border-white/5'}
                `}
                onClick={() => inputRef.current?.focus()}
            >
                {/* Header inside container */}
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-light tracking-tight text-white">{snippet.title}</h2>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${snippet.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                snippet.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {snippet.difficulty}
                            </span>
                        </div>
                        <div className="text-sm text-white/30 font-mono">
                            {typeof nextUnlock === 'object' ? `Next Unlock: Lvl ${nextUnlock.level} - ${nextUnlock.topic}` : 'Max Level Reached'}
                        </div>
                    </div>

                    {/* Combo Indicator */}
                    <div className="text-right">
                        <div className={`text-3xl font-bold tracking-tighter transition-all duration-300 ${multiplier >= 4 ? 'text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                            multiplier >= 2 ? 'text-blue-400' : 'text-white/20'
                            }`}>
                            {combo}x
                        </div>
                        <div className="text-xs text-white/30 font-mono uppercase tracking-widest">Combo Multiplier</div>
                    </div>
                </div>

                {/* Hidden Input */}
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInput}
                    className="absolute opacity-0 w-0 h-0"
                    disabled={completed}
                    autoFocus
                />

                {/* Code Display */}
                <pre className="font-mono text-sm md:text-xl lg:text-2xl leading-relaxed whitespace-pre-wrap break-all relative z-10 font-medium tracking-wide overflow-x-auto">
                    {renderCode()}
                </pre>

                {/* Blur overlay when not focused */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity pointer-events-none z-20">
                    <span className="text-white/50 font-mono uppercase tracking-widest text-sm border border-white/10 px-4 py-2 rounded-full bg-black/50">Click to Focus</span>
                </div>

                {/* Completion Overlay */}
                <AnimatePresence>
                    {completed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center z-30"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="text-center w-full max-w-lg"
                            >
                                <div className="mb-8">
                                    <h2 className="text-4xl font-light text-white mb-2 tracking-tight">Sequence Complete</h2>
                                    <p className="text-white/40 font-mono text-sm">Synchronization Successful</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <ResultStat label="WPM" value={wpm} />
                                    <ResultStat label="Accuracy" value={`${accuracy}%`} color="text-green-400" />
                                    <ResultStat label="Max Combo" value={maxCombo} color="text-blue-400" />
                                    <ResultStat label="XP Gained" value={`+${Math.floor(snippet.code.length * (accuracy / 100) * multiplier)}`} color="text-yellow-400" />
                                </div>

                                <button
                                    onClick={loadNewSnippet}
                                    className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={18} />
                                    LEVEL UP
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer / Instructions */}
            <div className="text-center text-white/20 text-sm font-mono uppercase tracking-widest">
                Type the code exactly as shown to compile • Press ESC to reset
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex items-center justify-between group hover:border-white/10 transition-colors">
        <div>
            <div className="text-xs text-white/30 font-mono mb-1 uppercase tracking-widest">{label}</div>
            <div className={`text-2xl font-bold ${color} tracking-tight`}>{value}</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5 text-white/20 group-hover:text-white/50 transition-colors">
            <Icon size={20} />
        </div>
    </div>
);

const ResultStat = ({ label, value, color = "text-white" }) => (
    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
        <div className="text-xs text-white/30 font-mono mb-1 uppercase tracking-widest">{label}</div>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
);
