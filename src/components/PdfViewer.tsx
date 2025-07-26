import { PDFViewer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import { useState, useEffect } from "react";

type PDFPreviewerProps = {
  document: ReactElement<DocumentProps>;
  onClose?: () => void;
};

const PDFPreviewer = ({ document, onClose }: PDFPreviewerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Global error handler for PDF-related errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes("PDF") ||
          event.message.includes("react-pdf") ||
          event.message.includes("canvas"))
      ) {
        console.error("PDF Viewer Error:", event);
        setError(event.message);
        setIsLoading(false);
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return (
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ff6b6b",
          borderRadius: "4px",
          backgroundColor: "#ffe0e0"
        }}
      >
        <h3>PDF Preview Error</h3>
        <p>Failed to load PDF preview: {error}</p>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          Try downloading the PDF instead, or refresh the page and try again.
        </p>
        {onClose && (
          <button onClick={onClose} style={{ marginTop: "10px" }}>
            Close Preview
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px", height: "80vh", position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          Loading PDF Preview...
        </div>
      )}

      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 20,
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      )}

      <PDFViewer width="100%" height="100%" showToolbar={true}>
        {document}
      </PDFViewer>
    </div>
  );
};

export default PDFPreviewer;
