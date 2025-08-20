// src/services/technicalSanction/fetchTSCopy.ts

import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type TSCopyData = {
  workCode: string;
  financialYear: string;
  workName: string;
  gramPanchayat: string;
  blockPanchayat: string;
  estimatePersonDays: string;
  sanctionDate: string;
  sanctionDateFormatted: string;
  technicalSanctionNo: string;
  unskilledLabourCharges: string;
  estimateMaterialCost: string;
  sanctionedAmount: string;
  sanctionedAmountInWords: string;
  administrativeSanctionDate: string;
};

const fetchTSCopy = async (
  id: string
): Promise<ServiceResponse<TSCopyData>> => {
  const { logout } = useAuthStore.getState();
  try {
    const response = await axios.get(`${Base_Url}/get-ts-copy/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: TSCopyData = {
      workCode: apiData.workCode,
      financialYear: apiData.financialYear,
      workName: apiData.workName,
      gramPanchayat: apiData.gramPanchayat,
      blockPanchayat: apiData.blockPanchayat,
      estimatePersonDays: apiData.estimatePersonDays,
      sanctionDate: apiData.sanctionDate,
      sanctionDateFormatted: apiData.sanctionDateFormatted,
      technicalSanctionNo: apiData.technicalSanctionNo,
      unskilledLabourCharges: apiData.unskilledLabourCharges,
      estimateMaterialCost: apiData.estimateMaterialCost,
      sanctionedAmount: apiData.sanctionedAmount,
      sanctionedAmountInWords: apiData.sanctionedAmountInWords,
      administrativeSanctionDate: apiData.administrativeSanctionDate
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch TS Copy data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
      const status = error?.response?.status;
      const data = error?.response?.data;
      if (data.code === "USER_NOT_FOUND" && status === 404) {
        // Handle user not found error
        toast.error("User not found", {
          description: "Please log in to access this feature",
          duration: 4000
        });
        logout();
      }
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchTSCopyData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<TSCopyData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchTSCopy(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch TS Copy data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
