import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  LockKey,
  WarningCircle,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-auto bg-slate-950 font-sans text-white selection:bg-red-500/30">
      {/* Dynamic Background Elements - SecureBank Theme */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] animate-pulse rounded-full bg-gradient-to-br from-red-600/40 to-transparent blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[800px] w-[800px] animate-pulse rounded-full bg-gradient-to-tl from-orange-600/30 to-transparent blur-[100px] delay-1000" />
      </div>

      {/* Sophisticated Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem] opacity-40" />

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          {/* Security Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-900/20 px-5 py-2 shadow-sm backdrop-blur-xl">
            <ShieldCheck weight="fill" className="h-4 w-4 animate-pulse text-red-500" />
            <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
              Fraud Protection Active
            </span>
          </div>

          <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-white drop-shadow-sm md:text-8xl">
            Airtel Payments Bank <br />
            <span className="animate-gradient bg-300% bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Fraud Alert
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-slate-400 md:text-xl">
            We have detected a suspicious transaction on your account.
            <br />
            <span className="font-medium text-white">Please verify your activity immediately.</span>
          </p>
        </motion.div>

        {/* Feature Cards - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: WarningCircle,
              title: 'Suspicious Activity',
              desc: "Unusual transaction pattern detected.",
              gradient: 'from-orange-500/20 to-red-600/10',
              iconColor: 'text-orange-500',
            },
            {
              icon: LockKey,
              title: 'Secure Verification',
              desc: 'Identity confirmation via voice security.',
              gradient: 'from-red-500/20 to-red-600/10',
              iconColor: 'text-red-500',
            },
            {
              icon: PhoneCall,
              title: 'Instant Resolution',
              desc: 'Speak directly with our Bank Support AI.',
              gradient: 'from-red-500/20 to-orange-600/10',
              iconColor: 'text-red-400',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:shadow-red-900/20"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 mb-6 rounded-2xl bg-black/50 p-4 shadow-sm ring-1 ring-white/10">
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-bold text-white">{feature.title}</h3>
              <p className="relative z-10 text-sm font-medium text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Premium Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            className="group relative overflow-hidden rounded-full border-none bg-red-600 px-10 py-8 text-lg font-bold text-white ring-4 ring-red-900/50 transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)]"
          >
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-[length:200%_100%]" />
            <div className="relative flex items-center gap-3">
              <span>Connect to Bank Support</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 mt-auto mb-8 flex flex-col items-center gap-2"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <span className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">
          Powered by LiveKit & Airtel Payments Bank
        </span>
      </motion.div>
    </div>
  );
}
