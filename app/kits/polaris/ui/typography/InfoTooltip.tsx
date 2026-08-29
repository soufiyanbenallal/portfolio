export type InfoTooltipPropsType = {
  label: string;
  tooltip: string;
  variant?: "bodyMd" | "bodySm" | "headingSm" | "headingMd";
  fontWeight?: "regular" | "medium" | "semibold" | "bold";
  tone?: "subdued" | "success" | "critical" | "caution";
};

// Compatibility alias
export type InfoTooltipProps = InfoTooltipPropsType;

export function InfoTooltip({ label, tooltip }: InfoTooltipPropsType): JSX.Element {
  return (
    <div className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
      <span>{label}</span>
      <span
        title={tooltip}
        className="w-4 h-4 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[10px] cursor-help font-bold"
      >
        i
      </span>
    </div>
  );
}

export default InfoTooltip;
