
// PENDING From link 2 the data comes
const SupplyOrderPDF = ({
  gramPanchayat = "ಕಲ್ಲಹಂಗರಗಾ", //1
  district = "ಕಲಬುರಗಿ", //1
  taluka = "ಕಲಬುರಗಿ", //1
  year = "2023-2024", //1
  rateListPublicationDate = "09/07/2025",
  rateQuotationSubmissionDate = "08/07/2025",
  workName = "ಕಲ್ಲಹಂಗರಗಾ ಗ್ರಾಮದ ರೇಷ್ಮಾ ಶ್ರೀನಾಥ ಕುರಿ ದೂಡ್ಡಿ ನಿರ್ಮಾಣ", //1
  workCode = "1515005034/rc/GIS/778457", //1
  name = "ALLA PATEL", // contractor name 1
  gst = "29GGTPP6696C1ZD", // contractor gst 1
  materialData = [
    {
      slNo: 1,
      particulars: "0367-Portland Cement",
      unit: "tonne",
      quantity: "0.12867886",
      rate: "6980",
      amount: "898.18"
    },
    {
      slNo: 2,
      particulars: "0982-Coarse sand (zone III)",
      unit: "cum",
      quantity: "0.46502385",
      rate: "1675.76",
      amount: "779.27"
    }
  ]
}) => {
  const totalAmount = materialData
    .reduce((sum, item) => sum + Number.parseFloat(item.amount), 0)
    .toFixed(2);
  const itemsPerPage = 12; // Based on A4 landscape space available
  const totalPages = Math.ceil(materialData.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = materialData.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={pageNumber}
        className="w-full max-w-full mx-auto bg-white border-2 border-black mb-8"
        style={{
          height: "210mm", // A4 height in landscape
          width: "297mm", // A4 width in landscape
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
            {/* Header */}
            <div className="text-center font-bold text-base mb-4">
              <div className="mb-1">
                ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat} ತಾ|| {taluka} ಜಿ|| {district}
              </div>
              <div>ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ</div>
            </div>

            {/* Reference Number */}
            <div className="text-center text-sm mb-4">
              ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ದ.ವ.ಅ.ತು.ಪ/{year}
            </div>

            {/* Title */}
            <div className="text-center text-lg font-bold mb-4 underline">
              ***** ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ *****
            </div>

            {/* Subject */}
            <div className="text-sm mb-3">
              <strong>ವಿಷಯ :</strong> ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ
              ಖಾತ್ರಿ ಯೋಜನೆಯಡಿ ಕೈಗೊಳ್ಳಲಾಗುವ ಕಾಮಗಾರಿಗಳಿಗೆ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಮಾಡಲು
            </div>

            {/* Reference Section */}
            <div className="text-sm mb-3">
              <strong>ಉಲ್ಲೇಖ :</strong>
              <br />
              <div className="ml-4">
                1) ಈ ಕಛೇರಿ ದರಪಟ್ಟಿ ಆದ ಪ್ರಕಟಣೆ ದಿನಾಂಕ :-{" "}
                {rateListPublicationDate}
                <br />
                2) ನೀವು ಸಲ್ಲಿಸಿರುವ ದರಪಟ್ಟಿ ದಿನಾಂಕ :-{" "}
                {rateQuotationSubmissionDate}
              </div>
            </div>

            {/* Main Content */}
            <div className="text-xs mb-4 text-justify leading-relaxed">
              ಈ ಮೇಲ್ಕಂಡ ವಿಷಯ ಹಾಗೂ ಉತ್ಸಂಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೇ ಸಾಲಿನ ಮಹಾತ್ಮಾ ಗಾಂಧಿ
              ರಾಷ್ಟ್ರೀಯಗಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನ ಕೈಗೊಳ್ಳಲಾಗುವ ಕಾಮಗಾರಿ ಹೆಸರು:{" "}
              <strong>({workName})</strong> ({workCode}) ಕಾಮಗಾರಿಗಾಗಿ
              ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು ಮಾಡಲು ಉಲ್ಲೇಖ (1) ರ ಪ್ರಕಾರ ದರಪಟ್ಟಿಯನ್ನು
              ಆಹ್ವಾನಿಸಲಾಗಿದ್ದು, ಉತ್ತ (2) ರ ಪ್ರಕಾರ ನೀವು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವಿಧಿಸಿರುವ
              ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಂಡು ಸಲ್ಲಿಸಿರುವ ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಲಾಗಿದ್ದು,
              ಸದರಿ ದರಪಟ್ಟಿಯಂತೆ ಈ ಕೆಳಕಂಡ ದರಗಳಲ್ಲಿ ಜಿ. ಎಸ್. ಟಿ. ಬಿಲ್ಲಿನೊಂದಿಗೆ
              ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು ಮಾಡಲು ಈ ಮೂಲಕ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ ಮಾಡಲಾಗಿದೆ.
            </div>
          </>
        )}

        {/* Material Table */}
        <div className="w-full mb-4">
          <table
            className="w-full border-collapse border border-black text-xs"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  S.No
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "180px" }}
                >
                  Particulars
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "40px" }}
                >
                  Unit
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "60px" }}
                >
                  Quantity
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "50px" }}
                >
                  Rate
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "60px" }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {item.slNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-left text-[8px] break-all">
                    {item.particulars}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {item.unit}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {item.rate}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {item.amount}
                  </td>
                </tr>
              ))}
              {/* Total Row - Only on last page */}
              {isLastPage && (
                <tr className="bg-gray-100 font-bold">
                  <td
                    className="border border-black px-1 py-1 text-center text-[10px]"
                    colSpan={5}
                  >
                    <strong>Total</strong>
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[10px]">
                    <strong>{totalAmount}</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Section - Only on last page */}
        {isLastPage && (
          <div className="flex justify-between">
            {/* Recipient Section */}
            <div className="text-sm">
              <strong>ಗೆ</strong>
              <br />
              <strong>ಶ್ರೀ/ಶ್ರೀಮತಿ :-</strong> {name}
              <br />
              <strong>GST :-</strong> {gst}
              <br />
              <strong>ವಿಳಾಸ :-</strong> ತಾ||{taluka} , ಜಿ|| {district}
            </div>

            {/* Signature Section */}
            <div className="text-right text-sm">
              <div className="font-bold">
                ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
              </div>
              <div>ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}</div>
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
