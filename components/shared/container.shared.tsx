import React from "react";
import { cn } from "@/lib/utils";

type ContainerSharedPropsType = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
};

/**
 * Content column *inside* a Section's frame: the frame's width and the
 * Line Grid's horizontal padding (16px mobile, 40px desktop). It draws no
 * rails of its own — `<Section>` does — so it is safe to use several times
 * within one frame (absolute layers of a pinned stage, for instance).
 */
export function Container({
  children,
  className,
  id,
  as: Component = "div",
}: ContainerSharedPropsType) {
  return (
    <Component
      id={id}
      className={cn("relative z-10 mx-auto w-full max-w-(--frame) px-4 sm:px-10", className)}
    >
      {children}
    </Component>
  );
}
