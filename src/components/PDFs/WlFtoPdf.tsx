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
type ftoDataProp = {
  slNo: number;
  jobCardNo: string;
  applicantNo: number;
  applicantName: string;
  mustrollNo: string;
  wageListNo: string;
  referenceNo: string;
  ftoNo: string;
  verifyPo: string;
  status: string;
  bankName: string;
  wgApbCrAccount: string;
  favoringAsPerBank: string;
};

type WLFTOPdfProps = {
  gramPanchayat?: string;
  taluka?: string;
  district?: string;
  ftoData?: ftoDataProp[];
};

type wlftoData = {
  wlfto: WLFTOPdfProps;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.2,
    padding: 24,
    backgroundColor: "white",
    orientation: "landscape"
  },
  container: {
    flexDirection: "column"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  emblemContainer: {
    width: 32,
    height: 32,
    marginBottom: 6,
    alignSelf: "center"
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 6
  },
  headerSubTitle1: {
    fontSize: 9,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 2
  },
  headerSubTitle2: {
    fontSize: 9,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  table: {
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    marginBottom: 2
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 24
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    fontSize: 6,
    textAlign: "center",
    fontFamily: "Helvetica",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "break-word",
    flexWrap: "wrap"
  },
  tableHeaderCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    fontSize: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  // Column widths for landscape orientation
  slNoCell: { width: "4%" },
  jobCardCell: { width: "11%" },
  applicantNoCell: { width: "5%" },
  applicantNameCell: {
    width: "10%",
    textAlign: "center",
    paddingLeft: 2,
    flexWrap: "wrap",
    wordWrap: "break-word",
    fontFamily: "NotoSansKannada"
  },
  mustrollNoCell: { width: "5%" },
  wageListNoCell: { width: "7%" },
  referenceNoCell: { width: "11%" },
  ftoNoCell: { width: "18%" },
  verifyPoCell: { width: "4%" },
  statusCell: { width: "4%" },
  bankNameCell: { width: "10%" },
  accountCell: { width: "11%" },
  favoringCell: { width: "12%" },
  footerSection: {
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 24
  },
  footerContent: {
    textAlign: "center"
  },
  footerText: {
    fontSize: 7,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  gmfooterText: {
    fontSize: 7,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginLeft: 32
  }
});

const WLFTOPdf: React.FC<wlftoData> = ({ wlfto }) => {
  const { gramPanchayat, taluka, district, ftoData = [] } = wlfto;

  return (
      <Page size="A4" style={styles.page} orientation="landscape" wrap>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.mnregalogoContainer}>
              <Image style={styles.logo} src={mnreaga} />
            </View>
            <View style={styles.centerHeader}>
              <View style={styles.emblemContainer}>
                <Image style={styles.logo} src={emblem} />
              </View>
              <Text style={styles.headerTitle}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ತಾ|| {taluka} ಜಿ|| {district}
              </Text>
              <Text style={styles.headerSubTitle1}>
                ಪಾವತಿಸಿರುವ ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿಗಳು ಎಫ್‌ಟಿಒ ಪ್ರತಿಗಳು
              </Text>
              <Text style={styles.headerSubTitle2}>
                ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ {"   "}
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={state_logo} />
            </View>
          </View>

          {/* Main Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderCell, styles.slNoCell]}>
                Sr. No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.jobCardCell]}>
                Job Card No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.applicantNoCell]}>
                Applicant No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.applicantNameCell]}>
                Applicant Name
              </Text>
              <Text style={[styles.tableHeaderCell, styles.mustrollNoCell]}>
                Mustroll No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.wageListNoCell]}>
                Wage List No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.referenceNoCell]}>
                Reference No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.ftoNoCell]}>
                Fto No.
              </Text>
              <Text style={[styles.tableHeaderCell, styles.verifyPoCell]}>
                Verify Po
              </Text>
              <Text style={[styles.tableHeaderCell, styles.statusCell]}>
                Status
              </Text>
              <Text style={[styles.tableHeaderCell, styles.bankNameCell]}>
                Bank Name
              </Text>
              <Text style={[styles.tableHeaderCell, styles.accountCell]}>
                WG APB CR ACCOUNT
              </Text>
              <Text style={[styles.tableHeaderCell, styles.favoringCell]}>
                Favoring As Per Bank
              </Text>
            </View>

            {/* Table Rows */}
            {ftoData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.slNoCell]}>
                  {item.slNo}
                </Text>
                <Text style={[styles.tableCell, styles.jobCardCell]}>
                  {item.jobCardNo}
                </Text>
                <Text style={[styles.tableCell, styles.applicantNoCell]}>
                  {item.applicantNo}
                </Text>
                <Text style={[styles.tableCell, styles.applicantNameCell]}>
                  {item.applicantName}
                </Text>
                <Text style={[styles.tableCell, styles.mustrollNoCell]}>
                  {item.mustrollNo}
                </Text>
                <Text style={[styles.tableCell, styles.wageListNoCell]}>
                  {item.wageListNo}
                </Text>
                <Text style={[styles.tableCell, styles.referenceNoCell]}>
                  {item.referenceNo}
                </Text>
                <Text style={[styles.tableCell, styles.ftoNoCell]}>
                  {item.ftoNo}
                </Text>
                <Text style={[styles.tableCell, styles.verifyPoCell]}>
                  {item.verifyPo}
                </Text>
                <Text style={[styles.tableCell, styles.statusCell]}>
                  {item.status}
                </Text>
                <Text style={[styles.tableCell, styles.bankNameCell]}>
                  {item.bankName}
                </Text>
                <Text style={[styles.tableCell, styles.accountCell]}>
                  {item.wgApbCrAccount}
                </Text>
                <Text style={[styles.tableCell, styles.favoringCell]}>
                  {item.favoringAsPerBank}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>
                ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
              </Text>
              <Text style={styles.gmfooterText}>
                ಗ್ರಾಮ ಪಂಚಾಯತ್ {gramPanchayat}
              </Text>
            </View>
          </View>
        </View>
      </Page>
  );
};

export default WLFTOPdf;
export type { wlftoData, WLFTOPdfProps, ftoDataProp };
