"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function StatCard({ stat, index }: { stat: { label: string; value: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

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
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Glow spot */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-xl"
        style={{
          x: useTransform(mouseX, [-100, 100], [-20, 20]),
          y: useTransform(mouseY, [-100, 100], [-20, 20]),
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
        <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export function IdentitySection() {
  return (
    <section id="identity" className="py-32 px-6 relative">
      {/* Section-specific decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-sm font-medium uppercase tracking-widest gradient-text"
            whileInView={{ opacity: [0, 1] }}
            viewport={{ once: true }}
          >
            About Me
          </motion.span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-balance">
            Identity
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual */}
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
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 animate-[gradient-shift_8s_ease_infinite] bg-[length:200%_200%]" />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 glass-strong rounded-[2rem] flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden hoverable"
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                    <span className="font-serif text-5xl font-bold text-primary-foreground relative z-10">B</span>
                  </motion.div>
                  <p className="text-lg text-muted-foreground">Creative Mind</p>
                </div>
              </div>

              {/* Interactive particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/50"
                    style={{
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${10 + Math.floor(i / 4) * 30}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
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

            <div className="grid grid-cols-2 gap-6 pt-6">
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
