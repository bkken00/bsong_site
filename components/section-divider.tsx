"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

interface SectionDividerProps {
  variant?: "wave" | "bubbles" | "current" | "foam";
  flip?: boolean;
}

export function SectionDivider({ variant = "wave", flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], ["10px", "-10px"]);

  // Generate random fish/bubble positions
  const fishPositions = useMemo(() => 
    [...Array(5)].map((_, i) => ({
      id: i,
      x: 10 + i * 18,
      y: 30 + (i % 3) * 20,
      delay: i * 0.4,
      duration: 3 + i * 0.5,
    })), []
  );

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative h-48 overflow-hidden ${flip ? "rotate-180" : ""}`}>
        <motion.div style={{ x }} className="absolute inset-0">
          <svg
            viewBox="0 0 1440 200"
            className="w-[200%] h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="oceanWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.70 0.12 210 / 0.4)" />
                <stop offset="50%" stopColor="oklch(0.75 0.10 200 / 0.5)" />
                <stop offset="100%" stopColor="oklch(0.70 0.12 210 / 0.4)" />
              </linearGradient>
              <linearGradient id="oceanWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.65 0.14 215 / 0.3)" />
                <stop offset="50%" stopColor="oklch(0.70 0.12 205 / 0.4)" />
                <stop offset="100%" stopColor="oklch(0.65 0.14 215 / 0.3)" />
              </linearGradient>
              <linearGradient id="oceanWaveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.80 0.08 200 / 0.25)" />
                <stop offset="50%" stopColor="oklch(0.85 0.06 195 / 0.35)" />
                <stop offset="100%" stopColor="oklch(0.80 0.08 200 / 0.25)" />
              </linearGradient>
            </defs>
            
            {/* Back wave layer */}
            <motion.path
              d="M0,100 C180,150 360,50 540,100 C720,150 900,50 1080,100 C1260,150 1440,50 1620,100 C1800,150 1980,50 2160,100 L2160,200 L0,200 Z"
              fill="url(#oceanWaveGradient1)"
              animate={{ d: [
                "M0,100 C180,150 360,50 540,100 C720,150 900,50 1080,100 C1260,150 1440,50 1620,100 C1800,150 1980,50 2160,100 L2160,200 L0,200 Z",
                "M0,100 C180,50 360,150 540,100 C720,50 900,150 1080,100 C1260,50 1440,150 1620,100 C1800,50 1980,150 2160,100 L2160,200 L0,200 Z",
                "M0,100 C180,150 360,50 540,100 C720,150 900,50 1080,100 C1260,150 1440,50 1620,100 C1800,150 1980,50 2160,100 L2160,200 L0,200 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            
            {/* Middle wave layer */}
            <motion.path
              d="M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1400,80 1600,160 1800,120 C2000,80 2200,160 2400,120 L2400,200 L0,200 Z"
              fill="url(#oceanWaveGradient2)"
              animate={{ d: [
                "M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1400,80 1600,160 1800,120 C2000,80 2200,160 2400,120 L2400,200 L0,200 Z",
                "M0,120 C200,160 400,80 600,120 C800,160 1000,80 1200,120 C1400,160 1600,80 1800,120 C2000,160 2200,80 2400,120 L2400,200 L0,200 Z",
                "M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1400,80 1600,160 1800,120 C2000,80 2200,160 2400,120 L2400,200 L0,200 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Front wave layer with foam */}
            <motion.path
              d="M0,140 C150,110 300,170 450,140 C600,110 750,170 900,140 C1050,110 1200,170 1350,140 C1500,110 1650,170 1800,140 C1950,110 2100,170 2250,140 L2250,200 L0,200 Z"
              fill="url(#oceanWaveGradient3)"
              animate={{ d: [
                "M0,140 C150,110 300,170 450,140 C600,110 750,170 900,140 C1050,110 1200,170 1350,140 C1500,110 1650,170 1800,140 C1950,110 2100,170 2250,140 L2250,200 L0,200 Z",
                "M0,140 C150,170 300,110 450,140 C600,170 750,110 900,140 C1050,170 1200,110 1350,140 C1500,170 1650,110 1800,140 C1950,170 2100,110 2250,140 L2250,200 L0,200 Z",
                "M0,140 C150,110 300,170 450,140 C600,110 750,170 900,140 C1050,110 1200,170 1350,140 C1500,110 1650,170 1800,140 C1950,110 2100,170 2250,140 L2250,200 L0,200 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </motion.div>
        
        {/* Floating foam bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/40"
              style={{
                left: `${8 + i * 8}%`,
                bottom: `${20 + (i % 4) * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.3,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "bubbles") {
    return (
      <div ref={ref} className="relative h-40 flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          {/* Rising bubbles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${5 + i * 6.5}%`,
                bottom: "-20px",
                width: 8 + (i % 4) * 4,
                height: 8 + (i % 4) * 4,
                background: `radial-gradient(circle at 30% 30%, oklch(0.95 0.03 210 / 0.8), oklch(0.85 0.06 215 / 0.3))`,
                boxShadow: "inset -2px -2px 4px oklch(0.7 0.1 210 / 0.3), 0 0 8px oklch(0.85 0.06 210 / 0.2)",
              }}
              animate={{
                y: [0, -180],
                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 0.3,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Swimming fish silhouettes */}
        <div className="absolute inset-0">
          {fishPositions.map((fish) => (
            <motion.div
              key={fish.id}
              className="absolute"
              style={{
                left: `${fish.x}%`,
                top: `${fish.y}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, fish.id % 2 === 0 ? -10 : 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: fish.duration,
                delay: fish.delay,
                ease: "easeInOut",
              }}
            >
              <svg
                width="24"
                height="12"
                viewBox="0 0 24 12"
                className="opacity-20"
                style={{ transform: fish.id % 2 === 0 ? "scaleX(1)" : "scaleX(-1)" }}
              >
                <path
                  d="M0,6 Q4,0 12,6 Q4,12 0,6 M12,6 L20,2 L20,10 Z"
                  fill="oklch(0.50 0.15 220)"
                />
              </svg>
            </motion.div>
          ))}
        </div>
        
        {/* Center decorative element */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
          />
        </motion.div>
      </div>
    );
  }

  if (variant === "current") {
    return (
      <div ref={ref} className="relative h-32 overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          {/* Animated current lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${15 + i * 14}%`,
                background: `linear-gradient(90deg, transparent, oklch(0.70 0.12 210 / ${0.15 + i * 0.05}), transparent)`,
              }}
              animate={{
                x: ["-100%", "100%"],
                scaleY: [1, 2, 1],
              }}
              transition={{
                x: { repeat: Infinity, duration: 3 + i * 0.5, ease: "linear" },
                scaleY: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            />
          ))}
          
          {/* Floating kelp/seaweed shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-1 origin-bottom"
              style={{
                left: `${10 + i * 11}%`,
                height: 40 + i * 8,
                background: `linear-gradient(to top, oklch(0.45 0.15 180 / 0.4), transparent)`,
                borderRadius: "50%",
              }}
              animate={{
                rotateZ: [-5, 5, -5],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + i * 0.2,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Foam variant
  return (
    <div ref={ref} className="relative h-24 overflow-hidden">
      <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
        {/* Animated foam line */}
        <motion.div
          className="w-full h-1 relative"
          style={{
            background: "linear-gradient(90deg, transparent 0%, oklch(0.95 0.03 210 / 0.6) 20%, oklch(0.90 0.05 205 / 0.8) 50%, oklch(0.95 0.03 210 / 0.6) 80%, transparent 100%)",
          }}
          animate={{
            scaleX: [0.95, 1.05, 0.95],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Foam particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/50"
            style={{
              left: `${i * 5}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5 + i * 0.1,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
