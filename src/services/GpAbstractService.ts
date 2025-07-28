import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type EmploymentData = {
  persondays: string;
  totalPersons: string;
};

export type ExpenditureIncurred = {
  unskilled: string;
  semiSkilled: string;
  skilled: string;
  material: string;
  contingency: string;
  total: string;
};

export type EmploymentGenerated = {
  unskilled: EmploymentData;
  semiSkilled: EmploymentData;
  skilled: EmploymentData;
};

export type GPAbstractData = {
  workName: string;
  sanctionedYear: string;
  workCode: string;
  workStatus: string;
  workPurposeStatus: string;
  sanctionNoAndDate: string;
  includedInPerspectivePlan: string;
  approvedInAnnualPlan: string;
  estimatedCost: string;
  workStartDate: string;
  expenditureIncurred: ExpenditureIncurred;
  employmentGenerated: EmploymentGenerated;
  musterRollDetails: string;
  beforeWorkPhoto: string | null;
  duringWorkPhoto: string | null;
  afterWorkPhoto: string | null;
};

const fetchGPAbstract = async (
  id: string
): Promise<ServiceResponse<GPAbstractData>> => {
  try {
    const response = await axios.get(`${Base_Url}/gp-abstract/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No GP abstract data found for the provided ID"
      };
    }

    const formattedData: GPAbstractData = {
      workName: apiData.workName,
      workStatus: apiData.workStatus,
      workPurposeStatus: apiData.workPurposeStatus,
      workCode: apiData.workCode,
      sanctionedYear: apiData.sanctionedYear,
      sanctionNoAndDate: apiData.sanctionNoAndDate,
      includedInPerspectivePlan: apiData.includedInPerspectivePlan,
      approvedInAnnualPlan: apiData.approvedInAnnualPlan,
      estimatedCost: apiData.estimatedCost,
      workStartDate: apiData.workStartDate,
      expenditureIncurred: apiData.expenditureIncurred,
      employmentGenerated: apiData.employmentGenerated,
      musterRollDetails: apiData.musterRollDetails,
      beforeWorkPhoto: apiData.beforeWorkPhoto,
      duringWorkPhoto: apiData.duringWorkPhoto,
      afterWorkPhoto: apiData.afterWorkPhoto
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch GP abstract data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchGPAbstractData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<GPAbstractData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work ID found", {
        description: "Please refresh and try again"
      });
      return null;
    }

    const res = await fetchGPAbstract(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch GP Abstract");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
