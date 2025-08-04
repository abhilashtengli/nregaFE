import { create } from "zustand";
import { persist } from "zustand/middleware";

type VendorUpdateStoreType = {
  hasVendorUpdate: boolean;
  setVendorUpdate: (value: boolean) => void;
  toggleVendorUpdate: () => void;
  clearVendorUpdate: () => void;
};

export const useVendorUpdateStore = create<VendorUpdateStoreType>()(
  persist(
    (set, get) => ({
      hasVendorUpdate: false,
      setVendorUpdate: (value) => {
        set({ hasVendorUpdate: value });
      },
      toggleVendorUpdate: () => {
        set({ hasVendorUpdate: !get().hasVendorUpdate });
      },
      clearVendorUpdate: () => {
        set({ hasVendorUpdate: false });
      }
    }),
    {
      name: "vendor-update-store",
      partialize: (state) => ({
        hasVendorUpdate: state.hasVendorUpdate
      })
    }
  )
);
