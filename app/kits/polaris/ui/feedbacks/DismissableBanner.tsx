import { useState, type ReactNode } from "react";

export type DismissableBannerPropsType = {
  storageKey: string;
  children: ReactNode;
  heading?: string;
  tone?: "info" | "success" | "warning" | "critical";
};

// Compatibility alias
export type DismissableBannerProps = DismissableBannerPropsType;

export function DismissableBanner({
  storageKey,
  children,
  heading,
  tone = "info",
}: DismissableBannerPropsType): ReactNode {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`banner-dismissed-${storageKey}`) === "true";
  });

  if (dismissed) return null;

  return (
    <s-box paddingBlockEnd="base">
      <s-banner
        heading={heading}
        tone={tone}
        dismissible
        onDismiss={() => {
          setDismissed(true);
          if (typeof window !== "undefined") {
            localStorage.setItem(`banner-dismissed-${storageKey}`, "true");
          }
        }}
      >
        {children}
      </s-banner>
    </s-box>
  );
}

export default DismissableBanner;
