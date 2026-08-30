import { create } from "zustand";
import type { CursorModeType } from "@/types";

type PortfolioStoreType = {
  // Cursor
  cursorMode: CursorModeType;
  cursorText: string;
  setCursorMode: (mode: CursorModeType, text?: string) => void;
  resetCursor: () => void;

  // Contact modal
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  toggleContact: () => void;

  // Booking modal
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  toggleBooking: () => void;

  // Active section
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export const usePortfolioStore = create<PortfolioStoreType>((set) => ({
  cursorMode: "default",
  cursorText: "",
  setCursorMode: (mode, text = "") => set({ cursorMode: mode, cursorText: text }),
  resetCursor: () => set({ cursorMode: "default", cursorText: "" }),

  isContactOpen: false,
  openContact: () => set({ isContactOpen: true }),
  closeContact: () => set({ isContactOpen: false }),
  toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen })),

  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true }),
  closeBooking: () => set({ isBookingOpen: false }),
  toggleBooking: () => set((state) => ({ isBookingOpen: !state.isBookingOpen })),

  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
}));
