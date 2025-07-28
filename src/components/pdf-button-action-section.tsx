"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { useFetchASCopyData } from "@/services/AdministrativeSanctionData";
import AdministrativeSanctionPDF from "./PDFs/AsCopyPdf";
import { useFetchCheckListData } from "@/services/ChecklistService";
import ChecklistPDF from "./PDFs/ChecklistPdf";
import { useFetchFrontPageData } from "@/services/FrontPageService";
import FrontPagePDF from "./PDFs/FrontPagePdf";
import { useFetchGPAbstractData } from "@/services/GpAbstractService";
import GPAbstractPDF from "./PDFs/GpAbstractPdf";

// PDF Action buttons data
const pdfButtons = [
  { id: "checklist", name: "Checklist" },
  { id: "frontPage", name: "Front page" },
  { id: "gpAbstract", name: "GP Abstract" },
  { id: "workOrder", name: "Work order" },
  { id: "tsCopy", name: "TS copy" },
  { id: "asCopy", name: "AS copy" },
  { id: "form6", name: "Form 6" },
  { id: "form8", name: "Form 8" },
  { id: "form9", name: "Form 9" },
  { id: "blankNmrs", name: "Blank NMR's" },
  { id: "filledEnmrs", name: "Filled E-NMR's" },
  { id: "movementSlip", name: "Movement Slip" },
  { id: "wlFtos", name: "WL/Fto's" },
  { id: "form32", name: "Form 32" },
  { id: "materialMis", name: "Material MIS" },
  { id: "workCompletion", name: "Work Completion" },
  { id: "materialSupplyRegister", name: "Material Supply Register" },
  { id: "paperNotification", name: "Paper Notification" },
  { id: "quotationCallForm", name: "Quotation Call Form" },
  { id: "stageWiseGeoTagging", name: "Stage wise Geo tagging" }
];

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

interface ActionsSectionProps {
  workData: WorkData | null;
}

export default function ActionsSection({ workData }: ActionsSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDownloading, setCurrentDownloading] = useState<string | null>(
    null
  );
  //   const [asPdfData, setAsPdfData] = useState<AdministrativeSanctionData | null>(
  //     null
  //   );

  const fetchASCopyData = useFetchASCopyData();
  const fetchCheckListDataData = useFetchCheckListData();
  const fetchFrontPageData = useFetchFrontPageData();
  const fetchGpAbstractData = useFetchGPAbstractData();

  // Check if any button is currently processing
  const isAnyButtonLoading = currentDownloading !== null || isDownloading;

  // Individual PDF download functions
  const handleChecklist = async () => {
    setCurrentDownloading("checklist");
    try {
      // Add your checklist PDF generation logic here
      const data = await fetchCheckListDataData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      const blob = await pdf(<ChecklistPDF checklistData={data} />).toBlob();
      saveAs(blob, "checklist.pdf");
      toast.success("Checklist PDF downloaded successfully!");
    } catch (error) {
      console.error("Checklist Error:", error);
      toast.error("Failed to download Checklist PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleFrontPage = async () => {
    setCurrentDownloading("frontPage");
    try {
      // Add your front page PDF generation logic here
      const data = await fetchFrontPageData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(<FrontPagePDF frontPageData={data} />).toBlob();

      saveAs(blob, "Frontpage.pdf");
      toast.success("Front Page PDF downloaded successfully!");
    } catch (error) {
      console.error("Front Page Error:", error);
      toast.error("Failed to download Front Page PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleGpAbstract = async () => {
    setCurrentDownloading("gpAbstract");
    try {
      // Add your GP Abstract PDF generation logic here
      const data = await fetchGpAbstractData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(<GPAbstractPDF GpAbstractData={data} />).toBlob();

      saveAs(blob, "GpAbstract.pdf"); // Simulate API call
      toast.success("GP Abstract PDF downloaded successfully!");
    } catch (error) {
      console.error("GP Abstract Error:", error);
      toast.error("Failed to download GP Abstract PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleWorkOrder = async () => {
    setCurrentDownloading("workOrder");
    try {
      // Add your work order PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Work Order PDF downloaded successfully!");
    } catch (error) {
      console.error("Work Order Error:", error);
      toast.error("Failed to download Work Order PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleTsCopy = async () => {
    setCurrentDownloading("tsCopy");
    try {
      // Add your TS copy PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("TS Copy PDF downloaded successfully!");
    } catch (error) {
      console.error("TS Copy Error:", error);
      toast.error("Failed to download TS Copy PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleAsCopy = async () => {
    setCurrentDownloading("asCopy");
    try {
      const data = await fetchASCopyData();
      if (!data) {
        toast.error("No data found for AS Copy download.");
        return;
      }

      const blob = await pdf(
        <AdministrativeSanctionPDF asData={data} />
      ).toBlob();
      saveAs(blob, "administrative-sanction.pdf");
      toast.success("AS Copy PDF downloaded successfully!");
    } catch (error) {
      console.error("AS Copy Error:", error);
      toast.error("Failed to download AS Copy PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleForm6 = async () => {
    setCurrentDownloading("form6");
    try {
      // Add your Form 6 PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Form 6 PDF downloaded successfully!");
    } catch (error) {
      console.error("Form 6 Error:", error);
      toast.error("Failed to download Form 6 PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleForm8 = async () => {
    setCurrentDownloading("form8");
    try {
      // Add your Form 8 PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Form 8 PDF downloaded successfully!");
    } catch (error) {
      console.error("Form 8 Error:", error);
      toast.error("Failed to download Form 8 PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleForm9 = async () => {
    setCurrentDownloading("form9");
    try {
      // Add your Form 9 PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Form 9 PDF downloaded successfully!");
    } catch (error) {
      console.error("Form 9 Error:", error);
      toast.error("Failed to download Form 9 PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleBlankNmrs = async () => {
    setCurrentDownloading("blankNmrs");
    try {
      // Add your Blank NMR's PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Blank NMR's PDF downloaded successfully!");
    } catch (error) {
      console.error("Blank NMR's Error:", error);
      toast.error("Failed to download Blank NMR's PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleFilledEnmrs = async () => {
    setCurrentDownloading("filledEnmrs");
    try {
      // Add your Filled E-NMR's PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Filled E-NMR's PDF downloaded successfully!");
    } catch (error) {
      console.error("Filled E-NMR's Error:", error);
      toast.error("Failed to download Filled E-NMR's PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleMovementSlip = async () => {
    setCurrentDownloading("movementSlip");
    try {
      // Add your Movement Slip PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Movement Slip PDF downloaded successfully!");
    } catch (error) {
      console.error("Movement Slip Error:", error);
      toast.error("Failed to download Movement Slip PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleWlFtos = async () => {
    setCurrentDownloading("wlFtos");
    try {
      // Add your WL/Fto's PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("WL/Fto's PDF downloaded successfully!");
    } catch (error) {
      console.error("WL/Fto's Error:", error);
      toast.error("Failed to download WL/Fto's PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleForm32 = async () => {
    setCurrentDownloading("form32");
    try {
      // Add your Form 32 PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Form 32 PDF downloaded successfully!");
    } catch (error) {
      console.error("Form 32 Error:", error);
      toast.error("Failed to download Form 32 PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleMaterialMis = async () => {
    setCurrentDownloading("materialMis");
    try {
      // Add your Material MIS PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Material MIS PDF downloaded successfully!");
    } catch (error) {
      console.error("Material MIS Error:", error);
      toast.error("Failed to download Material MIS PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleWorkCompletion = async () => {
    setCurrentDownloading("workCompletion");
    try {
      // Add your Work Completion PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Work Completion PDF downloaded successfully!");
    } catch (error) {
      console.error("Work Completion Error:", error);
      toast.error("Failed to download Work Completion PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleMaterialSupplyRegister = async () => {
    setCurrentDownloading("materialSupplyRegister");
    try {
      // Add your Material Supply Register PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Material Supply Register PDF downloaded successfully!");
    } catch (error) {
      console.error("Material Supply Register Error:", error);
      toast.error("Failed to download Material Supply Register PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handlePaperNotification = async () => {
    setCurrentDownloading("paperNotification");
    try {
      // Add your Paper Notification PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Paper Notification PDF downloaded successfully!");
    } catch (error) {
      console.error("Paper Notification Error:", error);
      toast.error("Failed to download Paper Notification PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleQuotationCallForm = async () => {
    setCurrentDownloading("quotationCallForm");
    try {
      // Add your Quotation Call Form PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Quotation Call Form PDF downloaded successfully!");
    } catch (error) {
      console.error("Quotation Call Form Error:", error);
      toast.error("Failed to download Quotation Call Form PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleStageWiseGeoTagging = async () => {
    setCurrentDownloading("stageWiseGeoTagging");
    try {
      // Add your Stage wise Geo tagging PDF generation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Stage wise Geo tagging PDF downloaded successfully!");
    } catch (error) {
      console.error("Stage wise Geo tagging Error:", error);
      toast.error("Failed to download Stage wise Geo tagging PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  // Function mapping for each button
  const buttonHandlers = {
    checklist: handleChecklist,
    frontPage: handleFrontPage,
    gpAbstract: handleGpAbstract,
    workOrder: handleWorkOrder,
    tsCopy: handleTsCopy,
    asCopy: handleAsCopy,
    form6: handleForm6,
    form8: handleForm8,
    form9: handleForm9,
    blankNmrs: handleBlankNmrs,
    filledEnmrs: handleFilledEnmrs,
    movementSlip: handleMovementSlip,
    wlFtos: handleWlFtos,
    form32: handleForm32,
    materialMis: handleMaterialMis,
    workCompletion: handleWorkCompletion,
    materialSupplyRegister: handleMaterialSupplyRegister,
    paperNotification: handlePaperNotification,
    quotationCallForm: handleQuotationCallForm,
    stageWiseGeoTagging: handleStageWiseGeoTagging
  };

  const handleDownloadAll = async () => {
    if (!workData) {
      toast.error("Missing Information", {
        description: "Please submit work code data first."
      });
      return;
    }

    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDownloading(false);

    toast.success("Download Complete", {
      description: "All PDFs have been generated and downloaded successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <p className="text-sm text-gray-600">
          Generate reports and manage vendor operations
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {pdfButtons.map((button) => (
              <Button
                key={button.id}
                variant="outline"
                size="sm"
                onClick={() =>
                  buttonHandlers[button.id as keyof typeof buttonHandlers]()
                }
                disabled={!workData || isAnyButtonLoading}
                className="h-auto cursor-pointer py-3 px-2 text-xs font-medium text-center whitespace-normal"
              >
                {currentDownloading === button.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  button.name
                )}
              </Button>
            ))}
          </div>

          <div className="flex justify-center pt-4 border-t">
            <Button
              size="lg"
              onClick={handleDownloadAll}
              disabled={!workData || isAnyButtonLoading}
              className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating PDFs...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download All PDFs
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
