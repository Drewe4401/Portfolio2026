import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [phase, setPhase] = useState<'draw' | 'fill' | 'zoom' | 'complete'>('draw');

    useEffect(() => {
        const fillTimer = setTimeout(() => setPhase('fill'), 1500);
        const zoomTimer = setTimeout(() => setPhase('zoom'), 3000);
        const completeTimer = setTimeout(() => {
            setPhase('complete');
            onComplete();
        }, 4500); // Allow full time for zoom and fade to finish

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(zoomTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence mode="wait">
            {phase !== 'complete' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                    {/* Background Layer - Fades out during zoom */}
                    <motion.div
                        className="absolute inset-0 bg-black z-0"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                    />

                    {/* Content Layer - Scales up during zoom */}
                    <motion.div
                        className="relative z-10 w-64 h-64 md:w-96 md:h-96"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={phase === 'zoom' ? { scale: 50, opacity: 0 } : { scale: 1, opacity: 1 }}
                        transition={{
                            scale: { duration: 1.2, ease: [0.7, 0, 0.3, 1] },
                            opacity: { duration: 0.5, delay: 0.7 } // Fade out only after zoom fills screen
                        }}
                    >
                        <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                        >
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>

                            {/* Animated Paths */}
                            <motion.path
                                d="M 30 85 L 50 15"
                                fill="transparent"
                                stroke="url(#grad1)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 70 85 L 50 15"
                                fill="transparent"
                                stroke="url(#grad2)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                            />
                            <motion.path
                                d="M 38 55 L 62 55"
                                fill="transparent"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                            />
                        </svg>

                        {/* Name Text - Scales with logo */}
                        <motion.div
                            className="absolute -bottom-16 left-0 right-0 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: phase === 'fill' || phase === 'zoom' ? 1 : 0, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-3xl font-bold tracking-[0.4em] text-white font-mono">
                                ANDREW
                            </h1>
                        </motion.div>
                    </motion.div>

                    {/* Progress Bar - Fades out before zoom */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-white/10 rounded-full overflow-hidden z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: phase === 'zoom' ? "100%" : "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
