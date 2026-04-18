"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Sprout,
  Menu,
  X,
  MapPin,
  Satellite,
  FileText,
  Shield,
  Globe,
  Sparkles,
  Check,
  Trees,
  Landmark,
  Building2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

const stagger = (delay = 0.1) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: delay, delayChildren: 0.06 },
  },
});

const viewportOnce = { once: true, margin: "-80px" } as const;

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#00E5A0]">
      {children}
    </p>
  );
}

function HeroWireframe() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vw,720px)] w-[min(88vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      <circle
        cx="200"
        cy="200"
        r="148"
        stroke="url(#glow)"
        strokeWidth="0.8"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="148"
        ry="52"
        stroke="url(#glow)"
        strokeWidth="0.7"
        transform="rotate(-18 200 200)"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="52"
        ry="148"
        stroke="url(#glow)"
        strokeWidth="0.7"
        transform="rotate(52 200 200)"
      />
      <path
        d="M 52 200 Q 200 72 348 200"
        stroke="url(#glow)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00E5A0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0D6E6E" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,229,160,0.22) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 45%, black 10%, transparent 75%)",
      }}
    />
  );
}

function HeroHeadline() {
  const words: { text: string; gradient?: boolean }[] = [
    { text: "Satellite-Powered" },
    { text: "Carbon", gradient: true },
    { text: "Verification.", gradient: true },
    { text: "Done" },
    { text: "in" },
    { text: "Days." },
    { text: "Not" },
    { text: "Months." },
  ];

  return (
    <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-[#F3F8F8] sm:text-5xl md:text-6xl lg:text-7xl">
      {words.map((w, i) => (
        <motion.span
          key={`${w.text}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.45, ease: "easeOut" }}
          className={`mr-[0.28em] inline-block ${
            w.gradient ? "text-gradient-hero" : ""
          }`}
        >
          {w.text}
        </motion.span>
      ))}
    </h1>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#use-cases", label: "Use Cases" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-white/5 bg-[#080C0C]/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,229,160,0.12)]">
              <Sprout className="h-5 w-5 text-[#00E5A0]" strokeWidth={2.2} />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-[#F3F8F8]">
              <span className="text-[#00E5A0]">Z</span>ucarto
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#F3F8F8]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              className="clay-btn-secondary px-4 py-2 text-sm"
            >
              Log in
            </motion.button>
            <motion.a
              href="#early-access"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px #00E5A0" }}
              className="clay-btn-primary animate-cta-pulse inline-flex px-5 py-2.5 text-sm"
            >
              Request Early Access
            </motion.a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#F3F8F8] md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-[70] w-[min(100%,320px)] border-l border-white/10 bg-[#080C0C]/95 shadow-[-24px_0_60px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
                <span className="font-heading text-lg font-bold text-[#F3F8F8]">
                  Menu
                </span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#94A3B8] hover:bg-white/5 hover:text-[#F3F8F8]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    className="clay-btn-secondary w-full py-3 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </button>
                  <a
                    href="#early-access"
                    className="clay-btn-primary flex w-full justify-center py-3 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Request Early Access
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10">
      <div className="absolute inset-0 -z-10">
        <div className="hero-mesh-blob absolute -left-[20%] top-[-20%] h-[70vmin] w-[70vmin] rounded-full bg-[#0A4D4D]/35 blur-[100px]" />
        <div className="hero-mesh-blob absolute bottom-[-30%] right-[-15%] h-[80vmin] w-[80vmin] rounded-full bg-black/80 blur-[90px]" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0A4D4D]/25 via-[#080C0C] to-[#080C0C]"
          style={{ animationDuration: "22s" }}
        />
        <HeroParticles />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <HeroWireframe />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.12)}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>AI-Powered Carbon Intelligence</SectionLabel>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4">
            <HeroHeadline />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg"
          >
            Zucarto automates the entire MRV lifecycle — from satellite data
            ingestion to audit-ready carbon credit reports — using AI and
            multi-spectral analysis.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#early-access"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px #00E5A0" }}
              className="clay-btn-primary animate-cta-pulse inline-flex px-8 py-3.5 text-base"
            >
              Request Early Access
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.04 }}
              className="clay-btn-secondary inline-flex items-center justify-center px-8 py-3.5 text-base"
            >
              See How It Works
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-3"
          >
            {[
              {
                icon: Sparkles,
                t: "VCS VM0047 Ready",
              },
              {
                icon: Shield,
                t: "IPCC Tier 2 Compliant",
              },
              {
                icon: Satellite,
                t: "Sentinel-2 Satellite Data",
              },
              {
                icon: Globe,
                t: "Google Earth Engine",
              },
            ].map((b) => (
              <div
                key={b.t}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-[#94A3B8] shadow-[0_12px_40px_rgba(0,229,160,0.06)] backdrop-blur-xl sm:text-sm"
              >
                <b.icon className="h-4 w-4 shrink-0 text-[#00E5A0]" />
                <span className="whitespace-nowrap">{b.t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  const metrics = [
    {
      title: "7 Days",
      sub: "Average time to first report (vs. 6–12 months)",
    },
    {
      title: "10,000+ ha",
      sub: "Monitoring scale supported per project",
    },
    {
      title: "Pilot Phase",
      sub: "Now accepting early-access partners",
    },
  ];

  return (
    <section id="about" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Our Mission</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[#F3F8F8] sm:text-4xl md:text-5xl"
          >
            Making Carbon Markets Honest, Transparent, and Accessible.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-[#94A3B8] sm:text-lg"
          >
            The global carbon credit industry is plagued by guesswork, costly
            field surveys, and verification delays lasting years. Zucarto was
            built to change that — making high-integrity carbon accounting
            accessible to project developers, NGOs, and government bodies across
            India and beyond.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="clay-card rounded-2xl p-6 sm:p-8"
            >
              <p className="font-heading text-2xl font-bold text-[#F3F8F8]">
                {m.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PartnersStrip() {
  const items = [
    "Google Earth Engine",
    "Sentinel-2 / Copernicus (ESA)",
    "NASA MODIS",
    "Python / FastAPI",
    "VCS Verra Standard",
  ];

  return (
    <section className="border-y border-white/5 bg-[#080C0C]/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]/80"
        >
          Built on World-Class Infrastructure
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          {items.map((name) => (
            <motion.span
              key={name}
              variants={fadeUp}
              className="text-sm font-medium text-[#94A3B8]/45 transition-colors duration-300 hover:text-[#94A3B8]"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      icon: MapPin,
      title: "Define Your Project Boundary",
      body: "Draw your exact forest, wetland, or agricultural area on our interactive map. We support GeoJSON, shapefiles, and manual polygon drawing.",
      image:
        "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80",
      alt: "Aerial landscape reference for project mapping",
    },
    {
      icon: Satellite,
      title: "AI-Driven Multi-Spectral Analysis",
      body: "We ingest Sentinel-2 imagery and calculate NDVI, EVI, and MSAVI indices across your project timeline. Our ML models estimate biomass and carbon stocks with Tier 2 IPCC accuracy.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      alt: "Data visualization suggesting spectral analytics",
    },
    {
      icon: FileText,
      title: "Generate Verifiable Carbon Reports",
      body: "Receive complete PDF reports with carbon stock estimations, SHAP explainability charts, change detection maps, and audit-ready documentation — all in English, Hindi, or Telugu.",
      image: null,
      alt: null,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative z-10 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[#F3F8F8] sm:text-4xl md:text-5xl"
          >
            From AOI to audit-ready outputs — in one pipeline.
          </motion.h2>
        </motion.div>

        <div className="relative mt-16 md:mt-20">
          <div className="pointer-events-none absolute left-[18px] top-0 hidden h-full w-px overflow-hidden md:block md:left-[27px]">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#00E5A0] via-[#0D6E6E] to-transparent opacity-70"
            />
          </div>

          <div className="space-y-14 md:space-y-20">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const fromLeft = idx % 2 === 0;
              return (
                <div
                  key={step.title}
                  className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center"
                >
                  <div className="hidden md:flex md:items-center md:gap-6">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00E5A0]/35 bg-[#0E1A1A]/80 shadow-[0_0_24px_rgba(0,229,160,0.25)]">
                      <Icon className="h-6 w-6 text-[#00E5A0]" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  </div>

                  <motion.article
                    initial={{ opacity: 0, x: fromLeft ? -36 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="clay-card overflow-hidden rounded-2xl"
                  >
                    <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-stretch">
                      <div className="flex md:hidden items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00E5A0]/35 bg-white/5">
                          <Icon className="h-5 w-5 text-[#00E5A0]" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#00E5A0]">
                          Step {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-[#F3F8F8] sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                          {step.body}
                        </p>
                      </div>
                      <div className="relative w-full shrink-0 overflow-hidden rounded-xl border border-white/10 md:w-[280px]">
                        {step.image ? (
                          <>
                            <img
                              src={step.image}
                              alt={step.alt ?? ""}
                              className="h-44 w-full object-cover md:h-full md:min-h-[200px]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080C0C]/85 via-[#080C0C]/25 to-transparent" />
                          </>
                        ) : (
                          <div className="flex h-44 flex-col justify-between bg-gradient-to-br from-[#0A4D4D]/40 to-[#080C0C] p-4 md:h-full md:min-h-[200px]">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5A0]/90">
                              <FileText className="h-4 w-4" />
                              PDF Preview
                            </div>
                            <div className="space-y-2 rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur-sm">
                              <div className="h-2 w-3/4 rounded bg-white/15" />
                              <div className="h-2 w-full rounded bg-white/10" />
                              <div className="h-2 w-5/6 rounded bg-white/10" />
                              <div className="mt-3 grid grid-cols-3 gap-2">
                                <div className="h-10 rounded bg-[#00E5A0]/15" />
                                <div className="h-10 rounded bg-white/10" />
                                <div className="h-10 rounded bg-[#0D6E6E]/25" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const cards = [
    {
      emoji: "\u{1F6F0}",
      title: "Sentinel-2 Satellite Integration",
      body: "Live multi-spectral data ingestion every 5 days, automatically.",
    },
    {
      emoji: "\u{1F9E0}",
      title: "Explainable AI (SHAP)",
      body: "Know exactly why carbon is estimated at any value. No black boxes.",
    },
    {
      emoji: "\u{1F504}",
      title: "Continuous Change Detection",
      body: "Automated weekly alerts for deforestation or land-use change events.",
    },
    {
      emoji: "\u{1F4C4}",
      title: "VCS-Aligned Reports",
      body: "Export audit-ready documentation aligned to Verra's VCS VM0047 methodology.",
    },
  ];

  return (
    <section id="features" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Key Features</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[#F3F8F8] sm:text-4xl md:text-5xl"
          >
            Enterprise-grade MRV, without enterprise timelines.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="clay-card rounded-2xl p-6 sm:p-8"
            >
              <span className="text-3xl" aria-hidden>
                {c.emoji}
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-[#F3F8F8] sm:text-xl">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                {c.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    {
      icon: Trees,
      title: "Forest Project Developers",
      body: "Monetize your conservation efforts with verifiable, credit-ready carbon reports.",
    },
    {
      icon: Landmark,
      title: "Government & NGOs",
      body: "Monitor environmental programs across large geographies with satellite precision.",
    },
    {
      icon: Building2,
      title: "Corporate ESG Teams",
      body: "Validate and source high-integrity carbon offsets with full data transparency.",
    },
  ];

  return (
    <section
      id="use-cases"
      className="relative z-10 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Use Cases</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[#F3F8F8] sm:text-4xl md:text-5xl"
          >
            Who Is Zucarto For?
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
        >
          {cases.map((u) => {
            const Icon = u.icon;
            return (
              <motion.article
                key={u.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="clay-card min-w-[280px] snap-center rounded-2xl border-t-2 border-t-[#00E5A0]/55 p-6 sm:min-w-0 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00E5A0]/25 bg-[#00E5A0]/10">
                  <Icon className="h-6 w-6 text-[#00E5A0]" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[#F3F8F8]">
                  {u.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {u.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function EarlyAccessSection() {
  const bullets = [
    "1 Project, up to 500 hectares",
    "Full AI + Satellite analysis pipeline",
    "Audit-ready PDF report included",
  ];

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-[#0A4D4D] to-[#080C0C] p-[1px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2rem] bg-[#080C0C]/20 px-4 py-14 sm:px-10 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.1)}
            className="clay-card mx-auto max-w-xl rounded-2xl p-8 text-center sm:p-10"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Pilot Program — Limited Spots</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl font-bold tracking-tight text-[#F3F8F8] sm:text-3xl md:text-4xl"
            >
              Join Our Early Access Program. Free.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm leading-relaxed text-[#94A3B8] sm:text-base"
            >
              We are currently onboarding select project developers, NGOs, and
              research institutions as part of our Pilot Program. Get full
              platform access — define your project, run satellite analysis, and
              generate your first carbon report — completely free.
            </motion.p>
            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-[#94A3B8] sm:text-base"
            >
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00E5A0]/15 text-[#00E5A0]">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-8">
              <motion.a
                href="mailto:hello@zucarto.com?subject=Zucarto%20Early%20Access%20Application"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px #00E5A0" }}
                className="clay-btn-primary flex w-full justify-center py-4 text-base"
              >
                Apply for Early Access →
              </motion.a>
              <p className="mt-4 text-xs text-[#94A3B8]/90">
                No credit card required. We will reach out within 48 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Sprout className="h-5 w-5 text-[#00E5A0]" />
              </span>
              <span className="font-heading text-lg font-bold text-[#F3F8F8]">
                Zucarto
              </span>
            </a>
            <p className="mt-4 text-sm text-[#94A3B8]">
              Making carbon markets honest.
            </p>
            <p className="mt-4 text-sm text-[#94A3B8]/90">
              {`Made with purpose in India ${String.fromCodePoint(0x1f1ee, 0x1f1f3)} for the Global Carbon Market.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F3F8F8]/80">
                Platform
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#features">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#how-it-works">
                    How It Works
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#early-access">
                    Early Access
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F3F8F8]/80">
                Company
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F3F8F8]" href="mailto:hello@zucarto.com">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#F3F8F8]" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F3F8F8]/80">
              Stay Updated
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F3F8F8] outline-none ring-[#00E5A0]/0 transition focus:border-[#00E5A0]/40 focus:ring-2 focus:ring-[#00E5A0]/25"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                className="clay-btn-primary shrink-0 px-5 py-3 text-sm"
              >
                Subscribe
              </motion.button>
            </form>
            <div className="mt-6 flex items-center gap-4 text-[#94A3B8]">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[#00E5A0]/35 hover:text-[#F3F8F8]"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-[#00E5A0]/35 hover:text-[#F3F8F8]"
                aria-label="Twitter / X"
              >
                <IconX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-sm text-[#94A3B8] md:flex-row md:items-center">
          <p>Copyright © 2025 Zucarto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080C0C]">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <PartnersStrip />
        <HowItWorksSection />
        <FeaturesSection />
        <UseCasesSection />
        <section id="early-access">
          <EarlyAccessSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
