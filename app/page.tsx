'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionScreen from '@/components/QuestionScreen';
import ValentineInterface from '@/components/ValentineInterface';
import { HeartCrack } from 'lucide-react';

type ViewState = 'loading' | 'question' | 'accepted' | 'rejection_message' | 'neutral';

export default function Home() {
  const [view, setView] = useState<ViewState>('loading');

  useEffect(() => {
    // Check local storage on mount
    const visited = localStorage.getItem('firstVisitCompleted');
    if (visited) {
      // Returning visitors always see the main Valentine interface
      setView('accepted');
    } else {
      setView('question');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('firstVisitCompleted', 'true');
    localStorage.setItem('answer', 'yes');
    setView('accepted');
  };

  const handleReject = () => {
    localStorage.setItem('firstVisitCompleted', 'true');
    localStorage.setItem('answer', 'no');
    setView('rejection_message');

    // Show message for 3 seconds then go to neutral interface
    setTimeout(() => {
      setView('neutral');
    }, 3500);
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 bg-pink-300 rounded-full"
        />
      </div>
    );
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        {view === 'question' && (
          <motion.div
            key="question"
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <QuestionScreen onAccept={handleAccept} onReject={handleReject} />
          </motion.div>
        )}

        {view === 'rejection_message' && (
          <motion.div
            key="rejection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-8 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <HeartCrack className="w-16 h-16 text-gray-400 mb-6 mx-auto" />
              <h2 className="text-2xl text-gray-600 font-serif mb-2">That’s okay.</h2>
              <p className="text-gray-500">Thank you for being honest.</p>
            </motion.div>
          </motion.div>
        )}

        {(view === 'accepted' || view === 'neutral') && (
          <motion.div
            key="interface"
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
          >
            <ValentineInterface variant={view === 'neutral' ? 'neutral' : 'romantic'} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
