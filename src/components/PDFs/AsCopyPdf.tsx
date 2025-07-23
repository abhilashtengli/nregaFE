import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Type definitions
type AdministrativeSanctionPDFProps = {
  administrativeSanctionDate?: string;
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

type ASData = {
  asData: AdministrativeSanctionPDFProps;
};

import { Font } from "@react-pdf/renderer";

// Register Regular font
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf",
  fontWeight: "normal"
});

// Register Bold font
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansKannada",
    fontSize: 12,
    lineHeight: 1.1,
    padding: 30,
    backgroundColor: "white"
  },
  boldText: {
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  container: {
    maxWidth: "100%",
    padding: 24,
    backgroundColor: "white",
    border: "2px solid black"
  },
  header: {
    textAlign: "center",
    marginBottom: 15
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  dateSection: {
    marginBottom: 15,
    textAlign: "right"
  },
  dateMedium: {
    fontWeight: "normal"
  },
  workNameSection: {
    marginBottom: 24,
    textAlign: "center"
  },
  workNameItem: {
    marginBottom: 10
  },
  workNameBold: {
    fontWeight: "bold"
  },
  panchayatSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24
  },
  panchayatContent: {
    flex: 1
  },
  panchayatItem: {
    marginBottom: 8
  },
  panchayatMedium: {
    fontWeight: 500
  },
  mainContent: {
    marginBottom: 24,
    textAlign: "justify",
    lineHeight: 1.1
  },
  financialSection: {
    marginBottom: 24
  },
  financialItem: {
    marginBottom: 4,
    fontWeight: 500
  },
  authoritySection: {
    marginBottom: 32
  },
  authorityItem: {
    marginBottom: 8
  },
  authorityMedium: {
    fontWeight: 500
  },
  signatureSection: {
    textAlign: "right"
  },
  signatureItem: {
    marginBottom: 8
  },
  signatureMedium: {
    fontWeight: 500
  }
});

// Main PDF Component
const AdministrativeSanctionPDF = ({ asData }: ASData) => {
  const {
    administrativeSanctionDate,
    workCode,
    financialYear,
    workName,
    gramPanchayat,
    blockPanchayat,
    sanctionedAmount,
    sanctionedAmountInWords,
    technicalSanctionNo,
    unskilledLabourCharges,
    estimateMaterialCost,
    estimatePersonDays
  } = asData;

  const estimatedMaterialCost = estimateMaterialCost || "0";
  const proceedingsNo = technicalSanctionNo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              ADMINISTRATIVE/FINANCIAL SANCTION FOR WORKS
            </Text>
          </View>

          {/* Date */}
          <View style={styles.dateSection}>
            <Text style={styles.dateMedium}>
              Dated : {administrativeSanctionDate}
            </Text>
          </View>

          {/* Work Name Section - Centered and Bold */}
          <View style={styles.workNameSection}>
            <View style={styles.workNameItem}>
              <Text style={styles.workNameBold}>
                Work Name: Mahatma Gandhi NREGA Construction of{" "}
              </Text>
            </View>
            <View style={styles.workNameItem}>
              <Text
                style={[styles.workNameBold, { fontFamily: "NotoSansKannada" }]}
              >
                {workCode} - {financialYear} {workName}
              </Text>
            </View>
          </View>

          {/* Panchayat Details */}
          <View style={styles.panchayatSection}>
            <View style={styles.panchayatContent}>
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
          </View>

          {/* Main Content Paragraph */}
          <View style={styles.mainContent}>
            <Text>
              Considering importance and necessity of the work and resolute by
              the Panchayat, {gramPanchayat} and Technically Approved /
              Sanctioned vide TSR No {technicalSanctionNo} ,the estimate of the
              proposed work has been accorded Administrative Sanction for Rs{" "}
              {sanctionedAmount} /- ({sanctionedAmountInWords}) vide Proceedings
              No. {proceedingsNo} date {administrativeSanctionDate},
            </Text>
          </View>

          {/* Financial Details */}
          <View style={styles.financialSection}>
            <View style={styles.financialItem}>
              <Text>Labour Charges (Unskilled): {unskilledLabourCharges}</Text>
            </View>
            <View style={styles.financialItem}>
              <Text>Materials : {estimatedMaterialCost}</Text>
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
                Administrative sanction given by : (PDO) {gramPanchayat}.
              </Text>
            </View>
          </View>

          {/* Signature Section */}
          <View style={styles.signatureSection}>
            <View style={styles.signatureItem}>
              <Text style={styles.signatureMedium}>-sd</Text>
            </View>
            <View>
              <Text style={styles.signatureMedium}>(PDO) {gramPanchayat}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AdministrativeSanctionPDF;
export type { AdministrativeSanctionPDFProps, ASData };
