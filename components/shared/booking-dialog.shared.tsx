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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
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
            className="relative w-full max-w-[540px] bg-white rounded-[24px] border border-gray-30 shadow-2xl p-6 sm:p-8 z-10 text-black max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-30 shrink-0">
                  <Image
                    src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                    alt="Joseph Alexander"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg leading-tight text-black">
                    Discovery Call with Joseph
                  </h3>
                  <span className="text-xs text-gray-50 flex items-center gap-1.5 mt-0.5">
                    <Icons.Calendar className="w-3.5 h-3.5" /> 30 min · Google Meet
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close scheduler"
                className="p-1.5 rounded-full hover:bg-gray-20 text-gray-50 hover:text-black transition-colors cursor-pointer"
              >
                <Icons.Close className="w-5 h-5" />
              </button>
            </div>

            {status === "confirmed" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-availability-green/20 text-availability-green flex items-center justify-center">
                  <Icons.Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-medium text-black">Discovery Call Confirmed!</h4>
                <p className="text-sm text-gray-50 max-w-xs">
                  We&apos;ve sent the Google Meet calendar invite to <strong>{email}</strong> for {availableDays[selectedDay].date} at {selectedSlot}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="flex flex-col gap-5">
                {/* Day selector */}
                <div>
                  <span className="text-xs font-semibold text-gray-50 uppercase tracking-wider block mb-2">
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
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDay === i
                            ? "border-black bg-black text-white"
                            : "border-gray-30 bg-gray-5 hover:bg-gray-20 text-black"
                        }`}
                      >
                        <span className="text-xs opacity-75 block">{d.day}</span>
                        <span className="text-sm font-semibold block">{d.date.split(" ")[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slot selector */}
                <div>
                  <span className="text-xs font-semibold text-gray-50 uppercase tracking-wider block mb-2">
                    Select Time (GMT)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDays[selectedDay].slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
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
                <div className="flex flex-col gap-3 pt-2 border-t border-gray-20">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black placeholder:text-gray-40 text-sm focus:outline-none focus:border-black"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-30 bg-gray-5 text-black placeholder:text-gray-40 text-sm focus:outline-none focus:border-black"
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
