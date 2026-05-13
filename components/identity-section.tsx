"use client";

import { motion } from "framer-motion";

export function IdentitySection() {
  return (
    <section id="identity" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
            About Me
          </span>
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
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 overflow-hidden">
              <div className="absolute inset-0 glass-strong rounded-[2rem] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="font-serif text-5xl font-bold text-primary-foreground">B</span>
                  </div>
                  <p className="text-lg text-muted-foreground">Creative Mind</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
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
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <div className="font-serif text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
