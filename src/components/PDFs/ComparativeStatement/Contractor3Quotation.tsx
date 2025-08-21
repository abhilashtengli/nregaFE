import type React from "react";
import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

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

export type ContractorQuotationProps = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  contractorNumber: number;
  contractorName: string;
  contractorGst: string;
  quotationSubmissionDate: string;
  vendorWithVendorQuotation: VendorQuotationData[];
};

// Styles for portrait orientation
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.3,
    padding: 42, // 15mm converted to points
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  // Header section styles
  headerSection: {
    marginBottom: 24
  },
  addressLine: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginBottom: 4,
    textAlign: "left"
  },
  respectfulGreeting: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginTop: 16,
    textAlign: "left"
  },
  // Subject section styles
  subjectSection: {
    marginBottom: 24,
    paddingLeft: 68 // pl-24 equivalent
  },
  subjectRow: {
    flexDirection: "row",
    marginBottom: 8
  },
  subjectLabel: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    marginRight: 12
  },
  subjectContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    flex: 1
  },
  referenceRow: {
    flexDirection: "row",
    marginBottom: 8
  },
  referenceLabel: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    marginRight: 12
  },
  referenceContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    flex: 1
  },
  separatorLine: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 4
  },
  // Main content styles
  mainContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "justify",
    lineHeight: 1.8,
    marginBottom: 8,
    letterSpacing: 0.2,
    width: "100%", // important
    flexWrap: "wrap"
  },
  highlight: {
    width: "100%",
    fontWeight: "bold"
  },
  // Table styles
  table: {
    marginBottom: 24
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
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellHeading: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    padding: 8,
    fontSize: 10,
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
    padding: 8,
    fontSize: 10,
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
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },
  // Table column widths
  slNoCell: {
    width: "10%"
  },
  materialNameCell: {
    width: "35%",
    textAlign: "left"
  },
  quantityCell: {
    width: "12%"
  },
  srRateCell: {
    width: "15%"
  },
  quotedRateCell: {
    width: "15%"
  },
  rateWordsCell: {
    width: "13%"
  },
  // Footer styles
  footerSection: {
    marginTop: 28
  },
  faithfullyYours: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "right",
    paddingRight: 32,
    marginBottom: 48
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftFooter: {
    flex: 1
  },
  rightFooter: {
    flex: 1,
    textAlign: "right"
  },
  footerText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginBottom: 4
  },
  TopHeader: {
    borderBottom: "1px solid black",
    paddingVertical: 4,
    paddingBottom: 8,
    marginBottom: 10
  },
  firstRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 8,
    paddingBottom: 12
  },
  secondRow: {
    textAlign: "right",
    fontSize: 18,
    color: "orange",
    paddingBottom: 20,
    font: "bold",
    fontStyle: "normal"
  },
  thirdRow: {
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  },
  address: {
    paddingHorizontal: 5,
    paddingBottom: 4
  },

  doubleColumn: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const Contractor3QuotationPDF: React.FC<ContractorQuotationProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  contractorNumber,
  contractorName,
  contractorGst,
  quotationSubmissionDate,
  vendorWithVendorQuotation
}) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.TopHeader}>
          <View style={styles.secondRow}>
            <Text>{contractorName}</Text>
          </View>
          <View style={styles.doubleColumn}>
            <View style={styles.firstRow}>
              <Text style={styles.address}>GSt No. {contractorGst}</Text>
              <Text style={styles.address}>Cell no. :</Text>
            </View>
            <View style={styles.thirdRow}>
              <Text style={styles.address}>At Post : {gramPanchayat}</Text>
              <Text style={styles.address}>TQ : {taluka}</Text>
              <Text style={styles.address}>Dist : {district}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerSection}>
          <Text style={styles.addressLine}>ಗೆ,</Text>
          <Text style={styles.addressLine}>
            ಅಧ್ಯಕ್ಷರು / ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು,
          </Text>
          <Text style={styles.addressLine}>ಗ್ರಾಮ ಪಂಚಾಯತಿ: {gramPanchayat}</Text>
          <Text style={styles.addressLine}>
            ತಾಲೂಕು: {taluka} / ಜಿಲ್ಲೆ: {district}
          </Text>
          <Text style={styles.respectfulGreeting}>ಮಾನ್ಯರೆ,</Text>
        </View>

        {/* Subject Section */}
        <View style={styles.subjectSection}>
          <View style={styles.subjectRow}>
            <Text style={styles.subjectLabel}>ವಿಷಯ:</Text>
            <Text style={styles.subjectContent}>
              ಸಾಮಗ್ರಿಗಳಿಗೆ ಐಟಂವಾರು ದರಪಟ್ಟಿ ಸಲ್ಲಿಸುವ ಕುರಿತು
            </Text>
          </View>
          <View style={styles.referenceRow}>
            <Text style={styles.referenceLabel}>ಉಲ್ಲೇಖ:</Text>
            <Text style={styles.referenceContent}>
              ತಮ್ಮ ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ ದಿನಾಂಕ : ದಿನಾಂಕ : {tenderPublishDate}
            </Text>
          </View>
          <Text style={styles.separatorLine}>********</Text>
        </View>

        {/* Main Content */}
        <Text style={styles.mainContent}>
          ಈ ಮೇಲ್ಕಂಡಿಸಿದ ವಿಷಯ ಹಾಗೂ ಉಲ್ಲೇಖಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ನಾನು GST ಅಡಿ ನೋಂದಾಯಿತ
          ಸಾಮಗ್ರಿ ಸರಬರಾಜುದಾರನಾಗಿದ್ದು, {year} ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ
          ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ ಕೈಗೊಳ್ಳಲಾಗುವ {workName} ({workCode})
          ಕಾಮಗಾರಿಗೆ ಅವಶ್ಯವಿರುವ ಸಾಮಗ್ರಿಗಳಿಗೆ ತಾವು ವಿಧಿಸಿರುವ ಷರತ್ತುಗಳಿಗೆ ಬದ್ಧನಾಗಿ
          ಈ ಕೆಳಗಿನಂತೆ ದರಪಟ್ಟಿಯನ್ನು ಸಲ್ಲಿಸುತ್ತಿದ್ದು, ನನ್ನ ದರಪಟ್ಟಿಯನ್ನು
          ಅಂಗೀಕರಿಸಿಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ ನೀಡಬೇಕಾಗಿ ತಮ್ಮಲ್ಲಿ ಕೋರುತ್ತೇನೆ.
        </Text>

        {/* Quotation Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.tableCellSlnoHeading, styles.slNoCell]}>
              ಕ್ರ. ಸಂ.
            </Text>
            <Text style={[styles.tableCellHeading, styles.materialNameCell]}>
              ಸಾಮಗ್ರಿ ಹೆಸರು
            </Text>
            <Text style={[styles.tableCellHeading, styles.quantityCell]}>
              ಮಾಪನ ಘಟಕ
            </Text>
            <Text style={[styles.tableCellHeading, styles.quantityCell]}>
              ಪ್ರಮಾಣ
            </Text>
            <Text style={[styles.tableCellHeading, styles.srRateCell]}>
              ದರ (as per SR)
            </Text>
            <Text style={[styles.tableCellHeading, styles.quotedRateCell]}>
              ದರ (ಅಂಕಿಗಳಲ್ಲಿ)
            </Text>
            <Text style={[styles.tableCellHeading, styles.rateWordsCell]}>
              ಒಟ್ಟು ಮೊತ್ತ {"  "}
            </Text>
          </View>
          {vendorWithVendorQuotation.map((item, index) => {
            const contractorRate =
              contractorNumber === 1
                ? item.contractor1Rate
                : contractorNumber === 2
                ? item.contractor2Rate
                : item.contractor3Rate;
            return (
              <View key={item.slNo} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tableCellSlno, styles.slNoCell]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, styles.materialNameCell]}>
                  {item.materialName}
                </Text>
                <Text style={[styles.tableCell, styles.quantityCell]}>
                  {item.unit}
                </Text>
                <Text style={[styles.tableCell, styles.quantityCell]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.srRateCell]}>
                  {item.rate}
                </Text>
                <Text style={[styles.tableCell, styles.quotedRateCell]}>
                  {contractorRate}
                </Text>
                <Text style={[styles.tableCell, styles.rateWordsCell]}>
                  {" "}
                  {(Number(contractorRate) * Number(item.quantity)).toFixed(
                    2
                  )}{" "}
                </Text>
              </View>
            );
          })}
          <View style={styles.tableRow} wrap={false}>
            <Text style={[styles.tableCellSlno, styles.slNoCell]}></Text>
            <Text
              style={[
                styles.tableCell,
                styles.materialNameCell,
                { fontWeight: "bold" }
              ]}
            >
              Total
            </Text>
            <Text style={[styles.tableCell, styles.quantityCell]}></Text>
            <Text style={[styles.tableCell, styles.quantityCell]}></Text>
            <Text style={[styles.tableCell, styles.srRateCell]}></Text>
            <Text style={[styles.tableCell, styles.quotedRateCell]}></Text>
            <Text
              style={[
                styles.tableCell,
                styles.rateWordsCell,
                { fontWeight: "bold" }
              ]}
            >
              {vendorWithVendorQuotation
                .reduce((total, item) => {
                  const contractorRate =
                    contractorNumber === 1
                      ? item.contractor1Rate
                      : contractorNumber === 2
                      ? item.contractor2Rate
                      : item.contractor3Rate;
                  return total + Number(contractorRate) * Number(item.quantity);
                }, 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection} wrap={false}>
          <Text style={styles.faithfullyYours}>ತಮ್ಮ ವಿಶ್ವಾಸಿ</Text>
          <View style={styles.signatureSection}>
            <View style={styles.leftFooter}>
              <Text style={styles.footerText}>ಸ್ಥಳ:</Text>
              <Text style={styles.footerText}>
                ದಿನಾಂಕ: {quotationSubmissionDate}
              </Text>
            </View>
            <View style={styles.rightFooter}>
              <Text style={styles.footerText}>ಸರಬರಾಜುದಾರರ ಸಹಿ</Text>
              <Text style={styles.footerText}>ಹೆಸರು: {contractorName}</Text>
              <Text style={styles.footerText}>GST: {contractorGst}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default Contractor3QuotationPDF;
export type { VendorQuotationData };
