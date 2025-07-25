"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useWorkStore } from "@/stores/workStore";
import { Base_Url } from "@/lib/constant";

// API Response Types
interface ApiWorkDetail {
  workCode: string;
  state: string;
  district: string;
  block: string;
  panchayat: string;
  workName: string;
  workCategory: string;
  workType: string;
  workStatus: string;
  implementingAgency: string;
  financialYear: string;
  sanctionYear: string;
  workStartDate: string;
  estimatedCost?: number;
  actualExpenditure?: number;
  estimatedPersonDays?: number;
  actualPersonDays?: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    metadata: {
      id: string;
      workDocumentId: string;
      panchayatCode: string;
      vendorName: string;
      vendorGstNo: string;
      district: string;
      block: string;
      panchayat: string;
      urlUsed: string;
      data: {
        workDetail: ApiWorkDetail;
        workDocuments: Record<string, string>;
      };
    };
  };
  error?: string;
}

// Financial years data
const financialYears = [
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026"
];

interface WorkData {
  vendorName: string;
  vendorGstNo: string;
  workDetail: {
    id: string; // Added id field
    workDocumentId: string; // Added workDocumentId field
    workCode: string;
    district: string;
    block: string;
    panchayat: string;
    workName: string;
    workCategory: string;
    workType: string;
    workStatus: string;
    implementingAgency: string;
    financialYear: string;
    sanctionYear: string;
    workStartDate: string;
    estimatedCost: number;
    actualExpenditure: number;
    estimatedPersonDays: number;
    actualPersonDays: number;
  };
}

interface WorkCodeFormProps {
  onWorkDataSubmitted: (data: WorkData) => void;
}

// Validation functions
const validateWorkCode = (workCode: string): string | null => {
  if (!workCode || workCode.trim().length === 0) {
    return "Work code is required";
  }
  // Check work code format: PANCHAYAT_CODE/WC/WORK_ID or PANCHAYAT_CODE/RC/WORK_ID
  const workCodePattern = /^\d{10}\/(WC|RC)\/\d+$/;
  if (!workCodePattern.test(workCode.trim())) {
    return "Invalid work code format. Expected format: PANCHAYAT_CODE/WC/WORK_ID or PANCHAYAT_CODE/RC/WORK_ID";
  }
  return null;
};

const validateFinancialYear = (finYear: string): string | null => {
  if (!finYear || finYear.trim().length === 0) {
    return "Financial year is required";
  }
  // Check financial year format: YYYY-YYYY
  const finYearPattern = /^\d{4}-\d{4}$/;
  if (!finYearPattern.test(finYear.trim())) {
    return "Invalid financial year format. Expected format: YYYY-YYYY";
  }
  return null;
};

export default function WorkCodeForm({
  onWorkDataSubmitted
}: WorkCodeFormProps) {
  // Form state
  const [workCode, setWorkCode] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation state
  const [workCodeError, setWorkCodeError] = useState<string | null>(null);
  const [financialYearError, setFinancialYearError] = useState<string | null>(
    null
  );
  const [clearData, setClearData] = useState(false);

  // Zustand store
  const { vendorName, vendorGstNo, workDetail, setWork, clearWork } =
    useWorkStore();

  // Use ref to track if we've already notified parent to prevent infinite loops
  const hasNotifiedParent = useRef(false);

  // Memoize the callback to prevent infinite re-renders
  const notifyParent = useCallback(
    (workData: WorkData) => {
      if (!hasNotifiedParent.current) {
        onWorkDataSubmitted(workData);
        hasNotifiedParent.current = true;
      }
    },
    [onWorkDataSubmitted]
  );

  // Load data from store on component mount
  useEffect(() => {
    if (workDetail && !hasNotifiedParent.current) {
      // If data exists in store, populate form and notify parent
      setWorkCode(workDetail.workCode);
      setFinancialYear(workDetail.financialYear);

      const workData: WorkData = {
        vendorName: vendorName || "",
        vendorGstNo: vendorGstNo || "",
        workDetail
      };

      notifyParent(workData);

      toast.success("Work data loaded from previous session", {
        description: `Work Code: ${workDetail.workCode}`,
        duration: 3000
      });
    }
  }, [workDetail, vendorName, vendorGstNo, notifyParent]);

  // Reset notification flag when work detail changes
  useEffect(() => {
    if (!workDetail) {
      hasNotifiedParent.current = false;
    }
  }, [workDetail]);

  // Real-time validation
  const handleWorkCodeChange = (value: string) => {
    setWorkCode(value);
    if (value.trim()) {
      const error = validateWorkCode(value);
      setWorkCodeError(error);
    } else {
      setWorkCodeError(null);
    }
  };

  const handleFinancialYearChange = (value: string) => {
    setFinancialYear(value);
    if (value.trim()) {
      const error = validateFinancialYear(value);
      setFinancialYearError(error);
    } else {
      setFinancialYearError(null);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const workCodeValidation = validateWorkCode(workCode);
    const finYearValidation = validateFinancialYear(financialYear);

    setWorkCodeError(workCodeValidation);
    setFinancialYearError(finYearValidation);

    return !workCodeValidation && !finYearValidation;
  };

  // Transform API response to our WorkData format
  const transformApiResponse = (apiResponse: ApiResponse): WorkData => {
    const { metadata } = apiResponse.data;

    return {
      vendorName: metadata.vendorName || "",
      vendorGstNo: metadata.vendorGstNo || "",
      workDetail: {
        id: metadata.id, // Include id from metadata
        workDocumentId: metadata.workDocumentId, // Include workDocumentId from metadata
        workCode: metadata.data.workDetail.workCode,
        district: metadata.data.workDetail.district,
        block: metadata.data.workDetail.block,
        panchayat: metadata.data.workDetail.panchayat,
        workName: metadata.data.workDetail.workName,
        workCategory: metadata.data.workDetail.workCategory,
        workType: metadata.data.workDetail.workType,
        workStatus: metadata.data.workDetail.workStatus,
        implementingAgency: metadata.data.workDetail.implementingAgency,
        financialYear: metadata.data.workDetail.financialYear,
        sanctionYear: metadata.data.workDetail.sanctionYear,
        workStartDate: metadata.data.workDetail.workStartDate,
        estimatedCost: metadata.data.workDetail.estimatedCost || 0,
        actualExpenditure: metadata.data.workDetail.actualExpenditure || 0,
        estimatedPersonDays: metadata.data.workDetail.estimatedPersonDays || 0,
        actualPersonDays: metadata.data.workDetail.actualPersonDays || 0
      }
    };
  };

  // Handle form submission with direct API call
  const handleSubmitWorkCode = async () => {
    // Clear previous work data before new submission
    if (workDetail) {
      handleClearData(workDetail.id);
    }
    clearWork();
    hasNotifiedParent.current = false;

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the validation errors", {
        description: "Check the work code and financial year format",
        duration: 4000
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      workCode: workCode.trim(),
      finYear: financialYear.trim()
    };

    try {
      toast.loading("Scraping work data...", {
        description: "This may take a few moments",
        id: "scraping-toast"
      });

      // Direct API call using axios
      const response = await axios.post(
        `${Base_Url}/scrape-by-workcode`,
        payload,
        {
          timeout: 30000, // 30 seconds timeout
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error || "API returned unsuccessful response"
        );
      }

      // Transform and validate response
      const workData = transformApiResponse(response.data);

      if (!workData.workDetail.workCode) {
        throw new Error("Invalid work data received from server");
      }

      // Save to Zustand store
      setWork({
        vendorName: workData.vendorName,
        vendorGstNo: workData.vendorGstNo,
        workDetail: workData.workDetail
      });

      // Notify parent component
      notifyParent(workData);

      toast.success("Work data retrieved successfully!", {
        description: `Work: ${workData.workDetail.workName.substring(
          0,
          50
        )}...`,
        duration: 5000,
        id: "scraping-toast"
      });
    } catch (error: unknown) {
      console.error("Error submitting work code:", error);

      let errorMessage = "Please try again or contact support";

      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          errorMessage = "Request timeout. Please try again.";
        } else if (error.response) {
          // Server responded with error status
          errorMessage =
            error.response.data?.error ||
            `Server error: ${error.response.status}`;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = "Network error. Please check your connection.";
        }
      } else if (error instanceof Error) {
        // Something else happened
        errorMessage = error.message || "An unexpected error occurred.";
      }

      toast.error("Failed to retrieve work data", {
        description: errorMessage,
        duration: 6000,
        id: "scraping-toast"
      });

      // Clear form on error
      clearWork();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle clear/reset
  const handleClearData = async (id: string) => {
    try {
      setClearData(true);
      if (!id) {
        toast.error("Invalid request", {
          description: "Missing work ID for deletion.",
          duration: 3000
        });
        return;
      }

      const response = await axios.delete(`${Base_Url}/work/${id}`);

      if (response.status === 200 && response.data.success) {
        clearWork();
        setWorkCode("");
        setFinancialYear("");
        setWorkCodeError(null);
        setFinancialYearError(null);
        hasNotifiedParent.current = false;
        toast.success("Work data cleared", {
          description: "You can now enter new work details.",
          duration: 3000
        });
      } else {
        toast.error("Failed to delete work", {
          description: response.data?.error || "Something went wrong.",
          duration: 3000
        });
      }
    } catch (error: unknown) {
      let message = "Failed to delete work";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      console.error("Error deleting work:", error);

      toast.error("Server error", {
        description: message,
        duration: 4000
      });
    } finally {
      setClearData(false);
    }
  };

  // Check if form is valid
  const isFormValid =
    workCode.trim() &&
    financialYear.trim() &&
    !workCodeError &&
    !financialYearError;

  return (
    <div className="space-y-6">
      {/* Work Code & Financial Year Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Work Code & Financial Year
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter work code and financial year to retrieve work information
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Work Code Input */}
              <div className="space-y-2">
                <Label htmlFor="workCode">
                  Work Code *
                  <span className="text-xs text-gray-500 ml-2">
                    (Format: PANCHAYAT_CODE/WC/WORK_ID)
                  </span>
                </Label>
                <Input
                  id="workCode"
                  placeholder="e.g., 1515001014/RC/93393042892467706"
                  value={workCode}
                  onChange={(e) => handleWorkCodeChange(e.target.value)}
                  className={`w-full ${
                    workCodeError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {workCodeError && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {workCodeError}
                  </div>
                )}
              </div>

              {/* Financial Year Select */}
              <div className="space-y-2">
                <Label htmlFor="financialYear">Financial Year *</Label>
                <Select
                  value={financialYear}
                  onValueChange={handleFinancialYearChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={
                      financialYearError ? "border-red-500 w-full" : "w-full"
                    }
                  >
                    <SelectValue placeholder="Select financial year" />
                  </SelectTrigger>
                  <SelectContent>
                    {financialYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {financialYearError && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {financialYearError}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleSubmitWorkCode}
                disabled={!isFormValid || isSubmitting}
                className="px-8 py-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Fetching Data...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit
                  </>
                )}
              </Button>

              {workDetail && (
                <Button
                  variant="outline"
                  onClick={() => handleClearData(workDetail.id)}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-transparent cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {clearData ? "Clearing Data.." : "Clear Data"}
                </Button>
              )}
            </div>

            {/* Form Status */}
            <div className="text-center text-sm text-gray-600">
              {workDetail ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Work data loaded and ready
                </div>
              ) : (
                <div className="text-gray-500">
                  Enter work code and financial year to get started
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Data Display */}
      {workDetail && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Work Information Retrieved
            </CardTitle>
            <p className="text-sm text-green-700">
              Data successfully scraped and stored
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Material Supplier Name
                  </Label>
                  <p className="text-lg font-semibold">
                    {vendorName || "Not Available"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Material Supplier GST Number
                  </Label>
                  <p className="text-lg font-semibold">
                    {vendorGstNo || "Not Available"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Work Code
                  </Label>
                  <p className="text-lg font-semibold">{workDetail.workCode}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    District
                  </Label>
                  <p className="text-lg">{workDetail.district}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Block
                  </Label>
                  <p className="text-lg">{workDetail.block}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Panchayat
                  </Label>
                  <p className="text-lg">{workDetail.panchayat}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Work Name
                  </Label>
                  <p className="text-lg">{workDetail.workName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Work Category
                  </Label>
                  <p className="text-lg">{workDetail.workCategory}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Work Status
                  </Label>
                  <p className="text-lg font-semibold text-blue-600">
                    {workDetail.workStatus}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Estimated Cost
                  </Label>
                  <p className="text-lg font-semibold text-green-600">
                    ₹{workDetail.estimatedCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Actual Expenditure
                  </Label>
                  <p className="text-lg font-semibold text-orange-600">
                    ₹{workDetail.actualExpenditure.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Financial Year
                  </Label>
                  <p className="text-lg">{workDetail.financialYear}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
