import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, X } from 'lucide-react';

export const ZoomGuide = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        // Auto hide after 8 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 right-8 z-50 max-w-sm"
                >
                    <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl flex items-start gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-primary animate-pulse">
                            <Maximize size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-white mb-1">Immersion Tip</h4>
                            <p className="text-xs text-white/60 leading-relaxed">
                                For the best experience, adjust your browser zoom (Ctrl/Cmd +) to fit your screen perfectly.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-white/20 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
