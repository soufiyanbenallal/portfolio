"use client";

import React from "react";
import type { ActiveFilterItemType } from "../ResourceFilterToolbar";

export type FilterChipPropsType = {
  filter: ActiveFilterItemType;
  onRemove: () => void;
};

export function FilterChip({ filter, onRemove }: FilterChipPropsType) {
  return (
    <s-chip onRemove={onRemove}>
      {filter.categoryLabel}: {filter.label}
    </s-chip>
  );
}
