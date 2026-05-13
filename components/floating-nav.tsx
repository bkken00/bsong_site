"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Identity", href: "#identity" },
  { name: "Journey", href: "#journey" },
  { name: "Archive", href: "#archive" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 block ${
                activeSection === item.href.slice(1)
                  ? "text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
