import { useState } from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PDFPreviewer from "./components/PdfViewer";
import { toast } from "sonner";
import { useFetchWLFTOData, type WLFTODetail } from "./services/WlFtoService";
import WLFTOPdf from "./components/PDFs/WlFtoPdf";

const SimpleTestComponent = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState<WLFTODetail | null>(null);

  const fetchWlFtoData = useFetchWLFTOData();

  const handleDownload = async () => {
    setLoading(true);
    console.log("Starting download...");

    try {
      const data = await fetchWlFtoData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(<WLFTOPdf wlfto={data} />).toBlob();

      saveAs(blob, "Wl-Fto.pdf");
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
      const data = await fetchWlFtoData(); // data is FrontPageData | null
      console.log("Data for preview:", data);

      if (!data) {
        toast.error("No data found for preview.");
        return;
      }

      // const requiredFields: (keyof Form8Data)[] = [
      //   "workName",
      //   "workCode",
      //   "applicantsData",
      //   "applicationNumber"
      // ];

      // const missingFields = requiredFields.filter((field) => !data[field]);

      // if (missingFields.length > 0) {
      //   console.warn("Missing required fields:", missingFields);
      //   toast.warning(`Missing fields: ${missingFields.join(", ")}`);
      // }

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
            document={<WLFTOPdf wlfto={pdfData} />}
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
