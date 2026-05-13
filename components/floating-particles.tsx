"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingParticles() {
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      color: [
        "oklch(0.65 0.18 250 / 0.4)",
        "oklch(0.70 0.15 280 / 0.35)",
        "oklch(0.75 0.20 200 / 0.4)",
        "oklch(0.65 0.22 320 / 0.3)",
        "oklch(0.80 0.12 180 / 0.35)",
      ][Math.floor(Math.random() * 5)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
