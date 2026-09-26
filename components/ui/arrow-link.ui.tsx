import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { cn } from "@/lib/utils";

export type ArrowLinkPropsType = {
  href: string;
  children: React.ReactNode;
  /** Opens in a new tab and uses the ↗ glyph instead of →. */
  external?: boolean;
  className?: string;
};

/**
 * The one "see more" link style — section headers, card footers, outros.
 * The arrow nudges in its own direction on hover (→ slides right, ↗ lifts
 * diagonally) so the affordance matches where the link actually goes.
 */
export function ArrowLink({ href, children, external = false, className }: ArrowLinkPropsType) {
  const classes = cn(
    "group/arrow inline-flex items-center gap-1.5 text-sm font-medium text-black transition-colors duration-200 hover:text-gray-60",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span>{children}</span>
        <Icons.ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-entrance group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
      </a>
    );
  }

  return (
    <Link href={href} transitionTypes={["nav-forward"]} className={classes}>
      <span>{children}</span>
      <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-entrance group-hover/arrow:translate-x-1" />
    </Link>
  );
}
