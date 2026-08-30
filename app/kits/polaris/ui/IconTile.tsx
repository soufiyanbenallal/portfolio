import type { CSSProperties, ReactNode } from "react";

export type IconTileToneType = "success" | "neutral" | "subdued" | "caution";
export type IconTileBorderRadiusType = "none" | "small" | "base" | "large" | "full";
export type IconTileSizeType = "sm" | "md" | "lg";

export type IconTilePropsType = {
  children: ReactNode;
  tone?: IconTileToneType;
  borderRadius?: IconTileBorderRadiusType;
  size?: IconTileSizeType;
  style?: CSSProperties;
  className?: string;
};

const TONE_STYLES: Record<IconTileToneType, { backgroundColor: string; color: string }> = {
  success: {
    backgroundColor: "#ecfdf5",
    color: "#059669",
  },
  neutral: {
    backgroundColor: "#f5f8f7",
    color: "#059669",
  },
  subdued: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
  },
  caution: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
};

const SIZE_STYLES: Record<IconTileSizeType, { width: string; height: string }> = {
  sm: { width: "2rem", height: "2rem" },
  md: { width: "2.5rem", height: "2.5rem" },
  lg: { width: "2.75rem", height: "2.75rem" },
};

const BORDER_RADIUS_STYLES: Record<IconTileBorderRadiusType, { borderRadius: string }> = {
  none: { borderRadius: "0px" },
  small: { borderRadius: "0.25rem" },
  base: { borderRadius: "0.5rem" },
  large: { borderRadius: "0.75rem" },
  full: { borderRadius: "9999px" },
};

export function IconTile({
  children,
  tone = "success",
  borderRadius = "base",
  size = "md",
  style,
  className,
}: IconTilePropsType) {
  const toneStyle = TONE_STYLES[tone] ?? TONE_STYLES.success;
  const sizeStyle = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const radiusStyle = BORDER_RADIUS_STYLES[borderRadius] ?? BORDER_RADIUS_STYLES.base;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...sizeStyle,
        ...radiusStyle,
        ...toneStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const IconTitle = IconTile;
export default IconTile;
