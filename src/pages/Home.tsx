"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import WorkCodeForm from "@/components/work-code-form";
import VendorInformation from "@/components/vendor-information";
import ActionsSection from "@/components/pdf-button-action-section";

interface WorkData {
  vendorName: string;
  vendorGstNo: string;
  workDetail: {
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

export default function Home() {
  const [workData, setWorkData] = useState<WorkData | null>(null);

  const handleWorkDataSubmitted = (data: WorkData) => {
    setWorkData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Work Code & Vendor Management System
          </h1>
          <p className="text-gray-600 mt-2">
            Manage work codes, financial years, and vendor information
          </p>
        </div>

        {/* Component 1: Work Code & Financial Year */}
        <WorkCodeForm onWorkDataSubmitted={handleWorkDataSubmitted} />

        {/* Component 2: Vendor Information */}
        <VendorInformation />

        {/* Component 3: Actions */}
        <ActionsSection workData={workData} />

        {/* Status Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  System Status: Active
                </span>
              </div>
              <div className="text-gray-600">
                Data Status: {workData ? "Retrieved" : "Pending"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
