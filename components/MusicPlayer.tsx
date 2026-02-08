'use client';

import { useState } from 'react';
import { SkipForward, SkipBack, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC_PLAYLIST } from '@/constants/romantic';

export default function MusicPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const totalTracks = MUSIC_PLAYLIST.length;

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % totalTracks);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + totalTracks) % totalTracks);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl max-w-sm w-full"
        >
            <div className="flex flex-col gap-3">
                {/* Spotify Embed */}
                <div className="w-full h-[80px] rounded-lg overflow-hidden bg-black/20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTrackIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full h-full"
                        >
                            <iframe
                                src={MUSIC_PLAYLIST[currentTrackIndex].spotifyEmbedUrl}
                                width="100%"
                                height="80"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title={MUSIC_PLAYLIST[currentTrackIndex].title}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Custom Controls (Visual Only for Navigation) */}
                <div className="flex items-center justify-between px-2">
                    <button onClick={prevTrack} className="p-2 hover:bg-white/10 rounded-full text-pink-100 transition" aria-label="Previous Song">
                        <SkipBack className="w-5 h-5" />
                    </button>

                    <span className="text-pink-100 text-xs font-mono">
                        {currentTrackIndex + 1} / {totalTracks}
                    </span>

                    <button onClick={nextTrack} className="p-2 hover:bg-white/10 rounded-full text-pink-100 transition" aria-label="Next Song">
                        <SkipForward className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
