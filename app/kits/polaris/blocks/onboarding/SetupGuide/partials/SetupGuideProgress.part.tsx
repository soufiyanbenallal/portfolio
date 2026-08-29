"use client";

import React from "react";

export type SetupGuideProgressPropsType = {
  completedCount: number;
  totalCount: number;
};

export function SetupGuideProgress({
  completedCount,
  totalCount,
}: SetupGuideProgressPropsType) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-foreground">
          {completedCount} of {totalCount} completed
        </span>
      </div>
      <div className="w-28 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{percentage}%</span>
    </div>
  );
}
