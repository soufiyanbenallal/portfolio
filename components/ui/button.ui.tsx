"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "icon" | "icon-sm";
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const ButtonUi = forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isSuccess = false,
      isError = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // 13px medium, full pill, no shadow — the edge does the work.
          "group inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-50",
          // Variants
          variant === "primary" && "btn-primary",
          variant === "secondary" && "btn-secondary",
          variant === "outline" &&
            "border-line-2 hover:bg-raised text-ink border bg-transparent",
          variant === "ghost" && "hover:bg-raised text-ink-muted hover:text-ink bg-transparent",
          variant === "glass" &&
            "border-line-2 bg-bg/80 text-ink hover:bg-surface border backdrop-blur-md",
          // Sizes
          size === "sm" && "h-8 gap-1.5 px-3 text-[13px]",
          size === "md" && "h-9 gap-2 px-3.5 text-[13px]",
          size === "lg" && "h-11 gap-2.5 px-5 text-sm",
          size === "icon-sm" && "size-8 justify-center p-1.5",
          size === "icon" && "size-9 justify-center",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        ) : isSuccess ? (
          <span className="text-availability-green font-medium">Opening your email app…</span>
        ) : isError ? (
          <span className="font-medium text-red-500">Error sending</span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

ButtonUi.displayName = "ButtonUi";
