// src/services/administrativeSanction/fetchAdministrativeSanction.ts

import { Base_Url } from "@/lib/constant";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";

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

export const fetchAdministrativeSanction = async (
  id: string
): Promise<ServiceResponse<AdministrativeSanctionData>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-ts-copy/${id}`);

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
    }

    return {
      success: false,
      message
    };
  }
};
