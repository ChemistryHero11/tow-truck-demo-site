"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Truck, Phone, MapPin, Car, Clock, CheckCircle2 } from "lucide-react";

interface ChatStep {
  id: string;
  botMessage: string;
  options?: {
    text: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  isEnd?: boolean;
}

interface LeadData {
  serviceType?: string;
  vehicleType?: string;
  urgency?: string;
  location?: string;
}

const chatFlow: ChatStep[] = [
  {
    id: "welcome",
    botMessage: "Hey there! 👋 Need help getting back on the road? Let me get you a quick quote.",
    options: [
      { text: "Yes, I need a tow", value: "tow", icon: <Truck className="w-4 h-4" /> },
      { text: "Locked out of my car", value: "lockout", icon: <Car className="w-4 h-4" /> },
      { text: "Dead battery / Flat tire", value: "roadside", icon: <Clock className="w-4 h-4" /> },
      { text: "Just browsing", value: "browse", icon: <CheckCircle2 className="w-4 h-4" /> },
    ],
  },
  {
    id: "vehicle",
    botMessage: "Got it! What type of vehicle do you have?",
    options: [
      { text: "Car / Sedan / Coupe", value: "car" },
      { text: "SUV / Truck / Van", value: "suv" },
      { text: "Motorcycle", value: "motorcycle" },
      { text: "Semi / Commercial", value: "commercial" },
    ],
  },
  {
    id: "urgency",
    botMessage: "How urgent is your situation?",
    options: [
      { text: "🚨 Emergency - Stranded now!", value: "emergency" },
      { text: "⏰ Within the next hour", value: "soon" },
      { text: "📅 Scheduling for later", value: "scheduled" },
    ],
  },
  {
    id: "location",
    botMessage: "Where are you located? (Approximate area is fine)",
    options: [
      { text: "Downtown Houston", value: "downtown" },
      { text: "North Houston / The Woodlands", value: "north" },
      { text: "South Houston / Pearland", value: "south" },
      { text: "East Houston / Pasadena", value: "east" },
      { text: "West Houston / Katy", value: "west" },
      { text: "Other area", value: "other" },
    ],
  },
  {
    id: "contact",
    botMessage: "Perfect! 🎉 Based on your info, we can have a truck to you in about **25-30 minutes**. How would you like to proceed?",
    options: [
      { text: "📞 Call me now", value: "call", icon: <Phone className="w-4 h-4" /> },
      { text: "💬 I'll call you", value: "self_call", icon: <Phone className="w-4 h-4" /> },
      { text: "📍 Get directions to shop", value: "directions", icon: <MapPin className="w-4 h-4" /> },
    ],
  },
  {
    id: "call_prompt",
    botMessage: "Great choice! Tap below to connect with our dispatcher immediately. They'll confirm your location and send help right away.",
    isEnd: true,
  },
  {
    id: "self_call_info",
    botMessage: "No problem! Call us anytime at **(555) 123-4567**. We're available 24/7 and ready to help!",
    isEnd: true,
  },
  {
    id: "browse_end",
    botMessage: "No worries! Feel free to look around. If you ever need us, we're just a tap away. Stay safe out there! 🚗",
    isEnd: true,
  },
  {
    id: "directions_end",
    botMessage: "Our shop is at **123 Tow Lane, Houston TX**. We're open 24/7 for drop-offs. See you soon!",
    isEnd: true,
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ message: string; isBot: boolean; options?: ChatStep["options"] }[]>([]);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStep = chatFlow[currentStepIndex];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      setTimeout(() => {
        setChatHistory([
          { message: chatFlow[0].botMessage, isBot: true, options: chatFlow[0].options },
        ]);
      }, 500);
    }
  }, [isOpen, chatHistory.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPulse(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOptionClick = (option: { text: string; value: string }) => {
    setChatHistory((prev) => [...prev, { message: option.text, isBot: false }]);

    const stepId = currentStep.id;
    if (stepId === "welcome") {
      setLeadData((prev) => ({ ...prev, serviceType: option.value }));
    } else if (stepId === "vehicle") {
      setLeadData((prev) => ({ ...prev, vehicleType: option.value }));
    } else if (stepId === "urgency") {
      setLeadData((prev) => ({ ...prev, urgency: option.value }));
    } else if (stepId === "location") {
      setLeadData((prev) => ({ ...prev, location: option.value }));
    }

    let nextStep: ChatStep | undefined;

    if (option.value === "browse") {
      nextStep = chatFlow.find((s) => s.id === "browse_end");
    } else if (option.value === "call") {
      nextStep = chatFlow.find((s) => s.id === "call_prompt");
    } else if (option.value === "self_call") {
      nextStep = chatFlow.find((s) => s.id === "self_call_info");
    } else if (option.value === "directions") {
      nextStep = chatFlow.find((s) => s.id === "directions_end");
    } else {
      const currentIndex = chatFlow.findIndex((s) => s.id === currentStep.id);
      nextStep = chatFlow[currentIndex + 1];
    }

    if (nextStep) {
      setCurrentStepIndex(chatFlow.indexOf(nextStep));
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { message: nextStep!.botMessage, isBot: true, options: nextStep!.options },
        ]);
      }, 800);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setChatHistory([]);
    setLeadData({});
    setTimeout(() => {
      setChatHistory([
        { message: chatFlow[0].botMessage, isBot: true, options: chatFlow[0].options },
      ]);
    }, 300);
  };

  const lastMessage = chatHistory[chatHistory.length - 1];
  const showOptions = lastMessage?.isBot && lastMessage?.options;

  console.log("Lead data collected:", leadData);

  return (
    <>
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setShowPulse(false);
        }}
        className={`fixed bottom-24 sm:bottom-6 right-6 z-50 w-16 h-16 bg-safety-orange rounded-full flex items-center justify-center shadow-2xl shadow-safety-orange/30 ${
          isOpen ? "hidden" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
        {showPulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-safety-orange animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">1</span>
            </span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 sm:bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-safety-orange to-orange-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">RapidTow Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-white/90 text-sm">Online now</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {chatHistory.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${item.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      item.isBot
                        ? "bg-slate-700 text-white rounded-bl-none"
                        : "bg-safety-orange text-white rounded-br-none"
                    }`}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: item.message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 pt-2"
                >
                  {lastMessage.options?.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleOptionClick(option)}
                      className="w-full flex items-center gap-3 p-3 bg-slate-700/80 hover:bg-safety-orange/20 border border-slate-600 hover:border-safety-orange rounded-xl text-left text-white text-sm transition-all duration-200 group"
                    >
                      {option.icon && (
                        <span className="text-safety-orange group-hover:scale-110 transition-transform">
                          {option.icon}
                        </span>
                      )}
                      <span className="flex-1">{option.text}</span>
                      <span className="text-white/30 group-hover:text-safety-orange transition-colors">→</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {currentStep.isEnd && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-4"
                >
                  {currentStep.id === "call_prompt" && (
                    <a
                      href="tel:+15551234567"
                      className="flex items-center justify-center gap-2 w-full p-4 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call (555) 123-4567
                    </a>
                  )}
                  <button
                    onClick={handleRestart}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white/70 text-sm transition-colors"
                  >
                    ↩ Start over
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-slate-700 bg-slate-800">
              <p className="text-center text-white/40 text-xs">
                🔒 Your information is secure and private
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
