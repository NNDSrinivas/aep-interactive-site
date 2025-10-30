"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  activities: string[];
  metrics: { label: string; value: string; trend: "up" | "stable" | "down" }[];
}

const agents: Agent[] = [
  {
    id: "builder",
    name: "Agent Orion",
    role: "Builder",
    description: "Autonomous code generation and architecture decisions",
    icon: "🏗️",
    color: "#00FFD1",
    activities: [
      "Implementing user auth flow",
      "Optimizing database queries", 
      "Refactoring legacy components"
    ],
    metrics: [
      { label: "Code Quality", value: "A+", trend: "up" },
      { label: "Test Coverage", value: "94%", trend: "up" },
      { label: "Performance", value: "98ms", trend: "up" }
    ]
  },
  {
    id: "reviewer", 
    name: "Agent Nova",
    role: "Reviewer",
    description: "Intelligent code review and quality assurance",
    icon: "🔍",
    color: "#8338EC",
    activities: [
      "Reviewing security patterns",
      "Validating API contracts",
      "Checking accessibility compliance"
    ],
    metrics: [
      { label: "Reviews", value: "47", trend: "up" },
      { label: "Issues Found", value: "12", trend: "down" },
      { label: "Approval Time", value: "3.2m", trend: "down" }
    ]
  },
  {
    id: "ops",
    name: "Agent Vega", 
    role: "Ops",
    description: "Infrastructure and deployment automation",
    icon: "⚙️",
    color: "#3A0CA3",
    activities: [
      "Scaling Kubernetes pods",
      "Monitoring error rates",
      "Updating dependencies"
    ],
    metrics: [
      { label: "Uptime", value: "99.9%", trend: "stable" },
      { label: "Deploy Time", value: "2.1m", trend: "down" },
      { label: "Incidents", value: "0", trend: "stable" }
    ]
  }
];

function ActivityIndicator({ activity, index, isActive }: { 
  activity: string; 
  index: number; 
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        x: 0,
        scale: isActive ? 1.02 : 1
      }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300
      }}
      className={`flex items-center space-x-2 rounded-lg p-2 ${
        isActive ? 'bg-white/10' : 'bg-white/5'
      }`}
    >
      <motion.div
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          backgroundColor: isActive ? ["#00FFD1", "#8338EC", "#00FFD1"] : "#666"
        }}
        transition={{ 
          duration: 2, 
          repeat: isActive ? Infinity : 0,
          repeatType: "reverse" 
        }}
        className="h-2 w-2 rounded-full"
      />
      <span className="text-sm text-white/80">{activity}</span>
    </motion.div>
  );
}

function MetricCard({ metric, isActive }: { 
  metric: { label: string; value: string; trend: "up" | "stable" | "down" }; 
  isActive: boolean;
}) {
  const trendColors = {
    up: "#00FFD1",
    stable: "#FFA500", 
    down: "#FF6B6B"
  };

  const trendIcons = {
    up: "↗",
    stable: "→",
    down: "↘"
  };

  return (
    <motion.div
      animate={{
        scale: isActive ? [1, 1.05, 1] : 1,
        opacity: isActive ? 1 : 0.7
      }}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
      className="rounded-lg bg-white/5 p-3 text-center"
    >
      <div className="text-lg font-bold" style={{ color: trendColors[metric.trend] }}>
        {metric.value}
      </div>
      <div className="flex items-center justify-center space-x-1 text-xs text-white/60">
        <span>{metric.label}</span>
        <span style={{ color: trendColors[metric.trend] }}>
          {trendIcons[metric.trend]}
        </span>
      </div>
    </motion.div>
  );
}

function AgentCard({ agent, isActive, index }: { 
  agent: Agent; 
  isActive: boolean; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-2xl border p-6 backdrop-blur transition-all duration-500 ${
        isActive 
          ? 'border-white/30 bg-white/10 shadow-2xl' 
          : 'border-white/10 bg-white/5'
      }`}
      style={{
        boxShadow: isActive 
          ? `0 20px 40px ${agent.color}20, 0 0 20px ${agent.color}15`
          : 'none'
      }}
    >
      {/* Active indicator glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{ 
          opacity: isActive ? 0.1 : 0,
        }}
        style={{ 
          background: `radial-gradient(circle, ${agent.color}40 0%, transparent 70%)`
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
                rotate: isHovered ? 360 : 0
              }}
              transition={{ 
                scale: { duration: 2, repeat: isActive ? Infinity : 0 },
                rotate: { duration: 0.5 }
              }}
              className="text-3xl"
            >
              {agent.icon}
            </motion.div>
            <div>
              <h3 className="font-[var(--font-grotesk)] text-xl font-bold">
                {agent.name}
              </h3>
              <p className="text-sm" style={{ color: agent.color }}>
                {agent.role}
              </p>
            </div>
          </div>
          
          {/* Status indicator */}
          <motion.div
            animate={{
              scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`h-3 w-3 rounded-full ${
              isActive ? 'bg-green-400' : 'bg-yellow-400'
            }`}
          />
        </div>
        
        <p className="mt-3 text-sm text-white/70">{agent.description}</p>
      </div>

      {/* Current Activities */}
      <div className="relative z-10 mb-6">
        <h4 className="mb-3 text-sm font-medium text-white/80">Current Activities</h4>
        <div className="space-y-2">
          {agent.activities.map((activity, actIndex) => (
            <ActivityIndicator
              key={activity}
              activity={activity}
              index={actIndex}
              isActive={isActive}
            />
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="relative z-10">
        <h4 className="mb-3 text-sm font-medium text-white/80">Key Metrics</h4>
        <div className="grid grid-cols-3 gap-2">
          {agent.metrics.map((metric) => (
            <MetricCard 
              key={metric.label}
              metric={metric} 
              isActive={isActive}
            />
          ))}
        </div>
      </div>

      {/* Demo button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 mt-6 w-full rounded-lg border border-white/20 py-2 text-sm transition-all hover:border-white/40 hover:bg-white/5"
      >
        View {agent.role} Demo
      </motion.button>
    </motion.div>
  );
}

export default function AgentsInConcert() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to active agent index
  const activeAgentIndex = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    [0, 1, 2, 2]
  );

  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  // Update active index based on scroll
  activeAgentIndex.onChange((latest) => {
    setCurrentActiveIndex(Math.round(latest));
  });

  const isInView = useInView(containerRef, { margin: "-20%" });

  return (
    <section ref={containerRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-[var(--font-grotesk)] text-4xl font-bold">
            <span className="bg-aep-gradient bg-clip-text text-transparent">
              Agents in Concert
            </span>
          </h2>
          <p className="text-white/70">
            Three specialized AI agents working together to deliver autonomous engineering
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          className="mb-12 flex justify-center"
        >
          <div className="flex space-x-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                className={`h-2 w-16 rounded-full transition-all duration-300 ${
                  index === currentActiveIndex 
                    ? 'bg-gradient-to-r from-[#00FFD1] to-[#8338EC]' 
                    : 'bg-white/20'
                }`}
                animate={{
                  scale: index === currentActiveIndex ? 1.1 : 1
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isActive={index === currentActiveIndex}
              index={index}
            />
          ))}
        </div>

        {/* Orchestration visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="mb-4 font-[var(--font-grotesk)] text-2xl font-semibold">
              Orchestrated Workflow
            </h3>
            <p className="mb-6 text-white/70">
              These agents collaborate seamlessly, sharing context and coordinating 
              their efforts to deliver end-to-end autonomous engineering.
            </p>
            
            {/* Connection visualization */}
            <div className="flex items-center justify-center space-x-4">
              {agents.map((agent, index) => (
                <div key={agent.id} className="flex items-center">
                  <motion.div
                    animate={{
                      scale: index === currentActiveIndex ? 1.2 : 1,
                      opacity: index === currentActiveIndex ? 1 : 0.6
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    {agent.icon}
                  </motion.div>
                  
                  {index < agents.length - 1 && (
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scaleX: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="h-0.5 w-8 bg-gradient-to-r from-[#00FFD1] to-[#8338EC]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}