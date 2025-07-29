import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import mnrega from "@/assets/MGNREGA logo.jpg";
import embelem from "@/assets/State embalm.jpeg";
import state_logo from "@/assets/State logo.jpeg";
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
type WorkCompletion = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  administrativeSanctionNo: string;
  workStartDate: string;
  wage: string;
  material: string;
  total: string;
};

type WorkCompletionData = {
  workCompletionData: WorkCompletion;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.2,
    padding: "10mm",
    backgroundColor: "white",
    width: "210mm", // A4 width
    height: "297mm" // A4 height - fixed height for single page
  },
  container: {
    width: "100%",
    padding: "8mm",
    height: "100%",
    letterSpacing: 0.4
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
    paddingBottom: 8,
    marginBottom: 12
  },
  logoLeft: {
    width: 80,
    height: 50,
    flexShrink: 0
  },
  logoRight: {
    width: 70,
    height: 50,
    flexShrink: 0
  },
  centerContent: {
    textAlign: "center",
    flex: 1,
    marginHorizontal: 8
  },
  centerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 4
  },
  centerLogo: {
    width: 32,
    height: 32
  },
  kannadaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  annexureText: {
    fontSize: 8,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  mainTitle: {
    fontSize: 10,
    fontWeight: "normal",
    marginBottom: 2,
    fontFamily: "NotoSansKannada"
  },
  addressSection: {
    marginBottom: 8,
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    lineHeight: 1.5
  },
  addressLine: {
    marginBottom: 2
  },
  subjectSection: {
    marginBottom: 8
  },
  subjectTitle: {
    fontSize: 8,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "NotoSansKannada"
  },
  salutationSection: {
    marginBottom: 8
  },
  salutation: {
    marginBottom: 8,
    fontFamily: "NotoSansKannada",
    fontSize: 8
  },
  introText: {
    marginBottom: 12,
    paddingLeft: 12,
    fontFamily: "NotoSansKannada",
    fontSize: 8
  },
  workDetailsContainer: {
    border: "1px solid black",
    marginBottom: 12
  },
  workDetailRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  workDetailRowLast: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  workDetailLabel: {
    fontWeight: "normal",
    whiteSpace: "nowrap",
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  workDetailLabelBottomRow: {
    fontWeight: "normal",
    whiteSpace: "nowrap",
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  workDetailLabelgram: {
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  workDetailLabelgramPanchayat: {
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  workDetailLabelWide: {
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  workDetailValue: {
    flex: 1,
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    fontWeight: "bold"
  },
  bottomRow: {
    flexDirection: "row"
  },
  bottomRowItem: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    flex: 1
  },
  gramaRow: {
    flexDirection: "row",
    flex: 1
  },
  socialAuditSection: {
    marginBottom: 16
  },
  socialAuditRow: {
    flexDirection: "row"
  },
  socialAuditLabel: {
    fontWeight: "normal",
    width: 140,
    fontFamily: "NotoSansKannada",
    fontSize: 8,
    marginRight: 4
  },
  socialAuditValue: {
    fontFamily: "NotoSansKannada",
    fontSize: 8
  },
  signatureSection: {
    marginTop: 20
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  signatureBox: {
    textAlign: "center"
  },
  signatureLineContainer: {
    marginBottom: 16
  },
  signatureLineRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  signatureLine: {
    borderBottom: "1px solid black",
    width: 120, // Reduced from 192
    marginBottom: 4,
    marginRight: 8
  },
  signatureText: {
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  },
  signatureLabel: {
    fontSize: 8,
    marginRight: 16,
    fontFamily: "NotoSansKannada"
  },
  signatureTextOnly: {
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  }
});

const WorkCompletionPDF: React.FC<WorkCompletionData> = ({
  workCompletionData
}) => {
  const {
    gramPanchayat,
    taluka,
    district,
    year,
    workCode,
    workName,
    administrativeSanctionNo,
    workStartDate,
    wage,
    material,
    total
  } = workCompletionData;

  // Static values as in original
  const workEndDate = "";
  const masterollId = "";
  const expenditure = "";
  const workOrderNo = "";
  const workOrderDate = "";
  const grama = gramPanchayat;
  const worksite = gramPanchayat;

  // Format the date if it's in ISO format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
    } catch {
      return dateString;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header with logos */}
          <View style={styles.headerSection}>
            {/* Left Logo */}
            <Image style={styles.logoLeft} src={mnrega} />

            {/* Center Content */}
            <View style={styles.centerContent}>
              <View style={styles.centerHeader}>
                <Text style={styles.kannadaTitle}>ಕರ್ನಾಟಕ</Text>
                <Image style={styles.centerLogo} src={embelem} />
                <Text style={styles.kannadaTitle}>ಸರ್ಕಾರ</Text>
              </View>
              <Text style={styles.annexureText}>ಅನುಬಂಧ - V Annexture - V</Text>
              <Text style={styles.mainTitle}>
                ಕಾಮಗಾರಿಯ ಮುಕ್ತಾಯ ದೃಢೀಕರಣ ನಮೂನೆ{" "}
              </Text>
            </View>

            {/* Right Logo */}
            <Image style={styles.logoRight} src={state_logo} />
          </View>

          {/* Address Section */}
          <View style={styles.addressSection}>
            <Text style={styles.addressLine}>ಗೆ,</Text>
            <Text style={styles.addressLine}>
              ಅಧ್ಯಕ್ಷರು / ಕಾರ್ಯಕ್ರಮ ಅಧಿಕಾರಿ
            </Text>
            <Text style={styles.addressLine}>
              {gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯತಿ
            </Text>
            <Text style={styles.addressLine}>{taluka} ತಾಲ್ಲೂಕು</Text>
            <Text style={styles.addressLine}>{district} ಜಿಲ್ಲೆ</Text>
          </View>

          {/* Subject */}
          <View style={styles.subjectSection}>
            <Text style={styles.subjectTitle}>
              ವಿಷಯ: {year} ಸಾಲಿನಲ್ಲಿ {gramPanchayat} ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯ ಘನತ್ಯಾಜ್ಯ
              ವಿಲೇವಾರಿ ಘಟಕ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಯ ಮುಕ್ತಾಯ ದೃಢೀಕರಣ
            </Text>
          </View>

          {/* Salutation */}
          <View style={styles.salutationSection}>
            <Text style={styles.salutation}>ಮಾನ್ಯರೇ,</Text>
            <Text style={styles.introText}>
              ಮೇಲಿನ ವಿಷಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಈ ಕೆಳಕಂಡ ವಿವರಗಳೊಂದಿಗೆ ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ
              ದೃಢೀಕರಣ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ.
            </Text>
          </View>

          {/* Work Details with Border */}
          <View style={styles.workDetailsContainer}>
            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>ಕಾಮಗಾರಿ ಸಂಕೇತ:</Text>
              <Text style={styles.workDetailValue}>{workCode}</Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>ಕಾಮಗಾರಿ ಹೆಸರು:</Text>
              <Text style={styles.workDetailValue}>{workName}</Text>
            </View>

            <View style={styles.workDetailRow}>
              <View style={styles.gramaRow}>
                <Text style={styles.workDetailLabelgram}>ಗ್ರಾಮ:</Text>
                <Text style={styles.workDetailValue}>{grama}</Text>
              </View>

              <View style={styles.gramaRow}>
                <Text style={styles.workDetailLabelgramPanchayat}>
                  ಗ್ರಾಮ ಪಂಚಾಯತ್:
                </Text>
                <Text style={styles.workDetailValue}>{gramPanchayat}</Text>
              </View>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabelWide}>
                ಕಾಮಗಾರಿ ಸ್ಥಳ (ಪ್ಲಾಟ್ ಸಂಖ್ಯೆ, ಇತ್ಯಾದಿ):
              </Text>
              <Text style={styles.workDetailValue}>{worksite}</Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಆಡಳಿತಾತ್ಮಕ ಅನುಮತಿ ಸಂಖ್ಯೆ:
              </Text>
              <Text style={styles.workDetailValue}>
                {administrativeSanctionNo}
              </Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabelWide}>
                ಕಾರ್ಯಾದೇಶ ಸಂಖ್ಯೆ ಮತ್ತು ದಿನಾಂಕ:{" "}
              </Text>
              <Text style={styles.workDetailValue}>
                {workOrderNo}, {workOrderDate}
              </Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಕಾಮಗಾರಿ ಪ್ರಾರಂಭ ದಿನಾಂಕ:
              </Text>
              <Text style={styles.workDetailValue}>
                {formatDate(workStartDate)}
              </Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ ದಿನಾಂಕ:
              </Text>
              <Text style={styles.workDetailValue}>{workEndDate}</Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>
                ಬಳಸಿದ ಮಸ್ಟರ್ ರೋಲ್‌ನ ಐಡಿ:
              </Text>
              <Text style={styles.workDetailValue}>{masterollId}</Text>
            </View>

            <View style={styles.workDetailRow}>
              <Text style={styles.workDetailLabel}>ವೆಚ್ಚ:</Text>
              <Text style={styles.workDetailValue}>{expenditure}</Text>
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.bottomRowItem}>
                <Text style={styles.workDetailLabelBottomRow}>ಕೂಲಿ:</Text>
                <Text style={styles.workDetailValue}>{wage}</Text>
              </View>

              <View style={styles.bottomRowItem}>
                <Text style={styles.workDetailLabelBottomRow}>ಸಾಮಾಗ್ರಿ:</Text>
                <Text style={styles.workDetailValue}>{material}</Text>
              </View>

              <View style={styles.bottomRowItem}>
                <Text style={styles.workDetailLabelBottomRow}>ಒಟ್ಟು:</Text>
                <Text style={styles.workDetailValue}>{total}</Text>
              </View>
            </View>
          </View>

          {/* Social Audit Date */}
          <View style={styles.socialAuditSection}>
            <View style={styles.socialAuditRow}>
              <Text style={styles.socialAuditLabel}>
                ಸಾಮಾಜಿಕ ಪರಿಶೋಧನೆ ದಿನಾಂಕ: {"   "}
              </Text>
              {/* <Text style={styles.socialAuditValue}>_________________</Text> */}
            </View>
          </View>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureContainer}>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureLabel}>(ಸಹಿ)</Text>
                <View style={styles.signatureLineContainer}>
                  <View style={styles.signatureLineRow}>
                    <View style={styles.signatureLine}></View>
                    <View style={styles.signatureText}>
                      <Text style={styles.signatureTextOnly}>
                        ರವರಿಂದ ದೃಢೀಕರಣ
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.signatureBox}>
                <View style={styles.signatureLineContainer}>
                  {/* <View style={styles.signatureLine}></View> */}
                  <Text style={styles.signatureTextOnly}>
                    ಅಧಿಕೃತ ಅಧಿಕಾರಿಯ ಸಹಿ
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default WorkCompletionPDF;
export type { WorkCompletion, WorkCompletionData };
