'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music as MusicIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC_PLAYLIST } from '@/constants/romantic';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const currentTrack = MUSIC_PLAYLIST[currentTrackIndex];

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl max-w-sm w-full"
        >
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400 shadow-md flex-shrink-0 animate-spin-slow" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                    <img src={currentTrack.cover} alt="Album Art" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <MusicIcon className="w-4 h-4 text-white" />
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <h3 className="text-white font-medium text-sm truncate">{currentTrack.title}</h3>
                    <p className="text-pink-200 text-xs truncate">{currentTrack.artist}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={prevTrack} className="p-1.5 hover:bg-white/10 rounded-full text-pink-100 transition">
                        <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="p-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white shadow-lg shadow-pink-500/40 transition active:scale-95"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current pl-0.5" />}
                    </button>

                    <button onClick={nextTrack} className="p-1.5 hover:bg-white/10 rounded-full text-pink-100 transition">
                        <SkipForward className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack.url}
                onEnded={nextTrack}
                className="hidden"
            />
        </motion.div>
    );
}
