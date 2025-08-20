// src/services/materialMis/fetchMaterialMis.ts

import { Base_Url } from "@/lib/constant";
import axios from "axios";
import type { ServiceResponse } from "@/types/types";
import { useAuthStore } from "@/stores/userAuthStore";
import { toast } from "sonner";

type InvoiceApiResponse = {
  vendorDetails: {
    vendorNameOne: string;
    vendorGstOne: string;
  };
  workDetails: {
    district: string;
    block: string;
    panchayat: string;
  };
};

// Raw item structure from API
type MaterialItem = {
  billNo: string;
  billAmount: string;
  billDate: string;
  dateOfPayment: string;
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
};

// Structure after transformation
export interface TransformedBill {
  billNo: string;
  billDate: string;
  materialData: {
    material: string;
    unitPrice: string;
    quantity: string;
    amount: string;
  }[];
}

export interface TransformedMaterialMisData {
  workCode: string;
  workName: string;
  bills: TransformedBill[];
}

type ApiResponse = {
  data: {
    workCode: string;
    vendorName: string;
    financialYear: string;
    workName: string;
    materialData: MaterialItem[];
  };
};

// Fetching raw material MIS data
export const fetchMaterialMisDataForInvoice = async (
  id: string
): Promise<ServiceResponse<ApiResponse["data"]>> => {
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

    return {
      success: true,
      data: apiData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch material MIS data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

// Grouping by billNo
export const transformMaterialData = (
  responseData: ApiResponse["data"]
): TransformedMaterialMisData => {
  const { workCode, workName, materialData } = responseData;

  const billMap: Record<
    string,
    {
      billNo: string;
      billDate: string;
      materialData: {
        material: string;
        unitPrice: string;
        quantity: string;
        amount: string;
      }[];
    }
  > = {};

  for (const item of materialData) {
    if (!billMap[item.billNo]) {
      billMap[item.billNo] = {
        billNo: item.billNo,
        billDate: item.billDate,
        materialData: []
      };
    }

    billMap[item.billNo].materialData.push({
      material: item.material,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      amount: item.amount
    });
  }

  return {
    workCode,
    workName,
    bills: Object.values(billMap)
  };
};

export const fetchInvoiceDetails = async (
  id: string
): Promise<ServiceResponse<InvoiceApiResponse>> => {
  const { logout } = useAuthStore.getState();

  try {
    const res = await axios.get(`${Base_Url}/invoice/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });

    const apiData = res.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No invoice data found."
      };
    }

    return {
      success: true,
      data: apiData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch invoice data.";

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
