"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import TiltCard from "./TiltCard";

const blogPosts = [
  {
    title: "What to Do When Your Car Breaks Down on the Highway",
    excerpt: "Stay calm and follow these essential steps to ensure your safety while waiting for roadside assistance.",
    image: "/images/blog-1.jpg",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Safety Tips",
  },
  {
    title: "Understanding Different Types of Tow Trucks",
    excerpt: "From flatbeds to wheel-lifts, learn which tow truck is right for your vehicle and situation.",
    image: "/images/blog-2.jpg",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    category: "Education",
  },
  {
    title: "Winter Driving Tips for Houston Drivers",
    excerpt: "Prepare your vehicle for cold weather and know what to do if you get stranded.",
    image: "/images/blog-3.jpg",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Seasonal",
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-safety-orange font-semibold tracking-wider uppercase">
            Latest News
          </span>
          <h2 className="font-['Oswald'] text-4xl sm:text-5xl md:text-6xl font-bold mt-4">
            FROM THE <span className="text-safety-orange">ROAD</span>
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            Tips, insights, and updates from Houston&apos;s most trusted towing service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard className="group h-full">
                <article className="glass-card h-full overflow-hidden hover:border-safety-orange/50 transition-colors duration-300">
                  <div className="aspect-[16/10] bg-slate-700 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
                      <span className="text-safety-orange font-medium">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-['Oswald'] text-xl font-bold mb-2 group-hover:text-safety-orange transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-safety-orange font-semibold text-sm group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-safety-orange px-8 py-3 rounded-lg font-semibold transition-colors hover:bg-safety-orange/10"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
