"use client";

import React from "react";
import Image from "next/image";
import { clientLogosData } from "@/data/client-logos.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { cn } from "@/lib/utils";

type ClientTickerSharedPropsType = {
  withHappyClientsCluster?: boolean;
  className?: string;
};

const happyClientAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
];

export function ClientTickerShared({
  withHappyClientsCluster = true,
  className,
}: ClientTickerSharedPropsType) {
  return (
    <div
      className={cn(
        "w-full border-y border-gray-30  bg-white overflow-hidden select-none",
        className
      )}
    >
      <Container className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-6">
        {/* Left: Happy Clients 5-Avatar Cluster */}
        {withHappyClientsCluster && (
          <div className="flex items-center gap-3.5 shrink-0 border-b md:border-b-0 md:border-r border-gray-30 pb-4 md:pb-0 md:pr-8 w-full md:w-auto justify-center md:justify-start">
            <div className="flex -space-x-2.5 overflow-hidden">
              {happyClientAvatars.map((src, i) => (
                <div
                  key={i}
                  className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-20"
                >
                  <Image
                    src={src}
                    alt={`Happy client ${i + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-black">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} className="w-3 h-3 text-black" />
                ))}
              </div>
              <span className="text-xs font-semibold tracking-tight text-black mt-0.5 whitespace-nowrap">
                99+ Happy clients
              </span>
            </div>
          </div>
        )}

        {/* Right: Continuous Logo Marquee */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_26s_linear_infinite] hover:[animation-play-state:paused] gap-12 sm:gap-16 items-center">
            {[...clientLogosData, ...clientLogosData, ...clientLogosData].map((logo, idx) => (
              <div
                key={`${logo.id}-${idx}`}
                className="flex items-center gap-2.5 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 shrink-0 cursor-default"
              >
                <span className="w-2.5 h-2.5 rounded-xs bg-black rotate-45 shrink-0" />
                <span className="text-base sm:text-lg font-bold tracking-tight text-black font-sans">
                  {logo.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-40 inline-block ml-4 sm:ml-6" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
