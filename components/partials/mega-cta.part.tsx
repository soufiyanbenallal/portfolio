"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { TextCycleUi } from "@/components/ui/text-cycle.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { Icons } from "@/components/ui/social-icons.ui";
import { socialLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { EASINGS } from "@/lib/motion.config";

export function MegaCtaPart() {
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const openContact = usePortfolioStore((state) => state.openContact);
  const [copied, setCopied] = useState(false);

  const email = "joseph@launchnow.design";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full bg-white border-t border-gray-30 select-none">
      <Container className="py-12 md:py-24 lg:py-32">
        {/* Giant Black Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASINGS.standard }}
          className="rounded-[28px] bg-black text-white p-8 sm:p-12 md:p-16 flex flex-col justify-between gap-12 md:gap-16 shadow-2xl relative overflow-hidden"
        >
          {/* Top Label & Direct Contact Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-availability-green animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                Available for New Projects
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all cursor-pointer"
              >
                <Icons.Mail className="w-3.5 h-3.5" />
                <span>{copied ? "Copied to clipboard!" : email}</span>
              </button>

              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-gray-20 text-xs font-semibold transition-all cursor-pointer"
              >
                <Icons.Calendar className="w-3.5 h-3.5" />
                <span>Book a Call</span>
              </button>
            </div>
          </div>

          {/* Center Dynamic Word Rotator Headline */}
          <div className="flex flex-col gap-4 max-w-2xl py-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
              Let&apos;s <TextCycleUi words={["design", "build", "create", "scale"]} /> <br />
              incredible work together.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-lg mt-2 leading-relaxed">
              Have a product idea or need an experienced full-stack designer to lead your brand and engineering? Let&apos;s discuss how we can partner up.
            </p>
          </div>

          {/* Bottom Actions & Social Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <ButtonUi
              variant="secondary"
              size="lg"
              onClick={openContact}
              rightIcon={<Icons.ArrowUpRight className="w-4 h-4 text-black" />}
              className="h-13 px-8 text-base font-semibold bg-white text-black hover:bg-gray-10 shadow-lg"
            >
              Start a Conversation
            </ButtonUi>

            <div className="flex items-center gap-4 text-xs font-mono text-white/60">
              {socialLinksData.slice(0, 4).map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {s.platform.split(" ")[0]}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
