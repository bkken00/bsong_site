"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"} mb-12 md:mb-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot */}
      <motion.div
        animate={{ scale: isHovered ? 1.5 : 1 }}
        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 ${
          item.type === "education" ? "bg-accent" : "bg-primary"
        }`}
      />

      {/* Card */}
      <motion.div
        animate={{ 
          y: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`w-full md:w-[45%] ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="glass-strong rounded-2xl p-6 md:p-8 cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              item.type === "education" 
                ? "bg-accent/20 text-accent" 
                : "bg-primary/20 text-primary"
            }`}>
              {item.type === "education" ? "Education" : "Experience"}
            </span>
            <span className="text-sm text-muted-foreground">{item.year}</span>
          </div>
          
          <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">
            {item.title}
          </h3>
          
          <p className="text-primary font-medium mb-3">{item.organization}</p>
          
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? "auto" : 0, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground leading-relaxed overflow-hidden"
          >
            {item.description}
          </motion.p>
          
          {!isHovered && (
            <p className="text-sm text-muted-foreground/60 mt-2">
              Hover to reveal more
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
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
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

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
