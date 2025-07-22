// COMPLETED
type WorkData = {
  workCode: string; //1
  workName: string; //1
  panchayat: string; //1
  block: string; //1
  estimatedCost: string; //1
  date: string; // link 8 (from date -1 )
};
type WorkOrderProps = {
  workOrderDate: WorkData;
};
const WorkOrderPDF = ({ workOrderDate }: WorkOrderProps) => {
  const { panchayat, block, date, workCode, workName, estimatedCost } =
    workOrderDate;

  const gramPanchayat = panchayat || "";
  const taluka = block || "";
  const estimatedAmount = estimatedCost || "";
  const grama = panchayat || "";

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.4"
      }}
    >
      {/* Header Section with Logos */}
      <div className="flex justify-between items-start mb-6">
        {/* Left Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src="/"
            alt="Government Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 text-center px-4">
          <div className="mb-2">
            <span className="font-bold text-base">
              ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾಯಾರಲಯ, {gramPanchayat}, ತಾ । {taluka}
            </span>
          </div>
          <div className="mb-4">
            <span>
              ಸಂ: ಗ್ರಾ.ಪಂ/ಮನರೇಗಾ/ಕಾ.ಆ.ಪ/2021-2022/25 &nbsp;&nbsp;&nbsp; ದಿನಾಂಕ :{" "}
              {date}
            </span>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-lg">ಕಾಮಗಾರಿ ಆದೇಶ ಪತ್ರ</h2>
          </div>
        </div>

        {/* Right Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src="/"
            alt="MGNREGA Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4 mb-8">
        {/* To Section */}
        <div>
          <span className="font-bold">ವಿಷಯ:</span> ಮಹಾತ್ಮಾ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ
          ಗ್ರಾಮೀಣ ಉದ್ಯೋಗಾರಿ ಪಾತಣಿ ಯೋಜನೆಯಲ್ಲಿ ಕಾಮಗಾರಿಯನ್ನು
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ಪ್ರಾರಂಭಿಸಲು
          "ಕಾಮಗಾರಿ ಆದೇಶ ಪತ್ರ" ನೀಡಿದ ಕುರಿತು.
        </div>

        <div>
          <span className="font-bold">ಉಲ್ಲೇಖ:</span> ಮಹಾತ್ಮಾಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆಯ
          ಮಾರ್ಗಸೂಚಿ ಪ್ರಕಾರ
        </div>

        <div className="text-center my-6">
          <span className="text-lg">* * * * * *</span>
        </div>

        {/* Main Paragraph */}
        <div className="text-justify leading-relaxed mb-6">
          ಮೇಲ್ಕಾಣಿಸಿದ ವಿಷಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ. 2021-2022 ನೇ ಸಾಲಿನ ಮಹಾತ್ಮಾಗಾಂಧಿ
          ನರೇಗಾ ಯೋಜನೆಯಡಿಯಲ್ಲಿ ಉದ್ಯೋಗ ಬಯಸಿ ಕೂಲಿಕಾರರು ಈ ಕಾರ್ಯಾಲಯಕ್ಕೆ ಅರ್ಜಿ
          ಸಲ್ಲಿಸಿದ್ದು, ಸದರಿ ಅರ್ಜಿ ಪ್ರಕಾರ ಕೂಲಿಕಾರರಿಗೆ 15 ದಿವಸದೊಳಗಾಗಿ ಕೆಲಸವನ್ನು
          ಒದಗಿಸಬೇಕಾಗಿರುವುದರಿಂದ ಅನುಮೋದಿತ ಕ್ರೀಯಾ ಯೋಜನೆಯಲ್ಲಿ ಅಳವಡಿಸಿದ ಈ ಕೆಳಕಂಡ
          ಕಾಮಗಾರಿಯನ್ನು ಈ ಕೆಳಗಿನ ಷರತ್ತಿಗೊಳಪಟ್ಟು ಕಾಮಗಾರಿಗಳನ್ನು ಪ್ರಾರಂಭಿಸಲು
          "ಕಾಮಗಾರಿ ಆದೇಶ ಪತ್ರ ನೀಡಲಾಗಿದೆ. ಕಾರಣ ನಿಗದಿತ ಅವಧಿಯಲ್ಲಿ ಕಾಮಗಾರಿಯನ್ನು
          ಪ್ರಾರಂಭಿಸುವುದು.
        </div>

        {/* Table */}
        <div className="border border-black mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black p-3 bg-gray-100 font-bold text-center w-16">
                  ಅ ಸಂ
                </th>
                <th className="border border-black p-3 bg-gray-100 font-bold text-center w-24">
                  ಗ್ರಾಮ
                </th>
                <th className="border border-black p-3 bg-gray-100 font-bold text-center">
                  ಕಾಮಗಾರಿ ಸಂಖ್ಯೆ
                </th>
                <th className="border border-black p-3 bg-gray-100 font-bold text-center">
                  ಕಾಮಗಾರಿ ಹೆಸರು
                </th>
                <th className="border border-black p-3 bg-gray-100 font-bold text-center w-32">
                  ಅಂದಾಜು ಮೊತ್ತ
                  <br />
                  (ರೂ. ಗಳಲ್ಲಿ)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-3 text-center"></td>
                <td className="border border-black p-3 text-center font-medium">
                  {grama}
                </td>
                <td className="border border-black p-3 text-center">
                  {workCode}
                </td>
                <td className="border border-black p-3 text-center">
                  {workName}
                </td>
                <td className="border border-black p-3 text-center font-medium">
                  {estimatedAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conditions List */}
        <div className="mb-8">
          <div className="font-bold mb-3">ಪರಿಸ್ಥಿತಿಗಳು :</div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              1. ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆಗೆ ಸಂಬಂಧಿಸಿದ ಸಕಲ ಕಾರ್ಯಗಳಲ್ಲೇ
              ನುಪುಣತೆಯಲ್ಲಿ ಅಳವಡಿಸಿದ ಯೋಜನೆಗಳ ಒಳಗಡೆ ಕಾಮಗಾರಿ ಪ್ರಾರಂಭಿಸಬೇಕು.
            </div>
            <div>
              2. ಕಾಮಗಾರಿ ಪ್ರಾರಂಭಿಸುವುದಕ್ಕಿಂತ ಮುಂಚಿತವಾಗಿ ಕಾಮಗಾರಿ ಸ್ಥಳದಲ್ಲಿ
              ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಫಲಕ (ಅಖ:) ಕಡ್ಡಾಯವಾಗಿ ಅಳವಡಿಸುವುದು. ಹಾಗೂ ಜಿಯೋ ಟ್ಯಾಗ
              ಮಾಡಿದ ಫೋಟೋ ಕಡತಕ್ಕೆ ಲಗತ್ತಿಸುವುದು.
            </div>
            <div>
              3. ಅಂದಾಜು ಪತ್ರಿಕೆಯ ಪ್ರಕಾರ ಕಾಮಗಾರಿಗೆ ಬೇಕಾಗುವ ಸಾಮಗ್ರಿಗಳ ಪಟ್ಟಿ ಅವುಗಳ
              ಪ್ರಮಾಣದ (Qty) ಮಾಹಿತಿ ನೀಡುವುದು.
            </div>
            <div>
              4. ಕಾಮಗಾರಿಯ ಮೂರು ಹಂತದ ಭಾವ ಚಿತ್ರಗಳನ್ನು ತೆಗೆದು ಕಾಮಗಾರಿ ಕಡತಕ್ಕೆ
              ಕಡ್ಡಾಯವಾಗಿ ಲಗತ್ತಿಸುವುದು.
            </div>
            <div>
              5. ಅಂದಾಜು ಪತ್ರಿಕೆಯ ಪ್ರಕಾರ ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿ ಅನುಪಾತ ಪಾಲಿಸುವುದು
              ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮಟ್ಟದಲ್ಲಿ 60:40ರ ಅನುಪಾತ ಮೀರುವಂತಿಲ್ಲ.
            </div>
            <div>
              6. ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನಗೊಳ್ಳುವ ಹಂತದಲ್ಲಿ ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ಸಂಬಂಧಪಟ್ಟ
              ದಾಖಲೆಗಳನ್ನು ಈ ಕಾರ್ಯಾಲಯಕ್ಕೆ ಸಲ್ಲಿಸುವುದು (ಜನರೆಟೆಡ್ ಎಂಐಎಸ್ ದಿನಾಂಕ
              ಮುಕ್ತಾಯವಾದ ಮರುದಿನ ಕೂಲಿಕಾರರ ಹಾಗೂ ನಿಮ್ಮ ಸಹಿ ಮತ್ತು ದಾಖಲಿಸಿದ ಅಳತೆ
              ಪುಸ್ತಕದೊಂದಿಗೆ MIS ಮಾಡಲು ಗ್ರಾಮ ಪಂಚಾಯತಿಗೆ ಹಾಜರಾಗುವುದು)
            </div>
            <div>
              7. ಸಾಮಗ್ರಿ ಮೊತ್ತ ಪಾವತಿಸುವುದರಲ್ಲಿ ನಿಯಮಾನುಸಾರ ಸರಕಾರಕ್ಕೆ
              ಸಂದಾಯವಾಗಬೇಕಾದ ಆದಾಯ ತರಿಗೆ, ರಾಜಧನ ಮತ್ತು ಜಿ.ಎಸ್.ಟಿ.ಗಳನ್ನು ಕಡ್ಡಾಯವಾಗಿ
              ಬಿಲ್ಲಿನಲ್ಲಿ ಕಡಿತ ಮಾಡುವುದು.
            </div>
            <div>
              8. ಯೋಜನೆಯ ಮಾರ್ಗಸೂಚಿಯಲ್ಲಿ ಅನುಮತಿಸಿದ ಯಂತ್ರಗಳನ್ನು ಹೊರತುಪಡಿಸಿ ಬೇರೆ
              ಯಂತ್ರಗಳನ್ನು ಬಳಸುವಂತಿಲ್ಲ. ಮತ್ತು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಗುತ್ತಿಗೆದಾರರಿಗೆ
              ಅವಕಾಶವಿರುವುದಿಲ್ಲ.
            </div>
            <div>
              9. ಕಾಮಗಾರಿ ಮುಕ್ತಾಯಗೊಂಡ ನಂತರ "ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು
              ಕಡತಕ್ಕೆ ಲಗತ್ತಿಸುವುದು.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-12">
        <div className="text-left">
          <div>
            <div>ಗೆ,</div>
            <div>ಕಾರ್ಯಕ್ರತ ಸಕಾಯತರು/ಬಿ.ಎಸ್.ಟಿ</div>
            <div>ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="mb-16">
            <div>ಪಂಚಾಯತಿ ಅಧ್ಯಕ್ಷರ ಅಭಿಪ್ರಾಯಗಳು / ಅಧ್ಯಕ್ಷರು</div>
            <div className="font-bold">ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat}</div>
          </div>
          <div>
            <div className="font-bold">ಪ್ರತಿ ಮಾಹಿತಿಗಾಗಿ:</div>
            <div>
              ಮಾನ್ಯ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಗಳು ತಾಲೂಕ ಪಂಚಾಯತಿ, {taluka} ರವರಿಗೆ
              ಗೌರವಗಳೊಂದಿಗೆ ಮಾಹಿತಿಗಾಗಿ ಸಲ್ಲಿಸಿದೆ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderPDF;
