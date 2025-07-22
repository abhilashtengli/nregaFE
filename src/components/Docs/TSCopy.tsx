// COMPLETED
type TechnicalSanctionPDFProps = {
  sanctionDate?: string; //3 - from external API
  workCode?: string; //1 - from database
  financialYear?: string; //1 - from database
  workName?: string; //1 - from database
  gramPanchayat?: string; //1 - from database
  blockPanchayat?: string; //1 - from database
  sanctionedAmount?: string; //4 - from external API
  sanctionedAmountInWords?: string; //1 - generated from sanctionedAmount
  technicalSanctionNo?: string; //3 - from external API
  sanctionDateFormatted?: string; //3 - from external API
  unskilledLabourCharges?: string; //3 - from external API
  estimateMaterialCost?: string; //3 - from external API
  estimatePersonDays?: string; //1 - from database
};
type TsData = {
  tsData: TechnicalSanctionPDFProps;
};
const TechnicalSanctionPDF = ({ tsData }: TsData) => {
  const {
    sanctionDate,
    workCode,
    financialYear,
    workName,
    gramPanchayat,
    blockPanchayat,
    sanctionedAmount,
    sanctionedAmountInWords,
    technicalSanctionNo,
    sanctionDateFormatted,
    unskilledLabourCharges,
    estimateMaterialCost,
    estimatePersonDays
  } = tsData;
  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white border-2 border-black"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.3"
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">TECHNICAL SANCTION FOR WORKS</h1>
      </div>

      {/* Date */}
      <div className="mb-4">
        <span className="font-medium">Date : {sanctionDate}</span>
      </div>

      {/* Work Name Section - Centered and Bold */}
      <div className="mb-6 text-center">
        <div className="mb-2">
          <span className="font-bold">
            Work Name : Mahatma Gandhi NREGA Construction of :-{" "}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-bold">
            {workCode} - {financialYear} {workName}
          </span>
        </div>
      </div>

      {/* Panchayat Details */}
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-medium">Gram Panchayat : {gramPanchayat}</span>
        </div>
        <div>
          <span className="font-medium">
            Block Panchayat : {blockPanchayat}
          </span>
        </div>
      </div>

      {/* Main Content Paragraph */}
      <div className="mb-6 text-justify leading-relaxed">
        <span>
          The items and Provisions proposed in the estimate are realistic and
          basically required for this work, prepared & submitted by the
          preparatory Officer are considered and verified. The items and
          Provisions proposed in the estimate are in accordance with the
          relevant specification and Guidelines in vogue. The tasks generated
          with respect to the items are relevant and suitable.This Estimate is
          technically Sanctioned for Rs
          {sanctionedAmount}/- ({sanctionedAmountInWords}), vide TSR No
          Technical Sanction No. {technicalSanctionNo} date{" "}
          {sanctionDateFormatted},
        </span>
      </div>

      {/* Financial Details */}
      <div className="mb-6 space-y-1">
        <div>
          <span className="font-medium">
            Labour Charges (Unskilled): {unskilledLabourCharges}
          </span>
        </div>
        <div>
          <span className="font-medium">
            Materials : {estimateMaterialCost}
          </span>
        </div>
        <div>
          <span className="font-medium">Lumpsum : 0</span>
        </div>
        <div>
          <span className="font-medium">Admin Lumpsum : 0.00</span>
        </div>
        <div>
          <span className="font-medium">
            Number of man days : {estimatePersonDays}
          </span>
        </div>
      </div>

      {/* Authority Section */}
      <div className="mb-8">
        <div className="mb-2">
          <span className="font-medium">
            Technical sanction given by : (AEE) {blockPanchayat} .
          </span>
        </div>
      </div>

      {/* Signature Section */}
      <div className="text-right">
        <div className="mb-2">
          <span className="font-medium">-sd</span>
        </div>
        <div>
          <span className="font-medium">(AEE) {blockPanchayat}</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSanctionPDF;
