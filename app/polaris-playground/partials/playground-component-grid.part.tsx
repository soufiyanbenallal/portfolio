"use client";

import React, { useMemo } from "react";
import { ExternalLink, Layers } from "lucide-react";
import { polarisComponentsData } from "@/data/polaris-playground.data";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PlaygroundComponentGridPart() {
  const searchQuery = usePolarisPlaygroundStore((state) => state.searchQuery);
  const activeCategory = usePolarisPlaygroundStore((state) => state.activeCategory);

  const filteredComponents = useMemo(() => {
    return polarisComponentsData.filter((comp) => {
      const matchesSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "dashboard" || comp.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  if (filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-30 bg-white p-8 text-center">
        <Layers className="h-8 w-8 text-gray-40" />
        <p className="mt-2 text-sm font-medium text-black">No components found</p>
        <p className="text-xs text-gray-50">
          Try adjusting your search query or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredComponents.map((component) => (
        <div
          key={component.id}
          className="flex flex-col justify-between rounded-2xl border border-gray-30 bg-white p-5 shadow-sm transition-all hover:border-gray-40 hover:shadow-md"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-gray-10 px-2 py-0.5 font-mono text-xs font-semibold text-black">
                &lt;{component.tag}&gt;
              </span>
              <a
                href={component.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-40 hover:text-black transition-colors"
                title="View documentation"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <h4 className="text-sm font-semibold text-black">{component.name}</h4>
            <p className="text-xs leading-relaxed text-gray-60">
              {component.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-gray-20 pt-3">
            {component.propsList.map((prop) => (
              <span
                key={prop}
                className="rounded-md bg-gray-10 px-2 py-0.5 font-mono text-[10px] text-gray-70"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
