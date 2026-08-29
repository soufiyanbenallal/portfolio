"use client";

import React from "react";
import Link from "next/link";
import { MousePointer } from "lucide-react";
import type { PolarisDocComponentType } from "../data/polaris-docs.data";

export type PolarisOverviewCardPropsType = {
  component: PolarisDocComponentType;
};

export function PolarisOverviewCardPart({
  component,
}: PolarisOverviewCardPropsType) {
  return (
    <Link
      href={`/polaris-playground/${component.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition-all duration-200 hover:border-gray-300 hover:shadow-md"
    >
      {/* ── Top Dotted Canvas Preview ── */}
      <div className="relative flex h-36 w-full items-center justify-center overflow-hidden bg-[#FAFAFA] p-4 border-b border-gray-100 [background-image:radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:12px_12px]">
        {renderCardPreview(component.slug)}
      </div>

      {/* ── Bottom Light Meta Box ── */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-white">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {component.name}
          </h4>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
            {component.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function renderCardPreview(slug: string) {
  switch (slug) {
    case "button":
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-xs">
              Cancel
            </span>
            <span className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
              Delete
            </span>
          </div>
          <span className="rounded-md bg-gray-900 px-3 py-1 text-[11px] font-medium text-white shadow-xs">
            Add product
          </span>
        </div>
      );

    case "clickable":
      return (
        <div className="relative">
          <div className="h-14 w-32 rounded-lg bg-gray-100 border border-gray-200 shadow-xs flex items-center justify-center text-xs font-medium text-gray-700">
            Clickable
          </div>
          <MousePointer className="absolute -bottom-1 -right-1 h-4 w-4 text-black fill-white drop-shadow-md" />
        </div>
      );

    case "link":
      return (
        <div className="relative flex items-center gap-1">
          <span className="font-mono text-xs text-blue-600 underline font-medium">
            snowdevil.myshopify.com
          </span>
          <MousePointer className="h-3.5 w-3.5 text-black fill-white drop-shadow-md" />
        </div>
      );

    case "menu":
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-xs">
            More actions ▾
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-1 text-[10px] shadow-sm text-gray-700">
            <div>Import list</div>
            <div>Export list</div>
          </div>
        </div>
      );

    case "button-group":
      return (
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-xs">
            Cancel
          </span>
          <span className="rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
            Save
          </span>
        </div>
      );

    case "clickable-chip":
      return (
        <div className="relative flex items-center">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-800 border border-gray-300 flex items-center gap-1">
            Out of stock ×
          </span>
          <MousePointer className="h-3.5 w-3.5 text-black fill-white drop-shadow-md -ml-1 mt-3" />
        </div>
      );

    case "badge":
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[200px]">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 border border-emerald-200">
            Fulfilled
          </span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-800 border border-blue-200">
            Draft
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 border border-emerald-200">
            Active
          </span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800 border border-amber-200">
            Open
          </span>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-800 border border-red-200">
            Action required
          </span>
        </div>
      );

    case "banner":
      return (
        <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
          <div className="rounded-md bg-sky-50 border border-sky-200 p-1.5 text-[10px] text-sky-800 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
            3 of 5 variants created.
          </div>
          <div className="rounded-md bg-emerald-50 border border-emerald-200 p-1.5 text-[10px] text-emerald-800 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Update successful.
          </div>
        </div>
      );

    case "spinner":
      return (
        <div className="h-7 w-7 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin" />
      );

    case "chip":
      return (
        <span className="rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
          Footwear
        </span>
      );

    case "text-field":
      return (
        <div className="w-full max-w-[180px] rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-400">
          Product title...
        </div>
      );

    case "select":
      return (
        <div className="w-full max-w-[180px] rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-800 flex justify-between items-center">
          <span>Collection</span>
          <span className="text-gray-400 text-[10px]">▼</span>
        </div>
      );

    case "switch":
      return (
        <div className="h-5 w-9 rounded-full bg-gray-900 p-0.5 flex items-center justify-end">
          <div className="h-4 w-4 rounded-full bg-white shadow-xs"></div>
        </div>
      );

    case "color-field":
      return (
        <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white p-1.5">
          <div className="h-4 w-4 rounded bg-blue-600"></div>
          <span className="font-mono text-[11px] text-gray-700">#2563EB</span>
        </div>
      );

    case "drop-zone":
      return (
        <div className="w-full max-w-[180px] rounded-lg border border-dashed border-gray-300 bg-gray-50 p-2 text-center text-[10px] text-gray-500">
          Upload media
        </div>
      );

    case "page":
    case "section":
      return (
        <div className="w-full max-w-[180px] rounded-md border border-gray-200 bg-white p-2 text-[10px] shadow-xs">
          <div className="font-semibold text-gray-800">Section heading</div>
          <div className="text-gray-500">Card content...</div>
        </div>
      );

    case "grid":
      return (
        <div className="grid grid-cols-3 gap-1 w-full max-w-[180px]">
          <div className="h-10 rounded bg-gray-100 border border-gray-200"></div>
          <div className="h-10 rounded bg-gray-100 border border-gray-200"></div>
          <div className="h-10 rounded bg-gray-100 border border-gray-200"></div>
        </div>
      );

    case "table":
      return (
        <div className="w-full max-w-[180px] rounded border border-gray-200 bg-white p-1 text-[9px] text-gray-600">
          <div className="flex justify-between border-b border-gray-200 pb-0.5 font-semibold text-gray-800">
            <span>Product</span>
            <span>Price</span>
          </div>
          <div className="flex justify-between pt-0.5">
            <span>Headphones</span>
            <span>$249</span>
          </div>
        </div>
      );

    default:
      return <div className="text-xs text-gray-500 font-mono">&lt;s-{slug}&gt;</div>;
  }
}
