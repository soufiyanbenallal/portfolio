import React from "react";
import { cn } from "@/lib/utils";

type ContainerSharedPropsType = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  border?: boolean;
};

export function ContainerShared({
  children,
  className,
  id,
  as: Component = "div",
  border = true,
}: ContainerSharedPropsType) {
  return (
    <Component
      id={id}
      className={cn("relative z-10 w-full max-w-6xl mx-auto px-3 md:px-6", className, border && "border-x")}
    >
      {children}
    </Component>
  );
}

export { ContainerShared as Container };
