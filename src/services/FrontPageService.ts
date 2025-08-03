import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

// Define the FrontPage data structure
export type FrontPageData = {
  state: string;
  district: string;
  taluka: string;
  gramPanchayat: string;
  workCategory: string;
  workCode: string;
  workName: string;
  sanctionedYear: string;
  projectLocation: string;
  grama: string;
  gramaPanchayat: string;
  talukaDetails: string;
  districtDetails: string;
  legislativeAssemblyConstituency: string;
  lokSabhaConstituency: string;
  stateDetails: string;
  workStartDate: string;
  technicalSanctionNo: string;
  estimateLabourCharge: string;
  estimatedMaterialCharge: string;
  estimatedSkilledCost: string;
  estimatedSemiSkilledCost: string;
  contingencyCost: string;
  estimatedTotal: string;
  throughMGNREGAfunding: string;
  spentLabourCharges: string;
  spentMaterialCharges: string;
  spentTotalCharges: string;
};

// API call function
const fetchFrontPageData = async (
  id: string
): Promise<ServiceResponse<FrontPageData>> => {
  try {
    const response = await axios.get(`${Base_Url}/get-frontpage-data/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No front page data found for the provided ID"
      };
    }

    const formattedData: FrontPageData = {
      state: apiData.state,
      district: apiData.district,
      taluka: apiData.taluka,
      gramPanchayat: apiData.gramPanchayat,
      workCategory: apiData.workCategory,
      workCode: apiData.workCode,
      sanctionedYear: apiData.sanctionedYear,
      projectLocation: apiData.projectLocation,
      grama: apiData.grama,
      workName: apiData.workName,
      gramaPanchayat: apiData.gramaPanchayat,
      talukaDetails: apiData.talukaDetails,
      districtDetails: apiData.districtDetails,
      legislativeAssemblyConstituency: apiData.legislativeAssemblyConstituency,
      lokSabhaConstituency: apiData.lokSabhaConstituency,
      stateDetails: apiData.stateDetails,
      workStartDate: apiData.workStartDate,
      technicalSanctionNo: apiData.technicalSanctionNo,
      estimateLabourCharge: apiData.estimateLabourCharge,
      estimatedMaterialCharge: apiData.estimatedMaterialCharge,
      estimatedSkilledCost: apiData.estimatedSkilledCost,
      estimatedSemiSkilledCost: apiData.estimatedSemiSkilledCost,
      contingencyCost: apiData.contingencyCost,
      estimatedTotal: apiData.estimatedTotal,
      throughMGNREGAfunding: apiData.throughMGNREGAfunding,
      spentLabourCharges: apiData.spentLabourCharges,
      spentMaterialCharges: apiData.spentMaterialCharges,
      spentTotalCharges: apiData.spentTotalCharges
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch front page data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

// React hook to fetch data using the store
export const useFetchFrontPageData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<FrontPageData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchFrontPageData(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
