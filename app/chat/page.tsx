"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your assistant! How can I help with your todos?" },
  ]);
  const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const newMessage = { sender: "user", text: input };
//     setMessages([...messages, newMessage]);



//     // Fake assistant reply
//     setTimeout(() => {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: `Got it! "${input}" sounds important.` },
//       ]);
//     }, 1000);

//     setInput("");
//   };

const handleSend = async () => {
  if (!input.trim()) return;

  const newMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.reply || "I didn’t quite catch that." },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Something went wrong, please try again later." },
    ]);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff6ea] via-[#f8e9d2] to-[#fdecd4] flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-[#fff8ef] rounded-3xl shadow-lg flex flex-col p-6 border border-[#f3d7b5]">
        <h1 className="text-3xl font-bold mb-4 text-[#7a4e25] text-center">💬 Chat Assistant</h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-[#ffd7a0] self-end ml-auto text-right"
                  : "bg-[#f2e0c9] self-start text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl border border-[#f3d7b5] bg-[#fff7ee] outline-none focus:ring-2 focus:ring-[#e5b97f]"
          />
          <button
            onClick={handleSend}
            className="bg-[#e5b97f] hover:bg-[#d89e57] text-white px-5 py-3 rounded-xl transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
