"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Identity", href: "#identity" },
  { name: "Journey", href: "#journey" },
  { name: "Archive", href: "#archive" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled ? "glass-strong" : "glass"
      } rounded-full px-2 py-2`}
    >
      {/* Animated glow effect */}
      <motion.div
        animate={{
          boxShadow: isScrolled
            ? "0 0 30px oklch(0.55 0.22 260 / 0.2)"
            : "0 0 0px transparent",
        }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />

      <ul className="flex items-center gap-1 relative">
        {navItems.map((item) => (
          <li key={item.name}>
            <motion.a
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 block hoverable ${
                activeSection === item.href.slice(1)
                  ? "text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {/* Active state background */}
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover state background */}
              <AnimatePresence>
                {hoveredItem === item.name && activeSection !== item.href.slice(1) && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    style={{ zIndex: -1 }}
                  />
                )}
              </AnimatePresence>

              <span className="relative z-10">{item.name}</span>

              {/* Hover indicator dots */}
              {hoveredItem === item.name && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
