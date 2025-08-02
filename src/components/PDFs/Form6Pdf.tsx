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

type Form6PropsData = {
  gramPanchayat?: string;
  taluka?: string;
  district?: string;
  date?: string;
  applicationNumber?: string;
  applicantsData?: ApplicantData[];
};

type Form6Data = {
  form6Data: Form6PropsData;
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
  applicationHeader: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 6,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  applicationNumber: {
    paddingTop: 2,
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  addressText: {
    fontSize: 10,
    marginBottom: 4,
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
  justifyText: {
    textAlign: "justify",
    fontSize: 10,
    marginBottom: 12,
    fontFamily: "NotoSansKannada",
    letterSpacing: 0.5
  },
  table: {
    borderLeft: "1px solid black",
    marginTop: 12
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
    padding: 6,
    fontSize: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    borderTop: "1px solid black"
  },
  slNoCell: { width: "6%" },
  nameCell: { width: "22%", textAlign: "left", paddingLeft: 6 },
  addressCell: { width: "10%" },
  jobCardCell: { width: "22%" },
  durationCell: { width: "18%" },
  childCareCell: { width: "14%" },
  signatureCell: { width: "8%" },
  durationSubCell: {
    flex: 1,
    padding: 3,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "NotoSansKannada",
    borderRight: "1px solid black"
  },
  durationSubCellLast: {
    flex: 1,
    padding: 3,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "NotoSansKannada"
  },
  footerSection: {
    marginTop: 16,
    fontSize: 10
  },
  footerText: {
    marginBottom: 12,
    fontFamily: "NotoSansKannada"
  },
  signatureFooter: {
    textAlign: "right",
    marginBottom: 16,
    marginTop: 6,
    fontFamily: "NotoSansKannada"
  },
  instructionItem: {
    marginTop: 6,
    fontFamily: "NotoSansKannada"
  }
});

const Form6PDF: React.FC<Form6Data> = ({ form6Data }) => {
  const {
    gramPanchayat,
    taluka,
    district,
    applicationNumber,
    date,
    applicantsData = []
  } = form6Data;

  const address = "";

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
                ಗ್ರಾಮ ಪಂಚಾಯತ್, {gramPanchayat}, ತಾ|| {taluka}. ಜ|| {district}
              </Text>
              <Text style={styles.headerSubText}>
                ಅನುಬಂಧ - III A/B (ನಮೂನೆ-6)
              </Text>
              <Text style={styles.headerSubText}>
                ಕೆಲಸಕ್ಕಾಗಿ ಅರ್ಜಿ ನಮೂನೆ (ವೈಯಕ್ತಿಕ / ಗುಂಪು){" "}
              </Text>
              <Text style={styles.headerSubText}>
                ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ ಅನುಸೂಚ II ಕಂಡಕೆ 9 ಕಾಯ್ದೆ 3(1) ರಂತೆ
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={state_logo} />
            </View>
          </View>

          <View style={styles.applicationHeader}>
            <Text style={styles.applicationNumber}>
              ಅರ್ಜಿಯ ಸಂಖ್ಯೆ: {applicationNumber}
            </Text>
            <Text style={styles.applicationNumber}>ದಿನಾಂಕ: {date}</Text>
          </View>

          <View>
            <Text style={styles.addressText}>ಗೆ,</Text>
            <Text style={styles.addressText}>
              ಅಧ್ಯಕ್ಷರು / ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ
            </Text>
            <Text style={styles.addressText}>{gramPanchayat} ಪಂಚಾಯತಿ</Text>
            <Text style={styles.addressText}>{taluka} ತಾಲೂಕು</Text>
            <Text style={styles.addressText}>{district} ಜಿಲ್ಲೆ</Text>
          </View>

          <View style={styles.subjectSection}>
            <Text style={styles.subjectText}>ವಿಷಯ: ಕೆಲಸಕ್ಕಾಗಿ ಅರ್ಜಿ</Text>
          </View>

          <Text style={styles.justifyText}>
            ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ ಅನುಸೂಚಿ II ಕಂಡಕೆ 9 ಕಾಯ್ 3(1) ರಂತೆ
            ಕೆಲಸಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇವೆ. ಇದರ ಪ್ರಕಾರ ನಮ್ಮ ಕೋರಿಕೆಯನು ಮತ್ತು
            ನಮ್ಮ ಉದ್ಯೋಗದ ಅವಧಿಯ ವಿವರವನ್ನು ನೀಡುತ್ತಿದ್ದೇವೆ.
          </Text>

          {/* Table */}
          <View style={styles.table}>
            {/* Fixed Header that repeats on page break */}
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderCell, styles.slNoCell]}>
                ಕ್ರ.ಸಂ.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.nameCell]}>
                ಅರ್ಜಿದಾರರ ಹೆಸರು
              </Text>
              <Text style={[styles.tableHeaderCell, styles.addressCell]}>
                ವಿಳಾಸ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.jobCardCell]}>
                ಉದ್ಯೋಗ ಚೀಟಿ ಸಂಖ್ಯೆ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.durationCell]}>
                ಅವಧಿ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.childCareCell]}>
                ಶಿಶು ವಿಹಾರ
              </Text>
              <Text style={[styles.tableHeaderCell, styles.signatureCell]}>
                ಸಹಿ
              </Text>
            </View>

            {applicantsData.map((applicant) => (
              <View key={applicant.slNo} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tableCell, styles.slNoCell]}>
                  {applicant.slNo}
                </Text>
                <Text style={[styles.tableCell, styles.nameCell]}>
                  {applicant.applicantName}
                </Text>
                <Text style={[styles.tableCell, styles.addressCell]}>
                  {address}
                </Text>
                <Text style={[styles.tableCell, styles.jobCardCell]}>
                  {applicant.jobCardNo}
                </Text>
                <View
                  style={[
                    styles.tableCell,
                    styles.durationCell,
                    { flexDirection: "row", padding: 0 }
                  ]}
                >
                  <Text style={styles.durationSubCell}>
                    {applicant.workFrom}
                  </Text>
                  <Text style={styles.durationSubCellLast}>
                    {applicant.workTo}
                  </Text>
                </View>
                <Text style={[styles.tableCell, styles.childCareCell]}>
                  {applicant.childCareRequired}
                </Text>
                <Text style={[styles.tableCell, styles.signatureCell]}>
                  {applicant.signature}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>
              ನಮಗೆ ನೀಡುವ ಕೆಲಸದ ಆಧಾರದ ಮೇಲೆ ಕನಿಷ್ಠ 6 ದಿನಗಳು ನರಂತರ ಕೆಲಸ ಮಾಡಲು
              ಇಚ್ಛಿಸುತ್ತೇವೆ{" "}
            </Text>
            <Text style={styles.signatureFooter}>
              ಸಹಿ / ಅರ್ಜಿದಾರರ ಎಡಗೈ ಹೆಬ್ಬೆಟ್ಟು ಗುರುತು{" "}
            </Text>
            <Text style={styles.instructionItem}>
              1. ಅರ್ಜಿಯನ್ನು ಗ್ರಾಮ ಪಂಚಾಯತ್ / ಕಾರ್ಯಕ್ರಮ ಅಧಿಕಾರಿಗೆ ಸಲ್ಲಿಸಬೇಕು{" "}
            </Text>
            <Text style={styles.instructionItem}>
              2. ಉದ್ಯೋಗ ಚೀಟಿಯನ್ನು ಹೊಂದಿರುವವರು ಸ್ಥಳದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು{" "}
            </Text>
          </View>
        </View>
      </Page>
  );
};

export default Form6PDF;
export type { Form6Data, Form6PropsData, ApplicantData };
