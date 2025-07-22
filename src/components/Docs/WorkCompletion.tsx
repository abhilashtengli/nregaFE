
// COMPLETED
type WorkCompletion = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  administrativeSanctionNo: string;
  workStartDate: string;
  wage: string;
  material: string;
  total: string;
};

type WorkCompletionData = {
  workCompletionData: WorkCompletion;
};
const WorkCompletionPDF = ({ workCompletionData }: WorkCompletionData) => {
  const {
    gramPanchayat,
    taluka,
    district,
    year,
    workCode,
    workName,
    administrativeSanctionNo,
    workStartDate,
    wage,
    material,
    total
  } = workCompletionData;
  const workEndDate = "";
  const masterollId = "";
  const expenditure = "";
  const workOrderNo = "25";
  const workOrderDate = "20/04/2022";
  const grama = gramPanchayat;
  const worksite = gramPanchayat;
  return (
    <div
      className="w-full max-w-4xl mx-auto bg-white border-2 border-black"
      style={{
        width: "210mm", // A4 width
        minHeight: "297mm", // A4 height
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.4",
        padding: "15mm",
        boxSizing: "border-box"
      }}
    >
      {/* Header with logos */}
      <div className="flex items-center justify-between border-b-2 pb-3 border-black mb-6">
        {/* Left Logo */}
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="MGNREGA Logo"
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
          <div className="text-sm mb-2">ಅನುಬಂಧ - V Annexture - V</div>
          <div className="text-base font-bold mb-1">
            ಕಾಮಗಾರಿಯ ಮುಕ್ತಾಯ ದೃಢೀಕರಣ ನಮೂನೆ
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

      {/* Address Section */}
      <div className="mb-6">
        <div className="mb-2">ಗೆ,</div>
        <div className="mb-1">ಅಧ್ಯಕ್ಷರು / ಕಾರ್ಯಕ್ರಮ ಅಧಿಕಾರಿ</div>
        <div className="mb-1">{gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯತಿ</div>
        <div className="mb-1">{taluka} ತಾಲ್ಲೂಕು</div>
        <div className="mb-4">{district} ಜಿಲ್ಲೆ</div>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-4">
          ವಿಷಯ: {year} ಸಾಲಿನಲ್ಲಿ {gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಘನತ್ಯಾಜ್ಯ
          ವಿಲೇವಾರಿ ಘಟಕ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಯ ಮುಕ್ತಾಯ ದೃಢೀಕರಣ
        </div>
      </div>

      {/* Salutation */}
      <div className="mb-4">
        <div className="mb-4">ಮಾನ್ಯರೇ,</div>
        <div className="mb-6 pl-5">
          ಮೇಲಿನ ವಿಷಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಈ ಕೆಳಕಂಡ ವಿವರಗಳೊಂದಿಗೆ ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ
          ದೃಢೀಕರಣ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.
        </div>
      </div>

      {/* Work Details with Border */}
      <div className="border-2 border-black mb-8">
        <div>
          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಕಾಮಗಾರಿ ಸಂಕೇತ:</span>
            <span>{workCode}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಕಾಮಗಾರಿ ಹೆಸರು:</span>
            <span>{workName}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಗ್ರಾಮ:</span>
            <span>{grama}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಗ್ರಾಮ ಪಂಚಾಯತ್:</span>
            <span>{gramPanchayat}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-56">
              ಕಾಮಗಾರಿ ಸ್ಥಳ (ಪ್ಲಾಟ್ ಸಂಖ್ಯೆ, ಇತ್ಯಾದಿ):
            </span>
            <span>{worksite}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">
              ಆಡಳಿತಾತ್ಮಕ ಅನುಮತಿ ಸಂಖ್ಯೆ:
            </span>
            <span>{administrativeSanctionNo}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-56">
              ಕಾರ್ಯಾದೇಶ ಸಂಖ್ಯೆ ಮತ್ತು ದಿನಾಂಕ:
            </span>
            <span>
              {workOrderNo}, {workOrderDate}
            </span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಕಾಮಗಾರಿ ಪ್ರಾರಂಭ ದಿನಾಂಕ:</span>
            <span>{workStartDate}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ ದಿನಾಂಕ:</span>
            <span>{workEndDate}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ಬಳಸಿದ ಮಸ್ಟರ್ ರೋಲ್‌ನ ಐಡಿ:</span>
            <span>{masterollId}</span>
          </div>

          <div className="flex border-b border-black py-2 px-4">
            <span className="font-semibold w-48">ವೆಚ್ಚ:</span>
            <span>{expenditure}</span>
          </div>

          <div className="flex">
            <div className="flex  py-2 px-4">
              <span className="font-semibold w-48">ಕೂಲಿ:</span>
              <span>{wage}</span>
            </div>

            <div className="flex  py-2 px-4">
              <span className="font-semibold w-48">ಸಾಮಾಗ್ರಿ:</span>
              <span>{material}</span>
            </div>

            <div className="flex py-2 px-4">
              <span className="font-semibold w-48">ಒಟ್ಟು:</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Audit Date */}
      <div className="mb-8">
        <div className="flex">
          <span className="font-semibold w-48">ಸಾಮಾಜಿಕ ಪರಿಶೋಧನೆ ದಿನಾಂಕ:</span>
          <span>_________________</span>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-12">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="mb-8 ">
              <div className="flex">
                <div className="border-b border-black w-48 mb-2"></div>
                <div className="text-sm">
                  <div className="mb-1">ರವರಿಂದ ದೃಢೀಕರಣ</div>
                </div>
              </div>

              <span className="text-sm mr-8">(ಸಹಿ)</span>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-8">
              <div className="border-b border-black w-48 mb-2"></div>
              <span className="text-sm">ಅಧಿಕೃತ ಅಧಿಕಾರಿಯ ಸಹಿ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCompletionPDF;
