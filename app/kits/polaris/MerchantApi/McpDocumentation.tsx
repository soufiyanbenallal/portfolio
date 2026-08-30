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
      {label && <p className="text-foreground text-xs font-semibold">{label}</p>}
      <div className="relative flex items-start justify-between gap-3 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs break-all whitespace-pre-wrap text-emerald-400">
        <code className="flex-1">{value}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="cursor-pointer rounded bg-zinc-800 px-2 py-1 font-sans text-xs text-zinc-200 hover:bg-zinc-700"
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
          <h3 className="text-foreground text-base font-bold">{ct("commons.mcp_docs.title")}</h3>
          <p className="text-muted-foreground text-xs">{ct("commons.mcp_docs.subtitle")}</p>
        </div>
        <a
          href={`${baseUrl}/docs`}
          target="_blank"
          rel="noreferrer"
          className="text-primary text-xs font-semibold underline"
        >
          {ct("commons.mcp_docs.view_tool_docs")} →
        </a>
      </div>

      <CopyBlock label={ct("commons.mcp_docs.mcp_endpoint")} value={mcpUrl} />

      <div className="space-y-2">
        <span className="text-foreground block text-xs font-semibold">
          {ct("commons.mcp_docs.claude_cursor_config")}
        </span>
        <p className="text-muted-foreground text-xs">
          {ct("commons.mcp_docs.config_instructions")}
        </p>
        <CopyBlock label="" value={claudeConfig} />
      </div>

      {mcpTools && mcpTools.length > 0 && (
        <div className="space-y-2">
          <span className="text-foreground block text-xs font-semibold">
            {ct("commons.mcp_docs.available_tools")}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {mcpTools.map((tool) => (
              <s-badge key={tool} tone="info">
                {tool}
              </s-badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/50 border-border text-muted-foreground space-y-1.5 rounded-xl border p-4 text-xs">
        <span className="text-foreground mb-1 block font-semibold">
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
