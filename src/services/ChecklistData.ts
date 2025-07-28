// src/services/checklist/fetchWorkData.ts

import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type ChecklistWorkData = {
  workCode: string;
  workName: string;
  sanctionYear: string;
  panchayat: string;
  block: string;
};

export const fetchCheckListData = async (
  id: string
): Promise<ServiceResponse<ChecklistWorkData>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-checklist/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No work data found for the provided ID"
      };
    }

    const formattedData: ChecklistWorkData = {
      workCode: apiData.workCode || "",
      workName: apiData.workName || "",
      sanctionYear: apiData.sanctionYear || "",
      panchayat: apiData.panchayat || "",
      block: apiData.block || ""
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch work data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchCheckListData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<ChecklistWorkData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchCheckListData(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
