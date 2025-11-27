import { motion } from 'motion/react';
import {
  ArrowRight,
  Lightning,
  Package,
  ShoppingBag,
  Timer,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#3C006B] font-sans text-white selection:bg-[#FF3269]/30">
      {/* Dynamic Background Elements - Zepto Theme */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] animate-float rounded-full bg-gradient-to-br from-[#FF3269]/20 to-transparent blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[800px] w-[800px] animate-float-delayed rounded-full bg-gradient-to-tl from-[#FFD700]/10 to-transparent blur-[100px]" />
      </div>

      {/* Floating Grocery Emojis */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[10%] text-6xl animate-float">🍎</div>
        <div className="absolute top-[20%] right-[15%] text-5xl animate-float-delayed">🥦</div>
        <div className="absolute bottom-[15%] left-[20%] text-7xl animate-float">🥛</div>
        <div className="absolute bottom-[25%] right-[10%] text-6xl animate-float-delayed">🍞</div>
        <div className="absolute top-[50%] left-[5%] text-4xl animate-float">🥕</div>
        <div className="absolute top-[40%] right-[5%] text-5xl animate-float-delayed">🧀</div>
      </div>

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF3269]/30 bg-[#FF3269]/10 px-5 py-2 shadow-sm backdrop-blur-xl">
            <Timer weight="fill" className="h-4 w-4 text-[#FF3269]" />
            <span className="text-xs font-bold tracking-widest text-[#FF3269] uppercase">
              10 Minute Delivery
            </span>
          </div>

          <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-white drop-shadow-sm md:text-8xl">
            Zepto <br />
            <span className="animate-gradient bg-300% bg-gradient-to-r from-[#FF3269] via-[#FFD700] to-[#FF3269] bg-clip-text text-transparent">
              Voice Assistant
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-slate-200 md:text-xl">
            Groceries delivered in 10 minutes.
            <br />
            <span className="font-medium text-white">
              Just speak to order your daily essentials.
            </span>
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
              icon: Lightning,
              title: 'Super Fast',
              desc: 'Delivery in 10 minutes or less.',
              gradient: 'from-[#FF3269]/20 to-[#3C006B]/10',
              iconColor: 'text-[#FF3269]',
            },
            {
              icon: ShoppingBag,
              title: 'Fresh Groceries',
              desc: 'Farm fresh fruits and vegetables.',
              gradient: 'from-[#FFD700]/20 to-[#3C006B]/10',
              iconColor: 'text-[#FFD700]',
            },
            {
              icon: Package,
              title: 'No Minimum Order',
              desc: 'Order as little as you need.',
              gradient: 'from-[#A855F7]/20 to-[#3C006B]/10',
              iconColor: 'text-[#A855F7]',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#FF3269]/30 hover:shadow-[#FF3269]/20"
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 mb-6 rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/20">
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="relative z-10 text-sm font-medium text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Zepto Pink Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            className="group relative overflow-hidden rounded-full border-none bg-[#FF3269] px-10 py-8 text-lg font-bold text-white ring-4 ring-[#FF3269]/30 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,50,105,0.5)]"
          >
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-[#FF3269] via-[#ff6b92] to-[#FF3269] bg-[length:200%_100%]" />
            <div className="relative flex items-center gap-3">
              <span>Start Shopping</span>
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
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
          Powered by LiveKit & Gemini
        </span>
      </motion.div>
    </div>
  );
}
