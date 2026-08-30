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
          "group inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          // Variants
          variant === "primary" &&
            "border border-black bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#1a1a1a] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_10px_rgba(0,0,0,0.2)] active:scale-[0.98]",
          variant === "secondary" &&
            "border-gray-30 hover:bg-gray-10 border bg-white text-black shadow-xs active:scale-[0.98]",
          variant === "outline" &&
            "border-gray-30 hover:bg-gray-10 border bg-transparent text-black active:scale-[0.98]",
          variant === "ghost" && "hover:bg-gray-20 bg-transparent text-black active:scale-[0.98]",
          variant === "glass" &&
            "border-gray-30 border bg-white/70 text-black shadow-xs backdrop-blur-md hover:bg-white/90 active:scale-[0.98]",
          // Sizes
          size === "sm" && "h-8 gap-1.5 px-3.5 py-1.5 text-xs",
          size === "md" && "h-11 gap-2 px-5 py-2.5 text-sm",
          size === "lg" && "h-13 gap-2.5 px-6 py-3.5 text-base",
          size === "icon-sm" && "size-8 justify-center p-1.5",
          size === "icon" && "size-10 justify-center",
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
          <span className="text-availability-green font-medium">Sent Successfully!</span>
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
