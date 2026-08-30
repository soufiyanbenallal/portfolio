import { type ReactNode, type JSX } from "react";
import { StatsCard, type StatsCardPropsType } from "./StatsCard";

export type StatsSectionPropsType = {
  items?: StatsCardPropsType[];
  children?: ReactNode;
  columns?: number | string;
  id?: string;
};

export function StatsSection({
  items,
  children,
  columns = 4,
  id,
}: StatsSectionPropsType): JSX.Element {
  const gridTemplate =
    typeof columns === "number" ? `repeat(${columns}, 1fr)` : (columns ?? "repeat(4, 1fr)");

  return (
    <s-grid gridTemplateColumns={gridTemplate} columnGap="base" id={id}>
      {items && items.map((stat) => <StatsCard key={stat.id} {...stat} />)}
      {children}
    </s-grid>
  );
}

export default StatsSection;
