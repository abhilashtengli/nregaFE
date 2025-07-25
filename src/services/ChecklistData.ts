// src/services/checklist/fetchWorkData.ts

import { Base_Url } from "@/lib/constant";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";

export type WorkData = {
  id: string;
  workCode: string;
  workName: string;
  sanctionYear: string;
  panchayat: string;
  block: string;
};

export const fetchWorkData = async (
  id: string
): Promise<ServiceResponse<WorkData>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-ts-copy/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No work data found for the provided ID"
      };
    }

    const formattedData: WorkData = {
      id: id,
      workCode: apiData.workCode || "",
      workName: apiData.workName || "",
      sanctionYear: apiData.financialYear || "",
      panchayat: apiData.gramPanchayat || "",
      block: apiData.blockPanchayat || ""
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
