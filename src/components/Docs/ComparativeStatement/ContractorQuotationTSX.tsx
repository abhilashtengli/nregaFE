import type React from "react";
import type { ContractorQuotationProps } from "./types";

const ContractorQuotationPDF: React.FC<ContractorQuotationProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  contractorNumber,
  contractorName,
  contractorGst,
  quotationSubmissionDate,
  vendorWithVendorQuotation
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
  const itemsPerPage = 18; // Items per page for contractor quotations (portrait)
  const totalPages = Math.ceil(vendorWithVendorQuotation.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = vendorWithVendorQuotation.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={`contractor-${contractorNumber}-${pageNumber}`}
        className="w-full max-w-4xl mx-auto bg-white border-2 border-black mb-8"
        style={{
          height: "297mm", // Portrait: height is larger
          width: "210mm", // Portrait: width is smaller
          fontFamily: "Arial, sans-serif",
          fontSize: "10px",
          lineHeight: "1.3",
          padding: "15mm",
          boxSizing: "border-box"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            <div className="mb-6">
              <div className="text-left text-sm mb-2">ಗೆ,</div>
              <div className="text-left text-sm mb-1">
                ಅಧ್ಯಕ್ಷರು / ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು,
              </div>
              <div className="text-left text-sm mb-1">
                ಗ್ರಾಮ ಪಂಚಾಯತಿ: {gramPanchayat}
              </div>
              <div className="text-left text-sm mb-1">
                ತಾಲೂಕು: {taluka} / ಜಿಲ್ಲೆ: {district}
              </div>
              <div className="text-left text-sm  mt-4">ಮಾನ್ಯರೆ,</div>
            </div>
            <div className="mb-6 pl-24">
              <div className="text-sm font-semibold mb-2">
                ವಿಷಯ:
                <span className="ml-3">
                  ಸಾಮಗ್ರಿಗಳಿಗೆ ಐಟಂವಾರು ದರಪಟ್ಟಿ ಸಲ್ಲಿಸುವ ಕುರಿತು
                </span>{" "}
              </div>
              <div className="text-sm mb-2 font-semibold">
                ಉಲ್ಲೇಖ:
                <span className="ml-3">
                  ತಮ್ಮ ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ದಿನಾಂಕ : ದಿನಾಂಕ :{" "}
                  {formattedTenderPublishDate}
                </span>
              </div>
              <div className="text-center text-sm mb-4">********</div>
            </div>
            <div className="text-sm mb-6 text-justify leading-relaxed tracking-wide">
              <span className="pl-6"></span> ಈ ಮೇಲ್ಕಂಡಿಸಿದ ವಿಷಯ ಹಾಗೂ ಉಲ್ಲೇಖಕ್ಕೆ
              ಸಂಬಂಧಿಸಿದಂತೆ ನಾನು GST ಅಡಿ ನೋಂದಾಯಿತ ಸಾಮಗ್ರಿ ಸರಬರಾಜುದಾರನಾಗಿದ್ದು,{" "}
              {year} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ
              ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುವ {workName}({workCode}) ಕಾಮಗಾರಿಗೆ ಅವಶ್ಯವಿರುವ
              ಸಾಮಗ್ರಿಗಳಿಗೆ ತಾವು ವಿಧಿಸಿರುವ ಷರತ್ತುಗಳಿಗೆ ಬದ್ಧನಾಗಿ ಈ ಕೆಳಗಿನಂತೆ
              ದರಪಟ್ಟಿಯನ್ನು ಸಲ್ಲಿಸುತ್ತಿದ್ದು, ನನ್ನ ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಿಸಾಮಗ್ರಿ
              ಸರಬರಾಜು ಆದೇಶ ನೀಡಬೇಕಾಗಿ ತಮ್ಮಲ್ಲಿ ಕೋರುತ್ತೇನೆ.
            </div>
          </>
        )}

        {/* Quotation Table */}
        <div className="w-full mb-6">
          <table className="w-full border-collapse border border-black text-[10px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black px-2 py-2 text-center font-bold w-12">
                  ಕ್ರ. ಸಂ.
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold">
                  ಸಾಮಗ್ರಿ ಹೆಸರು
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-16">
                  ಪ್ರಮಾಣ
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-20">
                  ದರ (as per SR)
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-20">
                  ದರ (ಅಂಕಿಗಳಲ್ಲಿ)
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold w-24">
                  ದರ (ಅಕ್ಷರಗಳಲ್ಲಿ)
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => {
                const contractorRate =
                  contractorNumber === 1
                    ? item.contractor1Rate
                    : contractorNumber === 2
                    ? item.contractor2Rate
                    : item.contractor3Rate;
                return (
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
                      {item.rate}
                    </td>
                    <td className="border border-black px-2 py-2 text-center">
                      {contractorRate}
                    </td>
                    <td className="border border-black px-2 py-2 text-center"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-7">
            <div className="">
              <div className="text-sm  pr-8 text-right mb-12">
                ತಮ್ಮ ವಿಶ್ವಾಸಿ
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-sm mb-1 text-start">ಸ್ಥಳ:</div>
                  <div className="text-sm">
                    ದಿನಾಂಕ: {quotationSubmissionDate}
                  </div>
                </div>
                <div>
                  <div className="text-sm mb-1">ಸರಬರಾಜುದಾರರ ಸಹಿ</div>
                  <div className="text-sm mb-1">ಹೆಸರು: {contractorName}</div>
                  <div className="text-sm mb-1">GST: {contractorGst}</div>
                </div>
              </div>
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

export default ContractorQuotationPDF;
