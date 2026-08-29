import { useState } from "react";

export type DismissableBannerPropsType = {
  storageKey: string;
  children: React.ReactNode;
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
}: DismissableBannerPropsType): JSX.Element | null {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`banner-dismissed-${storageKey}`) === "true";
  });

  if (dismissed) return null;

  return (
    <div className="mb-4">
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
    </div>
  );
}

export default DismissableBanner;
