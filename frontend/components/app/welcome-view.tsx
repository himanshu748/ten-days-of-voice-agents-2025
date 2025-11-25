import { motion } from 'motion/react';
import { ArrowRight, Brain, Lightning, Student, ChalkboardTeacher } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  onStart: () => void;
}

export function WelcomeView({ onStart }: WelcomeViewProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white font-sans selection:bg-red-500/30">

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-red-900/10 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[15%] h-[300px] w-[300px] rounded-full bg-red-500/5 blur-[80px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-red-400 uppercase">AI-Powered Learning</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400 mb-6 drop-shadow-2xl">
            Active Recall <br />
            <span className="text-red-600">Coach</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            Master any subject through the power of <span className="text-white font-medium">dialogue</span>.
            Learn, quiz, and teach back to an AI tutor designed for deep understanding.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full"
        >
          {[
            {
              icon: Student,
              title: "Learn",
              desc: "Interactive lessons tailored to you.",
              color: "group-hover:text-red-400"
            },
            {
              icon: Lightning,
              title: "Quiz",
              desc: "Test your knowledge in real-time.",
              color: "group-hover:text-red-400"
            },
            {
              icon: ChalkboardTeacher,
              title: "Teach-Back",
              desc: "Reinforce by teaching the AI.",
              color: "group-hover:text-red-400"
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className={`mb-4 rounded-full bg-white/5 p-4 ring-1 ring-white/10 transition-colors ${feature.color}`}>
                <feature.icon className="h-8 w-8 text-neutral-300 transition-colors group-hover:text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            className="group relative px-8 py-8 text-lg font-bold text-white bg-red-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] border-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transition-all group-hover:opacity-90" />
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
        className="absolute bottom-8 text-neutral-600 text-xs tracking-widest uppercase"
      >
        Powered by LiveKit & Murf AI
      </motion.div>
    </div>
  );
}
