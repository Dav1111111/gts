import { useState, useCallback } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "figma:asset/fb8b36291948fa2b0a9811223c10b0ff0cf9d994.png";
import { Send, Bot, User, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useCMS } from "../cms/CMSProvider";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text?: string;
  card?: {
    title: string;
    price: string;
    image: string;
    features: string[];
  };
}

export function GTSHeroSection() {
  const { data: { hero } } = useCMS();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      text: hero.chatBotGreeting
    }
  ]);

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: chatInput
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput("");

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Отличный выбор! Вот что у нас есть:",
        card: {
          title: "Yamaha 252S",
          price: "от 25,000₽/день",
          image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          features: ["12 пассажиров", "320 л.с.", "Премиум интерьер"]
        }
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  }, [chatInput]);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Image — character centered */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={heroImage}
          alt="GTS Premium Experience"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft left edge gradient */}
        <div 
          className="absolute inset-0 hidden lg:block"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.3) 82%, rgba(0,0,0,0.75) 100%)"
          }}
        />
        {/* Mobile: lighter overall tint so text reads */}
        <div 
          className="absolute inset-0 lg:hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.9) 100%)"
          }}
        />
        {/* Top fade for nav readability */}
        <div 
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)"
          }}
        />
        {/* Bottom fade */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 hidden lg:block"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)"
          }}
        />
      </div>
      
      {/* === DESKTOP / TABLET layout === */}
      <div className="relative z-10 hidden lg:flex h-full items-end pb-12 xl:pb-16">
        <div className="w-full max-w-[1600px] mx-auto px-8 xl:px-16 flex items-end justify-between">
          
          {/* Left — Title block, hugging left edge */}
          <motion.div 
            className="max-w-[340px] xl:max-w-[380px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 
              className="text-5xl xl:text-6xl 2xl:text-7xl tracking-wider leading-[1.05] mb-4"
              style={{ letterSpacing: "0.06em" }}
            >
              <span className="text-[#BE0607]">{hero.title.split(' ')[0]}</span><br />
              <span className="text-[#BE0607]">{hero.title.split(' ').slice(1).join(' ')}</span>{" "}
              <span className="text-white">{hero.titleAccent}</span>
            </h1>
            
            <p 
              className="text-sm xl:text-base font-light tracking-wide leading-relaxed whitespace-pre-line"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {hero.subtitle}
            </p>
          </motion.div>

          {/* Right — AI Chat, hugging right edge */}
          <motion.div 
            className="w-[320px] xl:w-[340px] flex-shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div 
              className="backdrop-blur-xl rounded-2xl p-4 border"
              style={{ 
                background: "rgba(0,0,0,0.55)", 
                borderColor: "rgba(255,255,255,0.08)" 
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#91040C] flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs tracking-wide">AI Консультант</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>
              
              {/* Messages */}
              <div className="space-y-2 mb-3 max-h-[150px] overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-1.5 max-w-[90%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-white' : 'bg-[#91040C]'}`}>
                          {message.type === 'user' ? 
                            <User className="w-2.5 h-2.5 stroke-2 text-black" aria-hidden="true" /> :
                            <Bot className="w-2.5 h-2.5 stroke-2 text-white" aria-hidden="true" />
                          }
                        </div>
                        <div 
                          className="px-2.5 py-1.5 rounded-xl text-xs leading-relaxed"
                          style={{
                            background: message.type === 'user' ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.08)",
                            color: message.type === 'user' ? "#000" : "#fff"
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                    
                    {message.card && (
                      <div className="ml-6">
                        <div 
                          className="rounded-xl p-2 border"
                          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                        >
                          <div className="flex gap-2">
                            <ImageWithFallback
                              src={message.card.image}
                              alt={message.card.title}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-xs truncate">{message.card.title}</h4>
                              <p className="text-[#BE0607] text-xs mt-0.5">{message.card.price}</p>
                              <p className="text-[10px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {message.card.features.join(" · ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div 
                className="flex items-center gap-2 rounded-xl px-3 py-1.5 border"
                style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded text-white text-xs h-7"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-7 h-7 rounded-lg bg-[#91040C] hover:bg-[#a50e16] flex items-center justify-center flex-shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-yellow-500"
                  aria-label="Отправить сообщение"
                >
                  <Send className="w-3 h-3 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* === MOBILE layout === */}
      <div className="relative z-10 lg:hidden flex flex-col h-full">
        {/* Top — just title, compact */}
        <motion.div 
          className="pt-24 px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-3xl sm:text-4xl tracking-wider leading-[1.1]"
            style={{ letterSpacing: "0.06em" }}
          >
            <span className="text-[#BE0607]">{hero.title}</span>{" "}
            <span className="text-white">{hero.titleAccent}</span>
          </h1>
        </motion.div>

        {/* Spacer — character shows here */}
        <div className="flex-1" />

        {/* Bottom — compact chat */}
        <motion.div 
          className="px-4 pb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="backdrop-blur-xl rounded-2xl p-3 border"
            style={{ background: "rgba(0,0,0,0.6)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#91040C] flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-white text-[11px] tracking-wide">AI Консультант</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>

            {/* Last message only on mobile */}
            <div className="mb-2">
              {messages.length > 0 && (
                <div 
                  className="px-2.5 py-1.5 rounded-xl text-xs leading-relaxed inline-block"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
                >
                  {messages[messages.length - 1].text}
                </div>
              )}
            </div>

            {/* Input */}
            <div 
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 border"
              style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Задайте вопрос..."
                className="flex-1 bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded text-white text-xs h-7"
              />
              <button
                onClick={handleSendMessage}
                className="w-7 h-7 rounded-lg bg-[#91040C] hover:bg-[#a50e16] flex items-center justify-center flex-shrink-0 transition-colors focus-visible:ring-2 focus-visible:ring-yellow-500"
                aria-label="Отправить сообщение"
              >
                <Send className="w-3 h-3 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
