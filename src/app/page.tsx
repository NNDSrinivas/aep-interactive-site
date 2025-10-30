"use client";

import dynamic from "next/dynamic";
import Section from "@/components/Section";
import MemoryGraph from "@/components/MemoryGraph";
import LiveFeed from "@/components/LiveFeed";
import { motion } from "framer-motion";

const NeuralOrbit = dynamic(() => import("@/components/NeuralOrbit"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <NeuralOrbit />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center font-[var(--font-grotesk)] text-5xl font-bold leading-tight md:text-7xl"
        >
          <span className="bg-aep-gradient bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,255,209,0.25)]">
            AEP
          </span>{" "}
          — The AI That Engineers Itself
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 max-w-2xl text-center text-white/80"
        >
          Plan, code, test, and deploy — autonomously.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="#graph"
            className="rounded-xl2 px-6 py-3 font-medium text-[#052A28] shadow-aep-glow"
            style={{
              background:
                "linear-gradient(135deg,#00FFD1 0%,#3A0CA3 40%,#8338EC 100%)",
            }}
          >
            Explore AEP
          </a>
          <a
            href="#feed"
            className="rounded-xl2 border border-white/15 px-6 py-3 transition hover:bg-white/5"
          >
            View Live Feed
          </a>
        </motion.div>
      </div>

      <Section delay={0.1} className="relative z-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 pb-10 md:grid-cols-2">
          <div className="rounded-2xl border-card bg-card/70 p-6 backdrop-blur">
            <h3 className="mb-2 font-[var(--font-grotesk)] text-2xl">
              The Problem
            </h3>
            <ul className="space-y-2 list-disc pl-5 text-white/80">
              <li>Context loss across teams and tools</li>
              <li>PR bottlenecks and flaky tests</li>
              <li>Dependency drift and toil</li>
            </ul>
          </div>
          <div className="rounded-2xl border-card bg-card/70 p-6 backdrop-blur">
            <h3 className="mb-2 font-[var(--font-grotesk)] text-2xl">
              AEP’s Promise
            </h3>
            <ul className="space-y-2 list-disc pl-5 text-white/80">
              <li>Autonomous coding & PR management</li>
              <li>Memory graphs with evolving context</li>
              <li>Self-healing Ops and dependency control</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section delay={0.05} className="relative z-10">
        <div id="graph" className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-3 text-sm font-medium text-white/70">
            Memory Graph (interactive)
          </div>
          <MemoryGraph />
        </div>
      </Section>

      <Section delay={0.05} className="relative z-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <LiveFeed />
          </div>
          <div className="rounded-2xl border-card bg-card/70 p-6 backdrop-blur">
            <div className="mb-3 text-sm font-medium text-white/70">
              Key Metrics
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <Metric label="PRs merged" value="128" />
              <Metric label="Test pass" value="99.1%" />
              <Metric label="Deploys" value="47" />
              <Metric label="Agents active" value="5" />
            </div>
          </div>
        </div>
      </Section>

      <Section delay={0.05} className="relative z-10">
        <div className="mx-auto max-w-5xl rounded-2xl border-card bg-card/70 px-6 py-14 text-center backdrop-blur">
          <h3 className="mb-4 font-[var(--font-grotesk)] text-3xl">
            Ready to see AEP in action?
          </h3>
          <p className="mb-6 text-white/80">
            Join the beta and help shape the future of autonomous engineering.
          </p>
          <a
            href="https://example.com/waitlist"
            className="inline-block rounded-xl2 px-6 py-3 font-medium text-[#052A28] shadow-aep-glow"
            style={{
              background:
                "linear-gradient(135deg,#00FFD1 0%,#3A0CA3 40%,#8338EC 100%)",
            }}
          >
            Request Beta Access
          </a>
        </div>
        <div className="h-24" />
      </Section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl2 border-card bg-card/80 p-4">
      <div className="text-2xl font-[var(--font-grotesk)]">{value}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
}
