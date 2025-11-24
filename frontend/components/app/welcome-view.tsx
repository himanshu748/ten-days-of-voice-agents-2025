import { motion } from 'motion/react';
import { Button } from '@/components/livekit/button';
import { ArrowRight, Pulse, FileText, Heart } from '@phosphor-icons/react/dist/ssr';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-primary/20">

      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">

        {/* Logo / Icon Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center relative z-10 border border-border/50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5042BD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
            eka.care
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Your personal health assistant powered by AI.
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
            { icon: Pulse, text: "Vitals Tracking" },
            { icon: FileText, text: "Smart Records" },
            { icon: Heart, text: "Daily Check-ins" }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-border/50 rounded-full shadow-sm text-sm font-medium text-foreground/80">
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
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 group"
          >
            Start Check-in
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
        © 2025 EKA CARE · SECURE & PRIVATE
      </motion.div>
    </div>
  );
}
