"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const components = [
  {
    number: "01",
    title: "Sapphire Crystal",
    desc: "Anti-reflective coated, 1.2mm dome. Hardness 9 on Mohs scale — second only to diamond.",
    detail: "1,800°C fusion",
  },
  {
    number: "02",
    title: "Caliber CH-7120",
    desc: "In-house automatic movement. 28,800 vibrations per hour with twin barrels for 72-hour reserve.",
    detail: "312 components",
  },
  {
    number: "03",
    title: "Tourbillon Cage",
    desc: "Rotating once per minute. 0.3 grams of titanium precision to defy gravity's grasp.",
    detail: "60s revolution",
  },
  {
    number: "04",
    title: "Case & Bezel",
    desc: "Grade 5 titanium with hand-polished mirror surfaces. 100m water resistance.",
    detail: "42mm × 10.8mm",
  },
  {
    number: "05",
    title: "Balance Wheel",
    desc: "Free-sprung with adjustable gold micro-weights. 4Hz oscillation for chronometric precision.",
    detail: "±2 sec/day",
  },
  {
    number: "06",
    title: "Crown Assembly",
    desc: "Triple-sealed screw-down crown with sapphire cabochon. Controls time, date, and winding.",
    detail: "Triple-sealed",
  },
];

export default function ExplodedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="exploded"
      className="luxury-section section-bridge-top relative pt-36 md:pt-44 pb-36 md:pb-52 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-accent/20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <SectionHeader />

        {/* Component grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-24">
          {components.map((comp, idx) => (
            <ComponentCard key={comp.number} component={comp} index={idx} />
          ))}
        </div>

        {/* Bottom detail */}
        <motion.div
          className="mt-28 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="w-20 h-[1px] bg-accent/30 mb-8" />
          <p className="text-muted text-xs tracking-[0.4em] uppercase mb-3">Total Components</p>
          <p className="font-display text-5xl md:text-7xl font-extralight text-gradient-gold">
            312
          </p>
          <p className="text-foreground/40 text-sm font-light mt-4 max-w-md">
            Each individually hand-finished with Côtes de Genève, perlage, and chamfered edges
            — visible through the exhibition caseback.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="text-accent tracking-[0.5em] uppercase text-xs mb-4 font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Anatomy of Precision
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        The <span className="text-gradient-gold italic font-serif">Exploded</span> View
      </motion.h2>
      <motion.p
        className="text-foreground/40 text-sm md:text-base font-light mt-6 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        A symphony of 312 components, each machined to tolerances measured in microns.
        Every surface tells a story of patience and mastery.
      </motion.p>
    </div>
  );
}

function ComponentCard({
  component,
  index,
}: {
  component: (typeof components)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="glass-card elevated-card rounded-xl p-8 group cursor-default relative overflow-hidden transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Number */}
      <div className="flex items-start justify-between mb-6">
        <span className="text-accent/30 font-display text-4xl font-extralight group-hover:text-accent/60 transition-colors duration-500">
          {component.number}
        </span>
        <span className="text-accent/50 text-[10px] tracking-[0.3em] uppercase mt-2 border border-accent/10 rounded-full px-3 py-1 group-hover:border-accent/30 transition-colors duration-500">
          {component.detail}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-light text-foreground/90 mb-3 group-hover:text-foreground transition-colors duration-500">
        {component.title}
      </h3>
      <p className="text-foreground/40 text-sm font-light leading-relaxed group-hover:text-foreground/60 transition-colors duration-500">
        {component.desc}
      </p>

      {/* Bottom line */}
      <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 group-hover:via-accent/40 transition-all duration-700" />
    </motion.div>
  );
}
