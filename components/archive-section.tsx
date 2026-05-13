"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface BentoItem {
  title: string;
  description: string;
  category: string;
  span: "small" | "medium" | "large";
  gradient: string;
}

const bentoItems: BentoItem[] = [
  {
    title: "Brand Identity",
    description: "Crafting memorable visual identities that tell compelling stories",
    category: "Design",
    span: "large",
    gradient: "from-primary/30 to-accent/20",
  },
  {
    title: "Web Experiences",
    description: "Interactive digital journeys",
    category: "Development",
    span: "small",
    gradient: "from-accent/30 to-secondary/20",
  },
  {
    title: "Motion Design",
    description: "Bringing ideas to life through animation",
    category: "Animation",
    span: "small",
    gradient: "from-secondary/30 to-primary/20",
  },
  {
    title: "Photography",
    description: "Capturing moments and emotions through a unique lens perspective",
    category: "Creative",
    span: "medium",
    gradient: "from-primary/20 to-secondary/30",
  },
  {
    title: "Art Direction",
    description: "Guiding creative vision",
    category: "Leadership",
    span: "small",
    gradient: "from-accent/20 to-primary/30",
  },
  {
    title: "3D & Spatial",
    description: "Exploring dimensional design",
    category: "Experimental",
    span: "small",
    gradient: "from-secondary/20 to-accent/30",
  },
];

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-2 row-span-1",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${sizeClasses[item.span]} group cursor-default`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`h-full min-h-[200px] md:min-h-[240px] glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br ${item.gradient}`}
      >
        {/* Ripple effect on hover */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 2.5 : 0,
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full pointer-events-none"
        />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mt-3 text-balance">
              {item.title}
            </h3>
          </div>

          <motion.p
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="text-muted-foreground leading-relaxed mt-4"
          >
            {item.description}
          </motion.p>
        </div>

        {/* Corner decoration */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
      </motion.div>
    </motion.div>
  );
}

export function ArchiveSection() {
  return (
    <section id="archive" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
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
