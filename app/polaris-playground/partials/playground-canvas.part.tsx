"use client";

import React from "react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";
import { PolarisDashboardDemoPart } from "./demos/polaris-dashboard-demo.part";
import { PolarisFormsDemoPart } from "./demos/polaris-forms-demo.part";
import { PolarisActionsDemoPart } from "./demos/polaris-actions-demo.part";
import { PolarisFeedbackDemoPart } from "./demos/polaris-feedback-demo.part";
import { PolarisTablesDemoPart } from "./demos/polaris-tables-demo.part";
import { PolarisLayoutDemoPart } from "./demos/polaris-layout-demo.part";

export function PlaygroundCanvasPart() {
  const activeCategory = usePolarisPlaygroundStore((state) => state.activeCategory);

  switch (activeCategory) {
    case "dashboard":
      return <PolarisDashboardDemoPart />;
    case "forms":
      return <PolarisFormsDemoPart />;
    case "actions":
      return <PolarisActionsDemoPart />;
    case "feedback":
      return <PolarisFeedbackDemoPart />;
    case "tables":
      return <PolarisTablesDemoPart />;
    case "layout":
      return <PolarisLayoutDemoPart />;
    default:
      return <PolarisDashboardDemoPart />;
  }
}
