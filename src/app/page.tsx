"use client";

import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Map as MapIcon,
  ChevronRight,
  PlayCircle,
  BarChart3,
  Tractor,
  Layers,
  ShieldCheck,
  Zap,
  Globe2,
  Menu,
  X,
  Target,
  Database,
  LineChart,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Satellite,
  FlaskConical,
  FileCheck,
  Sprout,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Radio,
  Activity,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, target, {
      duration,
      onUpdate(val) {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(val).toLocaleString()}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, target, suffix, prefix, duration]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
const SectionWrapper = ({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`w-full max-w-[1280px] mx-auto px-6 py-10 md:py-16 ${className}`}
  >
    {children}
  </motion.section>
);

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#00E5A0] mb-3">
    <span className="w-5 h-[2px] bg-[#00E5A0]/80 rounded-full shadow-[0_0_8px_#00E5A0]" />
    {children}
    <span className="w-5 h-[2px] bg-[#00E5A0]/80 rounded-full shadow-[0_0_8px_#00E5A0]" />
  </span>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Tab State for Products
  const [activeProductTab, setActiveProductTab] = useState<"carbon" | "nexus">("carbon");
  
  // Interactive Step State
  const [activeStep, setActiveStep] = useState(0);

  const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "Carbon MRV", href: "#carbon" },
    { label: "Nexus Agri", href: "#nexus" },
    { label: "Science", href: "#science" },
    { label: "Pricing", href: "#pricing" },
  ];

  const howItWorksSteps = [
    {
      icon: MapPin,
      title: "Define Project Boundary",
      desc: "Upload a boundary file or draw your area. The system validates geometry, land-use eligibility, and protected-zone overlaps automatically.",
      tag: "Step 1",
    },
    {
      icon: Satellite,
      title: "Ingest Data Signals",
      desc: "High-resolution satellite imagery and climate signals are composited, cloud-masked, and normalised without manual effort.",
      tag: "Step 2",
    },
    {
      icon: FlaskConical,
      title: "Run Calibrated Models",
      desc: "Advanced biomass stock algorithms and state-specific crop calendars are applied precisely to the region.",
      tag: "Step 3",
    },
    {
      icon: Activity,
      title: "Uncertainty & Explainability",
      desc: "Rigorous statistical uncertainty bounds are calculated. Every classification includes transparent attribution — no black boxes.",
      tag: "Step 4",
    },
    {
      icon: FileCheck,
      title: "Deliver Verified Outputs",
      desc: "Structured PDFs, interactive anomaly maps, and API-accessible data — delivered in multiple regional languages.",
      tag: "Step 5",
    },
  ];

  const bentoCards = [
    {
      icon: ShieldCheck,
      tag: "TRANSPARENCY",
      size: "md:col-span-2",
      title: "Feature Attribution — Every Decision Traced",
      desc: "No black boxes. Every classification or deduction ships with transparent feature attribution — pinpointing exactly which signal or variable drove the estimate.",
      accent: true,
      mock: "shap",
    },
    {
      icon: Layers,
      tag: "CONFIGURABILITY",
      size: "md:col-span-1",
      title: "Config-Driven State Logic",
      desc: "Deploy Nexus to any region without code changes — crop calendars, thresholds, and alert rules are easily configurable.",
      accent: false,
    },
    {
      icon: Lock,
      tag: "PROVENANCE",
      size: "md:col-span-1",
      title: "Full Data Lineage",
      desc: "Every pixel traced to its source scene ID, acquisition time, and processing chain version. Audit-ready by design.",
      accent: false,
    },
    {
      icon: TrendingUp,
      tag: "MONITORING",
      size: "md:col-span-2",
      title: "Continuous Change Detection",
      desc: "Automated alerts for disturbances and anomalies. Never miss a material change in your project boundary or agricultural area again.",
      accent: false,
      mock: "sparkline",
    },
  ];

  const methodologyBadges = [
    "Global Scientific Guidelines",
    "International Carbon Standards",
    "High-Res Satellite Networks",
    "Verified Climate Data",
    "Global Forest Definitions",
    "Cloud Computing Processing",
    "Third-Party Standard Alignment",
  ];

  return (
    <div className="relative min-h-screen bg-[linear-gradient(to_bottom,#081112,#05090a)] text-[#B9CBCD] font-sans selection:bg-[#00E5A0]/30 selection:text-white overflow-x-hidden">

      {/* Global ambient glows - Brighter, richer teal background to pop sections */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(15,90,90,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,229,160,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-screen bg-repeat" />
      </div>

      {/* ── A. Navigation ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-[#00E5A0]/10 backdrop-blur-xl bg-[#081112]/80 shadow-md">
        <div className="max-w-[1280px] mx-auto px-6 h-[70px] flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-[#0D6E6E]/60 border border-[#00E5A0]/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,160,0.15)]">
              <Leaf className="w-3.5 h-3.5 text-[#00E5A0] absolute top-1 right-1" />
              <MapIcon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-[18px] tracking-wide text-white drop-shadow-md">Zucarto</span>
            <span className="hidden sm:flex items-center gap-1.5 ml-3 text-[10px] font-bold text-[#00E5A0] border border-[#00E5A0]/30 rounded-full px-2 py-0.5 bg-[#00E5A0]/10 shadow-[0_0_8px_rgba(0,229,160,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
              Live Platform
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-[#8EBAC0]">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-200">{l.label}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="text-[14px] font-semibold text-[#8EBAC0] hover:text-white transition-colors">Log In</button>
            <a href="#pricing" className="bg-[#00E5A0] text-[#05090a] font-bold px-5 py-2.5 rounded-full text-[13px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,160,0.4)] hover:shadow-[0_0_25px_rgba(0,229,160,0.6)] hover:bg-white transition-all transform hover:-translate-y-0.5">
              Request Demo <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden absolute top-[70px] left-0 w-full bg-[#0B1A1B]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl"
            >
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-semibold text-white py-2">{l.label}</a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className="bg-transparent border border-white/20 text-white font-bold rounded-full py-3 text-sm">Log In</button>
                <button className="bg-[#00E5A0] text-[#05090a] font-bold rounded-full py-3 text-sm flex justify-center items-center gap-2">Request Demo <ArrowUpRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── B. Hero ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-10 md:pt-36 md:pb-14 px-6 flex flex-col items-center justify-center min-h-[75vh]">
        <div className="relative z-10 max-w-[850px] mx-auto text-center flex flex-col items-center">

          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] font-bold tracking-[0.15em] uppercase text-[#00E5A0] bg-[#0A4D4D]/30 border border-[#00E5A0]/30 rounded-full px-5 py-2 mb-6 shadow-[0_0_20px_rgba(0,229,160,0.15)]"
          >
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" /> Integrated Satellite Intelligence
            </span>
            <span className="text-[#00E5A0]/40 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Scientifically Verified</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] font-extrabold font-heading text-white leading-[1.05] tracking-tight mb-5 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            From Raw Pixels to{" "}
            <span className="text-gradient-hero inline-block animate-cta-pulse">Verified</span>
            <br className="hidden sm:block" />{" "}
            Carbon &amp; Crop Decisions.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[15px] md:text-[18px] text-[#A3C3C7] max-w-[640px] leading-relaxed mb-8 drop-shadow-md font-medium"
          >
            Zucarto integrates high-resolution satellite imagery with rigorous scientific models to deliver audit-ready carbon reports and state-level crop intelligence — compressed from months into days.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {[
              { val: 10000, suffix: "+ ha", label: "Monitored Area" },
              { val: 7, suffix: "-day", label: "Report Turnaround" },
              { val: 90, suffix: "% CI", label: "Uncertainty Precision" },
            ].map((chip, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#122627]/80 backdrop-blur-md shadow-lg">
                <span className="font-extrabold text-[#00E5A0] text-sm md:text-base">
                  <AnimatedNumber target={chip.val} suffix={chip.suffix} />
                </span>
                <span className="text-[#8EBAC0] font-semibold text-[11px] md:text-[13px] hidden xs:inline">{chip.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full"
          >
            <a href="#carbon" className="w-full sm:w-auto bg-[#00E5A0] hover:bg-[#00FFB2] text-[#05090a] font-bold px-8 py-3.5 rounded-full text-[14px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,160,0.3)] transition-all transform hover:-translate-y-1">
              <BarChart3 className="w-4.5 h-4.5" /> Run Carbon Assessment
            </a>
            <a href="#nexus" className="w-full sm:w-auto bg-[#173032] hover:bg-[#1E3E40] border border-white/10 text-white font-bold px-8 py-3.5 rounded-full text-[14px] flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-1">
              <Sprout className="w-4.5 h-4.5 text-[#00E5A0]" /> Explore Nexus Agri
            </a>
          </motion.div>
        </div>

        {/* Floating live-data card */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-6 right-4 md:right-8 lg:right-16 z-20 bg-[#0E1A1A]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#00E5A0]/20 shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(0,229,160,0.1)] hidden lg:block w-[240px]"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="text-[11px] font-bold text-[#00E5A0] uppercase tracking-wider">Live Assessment</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]" />
          </div>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex justify-between items-center">
              <span className="text-[#7A9A9E] font-medium">Project</span>
              <span className="text-white font-bold flex items-center gap-1 bg-white/5 py-0.5 px-2 rounded"><MapPin className="w-3 h-3 text-[#00E5A0]"/> Region AP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#7A9A9E] font-medium">Biomass Stock</span>
              <span className="text-white font-bold">148.3 t/ha</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#7A9A9E] font-medium">Uncertainty</span>
              <span className="text-[#00E5A0] font-bold">±4.2%</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#7A9A9E] font-medium">Status</span>
              <span className="text-white font-bold flex items-center gap-1.5 bg-[#0A4D4D]/50 border border-[#00E5A0]/30 py-0.5 px-2 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A0]" /> Ready
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── C. Platform Overview (Tabbed) ─────────────────────────────────── */}
      <section id="platform" className="w-full relative z-10 bg-[#0C1A1A] border-t border-white/10 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.3)] pt-16 pb-12 px-6">
        <div className="max-w-[1280px] mx-auto text-center mb-8">
          <SectionLabel>Integrated Platform</SectionLabel>
          <h2 className="text-[2rem] md:text-[2.6rem] font-bold font-heading text-white mb-2 leading-tight drop-shadow-md">
            Two Specialised Products.<br className="md:hidden" />{" "}
            <span className="text-[#00E5A0] block md:inline">One Geospatial Core.</span>
          </h2>
        </div>

        <div className="max-w-[960px] mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 bg-[#122627] rounded-xl border border-white/10 shadow-lg max-w-max mx-auto">
            <button
              onClick={() => setActiveProductTab("carbon")}
              className={`px-6 py-2.5 text-[14px] font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeProductTab === "carbon"
                  ? "bg-[#0A4D4D] text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#00E5A0]/30"
                  : "text-[#5A7A7E] hover:text-[#B9CBCD] hover:bg-white/5"
              }`}
            >
              <BarChart3 className="w-4.5 h-4.5" /> Carbon MRV
            </button>
            <button
              onClick={() => setActiveProductTab("nexus")}
              className={`px-6 py-2.5 text-[14px] font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeProductTab === "nexus"
                  ? "bg-[#094A4A] text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#00E5A0]/30"
                  : "text-[#5A7A7E] hover:text-[#B9CBCD] hover:bg-white/5"
              }`}
            >
              <Sprout className="w-4.5 h-4.5" /> Nexus Agri
            </button>
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[400px] md:min-h-[340px]">
            <AnimatePresence mode="wait">
              {activeProductTab === "carbon" && (
                <motion.div
                  key="carbon"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#112323] border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border-l-[4px] border-l-[#00E5A0] w-full"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#0A4D4D]/50 border border-[#00E5A0]/30 flex items-center justify-center shadow-inner">
                        <BarChart3 className="w-6 h-6 text-[#00E5A0]" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#8EBAC0] border border-white/10 rounded-full px-3 py-1 bg-white/5">
                        Carbon Developers &amp; Corporates
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading mb-3 drop-shadow-sm">Automated Carbon Accounting</h3>
                    <p className="text-[#8EBAC0] text-[15px] leading-relaxed mb-6 max-w-[420px] font-medium">
                      Automate global standard baselines, biomass estimation, and verifiable deduction reports using high-resolution satellite time-series.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Automated baseline & additionality computation",
                        "Statistical uncertainty deductions (90% CI)",
                        "Machine learning explainability for every prediction",
                        "Audit-ready PDF + API delivery",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-white font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-6 rounded-full text-sm font-bold inline-flex items-center gap-2 transition-all shadow-md">
                      Explore Carbon MRV <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                  {/* Right side visual */}
                  <div className="hidden md:flex flex-col gap-4 flex-1 bg-[#091415] rounded-2xl p-6 border border-white/10 h-full min-h-[300px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between text-xs text-[#7A9A9E] border-b border-white/10 pb-3 font-semibold uppercase tracking-wider">
                       <span>Report Generation Status</span>
                       <span className="text-[#00E5A0] flex items-center gap-1.5"><div className="w-2 h-2 bg-[#00E5A0] rounded-full animate-pulse"/> Active</span>
                    </div>
                    {/* Visual placeholders */}
                    <div className="flex-1 bg-[#122627] border border-[#0D6E6E]/40 rounded-xl flex items-center px-5 gap-4 hover:border-[#00E5A0]/40 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-[#0D6E6E]/50 flex items-center justify-center shadow-inner"><Satellite className="w-5 h-5 text-[#00E5A0]" /></div>
                      <div>
                         <div className="text-[12px] text-[#8EBAC0] font-semibold">Data Acquisition Phase</div>
                         <div className="text-[15px] text-white font-extrabold">145 High-Res Scenes Processed</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#122627] border border-[#0D6E6E]/40 rounded-xl flex items-center px-5 gap-4 hover:border-[#00E5A0]/40 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-[#0D6E6E]/50 flex items-center justify-center shadow-inner"><LineChart className="w-5 h-5 text-[#00E5A0]" /></div>
                      <div>
                         <div className="text-[12px] text-[#8EBAC0] font-semibold">Calculated Regional Output</div>
                         <div className="text-[15px] text-[#00E5A0] font-extrabold">148.3 Net Tons / Hectare</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeProductTab === "nexus" && (
                <motion.div
                  key="nexus"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#112323] border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border-l-[4px] border-l-[white] w-full"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center shadow-inner">
                        <Sprout className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/80 border border-white/20 rounded-full px-3 py-1 bg-white/5">
                        State Agri Depts &amp; Fintechs
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading mb-3 drop-shadow-sm">Nexus Agri-Intelligence</h3>
                    <p className="text-[#8EBAC0] text-[15px] leading-relaxed mb-6 max-w-[420px] font-medium">
                      Configurable crop health surveillance, sowing gap detection, and drought nowcasting — powered by multi-source telemetry.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Crop health & vigor anomaly mapping",
                        "Sowing progress & harvest readiness per district",
                        "Drought nowcast + 14-day weather advisories",
                        "Fully explainable outputs with regional-language reports",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-white font-medium">
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="bg-white hover:bg-gray-200 text-[#05090a] py-3 px-6 rounded-full text-sm font-bold inline-flex items-center gap-2 transition-all shadow-md">
                      Explore Nexus Agri <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                   {/* Right side visual */}
                  <div className="hidden md:flex flex-col gap-4 flex-1 bg-[#091415] rounded-2xl p-6 border border-white/10 h-full min-h-[300px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between text-xs text-[#7A9A9E] border-b border-white/10 pb-3 font-semibold uppercase tracking-wider">
                       <span>Surveillance Alerts</span>
                       <span className="text-white flex items-center gap-1.5"><div className="w-2 h-2 bg-white rounded-full animate-pulse"/> Monitoring Active</span>
                    </div>
                    <div className="flex-1 bg-[#122627] border border-white/10 rounded-xl flex items-center px-5 gap-4 hover:border-white/30 transition-colors bg-opacity-70">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shadow-inner"><AlertTriangle className="w-5 h-5 text-orange-400" /></div>
                      <div>
                         <div className="text-[12px] text-[#8EBAC0] font-semibold">Anomaly Detected</div>
                         <div className="text-[15px] text-white font-extrabold">Crop Stress — District Alpha</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#122627] border border-white/10 rounded-xl flex items-center px-5 gap-4 hover:border-white/30 transition-colors bg-opacity-70">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shadow-inner"><TrendingUp className="w-5 h-5 text-green-400" /></div>
                      <div>
                         <div className="text-[12px] text-[#8EBAC0] font-semibold">Seasonal Growth Stage</div>
                         <div className="text-[15px] text-green-400 font-extrabold">In-season Progress: +12%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── D. Problem → Platform Transformation (Compact Data Flow) ─────── */}
      <section className="w-full border-y border-white/10 bg-[#0A1617] py-14 px-6 relative shadow-[inset_0_0_50px_rgba(0,0,0,0.4)]">
        <div className="max-w-[1100px] mx-auto text-center relative z-10">
            <h2 className="text-[1.8rem] md:text-[2.4rem] font-extrabold font-heading text-white mb-8 drop-shadow-md">
              The Legacy Stack is Broken. Upgrade to Verified Outcomes.
            </h2>
            
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0 relative">
               {/* Old Way */}
               <div className="flex-1 bg-[#0A1112] border border-white/10 p-8 rounded-3xl md:rounded-r-none z-10 shadow-lg">
                 <h4 className="text-[13px] font-extrabold text-[#7A9A9E] uppercase tracking-[0.15em] mb-5">The Old Way</h4>
                 <div className="space-y-4 text-left">
                    <div className="text-[14px] text-[#8EBAC0] font-medium flex items-center gap-3"><span className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center shrink-0"><X className="w-4 h-4 text-red-500"/></span>Manual, costly field sampling</div>
                    <div className="text-[14px] text-[#8EBAC0] font-medium flex items-center gap-3"><span className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center shrink-0"><X className="w-4 h-4 text-red-500"/></span>Opaque, black-box methodologies</div>
                    <div className="text-[14px] text-[#8EBAC0] font-medium flex items-center gap-3"><span className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center shrink-0"><X className="w-4 h-4 text-red-500"/></span>Fragmented point solutions</div>
                 </div>
               </div>

               {/* Connector Arrow */}
               <div className="flex items-center justify-center w-full md:w-20 h-10 md:h-auto z-20 md:-mx-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#00E5A0] border-4 border-[#0C1A1A] shadow-[0_0_20px_rgba(0,229,160,0.4)] flex items-center justify-center transition-transform group-hover:scale-110">
                     <ChevronRight className="w-6 h-6 text-[#05090a] rotate-90 md:rotate-0 font-bold" />
                  </div>
               </div>

               {/* Zucarto Way */}
               <div className="flex-1 bg-[#0D3838] border border-[#00E5A0]/40 p-8 rounded-3xl md:rounded-l-none z-10 shadow-[inset_0_0_30px_rgba(0,229,160,0.1),0_10px_30px_rgba(0,0,0,0.3)]">
                 <h4 className="text-[13px] font-extrabold text-[#00E5A0] uppercase tracking-[0.15em] mb-5 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]"/>The Zucarto Way</h4>
                 <div className="space-y-4 text-left">
                    <div className="text-[14px] text-white font-bold flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#00E5A0]/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-[#00E5A0]"/></span>Automated satellite workflows</div>
                    <div className="text-[14px] text-white font-bold flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#00E5A0]/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-[#00E5A0]"/></span>Every pixel fully traceable and auditable</div>
                    <div className="text-[14px] text-white font-bold flex items-center gap-3"><span className="w-6 h-6 rounded bg-[#00E5A0]/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-[#00E5A0]"/></span>Unified core for Carbon & Agri applications</div>
                 </div>
               </div>
            </div>
        </div>
      </section>

      {/* ── E. How It Works — Interactive Steps ────────────────────────────── */}
      <SectionWrapper id="science" className="py-16 md:py-20">
        <div className="text-center mb-10">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-[2rem] md:text-[2.6rem] font-bold font-heading text-white mb-3 drop-shadow-md">
            From Shapefile to Signed Report.
          </h2>
          <p className="text-[#8EBAC0] text-[16px] font-medium">A fully automated pipeline that compresses months of work into days.</p>
        </div>

        <div className="bg-[#112323] border border-white/10 shadow-xl rounded-3xl p-5 md:p-8 max-w-[1050px] mx-auto min-h-[400px] md:min-h-[340px] flex flex-col md:flex-row gap-8 items-center border-t-[3px] border-t-[#00E5A0]">
            
            {/* Step Selection List */}
            <div className="w-full md:w-[35%] flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide shrink-0 snap-x">
               {howItWorksSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`text-left p-4 rounded-2xl transition-all duration-300 min-w-[220px] md:min-w-0 snap-start flex items-center gap-4 border ${
                        isActive 
                        ? "bg-[#0A4D4D] border-[#00E5A0]/40 shadow-[0_5px_15px_rgba(0,0,0,0.2)]" 
                        : "bg-[#0E1B1C] border-transparent hover:bg-[#132B2C]"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${isActive ? "bg-[#00E5A0]/20 text-[#00E5A0]" : "bg-[#1B3233] text-[#7A9A9E]"}`}>
                         <step.icon className="w-4.5 h-4.5" />
                      </div>
                      <span className={`text-[14px] font-bold ${isActive ? "text-white" : "text-[#8EBAC0]"}`}>
                         {step.title}
                      </span>
                    </button>
                  )
               })}
            </div>

            {/* Step Content Area */}
            <div className="flex-1 bg-[#091415] rounded-2xl p-8 md:p-10 border border-white/10 h-full w-full relative overflow-hidden flex items-center shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]">
               <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] bg-[#00E5A0]/5 blur-[70px] rounded-full pointer-events-none" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeStep}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="relative z-10 w-full"
                 >
                    <span className="inline-block bg-[#00E5A0]/20 border border-[#00E5A0]/30 text-[#00E5A0] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                       Phase {activeStep + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-5 leading-tight drop-shadow-sm">
                       {howItWorksSteps[activeStep].title}
                    </h3>
                    <p className="text-[15px] md:text-[16px] text-[#8EBAC0] leading-relaxed font-medium">
                       {howItWorksSteps[activeStep].desc}
                    </p>
                 </motion.div>
               </AnimatePresence>
            </div>
            
        </div>
      </SectionWrapper>

      {/* ── F. Feature Chips (Compact layout) ────────────────────────────── */}
      <SectionWrapper className="py-12 md:py-16">
        <div className="text-center mb-10">
          <SectionLabel>Platform Features</SectionLabel>
          <h2 className="text-[2rem] md:text-[2.6rem] font-bold font-heading text-white drop-shadow-md">
            Built for Scientific Rigour<span className="md:hidden">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bentoCards.map((card, i) => (
             <div key={i} className={`p-7 rounded-3xl border transition-colors duration-300 flex flex-col justify-between shadow-xl ${card.accent ? 'bg-[#0A4D4D] border-[#00E5A0]/40' : 'bg-[#112323] border-white/10 hover:bg-[#162D2D] hover:border-white/20'}`}>
                <div>
                   <div className="flex items-center justify-between mb-5">
                      <div className={`p-2.5 rounded-xl shadow-inner ${card.accent ? 'bg-[#00E5A0]/20 border border-[#00E5A0]/30' : 'bg-[#0D1D1E] border border-white/5'}`}>
                         <card.icon className={`w-5.5 h-5.5 ${card.accent ? 'text-[#00E5A0]' : 'text-white'}`} />
                      </div>
                      <span className={`text-[10px] uppercase tracking-[0.15em] font-extrabold ${card.accent ? 'text-[#00E5A0]' : 'text-[#5A7A7E]'}`}>{card.tag}</span>
                   </div>
                   <h3 className="text-[17px] font-extrabold text-white mb-3 leading-tight drop-shadow-sm">{card.title}</h3>
                </div>
                <p className={`text-[13px] mt-2 leading-relaxed font-medium ${card.accent ? 'text-[#A3E5E5]' : 'text-[#8EBAC0]'}`}>
                   {card.desc}
                </p>
             </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── G. Scientific Foundation (Compact Ticker) ────────────────────── */}
      <section className="w-full border-y border-white/10 bg-[#0C191A] py-10 overflow-hidden flex flex-col items-center shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
         <div className="text-center mb-6 px-6">
             <SectionLabel>Backed by Methodology</SectionLabel>
         </div>
         {/* Scrolling methodology ticker */}
         <div className="relative overflow-hidden w-full max-w-[1280px]">
           <div className="flex gap-5 animate-shimmer" style={{ animationDuration: "35s" }}>
             <div className="flex gap-5 flex-nowrap">
               {[...methodologyBadges, ...methodologyBadges, ...methodologyBadges].map((badge, i) => (
                 <div key={i} className="flex-shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-[#122627] text-[14px] font-bold text-[#8EBAC0] whitespace-nowrap shadow-md">
                   <CheckCircle2 className="w-4 h-4 text-[#00E5A0]" />
                   {badge}
                 </div>
               ))}
             </div>
           </div>
         </div>
      </section>

      {/* ── H. Pricing ───────────────────────────────────────────────────── */}
      <SectionWrapper id="pricing" className="py-16 md:py-20">
        <div className="text-center mb-10">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-[2rem] md:text-[2.6rem] font-bold font-heading text-white mb-3 drop-shadow-md">
            Scalable Economics.
          </h2>
          <p className="text-[#8EBAC0] text-[16px] font-medium">Choose a plan based on processing scale.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Pilot */}
          <div className="bg-[#112323] p-8 rounded-3xl border border-white/10 flex flex-col hover:bg-[#162B2B] hover:border-white/20 transition-all shadow-xl">
            <h3 className="text-[17px] font-extrabold text-white mb-1">Pilot</h3>
            <p className="text-[12px] text-[#7A9A9E] mb-4 font-medium">Small scale & evaluation</p>
            <div className="text-3xl font-extrabold text-white mb-5">Free</div>
            <ul className="space-y-3.5 mb-8 text-[14px] text-[#A3C3C7] flex-1 font-medium">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />1 Project Workspace</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Up to 500 Hectares</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Standard Level Outputs</li>
            </ul>
            <button className="w-full bg-[#1A3333] hover:bg-[#204040] border border-white/10 text-white font-bold py-3.5 rounded-full text-[14px] transition-colors shadow-sm">Start Pilot</button>
          </div>

          {/* Professional */}
          <div className="bg-[#0A4D4D] p-8 border border-[#00E5A0]/40 rounded-3xl relative transform md:-translate-y-3 shadow-[0_20px_50px_rgba(0,229,160,0.15)] flex flex-col">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#00E5A0] text-[#05090a] font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-[0_0_15px_#00E5A0]">
              Standard SaaS
            </div>
            <h3 className="text-[17px] font-extrabold text-white mb-1">Professional</h3>
            <p className="text-[12px] text-[#A3E5E5] mb-4 font-medium">Active platform usage</p>
            <div className="text-3xl font-extrabold text-[#00E5A0] mb-5 drop-shadow-[0_0_8px_rgba(0,229,160,0.3)]">Scale Usage</div>
            <ul className="space-y-3.5 mb-8 text-[14px] text-white flex-1 font-medium">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Up to 100,000 Hectares</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Full Feature Attribution reporting</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Advanced Uncertainty modelling</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Priority infrastructure pool</li>
            </ul>
            <button className="w-full bg-[#00E5A0] text-[#05090a] hover:bg-white font-bold py-3.5 rounded-full text-[14px] transition-colors shadow-[0_0_15px_rgba(0,229,160,0.4)]">Contact Sales</button>
          </div>

          {/* Enterprise */}
          <div className="bg-[#112323] p-8 rounded-3xl border border-white/10 flex flex-col hover:bg-[#162B2B] hover:border-white/20 transition-all shadow-xl">
            <h3 className="text-[17px] font-extrabold text-white mb-1">Enterprise & Govt</h3>
            <p className="text-[12px] text-[#7A9A9E] mb-4 font-medium">Large-scale state monitoring</p>
            <div className="text-3xl font-extrabold text-white mb-5">Tailored</div>
            <ul className="space-y-3.5 mb-8 text-[14px] text-[#A3C3C7] flex-1 font-medium">
               <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Unlimited Hectare Volume</li>
               <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />API Access Integration</li>
               <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Custom Analytics Configuration</li>
               <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#00E5A0] shrink-0" />Dedicated Compute Layer</li>
            </ul>
            <button className="w-full bg-[#1A3333] hover:bg-[#204040] border border-white/10 text-white font-bold py-3.5 rounded-full text-[14px] transition-colors shadow-sm">Contact Support</button>
          </div>
        </div>
      </SectionWrapper>

      {/* ── I. Final CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-20 my-10 mx-6 max-w-[1280px] xl:mx-auto bg-[#0A2626] rounded-[40px] border border-[#00E5A0]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_80px_rgba(0,229,160,0.1)] overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#00E5A0] blur-[150px] opacity-[0.1] -ml-[200px] -mt-[200px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00E5A0] blur-[120px] opacity-[0.08] -mr-[100px] -mb-[100px] pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h2 className="text-[2.2rem] md:text-[3rem] font-extrabold font-heading text-white mb-5 max-w-[600px] drop-shadow-md">
            Ready to Automate your Output?
          </h2>
          <p className="text-[16px] text-[#8EBAC0] font-medium mb-10 max-w-[500px] leading-relaxed">
            Transition from manual processes to scalable, verifiable data intelligence with zero code.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a href="#pricing" className="bg-[#00E5A0] hover:bg-white text-[#05090a] font-bold px-8 py-3.5 rounded-full text-[14px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,160,0.3)] transition-all transform hover:-translate-y-1">
              Start Free Assessment <ArrowUpRight className="w-4.5 h-4.5" />
            </a>
            <button className="bg-[#122A2A] hover:bg-[#1A3838] border border-white/10 text-white font-bold px-8 py-3.5 rounded-full text-[14px] flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-1">
               Request Process Overview
            </button>
          </div>
        </div>
      </section>

      {/* ── J. Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#00E5A0]/10 bg-[#040808] pt-16 pb-10 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <Leaf className="w-4 h-4 text-[#00E5A0]" />
              <span className="font-heading font-extrabold text-[18px] text-white tracking-wide">Zucarto</span>
            </div>
            <p className="text-[#5A7A7E] text-[13px] font-medium mb-6 leading-relaxed">
              Geospatial intelligence suite globally distributed. Made with precision for verifiable environmental data.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-[13px] uppercase tracking-wider mb-5">Products</h4>
            <ul className="space-y-3 flex flex-col text-[14px] text-[#7A9A9E] font-medium">
              {["Platform Core", "Carbon Accounting", "Agricultural Modules", "Analysis Standards"].map((l) => (
                <a key={l} href="#" className="hover:text-[#00E5A0] transition-colors self-start">{l}</a>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-[13px] uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 flex flex-col text-[14px] text-[#7A9A9E] font-medium">
              {["About", "Global Partners", "News & Updates", "Contact Hub"].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors self-start">{l}</a>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-[13px] uppercase tracking-wider mb-5">Stay Advised</h4>
            <div className="flex bg-[#0A1212] rounded-full p-1.5 border border-[#00E5A0]/20 focus-within:border-[#00E5A0]/60 transition-colors shadow-inner">
              <input
                id="newsletter"
                type="email"
                placeholder="Business Email"
                className="bg-transparent text-[13px] w-full outline-none px-4 text-white placeholder-[#5A7A7E] font-medium"
              />
              <button className="bg-[#00E5A0] hover:bg-white text-[#05090a] px-5 py-2.5 text-[12px] rounded-full whitespace-nowrap font-bold transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#5A7A7E] font-medium">
          <p>© {new Date().getFullYear()} Zucarto Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Service Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
