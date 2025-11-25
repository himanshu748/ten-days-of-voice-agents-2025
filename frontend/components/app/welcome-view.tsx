import { motion } from 'motion/react';
import { ArrowRight, ClockCounterClockwise, Pulse, Target } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-sans">
      {/* 1. Enhanced Background with Floating Shapes */}
      <div className="from-secondary/40 to-primary/20 animate-float pointer-events-none absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br opacity-60 blur-[120px]" />
      <div className="from-primary/20 to-secondary/30 animate-float-delayed pointer-events-none absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl opacity-60 blur-[100px]" />
      <div className="pointer-events-none absolute top-[20%] right-[10%] h-[300px] w-[300px] animate-pulse rounded-full bg-teal-200/20 blur-[80px]" />

      {/* Academic Shapes (subtle) */}
      <div className="text-primary/5 pointer-events-none absolute top-[10%] left-[15%] rotate-12 text-8xl font-serif">
        A
      </div>
      <div className="text-primary/5 pointer-events-none absolute right-[20%] bottom-[15%] -rotate-12 text-6xl font-serif">
        ?
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Professional Brand Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Placeholder for Logo if needed, or just text */}
        </motion.div>

        {/* 2. Enhanced Sticker with Better Hover Effects */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="group relative mb-10 cursor-pointer"
        >
          <div className="relative z-10 h-32 w-32 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_25px_rgba(79,70,229,0.5)]">
            <span className="text-6xl">🎓</span>
          </div>
          {/* Enhanced Glow Effect */}
          <div className="from-primary/40 via-primary/30 to-primary/40 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
        </motion.div>

        {/* 3. Gradient Text Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          <h1 className="from-primary via-primary/80 to-primary animate-gradient-x bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow-sm md:text-7xl">
            Active Recall Coach
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed font-light md:text-2xl">
            Master concepts effectively. Learn, Quiz, and Teach-Back.
          </p>

          {/* Status Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ All Systems Running
            </span>
          </div>
        </motion.div>

        {/* 4. Enhanced Feature Pills with Better Animations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Pulse, text: 'Learn Concepts', color: 'text-indigo-500' },
            { icon: Target, text: 'Take Quizzes', color: 'text-blue-500' },
            { icon: ClockCounterClockwise, text: 'Teach Back & Score', color: 'text-amber-500' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="group text-foreground/80 hover:border-primary/30 flex cursor-default items-center gap-2 rounded-full border border-white/50 bg-white/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
            >
              <feature.icon
                className={`h-4 w-4 ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
              />
              {feature.text}
            </motion.div>
          ))}
        </motion.div>

        {/* 5. Enhanced CTA Button with Shine Effect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-primary/30 hover:shadow-primary/40 group relative overflow-hidden rounded-full border-2 border-transparent px-10 py-7 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:border-white/20 hover:shadow-2xl"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="relative z-10">Start Learning Session</span>
            <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-muted-foreground/60 absolute bottom-6 text-xs font-medium tracking-wide"
      >
        © 2025 ACTIVE RECALL COACH · POWERED BY MURF AI
      </motion.div>
    </div>
  );
}
