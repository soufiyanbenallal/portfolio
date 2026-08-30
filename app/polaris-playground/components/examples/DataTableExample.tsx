"use client";

import React, { useState } from "react";
import {
  Table,
  type TableColumnType,
  type TableRowType,
} from "@/app/kits/polaris/ui/layouts/Table";
import {
  Filters,
  type FilterTabItemType,
  type ActiveFilterItemType,
  type FilterCategoryType,
} from "@/app/kits/polaris/ui/layouts/Filters";

type BundleDealRowType = {
  dealName: string;
  dealSubtitle?: string;
  isABTest?: boolean;
  isVariant?: boolean;
  statusDot?: "success" | "warning" | "neutral";
  created: string;
  visitors: number;
  cr: string;
  aov: string;
  addedRevenue: string;
  totalRevenue: string;
  enabled: boolean;
};

const BUNDLE_COLUMNS: TableColumnType<BundleDealRowType>[] = [
  {
    id: "deal",
    title: "Deal",
    renderCell: (row) => (
      <s-stack direction="inline" gap="small-200" alignItems="center">
        {row.statusDot && (
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: row.statusDot === "success" ? "#10b981" : "#f59e0b",
            }}
          />
        )}
        <s-stack direction="block" gap="none">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <s-text type="strong">{row.dealName}</s-text>
            {row.isABTest && <s-badge tone="success">A/B</s-badge>}
            {row.isVariant && <s-icon type="view" tone="neutral" />}
          </s-stack>
          {row.dealSubtitle && <s-text tone="neutral">{row.dealSubtitle}</s-text>}
        </s-stack>
      </s-stack>
    ),
  },
  {
    id: "created",
    title: "Created",
    renderCell: (row) => <s-text tone="neutral">{row.created}</s-text>,
  },
  {
    id: "visitors",
    title: "Visitors",
    tooltip: "Number of visitors who saw this bundle deal offer.",
    renderCell: (row) => <s-text>{row.visitors}</s-text>,
  },
  {
    id: "cr",
    title: "CR",
    tooltip: "Conversion Rate: Percentage of visitors who purchased this deal.",
    renderCell: (row) => <s-text>{row.cr}</s-text>,
  },
  {
    id: "aov",
    title: "AOV",
    tooltip: "Average Order Value for orders containing this deal.",
    renderCell: (row) => <s-text>{row.aov}</s-text>,
  },
  {
    id: "addedRevenue",
    title: "Added revenue",
    tooltip: "Additional revenue generated directly from bundle upsells.",
    renderCell: (row) => <s-text>{row.addedRevenue}</s-text>,
  },
  {
    id: "totalRevenue",
    title: "Total revenue",
    tooltip: "Gross revenue generated across all variants in this offer.",
    renderCell: (row) => <s-text>{row.totalRevenue}</s-text>,
  },
  {
    id: "status",
    title: "Status",
    renderCell: (row, _, isSubRow) => (!isSubRow ? <s-switch checked={row.enabled} /> : null),
  },
];

const BUNDLE_ROWS: TableRowType<BundleDealRowType>[] = [
  {
    id: "bundle-1",
    data: {
      dealName: "Bundle",
      dealSubtitle: "All products",
      isABTest: true,
      statusDot: "success",
      created: "Aug 17, 2026",
      visitors: 1,
      cr: "0%",
      aov: "MAD 0.00",
      addedRevenue: "MAD 0",
      totalRevenue: "MAD 0",
      enabled: true,
    },
    actions: [
      {
        id: "stop-ab",
        label: "Stop A/B test",
        icon: "pause-circle",
        onClick: () => alert("A/B test stopped."),
      },
      {
        id: "pagefly",
        label: "Create PageFly sale page",
        icon: "layout",
        section: "Integrations",
        onClick: () => alert("Connecting PageFly integration..."),
      },
      {
        id: "checkout-link",
        label: "Create Checkout Link",
        icon: "cart",
        section: "Integrations",
        onClick: () => alert("Generated instant checkout URL."),
      },
      {
        id: "remove",
        label: "Remove",
        icon: "delete",
        destructive: true,
        onClick: () => alert("Removed bundle deal."),
      },
    ],
    subRows: [
      {
        id: "bundle-1-var-a",
        data: {
          dealName: "A variant",
          isVariant: true,
          created: "12d 1h",
          visitors: 1,
          cr: "0%",
          aov: "MAD 0.00",
          addedRevenue: "MAD 0",
          totalRevenue: "MAD 0",
          enabled: true,
        },
      },
      {
        id: "bundle-1-var-b",
        data: {
          dealName: "B variant",
          isVariant: true,
          created: "12d 1h",
          visitors: 0,
          cr: "0%",
          aov: "MAD 0.00",
          addedRevenue: "MAD 0",
          totalRevenue: "MAD 0",
          enabled: false,
        },
      },
    ],
  },
  {
    id: "bundle-2",
    data: {
      dealName: "Tiered Volume Discount",
      dealSubtitle: "Collection • Summer Apparel",
      statusDot: "success",
      created: "Aug 22, 2026",
      visitors: 284,
      cr: "4.8%",
      aov: "MAD 340.00",
      addedRevenue: "MAD 4,800",
      totalRevenue: "MAD 16,320",
      enabled: true,
    },
    actions: [
      {
        id: "edit",
        label: "Edit Deal",
        icon: "edit",
        onClick: () => alert("Opening deal editor..."),
      },
      {
        id: "duplicate",
        label: "Duplicate",
        icon: "duplicate",
        onClick: () => alert("Duplicated deal."),
      },
      {
        id: "remove",
        label: "Remove",
        icon: "delete",
        destructive: true,
        onClick: () => alert("Removed deal."),
      },
    ],
  },
];

const TABS: FilterTabItemType[] = [
  { id: "all", label: "All", badge: 2 },
  { id: "unpaid", label: "Unpaid", badge: 0 },
  { id: "open", label: "Open", badge: 2 },
  { id: "closed", label: "Closed", badge: 0 },
  { id: "local-delivery", label: "Local delivery" },
  { id: "local-pickup", label: "Local pickup" },
];

const FILTER_CATEGORIES: FilterCategoryType[] = [
  {
    id: "status",
    label: "Account status",
    options: [
      { label: "Active", value: "active" },
      { label: "Disabled", value: "disabled" },
      { label: "Invited", value: "invited" },
    ],
  },
  {
    id: "payment",
    label: "Payment status",
    options: [
      { label: "Paid", value: "paid" },
      { label: "Partially paid", value: "partially_paid" },
      { label: "Unpaid", value: "unpaid" },
    ],
  },
  {
    id: "fulfillment",
    label: "Fulfillment status",
    options: [
      { label: "Fulfilled", value: "fulfilled" },
      { label: "Unfulfilled", value: "unfulfilled" },
    ],
  },
];

export function DataTableExample() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFilterItemType[]>([
    {
      id: "apple-tag",
      categoryId: "tag",
      categoryLabel: "Tag",
      label: "Tagged with APPLE",
      value: "apple",
    },
    {
      id: "spent-range",
      categoryId: "money",
      categoryLabel: "Money spent",
      label: "Money spent is between $0 and $2000",
      value: "0-2000",
    },
  ]);

  const handleAddFilter = (filter: ActiveFilterItemType) => {
    setActiveFilters((prev) => [...prev, filter]);
  };

  const handleRemoveFilter = (filter: ActiveFilterItemType) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filter.id));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <s-page>
      <s-section padding="none">
        <Table
          selectable
          selectedRowIds={selectedIds}
          onSelectionChange={setSelectedIds}
          bulkActions={[
            {
              id: "activate",
              label: "Activate",
              onClick: (ids) => alert(`Activated deals: ${ids.join(", ")}`),
            },
            {
              id: "remove",
              label: "Remove",
              icon: "delete",
              destructive: true,
              onClick: (ids) => alert(`Removed deals: ${ids.join(", ")}`),
            },
          ]}
          filters={
            <Filters
              tabs={TABS}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by name or product"
              filterCategories={FILTER_CATEGORIES}
              activeFilters={activeFilters}
              onAddFilter={handleAddFilter}
              onRemoveFilter={handleRemoveFilter}
              onClearAllFilters={handleClearAllFilters}
              onSaveView={() => alert("Saved current view filter.")}
            />
          }
          columns={BUNDLE_COLUMNS}
          rows={BUNDLE_ROWS}
        />
      </s-section>
    </s-page>
  );
}

export default DataTableExample;
