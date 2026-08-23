"use client";

import React from "react";
import Image from "next/image";
import { clientLogosData } from "@/data/client-logos.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { Marquee } from "@/components/motion/marquee.motion";
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

/**
 * Client strip.
 *
 * The logo rail is scroll-reactive rather than a fixed-speed CSS loop: it
 * drifts at rest, accelerates with the page, and reverses when you scroll up.
 * That coupling is what makes the band feel attached to the document instead
 * of playing beside it. It pauses on hover and on keyboard focus.
 */
export function ClientTickerShared({
  withHappyClientsCluster = true,
  className,
}: ClientTickerSharedPropsType) {
  return (
    <div
      className={cn(
        "w-full select-none overflow-hidden border-y border-gray-30 bg-white",
        className,
      )}
    >
      <Container className="flex flex-col items-center gap-8 py-6 md:flex-row md:gap-12">
        {withHappyClientsCluster && (
          <div className="flex w-full shrink-0 items-center justify-center gap-3.5 border-b border-gray-30 pb-4 md:w-auto md:justify-start md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <div className="flex -space-x-2.5 overflow-hidden">
              {happyClientAvatars.map((src, i) => (
                <div
                  key={i}
                  className="relative inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-20 ring-2 ring-white"
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
                  <Icons.Star key={i} className="h-3 w-3 text-black" />
                ))}
              </div>
              <span className="mt-0.5 whitespace-nowrap text-xs font-semibold tracking-tight text-black">
                99+ Happy clients
              </span>
            </div>
          </div>
        )}

        <Marquee baseVelocity={2.4} skew={2.5}>
          {clientLogosData.map((logo) => (
            <span
              key={logo.id}
              className="flex shrink-0 cursor-default items-center gap-2.5 pr-12 opacity-60 transition-opacity duration-300 hover:opacity-100 sm:pr-16"
            >
              <span className="h-2.5 w-2.5 shrink-0 rotate-45 rounded-xs bg-black" />
              <span className="font-sans text-base font-bold tracking-tight text-black sm:text-lg">
                {logo.name}
              </span>
            </span>
          ))}
        </Marquee>
      </Container>
    </div>
  );
}
