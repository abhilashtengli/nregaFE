import {
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
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
type MaterialData = {
  slNo: number;
  materialName: string;
  quantity: string;
  price: string;
  unit?: string;
};

type QuotationCallProps = {
  gramPanchayat: string;
  taluka: string;
  district: string;
  year: string;
  administrativeSanction: string;
  workCode: string;
  workName: string;
  tenderPublishDate: string;
  tenderSubmissionDate: string;
  materialData: MaterialData[];
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.3,
    padding: 42,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid black",
    paddingBottom: 8,
    marginBottom: 10,
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
    marginBottom: 6
  },
  karnatakaSarkar: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  emblemContainer: {
    width: 32,
    height: 32,
    marginHorizontal: 8
  },
  headerText: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    marginBottom: 8,
    fontWeight: "bold"
  },
  headerSubText: {
    fontSize: 10,
    marginBottom: 4,
    fontFamily: "NotoSansKannada"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  referenceNumber: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  date: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  noticeTitle: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 6
  },
  subjectSection: {
    marginBottom: 4,
    paddingHorizontal: 32
  },
  subjectRow: {
    flexDirection: "row",
    marginBottom: 16
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
    flex: 1,
    lineHeight: 1.5
  },
  referenceSection: {
    flexDirection: "row",
    marginBottom: 16
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
    flex: 1,
    lineHeight: 1.5
  },
  separatorLine: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 16
  },
  mainContent: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "justify",
    lineHeight: 1.8,
    marginBottom: 2,
    letterSpacing: 0.2
  },
  table: {
    marginBottom: 5
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 20
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    paddingVertical: 5
  },
  tableCellHeading: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    paddingVertical: 5
  },
  tableCellSlno: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    padding: 8,
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    paddingVertical: 5
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
    paddingVertical: 5
  },
  slNoCell: {
    width: "12%"
  },
  materialNameCell: {
    width: "50%",
    textAlign: "left"
  },
  quantityCell: {
    width: "20%"
  },
  priceCell: {
    width: "18%"
  },
  termsSection: {
    marginBottom: 24
  },
  termsTitle: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    marginBottom: 12
  },
  termItem: {
    fontSize: 9,
    fontFamily: "NotoSansKannada",
    marginBottom: 8,
    lineHeight: 1.5
  },
  signatureSection: {
    textAlign: "right",
    marginBottom: 2
  },
  signatureTitle: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  signatureLocation: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold",
    paddingRight: 44,
    marginTop: 6
  },
  copySection: {
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  copyTitle: {
    fontWeight: "bold",
    marginBottom: 8
  },
  textbottom: {
    marginBottom: 6
  }
});

const QuotationCallPDF: React.FC<QuotationCallProps> = ({
  gramPanchayat,
  taluka,
  district,
  year,
  administrativeSanction,
  workCode,
  workName,
  tenderPublishDate,
  tenderSubmissionDate,
  materialData
}) => {
  // Format dates from ISO strings to readable format
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
      .replace(/\//g, "/");
  };

  const formattedTenderPublishDate = formatDate(tenderPublishDate);
  const formattedTenderSubmissionDate = formatDate(tenderSubmissionDate);

  // Dynamic pagination based on data length
  const itemsPerPage = 15;
  const totalPages = Math.ceil(materialData.length / itemsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = materialData.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <Page key={`quotation-call-${pageNumber}`} size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header - Only on first page */}
          {isFirstPage && (
            <>
              {/* Header with logos */}
              <View style={styles.headerSection}>
                <View style={styles.leftlogoContainer}>
                  <Image style={styles.logo} src={mnreaga} />
                </View>
                <View style={styles.centerHeader}>
                  <View style={styles.centerEmblem}>
                    <Text style={styles.karnatakaSarkar}>ಕರ್ನಾಟಕ</Text>
                    <View style={styles.emblemContainer}>
                      <Image style={styles.logo} src={emblem} />
                    </View>
                    <Text style={styles.karnatakaSarkar}>ಸರ್ಕಾರ</Text>
                  </View>
                  <Text style={styles.headerText}>
                    ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}, ತಾ|| {taluka}. ಜಿ||{" "}
                    {district}
                  </Text>
                  <Text style={styles.headerSubText}>
                    ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ, ಕರ್ನಾಟಕ{"  "}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} src={state_logo} />
                </View>
              </View>

              <View style={styles.headerRow}>
                <Text style={styles.referenceNumber}>
                  ಕ್ರ.ಸಂ/ಗ್ರಾ.ಪಂ./ಮ.ರಾ.ಗ್ರಾ.ಉ.ಖಾ.ಯೋ/ದ.ಪ.ಅ.ತು.ಪ/{year}
                </Text>
                <Text style={styles.date}>
                  ದಿನಾಂಕ: {formattedTenderPublishDate}
                </Text>
              </View>

              <Text style={styles.noticeTitle}>ದರಪಟ್ಟಿ ಆಹ್ವಾನ ಪ್ರಕಟಣೆ</Text>

              {/* Subject */}
              <View style={styles.subjectSection}>
                <View style={styles.subjectRow}>
                  <Text style={styles.subjectLabel}>ವಿಷಯ:</Text>
                  <Text style={styles.subjectContent}>
                    ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಲ್ಲಿ
                    ಕೈಗೊಳ್ಳಲಾಗುವ ಕಾಮಗಾರಿಗಳಿಗೆ ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಮಾಡಲು ದರಪಟ್ಟಿ
                    ಆಹ್ವಾನಿಸುವ ಬಗ್ಗೆ.
                  </Text>
                </View>
                <View style={styles.referenceSection}>
                  <Text style={styles.referenceLabel}>ಉಲ್ಲೇಖ :</Text>
                  <View style={styles.referenceContent}>
                    <Text>
                      1) ಮಹಾತ್ಮ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ ಮಾರ್ಗಸೂಚಿ ಪ್ಯಾರಾ 7.1.7 ಪ್ರಕಾರ
                    </Text>
                    <Text>
                      2) ಕಾಮಗಾರಿ ಆಡಳಿತಾತ್ಮಕ ಅನುಮೋದನೆ ಸಂಖ್ಯೆ :{" "}
                      {administrativeSanction}
                    </Text>
                    <Text>ದಿನಾಂಕ :{formattedTenderPublishDate}</Text>
                  </View>
                </View>
                <Text style={styles.separatorLine}>********</Text>
              </View>

              {/* Main Content */}
              <Text style={styles.mainContent}>
                ಈ ಮೇಲ್ಕಂಡ ವಿಷಯ ಹಾಗೂ ಉಲ್ಲೇಖಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ {year} ನೇ ಸಾಲಿನ
                ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತ್ರಿ ಯೋಜನೆಯಲ್ಲಿ
                ಕೈಗೊಳ್ಳಲಾಗುವ {workName} ({workCode} ) ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನ ಮಾಡಲು ಈ
                ಕೆಳಕಂಡ ಸಾಮಗ್ರಿಗಳು ಅವಶ್ಯವಿದ್ದು, ಅವುಗಳನ್ನು ಅಹರ್ GST ನಂಬರ್ ಹೊಂದಿರುವ
                ಸರಬರಾಜುದಾರರಿಂದ ದರಪಟ್ಟಿಯನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿದೆ. ಆಸಕ್ತಿ ಹೊಂದಿರುವ
                ಸರಬರಾಜುದಾರರು ಇದಕ್ಕೆ ಲಗತ್ತಿಸಿದ ನಮೂನೆಯಲ್ಲಿ ಐಟಂವಾರು ಅಂಕಿ &
                ಅಕ್ಷರಗಳಲ್ಲಿ ದರವನ್ನು ನಮೂದಿಸಿ, ಸದರಿ ದರಪಟ್ಟಿಯನ್ನು ದಿನಾಂಕ{" "}
                {formattedTenderSubmissionDate} ರಂದು ಸಂಜೆ 5.00 ಗಂಟೆಯೊಳಗಾಗಿ ಈ
                ಕಛೇರಿಗೆ ಈ ಕೆಳಕಂಡ ಷರತ್ತುಗಳಿಗೆ ಒಳಪಟ್ಟು ಸಲ್ಲಿಸತಕ್ಕದ್ದು, ನಂತರ ಬರುವ
                ಯಾವುದೇ ದರಪಟ್ಟಿಗಳನ್ನು ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ.
              </Text>
            </>
          )}

          {/* Material Table */}
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
              <Text style={[styles.tableCellHeading, styles.priceCell]}>
                ದರ (as per SR)
              </Text>
            </View>
            {pageData.map((item, index) => (
              <View key={startIndex + index} style={styles.tableRow}>
                <Text style={[styles.tableCellSlno, styles.slNoCell]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, styles.materialNameCell]}>
                  {item.materialName}
                </Text>
                <Text style={[styles.tableCell, styles.quantityCell]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.priceCell]}>
                  {item.price}
                </Text>
              </View>
            ))}
          </View>

          {/* Terms and Conditions - Only on last page */}
          {isLastPage && (
            <>
              <View style={styles.termsSection}>
                <Text style={styles.termsTitle}>ಷರತ್ತುಗಳು :</Text>
                <Text style={styles.termItem}>
                  1) ಸಾಮಗ್ರಿಗಳು ಉತ್ತಮ ಗುಣಮಟ್ಟವನ್ನು ಹೊಂದಿರಬೇಕು.
                </Text>
                <Text style={styles.termItem}>
                  2) ಸರಬರಾಜುದಾರರು ಸಲ್ಲಿಸುವ ದರಗಳು ತೆರಿಗೆಯನ್ನು ಒಳಗೊಂಡಿದೆ ಅಥವಾ
                  ಇಲ್ಲವೆಂಬುದನ್ನು ನಮೂದಿಸಬೇಕು.
                </Text>
                <Text style={styles.termItem}>
                  3) ಆಯ್ಕೆಯಾದ ಸರಬರಾಜುದಾರರು ಸಾಮಗ್ರಿಗಳನ್ನು ತಮ್ಮ ಖರ್ಚಿನಲ್ಲಿಯೇ
                  ಕಾಮಗಾರಿ ಸ್ಥಳಕ್ಕೆ ಸರಬರಾಜು ಮಾಡಲು ಬದ್ಧರಾಗಿರಬೇಕು.
                </Text>
                <Text style={styles.termItem}>
                  4) ಸರಬರಾಜು ಮಾಡುವ ಸಾಮಗ್ರಿಗಳಿಗೆ ನಿಯಮಾನುಸಾರ ವಾರಂಟಿ ಇದ್ದಲ್ಲಿ,
                  ಅವಧಿಯೊಳಗೆ ಬದಲಾಯಿಸಿಕೊಡಲು ಬದ್ಧರಾಗಿರಬೇಕು.
                </Text>
                <Text style={styles.termItem}>
                  5) ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು ಸರ್ಕಾರವು ಅನುದಾನ ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ
                  ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು ಸರ್ಕಾರವು ಅನುದಾನ
                  ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು ಸಾಮಗ್ರಿ ಬಿಲ್ಲನ್ನು
                  ಸರ್ಕಾರವು ಅನುದಾನ ಬಿಡುಗಡೆ ಮಾಡಿದಾಗ ಸ್ವೀಕರಿಸಲು ಬದ್ಧರಾಗಿರಬೇಕು
                </Text>
                <Text style={styles.termItem}>
                  6) ಸಾಮಗ್ರಿ ಸರಬರಾಜು ಆದೇಶ ನೀಡುವ ಸಂದರ್ಭದಲ್ಲಿ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯು
                  ವಿಧಿಸುವ / ಒಪ್ಪುವ ಇನ್ನಿತರ ಷರತ್ತುಗಳಿಗೆ ಬದ್ಧರಾಗಿರಬೇಕು.
                </Text>
              </View>

              {/* Signature */}
              <View style={styles.signatureSection}>
                <Text style={styles.signatureTitle}>
                  ಪಂಚಾಯತ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು / ಅಧ್ಯಕ್ಷರು
                </Text>
                <Text style={styles.signatureLocation}>
                  ಗ್ರಾಮ ಪಂಚಾಯತಿ, {gramPanchayat}
                </Text>
              </View>

              {/* Copy Distribution */}
              <View style={styles.copySection}>
                <Text style={styles.copyTitle}>ಪ್ರತಿಯನ್ನು :</Text>
                <Text style={styles.textbottom}>
                  1. ಸ್ಥಳೀಯ ಅಹರ್ ಸರಬರಾಜುದಾರಿಗೆ
                </Text>
                <Text style={styles.textbottom}>
                  2. ಕಛೇರಿ ಸೂಚನಾ ಫಲಕ ಪ್ರತಿ/ ಕಾಮಗಾರಿ ಕಡತ ಪ್ರತಿ
                </Text>
              </View>
            </>
          )}
        </View>
      </Page>
    );
  };

  return (
    <>
      {Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}
    </>
  );
};

export default QuotationCallPDF;
export type { QuotationCallProps, MaterialData };
