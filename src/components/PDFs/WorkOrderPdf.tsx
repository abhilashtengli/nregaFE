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
// Register fonts
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf",
  fontWeight: "normal"
});

Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Type definitions
type WorkData = {
  workCode: string;
  workName: string;
  panchayat: string;
  block: string;
  estimatedCost: string;
  date: string;
};

type WorkOrderProps = {
  workOrderData: WorkData;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.3,
    padding: 32,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16
  },
  logoContainer: {
    width: 70,
    height: 70,
    flexShrink: 0
  },

  mnregalogoContainer: {
    width: 80,
    height: 70,
    flexShrink: 0
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  centerContent: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 12
  },
  centerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    fontFamily: "NotoSansKannada"
  },
  centerSubtitle: {
    fontSize: 10,
    marginBottom: 12,
    fontFamily: "NotoSansKannada"
  },
  workOrderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "NotoSansKannada"
  },
  mainContent: {
    marginBottom: 20
  },
  contentItem: {
    marginBottom: 12,
    paddingLeft: 96
  },
  subjectText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    lineHeight: 1.6
  },
  referenceText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  starSeparator: {
    textAlign: "center",
    fontSize: 12,
    marginVertical: 12
  },
  mainParagraph: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.4,
    marginBottom: 16,
    fontFamily: "NotoSansKannada"
  },
  table: {
    border: "1px solid black",
    marginBottom: 16
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableDataRow: {
    flexDirection: "row"
  },
  tableHeaderCell: {
    border: "1px solid black",
    padding: 6,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  tableCell: {
    border: "1px solid black",
    padding: 6,
    textAlign: "center",
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  serialCell: {
    width: "8%"
  },
  gramCell: {
    width: "15%",
    fontWeight: "normal"
  },
  workCodeCell: {
    width: "27%"
  },
  workNameCell: {
    width: "35%"
  },
  amountCell: {
    width: "15%",
    fontWeight: "normal"
  },
  conditionsSection: {
    marginBottom: 20
  },
  conditionsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "NotoSansKannada"
  },
  conditionItem: {
    fontSize: 8,
    lineHeight: 1.3,
    marginBottom: 6,
    fontFamily: "NotoSansKannada"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12
  },
  footerLeft: {
    width: "100%"
  },
  footerleftbottom: {
    marginTop: 12,
    fontWeight: "normal"
  },
  footerRight: {
    textAlign: "right"
  },
  footerText: {
    fontSize: 9,
    marginBottom: 3,
    fontFamily: "NotoSansKannada"
  },
  footerBold: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "NotoSansKannada"
  },
  footerSection: {
    marginBottom: 12
  },
  kannadaText: {
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  kannadaTextNormal: {
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  kannadaNormal: {
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  }
});

const WorkOrderPDF: React.FC<WorkOrderProps> = ({ workOrderData }) => {
  const { panchayat, block, date, workCode, workName, estimatedCost } =
    workOrderData;

  const gramPanchayat = panchayat || "";
  const taluka = block || "";
  const estimatedAmount = estimatedCost || "";
  const grama = panchayat || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header Section with Logos */}
          <View style={styles.headerSection}>
            {/* Left Logo */}
            <View style={styles.mnregalogoContainer}>
              <Image style={styles.logo} src={mnreaga} />
            </View>

            {/* Center Content */}
            <View style={styles.centerContent}>
              <Text style={styles.centerTitle}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾಯಾರಲಯ,{" "}
                <Text style={styles.kannadaText}>{gramPanchayat}</Text>, ತಾ ।{" "}
                <Text style={styles.kannadaText}>{taluka}</Text>
              </Text>
              <Text style={styles.centerSubtitle}>
                ಸಂ: ಗ್ರಾ.ಪಂ/ಮನರೇಗಾ/ಕಾ.ಆ.ಪ/2021-2022/25 ದಿನಾಂಕ :{" "}
                <Text style={styles.kannadaText}>{date}</Text>
              </Text>
              <Text style={styles.workOrderTitle}>ಕಾಮಗಾರಿ ಆದೇಶ ಪತ್ರ </Text>
            </View>

            {/* Right Logo */}
            <View style={styles.logoContainer}>
              <Image style={styles.logo} src={state_logo} />
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Subject Section */}
            <View style={styles.contentItem}>
              <Text style={styles.subjectText}>
                <Text style={styles.kannadaText}>ವಿಷಯ:</Text> ಮಹಾತ್ಮಾ ಗಾಂಧಿ
                ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗಾರಿ ಪಾತಣಿ ಯೋಜನೆಯಲ್ಲಿ ಕಾಮಗಾರಿಯನ್ನು{"\n"}
                {"         "} ಪ್ರಾರಂಭಿಸಲು "ಕಾಮಗಾರಿ ಆದೇಶ ಪತ್ರ" ನೀಡಿದ ಕುರಿತು.
              </Text>
            </View>

            <View style={styles.contentItem}>
              <Text style={styles.referenceText}>
                <Text style={styles.kannadaText}>ಉಲ್ಲೇಖ:</Text> ಮಹಾತ್ಮಾಗಾಂಧಿ
                ನರೇಗಾ ಯೋಜನೆಯ ಮಾರ್ಗಸೂಚಿ ಪ್ರಕಾರ{" "}
              </Text>
            </View>

            <View style={styles.starSeparator}>
              <Text>* * * * * *</Text>
            </View>

            {/* Main Paragraph */}
            <Text style={styles.mainParagraph}>
              ಮೇಲ್ಕಾಣಿಸಿದ ವಿಷಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ. 2021-2022 ನೇ ಸಾಲಿನ ಮಹಾತ್ಮಾಗಾಂಧಿ
              ನರೇಗಾ ಯೋಜನೆಯಡಿಯಲ್ಲಿ ಉದ್ಯೋಗ ಬಯಸಿ ಕೂಲಿ{""}ಕಾರರು ಈ ಕಾರ್ಯಾಲಯಕ್ಕೆ ಅರ್ಜಿ
              ಸಲ್ಲಿಸಿದ್ದು, ಸದರಿ ಅರ್ಜಿ ಪ್ರಕಾರ ಕೂಲಿಕಾರರಿಗೆ 15 ದಿವಸದೊಳಗಾಗಿ
              ಕೆಲಸವನ್ನು ಒದಗಿಸಬೇಕಾಗಿರುವುದರಿಂದ ಅನುಮೋದಿತ ಕ್ರೀ{""}ಯಾ ಯೋಜನೆಯಲ್ಲಿ
              ಅಳವಡಿಸಿದ ಈ ಕೆಳಕಂಡ ಕಾಮಗಾರಿಯನ್ನು ಈ ಕೆಳಗಿನ ಷರತ್ತಿಗೊಳಪಟ್ಟು
              ಕಾಮಗಾರಿಗಳನ್ನು ಪ್ರಾರಂಭಿಸಲು "ಕಾಮಗಾರಿ ಆದೇ{""}ಶ ಪತ್ರ ನೀಡಲಾಗಿದೆ. ಕಾರಣ
              ನಿಗದಿತ ಅವಧಿಯಲ್ಲಿ ಕಾಮಗಾರಿಯನ್ನು ಪ್ರಾರಂಭಿಸುವುದು.
            </Text>

            {/* Table */}
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, styles.serialCell]}>
                  ಅ ಸಂ
                </Text>
                <Text style={[styles.tableHeaderCell, styles.gramCell]}>
                  ಗ್ರಾಮ
                </Text>
                <Text style={[styles.tableHeaderCell, styles.workCodeCell]}>
                  ಕಾಮಗಾರಿ ಸಂಖ್ಯೆ
                </Text>
                <Text style={[styles.tableHeaderCell, styles.workNameCell]}>
                  ಕಾಮಗಾರಿ ಹೆಸರು
                </Text>
                <Text style={[styles.tableHeaderCell, styles.amountCell]}>
                  ಅಂದಾಜು ಮೊತ್ತ{"\n"}(ರೂ. ಗಳಲ್ಲಿ)
                </Text>
              </View>
              <View style={styles.tableDataRow}>
                <Text style={[styles.tableCell, styles.serialCell]}></Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.gramCell,
                    styles.kannadaText
                  ]}
                >
                  {grama}
                </Text>
                <Text style={[styles.tableCell, styles.workCodeCell]}>
                  {workCode}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.workNameCell,
                    styles.kannadaNormal
                  ]}
                >
                  {workName}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.amountCell,
                    styles.kannadaText
                  ]}
                >
                  {estimatedAmount}
                </Text>
              </View>
            </View>

            {/* Conditions List */}
            <View style={styles.conditionsSection}>
              <Text style={styles.conditionsTitle}>ಪರಿಸ್ಥಿತಿಗಳು :</Text>
              <Text style={styles.conditionItem}>
                1. ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆಗೆ ಸಂಬಂಧಿಸಿದ ಸಕಲ ಕಾರ್ಯಗಳಲ್ಲೇ
                ನುಪುಣತೆಯಲ್ಲಿ ಅಳವಡಿಸಿದ ಯೋಜನೆಗಳ ಒಳಗಡೆ ಕಾಮಗಾರಿ ಪ್ರಾರಂಭಿಸಬೇಕು.
              </Text>
              <Text style={styles.conditionItem}>
                2. ಕಾಮಗಾರಿ ಪ್ರಾರಂಭಿಸುವುದಕ್ಕಿಂತ ಮುಂಚಿತವಾಗಿ ಕಾಮಗಾರಿ ಸ್ಥಳದಲ್ಲಿ
                ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಫಲಕ (ಅಖ:) ಕಡ್ಡಾಯವಾಗಿ ಅಳವಡಿಸುವುದು. ಹಾಗೂ ಜಿಯೋ
                ಟ್ಯಾಗ ಮಾಡಿದ ಫೋಟೋ ಕಡತಕ್ಕೆ ಲಗತ್ತಿಸುವುದು.
              </Text>
              <Text style={styles.conditionItem}>
                3. ಅಂದಾಜು ಪತ್ರಿಕೆಯ ಪ್ರಕಾರ ಕಾಮಗಾರಿಗೆ ಬೇಕಾಗುವ ಸಾಮಗ್ರಿಗಳ ಪಟ್ಟಿ
                ಅವುಗಳ ಪ್ರಮಾಣದ (Qty) ಮಾಹಿತಿ ನೀಡುವುದು.
              </Text>
              <Text style={styles.conditionItem}>
                4. ಕಾಮಗಾರಿಯ ಮೂರು ಹಂತದ ಭಾವ ಚಿತ್ರಗಳನ್ನು ತೆಗೆದು ಕಾಮಗಾರಿ ಕಡತಕ್ಕೆ
                ಕಡ್ಡಾಯವಾಗಿ ಲಗತ್ತಿಸುವುದು.
              </Text>
              <Text style={styles.conditionItem}>
                5. ಅಂದಾಜು ಪತ್ರಿಕೆಯ ಪ್ರಕಾರ ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿ ಅನುಪಾತ ಪಾಲಿಸುವುದು
                ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮಟ್ಟದಲ್ಲಿ 60:40ರ ಅನುಪಾತ ಮೀರುವಂತಿಲ್ಲ.
              </Text>
              <Text style={styles.conditionItem}>
                6. ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನಗೊಳ್ಳುವ ಹಂತದಲ್ಲಿ ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ಸಂಬಂಧಪಟ್ಟ
                ದಾಖಲೆಗಳನ್ನು ಈ ಕಾರ್ಯಾಲಯಕ್ಕೆ ಸಲ್ಲಿಸುವುದು (ಜನರೆಟೆಡ್ ಎಂಐಎಸ್ ದಿನಾಂಕ
                ಮುಕ್ತಾಯವಾದ ಮರುದಿನ ಕೂಲಿಕಾರರ ಹಾಗೂ ನಿಮ್ಮ ಸಹಿ ಮತ್ತು ದಾಖಲಿಸಿದ ಅಳತೆ
                ಪುಸ್ತಕದೊಂದಿಗೆ MIS ಮಾಡಲು ಗ್ರಾಮ ಪಂಚಾಯತಿಗೆ ಹಾಜರಾಗುವುದು)
              </Text>
              <Text style={styles.conditionItem}>
                7. ಸಾಮಗ್ರಿ ಮೊತ್ತ ಪಾವತಿಸುವುದರಲ್ಲಿ ನಿಯಮಾನುಸಾರ ಸರಕಾರಕ್ಕೆ
                ಸಂದಾಯವಾಗಬೇಕಾದ ಆದಾಯ ತರಿಗೆ, ರಾಜಧನ ಮತ್ತು ಜಿ.ಎಸ್.ಟಿ.ಗಳನ್ನು
                ಕಡ್ಡಾಯವಾಗಿ ಬಿಲ್ಲಿನಲ್ಲಿ ಕಡಿತ ಮಾಡುವುದು.
              </Text>
              <Text style={styles.conditionItem}>
                8. ಯೋಜನೆಯ ಮಾರ್ಗಸೂಚಿಯಲ್ಲಿ ಅನುಮತಿಸಿದ ಯಂತ್ರಗಳನ್ನು ಹೊರತುಪಡಿಸಿ ಬೇರೆ
                ಯಂತ್ರಗಳನ್ನು ಬಳಸುವಂತಿಲ್ಲ. ಮತ್ತು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಗುತ್ತಿಗೆದಾರರಿಗೆ
                ಅವಕಾಶವಿರುವುದಿಲ್ಲ.
              </Text>
              <Text style={styles.conditionItem}>
                9. ಕಾಮಗಾರಿ ಮುಕ್ತಾಯಗೊಂಡ ನಂತರ "ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು
                ಕಡತಕ್ಕೆ ಲಗತ್ತಿಸುವುದು.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerRight}>
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                ಪಂಚಾಯತಿ ಅಧ್ಯಕ್ಷರ ಅಭಿಪ್ರಾಯಗಳು / ಅಧ್ಯಕ್ಷರು
              </Text>
              <Text style={styles.footerBold}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ{" "}
                <Text style={styles.kannadaText}>{gramPanchayat}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerText}>ಗೆ,</Text>
              <Text style={styles.footerText}>ತಾಂತ್ರಿಕ ಸಹಾಯಕರು/ಬಿ.ಎಫ್.ಟಿ</Text>
              <Text style={styles.footerText}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ,{" "}
                <Text style={styles.kannadaText}>{gramPanchayat}</Text>
              </Text>
              <View style={styles.footerleftbottom}>
                <Text style={styles.footerBold}>ಪ್ರತಿ ಮಾಹಿತಿಗಾಗಿ:</Text>
                <Text style={styles.footerText}>
                  ಮಾನ್ಯ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಗಳು ತಾಲೂಕ ಪಂಚಾಯತಿ,{" "}
                  <Text style={styles.kannadaText}>{taluka}</Text> ರವರಿಗೆ
                  ಗೌರವಗಳೊಂದಿಗೆ ಮಾಹಿತಿಗಾಗಿ ಸಲ್ಲಿಸಿದೆ.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default WorkOrderPDF;
export type { WorkOrderProps, WorkData };
