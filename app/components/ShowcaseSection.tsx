"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  { label: "Movement", value: "Automatic, Cal. CH-7120" },
  { label: "Power Reserve", value: "72 Hours" },
  { label: "Case Material", value: "Grade 5 Titanium" },
  { label: "Diameter", value: "42mm" },
  { label: "Water Resistance", value: "100m" },
  { label: "Crystal", value: "Sapphire, AR Coated" },
];

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="luxury-section relative py-36 md:py-52 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#060609] to-background" />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-24">
          <motion.p
            className="text-accent tracking-[0.5em] uppercase text-xs mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Collection
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gradient-gold font-serif italic">Chronos</span>{" "}
            Tourbillon
          </motion.h2>
        </div>

        {/* Product card */}
        <ProductCard />

        {/* Specs grid */}
        <SpecsGrid />

        {/* CTA */}
        <CTABlock />
      </div>
    </section>
  );
}

function ProductCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative glass-card elevated-card rounded-2xl overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Inner glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="flex flex-col md:flex-row items-center">
        {/* Image side */}
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden">
          <img
            src="/frames/ezgif-frame-001.jpg"
            alt="Chronos Tourbillon"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 50%, rgba(12,12,16,0.8) 100%)",
            }}
          />
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(12,12,16,0.9) 100%)",
            }}
          />
        </div>

        {/* Details side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 relative z-10">
          <p className="text-accent/60 text-[10px] tracking-[0.4em] uppercase mb-2">
            Limited Edition
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-extralight text-foreground mb-2">
            The Tourbillon
          </h3>
          <p className="text-accent text-sm font-light mb-6">Ref. CH-7120.01</p>

          <div className="w-12 h-[1px] bg-accent/20 mb-6" />

          <p className="text-foreground/40 text-sm font-light leading-relaxed mb-8">
            A convergence of 137 years of heritage and relentless innovation.
            The Chronos Tourbillon is not merely a watch — it is a philosophy of
            time itself, expressed in titanium, sapphire, and the steady
            rhythm of mechanical perfection.
          </p>

          <div className="flex items-end gap-2 mb-8">
            <span className="text-foreground/30 text-sm font-light">From</span>
            <span className="font-display text-3xl font-extralight text-gradient-gold">
              $48,500
            </span>
          </div>

          <motion.button
            className="group relative px-8 py-3 bg-transparent border border-accent/30 rounded-full text-accent text-sm tracking-[0.2em] uppercase font-light overflow-hidden transition-colors duration-500 hover:border-accent/60 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 group-hover:text-background transition-colors duration-500">
              Reserve Yours
            </span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function SpecsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-accent/10 rounded-xl overflow-hidden border border-accent/10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {specs.map((spec, idx) => (
        <motion.div
          key={spec.label}
          className="bg-card p-6 md:p-8 group hover:bg-surface transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 * idx }}
        >
          <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-2 group-hover:text-accent/60 transition-colors duration-500">
            {spec.label}
          </p>
          <p className="text-foreground/80 text-sm font-light group-hover:text-foreground transition-colors duration-500">
            {spec.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CTABlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="mt-24 text-center rounded-2xl elevated-card max-w-5xl mx-auto px-8 md:px-12 py-14 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      <div className="w-16 h-[1px] bg-accent/20 mx-auto mb-8" />
      <p className="text-foreground/30 text-xs tracking-[0.4em] uppercase mb-6">
        Private Viewings Available
      </p>
      <h3 className="font-serif text-3xl md:text-4xl font-light italic text-foreground/70 mb-8">
        Experience Chronos in person
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          className="px-10 py-3.5 bg-accent text-background text-sm tracking-[0.2em] uppercase font-medium rounded-full hover:bg-accent-light transition-colors duration-500 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Book a Viewing
        </motion.button>
        <motion.button
          className="px-10 py-3.5 border border-accent/20 text-accent/70 text-sm tracking-[0.2em] uppercase font-light rounded-full hover:border-accent/50 hover:text-accent transition-colors duration-500 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Download Brochure
        </motion.button>
      </div>
    </motion.div>
  );
}
