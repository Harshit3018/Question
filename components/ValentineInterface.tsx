'use client';

import { motion } from 'framer-motion';
import { Heart, Clock, Music } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ValentineInterfaceProps {
    variant?: 'romantic' | 'neutral';
}

export default function ValentineInterface({ variant = 'romantic' }: ValentineInterfaceProps) {
    const [hearts, setHearts] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Generate hearts periodically
        const interval = setInterval(() => {
            // Fewer hearts for neutral variant
            if (Math.random() > (variant === 'romantic' ? 0.6 : 0.8)) {
                setHearts(prev => [...prev.slice(-30), Date.now()]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [variant]);

    // Dynamic Background
    const bgClasses = variant === 'romantic'
        ? 'bg-gradient-to-br from-pink-200 via-rose-100 to-red-100 dark:from-rose-900 dark:to-gray-900'
        : 'bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-900';

    return (
        <div className={`relative flex flex-col items-center justify-center min-h-screen text-center transition-colors duration-1000 overflow-hidden ${bgClasses}`}>

            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {hearts.map((h, i) => (
                    <FloatingHeart key={h} offset={i % 5} variant={variant} />
                ))}
            </div>

            <div className={`z-10 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-2 max-w-2xl w-full mx-4 relative overflow-hidden transition-colors duration-1000 ${variant === 'romantic'
                    ? 'bg-white/60 dark:bg-black/40 border-white/50 dark:border-rose-900/30'
                    : 'bg-white/80 dark:bg-black/60 border-white/20 dark:border-gray-700/30'
                }`}>
                {variant === 'romantic' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-300/20 to-transparent blur-3xl rounded-full translate-y-1/2 translate-x-1/2 opacity-50" />
                )}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.div
                        animate={variant === 'romantic' ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <Heart className={`w-24 h-24 drop-shadow-lg transition-colors duration-1000 ${variant === 'romantic' ? 'text-rose-500 fill-rose-500' : 'text-slate-400 fill-slate-200'
                            }`} />
                    </motion.div>

                    <h1 className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent drop-shadow-sm font-serif leading-tight py-2 ${variant === 'romantic'
                            ? 'bg-gradient-to-r from-rose-600 to-pink-600'
                            : 'bg-gradient-to-r from-slate-600 to-gray-500'
                        }`}>
                        Happy February’s Day
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light italic">
                        {variant === 'romantic'
                            ? "\"Welcome to the world of your dreams , which you love the most.\""
                            : "Wishing you a wonderful day filled with love."}
                    </p>

                    <div className={`h-px w-32 my-4 ${variant === 'romantic' ? 'bg-rose-300' : 'bg-gray-300'}`} />

                    {variant === 'romantic' && (
                        <p className="text-lg text-rose-800 dark:text-rose-200 font-medium tracking-wide">
                            Till the path you wants to go.
                        </p>
                    )}

                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`p-3 rounded-full transition-all duration-300 ${isPlaying
                                    ? (variant === 'romantic' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 ring-2 ring-rose-300' : 'bg-slate-500 text-white shadow-lg')
                                    : 'bg-white/80 dark:bg-gray-800 text-gray-500 hover:bg-rose-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
                        </button>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border shadow-sm ${variant === 'romantic'
                                ? 'bg-white/80 dark:bg-gray-800 text-gray-500 border-gray-100 dark:border-gray-700'
                                : 'bg-white/80 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'
                            }`}>
                            <Clock className={`w-4 h-4 ${variant === 'romantic' ? 'text-rose-400' : 'text-slate-400'}`} />
                            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className={`absolute bottom-8 text-sm font-serif italic ${variant === 'romantic' ? 'text-rose-900/30 dark:text-rose-100/20' : 'text-gray-900/30 dark:text-gray-100/20'
                }`}>
                {variant === 'romantic' ? 'Made with love specifically for you' : 'Have a great day'}
            </div>
        </div>
    );
}

function FloatingHeart({ offset, variant }: { offset: number; variant?: 'romantic' | 'neutral' }) {
    const randomX = Math.random() * 100; // random percentage
    const duration = 5 + Math.random() * 5; // variable speed

    return (
        <motion.div
            className={`absolute bottom-[-50px] ${variant === 'romantic' ? 'text-pink-300/40 dark:text-rose-500/20' : 'text-gray-300/40 dark:text-gray-500/20'
                }`}
            initial={{ x: `${randomX}vw`, y: 0, scale: 0.5 + Math.random() * 0.5, opacity: 0 }}
            animate={{
                y: '-120vh',
                x: [`${randomX}vw`, `${randomX + (offset % 2 === 0 ? 10 : -10)}vw`],
                opacity: [0, 0.8, 0],
                rotate: [0, offset % 2 === 0 ? 45 : -45]
            }}
            transition={{
                duration: duration,
                ease: "linear",
                repeat: 0
            }}
        >
            <Heart className="w-12 h-12 fill-current" />
        </motion.div>
    );
}
