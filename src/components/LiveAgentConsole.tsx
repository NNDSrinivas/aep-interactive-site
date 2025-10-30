"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface ConsoleLog {
  id: string;
  timestamp: string;
  agent: "Builder" | "Reviewer" | "Ops";
  action: string;
  status: "running" | "completed" | "error";
  details?: string;
  code?: string;
}

interface AgentStatus {
  name: string;
  status: "idle" | "thinking" | "working" | "completed";
  currentTask: string;
  progress: number;
  color: string;
}

const mockLogs: ConsoleLog[] = [
  {
    id: "1",
    timestamp: "14:23:01",
    agent: "Builder",
    action: "Analyzing JIRA ticket ENG-1847",
    status: "completed",
    details: "User authentication flow optimization"
  },
  {
    id: "2", 
    timestamp: "14:23:03",
    agent: "Builder",
    action: "Scanning codebase patterns",
    status: "completed",
    details: "Found 3 similar auth implementations"
  },
  {
    id: "3",
    timestamp: "14:23:05",
    agent: "Builder", 
    action: "Generating implementation plan",
    status: "completed",
    details: "JWT refresh optimization strategy defined"
  },
  {
    id: "4",
    timestamp: "14:23:08",
    agent: "Builder",
    action: "Writing code: auth/token-manager.ts",
    status: "running",
    code: `class TokenManager {\n  private refreshPromise: Promise<string> | null = null;\n\n  async getValidToken(): Promise<string> {\n    if (this.isExpired(this.currentToken)) {\n      return this.refreshToken();\n    }\n    return this.currentToken;\n  }\n\n  private async refreshToken(): Promise<string> {\n    if (this.refreshPromise) {\n      return this.refreshPromise;\n    }\n\n    this.refreshPromise = this.performRefresh();\n    try {\n      const newToken = await this.refreshPromise;\n      this.currentToken = newToken;\n      return newToken;\n    } finally {\n      this.refreshPromise = null;\n    }\n  }\n}`
  }
];

function ConsoleLogEntry({ log, index }: { log: ConsoleLog; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusColors = {
    running: "#00FFD1",
    completed: "#00FF88", 
    error: "#FF6B6B"
  };

  const agentColors = {
    Builder: "#00FFD1",
    Reviewer: "#8338EC",
    Ops: "#3A0CA3"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-2 rounded-lg border border-white/5 bg-black/10 p-3 font-mono text-sm backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <span className="text-white/50">{log.timestamp}</span>
        <span 
          className="font-semibold"
          style={{ color: agentColors[log.agent] }}
        >
          [{log.agent}]
        </span>
        <span className="flex-1 text-white/80">{log.action}</span>
        <motion.div
          animate={{
            rotate: log.status === "running" ? 360 : 0,
            scale: log.status === "running" ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 2, repeat: log.status === "running" ? Infinity : 0 },
            scale: { duration: 1, repeat: log.status === "running" ? Infinity : 0 }
          }}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: statusColors[log.status] }}
        />
      </div>
      
      {log.details && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 pl-4 text-xs text-white/60"
        >
          → {log.details}
        </motion.div>
      )}
      
      {log.code && (
        <div className="mt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-[#00FFD1] hover:text-[#00FFD1]/80"
          >
            {isExpanded ? "Hide" : "Show"} generated code
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 overflow-hidden rounded border border-white/10 bg-black/30 p-3"
              >
                <pre className="text-xs text-green-400">
                  <code>{log.code}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    linesGenerated: 847,
    testsWritten: 23,
    issuesResolved: 5,
    prsMerged: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        linesGenerated: prev.linesGenerated + Math.floor(Math.random() * 3),
        testsWritten: prev.testsWritten + (Math.random() > 0.8 ? 1 : 0),
        issuesResolved: prev.issuesResolved + (Math.random() > 0.9 ? 1 : 0),
        prsMerged: prev.prsMerged + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[
        { label: "Lines Generated", value: metrics.linesGenerated, color: "#00FFD1" },
        { label: "Tests Written", value: metrics.testsWritten, color: "#8338EC" },
        { label: "Issues Resolved", value: metrics.issuesResolved, color: "#00FF88" },
        { label: "PRs Merged", value: metrics.prsMerged, color: "#3A0CA3" }
      ].map((metric) => (
        <motion.div
          key={metric.label}
          className="rounded-lg border border-white/10 bg-black/20 p-3 text-center backdrop-blur"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            key={metric.value}
            initial={{ scale: 1.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color: metric.color }}
          >
            {metric.value}
          </motion.div>
          <div className="text-xs text-white/60">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function LiveAgentConsole() {
  const [logs, setLogs] = useState<ConsoleLog[]>(mockLogs.slice(0, 3));
  const [agents] = useState<AgentStatus[]>([
    { name: "Builder", status: "working", currentTask: "Implementing auth optimization", progress: 65, color: "#00FFD1" },
    { name: "Reviewer", status: "idle", currentTask: "Awaiting code completion", progress: 0, color: "#8338EC" },
    { name: "Ops", status: "idle", currentTask: "Monitoring deployment queue", progress: 100, color: "#3A0CA3" }
  ]);
  
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= mockLogs.length) return prev;
        return [...prev, mockLogs[prev.length]];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <section className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-[var(--font-grotesk)] text-4xl font-bold">
            <span className="bg-aep-gradient bg-clip-text text-transparent">
              Live Agent Console
            </span>
          </h2>
          <p className="mb-6 text-white/70">
            Watch AEP agents work autonomously in real-time. This is actual AI engineering in action.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm transition-all hover:bg-white/5"
            >
              <div className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-red-400'}`} />
              {isPlaying ? 'Live Demo Running' : 'Demo Paused'}
            </button>
            <div className="text-sm text-white/50">
              Updates every 3 seconds
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Console */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-[var(--font-grotesk)] text-xl font-semibold">
                  Agent Activity Stream
                </h3>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <div className="h-1 w-1 rounded-full bg-green-400" />
                  Connected to AEP Network
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <ConsoleLogEntry key={log.id} log={log} index={index} />
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Status */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <h3 className="mb-4 font-[var(--font-grotesk)] text-lg font-semibold">
                Agent Status
              </h3>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: agent.status === "working" ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 1, repeat: agent.status === "working" ? Infinity : 0 }}
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: agent.color }}
                      />
                      <span className="text-sm font-medium">{agent.name}</span>
                    </div>
                    <span className="text-xs text-white/50 capitalize">{agent.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Metrics */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <h3 className="mb-4 font-[var(--font-grotesk)] text-lg font-semibold">
                Session Metrics
              </h3>
              <LiveMetrics />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-white/80">
            This is just a glimpse. AEP agents handle complete workflows: 
            planning → coding → testing → reviewing → deploying.
          </p>
          <button className="rounded-xl px-8 py-4 font-medium text-[#052A28] shadow-aep-glow transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#00FFD1 0%,#3A0CA3 40%,#8338EC 100%)",
            }}
          >
            Request Access to Full Console
          </button>
        </motion.div>
      </div>
    </section>
  );
}