
// COMPLETED
type ftoDataProp = {
  slNo: number;
  jobCardNo: string;
  applicantNo: number;
  applicantName: string;
  mustrollNo: string;
  wageListNo: string;
  referenceNo: string;
  ftoNo: string;
  verifyPo: string;
  status: string;
  bankName: string;
  wgApbCrAccount: string;
  favoringAsPerBank: string;
};
type WLFTOPdfProps = {
  gramPanchayat?: string;
  taluka?: string;
  district?: string;
  ftoData?: ftoDataProp[];
};
type wlftoData = {
  wlfto: WLFTOPdfProps;
};
const WLFTOPdf = ({ wlfto }: wlftoData) => {
  const { gramPanchayat, taluka, district, ftoData = [] } = wlfto;
  const itemsPerPage = 10; // Based on A4 landscape space available
  const totalPages = Math.ceil(ftoData.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = ftoData.slice(startIndex, endIndex);
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
          <div className="flex items-center justify-between mb-4">
            {/* Left Logo */}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Karnataka Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Center Content */}
            <div className="text-center flex-1 mx-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Center Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="text-base font-bold mb-2">
                ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ತಾ|| {taluka} ಜಿ|| {district}
              </div>
              <div className="text-sm font-semibold mb-1">
                ಪಾವತಿಸಿರುವ ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿಗಳು ಎಫ್‌ಟಿಒ ಪ್ರತಿಗಳು
              </div>
              <div className="text-sm font-semibold">
                ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ
              </div>
            </div>

            {/* Right Logo */}
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="MGNREGA Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Main Table */}
        <div className="w-full overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-black text-xs min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "30px" }}
                >
                  <div className="text-[9px]">Sr. No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "80px" }}
                >
                  <div className="text-[9px]">Job Card No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "40px" }}
                >
                  <div className="text-[9px]">Applicant No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "100px" }}
                >
                  <div className="text-[9px]">Applicant Name</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "50px" }}
                >
                  <div className="text-[9px]">Mustroll No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "50px" }}
                >
                  <div className="text-[9px]">Wage List No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "60px" }}
                >
                  <div className="text-[9px]">Reference No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "80px" }}
                >
                  <div className="text-[9px]">Fto No.</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "70px" }}
                >
                  <div className="text-[9px]">Verify Po</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "40px" }}
                >
                  <div className="text-[9px]">Status</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "80px" }}
                >
                  <div className="text-[9px]">Bank_Name</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "70px" }}
                >
                  <div className="text-[9px]">WG APB CR ACCOUNT</div>
                </th>
                <th
                  className="border border-black px-1 py-2 text-center font-semibold"
                  style={{ width: "100px" }}
                >
                  <div className="text-[9px]">Favoring As Per Bank</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-1 py-2 text-center text-[9px]">
                    {item.slNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.jobCardNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-center text-[9px]">
                    {item.applicantNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.applicantName}
                  </td>
                  <td className="border border-black px-1 py-2 text-center text-[9px]">
                    {item.mustrollNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-center text-[9px]">
                    {item.wageListNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.referenceNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.ftoNo}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.verifyPo}
                  </td>
                  <td className="border border-black px-1 py-2 text-center text-[9px]">
                    {item.status}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.bankName}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.wgApbCrAccount}
                  </td>
                  <td className="border border-black px-1 py-2 text-[8px] break-all">
                    {item.favoringAsPerBank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="flex justify-end mt-8">
            <div className="  text-center">
              <div className="mb-2">
                <span className="text-sm font-semibold">
                  ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold">
                  ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}
                </span>
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

export default WLFTOPdf;
