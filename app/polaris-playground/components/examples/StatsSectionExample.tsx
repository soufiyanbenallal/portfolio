"use client";

import React, { type ReactNode } from "react";
import { StatsSection } from "~/components/ui/stats/StatsSection";
import type { StatsCardPropsType } from "~/components/ui/stats/StatsCard";

const SAMPLE_STATS: StatsCardPropsType[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$128,450.00",
    description: "vs. previous 30 days",
    icon: "cart-sale",
    iconTone: "success",
    badge: { value: "+14.6%", tone: "success", dir: "up" },
    sparklineData: [45, 52, 58, 65, 60, 72, 85, 94, 90, 110, 128],
    sparklineStroke: "#10b981",
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1,429",
    description: "vs. previous 30 days",
    icon: "order",
    iconTone: "info",
    badge: { value: "+8.2%", tone: "success", dir: "up" },
    sparklineData: [20, 24, 28, 25, 32, 38, 42, 45, 48, 52, 55],
    sparklineStroke: "#3b82f6",
  },
  {
    id: "avg-order-value",
    title: "Average order value",
    value: "$89.88",
    description: "vs. previous 30 days",
    icon: "credit-card",
    iconTone: "warning",
    badge: { value: "-1.4%", tone: "warning", dir: "down" },
    sparklineData: [95, 92, 90, 94, 91, 88, 89, 90, 88, 89, 90],
    sparklineStroke: "#f59e0b",
  },
  {
    id: "conversion-rate",
    title: "Online store conversion",
    value: "3.42%",
    description: "vs. previous 30 days",
    icon: "chart-line",
    iconTone: "auto",
    badge: { value: "+0.6%", tone: "success", dir: "up" },
    sparklineData: [2.8, 2.9, 3.0, 3.1, 3.0, 3.2, 3.3, 3.4, 3.4, 3.5, 3.42],
    sparklineStroke: "#8b5cf6",
  },
];

export function StatsSectionExample(): ReactNode {
  return (
    <s-page>
      <StatsSection items={SAMPLE_STATS} columns={4} />
    </s-page>
  );
}

export default StatsSectionExample;
