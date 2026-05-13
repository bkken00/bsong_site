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
    <footer className="py-16 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      
      {/* Decorative orbs */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-accent/15 to-secondary/10 blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="font-serif text-2xl font-bold gradient-text"
            >
              Creative Studio
            </motion.div>
            <p className="text-muted-foreground text-sm mt-1">
              Crafting Digital Experiences
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3, color: "oklch(0.55 0.22 260)" }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium hoverable relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
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
          className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            {currentYear} All rights reserved.
          </p>
          <motion.p
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-sm bg-gradient-to-r from-muted-foreground via-primary/70 to-muted-foreground bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            Designed with passion and precision
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
