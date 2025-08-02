// src/services/form6/fetchForm6.ts

import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import { subtractDays } from "@/utils/substractDays";
import axios from "axios";
import { toast } from "sonner";

export type Form6Applicant = {
  slNo: number;
  applicantName: string;
  jobCardNo: string;
  workFrom: string;
  workTo: string;
  childCareRequired: string;
  signature: string;
};

export type Form6Data = {
  workCode: string;
  workName: string;
  gramPanchayat: string;
  taluka: string;
  district: string;
  date: string;
  applicationNumber: string;
  applicantsData: Form6Applicant[];
};

const fetchForm6Data = async (
  id: string
): Promise<ServiceResponse<Form6Data>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-form6/${id}`);

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided work code"
      };
    }

    const formattedData: Form6Data = {
      workCode: apiData.workCode,
      workName: apiData.workName,
      gramPanchayat: apiData.gramPanchayat,
      taluka: apiData.taluka,
      district: apiData.district,
      date: subtractDays(apiData.date, 3),
      applicationNumber: apiData.applicationNumber,
      applicantsData: apiData.applicantsData
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch Form 6 data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchForm6Data = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<Form6Data | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work code found", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchForm6Data(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch Form 6 data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
