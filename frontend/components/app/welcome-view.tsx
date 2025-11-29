import { motion } from 'motion/react';
import {
  Crosshair,
  ShieldChevron,
  Lightning,
  Trophy,
  Fire,
  CaretRight,
} from '@phosphor-icons/react/dist/ssr';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0F0F1A] font-sans text-white selection:bg-[#FFCC00]/30">
      {/* Energetic Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #FF6600 0%, transparent 60%)`,
        }}
      />

      {/* Floating Particles/Sparks */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-bounce absolute top-[15%] left-[20%] opacity-50"><Fire size={32} className="text-[#FF6600]" /></div>
        <div className="animate-pulse absolute top-[30%] right-[10%] opacity-50"><Lightning size={48} className="text-[#FFCC00]" /></div>
        <div className="animate-bounce absolute bottom-[20%] left-[10%] delay-300 opacity-50"><Trophy size={40} className="text-[#FFCC00]" /></div>
      </div>

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="mb-2 text-4xl font-black italic tracking-tighter text-[#FFCC00] uppercase md:text-6xl drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]">
            FREE FIRE <span className="text-white">INDIA</span>
          </h2>

          <div className="mb-12 flex items-center gap-2 text-lg font-bold tracking-widest text-white/90">
            <span className="text-[#FF6600]">BOOYAH!</span>
            <span className="mx-2 text-white/30">|</span>
            <span>SURVIVORS READY</span>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#FFCC00] bg-[#FFCC00] px-12 py-4 text-xl font-black tracking-wider text-black transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,204,0,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                BATTLE IN STYLE <CaretRight weight="bold" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Squad & Offers Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* Squad Section */}
          <div className="relative flex flex-col items-center rounded-2xl border border-[#FFCC00]/20 bg-black/40 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-2xl font-black italic text-white uppercase tracking-widest">
              <span className="text-[#FFCC00]">ELITE</span> SQUAD
            </h3>
            <div className="flex gap-4">
              <div className="group relative h-64 w-48 overflow-hidden rounded-xl border-2 border-white/10 transition-all hover:border-[#FFCC00] hover:scale-105">
                <img src="/ff-character-alok.png" alt="Alok" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-center">
                  <span className="font-bold text-[#FFCC00]">ALOK</span>
                </div>
              </div>
              <div className="group relative h-64 w-48 overflow-hidden rounded-xl border-2 border-white/10 transition-all hover:border-[#FF6600] hover:scale-105">
                <img src="/ff-character-kelly.png" alt="Kelly" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-center">
                  <span className="font-bold text-[#FF6600]">KELLY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="relative flex flex-col items-center rounded-2xl border border-[#FF6600]/20 bg-black/40 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-2xl font-black italic text-white uppercase tracking-widest">
              <span className="text-[#FF6600]">LIVE</span> EVENTS
            </h3>
            <div className="group relative w-full overflow-hidden rounded-xl border-2 border-white/10 transition-all hover:border-[#FFCC00] hover:shadow-[0_0_30px_rgba(255,204,0,0.3)]">
              <img src="/ff-offer-poster.png" alt="Special Airdrop" className="h-64 w-full object-cover" />
              <div className="absolute top-2 right-2 rounded-md bg-[#FF0000] px-3 py-1 font-bold text-white shadow-lg animate-pulse">
                LIMITED TIME
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Crosshair,
              title: 'BATTLE ROYALE',
              desc: 'Survive the shrinking zone.',
              color: 'text-[#FFCC00]',
            },
            {
              icon: ShieldChevron,
              title: 'SQUAD UP',
              desc: 'Lead your team to victory.',
              color: 'text-[#FF6600]',
            },
            {
              icon: Trophy,
              title: 'GET BOOYAH',
              desc: 'Be the last survivor standing.',
              color: 'text-[#FFCC00]',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#FFCC00]/50 hover:bg-white/10"
            >
              <feature.icon className={`mb-4 h-10 w-10 ${feature.color}`} weight="duotone" />
              <h3 className="mb-2 text-lg font-black italic text-white uppercase">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-2">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FF6600]" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
          GARENA INTERNATIONAL
        </span>
      </div>
    </div>
  );
}
