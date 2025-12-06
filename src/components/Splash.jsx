import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const Splash = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing core systems...");

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for realistic feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress < 30) setStatus("Initializing core systems...");
        else if (progress < 60) setStatus("Loading neural interface...");
        else if (progress < 90) setStatus("Establishing secure connection...");
        else setStatus("System ready.");

        if (progress === 100) {
            setTimeout(onComplete, 800);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <Logo size="large" />

            <div className="mt-12 w-64 space-y-2">
                <div className="h-1 w-full bg-secondary overflow-hidden rounded-full">
                    <motion.div
                        className="h-full bg-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <div className="flex justify-between text-xs opacity-50 font-mono">
                    <span>{status}</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 text-[10px] opacity-30 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 }}
            >
                Crucible // Build 2025.12.05
            </motion.div>
        </motion.div >
    );
};
