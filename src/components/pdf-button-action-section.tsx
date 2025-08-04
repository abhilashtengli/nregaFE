import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { Document, pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { useFetchASCopyData } from "@/services/AdministrativeSanctionData";
import AdministrativeSanctionPDF from "./PDFs/AsCopyPdf";
import { useFetchCheckListData } from "@/services/ChecklistService";
import ChecklistPDF from "./PDFs/ChecklistPdf";
import { useFetchFrontPageData } from "@/services/FrontPageService";
import FrontPagePDF from "./PDFs/FrontPagePdf";
import { useFetchGPAbstractData } from "@/services/GpAbstractService";
import GPAbstractPDF from "./PDFs/GpAbstractPdf";
import { useFetchWorkOrderData } from "@/services/WorkOrderService";
import WorkOrderPDF from "./PDFs/WorkOrderPdf";
import TechnicalSanctionPDF from "./PDFs/TsCopy";
import { useFetchTSCopyData } from "@/services/TsCopyService";
import { useFetchForm6Data } from "@/services/Form6Service";
import Form6PDF from "./PDFs/Form6Pdf";
import { useFetchForm8Data } from "@/services/Form8Service";
import Form8PDF from "./PDFs/Form8Pdf";
import { useFetchForm9Data } from "@/services/Form9Service";
import Form9PDF from "./PDFs/Form9Pdf";
import MovementSlipPDF from "./PDFs/MovementSlipPdf";
import { useFetchMovementSlip } from "@/services/MovementSlipService";
import { useFetchWLFTOData } from "@/services/WlFtoService";
import WLFTOPdf from "./PDFs/WlFtoPdf";
import Form32PDF from "./PDFs/Form32Pdf";
import { useFetchForm32Data } from "@/services/Form32Service";
import { useFetchMaterialMIS } from "@/services/MaterialMisService";
import MaterialMisPDF from "./PDFs/MaterialMisPdf";
import { useFetchWorkCompletion } from "@/services/WorkCompletionService";
import WorkCompletionPDF from "./PDFs/WorkCompletionPdf";
import { useFetchPaperNotification } from "@/services/PaperNotificationService";
import PaperNotificationPDF from "./PDFs/PaperNotificationPdf";
import { useFetchStagewiseGeoTagging } from "@/services/StageWiseGeotaggingService";
import StageWisePhotosPDF from "./PDFs/StageWiseGeoTaggingPdf";
import { useFetchComparativeStatement } from "@/services/ComparativeStatementService";
import QuotationCallPDF from "./PDFs/ComparativeStatement/QuotationCallPdf";
import ComparativeStatementPDF from "./PDFs/ComparativeStatement/ComparativePdf";
import SupplyOrderPDF from "./PDFs/ComparativeStatement/SupplyOrderPdf";
import { useFetchBlankNMRData } from "@/services/BlankNmrService";
import { useFetchFilledNMRData } from "@/services/FilledNmrService";
import FilledENmrPDF from "./PDFs/FilledNmrPdf";
import { useFetchMaterialSupplyRegister } from "@/services/MaterialSupplyRegisterService";
import MaterialSupplyRegisterPDF from "./PDFs/MaterialSupplyRegisterPdf";
import BlankNMRPDF from "./PDFs/BlankNmrPdf";
import { addDays } from "@/utils/addDays";
import { useWorkStore } from "@/stores/workStore";
import {
  fetchInvoiceDetails,
  fetchMaterialMisDataForInvoice,
  transformMaterialData
} from "@/services/invoiceService";
import InvoicePDF from "./PDFs/InvoicePdf";
import Contractor1QuotationPDF from "./PDFs/ComparativeStatement/Contractor1Quotation";
import Contractor2QuotationPDF from "./PDFs/ComparativeStatement/Contractor2Quotation";
import Contractor3QuotationPDF from "./PDFs/ComparativeStatement/Contractor3Quotation";
import { useVendorUpdateStore } from "@/stores/useVendorUpdateStore";

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
  { id: "stageWiseGeoTagging", name: "Stage wise Geo tagging" },
  { id: "invoice", name: "Invoice" }
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
  const [downloadProgress, setDownloadProgress] = useState<string>("");

  const [currentDownloading, setCurrentDownloading] = useState<string | null>(
    null
  );
  const { hasVendorUpdate } = useVendorUpdateStore();
  useEffect(() => {}, [hasVendorUpdate]);

  const fetchASCopyData = useFetchASCopyData();
  const fetchCheckListDataData = useFetchCheckListData();
  const fetchFrontPageData = useFetchFrontPageData();
  const fetchGpAbstractData = useFetchGPAbstractData();
  const fetchWorkOrderData = useFetchWorkOrderData();
  const fetchTsCopyData = useFetchTSCopyData();
  const fetchForm6Data = useFetchForm6Data();
  const fetchForm8Data = useFetchForm8Data();
  const fetchForm9Data = useFetchForm9Data();
  const fetchMovementSlipData = useFetchMovementSlip();
  const fetchWlFtoData = useFetchWLFTOData();
  const fetchForm32Data = useFetchForm32Data();
  const fetchMaterialMisData = useFetchMaterialMIS();
  const fetchWorkCompletionData = useFetchWorkCompletion();
  const fetchPaperNotificationData = useFetchPaperNotification();
  const fetchSwgData = useFetchStagewiseGeoTagging();
  const fetchAllQuotationPdfData = useFetchComparativeStatement();
  const fetchBlankNMRData = useFetchBlankNMRData();
  const fetchFilledNMRData = useFetchFilledNMRData();
  const fetchMaterialSupplyRegisteryData = useFetchMaterialSupplyRegister();

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

      const blob = await pdf(
        <Document>
          <ChecklistPDF checklistData={data} />
        </Document>
      ).toBlob();
      saveAs(blob, "checklist.pdf");
      toast.success("Checklist PDF downloaded successfully!");
    } catch (error) {
      console.error("Checklist Error:", error);
      toast.error("Failed to download Checklist PDF");
    } finally {
      setCurrentDownloading(null);
    }
  };

  const handleInvoice = async () => {
    setCurrentDownloading("invoice");
    try {
      const { workDetail } = useWorkStore.getState(); // if inside function scope
      const id = workDetail?.id;

      if (!id) {
        toast.error("No work code found.");
        return;
      }

      const response = await fetchMaterialMisDataForInvoice(id);

      if (!response.success || !response.data) {
        toast.error(response.message || "Failed to fetch Material MIS data.");
        return;
      }

      const transformedData = transformMaterialData(response.data);
      const workCode = transformedData.workCode;
      const workName = transformedData.workName;

      const workDataResponse = await fetchInvoiceDetails(id);
      const gst = workDataResponse.data?.vendorDetails?.vendorGstOne || "";
      const vendorName =
        workDataResponse.data?.vendorDetails?.vendorNameOne || "";
      const block = workDataResponse.data?.workDetails.block || "";
      const district = workDataResponse.data?.workDetails.district || "";
      const panchayat = workDataResponse.data?.workDetails.panchayat || "";

      if (!workDataResponse.success || !workDataResponse.data) {
        toast.error(response.message || "Failed to Invoice data.");
        return;
      }
      const doc = (
        <Document>
          {transformedData.bills.map((bill) => (
            <InvoicePDF
              key={bill.billNo}
              bill={bill}
              workCode={workCode}
              workName={workName}
              vendorGstOne={gst}
              vendorNameOne={vendorName}
              block={block}
              district={district}
              panchayat={panchayat}
            />
          ))}
        </Document>
      );

      const blob = await pdf(doc).toBlob();

      saveAs(blob, "Invoice.pdf");
      toast.success("Invoice PDF downloaded successfully!");
    } catch (error) {
      console.error("Invoice Download Error:", error);
      toast.error("Failed to download Invoice PDF.");
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

      const blob = await pdf(
        <Document>
          <FrontPagePDF frontPageData={data} />
        </Document>
      ).toBlob();

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

      const blob = await pdf(
        <Document>
          <GPAbstractPDF GpAbstractData={data} />
        </Document>
      ).toBlob();

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
      const data = await fetchWorkOrderData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <WorkOrderPDF workOrderData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Workorder.pdf"); // Simulate API call
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
      const data = await fetchTsCopyData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <TechnicalSanctionPDF tsData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "TsCopy.pdf"); // Simulate API call
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
        <Document>
          <AdministrativeSanctionPDF asData={data} />
        </Document>
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
      const data = await fetchForm6Data();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <Form6PDF form6Data={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "form6.pdf");
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
      const data = await fetchForm8Data();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      const blob = await pdf(
        <Document>
          <Form8PDF form8Data={data.form8Data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Form8.pdf");
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
      const data = await fetchForm9Data();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <Form9PDF form9Data={data.form9Data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Form9.pdf"); // Simulate API call
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
      const data = await fetchBlankNMRData();

      if (!data) {
        toast.error("No data found for download.");
        return;
      }
      console.log("DATA : ", data);

      // Prepare the document with multiple NMRs
      const doc = (
        <Document>
          {data.workerData.map(
            (musterRoll: {
              mustrollNo: string;
              workers: {
                slNo: number;
                jobCardNo: string;
                familyHeadName: string;
                requestLetterFrom: string;
                accountNo: string;
              }[];
            }) => (
              <BlankNMRPDF
                key={musterRoll.mustrollNo}
                district={data.district}
                taluka={data.taluka}
                gramPanchayat={data.gramPanchayat}
                financialYear={data.financialYear}
                workCode={data.workCode}
                workName={data.workName}
                fromDate={data.fromDate}
                toDate={data.toDate}
                technicalSanctionNo={data.technicalSanctionNo}
                technicalSanctionDate={data.technicalSanctionDate}
                financialSanctionNo={data.financialSanctionNo}
                financialSanctionDate={data.financialSanctionDate}
                musterRollNo={musterRoll.mustrollNo}
                workerData={musterRoll.workers}
              />
            )
          )}
        </Document>
      );

      const blob = await pdf(doc).toBlob();

      saveAs(blob, "Blank-NMR.pdf");
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
      const data = await fetchFilledNMRData();

      if (!data) {
        toast.error("No data found for download.");
        return;
      }
      console.log("DATA : ", data);

      // Prepare the document with multiple NMRs
      const doc = (
        <Document>
          {data.workersData.map((musterRoll) => (
            <FilledENmrPDF
              key={musterRoll.musterRollNo}
              district={data.district}
              taluka={data.taluka}
              panchayat={data.panchayat}
              approvalNo={data.approvalNo}
              approvalDate={data.approvalDate}
              workCode={data.workCode}
              workName={data.workName}
              financialYear={data.financialYear}
              totalWage={data.totalWage}
              wage={data.wage}
              totalAttendanceCount={data.totalAttendanceCount}
              // Props specific to this muster roll
              musterRollNo={musterRoll.musterRollNo}
              fromDate={musterRoll.fromDate}
              toDate={musterRoll.toDate}
              workersData={musterRoll.data}
            />
          ))}
        </Document>
      );

      const blob = await pdf(doc).toBlob();

      saveAs(blob, "Filled-NMR.pdf");
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
      const data = await fetchMovementSlipData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <MovementSlipPDF movementSlipData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Movementslip.pdf");
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
      const data = await fetchWlFtoData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <WLFTOPdf wlfto={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Wl-Fto.pdf"); // Simulate API call
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
      const data = await fetchForm32Data();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <Form32PDF form32Data={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Form32.pdf");
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
      const data = await fetchMaterialMisData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <MaterialMisPDF data={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "MaterialMis.pdf"); // Simulate API call
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
      const data = await fetchWorkCompletionData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <WorkCompletionPDF workCompletionData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Work-completion.pdf");
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
      const data = await fetchMaterialSupplyRegisteryData();

      if (!data) {
        toast.error("No data found for download.");
        return;
      }
      console.log("DATA : ", data);

      // Prepare the document with multiple NMRs
      const doc = (
        <Document>
          <MaterialSupplyRegisterPDF
            workCode={data.workCode}
            workName={data.workName}
            vendorName={data.vendorName}
            materialData={data.materialData}
          />
        </Document>
      );

      const blob = await pdf(doc).toBlob();

      saveAs(blob, "Material-Supply-Register.pdf");
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
      const data = await fetchPaperNotificationData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <PaperNotificationPDF paperNotificationData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Paper-Notification.pdf");
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
      const data = await fetchAllQuotationPdfData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }
      const comparativeStatementDate = addDays(data.tenderPublishDate, 9);
      const supplyOrderDate = addDays(data.tenderPublishDate, 10);
      console.log(
        `comparativeStatementDate Date  : `,
        comparativeStatementDate
      );
      console.log(`supplyOrderDate Date  : `, supplyOrderDate);

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <QuotationCallPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            administrativeSanction={data.administrativeSanction}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={data.tenderPublishDate}
            tenderSubmissionDate={data.tenderSubmissionDate}
            materialData={data.materialData}
          />
          <ComparativeStatementPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={comparativeStatementDate}
            vendorDetails={data.vendorDetails}
            vendorWithVendorQuotation={data.vendorWithVendorQuotation}
          />
          <Contractor1QuotationPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={
              data.vendorDetails.VendorOneQuotationSubmissiondate
            }
            contractorNumber={1}
            contractorName={data.vendorDetails.vendorNameOne}
            contractorGst={data.vendorDetails.vendorGstOne}
            quotationSubmissionDate={
              data.vendorDetails.VendorOneQuotationSubmissiondate
            }
            vendorWithVendorQuotation={data.vendorWithVendorQuotation}
          />
          <Contractor2QuotationPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={
              data.vendorDetails.vendorTwoQuotationSubmissiondate
            }
            contractorNumber={2}
            contractorName={data.vendorDetails.vendorNameTwo}
            contractorGst={data.vendorDetails.vendorGstTwo}
            quotationSubmissionDate={
              data.vendorDetails.vendorTwoQuotationSubmissiondate
            }
            vendorWithVendorQuotation={data.vendorWithVendorQuotation}
          />
          <Contractor3QuotationPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={
              data.vendorDetails.vendorThreeQuotationSubmissiondate
            }
            contractorNumber={3}
            contractorName={data.vendorDetails.vendorNameThree}
            contractorGst={data.vendorDetails.vendorGstThree}
            quotationSubmissionDate={
              data.vendorDetails.vendorThreeQuotationSubmissiondate
            }
            vendorWithVendorQuotation={data.vendorWithVendorQuotation}
          />
          <SupplyOrderPDF
            gramPanchayat={data.gramPanchayat}
            taluka={data.taluka}
            district={data.district}
            year={data.year}
            workCode={data.workCode}
            workName={data.workName}
            tenderPublishDate={supplyOrderDate}
            winnerContractorName={data.vendorDetails.vendorNameOne}
            winnerContractorGst={data.vendorDetails.vendorGstOne}
            winnerQuotationSubmissionDate={
              data.vendorDetails.VendorOneQuotationSubmissiondate
            }
            vendorWithVendorQuotation={data.vendorWithVendorQuotation}
            address=""
          />
        </Document>
      ).toBlob();

      saveAs(
        blob,
        "QuotationCall-comparativeStatement-3vendorsQuotation-supplyOrder.pdf"
      );
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
      const data = await fetchSwgData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <Document>
          <StageWisePhotosPDF sWGTData={data} />
        </Document>
      ).toBlob();

      saveAs(blob, "Stage-wise-geo-tagging.pdf");
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
    stageWiseGeoTagging: handleStageWiseGeoTagging,
    invoice: handleInvoice
  };

  const handleDownloadAll = async () => {
    if (!workData) {
      toast.error("Missing Information", {
        description: "Please submit work code data first."
      });
      return;
    }

    setIsDownloading(true);
    setDownloadProgress("Fetching data...");

    try {
      // Create an array to track successful components
      const successfulComponents: string[] = [];
      const failedComponents: string[] = [];

      // Helper function to safely fetch data
      const safeFetch = async <T,>(
        fetchFn: () => Promise<T | null>,
        name: string
      ): Promise<T | null> => {
        try {
          setDownloadProgress(`Fetching ${name}...`);
          const data = await fetchFn();
          if (data) {
            successfulComponents.push(name);
          }
          return data;
        } catch (error) {
          console.error(`Failed to fetch ${name}:`, error);
          failedComponents.push(name);
          return null;
        }
      };

      // Fetch all data with progress updates
      const [
        asData,
        checklistData,
        frontPageData,
        gpAbstractData,
        workOrderData,
        tsData,
        form6Data,
        form8Data,
        form9Data,
        movementSlipData,
        wlFtoData,
        form32Data,
        materialMisData,
        workCompletionData,
        paperNotificationData,
        swgData,
        quotationData,
        blankNMRData,
        filledNMRData,
        materialSupplyRegisterData
      ] = await Promise.all([
        safeFetch(fetchASCopyData, "AS Copy"),
        safeFetch(fetchCheckListDataData, "Checklist"),
        safeFetch(fetchFrontPageData, "Front Page"),
        safeFetch(fetchGpAbstractData, "GP Abstract"),
        safeFetch(fetchWorkOrderData, "Work Order"),
        safeFetch(fetchTsCopyData, "TS Copy"),
        safeFetch(fetchForm6Data, "Form 6"),
        safeFetch(fetchForm8Data, "Form 8"),
        safeFetch(fetchForm9Data, "Form 9"),
        safeFetch(fetchMovementSlipData, "Movement Slip"),
        safeFetch(fetchWlFtoData, "WL/FTO"),
        safeFetch(fetchForm32Data, "Form 32"),
        safeFetch(fetchMaterialMisData, "Material MIS"),
        safeFetch(fetchWorkCompletionData, "Work Completion"),
        safeFetch(fetchPaperNotificationData, "Paper Notification"),
        safeFetch(fetchSwgData, "Stage-wise Geo Tagging"),
        safeFetch(fetchAllQuotationPdfData, "Quotation Forms"),
        safeFetch(fetchBlankNMRData, "Blank NMRs"),
        safeFetch(fetchFilledNMRData, "Filled NMRs"),
        safeFetch(fetchMaterialSupplyRegisteryData, "Material Supply Register")
      ]);

      setDownloadProgress("Generating PDFs...");

      // Create an array to hold all PDF components
      const allPdfComponents: React.ReactElement[] = [];

      // Helper to add component with error handling
      const addComponent = (component: React.ReactElement, name: string) => {
        try {
          allPdfComponents.push(component);
        } catch (error) {
          console.error(`Failed to add ${name} component:`, error);
          failedComponents.push(name);
        }
      };

      // Add all components (same as before, but with error handling)
      if (checklistData)
        addComponent(
          <ChecklistPDF key="checklist" checklistData={checklistData} />,
          "Checklist"
        );
      if (frontPageData)
        addComponent(
          <FrontPagePDF key="frontpage" frontPageData={frontPageData} />,
          "Front Page"
        );
      if (gpAbstractData)
        addComponent(
          <GPAbstractPDF key="gpabstract" GpAbstractData={gpAbstractData} />,
          "GP Abstract"
        );
      if (workOrderData)
        addComponent(
          <WorkOrderPDF key="workorder" workOrderData={workOrderData} />,
          "Work Order"
        );
      if (tsData)
        addComponent(
          <TechnicalSanctionPDF key="tscopy" tsData={tsData} />,
          "TS Copy"
        );
      if (asData)
        addComponent(
          <AdministrativeSanctionPDF key="ascopy" asData={asData} />,
          "AS Copy"
        );
      if (form6Data)
        addComponent(<Form6PDF key="form6" form6Data={form6Data} />, "Form 6");
      if (form8Data)
        addComponent(
          <Form8PDF key="form8" form8Data={form8Data.form8Data} />,
          "Form 8"
        );
      if (form9Data)
        addComponent(
          <Form9PDF key="form9" form9Data={form9Data.form9Data} />,
          "Form 9"
        );

      // Handle multiple page documents
      if (blankNMRData?.workerData) {
        blankNMRData.workerData.forEach(
          (
            musterRoll: {
              mustrollNo: string;
              workers: {
                slNo: number;
                jobCardNo: string;
                familyHeadName: string;
                requestLetterFrom: string;
                accountNo: string;
              }[];
            },
            index: number
          ) => {
            addComponent(
              <BlankNMRPDF
                key={`blanknmr-${index}`}
                district={blankNMRData.district}
                taluka={blankNMRData.taluka}
                gramPanchayat={blankNMRData.gramPanchayat}
                financialYear={blankNMRData.financialYear}
                workCode={blankNMRData.workCode}
                workName={blankNMRData.workName}
                fromDate={blankNMRData.fromDate}
                toDate={blankNMRData.toDate}
                technicalSanctionNo={blankNMRData.technicalSanctionNo}
                technicalSanctionDate={blankNMRData.technicalSanctionDate}
                financialSanctionNo={blankNMRData.financialSanctionNo}
                financialSanctionDate={blankNMRData.financialSanctionDate}
                musterRollNo={musterRoll.mustrollNo}
                workerData={musterRoll.workers}
              />,
              `Blank NMR ${index + 1}`
            );
          }
        );
      }

      if (filledNMRData?.workersData) {
        filledNMRData.workersData.forEach(
          (
            musterRoll: {
              musterRollNo: string | undefined;
              fromDate: string | undefined;
              toDate: string | undefined;
              data: {
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
              }[];
            },
            index: number
          ) => {
            addComponent(
              <FilledENmrPDF
                key={`fillednmr-${index}`}
                district={filledNMRData.district}
                taluka={filledNMRData.taluka}
                panchayat={filledNMRData.panchayat}
                approvalNo={filledNMRData.approvalNo}
                approvalDate={filledNMRData.approvalDate}
                workCode={filledNMRData.workCode}
                workName={filledNMRData.workName}
                financialYear={filledNMRData.financialYear}
                totalWage={filledNMRData.totalWage}
                wage={filledNMRData.wage}
                totalAttendanceCount={filledNMRData.totalAttendanceCount}
                musterRollNo={musterRoll.musterRollNo}
                fromDate={musterRoll.fromDate}
                toDate={musterRoll.toDate}
                workersData={musterRoll.data}
              />,
              `Filled NMR ${index + 1}`
            );
          }
        );
      }

      // Add remaining components...
      if (movementSlipData)
        addComponent(
          <MovementSlipPDF
            key="movementslip"
            movementSlipData={movementSlipData}
          />,
          "Movement Slip"
        );
      if (wlFtoData)
        addComponent(<WLFTOPdf key="wlfto" wlfto={wlFtoData} />, "WL/FTO");
      if (form32Data)
        addComponent(
          <Form32PDF key="form32" form32Data={form32Data} />,
          "Form 32"
        );
      if (materialMisData)
        addComponent(
          <MaterialMisPDF key="materialmis" data={materialMisData} />,
          "Material MIS"
        );
      if (workCompletionData)
        addComponent(
          <WorkCompletionPDF
            key="workcompletion"
            workCompletionData={workCompletionData}
          />,
          "Work Completion"
        );

      if (materialSupplyRegisterData) {
        addComponent(
          <MaterialSupplyRegisterPDF
            key="materialsupplyregister"
            workCode={materialSupplyRegisterData.workCode}
            workName={materialSupplyRegisterData.workName}
            vendorName={materialSupplyRegisterData.vendorName}
            materialData={materialSupplyRegisterData.materialData}
          />,
          "Material Supply Register"
        );
      }

      if (paperNotificationData) {
        addComponent(
          <PaperNotificationPDF
            key="papernotification"
            paperNotificationData={paperNotificationData}
          />,
          "Paper Notification"
        );
      }

      // Add quotation documents
      if (quotationData) {
        const comparativeStatementDate = addDays(
          quotationData.tenderPublishDate,
          9
        );
        const supplyOrderDate = addDays(quotationData.tenderPublishDate, 10);
        console.log(
          "comparativeStatementDate combine : ",
          comparativeStatementDate
        );
        console.log("supplyOrderDate combine : ", supplyOrderDate);

        addComponent(
          <QuotationCallPDF
            key="quotationcall"
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            administrativeSanction={quotationData.administrativeSanction}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={quotationData.tenderPublishDate}
            tenderSubmissionDate={quotationData.tenderSubmissionDate}
            materialData={quotationData.materialData}
          />,
          "Quotation Call"
        );

        addComponent(
          <ComparativeStatementPDF
            key="comparativestatement"
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={comparativeStatementDate}
            vendorDetails={quotationData.vendorDetails}
            vendorWithVendorQuotation={quotationData.vendorWithVendorQuotation}
          />,
          "Comparative Statement"
        );

        // Add contractor quotations
        const contractors = [
          {
            name: quotationData.vendorDetails.vendorNameOne,
            gst: quotationData.vendorDetails.vendorGstOne,
            date: quotationData.vendorDetails.VendorOneQuotationSubmissiondate,
            number: 1
          },
          {
            name: quotationData.vendorDetails.vendorNameTwo,
            gst: quotationData.vendorDetails.vendorGstTwo,
            date: quotationData.vendorDetails.vendorTwoQuotationSubmissiondate,
            number: 2
          },
          {
            name: quotationData.vendorDetails.vendorNameThree,
            gst: quotationData.vendorDetails.vendorGstThree,
            date: quotationData.vendorDetails
              .vendorThreeQuotationSubmissiondate,
            number: 3
          }
        ];

        // contractors.forEach((contractor, index) => {
        //   addComponent(
        //     <ContractorQuotationPDF
        //       key={`contractor-${index}`}
        //       gramPanchayat={quotationData.gramPanchayat}
        //       taluka={quotationData.taluka}
        //       district={quotationData.district}
        //       year={quotationData.year}
        //       workCode={quotationData.workCode}
        //       workName={quotationData.workName}
        //       tenderPublishDate={contractor.date}
        //       contractorNumber={contractor.number}
        //       contractorName={contractor.name}
        //       contractorGst={contractor.gst}
        //       quotationSubmissionDate={contractor.date}
        //       vendorWithVendorQuotation={
        //         quotationData.vendorWithVendorQuotation
        //       }
        //     />,
        //     `Contractor ${contractor.number} Quotation`
        //   );
        // });
        addComponent(
          <Contractor1QuotationPDF
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={contractors[0].date}
            contractorNumber={1}
            contractorName={contractors[0].name}
            contractorGst={contractors[0].gst}
            quotationSubmissionDate={contractors[0].date}
            vendorWithVendorQuotation={quotationData.vendorWithVendorQuotation}
          />,
          `Contractor ${contractors[0].number} Quotation`
        );
        addComponent(
          <Contractor2QuotationPDF
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={contractors[1].date}
            contractorNumber={2}
            contractorName={contractors[1].name}
            contractorGst={contractors[1].gst}
            quotationSubmissionDate={contractors[1].date}
            vendorWithVendorQuotation={quotationData.vendorWithVendorQuotation}
          />,
          `Contractor ${contractors[1].number} Quotation`
        );
        addComponent(
          <Contractor3QuotationPDF
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={contractors[2].date}
            contractorNumber={3}
            contractorName={contractors[2].name}
            contractorGst={contractors[2].gst}
            quotationSubmissionDate={contractors[2].date}
            vendorWithVendorQuotation={quotationData.vendorWithVendorQuotation}
          />,
          `Contractor ${contractors[2].number} Quotation`
        );

        addComponent(
          <SupplyOrderPDF
            key="supplyorder"
            gramPanchayat={quotationData.gramPanchayat}
            taluka={quotationData.taluka}
            district={quotationData.district}
            year={quotationData.year}
            workCode={quotationData.workCode}
            workName={quotationData.workName}
            tenderPublishDate={supplyOrderDate}
            winnerContractorName={quotationData.vendorDetails.vendorNameOne}
            winnerContractorGst={quotationData.vendorDetails.vendorGstOne}
            winnerQuotationSubmissionDate={
              quotationData.vendorDetails.VendorOneQuotationSubmissiondate
            }
            vendorWithVendorQuotation={quotationData.vendorWithVendorQuotation}
            address=""
          />,
          "Supply Order"
        );
      }

      if (swgData) {
        addComponent(
          <StageWisePhotosPDF key="stagewise" sWGTData={swgData} />,
          "Stage-wise Photos"
        );
      }

      // Check if we have any components to render
      if (allPdfComponents.length === 0) {
        toast.error("No data available to generate PDFs");
        return;
      }

      setDownloadProgress("Compiling document...");

      // Generate the combined PDF with memory optimization
      const document = <Document>{allPdfComponents}</Document>;

      // Use toBlob with onUpdate for progress
      const blob = await pdf(document).toBlob();

      // Save the combined PDF
      const currentDate = new Date().toISOString().split("T")[0];
      const fileName = `${workData.workDetail.workCode}_Complete_Documentation_${currentDate}.pdf`;
      saveAs(blob, fileName);

      // Show detailed success message
      let message = `Successfully generated ${successfulComponents.length} documents.`;
      if (failedComponents.length > 0) {
        message += ` Failed to generate: ${failedComponents.join(", ")}.`;
      }

      toast.success("Download Complete", {
        description: message,
        duration: 5000
      });
    } catch (error) {
      console.error("Error downloading all PDFs:", error);
      toast.error("Failed to generate complete PDF", {
        description:
          "Please try downloading individual documents or contact support."
      });
    } finally {
      setIsDownloading(false);
      setDownloadProgress("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="text-center text-red-500">
          {!hasVendorUpdate && (
            <h1>
              Please update the vendor details before downloading the PDF by
              clicking the{" "}
              <b className="border px-2 py-1 rounded-lg text-black">
                Manage Vendor Materials
              </b>{" "}
              button.
            </h1>
          )}
        </div>
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
                disabled={!workData || isAnyButtonLoading || !hasVendorUpdate}
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
              disabled={!workData || isAnyButtonLoading || !hasVendorUpdate}
              className="px-8 py-4 text-lg cursor-pointer font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {downloadProgress || "Generating PDFs..."}
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
