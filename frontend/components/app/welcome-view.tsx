import { motion } from 'motion/react';
import {
  Target,
  Crosshair,
  ShieldChevron,
  Radio,
  Skull,
  MapTrifold,
  CaretRight,
} from '@phosphor-icons/react/dist/ssr';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-black font-mono text-green-500 selection:bg-green-500/30">
      {/* Tactical Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm95eGZqY3J5eGZqY3J5eGZqY3J5eGZqY3J5eGZqY3J5eGZqY3J5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif')] opacity-[0.02] bg-cover" />

      {/* Floating Tactical Icons */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
        <div className="animate-pulse absolute top-[10%] left-[10%]"><Crosshair size={64} /></div>
        <div className="animate-pulse absolute top-[20%] right-[15%] delay-700"><Target size={48} /></div>
        <div className="animate-pulse absolute bottom-[15%] left-[20%] delay-300"><Radio size={56} /></div>
        <div className="animate-pulse absolute right-[10%] bottom-[25%] delay-500"><MapTrifold size={64} /></div>
      </div>

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'circOut' }}
          className="mb-16 flex flex-col items-center"
        >
          {/* Logo Removed */}

          <h2 className="mb-2 text-2xl font-bold tracking-[0.5em] text-white uppercase md:text-3xl">
            Voice Ops
          </h2>

          <div className="mb-12 flex items-center gap-2 text-sm font-bold tracking-widest text-green-500/80">
            <span className="animate-pulse">●</span> SYSTEM ONLINE
            <span className="mx-2">|</span>
            <span>SECURE CHANNEL</span>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border-2 border-green-500 bg-green-500/10 px-12 py-4 text-xl font-bold tracking-widest text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-black hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                DEPLOY <CaretRight weight="bold" />
              </span>
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </motion.div>
        </motion.div>

        {/* Mission Parameters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3"
        >
          {[
            {
              icon: Skull,
              title: 'HOSTILE FORCES',
              desc: 'Engage enemy combatants in real-time scenarios.',
            },
            {
              icon: ShieldChevron,
              title: 'TACTICAL OPS',
              desc: 'Execute high-stakes missions with precision.',
            },
            {
              icon: Radio,
              title: 'COMMS CHECK',
              desc: 'Direct communication with Command HQ.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center border border-green-500/20 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-green-500/5"
            >
              {/* Corner Markers */}
              <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-green-500" />
              <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-green-500" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-green-500" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-green-500" />

              <feature.icon className="mb-4 h-8 w-8 text-green-500" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase">{feature.title}</h3>
              <p className="text-xs text-green-500/70">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-2">
        <div className="h-px w-24 bg-green-500/30" />
        <span className="text-[10px] font-bold tracking-[0.3em] text-green-500/50 uppercase">
          CLASSIFIED // EYES ONLY
        </span>
      </div>
    </div>
  );
}
