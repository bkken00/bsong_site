"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [3, -3]);
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3]);

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
      {/* Ocean-themed decorative orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.14 210 / 0.4) 0%, oklch(0.60 0.16 220 / 0.15) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x * -0.025,
          y: mousePosition.y * -0.025,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute bottom-32 right-10 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.15 195 / 0.35) 0%, oklch(0.50 0.18 200 / 0.1) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/2 left-1/4 w-56 h-56 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.12 230 / 0.3) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />
      
      {/* Animated water caustics overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 100px 80px at 20% 30%, oklch(0.90 0.06 200 / 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 80px 100px at 70% 60%, oklch(0.88 0.08 210 / 0.35) 0%, transparent 50%),
              radial-gradient(ellipse 120px 90px at 50% 80%, oklch(0.85 0.07 205 / 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "10% 5%", "0% 0%"],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
      </div>

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
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium glass rounded-full border-gradient hoverable"
          >
            {/* Animated wave icon */}
            <motion.svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              className="text-primary"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <motion.path
                d="M0,6 Q2.5,2 5,6 T10,6 T15,6 T20,6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                animate={{
                  d: [
                    "M0,6 Q2.5,2 5,6 T10,6 T15,6 T20,6",
                    "M0,6 Q2.5,10 5,6 T10,6 T15,6 T20,6",
                    "M0,6 Q2.5,2 5,6 T10,6 T15,6 T20,6",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.svg>
            <span className="gradient-text font-semibold">Creative Professional</span>
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-balance"
        >
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Diving Into Digital
          </motion.span>
          <motion.span
            className="block mt-2 gradient-text"
            style={{ backgroundSize: "200% 200%" }}
          >
            Experiences
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          A passionate creator navigating the depths of design and technology, 
          crafting immersive digital journeys that flow like the ocean.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#journey"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 font-medium rounded-full overflow-hidden hoverable glow-hover"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-ocean-teal to-primary bg-[length:200%_100%] animate-[gradient-shift_3s_ease_infinite]" />
            <span className="relative z-10 text-primary-foreground flex items-center gap-2">
              Explore My Journey
              <motion.span
                animate={{ x: [0, 4, 0] }}
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
            className="px-8 py-4 glass font-medium rounded-full glow-hover hoverable bubble-btn"
          >
            View Archive
          </motion.a>
        </motion.div>

        {/* Floating bubble shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`,
                width: 8 + i * 3,
                height: 8 + i * 3,
                background: `radial-gradient(circle at 30% 30%, oklch(0.95 0.04 200 / 0.6), oklch(0.80 0.08 210 / 0.2))`,
                boxShadow: `inset -1px -1px 3px oklch(0.5 0.1 210 / 0.2)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, i % 2 === 0 ? 15 : -15, 0],
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Scroll indicator - wave themed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground tracking-wider">DIVE DEEPER</span>
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center glass">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-gradient-to-b from-primary to-ocean-teal rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
