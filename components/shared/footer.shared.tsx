"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { socialLinksData, navLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { usePortfolioStore } from "@/lib/portfolio.store";

export function FooterShared() {
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const email = "joseph@launchnow.design";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
        }) + " GMT"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-black text-white relative z-10 pt-16 pb-[120px] md:pb-[180px] lg:pb-[211px] overflow-hidden">
      <Container className="flex flex-col gap-16 md:gap-24">
        {/* Top: 2-Column Info & Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          {/* Left Column: Direct Contact Action */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                Speak to me
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Email or book a call.
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-medium transition-colors text-white cursor-pointer"
              >
                <Icons.Mail className="w-4 h-4 text-white/70" />
                <span>{copied ? "Copied to clipboard!" : email}</span>
              </button>

              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black hover:bg-gray-20 text-sm font-medium transition-colors cursor-pointer"
              >
                <Icons.Calendar className="w-4 h-4 text-black" />
                <span>Book a call</span>
              </button>
            </div>
          </div>

          {/* Right Columns: Navigation, Socials, Legal */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Nav Menu */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-1">
                Menu
              </span>
              {navLinksData.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-1">
                Social
              </span>
              {socialLinksData.slice(0, 5).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>

            {/* Legal & Meta */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-1">
                Legal
              </span>
              <Link
                href="/terms"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Terms of service
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Privacy policy
              </Link>
              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="text-xs text-white/50 block">Based in London / Remote</span>
                <span className="text-xs font-mono text-white/70 block mt-0.5">
                  {currentTime || "12:00 GMT"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Graphic Typographic Name Moment */}
        <div className="w-full flex flex-col items-center select-none pt-4">
          <h1 className="text-[18vw] leading-[0.8] font-bold tracking-tighter text-white/90 text-center w-full uppercase">
            JOSEPH
          </h1>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-white/10 text-xs text-white/50 font-mono">
            <span>© {new Date().getFullYear()} Joseph Alexander. All rights reserved.</span>
            <span className="mt-2 sm:mt-0">Designed & engineered with craft.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
