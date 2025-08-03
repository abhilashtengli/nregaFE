// src/services/materialSupplyRegister/fetchMaterialSupplyRegister.ts

import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type MaterialData = {
  materialName: string;
  quantity: string;
};

export type MaterialSupplyRegisterData = {
  workCode: string;
  workName: string;
  vendorName: string;
  materialData: MaterialData[];
};

const fetchMaterialSupplyRegister = async (
  id: string
): Promise<ServiceResponse<MaterialSupplyRegisterData>> => {
  try {
    const response = await axios.get(`${Base_Url}/material-supply/${id}`,{
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

    const formattedData: MaterialSupplyRegisterData = {
      workCode: apiData.workCode,
      workName: apiData.workName,
      vendorName: apiData.vendorName,
      materialData: apiData.materialData,
    };

    return {
      success: true,
      data: formattedData,
    };
  } catch (error: unknown) {
    let message = "Failed to fetch material supply register data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message,
    };
  }
};

export const useFetchMaterialSupplyRegister = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<MaterialSupplyRegisterData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh",
      });
      return null;
    }

    const res = await fetchMaterialSupplyRegister(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
