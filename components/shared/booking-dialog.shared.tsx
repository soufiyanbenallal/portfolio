"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "@/components/ui/social-icons.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { usePortfolioStore } from "@/lib/portfolio.store";

const availableDays = [
  { day: "Thu", date: "Aug 21", slots: ["14:00", "15:30", "17:00"] },
  { day: "Fri", date: "Aug 22", slots: ["10:00", "11:30", "16:00"] },
  { day: "Mon", date: "Aug 25", slots: ["13:00", "14:30", "18:00"] },
  { day: "Tue", date: "Aug 26", slots: ["09:30", "11:00", "15:00"] },
];

export function BookingDialogShared() {
  const isOpen = usePortfolioStore((state) => state.isBookingOpen);
  const closeBooking = usePortfolioStore((state) => state.closeBooking);

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "booking" | "confirmed">("idle");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") closeBooking();
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
  }, [isOpen, closeBooking]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !name || !email) return;
    setStatus("booking");
    setTimeout(() => {
      setStatus("confirmed");
      setTimeout(() => {
        setStatus("idle");
        setSelectedSlot(null);
        setName("");
        setEmail("");
        closeBooking();
      }, 2500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="border-gray-30 relative z-10 max-h-[90vh] w-full max-w-[540px] overflow-y-auto rounded-[24px] border bg-white p-6 text-black shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="border-gray-30 relative h-11 w-11 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Soufiyan Benallal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg leading-tight font-medium text-black">
                    Discovery Call with Soufiyan
                  </h3>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-50">
                    <Icons.Calendar className="h-3.5 w-3.5" /> 30 min · Google Meet
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close scheduler"
                className="hover:bg-gray-20 cursor-pointer rounded-full p-1.5 text-gray-50 transition-colors hover:text-black"
              >
                <Icons.Close className="h-5 w-5" />
              </button>
            </div>

            {status === "confirmed" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="bg-availability-green/20 text-availability-green flex h-12 w-12 items-center justify-center rounded-full">
                  <Icons.Check className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-medium text-black">Discovery Call Confirmed!</h4>
                <p className="max-w-xs text-sm text-gray-50">
                  We&apos;ve sent the Google Meet calendar invite to <strong>{email}</strong> for{" "}
                  {availableDays[selectedDay].date} at {selectedSlot}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="flex flex-col gap-5">
                {/* Day selector */}
                <div>
                  <span className="mb-2 block text-xs font-semibold tracking-wider text-gray-50 uppercase">
                    Select a Date
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {availableDays.map((d, i) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setSelectedDay(i);
                          setSelectedSlot(null);
                        }}
                        className={`cursor-pointer rounded-xl border p-2.5 text-center transition-all ${
                          selectedDay === i
                            ? "border-black bg-black text-white"
                            : "border-gray-30 bg-gray-5 hover:bg-gray-20 text-black"
                        }`}
                      >
                        <span className="block text-xs opacity-75">{d.day}</span>
                        <span className="block text-sm font-semibold">{d.date.split(" ")[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slot selector */}
                <div>
                  <span className="mb-2 block text-xs font-semibold tracking-wider text-gray-50 uppercase">
                    Select Time (GMT)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDays[selectedDay].slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-black bg-black text-white"
                            : "border-gray-30 bg-gray-5 hover:bg-gray-20 text-black"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* User info */}
                <div className="border-gray-20 flex flex-col gap-3 border-t pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-30 bg-gray-5 placeholder:text-gray-40 w-full rounded-xl border px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-30 bg-gray-5 placeholder:text-gray-40 w-full rounded-xl border px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none"
                  />
                </div>

                {/* Confirm button */}
                <ButtonUi
                  type="submit"
                  size="md"
                  disabled={!selectedSlot || !name || !email}
                  isLoading={status === "booking"}
                  className="w-full"
                >
                  Schedule 30-Min Call
                </ButtonUi>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
