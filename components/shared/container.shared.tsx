import React from "react";
import { cn } from "@/lib/utils";

type ContainerSharedPropsType = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
};

export function Container({
  children,
  className,
  id,
  as: Component = "div",
}: ContainerSharedPropsType) {
  return (
    <Component
      id={id}
      className={cn("relative z-10 mx-auto w-full max-w-6xl px-3 md:px-6", className)}
    >
      {children}
    </Component>
  );
}
