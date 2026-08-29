import { create } from "zustand";
import type {
  PolarisCategoryIdType,
  PolarisPlaygroundStateType,
  PolarisPropsConfigType,
} from "@/types";

const initialPropsConfig: PolarisPropsConfigType = {
  buttonTone: "auto",
  buttonVariant: "primary",
  buttonLoading: false,
  buttonDisabled: false,
  bannerTone: "info",
  bannerDismissible: true,
  badgeTone: "success",
  switchChecked: true,
  formInputTitle: "Wireless Noise-Canceling Headphones",
  formInputPrice: 249.99,
  formInputCategory: "electronics",
  formInputStatus: "active",
  selectedColor: "#2563EB",
};

export const usePolarisPlaygroundStore = create<PolarisPlaygroundStateType>(
  (set) => ({
    activeCategory: "dashboard",
    searchQuery: "",
    selectedComponentId: null,
    codeFormat: "tsx",
    copiedCode: false,
    propsConfig: initialPropsConfig,

    setActiveCategory: (activeCategory: PolarisCategoryIdType) =>
      set({ activeCategory, selectedComponentId: null }),

    setSearchQuery: (searchQuery: string) => set({ searchQuery }),

    setSelectedComponentId: (selectedComponentId: string | null) =>
      set({ selectedComponentId }),

    setCodeFormat: (codeFormat: "tsx" | "html") => set({ codeFormat }),

    setCopiedCode: (copiedCode: boolean) => set({ copiedCode }),

    updatePropsConfig: (updates: Partial<PolarisPropsConfigType>) =>
      set((state) => ({
        propsConfig: { ...state.propsConfig, ...updates },
      })),

    resetPropsConfig: () => set({ propsConfig: initialPropsConfig }),
  }),
);
