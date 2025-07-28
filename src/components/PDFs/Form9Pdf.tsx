import {
  Document,
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
type ApplicantData = {
  slNo: number;
  applicantName: string;
  jobCardNo: string;
  workFrom: string;
  workTo: string;
  childCareRequired: string;
  signature: string;
};

type Form9PropsData = {
  gramPanchayat?: string;
  workCode?: string;
  workName?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

type Form9Data = {
  form9Data: Form9PropsData;
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
  headerText: {
    fontSize: 11,
    fontFamily: "NotoSansKannada",
    marginBottom: 4,
    fontWeight: "bold"
  },
  headerSubText: {
    fontSize: 9,
    marginBottom: 4,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  formNumber: {
    fontSize: 9,
    marginBottom: 4,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  noticeTitle: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 4
  },
  schemeText: {
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  noticeContent: {
    textAlign: "justify",
    fontSize: 10,
    marginBottom: 16,
    fontFamily: "NotoSansKannada",
    letterSpacing: 0.3,
    lineHeight: 1.4
  },
  dateContent: {
    fontWeight: "bold"
  },
  workDetailsTable: {
    marginBottom: 16
  },
  workDetailRow: {
    flexDirection: "row",
    minHeight: 18
  },
  workDetailNumberCell: {
    padding: 4,
    fontSize: 9,
    textAlign: "left",
    fontFamily: "NotoSansKannada",
    width: "8%",
    fontWeight: "normal"
  },
  workDetailLabelCell: {
    padding: 4,
    fontSize: 9,
    fontFamily: "NotoSansKannada",
    width: "35%",
    fontWeight: "normal"
  },
  workDetailValueCell: {
    padding: 4,
    fontSize: 9,
    fontFamily: "NotoSansKannada",
    width: "57%",
    fontWeight: "bold"
  },
  table: {
    borderLeft: "1px solid black",
    marginBottom: 16
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white",
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 24
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 4,
    fontSize: 8,
    textAlign: "center",
    fontFamily: "NotoSansKannada"
  },
  tableHeaderCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
    padding: 6,
    fontSize: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    backgroundColor: "white"
  },
  slNoCell: { width: "12%" },
  nameCell: { width: "48%", textAlign: "left", paddingLeft: 6 },
  jobCardCell: { width: "40%" },
  footerSection: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  footerLeft: {
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  },
  footerCenter: {
    fontSize: 8,
    fontFamily: "NotoSansKannada",
    textAlign: "center"
  },
  footerRight: {
    textAlign: "right",
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  },
  officerTitle: {
    fontWeight: "bold",
    marginBottom: 2
  },
  officerLocation: {
    paddingLeft: 12
  }
});

const Form9PDF: React.FC<Form9Data> = ({ form9Data }: Form9Data) => {
  const {
    gramPanchayat,
    workCode,
    workName,
    taluka,
    district,
    date,
    applicantsData = []
  } = form9Data;

  const workingDays =
    applicantsData.length > 0
      ? `ದಿನಾಂಕ  : ${applicantsData[0].workFrom} ರಂದ ${applicantsData[0].workTo} ವರೆಗೆ`
      : "";
  const workLocation = gramPanchayat || "";

  const workDetails = [
    { id: "1", label: "ಯೋಜನೆಯ ಸಂಖ್ಯೆ", value: workCode || "" },
    { id: "2", label: "ಕಾಮಗಾರಿಯ ಹೆಸರು", value: workName || "" },
    { id: "3", label: "ಕಾಮಗಾರಿಯ ಸ್ಥಳ", value: workLocation },
    { id: "4", label: "ಕಾರ್ಯನಿರ್ವಹಣಾ ಏಜೆನ್ಸಿ", value: "ಗ್ರಾಮ ಪಂಚಾಯತ್" },
    { id: "5", label: "ಅನುಷ್ಠಾನ ಏಜೆನ್ಸಿ", value: "ಗ್ರಾಮ ಪಂಚಾಯತ್" },
    { id: "6", label: "ಕೆಲಸಕ್ಕೆ ನೀಡಿದ ದಿನಗಳು", value: workingDays }
  ];

  return (
    <Document>
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
              <Text style={styles.headerText}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
              </Text>
              <Text style={styles.formNumber}>ನಮೂನೆ-9</Text>
              <Text style={styles.noticeTitle}>
                ಕೆಲಸಕ್ಕೆ ಹಾಜರಾಗಲು ತಿಳಿಸುವ ಸಾರ್ವಜನಿಕ ನೋಟೀಸು{"   "}
              </Text>
              <Text style={styles.schemeText}>
                ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ{"   "}
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={state_logo} />
            </View>
          </View>

          {/* Notice Content */}
          <Text style={styles.noticeContent}>
            ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ ಅಕುಶಲ ಉದ್ಯೋಗಕ್ಕಾಗಿ ನೋಂದಾಯಿಸಿರುವ
            ವ್ಯಕ್ತಿಗಳು, ಈ ಕೆಳಗೆ ವಿವರಿಸಿರುವ ಕಾಮಗಾರಿಯ ಮೇಲ್ವಿಚಾರಕರಲ್ಲಿ ದಿನಾಂಕ{" "}
            <Text style={styles.dateContent}>{date}</Text> ರಂದು ಕೆಲಸಕ್ಕೆ ವರದಿ
            ಮಾಡಿಕೊಳ್ಳಲು ಸೂಚಿಸಲಾಗಿದೆ. ಎಂಬುದಾಗಿ ಸಂಬಂಧಿಸಿದ ವ್ಯಕ್ತಿಗಳ ಹಾಗೂ
            ಸಾರ್ವಜನಿಕರ ಗಮನಕ್ಕೆ ಈ ಮೂಲಕ ತರಲಾಗಿದೆ.
          </Text>

          {/* Work Details Table */}
          <View style={styles.workDetailsTable}>
            {workDetails.map((detail) => (
              <View key={detail.id} style={styles.workDetailRow}>
                <Text style={styles.workDetailNumberCell}>{detail.id}</Text>
                <Text style={styles.workDetailLabelCell}>{detail.label}</Text>
                <Text style={styles.workDetailValueCell}>{detail.value}</Text>
              </View>
            ))}
          </View>

          {/* Workers Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderCell, styles.slNoCell]}>
                ಕ್ರ.ಸಂ.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.nameCell]}>
                ಹೆಸರು
              </Text>
              <Text style={[styles.tableHeaderCell, styles.jobCardCell]}>
                ಉದ್ಯೋಗ ಚೀಟಿ ಸಂಖ್ಯೆ {"  "}
              </Text>
            </View>

            {/* Table Rows */}
            {applicantsData.map((worker) => (
              <View key={worker.slNo} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tableCell, styles.slNoCell]}>
                  {worker.slNo}
                </Text>
                <Text style={[styles.tableCell, styles.nameCell]}>
                  {worker.applicantName}
                </Text>
                <Text style={[styles.tableCell, styles.jobCardCell]}>
                  {worker.jobCardNo}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <View style={styles.footerLeft}>
              <Text>ದಿನಾಂಕ: {date}</Text>
            </View>
            <View style={styles.footerCenter}>
              <Text>ಗ್ರಾ.ಪಂ.ಮೊಹರು</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.officerTitle}>ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ</Text>
              <Text style={styles.officerLocation}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}.
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Form9PDF;
export type { Form9Data, Form9PropsData, ApplicantData };
