'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Crown, Tag } from '@phosphor-icons/react/dist/ssr';

interface Deal {
  id: string;
  name: string;
  price: number;
  description: string;
}

const DEALS: Deal[] = [
  {
    id: 'kfc-005',
    name: 'Ultimate Savings Bucket',
    price: 699,
    description: '4pc Hot & Crispy, 6 Hot Wings, 2 Dips & Pepsi.',
  },
  {
    id: 'kfc-006',
    name: 'Wednesday Bucket',
    price: 599,
    description: '10pc Hot & Crispy Chicken (Special Offer).',
  },
  {
    id: 'kfc-013',
    name: 'Super Snacker Deal',
    price: 399,
    description: '2 Zinger Burgers + Medium Fries.',
  },
];

export function DealsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEALS.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl">
      <div className="absolute top-0 left-0 z-10 flex items-center gap-1 rounded-br-xl bg-[#E4002B] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
        <Crown weight="fill" className="h-3 w-3 text-white" />
        KFC Special
      </div>

      <div className="relative h-32 w-full p-4 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex h-full flex-col justify-between"
          >
            <div>
              <h3 className="text-lg leading-tight font-black text-black uppercase">
                {DEALS[currentIndex].name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs font-medium text-black/60">
                {DEALS[currentIndex].description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 rounded-full bg-[#E4002B]/10 px-2 py-1">
                <Tag className="h-3 w-3 text-[#E4002B]" />
                <span className="text-xs font-bold text-black">Limited Time</span>
              </div>
              <span className="text-xl font-black text-[#E4002B]">
                ₹{DEALS[currentIndex].price}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {DEALS.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-[#E4002B]' : 'w-1 bg-black/10'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
