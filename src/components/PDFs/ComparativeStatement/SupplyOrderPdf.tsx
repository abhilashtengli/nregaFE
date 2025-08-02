import type React from "react";
import { Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
// NOTE: The asset paths are placeholders. You should replace them with your actual asset paths.
import mnreaga from "@/assets/MGNREGA logo.jpg";
import emblem from "@/assets/State embalm.jpeg";
import state_logo from "@/assets/State logo.jpeg";

// Font registration for Kannada text
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
type VendorQuotationData = {
  slNo: number;
  materialName: string;
  quantity: string;
  unit: string;
  rate: string;
  contractor1Rate: string;
  contractor2Rate: string;
  contractor3Rate: string;
};

export type SupplyOrderProps = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  winnerContractorName: string;
  winnerContractorGst: string;
  winnerQuotationSubmissionDate: string;
  vendorWithVendorQuotation: VendorQuotationData[];
  address?: string;
};

// Styles for portrait orientation with reduced spacing
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.2,
    padding: 34, // 12mm converted to points
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  // Header section styles
  headerSection: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12 // Reduced margin
  },
  logoContainer: {
    width: 64, // Slightly smaller logos (14 * 4)
    height: 64
  },
  leftlogoContainer: {
    width: 74, // Slightly smaller logos (14 * 4)
    height: 64
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  centerHeader: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 12 // Reduced margin
  },
  centerEmblem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4
  },
  karnatakaSarkar: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  emblemContainer: {
    width: 44, // Smaller center logo
    height: 44,
    marginHorizontal: 8
  },
  headerText: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    marginBottom: 4,
    fontWeight: "bold"
  },
  headerSubText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  refNumAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  referenceNumber: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold"
  },
  date: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "right",
    marginBottom: 12, // Reduced margin
    fontWeight: "bold"
  },
  title: {
    fontSize: 10, // Reduced font size
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    marginLeft: 32,
    marginBottom: 12 // Reduced margin
  },
  subjectSection: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    marginBottom: 12,
    marginLeft: 32
  },
  subjectContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    flex: 1,
    lineHeight: 1.5
  },
  subjectRow: {
    flexDirection: "row",
    marginBottom: 16
  },
  subjectLabel: {
    fontWeight: "bold"
  },
  referenceSection: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    marginBottom: 24, // Reduced margin,
    flexDirection: "row"
  },
  referenceLabel: {
    fontWeight: "bold"
  },
  referenceContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    lineHeight: 1.5,
    flex: 1
  },
  separatorLine: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 12 // Reduced margin
  },
  mainContent: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    textAlign: "justify",
    lineHeight: 1.6, // Reduced line height
    marginBottom: 16,
    letterSpacing: 0.25
  },
  // Table styles
  table: {
    marginBottom: 16
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 4
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 4,
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellHeading: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    padding: 4,
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellSlno: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    padding: 4,
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellSlnoHeading: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    padding: 4,
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },
  // Table column widths
  slNoCell: {
    width: "12%"
  },
  materialNameCell: {
    width: "50%",
    textAlign: "left"
  },
  quantityCell: {
    width: "19%"
  },
  rateCell: {
    width: "19%"
  },
  // Footer styles
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24 // Reduced margin
  },
  leftFooter: {
    flex: 1
  },
  rightFooter: {
    flex: 1,
    textAlign: "right"
  },
  footerText: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    marginBottom: 4 // Reduced margin
  },
  footerTextGst: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    marginBottom: 4 // Reduced margin
  },
  footerLabel: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    fontWeight: "normal",
    marginBottom: 4 // Reduced margin
  },
  highlight: {
    fontWeight: "bold",
    textDecoration: "underline"
  },
  signatureTitle: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  signatureLocation: {
    fontSize: 10, // Reduced font size
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    marginRight: 44,
    marginTop: 8
  }
});

const SupplyOrderPDF: React.FC<SupplyOrderProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  winnerContractorName,
  winnerContractorGst,
  winnerQuotationSubmissionDate,
  vendorWithVendorQuotation,
  address = ""
}) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.leftlogoContainer}>
            <Image
              style={styles.logo}
              src={
                mnreaga ||
                "/placeholder.svg?height=64&width=74&query=MGNREGA+logo"
              }
            />
          </View>
          <View style={styles.centerHeader}>
            <View style={styles.centerEmblem}>
              <Text style={styles.karnatakaSarkar}>ಕರ್ನಾಟಕ</Text>
              <View style={styles.emblemContainer}>
                <Image
                  style={styles.logo}
                  src={
                    emblem ||
                    "/placeholder.svg?height=44&width=44&query=State+emblem"
                  }
                />
              </View>
              <Text style={styles.karnatakaSarkar}>ಸರ್ಕಾರ</Text>
            </View>
            <Text style={styles.headerText}>
              ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ|| {district}
            </Text>
            <Text style={styles.headerSubText}>
              ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ{" "}
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              src={
                state_logo ||
                "/placeholder.svg?height=64&width=64&query=State+logo"
              }
            />
          </View>
        </View>
        <View style={styles.refNumAndDate}>
          <Text style={styles.referenceNumber}>
            ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ಸಾ.ಸ.ಆ/{year}
          </Text>
          <Text style={styles.date}>ದಿನಾಂಕ: {tenderPublishDate}</Text>
        </View>
        <Text style={styles.title}>ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ </Text>
        <View style={styles.subjectSection}>
          <View style={styles.subjectRow}>
            <Text style={styles.subjectLabel}>ವಿಷಯ: </Text>
            <Text style={styles.subjectContent}>
              ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುವ
              ಕಾಮಗಾರಿಗಳಿಗೆ ಸಾಮಗ್ರಿ{"\n"} ಸರಬರಾಜು ಮಾಡುವ ಕುರಿತು{" "}
            </Text>
          </View>
          <View style={styles.referenceSection}>
            <Text style={styles.referenceLabel}>ಉಲ್ಲೇಖ : </Text>
            <Text style={styles.referenceContent}>
              ಈ ಕಛೇರಿ ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ದಿನಾಂಕ : {tenderPublishDate}
              {"\n"}2) ನೀವು ಸಲ್ಲಿಸಿರುವ ದರಪಟ್ಟಿ ದಿನಾಂಕ:{" "}
              {winnerQuotationSubmissionDate}
            </Text>
          </View>
        </View>
        <Text style={styles.separatorLine}>********</Text>
        <Text style={styles.mainContent}>
          ಈ ಮೇಲ್ಕಂಡ ವಿಷಯ ಹಾಗೂ ಉಲ್ಲೇಖಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ {year} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ
          ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುತ್ತಿರುವ{" "}
          {workName}({workCode})ಕಾಮಗಾರಿಗಾಗಿ ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು ಮಾಡಲು ಉಲ್ಲೇಖ
          (1)ರ ಪ್ರಕಾರ ದರಪಟ್ಟಿಯನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿದ್ದು, ಉಲ್ಲೇಖ (2)ರ ಪ್ರಕಾರ ನೀವು
          ಗ್ರಾಮ ಪಂಚಾಯತಿ ವಿಧಿಸಿರುವ ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಂಡು ಸಲ್ಲಿಸಿರುವ
          ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಲಾಗಿದ್ದು, ಸದರಿ ದರಪಟ್ಟಿಯಂತೆ ಈ ಕೆಳಕಂಡ ದರಗಳಲ್ಲಿ
          ಜಿ.ಎಸ್.ಟಿ. ಬಿಲ್ಲಿನೊಂದಿಗೆ ಸಾಮಗ್ರಿಗಳನ್ನು ಸರಬರಾಜು ಮಾಡಲು ಈ ಮೂಲಕ ಸಾಮಗ್ರಿ
          ಸರಬರಾಜು ಆದೇಶ ನೀಡಲಾಗಿದೆ.
        </Text>

        {/* Supply Order Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.tableCellSlnoHeading, styles.slNoCell]}>
              ಕ್ರ. ಸಂ.
            </Text>
            <Text style={[styles.tableCellHeading, styles.materialNameCell]}>
              ಸಾಮಗ್ರಿ ಹೆಸರು
            </Text>
            <Text style={[styles.tableCellHeading, styles.quantityCell]}>
              ಪ್ರಮಾಣ
            </Text>
            <Text style={[styles.tableCellHeading, styles.rateCell]}>ದರ</Text>
          </View>
          {vendorWithVendorQuotation.map((item, index) => (
            <View key={item.slNo} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCellSlno, styles.slNoCell]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.materialNameCell]}>
                {item.materialName}
              </Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.rateCell]}>
                {item.contractor1Rate}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerSection} wrap={false}>
          <View style={styles.leftFooter}>
            <Text style={styles.footerLabel}>ಗೆ,</Text>
            <Text style={styles.footerText}>
              <Text style={styles.footerLabel}>ಶ್ರೀ/ಶ್ರೀಮತಿ :-</Text>{" "}
              <Text style={styles.highlight}>{winnerContractorName}</Text>
            </Text>
            <Text style={styles.footerTextGst}>
              <Text style={styles.footerLabel}>GST :-</Text>{" "}
              {winnerContractorGst}
            </Text>
            <Text style={styles.footerText}>
              <Text style={styles.footerLabel}>ವಿಳಾಸ :-</Text>{" "}
              <Text style={styles.highlight}>{address}</Text>
            </Text>
          </View>
          <View style={styles.rightFooter}>
            <Text style={styles.signatureTitle}>
              ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
            </Text>
            <Text style={styles.signatureLocation}>
              ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default SupplyOrderPDF;
export type { VendorQuotationData };
