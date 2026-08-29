"use client";

import React from "react";

export function PolarisTablesDemoPart() {
  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Data Tables & Lists" inlineSize="base">
        <s-section heading="Orders Management">
          <s-table variant="auto">
            <s-table-header-row>
              <s-table-header listSlot="primary">Order ID</s-table-header>
              <s-table-header>Customer</s-table-header>
              <s-table-header listSlot="labeled" format="currency">Total</s-table-header>
              <s-table-header>Fulfillment</s-table-header>
            </s-table-header-row>
            <s-table-body>
              <s-table-row>
                <s-table-cell>#1042</s-table-cell>
                <s-table-cell>Alex Rivera</s-table-cell>
                <s-table-cell>$189.50</s-table-cell>
                <s-table-cell><s-badge tone="success">Fulfilled</s-badge></s-table-cell>
              </s-table-row>
              <s-table-row>
                <s-table-cell>#1043</s-table-cell>
                <s-table-cell>Sophia Chen</s-table-cell>
                <s-table-cell>$420.00</s-table-cell>
                <s-table-cell><s-badge tone="warning">Unfulfilled</s-badge></s-table-cell>
              </s-table-row>
              <s-table-row>
                <s-table-cell>#1044</s-table-cell>
                <s-table-cell>Marcus Vance</s-table-cell>
                <s-table-cell>$89.00</s-table-cell>
                <s-table-cell><s-badge tone="critical">Canceled</s-badge></s-table-cell>
              </s-table-row>
            </s-table-body>
          </s-table>
        </s-section>

        <s-section heading="Onboarding Checklist">
          <s-ordered-list>
            <s-list-item>Connect your Shopify App credentials in the admin partner dashboard.</s-list-item>
            <s-list-item>Import product catalogs using the web components drop-zone.</s-list-item>
            <s-list-item>Enable automatic webhook event dispatching for order changes.</s-list-item>
          </s-ordered-list>
        </s-section>
      </s-page>
    </div>
  );
}
