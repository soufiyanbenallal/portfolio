"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "@/components/ui/social-icons.ui";
import { usePortfolioStore } from "@/lib/portfolio.store";

export function BottomContactNavShared() {
  const [isVisible, setIsVisible] = useState(false);
  const openContact = usePortfolioStore((state) => state.openContact);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal after user scrolls past hero threshold (~250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed bottom gradient blur as defined in GUIDE.MD */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-[25vh] pointer-events-none z-30 bg-gradient-to-t from-gray-5/90 via-gray-5/40 to-transparent backdrop-blur-[2px]"
      />

      {/* Fixed bottom contact pill floating 12px above bottom */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%" }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            className="fixed bottom-3 left-1/2 z-35 select-none"
          >
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium border border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#1a1a1a] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Icons.Mail className="w-4 h-4 text-white" />
              <span>Get in touch</span>
              <span className="w-2 h-2 rounded-full bg-availability-green animate-pulse ml-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
