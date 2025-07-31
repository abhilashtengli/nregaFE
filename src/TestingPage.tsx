import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, pdf } from "@react-pdf/renderer";
import PDFPreviewer from "./components/PdfViewer";
import { toast } from "sonner";
import {
  useFetchFilledNMRData,
  type FilledNMRData
} from "./services/FilledNmrService";
import FilledENmrPDF from "./components/PDFs/FilledNmrPdf";

const SimpleTestComponent = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState<FilledNMRData | null>(null);

  const fetchFilledNMRData = useFetchFilledNMRData();

  const handleDownload = async () => {
    setLoading(true);
    console.log("Starting download...");

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
      const data = await fetchFilledNMRData(); // data is FrontPageData | null
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
                {pdfData.workersData.map((musterRoll) => (
                  <FilledENmrPDF
                    key={musterRoll.musterRollNo}
                    district={pdfData.district}
                    taluka={pdfData.taluka}
                    panchayat={pdfData.panchayat}
                    approvalNo={pdfData.approvalNo}
                    approvalDate={pdfData.approvalDate}
                    workCode={pdfData.workCode}
                    workName={pdfData.workName}
                    financialYear={pdfData.financialYear}
                    totalWage={pdfData.totalWage}
                    wage={pdfData.wage}
                    totalAttendanceCount={pdfData.totalAttendanceCount}
                    // Props specific to this muster roll
                    musterRollNo={musterRoll.musterRollNo}
                    fromDate={musterRoll.fromDate}
                    toDate={musterRoll.toDate}
                    workersData={musterRoll.data}
                  />
                ))}
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
