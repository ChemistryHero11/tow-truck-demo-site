"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

type Language = "en" | "es";

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

export const translations: Translations = {
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.coverage": { en: "Service Area", es: "Área de Servicio" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.faq": { en: "FAQ", es: "Preguntas" },
  "hero.badge": { en: "24/7 EMERGENCY DISPATCH ACTIVE", es: "DESPACHO DE EMERGENCIA 24/7 ACTIVO" },
  "hero.headline1": { en: "STUCK? WE'RE ALREADY", es: "¿VARADO? YA ESTAMOS" },
  "hero.headline2": { en: "ON THE WAY.", es: "EN CAMINO." },
  "hero.subheadline": { en: "24/7 Heavy Duty Towing & Roadside Recovery in Houston", es: "Grúas y Recuperación en Carretera 24/7 en Houston" },
  "hero.cta.call": { en: "CALL DISPATCH NOW", es: "LLAMAR AHORA" },
  "hero.cta.quote": { en: "GET A QUOTE", es: "COTIZACIÓN" },
  "services.title": { en: "WHAT WE DO", es: "NUESTROS SERVICIOS" },
  "services.emergency": { en: "Emergency Towing", es: "Grúa de Emergencia" },
  "services.heavy": { en: "Heavy Duty Recovery", es: "Recuperación Pesada" },
  "services.lockout": { en: "Lockouts", es: "Cerraduras" },
  "services.jumpstart": { en: "Jump Starts", es: "Arranques" },
  "services.tire": { en: "Tire Changes", es: "Cambio de Llantas" },
  "coverage.title": { en: "LIVE DISPATCH MAP", es: "MAPA DE DESPACHO EN VIVO" },
  "coverage.subtitle": { en: "Covering Houston and surrounding 50 miles.", es: "Cubriendo Houston y 50 millas alrededor." },
  "form.title": { en: "REQUEST A TOW", es: "SOLICITAR GRÚA" },
  "form.location": { en: "Your Location", es: "Tu Ubicación" },
  "form.vehicle": { en: "Vehicle Type", es: "Tipo de Vehículo" },
  "form.issue": { en: "What's the issue?", es: "¿Cuál es el problema?" },
  "form.submit": { en: "DISPATCH NOW", es: "ENVIAR AHORA" },
  "about.title": { en: "WHY CHOOSE US", es: "POR QUÉ ELEGIRNOS" },
  "faq.title": { en: "COMMON QUESTIONS", es: "PREGUNTAS FRECUENTES" },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "chat.greeting": { en: "Hi! 👋 Need roadside assistance?", es: "¡Hola! 👋 ¿Necesitas asistencia en carretera?" },
  "chat.placeholder": { en: "Type a message...", es: "Escribe un mensaje..." },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-white/70" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-xl"
          >
            <button
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                language === "en" ? "text-safety-orange" : "text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage("es");
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                language === "es" ? "text-safety-orange" : "text-white"
              }`}
            >
              Español
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
