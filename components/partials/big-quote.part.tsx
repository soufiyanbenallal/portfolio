"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/shared/container.shared";
import { EASINGS } from "@/lib/motion.config";

export function BigQuotePart() {
  return (
    <section className="w-full bg-white border-t border-[#dedede]">
      <Container className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASINGS.standard }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Quote Text */}
          <blockquote
            className="font-medium tracking-[-0.02em] text-black max-w-[780px]"
            style={{ fontSize: "clamp(18px,2.2vw,28px)", lineHeight: "1.4" }}
          >
            <span className="text-[#b8b8b8]">&ldquo;</span>
            Working with Joseph felt like having a seasoned design partner who
            truly understood our vision for KYMA and brought it to life in ways
            we hadn&apos;t even imagined.
            <span className="text-[#b8b8b8]">&rdquo;</span>

          </blockquote>

          {/* Attribution */}
          <footer className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#dedede]">
              <Image
                src="https://framerusercontent.com/images/M8GPTQEgwDo7tuEUdEAzTRzQ5w.jpg"
                alt="Thomas Weber"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-black">Thomas Weber</span>
              <span className="text-xs text-[#828282]">Co-founder of KYMA</span>
            </div>
          </footer>
        </motion.div>
      </Container>
    </section>
  );
}
