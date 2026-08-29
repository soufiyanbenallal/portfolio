"use client";

import React from "react";
import {
  LayoutDashboard,
  FormInput,
  MousePointerClick,
  AlertCircle,
  Table,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { polarisCategoriesData } from "@/data/polaris-playground.data";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";
import type { PolarisCategoryIdType } from "@/types";

const categoryIconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  FormInput: <FormInput className="h-4 w-4" />,
  MousePointerClick: <MousePointerClick className="h-4 w-4" />,
  AlertCircle: <AlertCircle className="h-4 w-4" />,
  Table: <Table className="h-4 w-4" />,
  Grid: <Grid className="h-4 w-4" />,
};

export function PlaygroundNavTabsPart() {
  const activeCategory = usePolarisPlaygroundStore((state) => state.activeCategory);
  const setActiveCategory = usePolarisPlaygroundStore(
    (state) => state.setActiveCategory,
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {polarisCategoriesData.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id as PolarisCategoryIdType)}
            className={cn(
              "group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-black text-white shadow-sm"
                : "bg-white text-gray-70 border border-gray-30 hover:border-gray-40 hover:text-black",
            )}
          >
            <span
              className={cn(
                "transition-colors",
                isActive ? "text-white" : "text-gray-50 group-hover:text-black",
              )}
            >
              {categoryIconMap[category.iconName]}
            </span>
            <span>{category.label}</span>
            <span
              className={cn(
                "ml-1 rounded-full px-2 py-0.5 font-mono text-[10px]",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-10 text-gray-60 group-hover:bg-gray-20",
              )}
            >
              {category.badgeCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}
