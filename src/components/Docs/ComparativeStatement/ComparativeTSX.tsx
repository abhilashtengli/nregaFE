import type React from "react";
import type { ComparativeStatementProps } from "./types";

const ComparativeStatementPDF: React.FC<ComparativeStatementProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  vendorDetails,
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

  // Contractor details from vendorDetails object
  const contractor1 = {
    name: vendorDetails.vendorNameOne || "vendor 1",
    gst: vendorDetails.vendorGstOne || "vendor gst 1",
    quotationSubmissionDate:
      vendorDetails.VendorOneQuotationSubmissiondate || ""
  };
  const contractor2 = {
    name: vendorDetails.vendorNameTwo || "vendor 2",
    gst: vendorDetails.vendorGstTwo || "vendor gst 2",
    quotationSubmissionDate:
      vendorDetails.vendorTwoQuotationSubmissiondate || ""
  };
  const contractor3 = {
    name: vendorDetails.vendorNameThree || "vendor 3",
    gst: vendorDetails.vendorGstThree || "vendor gst 3",
    quotationSubmissionDate:
      vendorDetails.vendorThreeQuotationSubmissiondate || ""
  };

  // Dynamic pagination based on data length
  const itemsPerPage = 12; // Items per page for comparative statement (landscape)
  const totalPages = Math.ceil(vendorWithVendorQuotation.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = vendorWithVendorQuotation.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={`comparative-${pageNumber}`}
        className="w-full max-w-full mx-auto bg-white border-2 border-black mb-8"
        style={{
          height: "210mm", // Landscape: height is smaller
          width: "297mm", // Landscape: width is larger
          fontFamily: "Arial, sans-serif",
          fontSize: "10px",
          lineHeight: "1.2",
          padding: "8mm",
          boxSizing: "border-box"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            {/* Header with logos */}
            <div className="flex items-center border-b-2 border-black justify-between pb-2 mb-1">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Karnataka Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center flex-1 mx-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg font-bold">ಕರ್ನಾಟಕ</span>
                  <div className="w-8 h-8">
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Center Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold">ಸರ್ಕಾರ</span>
                </div>
                <div className="text-sm font-semibold mb-1">
                  ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
                </div>
                <div className="text-xs mb-1">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ
                </div>
              </div>
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="MGNREGA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-center  text-xs mb-1">
                ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ದ.ಪ.ಅ.ತು.ಪ/{year}
              </div>
              <div className="text-right text-xs mb-2">
                ದಿನಾಂಕ: {formattedTenderPublishDate}
              </div>
            </div>
            <div className="text-center text-base font-bold mb-2 underline">
              ದರಪಟ್ಟಿಗಳ ತುಲನಾತ್ಮಕ ಪಟ್ಟಿ
            </div>
            <div className="text-[12px] mb-3 text-justify leading-relaxed">
              ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸನ್ {year} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ
              ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ ಅನುಷ್ಠಾನಗೊಳಿಸುತ್ತಿರುವ
              <span className="font-semibold">
                {workName}({workCode})
              </span>{" "}
              ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನ ಮಾಡಲು ಆಹ್ವಾನಿಸಿರುವ ದರಪಟ್ಟಿಗೆ ಅನುಗುಣವಾಗಿ ಸಾಮಗ್ರಿ
              ಸರಬರಾಜು ಮಾಡಲು ಬಂದಿರುವ ಸರಬರಾಜುದಾರರ ದರಪಟ್ಟಿಗಳ ತುಲನಾತ್ಮಕ ಪಟ್ಟಿ.
            </div>
          </>
        )}

        {/* Comparative Table */}
        <div className="w-full mb-3">
          <table className="w-full border-collapse border border-black text-[10px]">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಕ್ರ. ಸಂ.
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "120px" }}
                >
                  ಸಾಮಗ್ರಿ ಹೆಸರು
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "40px" }}
                >
                  ಪ್ರಮಾಣ
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "50px" }}
                >
                  ದರ
                  <br />
                  (as per SR)
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "60px" }}
                >
                  ಸರಬರಾಜುದಾರ - 1<br />
                  {contractor1.name}
                  <br />
                  GST:{contractor1.gst}
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "60px" }}
                >
                  ಸರಬರಾಜುದಾರ - 2<br />
                  {contractor2.name}
                  <br />
                  GST:{contractor2.gst}
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-bold"
                  style={{ width: "60px" }}
                >
                  ಸರಬರಾಜುದಾರ - 3<br />
                  {contractor3.name}
                  <br />
                  GST:{contractor3.gst}
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.slNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-left break-all">
                    {item.materialName}
                  </td>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.rate}
                  </td>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.contractor1Rate}
                  </td>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.contractor2Rate}
                  </td>
                  <td className="border border-black px-1 py-2 text-center">
                    {item.contractor3Rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-4">
            <div className="text-xs mb-3 text-justify ">
              ಈ ಮೇಲ್ಕಂಡ ಸರಬರಾಜುದಾರಿಂದ ಬಂದಿರುವ ದರಪಟ್ಟಿಗಳಲ್ಲಿ{" "}
              <span className="underline font-semibold tracking-wide">
                {contractor1.name}
              </span>{" "}
              ರವರ ದರಗಳು ಕಡಿಮೆ ಇರುವುದರಿಂದ ಅವರ ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಿ, ಸಾಮಗ್ರಿ
              ಸರಬರಾಜು ಆದೇಶ ನೀಡಲು ಅನುಮೋದಿಸಲಾಯಿತು
            </div>
            <div className="flex justify-between mt-6">
              <div className="text-center">
                <div className="text-xs font-bold">ನರೇಗಾ ತಾಂತ್ರಿಕ ಸಹಾಯಕರು</div>
                <div className="text-xs">ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold">
                  ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು
                </div>
                <div className="text-xs">ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold">ಅಧ್ಯಕ್ಷರು</div>
                <div className="text-xs">ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}</div>
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

export default ComparativeStatementPDF;
