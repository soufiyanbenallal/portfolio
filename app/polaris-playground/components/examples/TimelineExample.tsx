"use client";

import React, { useState } from "react";
import { Timeline, type TimelineItemType } from "@/app/kits/polaris/blocks/activity/Timeline";

const INITIAL_EVENTS: TimelineItemType[] = [
  {
    id: "evt-1",
    timestamp: new Date().toISOString(),
    title: "Theme App Extension auto-activated",
    description: "App embed 'Sales Booster Widget' was successfully injected into published theme Dawn v15.0.0.",
    actor: "Theme Extension Engine",
    icon: "theme-edit",
    tone: "success",
    tag: "Theme Embed",
    actions: [
      {
        label: "Open Theme Editor",
        onClick: () => alert("Opening Shopify Theme Editor..."),
      },
    ],
  },
  {
    id: "evt-2",
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    title: "Webhook delivery timeout warning",
    description: "Endpoint 'https://api.store.com/webhooks/orders-create' responded with HTTP 504 Gateway Timeout after 3 retries.",
    actor: "Shopify Event Dispatcher",
    icon: "alert-circle",
    tone: "warning",
    tag: "Webhook",
    actions: [
      {
        label: "Retry Webhook",
        onClick: () => alert("Webhook re-queued for delivery."),
      },
    ],
  },
  {
    id: "evt-3",
    timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    title: "Catalog inventory synchronized",
    description: "Synchronized 350 product variants with Shopify Admin GraphQL API. 0 discrepancies found.",
    actor: "Automated Cron Job",
    icon: "inventory",
    tone: "info",
    tag: "Catalog Sync",
  },
  {
    id: "evt-4",
    timestamp: new Date(Date.now() - 3600 * 1000 * 25).toISOString(),
    title: "Plan subscription upgraded to Growth Tier",
    description: "Store owner upgraded subscription from Starter ($9/mo) to Growth Plan ($29/mo with 50,000 monthly views).",
    actor: "Store Owner (alex@store.com)",
    icon: "payment",
    tone: "success",
    tag: "Billing",
    url: "#billing",
  },
  {
    id: "evt-5",
    timestamp: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
    title: "Klaviyo marketing integration connected",
    description: "OAuth token verified. Customer profile sync and abandoned cart events enabled.",
    actor: "Staff • Sarah M.",
    icon: "email",
    tone: "info",
    tag: "Integration",
  },
  {
    id: "evt-6",
    timestamp: new Date(Date.now() - 3600 * 1000 * 52).toISOString(),
    title: "API rate limit threshold exceeded",
    description: "GraphQL API cost points reached 98% of 1,000 pts/sec bucket limit during batch export.",
    actor: "Bulk Operation Service",
    icon: "alert-octagon",
    tone: "critical",
    tag: "API Limit",
    actions: [
      {
        label: "View Throttling Report",
        onClick: () => alert("Viewing API performance report."),
      },
    ],
  },
  {
    id: "evt-7",
    timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    title: "App installed on store",
    description: "Merchant granted scopes read_products, write_themes, read_orders.",
    actor: "Shopify App Store OAuth",
    icon: "store",
    tone: "success",
    tag: "Installation",
  },
];

export function TimelineExample() {
  const [events, setEvents] = useState<TimelineItemType[]>(INITIAL_EVENTS);

  const handleRefresh = () => {
    const newEvent: TimelineItemType = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: "Manual audit check triggered",
      description: "Staff triggered an on-demand integrity audit for all product schema metaobjects.",
      actor: "Staff • Admin",
      icon: "check-circle",
      tone: "info",
      tag: "Manual Audit",
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <s-page>
      <Timeline
        title="Store Activity & Audit Trail"
        subtitle="Complete chronological log of store automations, catalog syncs, and staff actions."
        items={events}
        searchable
        allowFilter
        pageSize={5}
        onRefresh={handleRefresh}
      />
    </s-page>
  );
}

export default TimelineExample;
