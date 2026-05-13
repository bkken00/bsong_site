"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RipplePoint {
  x: number;
  y: number;
  id: number;
}

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<RipplePoint[]>([]);
  const [ripples, setRipples] = useState<RipplePoint[]>([]);

  const addRipple = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-5), { x, y, id }]);
  }, []);

  useEffect(() => {
    let trailId = 0;
    let lastRippleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add bubble trail
      trailId++;
      setTrail((prev) => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: trailId },
      ]);

      // Add occasional ripples
      const now = Date.now();
      if (now - lastRippleTime > 200) {
        addRipple(e.clientX, e.clientY);
        lastRippleTime = now;
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      addRipple(mousePosition.x, mousePosition.y);
    };
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [addRipple, mousePosition.x, mousePosition.y]);

  // Remove old ripples
  useEffect(() => {
    const timer = setInterval(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 1000));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Water ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed pointer-events-none z-40 rounded-full"
            style={{
              left: ripple.x - 30,
              top: ripple.y - 30,
              width: 60,
              height: 60,
              border: "2px solid oklch(0.70 0.12 210 / 0.4)",
              background: "radial-gradient(circle, oklch(0.85 0.08 200 / 0.1) 0%, transparent 70%)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Bubble trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 rounded-full"
            style={{
              left: point.x - 5 + (index % 2 === 0 ? 3 : -3),
              top: point.y - 5,
              width: 6 + index * 0.3,
              height: 6 + index * 0.3,
              background: `radial-gradient(circle at 30% 30%, oklch(0.95 0.04 ${200 + index * 2} / 0.7), oklch(0.80 0.08 ${210 + index * 2} / 0.2))`,
              boxShadow: `inset -1px -1px 2px oklch(0.5 0.1 210 / 0.2)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor - water droplet style */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 14),
          y: mousePosition.y - (isHovering ? 20 : 14),
          scale: isClicking ? 0.7 : isHovering ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering ? "w-10 h-10" : "w-7 h-7"
          }`}
          style={{
            background: isHovering
              ? "radial-gradient(circle at 30% 30%, oklch(0.92 0.06 200 / 0.7), oklch(0.75 0.12 210 / 0.3))"
              : "radial-gradient(circle at 30% 30%, oklch(0.95 0.04 200 / 0.6), oklch(0.80 0.10 215 / 0.2))",
            border: isHovering
              ? "2px solid oklch(0.85 0.08 200 / 0.6)"
              : "2px solid oklch(0.90 0.06 205 / 0.5)",
            boxShadow: `
              inset -2px -2px 6px oklch(0.5 0.12 215 / 0.2),
              0 0 ${isHovering ? 20 : 10}px oklch(0.70 0.12 210 / 0.3)
            `,
          }}
        />
      </motion.div>

      {/* Center highlight */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      >
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "oklch(0.98 0.02 200 / 0.9)",
            boxShadow: "0 0 4px oklch(0.95 0.04 200 / 0.6)",
          }}
        />
      </motion.div>
    </>
  );
}
