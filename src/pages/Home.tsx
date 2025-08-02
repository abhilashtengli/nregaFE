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
    <div className="min-h-screen bg-gradient-to-r from-violet-100 to-white 0 p-4 ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            NREGA PDF Generator
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional PDF report generation for work codes, financial
            management, and vendor information
          </p>
        </div>

        {/* Component 1: Work Code & Financial Year */}
        <WorkCodeForm onWorkDataSubmitted={handleWorkDataSubmitted} />

        {/* Component 2: Vendor Information */}
        <VendorInformation />

        {/* Component 3: Actions */}
        <ActionsSection workData={workData} />

        {/* Status Information */}
        <Card className="bg-gradient-to-r from-green-50 via-indigo-50 to-gray-100 border border-blue-200/50 shadow-lg backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200">
                    System Status: Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      workData ? "bg-blue-500" : "bg-amber-500"
                    } animate-pulse`}
                  ></div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      workData
                        ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200"
                        : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    Data Status: {workData ? "Retrieved" : "Pending"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Last Updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
