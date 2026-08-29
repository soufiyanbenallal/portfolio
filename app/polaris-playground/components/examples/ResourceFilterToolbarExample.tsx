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
    <s-page>
      <s-stack direction="block" gap="base">
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
        <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
          <s-text tone="neutral">
            Showing filtered results for search query: "{search}" with {activeFilters.length} active filter(s).
          </s-text>
        </s-box>
      </s-stack>
    </s-page>
  );
}
