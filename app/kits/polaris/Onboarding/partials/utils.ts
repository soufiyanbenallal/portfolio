export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/**
 * Builds the Shopify Online Store editor deep link that opens the theme
 * with the app-embed activation panel focused. In production, `shopDomain`
 * and `themeId` come from the authenticated session (e.g. App Bridge /
 * `shop.myshopify.com`), and `appEmbedBlockHandle` is the block handle
 * declared in the app's `blocks/*.liquid` theme extension.
 */
export function getThemeEditorDeepLink(
  shopDomain: string,
  themeId: string,
  appEmbedBlockHandle: string
): string {
  const params = new URLSearchParams({
    context: 'apps',
    activateAppId: `${appEmbedBlockHandle}/journeva-embed`,
  });
  return `https://${shopDomain}/admin/themes/${themeId}/editor?${params.toString()}`;
}
