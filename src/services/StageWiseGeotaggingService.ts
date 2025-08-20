import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

// Type for the data returned by API
export type StagewiseGeoTaggingData = {
  workCode: string;
  workName: string;
  financialYear: string;
  district: string;
  taluka: string;
  gramPanchayat: string;
  beforeStageImageUrl: string;
  duringStageImageUrl: string;
  afterStageImageUrl: string;
};

// Actual API fetch logic
const fetchStagewiseGeoTagging = async (
  id: string
): Promise<ServiceResponse<StagewiseGeoTaggingData>> => {
  const { logout } = useAuthStore.getState();
  try {
    const response = await axios.get(`${Base_Url}/get-stage-wise-photos/${id}`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID",
      };
    }

    const formattedData: StagewiseGeoTaggingData = {
      workCode: apiData.workCode,
      workName: apiData.workName,
      financialYear: apiData.financialYear,
      district: apiData.district,
      taluka: apiData.taluka,
      gramPanchayat: apiData.gramPanchayat,
      beforeStageImageUrl: apiData.beforeStageImageUrl,
      duringStageImageUrl: apiData.duringStageImageUrl,
      afterStageImageUrl: apiData.afterStageImageUrl,
    };

    return {
      success: true,
      data: formattedData,
    };
  } catch (error: unknown) {
    let message = "Failed to fetch stage-wise geo tagging data.";

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
      message,
    };
  }
};

// React hook to use this fetcher with state
export const useFetchStagewiseGeoTagging = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<StagewiseGeoTaggingData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work ID found", {
        description: "Please refresh and try again",
      });
      return null;
    }

    const res = await fetchStagewiseGeoTagging(id);

    if (!res?.success) {
      toast.error(res.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
