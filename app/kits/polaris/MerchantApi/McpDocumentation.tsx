import { useState, useCallback } from "react";
import { useCommonsT } from "~/commons/providers";

export type McpDocumentationPropsType = {
  apiBaseUrl: string;
  mcpTools?: string[];
};


function CopyBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <div className="space-y-1.5">
      {label && <p className="text-xs font-semibold text-foreground">{label}</p>}
      <div className="relative p-3 bg-zinc-950 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all border border-zinc-800 flex items-start justify-between gap-3">
        <code className="flex-1">{value}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded cursor-pointer font-sans"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export const McpDocumentation = ({
  apiBaseUrl,
  mcpTools,
}: McpDocumentationPropsType): JSX.Element => {
  const ct = useCommonsT();
  const baseUrl = apiBaseUrl.replace(/\/$/, "");
  const mcpUrl = `${baseUrl}/mcp`;

  const claudeConfig = JSON.stringify(
    {
      mcpServers: {
        "app-name": {
          url: mcpUrl,
          headers: {
            Authorization: "Bearer mak_your_token",
          },
        },
      },
    },
    null,
    2
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-foreground">{ct("commons.mcp_docs.title")}</h3>
          <p className="text-xs text-muted-foreground">{ct("commons.mcp_docs.subtitle")}</p>
        </div>
        <a
          href={`${baseUrl}/docs`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary font-semibold underline"
        >
          {ct("commons.mcp_docs.view_tool_docs")} →
        </a>
      </div>

      <CopyBlock label={ct("commons.mcp_docs.mcp_endpoint")} value={mcpUrl} />

      <div className="space-y-2">
        <span className="text-xs font-semibold text-foreground block">
          {ct("commons.mcp_docs.claude_cursor_config")}
        </span>
        <p className="text-xs text-muted-foreground">
          {ct("commons.mcp_docs.config_instructions")}
        </p>
        <CopyBlock label="" value={claudeConfig} />
      </div>

      {mcpTools && mcpTools.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-foreground block">
            {ct("commons.mcp_docs.available_tools")}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {mcpTools.map((tool) => (
              <s-badge key={tool} tone="info">
                {tool}
              </s-badge>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-muted/50 rounded-xl border border-border space-y-1.5 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground block mb-1">
          {ct("commons.mcp_docs.how_to_connect")}
        </span>
        <p>{ct("commons.mcp_docs.step_1")}</p>
        <p>{ct("commons.mcp_docs.step_2")}</p>
        <p>{ct("commons.mcp_docs.step_3")}</p>
        <p>{ct("commons.mcp_docs.step_4")}</p>
      </div>
    </div>
  );
};

export default McpDocumentation;
