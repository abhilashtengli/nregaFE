
//COMPLETED .comes from the form 6 data only
type ApplicantData = {
  slNo: number;
  applicantName: string;
  jobCardNo: string;
  workFrom: string;
  workTo: string;
  childCareRequired: string;
  signature: string;
};

// Define the props structure for Form6PDF
type Form9PropsData = {
  gramPanchayat?: string;
  workCode?: string;
  workName?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

type Form9Data = {
  form6Data: Form9PropsData;
};
const Form9PDF = ({ form6Data }: Form9Data) => {
  const {
    gramPanchayat,
    workCode,
    workName,
    taluka,
    district,
    date,
    applicantsData = []
  } = form6Data;
  const workingDays = `ದಿನಾಂಕ  : ${applicantsData[0].workFrom} ರಂದ ${applicantsData[0].workTo} ವರೆಗೆ`;
  const workLocation = gramPanchayat || "";
  const itemsPerPage = 20; // Based on the PDF structure
  const totalPages = Math.ceil(applicantsData.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = applicantsData.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={pageNumber}
        className="w-full max-w-4xl mx-auto bg-white border-2 border-black mb-8"
        style={{
          width: "210mm", // A4 width
          minHeight: "297mm", // A4 height
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: "1.3",
          padding: "15mm",
          boxSizing: "border-box"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            {/* Header with logos */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              {/* Left Logo */}
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="MGNREGA Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Center Content */}
              <div className="text-center flex-1 mx-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-bold">ಕರ್ನಾಟಕ</span>
                  <div className="w-8 h-8">
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Karnataka Government Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold">ಸರ್ಕಾರ</span>
                </div>
                <div className="text-base font-semibold">
                  ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
                </div>
                <div className="text-sm mb-1 font-bold">ನಮೂನೆ-9</div>
                <div className="text-base font-bold ">
                  ಕೆಲಸಕ್ಕೆ ಹಾಜರಾಗಲು ತಿಳಿಸುವ ಸಾರ್ವಜನಿಕ ನೋಟೀಸು
                </div>
                <div className="text-sm">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ
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

            {/* Notice Content */}
            <div className="mb-6 text-justify text-sm leading-relaxed">
              <p className="mb-4 text-xs leading-relaxed">
                ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ ಅಕುಶಲ ಉದ್ಯೋಗಕ್ಕಾಗಿ ನೋಂದಾಯಿಸಿರುವ
                ವ್ಯಕ್ತಿಗಳು, ಈ ಕೆಳಗೆ ವಿವರಿಸಿರುವ ಕಾಮಗಾರಿಯ ಮೇಲ್ವಿಚಾರಕರಲ್ಲಿ ದಿನಾಂಕ{" "}
                {date} ರಂದು ಕೆಲಸಕ್ಕೆ ವರದಿ ಮಾಡಿಕೊಳ್ಳಲು ಸೂಚಿಸಿದೆ. ಎಂಬುದಾಗಿ
                ಸಂಬಂಧಿಸಿದ ವ್ಯಕ್ತಿಗಳ ಹಾಗೂ ಸಾರ್ವಜನಿಕರ ಗಮನಕ್ಕೆ ಈ ಮೂಲಕ ತರಲಾಗಿದೆ.
              </p>
            </div>

            {/* Work Details Table */}
            <div className="mb-6">
              <table className="w-full  text-sm">
                <tbody>
                  <tr>
                    <td className=" px-2 py-1 font-semibold w-8">1</td>
                    <td className=" px-2 py-1 font-semibold">ಯೋಜನೆಯ ಸಂಖ್ಯೆ</td>
                    <td className=" px-2 py-1">{workCode}</td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 font-semibold">2</td>
                    <td className=" px-2 py-1 font-semibold">ಕಾಮಗಾರಿಯ ಹೆಸರು</td>
                    <td className=" px-2 py-1">{workName}</td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 font-semibold">3</td>
                    <td className=" px-2 py-1 font-semibold">ಕಾಮಗಾರಿಯ ಸ್ಥಳ</td>
                    <td className=" px-2 py-1">{workLocation}</td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 font-semibold">4</td>
                    <td className=" px-2 py-1 font-semibold">
                      ಕಾರ್ಯನಿರ್ವಹಣಾ ಏಜೆನ್ಸಿ
                    </td>
                    <td className=" px-2 py-1">ಗ್ರಾಮ ಪಂಚಾಯತ</td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 font-semibold">5</td>
                    <td className=" px-2 py-1 font-semibold">
                      ಅನುಷ್ಠಾನ ಏಜೆನ್ಸಿ
                    </td>
                    <td className=" px-2 py-1">ಗ್ರಾಮ ಪಂಚಾಯತ</td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 font-semibold">6</td>
                    <td className=" px-2 py-1 font-semibold">
                      ಕೆಲಸಕ್ಕೆ ನೀಡಿದ ದಿನಗಳು
                    </td>
                    <td className=" px-2 py-1">{workingDays}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Worker Table */}
        <div className="w-full mb-6">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black px-2 py-2 text-center font-semibold w-12">
                  ಕ್ರ.ಸಂ.
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold">
                  ಹೆಸರು
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold w-40">
                  ಉದ್ಯೋಗ ಚೀಟಿ ಸಂಖ್ಯೆ
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((worker, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-2 py-2 text-center">
                    {worker.slNo}
                  </td>
                  <td className="border border-black px-2 py-2">
                    {worker.applicantName}
                  </td>
                  <td className="border border-black px-2 py-2 text-center">
                    {worker.jobCardNo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-8">
            <div className="flex justify-between">
              <div>
                <p className="text-xs mb-2">ದಿನಾಂಕ: 06/08/2021</p>
              </div>
              <div className="mb-2">
                <p className="text-xs">ಗ್ರಾ.ಪಂ.ಮೊಹರು</p>
              </div>
              <div>
                <p className="text-xs font-semibold">
                  ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ
                </p>
                <p className="text-xs pl-5">ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}.</p>
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

export default Form9PDF;
