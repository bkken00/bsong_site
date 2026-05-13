"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "aurora" | "constellation" | "flow";
}

export function SectionDivider({ variant = "wave" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-32 -my-16 z-10 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.55 0.22 250 / 0)" />
                <stop offset="50%" stopColor="oklch(0.60 0.20 230 / 0.4)" />
                <stop offset="100%" stopColor="oklch(0.55 0.22 250 / 0)" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.65 0.18 280 / 0)" />
                <stop offset="50%" stopColor="oklch(0.70 0.15 260 / 0.3)" />
                <stop offset="100%" stopColor="oklch(0.65 0.18 280 / 0)" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#waveGrad1)"
              d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
              animate={{
                d: [
                  "M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z",
                  "M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z",
                  "M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              fill="url(#waveGrad2)"
              d="M0,60 Q480,20 960,60 T1440,60 L1440,100 L0,100 Z"
              animate={{
                d: [
                  "M0,60 Q480,20 960,60 T1440,60 L1440,100 L0,100 Z",
                  "M0,60 Q480,90 960,60 T1440,60 L1440,100 L0,100 Z",
                  "M0,60 Q480,20 960,60 T1440,60 L1440,100 L0,100 Z",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "aurora") {
    return (
      <div ref={ref} className="relative h-40 -my-20 z-10 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0 h-16"
              style={{
                top: `${i * 18}%`,
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  oklch(${0.50 + i * 0.04} ${0.20 - i * 0.02} ${250 + i * 15} / ${0.12 - i * 0.015}) 25%,
                  oklch(${0.55 + i * 0.04} ${0.22 - i * 0.02} ${230 + i * 10} / ${0.18 - i * 0.02}) 50%,
                  oklch(${0.50 + i * 0.04} ${0.20 - i * 0.02} ${270 + i * 8} / ${0.12 - i * 0.015}) 75%,
                  transparent 100%)`,
                filter: "blur(15px)",
              }}
              animate={{
                x: ["-5%", "5%", "-5%"],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "constellation") {
    const stars = Array.from({ length: 12 }, (_, i) => ({
      x: 8 + i * 8,
      y: 20 + Math.sin(i) * 30,
      size: 3 + (i % 3),
      delay: i * 0.15,
    }));

    return (
      <div ref={ref} className="relative h-24 -my-12 z-10 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.60 0.18 250 / 0)" />
                <stop offset="50%" stopColor="oklch(0.65 0.15 230 / 0.3)" />
                <stop offset="100%" stopColor="oklch(0.60 0.18 250 / 0)" />
              </linearGradient>
            </defs>
            <motion.line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Stars */}
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                  fill="oklch(0.90 0.10 220)"
                  style={{ filter: "drop-shadow(0 0 6px oklch(0.80 0.15 220))" }}
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Flow variant
  return (
    <div ref={ref} className="relative h-20 -my-10 z-10 overflow-hidden">
      <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(0.60 0.22 250), oklch(0.70 0.18 220))",
            boxShadow: "0 0 20px oklch(0.60 0.22 250 / 0.6), 0 0 40px oklch(0.55 0.20 250 / 0.3)",
          }}
          animate={{ x: ["-45vw", "45vw"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
