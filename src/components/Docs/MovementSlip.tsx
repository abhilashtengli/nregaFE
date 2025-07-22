
// PENDING
const MovementSlipPDF = ({
  workCode = "1507004008/AV/93393042892262348",
  workName = "ಕಾಳಗಿ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಘನತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ ಘಟಕ ನಿರ್ಮಾಣ",
  grama = "ಕಾಳಗಿ",
  gramPanchayat = "ಕಾಳಗಿ",
  taluka = "ಮುದ್ದೇಬಿಹಾಳ",
  district = "ವಿಜಯಪುರ",
  date = "" // blank
  //ಇ-ಹಾಜರಾತಿ  mustroll // from link 8
}) => {
  return (
    <div
      className="w-full max-w-4xl mx-auto bg-white border-2 border-black"
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
      {/* Header with logos */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
        {/* Left Logo */}
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="Karnataka Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Center Content */}
        <div className="text-center flex-1 mx-4 ">
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

          <div className="text-sm mb-2">ಅನುಬಂಧ - VI Annexture - VI</div>
          <div className="text-base font-bold mb-1">ಹಾಜರಾತಿ ಚಲನವಲನ ಚೀಟಿ</div>
          <div className="text-base ">MUSTER ROLL MOVEMENT FORM</div>
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

      {/* Work Details */}
      <div className="mb-6">
        <div className="mb-3">
          <span className="font-semibold">ಕಾಮಗಾರಿ ಸಂಕೇತ:</span> {workCode}
        </div>
        <div className="mb-3">
          <span className="font-semibold">ಕಾಮಗಾರಿ ಹೆಸರು:</span> {workName}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="mb-2">
              <span className="font-semibold">ಗ್ರಾಮ:</span> {grama}
            </div>
            <div className="mb-2">
              <span className="font-semibold">ತಾಲೂಕು:</span> {taluka}
            </div>
          </div>
          <div>
            <div className="mb-2">
              <span className="font-semibold">ಗ್ರಾಮ ಪಂಚಾಯತಿ:</span>{" "}
              {gramPanchayat}
            </div>
            <div className="mb-2">
              <span className="font-semibold">ಜಿಲ್ಲೆ:</span> {district}
            </div>
          </div>
          <div>
            <div className="mb-2">
              <span className="font-semibold">ದಿನಾಂಕ:</span> {date}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-full mb-8 ">
        <table className="w-full border-collapse border-2 border-black text-xs">
          <thead>
            <tr>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-12">
                ಕ್ರ ಸಂ
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-20">
                ಇ-ಹಾಜರಾತಿ // mustroll
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-24">
                ಇ-ಎನ್‌ಎಮ್‌ಆರ್ ವಿತರಣೆ // from date
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-24">
                ಇ-ಎನ್‌ಎಮ್‌ಆರ್ ಮುಕ್ತಾಯ // to date
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-32">
                ಎಮ್‌ಐಎಸ್‌ನಲ್ಲಿ ಹಾಜರಾತಿ ಇಂದೀಕರಿಸುವಿಕೆ // to date + 1
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-16">
                ಕೆಲಸದ ಅಳತೆ // to date + 2
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-32">
                ಎಮ್‌ಐಎಸ್‌ನಲ್ಲಿ ದಾಖಲಿಸಿದ ಅಳತೆ to date + 2
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-20">
                ಎಫ್‌ಟಿಒ 1ನೇ ಸಹಿ // payment date - 1 from link 8
              </th>
              <th className="border text-[10px] border-black px-2 py-2 text-center font-semibold w-20">
                ಎಫ್‌ಟಿಒ 2ನೇ ಸಹಿ // payment date
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }, (_, i) => (
              <tr key={i}>
                <td className="border border-black px-2 py-3 text-center">
                  {i + 1}
                </td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
                <td className="border border-black px-2 py-3 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Signature Section */}
      <div className="mt-8">
        <div className="mb-4">
          <span className="font-semibold">ಅಧಿಕಾರಿ/ಸಿಬ್ಬಂದಿ ಸಹಿ:</span>
          <div className="border-b border-black w-64 mt-2"></div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">ಅಧಿಕಾರಿ/ಸಿಬ್ಬಂದಿ ಹೆಸರು:</span>
          <div className="border-b border-black w-64 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MovementSlipPDF;
