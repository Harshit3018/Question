'use client';

import { motion } from 'framer-motion';
import { Heart, Clock, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import PhotoGallery from './PhotoGallery';

interface ValentineInterfaceProps {
    variant?: 'romantic' | 'neutral';
}

export default function ValentineInterface({ variant = 'romantic' }: ValentineInterfaceProps) {
    const [hearts, setHearts] = useState<number[]>([]);

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

    // Dynamic Background with "Pure Pink" for romantic variant
    const bgClasses = variant === 'romantic'
        ? 'bg-gradient-to-br from-[#ffc0cb] via-[#ff69b4] to-[#ff1493] dark:from-[#2d0010] dark:to-[#1a0008]' // Light pink to Deep pink
        : 'bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-900';

    const textGradient = variant === 'romantic'
        ? 'bg-white text-transparent bg-clip-text drop-shadow-md'
        : 'bg-gradient-to-r from-slate-600 to-gray-500 bg-clip-text text-transparent';

    return (
        <div className={`relative flex flex-col items-center min-h-screen text-center transition-colors duration-1000 overflow-x-hidden ${bgClasses}`}>

            {/* Floating Hearts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {hearts.map((h, i) => (
                    <FloatingHeart key={h} offset={i % 5} variant={variant} />
                ))}
            </div>

            <div className="z-10 w-full flex flex-col items-center pt-20 pb-40 px-4 space-y-24">

                {/* HERO SECTION */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6 max-w-4xl"
                >
                    <motion.div
                        animate={variant === 'romantic' ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <Heart className={`w-32 h-32 drop-shadow-xl ${variant === 'romantic' ? 'text-white fill-white/80' : 'text-slate-400 fill-slate-200'
                            }`} />
                    </motion.div>

                    <h1 className={`text-5xl md:text-7xl font-bold font-serif leading-tight py-4 ${textGradient}`}>
                        Happy Valentine’s Day
                    </h1>

                    <p className={`text-xl md:text-3xl font-light italic max-w-2xl ${variant === 'romantic' ? 'text-white/90' : 'text-gray-500'
                        }`}>
                        {variant === 'romantic'
                            ? "\"Every love story is beautiful, but ours is my favorite.\""
                            : "Wishing you a wonderful day filled with love."}
                    </p>

                    <div className={`h-1 w-32 my-6 rounded-full ${variant === 'romantic' ? 'bg-white/50' : 'bg-gray-300'}`} />

                    {variant === 'romantic' && (
                        <p className="text-2xl text-white font-medium tracking-widest uppercase drop-shadow-sm">
                            Forever starts with us
                        </p>
                    )}

                    {/* Date Display */}
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-mono border shadow-sm backdrop-blur-md mt-8 ${variant === 'romantic'
                            ? 'bg-white/20 text-white border-white/30'
                            : 'bg-white/80 text-gray-500 border-gray-200'
                        }`}>
                        <Clock className={`w-4 h-4 ${variant === 'romantic' ? 'text-white' : 'text-slate-400'}`} />
                        <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </motion.div>

                {/* EXTRA CONTENT FOR ROMANTIC VIEW */}
                {variant === 'romantic' && (
                    <>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-10" />

                        <PhotoGallery />

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-10" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 text-white text-left shadow-2xl"
                        >
                            <h3 className="text-3xl font-serif mb-6 text-center">My Promise to You</h3>
                            <p className="text-lg leading-relaxed font-light mb-4">
                                From the moment you said "Yes", my world turned pink. I promise to cherish every laugh, wipe away every tear, and hold your hand through every storm.
                            </p>
                            <p className="text-lg leading-relaxed font-light">
                                You are my song, my muse, and my forever Valentine. Let's make memories that outlast the stars.
                            </p>
                            <div className="mt-8 text-right font-serif text-2xl italic opacity-80">
                                - Yours Always
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {variant === 'romantic' && (
                <MusicPlayer />
            )}

            <div className={`absolute bottom-4 text-sm font-serif italic ${variant === 'romantic' ? 'text-white/40' : 'text-gray-400'
                }`}>
                {variant === 'romantic' ? 'Made with love specifically for you' : 'Have a great day'}
            </div>
        </div>
    );
}

function FloatingHeart({ offset, variant }: { offset: number; variant?: 'romantic' | 'neutral' }) {
    const randomX = Math.random() * 100; // random percentage
    const duration = 5 + Math.random() * 5; // variable speed
    const size = 20 + Math.random() * 30;

    return (
        <motion.div
            className={`absolute bottom-[-50px] ${variant === 'romantic' ? 'text-white/20' : 'text-gray-300/40'
                }`}
            initial={{ x: `${randomX}vw`, y: 0, scale: 0.5 + Math.random() * 0.5, opacity: 0 }}
            animate={{
                y: '-120vh',
                x: [`${randomX}vw`, `${randomX + (offset % 2 === 0 ? 10 : -10)}vw`],
                opacity: [0, 0.6, 0],
                rotate: [0, offset % 2 === 0 ? 45 : -45]
            }}
            transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 5
            }}
        >
            <Heart style={{ width: size, height: size }} className="fill-current" />
        </motion.div>
    );
}
