"use client";

import dynamic from "next/dynamic";
import Section from "@/components/Section";
import MemoryGraph from "@/components/MemoryGraph";
import LiveFeed from "@/components/LiveFeed";
import LiveAgentConsole from "@/components/LiveAgentConsole";
import KnowledgeAssistant from "@/components/KnowledgeAssistant";
import { motion } from "framer-motion";

const NeuralOrbit = dynamic(() => import("@/components/NeuralOrbit"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <NeuralOrbit />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          <div className="mb-6">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-black/20 px-4 py-2 text-sm font-medium text-cyan-400 backdrop-blur">
              🚀 Enterprise AI Engineering Platform
            </span>
          </div>
          
          <h1 className="mb-6 font-[var(--font-grotesk)] text-6xl font-bold leading-tight md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 40px rgba(0,255,209,0.3))"
              }}
            >
              AEP
            </motion.span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-2xl md:text-4xl lg:text-5xl font-light text-white/90"
          >
            The World&apos;s Most Advanced
            <br />
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Autonomous Engineering AI
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 max-w-4xl mx-auto text-xl text-white/70 leading-relaxed"
          >
            Beyond coding assistance. AEP is your <strong className="text-white">intelligent engineering teammate</strong> that autonomously handles complete workflows while serving as your <strong className="text-cyan-400">omniscient knowledge assistant</strong> across all your tools, documents, and communications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0,255,209,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-2xl px-12 py-6 text-lg font-semibold text-black transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #00FFD1 0%, #8338EC 50%, #3A0CA3 100%)",
              }}
            >
              <motion.div
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative z-10">See AEP in Action</span>
              <span className="relative z-10 ml-2">→</span>
            </motion.a>
            
            <motion.a
              href="#knowledge"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,255,209,0.6)" }}
              className="rounded-2xl border-2 border-white/20 px-12 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/5"
            >
              Try Knowledge Assistant
            </motion.a>
          </motion.div>

          {/* Enterprise badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/50"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              SOC 2 Type II Certified
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400"></span>
              Enterprise SSO Ready
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              99.9% Uptime SLA
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              Fortune 500 Trusted
            </div>
          </motion.div>
        </motion.div>
      </div>

            {/* Enterprise Problem-Solution Matrix */}
      <Section delay={0.1} className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="mb-6 font-[var(--font-grotesk)] text-4xl font-bold">
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                The Enterprise Engineering Crisis
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Traditional development workflows are killing productivity and burning out engineering teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-8">Critical Pain Points</h3>
              
              {[
                {
                  title: "Context Loss Epidemic",
                  desc: "Engineers waste 40% of their time searching for information across scattered tools",
                  impact: "40% time waste"
                },
                {
                  title: "PR Bottleneck Crisis", 
                  desc: "Code reviews take days, blocking deployments and frustrating developers",
                  impact: "3-5 day delays"
                },
                {
                  title: "Flaky Test Nightmare",
                  desc: "Unreliable tests break CI/CD, causing deployment anxiety and rollbacks", 
                  impact: "60% false failures"
                },
                {
                  title: "Knowledge Silos",
                  desc: "Critical information trapped in individual minds, creating single points of failure",
                  impact: "Bus factor of 1"
                }
              ].map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-xl border border-red-400/20 bg-red-400/5 backdrop-blur"
                >
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-red-400">{problem.title}</h4>
                      <span className="text-xs text-red-300 bg-red-400/20 px-2 py-1 rounded">{problem.impact}</span>
                    </div>
                    <p className="text-white/70">{problem.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-8">AEP&apos;s Enterprise Solution</h3>
              
              {[
                {
                  title: "Omniscient Knowledge AI",
                  desc: "Instant access to all project information across every tool and platform",
                  benefit: "90% faster answers"
                },
                {
                  title: "Autonomous PR Management",
                  desc: "AI agents handle code reviews, testing, and merge decisions automatically",
                  benefit: "Same-day merges"
                },
                {
                  title: "Self-Healing CI/CD",
                  desc: "Intelligent test analysis and automatic fix generation for flaky tests",
                  benefit: "99% reliability"
                },
                {
                  title: "Living Documentation",
                  desc: "Continuous knowledge capture and smart distribution across the organization",
                  benefit: "Zero knowledge loss"
                }
              ].map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="flex gap-4 p-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 backdrop-blur"
                >
                  <div className="text-2xl">✨</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-cyan-400">{solution.title}</h4>
                      <span className="text-xs text-cyan-300 bg-cyan-400/20 px-2 py-1 rounded">{solution.benefit}</span>
                    </div>
                    <p className="text-white/70">{solution.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Interactive Memory Graph */}
      <Section delay={0.05} className="relative z-10">
        <div id="graph" className="mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="mb-6 font-[var(--font-grotesk)] text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Living Memory Graph
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              AEP&apos;s neural memory system continuously learns and evolves, creating an ever-growing knowledge web of your entire engineering ecosystem
            </p>
          </motion.div>
          
          <div className="rounded-2xl border border-purple-400/20 bg-black/40 p-8 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-purple-400">Neural Memory Network</h3>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Learning & Evolving</span>
                </div>
              </div>
              <div className="text-sm text-white/50">
                {new Date().toLocaleString()} • 47,293 connections
              </div>
            </div>
            <MemoryGraph />
          </div>
        </div>
      </Section>

      {/* Enterprise Performance Dashboard */}
      <Section delay={0.05} className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="mb-6 font-[var(--font-grotesk)] text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Enterprise Performance Monitor
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Real-time insights into your engineering organization&apos;s autonomous operations and productivity gains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-cyan-400/20 bg-black/40 p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-cyan-400">Global Engineering Activity</h3>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span>Live Updates</span>
                  </div>
                </div>
                <LiveFeed />
              </div>
            </motion.div>
            
            {/* Key Performance Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-green-400/20 bg-black/40 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold text-green-400 mb-6">Enterprise KPIs</h3>
                <div className="space-y-4">
                  <EnterpriseMetric 
                    label="Developer Velocity" 
                    value="347%" 
                    change="+127%"
                    color="text-green-400"
                    icon="🚀"
                  />
                  <EnterpriseMetric 
                    label="Mean Time to Deploy" 
                    value="4.2min" 
                    change="-89%"
                    color="text-cyan-400"
                    icon="⚡"
                  />
                  <EnterpriseMetric 
                    label="Code Quality Score" 
                    value="98.7%" 
                    change="+23%"
                    color="text-purple-400"
                    icon="⭐"
                  />
                  <EnterpriseMetric 
                    label="Knowledge Coverage" 
                    value="99.1%" 
                    change="+45%"
                    color="text-blue-400"
                    icon="🧠"
                  />
                  <EnterpriseMetric 
                    label="Active AI Agents" 
                    value="127" 
                    change="+34"
                    color="text-yellow-400"
                    icon="🤖"
                  />
                  <EnterpriseMetric 
                    label="Incidents Prevented" 
                    value="2,847" 
                    change="+156%"
                    color="text-orange-400"
                    icon="🛡️"
                  />
                </div>
              </div>

              {/* ROI Calculator */}
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 backdrop-blur">
                <h4 className="text-lg font-semibold text-yellow-400 mb-4">ROI Impact</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Time Saved/Dev/Week</span>
                    <span className="text-white font-bold">18.5 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Cost Savings/Year</span>
                    <span className="text-green-400 font-bold">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Faster TTM</span>
                    <span className="text-cyan-400 font-bold">67% faster</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Live Agent Console - Real-time AI Demo */}
      <LiveAgentConsole />

      {/* Knowledge Assistant - Revolutionary Feature */}
      <KnowledgeAssistant />

      {/* Premium Enterprise CTA */}
      <Section delay={0.05} className="relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-cyan-400/20 bg-black/60 p-12 backdrop-blur text-center overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-blue-600/10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-600/20 blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="mb-6 font-[var(--font-grotesk)] text-5xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                    Transform Your Engineering
                  </span>
                  <br />
                  <span className="text-white">Organization Today</span>
                </h2>
                
                <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  Join the enterprise leaders who&apos;ve already transformed their engineering velocity with AEP. 
                  <strong className="text-cyan-400"> Book a personalized demo</strong> and see how AEP can revolutionize your development workflow.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
              >
                <motion.a
                  href="https://calendly.com/aep-enterprise-demo"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0,255,209,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-2xl px-12 py-6 text-lg font-bold text-black transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #00FFD1 0%, #8338EC 50%, #3A0CA3 100%)",
                  }}
                >
                  <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <span className="relative z-10">Book Enterprise Demo</span>
                </motion.a>
                
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0,255,209,0.6)" }}
                  className="rounded-2xl border-2 border-white/30 px-12 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  View Enterprise Pricing
                </motion.a>
              </motion.div>

              {/* Enterprise Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              >
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-cyan-400">99.9%</div>
                  <div className="text-sm text-white/60">Uptime SLA</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-400">SOC 2</div>
                  <div className="text-sm text-white/60">Type II Certified</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm text-white/60">Enterprise Support</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-400">$2.4M+</div>
                  <div className="text-sm text-white/60">Avg Annual Savings</div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 text-sm text-white/50"
              >
                Trusted by Fortune 500 companies • Enterprise-grade security • Custom deployment options
              </motion.p>
            </div>
          </motion.div>
        </div>
        <div className="h-24" />
      </Section>
    </main>
  );
}

function EnterpriseMetric({ 
  label, 
  value, 
  change, 
  color, 
  icon 
}: { 
  label: string; 
  value: string; 
  change: string; 
  color: string; 
  icon: string; 
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-black/20 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <div>
          <div className={`text-lg font-bold ${color}`}>{value}</div>
          <div className="text-xs text-white/60">{label}</div>
        </div>
      </div>
      <div className="text-xs text-green-400 font-mono">{change}</div>
    </div>
  );
}
