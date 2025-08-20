// src/services/materialMis/fetchMaterialMis.ts

import { Base_Url } from "@/lib/constant";
import axios from "axios";
import type { ServiceResponse } from "@/types/types";

import { useWorkStore } from "@/stores/workStore";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/userAuthStore";

// Match expected PDF types
export interface Material {
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
  billNo: string;
  billAmount: string;
  billDate: string;
  dateOfPayment: string;
}

export interface MaterialMisData {
  workCode: string;
  vendorName: string;
  financialYear: string;
  materialData: Material[];
  workName: string;
  materialVoucherInfo: {
    vendorName: string;
    financialYear: string;
  };
}

export const fetchMaterialMisData = async (
  id: string
): Promise<ServiceResponse<MaterialMisData>> => {
  const { logout } = useAuthStore.getState();
  try {
    const res = await axios.get(`${Base_Url}/material-mis-perfect/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });

    const apiData = res.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No material MIS data found."
      };
    }

    const formattedData: MaterialMisData = {
      workCode: apiData.workCode,
      vendorName: apiData.vendorName,
      financialYear: apiData.financialYear,
      workName: apiData.workName,
      materialData: apiData.materialData.map((item: Material) => ({
        material: item.material,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        amount: item.amount,
        billNo: item.billNo,
        billAmount: item.billAmount,
        billDate: item.billDate,
        dateOfPayment: item.dateOfPayment
      })),
      materialVoucherInfo: {
        vendorName: apiData.vendorName,
        financialYear: apiData.financialYear
      }
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch material MIS data.";

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

export const useFetchMaterialMIS = () => {
  const { workDetail } = useWorkStore();

  const fetch = async () => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work code found");
      return null;
    }

    const res = await fetchMaterialMisData(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch material MIS");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
