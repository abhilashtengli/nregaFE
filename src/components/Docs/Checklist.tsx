
// COMPLETED
type WorkData = {
  id: string;
  workCode: string;
  workName: string;
  sanctionYear: string;
  panchayat: string;
  block: string;
};
type GramPanchayatChecklistProps = {
  workData: WorkData;
};
const Checklist = ({ workData }: GramPanchayatChecklistProps) => {
  const gramPanchayat = workData?.panchayat || "";
  const workName = workData?.workName || "";
  const workCode = workData?.workCode || "";
  const sanctionedYear = workData?.sanctionYear || "";
  // const block = workData?.block || "";
  const checklistItems = [
    {
      sl: 1,
      kannada: "ಅನುಮೋದಿತ ಕಾರ್ಯಯೋಜನೆ/ಕಾರ್ಯಪಟ್ಟಿ (ಯೋಜನೆಯ ಸಂಖ್ಯೆಯನ್ನು ಉಲ್ಲೇಖಿಸಿ)",
      english:
        "Copy of Approved Action Plan/ Shelf of Work (Mentioning Serial. No. of theproject)",
      required: "ಹೌದು",
      pages: "1"
    },
    {
      sl: 2,
      kannada: "ತಾಂತ್ರಿಕ ಅಂದಾಜು ಮತ್ತು ವಿನ್ಯಾಸ ಪ್ರತಿ",
      english: "Copy of technical estimate and design",
      required: "ಹೌದು",
      pages: "2"
    },
    {
      sl: 3,
      kannada: "ತಾಂತ್ರಿಕ ಅನುಮೋದನೆಯ ಪ್ರತಿ",
      english: "Copy of Technical Sanction",
      required: "ಹೌದು",
      pages: "3-4"
    },
    {
      sl: 4,
      kannada: "ಆಡಳಿತ / ಹಣಕಾಸಿನ ಅನುಮೋದನೆಯ ಪ್ರತಿ",
      english: "Copy of Administrative/ Financial Sanction",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 5,
      kannada: "ಒಗ್ಗೂಡಿಕೆ ವಿವರಗಳು, ಅನ್ವಯಿಸಿದರೆ",
      english: "Convergence Details, if applicable",
      required: "ಇಲ್ಲ",
      pages: ""
    },
    {
      sl: 6,
      kannada: "ಕೆಲಸಗಾರರಿಂದ ಬೇಡಿಕೆ ಅರ್ಜಿ (ನಮೂನೆ- 6)",
      english: "Demand Application by workers",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 7,
      kannada: "ಕೆಲಸ ಹಂಚಿಕೆ ನೋಟೀಸ್ ಪ್ರತಿ (ನಮೂನೆ- 8)",
      english: "Copy of Work Allocation Notice",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 8,
      kannada: "ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ ಕಿರಿಯ ಸಹಾಯಕ ನೋಟೀಸ್ (ನಮೂನೆ- 9)",
      english: "Copy of Form 9",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 9,
      kannada: "ಮೂಲಗಂಗಡಿ ಮುಸ್ತರ್ ರೋಲ್ ಪ್ರತಿ",
      english: "Copy of filled in Muster Rolls",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 10,
      kannada: "ಮಾಪಕ ಪುಸ್ತಕ ಪ್ರತಿ (ರಾಜ್ಯದಲ್ಲಿ ಎಂ.ಬಿ ನಿರ್ವಹಿಸಿದ್ದರೆ)",
      english:
        "Copy of Measurement Books (copy of e-MB if maintained by the State)",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 11,
      kannada:
        "ಸಾಮಗ್ರಿಗಳ ಸಂಗ್ರಹಣೆಗಾಗಿ ಕೋಟೇಶನ್ ಆಹ್ವಾನ ಪ್ರತಿ,ತುಲನಾತ್ಮಕ ಹೇಳಿಕೆ ಮತ್ತು ಸಾಮಗ್ರಿ ಪೂರೈಕೆ ಆದೇಶ ಪ್ರತಿ",
      english:
        "Copy of quotations invited for procurement of materials, comparative statement and material supply order.",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 12,
      kannada: "ಕೂಲಿಪಟ್ಟಿ",
      english: "Wage List",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 13,
      kannada: "ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿ ಪಾವತಿ ಎಫ್.ಟಿ.ಒ.ಗಳು",
      english: "Copy of wage and material payment FTOs",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 14,
      kannada: "ಸಾಮಗ್ರಿ ವೋಚರ್ ಮತ್ತು ಬಿಲ್ಲುಗಳು",
      english: "Material Voucher and Bills",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 15,
      kannada: "ರಾಯಾಲ್ಟಿ ಪಾವತಿ ರಸೀದಿಗಳ ಪ್ರತಿ",
      english: "Copies of the receipts of royalty paid",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 16,
      kannada:
        "ಮೂರು ಹಂತಗಳಲ್ಲಿ ಕಾರ್ಯಗಳ ಛಾಯಾಚಿತ್ರ (ಪ್ರಾರಂಭ ಮುಂಚೆ, ಕಾರ್ಯಗಳ ನಡುವೆ ಮತ್ತು ನಂತರ)",
      english: "Photograph of work at three stages (Pre, during and post)",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 17,
      kannada: "ಕಾರ್ಯಗಳ ಪೂರ್ಣಗೊಳ್ಳಿ ಪ್ರಮಾಣ ಪತ್ರದ ಪ್ರತಿ",
      english: "Copy of Work Completion Certificate",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 18,
      kannada: "ಮಸ್ತರ್ ರೋಲ್ ಚಲನೆ ಪತ್ರ",
      english: "Muster Roll Movement Slip",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 19,
      kannada: "ಸ್ಥಿತಿ ಸೂಚಕ ಛಾಯಾಚಿತ್ರ",
      english: "Geo-tagged photograph of the asset",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 20,
      kannada: "ಸಾಮಾಜಿಕ ಲೇಖ ಪರಿಶೋಧನೆಯ ಪ್ರತಿ (ಈಗಾಗಲೇ ನಡೆಸಿದ್ದರೆ)",
      english: "Copy of Social Audit Report, if already conducted",
      required: "ಇಲ್ಲ",
      pages: ""
    },
    {
      sl: 21,
      kannada: "ನಾಗರಿಕ ಮಾಹಿತಿ ಪಟ್ಟಿ",
      english: "Civic Information Board (CIB)",
      required: "ಹೌದು",
      pages: ""
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header with decorative border */}
      <div
        className="border-4 border-black p-4 mb-6"
        style={{ borderStyle: "double" }}
      >
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold mb-2">
            ಗ್ರಾಮ ಪಂಚಾಯಿತಿ: {gramPanchayat}
          </h1>
          <h2 className="text-lg mb-2">ಅನುಬಂಧ - II:ಪ್ರಮಾಣ ಪತ್ರದ ಜೊತೆ ಲೇಖೆ</h2>
        </div>

        {/* Document Header Info */}
        <div className="mb-4 space-y-1">
          <p>
            <strong>ಕಾರ್ಯಗಳ ಹೆಸರು:</strong> {workName}
          </p>
          <p>
            <strong>ಕಾರ್ಯಗಳ ಸಂಖ್ಯೆ ಸಂಬಂಧ:</strong> {workCode}
          </p>
          <p>
            <strong>ಕಾರ್ಯಗಳ ಅನುಮೋದನ ವರ್ಷ:</strong> {sanctionedYear}
          </p>
        </div>

        {/* Checklist Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center w-16">
                  ಕ್ರ.ಸಂ
                </th>
                <th className="border border-black p-2 text-center">
                  ಲೇಖೆ ಲಿಸ್ಟ್
                </th>
                <th className="border border-black p-2 text-center w-24">
                  ಅಗತ್ಯವಿರುವ ಗಿಲ್ಲಟ್ಟಿ (ಇಲ್ಲ/ಹೌದು)
                </th>
                <th className="border border-black p-2 text-center w-24">
                  ಪುಟಗಳ ಸಂಖ್ಯೆ ಪ್ರತಿ ಸಂಖ್ಯೆ
                </th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-black p-2 text-center font-medium">
                    {item.sl}
                  </td>
                  <td className="border border-black p-2">
                    <div className="space-y-1">
                      <div className="font-medium">{item.kannada}</div>
                      <div className="text-sm text-gray-600 italic">
                        {item.english}
                      </div>
                    </div>
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.required}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.pages}
                  </td>
                </tr>
              ))}
              {/* Empty rows for additional items */}
              {[...Array(3)].map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
