'use client';

import { motion } from 'motion/react';
import { LockKey, Fingerprint, Eye, Warning } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-mono text-cyan-500 selection:bg-cyan-500/30">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Warning className="h-6 w-6 text-red-500 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.5em] text-red-500 uppercase">
              Security Breach Detected
            </span>
            <Warning className="h-6 w-6 text-red-500 animate-pulse" />
          </div>

          <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-700 animate-glitch text-glow">
            THE ENIGMA
            <br />
            PROTOCOL
          </h1>

          <p className="mt-6 text-lg font-medium text-cyan-500/70 md:text-xl max-w-2xl mx-auto">
            You are trapped in a digital vault. The Overseer is watching.
            <br />
            Solve the puzzles. Escape the system.
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-none border-2 border-cyan-500 bg-cyan-500/10 px-12 py-4 text-xl font-bold tracking-wider text-cyan-500 transition-all duration-200 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              INITIATE ESCAPE <LockKey weight="bold" />
            </span>
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Fingerprint,
              title: 'IDENTITY UNKNOWN',
              desc: 'Who are you? Why are you here?',
            },
            {
              icon: Eye,
              title: 'THE OVERSEER',
              desc: 'He sees everything. Do not lie.',
            },
            {
              icon: LockKey,
              title: 'LOCKED OUT',
              desc: '10 minutes to bypass security.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center rounded-sm border border-cyan-500/30 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-cyan-500 hover:bg-cyan-500/10"
            >
              <feature.icon className="mb-4 h-10 w-10 text-cyan-500" weight="duotone" />
              <h3 className="mb-2 text-lg font-bold text-cyan-400 uppercase tracking-widest">{feature.title}</h3>
              <p className="text-sm text-cyan-500/60">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] text-cyan-900 uppercase">
          SYSTEM VERSION 9.0.1 // LOCKED
        </p>
      </div>
    </div>
  );
}
