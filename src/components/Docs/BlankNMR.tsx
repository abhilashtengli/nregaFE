
// PENDING (Data integration is pending..) This we will integrate in the frontend
const NMRPDF = ({
  musterRollNo = "30515", //11
  district = "ಕಲಬುರಗಿ", //1
  taluka = "ಜೇವರ್ಗಿ", //1
  gramPanchayat = "ರಂಜಣಗಿ", //1
  financialYear = "2024-2025", //1
  workCode = "1515006040/RC/93393042892451831", //1
  workName = "ಜೇಸಣಗಿ ಗಾ್ಮದ ಮಲಗಣಗಾಗಣಗೊಲಗಂದ ಗೋಗಾಗಳಪಗ ಗದಗಪಗ ರವರ ಗೊಲದ ವಗೆೆ ರಗೆಗಸುಗಾರೆ ಗಾಮಾ", //1
  fromDate = "01/01/2025", // 11
  toDate = "07/01/2025", //11
  technicalSanctionNo = "1515006040/2024-2025/324546/TS", //3
  technicalSanctionDate = "10/10/2024", //3
  financialSanctionNo = "1515006040/2024-2025/324546/AS", //4
  financialSanctionDate = "23/11/2024", //4
  workerData = [
    {
      slNo: 1,
      jobCardNo: "KN-15-006-030-002/426",
      familyHeadName: "ಶಗಗರಪೇಲ ಗಾಗೇಬಪೇಲ",
      accountNo: "PUNJAB NATIONAL BANK XXXXXXXXXXX1522"
    },
    {
      slNo: 2,
      jobCardNo: "KN-15-006-030-002/232",
      familyHeadName: "ಯಾಕುಬ",
      accountNo: "AIRTEL PAYMENTS BANK LIMITED XXXXXXXXXXX1156"
    },
    {
      slNo: 3,
      jobCardNo: "KN-15-006-030-002/510",
      familyHeadName: "ಅಗಾಗಪೇಲ ಸಯಗದಪೇಲ",
      accountNo: "INDIA POST PAYMENTS BANK LIMITED XXXXXXXXXXX3136"
    }
  ]
}) => {
  const village = "";
  const rowsPerPage = workerData.length > 20 ? 20 : workerData.length; // Dynamic based on data
  const totalPages = Math.ceil(workerData.length / rowsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = workerData.slice(startIndex, endIndex);
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
          fontSize: "6px", // Reduced from 7px
          lineHeight: "1.0",
          padding: "4mm", // Reduced padding
          boxSizing: "border-box",
          pageBreakAfter: "always"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            <div className="relative">
              <div className="w-20 h-16  absolute right-0 top-0 flex-shrink-0">
                <img
                  src=""
                  alt="MGNREGA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Title Section */}
              <div className="text-center mb-2 ">
                <div className="text-[10px] font-bold mb-1">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯೋಗ ಖಾತರಿ ಯೋಜನೆ
                </div>
                <div className="text-[10px] font-semibold mb-1">
                  ಮಸ್ಟರ್ ರೋಲ್ (For Unskilled Labour)
                </div>
              </div>

              {/* Basic Information */}
              <div className="mb-2 text-xs leading-tight ">
                <div className="flex justify-start mb-1 space-x-8">
                  <span>
                    <span className="font-semibold text-[8px]">
                      ಅಳತೆ ಪುಸ್ತಕ (MB) ಸಂಖ್ಯೆ:
                    </span>{" "}
                    _______
                  </span>
                  <span>
                    <span className="font-semibold text-[8px]">Page No:</span>{" "}
                    _________
                  </span>
                </div>
                <div className="flex text-[10px] justify-center space-x-4 mt-3 mb-1">
                  <span className="font-bold">
                    <span className="">ರಾಜ್ಯ:</span> ಕರ್ನಾಟಕ
                  </span>
                  <span className="font-bold">
                    <span>ಮಸ್ಟರ್ ರೋಲ್ ಸಂಖ್ಯೆ:</span> {musterRollNo}
                  </span>
                  <span className="font-bold">
                    <span>Muster roll Printing Date:</span> ____
                  </span>
                  <span className="font-bold">
                    <span>ಜಿಲ್ಲೆ: ಜಿ :</span> {district}
                  </span>
                  <span className="font-bold">
                    <span>ತಾಲೂಕು:</span> {taluka}
                  </span>
                  <span className="font-bold">
                    <span>ಗ್ರಾಮ ಪಂಚಾಯತ:</span> {gramPanchayat}
                  </span>
                  <span className="font-bold">
                    <span>Financial Year:</span> {financialYear}
                  </span>
                </div>
                <div className="flex justify-between mb-1"></div>
              </div>
            </div>

            {/* Work Details */}
            <div className="mb-2 text-xs leading-tight">
              <div className="flex space-x-36">
                <div className="flex justify-between text-[8px] mb-1">
                  <span>
                    <span className="font-semibold">ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ:</span>{" "}
                    {workCode}
                  </span>
                </div>
                <div className="mb-1 text-[10px]  font-bold">
                  <span className="">ಕಾಮಗಾರಿ ಹೆಸರು:</span> {workName} (
                  {financialYear})
                </div>
              </div>

              <div className=" flex font-bold justify-between items-center text-[10px]">
                <div>
                  <span>
                    <span>ದಿನಾಂಕದಿಂದ:</span> {fromDate}
                  </span>
                  <span className="ml-3">
                    <span>ದಿನಾಂಕದವರೆಗೆ:</span> {toDate}
                  </span>
                </div>
                <div>
                  <span>
                    <span>ಕಾರ್ಯನಿರ್ವಹಣೆ ಇಕಾಯಿ:</span> GRAM PANCHAYAT
                  </span>
                </div>
                <div className=" flex flex-col justify-center items-center">
                  <span>
                    <span>Technical Sanction No & Date:</span>{" "}
                    {technicalSanctionNo} ({technicalSanctionDate})
                  </span>
                  <span>
                    <span>Financial Sanction No & Date:</span>{" "}
                    {financialSanctionNo} ({financialSanctionDate})
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-1"></div>
              <div className="flex text-[10px] justify-between mb-1">
                <span>
                  <span className="font-bold">
                    Name of the Technical Staff Responsible for Measurement:
                  </span>{" "}
                  ____________________(TAE)
                </span>
              </div>
            </div>
          </>
        )}

        {/* Main Table */}
        <div className="w-full">
          <table
            className="w-full border-collapse border border-black text-xs"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr className="">
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "15px" }}
                >
                  <div className="transform text-[8px]">ಕ್ರ.ಸಂ.</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "50px" }}
                >
                  <div className="text-[8px]">ಹೆಸರು / ನೋಂದಣಿ ಸಂಖ್ಯೆ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "45px" }}
                >
                  <div className="text-[8px]">ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಹೆಸರು</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "45px" }}
                >
                  <div className="text-[8px]">ಅರ್ಜಿದಾರರ ಹೆಸರು</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "25px" }}
                >
                  <div className="text-[8px]">ಹಳ್ಳಿ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "60px" }}
                >
                  <div className="text-[8px]">ಖಾತೆ ಸಂಖ್ಯೆ</div>
                </th>
                {/* Date columns - 7 columns */}
                {Array.from({ length: 7 }, (_, i) => (
                  <th
                    key={`date-${i}`}
                    className="border border-black px-1 py-1 text-center font-semibold"
                    style={{ width: "12px" }}
                  >
                    <div className="transform text-[8px]">{i + 1}</div>
                  </th>
                ))}
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "20px" }}
                >
                  <div className="text-[8px]">ಒಟ್ಟು ಹಾಜರಾತಿ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "25px" }}
                >
                  <div className="text-[8px]">ಒಂದು ದಿನದ ವೇತನ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "30px" }}
                >
                  <div className="text-[8px]">ಹಾಜರಾತಿ ತಕ್ಕಂತೆ ಬಾಕಿ ಹಣ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "20px" }}
                >
                  <div className="text-[8px]">ಪ್ರಯಾಣ ವೆಚ್ಚ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "25px" }}
                >
                  <div className="text-[8px]">
                    Implements / Sharpening Charge
                  </div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "25px" }}
                >
                  <div className="text-[8px]">ಒಟ್ಟು ನಗದು ಪಾವತಿ</div>
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-semibold"
                  style={{ width: "35px" }}
                >
                  <div className="text-[8px]">
                    ಅರ್ಜಿದಾರರ ಸಹಿ / ಹೆಬ್ಬೆರಳು ಗುರುತು
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((worker, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-1 py-1 text-center text-[8px]">
                    {worker.slNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-[7px] break-all">
                    {worker.jobCardNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-[7px] break-all">
                    {worker.familyHeadName}
                  </td>
                  <td className="border border-black px-1 py-1 text-[7px] break-all">
                    {worker.familyHeadName}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[7px]">
                    {village}
                  </td>
                  <td className="border border-black px-1 py-1 text-[7px] break-all">
                    {worker.accountNo}
                  </td>
                  {/* Date columns - 7 blank columns */}
                  {Array.from({ length: 7 }, (_, i) => (
                    <td
                      key={`date-${i}`}
                      className="border border-black px-1 py-1 text-center h-4"
                    ></td>
                  ))}
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                  <td className="border border-black px-1 py-1 text-center"></td>
                </tr>
              ))}
              {/* Total row */}
              <tr className=" font-semibold">
                <td
                  className="border border-black px-1 py-1 text-center text-xs"
                  colSpan={6}
                >
                  ಒಟ್ಟು
                </td>
                {/* Date columns - 7 blank columns */}
                {Array.from({ length: 7 }, (_, i) => (
                  <td
                    key={`total-date-${i}`}
                    className="border border-black px-1 py-1"
                  ></td>
                ))}
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
                <td className="border border-black px-1 py-1 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-6">
            <div className="flex space-x-72 justify-center items-end">
              <div className="text-left">
                <p className="text-[8px] font-semibold">
                  ಹಾಜರ ಪಡೆದವರ ಹೆಸರು (ಸಹಿ)
                </p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-semibold">
                  ಪರಿಶೀಲನೆ ಮಾಡಿದವರ (ಸಹಿ)
                </p>
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

export default NMRPDF;
