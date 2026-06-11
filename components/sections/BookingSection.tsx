"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";
import { MapPin, Phone, Mail } from "lucide-react";
import { studioInfo } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
}

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-label text-[#6B6B6B] mb-2"
        style={{ letterSpacing: "0.1em" }}
      >
        {label}{required && " *"}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="input-lumina"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-red-500 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BookingSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.service) newErrors.service = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      className="bg-[#F8F7F4] overflow-hidden"
      aria-label="Book a session with Shiyarah Weddings"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "100vh" }}>

        {/* ── Left: image panel ── */}
        <div className="relative hidden lg:block" style={{ minHeight: "100%" }}>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80"
            alt="Book a session with Shiyarah Weddings, Chennai"
            speed={0.15}
            className="w-full h-full"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-[#0E0E0E]/25" />

          {/* Studio name watermark */}
          <div className="absolute top-10 left-10">
            <span
              className="text-white/30 tracking-[0.25em] uppercase"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.7rem", fontWeight:400 }}
            >
              {studioInfo.name}
            </span>
          </div>

          {/* Quote overlay */}
          <div className="absolute bottom-16 left-12 right-12">
            <p
              className="text-white/90 font-display italic"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,2vw,26px)", fontWeight:400, lineHeight:1.45 }}
            >
              &ldquo;The best time to book was yesterday. The second best time is now.&rdquo;
            </p>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-3">
              — {studioInfo.name}, {studioInfo.city}
            </p>
          </div>
        </div>

        {/* ── Right: form panel ── */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(2rem,5vw,6rem) clamp(1.25rem,5vw,5rem)" }}
        >
          {/* Eyebrow */}
          <div className="text-label text-[#C8A96E] mb-6">
            LET&apos;S CREATE TOGETHER
          </div>

          {/* Headline */}
          <TextReveal
            as="h2"
            delay={0.1}
            className="font-display text-[#0E0E0E] mb-5"
            style={{
              fontFamily:"'Playfair Display',Georgia,serif",
              fontSize:"clamp(28px,3.5vw,50px)",
              fontWeight:400,
              lineHeight:1.1,
              letterSpacing:"-0.025em",
            } as React.CSSProperties}
          >
            Every great story begins with a conversation.
          </TextReveal>

          <p className="text-[#6B6B6B] mb-5" style={{ fontSize:15, fontWeight:300, lineHeight:1.7, maxWidth:400 }}>
            We take on a limited number of sessions each year so every client gets our full creative attention. Reach out early to secure your date.
          </p>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 mb-10">
            <span className="text-[#C8A96E]">✦</span>
            <span className="text-[0.8rem] text-[#6B6B6B] font-medium tracking-wide">
              Accepting bookings for 2026 &amp; 2027
            </span>
          </div>

          {/* ── Form / Success ── */}
          {submitted ? (
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              className="py-14 text-center"
            >
              <div className="text-[#C8A96E] text-4xl mb-4">✦</div>
              <h3
                className="font-display text-[#0E0E0E] mb-3"
                style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:400, fontStyle:"italic" }}
              >
                We received your message.
              </h3>
              <p className="text-[#6B6B6B]" style={{ fontSize:15, fontWeight:300, lineHeight:1.7 }}>
                Aslam will be in touch within 24 hours to begin crafting your story.
              </p>
              <a
                href={studioInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-green-600 text-white text-xs font-semibold tracking-widest uppercase hover:bg-green-500 transition-colors"
              >
                Continue on WhatsApp
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Send enquiry to Shiyarah Weddings">
              <div className="space-y-7">
                <InputField
                  label="NAME"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  error={errors.name}
                />
                <InputField
                  label="EMAIL"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  error={errors.email}
                />
                <InputField
                  label="PHONE"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 "
                  error={errors.phone}
                />

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-label text-[#6B6B6B] mb-2" style={{ letterSpacing:"0.1em" }}>
                    SERVICE *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="input-lumina cursor-pointer appearance-none"
                    aria-required
                    aria-invalid={!!errors.service}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="reception">Reception Photography</option>
                    <option value="pre-wedding">Pre-Wedding Shoot</option>
                    <option value="maternity">Maternity Photography</option>
                    <option value="newborn">Newborn / Baby Photography</option>
                    <option value="engagement">Engagement Photography</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="birthday">Birthday Celebration</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-red-500 text-xs" role="alert">{errors.service}</p>
                  )}
                </div>

                <InputField
                  label="EVENT DATE"
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  placeholder="dd/mm/yyyy"
                />

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-label text-[#6B6B6B] mb-2" style={{ letterSpacing:"0.1em" }}>
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your vision, venue, and guest count..."
                    className="input-lumina resize-none"
                    style={{ paddingTop:"0.75rem" }}
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full py-4 bg-[#0E0E0E] text-[#F8F7F4] text-[0.8125rem] font-medium tracking-[0.08em] uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
                  aria-label="Send enquiry to Shiyarah Weddings"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry →"}
                </MagneticButton>
              </div>
            </form>
          )}

          {/* ── Contact details ── */}
          <div className="mt-12 pt-10 border-t border-[#EFEDE8] space-y-4">
            <a
              href={studioInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#C8A96E]" aria-hidden />
              <span style={{ fontSize:14, fontWeight:300, lineHeight:1.6 }}>{studioInfo.address}</span>
            </a>
            <a
              href={`tel:${studioInfo.phoneRaw}`}
              className="flex items-center gap-3 text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-[#C8A96E]" aria-hidden />
              <span style={{ fontSize:14, fontWeight:300 }}>{studioInfo.phone}</span>
            </a>
            <a
              href={`mailto:${studioInfo.email}`}
              className="flex items-center gap-3 text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-[#C8A96E]" aria-hidden />
              <span style={{ fontSize:14, fontWeight:300 }}>{studioInfo.email}</span>
            </a>

            <div className="flex items-center gap-6 pt-2">
              {[
                { label:"Instagram", href:studioInfo.instagram },
                { label:"Facebook",  href:studioInfo.facebook  },
                { label:"YouTube",   href:studioInfo.youtube   },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
