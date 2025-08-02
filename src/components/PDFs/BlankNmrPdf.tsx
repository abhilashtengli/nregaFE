import type React from "react";
import { Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import mnreaga from "@/assets/MGNREGA logo.jpg";

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
type Worker = {
  slNo: number;
  jobCardNo: string;
  familyHeadName: string;
  requestLetterFrom: string;
  accountNo: string;
};

export type NMRPDFProps = {
  district: string;
  taluka: string;
  gramPanchayat: string;
  financialYear: string;
  workCode: string;
  workName: string;
  fromDate: string;
  toDate: string;
  technicalSanctionNo: string;
  technicalSanctionDate: string;
  financialSanctionNo: string;
  financialSanctionDate: string;
  musterRollNo: string;
  workerData: Worker[];
};

// Styles for landscape orientation
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 7,
    lineHeight: 1.1,
    padding: 15,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  // Header Section
  headerSection: {
    marginBottom: 8
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 60,
    height: 50
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 6
  },
  mainTitle: {
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginBottom: 2
  },
  subTitle: {
    fontSize: 6,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginTop: 4,
    marginBottom: 4
  },
  // Basic Information Section
  basicInfoSection: {
    marginBottom: 6
  },
  topInfoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 4
  },
  infoItem: {
    fontSize: 6,
    marginRight: 30,
    fontFamily: "NotoSansKannada"
  },
  infoLabel: {
    fontWeight: "bold"
  },
  mainInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
    marginTop: 3
  },
  mainInfoItem: {
    fontSize: 6,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    marginRight: 8
  },
  // Work Details Section
  workDetailsSection: {
    marginBottom: 6
  },
  workCodeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3
  },
  workCodeText: {
    fontSize: 6,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  workNameText: {
    fontSize: 6,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    flex: 1,
    marginLeft: 20
  },
  dateAndSanctionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3
  },
  dateSection: {
    fontSize: 6,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  implementingAgency: {
    fontSize: 6,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  },
  sanctionSection: {
    flexDirection: "column",
    alignItems: "center"
  },
  sanctionText: {
    fontSize: 6,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    marginBottom: 1
  },
  measurementStaffRow: {
    fontSize: 6,
    fontWeight: "bold",
    marginBottom: 4
  },
  // Table Styles
  table: {
    marginBottom: 8
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 2
  },
  tableCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    paddingTop: 5,
    fontSize: 5,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellTotal: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    padding: 2,
    paddingVertical: 3,
    fontSize: 7,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCellHeading: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    padding: 2,
    paddingTop: 5,
    fontSize: 5,
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
    padding: 2,
    fontSize: 7,
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
    padding: 2,
    fontSize: 7,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },
  // Column widths for landscape table
  slNoCell: { width: "3%" },
  jobCardCell: { width: "10%" },
  familyHeadCell: { width: "10%" },
  applicantCell: { width: "10%" },
  villageCell: { width: "5%" },
  accountCell: { width: "12%" },
  dateCell: { width: "2.5%" }, // 7 date columns
  totalAttendanceCell: { width: "5%" },
  dailyWageCell: { width: "6%" },
  amountDueCell: { width: "7%" },
  travelCell: { width: "4%" },
  implementCell: { width: "6%" },
  totalPaidCell: { width: "6%" },
  signatureCell: { width: "8%" },
  // Total row
  totalRow: {
    flexDirection: "row",
    minHeight: 2,
    fontWeight: "bold"
  },
  totalCell: {
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    padding: 2,
    fontSize: 8,
    fontFamily: "NotoSansKannada",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  // Footer Styles
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  footerText: {
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada"
  }
});

const BlankNMRPDF: React.FC<NMRPDFProps> = ({
  district,
  taluka,
  gramPanchayat,
  financialYear,
  workCode,
  workName,
  fromDate,
  toDate,
  technicalSanctionNo,
  technicalSanctionDate,
  financialSanctionNo,
  financialSanctionDate,
  musterRollNo,
  workerData
}) => {
  const rowsPerPage = 15; // Reduced for landscape to fit better
  const totalPages = Math.ceil(workerData.length / rowsPerPage);

  const renderPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = workerData.slice(startIndex, endIndex);
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPages;

    return (
      <Page
        key={`nmr-${musterRollNo}-${pageNumber}`}
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        <View style={styles.container}>
          {/* Header - Only on first page */}
          {isFirstPage && (
            <>
              <View style={styles.headerSection}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    src={mnreaga || "/placeholder.svg"}
                  />
                </View>
                <View style={styles.titleSection}>
                  <Text style={styles.mainTitle}>
                    ಮಹಾತ್ಮ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯೋಗ ಖಾತರಿ ಯೋಜನೆ {"    "}
                  </Text>
                  <Text style={styles.subTitle}>
                    ಮಸ್ಟರ್ ರೋಲ್ (For Unskilled Labour)
                  </Text>
                </View>
              </View>

              <View style={styles.basicInfoSection}>
                <View style={styles.topInfoRow}>
                  <Text style={styles.infoItem}>
                    <Text style={styles.infoLabel}>
                      ಅಳತೆ ಪುಸ್ತಕ (MB) ಸಂಖ್ಯೆ:
                    </Text>{" "}
                    _______
                  </Text>
                  <Text style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Page No:</Text> _________
                  </Text>
                </View>
                <View style={styles.mainInfoRow}>
                  <Text style={styles.mainInfoItem}>ರಾಜ್ಯ: ಕರ್ನಾಟಕ</Text>
                  <Text style={styles.mainInfoItem}>
                    ಮಸ್ಟರ್ ರೋಲ್ ಸಂಖ್ಯೆ: {musterRollNo}
                  </Text>
                  <Text style={styles.mainInfoItem}>
                    Muster roll Printing Date: ____
                  </Text>
                  <Text style={styles.mainInfoItem}>ಜಿಲ್ಲೆ: {district}</Text>
                  <Text style={styles.mainInfoItem}>ತಾಲೂಕು: {taluka}</Text>
                  <Text style={styles.mainInfoItem}>
                    ಗ್ರಾಮ ಪಂಚಾಯತ: {gramPanchayat}
                  </Text>
                  <Text style={styles.mainInfoItem}>
                    Financial Year: {financialYear}
                  </Text>
                </View>
              </View>

              <View style={styles.workDetailsSection}>
                <View style={styles.workCodeRow}>
                  <Text style={styles.workCodeText}>
                    ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ: {workCode}
                  </Text>
                  <Text style={styles.workNameText}>
                    ಕಾಮಗಾರಿ ಹೆಸರು: {workName} ({financialYear})
                  </Text>
                </View>
                <View style={styles.dateAndSanctionRow}>
                  <View style={styles.dateSection}>
                    <Text>ದಿನಾಂಕದಿಂದ: {fromDate}</Text>
                  </View>
                  <View style={styles.dateSection}>
                    <Text>ದಿನಾಂಕದವರೆಗೆ: {toDate}</Text>
                  </View>
                  <Text style={styles.implementingAgency}>
                    ಕಾರ್ಯನಿರ್ವಹಣೆ ಇಕಾಯಿ: GRAM PANCHAYAT
                  </Text>
                  <View style={styles.sanctionSection}>
                    <Text style={styles.sanctionText}>
                      Technical Sanction No & Date: {technicalSanctionNo} (
                      {technicalSanctionDate})
                    </Text>
                    <Text style={styles.sanctionText}>
                      Financial Sanction No & Date: {financialSanctionNo} (
                      {financialSanctionDate})
                    </Text>
                  </View>
                </View>
                <Text style={styles.measurementStaffRow}>
                  Name of the Technical Staff Responsible for Measurement:
                  ____________________(TAE)
                </Text>
              </View>
            </>
          )}

          {/* Main Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellSlnoHeading, styles.slNoCell]}>
                ಕ್ರ.ಸಂ.
              </Text>
              <Text style={[styles.tableCellHeading, styles.jobCardCell]}>
                ಹೆಸರು / ನೋಂದಣಿ ಸಂಖ್ಯೆ
              </Text>
              <Text style={[styles.tableCellHeading, styles.familyHeadCell]}>
                ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಹೆಸರು
              </Text>
              <Text style={[styles.tableCellHeading, styles.applicantCell]}>
                ಅರ್ಜಿದಾರರ ಹೆಸರು
              </Text>
              <Text style={[styles.tableCellHeading, styles.villageCell]}>
                ಹಳ್ಳಿ
              </Text>
              <Text style={[styles.tableCellHeading, styles.accountCell]}>
                ಖಾತೆ ಸಂಖ್ಯೆ
              </Text>
              {Array.from({ length: 7 }, (_, i) => (
                <Text
                  key={`date-header-${i}`}
                  style={[styles.tableCellHeading, styles.dateCell]}
                >
                  {i + 1}
                </Text>
              ))}
              <Text
                style={[styles.tableCellHeading, styles.totalAttendanceCell]}
              >
                ಒಟ್ಟು ಹಾಜರಾತಿ
              </Text>
              <Text style={[styles.tableCellHeading, styles.dailyWageCell]}>
                ಒಂದು ದಿನದ ವೇತನ
              </Text>
              <Text style={[styles.tableCellHeading, styles.amountDueCell]}>
                ಹಾಜರಾತಿ ತಕ್ಕಂತೆ ಬಾಕಿ ಹಣ
              </Text>
              <Text style={[styles.tableCellHeading, styles.travelCell]}>
                ಪ್ರಯಾಣ ವೆಚ್ಚ
              </Text>
              <Text style={[styles.tableCellHeading, styles.implementCell]}>
                Implements / Sharpening Charge
              </Text>
              <Text style={[styles.tableCellHeading, styles.totalPaidCell]}>
                ಒಟ್ಟು ನಗದು ಪಾವತಿ
              </Text>
              <Text style={[styles.tableCellHeading, styles.signatureCell]}>
                ಅರ್ಜಿದಾರರ ಸಹಿ / ಹೆಬ್ಬೆರಳು ಗುರುತು
              </Text>
            </View>

            {/* Table Body */}
            {pageData.map((worker) => (
              <View key={worker.slNo} style={styles.tableRow}>
                <Text style={[styles.tableCellSlno, styles.slNoCell]}>
                  {worker.slNo}
                </Text>
                <Text style={[styles.tableCell, styles.jobCardCell]}>
                  {worker.jobCardNo}
                </Text>
                <Text style={[styles.tableCell, styles.familyHeadCell]}>
                  {worker.familyHeadName}
                </Text>
                <Text style={[styles.tableCell, styles.applicantCell]}>
                  {worker.requestLetterFrom}
                </Text>
                <Text style={[styles.tableCell, styles.villageCell]}></Text>
                <Text style={[styles.tableCell, styles.accountCell]}>
                  {worker.accountNo}
                </Text>
                {Array.from({ length: 7 }, (_, i) => (
                  <Text
                    key={`date-cell-${i}`}
                    style={[styles.tableCell, styles.dateCell]}
                  ></Text>
                ))}
                <Text
                  style={[styles.tableCell, styles.totalAttendanceCell]}
                ></Text>
                <Text style={[styles.tableCell, styles.dailyWageCell]}></Text>
                <Text style={[styles.tableCell, styles.amountDueCell]}></Text>
                <Text style={[styles.tableCell, styles.travelCell]}></Text>
                <Text style={[styles.tableCell, styles.implementCell]}>X</Text>
                <Text style={[styles.tableCell, styles.totalPaidCell]}></Text>
                <Text style={[styles.tableCell, styles.signatureCell]}></Text>
              </View>
            ))}

            <View style={styles.tableRow}>
              <Text style={[styles.tableCellSlno, styles.slNoCell]}></Text>
              <Text style={[styles.tableCell, styles.jobCardCell]}></Text>
              <Text style={[styles.tableCell, styles.familyHeadCell]}></Text>
              <Text style={[styles.tableCell, styles.applicantCell]}></Text>
              <Text style={[styles.tableCell, styles.villageCell]}></Text>
              <Text style={[styles.tableCellTotal, styles.accountCell]}>
                ಒಟ್ಟು
              </Text>
              {Array.from({ length: 7 }, (_, i) => (
                <Text
                  key={`date-cell-${i}`}
                  style={[styles.tableCell, styles.dateCell]}
                ></Text>
              ))}
              <Text
                style={[styles.tableCell, styles.totalAttendanceCell]}
              ></Text>
              <Text style={[styles.tableCell, styles.dailyWageCell]}></Text>
              <Text style={[styles.tableCell, styles.amountDueCell]}></Text>
              <Text style={[styles.tableCell, styles.travelCell]}></Text>
              <Text style={[styles.tableCell, styles.implementCell]}></Text>
              <Text style={[styles.tableCell, styles.totalPaidCell]}></Text>
              <Text style={[styles.tableCell, styles.signatureCell]}></Text>
            </View>
          </View>

          {/* Footer - Only on last page */}
          {isLastPage && (
            <View style={styles.footer}>
              <Text style={styles.footerText}>ಹಾಜರ ಪಡೆದವರ ಹೆಸರು (ಸಹಿ)</Text>
              <Text style={styles.footerText}>ಪರಿಶೀಲನೆ ಮಾಡಿದವರ (ಸಹಿ) </Text>
            </View>
          )}
        </View>
      </Page>
    );
  };

  return <>{Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}</>;
};

export default BlankNMRPDF;
