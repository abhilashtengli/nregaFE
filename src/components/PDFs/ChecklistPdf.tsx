import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf",
  fontWeight: "normal"
});

Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "normal"
});

// Type definitions
type checklistData = {
  workCode: string;
  workName: string;
  sanctionYear: string;
  panchayat: string; // kannada
  block: string; // kannada
};

type ChecklistPDFProps = {
  checklistData: checklistData;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.1,
    padding: 20,
    backgroundColor: "white"
  },
  container: {
    border: "2px solid black",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  header: {
    textAlign: "center",
    marginBottom: 8
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "normal",
    marginBottom: 12,
    fontFamily: "NotoSansKannada"
  },
  headerSubtitle: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  documentInfo: {
    marginBottom: 8,
    marginLeft: 20
  },
  infoRow: {
    marginBottom: 10,
    flexDirection: "row"
  },
  infoLabel: {
    fontWeight: "normal",
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  infoValue: {
    fontSize: 9,
    fontFamily: "NotoSansKannada"
  },
  table: {
    width: "100%"
  },
  tableHeader: {
    flexDirection: "row",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black"
  },
  tableRow: {
    flexDirection: "row",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    minHeight: 20
  },
  serialCell: {
    width: "8%",
    padding: 3,
    borderRight: "1px solid black",
    textAlign: "center",
    justifyContent: "center"
  },
  checklistCell: {
    width: "60%",
    padding: 3,
    borderRight: "1px solid black"
  },
  requiredCell: {
    width: "16%",
    padding: 3,
    borderRight: "1px solid black",
    textAlign: "center",
    justifyContent: "center"
  },
  pagesCell: {
    width: "16%",
    padding: 3,
    textAlign: "center",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 6,
    paddingTop: 8,
    fontFamily: "NotoSansKannada"
  },
  serialText: {
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 6
  },
  kannadaText: {
    fontWeight: "normal",
    marginBottom: 1,
    fontSize: 6,
    fontFamily: "NotoSansKannada"
  },
  englishText: {
    fontSize: 6
  },
  centeredText: {
    textAlign: "center",
    fontSize: 6,
    fontFamily: "NotoSansKannada"
  },
  emptyRow: {
    minHeight: 15
  },
  signatureSection: {
    marginTop: 18,
    alignItems: "flex-end"
  },
  signatureText: {
    fontSize: 7,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  }
});

const ChecklistPDF = ({ checklistData }: ChecklistPDFProps) => {
  const gramPanchayat = checklistData?.panchayat || "";
  const workName = checklistData?.workName || "";
  const workCode = checklistData?.workCode || "";
  const sanctionedYear = checklistData?.sanctionYear || "";

  const checklistItems = [
    {
      sl: 1,
      kannada: "ಅನುಮೋದಿತ ಕಾರ್ಯಯೋಜನೆ/ಕಾರ್ಯಪಟ್ಟಿ (ಯೋಜನೆಯ ಸಂಖ್ಯೆಯನ್ನು ಉಲ್ಲೇಖಿಸಿ)",
      english:
        "Copy of Approved Action Plan/ Shelf of Work (Mentioning Serial. No. of theproject)",
      required: "ಹೌದು",
      pages: "1"
    },
    {
      sl: 2,
      kannada: "ತಾಂತ್ರಿಕ ಅಂದಾಜು ಮತ್ತು ವಿನ್ಯಾಸ ಪ್ರತಿ",
      english: "Copy of technical estimate and design",
      required: "ಹೌದು",
      pages: "2"
    },
    {
      sl: 3,
      kannada: "ತಾಂತ್ರಿಕ ಅನುಮೋದನೆಯ ಪ್ರತಿ",
      english: "Copy of Technical Sanction",
      required: "ಹೌದು",
      pages: "3-4"
    },
    {
      sl: 4,
      kannada: "ಆಡಳಿತ / ಹಣಕಾಸಿನ ಅನುಮೋದನೆಯ ಪ್ರತಿ",
      english: "Copy of Administrative/ Financial Sanction",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 5,
      kannada: "ಒಗ್ಗೂಡಿಕೆ ವಿವರಗಳು, ಅನ್ವಯಿಸಿದರೆ",
      english: "Convergence Details, if applicable",
      required: "ಇಲ್ಲ",
      pages: ""
    },
    {
      sl: 6,
      kannada: "ಕೆಲಸಗಾರರಿಂದ ಬೇಡಿಕೆ ಅರ್ಜಿ (ನಮೂನೆ- 6)",
      english: "Demand Application by workers",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 7,
      kannada: "ಕೆಲಸ ಹಂಚಿಕೆ ನೋಟೀಸ್ ಪ್ರತಿ (ನಮೂನೆ- 8)",
      english: "Copy of Work Allocation Notice",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 8,
      kannada: "ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ ಕಿರಿಯ ಸಹಾಯಕ ನೋಟೀಸ್ (ನಮೂನೆ- 9)",
      english: "Copy of Form 9",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 9,
      kannada: "ಮೂಲಗಂಗಡಿ ಮುಸ್ತರ್ ರೋಲ್ ಪ್ರತಿ",
      english: "Copy of filled in Muster Rolls",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 10,
      kannada: "ಮಾಪಕ ಪುಸ್ತಕ ಪ್ರತಿ (ರಾಜ್ಯದಲ್ಲಿ ಎಂ.ಬಿ ನಿರ್ವಹಿಸಿದ್ದರೆ)",
      english:
        "Copy of Measurement Books (copy of e-MB if maintained by the State)",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 11,
      kannada:
        "ಸಾಮಗ್ರಿಗಳ ಸಂಗ್ರಹಣೆಗಾಗಿ ಕೋಟೇಶನ್ ಆಹ್ವಾನ ಪ್ರತಿ,ತುಲನಾತ್ಮಕ ಹೇಳಿಕೆ ಮತ್ತು ಸಾಮಗ್ರಿ ಪೂರೈಕೆ ಆದೇಶ ಪ್ರತಿ",
      english:
        "Copy of quotations invited for procurement of materials, comparative statement and material supply order.",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 12,
      kannada: "ಕೂಲಿಪಟ್ಟಿ",
      english: "Wage List",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 13,
      kannada: "ಕೂಲಿ ಮತ್ತು ಸಾಮಗ್ರಿ ಪಾವತಿ ಎಫ್.ಟಿ.ಒ.ಗಳು",
      english: "Copy of wage and material payment FTOs",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 14,
      kannada: "ಸಾಮಗ್ರಿ ವೋಚರ್ ಮತ್ತು ಬಿಲ್ಲುಗಳು",
      english: "Material Voucher and Bills",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 15,
      kannada: "ರಾಯಾಲ್ಟಿ ಪಾವತಿ ರಸೀದಿಗಳ ಪ್ರತಿ",
      english: "Copies of the receipts of royalty paid",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 16,
      kannada:
        "ಮೂರು ಹಂತಗಳಲ್ಲಿ ಕಾರ್ಯಗಳ ಛಾಯಾಚಿತ್ರ (ಪ್ರಾರಂಭ ಮುಂಚೆ, ಕಾರ್ಯಗಳ ನಡುವೆ ಮತ್ತು ನಂತರ)",
      english: "Photograph of work at three stages (Pre, during and post)",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 17,
      kannada: "ಕಾರ್ಯಗಳ ಪೂರ್ಣಗೊಳ್ಳಿ ಪ್ರಮಾಣ ಪತ್ರದ ಪ್ರತಿ",
      english: "Copy of Work Completion Certificate",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 18,
      kannada: "ಮಸ್ತರ್ ರೋಲ್ ಚಲನೆ ಪತ್ರ",
      english: "Muster Roll Movement Slip",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 19,
      kannada: "ಸ್ಥಿತಿ ಸೂಚಕ ಛಾಯಾಚಿತ್ರ",
      english: "Geo-tagged photograph of the asset",
      required: "ಹೌದು",
      pages: ""
    },
    {
      sl: 20,
      kannada: "ಸಾಮಾಜಿಕ ಲೇಖ ಪರಿಶೋಧನೆಯ ಪ್ರತಿ (ಈಗಾಗಲೇ ನಡೆಸಿದ್ದರೆ)",
      english: "Copy of Social Audit Report, if already conducted",
      required: "ಇಲ್ಲ",
      pages: ""
    },
    {
      sl: 21,
      kannada: "ನಾಗರಿಕ ಮಾಹಿತಿ ಪಟ್ಟಿ",
      english: "Civic Information Board (CIB)",
      required: "ಹೌದು",
      pages: ""
    }
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              ಗ್ರಾಮ ಪಂಚಾಯಿತಿ: {gramPanchayat}
            </Text>
            <Text style={styles.headerSubtitle}>
              ಅನುಬಂಧ - II: ಕಾಮಗಾರಿ ಕಡತದ ಚಿಕ್ ಲಿಸ್ಟ
            </Text>
          </View>

          {/* Document Info */}
          <View style={styles.documentInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ಕಾಮಗಾರಿ ಹೆಸರು: </Text>
              <Text style={styles.infoValue}>{workName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ಕಾಮಗಾರಿ ಸಂಖ್ಯೆ ಸಂಬಂಧ: </Text>
              <Text style={styles.infoValue}>{workCode}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ಕಾಮಗಾರಿಮಂಜೂರಾದ ವರ್ಷ: </Text>
              <Text style={styles.infoValue}>{sanctionedYear}</Text>
            </View>
          </View>

          {/* Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.serialCell}>
                <Text style={styles.headerText}>ಕ್ರ.ಸಂ</Text>
              </View>
              <View style={styles.checklistCell}>
                <Text style={styles.headerText}> ಚಿಕ್ ಲಿಸ್ಟ</Text>
              </View>
              <View style={styles.requiredCell}>
                <Text style={styles.headerText}>
                  ಅಗತ್ಯವಿರುವ ಗಿಲ್ಲಟ್ಟಿ (ಇಲ್ಲ/ಹೌದು)
                </Text>
              </View>
              <View style={styles.pagesCell}>
                <Text style={styles.headerText}>ಪುಟಗಳ ಸಂಖ್ಯೆ ಪ್ರತಿ ಸಂಖ್ಯೆ</Text>
              </View>
            </View>

            {/* Table Rows */}
            {checklistItems.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.serialCell}>
                  <Text style={styles.serialText}>{item.sl}</Text>
                </View>
                <View style={styles.checklistCell}>
                  <Text style={styles.kannadaText}>{item.kannada}</Text>
                  <Text style={styles.englishText}>{item.english}</Text>
                </View>
                <View style={styles.requiredCell}>
                  <Text style={styles.centeredText}>{item.required}</Text>
                </View>
                <View style={styles.pagesCell}>
                  <Text style={styles.centeredText}>{item.pages}</Text>
                </View>
              </View>
            ))}

            {/* Empty rows */}
            {[...Array(2)].map((_, index) => (
              <View
                key={`empty-${index}`}
                style={[styles.tableRow, styles.emptyRow]}
              >
                <View style={styles.serialCell}>
                  <Text></Text>
                </View>
                <View style={styles.checklistCell}>
                  <Text></Text>
                </View>
                <View style={styles.requiredCell}>
                  <Text></Text>
                </View>
                <View style={styles.pagesCell}>
                  <Text></Text>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom Right Signature */}
          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>
              ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ChecklistPDF;
export type { ChecklistPDFProps, checklistData };
