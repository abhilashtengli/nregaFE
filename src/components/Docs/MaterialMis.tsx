//COMPLETED
interface Material {
  material: string; // from vendor link
  unitPrice: string; // from vendor link
  quantity: string; // from vendor link
  amount: string; // from vendor link
  billNo: string; // from vendor link
  billAmount: string; // from vendor link
  billDate: string; // from vendor link
  dateOfPayment: string; // from vendor link
}

interface MisDataProps {
  workName: string; //1
  financialYear: string; // from vendor link
  workCode: string; //1
  vendorName: string; //13
  materials: Material[]; // from vendor link
}

interface MaterialMisProps {
  data: MisDataProps;
}

const MaterialMIS = ({ data }: MaterialMisProps) => {
  if (!data) {
    return <div>No data provided.</div>;
  }
  const {
    workName, //1
    financialYear, // from vendor link
    workCode, //1
    vendorName, //13
    materials // from vendor link
  } = data;

  const totalAmount = materials.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount || "0"),
    0
  );

  // Split materials into pages
  const pages = [];
  const itemsPerPage = 15;
  for (let i = 0; i < data.materials.length; i += itemsPerPage) {
    pages.push(data.materials.slice(i, i + itemsPerPage));
  }

  return (
    <div className="w-full">
      {pages.map((pageMaterials, pageIndex) => (
        <div
          key={pageIndex}
          className="w-full max-w-[794px] mx-auto bg-white print:p-4 print:text-[10px]"
          style={{
            pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
            marginBottom: pageIndex < pages.length - 1 ? "50px" : "0"
          }}
        >
          {/* Work Code Header */}
          <div className="w-full border-2 border-black">
            <div className="py-1 px-0.5 bg-purple-200 border-b border-black">
              <span className="font-bold text-[10px]">
                Work Code: {workName} ({financialYear}){workCode}
              </span>
            </div>

            {/* Material Sections for current page */}
            {pageMaterials.map((material, index) => (
              <div key={index}>
                {/* Bill Information Row */}
                <div className="grid grid-cols-4 text-[10px] bg-[#f0e3ee] border-b border-black">
                  <div className="py-1 px-0.5 border-r font-bold border-black">
                    <span className="font-bold">Bill No.:</span>
                    {material.billNo}
                  </div>
                  <div className="py-1 px-0.5 border-r font-bold border-black">
                    <span className="font-bold">Bill Amount:</span>
                    {material.billAmount}
                  </div>
                  <div className="py-1 px-0.5 border-r font-bold border-black">
                    <span className="font-bold">Bill Date:</span>
                    {material.billDate}
                  </div>
                  <div className="py-1 px-0.5 font-bold">
                    <span className="font-bold">Date of Payment:</span>
                    {material.dateOfPayment}
                  </div>
                </div>

                {/* Vendor Information Row */}
                <div className="grid grid-cols-2 border-b border-black bg-[#f0e3ee] text-[10px]">
                  <div className="py-1 px-0.5 border-r font-bold border-black">
                    <span className="font-bold">Vendor name:</span>
                    {vendorName}
                  </div>
                  <div className="py-1 px-0.5 text-right font-bold">
                    <span className="font-bold">Financial Year:</span>
                    {financialYear}
                  </div>
                </div>

                {/* Material Header Row */}
                <div className="grid grid-cols-4 border-b border-black bg-[#f0e3ee] text-[10px]">
                  <div className="py-1 px-0.5 border-r border-black font-bold text-blue-600">
                    Material
                  </div>
                  <div className="py-1 px-0.5 border-r border-black font-bold text-blue-600 text-center">
                    Unit Price (In Rupees)
                  </div>
                  <div className="py-1 px-0.5 border-r border-black font-bold text-blue-600 text-center">
                    Quantity
                  </div>
                  <div className="py-1 px-0.5 font-bold text-blue-600 text-center">
                    Amount (In Rupees)
                  </div>
                </div>

                {/* Material Data Row */}
                <div className="grid grid-cols-4 font-bold border-b border-black bg-[#f0e3ee] text-[10px]">
                  <div className="py-1 px-0.5 border-r border-black">
                    {material.material}
                  </div>
                  <div className="py-1 px-0.5 border-r border-black text-left">
                    {material.unitPrice}
                  </div>
                  <div className="py-1 px-0.5 border-r border-black text-left">
                    {material.quantity}
                  </div>
                  <div className="py-1 px-0.5 text-left">{material.amount}</div>
                </div>
              </div>
            ))}

            {/* Total Amount Row - only on last page */}
            {pageIndex === pages.length - 1 && (
              <div className="grid grid-cols-4 bg-[#f0e3ee] text-[10px]">
                <div className="p-1 col-span-3 text-center border-r border-black font-bold">
                  Total Amount
                </div>
                <div className="p-1 col-span-1 text-center font-bold">
                  {totalAmount}
                </div>
              </div>
            )}
          </div>

          {/* Page number footer */}
          {pages.length > 1 && (
            <div className="text-center mt-4 text-[8px]">
              Page {pageIndex + 1} of {pages.length}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MaterialMIS;
