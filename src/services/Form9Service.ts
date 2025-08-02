import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import { subtractDays } from "@/utils/substractDays";
import axios from "axios";
import { toast } from "sonner";

// Types
export type ApplicantData = {
  slNo: number;
  applicantName: string;
  jobCardNo: string;
  workFrom: string;
  workTo: string;
  childCareRequired: string;
  signature: string;
};

export type Form9PropsData = {
  gramPanchayat?: string;
  workCode?: string;
  workName?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

export type Form9Data = {
  form9Data: Form9PropsData;
};

// API Fetcher
const fetchForm9 = async (id: string): Promise<ServiceResponse<Form9Data>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-form6/${id}`); // Replace with correct endpoint if different

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: Form9Data = {
      form9Data: {
        gramPanchayat: apiData.gramPanchayat,
        workCode: apiData.workCode,
        workName: apiData.workName,
        taluka: apiData.taluka,
        district: apiData.district,
        date: subtractDays(apiData.date, 2),
        applicationNumber: apiData.applicationNumber,
        applicantsData: apiData.applicantsData?.map(
          (applicant: ApplicantData) => ({
            slNo: applicant.slNo,
            applicantName: applicant.applicantName,
            jobCardNo: applicant.jobCardNo,
            workFrom: applicant.workFrom,
            workTo: applicant.workTo,
            childCareRequired: applicant.childCareRequired,
            signature: applicant.signature
          })
        )
      }
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch Form9 data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

// Hook
export const useFetchForm9Data = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<Form9Data | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchForm9(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
