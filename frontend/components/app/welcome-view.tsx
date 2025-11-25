import { motion } from 'motion/react';
import { ArrowRight, Brain, Lightning, Student, ChalkboardTeacher, Star } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30">

      {/* Dynamic Background Elements - Premium Deep Red/Gold Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-red-900/20 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-tl from-yellow-700/10 to-transparent blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-red-600/5 blur-[80px]" />
      </div>

      {/* Sophisticated Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-20 text-center">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 backdrop-blur-xl mb-8 shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]">
            <Star weight="fill" className="h-4 w-4 text-yellow-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">Democratizing Education</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 drop-shadow-2xl">
            Physics Wallah <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-gradient bg-300%">AI Coach</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10">
            Experience the future of learning with your personal AI tutor.
            <br />
            <span className="text-white font-medium">Master concepts through active dialogue.</span>
          </p>

          {/* Topics List - Premium Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Variables", "Loops", "Agentic AI", "MCP"].map((topic) => (
              <span key={topic} className="px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-sm font-medium text-neutral-300 shadow-sm hover:border-red-500/50 transition-colors">
                {topic}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-5xl"
        >
          {[
            {
              icon: Student,
              title: "Learn",
              desc: "Concepts explained simply.",
              gradient: "from-blue-500/20 to-blue-600/5",
              iconColor: "text-blue-400"
            },
            {
              icon: Lightning,
              title: "Quiz",
              desc: "Test your skills instantly.",
              gradient: "from-yellow-500/20 to-yellow-600/5",
              iconColor: "text-yellow-400"
            },
            {
              icon: ChalkboardTeacher,
              title: "Teach-Back",
              desc: "Prove you know it.",
              gradient: "from-red-500/20 to-red-600/5",
              iconColor: "text-red-400"
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md hover:border-white/10 transition-all duration-300 shadow-2xl"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 mb-6 rounded-2xl bg-black/40 p-4 ring-1 ring-white/10 shadow-inner">
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="relative z-10 text-sm text-neutral-400 font-medium">{feature.desc}</p>
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
            className="group relative px-10 py-8 text-lg font-bold text-white bg-red-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.6)] border-none ring-4 ring-red-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-[length:200%_100%] animate-shimmer" />
            <div className="relative flex items-center gap-3">
              <span>Start Learning Session</span>
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
        className="relative mt-auto mb-8 flex flex-col items-center gap-2 z-10"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase font-medium">
          Powered by LiveKit & Alakh Sir's Vision
        </span>
      </motion.div>
    </div>
  );
}
