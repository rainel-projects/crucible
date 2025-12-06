import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Globe, Database, Layers } from 'lucide-react';

const languages = [
    {
        id: 'python',
        name: 'PYTHON',
        icon: Terminal,
        description: 'Data Science & AI',
        color: '#3b82f6', // Blue
    },
    {
        id: 'javascript',
        name: 'JAVASCRIPT',
        icon: Globe,
        description: 'Web Development',
        color: '#eab308', // Yellow
    },
    {
        id: 'rust',
        name: 'RUST',
        icon: Cpu,
        description: 'Systems Programming',
        color: '#ef4444', // Red
    },
    {
        id: 'go',
        name: 'GO',
        icon: Layers,
        description: 'Cloud Infrastructure',
        color: '#06b6d4', // Cyan
    },
    {
        id: 'cpp',
        name: 'C++',
        icon: Code2,
        description: 'Game Engine & Performance',
        color: '#3b82f6', // Blue
    }
];

export const LanguageSelector = ({ onSelect }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-background to-secondary -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            <motion.div
                className="text-center mb-16 space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-sm font-medium tracking-[0.3em] text-white/40 uppercase">
                    Welcome to your Crucible Space
                </h2>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                    CHOOSE YOUR MASTERY
                </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
                {languages.map((lang, index) => (
                    <LanguageCard
                        key={lang.id}
                        lang={lang}
                        index={index}
                        onSelect={() => onSelect(lang.id)}
                        hovered={hovered}
                        setHovered={setHovered}
                    />
                ))}
            </div>
        </div>
    );
};

const LanguageCard = ({ lang, index, onSelect, hovered, setHovered }) => {
    const isHovered = hovered === lang.id;
    const isDimmed = hovered && hovered !== lang.id;
    const Icon = lang.icon;

    return (
        <motion.button
            className={`relative group h-32 w-full rounded-xl border overflow-hidden transition-all duration-300 text-left p-6 flex items-center gap-6
                ${isHovered
                    ? 'border-white/20 bg-white/[0.03]'
                    : 'border-white/5 bg-transparent hover:border-white/10'
                }
                ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onMouseEnter={() => setHovered(lang.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={onSelect}
        >
            {/* Hover Gradient */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, ${lang.color}, transparent)` }}
            />

            {/* Icon Box */}
            <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-colors duration-300
                    ${isHovered
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/5 border-white/5 text-white/40'
                    }
                `}
                style={{ color: isHovered ? lang.color : undefined }}
            >
                <Icon size={24} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/70'}`}>
                        {lang.name}
                    </h3>
                </div>
                <p className={`text-xs font-mono mt-1 transition-colors duration-300 ${isHovered ? 'text-white/60' : 'text-white/30'}`}>
                    {lang.description}
                </p>
            </div>

            {/* Selection Indicator */}
            <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            />
        </motion.button>
    );
};
