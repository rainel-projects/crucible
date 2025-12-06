import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Scroll, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const themes = [
    {
        id: 'coding-dojo',
        name: 'CODING DOJO',
        icon: Terminal,
        description: 'Focus-optimized environment for deep work.',
        accent: '#3b82f6',
        gradient: 'from-blue-500/20 to-blue-900/5'
    },
    {
        id: 'cyber-lab',
        name: 'CYBER LAB',
        icon: Zap,
        description: 'High-energy interface for rapid prototyping.',
        accent: '#22c55e',
        gradient: 'from-green-500/20 to-green-900/5'
    },
    {
        id: 'monk-mode',
        name: 'MONK MODE',
        icon: Shield,
        description: 'Minimalist sanctuary for absolute clarity.',
        accent: '#f59e0b',
        gradient: 'from-amber-500/20 to-amber-900/5'
    }
];

export const ThemeSelector = ({ onSelect }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white relative selection:bg-white/20 py-20">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
            </div>

            <motion.div
                className="z-10 w-full max-w-7xl px-8 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="mb-16 text-center space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h2 className="text-sm font-medium tracking-[0.3em] text-white/40 uppercase">System Configuration</h2>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">Select Interface</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-h-[500px]">
                    {themes.map((theme, index) => (
                        <ThemeCard
                            key={theme.id}
                            theme={theme}
                            index={index}
                            onSelect={onSelect}
                            hovered={hovered}
                            setHovered={setHovered}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const ThemeCard = ({ theme, index, onSelect, hovered, setHovered }) => {
    const isHovered = hovered === theme.id;
    const isDimmed = hovered && hovered !== theme.id;
    const Icon = theme.icon;

    return (
        <motion.div
            className={`relative group cursor-pointer rounded-xl overflow-hidden border transition-all duration-500 ease-out min-h-[400px]
                ${isHovered ? 'border-white/20 shadow-2xl shadow-black/50' : 'border-white/5 bg-white/[0.02]'}
                ${isDimmed ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100'}
            `}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(theme.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(theme.id)}
        >
            {/* Dynamic Background Gradient */}
            <div
                className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-0 transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : ''}`}
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 z-10">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-lg border transition-colors duration-500 ${isHovered ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10'}`}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className={`text-xs font-mono tracking-widest transition-colors duration-500 ${isHovered ? 'text-white' : 'text-white/20'}`}>
                        0{index + 1}
                    </div>
                </div>

                {/* Middle Section - Title */}
                <div className="space-y-4">
                    <h3 className={`text-3xl font-light tracking-tighter transition-transform duration-500 ${isHovered ? 'translate-x-2' : ''}`}>
                        {theme.name}
                    </h3>
                    <div className={`h-px w-12 bg-white/20 transition-all duration-500 ${isHovered ? 'w-full bg-white/50' : ''}`} />
                    <p className={`text-sm text-white/60 font-light leading-relaxed max-w-[80%] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
                        {theme.description}
                    </p>
                </div>

                {/* Bottom Section - Action */}
                <div className="flex items-center justify-between mt-auto pt-8">
                    <span className={`text-xs font-medium tracking-widest uppercase transition-colors duration-500 ${isHovered ? 'text-white' : 'text-white/30'}`}>
                        {isHovered ? 'Initialize' : 'Standby'}
                    </span>
                    <motion.div
                        animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowRight size={20} className="text-white" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
