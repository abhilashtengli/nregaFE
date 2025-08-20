import { Base_Url } from "@/lib/constant";
import { useAuthStore } from "@/stores/userAuthStore";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type PaperNotificationData = {
  district: string;
  taluka: string;
  gramPanchayat: string;
  workName: string;
  year: string;
  date: string;
  quotationAmount: string;
  fromDate: string;
  toDate: string;
  prebidMeetingDate: string;
  documentSubmissionDate: string;
  envelopeOpeningDetails: string;
};

const fetchPaperNotification = async (
  id: string
): Promise<ServiceResponse<PaperNotificationData>> => {
  const { logout } = useAuthStore.getState();
  try {
    const response = await axios.get(
      `${Base_Url}/get-paper-notification/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: PaperNotificationData = {
      district: apiData.district,
      taluka: apiData.taluka,
      gramPanchayat: apiData.gramPanchayat,
      workName: apiData.workName,
      year: apiData.year,
      date: apiData.date,
      quotationAmount: apiData.quotationAmount,
      fromDate: apiData.fromDate,
      toDate: apiData.toDate,
      prebidMeetingDate: apiData.prebidMeetingDate,
      documentSubmissionDate: apiData.documentSubmissionDate,
      envelopeOpeningDetails: apiData.envelopeOpeningDetails
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch paper notification data.";

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

export const useFetchPaperNotification = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<PaperNotificationData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchPaperNotification(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch paper notification");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
