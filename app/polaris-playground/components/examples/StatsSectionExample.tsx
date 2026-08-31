"use client";

import { type ReactNode } from "react";
import { StatsSection } from "~/components/ui/stats/StatsSection";
import type { StatsCardPropsType } from "~/components/ui/stats/StatsCard";

const SAMPLE_STATS: StatsCardPropsType[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$128.30",
    description: "vs. previous 30 days",
    icon: "cart-sale",
    // iconTone: "success",
    badge: { value: "4.6%", tone: "success", dir: "up" },
    sparklineData: [0, 0, 58, 0, 0, 0, 0, 0, 85, 0, 0, 94, 30, 0, 0, 0, 110, 128],
    sparklineStroke: "#3b82f6",
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1,429",
    description: "vs. previous 30 days",
    icon: "order",
    // iconTone: "info",
    badge: { value: "8.2%", tone: "success", dir: "up" },
    sparklineData: [0, 24, 0, 0, 0, 0, 42, 0, 0, 0, 100, 0, 48, 0, 0, 0, 52, 55],
    sparklineStroke: "#3b82f6",
  },
  {
    id: "avg-order-value",
    title: "Average order value",
    value: "$89.88",
    description: "vs. previous 30 days",
    icon: "credit-card",
    iconTone: "critical",
    badge: { value: "1.4%", tone: "critical", dir: "down" },
    sparklineData: [95, 92, 0, 0, 0, 0, 0, 0, 190, 0, 44, 0, 0, 0, 88, 0, 49, 60, 18, 89, 90],
    sparklineStroke: "#f59e0b",
  },
  {
    id: "conversion-rate",
    title: "Online store conversion",
    value: "3.42%",
    description: "vs. previous 30 days",
    icon: "chart-line",
    // iconTone: "auto",
    badge: { value: "+0.6%", tone: "success", dir: "up" },
    sparklineData: [0, 0, 0, 0, 0, 0, 3.0, 0, 3.3, 0, 0, 0, 0, 0, 0, 0, 3.4, 3.5, 4.42],
    sparklineStroke: "#3b82f6",
  },
];

export function StatsSectionExample(): ReactNode {
  return (
    <s-page inlineSize="large">
      <StatsSection items={SAMPLE_STATS} columns={4} />
    </s-page>
  );
}

export default StatsSectionExample;
