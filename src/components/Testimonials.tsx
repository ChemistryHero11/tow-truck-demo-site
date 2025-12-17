"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Stranded on I-45",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    text: "My car broke down at 2 AM on the highway. RapidTow arrived in 20 minutes! The driver was professional and got my car to the shop safely. Lifesavers!",
  },
  {
    name: "Marcus Johnson",
    role: "Fleet Manager, Houston Logistics",
    image: "/images/testimonial-2.jpg",
    rating: 5,
    text: "We've used RapidTow for our entire fleet for 3 years. Their heavy-duty recovery is unmatched. Fast, reliable, and fair pricing every time.",
  },
  {
    name: "Elena Rodriguez",
    role: "Late Night Lockout",
    image: "/images/testimonial-3.jpg",
    rating: 5,
    text: "Locked my keys in the car at a gas station at midnight. They were there in 15 minutes and had me back on the road in seconds. Amazing service!",
  },
  {
    name: "David Chen",
    role: "Business Owner",
    image: "/images/testimonial-4.jpg",
    rating: 5,
    text: "Had a delivery truck with a flat tire holding up our whole operation. RapidTow fixed it on-site within 30 minutes. Can't recommend them enough!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(249,115,22,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            WHAT OUR <span className="text-safety-orange">CUSTOMERS SAY</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute -left-4 top-0 text-safety-orange/10">
            <Quote className="w-32 h-32" />
          </div>

          <div className="min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center max-w-3xl mx-auto px-8"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-safety-yellow text-safety-yellow" />
                  ))}
                </div>

                <p className="text-xl sm:text-2xl text-white/80 mb-8 leading-relaxed">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-700 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-safety-orange to-safety-yellow flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[current].name.charAt(0)}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{testimonials[current].name}</p>
                    <p className="text-white/50 text-sm">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/20 hover:border-safety-orange hover:bg-safety-orange/10 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-safety-orange" : "bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full border border-white/20 hover:border-safety-orange hover:bg-safety-orange/10 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
