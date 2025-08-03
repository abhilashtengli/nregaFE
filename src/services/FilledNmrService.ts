// src/services/nmr/fetchFilledNMR.ts

import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

export type FilledNMRWorker = {
  slNo: number;
  name: string;
  jobCardNo: string;
  totalAttendance: number;
  oneDayWage: number;
  pendingAmountByAttendance: number;
  totalCashPayment: number;
  bankName: string;
  wagelistNo: string;
  creditedDate: string;
  signature: string;
  attendanceBy: string;
};

export type MusterRollEntry = {
  musterRollNo: string;
  fromDate: string;
  toDate: string;
  data: FilledNMRWorker[];
};

export type FilledNMRData = {
  state: string;
  district: string;
  taluka: string;
  panchayat: string;
  fromDate: string;
  toDate: string;
  totalAttendanceCount: number;
  approvalNo: string;
  approvalDate: string;
  workCode: string;
  workName: string;
  financialYear: string;
  totalWage: number;
  wage: number;
  workersData: MusterRollEntry[];
  mbNo: string;
  pageNo: string;
};

const fetchFilledNMR = async (
  id: string
): Promise<ServiceResponse<FilledNMRData>> => {
  try {
    const response = await axios.get(`${Base_Url}/filled-e-nmr/${id}`, {
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

    return {
      success: true,
      data: apiData,
    };
  } catch (error: unknown) {
    let message = "Failed to fetch Filled NMR data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message,
    };
  }
};

export const useFetchFilledNMRData = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<FilledNMRData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh",
      });
      return null;
    }

    const res = await fetchFilledNMR(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
