"use client";

import { motion } from "framer-motion";

export function FloatingDecorations() {
  // Star positions - scattered across viewport
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
  }));

  // Organic flowing shapes
  const organicShapes = [
    { id: 1, x: "10%", y: "20%", size: 150, hue: 250, delay: 0 },
    { id: 2, x: "85%", y: "15%", size: 100, hue: 220, delay: 1 },
    { id: 3, x: "70%", y: "60%", size: 120, hue: 280, delay: 2 },
    { id: 4, x: "15%", y: "75%", size: 180, hue: 200, delay: 0.5 },
    { id: 5, x: "50%", y: "40%", size: 90, hue: 260, delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
              fill="oklch(0.90 0.10 220)"
              style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.15 220 / 0.8))" }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating organic shapes with iridescent effect */}
      {organicShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute organic-shape"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: `linear-gradient(135deg, 
              oklch(0.45 0.18 ${shape.hue} / 0.15) 0%, 
              oklch(0.50 0.20 ${shape.hue + 30} / 0.1) 50%, 
              oklch(0.40 0.15 ${shape.hue - 20} / 0.12) 100%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 12 + shape.id * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Flowing line decorations */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.55 0.22 250)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.65 0.20 220)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 250)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.60 0.20 280)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.70 0.18 260)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.60 0.20 280)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 0 200 Q 200 150 400 200 T 800 200 T 1200 200 T 1600 200 T 2000 200"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M 0 400 Q 250 350 500 400 T 1000 400 T 1500 400 T 2000 400"
          stroke="url(#lineGradient2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
