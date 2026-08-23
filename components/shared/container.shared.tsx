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
      className={cn("relative z-10 w-full max-w-6xl mx-auto px-3 md:px-6", className)}
    >
      {children}
    </Component>
  );
}

export { ContainerShared as Container };
