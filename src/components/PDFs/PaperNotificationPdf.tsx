import {
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";

import emblem from "@/assets/State embalm.jpeg";
// Font registration for Kannada support
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf"
});
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Types matching the backend response
type PaperNotificationProps = {
  district?: string;
  taluka?: string;
  gramPanchayat?: string;
  year: string;
  date?: string;
  workName?: string;
  quotationAmount?: string;
  emdPrice?: string;
  eligibleContractors?: string;
  fromDate?: string;
  toDate?: string;
  prebidMeetingDate?: string;
  documentSubmissionDate?: string;
  envelopeOpeningDetails?: string;
};

type PaperNotificationData = {
  paperNotificationData: PaperNotificationProps;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8, // Reduced from 10
    lineHeight: 1.2,
    padding: "10mm",
    backgroundColor: "white",
    width: "210mm",
    height: "297mm"
  },
  container: {
    width: "100%",
    border: "1px solid black",
    padding: "10mm", // Increased from 12mm
    height: "100%"
  },
  headerSection: {
    textAlign: "center",
    paddingBottom: 10,
    marginBottom: 1,
    backgroundColor: "white"
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 6
  },
  kannadaTitle: {
    fontSize: 14, // Reduced from 16
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  centerLogo: {
    width: 28, // Reduced from 32
    height: 28
  },
  districtTitle: {
    fontSize: 10, // Reduced from 12
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "NotoSansKannada"
  },
  gramPanchayatTitle: {
    fontSize: 9, // Reduced from 10
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  referenceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8, // Reduced from 9
    marginBottom: 5,
    backgroundColor: "white",
    paddingHorizontal: 6
  },
  referenceText: {
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 10, // Reduced from 12
    fontWeight: "normal",
    marginBottom: 12,
    fontFamily: "NotoSansKannada",
    backgroundColor: "black",
    color: "white",
    paddingVertical: 4
  },
  subjectSection: {
    textAlign: "left",
    fontSize: 8, // Reduced from 10
    fontWeight: "normal",
    marginBottom: 12,
    fontFamily: "NotoSansKannada",
    backgroundColor: "white"
  },
  boldLabel: {
    fontWeight: "normal"
  },
  referenceDetailsSection: {
    marginBottom: 12,
    fontSize: 7, // Reduced from 9
    flexDirection: "row",
    textAlign: "justify",
    alignItems: "flex-start",
    fontFamily: "NotoSansKannada",
    backgroundColor: "white"
  },
  referenceList: {
    marginLeft: 15, // Reduced from 20
    marginTop: 6
  },
  referenceItem: {
    marginBottom: 6
  },
  referenceItemBold: {
    fontWeight: "bold",
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 8, // Reduced from 10
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "NotoSansKannada",
    backgroundColor: "white",
    textAlign: "center"
  },
  mainContent: {
    marginBottom: 12,
    fontSize: 7, // Reduced from 9
    textAlign: "justify",
    lineHeight: 1.7,
    fontFamily: "NotoSansKannada",
    backgroundColor: "white"
  },
  table: {
    width: "100%",
    marginBottom: 12,
    backgroundColor: "white",
    border: "1px solid black"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  tableCellLeft: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  tableCellBold: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  // Special styles for last column cells (no right border)
  tableCellLast: {
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "center",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  tableCellLeftLast: {
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "left",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  tableCellBoldLast: {
    borderBottom: "1px solid black",
    padding: 6,
    fontSize: 7,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    wordWrap: "break-word"
  },
  // Column widths for first table - adjusted for better text containment
  col1: { width: "6%" },
  col2: { width: "28%" },
  col3: { width: "14%" },
  col4: { width: "10%" },
  col5: { width: "14%" },
  col6: { width: "16%" },
  col7: { width: "12%" },
  // Column widths for schedule table - adjusted for better text containment
  scheduleCol1: { width: "6%" },
  scheduleCol2: { width: "32%" },
  scheduleCol3: { width: "56%" },
  scheduleCol4: { width: "6%" },
  importantNote: {
    marginBottom: 16, // Reduced from 24
    fontSize: 7, // Reduced from 9
    textAlign: "justify",
    lineHeight: 1.7,
    fontFamily: "NotoSansKannada",
    backgroundColor: "white",
    paddingHorizontal: 3
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // Reduced from 32
    backgroundColor: "white"
  },
  footerBox: {
    textAlign: "center",
    width: "45%", // Increased from 40%
    fontWeight: "normal",
    backgroundColor: "white"
  },
  footerTitle: {
    fontSize: 8, // Reduced from 9
    marginBottom: 6,
    fontFamily: "NotoSansKannada"
  },
  footerSubtitle: {
    fontSize: 7, // Reduced from 9
    fontFamily: "NotoSansKannada",
    marginBottom: 2
  }
});

const PaperNotificationPDF: React.FC<PaperNotificationData> = ({
  paperNotificationData
}) => {
  const {
    district,
    taluka,
    gramPanchayat,
    year,
    date,
    workName,
    quotationAmount,
    prebidMeetingDate,
    documentSubmissionDate,
    envelopeOpeningDetails,
    fromDate,
    toDate
  } = paperNotificationData;

  // Static values as in original
  const emdPrice = "500";
  const eligibleContractors = "_______ದಿನಗಳು";

  const formatDate = (isoDateString?: string) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.headerTitle}>
              <Text style={styles.kannadaTitle}>ಕರ್ನಾಟಕ</Text>
              <Image style={styles.centerLogo} src={emblem} />
              <Text style={styles.kannadaTitle}>ಸರ್ಕಾರ</Text>
            </View>
            <Text style={styles.districtTitle}>
              ಜಿಲ್ಲಾ ಪಂಚಾಯತ {district} / ತಾಲೂಕ ಪಂಚಾಯತ {taluka}
            </Text>
            <Text style={styles.gramPanchayatTitle}>
              ಗ್ರಾಮ ಪಂಚಾಯತ ಕಾರ್ಯಾಲಯ {gramPanchayat}
            </Text>
          </View>

          {/* Reference Info */}
          <View style={styles.referenceSection}>
            <Text style={styles.referenceText}>
              ಸಂಗ್ರಾಪಂಕಲ :ಉಖಾಯೋ:ಸಾ.ಪೊ:ದ.ಪ: {year}
            </Text>
            <Text style={styles.referenceText}>
              ದಿನಾಂಕ :- {formatDate(date)}
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.mainTitle}>
            ಸಾಮಾಗ್ರಿಗಳ ಪೂರೈಕೆಗಾಗಿ ದರಪಟ್ಟಿಗಳ ಆಹ್ವಾನ
          </Text>

          {/* Subject */}
          <View style={styles.subjectSection}>
            <Text>
              <Text style={styles.boldLabel}>ವಿಷಯ :</Text> {year.split("-")[0]}-
              {year.split("-")[1].slice(-2)} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ
              ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಡಿ ಗ್ರಾಮ ಪಂಚಾಯತಿಯಿಂದ ಅನುಷ್ಠಾನ ಮಾಡಲಾಗುವ
              ವಿವಿಧ ಕಾಮಗಾರಿಗಳಿಗೆ ಅಗತ್ಯವಾದ ಸಾಮಾಗ್ರಿಗಳನ್ನು ಪೂರೈಕ್ಕೆ ಮಾಡುವುದಕ್ಕಾಗಿ
              ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ಮಾಡುವ ಕುರಿತು.
            </Text>
          </View>

          {/* Reference Section */}
          <View style={styles.referenceDetailsSection}>
            <Text style={styles.boldLabel}>ಉಲ್ಲೇಖ :</Text>
            <View style={styles.referenceList}>
              <Text style={styles.referenceItem}>
                1) ಮಾನ್ಯ ಆಯುಕ್ತರು ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ, ಆಯುಕ್ತಾಲಯ ಮತ್ತು ಪಂಚಾಯತರಾಜ್
                ಇಲಾಖೆ ಬೆಂಗಳೂರುಇವರ ಆದೇಶಸಂಖ್ಯೆ:
              </Text>
              <Text style={styles.referenceItemBold}>
                RDC-EGS/988/2022(E-970872) Do: 17.05.2023
              </Text>
              <Text style={styles.referenceItem}>
                2) ಸರ್ಕಾರದ ಆದೇಶ ಸಂಖ್ಯೆ:ಆರ್.ಡಿ.ಸಿ.-ಇ.ಜಿ.ಎಸ್/988/2022 ಬೆಂಗಳೂರು,
                ದಿನಾಂಕ: 16.05.2023
              </Text>
            </View>
          </View>

          {/* Section 1 */}
          <Text style={styles.sectionTitle}>1. ಪ್ರಕಟಣೆ</Text>

          {/* Main Content */}
          <Text style={styles.mainContent}>
            ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ನಿಂದ {year} ನೇ ಸಾಲಿನ ಮಾಹಾತ್ಮ ಗಾಂಧಿ
            ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯ ಕ್ರಿಯಾ ಯೋಜನೆಯಡಿ ಅನುಮೋದನೆಯಾದ
            ಗ್ರಾಮ ಪಂಚಾಯತಿಯಿಂದ ಅನುಷ್ಠಾನ ಮಾಡಲಾಗುವ ವಿವಿಧ ಕಾಮಗಾರಿಗಳಿಗೆ ಅಗತ್ಯವಾದ
            ಸಾಮಾಗ್ರಿಗಳನ್ನು ಪೂರೈಕ್ಕೆ ಮಾಡುವುದಕ್ಕಾಗಿ ದರಪಟ್ಟಿ ಪ್ರಕಟಣೆ ಮಾಡಿ ಅರ್ಹ
            ದರಪಟ್ಟಿದಾರರಿಂದ (ಸರಬರಾಜುದಾರರು/ಏಜೆನ್ಸಿಯವರು / ಮಾರಾಟಗಾರರು ಅರ್ಹ
            ಸಂಸ್ಥೆಯವರು ಇತ್ಯಾದಿ ) ದರಪಟ್ಟಿಗಳನ್ನು ಅನುಬಂಧ -1 ರಲ್ಲಿ ದಾಖಲಿಸಲಾದ
            ಕಾಮಗಾರಿಗಳ ಐಟಂವಾರು ಸಾಮಾಗ್ರಿಗಳಿಗಾಗಿ ಮೊಹರು ಮಾಡಿದ ಲಕೋಟಿಗಳಲ್ಲಿ
            ಸ್ಪರ್ಧಾತ್ಮಕ ದರಪಟ್ಟಿಗಳನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿರುತ್ತದೆ.
          </Text>

          {/* Work Details Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellBold, styles.col1]}>ಕ್ರಸಂ</Text>
              <Text style={[styles.tableCellBold, styles.col2]}>
                ಕಾಮಗಾರಿಯ ಹೆಸರು
              </Text>
              <Text style={[styles.tableCellBold, styles.col3]}>
                ಕೊಟೇಶನಗಾಗಿ ಇಟ್ಟ ಮೊತ್ತ
              </Text>
              <Text style={[styles.tableCellBold, styles.col4]}>
                ಇ.ಎಂ.ಡಿ. ಮೊತ್ತ{" "}
              </Text>
              <Text style={[styles.tableCellBold, styles.col5]}>
                ಕೊಟೇಶನ್ ದರಪಟ್ಟಿ ಬೆಲೆ{"\n"}ರೂ ಗಳಲ್ಲಿ
              </Text>
              <Text style={[styles.tableCellBold, styles.col6]}>
                ಅರ್ಹತೆ ಹೊಂದಿದ ಗುತ್ತಿಗೆದಾರರ{"\n"}ಶ್ರೇಣಿ
              </Text>
              <Text style={[styles.tableCellBoldLast, styles.col7]}>
                ಕಾಮಗಾರಿ ಪೂರ್ತಿ{"\n"}ಗೊಳಿಸಲು ಪಡಿಸಿದ ಅವಧಿ{" "}
              </Text>
            </View>

            {/* Table Row */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>1</Text>
              <Text style={[styles.tableCellLeft, styles.col2]}>
                {workName}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>
                {quotationAmount}
              </Text>
              <Text style={[styles.tableCell, styles.col4]}></Text>
              <Text style={[styles.tableCell, styles.col5]}>{emdPrice}</Text>
              <Text style={[styles.tableCell, styles.col6]}>
                4ನೇ ದರ್ಜೆ ಮೇಲ್ಪಟ್ಟು{" "}
              </Text>
              <Text style={[styles.tableCellLast, styles.col7]}>
                {eligibleContractors}
              </Text>
            </View>
          </View>

          {/* Section 2 */}
          <Text style={styles.sectionTitle}>
            2. ದರಪಟ್ಟಿ ಪ್ರಕ್ರಿಯೆಯ ವೇಳಾಪಟ್ಟಿ {"  "}
          </Text>

          {/* Schedule Table */}
          <View style={styles.table}>
            {/* Schedule Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellBold, styles.scheduleCol1]}>
                ಕ್ರಸಂ
              </Text>
              <Text style={[styles.tableCellBold, styles.scheduleCol2]}>
                ವಿವರ
              </Text>
              <Text style={[styles.tableCellBold, styles.scheduleCol3]}>
                ನಿಗಧಿ ಪಡಿಸಿದ ದಿನಾಂಕ
              </Text>
              <Text style={[styles.tableCellBoldLast, styles.scheduleCol4]}>
                ಪರಾ
              </Text>
            </View>

            {/* Schedule Table Rows */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.scheduleCol1]}>1</Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol2]}>
                ದರಪಟ್ಟಿ ಫಾರಂ ಮತ್ತು ಡಾಕುಮೇಂಟ್ ವಿತರಿಸುವ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol3]}>
                {formatDate(fromDate)} ದಿನಾಂಕ ದಿಂದ {formatDate(toDate)} ರ ವರೆಗೆ
                ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ ಮತ್ತು ಕಛೇರಿ {""} ವೇಳೆಯಲ್ಲಿ,
              </Text>
              <Text style={[styles.tableCellLast, styles.scheduleCol4]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.scheduleCol1]}>2</Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol2]}>
                ದರಪಟ್ಟಿದಾರರು ಪೂರ್ವಭಾವಿ ಸಭೆ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol3]}>
                {formatDate(prebidMeetingDate)} ರಂದು ಸಮಯ ಬೆಳ್ಲಿಗೆ 11-00
                ಗಂಟೆಗೆಯಿಂದ ಅಪರಾಹ್ನ 2-00 ಗಂಟೆ ವರೆಗೆ ಗ್ರಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ{" "}
              </Text>
              <Text style={[styles.tableCellLast, styles.scheduleCol4]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.scheduleCol1]}>3</Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol2]}>
                ಮೊಹರು ಮಾಡಿದ ದರಪಟ್ಟಿ ಫಾರಂ ಮತ್ತು ಇತರೆ ದಾಖಲಾತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುವ
                ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol3]}>
                {formatDate(documentSubmissionDate)} ರಂದು ಬೆಳ್ಲಿಗೆ 11-00
                ಗಂಟೆಯಿಂದ ಅಪರಾಹ್ನ 2-00 ಗಂಟೆಯವರಿಗೆ ಗಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ{" "}
              </Text>
              <Text style={[styles.tableCellLast, styles.scheduleCol4]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.scheduleCol1]}>4</Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol2]}>
                ಮೊಹರು ಮಾಡಿದ ದರಪಟ್ಟಿ ಲಕೋಟೆ ತೆರೆಯುವ ಸ್ಥಳ, ದಿನಾಂಕ ಮತ್ತು ಸಮಯ
              </Text>
              <Text style={[styles.tableCellLeft, styles.scheduleCol3]}>
                "ಹಾಜರಿರುವ ದರಪಟ್ಟಿದಾರರ ಸಮುಖದಲ್ಲಿ{" "}
                {formatDate(envelopeOpeningDetails)} ರಂದು ಅಪರಾಹ್ನ 3-00 ಗಂಟೆ
                ಗ್ರಾಮ ಪಂಚಾಯತ ಕಛೇರಿಯಲ್ಲಿ"
              </Text>
              <Text style={[styles.tableCellLast, styles.scheduleCol4]}></Text>
            </View>
          </View>

          {/* Important Note */}
          <Text style={styles.importantNote}>
            ದರಪೆಟ್ಟಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಯಾವುದೇ ಮಾಹಿತಿಯನ್ನು ಕಛೇರಿಗೆ ಕೆಲಸದ ವೇಳೆಯಲ್ಲಿ
            ಗ್ರಾಮ ಪಂಚಾಯತಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಪಡೆಯಬಹುದಾಗಿರುತ್ತದೆ. ದರಪಟ್ಟಿಯನ್ನು
            ಸ್ವಿಕರಿಸುವ ಮತ್ತು ತಿರಸ್ಕರಿಸುವ ಮತ್ತು ಅಧಿಕಾರ ಗ್ರಾಮ
            ಪಂಚಾಯತಿಯದ್ದಾಗಿರುತ್ತದೆ ಹಾಗೂ ಈ ದರಪಟ್ಟಿ ಪ್ರಕ್ರಿಯೆಗೆ ಸಂಬಂದಿಸಿದಂತೆ ಗ್ರಾಮ
            ಪಂಚಾಯತಿಯ ತೀರ್ಮಾನವೆ ಅಂತಿಮ ತೀರ್ಮಾನವಾಗಿರುತ್ತದೆ
          </Text>

          {/* Footer Signatures */}
          <View style={styles.footerSection}>
            <View style={styles.footerBox}>
              <Text style={styles.footerTitle}>ಅಧ್ಯಕ್ಷರು</Text>
              <Text style={styles.footerSubtitle}>
                ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}
              </Text>
              <Text style={styles.footerSubtitle}>
                ತಾ: ಗುಲ್ಬರ್ಗಾ ಜಿಲ್ಲೆ: ಜಿ : {district}
              </Text>
            </View>
            <View style={styles.footerBox}>
              <Text style={styles.footerTitle}>
                ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು
              </Text>
              <Text style={styles.footerSubtitle}>
                ಗ್ರಾಮ ಪಂಚಾಯತ {gramPanchayat}
              </Text>
              <Text style={styles.footerSubtitle}>
                ತಾ: {taluka} ಜಿಲ್ಲೆ: ಜಿ : {district}
              </Text>
            </View>
          </View>
        </View>
      </Page>
  );
};

export default PaperNotificationPDF;
export type { PaperNotificationProps, PaperNotificationData };
