"use client";

import React from "react";
import {
  BarChart3,
  Boxes,
  CreditCard,
  Globe,
  LayoutTemplate,
  Mail,
  Package,
  Receipt,
  Search,
  ShoppingBag,
  Star,
  Store,
  Tag,
  Truck,
  Users,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { DarkServicePoster, KitDefs, Tile, useSvgId, type PosterChapterType } from "./service-kit.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * SHOPIFY — panel
 * --------------------------------------------------------------------
 * Motif: the integration wall. A staggered field of glossy tiles — the
 * surfaces a store touches (checkout, shipping, reviews, email, reports…)
 * — with the storefront lit at the centre and its neighbours' edges
 * catching its light. Fades out radially, so it reads as a glimpse of a
 * bigger system rather than a grid with edges.
 * ==================================================================== */

const WALL_ICONS: LucideIcon[] = [
  Tag,
  CreditCard,
  Truck,
  Star,
  Mail,
  Receipt,
  Package,
  Webhook,
  BarChart3,
  Users,
  Search,
  Globe,
  Boxes,
  LayoutTemplate,
  Store,
];

const CENTER = 320;
const PITCH = 128;
const SIZE = 104;

type WallTileType = { key: string; x: number; y: number; icon: LucideIcon; accent: boolean; lit: boolean };

const WALL: WallTileType[] = (() => {
  const tiles: WallTileType[] = [];
  let iconIndex = 0;
  for (let row = -2; row <= 2; row++) {
    // Odd rows shift half a pitch — the brick stagger of the reference.
    const offset = Math.abs(row) % 2 === 1 ? PITCH / 2 : 0;
    for (let col = -3; col <= 2; col++) {
      const x = CENTER + col * PITCH + offset - SIZE / 2;
      const y = CENTER + row * PITCH - SIZE / 2;
      const isCenter = row === 0 && col === 0;
      const isNeighbour =
        (row === 0 && Math.abs(col) === 1) || (Math.abs(row) === 1 && (col === 0 || col === -1));
      tiles.push({
        key: `${row}:${col}`,
        x,
        y,
        icon: isCenter ? ShoppingBag : WALL_ICONS[iconIndex++ % WALL_ICONS.length],
        accent: isCenter,
        lit: isNeighbour,
      });
    }
  }
  return tiles;
})();

function TileWallMotif({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      style={{
        maskImage: "radial-gradient(circle at 50% 50%, #000 22%, transparent 62%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 22%, transparent 62%)",
      }}
    >
      <KitDefs id={id} />
      <circle cx={CENTER} cy={CENTER} r={190} fill={`url(#${id}-glow)`} />
      {WALL.map((tile) => (
        <Tile
          key={tile.key}
          id={id}
          x={tile.x}
          y={tile.y}
          size={SIZE}
          icon={tile.icon}
          accent={tile.accent}
          lit={tile.lit}
        />
      ))}
    </svg>
  );
}

/**
 * Shopify's poster: the integration wall on a dark ground — square, so it
 * takes a panel's full height when wide and its full width when docked.
 */
export function ShopifyServicePoster({
  service,
  index,
  total,
  chapters,
}: {
  service: ServiceItemType;
  index: number;
  total: number;
  chapters?: readonly PosterChapterType[];
}) {
  return (
    <DarkServicePoster
      service={service}
      index={index}
      total={total}
      chapters={chapters}
      meta="Shopify API · Liquid · Polaris · Node.js"
      motif={<TileWallMotif className="h-full w-full" />}
      motifAspect={1}
      motifWidth="min(100cqh, 96cqw)"
    />
  );
}
