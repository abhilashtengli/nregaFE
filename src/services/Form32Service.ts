import axios from "axios";
import { Base_Url } from "@/lib/constant";
import type { ServiceResponse } from "@/types/types";
import { useWorkStore } from "@/stores/workStore";
import { toast } from "sonner";

// Types
type materialData = {
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
};
export type Form32Props = {
  vendorName?: string;
  district?: string;
  taluka?: string;
  materialData?: {
    material: string;
    unitPrice: string;
    quantity: string;
    amount: string;
  }[];
};

export type Form32Data = {
  form32Data: Form32Props;
};

// API Fetcher
const fetchForm32 = async (
  id: string
): Promise<ServiceResponse<Form32Props>> => {
  try {
    const response = await axios.get(`${Base_Url}/form-32/${id}`);

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: Form32Props = {
      vendorName: apiData.vendorName,
      district: apiData.district,
      taluka: apiData.taluka,
      materialData:
        apiData.materialData?.map((item: materialData) => ({
          material: item.material,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          amount: item.amount
        })) ?? []
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch Form 32 data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

// Hook to use inside components
export const useFetchForm32Data = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<Form32Props | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work ID", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchForm32(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch Form 32 data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
