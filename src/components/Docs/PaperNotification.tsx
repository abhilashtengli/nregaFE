
type PaperNotificationProps = {
  district?: string; //1
  taluka?: string; //1
  gramPanchayat?: string; //1
  year: string; //1
  date?: string; // from date user input
  workName?: string; //1
  quotationAmount?: string;
  emdPrice?: string;
  eligibleContractors?: string; //_______ದಿನಗಳು
  fromDate?: string; // from date user input
  toDate?: string; // to date user input
  prebidMeetingDate?: string; // to date user input
  documentSubmissionDate?: string; // to date user input
  envelopeOpeningDetails?: string; //to date user input
};
type PaperNotificationData = {
  paperNotificationData: PaperNotificationProps;
};
const PaperNotificationPDF = ({
  paperNotificationData
}: PaperNotificationData) => {
  const {
    district,
    taluka,
    gramPanchayat,
    year,
    date,
    workName,
    quotationAmount,
    prebidMeetingDate,
    documentSubmissionDate,
    envelopeOpeningDetails,
    fromDate,
    toDate
  } = paperNotificationData;

  const emdPrice = "500";
  const eligibleContractors = "_______ದಿನಗಳು";

  const formatDate = (isoDateString?: string) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-3 mb-4">
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
        <div className="text-base font-bold mb-1">
          ಜಿಲ್ಲಾ ಪಂಚಾಯತ {district} / ತಾಲೂಕ ಪಂಚಾಯತ ಗುಲ್ಬರ್ಗಾ
        </div>
        <div className="text-sm font-bold">
          ಗ್ರಾಮ ಪಂಚಾಯತ ಕಾರ್ಯಾಲಯ {gramPanchayat}
        </div>
      </div>

      {/* Reference Info */}
      <div className="flex justify-between text-xs mb-4">
        <span>ಸಂಗ್ರಾಪಂಕಲ :ಉಖಾಯೋ:ಸಾ.ಪೊ:ದ.ಪ: {year}</span>
        <span>ದಿನಾಂಕ :- {formatDate(date)}</span>
      </div>

      {/* Title */}
      <div className="text-center text-base font-bold mb-4 underline">
        ಸಾಮಾಗ್ರಿಗಳ ಪೂರೈಕೆಗಾಗಿ ದರಪಟ್ಟಿಗಳ ಆಹ್ವಾನ
      </div>

      {/* Subject */}
      <div className="text-center text-sm font-bold mb-4">
        <strong>ವಿಷಯ :</strong> {year.split("-")[0]}-
        {year.split("-")[1].slice(-2)} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ
        ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಡಿ ಗ್ರಾಮ ಪಂಚಾಯತಿಯಿಂದ ಅನುಷ್ಠಾನ ಮಾಡಲಾಗುವ ವಿವಿಧ
        ಕಾಮಗಾರಿಗಳಿಗೆ ಅಗತ್ಯವಾದ ಸಾಮಾಗ್ರಿಗಳನ್ನು ಪೂರೈಕ್ಕೆ ಮಾಡುವುದಕ್ಕಾಗಿ ದರಪಟ್ಟಿ
        ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ಮಾಡುವ ಕುರಿತು.
      </div>

      {/* Reference Section */}
      <div className="mb-4 text-xs text-justify">
        <strong>ಉಲ್ಲೇಖ :</strong>
        <div className="ml-5 mt-2">
          <div className="mb-2">
            1) ಮಾನ್ಯ ಆಯುಕ್ತರು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ, ಆಯುಕ್ತಾಲಯ ಮತ್ತು ಪಂಚಾಯತರಾಜ್ ಇಲಾಖೆ
            ಬೆಂಗಳೂರುಇವರ ಆದೇಶಸಂಖ್ಯೆ:
          </div>
          <div className="font-bold mb-3">
            RDC-EGS/988/2022(E-970872) Do: 17.05.2023
          </div>
          <div>
            2) ಸರ್ಕಾರದ ಆದೇಶ ಸಂಖ್ಯೆ:ಆರ್.ಡಿ.ಸಿ.-ಇ.ಜಿ.ಎಸ್/988/2022 ಬೆಂಗಳೂರು,
            ದಿನಾಂಕ: 16.05.2023
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="text-sm font-bold mb-3">1. ಪ್ರಕಟಣೆ</div>

      {/* Main Content */}
      <div className="mb-4 text-xs text-justify leading-relaxed">
        ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ನಿಂದ {year} ನೇ ಸಾಲಿನ ಮಾಹಾತ್ಮ ಗಾಂಧಿ
        ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯ ಕ್ರಿಯಾ ಯೋಜನೆಯಡಿ ಅನುಮೋದನೆಯಾದ ಗ್ರಾಮ
        ಪಂಚಾಯತಿಯಿಂದ ಅನುಷ್ಠಾನ ಮಾಡಲಾಗುವ ವಿವಿಧ ಕಾಮಗಾರಿಗಳಿಗೆ ಅಗತ್ಯವಾದ ಸಾಮಾಗ್ರಿಗಳನ್ನು
        ಪೂರೈಕ್ಕೆ ಮಾಡುವುದಕ್ಕಾಗಿ ದರಪಟ್ಟಿ ಪ್ರಕಟಣೆ ಮಾಡಿ ಅರ್ಹ ದರಪಟ್ಟಿದಾರರಿಂದ
        (ಸರಬರಾಜುದಾರರು/ಏಜೆನ್ಸಿಯವರು / ಮಾರಾಟಗಾರರು ಅರ್ಹ ಸಂಸ್ಥೆಯವರು ಇತ್ಯಾದಿ )
        ದರಪಟ್ಟಿಗಳನ್ನು ಅನುಬಂಧ -1 ರಲ್ಲಿ ದಾಖಲಿಸಲಾದ ಕಾಮಗಾರಿಗಳ ಐಟಂವಾರು
        ಸಾಮಾಗ್ರಿಗಳಿಗಾಗಿ ಮೊಹರು ಮಾಡಿದ ಲಕೋಟಿಗಳಲ್ಲಿ ಸ್ಪರ್ಧಾತ್ಮಕ ದರಪಟ್ಟಿಗಳನ್ನು
        ಆಹ್ವಾನಿಸಲಾಗಿರುತ್ತದೆ.
      </div>

      {/* Work Details Table */}
      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕ್ರಸಂ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕಾಮಗಾರಿಯ ಹೆಸರು
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕೊಟೇಶನಗಾಗಿ ಇಟ್ಟ ಮೊತ್ತ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಇ.ಎಂ.ಡಿ. ಮೊತ್ತ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕೊಟೇಶನ್ ದರಪಟ್ಟಿ ಬೆಲೆ
                <br />
                ರೂ ಗಳಲ್ಲಿ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಅರ್ಹತೆ ಹೊಂದಿದ ಗುತ್ತಿಗೆದಾರರ
                <br />
                ಶ್ರೇಣಿ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕಾಮಗಾರಿ ಪೂರ್ತಿ
                <br />
                ಗೊಳಿಸಲು ಪಡಿಸಿದ ಅವಧಿ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-2 text-center">1</td>
              <td className="border border-black px-2 py-2 text-left">
                {workName}
              </td>
              <td className="border border-black px-2 py-2 text-center">
                {quotationAmount}
              </td>
              <td className="border border-black px-2 py-2 text-center">
                {emdPrice}
              </td>
              <td className="border border-black px-2 py-2 text-center">
                4ನೇ ದರ್ಜೆ
                <br />
                ಮೇಲ್ಪಟ್ಟು
              </td>
              <td className="border border-black px-2 py-2 text-center">
                {eligibleContractors}
              </td>
              <td className="border border-black px-2 py-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2 */}
      <div className="text-sm font-bold mb-3">
        2. ದರಪಟ್ಟಿ ಪ್ರಕ್ರಿಯೆಯ ವೇಳಾಪಟ್ಟಿ
      </div>

      {/* Schedule Table */}
      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಕ್ರಸಂ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ವಿವರ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ನಿಗಧಿ ಪಡಿಸಿದ ದಿನಾಂಕ
              </th>
              <th className="border border-black px-2 py-2 text-center font-bold">
                ಪರಾ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-2 text-center">1</td>
              <td className="border border-black px-2 py-2 text-left">
                ದರಪಟ್ಟಿ ಫಾರಂ ಮತ್ತು ಡಾಕುಮೇಂಟ್ ವಿತರಿಸುವ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </td>
              <td className="border border-black px-2 py-2 text-left">
                {formatDate(fromDate)} ದಿನಾಂಕ ದಿಂದ {formatDate(toDate)} ರ ವರೆಗೆ
                ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ ಮತ್ತು ಕಛೇರಿ ವೇಳೆಯಲ್ಲಿ,
              </td>
              <td className="border border-black px-2 py-2 text-center"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-2 text-center">2</td>
              <td className="border border-black px-2 py-2 text-left">
                ದರಪಟ್ಟಿದಾರರು ಪೂರ್ವಭಾವಿ ಸಭೆ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </td>
              <td className="border border-black px-2 py-2 text-left">
                {formatDate(prebidMeetingDate)} ರಂದು ಸಮಯ ಬೆಳ್ಳಿಗೆ 11-00
                ಗಂಟೆಗೆಯಿಂದ ಅಪರಾಹ್ನ 2-00 ಗಂಟೆ ವರೆಗೆ ಗ್ರಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ
              </td>
              <td className="border border-black px-2 py-2 text-center"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-2 text-center">3</td>
              <td className="border border-black px-2 py-2 text-left">
                ಮೊಹರು ಮಾಡಿದ ದರಪಟ್ಟಿ ಫಾರಂ ಮತ್ತು ಇತರೆ ದಾಖಲಾತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುವ
                ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </td>
              <td className="border border-black px-2 py-2 text-left">
                {formatDate(documentSubmissionDate)} ರಂದು ಬೆಳ್ಳಿಗೆ 11-00
                ಗಂಟೆಯಿಂದ ಅಪರಾಹ್ನ 2-00 ಗಂಟೆಯವರಿಗೆ ಗಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ
              </td>
              <td className="border border-black px-2 py-2 text-center"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-2 text-center">4</td>
              <td className="border border-black px-2 py-2 text-left">
                ಮೊಹರು ಮಾಡಿದ ದರಪಟ್ಟಿ ಲಕೋಟೆ ತೆರೆಯುವ ಸ್ಥಳ, ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </td>
              <td className="border border-black px-2 py-2 text-left">
                "ಹಾಜರಿರುವ ದರಪಟ್ಟಿದಾರರ ಸಮುಖದಲ್ಲಿ{" "}
                {formatDate(envelopeOpeningDetails)} ರಂದು ಅಪರಾಹ್ನ 3-00 ಗಂಟೆ
                ಗ್ರಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ"
              </td>
              <td className="border border-black px-2 py-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Important Note */}
      <div className="mb-6 text-xs text-justify leading-relaxed">
        ದರಪೆಟ್ಟಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಯಾವುದೇ ಮಾಹಿತಿಯನ್ನು ಕಛೇರಿಗೆ ಕೆಲಸದ ವೇಳೆಯಲ್ಲಿ ಗ್ರಾಮ
        ಪಂಚಾಯತಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಪಡೆಯಬಹುದಾಗಿರುತ್ತದೆ. ದರಪಟ್ಟಿಯನ್ನು ಸ್ವಿಕರಿಸುವ ಮತ್ತು
        ತಿರಸ್ಕರಿಸುವ ಮತ್ತು ಅಧಿಕಾರ ಗ್ರಾಮ ಪಂಚಾಯತಿಯದ್ದಾಗಿರುತ್ತದೆ ಹಾಗೂ ಈ ದರಪಟ್ಟಿ
        ಪ್ರಕ್ರಿಯೆಗೆ ಸಂಬಂದಿಸಿದಂತೆ ಗ್ರಾಮ ಪಂಚಾಯತಿಯ ತೀರ್ಮಾನವೆ ಅಂತಿಮ
        ತೀರ್ಮಾನವಾಗಿರುತ್ತದೆ
      </div>

      {/* Footer Signatures */}
      <div className="flex justify-between mt-8">
        <div className="text-center w-2/5 font-bold">
          <div className="text-xs  mb-2">ಅಧ್ಯಕ್ಷರು</div>
          <div className="text-xs">ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}</div>
          <div className="text-xs">ತಾ: ಗುಲ್ಬರ್ಗಾ ಜಿಲ್ಲೆ: ಜಿ : {district}</div>
        </div>
        <div className="text-center w-2/5 font-bold">
          <div className="text-xs  mb-2">ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು</div>
          <div className="text-xs">ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}</div>
          <div className="text-xs">
            ತಾ: {taluka} ಜಿಲ್ಲೆ: ಜಿ : {district}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperNotificationPDF;
