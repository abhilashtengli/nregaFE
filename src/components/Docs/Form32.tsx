
type Form32Props = {
  vendorName?: string;
  district?: string;
  taluka?: string;
  materialData?: {
    material: string;
    quantity: string;
    amount: string;
  }[];
};
type Form32Data = {
  form32Data: Form32Props;
};
// PENDING
const Form32PDF = ({ form32Data }: Form32Data) => {
  const { vendorName, district, taluka, materialData = [] } = form32Data;
  const totalAmount = materialData.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount || "0"),
    0
  );

  return (
    <div
      className="w-full max-w-full mx-auto bg-white border-2 border-black mb-8"
      style={{
        height: "210mm", // A4 height in landscape
        width: "297mm", // A4 width in landscape
        fontFamily: "Arial, sans-serif",
        fontSize: "8px",
        lineHeight: "1.1",
        padding: "6mm",
        boxSizing: "border-box"
      }}
    >
      {/* Header */}
      <div className="text-center mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs">No</span>
          <span className="text-lg font-bold">FORM P. W. G 32</span>
          <span className="text-xs">Date.............</span>
        </div>
        <div className="text-sm font-bold mb-2">
          Office of Executive Engineer, ..............Division {district}
        </div>
        <div className="text-xs mb-1">Name of Work :</div>
        <div className="text-xs mb-2">See Paragraph (212)</div>
        <div className="text-xs mb-2">
          Assistant Executive Engineer PRE Sub- Division, {taluka}
        </div>
        <div className="text-xs mb-2">First & Final</div>
        <div className="flex justify-between text-xs mb-2">
          <div className="border space-x-12">
            <span>Amount of Estimate : </span>
            <span>D.R.No..........</span>
            <span>Date...........</span>
          </div>

          <span>Name of the Contractor : {vendorName}</span>
        </div>
      </div>

      {/* Description */}
      <div className="text-xs mb-3 text-justify">
        From Contractors and Suppliers to be used to be where single Payment is
        made for a job or contract i.e, on Completion. A single Form may be used
        for making Payment to several contractors if they making relate to the
        same work or head of Account in case of suppliers and are billed for at
        the same time ( Name of work ) in the case of bills for work done.
      </div>

      {/* Main Table */}
      <div className="w-full overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-black text-xs min-w-max">
          <thead>
            <tr>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "80px" }}
              >
                <div className="text-[7px]">
                  Name Of The Contractor Of Supplier and Reference to Agreement
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "120px" }}
              >
                <div className="text-[7px]">
                  Items of work of the suppliers grouped under Sub-Head and Sub
                  Work Estimate
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "60px" }}
              >
                <div className="text-[7px]">
                  Reference Recorded Measurement and Date Bk. Pg. Dt. No.
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "30px" }}
              >
                <div className="text-[7px]">Date</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "25px" }}
              >
                <div className="text-[7px]">Unit</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "30px" }}
              >
                <div className="text-[7px]">Qty</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "35px" }}
              >
                <div className="text-[7px]">Rates</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "40px" }}
              >
                <div className="text-[7px]">Amount</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "50px" }}
              >
                <div className="text-[7px]">
                  Total Amount Payable to Contractor Supplier in fig words.
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "50px" }}
              >
                <div className="text-[7px]">
                  Payment Sign in Token of I Acceptance of Bill & II,
                  Acknowledgement of Payment
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "40px" }}
              >
                <div className="text-[7px]">Dated sign Witness</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "35px" }}
              >
                <div className="text-[7px]">Date of Certificate</div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "40px" }}
              >
                <div className="text-[7px]">
                  Mode or payment Cash / Cheque No. Date
                </div>
              </th>
              <th
                className="border border-black px-1 py-1 text-center font-semibold"
                style={{ width: "40px" }}
              >
                <div className="text-[7px]">
                  Paid By Form My Temporary Advance
                </div>
              </th>
            </tr>
            <tr>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                1
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                2
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                3
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                4
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                5
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                6
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                7
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                8
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                9
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                10
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                11
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                12
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                13
              </th>
              <th className="border border-black px-1 py-1 text-center text-[7px]">
                14
              </th>
            </tr>
          </thead>
          <tbody>
            {materialData.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px] break-all">
                  {item.material}
                </td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-center text-[7px]">
                  {item.quantity}
                </td>
                <td className="border border-black px-1 py-1 text-center text-[7px]">
                  {item.amount}
                </td>
                <td className="border border-black px-1 py-1 text-center text-[7px]">
                  {item.amount}
                </td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
                <td className="border border-black px-1 py-1 text-[7px]"></td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="font-semibold">
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-center text-[7px]">
                {totalAmount}
              </td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
              <td className="border border-black px-1 py-1 text-[7px]"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Fields */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Written order to commence work</span>
          <span>Actual completion of Work</span>
        </div>
      </div>

      {/* Footer Certifications */}
      <div className="text-xs">
        <div className="mb-2">
          1 Certified that the above Measurement were made by me
          on..............and that the work has been executed satisfactorily
        </div>
        <div className="mb-2">
          2 Recorded in M.B.No........Page. No........to......
        </div>
        <div className="mb-4">3 Date of Check Measurement :</div>
        <div className="text-right">
          <div className="font-semibold">Assistant Executive Engineer</div>
          <div>PRE Sub- Division, {taluka}</div>
        </div>
      </div>
    </div>
  );
};

export default Form32PDF;
