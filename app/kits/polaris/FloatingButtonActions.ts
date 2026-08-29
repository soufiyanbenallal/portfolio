import { commonsT } from "~/commons/providers";

export const INITIAL_TICKET_FORM = {
  contactEmail: "",
  title: "",
  description: "",
  images: [] as any[],
  type: "question",
};

export function svgIcon(bg: string, emoji: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><rect width="70" height="70" rx="14" fill="${bg}"/><text x="35" y="48" font-size="30" text-anchor="middle" font-family="system-ui,sans-serif">${emoji}</text></svg>`
  )}`;
}

export type FloatingItem = {
  icon: string;
  title: string;
  subtitle: string;
  url?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function getFloatingItems(
  onOpenTicket: (type: string) => void,
  extraItems: FloatingItem[] = []
): FloatingItem[] {
  return [
    ...extraItems,
    {
      icon: svgIcon("#FFF3E0", "📅"),
      title: commonsT("commons.help.book_call"),
      subtitle: commonsT("commons.help.book_call_sub"),
      url: "https://koalendar.com/e/meet-with-mohamed-xco-agency",
    },
    {
      icon: svgIcon("#E0F7FA", "🟢"),
      title: commonsT("commons.help.live_chat"),
      subtitle: commonsT("commons.help.live_chat_sub"),
      disabled: true,
      onClick: () => {
        const api = (window as any).Tawk_API;
        if (api) {
          api.showWidget();
          api.maximize();
        }
      },
    },
    {
      icon: svgIcon("#FFEBEE", "🐛"),
      title: commonsT("commons.help.report_issue"),
      subtitle: commonsT("commons.help.report_issue_sub"),
      onClick: () => onOpenTicket("bug"),
    },
    {
      icon: svgIcon("#E8EAF6", "💡"),
      title: commonsT("commons.help.request_feature"),
      subtitle: commonsT("commons.help.request_feature_sub"),
      onClick: () => onOpenTicket("feature"),
    },
  ];
}
