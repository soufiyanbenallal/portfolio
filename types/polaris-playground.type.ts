export type PolarisCategoryIdType =
  "dashboard" | "forms" | "actions" | "feedback" | "tables" | "layout";

export type PolarisButtonToneType = "auto" | "critical" | "neutral";

export type PolarisBannerToneType = "auto" | "success" | "warning" | "critical" | "info";

export type PolarisBadgeToneType = "auto" | "success" | "warning" | "critical" | "info";

export type PolarisButtonVariantType = "primary" | "secondary" | "tertiary" | "auto";

export type PolarisCategoryItemType = {
  id: PolarisCategoryIdType;
  label: string;
  description: string;
  iconName: string;
  badgeCount: number;
};

export type PolarisComponentDocType = {
  id: string;
  tag: string;
  name: string;
  category: PolarisCategoryIdType;
  description: string;
  docsUrl: string;
  propsList: string[];
  snippetTsx: string;
  snippetHtml: string;
};

export type PolarisPropsConfigType = {
  buttonTone: PolarisButtonToneType;
  buttonVariant: PolarisButtonVariantType;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  bannerTone: PolarisBannerToneType;
  bannerDismissible: boolean;
  badgeTone: PolarisBadgeToneType;
  switchChecked: boolean;
  formInputTitle: string;
  formInputPrice: number;
  formInputCategory: string;
  formInputStatus: string;
  selectedColor: string;
};

export type PolarisPlaygroundStateType = {
  activeCategory: PolarisCategoryIdType;
  searchQuery: string;
  selectedComponentId: string | null;
  codeFormat: "tsx" | "html";
  copiedCode: boolean;
  propsConfig: PolarisPropsConfigType;
  setActiveCategory: (category: PolarisCategoryIdType) => void;
  setSearchQuery: (query: string) => void;
  setSelectedComponentId: (id: string | null) => void;
  setCodeFormat: (format: "tsx" | "html") => void;
  setCopiedCode: (copied: boolean) => void;
  updatePropsConfig: (updates: Partial<PolarisPropsConfigType>) => void;
  resetPropsConfig: () => void;
};
