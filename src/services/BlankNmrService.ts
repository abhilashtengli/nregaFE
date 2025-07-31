import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import { toast } from "sonner";
import axios from "axios";

export type Worker = {
  slNo: number;
  jobCardNo: string;
  familyHeadName: string;
  requestLetterFrom: string;
  accountNo: string;
};

export type MustRollEntry = {
  mustrollNo: string;
  workers: Worker[];
};

export type BlankNMRData = {
  district: string;
  taluka: string;
  gramPanchayat: string;
  financialYear: string;
  workCode: string;
  workName: string;
  fromDate: string;
  toDate: string;
  technicalSanctionNo: string;
  technicalSanctionDate: string;
  financialSanctionNo: string;
  financialSanctionDate: string;
  masterRollNo: string;
  workerData: MustRollEntry[];
};

export type BlankNMRResponse = {
  success: boolean;
  data?: BlankNMRData;
  message?: string;
};

const fetchBlankNMR = async (id: string): Promise<BlankNMRResponse> => {
  try {
    const response = await axios.get(`${Base_Url}/get-blanknmr/${id}`);
    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for Blank NMR."
      };
    }

    return {
      success: true,
      data: apiData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch Blank NMR data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchBlankNMRData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<BlankNMRData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchBlankNMR(id);

    if (!res.success) {
      toast.error(res.message || "Failed to fetch Blank NMR");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
