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
  fontWeight: "bold"
});

// Type definitions
type TechnicalSanctionPDFProps = {
  sanctionDate?: string;
  workCode?: string;
  financialYear?: string;
  workName?: string;
  gramPanchayat?: string;
  blockPanchayat?: string;
  sanctionedAmount?: string;
  sanctionedAmountInWords?: string;
  technicalSanctionNo?: string;
  sanctionDateFormatted?: string;
  unskilledLabourCharges?: string;
  estimateMaterialCost?: string;
  estimatePersonDays?: string;
};

type TsData = {
  tsData: TechnicalSanctionPDFProps;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.3,
    padding: 24,
    backgroundColor: "white"
  },
  container: {
    border: "2px solid black",
    padding: 24,
    backgroundColor: "white"
  },
  header: {
    textAlign: "center",
    marginBottom: 16
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  dateSection: {
    marginBottom: 16,
    textAlign: "right"
  },
  dateText: {
    fontWeight: "normal",
    fontSize: 12
  },
  workNameSection: {
    marginBottom: 24,
    textAlign: "center"
  },
  workNameItem: {
    marginBottom: 8
  },
  workNameBold: {
    fontWeight: "bold",
    fontSize: 12
  },
  panchayatSection: {
    marginBottom: 24
  },
  panchayatItem: {
    marginBottom: 8
  },
  panchayatMedium: {
    fontWeight: "normal",
    fontSize: 12
  },
  mainContent: {
    marginBottom: 24,
    textAlign: "justify",
    lineHeight: 1
  },
  mainParagraph: {
    fontSize: 12,
    fontWeight: "normal"
  },
  financialSection: {
    marginBottom: 24
  },
  financialItem: {
    marginBottom: 4,
    fontWeight: "normal",
    fontSize: 12
  },
  authoritySection: {
    marginBottom: 32
  },
  authorityItem: {
    marginBottom: 8
  },
  authorityMedium: {
    fontWeight: "normal",
    fontSize: 12
  },
  signatureSection: {
    textAlign: "right"
  },
  signatureItem: {
    marginBottom: 8
  },
  signatureMedium: {
    fontWeight: "normal",
    fontSize: 12
  },
  kannadaText: {
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  englishText: {
    fontFamily: "Helvetica",
    fontWeight: "normal"
  }
});

const TechnicalSanctionPDF: React.FC<TsData> = ({ tsData }) => {
  const {
    sanctionDate,
    workCode,
    financialYear,
    workName,
    gramPanchayat,
    blockPanchayat,
    sanctionedAmount,
    sanctionedAmountInWords,
    technicalSanctionNo,
    sanctionDateFormatted,
    unskilledLabourCharges,
    estimateMaterialCost,
    estimatePersonDays
  } = tsData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>TECHNICAL SANCTION FOR WORKS</Text>
          </View>

          {/* Date */}
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>Date : {sanctionDate}</Text>
          </View>

          {/* Work Name Section - Centered and Bold */}
          <View style={styles.workNameSection}>
            <View style={styles.workNameItem}>
              <Text style={styles.workNameBold}>
                Work Name : Mahatma Gandhi NREGA Construction of :-{" "}
              </Text>
            </View>
            <View style={styles.workNameItem}>
              <Text style={styles.workNameBold}>
                <Text style={styles.englishText}>
                  {workCode} - {financialYear}
                </Text>{" "}
                <Text style={styles.kannadaText}>{workName}</Text>
              </Text>
            </View>
          </View>

          {/* Panchayat Details */}
          <View style={styles.panchayatSection}>
            <View style={styles.panchayatItem}>
              <Text style={styles.panchayatMedium}>
                Gram Panchayat : {gramPanchayat}
              </Text>
            </View>
            <View>
              <Text style={styles.panchayatMedium}>
                Block Panchayat : {blockPanchayat}
              </Text>
            </View>
          </View>

          {/* Main Content Paragraph */}
          <View style={styles.mainContent}>
            <Text style={styles.mainParagraph}>
              The items and Provisions proposed in the estimate are realistic
              and basically required for this work, prepared & submitted by the
              preparatory Officer are considered and verified. The items and
              Provisions proposed in the estimate are in accordance with the
              relevant specification and Guidelines in vogue. The tasks
              generated with respect to the items are relevant and suitable.This
              Estimate is technically Sanctioned for Rs {sanctionedAmount}/- (
              {sanctionedAmountInWords}), vide TSR No Technical Sanction No.{" "}
              {technicalSanctionNo} date {sanctionDateFormatted},
            </Text>
          </View>

          {/* Financial Details */}
          <View style={styles.financialSection}>
            <View style={styles.financialItem}>
              <Text>Labour Charges (Unskilled): {unskilledLabourCharges}</Text>
            </View>
            <View style={styles.financialItem}>
              <Text>Materials : {estimateMaterialCost}</Text>
            </View>
            <View style={styles.financialItem}>
              <Text>Lumpsum : 0</Text>
            </View>
            <View style={styles.financialItem}>
              <Text>Admin Lumpsum : 0.00</Text>
            </View>
            <View style={styles.financialItem}>
              <Text>Number of man days : {estimatePersonDays}</Text>
            </View>
          </View>

          {/* Authority Section */}
          <View style={styles.authoritySection}>
            <View style={styles.authorityItem}>
              <Text style={styles.authorityMedium}>
                Technical sanction given by : (AEE) {blockPanchayat} .
              </Text>
            </View>
          </View>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureItem}>
              <Text style={styles.signatureMedium}>-sd</Text>
            </View>
            <View>
              <Text style={styles.signatureMedium}>(AEE) {blockPanchayat}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TechnicalSanctionPDF;
export type { TechnicalSanctionPDFProps, TsData };
