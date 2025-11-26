import { motion } from 'motion/react';
import { ArrowRight, TrendUp, Globe, Lightning, Star } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-white font-sans text-slate-900 selection:bg-blue-500/30">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-50/80 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-red-50/50 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 flex w-full flex-col lg:flex-row">

        {/* Left Column: Content */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">Reliance Group AI</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-7xl">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-red-600">
                India's Tomorrow
              </span>
            </h1>

            <p className="mb-10 text-lg leading-relaxed text-slate-600 md:text-xl">
              Experience the future of enterprise interaction. From
              <span className="font-semibold text-slate-800"> digital services </span>
              to
              <span className="font-semibold text-slate-800"> new energy</span>,
              explore how we are driving growth for the nation.
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={onStart}
                className="group relative h-14 overflow-hidden rounded-full bg-blue-700 px-8 text-lg font-semibold text-white shadow-lg shadow-blue-700/20 transition-all hover:scale-105 hover:bg-blue-800 hover:shadow-blue-700/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="flex items-center gap-2">
                  Start Conversation
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>

            {/* Stats / Trust */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Years of Trust</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100+</p>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Global Brands</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">#1</p>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">In Innovation</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visuals */}
        <div className="relative flex flex-1 items-center justify-center bg-slate-50/50 px-8 py-12 lg:bg-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-lg"
          >
            {/* Abstract Orb/Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-600/20 via-red-500/20 to-blue-400/20 blur-[60px] animate-pulse-slow" />

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="col-span-2 rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-slate-900">Jio Digital Life</h3>
                <p className="text-sm text-slate-600">Connecting everyone, everywhere.</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-red-100 p-3 text-red-600">
                  <Lightning className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-slate-900">New Energy</h3>
                <p className="text-sm text-slate-600">Green future.</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <TrendUp className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-slate-900">Retail</h3>
                <p className="text-sm text-slate-600">India's largest.</p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-4 top-10 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-slate-700">System Online</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
          Growth is Life
        </span>
      </div>
    </div>
  );
}
