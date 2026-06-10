"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/lib/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  package: z.string().min(1, "Please select a package"),
  date: z.string().min(1, "Please select a preferred date"),
  message: z.string().optional(),
});

const services = [
  "Wedding Photography",
  "Reception Photography",
  "Pre-Wedding Shoot",
  "Maternity Photography",
  "Baby Photography",
  "Events & Videography",
];

const packages = ["Silver", "Gold", "Platinum", "Royal"];

const steps = ["Service", "Package", "Date", "Details"];

export default function BookingForm({ preselectedPackage }: { preselectedPackage?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      package: preselectedPackage
        ? packages.find((p) => p.toLowerCase() === preselectedPackage.toLowerCase()) || ""
        : "",
    },
  });

  const selectedService = watch("service");
  const selectedPackage = watch("package");

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ["service"];
    if (currentStep === 1) fieldsToValidate = ["package"];
    if (currentStep === 2) fieldsToValidate = ["date"];
    if (currentStep === 3) fieldsToValidate = ["name", "email", "phone"];

    const valid = await trigger(fieldsToValidate);
    if (valid) setCurrentStep((s) => s + 1);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Booking submitted:", data);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-[#C8A96E]/10 border border-[#C8A96E]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#C8A96E]" />
        </div>
        <h3 className="text-[#0E0E0E] font-semibold text-xl mb-3">
          Booking Request Sent!
        </h3>
        <p className="text-[#6B6B6B] max-w-md mx-auto mb-8 leading-relaxed text-sm">
          Thank you for choosing Shiyarah Weddings. Aslam will reach out within 24 hours
          to confirm your session and discuss the details.
        </p>
        <a
          href="https://wa.me/917200735915?text=Hi%2C%20I%20just%20submitted%20a%20booking%20request"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors text-sm"
        >
          Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm font-semibold transition-all border",
                  index < currentStep
                    ? "bg-[#C8A96E] border-[#C8A96E] text-white"
                    : index === currentStep
                    ? "bg-white border-[#C8A96E] text-[#C8A96E]"
                    : "bg-white border-[#EFEDE8] text-[#9CA3AF]"
                )}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span className={cn(
                "text-[0.65rem] hidden sm:block tracking-widest uppercase",
                index === currentStep ? "text-[#C8A96E]" : "text-[#9CA3AF]"
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-px mx-2 transition-all",
                index < currentStep ? "bg-[#C8A96E]" : "bg-[#EFEDE8]"
              )} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 0: Service */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0E0E0E] font-semibold text-base mb-5">
                Select a Service
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    type="button"
                    key={service}
                    onClick={() => setValue("service", service)}
                    className={cn(
                      "p-4 border text-left transition-all text-sm font-medium",
                      selectedService === service
                        ? "border-[#C8A96E] bg-[#C8A96E]/5 text-[#0E0E0E]"
                        : "border-[#EFEDE8] text-[#6B6B6B] hover:border-[#0E0E0E] hover:text-[#0E0E0E]"
                    )}
                  >
                    {service}
                  </button>
                ))}
              </div>
              {errors.service && (
                <p className="text-red-500 text-xs mt-2">{errors.service.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 1: Package */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0E0E0E] font-semibold text-base mb-5">
                Choose a Package
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    type="button"
                    key={pkg}
                    onClick={() => setValue("package", pkg)}
                    className={cn(
                      "p-4 border text-center transition-all text-sm font-medium",
                      selectedPackage === pkg
                        ? "border-[#C8A96E] bg-[#C8A96E]/5 text-[#0E0E0E]"
                        : "border-[#EFEDE8] text-[#6B6B6B] hover:border-[#0E0E0E] hover:text-[#0E0E0E]"
                    )}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
              {errors.package && (
                <p className="text-red-500 text-xs mt-2">{errors.package.message}</p>
              )}
            </motion.div>
          )}

          {/* Step 2: Date */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0E0E0E] font-semibold text-base mb-5">
                Select Preferred Date
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-2 tracking-widest uppercase">Event Date</label>
                  <input
                    type="date"
                    {...register("date")}
                    min={new Date().toISOString().split("T")[0]}
                    className="input-clean"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[#0E0E0E] font-semibold text-base mb-5">
                Your Contact Details
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-1.5 tracking-widest uppercase">Full Name *</label>
                  <input {...register("name")} placeholder="Your full name" className="input-clean" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-1.5 tracking-widest uppercase">Email Address *</label>
                  <input type="email" {...register("email")} placeholder="your@email.com" className="input-clean" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-1.5 tracking-widest uppercase">Phone Number *</label>
                  <input type="tel" {...register("phone")} placeholder="+91 72007 35915" className="input-clean" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-1.5 tracking-widest uppercase">Additional Notes</label>
                  <textarea {...register("message")} rows={3} placeholder="Tell us about your vision..." className="input-clean resize-none" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EFEDE8]">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="flex items-center gap-2 px-5 py-2.5 text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#EFEDE8] hover:border-[#0E0E0E] transition-all text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0E0E0E] hover:bg-[#C8A96E] text-white font-semibold transition-all text-sm"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C8A96E] hover:opacity-85 text-white font-semibold transition-all text-sm disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Booking"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
