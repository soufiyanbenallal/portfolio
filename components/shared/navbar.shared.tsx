"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { navLinksData } from "@/data/client-logos.data";
import { usePortfolioStore } from "@/lib/portfolio.store";

export function NavbarShared() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const openContact = usePortfolioStore((state) => state.openContact);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && isHomepage && href.startsWith("#")) {
      e.preventDefault();
      setIsMobileOpen(false);
      if (href === "#contact") {
        openContact();
        return;
      }
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[calc(100vw-32px)]">
      {/* Desktop & Tablet Floating Nav */}
      <motion.nav
        layout
        transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
        className={cn(
          "hidden md:flex items-center rounded-[32px] border border-gray-30 bg-white/70 backdrop-blur-md shadow-xs text-sm select-none transition-all duration-300",
          isScrolled ? "px-3.5 py-2 gap-6" : "px-4 py-2.5 gap-12 lg:gap-16"
        )}
      >
        {/* Left: Profile Photo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={(e) => handleLinkClick(e, "#hero", true)}
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-30 shrink-0">
            <Image
              src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64"
              alt="Joseph Alexander"
              fill
              sizes="28px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="font-medium text-black text-sm tracking-tight whitespace-nowrap">
            Joseph Alexander
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <div className={cn("flex items-center transition-all duration-300", isScrolled ? "gap-4" : "gap-6 lg:gap-8")}>
          {navLinksData.map((link) => (
            <Link
              key={link.label}
              href={isHomepage ? link.href : link.isAnchor ? `/${link.href}` : link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.isAnchor)}
              className="text-gray-60 hover:text-black font-medium transition-colors text-sm relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Floating Nav Pill */}
      <div className="md:hidden">
        <motion.div
          layout
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="flex flex-col rounded-[24px] border border-gray-30 bg-white/85 backdrop-blur-lg shadow-sm overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 gap-4 min-w-[280px]">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-30 shrink-0">
                <Image
                  src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64"
                  alt="Joseph Alexander"
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-black text-sm">Joseph Alexander</span>
            </Link>

            {/* Mobile dots menu toggle button */}
            <button
              type="button"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex items-center gap-1 p-1.5 rounded-full hover:bg-gray-20 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </button>
          </div>

          {/* Expanded Mobile Links Dropdown */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-gray-20"
              >
                {navLinksData.map((link) => (
                  <Link
                    key={link.label}
                    href={isHomepage ? link.href : link.isAnchor ? `/${link.href}` : link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.isAnchor)}
                    className="text-base font-medium text-black py-1 hover:text-gray-60 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
