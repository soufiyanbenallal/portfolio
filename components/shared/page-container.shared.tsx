import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container.shared";

type PageContainerSharedPropsType = {
  children: React.ReactNode;
  className?: string;
  withGuides?: boolean;
};

export function PageContainerShared({
  children,
  className,
  withGuides = true,
}: PageContainerSharedPropsType) {
  return (
    <div className="relative w-full flex justify-center">
      {withGuides && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl border-x border-gray-30/80 z-0 px-3 md:px-6"
        />
      )}
      <Container className={cn("relative z-10", className)}>
        {children}
      </Container>
    </div>
  );
}
