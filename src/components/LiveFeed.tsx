"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { id: string; text: string; ts: number };

const agents = ["Orion", "Lyra", "Atlas", "Nova", "Helix"];
const actions = [
  (n: number) => `merged PR #${110 + n}`,
  (n: number) => `opened PR #${130 + n}`,
  (n: number) => `deployed build ${400 + n} to staging`,
  (n: number) => `resolved test flake in suite ${12 + (n % 3)}`,
  (n: number) => `expanded memory graph with ${2 + (n % 4)} nodes`,
];

function createRandomGenerator(seed = 1) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export default function LiveFeed() {
  const generatorRef = useRef<() => number>();
  if (generatorRef.current == null) {
    generatorRef.current = createRandomGenerator(2025);
  }

  const [items, setItems] = useState<Item[]>(() => {
    const generator = createRandomGenerator(13579);
    return Array.from({ length: 4 }, () => makeItem(generator));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const generator = generatorRef.current!;
        const next = [makeItem(generator), ...prev];
        return next.slice(0, 6);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="feed" className="rounded-2xl border-card bg-card/70 p-4 backdrop-blur">
      <div className="mb-2 text-sm font-medium text-white/70">
        Live System Feed
      </div>
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-sm text-white/90"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#00FFD1,#3A0CA3)",
                }}
              />
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function makeItem(random: () => number) {
  const roll = random();
  const agent = agents[Math.floor(random() * agents.length)];
  const actionTemplate = actions[Math.floor(random() * actions.length)];
  const magnitude = Math.floor(roll * 50);
  const text = `Agent ${agent} ${actionTemplate(magnitude)}`;
  return { id: `${Date.now()}-${Math.floor(roll * 1_000_000)}`, text, ts: Date.now() };
}
