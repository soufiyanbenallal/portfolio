import React from "react";
import { cn } from "@/lib/utils";

type ContainerSharedPropsType = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
};

export function ContainerShared({
  children,
  className,
  id,
  as: Component = "div",
}: ContainerSharedPropsType) {
  return (
    <Component
      id={id}
      className={cn("w-full max-w-6xl mx-auto px-3 md:px-6 border-x", className)}
    >
      {children}
    </Component>
  );
}

export { ContainerShared as Container };
