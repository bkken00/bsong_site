"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface BentoItem {
  title: string;
  description: string;
  category: string;
  span: "small" | "medium" | "large";
  gradient: string;
  icon: string;
}

const bentoItems: BentoItem[] = [
  {
    title: "Brand Identity",
    description: "Crafting memorable visual identities that tell compelling stories and connect with audiences",
    category: "Design",
    span: "large",
    gradient: "from-primary/40 via-accent/30 to-secondary/20",
    icon: "B",
  },
  {
    title: "Web Experiences",
    description: "Interactive digital journeys that engage",
    category: "Development",
    span: "small",
    gradient: "from-accent/40 via-secondary/30 to-primary/20",
    icon: "W",
  },
  {
    title: "Motion Design",
    description: "Bringing ideas to life through fluid animation",
    category: "Animation",
    span: "small",
    gradient: "from-secondary/40 via-primary/30 to-accent/20",
    icon: "M",
  },
  {
    title: "Photography",
    description: "Capturing moments and emotions through a unique lens perspective that reveals hidden stories",
    category: "Creative",
    span: "medium",
    gradient: "from-primary/30 via-accent/40 to-secondary/30",
    icon: "P",
  },
  {
    title: "Art Direction",
    description: "Guiding creative vision with purpose",
    category: "Leadership",
    span: "small",
    gradient: "from-accent/30 via-primary/40 to-secondary/20",
    icon: "A",
  },
  {
    title: "3D & Spatial",
    description: "Exploring dimensional design realms",
    category: "Experimental",
    span: "small",
    gradient: "from-secondary/30 via-accent/40 to-primary/20",
    icon: "3",
  },
];

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { stiffness: 300, damping: 30 });

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
    setIsHovered(false);
  };

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`${sizeClasses[item.span]} group perspective-1000 hoverable`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`h-full min-h-[200px] md:min-h-[240px] glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden`}
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none`}
        />

        {/* Ripple effect on hover */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 3 : 0,
            opacity: isHovered ? 0.2 : 0,
          }}
          style={{
            x: useTransform(mouseX, [-200, 200], [-50, 50]),
            y: useTransform(mouseY, [-200, 200], [-50, 50]),
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-24 h-24 bg-white rounded-full pointer-events-none blur-xl"
        />

        {/* Shimmer */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating icon */}
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            rotate: isHovered ? 12 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center backdrop-blur-sm border border-white/20"
        >
          <span className="font-serif text-xl font-bold gradient-text">{item.icon}</span>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              className="text-xs font-semibold uppercase tracking-wider gradient-text"
            >
              {item.category}
            </motion.span>
            <motion.h3
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ delay: 0.05 }}
              className="font-serif text-2xl md:text-3xl font-bold mt-3 text-balance"
            >
              {item.title}
            </motion.h3>
          </div>

          <motion.p
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? -5 : 0,
            }}
            className="text-muted-foreground leading-relaxed mt-4"
          >
            {item.description}
          </motion.p>
        </div>

        {/* Corner decorations */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.5 : 0.3,
          }}
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl"
        />

        {/* Interactive particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -50],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 20],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                style={{
                  left: `${20 + (i * 10)}%`,
                  bottom: "20%",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function ArchiveSection() {
  return (
    <section id="archive" className="py-32 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent/15 to-secondary/10 blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-widest gradient-text">
            Portfolio & Interests
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-balance">
            Archive
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            A curated collection of work and passions that define my creative journey.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {bentoItems.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
