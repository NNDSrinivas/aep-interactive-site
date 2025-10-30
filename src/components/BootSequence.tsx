"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  
  const stages = [
    "Initializing Autonomous Engineering Platform...",
    "Loading neural networks...",
    "Connecting to memory graph...",
    "Boot sequence complete."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update stage based on progress
        if (newProgress === 25) setStage(1);
        else if (newProgress === 50) setStage(2);
        else if (newProgress === 80) setStage(3);
        else if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0F13]"
      >
        <div className="text-center">
          {/* AEP Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              {/* Outer ring */}
              <svg width="120" height="120" className="absolute inset-0">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                  transform="rotate(-90 60 60)"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(0,255,209,0.4))"
                  }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFD1" />
                    <stop offset="50%" stopColor="#3A0CA3" />
                    <stop offset="100%" stopColor="#8338EC" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center AEP text */}
              <div className="flex h-[120px] w-[120px] items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-aep-gradient bg-clip-text text-3xl font-bold text-transparent"
                >
                  AEP
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <div className="text-sm text-white/70">
              {stages[stage]}
            </div>
            <div className="text-xs text-white/50">
              {progress}%
            </div>
          </motion.div>

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "radial-gradient(circle, rgba(0,255,209,0.3) 0%, transparent 70%)"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}