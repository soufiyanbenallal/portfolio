"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "@/components/ui/social-icons.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { usePortfolioStore } from "@/lib/portfolio.store";

type FormStateType = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

const initialFormState: FormStateType = {
  name: "",
  email: "",
  service: "Framer Development",
  budget: "$5,000 - $10,000",
  message: "",
};

export function ContactDialogPart() {
  const isOpen = usePortfolioStore((state) => state.isContactOpen);
  const closeContact = usePortfolioStore((state) => state.closeContact);

  const [formData, setFormData] = useState<FormStateType>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormStateType, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        closeContact();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeContact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormStateType]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormStateType, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please describe your project";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate async submission
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData(initialFormState);
        closeContact();
      }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeContact}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-[480px] bg-white rounded-[24px] border border-gray-30 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-black max-h-[90vh] overflow-y-auto"
          >
            {/* Header with Close button */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-1">
                  Start a project
                </span>
                <h2 id="contact-title" className="text-2xl sm:text-3xl font-medium tracking-tight text-black">
                  Let&apos;s build something great.
                </h2>
              </div>
              <button
                type="button"
                onClick={closeContact}
                aria-label="Close dialog"
                className="p-2 rounded-full hover:bg-gray-20 text-gray-50 hover:text-black transition-colors cursor-pointer"
              >
                <Icons.Close className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-semibold text-black">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black placeholder:text-gray-40 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-semibold text-black">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black placeholder:text-gray-40 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>

              {/* Service selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-service" className="text-xs font-semibold text-black">
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all cursor-pointer"
                  >
                    <option value="Framer Development">Framer Development</option>
                    <option value="Brand Design">Brand Design</option>
                    <option value="Web Apps">Web Apps / React</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="Monthly Retainer">Monthly Unlimited ($8k/mo)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-budget" className="text-xs font-semibold text-black">
                    Estimated Budget
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all cursor-pointer"
                  >
                    <option value="< $5,000">&lt; $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-semibold text-black">
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell me about what you're building, target timeline, and goals..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black placeholder:text-gray-40 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all resize-none"
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
              </div>

              {/* Submit button */}
              <div className="mt-2">
                <ButtonUi
                  type="submit"
                  size="md"
                  className="w-full h-11"
                  isLoading={status === "loading"}
                  isSuccess={status === "success"}
                  isError={status === "error"}
                >
                  Send Inquiry
                </ButtonUi>
              </div>

              <div className="text-center mt-1">
                <span className="text-[11px] text-gray-50">
                  Avg response time: within 24 hours · No spam guaranteed
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
