"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <motion.h1
        className="text-5xl font-bold text-[#7b4b2a]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to <span className="text-[#a76532]">LynTasks</span>
      </motion.h1>

      <motion.p
        className="text-lg text-[#5a3b22] max-w-xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Manage your daily tasks, chat with an AI assistant, and stay productive — 
        all in one beautiful workspace built with love and soft tones.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/todos"
          className="px-6 py-3 bg-[#c78a49] text-white rounded-xl shadow hover:bg-[#b47b40] transition"
        >
          Go to Todos
        </Link>

        <Link
          href="/chat"
          className="px-6 py-3 bg-[#f7c99a] text-[#4a2e16] rounded-xl shadow hover:bg-[#f5b982] transition"
        >
          Open Chat Assistant
        </Link>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 w-full">
        {[
          {
            title: "Organize with Ease",
            desc: "Stay on top of your goals by managing todos efficiently with sorting and filtering.",
          },
          {
            title: "Chat with AI",
            desc: "Get assistance or brainstorm ideas using our built-in Chat Assistant.",
          },
          {
            title: "Sync Effortlessly",
            desc: "Your data stays up-to-date, online or offline — so you never lose progress.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-[#fff5ea] rounded-2xl p-6 shadow-md hover:shadow-lg transition text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
          >
            <h2 className="text-xl font-semibold text-[#7b4b2a] mb-2">
              {card.title}
            </h2>
            <p className="text-[#5a3b22]">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
