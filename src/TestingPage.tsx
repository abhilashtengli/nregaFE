import { useState } from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

import AdministrativeSanctionPDF from "./components/PDFs/AsCopyPdf";
import PDFPreviewer from "./components/PdfViewer";
import {
  fetchAdministrativeSanction,
  type AdministrativeSanctionData
} from "./services/AdministrativeSanctionData";
import { toast } from "sonner";

const SimpleTestComponent = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState<AdministrativeSanctionData | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);

  const fetchData = async (): Promise<AdministrativeSanctionData | null> => {
    const id = "688c424a-dfb9-436c-8d37-3e35a404cd21";
    const res = await fetchAdministrativeSanction(id);

    if (!res.success) {
      toast.error(res.message || "Failed to fetch data");
      return null;
    }

    setPdfData(res.data!);
    return res.data!;
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      if (!data) return;

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

  const handleView = async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      if (!data) return;
      setShowPreview(true);
    } catch (error) {
      console.error("View Error:", error);
      toast.error("Failed to load preview!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>

      <button
        onClick={handleView}
        disabled={loading}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {loading ? "Loading..." : "View PDF"}
      </button>

      {showPreview && pdfData && (
        <PDFPreviewer
          document={<AdministrativeSanctionPDF asData={pdfData} />}
        />
      )}
    </div>
  );
};

export default SimpleTestComponent;
