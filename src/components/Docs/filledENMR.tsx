// PENDING
type WorkerData = {
  slNo: number;
  name: string;
  jobCardNo: string;
  caste: string;
  village: string;
  day1: string;
  totalAttendance: number;
  oneDayWage: number;
  pendingAmountByAttendance: number;
  travelExpense: number;
  implementsCharge: number;
  totalCashPayment: number;
  bankName: string;
  branchName: string;
  branchCode: string;
  wagelistNo: string;
  status: string;
  creditedDate: string;
  signature: string;
  attendanceBy: string;
};

type WageListData = {
  state?: string;
  district?: string;
  taluka?: string;
  panchayat?: string;
  musterRollNo?: string;
  fromDate?: string;
  toDate?: string;
  approvalNo?: string;
  approvalDate?: string;
  workCode?: string;
  workName?: string;
  financialYear?: string;
  mbNo?: string;
  pageNo?: string;
  totalWage?: number;
  wage?: number;
  workersData?: WorkerData[];
};

const WageListPDF = ({
  state = "KARNATAKA",
  district = "KALABURAGI",
  taluka = "YADRAMI",
  panchayat = "KACHAPUR",
  musterRollNo = "33159",
  fromDate = "05/12/2023",
  toDate = "05/12/2023",
  approvalNo = "1515006038/2023-2024/468814/AS",
  approvalDate = "02/12/2023",
  workCode = "1515006038/WC/GIS/1009331",
  workName = 'ಬಿಲ್ವಾಡ.ಬಿ "ವಿಠ್ಠಲ ಬಂಡಗಾರ ಹೊಲಯಿಂದ ಮಾರುತಿ ಹೋಲದವರಿಗೆ ಮುರಮ್ಮ ರಸ್ತೆ ಕಾಮಗಾರಿ"',
  financialYear = "2023-24",
  mbNo = "02",
  pageNo = "50",
  totalWage = 3160,
  wage = 316,
  workersData = [
    {
      slNo: 1,
      name: "ಸಂತಮ್ಮ ಸೋಮಣ್ಣ ಸಂಬರ(Self)",
      jobCardNo: "KN-15-006-023-002/3150",
      caste: "OTHER",
      village: "ಕಚಪುರ",
      day1: "P",
      totalAttendance: 1,
      oneDayWage: 316,
      pendingAmountByAttendance: 316,
      travelExpense: 0,
      implementsCharge: 0,
      totalCashPayment: 316,
      bankName: "PRAGATHI KRISHNA GRAMIN BANK",
      branchName: "MALLI",
      branchCode: "PKGB0011048",
      wagelistNo: "1515006038WL038158",
      status: "Credited",
      creditedDate: "01/03/2024",
      signature: "",
      attendanceBy: ""
    },
    {
      slNo: 2,
      name: "ಲಕ್ಷ್ಮೀ ಅಮೃತಪ್ಪ(Self)",
      jobCardNo: "KN-15-006-023-002/3170",
      caste: "OTHER",
      village: "ಕಚಪುರ",
      day1: "P",
      totalAttendance: 1,
      oneDayWage: 316,
      pendingAmountByAttendance: 316,
      travelExpense: 0,
      implementsCharge: 0,
      totalCashPayment: 316,
      bankName: "PRAGATHI KRISHNA GRAMIN BANK",
      branchName: "MALLI",
      branchCode: "PKGB0011048",
      wagelistNo: "1515006038WL038158",
      status: "Credited",
      creditedDate: "01/03/2024",
      signature: "",
      attendanceBy: ""
    }
  ]
}: WageListData) => {
  const firstPageRows = 12;
  const subsequentPageRows = 15;
  const totalPages =
    Math.ceil(
      Math.max(0, workersData.length - firstPageRows) / subsequentPageRows
    ) + (workersData.length > 0 ? 1 : 1);

  const renderPage = (pageNumber: number) => {
    const isFirstPage = pageNumber === 1;
    const startIndex = isFirstPage
      ? 0
      : firstPageRows + (pageNumber - 2) * subsequentPageRows;
    const endIndex = isFirstPage
      ? firstPageRows
      : startIndex + subsequentPageRows;
    const pageData = workersData.slice(startIndex, endIndex);
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={pageNumber}
        className="w-full max-w-full mx-auto bg-white border-2 border-black mb-8"
        style={{
          height: "240mm", // Increased height to fit more content
          width: "297mm", // A4 width in landscape
          fontFamily: "Arial, sans-serif",
          fontSize: "8px",
          lineHeight: "1.0",
          padding: "4mm",
          boxSizing: "border-box"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            {/* Header Table */}
            <div className="mb-2 border border-black  bg-red-100 pb-1">
              {/* Row 1 - 4 columns */}
              <div className="flex  border-b-2 border-black ">
                <div className="flex-1 border-r border-gray-400 p-1 bg-gray-300 text-center  text-[12px]">
                  ರಾಜ್ಯ : {state}
                </div>
                <div className="flex-1 border-r border-gray-400 p-1 bg-gray-300 text-center  text-[12px]">
                  ಜಿಲ್ಲೆ : {district}
                </div>
                <div className="flex-1 border-r border-gray-400 p-1 bg-gray-300 text-center text-[12px]">
                  ತಾಲೂಕು : {taluka}
                </div>
                <div className="flex-1 p-1 bg-gray-300 text-center  text-[12px]">
                  ಪಂಚಾಯಿತಿ : {panchayat}
                </div>
              </div>

              {/* Row 2 - 3 columns */}
              <div className="flex justify-between border-l border-r border-b border-gray-400">
                <div className="w-full pt-2 border-r border-gray-400 p-1 bg-red-100 text-start text-[11px]">
                  ಮಸ್ಟರ್ ರೋಲ್ ಸಂಖ್ಯೆ : {musterRollNo}
                </div>
                <div className="w-full pt-2  border-r border-gray-400 p-1 bg-red-100 text-start  text-[11px]">
                  ದಿನಾಂಕ ದಿಂದ : {fromDate}
                  ದಿನಾಂಕದ ವರೆಗೆ : {toDate}
                </div>
                <div className="w-full pt-1 p-1 bg-red-100 text-start  text-[10px]">
                  ಮುಂಜೂರಾತಿ ಸಂಖ್ಯೆ : {approvalNo}
                  <span className="pl-1">
                    ಮುಂಜೂರಾತಿ ದಿನಾಂಕ : {approvalDate}
                  </span>
                </div>
              </div>

              {/* Row 3 - 2 columns */}
              <div className="flex border-l border-r border-gray-400">
                <div className="w-[33.4%] border-r border-gray-400 p-1 bg-red-100 text-start  text-[11px]">
                  ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ : {workCode}
                </div>
                <div className="w-[66.6%] p-1 bg-red-100 text-start  text-[11px]">
                  ಕಾಮಗಾರಿ ಹೆಸರು : {workName} {financialYear}
                </div>
              </div>

              {/* Row 4 - Empty with 3 columns */}
              <div className="flex border border-gray-400">
                <div className="flex-1 border-r border-gray-400 p-2 bg-red-100"></div>
                <div className="flex-1 border-r border-gray-400 p-2 bg-red-100"></div>
                <div className="flex-1 p-2 bg-red-100"></div>
              </div>
            </div>

            {/* Measurement Book Detail */}
            <div className="mb-2">
              <div className="text-[10px]  mb-1">Measurement Book Detail</div>
              <div className="flex text-[9px] ">
                <div className="border border-gray-400 p-1 bg-gray-100">
                  MB NO. {mbNo}
                </div>
                <div className="border border-gray-400 border-l-0 p-1 bg-gray-100 ml-8">
                  Page NO. {pageNo}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mb-2 text-[8px] ">
              NOTE: Rows Highlighted By Yellow Color indicates attendance has
              been taken from Mobile Devices
            </div>

            {/* Mustroll Detail */}
            <div className="mb-1 text-[9px] ">Mustroll Detail</div>
          </>
        )}

        {/* Main Table */}
        <div className="w-full">
          <table
            className="w-full border-collapse border border-black text-[7px]"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr className="bg-gray-200">
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "20px" }}
                >
                  ಕ್ರ.ಸಂ.
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "80px" }}
                >
                  ಹೆಸರು / ನೋಂದಣಿ ಸಂಖ್ಯೆ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಜಾತಿ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಹಳ್ಳಿ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "15px" }}
                >
                  1
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಟ್ಟು ಹಾಜರಾತಿ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಂದು ದಿನದ ವೇತನ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಹಾಜರಾತಿ ತಕ್ಕಂತೆ ಬಾಕಿ ಹಣ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಪ್ರಯಾಣ ವೆಚ್ಚ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  Implements / Sharpening Charge
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಟ್ಟು ನಗದು ಪಾವತಿ
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "40px" }}
                >
                  Postoffice/ Bank Name
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "35px" }}
                >
                  Postoffice Code/ Branch name
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "35px" }}
                >
                  Postoffice address/ Branch code
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "40px" }}
                >
                  Wagelist No.
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  Status
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  A/c Credited Date
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಸಹಿ / ಹೆಬ್ಬೆರಳು ಗುರುತು
                </th>
                <th
                  className="border border-black px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  Attendance By
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((worker, index) => (
                <tr key={startIndex + index} className="bg-yellow-50">
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.slNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-[6px] break-all">
                    {worker.name}
                    <br />
                    {worker.jobCardNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.caste}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.village}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.day1}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.totalAttendance}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.oneDayWage}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.pendingAmountByAttendance}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.travelExpense}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.implementsCharge}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.totalCashPayment}
                  </td>
                  <td className="border border-black px-1 py-1 text-[6px] break-all">
                    {worker.bankName}
                  </td>
                  <td className="border border-black px-1 py-1 text-[6px] break-all">
                    {worker.branchName}
                  </td>
                  <td className="border border-black px-1 py-1 text-[6px] break-all">
                    {worker.branchCode}
                  </td>
                  <td className="border border-black px-1 py-1 text-[6px] break-all">
                    {worker.wagelistNo}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.status}
                  </td>
                  <td className="border border-black px-1 py-1 text-center text-[6px]">
                    {worker.creditedDate}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.signature}
                  </td>
                  <td className="border border-black px-1 py-1 text-center">
                    {worker.attendanceBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-2">
            <div className="flex justify-between text-[8px]">
              <div>
                <div className="mb-1">ಸಂಖ್ಯಾಪರ ಸೋಮೇ</div>
                <div className="mb-1">
                  ಕಾರ್ಮಿಕರ ಸಂಖ್ಯೆ : {workersData.length}
                </div>
              </div>
              <div>
                <div className="mb-1">ವೇತನ ವಿತರಣೆ ಸಂಬಂಧಿತ ಹಣ(In Rs.)</div>
                <div className="mb-1">ವಿತರಿಸಿದ ಹಣ ಪ್ರ. : 0</div>
                <div className="mb-1">ವಿತರಿಸಿದ ಹಣ ಪ್ರ. : 0</div>
                <div className="mb-1">ವಿತರಿಸಿದ ಹಣ ಇತರೆ : {totalWage}</div>
              </div>
              <div>
                <div className="mb-1">ಹಾಜರ ಪಡೆದವರ ಸಹಿ (ಸಹಿ)</div>
                <div className="mb-1">ಪರಿಶೀಲನೆ ಮಾಡಿದವರ ಸಹಿ</div>
              </div>
            </div>
            <div className="mt-2 text-[8px]">
              <div className="mb-1">ಒಟ್ಟು ನಗದು ಪಾವತಿ (In Rs.)</div>
              <div className="mb-1">ನಗದು : {totalWage}</div>
              <div className="mb-1">ಸರಾಸರಿ ಕೂಲಿ ಸಂಸ್ಥೆ : {wage}</div>
              <div>ಒಟ್ಟು ಕಾರ್ಮಿಕರ ನಗದು : {workersData.length}</div>
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

export default WageListPDF;
