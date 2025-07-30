// Common types used across components
export interface MaterialData {
  id?: string;
  slNo: number;
  materialName: string;
  quantity: string;
  price: string;
  unit?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorDetails {
  vendorNameOne: string;
  vendorGstOne: string;
  VendorOneQuotationSubmissiondate: string;
  vendorNameTwo: string;
  vendorGstTwo: string;
  vendorTwoQuotationSubmissiondate: string;
  vendorNameThree: string;
  vendorGstThree: string;
  vendorThreeQuotationSubmissiondate: string;
}

export interface VendorWithQuotation {
  slNo: number;
  materialName: string;
  quantity: string;
  unit?: string;
  rate: string;
  contractor1Rate: string;
  contractor2Rate: string;
  contractor3Rate: string;
}

// Component-specific types
export interface QuotationCallProps {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  administrativeSanction: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  tenderSubmissionDate: string;
  materialData: MaterialData[];
}

export interface ComparativeStatementProps {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  vendorDetails: VendorDetails;
  vendorWithVendorQuotation: VendorWithQuotation[];
}

export interface ContractorQuotationProps {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  contractorNumber: 1 | 2 | 3;
  contractorName: string;
  contractorGst: string;
  quotationSubmissionDate: string;
  vendorWithVendorQuotation: VendorWithQuotation[];
}

export interface SupplyOrderProps {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  winnerContractorName: string;
  winnerContractorGst: string;
  winnerQuotationSubmissionDate: string;
  vendorWithVendorQuotation: VendorWithQuotation[];
  address?: string;
}
