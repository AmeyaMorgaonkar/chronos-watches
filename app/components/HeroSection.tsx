"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/frames/ezgif-frame-";

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}${padded}.jpg`;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const currentFrameRef = useRef(0);
  const isHeroActiveRef = useRef(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for fluid frame transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // Text animations based on scroll progress
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.15], [0, -60]);
  const subtitleOpacity = useTransform(smoothProgress, [0.05, 0.2], [1, 0]);
  const subtitleY = useTransform(smoothProgress, [0.05, 0.2], [0, -40]);

  // Mid-scroll text (appears during exploding phase)
  const midTextOpacity = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [0, 1, 1, 0]);
  const midTextY = useTransform(smoothProgress, [0.3, 0.42, 0.58, 0.7], [40, 0, 0, -40]);

  // Final text (appears at the end)
  const finalTextOpacity = useTransform(smoothProgress, [0.75, 0.88], [0, 1]);
  const finalTextY = useTransform(smoothProgress, [0.75, 0.88], [40, 0]);

  // Nav and handoff motion values
  const navOpacity = useTransform(smoothProgress, [0, 0.72, 0.95], [1, 1, 0]);
  const navY = useTransform(smoothProgress, [0, 1], [0, -16]);
  const handoffOverlayOpacity = useTransform(
    smoothProgress,
    [0.84, 0.94, 1],
    [0, 0.45, 0.95]
  );

  // Scroll indicator fades out quickly
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  // Preload all frame images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      // Set canvas to window size for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Cover the canvas with the image maintaining aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasAspect > imgAspect) {
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgAspect;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // Listen to smooth progress and update canvas
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
    );
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    }
  });

  // Keep the frame layer mounted only while the hero scroll range is active.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextActive = latest < 0.999;
    if (nextActive !== isHeroActiveRef.current) {
      isHeroActiveRef.current = nextActive;
      setIsHeroActive(nextActive);
    }
  });

  // Draw first frame once loaded and handle resize
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0);
    }

    const handleResize = () => {
      // Reset canvas dimensions on resize
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, drawFrame]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "500vh",
      }}
    >
      {/* Viewport-fixed frame layer so animation stays visible while scrolling */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#050507",
          zIndex: isHeroActive ? 40 : -1,
          opacity: isHeroActive ? 1 : 0,
          pointerEvents: isHeroActive ? "auto" : "none",
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Loading Screen */}
        {!imagesLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#050507",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "12rem",
                height: "2px",
                background: "#1a1a22",
                borderRadius: "9999px",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  background: "#c9a96e",
                  borderRadius: "9999px",
                  width: `${loadProgress}%`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              style={{
                color: "#6b6b6b",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Loading Experience — {loadProgress}%
            </motion.p>
          </div>
        )}

        {/* Canvas - critical: must fill viewport */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 1s ease",
            zIndex: 1,
          }}
        />

        {/* Vignette overlays for cinematic feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,7,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "linear-gradient(to right, rgba(5,5,7,0.65) 0%, rgba(5,5,7,0.2) 35%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10rem",
            pointerEvents: "none",
            zIndex: 2,
            background: "linear-gradient(to top, rgba(5,5,7,0.8), transparent)",
          }}
        />

        {/* End-of-scroll transition veil to avoid abrupt cut to next section */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 12,
            opacity: handoffOverlayOpacity,
            background:
              "linear-gradient(to bottom, rgba(5,5,7,0.12) 0%, rgba(5,5,7,0.45) 55%, rgba(5,5,7,0.95) 100%)",
          }}
        />

        {/* Hero Text — left side, fades on scroll */}
        {imagesLoaded && (
          <>
            <motion.div
              className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-lg"
              style={{ opacity: heroTextOpacity, y: heroTextY, zIndex: 10 }}
            >
              <motion.p
                className="tracking-[0.5em] uppercase text-xs md:text-sm mb-4 font-light"
                style={{ color: "#c9a96e" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Haute Horlogerie
              </motion.p>
              <motion.h1
                className="font-display text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.9] tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              >
                <span className="block" style={{ color: "#e8e6e1" }}>
                  CHRO
                </span>
                <span className="block text-gradient-gold">NOS</span>
              </motion.h1>
              <motion.div
                style={{
                  width: "4rem",
                  height: "1px",
                  background: "rgba(201,169,110,0.4)",
                  marginBottom: "1.5rem",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              />
              <motion.p
                className="text-sm md:text-base font-light leading-relaxed max-w-sm"
                style={{ color: "rgba(232,230,225,0.6)", opacity: subtitleOpacity, y: subtitleY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                312 hand-finished components.
                <br />
                72-hour power reserve.
                <br />
                <span style={{ color: "rgba(201,169,110,0.8)" }}>
                  An eternal masterpiece.
                </span>
              </motion.p>
            </motion.div>

            {/* Mid-scroll text — appears during explosion */}
            <motion.div
              className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-md"
              style={{ opacity: midTextOpacity, y: midTextY, zIndex: 10 }}
            >
              <p
                className="tracking-[0.4em] uppercase text-xs mb-4 font-light"
                style={{ color: "#c9a96e" }}
              >
                Inside the Movement
              </p>
              <h2
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-light italic leading-tight mb-4"
                style={{ color: "rgba(232,230,225,0.9)" }}
              >
                Every gear,
                <br />a universe
              </h2>
              <p
                className="text-sm font-light leading-relaxed max-w-xs"
                style={{ color: "rgba(232,230,225,0.5)" }}
              >
                Each component is individually decorated with Côtes de Genève,
                hand-beveled, and assembled under a microscope with surgical
                precision.
              </p>
            </motion.div>

            {/* Final text — fully exploded */}
            <motion.div
              className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-md"
              style={{ opacity: finalTextOpacity, y: finalTextY, zIndex: 10 }}
            >
              <p
                className="tracking-[0.4em] uppercase text-xs mb-4 font-light"
                style={{ color: "#c9a96e" }}
              >
                Deconstructed
              </p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight mb-4">
                <span style={{ color: "#e8e6e1" }}>Precision</span>
                <br />
                <span className="text-gradient-gold">Unbound</span>
              </h2>
              <p
                className="text-sm font-light leading-relaxed max-w-xs"
                style={{ color: "rgba(232,230,225,0.5)" }}
              >
                The tourbillon cage rotates once every 60 seconds, compensating
                for positional errors with balletic grace.
              </p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              style={{ opacity: scrollIndicatorOpacity, zIndex: 10 }}
            >
              <span
                style={{
                  color: "#6b6b6b",
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                }}
              >
                Scroll to explore
              </span>
              <motion.div
                style={{
                  width: "1px",
                  height: "2rem",
                  background: "rgba(201,169,110,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.div
                  style={{
                    width: "100%",
                    background: "#c9a96e",
                    position: "absolute",
                    top: 0,
                    height: "50%",
                  }}
                  animate={{ y: ["0%", "200%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Top nav bar */}
            <motion.nav
              className="absolute top-0 left-0 right-0 px-4 md:px-8 lg:px-14 pt-5"
              style={{ zIndex: 20, opacity: navOpacity, y: navY }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="mx-auto w-full max-w-6xl rounded-2xl border border-accent/15 bg-[#09090d]/75 backdrop-blur-xl px-5 md:px-8 py-4 shadow-[0_14px_56px_rgba(0,0,0,0.48)]">
                <div className="flex items-center justify-between gap-4">
                  <a href="#" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,169,110,0.35)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-3 h-3 rounded-full bg-accent/70" />
                    </div>
                    <div className="leading-none">
                      <p className="text-sm md:text-base tracking-[0.28em] uppercase text-foreground/90 font-light mb-1.5">
                        Chronos
                      </p>
                      <p className="text-[10px] tracking-[0.35em] uppercase text-accent/70 font-light">
                        Geneve 1887
                      </p>
                    </div>
                  </a>

                  <div className="hidden md:flex items-center gap-2">
                    {[
                      { label: "Craft", href: "#craftsmanship" },
                      { label: "Story", href: "#story" },
                      { label: "Collection", href: "#collection" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="px-4 py-2 rounded-full text-[11px] tracking-[0.24em] uppercase text-foreground/60 hover:text-accent hover:bg-accent/10 transition-all duration-500"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </div>
    </section>
  );
}
