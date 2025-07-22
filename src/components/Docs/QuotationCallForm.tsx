
// COMPLETED ( Pending date )
type MaterialData = {
  slNo: number;
  materialName: string;
  quantity: string;
  price: string;
};

type QuotationCallDataProp = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  administrativeSanction: string;
  workCode: string;
  workName: string;
  materialData: MaterialData[];
};

type QuotationCallPDFProps = {
  QuotationCallPDF: QuotationCallDataProp;
};

const QuotationCallPDF = ({ QuotationCallPDF }: QuotationCallPDFProps) => {
  const {
    gramPanchayat,
    taluka,
    district,
    year,
    administrativeSanction,
    workCode,
    workName,
    materialData
  } = QuotationCallPDF;

  const lastSubmissionDate = "15/10/2020"; // todate user input(last submision date) Pending date
  const date = "23/10/2020"; // from date user input // // Pending date

  const itemsPerPage = 15; // Based on the PDF structure
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
            <div className="flex border-b-2 border-black items-center justify-between mb-4">
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
                <div className="text-base font-semibold mb-2">
                  ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
                </div>
                <div className="text-sm mb-2">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ
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
            <div className="">
              <div className=" flex justify-between">
                <div className="text-sm mb-4">
                  ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ದ.ಪ.ಅ.ತು.ಪ/{year}
                </div>
                <div className="text-sm mb-4">ದಿನಾಂಕ: {date}</div>
              </div>
              <div className="text-base font-bold mb-2 text-center">
                ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4  px-8">
              <div className="text-xs space-x-3 flex font-semibold mb-4">
                <div>ವಿಷಯ:</div>
                <div className="leading-relaxed">
                  ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಲ್ಲಿ
                  ಕೈಗೊಳ್ಳಲಾಗುವ ಕಾಮಗಾರಿಗಳಿಗೆ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಮಾಡಲು ದರಪಟ್ಟಿ
                  ಆಹ್ವಾನಿಸುವ ಬಗ್ಗೆ.
                </div>
              </div>

              <div className="text-xs mb-2 space-x-3 font-semibold flex">
                <div>ಉಲ್ಲೇಖ :</div>
                <div className="leading-relaxed">
                  <h2>
                    {" "}
                    1) ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ ಮಾರ್ಗಸೂಚಿ ಪ್ಯಾರಾ 7.1.7 ಪ್ರಕಾರ
                  </h2>
                  <h2>
                    2) ಕಾಮಗಾರಿ ಆಡಳಿತಾತ್ಮಕ ಅನುಮೋದನೆ ಸಂಖ್ಯೆ :{" "}
                    {administrativeSanction}
                  </h2>
                  <h2>ದಿನಾಂಕ :{date}</h2>
                </div>
              </div>

              <div className="text-center mb-">********</div>
            </div>

            {/* Main Content */}
            <div className="mb-6 text-justify text-sm">
              <p className="mb-4 leading-relaxed">
                ಈ ಮೇಲ್ಕಂಡ ವಿಷಯ ಹಾಗೂ ಉಲ್ಲೇಖಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ {year} ನೇ ಸಾಲಿನ
                ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಲ್ಲಿ
                ಕೈಗೊಳ್ಳಲಾಗುವ {workName} ({workCode} ) ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನ ಮಾಡಲು ಈ
                ಕೆಳಕಂಡ ಸಾಮಗ್ರಿಗಳು ಅವಶ್ಯವಿದ್ದು, ಅವುಗಳನ್ನು ಅಹರ್ GST ನಂಬರ್ ಹೊಂದಿರುವ
                ಸರಬರಾಜುದಾರರಿಂದ ದರಪಟ್ಟಿಯನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿದೆ. ಆಸಕ್ತಿ ಹೊಂದಿರುವ
                ಸರಬರಾಜುದಾರರು ಇದಕ್ಕೆ ಲಗತ್ತಿಸಿದ ನಮೂನೆಯಲ್ಲಿ ಐಟಂವಾರು ಅಂಕಿ &
                ಅಕ್ಷರಗಳಲ್ಲಿ ದರವನ್ನು ನಮೂದಿಸಿ, ಸದರಿ ದರಪಟ್ಟಿಯನ್ನು ದಿನಾಂಕ{" "}
                {lastSubmissionDate} ರಂದು ಸಂಜೆ 5.00 ಗಂಟೆಯೊಳಗಾಗಿ ಈ ಕಛೇರಿಗೆ ಈ
                ಕೆಳಕಂಡ ಷರತ್ತುಗಳಿಗೆ ಒಳಪಟ್ಟು ಸಲ್ಲಿಸತಕ್ಕದ್ದು, ನಂತರ ಬರುವ ಯಾವುದೇ
                ದರಪಟ್ಟಿಗಳನ್ನು ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ.
              </p>
            </div>
          </>
        )}

        {/* Material Table */}
        <div className="w-full mb-6">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black px-2 py-2 text-center font-semibold w-12">
                  ಕ್ರ. ಸಂ.
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold">
                  ಸಾಮಗ್ರಿ ಹೆಸರು
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold w-20">
                  ಪ್ರಮಾಣ
                </th>
                <th className="border border-black px-2 py-2 text-center font-semibold w-24">
                  ದರ (as per SR)
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.slNo}
                  </td>
                  <td className="border border-black px-2 py-2">
                    {item.materialName}
                  </td>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-black px-2 py-2 text-center">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Terms and Conditions - Only on last page */}
        {isLastPage && (
          <>
            <div className="mb-6">
              <div className="text-sm font-semibold mb-3">ಷರತ್ತುಗಳು :</div>
              <div className="text-[10px] space-y-2 leading-relaxed">
                <div>1) ಸಾಮಗ್ರಿಗಳು ಉತ್ತಮ ಗುಣಮಟ್ಟವನ್ನು ಹೊಂದಿರಬೇಕು.</div>
                <div>
                  2) ಸರಬರಾಜುದಾರರು ಸಲ್ಲಿಸುವ ದರಗಳು ತೆರಿಗೆಯನ್ನು ಒಳಗೊಂಡಿದೆ ಅಥವಾ
                  ಇಲ್ಲವೆಂಬುದನ್ನು ನಮೂದಿಸಬೇಕು.
                </div>
                <div>
                  3) ಆಯ್ಕೆಯಾದ ಸರಬರಾಜುದಾರರು ಸಾಮಗ್ರಿಗಳನ್ನು ತಮ್ಮ ಖರ್ಚಿನಲ್ಲಿಯೇ
                  ಕಾಮಗಾರಿ ಸ್ಥಳಕ್ಕೆ ಸರಬರಾಜು ಮಾಡಲು ಬದ್ಧರಾಗಿರಬೇಕು.
                </div>
                <div>
                  4) ಸರಬರಾಜು ಮಾಡುವ ಸಾಮಗ್ರಿಗಳಿಗೆ ನಿಯಮಾನುಸಾರ ವಾರಂಟಿ ಇದ್ದಲ್ಲಿ,
                  ಅವಧಿಯೊಳಗೆ ಬದಲಾಯಿಸಿಕೊಡಲು ಬದ್ಧರಾಗಿರಬೇಕು.
                </div>
                <div>
                  5) ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು ಸರ್ಕಾರವು ಅನುದಾನ ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ
                  ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು ಸರ್ಕಾರವು ಅನುದಾನ
                  ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು
                  ಸರ್ಕಾರವು ಅನುದಾನ ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು
                </div>
                <div>
                  6) ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ ನೀಡುವ ಸಂದರ್ಭದಲ್ಲಿ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯು
                  ವಿಧಿಸುವ / ಒಪ್ಪುವ ಇನ್ನಿತರ ಷರತ್ತುಗಳಿಗೆ ಬದ್ಧರಾಗಿರಬೇಕು.
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="text-right mb-6">
              <div className="text-sm font-semibold">
                ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
              </div>
              <div className="text-sm pr-16 font-semibold pt-2">
                ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}
              </div>
            </div>

            {/* Copy Distribution */}
            <div className="text-xs">
              <div className="font-semibold mb-2">ಪ್ರತಿಯನ್ನು :</div>
              <div className="mb-1">1. ಸ್ಥಳೀಯ ಅಹರ್ ಸರಬರಾಜುದಾರಿಗೆ</div>
              <div>2. ಕಛೇರಿ ಸೂಚನಾ ಫಲಕ ಪ್ರತಿ/ ಕಾಮಗಾರಿ ಕಡತ ಪ್ರತಿ</div>
            </div>
          </>
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

export default QuotationCallPDF;
