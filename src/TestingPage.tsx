import { useState } from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

import AdministrativeSanctionPDF from "./components/PDFs/AsCopyPdf";
import PDFPreviewer from "./components/PdfViewer";
import {
  useFetchASCopyData,
  type AdministrativeSanctionData
} from "./services/AdministrativeSanctionData";
import { toast } from "sonner";

const SimpleTestComponent = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [asPdfData, setAsPdfData] = useState<AdministrativeSanctionData | null>(
    null
  );

  const fetchASCopyData = useFetchASCopyData();

  const handleDownloadAsCopy = async () => {
    setLoading(true);
    console.log("Starting download...");

    try {
      const data = await fetchASCopyData();
      if (!data) {
        toast.error("No data found for download.");
        return;
      }

      console.log("Data fetched:", data);

      const blob = await pdf(
        <AdministrativeSanctionPDF asData={data} />
      ).toBlob();

      saveAs(blob, "administrative-sanction.pdf");
      toast.success("Download started!");
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("Download failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAsCopy = async () => {
    setLoading(true);
    setPreviewError(null);

    try {
      const data = await fetchASCopyData();
      console.log("Data for preview:", data);

      if (!data) {
        toast.error("No data found for preview.");
        return;
      }

      // Validate data structure
      const requiredFields = [
        "workCode",
        "workName",
        "gramPanchayat",
        "sanctionedAmount",
        "technicalSanctionNo"
      ];

      const missingFields = requiredFields.filter(
        (field) => !data[field as keyof AdministrativeSanctionData]
      );

      if (missingFields.length > 0) {
        console.warn("Missing required fields:", missingFields);
        toast.warning(
          `Some data fields are missing: ${missingFields.join(", ")}`
        );
      }

      setAsPdfData(data);
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
    setAsPdfData(null);
    setPreviewError(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleDownloadAsCopy}
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
          onClick={handleViewAsCopy}
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

      {showPreview && asPdfData && (
        <div>
          <h3>PDF Preview</h3>
          <PDFPreviewer
            document={<AdministrativeSanctionPDF asData={asPdfData} />}
            onClose={handleClosePreview}
          />
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && asPdfData && (
        <details style={{ marginTop: "20px", fontSize: "12px" }}>
          <summary>Debug: PDF Data</summary>
          <pre>{JSON.stringify(asPdfData, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

export default SimpleTestComponent;
