import type React from "react";
import type { SupplyOrderProps } from "./types";

const SupplyOrderPDF: React.FC<SupplyOrderProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  winnerContractorName,
  winnerContractorGst,
  winnerQuotationSubmissionDate,
  vendorWithVendorQuotation,
  address = "Kote Road, Shivamogga"
}) => {
  // Format dates from ISO strings to readable format
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
      .replace(/\//g, "/");
  };

  const formattedTenderPublishDate = formatDate(tenderPublishDate);

  // Dynamic pagination based on data length
  const itemsPerPage = 15; // Items per page for supply order
  const totalPages = Math.ceil(vendorWithVendorQuotation.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = vendorWithVendorQuotation.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={`supply-order-${pageNumber}`}
        className="w-full max-w-4xl mx-auto bg-white border-2 border-black mb-8"
        style={{
          height: "297mm", // Portrait: height is larger
          width: "210mm", // Portrait: width is smaller
          fontFamily: "Arial, sans-serif",
          fontSize: "11px", // Slightly reduced from 12px
          lineHeight: "1.2", // Reduced line height
          padding: "12mm", // Reduced padding from 15mm
          boxSizing: "border-box"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            {/* Header with logos */}
            <div className="flex items-center justify-between mb-3">
              {" "}
              {/* Reduced margin */}
              <div className="w-14 h-14 flex-shrink-0">
                {" "}
                {/* Slightly smaller logos */}
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Karnataka Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center flex-1 mx-3">
                {" "}
                {/* Reduced margin */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-base font-bold">ಕರ್ನಾಟಕ</span>{" "}
                  {/* Reduced font size */}
                  <div className="w-6 h-6">
                    {" "}
                    {/* Smaller center logo */}
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Center Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-base font-bold">ಸರ್ಕಾರ</span>
                </div>
                <div className="text-sm font-semibold mb-1">
                  {" "}
                  {/* Reduced font size */}
                  ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
                </div>
                <div className="text-xs mb-1">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ
                </div>
              </div>
              <div className="w-14 h-14 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="MGNREGA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="text-center text-xs mb-1">
              ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ಸಾ.ಸ.ಆ/{year}
            </div>
            <div className="text-right text-xs mb-3">
              ದಿನಾಂಕ: {formattedTenderPublishDate}
            </div>{" "}
            {/* Reduced margin */}
            <div className="text-center text-base font-bold mb-3 underline">
              ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ
            </div>{" "}
            {/* Reduced margin */}
            <div className="text-xs mb-3">
              {" "}
              {/* Reduced font size and margin */}
              <strong>ವಿಷಯ:</strong>ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ
              ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುವ ಕಾಮಗಾರಿಗಳಿಗೆ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಮಾಡುವ ಕುರಿತು
            </div>
            <div className="text-xs mb-3">
              {" "}
              {/* Reduced font size and margin */}
              <strong>ಉಲ್ಲೇಖ:</strong>ಈ ಕಛೇರಿ ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ದಿನಾಂಕ :{" "}
              {formattedTenderPublishDate}
              <br />
              2) ನೀವು ಸಲ್ಲಿಸಿರುವ ದರಪಟ್ಟಿ ದಿನಾಂಕ: {winnerQuotationSubmissionDate}
            </div>
            <div className="text-center text-xs mb-3">********</div>{" "}
            {/* Reduced margin */}
            <div className="text-xs mb-4 text-justify leading-tight">
              {" "}
              {/* Reduced font size, margin and line height */}ಈ ಮೇಲ್ಕಂಡ ವಿಷಯ
              ಹಾಗೂ ಉಲ್ಲೇಖಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ {year} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ
              ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುತ್ತಿರುವ{" "}
              {workName}({workCode})ಕಾಮಗಾರಿಗಾಗಿ ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು ಮಾಡಲು
              ಉಲ್ಲೇಖ (1)ರ ಪ್ರಕಾರ ದರಪಟ್ಟಿಯನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿದ್ದು, ಉಲ್ಲೇಖ (2)ರ
              ಪ್ರಕಾರ ನೀವು ಗ್ರಾಮ ಪಂಚಾಯತಿ ವಿಧಿಸಿರುವ ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಂಡು
              ಸಲ್ಲಿಸಿರುವ ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಲಾಗಿದ್ದು, ಸದರಿ ದರಪಟ್ಟಿಯಂತೆ ಈ
              ಕೆಳಕಂಡ ದರಗಳಲ್ಲಿ ಜಿ.ಎಸ್.ಟಿ. ಬಿಲ್ಲಿನೊಂದಿಗೆ ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು
              ಮಾಡಲು ಈ ಮೂಲಕ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ ನೀಡಲಾಗಿದೆ.
            </div>
          </>
        )}

        {/* Supply Order Table */}
        <div className="w-full mb-4">
          <table className="w-full border-collapse border border-black text-[10px]">
            {" "}
            {/* Reduced font size */}
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black px-2 py-2 text-center font-bold w-10">
                  ಕ್ರ. ಸಂ.
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold">
                  ಸಾಮಗ್ರಿ ಹೆಸರು
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-14">
                  ಪ್ರಮಾಣ
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-14">
                  ದರ
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.slNo}
                  </td>
                  <td className="border border-black px-2 py-2 text-left break-all">
                    {item.materialName}
                  </td>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.contractor1Rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="flex justify-between mt-6">
            {" "}
            {/* Reduced margin */}
            <div className="text-xs">
              {" "}
              {/* Reduced font size */}
              <div className="mb-1">
                {" "}
                {/* Reduced margin */}
                <strong>ಗೆ,</strong>
              </div>
              <div className="mb-1">
                <strong>ಶ್ರೀ/ಶ್ರೀಮತಿ :-</strong> {winnerContractorName}
              </div>
              <div className="mb-1">
                <strong>GST :-</strong> {winnerContractorGst}
              </div>
              <div className="mb-1">
                <strong>ವಿಳಾಸ :-</strong> {address}
              </div>
            </div>
            <div className="text-right text-xs">
              {" "}
              {/* Reduced font size */}
              <div className="font-bold">
                ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
              </div>
              <div>ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}
    </div>
  );
};

export default SupplyOrderPDF;
