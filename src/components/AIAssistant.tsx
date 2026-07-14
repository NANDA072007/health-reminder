import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, Brain, ShieldCheck, Mic, CheckCircle } from 'lucide-react';
import { assistantScript } from '../data/mockData';
import { ChatMessage } from '../types';
import AIOrb from './AIOrb';

// Custom Typewriter text animation with pulsing cursor
function TypewriterText({ text, speed = 18, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="font-sans text-xs leading-relaxed break-words relative">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3.5 ml-0.5 bg-brand-emerald align-middle"
      >
        |
      </motion.span>
    </span>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [localToast, setLocalToast] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the first two messages
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([assistantScript[0]]);
    }, 1000);

    const timer2 = setTimeout(() => {
      setIsTyping(true);
    }, 2200);

    const timer3 = setTimeout(() => {
      setIsTyping(false);
      const initialReply = assistantScript[1];
      setMessages((prev) => [...prev, initialReply]);
      setTypingMessageId(initialReply.id);
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Scroll to bottom on message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const showLocalToast = (msg: string) => {
    setLocalToast(msg);
    setTimeout(() => setLocalToast(null), 2500);
  };

  // Handle user sending a custom or scripted message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: `chat-u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Trigger AI Typing Response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Analyze question to give smart responses
      let replyText = "I received your query. Our clinical knowledge base is currently analyzing your biometric records. Let me know if there's anything else you'd like to check!";
      
      if (text.toLowerCase().includes('water') || text.toLowerCase().includes('hydrate') || text.toLowerCase().includes('hydration')) {
        replyText = "Your smartwatch logs report 1,250ml of water consumed. Based on today's humidity and your activity level, I suggest drinking another 250ml glass in the next hour to reach peak hydration compliance.";
      } else if (text.toLowerCase().includes('grandfather') || text.toLowerCase().includes('arthur') || text.toLowerCase().includes('vitals')) {
        replyText = "I have flagged a vital alert for Arthur Miller (Grandfather). He missed his 08:00 AM Ramipril 5mg dose, and his blood pressure ticked up to 142 mmHg. I have automatically alerted Sarah (Mother) and queued an automated nudge.";
      } else if (text.toLowerCase().includes('forgot') || text.toLowerCase().includes('missed') || text.toLowerCase().includes('medicine')) {
        replyText = "I see. Missing a dosage is common. Since it's within the 2-hour safety threshold for Vitamin D3, you should take 1 capsule now with water. I have adjusted your evening supplements to optimize absorption.";
      }

      const assistantMsg: ChatMessage = {
        id: `chat-a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setTypingMessageId(assistantMsg.id);
    }, 1800);
  };

  // Simulate premium voice captured input
  const handleVoiceInput = () => {
    if (isListening) return;
    setIsListening(true);
    showLocalToast("Listening... Speak your query.");

    setTimeout(() => {
      setIsListening(false);
      const voiceQueries = [
        "What is my current hydration status?",
        "I forgot my medicine.",
        "Is Grandfather’s vitals looking normal?"
      ];
      const selected = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
      setInputText(selected);
      showLocalToast(`Voice captured: "${selected}"`);
    }, 2500);
  };

  const presetPrompts = [
    { text: 'I forgot my medicine.', label: 'Missed Dose' },
    { text: 'What is my current hydration status?', label: 'Water Goal' },
    { text: 'Is Grandfather’s vitals looking normal?', label: 'Check Family' }
  ];

  // Framer Motion Suggested Prompts Entrance
  const suggestionsContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const suggestionItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 12 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } }
  };

  return (
    <section id="assistant" className="py-24 bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient background */}
      <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] rounded-full bg-brand-emerald/5 dark:bg-brand-emerald/2 filter blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-brand-purple/5 dark:bg-brand-purple/2 filter blur-3xl z-0 pointer-events-none" />

      {/* Local floating notification for Voice */}
      <AnimatePresence>
        {localToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl text-center flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
            <span className="text-white text-xs font-medium font-sans">{localToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Interactive AI Assistant
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark dark:text-white mb-4">
            Talk to your clinical data, in plain English.
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300">
            Our specialized Large Language Model is trained exclusively on certified pharmacological guidelines and your encrypted telemetry, answering urgent questions instantly.
          </p>
        </div>

        {/* Chat Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Immersive AI Orb Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mb-4"
            >
              <AIOrb isListening={isListening} isTyping={isTyping} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="max-w-xs"
            >
              <h3 className="font-display font-bold text-base text-brand-dark dark:text-white mb-1">
                Lumina Core V2
              </h3>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The visual frequency of the Lumina Core adapts dynamically to your voice inputs, speech patterns, and cognitive telemetry queries.
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Chat Interface Container */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col h-[520px] relative transition-colors duration-300"
            >
              {/* Chat Header */}
              <div className="p-4 bg-slate-900 dark:bg-slate-950 flex items-center justify-between border-b border-white/5 z-20">
                <div className="flex items-center gap-3">
                  {/* Glowing Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-brand-emerald flex items-center justify-center shadow-lg shadow-brand-emerald/30">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-brand-emerald border-2 border-slate-900 animate-pulse" />
                  </div>
                  
                  <div>
                    <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                      Health Companion AI
                      <Sparkles className="w-3.5 h-3.5 text-brand-sky animate-pulse" />
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-brand-emerald" />
                      Assistant Online • End-to-End Encrypted
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                  <span className="text-[9px] font-bold text-slate-300 tracking-wider uppercase font-mono">HIPAA</span>
                </div>
              </div>

              {/* Message Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20 scrollbar-none">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => {
                    const isAssistant = msg.sender === 'assistant';
                    const isTypingActive = typingMessageId === msg.id;

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3.5 max-w-[85%] ${isAssistant ? 'self-start' : 'self-end flex-row-reverse ml-auto'}`}
                      >
                        {/* Avatar inside Bubble */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                          isAssistant 
                            ? 'bg-brand-emerald/15 border-brand-emerald/20 text-brand-emerald dark:bg-brand-emerald/10 dark:border-brand-emerald/30' 
                            : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                        }`}>
                          {isAssistant ? <Brain className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>

                        {/* Chat Bubble Body */}
                        <div className={`p-4 rounded-2xl flex flex-col gap-1 shadow-sm ${
                          isAssistant
                            ? 'bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-white/5 text-slate-800 dark:text-slate-100 rounded-tl-none'
                            : 'bg-slate-900 dark:bg-slate-950 text-white dark:text-slate-100 rounded-tr-none border border-white/5'
                        }`}>
                          {isAssistant && isTypingActive ? (
                            <TypewriterText 
                              text={msg.text} 
                              onComplete={() => setTypingMessageId(null)} 
                            />
                          ) : (
                            <p className="font-sans text-xs leading-relaxed break-words">
                              {msg.text}
                            </p>
                          )}
                          <span className="text-[8px] font-mono self-end text-slate-400 dark:text-slate-500">
                            {msg.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Loading/Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3.5 max-w-[85%] self-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-emerald/15 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-white/5 rounded-tl-none flex gap-1 items-center shadow-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Quick Presets Area (Staggered Animation) */}
              <motion.div
                variants={suggestionsContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="px-6 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-2 z-10 items-center"
              >
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mr-1">SUGGESTIONS:</span>
                {presetPrompts.map((p) => (
                  <motion.button
                    variants={suggestionItemVariants}
                    key={p.label}
                    onClick={() => handleSendMessage(p.text)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-brand-emerald/10 hover:text-brand-emerald border border-slate-200/80 dark:border-white/10 hover:border-brand-emerald/20 dark:hover:border-brand-emerald/30 text-xs font-medium text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                  >
                    {p.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Input Form with Voice Button */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 flex gap-2 items-center z-10 transition-colors duration-300">
                
                {/* Pulsing Voice Input Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceInput}
                  animate={isListening ? { scale: [1, 1.1, 1], borderColor: ['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.7)', 'rgba(16, 185, 129, 0.2)'] } : {}}
                  transition={isListening ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } : {}}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                    isListening 
                      ? 'bg-brand-emerald/15 border-brand-emerald text-brand-emerald' 
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                  }`}
                  title="Voice Query"
                >
                  <Mic className={`w-4.5 h-4.5 ${isListening ? 'text-brand-emerald' : ''}`} />
                </motion.button>

                <input
                  type="text"
                  placeholder={isListening ? "Listening... Speak now." : "Type your medication or health query..."}
                  value={inputText}
                  disabled={isListening}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-brand-emerald dark:focus:border-brand-emerald focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all"
                />

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSendMessage(inputText)}
                  className="w-11 h-11 rounded-xl bg-slate-950 dark:bg-white dark:text-slate-900 text-white flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
