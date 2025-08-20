import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

// Types
export type MustrollEntry = {
  mustrollNo: string;
  data: {
    fromDate: string;
    toDate: string;
    attendanceUpdateMIS: string;
    workMeasure: string;
    misEntryMeasurement: string;
    ftoDate1: string;
    ftoDate2: string;
  };
};

export type MovementSlipData = {
  workCode: string;
  workName: string;
  gramPanchayat: string;
  taluka: string;
  district: string;
  mustrollData: MustrollEntry[];
};

// Fetcher
const fetchMovementSlip = async (
  id: string
): Promise<ServiceResponse<MovementSlipData>> => {
  const { logout } = useAuthStore.getState();

  try {
    const response = await axios.get(`${Base_Url}/movement-slip/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }); // replace with correct endpoint if needed

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: MovementSlipData = {
      workCode: apiData.workCode,
      workName: apiData.workName,
      gramPanchayat: apiData.gramPanchayat,
      taluka: apiData.taluka,
      district: apiData.district,
      mustrollData: apiData.mustrollData?.map((entry: MustrollEntry) => ({
        mustrollNo: entry.mustrollNo,
        data: {
          fromDate: entry.data.fromDate,
          toDate: entry.data.toDate,
          attendanceUpdateMIS: entry.data.attendanceUpdateMIS,
          workMeasure: entry.data.workMeasure,
          misEntryMeasurement: entry.data.misEntryMeasurement,
          ftoDate1: entry.data.ftoDate1,
          ftoDate2: entry.data.ftoDate2
        }
      }))
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch movement slip data.";

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

// Hook
export const useFetchMovementSlip = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<MovementSlipData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchMovementSlip(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch movement slip data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
