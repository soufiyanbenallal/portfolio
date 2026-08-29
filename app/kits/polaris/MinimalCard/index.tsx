import React from "react";

export type MinimalCardPropsType = {
  children: React.ReactNode;
  padding?: "base" | "tight" | "loose" | "none";
  className?: string;
};


export const MinimalCard = ({
  children,
  padding = "base",
  className = "",
}: MinimalCardPropsType): JSX.Element => {
  const paddingClass =
    padding === "none" ? "" : padding === "tight" ? "p-3" : padding === "loose" ? "p-6" : "p-4";

  return (
    <div
      className={`rounded-xl border border-border bg-card shadow-xs ${paddingClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default MinimalCard;
