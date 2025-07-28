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
type Form8PropsData = {
  gramPanchayat?: string;
  workCode?: string;
  workName?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

type Form8Data = {
  form6Data: Form8PropsData;
};

const Form8PDF = ({ form6Data }: Form8Data) => {
  const {
    gramPanchayat,
    workCode,
    workName,
    taluka,
    district,
    date,
    applicantsData = []
  } = form6Data;
  const workDate = date;
  const workingDays = `ದಿನಾಂಕ  : ${applicantsData[0].workFrom} ರಂದ ${applicantsData[0].workTo} ವರೆಗೆ`;
  const workLocation = gramPanchayat || "";
  const rowsPerPage = 21; // Based on the PDF structure
  const totalPages = Math.ceil(applicantsData.length / rowsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = applicantsData.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <div
        key={pageNumber}
        className="w-full text-base max-w-4xl mx-auto bg-white border-2 border-black mb-8"
        style={{
          minHeight: "297mm",
          width: "210mm",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: "1.3",
          padding: "15mm"
        }}
      >
        {/* Header - Only on first page */}
        {isFirstPage && (
          <>
            {/* Header with logos */}
            <div className="flex items-center justify-between mb-6">
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
                <div className="text-base font-semibold mb-2">
                  ಗ್ರಾಮ ಪಂಚಾಯತ್, {gramPanchayat}, ತಾ|| {taluka}. ಜ|| {district}
                </div>
                <div className="text-sm mb-2">
                  ಅನುಬಂಧ - IV Annexture - IV (ನಮೂನೆ-8)
                </div>
                <div className="text-sm mb-2">ಕೆಲಸ ಹಂಚಕೆ ನಮೂನೆ</div>
                <div className="text-sm mb-4">
                  ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೕಜನೆ ಅನುಸೂಚ 11 ಕಂಡಕೆ 11 ಕಾಯ್ದೆ 3(1) ರಂತೆ
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

            {/* Letter number and date with borders */}
            <div className="border-t-2 border-b-2 border-black py-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ಪತ್ರದ ಸಂಖ್ಯೆ 12</span>
                <span className="text-sm font-medium">ದಿನಾಂಕ {date}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 ">
              <div className="font-semibold text-base">
                <div className="mb-2">ಗೆ,</div>
                <div className="mb-1">
                  ಶ್ರೀ / ಶ್ರೀಮತಿ ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ
                </div>
                <div className="mb-1">{gramPanchayat}</div>
                <div className="mb-1">{gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯತ</div>
                <div className="mb-1">{taluka} ತಾಲೂಕು</div>
                <div className="mb-4">{district} ಜಿಲ್ಲೆ</div>
              </div>
              <div className="border-2 h-fit border-black p-3 text-start">
                <div className="font-semibold text-sm mb-2">
                  ಕಾಮಗಾರಿಕೆ ಕಡತಕ್ಕಾಗಿ
                </div>
                <div className="font-semibold text-sm">
                  ನಮೂನೆ 8 ನೕಡದ - ಸ್ವೕಕೃತಿ ಪತ್ರ
                </div>
              </div>
            </div>

            <div className="mb-2 text-center">
              <div className="mb-1 font-bold text-base">
                ಉದ್ಯೋಗ ಚೀಟಿಯ ಸಂಖ್ಯೆ: ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-base font-semibold">
                ವಿಷಯ: ಕೆಲಸ ಹಂಚಿಕೆ ಬಗ್ಗೆ ಮಾಹಿತಿ
              </div>
            </div>

            <div className="mb-6 text-justify">
              <p className="mb-4">
                ಕೆಲಸದ ಅರ್ಜಿ ಸಂಖ್ಯೆ 12 ಯ {date} (ದಿನಾಂಕ )ದ ನಿಮ್ಮ ಕೆಲಸದ ಅರ್ಜಿಗೆ
                ಸಂಬಂಧಿಸಿದಂತೆ ಎಂಜಿಎನ್‌ಆರ್‌ಇಜಿ ಕಾಯ್ದೆ 2005 ರ ಷೆಡ್ಯೂಲ್ II ಕ೦ಡಕೆ II
                ಪ್ರಕಾರ ನಿಮಗೆ ಈ ಕೆಳಕಾಣಸದ ಕಾಮಗಾರಿಯನ್ನು ಹಂಚಿಕೆ ಮಾಡಲಾಗಿದೆ. ಆದ್ದರಿಂದ
                ನೀವು ಈ ಕೆಲಸಕ್ಕೆ ದಿನಾಂಕ {workDate} ರಂದು ಹಾಜರಾಗಲು ಈ ಮೂಲಕ ತಿಳಸದೆ
              </p>
            </div>

            {/* Work Details Table */}
            <div className="mb-6">
              <table className="w-full border-collapse border border-black text-sm">
                <tbody>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold w-8">
                      1
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಯೕಜನೆಯ ಸಂಖ್ಯೆ
                    </td>
                    <td className="border border-black px-2 py-1">
                      {workCode}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold">
                      2
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಕಾಮಗಾರಿಯ ಹೆಸರು
                    </td>
                    <td className="border border-black px-2 py-1">
                      {workName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold">
                      3
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಕಾಮಗಾರಿಂಯ ಸ್ಥಳ
                    </td>
                    <td className="border border-black px-2 py-1">
                      {workLocation}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold">
                      4
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಕಾರ್ಯನಿರ್ವಹಣಾ ಏಜೆನ್ಸಿ
                    </td>
                    <td className="border border-black px-2 py-1">
                      ಗ್ರಾಮ ಪಂಚಾಯತ
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold">
                      5
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಅನುಷ್ಠಾನ ಏಜೆನ್ಸಿ
                    </td>
                    <td className="border border-black px-2 py-1">
                      ಗ್ರಾಮ ಪಂಚಾಯತ
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 font-semibold">
                      6
                    </td>
                    <td className="border border-black px-2 py-1 font-semibold">
                      ಕೆಲಸಕ್ಕೆ ನಿಡದ ದಿನಗಳು
                    </td>
                    <td className="border border-black px-2 py-1">
                      {workingDays}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6 text-justify">
              <p className="text-sm">
                ಈ ಪತ್ರದ ಸ್ವೀಕೃತಿಯ ನಂತರ ಕಾಮಗಾರಿ ಹಂಚಿಕೆಮಾಡದ ದಿನಾಂಕದ ಒಳಗಾಗ ನಿವು
                ಕೆಲಸಕ್ಕೆ ಹಾಜರಾಗದದ್ಲ್ ಮಹಾತ್ಮಗಾಂಧಿ ಎನ್ ಆರ್ ಇಜ ಕಾಯ್ದಯ ಸೆಕ್ಷನ್ 9 ರ
                ಪ್ರಕಾರ ಮುಂದನ ಮೂರು ತ೦ಗಳವರೆಗೆ ನಿವು ನಿರುದ್ಯೋಗ ಭತ್ಯೆಯನು ಪಡೆಯಲು
                ಅರ್ಹರಾಗಿರುವುಧಿಲಾ. ಹಾಗದ್ದರೂ ನಿವು ಯಾವುದೇ ಸಮಯದಲ್ಯೂ ಉದ್ಯೋಗಕ್ಕಾಗಿ
                ಅರ್ಜಿ ಸಲ್ಲಿಸ ಬಹುದು.
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold">
                ಈ ಕಾಮಗಿರಯನು ಈ ಕೆಳಕಂಡವರಿಗೆ ಕೆಲಸ ಹಂಚಕೆ ಮಾಡಲಾಗಿದೆ
              </p>
            </div>
          </>
        )}

        {/* Labour Table */}
        <div className="w-full">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black px-2 py-2 text-center font-semibold w-12">
                  ಕ್ರ.ಸಂ.
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold">
                  ಹೆಸರು
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold">
                  ಉದ್ಯೋಗ ಚೀಟಿ ಸಂಖ್ಯೆ
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold w-32">
                  ನಮೂನೆ-8 ಸ್ವೕಕೃತ ಸಹಿ
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((labour, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-2 py-3 text-center">
                    {labour.slNo}
                  </td>
                  <td className="border border-black px-2 py-3">
                    {labour.applicantName}
                  </td>
                  <td className="border border-black px-2 py-3 text-center">
                    {labour.jobCardNo}
                  </td>
                  <td className="border border-black px-2 py-3 text-center"></td>
                </tr>
              ))}
              {/* Add empty rows to maintain table structure if needed */}
              {pageData.length < rowsPerPage && (
                <>
                  {Array.from(
                    { length: rowsPerPage - pageData.length },
                    (_, i) => (
                      <tr key={`empty-${i}`}>
                        <td className="border border-black px-2 py-3 text-center h-10"></td>
                        <td className="border border-black px-2 py-3"></td>
                        <td className="border border-black px-2 py-3"></td>
                        <td className="border border-black px-2 py-3"></td>
                      </tr>
                    )
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer - Only on last page */}
        {isLastPage && (
          <div className="mt-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm mb-2">ದಿನಾಂಕ : {date}</p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <p className="text-sm">ಗ್ರಾ.ಪಂ.ಮೊಹರು</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ
                  </p>
                  <p className="text-sm">ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}.</p>
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

export default Form8PDF;
