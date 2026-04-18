# Advanced Landing Page Prompt for Zucarto MRV Platform

You can copy and paste the text block below into **v0 by Vercel**, **Cursor**, **Claude**, or any advanced AI website builder to generate your standalone Next.js landing page. 



---

## 📋 The Prompt

```text
You are an expert Frontend Developer, UI/UX Designer, and Next.js Specialist. Your task is to build a breathtaking, high-conversion landing page for **"Zucarto"** — an advanced, satellite-powered Carbon MRV (Monitoring, Reporting & Verification) platform.

This landing page must be a standalone Next.js 14 project (App Router) configured with Tailwind CSS and Framer Motion, ready to be instantly deployed to Vercel. 

### 1. Design System & Aesthetics
I want an extremely premium, cutting-edge design. Do not use generic, flat web designs.
- **Vibe:** State-of-the-art, trustworthy, ecological but highly technical.
- **Color Palette:** 
  - Primary: Deep Forest Teal (`#0A4D4D` to `#0D6E6E`)
  - Accent/Glow: Bio-Luminescent Neon Green (`#00E5A0`)
  - Backgrounds: Rich Obsidian Black (`#080C0C`) and Deep Charcoal/Midnight for cards.
  - Text: Frosty White (`#F3F8F8`) for headings, soft silver for paragraphs.
- **UI/UX Style - "Neo-Claymorphism" & Glassmorphism:** Ensure cards have soft, pillowy 3D depth (claymorphism) combined with frosted glass overlays (glassmorphism backdrop blur). Elements should look tactile and futuristic.
- **Typography:** Use a modern, geometric sans-serif (e.g., 'Inter' or 'Outfit' from Google Fonts).
- **Animations:** Extensive use of `framer-motion`. Include:
  - Staggered fade-up entries as the user scrolls down.
  - Subtle hover-lift on claymorphism cards.
  - A slow-moving mesh gradient or starry interactive particle background behind the Hero section.

### 2. Technical Stack Requirements
- Framework: Next.js 14 App Router (`app/page.tsx`).
- Styling: Tailwind CSS (use arbitrary values for exact hex codes and soft shadows).
- Icons: `lucide-react`.
- Animations: `framer-motion` (use `useScroll` and `useTransform` for parallax effects if possible).

### 3. Page Structure & Content

#### A. Navigation Bar (Sticky Glassmorphism)
- Left: Zucarto Logo (use a striking Leaf-meets-Data icon) typography in bold.
- Center: Links -> Features, Science, Use Cases, Pricing.
- Right: "Login" (ghost button) and "Request Access" (Neon Green solid button with soft glow).

#### B. Hero Section (The "Wow" Factor)
- **Visuals:** A dark, moody background with a glowing, stylized 3D earth or a satellite scanning a lush forest. (Use a high-quality placeholder image: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop` but overlay a dark green/black gradient).
- **Headline:** "Satellite-Powered Carbon MRV at a Fraction of the Cost." (Make "Carbon MRV" pop with a neon green text gradient).
- **Sub-headline:** "AI-driven carbon estimation and audit-ready reports delivered in days, not months. The ultimate platform for project developers, corporatess, and NGOs."
- **CTAs:** 
  1. "Start Free Trial" (Neon Green, pulsing animation).
  2. "Watch Demo" (Outlined button with a Play icon).
- **Trust Strip:** Underneath the CTAs, show logos/text: "VCS VM0047 Ready", "IPCC Tier 2 Compliant", "AI-Powered", "Sentinel-2 Integration".

#### C. The Problem vs. The Zucarto Solution (Side-by-Side Comparison)
- **Left Column (The Old Way - Muted/Red tints):**
  - "Traditional MRV is broken."
  - Manual Field Surveys (Costly).
  - 6-12 Months for baselines.
  - 80% fail verification due to poor data.
- **Right Column (The Zucarto Way - Glowing/Green tints):**
  - "The Future of Carbon Accounting."
  - Satellite + AI (Scalable).
  - 7 Days for full reports.
  - Cryptographically secure, audit-ready data.

#### D. How It Works (Interactive Scroll Timeline)
- Create a vertical or horizontal 3-step timeline using claymorphic cards.
- **Step 1: Define Boundaries.** "Draw your project area on our interactive map. We support forests, wetlands, and agriculture." (Include a placeholder map screenshot).
- **Step 2: AI Multi-Spectral Analysis.** "We pull petabytes of Sentinel-2 data, calculating NDVI, EVI, and MSAVI."
- **Step 3: Audit-Ready Reports.** "Generate comprehensive PDF reports containing Tier 2 Carbon Stock estimations and SHAP explainability graphs."

#### E. Feature Bento Box
- Create a modern "Bento Box" grid layout showcasing features (mixed sizes of claymorphic cards).
- **Card 1 (Large):** "Explainable AI (SHAP)" - Show a mock graph illustration. "We don't do black boxes. Know exactly why carbon is estimated."
- **Card 2 (Medium):** "10,000+ Hectare Scale" - "Monitor massive areas instantly."
- **Card 3 (Medium):** "Continuous Monitoring" - "Weekly automated change detection."
- **Card 4 (Long):** "Multilingual Support" - "Reports generated in English, Hindi, Telugu for local farmers."

#### F. Pricing Section
- Three distinct pricing cards. The middle card should be slightly larger and glowing (highlighted).
- **Pilot:** Free. 1 Project, up to 500 ha.
- **Professional:** ₹2,500/mo. 10 Projects, up to 10,000 ha, advanced AI reports.
- **Enterprise:** Custom. Unlimited, API Access, White-labeling.

#### G. Footer
- Simple, clean footer styling.
- Newsletter signup input field.
- Links: Privacy, Terms, LinkedIn, Twitter.
- Text: "Made with precision in India 🇮🇳 for the Global Carbon Market."

### 4. Code Generation Instructions
Please generate the complete, production-ready code emphasizing high-end design, heavily using Tailwind and Framer Motion for the Claymorphism/Glassmorphism styling. Make sure to generate the complete `page.tsx` file block and indicate any specific setup instructions required (like `npx create-next-app@latest`, installing dependencies, etc). 
```
