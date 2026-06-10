"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, Send } from "lucide-react";
import type { ContactFormData } from "@/lib/types";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Enter a valid email"),
  phone:   z.string().min(10, "Enter a valid phone number"),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(20, "Please write at least 20 characters"),
});

export default function ContactForm() {
  const [done,    setDone]    = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Contact:", data);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="py-16 text-center">
        <CheckCircle className="w-10 h-10 text-[#1A73E8] mx-auto mb-4" />
        <h3 className="text-[#111] font-semibold text-lg mb-2">Message Sent!</h3>
        <p className="text-[#6B7280] text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="block text-xs text-[#6B7280] mb-1.5 tracking-wide uppercase">Full Name *</label>
          <input {...register("name")} placeholder="Your name" className="input-clean" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1.5 tracking-wide uppercase">Email *</label>
          <input type="email" {...register("email")} placeholder="your@email.com" className="input-clean" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="block text-xs text-[#6B7280] mb-1.5 tracking-wide uppercase">Phone *</label>
          <input type="tel" {...register("phone")} placeholder="+91 72007 35915" className="input-clean" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1.5 tracking-wide uppercase">Subject *</label>
          <input {...register("subject")} placeholder="Wedding Photography" className="input-clean" />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#6B7280] mb-1.5 tracking-wide uppercase">Message *</label>
        <textarea {...register("message")} rows={5} placeholder="Tell us about your vision..." className="input-clean resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </button>
    </form>
  );
}
