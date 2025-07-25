import { useState } from "react";
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
import { Plus } from "lucide-react";
import { Combobox } from "./combobox";
import { toast } from "sonner";

// Sample vendor data
const vendorData = [
  { id: 1, name: "ABC Corporation Ltd", gst: "27AAAAA0000A1Z5" },
  { id: 2, name: "XYZ Industries Pvt Ltd", gst: "19BBBBB1111B2Y6" },
  { id: 3, name: "Tech Solutions Inc", gst: "29CCCCC2222C3X7" },
  { id: 4, name: "Global Enterprises", gst: "24DDDDD3333D4W8" },
  { id: 5, name: "Prime Contractors", gst: "36EEEEE4444E5V9" }
];

// Sample material data
const materialData = [
  { id: 1, name: "Cement (50kg bags)", unit: "bags" },
  { id: 2, name: "Steel Rods (12mm)", unit: "kg" },
  { id: 3, name: "Bricks (Red Clay)", unit: "pieces" },
  { id: 4, name: "Sand (River Sand)", unit: "cubic feet" },
  { id: 5, name: "Gravel (20mm)", unit: "cubic feet" },
  { id: 6, name: "Paint (Exterior)", unit: "liters" },
  { id: 7, name: "Tiles (Ceramic)", unit: "sq ft" },
  { id: 8, name: "Electrical Wire", unit: "meters" },
  { id: 9, name: "PVC Pipes", unit: "meters" },
  { id: 10, name: "Labor (Skilled)", unit: "days" }
];

// Backend vendor quoted data structure
const backendVendorPrices = {
  1: { vendor1: "450", vendor2: "420", vendor3: "480" },
  2: { vendor1: "65", vendor2: "62", vendor3: "68" },
  3: { vendor1: "8", vendor2: "7.5", vendor3: "9" },
  4: { vendor1: "25", vendor2: "22", vendor3: "28" },
  5: { vendor1: "30", vendor2: "28", vendor3: "35" },
  6: { vendor1: "120", vendor2: "110", vendor3: "140" },
  7: { vendor1: "45", vendor2: "40", vendor3: "55" },
  8: { vendor1: "15", vendor2: "12", vendor3: "18" },
  9: { vendor1: "35", vendor2: "32", vendor3: "40" },
  10: { vendor1: "800", vendor2: "750", vendor3: "900" }
};

interface MaterialQuotedData {
  price: string;
}

export default function VendorInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = useState(false);

  // Vendor inputs are empty initially
  const [selectedVendors, setSelectedVendors] = useState({
    vendor1: null as number | null,
    vendor2: null as number | null,
    vendor3: null as number | null
  });

  // Add state for units
  const [materialUnits, setMaterialUnits] = useState<{
    [materialId: number]: string;
  }>(() => {
    const initialUnits: { [materialId: number]: string } = {};
    materialData.forEach((material) => {
      initialUnits[material.id] = material.unit;
    });
    return initialUnits;
  });

  // Pre-load all price data from backend
  const [editableQuotedData, setEditableQuotedData] = useState<{
    [materialId: number]: {
      vendor1: MaterialQuotedData;
      vendor2: MaterialQuotedData;
      vendor3: MaterialQuotedData;
    };
  }>(() => {
    const initialData: {
      [materialId: number]: {
        vendor1: MaterialQuotedData;
        vendor2: MaterialQuotedData;
        vendor3: MaterialQuotedData;
      };
    } = {};
    materialData.forEach((material) => {
      initialData[material.id] = {
        vendor1: { price: backendVendorPrices[material.id]?.vendor1 || "" },
        vendor2: { price: backendVendorPrices[material.id]?.vendor2 || "" },
        vendor3: { price: backendVendorPrices[material.id]?.vendor3 || "" }
      };
    });
    return initialData;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMaterials(new Set(materialData.map((m) => m.id)));
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

  const handleVendorSelect = (
    vendorColumn: "vendor1" | "vendor2" | "vendor3",
    vendorId: number | null
  ) => {
    setSelectedVendors((prev) => ({
      ...prev,
      [vendorColumn]: vendorId
    }));
  };

  const handleQuotedDataChange = (
    materialId: number,
    vendorColumn: "vendor1" | "vendor2" | "vendor3",
    value: string
  ) => {
    setEditableQuotedData((prev) => ({
      ...prev,
      [materialId]: {
        ...prev[materialId],
        [vendorColumn]: {
          price: value
        }
      }
    }));
  };

  const handleSubmitMaterials = () => {
    const selectedMaterialsData = materialData
      .filter((material) => selectedMaterials.has(material.id))
      .map((material) => ({
        material,
        unit: materialUnits[material.id],
        vendors: {
          vendor1: {
            assignedVendorId: selectedVendors.vendor1,
            priceData: editableQuotedData[material.id]?.vendor1
          },
          vendor2: {
            assignedVendorId: selectedVendors.vendor2,
            priceData: editableQuotedData[material.id]?.vendor2
          },
          vendor3: {
            assignedVendorId: selectedVendors.vendor3,
            priceData: editableQuotedData[material.id]?.vendor3
          }
        }
      }));

    console.log("Selected materials with vendors:", selectedMaterialsData);

    toast.success("Materials Submitted", {
      description: `${selectedMaterials.size} materials submitted with vendor information.`
    });

    setIsModalOpen(false);
  };

  return (
    <Card className="border border-red-600">
      <CardHeader>
        <CardTitle>Vendor Information</CardTitle>
        <p className="text-sm text-gray-600">
          Manage vendor materials and quotations
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger className="" asChild>
              <Button className="px-8 py-3">
                <Plus className="w-4 h-4 mr-2" />
                Manage Vendor Materials
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw]  max-w-none max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Material & Vendor Management</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 ">
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
                    Select All Materials
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
                          <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                            Material
                          </th>
                          <th className="w-32 px-3 py-3 text-left text-sm font-medium text-gray-900">
                            Units
                          </th>
                          <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                            <div className="space-y-2">
                              <div>Select Vendor</div>
                              <Combobox
                                options={vendorData.map((v) => ({
                                  value: v.id,
                                  label: v.name
                                }))}
                                value={selectedVendors.vendor1}
                                onValueChange={(value) =>
                                  handleVendorSelect("vendor1", value)
                                }
                                placeholder="Search vendors..."
                                emptyText="No vendor found."
                              />
                              <div className="mt-2">
                                <Label className="text-xs text-gray-600">
                                  Price
                                </Label>
                              </div>
                            </div>
                          </th>
                          <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                            <div className="space-y-2">
                              <div>Vendor Input</div>
                              <Combobox
                                options={vendorData.map((v) => ({
                                  value: v.id,
                                  label: v.name
                                }))}
                                value={selectedVendors.vendor2}
                                onValueChange={(value) =>
                                  handleVendorSelect("vendor2", value)
                                }
                                placeholder="Search vendors..."
                                emptyText="No vendor found."
                              />
                              <div className="mt-2">
                                <Label className="text-xs text-gray-600">
                                  Price
                                </Label>
                              </div>
                            </div>
                          </th>
                          <th className="w-48 px-3 py-3 text-left text-sm font-medium text-gray-900">
                            <div className="space-y-2">
                              <div>Vendor Input</div>
                              <Combobox
                                options={vendorData.map((v) => ({
                                  value: v.id,
                                  label: v.name
                                }))}
                                value={selectedVendors.vendor3}
                                onValueChange={(value) =>
                                  handleVendorSelect("vendor3", value)
                                }
                                placeholder="Search vendors..."
                                emptyText="No vendor found."
                              />
                              <div className="mt-2">
                                <Label className="text-xs text-gray-600">
                                  Price
                                </Label>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {materialData.map((material) => (
                          <tr
                            key={material.id}
                            className="hover:bg-gray-50 h-16"
                          >
                            <td className="w-16 px-3 py-3">
                              <Checkbox
                                checked={selectedMaterials.has(material.id)}
                                onCheckedChange={(checked) =>
                                  handleMaterialSelect(
                                    material.id,
                                    checked as boolean
                                  )
                                }
                              />
                            </td>
                            <td className="w-48 px-3 py-3">
                              <div>
                                <p className="font-medium text-gray-900 text-sm truncate">
                                  {material.name}
                                </p>
                              </div>
                            </td>
                            <td className="w-32 px-3 py-3">
                              <Input
                                value={materialUnits[material.id] || ""}
                                onChange={(e) =>
                                  handleUnitChange(material.id, e.target.value)
                                }
                                className="text-sm h-8 w-full"
                                placeholder="Enter unit"
                              />
                            </td>
                            <td className="w-48 px-3 py-3">
                              <Input
                                value={
                                  editableQuotedData[material.id]?.vendor1
                                    ?.price || ""
                                }
                                onChange={(e) =>
                                  handleQuotedDataChange(
                                    material.id,
                                    "vendor1",
                                    e.target.value
                                  )
                                }
                                className="text-sm h-8 w-full"
                                placeholder="Enter price"
                              />
                            </td>
                            <td className="w-48 px-3 py-3">
                              <Input
                                value={
                                  editableQuotedData[material.id]?.vendor2
                                    ?.price || ""
                                }
                                onChange={(e) =>
                                  handleQuotedDataChange(
                                    material.id,
                                    "vendor2",
                                    e.target.value
                                  )
                                }
                                className="text-sm h-8 w-full"
                                placeholder="Enter price"
                              />
                            </td>
                            <td className="w-48 px-3 py-3">
                              <Input
                                value={
                                  editableQuotedData[material.id]?.vendor3
                                    ?.price || ""
                                }
                                onChange={(e) =>
                                  handleQuotedDataChange(
                                    material.id,
                                    "vendor3",
                                    e.target.value
                                  )
                                }
                                className="text-sm h-8 w-full"
                                placeholder="Enter price"
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
                    disabled={selectedMaterials.size === 0}
                    className="px-8 py-2"
                  >
                    Submit Selected Materials ({selectedMaterials.size})
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
