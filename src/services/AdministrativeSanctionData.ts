// src/services/administrativeSanction/fetchAdministrativeSanction.ts

import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type AdministrativeSanctionData = {
  administrativeSanctionDate: string;
  workCode: string;
  financialYear: string;
  workName: string;
  gramPanchayat: string;
  blockPanchayat: string;
  sanctionedAmount: string;
  sanctionedAmountInWords: string;
  technicalSanctionNo: string;
  unskilledLabourCharges: string;
  estimateMaterialCost: string;
  estimatePersonDays: string;
};

const fetchAdministrativeSanction = async (
  id: string
): Promise<ServiceResponse<AdministrativeSanctionData>> => {
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

    const formattedData: AdministrativeSanctionData = {
      administrativeSanctionDate: apiData.administrativeSanctionDate,
      workCode: apiData.workCode,
      financialYear: apiData.financialYear,
      workName: apiData.workName,
      gramPanchayat: apiData.gramPanchayat,
      blockPanchayat: apiData.blockPanchayat,
      sanctionedAmount: apiData.sanctionedAmount,
      sanctionedAmountInWords: apiData.sanctionedAmountInWords,
      technicalSanctionNo: apiData.technicalSanctionNo,
      unskilledLabourCharges: apiData.unskilledLabourCharges,
      estimateMaterialCost: apiData.estimateMaterialCost,
      estimatePersonDays: apiData.estimatePersonDays
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch administrative sanction data.";

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

export const useFetchASCopyData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<AdministrativeSanctionData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchAdministrativeSanction(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
