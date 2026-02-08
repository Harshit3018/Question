'use client';
import { motion } from 'framer-motion';
import { MEMORY_PHOTOS } from '@/constants/romantic';

export default function PhotoGallery() {
    return (
        <div className="w-full max-w-4xl px-4 py-8">
            <h2 className="text-3xl font-serif text-white/90 text-center mb-10 drop-shadow-md">
                Our Memories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                {MEMORY_PHOTOS.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                        className={`
              relative group cursor-pointer 
              ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              bg-white p-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500
            `}
                    >
                        <div className="overflow-hidden rounded-md aspect-[4/5] md:aspect-auto h-full">
                            <img
                                src={photo.url}
                                alt={photo.caption}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-6">
                            <p className="text-white font-medium text-lg font-serif italic drop-shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                "{photo.caption}"
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
