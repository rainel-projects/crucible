import { motion } from 'framer-motion';

export const Logo = ({ size = "normal", className = "" }) => {
    const isLarge = size === "large";

    return (
        <motion.div
            className={`relative flex items-center gap-3 font-bold tracking-tighter select-none ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={`relative flex items-center justify-center bg-foreground text-background font-black rounded-sm overflow-hidden ${isLarge ? "w-16 h-16 text-4xl" : "w-8 h-8 text-xl"}`}>
                <motion.span
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    C
                </motion.span>
                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 bg-white/30 skew-x-12"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 5 }}
                />
            </div>
            <div className={`flex flex-col leading-none ${isLarge ? "gap-1" : ""}`}>
                <span className={isLarge ? "text-4xl" : "text-xl"}>CRUCIBLE</span>
                {isLarge && <span className="text-xs font-normal opacity-50 tracking-[0.2em] uppercase">System v1.0</span>}
            </div>
        </motion.div>
    );
};
