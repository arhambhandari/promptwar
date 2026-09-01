"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, ShieldAlert } from "lucide-react";

export default function GenAIHelp({ context = "" }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: `Namaste! I am the official Census 2027 Assistant. How can I guide you today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, context }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Error: " + (data.error || "Something went wrong.") }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:bg-blue-800 transition flex items-center gap-2 font-semibold z-50 border-2 border-white"
        >
          <Bot size={24} /> Ask AI Help
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col z-50 h-[550px]">
          <div className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2 font-semibold">
              <Bot size={20} /> Secure Census Assistant
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition"><X size={20}/></button>
          </div>
          
          <div className="bg-blue-50 border-b p-2 text-xs text-blue-800 flex items-center gap-2 justify-center">
             <ShieldAlert size={14} /> End-to-end encrypted. Never share Aadhaar details here.
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] p-3 rounded-xl shadow-sm ${msg.role === 'ai' ? 'bg-white border text-gray-800 self-start rounded-tl-none' : 'bg-blue-600 text-white self-end rounded-tr-none'}`}>
                {/* Sanitize HTML to prevent XSS, then parse basic markdown */}
                <span dangerouslySetInnerHTML={{ 
                  __html: msg.text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>') 
                }} />
              </div>
            ))}
            {loading && (
              <div className="bg-white border text-gray-500 self-start p-3 rounded-xl rounded-tl-none text-sm animate-pulse shadow-sm">
                Analyzing securely...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              disabled={loading}
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className={`text-white p-2.5 rounded-full transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
