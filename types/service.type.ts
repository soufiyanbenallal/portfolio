export type TechStackItemType = {
  id: string;
  name: string;
  category: string;
  iconName: string;
  tooltipText: string;
  order: number;
};

export type ServiceItemType = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  isPrimary?: boolean;
  order: number;
};
