import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkDetail = {
  id: string; // Added id field
  workDocumentId: string; // Added workDocumentId field
  workCode: string;
  district: string;
  block: string;
  panchayat: string;
  workName: string;
  workCategory: string;
  workType: string;
  workStatus: string;
  implementingAgency: string;
  financialYear: string;
  sanctionYear: string;
  workStartDate: string;
  estimatedCost: number;
  actualExpenditure: number;
  estimatedPersonDays: number;
  actualPersonDays: number;
};

type WorkStoreType = {
  vendorName: string | null;
  vendorGstNo: string | null;
  workDetail: WorkDetail | null;
  setWork: (data: {
    vendorName: string;
    vendorGstNo: string;
    workDetail: WorkDetail;
  }) => void;
  clearWork: () => void;
};

export const useWorkStore = create<WorkStoreType>()(
  persist(
    (set, get) => ({
      vendorName: null,
      vendorGstNo: null,
      workDetail: null,
      setWork: (data) => {
        if (get().workDetail) {
          console.warn("A work task is already active. Please clear it first.");
          return;
        }
        set({
          vendorName: data.vendorName,
          vendorGstNo: data.vendorGstNo,
          workDetail: data.workDetail
        });
      },
      clearWork: () =>
        set({
          vendorName: null,
          vendorGstNo: null,
          workDetail: null
        })
    }),
    {
      name: "work-store",
      partialize: (state) => ({
        vendorName: state.vendorName,
        vendorGstNo: state.vendorGstNo,
        workDetail: state.workDetail
      })
    }
  )
);
