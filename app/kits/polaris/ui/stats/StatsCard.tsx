import { type ReactNode, type JSX } from "react";

// ─── Tone and Icon types ───────────────────────────────────────────────────────
export type IconType = JSX.IntrinsicElements["s-icon"]["type"];
export type StatsToneType = "auto" | "success" | "info" | "neutral" | "warning" | "critical";

// ─── Prop types ────────────────────────────────────────────────────────────────
export type StatsCardBadgeType = {
  value: string | number;
  tone?: StatsToneType;
  dir?: "up" | "down";
};

export type SparklinePropsType = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
};

export type StatsCardPropsType = {
  id: string;
  title: string;
  value: ReactNode;
  description?: ReactNode;
  icon?: IconType;
  iconTone?: StatsToneType;
  badge?: StatsCardBadgeType;
  /** Time-series — one number per day/interval, oldest first. */
  sparklineData?: number[];
  sparklineStroke?: string;
  sparklineWidth?: number;
  sparklineHeight?: number;
  onClick?: () => void;
};

// ─── SVG path builder from normalised data points ─────────────────────────────
const SPARK_W = 80;
const SPARK_H = 16;
const SPARK_PADDING = 2; // vertical padding so strokes don't clip at 0/max
const SPARK_STROKE = "#7a7e82ff";

export function buildSparkPath(data: number[], width = SPARK_W, height = SPARK_H): string {
  if (data.length < 2) return "";

  const minV = Math.min(...data);
  const maxV = Math.max(...data);
  const range = maxV - minV || 1; // prevent division by zero on flat data

  const toX = (i: number) => (i / (data.length - 1)) * width;
  const toY = (v: number) => SPARK_PADDING + ((maxV - v) / range) * (height - SPARK_PADDING * 2);

  return data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(2)},${toY(v).toFixed(2)}`)
    .join(" ");
}

// ─── Sparkline Component ──────────────────────────────────────────────────────
export function Sparkline({
  data,
  width = SPARK_W,
  height = SPARK_H,
  stroke = SPARK_STROKE,
  strokeWidth = 1.75,
}: SparklinePropsType): JSX.Element | null {
  const path = buildSparkPath(data, width, height);
  if (!path) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ display: "block", overflow: "visible", flexShrink: 0 }}
    >
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── StatsCard Component ───────────────────────────────────────────────────────
export function StatsCard({
  id,
  title,
  value,
  icon,
  iconTone = "auto",
  description,
  badge,
  sparklineData,
  sparklineStroke,
  sparklineWidth,
  sparklineHeight,
  onClick,
}: StatsCardPropsType): JSX.Element {
  const innerContent = (
    <s-box padding="small-200">
      <s-stack direction="block" gap="small-100">
        {/* Header: icon + title + tooltip + badge */}
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            {icon && <s-icon type={icon} tone={iconTone} />}
            <s-text type="strong" interestFor={id}>
              {title}
            </s-text>
            {description && <s-tooltip id={id}>{description}</s-tooltip>}
          </s-stack>
        </s-stack>

        {/* Value + sparkline */}
        <s-stack direction="inline" justifyContent="space-between" alignItems="end">
          <s-stack direction="inline" gap="small-200" alignItems="safe end">
            <strong style={{ fontVariantNumeric: "tabular-nums", fontSize: "1.1rem" }}>
              {value}
            </strong>
            {badge && (
              <s-badge
                tone={badge?.tone ?? "neutral"}
                icon={badge?.dir === "up" ? "arrow-up" : "arrow-down"}
              >
                {badge.value}
              </s-badge>
            )}
          </s-stack>
          {sparklineData && (
            <Sparkline
              data={sparklineData}
              stroke={sparklineStroke}
              width={sparklineWidth}
              height={sparklineHeight}
            />
          )}
        </s-stack>
      </s-stack>
    </s-box>
  );

  return (
    <s-section padding="none">
      <s-box padding="small-300">
        {onClick ? (
          <s-clickable onClick={onClick} borderRadius="base">
            {innerContent}
          </s-clickable>
        ) : (
          innerContent
        )}
      </s-box>
    </s-section>
  );
}

export default StatsCard;
