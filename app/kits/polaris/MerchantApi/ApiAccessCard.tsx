import { useState } from "react";
import ApiTokenManager, { type ApiTokenModelType } from "./ApiTokenManager";
import ApiUsageStats, { type UsageStatsType } from "./ApiUsageStats";
import ApiDocumentation from "./ApiDocumentation";
import McpDocumentation from "./McpDocumentation";

export type ApiAccessCardPropsType = {
  tokens: ApiTokenModelType[];
  usageStats: UsageStatsType;
  apiBaseUrl: string;
  availableResources: string[];
  availableMcpTools?: string[];
  isInline?: boolean;
};


export const ApiAccessCard = ({
  tokens,
  usageStats,
  apiBaseUrl,
  availableResources,
  availableMcpTools,
  isInline,
}: ApiAccessCardPropsType): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"tokens" | "usage" | "docs" | "mcp">("tokens");
  const activeTokenCount = tokens.filter((t) => t.isActive && !t.revokedAt).length;

  const tabs = [
    { id: "tokens" as const, label: `Tokens (${activeTokenCount})` },
    { id: "usage" as const, label: "Usage" },
    { id: "docs" as const, label: "Documentation" },
    { id: "mcp" as const, label: "MCP" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 px-4 pt-3 border-b border-border bg-muted/20 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
                isActive
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-5">
        {selectedTab === "tokens" && <ApiTokenManager tokens={tokens} isInline={isInline} />}
        {selectedTab === "usage" && <ApiUsageStats stats={usageStats} />}
        {selectedTab === "docs" && (
          <ApiDocumentation apiBaseUrl={apiBaseUrl} resources={availableResources} />
        )}
        {selectedTab === "mcp" && (
          <McpDocumentation apiBaseUrl={apiBaseUrl} mcpTools={availableMcpTools} />
        )}
      </div>
    </div>
  );
};

export default ApiAccessCard;
