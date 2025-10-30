"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface KnowledgeQuery {
  id: string;
  question: string;
  answer: string;
  sources: {
    type: "slack" | "jira" | "confluence" | "teams" | "zoom" | "github";
    title: string;
    url: string;
    snippet: string;
    date: string;
  }[];
  relatedTasks?: string[];
}

const mockQueries: KnowledgeQuery[] = [
  {
    id: "1",
    question: "What is the dev environment link?",
    answer: "The development environment is hosted at https://dev-api.company.com:8443. Based on the latest infrastructure update, the environment was migrated to AWS ECS with auto-scaling enabled.",
    sources: [
      {
        type: "confluence",
        title: "Development Environment Setup Guide",
        url: "https://company.atlassian.net/wiki/dev-env-setup",
        snippet: "Dev environment URL: https://dev-api.company.com:8443 (Updated: Nov 2024)",
        date: "2024-11-15"
      },
      {
        type: "slack",
        title: "#infrastructure-updates",
        url: "https://company.slack.com/archives/C123456/p1699123456",
        snippet: "🚀 Dev environment migration complete! New URL is live and load-balanced.",
        date: "2024-11-10"
      },
      {
        type: "jira",
        title: "INFRA-2847: Migrate dev environment to ECS",
        url: "https://company.atlassian.net/browse/INFRA-2847",
        snippet: "Migration completed successfully. All services responding on new endpoint.",
        date: "2024-11-08"
      }
    ]
  },
  {
    id: "2", 
    question: "What are the useful resources for implementing JWT authentication?",
    answer: "Based on your current task AUTH-1234, here are the most relevant resources for JWT implementation in our stack. The team has established patterns using our custom TokenManager class with Redis caching.",
    sources: [
      {
        type: "confluence",
        title: "Authentication Architecture Guide",
        url: "https://company.atlassian.net/wiki/auth-guide",
        snippet: "JWT implementation with Redis caching and refresh token rotation strategy...",
        date: "2024-10-20"
      },
      {
        type: "github",
        title: "auth/TokenManager.ts - Reference Implementation",
        url: "https://github.com/company/api/blob/main/src/auth/TokenManager.ts",
        snippet: "class TokenManager { private static instance; async getValidToken()...",
        date: "2024-11-01"
      },
      {
        type: "zoom",
        title: "Architecture Review: Auth Strategy",
        url: "https://zoom.us/rec/share/auth-review-oct2024",
        snippet: "Discussed JWT implementation patterns, decided on Redis for token storage...",
        date: "2024-10-18"
      },
      {
        type: "teams",
        title: "Security Best Practices - Auth Team",
        url: "https://teams.microsoft.com/l/message/auth-team/123456",
        snippet: "Remember to implement proper token rotation and use httpOnly cookies...",
        date: "2024-10-25"
      }
    ],
    relatedTasks: ["AUTH-1234: Implement JWT refresh logic", "AUTH-1235: Add token rotation", "SEC-567: Security audit for auth flow"]
  }
];

function SourceCard({ source }: { source: KnowledgeQuery["sources"][0] }) {
  const getSourceIcon = (type: string) => {
    const icons = {
      slack: "💬",
      jira: "🎯", 
      confluence: "📖",
      teams: "👥",
      zoom: "🎥",
      github: "🐙"
    };
    return icons[type as keyof typeof icons] || "📄";
  };

  const getSourceColor = (type: string) => {
    const colors = {
      slack: "#E01E5A",
      jira: "#0052CC",
      confluence: "#172B4D", 
      teams: "#6264A7",
      zoom: "#2D8CFF",
      github: "#24292e"
    };
    return colors[type as keyof typeof colors] || "#666";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:bg-black/40"
    >
      <div className="flex items-start gap-3">
        <div 
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          style={{ backgroundColor: `${getSourceColor(source.type)}20`, color: getSourceColor(source.type) }}
        >
          {getSourceIcon(source.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white truncate">{source.title}</h4>
            <span className="text-xs text-white/50">{source.date}</span>
          </div>
          
          <p className="mt-1 text-xs text-white/70 line-clamp-2">{source.snippet}</p>
          
          <motion.a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 2 }}
            className="mt-2 inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300"
          >
            Open in {source.type.charAt(0).toUpperCase() + source.type.slice(1)} →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function KnowledgeDemo() {
  const [currentQuery, setCurrentQuery] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  
  const query = mockQueries[currentQuery];

  useEffect(() => {
    setIsTyping(true);
    setDisplayedAnswer("");
    
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeAnswer = () => {
      if (currentIndex < query.answer.length) {
        setDisplayedAnswer(query.answer.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeAnswer, 30);
      } else {
        setIsTyping(false);
      }
    };
    
    const startTimeout = setTimeout(typeAnswer, 500);
    
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [currentQuery, query.answer]);

  const nextQuery = () => {
    setCurrentQuery((prev) => (prev + 1) % mockQueries.length);
  };

  return (
    <div className="space-y-6">
      {/* Query Input */}
      <div className="rounded-2xl border border-cyan-400/20 bg-black/40 p-6 backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-white/70">AEP Knowledge Assistant</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-xl border border-white/20 bg-black/30 p-4">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">❯</span>
              <span className="text-white font-mono">{query.question}</span>
            </div>
          </div>
          
          <motion.button
            onClick={nextQuery}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-cyan-400/20 px-6 py-4 text-cyan-400 hover:bg-cyan-400/30"
          >
            Try Another →
          </motion.button>
        </div>
      </div>

      {/* Answer */}
      <motion.div
        key={currentQuery}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-purple-400/20 bg-black/40 p-6 backdrop-blur"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
            AEP
          </div>
          <span className="text-sm text-white/70">Intelligent Response</span>
        </div>
        
        <div className="text-white/90 leading-relaxed">
          {displayedAnswer}
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 text-cyan-400"
            >
              ▋
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Sources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 0.5 : 1 }}
        transition={{ delay: isTyping ? 0 : 0.5 }}
        className="space-y-4"
      >
        <h4 className="text-lg font-semibold text-white">Sources & References</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {query.sources.map((source, index) => (
            <motion.div
              key={source.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isTyping ? 0 : index * 0.1 + 0.7 }}
            >
              <SourceCard source={source} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Related Tasks */}
      {query.relatedTasks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTyping ? 0.5 : 1 }}
          transition={{ delay: isTyping ? 0 : 1 }}
          className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4"
        >
          <h5 className="text-sm font-medium text-yellow-400 mb-2">Related Tasks</h5>
          <div className="space-y-2">
            {query.relatedTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                <span className="h-1 w-1 rounded-full bg-yellow-400"></span>
                {task}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function KnowledgeAssistant() {
  return (
    <section id="knowledge" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.1),transparent_70%)]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-6">
            <span className="inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-sm font-medium text-purple-400 backdrop-blur">
              🧠 Revolutionary Knowledge Intelligence
            </span>
          </div>
          
          <h2 className="mb-6 font-[var(--font-grotesk)] text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Omniscient AI Assistant
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Ask AEP anything about your projects and get instant answers with source links from across your entire tool ecosystem. 
            <strong className="text-white"> Slack, Jira, Confluence, Teams, Zoom, GitHub</strong> — AEP knows it all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Features List */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Beyond Search. True Intelligence.</h3>
              
              {[
                {
                  icon: "🔍",
                  title: "Instant Context Retrieval",
                  desc: "Ask about any project detail and get comprehensive answers with source attribution"
                },
                {
                  icon: "🔗",
                  title: "Cross-Platform Intelligence",
                  desc: "Searches across Slack, Jira, Confluence, Teams, Zoom, GitHub simultaneously"
                },
                {
                  icon: "📋",
                  title: "Auto Task Context",
                  desc: "Select a Jira task and AEP automatically surfaces all related documentation"
                },
                {
                  icon: "📝",
                  title: "Smart Documentation",
                  desc: "Automatically documents solutions and creates searchable knowledge base"
                },
                {
                  icon: "🎯",
                  title: "Proactive Suggestions",
                  desc: "Suggests relevant wikis, docs, and resources before you even ask"
                },
                {
                  icon: "⚡",
                  title: "Real-time Updates",
                  desc: "Always current with the latest information from all connected sources"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur hover:border-purple-400/30 transition-all"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/70">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Demo */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <KnowledgeDemo />
            </motion.div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="rounded-2xl border border-cyan-400/20 bg-black/40 p-8 backdrop-blur">
            <h3 className="text-2xl font-bold text-white mb-4">
              This Changes Everything
            </h3>
            <p className="text-white/80 max-w-3xl mx-auto mb-6">
              While other tools just help you code, AEP becomes your <strong>intelligent engineering partner</strong> with 
              complete knowledge of your entire project ecosystem. No more hunting through Slack threads or forgotten Confluence pages.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-xl border border-red-400/20 bg-red-400/5">
                <h4 className="font-bold text-red-400 mb-2">Other Tools</h4>
                <p className="text-sm text-white/70">Basic code completion and chat assistance</p>
              </div>
              
              <div className="p-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <h4 className="font-bold text-cyan-400 mb-2">AEP Knowledge Assistant</h4>
                <p className="text-sm text-white/80">Complete project intelligence with instant access to all organizational knowledge</p>
              </div>
              
              <div className="p-6 rounded-xl border border-green-400/20 bg-green-400/5">
                <h4 className="font-bold text-green-400 mb-2">Your Advantage</h4>
                <p className="text-sm text-white/70">10x faster development with zero context switching</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}