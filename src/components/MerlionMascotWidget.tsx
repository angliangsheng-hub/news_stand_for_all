import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Compass, Lightbulb, Bot } from 'lucide-react';
import merlionAvatarImg from '../assets/images/merlion_mascot_1791434924958.jpg';
import { WeatherData, SingaporeHoliday } from '../types';

interface MerlionMascotWidgetProps {
  weather: WeatherData | null;
  currentHoliday: SingaporeHoliday | null;
  onSelectTopic: (topic: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'merlion';
  text: string;
  timestamp: string;
}

export const MerlionMascotWidget: React.FC<MerlionMascotWidgetProps> = ({
  weather,
  currentHoliday,
  onSelectTopic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'merlion',
      text: `Greetings! 🦁🌊 I am Prof M, your Singapore news scholar and guide! Today around Marina Bay it is a pleasant ${
        weather?.temperature || 30
      }°C with tropical breezes. With ${
        currentHoliday?.name || 'the festive season'
      } approaching, feel free to ask me to analyse any breaking world headline or Singapore policy dispatch!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Top 3 Startup Prompts (Miro Board Page 1)
  const startupPrompts = [
    '🇸🇬 Summarise how today\'s global tech news affects Singapore',
    '🌦️ What is the weather & top headlines for this weekend in SG?',
    '🏮 Any public holiday festive news or upcoming long weekends?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) throw new Error('Chat failed');

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `merlion-${Date.now()}`,
        role: 'merlion',
        text: data.reply || 'Greetings! I\'ve reviewed today\'s wires for you. 🦁',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `merlion-err-${Date.now()}`,
        role: 'merlion',
        text: 'Greetings! The scholarly wire is momentarily refreshing, but I encourage checking our regional trade and culture briefings! 🦁🌊',
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside aria-label="Prof M AI Assistant" className="fixed bottom-6 right-6 z-50">
      {/* Floating Mascot Trigger Avatar */}
      {!isOpen && (
        <div className="relative group">
          {/* Subtle Speech Bubble Hint */}
          <div className="absolute bottom-full right-0 mb-3 bg-stone-900 text-white text-[11px] py-1 px-3 rounded-full shadow-lg whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ask Prof M · {weather?.temperature || 30}°C SG</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full border-2 border-white shadow-xl overflow-hidden hover:scale-105 active:scale-95 transition-all bg-amber-50 cursor-pointer relative"
            title="Chat with Prof M"
          >
            <img
              src={merlionAvatarImg}
              alt="Prof M Mascot"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </button>
        </div>
      )}

      {/* Expanded Live Chat Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] bg-white border border-stone-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-amber-300 overflow-hidden bg-white shrink-0">
                <img
                  src={merlionAvatarImg}
                  alt="Prof M"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-editorial text-sm font-semibold">Prof M</h3>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-1 rounded font-mono">
                    AI Scholar · SG
                  </span>
                </div>
                <p className="text-[10px] text-stone-300">
                  {weather?.condition || 'Fair'} · {weather?.temperature || 30}°C · {currentHoliday?.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-700/50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Recommend Button */}
          <div className="bg-amber-50/70 border-b border-amber-200/60 px-3 py-1.5 flex items-center justify-between text-[11px] text-stone-700">
            <span className="text-stone-500">Unsure what to read?</span>
            <button
              onClick={() => handleSendMessage('Recommend the most important story for me today')}
              className="text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1 cursor-pointer underline"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Ask Prof M for Recommendations</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAF8F5]/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'merlion' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-amber-200 mt-0.5 bg-white">
                    <img src={merlionAvatarImg} alt="Prof M" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-xl p-3 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200/80 text-stone-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-serif text-[12px]">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.role === 'user' ? 'text-stone-400 text-right' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-stone-500 font-serif italic">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-200 bg-white">
                  <img src={merlionAvatarImg} alt="Prof M" className="w-full h-full object-cover animate-pulse" />
                </div>
                <span>Prof M is reviewing the latest global dispatches... 🦁</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Top 3 Startup Prompts (Page 1 requirement) */}
          <div className="p-2.5 bg-white border-t border-stone-200/70 space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block px-1">
              Top Prompts for Prof M:
            </span>
            <div className="flex flex-col gap-1">
              {startupPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-[11px] text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 p-1.5 rounded border border-stone-200/50 truncate transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Free Text Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-stone-50 border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Prof M (e.g. Singapore news, weather)..."
              className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-stone-800"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
