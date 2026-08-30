"use client";

import React from "react";

export type SetupGuideProgressPropsType = {
  completedCount: number;
  totalCount: number;
};

export function SetupGuideProgress({ completedCount, totalCount }: SetupGuideProgressPropsType) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <s-stack direction="inline" gap="small-200" alignItems="center">
      <s-text type="strong">
        {completedCount} of {totalCount} completed ({percentage}%)
      </s-text>
      <s-badge tone={percentage === 100 ? "success" : "info"}>
        {percentage === 100 ? "Complete" : "In Progress"}
      </s-badge>
    </s-stack>
  );
}
