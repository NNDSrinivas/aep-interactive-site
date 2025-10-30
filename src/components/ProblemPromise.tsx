"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ProblemPoint {
  title: string;
  description: string;
  icon: string;
}

const problems: ProblemPoint[] = [
  {
    title: "Context Loss",
    description: "Teams lose context across tools and handoffs",
    icon: "🔗"
  },
  {
    title: "PR Bottlenecks", 
    description: "Code reviews pile up, slowing velocity",
    icon: "⚡"
  },
  {
    title: "Dependency Drift",
    description: "Technical debt and toil accumulate",
    icon: "🔄"
  }
];

const solutions: ProblemPoint[] = [
  {
    title: "Persistent Memory",
    description: "AEP maintains context across all interactions",
    icon: "🧠"
  },
  {
    title: "Autonomous PRs",
    description: "Self-managing code reviews and merges",
    icon: "🚀"
  },
  {
    title: "Self-Healing Ops",
    description: "Proactive dependency and infrastructure management",
    icon: "🔧"
  }
];

function AEPOrb({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main orb */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
          opacity: isActive ? [0.8, 1, 0.8] : 0.7
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,255,209,0.8) 0%, rgba(58,12,163,0.4) 70%, transparent 100%)",
          boxShadow: "0 0 40px rgba(0,255,209,0.3)"
        }}
      >
        <span className="text-2xl font-bold text-white">AEP</span>
      </motion.div>

      {/* Pulse rings */}
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-[#00FFD1]/30"
              animate={{
                scale: [1, 2.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Energy threads - these will connect to problem cards */}
      {isActive && (
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          {problems.map((_, index) => (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2={`${-20 - index * 5}%`}
              y2={`${30 + index * 20}%`}
              stroke="url(#energyGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isActive ? 1 : 0, 
                opacity: isActive ? 0.7 : 0 
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5 + index * 0.3,
                ease: "easeOut"
              }}
              style={{ filter: "drop-shadow(0 0 4px rgba(0,255,209,0.6))" }}
            />
          ))}
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFD1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3A0CA3" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}

function ProblemCard({ problem, index, inView }: { 
  problem: ProblemPoint; 
  index: number; 
  inView: boolean; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ 
        x: inView ? 0 : -100, 
        opacity: inView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-red-500/20 bg-red-950/10 p-6 backdrop-blur transition-all duration-300 hover:border-red-400/40 hover:bg-red-950/20"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-red-500/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="mb-3 text-2xl">{problem.icon}</div>
        <h3 className="mb-2 font-[var(--font-grotesk)] text-xl font-semibold text-red-300">
          {problem.title}
        </h3>
        <p className="text-sm text-white/70">{problem.description}</p>
      </div>

      {/* Connection point for energy threads */}
      <motion.div
        className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-red-400"
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0.7, 1, 0.7] : 0.5
        }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
}

function SolutionCard({ solution, index, inView }: { 
  solution: ProblemPoint; 
  index: number; 
  inView: boolean; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ 
        x: inView ? 0 : 100, 
        opacity: inView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: 1 + index * 0.2,
        ease: "easeOut"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-[#00FFD1]/20 bg-[#00FFD1]/5 p-6 backdrop-blur transition-all duration-300 hover:border-[#00FFD1]/40 hover:bg-[#00FFD1]/10"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#00FFD1]/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="mb-3 text-2xl">{solution.icon}</div>
        <h3 className="mb-2 font-[var(--font-grotesk)] text-xl font-semibold text-[#00FFD1]">
          {solution.title}
        </h3>
        <p className="text-sm text-white/70">{solution.description}</p>
      </div>

      {/* Connection point indicator */}
      <motion.div
        className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD1]"
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          opacity: isHovered ? [0.7, 1, 0.7] : 0.5
        }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
}

export default function ProblemPromise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-[var(--font-grotesk)] text-4xl font-bold">
            <span className="text-red-300">The Problem</span>
            <span className="mx-4 text-white/30">→</span>
            <span className="bg-aep-gradient bg-clip-text text-transparent">AEP&apos;s Promise</span>
          </h2>
          <p className="text-white/70">
            Traditional development workflows break down. AEP rebuilds them autonomously.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Problems Column */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <ProblemCard 
                  key={problem.title}
                  problem={problem} 
                  index={index} 
                  inView={inView} 
                />
              ))}
            </div>
          </div>

          {/* AEP Orb Column */}
          <div className="flex items-center justify-center lg:col-span-1">
            <AEPOrb isActive={inView} />
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <SolutionCard 
                  key={solution.title}
                  solution={solution} 
                  index={index} 
                  inView={inView} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-16 text-center"
        >
          <button className="rounded-xl px-8 py-3 font-medium text-[#052A28] shadow-aep-glow transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#00FFD1 0%,#3A0CA3 40%,#8338EC 100%)",
            }}
          >
            See AEP in Action
          </button>
        </motion.div>
      </div>
    </section>
  );
}