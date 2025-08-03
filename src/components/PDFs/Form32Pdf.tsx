import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Font registration
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf"
});
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Types
type MaterialData = {
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
};

type Form32Props = {
  vendorName?: string;
  district?: string;
  taluka?: string;
  materialData?: MaterialData[];
};

type Form32Data = {
  form32Data: Form32Props;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 6,
    lineHeight: 1.1,
    padding: 18,
    backgroundColor: "white",
    orientation: "landscape"
  },
  container: {
    flexDirection: "column",
    width: "100%"
  },
  headerSection: {
    marginBottom: 8,
    width: "100%"
  },
  headerMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    width: "100%"
  },
  leftColumn: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column"
  },
  centerColumn: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    lineHeight: 0.6
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column"
  },
  rightColumnBox: {
    lineHeight: 0.6
  },
  headerText: {
    fontSize: 10,
    marginBottom: 2
  },
  headerSubText: {
    fontSize: 6,
    marginBottom: 3,
    fontWeight: "bold"
  },
  headerSubTextCenter: {
    fontSize: 10,
    marginBottom: 2
  },
  headerSubTextRight: {
    fontSize: 7,
    marginBottom: 2,
    fontWeight: "bold"
  },
  headerSubTextTwo: {
    fontSize: 6,
    marginTop: 7,
    fontWeight: "bold"
  },
  boldText: {
    fontWeight: "bold"
  },
  estimateRow: {
    marginTop: 8,
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 6,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 1.2,
    paddingHorizontal: 16,
    fontWeight: "bold"
  },
  table: {
    width: "100%",
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    marginBottom: 8
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%"
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    minHeight: 20
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 1,
    fontSize: 6,
    textAlign: "center",
    fontFamily: "Helvetica",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1.3
  },
  tableHeaderCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 1,
    fontSize: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1.3
  },
  // Column widths matching the original layout
  col1: { width: "8%" },
  col2: { width: "14%" },
  col3: { width: "6%" },
  col4: { width: "12%" },
  col5: { width: "7%" },
  col6: { width: "6%" },
  col7: { width: "4%" },
  col8: { width: "5%" },
  col9: { width: "5%" },
  col10: { width: "8%" },
  col11: { width: "8%" },
  col12: { width: "5%" },
  col13: { width: "7%" },
  col14: { width: "5%" },
  numberHeaderRow: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%"
  },
  numberCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 1,
    fontSize: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    justifyContent: "center",
    alignItems: "center"
  },
  footerSection: {
    marginBottom: 8
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6,
    marginBottom: 2
  },
  certificationSection: {
    fontSize: 8,
    paddingHorizontal: 44,
    fontWeight: "bold"
  },
  certificationItem: {
    marginBottom: 4
  },
  signatureSection: {
    textAlign: "right",
    marginTop: 8
  },
  signatureTitle: {
    fontWeight: "bold",
    marginBottom: 2
  },
  preSubTitle: {
    marginTop: 2
  },
  // New styles for multi-page support
  pageBreak: {
    marginTop: 20
  },
  tableContainer: {
    width: "100%"
  }
});

// Component to render table headers
const TableHeaders = () => (
  <>
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell, styles.col1]}>
        Name Of The Contractor Of Supplier and Referance to Agreement{" "}
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col2]}>
        Items of work of the suppliers grouped under Sub-Head and Sub Work
        Estimate
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col3]}>
        Referance Recorded Measurement and Date Bk. Pg. Dt. No
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col4]}>
        Written order to commence work
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col5]}>
        Actual complection of Work
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col6]}>Unit</Text>
      <Text style={[styles.tableHeaderCell, styles.col7]}>Qty</Text>
      <Text style={[styles.tableHeaderCell, styles.col8]}>Rates</Text>
      <Text style={[styles.tableHeaderCell, styles.col9]}>Amount</Text>
      <Text style={[styles.tableHeaderCell, styles.col10]}>
        Total Amount Payable to Contractor Supplier in fig words.
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col11]}>
        Payment Sign in Taken of I Acceptance of Bill & II, Acknowledgem ent of
        Payment
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col12]}>
        Dated sign Witness
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col13]}>
        Date of Certificate Mode or payment Cash / Cheque No. Date
      </Text>
      <Text style={[styles.tableHeaderCell, styles.col14]}>
        Paid By Form My Temporary Advance
      </Text>
    </View>
    <View style={styles.numberHeaderRow}>
      <Text style={[styles.numberCell, styles.col1]}>1</Text>
      <Text style={[styles.numberCell, styles.col2]}>2</Text>
      <Text style={[styles.numberCell, styles.col3]}>3</Text>
      <Text style={[styles.numberCell, styles.col4]}>4</Text>
      <Text style={[styles.numberCell, styles.col5]}>5</Text>
      <Text style={[styles.numberCell, styles.col6]}>6</Text>
      <Text style={[styles.numberCell, styles.col7]}>7</Text>
      <Text style={[styles.numberCell, styles.col8]}>8</Text>
      <Text style={[styles.numberCell, styles.col9]}>9</Text>
      <Text style={[styles.numberCell, styles.col10]}>10</Text>
      <Text style={[styles.numberCell, styles.col11]}>11</Text>
      <Text style={[styles.numberCell, styles.col12]}>12</Text>
      <Text style={[styles.numberCell, styles.col13]}>13</Text>
      <Text style={[styles.numberCell, styles.col14]}>14</Text>
    </View>
  </>
);

// Component to render document header
const DocumentHeader = ({
  vendorName,
  district,
  taluka
}: {
  vendorName?: string;
  district?: string;
  taluka?: string;
}) => (
  <View style={styles.headerSection}>
    <View style={styles.headerMainRow}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <Text style={styles.headerSubText}>No Date.............</Text>
        <Text style={styles.headerSubTextTwo}>Name of Work :</Text>
        <Text style={styles.headerSubText}>
          Name of the Contractor : {vendorName}
        </Text>
      </View>

      {/* Center Column */}
      <View style={styles.centerColumn}>
        <Text style={[styles.headerText, styles.boldText]}>
          FORM P. W. G 32
        </Text>
        <Text style={[styles.headerSubTextCenter, styles.boldText]}>
          See Paragraph (212)
        </Text>
        <Text style={[styles.headerSubTextCenter, styles.boldText]}>
          First & Final
        </Text>
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        <View style={styles.rightColumnBox}>
          <Text style={styles.headerSubTextRight}>
            Office of Executive Engineer, {"  "} ..............Division{" "}
            {district}
          </Text>
          <Text style={styles.headerSubTextRight}>
            Assistant Executive Engineer PRE Sub- Division, {taluka}
          </Text>
          <Text style={styles.headerSubTextRight}>
            Amount of Estimate : {"             "} D.R.No.........
            Date...........
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const Form32PDF: React.FC<Form32Data> = ({ form32Data }) => {
  const { vendorName, district, taluka, materialData = [] } = form32Data;

  const totalAmount = materialData.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount || "0"),
    0
  );

  // Calculate rows per page (estimate based on page height)
  const ESTIMATED_ROWS_PER_PAGE = 20; // Adjust based on testing

  // Function to chunk data for pages
  const chunkData = (data: MaterialData[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const dataChunks = chunkData(materialData, ESTIMATED_ROWS_PER_PAGE);
  const totalPages = dataChunks.length;

  return (
    <>
      {dataChunks.map((chunk, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          style={styles.page}
          orientation="landscape"
        >
          <View style={styles.container}>
            {/* Document Header - only on first page */}
            {pageIndex === 0 && (
              <>
                <DocumentHeader
                  vendorName={vendorName}
                  district={district}
                  taluka={taluka}
                />

                {/* Description */}
                <Text style={styles.descriptionText}>
                  From Contractors and Suppliers to be used to be where single
                  Payment is made for a job or contract i.e, on Completion. A
                  single Form may be used for making Payment to several
                  contractors if they making relate to the same work or head of
                  Account in case of suppliers and are billed for at the same
                  time ( Name of work ) in the case of bills for work done.
                </Text>
              </>
            )}

            {/* Simplified header for continuation pages */}
            {pageIndex > 0 && (
              <View style={styles.headerSection}>
                <Text
                  style={[
                    styles.headerText,
                    styles.boldText,
                    { textAlign: "center" }
                  ]}
                >
                  FORM P. W. G 32 (Continued) - Page {pageIndex + 1} of{" "}
                  {totalPages}
                </Text>
                <Text style={[styles.headerSubText, { textAlign: "center" }]}>
                  Contractor: {vendorName}
                </Text>
              </View>
            )}

            {/* Table with Headers */}
            <View style={styles.table}>
              <TableHeaders />

              {/* Table Data Rows for current page */}
              {chunk.map((item, index) => (
                <View
                  key={`${pageIndex}-${index}`}
                  style={styles.tableRow}
                  wrap={false}
                >
                  <Text style={[styles.tableCell, styles.col1]}></Text>
                  <Text style={[styles.tableCell, styles.col2]}>
                    {item.material}
                  </Text>
                  <Text style={[styles.tableCell, styles.col3]}></Text>
                  <Text style={[styles.tableCell, styles.col4]}></Text>
                  <Text style={[styles.tableCell, styles.col5]}></Text>
                  <Text style={[styles.tableCell, styles.col6]}></Text>
                  <Text style={[styles.tableCell, styles.col7]}>
                    {item.quantity}
                  </Text>
                  <Text style={[styles.tableCell, styles.col8]}>
                    {(
                      Number.parseFloat(item.amount) /
                      Number.parseFloat(item.quantity)
                    ).toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCell, styles.col9]}>
                    {item.amount}
                  </Text>
                  <Text style={[styles.tableCell, styles.col10]}></Text>
                  <Text style={[styles.tableCell, styles.col11]}></Text>
                  <Text style={[styles.tableCell, styles.col12]}></Text>
                  <Text style={[styles.tableCell, styles.col13]}></Text>
                  <Text style={[styles.tableCell, styles.col14]}></Text>
                </View>
              ))}

              {/* Total Row - only on last page */}
              {pageIndex === dataChunks.length - 1 && (
                <View style={styles.tableRow} wrap={false}>
                  <Text style={[styles.tableCell, styles.col1]}></Text>
                  <Text style={[styles.tableCell, styles.col2]}></Text>
                  <Text style={[styles.tableCell, styles.col3]}></Text>
                  <Text style={[styles.tableCell, styles.col4]}></Text>
                  <Text style={[styles.tableCell, styles.col5]}></Text>
                  <Text style={[styles.tableCell, styles.col6]}></Text>
                  <Text style={[styles.tableCell, styles.col7]}></Text>
                  <Text style={[styles.tableCell, styles.col8]}></Text>
                  <Text
                    style={[
                      styles.tableCell,
                      styles.col9,
                      { fontWeight: "bold" }
                    ]}
                  >
                    {totalAmount.toFixed(2)}
                  </Text>
                  <Text style={[styles.tableCell, styles.col10]}></Text>
                  <Text style={[styles.tableCell, styles.col11]}></Text>
                  <Text style={[styles.tableCell, styles.col12]}></Text>
                  <Text style={[styles.tableCell, styles.col13]}></Text>
                  <Text style={[styles.tableCell, styles.col14]}></Text>
                </View>
              )}
            </View>

            {/* Footer Certifications - only on last page */}
            {pageIndex === dataChunks.length - 1 && (
              <View style={styles.certificationSection}>
                <Text style={styles.certificationItem}>
                  1 Certified that the above Measurement were made by me
                  on..............and that the work has been executed
                  satisfactorily
                </Text>
                <Text style={styles.certificationItem}>
                  2 Recorded in M.B.No...............Page. No........to......
                </Text>
                <Text style={styles.certificationItem}>
                  3 Date of Check Measurement :
                </Text>

                <View style={styles.signatureSection}>
                  <Text style={styles.signatureTitle}>
                    Assistant Executive Engineer
                  </Text>
                  <Text>PRE Sub- Division, {taluka}</Text>
                </View>
              </View>
            )}
          </View>
        </Page>
      ))}
    </>
  );
};

export default Form32PDF;
export type { Form32Data, Form32Props, MaterialData };
