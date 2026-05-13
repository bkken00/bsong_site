"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "bubble" | "jellyfish" | "plankton";
}

export function FloatingParticles() {
  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    
    // Bubbles
    for (let i = 0; i < 25; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 10,
        duration: 12 + Math.random() * 15,
        delay: Math.random() * 8,
        type: "bubble",
      });
    }
    
    // Jellyfish-like shapes
    for (let i = 0; i < 6; i++) {
      items.push({
        id: 100 + i,
        x: 10 + Math.random() * 80,
        y: Math.random() * 100,
        size: 20 + Math.random() * 30,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 10,
        type: "jellyfish",
      });
    }
    
    // Small plankton
    for (let i = 0; i < 40; i++) {
      items.push({
        id: 200 + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 5,
        type: "plankton",
      });
    }
    
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((particle) => {
        if (particle.type === "bubble") {
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle at 30% 30%, oklch(0.98 0.02 210 / 0.6), oklch(0.85 0.06 220 / 0.2))`,
                boxShadow: `
                  inset -1px -1px 3px oklch(0.6 0.1 215 / 0.3),
                  0 0 ${particle.size / 2}px oklch(0.90 0.05 210 / 0.2)
                `,
              }}
              animate={{
                y: [0, -150, -300],
                x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                scale: [0.8, 1.1, 0.9],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          );
        }

        if (particle.type === "jellyfish") {
          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, 30, -30, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            >
              <svg
                width={particle.size}
                height={particle.size * 1.5}
                viewBox="0 0 40 60"
                className="opacity-20"
              >
                <defs>
                  <radialGradient id={`jelly-${particle.id}`}>
                    <stop offset="0%" stopColor="oklch(0.85 0.12 200 / 0.6)" />
                    <stop offset="100%" stopColor="oklch(0.75 0.15 210 / 0.1)" />
                  </radialGradient>
                </defs>
                {/* Bell */}
                <ellipse
                  cx="20"
                  cy="15"
                  rx="15"
                  ry="12"
                  fill={`url(#jelly-${particle.id})`}
                />
                {/* Tentacles */}
                <motion.path
                  d="M10,20 Q8,35 12,50 M15,22 Q13,40 17,55 M25,22 Q27,40 23,55 M30,20 Q32,35 28,50"
                  stroke="oklch(0.80 0.10 205 / 0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{
                    d: [
                      "M10,20 Q8,35 12,50 M15,22 Q13,40 17,55 M25,22 Q27,40 23,55 M30,20 Q32,35 28,50",
                      "M10,20 Q12,35 8,50 M15,22 Q17,40 13,55 M25,22 Q23,40 27,55 M30,20 Q28,35 32,50",
                      "M10,20 Q8,35 12,50 M15,22 Q13,40 17,55 M25,22 Q27,40 23,55 M30,20 Q32,35 28,50",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>
          );
        }

        // Plankton
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: "oklch(0.90 0.06 200 / 0.4)",
              boxShadow: "0 0 4px oklch(0.85 0.08 210 / 0.3)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Ambient light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 opacity-[0.08]"
            style={{
              left: `${15 + i * 20}%`,
              width: "100px",
              height: "100%",
              background: `linear-gradient(180deg, oklch(0.90 0.05 200), transparent 60%)`,
              transform: `skewX(${-15 + i * 5}deg)`,
            }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              x: [0, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i * 2,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
