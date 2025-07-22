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
            <div className="mb-2 border border-black  bg-[#E9D7D0] pb-1">
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
                <div className="w-full pt-2 border-r border-gray-400 p-1  bg-[#E9D7D0] text-start text-[11px]">
                  ಮಸ್ಟರ್ ರೋಲ್ ಸಂಖ್ಯೆ : {musterRollNo}
                </div>
                <div className="w-full pt-2  border-r border-gray-400 p-1  bg-[#E9D7D0] text-start  text-[11px]">
                  ದಿನಾಂಕ ದಿಂದ : {fromDate}
                  ದಿನಾಂಕದ ವರೆಗೆ : {toDate}
                </div>
                <div className="w-full pt-1 p-1  bg-[#E9D7D0] text-start  text-[10px]">
                  ಮುಂಜೂರಾತಿ ಸಂಖ್ಯೆ : {approvalNo}
                  <span className="pl-1">
                    ಮುಂಜೂರಾತಿ ದಿನಾಂಕ : {approvalDate}
                  </span>
                </div>
              </div>

              {/* Row 3 - 2 columns */}
              <div className="flex border-l border-r border-gray-400">
                <div className="w-[33.4%] border-r border-gray-400 p-1  bg-[#E9D7D0] text-start  text-[11px]">
                  ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ : {workCode}
                </div>
                <div className="w-[66.6%] p-1  bg-[#E9D7D0] text-start  text-[11px]">
                  ಕಾಮಗಾರಿ ಹೆಸರು : {workName} {financialYear}
                </div>
              </div>

              {/* Row 4 - Empty with 3 columns */}
              <div className="flex border border-gray-400">
                <div className="flex-1 border-r border-gray-400 p-2  bg-[#E9D7D0]"></div>
                <div className="flex-1 border-r border-gray-400 p-2  bg-[#E9D7D0]"></div>
                <div className="flex-1 p-2  bg-[#E9D7D0]"></div>
              </div>
            </div>

            {/* Measurement Book Detail */}
            <div className="mb-2 border  bg-[#E9D7D0] border-gray-500 text-center">
              <div className="border-b border-black">
                <div className="text-[13px]  text-white tracking-wide border bg-[#3E749F]">
                  Measurement Book Detail
                </div>
              </div>

              <div className="flex text-[12px] py-0.5  bg-[#E9D7D0] font-semibold justify-center">
                <div className="">
                  MB NO. <span className="font-normal">{mbNo}</span>
                </div>
                <div className="ml-7">
                  Page NO. <span className="font-normal">{pageNo}</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className=" bg-gray-300 px-0.5">
              <div className=" tracking-wide text-[12px] py-1 font-semibold text-[#FF0000] border text-center bg-gray-300">
                NOTE: Rows Highlighted By Yellow Color indicates attendance has
                been taken from Mobile Devices
              </div>

              {/* Mustroll Detail */}
              <div className="mb-1 py-0.5 tracking-wide text-[12px] bg-[#3E749F] text-white  text-center">
                Mustroll Detail
              </div>
            </div>
          </>
        )}

        {/* Main Table */}
        <div className="w-full bg-gray-400 border-red-500">
          <table
            className="w-full border-collapse border border-[#3E749F] text-[9px]"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr className="bg-[#6898B5]">
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "20px" }}
                >
                  ಕ್ರ.ಸಂ.
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "50px" }}
                >
                  ಹೆಸರು / ನೋಂದಣಿ ಸಂಖ್ಯೆ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಜಾತಿ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಹಳ್ಳಿ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "15px" }}
                >
                  1
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಟ್ಟು ಹಾಜರಾತಿ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಂದು ದಿನದ ವೇತನ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಹಾಜರಾತಿ ತಕ್ಕಂತೆ ಬಾಕಿ ಹಣ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಪ್ರಯಾಣ ವೆಚ್ಚ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  Implements / Sharpening Charge
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  ಒಟ್ಟು ನಗದು ಪಾವತಿ
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "40px" }}
                >
                  Postoffice/ Bank Name
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "35px" }}
                >
                  Postoffice Code/ Branch name
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "38px" }}
                >
                  Postoffice address/ Branch code
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "58px" }}
                >
                  Wagelist No.
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "25px" }}
                >
                  Status
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  A/c Credited Date
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  ಸಹಿ / ಹೆಬ್ಬೆರಳು ಗುರುತು
                </th>
                <th
                  className="border border-[#3E749F] px-1 py-1 text-center font-bold"
                  style={{ width: "30px" }}
                >
                  Attendance By
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((worker, index) => (
                <tr key={startIndex + index} className="bg-yellow-100">
                  <td className="border border-[#3E749F] px-1 py-1 text-center">
                    {worker.slNo}
                  </td>
                  <td className="border-t border-[#3E749F] flex flex-col px-1 py-1 text-[9px] break-all">
                    {worker.name}
                    <br />
                    <span className="pt-0.5">{worker.jobCardNo}</span>
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.caste}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.village}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.day1}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.totalAttendance}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.oneDayWage}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.pendingAmountByAttendance}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.travelExpense}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.implementsCharge}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.totalCashPayment}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 break-all">
                    {worker.bankName}
                  </td>
                  <td className="border border-[#3E749F] text-center text-[9px] px-1 py-1 break-all">
                    {worker.branchName}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1  break-all">
                    {worker.branchCode}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1  break-all">
                    {worker.wagelistNo}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.status}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center ">
                    {worker.creditedDate}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.signature}
                  </td>
                  <td className="border border-[#3E749F] text-[9px] px-1 py-1 text-center">
                    {worker.attendanceBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-2 border border-black">
            <div className="grid grid-cols-4  place-items-center text-[12px]">
              <div className="border-r border-black w-full h-full px-5 pb-3 pt-4">
                <div className="border border-black p">
                  <div className="mb-1 border-b border-black px-1">
                    ವೇತನ ವಿತರಣೆ ಸಂಬಂಧಿತ ಹಣ(In Rs.)
                  </div>
                  <div className="mb-1 border-b border-black px-1  flex ">
                    <span className="w-[70%]">ವಿತರಿಸಿದ ಹಣ ಪ್ರ. </span>{" "}
                    <span className="w-[30%] ">0</span>
                  </div>
                  <div className="mb-1 border-b border-black px-1  flex ">
                    <span className="w-[70%]">ವಿತರಿಸಿದ ಹಣ ಪ್ರ. </span>{" "}
                    <span className="w-[30%] ">0</span>
                  </div>
                  <div className=" border-black px-1  flex ">
                    <span className="w-[70%]">ವಿತರಿಸಿದ ಹಣ ಇತರೆ </span>{" "}
                    <span className="w-[30%] "> {totalWage}</span>
                  </div>
                </div>
              </div>

              <div className="h-full w-full border-r  border-black flex flex-col justify-between">
                <div className="mb-1 pt-8">ಹಾಜರ ಪಡೆದವರ ಸಹಿ (ಸಹಿ)</div>
                <div className="mb-1">ಪರಿಶೀಲನೆ ಮಾಡಿದವರ ಸಹಿ</div>
              </div>
              <div className="w-full h-full flex py-6 px-4 border-r border-black">
                <div className="border border-black w-full">
                  <div className="border-b p-0.5 border-black">
                    ಒಟ್ಟು ನಗದು ಪಾವತಿ (In Rs.)
                  </div>

                  <div className="border-b p-0.5 border-black px-1  flex ">
                    <span className="w-[70%]">ನಗದು </span>{" "}
                    <span className="w-[30%] "> {totalWage}</span>
                  </div>
                  <div className=" p-0.5  px-1  flex ">
                    <span className="w-[70%]">ಸರಾಸರಿ ಕೂಲಿ ಸಂಸ್ಥೆ </span>{" "}
                    <span className="w-[30%] "> {wage}</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col border  justify-center">
                <div>ಒಟ್ಟು ಕಾರ್ಮಿಕರ ನಗದು : {workersData.length}</div>
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

export default WageListPDF;
