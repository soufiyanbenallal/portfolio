import { useState, useCallback, useEffect } from "react";
import { useFetcher } from "react-router";
import { useCommonsT, getCommonsLocale } from "~/commons/providers";
import { formatCount, formatDateTime, useHydrated } from "~/commons/utils/intl";

export type ApiTokenModelType = {
  id: number;
  name: string;
  tokenPrefix: string;
  isActive: boolean;
  scopes: string[];
  lastUsedAt: string | null;
  expiresAt: string | null;
  requestCount: number;
  createdAt: string;
  revokedAt: string | null;
};

export type ApiTokenManagerPropsType = {
  tokens: ApiTokenModelType[];
  isInline?: boolean;
};

export const ApiTokenManager = ({ tokens, isInline }: ApiTokenManagerPropsType): JSX.Element => {
  const ct = useCommonsT();
  const hydrated = useHydrated();
  const fetcher = useFetcher<any>();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState<number | null>(null);
  const [tokenName, setTokenName] = useState("Default");
  const [newRawToken, setNewRawToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInlineGenerate, setShowInlineGenerate] = useState(false);

  const activeTokens = tokens.filter((t) => t.isActive && !t.revokedAt);
  const revokedTokens = tokens.filter((t) => !t.isActive || t.revokedAt);

  const handleGenerate = useCallback(() => {
    fetcher.submit(
      { intent: "generate", name: tokenName },
      { method: "POST", action: "/app/api/merchant-api/tokens" }
    );
    setShowGenerateModal(false);
    setShowInlineGenerate(false);
  }, [fetcher, tokenName]);

  useEffect(() => {
    if (fetcher.data?.success && fetcher.data?.token?.rawToken) {
      setNewRawToken(fetcher.data.token.rawToken);
      if (!isInline) {
        setShowTokenModal(true);
      }
      setTokenName("Default");
    }
  }, [fetcher.data, isInline]);

  const handleRevoke = useCallback(
    (tokenId: number) => {
      fetcher.submit(
        { intent: "revoke", tokenId: String(tokenId) },
        { method: "POST", action: "/app/api/merchant-api/tokens" }
      );
      setShowRevokeConfirm(null);
    },
    [fetcher]
  );

  const handleCopy = useCallback(async () => {
    if (newRawToken) {
      await navigator.clipboard.writeText(newRawToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [newRawToken]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ct("commons.api.date_never");
    return formatDateTime(
      dateStr,
      { month: "short", day: "numeric", year: "numeric" },
      { locale: getCommonsLocale() === "fr" ? "fr-FR" : "en-US" }
    );
  };

  const formatRelativeDate = (dateStr: string | null) => {
    if (!dateStr) return ct("commons.api.date_never");
    if (!hydrated) return formatDate(dateStr);
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return ct("commons.api.date_today");
    if (diffDays === 1) return ct("commons.api.date_yesterday");
    if (diffDays < 30) return ct("commons.api.date_days_ago", { days: diffDays });
    return formatDate(dateStr);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-foreground text-base font-bold">{ct("commons.api.tokens")}</h3>
          <p className="text-muted-foreground text-xs">
            {ct("commons.api.tokens_active", { count: activeTokens.length })}
          </p>
        </div>
        <s-button
          variant="primary"
          disabled={activeTokens.length >= 3}
          onClick={() => {
            if (isInline) {
              setShowInlineGenerate(true);
            } else {
              setShowGenerateModal(true);
            }
          }}
        >
          {ct("commons.api.generate")}
        </s-button>
      </div>

      {/* Inline Generate Form */}
      {showInlineGenerate ? (
        <div className="bg-muted/50 border-border space-y-3 rounded-xl border p-4">
          <span className="text-foreground text-sm font-semibold">
            {ct("commons.api.generate_new")}
          </span>
          <s-text-field
            label={ct("commons.api.token_name")}
            value={tokenName}
            onInput={(e: any) => setTokenName(e.target.value)}
            placeholder={ct("commons.api.token_name_placeholder")}
            required
          />
          <div className="flex items-center gap-2">
            <s-button
              variant="primary"
              onClick={handleGenerate}
              loading={fetcher.state === "submitting"}
            >
              {ct("commons.api.generate_btn")}
            </s-button>
            <s-button variant="secondary" onClick={() => setShowInlineGenerate(false)}>
              {ct("commons.cancel")}
            </s-button>
          </div>
        </div>
      ) : newRawToken && isInline ? (
        <div className="space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <s-banner tone="warning" heading={ct("commons.api.your_new_token")}>
            {ct("commons.api.copy_warning")}
          </s-banner>

          <div className="bg-card border-border flex items-center justify-between gap-3 rounded-lg border p-3">
            <span className="text-foreground font-mono text-sm break-all select-all">
              {newRawToken}
            </span>
            <s-button variant="primary" onClick={handleCopy}>
              {copied ? ct("commons.copied") : ct("commons.copy")}
            </s-button>
          </div>

          <div className="flex justify-end">
            <s-button
              variant="secondary"
              onClick={() => {
                setNewRawToken(null);
                setCopied(false);
              }}
            >
              {ct("commons.done")}
            </s-button>
          </div>
        </div>
      ) : showRevokeConfirm !== null && isInline ? (
        <div className="bg-destructive/10 border-destructive/30 space-y-3 rounded-xl border p-4">
          <h4 className="text-foreground text-sm font-bold">{ct("commons.api.revoke")}</h4>
          <p className="text-foreground text-sm">{ct("commons.api.revoke_confirm")}</p>
          <p className="text-muted-foreground text-xs">{ct("commons.api.revoke_warning")}</p>
          <div className="flex items-center gap-2">
            <s-button
              variant="primary"
              tone="critical"
              onClick={() => handleRevoke(showRevokeConfirm)}
              loading={fetcher.state === "submitting"}
            >
              {ct("commons.api.revoke_btn")}
            </s-button>
            <s-button variant="secondary" onClick={() => setShowRevokeConfirm(null)}>
              {ct("commons.cancel")}
            </s-button>
          </div>
        </div>
      ) : (
        <>
          {/* Empty State */}
          {activeTokens.length === 0 && (
            <div className="border-border space-y-3 rounded-xl border border-dashed p-6 text-center">
              <h4 className="text-foreground text-sm font-bold">{ct("commons.api.no_tokens")}</h4>
              <p className="text-muted-foreground text-xs">{ct("commons.api.no_tokens_desc")}</p>
              <s-button
                variant="primary"
                onClick={() => {
                  if (isInline) {
                    setShowInlineGenerate(true);
                  } else {
                    setShowGenerateModal(true);
                  }
                }}
              >
                {ct("commons.api.generate_first")}
              </s-button>
            </div>
          )}

          {/* Active Tokens List */}
          {activeTokens.map((token) => (
            <div
              key={token.id}
              className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-600">
                    API
                  </div>
                  <div>
                    <h4 className="text-foreground text-sm font-semibold">{token.name}</h4>
                    <span className="text-muted-foreground font-mono text-xs">
                      {`${token.tokenPrefix}...`}
                    </span>
                  </div>
                </div>

                <s-button
                  variant="tertiary"
                  tone="critical"
                  onClick={() => setShowRevokeConfirm(token.id)}
                >
                  {ct("commons.api.revoke_btn")}
                </s-button>
              </div>

              <div className="bg-muted/40 grid grid-cols-3 gap-2 rounded-lg p-2.5 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    {ct("commons.api.col_created")}
                  </span>
                  <span className="text-foreground font-medium">{formatDate(token.createdAt)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    {ct("commons.api.col_last_used")}
                  </span>
                  <span className="text-foreground font-medium">
                    {formatRelativeDate(token.lastUsedAt)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    {ct("commons.api.col_requests")}
                  </span>
                  <span className="text-foreground font-medium">
                    {formatCount(token.requestCount)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Revoked Tokens List */}
          {revokedTokens.length > 0 && (
            <div className="border-border space-y-2 border-t pt-2">
              <span className="text-muted-foreground text-xs">
                {ct("commons.api.previously_revoked", {
                  count: revokedTokens.length,
                })}
              </span>
              {revokedTokens.map((token) => (
                <div
                  key={token.id}
                  className="bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border p-2.5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-medium line-through">
                      {token.name}
                    </span>
                    <s-badge tone="auto">{`${token.tokenPrefix}...`}</s-badge>
                  </div>
                  <span className="text-muted-foreground">{formatDate(token.revokedAt)}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Generate Modal */}
      {showGenerateModal && (
        <s-modal
          id="generate-token-modal"
          heading={ct("commons.api.generate_new")}
          onHide={() => setShowGenerateModal(false)}
        >
          <div className="max-w-md space-y-4 p-5">
            <p className="text-muted-foreground text-xs">{ct("commons.api.token_name_help")}</p>
            <s-text-field
              label={ct("commons.api.token_name")}
              value={tokenName}
              onInput={(e: any) => setTokenName(e.target.value)}
              placeholder={ct("commons.api.token_name_placeholder")}
              required
            />
            <div className="border-border flex items-center justify-end gap-3 border-t pt-3">
              <s-button variant="secondary" onClick={() => setShowGenerateModal(false)}>
                {ct("commons.cancel")}
              </s-button>
              <s-button
                variant="primary"
                onClick={handleGenerate}
                loading={fetcher.state === "submitting"}
              >
                {ct("commons.api.generate_btn")}
              </s-button>
            </div>
          </div>
        </s-modal>
      )}

      {/* Show New Token Modal */}
      {showTokenModal && (
        <s-modal
          id="show-token-modal"
          heading={ct("commons.api.your_new_token")}
          onHide={() => {
            setShowTokenModal(false);
            setNewRawToken(null);
            setCopied(false);
          }}
        >
          <div className="max-w-lg space-y-4 p-5">
            <s-banner tone="warning">{ct("commons.api.copy_warning")}</s-banner>
            <div className="bg-muted text-foreground border-border rounded-lg border p-3 font-mono text-sm break-all select-all">
              {newRawToken}
            </div>
            <div className="border-border flex items-center justify-between gap-3 border-t pt-3">
              <s-button variant="primary" onClick={handleCopy}>
                {copied ? ct("commons.copied") : ct("commons.api.copy_token")}
              </s-button>
              <s-button
                variant="secondary"
                onClick={() => {
                  setShowTokenModal(false);
                  setNewRawToken(null);
                  setCopied(false);
                }}
              >
                {ct("commons.done")}
              </s-button>
            </div>
          </div>
        </s-modal>
      )}

      {/* Revoke Modal */}
      {!isInline && showRevokeConfirm !== null && (
        <s-modal
          id="revoke-token-modal"
          heading={ct("commons.api.revoke")}
          onHide={() => setShowRevokeConfirm(null)}
        >
          <div className="max-w-md space-y-3 p-5">
            <p className="text-foreground text-sm">{ct("commons.api.revoke_confirm")}</p>
            <p className="text-muted-foreground text-xs">{ct("commons.api.revoke_warning")}</p>
            <div className="border-border flex items-center justify-end gap-3 border-t pt-3">
              <s-button variant="secondary" onClick={() => setShowRevokeConfirm(null)}>
                {ct("commons.cancel")}
              </s-button>
              <s-button
                variant="primary"
                tone="critical"
                loading={fetcher.state === "submitting"}
                onClick={() => handleRevoke(showRevokeConfirm)}
              >
                {ct("commons.api.revoke_btn")}
              </s-button>
            </div>
          </div>
        </s-modal>
      )}
    </div>
  );
};

export default ApiTokenManager;
