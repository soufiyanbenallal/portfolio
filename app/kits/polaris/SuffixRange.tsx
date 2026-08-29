export type SuffixRangePropsType = {
  value: string | number;
  px?: boolean;
  percentage?: boolean;
  booster?: boolean;
};

// Compatibility alias
export type SuffixRangeProps = SuffixRangePropsType;

export function SuffixRange({
  value,
  px = false,
  percentage = false,
  booster = false,
}: SuffixRangePropsType): JSX.Element {
  const suffix = px ? "px" : percentage ? "%" : booster ? "x" : "";

  return (
    <div className="min-w-[28px] text-right inline-block">
      <span className="inline-block px-2 py-0.5 text-xs font-mono font-medium rounded-md border border-border bg-muted/50 text-foreground">
        {value}
        {suffix}
      </span>
    </div>
  );
}

export default SuffixRange;
