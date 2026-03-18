"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const crafts = [
  {
    title: "Côtes de Genève",
    description:
      "Parallel stripes applied to mainplate and bridges through a process requiring 47 individual passes. Each line is inspected under 10x magnification for uniformity.",
    stat: "47 passes",
    icon: "║",
  },
  {
    title: "Anglage",
    description:
      "Every internal edge is chamfered by hand at a precise 45° angle, then mirror polished. A single bridge can require up to 6 hours of anglage work.",
    stat: "45° precision",
    icon: "◇",
  },
  {
    title: "Perlage",
    description:
      "Circular graining applied to hidden baseplate surfaces. Though invisible when assembled, it represents the maison's commitment to unseen excellence.",
    stat: "0.8mm circles",
    icon: "○",
  },
];

export default function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="luxury-section relative py-36 md:py-52 overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#08080c] to-background" />
        {/* Subtle ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <CraftHeader />

        {/* Craft cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {crafts.map((craft, idx) => (
            <CraftItem key={craft.title} craft={craft} index={idx} isLast={idx === crafts.length - 1} />
          ))}
        </div>

        {/* Quote */}
        <QuoteBlock />
      </div>
    </section>
  );
}

function CraftHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-3xl mx-auto text-center">
      <motion.p
        className="text-accent tracking-[0.5em] uppercase text-xs mb-4 font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        The Art of Time
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1]"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Crafted by
        <br />
        <span className="text-gradient-gold font-serif italic">human patience</span>
      </motion.h2>
      <motion.div
        className="w-24 h-[1px] bg-accent/30 mt-8 mx-auto"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}

function CraftItem({
  craft,
  index,
  isLast: _isLast,
}: {
  craft: (typeof crafts)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative elevated-card rounded-2xl px-7 md:px-8 py-9 md:py-10 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Icon */}
      <div className="text-accent/30 text-3xl mb-6 font-light">{craft.icon}</div>

      {/* Stat pill */}
      <div className="inline-block border border-accent/15 rounded-full px-4 py-1.5 mb-6">
        <span className="text-accent/60 text-[10px] tracking-[0.3em] uppercase font-light">
          {craft.stat}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-light text-foreground/90 mb-4">{craft.title}</h3>

      {/* Description */}
      <p className="text-foreground/40 text-sm font-light leading-relaxed">{craft.description}</p>

      {/* Bottom divider for mobile */}
    </motion.div>
  );
}

function QuoteBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="mt-28 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="text-accent/20 text-6xl font-serif mb-6">&ldquo;</div>
      <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light italic text-foreground/70 leading-relaxed">
        A watchmaker does not create time.
        <br />
        He gives it a{" "}
        <span className="text-gradient-gold not-italic">heartbeat</span>.
      </blockquote>
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="w-8 h-[1px] bg-accent/30" />
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          Maître Horloger, Chronos Atelier
        </p>
        <div className="w-8 h-[1px] bg-accent/30" />
      </div>
    </motion.div>
  );
}
