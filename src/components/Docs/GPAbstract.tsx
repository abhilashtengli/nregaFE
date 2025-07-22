
type GPAbstractProps = {
  workName: string;
  workStatus: string;
  workPurposeStatus: string;
  sanctionNoAndDate: string;
  includedInPerspectivePlan: string;
  approvedInAnnualPlan: string;
  estimatedCost: string;
  workStartDate: string;
  expenditureIncurred: {
    unskilled: string;
    semiSkilled: string;
    skilled: string;
    material: string;
    contingency: string;
    total: string;
  };
  employmentGenerated: {
    unskilled: {
      persondays: string;
      totalPersons: string;
    };
    semiSkilled: {
      persondays: string;
      totalPersons: string;
    };
    skilled: {
      persondays: string;
      totalPersons: string;
    };
  };
  musterRollDetails: string;
  beforeWorkPhoto: string | null;
  duringWorkPhoto: string | null;
  afterWorkPhoto: string | null;
};

type GPAbstractData = {
  GpAbstractData: GPAbstractProps;
};
//PENDING Need to scrape data
const GPAbstract = ({ GpAbstractData }: GPAbstractData) => {
  const {
    workName,
    workStatus,
    workPurposeStatus,
    sanctionNoAndDate,
    includedInPerspectivePlan,
    approvedInAnnualPlan,
    estimatedCost,
    workStartDate,
    expenditureIncurred,
    employmentGenerated,
    musterRollDetails,
    beforeWorkPhoto,
    duringWorkPhoto,
  } = GpAbstractData;
  const estimatedCompletionTime = "0.6";
  const natureOfWork = "";
  const startStatus = "";
  const endStatus = "";
  const startLocation = "";
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white text-sm">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-sm font-medium">Govt. of India</div>
        <div className="text-sm font-medium">Ministry of Rural Development</div>
        <div className="text-sm font-medium">
          Department of Rural Development
        </div>
        <div className="bg-red-100 border border-red-500 p-2 mt-2 mb-2">
          <div className="font-bold text-red-800">
            The Mahatma Gandhi National Rural Employment Guarantee Act
          </div>
        </div>
        <div className="text-sm">Wednesday, July 9, 2025</div>
      </div>

      {/* Location Header */}
      <div className="border border-black mb-4">
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              State : KARNATAKA
            </td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              District : KALABURAGI
            </td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Block : JEVARGI
            </td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Panchayat : RANJANGI
            </td>
          </tr>
        </table>
      </div>

      {/* Work Details Table */}
      <div className="border border-black mb-4">
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium w-1/5">
              Work Name
            </td>
            <td className="border border-black p-2" colSpan={4}>
              {workName}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Nature of Work
            </td>
            <td className="border border-black p-2" colSpan={4}>
              {natureOfWork}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Work Status
            </td>
            <td className="border border-black p-2" colSpan={4}>
              {workStatus}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Work Purpose status
            </td>
            <td className="border border-black p-2" colSpan={4}>
              {workPurposeStatus}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Scope of Work
            </td>
            <td className="border border-black p-2 bg-gray-200 font-medium text-center w-1/6">
              Start Status
            </td>
            <td className="border border-black p-2 w-1/4">{startStatus}</td>
            <td className="border border-black p-2 bg-gray-200 font-medium text-center w-1/6">
              End Status
            </td>
            <td className="border border-black p-2 w-1/4">{endStatus}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Location
            </td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Start Location
            </td>
            <td className="border border-black p-2" colSpan={3}>
              {startLocation}
            </td>
          </tr>
        </table>
      </div>

      {/* Sanction and Planning Details */}
      <div className="border border-black mb-4">
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Sanction No. and Sanction Date :
            </td>
            <td className="border border-black p-2">{sanctionNoAndDate}</td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Whether Included in Five Year Perspective Plan :
            </td>
            <td className="border border-black p-2">
              {includedInPerspectivePlan}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Whether Work Approved in Annual Plan :
            </td>
            <td className="border border-black p-2">{approvedInAnnualPlan}</td>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Estimated Cost (In Lakhs) :
            </td>
            <td className="border border-black p-2">{estimatedCost}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Estimated Completion Time (in Months)
            </td>
            <td className="border border-black p-2">
              {estimatedCompletionTime}
            </td>
            <td className="border border-black p-2" colSpan={2}></td>
          </tr>
        </table>
      </div>

      {/* Expenditure Incurred */}
      <div className="border border-black mb-4">
        <div className="bg-gray-200 p-2 border-b border-black font-medium">
          Expenditure Incurred (in Rs.)
        </div>
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Unskilled
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Semi-Skilled
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Skilled
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Material
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Contingency
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Total
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.unskilled}
            </td>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.semiSkilled}
            </td>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.skilled}
            </td>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.material}
            </td>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.contingency}
            </td>
            <td className="border border-black p-2 text-center">
              {expenditureIncurred.total}
            </td>
          </tr>
        </table>
      </div>

      {/* Employment Generated */}
      <div className="border border-black mb-4">
        <div className="bg-gray-200 p-2 border-b border-black font-medium">
          Employment Generated
        </div>
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium"></td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Persondays
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center">
              Total No. of Persons Given Work
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium">
              Unskilled
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.unskilled.persondays}
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.unskilled.totalPersons}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium">
              Semi-Skilled
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.semiSkilled.persondays}
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.semiSkilled.totalPersons}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium">
              Skilled
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.skilled.persondays}
            </td>
            <td className="border border-black p-2 text-center">
              {employmentGenerated.skilled.totalPersons}
            </td>
          </tr>
        </table>
      </div>

      {/* Additional Details */}
      <div className="border border-black mb-4">
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Distinct Number of Muster Rolls used(Amount)
            </td>
            <td className="border border-black p-2">{musterRollDetails}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-gray-200 font-medium">
              Work start date
            </td>
            <td className="border border-black p-2">{workStartDate}</td>
          </tr>
        </table>
      </div>

      {/* Photo Upload Section */}
      <div className="border border-black">
        <div className="bg-gray-200 p-2 border-b border-black font-medium">
          Photo Uploaded of Work
        </div>
        <table className="w-full border-collapse">
          <tr>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center w-1/2">
              Before Start of Work(Work Site)
            </td>
            <td className="border border-black p-2 bg-gray-100 font-medium text-center w-1/2">
              During Execution of Works
            </td>
          </tr>
          <tr>
            <td className="border border-black p-4 text-center h-48">
              {beforeWorkPhoto ? (
                <img
                  src={beforeWorkPhoto}
                  alt="Before Work"
                  className="max-w-full max-h-full mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 bg-gray-300 mb-2"></div>
                  <div className="text-gray-600">Photo Not Available</div>
                </div>
              )}
            </td>
            <td className="border border-black p-4 text-center h-48">
              {duringWorkPhoto ? (
                <img
                  src={duringWorkPhoto}
                  alt="During Work"
                  className="max-w-full max-h-full mx-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 bg-gray-300 mb-2"></div>
                  <div className="text-gray-600">Photo Not Available</div>
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default GPAbstract;
