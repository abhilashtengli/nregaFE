import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, pdf } from "@react-pdf/renderer";
import PDFPreviewer from "./components/PdfViewer";
import { toast } from "sonner";
import {
  useFetchBlankNMRData,
  type BlankNMRData
} from "./services/BlankNmrService";
import NMRPDF from "./components/PDFs/BlankNmrPdf";

const SimpleTestComponent = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState<BlankNMRData | null>(null);

  const fetchBlankNMRData = useFetchBlankNMRData();

  const handleDownload = async () => {
    setLoading(true);
    console.log("Starting download...");

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
              <NMRPDF
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
      toast.success("Download started!");
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("Download failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    setLoading(true);
    setPreviewError(null);

    try {
      const data = await fetchBlankNMRData(); // data is FrontPageData | null
      console.log("Data for preview:", data);

      if (!data) {
        toast.error("No data found for preview.");
        return;
      }

      setPdfData(data);
      setShowPreview(true);
      toast.success("Preview loaded!");
    } catch (error) {
      console.error("View Error:", error);
      setPreviewError(
        error instanceof Error ? error.message : "Failed to load preview"
      );
      toast.error("Preview failed to load!");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPdfData(null);
    setPreviewError(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleDownload}
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Downloading..." : "Download PDF"}
        </button>

        <button
          onClick={handleView}
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Loading..." : "View PDF"}
        </button>
      </div>

      {previewError && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            color: "#721c24",
            marginBottom: "20px"
          }}
        >
          <strong>Preview Error:</strong> {previewError}
          <button
            onClick={() => setPreviewError(null)}
            style={{ marginLeft: "10px", padding: "2px 8px" }}
          >
            Dismiss
          </button>
        </div>
      )}

      {showPreview && pdfData && (
        <div>
          <h3>PDF Preview</h3>
          <PDFPreviewer
            document={
              <Document>
                {pdfData.workerData.map(
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
                    <NMRPDF
                      key={musterRoll.mustrollNo}
                      district={pdfData.district}
                      taluka={pdfData.taluka}
                      gramPanchayat={pdfData.gramPanchayat}
                      financialYear={pdfData.financialYear}
                      workCode={pdfData.workCode}
                      workName={pdfData.workName}
                      fromDate={pdfData.fromDate}
                      toDate={pdfData.toDate}
                      technicalSanctionNo={pdfData.technicalSanctionNo}
                      technicalSanctionDate={pdfData.technicalSanctionDate}
                      financialSanctionNo={pdfData.financialSanctionNo}
                      financialSanctionDate={pdfData.financialSanctionDate}
                      musterRollNo={musterRoll.mustrollNo}
                      workerData={musterRoll.workers}
                    />
                  )
                )}
              </Document>
            }
            onClose={handleClosePreview}
          />
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && pdfData && (
        <details style={{ marginTop: "20px", fontSize: "12px" }}>
          <summary>Debug: PDF Data</summary>
          <pre>{JSON.stringify(pdfData, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

export default SimpleTestComponent;

//----------------------Start QuotationCall---------------------

// const handleQuotationCallDownload = async () => {
//   setLoading(true);
//   console.log("Starting download...");

//   try {
//     const data = await fetchSwgData();
//     if (!data) {
//       toast.error("No data found for download.");
//       return;
//     }

//     console.log("Data fetched:", data);

//     const blob = await pdf(
//       <QuotationCallPDF
//         gramPanchayat={data.gramPanchayat}
//         taluka={data.taluka}
//         district={data.district}
//         year={data.year}
//         administrativeSanction={data.administrativeSanction}
//         workCode={data.workCode}
//         workName={data.workName}
//         tenderPublishDate={data.tenderPublishDate}
//         tenderSubmissionDate={data.tenderSubmissionDate}
//         materialData={data.materialData}
//       />
//     ).toBlob();

//     saveAs(blob, "Quotation-call.pdf");
//     toast.success("Download started!");
//   } catch (error) {
//     console.error("Download Error:", error);
//     toast.error("Download failed!");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleQuotationCallView = async () => {
//   setLoading(true);
//   setPreviewError(null);

//   try {
//     const data = await fetchSwgData(); // data is FrontPageData | null
//     console.log("Data for preview:", data);

//     if (!data) {
//       toast.error("No data found for preview.");
//       return;
//     }

//     setPdfData(data);
//     setShowPreview(true);
//     toast.success("Preview loaded!");
//   } catch (error) {
//     console.error("View Error:", error);
//     setPreviewError(
//       error instanceof Error ? error.message : "Failed to load preview"
//     );
//     toast.error("Preview failed to load!");
//   } finally {
//     setLoading(false);
//   }
// };

//----------------------End QuotationCall---------------------

//----------------Start Comparative-------------

//  const handleComparativeDownload = async () => {
//    setLoading(true);
//    console.log("Starting download...");

//    try {
//      const data = await fetchSwgData();
//      if (!data) {
//        toast.error("No data found for download.");
//        return;
//      }

//      console.log("Data fetched:", data);

//      const blob = await pdf(
//        <ComparativeStatementPDF
//          gramPanchayat={data.gramPanchayat}
//          taluka={data.taluka}
//          district={data.district}
//          year={data.year}
//          workCode={data.workCode}
//          workName={data.workName}
//          tenderPublishDate={data.tenderPublishDate}
//          vendorDetails={data.vendorDetails}
//          vendorWithVendorQuotation={data.vendorWithVendorQuotation}
//        />
//      ).toBlob();

//      saveAs(blob, "Quotation-call.pdf");
//      toast.success("Download started!");
//    } catch (error) {
//      console.error("Download Error:", error);
//      toast.error("Download failed!");
//    } finally {
//      setLoading(false);
//    }
//  };

//----------------End Comparative-------------

// -------------Start contractor quotation----------------------
// const handleDownload = async () => {
//   setLoading(true);
//   console.log("Starting download...");

//   try {
//     const data = await fetchSwgData();
//     if (!data) {
//       toast.error("No data found for download.");
//       return;
//     }

//     console.log("Data fetched:", data);

//     const blob = await pdf(
//       <Document>
//         <ContractorQuotationPDF
//           gramPanchayat={data.gramPanchayat}
//           taluka={data.taluka}
//           district={data.district}
//           year={data.year}
//           workCode={data.workCode}
//           workName={data.workName}
//           tenderPublishDate={data.tenderPublishDate}
//           contractorNumber={1}
//           contractorName={data.vendorDetails.vendorNameOne}
//           contractorGst={data.vendorDetails.vendorGstOne}
//           quotationSubmissionDate={
//             data.vendorDetails.VendorOneQuotationSubmissiondate
//           }
//           vendorWithVendorQuotation={data.vendorWithVendorQuotation}
//         />
//         <ContractorQuotationPDF
//           gramPanchayat={data.gramPanchayat}
//           taluka={data.taluka}
//           district={data.district}
//           year={data.year}
//           workCode={data.workCode}
//           workName={data.workName}
//           tenderPublishDate={data.tenderPublishDate}
//           contractorNumber={2}
//           contractorName={data.vendorDetails.vendorNameTwo}
//           contractorGst={data.vendorDetails.vendorGstTwo}
//           quotationSubmissionDate={
//             data.vendorDetails.vendorTwoQuotationSubmissiondate
//           }
//           vendorWithVendorQuotation={data.vendorWithVendorQuotation}
//         />
//         <ContractorQuotationPDF
//           gramPanchayat={data.gramPanchayat}
//           taluka={data.taluka}
//           district={data.district}
//           year={data.year}
//           workCode={data.workCode}
//           workName={data.workName}
//           tenderPublishDate={data.tenderPublishDate}
//           contractorNumber={3}
//           contractorName={data.vendorDetails.vendorNameThree}
//           contractorGst={data.vendorDetails.vendorGstThree}
//           quotationSubmissionDate={
//             data.vendorDetails.vendorThreeQuotationSubmissiondate
//           }
//           vendorWithVendorQuotation={data.vendorWithVendorQuotation}
//         />
//       </Document>
//     ).toBlob();

//     saveAs(blob, "ComparativeStatement.pdf");
//     toast.success("Download started!");
//   } catch (error) {
//     console.error("Download Error:", error);
//     toast.error("Download failed!");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleView = async () => {
//   setLoading(true);
//   setPreviewError(null);

//   try {
//     const data = await fetchSwgData(); // data is FrontPageData | null
//     console.log("Data for preview:", data);

//     if (!data) {
//       toast.error("No data found for preview.");
//       return;
//     }

//     setPdfData(data);
//     setShowPreview(true);
//     toast.success("Preview loaded!");
//   } catch (error) {
//     console.error("View Error:", error);
//     setPreviewError(
//       error instanceof Error ? error.message : "Failed to load preview"
//     );
//     toast.error("Preview failed to load!");
//   } finally {
//     setLoading(false);
//   }
// };

// -------------End contractor quotation----------------------
