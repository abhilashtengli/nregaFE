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
type ApplicantData = {
  slNo: number;
  applicantName: string;
  jobCardNo: string;
  workFrom: string;
  workTo: string;
  childCareRequired: string;
  signature: string;
};

type Form8PropsData = {
  gramPanchayat?: string;
  workCode?: string;
  workName?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

type Form8Data = {
  form8Data: Form8PropsData;
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
    marginBottom: 4
  },
  headerSubText: {
    fontSize: 9,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  letterHeader: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 6,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  letterNumber: {
    paddingTop: 2,
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  addressSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  addressLeft: {
    flex: 1
  },
  addressText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  addressBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
    padding: 8,
    width: 180,
    height: 70,
    textAlign: "center"
  },
  addressBoxTitle: {
    fontSize: 9,
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    marginBottom: 4
  },
  jobCardSection: {
    textAlign: "center",
    marginBottom: 12
  },
  jobCardText: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  subjectSection: {
    textAlign: "center",
    marginBottom: 16
  },
  subjectText: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  bodyText: {
    textAlign: "justify",
    fontSize: 10,
    marginBottom: 16,
    fontFamily: "NotoSansKannada",
    letterSpacing: 0.3
  },
  workDetailsTable: {
    marginBottom: 16
  },
  workDetailRow: {
    flexDirection: "row",
    minHeight: 24
  },
  workDetailNumberCell: {
    padding: 4,
    fontSize: 9,
    textAlign: "center",
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
  noteText: {
    textAlign: "justify",
    fontSize: 9,
    marginBottom: 12,
    fontFamily: "NotoSansKannada",
    letterSpacing: 0.3
  },
  tableIntroText: {
    fontSize: 10,
    fontWeight: "normal",
    marginBottom: 8,
    fontFamily: "NotoSansKannada",
    textAlign: "center"
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
    minHeight: 28
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
    fontFamily: "NotoSansKannada"
  },
  slNoCell: { width: "10%" },
  nameCell: { width: "35%", textAlign: "left", paddingLeft: 6 },
  jobCardCell: { width: "35%" },
  signatureCell: { width: "20%" },
  footerSection: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerLeft: {
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  footerRight: {
    textAlign: "right",
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  officerTitle: {
    fontWeight: "normal",
    marginBottom: 4
  },
  sealText: {
    marginBottom: 8
  }
});

const Form8PDF: React.FC<Form8Data> = ({ form8Data }: Form8Data) => {
  const {
    gramPanchayat,
    workCode,
    workName,
    taluka,
    district,
    date,
    applicationNumber,
    applicantsData = []
  } = form8Data;

  const workDate = date;
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
    { id: "6", label: "ಕೆಲಸಕ್ಕೆ ನಿಗದಿ ದಿನಗಳು", value: workingDays }
  ];

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
            <Text style={styles.headerText}>
              ಗ್ರಾಮ ಪಂಚಾಯತ, {gramPanchayat}, ತಾ|| {taluka}. ಜ|| {district}
            </Text>
            <Text style={styles.headerSubText}>
              ಅನುಬಂಧ - IV Annexture - IV (ನಮೂನೆ-8)
            </Text>
            <Text style={styles.headerSubText}>ಕೆಲಸ ಹಂಚಿಕೆ ನಮೂನೆ</Text>
            <Text style={styles.headerSubText}>
              ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ ಅನುಸೂಚಿ II ಕಂಡಕೆ 11 ಕಾಯ್ದೆ 3(1) ರಂತೆ
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={state_logo} />
          </View>
        </View>

        {/* Letter Header */}
        <View style={styles.letterHeader}>
          <Text style={styles.letterNumber}>
            ಪತ್ರದ ಸಂಖ್ಯೆ {applicationNumber}
          </Text>
          <Text style={styles.letterNumber}>ದಿನಾಂಕ {date}</Text>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressLeft}>
            <Text style={styles.addressText}>ಗೆ,</Text>
            <Text style={styles.addressText}>
              ಶ್ರೀ / ಶ್ರೀಮತಿ ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ
            </Text>
            <Text style={styles.addressText}>{gramPanchayat}</Text>
            <Text style={styles.addressText}>{gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯತ</Text>
            <Text style={styles.addressText}>{taluka} ತಾಲೂಕು</Text>
            <Text style={styles.addressText}>{district} ಜಿಲ್ಲೆ</Text>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressBoxTitle}>
              ಕಾಮಗಾರಿಕೆ ಕೋಡ್ ಕಾಗದಕ್ಕಾಗಿ
            </Text>
            <Text style={styles.addressBoxTitle}>
              ನಮೂನೆ 8 ನೀಡದ - ಸ್ವೀಕೃತಿ ಪತ್ರ
            </Text>
          </View>
        </View>

        {/* Job Card Section */}
        <View style={styles.jobCardSection}>
          <Text style={styles.jobCardText}>
            ಉದ್ಯೋಗ ಚೀಟಿಯ ಸಂಖ್ಯೆ: ಈ ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವಂತೆ
          </Text>
        </View>

        {/* Subject */}
        <View style={styles.subjectSection}>
          <Text style={styles.subjectText}>ವಿಷಯ: ಕೆಲಸ ಹಂಚಿಕೆ ಬಗ್ಗೆ ಮಾಹಿತಿ</Text>
        </View>

        {/* Body Text */}
        <Text style={styles.bodyText}>
          ಕೆಲಸದ ಅರ್ಜಿ ಸಂಖ್ಯೆ {applicationNumber} ಯ {date} (ದಿನಾಂಕ)ದ ನಿಮ್ಮ ಕೆಲಸದ
          ಅರ್ಜಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಎಂಜಿಎನ್‌ಆರ್‌ಇಜಿ ಕಾಯ್ದೆ 2005 ರ ಷೆಡ್ಯೂಲ್ II ಕಂಡಕೆ
          II ಪ್ರಕಾರ ನಿಮಗೆ ಈ ಕೆಳಕಂಡ ಕಾಮಗಾರಿಯನ್ನು ಹಂಚಿಕೆ ಮಾಡಲಾಗಿದೆ. ಆದ್ದರಿಂದ ನೀವು
          ಈ ಕೆಲಸಕ್ಕೆ ದಿನಾಂಕ {workDate} ರಂದು ಹಾಜರಾಗಲು ಈ ಮೂಲಕ ತಿಳಿಸಲಾಗಿದೆ
        </Text>

        {/* Work Details Table */}
        <View style={styles.workDetailsTable}>
          {workDetails.map((detail) => (
            <View key={detail.id} style={styles.workDetailRow}>
              <Text style={styles.workDetailNumberCell}>{detail.id}</Text>
              <Text style={styles.workDetailLabelCell}>{detail.label}</Text>
              <Text style={styles.workDetailValueCell}>{detail.value} </Text>
            </View>
          ))}
        </View>

        {/* Note Text */}
        <Text style={styles.noteText}>
          ಈ ಪತ್ರದ ಸ್ವೀಕೃತಿಯ ನಂತರ ಕಾಮಗಾರಿ ಹಂಚಿಕೆ ಮಾಡಿದ ದಿನಾಂಕದ ಒಳಗಾಗಿ ನೀವು
          ಕೆಲಸಕ್ಕೆ ಹಾಜರಾಗದಿದ್ದಲ್ಲಿ ಮಹಾತ್ಮ ಗಾಂಧಿ ಎನ್ ಆರ್ ಇಜಿ {""} ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್
          9 ರ ಪ್ರಕಾರ ಮುಂದಿನ ಮೂರು ತಿಂಗಳವರೆಗೆ ನೀವು ನಿರುದ್ಯೋಗ ಭತ್ಯೆಯನ್ನು ಪಡೆಯಲು
          ಅರ್ಹರಾಗಿರುವುದಿಲ್ಲ. ಹಾಗಾದರೂ ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿಯೂ ಉದ್ಯೋಗಕ್ಕಾಗಿ ಅರ್ಜಿ
          ಸಲ್ಲಿಸಬಹುದು.
        </Text>

        {/* Table Introduction */}
        <Text style={styles.tableIntroText}>
          ಈ ಕಾಮಗಾರಿಯನ್ನು ಈ ಕೆಳಕಂಡವರಿಗೆ ಕೆಲಸ ಹಂಚಿಕೆ ಮಾಡಲಾಗಿದೆ
        </Text>

        {/* Applicants Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.tableHeaderCell, styles.slNoCell]}>
              ಕ್ರ.ಸಂ.
            </Text>
            <Text style={[styles.tableHeaderCell, styles.nameCell]}>ಹೆಸರು</Text>
            <Text style={[styles.tableHeaderCell, styles.jobCardCell]}>
              ಉದ್ಯೋಗ ಚೀಟಿ ಸಂಖ್ಯೆ
            </Text>
            <Text style={[styles.tableHeaderCell, styles.signatureCell]}>
              ನಮೂನೆ-8 ಸ್ವೀಕೃತಿ ಸಹಿ
            </Text>
          </View>

          {/* Table Rows */}
          {applicantsData.map((applicant) => (
            <View key={applicant.slNo} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCell, styles.slNoCell]}>
                {applicant.slNo}
              </Text>
              <Text style={[styles.tableCell, styles.nameCell]}>
                {applicant.applicantName}
              </Text>
              <Text style={[styles.tableCell, styles.jobCardCell]}>
                {applicant.jobCardNo}
              </Text>
              <Text style={[styles.tableCell, styles.signatureCell]}>
                {/* Empty cell for signature */}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <View style={styles.footerLeft}>
            <Text>ದಿನಾಂಕ : {date}</Text>
          </View>
          <View>
            {" "}
            <Text style={styles.footerLeft}>ಗ್ರಾ.ಪಂ.ಮೊಹರು</Text>
          </View>

          <View style={styles.footerRight}>
            <Text style={styles.officerTitle}>ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ</Text>
            <Text>ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}.</Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default Form8PDF;
export type { Form8Data, Form8PropsData, ApplicantData };
