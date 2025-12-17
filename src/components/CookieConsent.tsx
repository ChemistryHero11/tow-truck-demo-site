"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-safety-orange/20 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-safety-orange" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">We use cookies</h3>
                <p className="text-white/60 text-sm">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={acceptEssential}
                  className="px-4 py-2 border border-white/20 hover:border-white/40 rounded-lg text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-safety-orange hover:bg-orange-500 rounded-lg text-white transition-colors text-sm font-medium"
                >
                  Accept All
                </button>
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 md:relative md:top-auto md:right-auto p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
