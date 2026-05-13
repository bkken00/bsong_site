"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Large iridescent orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="absolute top-10 left-5 w-[500px] h-[500px] rounded-full organic-shape"
        style={{
          background: "radial-gradient(circle, oklch(0.50 0.22 250 / 0.25) 0%, oklch(0.45 0.18 280 / 0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x * -0.04,
          y: mousePosition.y * -0.04,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="absolute bottom-20 right-0 w-[600px] h-[600px] rounded-full organic-shape"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.20 220 / 0.3) 0%, oklch(0.45 0.15 200 / 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "-5s",
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full organic-shape"
        style={{
          background: "radial-gradient(circle, oklch(0.60 0.18 280 / 0.2) 0%, transparent 60%)",
          filter: "blur(40px)",
          animationDelay: "-10s",
        }}
      />

      {/* Decorative lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.60 0.20 250 / 0)" />
            <stop offset="50%" stopColor="oklch(0.70 0.18 230 / 0.5)" />
            <stop offset="100%" stopColor="oklch(0.60 0.20 250 / 0)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="10%"
          y1="20%"
          x2="40%"
          y2="80%"
          stroke="url(#heroLineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="90%"
          y1="15%"
          x2="60%"
          y2="85%"
          stroke="url(#heroLineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </svg>

      {/* Floating stars around the hero */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <svg width={8 + i * 2} height={8 + i * 2} viewBox="0 0 24 24">
            <path
              d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
              fill="oklch(0.85 0.12 220)"
              style={{ filter: "drop-shadow(0 0 8px oklch(0.80 0.15 220))" }}
            />
          </svg>
        </motion.div>
      ))}

      <motion.div
        style={{ rotateX, rotateY }}
        className="max-w-5xl mx-auto text-center perspective-1000 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 mb-10 text-sm font-medium glass rounded-full border-gradient hoverable"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-5 h-5"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                  fill="url(#starGrad)"
                />
                <defs>
                  <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.70 0.20 250)" />
                    <stop offset="100%" stopColor="oklch(0.80 0.15 200)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="gradient-text font-semibold tracking-wide">Creative Professional</span>
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          <motion.span
            className="inline-block text-foreground"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Diving Into
          </motion.span>
          <motion.span
            className="block mt-3 iridescent bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text" }}
          >
            Digital Depths
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          A creative explorer navigating the luminous waters of design and technology, 
          crafting immersive digital experiences that shimmer with innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-5"
        >
          <motion.a
            href="#journey"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 font-medium rounded-full overflow-hidden hoverable"
          >
            <span className="absolute inset-0 iridescent" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 text-primary-foreground flex items-center gap-2">
              Explore My Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#archive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 glass font-medium rounded-full glow-hover hoverable border border-primary/30"
          >
            View Archive
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Dive Deeper</span>
            <div className="w-6 h-10 border border-primary/40 rounded-full flex justify-center glass">
              <motion.div
                animate={{ y: [2, 14, 2], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-3 rounded-full mt-2 iridescent"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
