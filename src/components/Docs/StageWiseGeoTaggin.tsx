
type StageWisePhotosData = {
  gramPanchayat?: string;
  taluka?: string;
  district?: string;
  financialYear?: string;
  workName?: string;
  workCode?: string;
  beforeStageImageUrl?: string;
  duringStageImageUrl?: string;
  afterStageImageUrl?: string;
};
type StageWiseGTProp = {
  sWGTData: StageWisePhotosData;
};

const StageWisePhotosPDF = ({ sWGTData }: StageWiseGTProp) => {
  const {
    gramPanchayat = "Default Gram Panchayat",
    taluka,
    district,
    financialYear,
    workName,
    workCode,
    beforeStageImageUrl,
    duringStageImageUrl,
    afterStageImageUrl
  } = sWGTData;
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
      {/* Header with three logos */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-black">
        {/* Left Logo */}
        <div className="w-20 h-20 flex-shrink-0 border">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="Karnataka Government Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Center Logo */}
        <div className=" flex flex-col items-center">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="Center Government Logo"
            className="w-20 h-16 object-contain"
          />
          <div className="text-center ">
            <div className="text-sm font-bold mb-2">
              ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ತಾ|| {taluka} ಜಿ|| {district}
            </div>
            <div className="text-base font-semibold mb-2">
              ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ
            </div>
          </div>
        </div>

        {/* Right Logo */}
        <div className="w-20 h-20 flex-shrink-0 border">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="MGNREGA Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Header Information */}

      {/* Title */}
      <div className="text-center mb-6">
        <div className="text-sm font-bold mb-4">
          ಹಂತವಾರು ಕಾಮಗಾರಿ ಛಾಯಾಚಿತ್ರಗಳು (Stage Wise Work Photos)
        </div>
      </div>

      {/* Work Details */}
      <div className="mb-8">
        <div className="text-sm font-semibold mb-2">
          ಕಾಮಗಾರಿ ಹೆಸರು : {financialYear} {workName}
        </div>
        <div className="text-sm font-semibold mb-4">
          ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ: {workCode}
        </div>
      </div>

      {/* Before Stage */}
      <div className="mb-8">
        <div className="text-lg font-bold mb-4 text-center">Before Stage</div>
        <div className="border-2 border-gray-300 p-4 mb-4">
          {beforeStageImageUrl ? (
            <img
              src={beforeStageImageUrl || "/placeholder.svg"}
              alt="Before Stage"
              className="w-full h-64 object-cover rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">
                Before Stage Image Placeholder
              </span>
            </div>
          )}
        </div>
      </div>

      {/* During Stage */}
      <div className="mb-8">
        <div className="text-lg font-bold mb-4 text-center ">During stage</div>
        <div className="border-2 border-gray-300 p-4 mb-4">
          {duringStageImageUrl ? (
            <img
              src={duringStageImageUrl || "/placeholder.svg"}
              alt="During Stage"
              className="w-full h-64 object-cover rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">
                During Stage Image Placeholder
              </span>
            </div>
          )}
        </div>
      </div>

      {/* After Stage */}
      <div className="mb-8">
        <div className="text-lg font-bold mb-4 text-center">After Stage</div>
        <div className="border-2 border-gray-300 p-4 mb-4">
          {afterStageImageUrl ? (
            <img
              src={afterStageImageUrl || "/placeholder.svg"}
              alt="After Stage"
              className="w-full h-64 object-cover rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-gray-500">
                After Stage Image Placeholder
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageWisePhotosPDF;
