"use client";

import React, { useState } from "react";
import {
  ResourceFilterToolbar,
  type ActiveFilterItemType,
  type FilterCategoryItemType,
} from "@/app/kits/polaris/blocks/actions/ResourceFilterToolbar/ResourceFilterToolbar";

export function ResourceFilterToolbarExample() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilterItemType[]>([
    {
      categoryId: "status",
      categoryLabel: "Status",
      value: "active",
      label: "Active",
    },
  ]);

  const filterCategories: FilterCategoryItemType[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" },
        { value: "archived", label: "Archived" },
      ],
    },
    {
      id: "type",
      label: "Banner Type",
      options: [
        { value: "announcement", label: "Announcement Bar" },
        { value: "countdown", label: "Countdown Timer" },
        { value: "free_shipping", label: "Free Shipping Goal" },
      ],
    },
  ];

  const handleAddFilter = (filter: ActiveFilterItemType) => {
    setActiveFilters((prev) => [...prev, filter]);
  };

  const handleRemoveFilter = (filter: ActiveFilterItemType) => {
    setActiveFilters((prev) =>
      prev.filter(
        (f) => !(f.categoryId === filter.categoryId && f.value === filter.value)
      )
    );
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setSearch("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <ResourceFilterToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search banners by name, product, or country..."
        filterCategories={filterCategories}
        activeFilters={activeFilters}
        onAddFilter={handleAddFilter}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAll}
        totalCount={24}
        primaryAction={{
          label: "Create Banner",
          onClick: () => alert("Navigating to create banner form..."),
        }}
      />

      {/* Simulated Table Area */}
      <div className="rounded-xl border border-border bg-card/60 p-6 text-center text-xs text-muted-foreground">
        Showing filtered results for search query:{" "}
        <strong className="text-foreground">{search || '""'}</strong> with{" "}
        <strong className="text-foreground">{activeFilters.length}</strong> active filter(s).
      </div>
    </div>
  );
}
