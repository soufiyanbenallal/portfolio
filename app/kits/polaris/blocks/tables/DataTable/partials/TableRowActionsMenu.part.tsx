"use client";

import React, { useState, useId, type ReactNode } from "react";
import type { TableRowActionType } from "../types";

export type TableRowActionsMenuPropsType = {
  actions: TableRowActionType[];
  row: any;
};

export function TableRowActionsMenuPart({
  actions,
  row,
}: TableRowActionsMenuPropsType): ReactNode {
  const [open, setOpen] = useState(false);
  const id = useId();

  if (!actions || actions.length === 0) return null;

  // Group actions by section
  const sections: { name?: string; items: TableRowActionType[] }[] = [];
  const noSectionItems: TableRowActionType[] = [];

  for (const act of actions) {
    if (act.section) {
      let group = sections.find((g) => g.name === act.section);
      if (!group) {
        group = { name: act.section, items: [] };
        sections.push(group);
      }
      group.items.push(act);
    } else {
      noSectionItems.push(act);
    }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <s-button
        variant="tertiary"
        icon="menu-horizontal"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            zIndex: 50,
            marginTop: "4px",
            minWidth: "220px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
            padding: "6px",
          }}
        >
          {noSectionItems.map((act) => (
            <div key={act.id} style={{ marginBottom: "2px" }}>
              <s-button
                variant="tertiary"
                tone={act.destructive ? "critical" : "auto"}
                icon={act.icon as any}
                onClick={() => {
                  setOpen(false);
                  act.onClick(row);
                }}
              >
                {act.label}
              </s-button>
            </div>
          ))}

          {sections.map((sec, idx) => (
            <div key={idx} style={{ marginTop: "4px", paddingTop: "4px", borderTop: "1px solid #f3f4f6" }}>
              {sec.name && (
                <div style={{ padding: "4px 8px" }}>
                  <s-text tone="neutral">{sec.name}</s-text>
                </div>
              )}
              {sec.items.map((act) => (
                <div key={act.id} style={{ marginBottom: "2px" }}>
                  <s-button
                    variant="tertiary"
                    tone={act.destructive ? "critical" : "auto"}
                    icon={act.icon as any}
                    onClick={() => {
                      setOpen(false);
                      act.onClick(row);
                    }}
                  >
                    {act.label}
                  </s-button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableRowActionsMenuPart;
