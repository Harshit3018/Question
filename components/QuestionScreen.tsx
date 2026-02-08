'use client';

import { motion } from 'framer-motion';
import { Heart, HeartCrack } from 'lucide-react';
import { useState } from 'react';

interface QuestionScreenProps {
    onAccept: () => void;
    onReject: () => void;
}

export default function QuestionScreen({ onAccept, onReject }: QuestionScreenProps) {
    const [handleNoHover, setHandleNoHover] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full p-8 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-xl border border-pink-100 dark:border-pink-900/30"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-8 font-serif leading-tight"
                >
                    Do you want to be with me only in a relationship?
                </motion.h1>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAccept}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all text-lg w-full sm:w-auto justify-center"
                    >
                        <Heart className="w-5 h-5 fill-current" />
                        Yes, Forever
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onReject}
                        onMouseEnter={() => setHandleNoHover(true)}
                        onMouseLeave={() => setHandleNoHover(false)}
                        className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full font-medium hover:text-red-500 hover:border-red-200 transition-all text-lg w-full sm:w-auto justify-center relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <HeartCrack className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                            No, sorry
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
