"use client";

import React from "react";
import { Sliders, RotateCcw } from "lucide-react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";
import type {
  PolarisButtonToneType,
  PolarisBannerToneType,
  PolarisBadgeToneType,
  PolarisButtonVariantType,
} from "@/types";

export function PlaygroundPropsControlPart() {
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);
  const updatePropsConfig = usePolarisPlaygroundStore(
    (state) => state.updatePropsConfig,
  );
  const resetPropsConfig = usePolarisPlaygroundStore(
    (state) => state.resetPropsConfig,
  );

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-30 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-20 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-black" />
          <h3 className="text-sm font-semibold text-black">Interactive Sandbox Controls</h3>
        </div>
        <button
          type="button"
          onClick={resetPropsConfig}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-gray-60 hover:bg-gray-10 hover:text-black transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* ── Button Variant ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-60">Button Variant</label>
          <select
            value={propsConfig.buttonVariant}
            onChange={(e) =>
              updatePropsConfig({
                buttonVariant: e.target.value as PolarisButtonVariantType,
              })
            }
            className="rounded-lg border border-gray-30 bg-white px-3 py-1.5 text-xs text-black focus:border-black focus:outline-none cursor-pointer"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/* ── Button Tone ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-60">Button Tone</label>
          <select
            value={propsConfig.buttonTone}
            onChange={(e) =>
              updatePropsConfig({
                buttonTone: e.target.value as PolarisButtonToneType,
              })
            }
            className="rounded-lg border border-gray-30 bg-white px-3 py-1.5 text-xs text-black focus:border-black focus:outline-none cursor-pointer"
          >
            <option value="auto">Auto (Default)</option>
            <option value="critical">Critical</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        {/* ── Banner Tone ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-60">Banner Tone</label>
          <select
            value={propsConfig.bannerTone}
            onChange={(e) =>
              updatePropsConfig({
                bannerTone: e.target.value as PolarisBannerToneType,
              })
            }
            className="rounded-lg border border-gray-30 bg-white px-3 py-1.5 text-xs text-black focus:border-black focus:outline-none cursor-pointer"
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/* ── Badge Tone ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-60">Badge Tone</label>
          <select
            value={propsConfig.badgeTone}
            onChange={(e) =>
              updatePropsConfig({
                badgeTone: e.target.value as PolarisBadgeToneType,
              })
            }
            className="rounded-lg border border-gray-30 bg-white px-3 py-1.5 text-xs text-black focus:border-black focus:outline-none cursor-pointer"
          >
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="info">Info</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      {/* ── Boolean Flags ── */}
      <div className="flex flex-wrap items-center gap-6 border-t border-gray-20 pt-3">
        <label className="flex items-center gap-2 text-xs font-medium text-black cursor-pointer">
          <input
            type="checkbox"
            checked={propsConfig.buttonLoading}
            onChange={(e) => updatePropsConfig({ buttonLoading: e.target.checked })}
            className="h-4 w-4 rounded border-gray-30 accent-black cursor-pointer"
          />
          Button Loading State
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-black cursor-pointer">
          <input
            type="checkbox"
            checked={propsConfig.buttonDisabled}
            onChange={(e) => updatePropsConfig({ buttonDisabled: e.target.checked })}
            className="h-4 w-4 rounded border-gray-30 accent-black cursor-pointer"
          />
          Button Disabled State
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-black cursor-pointer">
          <input
            type="checkbox"
            checked={propsConfig.bannerDismissible}
            onChange={(e) =>
              updatePropsConfig({ bannerDismissible: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-30 accent-black cursor-pointer"
          />
          Banner Dismissible
        </label>
      </div>
    </div>
  );
}
