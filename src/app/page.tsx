"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  Truck,
  Key,
  Battery,
  CircleDot,
  Clock,
  Shield,
  Star,
  ChevronRight,
  Menu,
  X,
  Car,
  AlertTriangle,
  Wrench,
  Zap,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";
import Testimonials from "@/components/Testimonials";
import { BeforeAfterSection } from "@/components/BeforeAfterSlider";
import BlogSection from "@/components/BlogSection";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import SoundToggle from "@/components/SoundEffects";
import { InteractiveMapSection } from "@/components/GoogleMap";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Service Area", href: "#coverage" },
  { name: "About", href: "#about" },
  { name: "FAQ", href: "#faq" },
];

const trustSignals = [
  "30-MINUTE ETA",
  "LICENSED & INSURED",
  "HEAVY HAUL CAPABLE",
  "500+ 5-STAR REVIEWS",
  "24/7 DISPATCH",
  "ALL MAJOR CREDIT CARDS",
  "FLATBED AVAILABLE",
  "MOTORCYCLE TOWING",
];

const services = [
  {
    title: "Emergency Towing",
    description: "Light duty flatbed & rollback towing for cars, trucks, and SUVs",
    icon: Truck,
    size: "large",
    image: "/images/service-towing.jpg",
  },
  {
    title: "Heavy Duty Recovery",
    description: "Semi-trucks, RVs, buses, and commercial vehicles",
    icon: AlertTriangle,
    size: "tall",
    image: "/images/service-heavy.jpg",
  },
  {
    title: "Lockouts",
    description: "Locked out? We'll get you back in fast",
    icon: Key,
    size: "small",
  },
  {
    title: "Jump Starts",
    description: "Dead battery? We'll bring the juice",
    icon: Battery,
    size: "small",
  },
  {
    title: "Tire Changes",
    description: "Flat tire? We'll swap it roadside",
    icon: CircleDot,
    size: "small",
  },
];

const heroSlides = [
  {
    image: "/images/hero-1.jpg",
    headline: "STUCK? WE'RE ALREADY",
    highlightedText: "ON THE WAY.",
    subheadline: "24/7 Heavy Duty Towing & Roadside Recovery in Houston",
    primaryCta: { text: "CALL DISPATCH NOW", href: "tel:+15551234567" },
    secondaryCta: { text: "GET A QUOTE", href: "#quote" },
  },
  {
    image: "/images/hero-2.jpg",
    headline: "BREAKDOWN ON I-45?",
    highlightedText: "WE'VE GOT YOU.",
    subheadline: "Fast response times across Houston highways & surrounding areas",
    primaryCta: { text: "EMERGENCY TOWING", href: "tel:+15551234567" },
    secondaryCta: { text: "VIEW SERVICES", href: "#services" },
  },
  {
    image: "/images/hero-3.jpg",
    headline: "HOUSTON'S FASTEST",
    highlightedText: "TOW TRUCK SERVICE.",
    subheadline: "30-minute average response • Licensed & insured • 500+ 5-star reviews",
    primaryCta: { text: "CALL (555) 123-4567", href: "tel:+15551234567" },
    secondaryCta: { text: "SEE COVERAGE AREA", href: "#coverage" },
  },
  {
    image: "/images/hero-4.jpg",
    headline: "FLAT TIRE? DEAD BATTERY?",
    highlightedText: "HELP IS MINUTES AWAY.",
    subheadline: "Roadside assistance for lockouts, jump starts, tire changes & more",
    primaryCta: { text: "GET ROADSIDE HELP", href: "tel:+15551234567" },
    secondaryCta: { text: "ALL SERVICES", href: "#services" },
  },
];

const faqs = [
  {
    q: "How fast can you get to me?",
    a: "Our average response time is 30 minutes or less within our primary service area. We have trucks strategically positioned throughout the city.",
  },
  {
    q: "Do you tow all vehicle types?",
    a: "Yes! From motorcycles to semi-trucks. We have light-duty flatbeds, medium-duty wreckers, and heavy-duty rotators for any situation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, and cash. We can also bill insurance companies directly for covered services.",
  },
  {
    q: "Are you available 24/7?",
    a: "Absolutely. Our dispatch center operates around the clock, 365 days a year. We're here when you need us most.",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-industrial py-3" : "bg-slate-900/95 sm:bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-safety-orange rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="font-['Oswald'] text-xl font-bold tracking-wider">
              RAPID<span className="text-safety-orange">TOW</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-safety-orange transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
              <SoundToggle />
            </div>

            <MagneticButton
              href="tel:+15551234567"
              className="hidden sm:flex items-center gap-2 bg-safety-orange hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 animate-pulse-glow"
            >
              <Phone className="w-5 h-5" />
              <span className="font-['Oswald'] tracking-wide">CALL NOW</span>
            </MagneticButton>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-white/80 hover:text-safety-orange transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50 mt-4">
              <LanguageToggle />
              <ThemeToggle />
              <SoundToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroSlides.length).fill(false));
  const [allImagesPreloaded, setAllImagesPreloaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = heroSlides.map((slide, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => resolve();
          img.src = slide.image;
        });
      });
      
      await Promise.all(loadPromises);
      setAllImagesPreloaded(true);
    };

    preloadImages();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!allImagesPreloaded) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, allImagesPreloaded]);

  const slide = heroSlides[currentSlide];
  const isCurrentImageLoaded = imagesLoaded[currentSlide];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: isCurrentImageLoaded ? 1 : 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ scale }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-700"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              filter: isCurrentImageLoaded ? 'blur(0px)' : 'blur(10px)',
            }}
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 vignette-overlay" />
        </motion.div>
      </AnimatePresence>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-safety-orange/20 border border-safety-orange/50 text-safety-orange px-4 py-2 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-safety-orange rounded-full animate-pulse" />
            24/7 EMERGENCY DISPATCH ACTIVE
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isCurrentImageLoaded ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
              {slide.headline}
              <br />
              <span className="text-safety-orange">{slide.highlightedText}</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-6 sm:mb-10 max-w-2xl mx-auto">
              {slide.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={slide.primaryCta.href}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(249, 115, 22, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-safety-orange hover:bg-orange-500 text-white font-bold py-4 px-6 sm:py-5 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 shadow-2xl shadow-safety-orange/30"
              >
                <Phone className="w-6 h-6" />
                <span className="font-['Oswald'] tracking-wider">{slide.primaryCta.text}</span>
              </motion.a>
              <motion.a
                href={slide.secondaryCta.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 sm:gap-3 border-2 border-white/30 hover:border-safety-orange text-white font-bold py-4 px-6 sm:py-5 sm:px-10 rounded-xl text-base sm:text-lg transition-all duration-300 hover:bg-safety-orange/10"
              >
                <span className="font-['Oswald'] tracking-wider">{slide.secondaryCta.text}</span>
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom section: slide indicators + scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        {/* Slide indicators */}
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-safety-orange"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-safety-orange rounded-full" />
          </motion.div>
          <span className="text-white/40 text-xs uppercase tracking-widest">scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="bg-slate-800/80 border-y border-slate-700/50 py-5 overflow-hidden">
      <div className="flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trustSignals, ...trustSignals].map((signal, i) => (
            <span
              key={i}
              className="mx-8 font-['Oswald'] text-xl sm:text-2xl font-bold text-white/90 flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-safety-orange rounded-full" />
              {signal}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden>
          {[...trustSignals, ...trustSignals].map((signal, i) => (
            <span
              key={i}
              className="mx-8 font-['Oswald'] text-xl sm:text-2xl font-bold text-white/90 flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-safety-orange rounded-full" />
              {signal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 px-4 bg-slate-900 hazard-stripe">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            What We Do
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            SERVICES BUILT FOR <span className="text-safety-orange">EMERGENCIES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[180px] sm:auto-rows-[200px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const gridClass =
              service.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : service.size === "tall"
                ? "md:row-span-2"
                : "";

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${gridClass} relative group cursor-pointer overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-lg transition-all duration-500 hover:border-safety-orange/70`}
              >
                {service.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-safety-orange/20 rounded-xl flex items-center justify-center group-hover:bg-safety-orange/40 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-safety-orange" />
                    </div>
                  </div>
                  <h3 className="font-['Oswald'] text-2xl sm:text-3xl font-bold mb-2 group-hover:text-safety-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-safety-orange/50 rounded-2xl transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-safety-orange/5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 500, suffix: "+", label: "5-Star Reviews", icon: Star },
    { value: 30, suffix: " min", label: "Average Response", icon: Zap },
    { value: 15000, suffix: "+", label: "Vehicles Rescued", icon: Truck },
    { value: 24, suffix: "/7", label: "Always Available", icon: Clock },
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-safety-orange/20 rounded-full mb-4">
                  <Icon className="w-7 h-7 text-safety-orange" />
                </div>
                <div className="font-['Oswald'] text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CoverageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="coverage" ref={ref} className="py-24 px-4 bg-slate-800/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(249,115,22,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            Coverage Area
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            LIVE <span className="text-safety-orange">DISPATCH MAP</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            Covering Houston and surrounding 50 miles. Our fleet is strategically positioned for rapid response.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/3] sm:aspect-[16/10] max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 glass-card p-8">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900/80">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px"
              }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Radar rings using CSS animations for smoother performance */}
                  <div className="absolute w-32 h-32 border-2 border-safety-orange/60 rounded-full animate-radar-1" />
                  <div className="absolute w-32 h-32 border-2 border-safety-orange/60 rounded-full animate-radar-2" />
                  <div className="absolute w-32 h-32 border-2 border-safety-orange/60 rounded-full animate-radar-3" />
                  
                  {/* Static glow ring */}
                  <div className="absolute w-24 h-24 bg-safety-orange/10 rounded-full" />
                  
                  {/* Center hub */}
                  <div className="relative w-16 h-16 bg-safety-orange rounded-full flex items-center justify-center shadow-2xl shadow-safety-orange/50 z-10">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {[
                { top: "20%", left: "25%", delay: 0.3 },
                { top: "70%", left: "30%", delay: 0.7 },
                { top: "35%", left: "70%", delay: 1.1 },
                { top: "60%", left: "75%", delay: 0.9 },
                { top: "25%", left: "55%", delay: 0.5 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: pos.delay + 0.5 }}
                  className="absolute w-3 h-3 bg-safety-yellow rounded-full"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-safety-yellow rounded-full"
                  />
                </motion.div>
              ))}

              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 glass-industrial px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-white/80">5 Active</span>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 glass-industrial px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-safety-orange" />
                  <span className="text-xs sm:text-sm text-white/80">ETA: 28m</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DispatchForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [issue, setIssue] = useState("");

  const locations = [
    { value: "highway", label: "Highway / Interstate", icon: "🛣️" },
    { value: "home", label: "Home / Residence", icon: "🏠" },
    { value: "parking", label: "Parking Lot", icon: "🅿️" },
    { value: "other", label: "Other Location", icon: "📍" },
  ];

  const vehicles = [
    { value: "car", label: "Car / Truck / SUV", icon: Car },
    { value: "motorcycle", label: "Motorcycle", icon: CircleDot },
    { value: "heavy", label: "Heavy Duty / Semi", icon: Truck },
  ];

  const issues = [
    { value: "wreck", label: "Accident / Wreck", icon: AlertTriangle },
    { value: "breakdown", label: "Breakdown", icon: Wrench },
    { value: "flat", label: "Flat Tire", icon: CircleDot },
    { value: "lockout", label: "Lockout", icon: Key },
    { value: "battery", label: "Dead Battery", icon: Battery },
  ];

  return (
    <section id="quote" ref={ref} className="py-24 px-4 bg-slate-900 relative">
      <div className="absolute inset-0 hazard-stripe opacity-50" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            Request Service
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            DISPATCH <span className="text-safety-orange">REQUEST</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg">
            Fill out the form below or call us directly for immediate assistance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-4 sm:p-8"
        >
          <form className="space-y-6 sm:space-y-8">
            <div>
              <label className="block font-['Oswald'] text-lg mb-4 text-white/90">
                WHERE ARE YOU?
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
                {locations.map((loc) => (
                  <button
                    key={loc.value}
                    type="button"
                    onClick={() => setLocation(loc.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      location === loc.value
                        ? "border-safety-orange bg-safety-orange/20"
                        : "border-slate-600/50 hover:border-slate-500"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{loc.icon}</span>
                    <span className="text-sm text-white/80">{loc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-['Oswald'] text-lg mb-4 text-white/90">
                VEHICLE TYPE?
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {vehicles.map((v) => {
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setVehicle(v.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                        vehicle === v.value
                          ? "border-safety-orange bg-safety-orange/20"
                          : "border-slate-600/50 hover:border-slate-500"
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${vehicle === v.value ? "text-safety-orange" : "text-white/60"}`} />
                      <span className="text-sm text-white/80">{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-['Oswald'] text-lg mb-4 text-white/90">
                WHAT&apos;S THE ISSUE?
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-5">
                {issues.map((iss) => {
                  const Icon = iss.icon;
                  return (
                    <button
                      key={iss.value}
                      type="button"
                      onClick={() => setIssue(iss.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                        issue === iss.value
                          ? "border-safety-orange bg-safety-orange/20"
                          : "border-slate-600/50 hover:border-slate-500"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${issue === iss.value ? "text-safety-orange" : "text-white/60"}`} />
                      <span className="text-xs text-white/80 text-center">{iss.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:outline-none focus:border-safety-orange transition-colors text-white placeholder:text-white/40"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:outline-none focus:border-safety-orange transition-colors text-white placeholder:text-white/40"
              />
            </div>

            <input
              type="text"
              placeholder="Exact Location (Address, Mile Marker, Cross Streets)"
              className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl focus:outline-none focus:border-safety-orange transition-colors text-white placeholder:text-white/40"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-safety-orange hover:bg-orange-500 text-white font-bold py-5 px-8 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-safety-orange/50 font-['Oswald'] tracking-wider"
            >
              SEND DISPATCH REQUEST
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "50K+", label: "Vehicles Towed" },
    { value: "28", label: "Min Avg Response" },
    { value: "4.9", label: "Star Rating" },
  ];

  return (
    <section id="about" ref={ref} className="py-24 px-4 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-safety-orange font-semibold tracking-wider uppercase">
              About Us
            </span>
            <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold mt-4 mb-6">
              METRO CITY&apos;S MOST <span className="text-safety-orange">TRUSTED</span> TOWING SERVICE
            </h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              When you&apos;re stranded on the side of the road, you need help fast. That&apos;s why RapidTow has invested in the largest fleet of modern tow trucks in the region, strategically positioned to reach you in 30 minutes or less.
            </p>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Our certified operators are trained in the latest recovery techniques, ensuring your vehicle is handled with care whether it&apos;s a compact car or a fully loaded semi-truck.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, text: "Fully Insured" },
                { icon: Clock, text: "24/7 Available" },
                { icon: Star, text: "500+ Reviews" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2 text-white/80">
                    <Icon className="w-5 h-5 text-safety-orange" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="font-['Oswald'] text-4xl sm:text-5xl font-bold text-safety-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="py-24 px-4 bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl font-bold mt-4">
            COMMON <span className="text-safety-orange">QUESTIONS</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-['Oswald'] text-lg font-semibold">{faq.q}</span>
                <ChevronRight
                  className={`w-5 h-5 text-safety-orange transition-transform ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-white/70">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800/80 border-t border-slate-700/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-safety-orange rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="font-['Oswald'] text-xl font-bold tracking-wider">
                RAPID<span className="text-safety-orange">TOW</span>
              </span>
            </div>
            <p className="text-white/60 text-sm">
              24/7 emergency towing and roadside assistance serving Metro City and surrounding areas.
            </p>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-safety-orange transition-colors">Emergency Towing</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Heavy Duty Recovery</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Lockout Service</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Jump Starts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-safety-orange transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Service Area</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold mb-4">Emergency Line</h4>
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 text-safety-orange text-xl font-bold hover:text-orange-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (555) 123-4567
            </a>
            <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4 text-safety-orange" />
              <span>123 Tow Lane, Metro City</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} RapidTow. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-safety-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-safety-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileCallButton() {
  return (
    <motion.a
      href="tel:+15551234567"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-safety-orange py-4 flex items-center justify-center gap-3 shadow-2xl"
    >
      <Phone className="w-6 h-6 text-white animate-pulse" />
      <span className="font-['Oswald'] text-lg font-bold text-white tracking-wider">
        TAP TO CALL NOW
      </span>
    </motion.a>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="relative pb-16 sm:pb-0" role="main">
        <Navbar />
        <HeroSection />
        <Marquee />
        <ServicesSection />
        <StatsSection />
        <CoverageSection />
        <Testimonials />
        <BeforeAfterSection />
        <InteractiveMapSection />
        <DispatchForm />
        <AboutSection />
        <BlogSection />
        <FAQSection />
        <Footer />
        <MobileCallButton />
      </main>
    </>
  );
}
