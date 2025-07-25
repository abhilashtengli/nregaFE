import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

// Register Kannada fonts
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
  id: string;
  workCode: string;
  workName: string;
  sanctionYear: string;
  panchayat: string;
  block: string;
};

type GramPanchayatChecklistProps = {
  workData: WorkData;
};

// Styles - Exact match to your original layout
const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansKannada",
    fontSize: 11,
    lineHeight: 1.2,
    padding: 30,
    backgroundColor: "white"
  },
  container: {
    maxWidth: "100%",
    backgroundColor: "white"
  },
  // Header with decorative border
  headerContainer: {
    border: "4px solid black",
    borderStyle: "solid", // PDF doesn't support double border, using solid
    padding: 16,
    marginBottom: 24
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: 16
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "NotoSansKannada"
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "NotoSansKannada"
  },
  // Document Header Info
  infoSection: {
    marginBottom: 16
  },
  infoItem: {
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  // Table styles using flexbox
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  tableRow: {
    flexDirection: "row"
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6" // bg-gray-100 equivalent
  },
  // Table cells
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    borderLeftWidth: 0, // Remove left border to avoid double borders
    borderTopWidth: 0 // Remove top border to avoid double borders
  },
  tableCellCenter: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    textAlign: "center",
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    borderLeftWidth: 0, // Remove left border to avoid double borders
    borderTopWidth: 0, // Remove top border to avoid double borders
    alignItems: "center",
    justifyContent: "center"
  },
  // Column widths using flex
  slNoCell: {
    width: "8%",
    minWidth: "8%",
    maxWidth: "8%"
  },
  contentCell: {
    width: "64%",
    minWidth: "64%",
    maxWidth: "64%"
  },
  requiredCell: {
    width: "14%",
    minWidth: "14%",
    maxWidth: "14%"
  },
  pagesCell: {
    width: "14%",
    minWidth: "14%",
    maxWidth: "14%"
  },
  // Content within cells
  cellContent: {
    fontFamily: "NotoSansKannada"
  },
  kannadaText: {
    fontWeight: "500",
    fontFamily: "NotoSansKannada",
    marginBottom: 4
  },
  englishText: {
    fontSize: 9,
    color: "#4b5563", // text-gray-600 equivalent
    fontStyle: "italic",
    fontFamily: "Helvetica"
  }
});

const ChecklistPDF = ({ workData }: GramPanchayatChecklistProps) => {
  const gramPanchayat = workData?.panchayat || "";
  const workName = workData?.workName || "";
  const workCode = workData?.workCode || "";
  const sanctionedYear = workData?.sanctionYear || "";

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
          {/* Header with decorative border */}
          <View style={styles.headerContainer}>
            <View style={styles.headerTitle}>
              <Text style={styles.mainTitle}>
                ಗ್ರಾಮ ಪಂಚಾಯಿತಿ: {gramPanchayat}
              </Text>
              <Text style={styles.subTitle}>
                ಅನುಬಂಧ - II:ಪ್ರಮಾಣ ಪತ್ರದ ಜೊತೆ ಲೇಖೆ
              </Text>
            </View>

            {/* Document Header Info */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.cellContent}>
                  <Text style={styles.bold}>ಕಾರ್ಯಗಳ ಹೆಸರು:</Text> {workName}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.cellContent}>
                  <Text style={styles.bold}>ಕಾರ್ಯಗಳ ಸಂಖ್ಯೆ ಸಂಬಂಧ:</Text>{" "}
                  {workCode}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.cellContent}>
                  <Text style={styles.bold}>ಕಾರ್ಯಗಳ ಅನುಮೋದನ ವರ್ಷ:</Text>{" "}
                  {sanctionedYear}
                </Text>
              </View>
            </View>

            {/* Checklist Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <View style={[styles.tableCellCenter, styles.slNoCell]}>
                  <Text style={styles.cellContent}>ಕ್ರ.ಸಂ</Text>
                </View>
                <View style={[styles.tableCellCenter, styles.contentCell]}>
                  <Text style={styles.cellContent}>ಲೇಖೆ ಲಿಸ್ಟ್</Text>
                </View>
                <View style={[styles.tableCellCenter, styles.requiredCell]}>
                  <Text style={styles.cellContent}>
                    ಅಗತ್ಯವಿರುವ ಗಿಲ್ಲಟ್ಟಿ (ಇಲ್ಲ/ಹೌದು)
                  </Text>
                </View>
                <View style={[styles.tableCellCenter, styles.pagesCell]}>
                  <Text style={styles.cellContent}>
                    ಪುಟಗಳ ಸಂಖ್ಯೆ ಪ್ರತಿ ಸಂಖ್ಯೆ
                  </Text>
                </View>
              </View>

              {/* Table Body */}
              {checklistItems.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCellCenter, styles.slNoCell]}>
                    <Text style={[styles.cellContent, styles.bold]}>
                      {item.sl}
                    </Text>
                  </View>
                  <View style={[styles.tableCell, styles.contentCell]}>
                    <Text style={styles.kannadaText}>{item.kannada}</Text>
                    <Text style={styles.englishText}>{item.english}</Text>
                  </View>
                  <View style={[styles.tableCellCenter, styles.requiredCell]}>
                    <Text style={styles.cellContent}>{item.required}</Text>
                  </View>
                  <View style={[styles.tableCellCenter, styles.pagesCell]}>
                    <Text style={styles.cellContent}>{item.pages}</Text>
                  </View>
                </View>
              ))}

              {/* Empty rows for additional items */}
              {[...Array(3)].map((_, index) => (
                <View key={`empty-${index}`} style={styles.tableRow}>
                  <View style={[styles.tableCellCenter, styles.slNoCell]}>
                    <Text style={styles.cellContent}></Text>
                  </View>
                  <View style={[styles.tableCell, styles.contentCell]}>
                    <Text style={styles.cellContent}></Text>
                  </View>
                  <View style={[styles.tableCellCenter, styles.requiredCell]}>
                    <Text style={styles.cellContent}></Text>
                  </View>
                  <View style={[styles.tableCellCenter, styles.pagesCell]}>
                    <Text style={styles.cellContent}></Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ChecklistPDF;
export type { WorkData, GramPanchayatChecklistProps };
