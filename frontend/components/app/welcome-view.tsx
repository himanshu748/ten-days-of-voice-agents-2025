import { motion } from 'motion/react';
import { Button } from '@/components/livekit/button';
import { ArrowRight, Pulse, Target, ClockCounterClockwise } from '@phosphor-icons/react/dist/ssr';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-primary/20">

      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/40 rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-teal-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">

        {/* Sticker / Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="mb-10 relative group"
        >
          <div className="w-32 h-32 relative z-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <img src="/tata1mg-sticker.svg" alt="Tata 1mg Sticker" className="w-full h-full drop-shadow-2xl" />
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse opacity-50" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary drop-shadow-sm">
            Daily Wellness Companion
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            A supportive voice companion for daily check-ins about your mood, energy, and goals.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Pulse, text: "Mood & Energy Tracking" },
            { icon: Target, text: "Daily Goal Setting" },
            { icon: ClockCounterClockwise, text: "Progress History" }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm text-sm font-medium text-foreground/80 hover:bg-white/90 transition-colors">
              <feature.icon className="w-4 h-4 text-primary" />
              {feature.text}
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/40 group border-2 border-transparent hover:border-white/20"
          >
            Start Your Daily Check-in
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
