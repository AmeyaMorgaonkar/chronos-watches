"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const timelineEvents = [
  {
    year: "1887",
    title: "The First Heartbeat",
    text: "In a candlelit workshop in Geneva, a young horloger assembled the first prototype — a pocket chronometer with a hand-engraved balance cock.",
  },
  {
    year: "1923",
    title: "The Wrist Revolution",
    text: "Transitioning from pocket to wrist, the maison pioneered the curved caseback— sculpting titanium to follow the human form.",
  },
  {
    year: "1961",
    title: "The Tourbillon Awakens",
    text: "A cage of titanium, weighing just 0.3 grams, began its first revolution — correcting gravity's pull on precision, one rotation per minute.",
  },
  {
    year: "2024",
    title: "Chronos Reborn",
    text: "Art meets anti-gravity. The Chronos Tourbillon embodies 137 years of evolution — 312 components, each a testament to obsessive craft.",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="luxury-section relative py-36 md:py-52 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <StoryHeader />

        {/* Timeline */}
        <div className="mt-28 relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/10 -translate-x-[0.5px]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent/40"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-20 md:space-y-24">
            {timelineEvents.map((event) => (
              <TimelineItem key={event.year} event={event} />
            ))}
          </div>
        </div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-28 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-3 h-3 rounded-full border border-accent/30 mb-4" />
          <p className="text-muted text-xs tracking-[0.4em] uppercase">
            The journey continues
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StoryHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center max-w-3xl mx-auto">
      <motion.p
        className="text-accent tracking-[0.5em] uppercase text-xs mb-4 font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Through the Ages
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        A Legacy
        <br />
        <span className="font-serif italic text-gradient-gold">Written in Time</span>
      </motion.h2>
      <motion.p
        className="text-foreground/40 text-sm md:text-base font-light mt-6 max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        From a candlelit Geneva workshop to the pinnacle of haute horlogerie
        — each era forged a new chapter in mechanical perfection.
      </motion.p>
    </div>
  );
}

function TimelineItem({
  event,
}: {
  event: (typeof timelineEvents)[number];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Dot on timeline */}
      <div className="absolute left-1/2 top-2 w-2.5 h-2.5 rounded-full bg-accent/50 -translate-x-1/2 border-2 border-background z-10">
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/30"
          animate={inView ? { scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="pt-8 max-w-3xl mx-auto px-4">
        <div className="elevated-card rounded-2xl p-6 md:p-8">
          <motion.span
            className="font-display text-5xl md:text-6xl font-extralight text-accent/25 block mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {event.year}
          </motion.span>
          <h3 className="font-display text-xl md:text-2xl font-light text-foreground/90 mb-3 text-center">
            {event.title}
          </h3>
          <p className="text-foreground/45 text-sm font-light leading-relaxed max-w-2xl mx-auto text-center">
            {event.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
