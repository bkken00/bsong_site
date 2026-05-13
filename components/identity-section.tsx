"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function StatCard({ stat, index }: { stat: { label: string; value: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl p-6 text-center glow-hover hoverable relative overflow-hidden group"
    >
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <motion.div
        className="absolute w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.22 250 / 0.3), transparent)",
          x: useTransform(mouseX, [-100, 100], [-30, 30]),
          y: useTransform(mouseY, [-100, 100], [-30, 30]),
          filter: "blur(20px)",
        }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="font-serif text-3xl md:text-4xl font-bold gradient-text"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {stat.value}
        </motion.div>
        <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export function IdentitySection() {
  return (
    <section id="identity" className="py-32 px-6 relative section-transition">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full organic-shape"
          style={{
            background: "radial-gradient(circle, oklch(0.50 0.20 260 / 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full organic-shape"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 230 / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
            animationDelay: "-8s",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-sm font-medium uppercase tracking-[0.3em] gradient-text"
            whileInView={{ opacity: [0, 1] }}
            viewport={{ once: true }}
          >
            About Me
          </motion.span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-balance text-foreground">
            Identity
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="aspect-[4/5] rounded-[2rem] overflow-hidden relative group"
            >
              {/* Animated iridescent background */}
              <div className="absolute inset-0 iridescent" />
              
              {/* Glass overlay with profile */}
              <div className="absolute inset-0 glass-strong rounded-[2rem] flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-36 h-36 mx-auto mb-6 rounded-full relative overflow-hidden hoverable"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.55 0.22 250), oklch(0.65 0.20 220), oklch(0.55 0.18 280))",
                      backgroundSize: "200% 200%",
                      animation: "gradient-flow 4s ease infinite",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-6xl font-bold text-primary-foreground">B</span>
                    </div>
                    {/* Orbiting star */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ filter: "drop-shadow(0 0 6px oklch(0.90 0.10 220))" }}
                      >
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="oklch(0.95 0.08 220)" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                  <p className="text-lg text-muted-foreground">Creative Mind</p>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${10 + (i % 5) * 20}%`,
                      top: `${10 + Math.floor(i / 5) * 40}%`,
                      background: `oklch(0.80 0.15 ${220 + i * 10})`,
                      boxShadow: `0 0 10px oklch(0.70 0.15 ${220 + i * 10} / 0.5)`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 0.9, 0.3],
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative corner elements */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-28 h-28"
              style={{
                background: "radial-gradient(circle, oklch(0.60 0.20 220 / 0.4), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-10 -left-10 w-36 h-36"
              style={{
                background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.35), transparent 70%)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
              I believe in the power of design to transform how we experience the digital world. 
              Every pixel, every interaction, every moment matters.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              As a creative professional in my twenties, I blend artistic vision with technical 
              expertise to craft experiences that resonate. My work spans across digital design, 
              brand identity, and interactive experiences.
            </p>

            <div className="grid grid-cols-2 gap-5 pt-6">
              {[
                { label: "Years of Experience", value: "5+" },
                { label: "Projects Completed", value: "50+" },
                { label: "Happy Clients", value: "30+" },
                { label: "Awards Won", value: "12" },
              ].map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
