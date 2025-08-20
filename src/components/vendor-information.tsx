import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Loader2, Calendar } from "lucide-react";
import { Combobox } from "@/components/combobox";
import { toast } from "sonner";
import axios from "axios";
import { useWorkStore } from "@/stores/workStore";
import { Base_Url } from "@/lib/constant";
import MaterialDataSkeleton from "./shimmer/materialDataShimmer";
import { useVendorUpdateStore } from "@/stores/useVendorUpdateStore";
import { useAuthStore } from "@/stores/userAuthStore";

// API Response Types
interface MaterialData {
  slNo: number;
  materialName: string;
  quantity: string;
  unit: string;
  rate: string;
  contractor1Rate: string;
  contractor2Rate: string;
  contractor3Rate: string;
}

interface VendorDataProp {
  vendorNameOne: string;
  vendorNameTwo: string;
  vendorNameThree: string;
  vendorGstOne: string;
  vendorGstTwo: string;
  vendorGstThree: string;
  fromDate: string;
  toDate: string;
}

interface VendorData {
  vendorName: string;
  gstNo: string;
}

interface MaterialApiResponse {
  success: boolean;
  code: string;
  status: number;
  data: {
    vendorWithVendorQuotationData: MaterialData[];
    vendorData?: VendorDataProp; // Made optional since it might not exist on first call
  };
  message: string;
}

// interface VendorApiResponse {
//   success: boolean;
//   data: VendorData[];
//   count: number;
// }

// Component interfaces
interface MaterialQuotedData {
  price: string;
}

interface SelectedVendor {
  vendorName: string;
  gstNo: string;
}

export default function VendorInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Dynamic data from APIs
  const [materialData, setMaterialData] = useState<MaterialData[]>([]);
  const [vendorOptions, setVendorOptions] = useState<VendorData[]>([]);
  const { logout } = useAuthStore();

  // Selected vendors (now storing full vendor objects)
  const [selectedVendors, setSelectedVendors] = useState({
    vendor1: null as SelectedVendor | null,
    vendor2: null as SelectedVendor | null,
    vendor3: null as SelectedVendor | null
  });

  // ADD: Manual vendor input fields state
  const [manualVendorInputs, setManualVendorInputs] = useState({
    vendor1: { name: "", gst: "" },
    vendor2: { name: "", gst: "" },
    vendor3: { name: "", gst: "" }
  });

  // Material units (editable)
  const [materialUnits, setMaterialUnits] = useState<{
    [materialId: number]: string;
  }>({});

  // Only vendor1 prices are editable, others are calculated
  const [editableQuotedData, setEditableQuotedData] = useState<{
    [materialId: number]: {
      vendor1: MaterialQuotedData;
      vendor2: MaterialQuotedData;
      vendor3: MaterialQuotedData;
    };
  }>({});

  // Get work data from store
  const { workDetail } = useWorkStore();
  const { setVendorUpdate } = useVendorUpdateStore();

  // Helper function to format date for input field
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Helper function to find vendor in options by name and GST
  const findVendorInOptions = (
    vendorName: string,
    gstNo: string
  ): VendorData | null => {
    return (
      vendorOptions.find(
        (vendor) => vendor.vendorName === vendorName && vendor.gstNo === gstNo
      ) || null
    );
  };

  // Fetch material data when modal opens
  const fetchMaterialData = async () => {
    if (!workDetail?.id) {
      toast.error("Work ID not found", {
        description: "Please submit work code first"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log(
        "API : ",
        `${Base_Url}/material-vendor-data-version2/${workDetail.id}`
      );
      const response = await axios.get<MaterialApiResponse>(
        `${Base_Url}/material-vendor-data-version2/${workDetail.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (
        response.data.code === "USER_NOT_FOUND" &&
        response.data.status === 404
      ) {
        // Handle user not found error
        toast.error("User not found", {
          description: "Please log in to access this feature",
          duration: 4000
        });
        logout();
        return;
      }

      if (response.data.success) {
        console.log("RESPONSE DATA : ", response.data);
        setMaterialData(response.data.data.vendorWithVendorQuotationData);

        // Initialize units and prices
        const initialUnits: { [materialId: number]: string } = {};
        const initialPrices: {
          [materialId: number]: {
            vendor1: MaterialQuotedData;
            vendor2: MaterialQuotedData;
            vendor3: MaterialQuotedData;
          };
        } = {};

        response.data.data.vendorWithVendorQuotationData.forEach((material) => {
          initialUnits[material.slNo] = material.unit;
          initialPrices[material.slNo] = {
            vendor1: { price: material.contractor1Rate },
            vendor2: { price: material.contractor2Rate },
            vendor3: { price: material.contractor3Rate }
          };
        });

        setMaterialUnits(initialUnits);
        setEditableQuotedData(initialPrices);

        // Handle vendor data if it exists (second time opening)
        if (response.data.data.vendorData) {
          const vendorData = response.data.data.vendorData;
          // Set dates
          setFromDate(formatDateForInput(vendorData.fromDate));
          setToDate(formatDateForInput(vendorData.toDate));
          // Wait for vendor options to be loaded before setting selected vendors
          // This will be handled in the useEffect that watches vendorOptions
        }

        toast.success("Material data loaded successfully");
      } else {
        throw new Error("Failed to fetch material data");
      }
    } catch (error) {
      console.error("Error fetching material data:", error);
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const data = error?.response?.data;
        if (data.code === "USER_NOT_FOUND" && status === 404) {
          // Handle user not found error
          toast.error("User not found", {
            description: "Please log in to access this feature",
            duration: 4000
          });
          logout();
          return;
        }
      }
      toast.error("Failed to load material data", {
        description: "Please try again later or Sign in again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch vendor options
  const fetchVendorOptions = async () => {
    try {
      const response = await axios.get(`${Base_Url}/vendors/kalaburagi`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (
        response.data.code === "USER_NOT_FOUND" &&
        response.data.status === 404
      ) {
        // Handle user not found error
        toast.error("User not found", {
          description: "Please log in to access this feature",
          duration: 4000
        });
        logout();
        return;
      }

      if (response.data.success) {
        setVendorOptions(response.data.data);
      } else {
        throw new Error("Failed to fetch vendor data");
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const data = error?.response?.data;
        if (data.code === "USER_NOT_FOUND" && status === 404) {
          // Handle user not found error
          toast.error("User not found", {
            description: "Please log in to access this feature",
            duration: 4000
          });
          logout();
          return;
        }
      }
      toast.error("Failed to load vendor options", {
        description: "Using default vendor list"
      });
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (isModalOpen) {
      // Reset state when modal opens
      setSelectedMaterials(new Set());
      setSelectAll(false);
      setFromDate("");
      setToDate("");
      setSelectedVendors({
        vendor1: null,
        vendor2: null,
        vendor3: null
      });
      // UPDATED: Reset manual vendor inputs
      setManualVendorInputs({
        vendor1: { name: "", gst: "" },
        vendor2: { name: "", gst: "" },
        vendor3: { name: "", gst: "" }
      });

      fetchMaterialData();
      fetchVendorOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, workDetail?.id]);

  // Set selected vendors when both vendor options and material data are loaded
  useEffect(() => {
    const setVendorsFromApiData = async () => {
      if (vendorOptions.length > 0 && materialData.length > 0) {
        try {
          // Re-fetch the latest data to get vendor information
          const response = await axios.get(
            `${Base_Url}/material-vendor-data-version2/${workDetail?.id}`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          if (
            response.data.code === "USER_NOT_FOUND" &&
            response.data.status === 404
          ) {
            // Handle user not found error
            toast.error("User not found", {
              description: "Please log in to access this feature",
              duration: 4000
            });
            logout();
            return;
          }

          if (response.data.success && response.data.data.vendorData) {
            const vendorData = response.data.data.vendorData;

            // Find and set vendors
            const vendor1 = findVendorInOptions(
              vendorData.vendorNameOne,
              vendorData.vendorGstOne
            );
            const vendor2 = findVendorInOptions(
              vendorData.vendorNameTwo,
              vendorData.vendorGstTwo
            );
            const vendor3 = findVendorInOptions(
              vendorData.vendorNameThree,
              vendorData.vendorGstThree
            );

            setSelectedVendors({
              vendor1: vendor1,
              vendor2: vendor2,
              vendor3: vendor3
            });

            // UPDATED: Also populate manual inputs with API data
            setManualVendorInputs({
              vendor1: {
                name: vendorData.vendorNameOne || "",
                gst: vendorData.vendorGstOne || ""
              },
              vendor2: {
                name: vendorData.vendorNameTwo || "",
                gst: vendorData.vendorGstTwo || ""
              },
              vendor3: {
                name: vendorData.vendorNameThree || "",
                gst: vendorData.vendorGstThree || ""
              }
            });

            console.log("Set vendors from API data:", {
              vendor1,
              vendor2,
              vendor3
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const status = error?.response?.status;
            const data = error?.response?.data;
            if (data.code === "USER_NOT_FOUND" && status === 404) {
              // Handle user not found error
              toast.error("User not found", {
                description: "Please log in to access this feature",
                duration: 4000
              });
              logout();
              return;
            }
          }
        }
      }
    };

    setVendorsFromApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorOptions, materialData, workDetail?.id]);

  // Calculate vendor2 and vendor3 prices when vendor1 price changes
  const calculateDependentPrices = (vendor1Price: string) => {
    const price = Number.parseFloat(vendor1Price) || 0;
    const vendor2Price = (price * 1.02).toFixed(2);
    const vendor3Price = (price * 1.025).toFixed(2);
    return {
      vendor2: vendor2Price,
      vendor3: vendor3Price
    };
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMaterials(new Set(materialData.map((m) => m.slNo)));
    } else {
      setSelectedMaterials(new Set());
    }
  };

  const handleMaterialSelect = (materialId: number, checked: boolean) => {
    const newSelected = new Set(selectedMaterials);
    if (checked) {
      newSelected.add(materialId);
    } else {
      newSelected.delete(materialId);
    }
    setSelectedMaterials(newSelected);
    setSelectAll(newSelected.size === materialData.length);
  };

  const handleUnitChange = (materialId: number, unit: string) => {
    setMaterialUnits((prev) => ({
      ...prev,
      [materialId]: unit
    }));
  };

  // UPDATED: Enhanced vendor select handler
  const handleVendorSelect = (
    vendorColumn: "vendor1" | "vendor2" | "vendor3",
    vendorData: VendorData | null
  ) => {
    const selectedVendor = vendorData
      ? {
          vendorName: vendorData.vendorName,
          gstNo: vendorData.gstNo
        }
      : null;

    setSelectedVendors((prev) => ({
      ...prev,
      [vendorColumn]: selectedVendor
    }));

    // UPDATED: Also update manual inputs when vendor is selected from combobox
    setManualVendorInputs((prev) => ({
      ...prev,
      [vendorColumn]: {
        name: vendorData?.vendorName || "",
        gst: vendorData?.gstNo || ""
      }
    }));
  };

  // NEW: Handle manual vendor input changes
  const handleManualVendorChange = (
    vendorColumn: "vendor1" | "vendor2" | "vendor3",
    field: "name" | "gst",
    value: string
  ) => {
    setManualVendorInputs((prev) => ({
      ...prev,
      [vendorColumn]: {
        ...prev[vendorColumn],
        [field]: value
      }
    }));

    // Update selectedVendors with manual input data
    setSelectedVendors((prev) => ({
      ...prev,
      [vendorColumn]: {
        vendorName:
          field === "name"
            ? value
            : prev[vendorColumn]?.vendorName ||
              manualVendorInputs[vendorColumn].name,
        gstNo:
          field === "gst"
            ? value
            : prev[vendorColumn]?.gstNo || manualVendorInputs[vendorColumn].gst
      }
    }));
  };

  // Only vendor1 prices can be edited
  const handleVendor1PriceChange = (materialId: number, value: string) => {
    const calculatedPrices = calculateDependentPrices(value);
    setEditableQuotedData((prev) => ({
      ...prev,
      [materialId]: {
        vendor1: { price: value },
        vendor2: { price: calculatedPrices.vendor2 },
        vendor3: { price: calculatedPrices.vendor3 }
      }
    }));
  };

  const handleSubmitMaterials = async () => {
    // UPDATED: Validation using manual inputs
    if (!fromDate || !toDate) {
      toast.error("Please select both from and to dates");
      return;
    }
    if (selectedMaterials.size === 0) {
      toast.error("Please select at least one material");
      return;
    }

    // Check manual inputs instead of selectedVendors
    const hasValidVendor1 =
      manualVendorInputs.vendor1.name.trim() &&
      manualVendorInputs.vendor1.gst.trim();
    const hasValidVendor2 =
      manualVendorInputs.vendor2.name.trim() &&
      manualVendorInputs.vendor2.gst.trim();
    const hasValidVendor3 =
      manualVendorInputs.vendor3.name.trim() &&
      manualVendorInputs.vendor3.gst.trim();

    if (!hasValidVendor1 || !hasValidVendor2 || !hasValidVendor3) {
      toast.error(
        "Please provide vendor name and GST number for all three vendors"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare the data to send to backend
      const selectedMaterialsData = materialData
        .filter((material) => selectedMaterials.has(material.slNo))
        .map((material) => ({
          slNo: material.slNo,
          materialName: material.materialName,
          quantity: material.quantity,
          unit: materialUnits[material.slNo],
          vendor1Rate: editableQuotedData[material.slNo]?.vendor1?.price || "0"
        }));

      // UPDATED: Use manual inputs for vendor data
      const submitData = {
        workId: workDetail?.id,
        workDocumentId: workDetail?.workDocumentId,
        fromDate,
        toDate,
        vendors: {
          vendor1: {
            vendorName: manualVendorInputs.vendor1.name.trim(),
            gstNo: manualVendorInputs.vendor1.gst.trim()
          },
          vendor2: {
            vendorName: manualVendorInputs.vendor2.name.trim(),
            gstNo: manualVendorInputs.vendor2.gst.trim()
          },
          vendor3: {
            vendorName: manualVendorInputs.vendor3.name.trim(),
            gstNo: manualVendorInputs.vendor3.gst.trim()
          }
        },
        materials: selectedMaterialsData
      };

      console.log("Submitting data:", submitData);

      // Frontend API call with proper error handling
      try {
        const response = await axios.post(
          `${Base_Url}/update-vendor-material-data`,
          submitData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (response.data.success) {
          setVendorUpdate(true);
          toast.success("Materials Submitted Successfully", {
            description: `${selectedMaterials.size} materials submitted with vendor information.`
          });
        } else {
          setVendorUpdate(false);
          toast.error("Submission Failed", {
            description: response.data.message || "Failed to submit materials"
          });
        }
      } catch (error: unknown) {
        console.error("API Error:", error);
        setVendorUpdate(false);
        // Type guard for axios error
        if (axios.isAxiosError(error)) {
          const status = error?.response?.status;
          const data = error?.response?.data;

          // ✅ Handle user not found here
          if (status === 404 && data?.code === "USER_NOT_FOUND") {
            toast.error("User not found", {
              description: "Please log in to access this feature",
              duration: 4000
            });
            logout(); // logout immediately
            return;
          }
          if (error.response?.status === 400) {
            // Validation errors
            const errorData = error.response.data;
            const errorMessage =
              errorData?.errors?.join(", ") || "Please check your input data";
            toast.error("Invalid Data", {
              description: errorMessage
            });
          } else if (error.response?.status === 404) {
            // Not found errors
            toast.error("Record Not Found", {
              description: "The requested work record was not found"
            });
          } else if (error.response?.status === 500) {
            // Server errors
            toast.error("Server Error", {
              description:
                "An unexpected error occurred. Please try again later."
            });
          } else {
            // Other HTTP errors
            toast.error("Request Failed", {
              description: `Server returned status: ${
                error.response?.status || "unknown"
              }`
            });
          }
        } else {
          // Network or other errors
          toast.error("Connection Error", {
            description:
              "Unable to connect to server. Please check your internet connection."
          });
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting materials:", error);
      toast.error("Failed to submit materials", {
        description: "Please try again or contact support"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format vendor options for combobox
  const formatVendorOptions = (vendors: VendorData[]) => {
    return vendors.map((vendor, index) => ({
      value: index,
      label: `${vendor.vendorName} (${vendor.gstNo})`,
      data: vendor
    }));
  };

  const vendorComboboxOptions = formatVendorOptions(vendorOptions);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Vendor Information</CardTitle>
        <p className="text-sm text-gray-600">
          Manage vendor materials and quotations
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="px-8 py-3 cursor-pointer"
                disabled={!workDetail?.id}
              >
                <Plus className="w-4 h-4 mr-2" />
                Manage Vendor Materials
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-none max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Material & Vendor Management</DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <MaterialDataSkeleton />
              ) : (
                <div className="space-y-4">
                  {/* Date Range Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fromDate"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        From Date *
                      </Label>
                      <Input
                        id="fromDate"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="md:w-full w-fit"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="toDate"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        To Date *
                      </Label>
                      <Input
                        id="toDate"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="md:w-full w-fit"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="selectAll"
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor="selectAll"
                      className="font-medium cursor-pointer hover:text-green-800 tracking-wide"
                    >
                      Select All Materials ({materialData.length})
                    </Label>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="w-16 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              Select
                            </th>
                            <th className="w-64 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              Material
                            </th>
                            <th className="w-24 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              Quantity
                            </th>
                            <th className="w-32 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              Units
                            </th>
                            <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              <div className="space-y-2">
                                <div>Vendor 1 (Editable)</div>
                                <div className="w-full">
                                  <Combobox
                                    options={vendorComboboxOptions}
                                    value={
                                      selectedVendors.vendor1
                                        ? vendorOptions.findIndex(
                                            (v) =>
                                              v.vendorName ===
                                                selectedVendors.vendor1
                                                  ?.vendorName &&
                                              v.gstNo ===
                                                selectedVendors.vendor1?.gstNo
                                          )
                                        : null
                                    }
                                    onValueChange={(value) =>
                                      handleVendorSelect(
                                        "vendor1",
                                        value !== null
                                          ? vendorOptions[value]
                                          : null
                                      )
                                    }
                                    placeholder="Search vendors..."
                                    emptyText="No vendor found."
                                  />
                                </div>
                                {/* NEW: Manual input fields for Vendor 1 */}
                                <div className="space-y-1">
                                  <Input
                                    placeholder="Vendor Name"
                                    value={manualVendorInputs.vendor1.name}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor1",
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                  <Input
                                    placeholder="GST Number"
                                    value={manualVendorInputs.vendor1.gst}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor1",
                                        "gst",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                </div>
                                <div className="mt-2">
                                  <Label className="text-xs text-gray-600">
                                    Price (Editable)
                                  </Label>
                                </div>
                              </div>
                            </th>
                            <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              <div className="space-y-2">
                                <div>Vendor 2 (Auto: +2%)</div>
                                <div className="w-full">
                                  <Combobox
                                    options={vendorComboboxOptions}
                                    value={
                                      selectedVendors.vendor2
                                        ? vendorOptions.findIndex(
                                            (v) =>
                                              v.vendorName ===
                                                selectedVendors.vendor2
                                                  ?.vendorName &&
                                              v.gstNo ===
                                                selectedVendors.vendor2?.gstNo
                                          )
                                        : null
                                    }
                                    onValueChange={(value) =>
                                      handleVendorSelect(
                                        "vendor2",
                                        value !== null
                                          ? vendorOptions[value]
                                          : null
                                      )
                                    }
                                    placeholder="Search vendors..."
                                    emptyText="No vendor found."
                                  />
                                </div>
                                {/* NEW: Manual input fields for Vendor 2 */}
                                <div className="space-y-1">
                                  <Input
                                    placeholder="Vendor Name"
                                    value={manualVendorInputs.vendor2.name}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor2",
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                  <Input
                                    placeholder="GST Number"
                                    value={manualVendorInputs.vendor2.gst}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor2",
                                        "gst",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                </div>
                                <div className="mt-2">
                                  <Label className="text-xs text-gray-600">
                                    Price (Auto)
                                  </Label>
                                </div>
                              </div>
                            </th>
                            <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                              <div className="space-y-2">
                                <div>Vendor 3 (Auto: +2.5%)</div>
                                <div className="w-full">
                                  <Combobox
                                    options={vendorComboboxOptions}
                                    value={
                                      selectedVendors.vendor3
                                        ? vendorOptions.findIndex(
                                            (v) =>
                                              v.vendorName ===
                                                selectedVendors.vendor3
                                                  ?.vendorName &&
                                              v.gstNo ===
                                                selectedVendors.vendor3?.gstNo
                                          )
                                        : null
                                    }
                                    onValueChange={(value) =>
                                      handleVendorSelect(
                                        "vendor3",
                                        value !== null
                                          ? vendorOptions[value]
                                          : null
                                      )
                                    }
                                    placeholder="Search vendors..."
                                    emptyText="No vendor found."
                                  />
                                </div>
                                {/* NEW: Manual input fields for Vendor 3 */}
                                <div className="space-y-1">
                                  <Input
                                    placeholder="Vendor Name"
                                    value={manualVendorInputs.vendor3.name}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor3",
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                  <Input
                                    placeholder="GST Number"
                                    value={manualVendorInputs.vendor3.gst}
                                    onChange={(e) =>
                                      handleManualVendorChange(
                                        "vendor3",
                                        "gst",
                                        e.target.value
                                      )
                                    }
                                    className="text-xs h-7 w-full"
                                  />
                                </div>
                                <div className="mt-2">
                                  <Label className="text-xs text-gray-600">
                                    Price (Auto)
                                  </Label>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {materialData.map((material) => (
                            <tr
                              key={material.slNo}
                              className="hover:bg-gray-50 h-16"
                            >
                              <td className="w-16 px-3 py-3">
                                <Checkbox
                                  checked={selectedMaterials.has(material.slNo)}
                                  onCheckedChange={(checked) =>
                                    handleMaterialSelect(
                                      material.slNo,
                                      checked as boolean
                                    )
                                  }
                                />
                              </td>
                              <td className="w-64 px-3 py-3">
                                <div>
                                  <p
                                    className="font-medium text-gray-900 text-sm"
                                    title={material.materialName}
                                  >
                                    {material.materialName}
                                  </p>
                                </div>
                              </td>
                              <td className="w-24 px-3 py-3">
                                <span className="text-sm text-gray-600">
                                  {material.quantity}
                                </span>
                              </td>
                              <td className="w-32 px-3 py-3">
                                <Input
                                  value={materialUnits[material.slNo] || ""}
                                  onChange={(e) =>
                                    handleUnitChange(
                                      material.slNo,
                                      e.target.value
                                    )
                                  }
                                  className="text-sm h-8 w-full"
                                  placeholder="Enter unit"
                                />
                              </td>
                              <td className="w-48 px-3 py-3">
                                <Input
                                  value={
                                    editableQuotedData[material.slNo]?.vendor1
                                      ?.price || ""
                                  }
                                  onChange={(e) =>
                                    handleVendor1PriceChange(
                                      material.slNo,
                                      e.target.value
                                    )
                                  }
                                  className="text-sm h-8 w-full border-blue-300 focus:border-blue-500"
                                  placeholder="Enter price"
                                  type="number"
                                  step="0.01"
                                />
                              </td>
                              <td className="w-48 px-3 py-3">
                                <Input
                                  value={
                                    editableQuotedData[material.slNo]?.vendor2
                                      ?.price || ""
                                  }
                                  className="text-sm h-8 w-full bg-gray-100"
                                  placeholder="Auto calculated"
                                  disabled
                                />
                              </td>
                              <td className="w-48 px-3 py-3">
                                <Input
                                  value={
                                    editableQuotedData[material.slNo]?.vendor3
                                      ?.price || ""
                                  }
                                  className="text-sm h-8 w-full bg-gray-100"
                                  placeholder="Auto calculated"
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSubmitMaterials}
                      disabled={
                        selectedMaterials.size === 0 ||
                        !fromDate ||
                        !toDate ||
                        !manualVendorInputs.vendor1.name.trim() ||
                        !manualVendorInputs.vendor1.gst.trim() ||
                        !manualVendorInputs.vendor2.name.trim() ||
                        !manualVendorInputs.vendor2.gst.trim() ||
                        !manualVendorInputs.vendor3.name.trim() ||
                        !manualVendorInputs.vendor3.gst.trim() ||
                        isSubmitting
                      }
                      className="px-8 py-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        `Submit Selected Materials (${selectedMaterials.size})`
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
