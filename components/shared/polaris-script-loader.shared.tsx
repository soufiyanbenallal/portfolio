"use client";

import { useState } from "react";
import Script from "next/script";

export type PolarisScriptLoaderPropsType = {
  onLoaded?: () => void;
};

/**
 * Loads the official Shopify Polaris Web Components runtime from Shopify's CDN.
 * Registers custom elements (<s-page>, <s-section>, <s-button>, <s-box>, etc.) in the DOM.
 */
export function PolarisScriptLoader({ onLoaded }: PolarisScriptLoaderPropsType) {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Script
        src="https://cdn.shopify.com/shopifycloud/polaris.js"
        strategy="afterInteractive"
        onLoad={() => {
          onLoaded?.();
        }}
        onError={() => {
          setHasError(true);
        }}
      />
      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          Failed to load Polaris Web Component runtime from CDN. Check your network connection.
        </div>
      )}
    </>
  );
}
