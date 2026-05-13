"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "dots" | "gradient";
  flip?: boolean;
}

export function SectionDivider({ variant = "wave", flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative h-32 overflow-hidden ${flip ? "rotate-180" : ""}`}>
        <motion.div style={{ x }} className="absolute inset-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-[200%] h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.65 0.18 250 / 0.3)" />
                <stop offset="33%" stopColor="oklch(0.70 0.15 280 / 0.25)" />
                <stop offset="66%" stopColor="oklch(0.75 0.20 200 / 0.3)" />
                <stop offset="100%" stopColor="oklch(0.65 0.18 250 / 0.3)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 C1680,120 1920,0 2160,60 L2160,120 L0,120 Z"
              fill="url(#waveGradient)"
            />
            <motion.path
              d="M0,80 C240,40 480,100 720,80 C960,40 1200,100 1440,80 C1680,40 1920,100 2160,80 L2160,120 L0,120 Z"
              fill="oklch(0.70 0.12 260 / 0.15)"
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className="relative h-24 flex items-center justify-center gap-4">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            style={{ opacity }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
            className="w-3 h-3 rounded-full"
            animate={{
              y: [0, -10, 0],
              backgroundColor: [
                "oklch(0.65 0.18 250)",
                "oklch(0.70 0.15 280)",
                "oklch(0.65 0.18 250)",
              ],
            }}
            // @ts-expect-error framer-motion transition type
            transition={{
              y: {
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
                ease: "easeInOut",
              },
              backgroundColor: {
                repeat: Infinity,
                duration: 3,
                delay: i * 0.3,
              },
            }}
          />
        ))}
      </div>
    );
  }

  // Gradient variant
  return (
    <div ref={ref} className="relative h-40 overflow-hidden">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
      />
      <motion.div
        style={{ x }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="w-24 h-24 rounded-full border border-primary/20"
        />
      </div>
    </div>
  );
}
