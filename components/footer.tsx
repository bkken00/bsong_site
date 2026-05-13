"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", href: "#" },
    { name: "Dribbble", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Twitter", href: "#" },
  ];

  return (
    <footer className="py-16 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-bold">Creative Studio</div>
            <p className="text-muted-foreground text-sm mt-1">
              Crafting Digital Experiences
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            {currentYear} All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed with passion and precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
