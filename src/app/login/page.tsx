"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Leaf, Lock, Map as MapIcon } from "lucide-react";
import { type FormEvent, useState } from "react";

type Step = "form" | "success";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Please enter a password of at least 6 characters for this step.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/website-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setStep("success");
      setPassword("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[linear-gradient(to_bottom,#081112,#05090a)] text-[#B9CBCD] font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(15,90,90,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,229,160,0.06)_0%,transparent_60%)]" />
      </div>

      <header className="relative z-10 border-b border-[#00E5A0]/10 bg-[#081112]/80 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-[#0D6E6E]/60 border border-[#00E5A0]/40 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-[#00E5A0] absolute top-1 right-1" />
              <MapIcon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-[18px] text-white">Zucarto</span>
          </Link>
          <Link
            href="/"
            className="text-[14px] font-semibold text-[#8EBAC0] hover:text-white inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-70px)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[420px]"
        >
          {step === "form" ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading mb-2">
                  Sign in to CarbonMRV
                </h1>
                <p className="text-[14px] text-[#8EBAC0]">
                  Access is granted after our team verifies your details. You will not be redirected to the product
                  automatically.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-[#0E1A1A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-4"
              >
                <div>
                  <label htmlFor="fullName" className="block text-[12px] font-bold text-[#7A9A9E] mb-1.5 uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    className="w-full bg-[#122627] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#5A7A7E] outline-none focus:border-[#00E5A0]/60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12px] font-bold text-[#7A9A9E] mb-1.5 uppercase tracking-wider">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={254}
                    autoComplete="email"
                    className="w-full bg-[#122627] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#5A7A7E] outline-none focus:border-[#00E5A0]/60"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-[12px] font-bold text-[#7A9A9E] mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full bg-[#122627] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#5A7A7E] outline-none focus:border-[#00E5A0]/60"
                    placeholder="••••••••"
                  />
                  <p className="text-[11px] text-[#5A7A7E] mt-1.5">
                    For this intake step only. It is not stored and not sent to our servers.
                  </p>
                </div>

                {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#00E5A0] hover:bg-white disabled:opacity-60 text-[#05090a] font-bold py-3.5 rounded-full text-[14px] transition-colors"
                >
                  {submitting ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-[#0E1A1A] border border-[#00E5A0]/30 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(0,229,160,0.12)]">
              <div className="w-14 h-14 rounded-full bg-[#00E5A0]/20 border border-[#00E5A0]/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#00E5A0]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white font-heading mb-4">
                Thank you for becoming part of Zucarto
              </h2>
              <p className="text-[15px] text-[#A3C3C7] leading-relaxed mb-6">
                Our team will connect with you and give you access to our CarbonMRV once we have verified your details.
                We appreciate your patience.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3 rounded-full text-[14px] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Return to home
              </Link>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
