import { useState, useCallback } from "react";
import { useCommonsT } from "~/commons/providers";

export type ApiDocumentationPropsType = {
  apiBaseUrl: string;
  resources: string[];
};

// Compatibility alias
export type ApiDocumentationProps = ApiDocumentationPropsType;

function CodeBlock({ children, copyable = true }: { children: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [children]);

  return (
    <div className="relative p-3.5 bg-muted/60 rounded-lg border border-border">
      <pre className="font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
        {children}
      </pre>
      {copyable && (
        <div className="absolute top-2 right-2">
          <s-button variant="tertiary" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </s-button>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">{title}</span>
          {badge && <s-badge tone="info">{badge}</s-badge>}
        </div>
        <span className="text-xs text-muted-foreground font-medium">{open ? "Hide" : "Show"}</span>
      </button>

      {open && <div className="space-y-3 pt-2 border-t border-border">{children}</div>}
    </div>
  );
}

export const ApiDocumentation = ({
  apiBaseUrl,
  resources,
}: ApiDocumentationPropsType): JSX.Element => {
  const ct = useCommonsT();
  const baseUrl = apiBaseUrl.replace(/\/$/, "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-foreground">{ct("commons.api_docs.title")}</h3>
          <p className="text-xs text-muted-foreground">{ct("commons.api_docs.subtitle")}</p>
        </div>
        <a
          href={`${baseUrl}/docs`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary font-semibold underline"
        >
          {ct("commons.api_docs.view_full_docs")} →
        </a>
      </div>

      <Section title={ct("commons.api_docs.authentication")} defaultOpen>
        <p className="text-xs text-muted-foreground">{ct("commons.api_docs.auth_desc")}</p>
        <CodeBlock>{`Authorization: Bearer mak_your_token_here`}</CodeBlock>
      </Section>

      <Section
        title={ct("commons.api_docs.endpoints")}
        defaultOpen
        badge={`${resources.length} ${ct("commons.api_docs.available")}`}
      >
        <div className="space-y-3">
          {resources.map((resource) => (
            <div key={resource} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <s-badge tone="success">GET</s-badge>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {`/v1/${resource}`}
                </span>
              </div>
              <CodeBlock>
                {`curl -H "Authorization: Bearer mak_your_token" \\\n  "${baseUrl}/v1/${resource}?page=1&page_size=25"`}
              </CodeBlock>
            </div>
          ))}
        </div>
      </Section>

      <Section title={ct("commons.api_docs.pagination")}>
        <p className="text-xs text-muted-foreground">{ct("commons.api_docs.pagination_desc")}</p>
        <CodeBlock>
          {`# Pagination
?page=1&page_size=25

# Filtering
?status=COMPLETED
?archived=false`}
        </CodeBlock>
      </Section>

      <Section title={ct("commons.api_docs.response_format")}>
        <p className="text-xs text-muted-foreground">
          {ct("commons.api_docs.response_format_desc")}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <s-badge tone="success">{ct("commons.api_docs.success")}</s-badge>
          </div>
          <CodeBlock>
            {`{
  "data": [...],
  "meta": {
    "page": 1,
    "pageSize": 25,
    "total": 47
  }
}`}
          </CodeBlock>
          <div className="flex items-center gap-2 pt-2">
            <s-badge tone="critical">{ct("commons.api_docs.error")}</s-badge>
          </div>
          <CodeBlock>
            {`{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired API token",
    "status": 401
  }
}`}
          </CodeBlock>
        </div>
      </Section>

      <Section title={ct("commons.api_docs.rate_limits")}>
        <p className="text-xs text-muted-foreground">{ct("commons.api_docs.rate_limits_desc")}</p>
        <CodeBlock copyable={false}>
          {`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1708451520`}
        </CodeBlock>
      </Section>
    </div>
  );
};

export default ApiDocumentation;
