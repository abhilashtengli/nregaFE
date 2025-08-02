import type React from "react";
import { Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
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
type VendorDetails = {
  vendorNameOne: string;
  vendorGstOne: string;
  VendorOneQuotationSubmissiondate: string;
  vendorNameTwo: string;
  vendorGstTwo: string;
  vendorTwoQuotationSubmissiondate: string;
  vendorNameThree: string;
  vendorGstThree: string;
  vendorThreeQuotationSubmissiondate: string;
};

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

export type ComparativeStatementProps = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  vendorDetails: VendorDetails;
  vendorWithVendorQuotation: VendorQuotationData[];
};

// Styles for landscape orientation
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.2,
    padding: 20,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
    paddingBottom: 8,
    marginBottom: 8,
    alignItems: "center"
  },
  logoContainer: {
    width: 64,
    height: 64
  },
  leftlogoContainer: {
    width: 74,
    height: 64
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  centerHeader: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 12
  },
  centerEmblem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4
  },
  karnatakaSarkar: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  emblemContainer: {
    width: 24,
    height: 24,
    marginHorizontal: 6
  },
  headerText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginBottom: 7,
    fontWeight: "bold"
  },
  headerSubText: {
    fontSize: 10,
    marginBottom: 2,
    fontFamily: "NotoSansKannada"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  referenceNumber: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  date: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    marginBottom: 8
  },
  description: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "justify",
    lineHeight: 1.8,
    marginBottom: 12,
    letterSpacing: 0.5,
    paddingHorizontal: 6
  },
  highlight: {
    fontWeight: "bold"
  },
  table: {
    marginBottom: 8
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
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 4,
    fontSize: 8,
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
    fontSize: 9,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1.5
  },
  tableCellSlno: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    padding: 4,
    fontSize: 8,
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
    fontSize: 9,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "center"
  },
  contractorAndGstBold: {
    fontWeight: "bold"
  },
  slNoCell: {
    width: "8%"
  },
  materialNameCell: {
    width: "25%",
    textAlign: "left"
  },
  quantityCell: {
    width: "10%"
  },
  rateCell: {
    width: "12%"
  },
  vendorCell: {
    width: "15%"
  },
  conclusion: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "justify",
    lineHeight: 1.4,
    marginTop: 12,
    marginBottom: 10,
    letterSpacing: 0.3
  },
  contractorName1: {
    fontWeight: "bold",
    textDecoration: "underline"
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  signatureItem: {
    textAlign: "center",
    flex: 1
  },
  signatureTitle: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal",
    marginBottom: 4
  },
  signatureLocation: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginTop: 5
  }
});

const ComparativeStatementPDF: React.FC<ComparativeStatementProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  workCode,
  workName,
  tenderPublishDate,
  vendorDetails,
  vendorWithVendorQuotation
}) => {
  // Format dates from ISO strings to readable format
  // const formatDate = (isoString: string) => {
  //   const date = new Date(isoString);
  //   return date
  //     .toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric"
  //     })
  //     .replace(/\//g, "/");
  // };

  // const formattedTenderPublishDate = formatDate(tenderPublishDate);

  // Contractor details from vendorDetails object
  const contractor1 = {
    name: vendorDetails.vendorNameOne || "vendor 1",
    gst: vendorDetails.vendorGstOne || "vendor gst 1",
    quotationSubmissionDate:
      vendorDetails.VendorOneQuotationSubmissiondate || ""
  };

  const contractor2 = {
    name: vendorDetails.vendorNameTwo || "vendor 2",
    gst: vendorDetails.vendorGstTwo || "vendor gst 2",
    quotationSubmissionDate:
      vendorDetails.vendorTwoQuotationSubmissiondate || ""
  };

  const contractor3 = {
    name: vendorDetails.vendorNameThree || "vendor 3",
    gst: vendorDetails.vendorGstThree || "vendor gst 3",
    quotationSubmissionDate:
      vendorDetails.vendorThreeQuotationSubmissiondate || ""
  };

  // Dynamic pagination based on data length (landscape can fit more items)
  const itemsPerPage = 10; // Items per page for comparative statement (landscape)
  const totalPages = Math.ceil(vendorWithVendorQuotation.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = vendorWithVendorQuotation.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <Page
        key={`comparative-${pageNumber}`}
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        <View style={styles.container}>
          {/* Header - Only on first page */}
          {isFirstPage && (
            <>
              {/* Header with logos */}
              <View style={styles.headerSection}>
                <View style={styles.leftlogoContainer}>
                  <Image
                    style={styles.logo}
                    src={mnreaga || "/placeholder.svg"}
                  />
                </View>
                <View style={styles.centerHeader}>
                  <View style={styles.centerEmblem}>
                    <Text style={styles.karnatakaSarkar}>ಕರ್ನಾಟಕ</Text>
                    <View style={styles.emblemContainer}>
                      <Image
                        style={styles.logo}
                        src={emblem || "/placeholder.svg"}
                      />
                    </View>
                    <Text style={styles.karnatakaSarkar}>ಸರ್ಕಾರ</Text>
                  </View>
                  <Text style={styles.headerText}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ||{" "}
                    {district}
                  </Text>
                  <Text style={styles.headerSubText}>
                    ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ{"     "}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    src={state_logo || "/placeholder.svg"}
                  />
                </View>
              </View>

              <View style={styles.headerRow}>
                <Text style={styles.referenceNumber}>
                  ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ದ.ಪ.ಅ.ತು.ಪ/{year}
                </Text>
                <Text style={styles.date}>ದಿನಾಂಕ: {tenderPublishDate}</Text>
              </View>

              <Text style={styles.title}>ದರಪಟ್ಟಿಗಳ ತುಲನಾತ್ಮಕ ಪಟ್ಟಿ</Text>

              <Text style={styles.description}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸನ್{" "}
                <Text style={styles.highlight}>{year}</Text> ನೇ ಸಾಲಿನ ಮಹಾತ್ಮ
                ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಡಿ
                ಅನುಷ್ಠಾನಗೊಳಿಸುತ್ತಿರುವ{" "}
                <Text style={styles.highlight}>{workName}</Text>(
                <Text style={styles.highlight}>{workCode}</Text>) ಕಾಮಗಾರಿ
                ಅನುಷ್ಠಾನ ಮಾಡಲು ಆಹ್ವಾನಿಸಿರುವ ದರಪಟ್ಟಿಗೆ ಅನುಗುಣವಾಗಿ ಸಾಮಗ್ರಿ ಸರಬರಾಜು
                ಮಾಡಲು ಬಂದಿರುವ ಸರಬರಾಜುದಾರರ ದರಪಟ್ಟಿಗಳ ತುಲನಾತ್ಮಕ ಪಟ್ಟಿ.
              </Text>
            </>
          )}

          {/* Comparative Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellSlnoHeading, styles.slNoCell]}>
                ಕ್ರ. ಸಂ.
              </Text>
              <Text style={[styles.tableCellHeading, styles.materialNameCell]}>
                ಸಾಮಗ್ರಿ ಹೆಸರು
              </Text>
              <Text style={[styles.tableCellHeading, styles.quantityCell]}>
                ಪ್ರಮಾಣ
              </Text>
              <Text style={[styles.tableCellHeading, styles.rateCell]}>
                ದರ{"\n"}(as per SR)
              </Text>
              <Text style={[styles.tableCellHeading, styles.vendorCell]}>
                ಸರಬರಾಜುದಾರ - 1{"\n"}
                <Text style={styles.contractorAndGstBold}>
                  {contractor1.name.split(" ")[0]}
                </Text>
                {"\n"}
                <Text style={styles.contractorAndGstBold}>
                  GST:{contractor1.gst}
                </Text>
              </Text>
              <Text style={[styles.tableCellHeading, styles.vendorCell]}>
                ಸರಬರಾಜುದಾರ - 2{"\n"}
                <Text style={styles.contractorAndGstBold}>
                  {contractor2.name.split(" ")[0]}
                </Text>
                {"\n"}
                <Text style={styles.contractorAndGstBold}>
                  GST:{contractor2.gst}
                </Text>
              </Text>
              <Text style={[styles.tableCellHeading, styles.vendorCell]}>
                ಸರಬರಾಜುದಾರ - 3{"\n"}
                <Text style={styles.contractorAndGstBold}>
                  {contractor3.name.split(" ")[0]}
                </Text>
                {"\n"}
                <Text style={styles.contractorAndGstBold}>
                  GST:{contractor3.gst}
                </Text>
              </Text>
            </View>

            {pageData.map((item, index) => (
              <View key={startIndex + index} style={styles.tableRow}>
                <Text style={[styles.tableCellSlno, styles.slNoCell]}>
                  {item.slNo}
                </Text>
                <Text style={[styles.tableCell, styles.materialNameCell]}>
                  {item.materialName}
                </Text>
                <Text style={[styles.tableCell, styles.quantityCell]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.rateCell]}>
                  {item.rate}
                </Text>
                <Text style={[styles.tableCell, styles.vendorCell]}>
                  {item.contractor1Rate}
                </Text>
                <Text style={[styles.tableCell, styles.vendorCell]}>
                  {item.contractor2Rate}
                </Text>
                <Text style={[styles.tableCell, styles.vendorCell]}>
                  {item.contractor3Rate}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer - Only on last page */}
          {isLastPage && (
            <>
              <Text style={styles.conclusion}>
                ಈ ಮೇಲ್ಕಂಡ ಸರಬರಾಜುದಾರಿಂದ ಬಂದಿರುವ ದರಪಟ್ಟಿಗಳಲ್ಲಿ{" "}
                <Text style={styles.contractorName1}>{contractor1.name} </Text>
                ರವರ ದರಗಳು ಕಡಿಮೆ ಇರುವುದರಿಂದ ಅವರ ದರಪಟ್ಟಿಯನ್ನು ಅಂಗೀಕರಿಸಿ, ಸಾಮಗ್ರಿ
                ಸರಬರಾಜು ಆದೇಶ ನೀಡಲು ಅನುಮೋದಿಸಲಾಯಿತು
              </Text>

              <View style={styles.signatureSection}>
                <View style={styles.signatureItem}>
                  <Text style={styles.signatureTitle}>
                    ನರೇಗಾ ತಾಂತ್ರಿಕ ಸಹಾಯಕರು
                  </Text>
                  <Text style={styles.signatureLocation}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}
                  </Text>
                </View>
                <View style={styles.signatureItem}>
                  <Text style={styles.signatureTitle}>
                    ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು
                  </Text>
                  <Text style={styles.signatureLocation}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}
                  </Text>
                </View>
                <View style={styles.signatureItem}>
                  <Text style={styles.signatureTitle}>ಅಧ್ಯಕ್ಷರು</Text>
                  <Text style={styles.signatureLocation}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ,{gramPanchayat}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </Page>
    );
  };

  return <>{Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}</>;
};

export default ComparativeStatementPDF;
export type { VendorDetails, VendorQuotationData };
