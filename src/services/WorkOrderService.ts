import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type WorkOrderData = {
  workCode: string;
  workName: string;
  panchayat: string;
  block: string;
  estimatedCost: string;
  date: string;
};

const fetchWorkOrder = async (
  id: string
): Promise<ServiceResponse<WorkOrderData>> => {
  const { logout } = useAuthStore.getState();

  try {
    const response = await axios.get(`${Base_Url}/work-order/${id}`, {
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

    const formattedData: WorkOrderData = {
      workCode: apiData.workCode,
      workName: apiData.workName,
      panchayat: apiData.panchayat,
      block: apiData.block,
      estimatedCost: apiData.estimatedCost,
      date: apiData.date
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch work order data.";

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

export const useFetchWorkOrderData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<WorkOrderData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchWorkOrder(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
