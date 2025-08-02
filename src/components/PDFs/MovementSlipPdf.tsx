import {
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import mnreaga from "@/assets/MGNREGA logo.jpg";
import state_logo from "@/assets/State logo.jpeg";
import emblem from "@/assets/State embalm.jpeg";

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
type MustrollData = {
  mustrollNo: string;
  data: {
    fromDate: string;
    toDate: string;
    attendanceUpdateMIS: string;
    workMeasure: string;
    misEntryMeasurement: string;
    ftoDate1: string;
    ftoDate2: string;
  };
};

type ResponseMovementSlipType = {
  workCode: string;
  workName: string;
  gramPanchayat: string;
  taluka: string;
  district: string;
  mustrollData: MustrollData[];
};

type MovementSlipData = {
  movementSlipData: ResponseMovementSlipType;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.2,
    padding: 42,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid black",
    paddingBottom: 8,
    marginBottom: 16
  },
  logoContainer: { width: 70, height: 70 },
  mnregalogoContainer: { width: 80, height: 70 },
  logo: { width: "100%", height: "100%" },
  centerHeader: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 12
  },
  centerEmblem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },
  karnatakaSarkar: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  emblemContainer: {
    width: 32,
    height: 32,
    marginHorizontal: 6
  },
  headerSubText: {
    fontSize: 9,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 2
  },
  headerSubTitle: {
    fontSize: 11,
    fontFamily: "Helvetica"
  },
  workDetailsSection: {
    marginBottom: 8
  },
  workDetailRow: {
    marginBottom: 8
  },
  workDetailLabel: {
    fontSize: 10,
    fontWeight: "normal",
    fontFamily: "NotoSansKannada"
  },
  workDetailValue: {
    fontSize: 10,

    fontFamily: "NotoSansKannada"
  },
  workCodeworkDetailValue: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  workDetailGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  gridColumn: {
    flex: 1,
    paddingRight: 10
  },
  gridItem: {
    marginBottom: 6
  },
  table: {
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    marginBottom: 8
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white",
    fontWeight: "normal"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 28
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    paddingTop: 5,
    fontSize: 6,
    textAlign: "center",
    fontFamily: "NotoSansKannada"
  },
  tableHeaderCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    fontSize: 6,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    lineHeight: 1.1
  },
  slNoCell: { width: "11.11%" },
  mustrollNoCell: { width: "11.11%" },
  fromDateCell: { width: "11.11%" },
  toDateCell: { width: "11.11%" },
  attendanceCell: { width: "11.11%" },
  workMeasureCell: { width: "11.11%" },
  misEntryCell: { width: "11.11%" },
  ftoDate1Cell: { width: "11.11%" },
  ftoDate2Cell: { width: "11.11%" },
  signatureSection: {
    marginTop: 8
  },
  signatureRow: {
    marginBottom: 8
  },
  signatureLabel: {
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 4
  },
  signatureLine: {
    borderBottom: "1px solid black",
    width: 200,
    height: 12
  },
  signatureRowInTable: {
    flexDirection: "row",
    minHeight: 20
  },
  signatureCellFull: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 4,
    fontSize: 8,
    fontFamily: "NotoSansKannada",
    width: "100%"
  },
  dateSection: {
    textAlign: "center",
    marginBottom: 8
  },
  dateText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  }
});

const MovementSlipPDF: React.FC<MovementSlipData> = ({ movementSlipData }) => {
  const { workCode, workName, gramPanchayat, taluka, district, mustrollData } =
    movementSlipData;

  const date = ""; // blank as per original

  // Ensure we have at least 15 rows for the table
  const tableRows = [...mustrollData];
  while (tableRows.length < 15) {
    tableRows.push({
      mustrollNo: "",
      data: {
        fromDate: "",
        toDate: "",
        attendanceUpdateMIS: "",
        workMeasure: "",
        misEntryMeasurement: "",
        ftoDate1: "",
        ftoDate2: ""
      }
    });
  }

  return (
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.mnregalogoContainer}>
              <Image style={styles.logo} src={mnreaga} />
            </View>
            <View style={styles.centerHeader}>
              <View style={styles.centerEmblem}>
                <Text style={styles.karnatakaSarkar}>ಕರ್ನಾಟಕ</Text>
                <View style={styles.emblemContainer}>
                  <Image style={styles.logo} src={emblem} />
                </View>
                <Text style={styles.karnatakaSarkar}>ಸರ್ಕಾರ</Text>
              </View>
              <Text style={styles.headerSubText}>
                ಅನುಬಂಧ - VI Annexture - VI
              </Text>
              <Text style={styles.headerTitle}>ಹಾಜರಾತಿ ಚಲನವಲನ ಚೀಟಿ </Text>
              <Text style={styles.headerSubTitle}>
                MUSTER ROLL MOVEMENT FORM
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={state_logo} />
            </View>
          </View>

          {/* Work Details */}
          <View style={styles.workDetailsSection}>
            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಕಾಮಗಾರಿ ಸಂಕೇತ:{" "}
                <Text style={styles.workCodeworkDetailValue}>{workCode}</Text>
              </Text>
            </View>
            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಕಾಮಗಾರಿ ಹೆಸರು:{" "}
                <Text style={styles.workDetailValue}>{workName}</Text>
              </Text>
            </View>

            <View style={styles.workDetailGrid}>
              <View style={styles.gridColumn}>
                <View style={styles.gridItem}>
                  <Text style={styles.workDetailLabel}>
                    ಗ್ರಾಮ:{" "}
                    <Text style={styles.workDetailValue}>{gramPanchayat}</Text>
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.workDetailLabel}>
                    ತಾಲೂಕು: <Text style={styles.workDetailValue}>{taluka}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.gridColumn}>
                <View style={styles.gridItem}>
                  <Text style={styles.workDetailLabel}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ:{" "}
                    <Text style={styles.workDetailValue}>{gramPanchayat}</Text>
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.workDetailLabel}>
                    ಜಿಲ್ಲೆ:{" "}
                    <Text style={styles.workDetailValue}>{district}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.gridColumn}>
                <View style={styles.gridItem}>
                  <Text style={styles.workDetailLabel}>
                    ದಿನಾಂಕ: <Text style={styles.workDetailValue}>{date}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Main Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.slNoCell]}>
                ಕ್ರ ಸಂ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.mustrollNoCell]}>
                ಇ-ಹಾಜರಾತಿ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.fromDateCell]}>
                ಇ-ಎನ್‌ಎಮ್‌ಆರ್ ವಿತರಣೆ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.toDateCell]}>
                ಇ-ಎನ್‌ಎಮ್‌ಆರ್ ಮುಕ್ತಾಯ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.attendanceCell]}>
                ಎಮ್‌ಐಎಸ್‌ನಲ್ಲಿ ಹಾಜರಾತಿ ಇಂದೀಕರಿಸುವಿಕೆ{" "}
              </Text>
              <Text style={[styles.tableHeaderCell, styles.workMeasureCell]}>
                ಕೆಲಸದ ಅಳತೆ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.misEntryCell]}>
                ಎಮ್‌ಐಎಸ್‌ನಲ್ಲಿ ದಾಖಲಿಸಿದ ಅಳತೆ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.ftoDate1Cell]}>
                ಎಫ್‌ಟಿಒ 1ನೇ ಸಹಿ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.ftoDate2Cell]}>
                ಎಫ್‌ಟಿಒ 2ನೇ ಸಹಿ
              </Text>
            </View>

            {/* Table Rows */}
            {tableRows.map((item, index) => (
              <View key={index} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tableCell, styles.slNoCell]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, styles.mustrollNoCell]}>
                  {item.mustrollNo}
                </Text>
                <Text style={[styles.tableCell, styles.fromDateCell]}>
                  {item.data.fromDate}
                </Text>
                <Text style={[styles.tableCell, styles.toDateCell]}>
                  {item.data.toDate}
                </Text>
                <Text style={[styles.tableCell, styles.attendanceCell]}>
                  {item.data.attendanceUpdateMIS}
                </Text>
                <Text style={[styles.tableCell, styles.workMeasureCell]}>
                  {item.data.workMeasure}
                </Text>
                <Text style={[styles.tableCell, styles.misEntryCell]}>
                  {item.data.misEntryMeasurement}
                </Text>
                <Text style={[styles.tableCell, styles.ftoDate1Cell]}>
                  {item.data.ftoDate1}
                </Text>
                <Text style={[styles.tableCell, styles.ftoDate2Cell]}>
                  {item.data.ftoDate2}
                </Text>
              </View>
            ))}

            {/* Signature Rows */}
            <View style={styles.signatureRowInTable}>
              <Text style={styles.signatureCellFull}>
                ಅಧಿಕಾರಿ/ಸಿಬ್ಬಂದಿ ಸಹಿ:
              </Text>
            </View>
            <View style={styles.signatureRowInTable}>
              <Text style={styles.signatureCellFull}>
                ಅಧಿಕಾರಿ/ಸಿಬ್ಬಂದಿ ಹೆಸರು:
              </Text>
            </View>
          </View>
        </View>
      </Page>
  );
};

export default MovementSlipPDF;
export type { MovementSlipData, ResponseMovementSlipType, MustrollData };
