"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Star, Camera, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import { studioInfo } from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  { value: "wedding",     label: "Wedding",        sub: "Photography",   icon: "💍" },
  { value: "reception",   label: "Reception",      sub: "Photography",   icon: "🥂" },
  { value: "pre-wedding", label: "Pre-Wedding",    sub: "Shoot",         icon: "🌅" },
  { value: "maternity",   label: "Maternity",      sub: "Photography",   icon: "🤱" },
  { value: "newborn",     label: "Newborn",        sub: "Baby",          icon: "👶" },
  { value: "engagement",  label: "Engagement",     sub: "Session",       icon: "💒" },
  { value: "corporate",   label: "Corporate",      sub: "Events",        icon: "🏢" },
  { value: "birthday",    label: "Birthday",       sub: "Celebration",   icon: "🎂" },
];

const PACKAGES = [
  { value: "silver",   label: "Silver",   sub: "Starter",  desc: "4 hrs · 200 edited photos" },
  { value: "gold",     label: "Gold",     sub: "Popular",  desc: "8 hrs · 400 edited photos" },
  { value: "platinum", label: "Platinum", sub: "Premium",  desc: "Full day · 700+ photos + film" },
  { value: "royal",    label: "Royal",    sub: "Luxury",   desc: "2 days · Unlimited + album" },
  { value: "custom",   label: "Custom",   sub: "Bespoke",  desc: "Tailored to your vision" },
];

const TESTIMONIALS = [
  {
    name: "Divya & Aravind",
    role: "Wedding · Dec 2024",
    text: "Every frame felt like a painting. We've seen thousands of wedding photos and nothing comes close to what Shiyarah gave us.",
    avatar: "DA",
    rating: 5,
  },
  {
    name: "Keerthana & Vishnu",
    role: "Pre-Wedding · Nov 2024",
    text: "The Mahabalipuram shoot was beyond anything we imagined. They found light in places we didn't know existed.",
    avatar: "KV",
    rating: 5,
  },
  {
    name: "Ranjitha & Karthick",
    role: "Wedding · Jan 2025",
    text: "Our highlight film made our family in the UK weep with joy. Worth every single rupee and so much more.",
    avatar: "RK",
    rating: 5,
  },
];

const STATS = [
  { value: "800+", label: "Happy Couples" },
  { value: "6+",   label: "Years of Craft" },
  { value: "4.9",  label: "Google Rating" },
  { value: "48h",  label: "Sneak Peek" },
];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Form {
  name: string;
  email: string;
  phone: string;
  venue: string;
  guestCount: string;
  message: string;
}
interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BookPageClient({
  preselectedService,
  preselectedPackage,
}: {
  preselectedService?: string;
  preselectedPackage?: string;
}) {
  const [form, setForm]           = useState<Form>({ name: "", email: "", phone: "", venue: "", guestCount: "", message: "" });
  const [service, setService]     = useState(preselectedService ?? "");
  const [pkg, setPkg]             = useState(preselectedPackage ?? "");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors]       = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [tIndex, setTIndex]       = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setTIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Advance step automatically on selection
  useEffect(() => { if (service && activeStep === 1) setActiveStep(2); }, [service]);
  useEffect(() => { if (pkg && activeStep === 2) setActiveStep(3); }, [pkg]);
  useEffect(() => { if (eventDate && activeStep === 3) setActiveStep(4); }, [eventDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim())  e.name    = "Name is required";
    if (!form.email.trim()) e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone   = "Phone is required";
    if (!service)           e.service = "Please select a service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const serviceName = SERVICES.find((s) => s.value === service)?.label ?? service;
    const pkgName     = PACKAGES.find((p) => p.value === pkg)?.label ?? "Not selected";
    const dateStr     = eventDate ? format(eventDate, "EEEE, d MMMM yyyy") : "Not specified";

    const msg = [
      `🎯 *New Booking — Shiyarah Weddings*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📧 *Email:* ${form.email}`,
      `📸 *Service:* ${serviceName}`,
      `📦 *Package:* ${pkgName}`,
      `📅 *Event Date:* ${dateStr}`,
      form.venue      ? `📍 *Venue:* ${form.venue}`            : null,
      form.guestCount ? `👥 *Guests:* ${form.guestCount}`      : null,
      form.message    ? `💬 *Notes:* ${form.message}`          : null,
      ``,
      `_Sent from shiyarahweddings.com_`,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${studioInfo.phoneRaw}?text=${encodeURIComponent(msg)}`;
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", venue: "", guestCount: "", message: "" });
    setService(""); setPkg(""); setEventDate(undefined); setActiveStep(1);
  };

  // ── Completion percentage ──────────────────────────────────────────────────
  const completedSteps = [
    !!service, !!pkg, !!eventDate,
    !!(form.name && form.email && form.phone),
  ].filter(Boolean).length;
  const progress = (completedSteps / 4) * 100;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[44%_56%]"
      style={{ minHeight: "100vh", paddingTop: "var(--nav-height, 72px)" }}
    >

      {/* ════════════════════════════════════════════════════════════════════
          LEFT PANEL — Dark editorial sidebar
      ════════════════════════════════════════════════════════════════════ */}
      <LeftPanel tIndex={tIndex} setTIndex={setTIndex} />

      {/* ════════════════════════════════════════════════════════════════════
          RIGHT PANEL — Smart stepped form
      ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F8F7F4] overflow-y-auto">
        <div className="max-w-[560px] mx-auto px-6 sm:px-10 py-12 xl:py-16">

          {/* Mobile brand header */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-flex flex-col leading-none mb-6">
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.2em", color: "#0E0E0E" }}>
                SHIYARAH
              </span>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#9CA3AF", marginTop: 2 }}>
                WEDDINGS · CHENNAI
              </span>
            </Link>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C8A96E", textTransform: "uppercase", marginBottom: 8 }}>
              Book a Session
            </p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,7vw,3rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 0.95, color: "#0E0E0E" }}>
              Let&apos;s Craft<br />
              <em style={{ fontStyle: "italic", color: "#9CA3AF" }}>Your Story.</em>
            </h1>
          </div>

          <AnimatePresence mode="wait">

            {/* ── SUCCESS STATE ── */}
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="py-12"
              >
                <SuccessState eventDate={eventDate} onReset={resetForm} waUrl={studioInfo.whatsapp} />
              </motion.div>

            ) : (

              /* ── FORM ── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF" }}>
                      Your Enquiry
                    </span>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#C8A96E" }}>
                      {completedSteps}/4 complete
                    </span>
                  </div>
                  <div className="h-[1px] bg-[#EFEDE8] relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#C8A96E]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* ── STEP 1: SERVICE ── */}
                <FormStep
                  step={1}
                  label="Choose Your Service"
                  activeStep={activeStep}
                  onOpen={() => setActiveStep(1)}
                  isDone={!!service}
                  doneLabel={SERVICES.find(s => s.value === service)?.label}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {SERVICES.map((s) => {
                      const isActive = service === s.value;
                      return (
                        <motion.button
                          key={s.value}
                          type="button"
                          onClick={() => { setService(s.value); setErrors((p) => ({ ...p, service: undefined })); }}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            background:  isActive ? "#0E0E0E" : "#FFFFFF",
                            border:      isActive ? "1px solid #0E0E0E" : "1px solid #E8E6E1",
                            padding:     "14px 8px",
                            cursor:      "pointer",
                            textAlign:   "center",
                            transition:  "all 0.2s ease",
                            position:    "relative",
                            overflow:    "hidden",
                          }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="service-bg"
                              style={{ position: "absolute", inset: 0, background: "#0E0E0E" }}
                              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                            />
                          )}
                          <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{s.icon}</div>
                            <div style={{
                              fontSize:      "0.62rem",
                              fontWeight:    700,
                              letterSpacing: "0.07em",
                              textTransform: "uppercase",
                              color:         isActive ? "#C8A96E" : "#4B4B4B",
                              lineHeight:    1.3,
                            }}>
                              {s.label}
                            </div>
                            <div style={{ fontSize: "0.55rem", color: isActive ? "rgba(255,255,255,0.3)" : "#AEAEAD", marginTop: 2, letterSpacing: "0.05em" }}>
                              {s.sub}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p style={{ fontSize: "0.7rem", color: "#E24B4A", marginTop: 8 }}>{errors.service}</p>
                  )}
                </FormStep>

                {/* ── STEP 2: PACKAGE ── */}
                <FormStep
                  step={2}
                  label="Select a Package"
                  activeStep={activeStep}
                  onOpen={() => setActiveStep(2)}
                  isDone={!!pkg}
                  doneLabel={PACKAGES.find(p => p.value === pkg)?.label}
                >
                  <div className="space-y-2 pt-1">
                    {PACKAGES.map((p) => {
                      const isActive = pkg === p.value;
                      return (
                        <motion.button
                          key={p.value}
                          type="button"
                          onClick={() => setPkg(p.value)}
                          whileTap={{ scale: 0.99 }}
                          style={{
                            width:      "100%",
                            display:    "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding:    "14px 18px",
                            background: isActive ? "#0E0E0E" : "#FFFFFF",
                            border:     isActive ? "1px solid #0E0E0E" : "1px solid #E8E6E1",
                            cursor:     "pointer",
                            transition: "all 0.2s ease",
                            textAlign:  "left",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                              width: 6, height: 6,
                              background: isActive ? "#C8A96E" : "#DEDBD5",
                              borderRadius: "50%",
                              transition: "background 0.2s",
                              flexShrink: 0,
                            }} />
                            <div>
                              <span style={{
                                fontSize:      "0.8rem",
                                fontWeight:    600,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color:         isActive ? "#C8A96E" : "#0E0E0E",
                              }}>
                                {p.label}
                              </span>
                              <span style={{
                                fontSize:      "0.6rem",
                                marginLeft:    8,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color:         isActive ? "rgba(255,255,255,0.25)" : "#AEAEAD",
                              }}>
                                {p.sub}
                              </span>
                            </div>
                          </div>
                          <span style={{
                            fontSize:  "0.7rem",
                            color:     isActive ? "rgba(255,255,255,0.4)" : "#9CA3AF",
                            fontWeight: 300,
                          }}>
                            {p.desc}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </FormStep>

                {/* ── STEP 3: DATE ── */}
                <FormStep
                  step={3}
                  label="Event Date"
                  activeStep={activeStep}
                  onOpen={() => setActiveStep(3)}
                  isDone={!!eventDate}
                  doneLabel={eventDate ? format(eventDate, "d MMM yyyy") : undefined}
                >
                  <div className="pt-1">
                    <DatePicker
                      value={eventDate}
                      onChange={setEventDate}
                      placeholder="Select your event date"
                    />
                    <p style={{ fontSize: "0.7rem", color: "#AEAEAD", marginTop: 8 }}>
                      Not sure yet? You can confirm later — just leave it blank.
                    </p>
                  </div>
                </FormStep>

                {/* ── STEP 4: DETAILS ── */}
                <FormStep
                  step={4}
                  label="Your Details"
                  activeStep={activeStep}
                  onOpen={() => setActiveStep(4)}
                  isDone={!!(form.name && form.email && form.phone)}
                  doneLabel={form.name || undefined}
                  isLast
                >
                  <div className="pt-1 space-y-0">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <FieldInput
                        label="Full Name" name="name" value={form.name}
                        onChange={handleChange} required placeholder="Your full name"
                        error={errors.name}
                      />
                      <FieldInput
                        label="Phone" name="phone" type="tel" value={form.phone}
                        onChange={handleChange} required placeholder="+91 **********"
                        error={errors.phone}
                      />
                    </div>

                    <FieldInput
                      label="Email Address" name="email" type="email" value={form.email}
                      onChange={handleChange} required placeholder="your@email.com"
                      error={errors.email}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                      <FieldInput
                        label="Venue / Location" name="venue" value={form.venue}
                        onChange={handleChange} placeholder="Hall, resort, temple..."
                      />
                      <FieldInput
                        label="Approx. Guest Count" name="guestCount" value={form.guestCount}
                        onChange={handleChange} placeholder="e.g. 200–300"
                      />
                    </div>

                    <div style={{ paddingTop: 24 }}>
                      <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#9CA3AF", marginBottom: 8 }}>
                        Additional Notes
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Special rituals, specific shots, your vision for the day..."
                        style={{
                          width:        "100%",
                          background:   "#FFFFFF",
                          border:       "1px solid #E8E6E1",
                          padding:      "12px 16px",
                          fontSize:     "0.875rem",
                          fontFamily:   "'Inter',sans-serif",
                          fontWeight:   300,
                          color:        "#0E0E0E",
                          resize:       "none",
                          outline:      "none",
                          lineHeight:   1.7,
                          transition:   "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                        onBlur={(e)  => (e.currentTarget.style.borderColor = "#E8E6E1")}
                      />
                    </div>
                  </div>
                </FormStep>

                {/* ── AVAILABILITY NOTICE ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display:     "flex",
                    alignItems:  "flex-start",
                    gap:         12,
                    padding:     "14px 16px",
                    background:  "#FFFFFF",
                    border:      "1px solid #E8E6E1",
                    marginBottom: 24,
                  }}
                >
                  <Sparkles style={{ width: 14, height: 14, color: "#C8A96E", marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: "0.75rem", color: "#6B6B6B", fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
                    Booking slots for{" "}
                    <strong style={{ fontWeight: 600, color: "#0E0E0E" }}>2025 &amp; 2026</strong>{" "}
                    are limited. We cover{" "}
                    <strong style={{ fontWeight: 600, color: "#0E0E0E" }}>Chennai · Coimbatore · Bangalore · Hyderabad</strong>.
                  </p>
                </motion.div>

                {/* ── SUBMIT ── */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ opacity: 0.88 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    width:          "100%",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            10,
                    padding:        "17px 24px",
                    background:     loading ? "#4B4B4B" : "#0E0E0E",
                    color:          "#FFFFFF",
                    fontSize:       "0.75rem",
                    fontWeight:     700,
                    letterSpacing:  "0.14em",
                    textTransform:  "uppercase",
                    border:         "none",
                    cursor:         loading ? "not-allowed" : "pointer",
                    transition:     "background 0.2s",
                    marginBottom:   12,
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: 14, height: 14, border: "1.5px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff", borderRadius: "50%",
                        animation: "spin 0.7s linear infinite", display: "inline-block",
                      }} />
                      Preparing your enquiry...
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon />
                      Send Enquiry via WhatsApp
                    </>
                  )}
                </motion.button>

                <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#AEAEAD", lineHeight: 1.6 }}>
                  Opens WhatsApp with all details pre-filled.{" "}
                  <span style={{ color: "#0E0E0E" }}>Aslam replies within a few hours.</span>
                </p>

              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────────────────────────────────────

function LeftPanel({
  tIndex,
  setTIndex,
}: {
  tIndex: number;
  setTIndex: (i: number) => void;
}) {
  return (
    <div className="relative hidden lg:flex flex-col bg-[#0C0C0C] overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=90"
          alt="Shiyarah Weddings — Chennai"
          fill
          sizes="44vw"
          className="object-cover"
          style={{ opacity: 0.28, transform: "scale(1.04)" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.2) 40%, rgba(12,12,12,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(12,12,12,0.3) 0%, transparent 100%)" }} />
      </div>

      {/* Thin accent line left edge */}
      <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 1, background: "linear-gradient(180deg, transparent, rgba(200,169,110,0.4), transparent)" }} />

      <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-14">

        {/* TOP: Brand + Headline */}
        <div>
          <Link href="/" className="inline-flex flex-col leading-none mb-14">
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 400, letterSpacing: "0.22em", color: "#FFFFFF" }}>
              SHIYARAH
            </span>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)", marginTop: 3 }}>
              WEDDINGS · CHENNAI
            </span>
          </Link>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 18 }}>
            Book a Session
          </p>

          <h1 style={{
            fontFamily:    "'Playfair Display',Georgia,serif",
            fontSize:      "clamp(2.2rem,3.8vw,3.6rem)",
            fontWeight:    400,
            letterSpacing: "-0.04em",
            lineHeight:    0.9,
            color:         "#FFFFFF",
            marginBottom:  20,
          }}>
            Let&apos;s Craft
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>Your Story.</em>
          </h1>

          <p style={{ fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 280, marginBottom: 40 }}>
            Fill in the form and your enquiry goes straight to Aslam on WhatsApp — fully pre-filled, one tap away.
          </p>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 40 }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background:  "rgba(255,255,255,0.04)",
                  border:      "1px solid rgba(255,255,255,0.07)",
                  padding:     "16px 18px",
                }}
              >
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 400, color: "#FFFFFF", lineHeight: 1, marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Testimonial */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 32 }}>

          {/* Stars */}
          <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} style={{ width: 12, height: 12, fill: "#C8A96E", color: "#C8A96E" }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16 }}>
                &ldquo;{TESTIMONIALS[tIndex].text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 28, height: 28,
                    background: "rgba(200,169,110,0.15)",
                    border: "1px solid rgba(200,169,110,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.55rem", fontWeight: 700, color: "#C8A96E", letterSpacing: "0.05em",
                  }}>
                    {TESTIMONIALS[tIndex].avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
                      {TESTIMONIALS[tIndex].name}
                    </div>
                    <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                      {TESTIMONIALS[tIndex].role}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <button
                    onClick={() => setTIndex((tIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft style={{ width: 12, height: 12, color: "rgba(255,255,255,0.4)" }} />
                  </button>
                  <button
                    onClick={() => setTIndex((tIndex + 1) % TESTIMONIALS.length)}
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight style={{ width: 12, height: 12, color: "rgba(255,255,255,0.4)" }} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIndex(i)}
                style={{
                  height:     3,
                  width:      i === tIndex ? 20 : 6,
                  background: i === tIndex ? "#C8A96E" : "rgba(255,255,255,0.15)",
                  border:     "none",
                  cursor:     "pointer",
                  padding:    0,
                  transition: "all 0.3s ease",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM: Contact */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: Phone, href: `tel:${studioInfo.phoneRaw}`, text: studioInfo.phone },
            { icon: Mail,  href: `mailto:${studioInfo.email}`, text: studioInfo.email },
            { icon: MapPin, href: studioInfo.mapsUrl,          text: studioInfo.city, external: true },
          ].map(({ icon: Icon, href, text, external }) => (
            <a
              key={text}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s", fontSize: "0.75rem", fontWeight: 300 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              <div style={{
                width: 28, height: 28,
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon style={{ width: 12, height: 12, color: "#C8A96E" }} />
              </div>
              {text}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM STEP ACCORDION
// ─────────────────────────────────────────────────────────────────────────────

function FormStep({
  step, label, activeStep, onOpen, isDone, doneLabel, isLast, children,
}: {
  step: number;
  label: string;
  activeStep: number;
  onOpen: () => void;
  isDone: boolean;
  doneLabel?: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  const isOpen = activeStep === step;
  const isPast = step < activeStep;

  return (
    <div style={{ marginBottom: isLast ? 20 : 0 }}>
      {/* Step header */}
      <button
        type="button"
        onClick={onOpen}
        style={{
          width:          "100%",
          display:        "flex",
          alignItems:     "center",
          gap:            16,
          padding:        "18px 0",
          background:     "transparent",
          border:         "none",
          borderTop:      "1px solid #EFEDE8",
          cursor:         "pointer",
          textAlign:      "left",
        }}
      >
        {/* Step number / checkmark */}
        <div style={{
          width:      28, height: 28, flexShrink: 0,
          border:     `1px solid ${isDone ? "#C8A96E" : isOpen ? "#0E0E0E" : "#DEDBD5"}`,
          background: isDone ? "#C8A96E" : isOpen ? "#0E0E0E" : "transparent",
          display:    "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          {isDone ? (
            <CheckCircle2 style={{ width: 13, height: 13, color: "#FFFFFF" }} />
          ) : (
            <span style={{
              fontSize:   "0.6rem",
              fontWeight: 700,
              color:      isOpen ? "#FFFFFF" : "#AEAEAD",
              letterSpacing: "0.04em",
            }}>
              {String(step).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Label */}
        <div style={{ flex: 1 }}>
          <span style={{
            fontSize:      "0.72rem",
            fontWeight:    600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         isOpen ? "#0E0E0E" : isDone ? "#0E0E0E" : "#AEAEAD",
            transition:    "color 0.2s",
          }}>
            {label}
          </span>
          {isDone && doneLabel && !isOpen && (
            <span style={{
              display:    "block",
              fontSize:   "0.75rem",
              color:      "#C8A96E",
              fontWeight: 400,
              marginTop:  2,
            }}>
              {doneLabel}
            </span>
          )}
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight style={{ width: 14, height: 14, color: isOpen ? "#0E0E0E" : "#DEDBD5" }} />
        </motion.div>
      </button>

      {/* Step content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 24 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELD INPUT
// ─────────────────────────────────────────────────────────────────────────────

function FieldInput({
  label, name, type = "text", value, onChange, required, placeholder, error,
}: {
  label: string; name: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; placeholder?: string; error?: string;
}) {
  return (
    <div style={{ paddingTop: 20 }}>
      <label
        htmlFor={name}
        style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#9CA3AF", marginBottom: 8 }}
      >
        {label}{required && <span style={{ color: "#C8A96E", marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width:       "100%",
          background:  "#FFFFFF",
          border:      error ? "1px solid #E24B4A" : "1px solid #E8E6E1",
          padding:     "12px 16px",
          fontSize:    "0.875rem",
          fontFamily:  "'Inter',sans-serif",
          fontWeight:  300,
          color:       "#0E0E0E",
          outline:     "none",
          transition:  "border-color 0.2s",
          boxSizing:   "border-box",
        }}
        onFocus={(e) => !error && (e.currentTarget.style.borderColor = "#C8A96E")}
        onBlur={(e)  => !error && (e.currentTarget.style.borderColor = "#E8E6E1")}
        aria-required={required}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} style={{ fontSize: "0.68rem", color: "#E24B4A", marginTop: 5 }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────────────────────────────────────

function SuccessState({
  eventDate,
  onReset,
  waUrl,
}: {
  eventDate: Date | undefined;
  onReset: () => void;
  waUrl: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ textAlign: "center", padding: "40px 0" }}>

      {/* Animated checkmark ring */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{
          width:          64, height: 64,
          background:     "rgba(200,169,110,0.08)",
          border:         "1px solid rgba(200,169,110,0.3)",
          display:        "flex", alignItems: "center", justifyContent: "center",
          margin:         "0 auto 24px",
        }}
      >
        <CheckCircle2 style={{ width: 28, height: 28, color: "#C8A96E" }} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.8rem", fontWeight: 400, color: "#0E0E0E", marginBottom: 10 }}>
          Enquiry Sent to Aslam!
        </h2>
        <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.7, maxWidth: 300, margin: "0 auto 10px" }}>
          WhatsApp has opened with your details pre-filled. Tap the button below if it didn&apos;t open automatically.
        </p>

        {eventDate && (
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 32 }}>
            {format(eventDate, "EEEE, d MMMM yyyy")}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 32 }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              padding:        "15px 32px",
              background:     "#0E0E0E",
              color:          "#FFFFFF",
              fontSize:       "0.72rem",
              fontWeight:     700,
              letterSpacing:  "0.13em",
              textTransform:  "uppercase",
              textDecoration: "none",
            }}
          >
            <WhatsAppIcon />
            Open WhatsApp
          </a>
          <button
            onClick={onReset}
            style={{
              padding:        "12px 28px",
              background:     "transparent",
              border:         "1px solid #EFEDE8",
              color:          "#6B6B6B",
              fontSize:       "0.72rem",
              fontWeight:     700,
              letterSpacing:  "0.13em",
              textTransform:  "uppercase",
              cursor:         "pointer",
              transition:     "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0E0E0E"; e.currentTarget.style.color = "#0E0E0E"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EFEDE8"; e.currentTarget.style.color = "#6B6B6B"; }}
          >
            New Enquiry
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP ICON
// ─────────────────────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.503A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818A9.82 9.82 0 016.993 20.453l-.359-.214-3.732.884.948-3.643-.235-.374A9.775 9.775 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z" />
    </svg>
  );
}