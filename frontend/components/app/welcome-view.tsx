import { motion } from 'motion/react';
import { Button } from '@/components/livekit/button';
import { ArrowRight, Pulse, Target, ClockCounterClockwise } from '@phosphor-icons/react/dist/ssr';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-primary/20">

      {/* 1. Enhanced Background with Floating Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-secondary/40 to-primary/20 rounded-full blur-[120px] pointer-events-none opacity-60 animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-primary/20 to-secondary/30 rounded-full blur-[100px] pointer-events-none opacity-60 animate-float-delayed" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-teal-200/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />

      {/* Medical Cross Shapes (subtle) */}
      <div className="absolute top-[10%] left-[15%] text-primary/5 text-8xl rotate-12 pointer-events-none">+</div>
      <div className="absolute bottom-[15%] right-[20%] text-primary/5 text-6xl -rotate-12 pointer-events-none">+</div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">

        {/* 2. Enhanced Sticker with Better Hover Effects */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="mb-10 relative group cursor-pointer"
        >
          <div className="w-32 h-32 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_25px_rgba(254,111,97,0.5)]">
            <img src="/tata1mg-sticker.svg" alt="Tata 1mg Sticker" className="w-full h-full drop-shadow-2xl" />
          </div>
          {/* Enhanced Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40 rounded-full blur-3xl animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-150" />
        </motion.div>

        {/* 3. Gradient Text Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent drop-shadow-sm animate-gradient-x">
            Daily Wellness Companion
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            A supportive voice companion for daily check-ins about your mood, energy, and goals.
          </p>

          {/* Status Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Pulse, text: "Mood & Energy Tracking", color: "text-rose-500" },
            { icon: Target, text: "Daily Goal Setting", color: "text-blue-500" },
            { icon: ClockCounterClockwise, text: "Progress History", color: "text-amber-500" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm text-sm font-medium text-foreground/80 hover:bg-white hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <feature.icon className={`w-4 h-4 ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`} />
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
            className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 group border-2 border-transparent hover:border-white/20"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">Start Your Daily Check-in</span>
            <ArrowRight className="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 text-xs text-muted-foreground/60 font-medium tracking-wide"
      >
        © 2025 TATA 1MG · SECURE & PRIVATE
      </motion.div>
    </div>
  );
}
