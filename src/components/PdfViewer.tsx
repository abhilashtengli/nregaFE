import { PDFViewer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";

type PDFPreviewerProps = {
  document: ReactElement<DocumentProps>;
};

const PDFPreviewer = ({ document }: PDFPreviewerProps) => {
  return (
    <div style={{ marginTop: "20px", height: "80vh" }}>
      <PDFViewer width="100%" height="100%">
        {document}
      </PDFViewer>
    </div>
  );
};

export default PDFPreviewer;
