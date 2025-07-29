// src/services/wlfto/fetchWLFTO.ts

import axios from "axios";
import { toast } from "sonner";
import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";

// src/types/wlfto.ts

export type FTOApplicantData = {
  slNo: number;
  jobCardNo: string;
  applicantNo: number;
  applicantName: string;
  mustrollNo: string;
  wageListNo: string;
  referenceNo: string;
  ftoNo: string;
  verifyPo: string;
  status: string;
  bankName: string;
  wgApbCrAccount: string;
  favoringAsPerBank: string;
};

export type WLFTODetail = {
  workCode: string;
  workName: string;
  gramPanchayat: string;
  taluka: string;
  district: string;
  ftoData: FTOApplicantData[];
};

const fetchWLFTODetail = async (
  id: string
): Promise<ServiceResponse<WLFTODetail>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-fto/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No FTO data found for the provided ID"
      };
    }

    return {
      success: true,
      data: apiData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch FTO data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchWLFTOData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<WLFTODetail | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchWLFTODetail(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch WL FTO data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
