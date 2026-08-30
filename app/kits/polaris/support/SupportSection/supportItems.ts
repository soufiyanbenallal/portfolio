export type SupportItemType = {
  id: string;
  title: string;
  icon: string;
};

export const supportItems: SupportItemType[] = [
  {
    id: "book_consultation",
    title: "Book a Free consultation",
    icon: "🤝",
  },
  {
    id: "help_center",
    title: "Help Center",
    icon: "💬",
  },
  {
    id: "request_feature",
    title: "Feature or Issue Reporting",
    icon: "🛠",
  },
  {
    id: "our_apps",
    title: "See More Apps",
    icon: "📱",
  },
  {
    id: "rate_us",
    title: "Rate Us",
    icon: "⭐",
  },
];

export default supportItems;
