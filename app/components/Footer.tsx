"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="luxury-section relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] to-background" />

      {/* Top divider */}
      <div className="divider-gold max-w-4xl mx-auto mb-16" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 rounded-2xl elevated-card px-8 md:px-10 py-9"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-accent/65 text-[10px] tracking-[0.4em] uppercase mb-3">
            Maison Chronos
          </p>
          <p className="text-foreground/55 text-sm leading-relaxed font-light">
            A timepiece should not just mark hours. It should carry memory,
            intention, and legacy on the wrist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 mb-16 text-center sm:text-left">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent/60" />
              </div>
              <span className="text-foreground/80 text-sm tracking-[0.3em] uppercase font-light">
                Chronos
              </span>
            </div>
            <p className="text-foreground/30 text-xs font-light leading-relaxed">
              Haute Horlogerie since 1887.
              <br />
              Geneva, Switzerland.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-accent/50 text-[10px] tracking-[0.4em] uppercase mb-4">
              Discover
            </p>
            <ul className="space-y-2">
              {["Collections", "Craftsmanship", "Heritage", "Boutiques"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-foreground/30 text-sm font-light hover:text-accent transition-colors duration-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-accent/50 text-[10px] tracking-[0.4em] uppercase mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {["Private Viewings", "Bespoke Orders", "Servicing", "Authentication"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-foreground/30 text-sm font-light hover:text-accent transition-colors duration-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-accent/50 text-[10px] tracking-[0.4em] uppercase mb-4">
              Atelier
            </p>
            <p className="text-foreground/30 text-xs font-light leading-relaxed">
              Rue du Rhône 48
              <br />
              1204 Geneva
              <br />
              Switzerland
            </p>
            <p className="text-accent/40 text-xs font-light mt-4">
              contact@chronos.ch
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-accent/5 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-foreground/15 text-[10px] tracking-[0.2em] uppercase">
            © 2024 Chronos. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-foreground/15 text-[10px] tracking-[0.2em] uppercase hover:text-accent/40 transition-colors duration-500"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
