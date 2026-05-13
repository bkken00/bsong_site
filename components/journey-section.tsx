"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "experience";
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Senior Creative Director",
    organization: "Design Studio X",
    description: "Leading creative vision for major brand campaigns and digital experiences.",
    type: "experience",
  },
  {
    year: "2022",
    title: "Lead Designer",
    organization: "Tech Innovators Inc.",
    description: "Spearheaded design system development and mentored junior designers.",
    type: "experience",
  },
  {
    year: "2021",
    title: "Master of Fine Arts",
    organization: "Academy of Digital Arts",
    description: "Specialized in Interactive Media and Digital Experience Design.",
    type: "education",
  },
  {
    year: "2020",
    title: "UI/UX Designer",
    organization: "Creative Agency Co.",
    description: "Crafted user-centered designs for web and mobile applications.",
    type: "experience",
  },
  {
    year: "2019",
    title: "Bachelor of Design",
    organization: "University of Creative Studies",
    description: "Focus on Visual Communication and Brand Identity.",
    type: "education",
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const gradientColors = item.type === "education"
    ? "from-accent/40 via-secondary/30 to-transparent"
    : "from-primary/40 via-accent/30 to-transparent";

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"} mb-12 md:mb-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot with pulse effect */}
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          boxShadow: isHovered
            ? `0 0 30px ${item.type === "education" ? "oklch(0.65 0.20 300 / 0.5)" : "oklch(0.55 0.22 260 / 0.5)"}`
            : "0 0 0px transparent",
        }}
        className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10 ${
          item.type === "education" ? "bg-gradient-to-br from-accent to-secondary" : "bg-gradient-to-br from-primary to-accent"
        }`}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-full ${
            item.type === "education" ? "bg-accent/30" : "bg-primary/30"
          }`}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        className={`w-full md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className={`glass-strong rounded-2xl p-6 md:p-8 relative overflow-hidden group hoverable`}>
          {/* Background gradient on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${gradientColors} pointer-events-none`}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  item.type === "education"
                    ? "bg-gradient-to-r from-accent/30 to-secondary/20 text-accent"
                    : "bg-gradient-to-r from-primary/30 to-accent/20 text-primary"
                }`}
              >
                {item.type === "education" ? "Education" : "Experience"}
              </motion.span>
              <span className="text-sm text-muted-foreground font-medium">{item.year}</span>
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-balance">
              {item.title}
            </h3>

            <p className="gradient-text font-medium mb-3">{item.organization}</p>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>

            {!isHovered && (
              <motion.p
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0.6 }}
                className="text-sm text-muted-foreground/60 mt-2 flex items-center gap-2"
              >
                <span className="w-4 h-px bg-muted-foreground/40" />
                Hover to reveal more
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="journey" className="py-32 px-6 relative overflow-hidden" style={{ position: "relative" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-gradient-to-br from-accent/15 to-secondary/10 blur-3xl"
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
            Education & Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-balance">
            My Journey
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            A non-linear path through creativity and growth, each step building upon the last.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line with animated fill */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-secondary"
            />
          </div>

          <div className="space-y-8 md:space-y-0">
            {timelineData.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
