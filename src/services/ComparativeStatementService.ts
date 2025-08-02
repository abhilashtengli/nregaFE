import { Base_Url } from "@/lib/constant";
import { useWorkStore } from "@/stores/workStore";
import type { ServiceResponse } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

type MaterialData = {
  slNo: number;
  materialName: string;
  quantity: string;
  price: string;
};
type VendorWithVendorQuotation = {
  unit: string;
  slNo: number;
  materialName: string;
  quantity: string;
  rate: string;
  contractor1Rate: string;
  contractor2Rate: string;
  contractor3Rate: string;
};
export type CombinedPDFData = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  administrativeSanction: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  tenderSubmissionDate: string;
  materialData: {
    slNo: number;
    materialName: string;
    quantity: string;
    price: string;
  }[];
  vendorDetails: {
    vendorNameOne: string;
    vendorGstOne: string;
    VendorOneQuotationSubmissiondate: string;
    vendorNameTwo: string;
    vendorGstTwo: string;
    vendorTwoQuotationSubmissiondate: string;
    vendorNameThree: string;
    vendorGstThree: string;
    vendorThreeQuotationSubmissiondate: string;
  };
  vendorWithVendorQuotation: {
    slNo: number;
    materialName: string;
    quantity: string;
    rate: string;
    unit: string;
    contractor1Rate: string;
    contractor2Rate: string;
    contractor3Rate: string;
  }[];
};

const fetchComparativeStatement = async (
  id: string
): Promise<ServiceResponse<CombinedPDFData>> => {
  try {
    const response = await axios.get(`${Base_Url}/comparative-statement/${id}`);

    const apiData = response.data?.data;

    if (!apiData) {
      return {
        success: false,
        message: "No data found for the provided ID"
      };
    }

    const formattedData: CombinedPDFData = {
      gramPanchayat: apiData.gramPanchayat,
      taluka: apiData.taluka,
      district: apiData.district,
      year: apiData.year,
      administrativeSanction: apiData.administrativeSanction,
      workCode: apiData.workCode,
      workName: apiData.workName,
      tenderPublishDate: apiData.tenderPublishDate,
      tenderSubmissionDate: apiData.tenderSubmissionDate,
      materialData: apiData.materialData.map((item: MaterialData) => ({
        slNo: item.slNo,
        materialName: item.materialName,
        quantity: Number(item.quantity).toFixed(2).toString(),
        price: item.price
      })),
      vendorDetails: apiData.vendorDetails,
      vendorWithVendorQuotation: apiData.vendorWithVendorQuotation.map(
        (item: VendorWithVendorQuotation) => ({
          slNo: item.slNo,
          materialName: item.materialName,
          quantity: Number(item.quantity).toFixed(2).toString(),
          rate: item.rate,
          unit: item.unit,
          contractor1Rate: item.contractor1Rate,
          contractor2Rate: item.contractor2Rate,
          contractor3Rate: item.contractor3Rate
        })
      )
    };

    return {
      success: true,
      data: formattedData
    };
  } catch (error: unknown) {
    let message = "Failed to fetch comparative statement data.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    return {
      success: false,
      message
    };
  }
};

export const useFetchComparativeStatement = () => {
  const { workDetail } = useWorkStore();

  const fetch = async (): Promise<CombinedPDFData | null> => {
    const id = workDetail?.id;

    if (!id) {
      toast.error("No work Id", {
        description: "Please refresh"
      });
      return null;
    }

    const res = await fetchComparativeStatement(id);

    if (!res?.success) {
      toast.error(res?.message || "Failed to fetch data");
      return null;
    }

    return res.data ?? null;
  };

  return fetch;
};
