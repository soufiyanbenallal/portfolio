import { useState, useEffect, type ReactNode } from "react";

export type DismissableBannerPropsType = {
  storageKey: string;
  children: ReactNode;
  heading?: string;
  tone?: "info" | "success" | "warning" | "critical";
};


export function DismissableBanner({
  storageKey,
  children,
  heading,
  tone = "info",
}: DismissableBannerPropsType): ReactNode {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed = localStorage.getItem(`banner-dismissed-${storageKey}`) === "true";
      if (isDismissed) {
        setDismissed(true);
      }
    }
  }, [storageKey]);

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
