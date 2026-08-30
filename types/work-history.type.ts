export type WorkHistoryItemType = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  isCurrent?: boolean;
};
