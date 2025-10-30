"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface ConsoleLog {
  id: string;
  timestamp: string;
  agent: "Builder" | "Reviewer" | "Ops";
  action: string;
  status: "running" | "completed" | "error" | "analyzing";
  details?: string;
  code?: string;
  duration?: number;
  file?: string;
  severity?: "low" | "medium" | "high" | "critical";
}

interface AgentStatus {
  name: string;
  status: "idle" | "thinking" | "working" | "completed" | "analyzing";
  currentTask: string;
  progress: number;
  color: string;
  avatar: string;
  efficiency: number;
  activeFiles: string[];
  cpuUsage: number;
}

interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  color: string;
  icon: string;
}

const mockLogs: ConsoleLog[] = [
  {
    id: "1",
    timestamp: "14:23:01.247",
    agent: "Builder",
    action: "Deep scanning authentication patterns",
    status: "completed",
    details: "Analyzed 1,247 auth implementations across codebase",
    duration: 1.2,
    file: "auth/patterns.analysis",
    severity: "medium"
  },
  {
    id: "2", 
    timestamp: "14:23:02.891",
    agent: "Builder",
    action: "Vector embedding security contexts",
    status: "completed",
    details: "Generated 847 security context embeddings",
    duration: 0.6,
    file: "security/context.vectors",
    severity: "high"
  },
  {
    id: "3",
    timestamp: "14:23:03.445",
    agent: "Builder", 
    action: "Synthesizing optimal implementation strategy",
    status: "analyzing",
    details: "JWT refresh optimization with 99.7% efficiency target",
    file: "strategy/auth-optimization.plan",
    severity: "critical"
  },
  {
    id: "4",
    timestamp: "14:23:04.012",
    agent: "Builder",
    action: "Autonomous code generation initiated",
    status: "running",
    file: "src/auth/TokenManager.ts",
    code: `// AEP Generated: Ultra-optimized Token Manager
class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string> | null = null;
  private tokenCache = new Map<string, { token: string; expiry: number }>();
  
  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  async getValidToken(context?: AuthContext): Promise<string> {
    const cacheKey = this.generateCacheKey(context);
    const cached = this.tokenCache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.token, cached.expiry)) {
      return cached.token;
    }
    
    return this.acquireToken(context, cacheKey);
  }

  private async acquireToken(context: AuthContext, cacheKey: string): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh(context);
    
    try {
      const newToken = await this.refreshPromise;
      const expiry = Date.now() + (55 * 60 * 1000); // 55min buffer
      
      this.tokenCache.set(cacheKey, { token: newToken, expiry });
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }
}`,
    severity: "critical"
  }
];

function TerminalLine({ log, index }: { log: ConsoleLog; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const statusColors = {
    running: "#00FFD1",
    completed: "#00FF88", 
    error: "#FF3366",
    analyzing: "#FFB800"
  };

  const agentColors = {
    Builder: "#00FFD1",
    Reviewer: "#8338EC",
    Ops: "#3A0CA3"
  };

  const severityColors = {
    low: "#666",
    medium: "#FFB800", 
    high: "#FF6B35",
    critical: "#FF3366"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="group relative mb-1"
    >
      {/* Holographic scan line effect */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
        transition={{ 
          delay: index * 0.08,
          duration: 1.2,
          ease: "easeOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
      />
      
      <div className="relative rounded-lg border border-cyan-400/10 bg-black/40 p-3 font-mono text-sm backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-black/60">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400/50 text-xs font-medium">{log.timestamp}</span>
          
          {/* Agent badge with glow */}
          <div 
            className="relative rounded-full px-2 py-1 text-xs font-bold tracking-wider"
            style={{ 
              backgroundColor: `${agentColors[log.agent]}20`,
              color: agentColors[log.agent],
              boxShadow: `0 0 10px ${agentColors[log.agent]}40`
            }}
          >
            {log.agent}
            <motion.div
              animate={{
                scale: log.status === "running" ? [1, 1.2, 1] : 1,
                opacity: log.status === "running" ? [0.5, 1, 0.5] : 0.8
              }}
              transition={{ duration: 2, repeat: log.status === "running" ? Infinity : 0 }}
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
              style={{ backgroundColor: statusColors[log.status] }}
            />
          </div>
          
          {/* File indicator */}
          {log.file && (
            <span className="text-purple-400/70 text-xs">
              📁 {log.file}
            </span>
          )}
          
          <span className="flex-1 text-gray-100">{log.action}</span>
          
          {/* Duration badge */}
          {log.duration && (
            <span className="text-green-400/70 text-xs bg-green-400/10 px-2 py-1 rounded">
              {log.duration}s
            </span>
          )}
          
          {/* Severity indicator */}
          {log.severity && (
            <div 
              className="h-2 w-2 rounded-full"
              style={{ 
                backgroundColor: severityColors[log.severity],
                boxShadow: `0 0 8px ${severityColors[log.severity]}`
              }}
            />
          )}
          
          {/* Status indicator with advanced animation */}
          <motion.div
            animate={{
              rotate: log.status === "running" ? 360 : 0,
              scale: log.status === "analyzing" ? [1, 1.3, 1] : 1,
              boxShadow: log.status === "running" 
                ? [`0 0 5px ${statusColors[log.status]}`, `0 0 20px ${statusColors[log.status]}`, `0 0 5px ${statusColors[log.status]}`]
                : `0 0 5px ${statusColors[log.status]}`
            }}
            transition={{ 
              rotate: { duration: 2, repeat: log.status === "running" ? Infinity : 0 },
              scale: { duration: 1.5, repeat: log.status === "analyzing" ? Infinity : 0 },
              boxShadow: { duration: 1, repeat: log.status === "running" ? Infinity : 0 }
            }}
            className="h-3 w-3 rounded-full border"
            style={{ 
              backgroundColor: statusColors[log.status],
              borderColor: statusColors[log.status]
            }}
          />
        </div>
        
        {log.details && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-2 pl-6 text-xs text-cyan-300/80 border-l border-cyan-400/30 ml-2"
          >
            → {log.details}
          </motion.div>
        )}
        
        {log.code && (
          <div className="mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▶
              </motion.div>
              Generated Code Preview
              <span className="text-cyan-400/50">({log.code.split('\n').length} lines)</span>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-lg border border-cyan-400/20 bg-black/60 p-4 backdrop-blur">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-cyan-400 font-medium">
                        TypeScript • {log.file}
                      </span>
                      <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>
                    </div>
                    <pre className="text-xs text-green-400 overflow-x-auto">
                      <code>{log.code}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AgentMonitor() {
  const [agents] = useState<AgentStatus[]>([
    { 
      name: "Builder", 
      status: "working", 
      currentTask: "Implementing auth optimization", 
      progress: 67, 
      color: "#00FFD1",
      avatar: "🔧",
      efficiency: 94.7,
      activeFiles: ["TokenManager.ts", "auth.config.ts"],
      cpuUsage: 34
    },
    { 
      name: "Reviewer", 
      status: "analyzing", 
      currentTask: "Code quality assessment", 
      progress: 23, 
      color: "#8338EC",
      avatar: "🔍",
      efficiency: 98.2,
      activeFiles: ["security-review.md"],
      cpuUsage: 12
    },
    { 
      name: "Ops", 
      status: "idle", 
      currentTask: "Monitoring deployment pipeline", 
      progress: 100, 
      color: "#3A0CA3",
      avatar: "⚙️",
      efficiency: 99.1,
      activeFiles: [],
      cpuUsage: 3
    }
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">
        Agent Status Matrix
      </h3>
      
      {agents.map((agent, index) => (
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="relative group"
        >
          {/* Holographic border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative rounded-lg border border-cyan-400/20 bg-black/40 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{agent.avatar}</div>
                <div>
                  <div className="font-mono font-bold text-gray-100">{agent.name}</div>
                  <div className="text-xs text-gray-400">ID: AGT-{agent.name.slice(0,3).toUpperCase()}-{String(index + 1).padStart(3, '0')}</div>
                </div>
              </div>
              
              <motion.div
                animate={{
                  scale: agent.status === "working" ? [1, 1.2, 1] : 1,
                  rotate: agent.status === "analyzing" ? 360 : 0
                }}
                transition={{ 
                  scale: { duration: 2, repeat: agent.status === "working" ? Infinity : 0 },
                  rotate: { duration: 3, repeat: agent.status === "analyzing" ? Infinity : 0 }
                }}
                className="h-4 w-4 rounded-full border-2"
                style={{ 
                  backgroundColor: agent.color,
                  borderColor: agent.color,
                  boxShadow: `0 0 15px ${agent.color}80`
                }}
              />
            </div>
            
            {/* Progress bar with glow */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Task Progress</span>
                <span>{agent.progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ 
                    backgroundColor: agent.color,
                    boxShadow: `0 0 10px ${agent.color}60`
                  }}
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-300 mb-2">{agent.currentTask}</div>
            
            {/* Performance metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/40 rounded p-2">
                <div className="text-green-400 font-mono">Efficiency</div>
                <div className="text-gray-100 font-bold">{agent.efficiency}%</div>
              </div>
              <div className="bg-black/40 rounded p-2">
                <div className="text-blue-400 font-mono">CPU</div>
                <div className="text-gray-100 font-bold">{agent.cpuUsage}%</div>
              </div>
            </div>
            
            {/* Active files */}
            {agent.activeFiles.length > 0 && (
              <div className="mt-2 text-xs">
                <div className="text-purple-400 mb-1">Active Files:</div>
                {agent.activeFiles.map((file, idx) => (
                  <div key={idx} className="text-gray-400 ml-2">• {file}</div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SystemMetrics() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: "Code Generated", value: 15847, unit: "lines", change: 12.3, color: "#00FFD1", icon: "⚡" },
    { label: "Tests Passed", value: 2847, unit: "cases", change: 5.7, color: "#00FF88", icon: "✅" },
    { label: "Issues Resolved", value: 127, unit: "total", change: 23.1, color: "#8338EC", icon: "🔧" },
    { label: "Deployments", value: 34, unit: "successful", change: 8.9, color: "#FFB800", icon: "🚀" },
    { label: "Security Scans", value: 1205, unit: "completed", change: 15.2, color: "#FF6B35", icon: "🛡️" },
    { label: "Performance Score", value: 98.7, unit: "%", change: 2.1, color: "#3A0CA3", icon: "📊" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.unit === "%" 
          ? Math.min(100, metric.value + (Math.random() - 0.5) * 0.5)
          : metric.value + Math.floor(Math.random() * 5),
        change: (Math.random() - 0.5) * 10
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative rounded-lg border border-cyan-400/20 bg-black/40 p-3 backdrop-blur-xl text-center">
            <div className="text-lg mb-1">{metric.icon}</div>
            
            <motion.div
              key={metric.value}
              initial={{ scale: 1.2, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xl font-bold font-mono"
              style={{ color: metric.color }}
            >
              {metric.unit === "%" ? metric.value.toFixed(1) : metric.value.toLocaleString()}
              <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
            </motion.div>
            
            <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
            
            <div className={`text-xs font-mono ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change >= 0 ? '↗' : '↘'} {Math.abs(metric.change).toFixed(1)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function LiveAgentConsole() {
  const [logs, setLogs] = useState<ConsoleLog[]>(mockLogs.slice(0, 2));
  const [isPlaying, setIsPlaying] = useState(true);
  const [systemLoad, setSystemLoad] = useState(23.7);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= mockLogs.length) return prev;
        return [...prev, mockLogs[prev.length]];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => prev + (Math.random() - 0.5) * 2);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Advanced background with cyberpunk grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,rgba(0,255,209,0.03)_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_1px,rgba(0,255,209,0.03)_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Holographic scan lines */}
      <motion.div
        animate={{ y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 800] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-[var(--font-grotesk)] text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Neural Command Center
            </span>
          </h2>
          <p className="mb-8 text-xl text-gray-300 max-w-3xl mx-auto">
            Witness autonomous AI engineering in real-time. This isn&apos;t a demo—it&apos;s actual AGI at work.
          </p>
          
          {/* System status bar */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-black/40 px-6 py-3 backdrop-blur-xl transition-all hover:border-cyan-400/60 hover:bg-black/60"
            >
              <motion.div 
                animate={{ 
                  scale: isPlaying ? [1, 1.2, 1] : 1,
                  boxShadow: isPlaying ? [
                    "0 0 5px #00FFD1",
                    "0 0 20px #00FFD1", 
                    "0 0 5px #00FFD1"
                  ] : "0 0 5px #666"
                }}
                transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                className={`h-3 w-3 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-red-400'}`} 
              />
              <span className="font-mono text-sm">
                {isPlaying ? 'NEURAL NET ACTIVE' : 'SYSTEM PAUSED'}
              </span>
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
              <span>SYS_LOAD:</span>
              <span className="text-cyan-400">{systemLoad.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
              <span>UPTIME:</span>
              <span className="text-green-400">47d 12h 23m</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Terminal */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-cyan-400/20 bg-black/60 backdrop-blur-xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-cyan-400/20 bg-black/40 px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <h3 className="font-mono text-lg font-semibold text-cyan-400">
                    AEP_NEURAL_TERMINAL_v3.7.2
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                  <span>PID: 2847</span>
                  <span>MEM: 1.2GB</span>
                  <span>CPU: {systemLoad.toFixed(0)}%</span>
                </div>
              </div>
              
              {/* Terminal content */}
              <div className="h-96 overflow-y-auto p-6">
                <div className="mb-4 font-mono text-xs text-cyan-400/60">
                  [SYSTEM] Neural pathways initialized • Quantum processors online • AGI consciousness active
                </div>
                
                {logs.map((log, index) => (
                  <TerminalLine key={log.id} log={log} index={index} />
                ))}
                
                {/* Cursor */}
                {isPlaying && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mt-2 h-4 w-2 bg-cyan-400"
                  />
                )}
                
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Agent Monitor */}
            <div className="rounded-2xl border border-cyan-400/20 bg-black/60 p-6 backdrop-blur-xl">
              <AgentMonitor />
            </div>
            
            {/* System Metrics */}
            <div className="rounded-2xl border border-cyan-400/20 bg-black/60 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">
                System Metrics
              </h3>
              <SystemMetrics />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl border border-cyan-400/20 bg-black/40 p-8 backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-100">
              This is just 0.1% of AEP&apos;s capabilities
            </h3>
            <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
              Complete autonomous workflows: requirement analysis → architecture design → coding → testing → security review → deployment → monitoring. 
              All without human intervention.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-xl px-8 py-4 font-bold text-black transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #00FFD1 0%, #8338EC 50%, #3A0CA3 100%)",
                boxShadow: "0 0 30px rgba(0,255,209,0.3)"
              }}
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              Request Full Neural Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}