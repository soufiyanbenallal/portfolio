import type { CSSProperties } from "react";

export type ProgressTrackerToneType = "success" | "neutral" | "subdued" | "caution" | "critical";
export type ProgressTrackerSizeType = "xs" | "sm" | "base" | "lg";
export type ProgressTrackerBorderRadiusType = "none" | "small" | "base" | "large" | "full";

export type ProgressTrackerPropsType = {
  /** Progress percentage between 0 and 100 */
  progress: number;
  tone?: ProgressTrackerToneType;
  size?: ProgressTrackerSizeType;
  borderRadius?: ProgressTrackerBorderRadiusType;
  trackColor?: string;
  barColor?: string;
  animated?: boolean;
  style?: CSSProperties;
  className?: string;
};

const TONE_STYLES: Record<ProgressTrackerToneType, { barColor: string; trackColor: string }> = {
  success: {
    barColor: "#059669",
    trackColor: "#f3f4f6",
  },
  neutral: {
    barColor: "#111827",
    trackColor: "#f3f4f6",
  },
  subdued: {
    barColor: "#9ca3af",
    trackColor: "#f3f4f6",
  },
  caution: {
    barColor: "#d97706",
    trackColor: "#fef3c7",
  },
  critical: {
    barColor: "#dc2626",
    trackColor: "#fee2e2",
  },
};

const SIZE_STYLES: Record<ProgressTrackerSizeType, { height: string }> = {
  xs: { height: "0.25rem" },
  sm: { height: "0.3125rem" },
  base: { height: "0.375rem" },
  lg: { height: "0.5rem" },
};

const BORDER_RADIUS_STYLES: Record<ProgressTrackerBorderRadiusType, { borderRadius: string }> = {
  none: { borderRadius: "0px" },
  small: { borderRadius: "0.25rem" },
  base: { borderRadius: "0.375rem" },
  large: { borderRadius: "0.5rem" },
  full: { borderRadius: "9999px" },
};

export function ProgressTracker({
  progress,
  tone = "success",
  size = "base",
  borderRadius = "full",
  trackColor,
  barColor,
  animated = true,
  style,
  className,
}: ProgressTrackerPropsType) {
  const toneStyle = TONE_STYLES[tone] ?? TONE_STYLES.success;
  const sizeStyle = SIZE_STYLES[size] ?? SIZE_STYLES.base;
  const radiusStyle = BORDER_RADIUS_STYLES[borderRadius] ?? BORDER_RADIUS_STYLES.full;
  const clampedProgress = Math.min(100, Math.max(0, isNaN(progress) ? 0 : progress));

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: trackColor ?? toneStyle.trackColor,
        ...sizeStyle,
        ...radiusStyle,
        ...style,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${clampedProgress}%`,
          backgroundColor: barColor ?? toneStyle.barColor,
          borderRadius: "inherit",
          transition: animated ? "all 500ms ease-out" : "none",
        }}
      />
    </div>
  );
}

export const ProgressBar = ProgressTracker;
export default ProgressTracker;
