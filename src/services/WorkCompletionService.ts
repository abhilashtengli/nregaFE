import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

// Types
export type WorkCompletion = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  administrativeSanctionNo: string;
  workStartDate: string;
  wage: string;
  material: string;
  total: string;
};

const fetchWorkCompletionData = async (
  id: string
): Promise<ServiceResponse<WorkCompletion>> => {
  try {
    const response = await axios.get(`${Base_Url}/work-completion/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No work completion data found for the provided ID"
      };
    }

    const formattedData: WorkCompletion = {
      gramPanchayat: apiData.gramPanchayat,
      taluka: apiData.taluka,
      district: apiData.district,
      year: apiData.year,
      workCode: apiData.workCode,
      workName: apiData.workName,
      administrativeSanctionNo: apiData.administrativeSanctionNo,
      workStartDate: apiData.workStartDate,
      wage: apiData.wage,
      material: apiData.material,
      total: apiData.total
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch work completion data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchWorkCompletion = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<WorkCompletion | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchWorkCompletionData(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch work completion data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
