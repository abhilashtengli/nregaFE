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
type WorkerData = {
  slNo: number;
  name: string;
  jobCardNo: string;
  totalAttendance: number;
  oneDayWage: number;
  pendingAmountByAttendance: number;
  totalCashPayment: number;
  bankName: string;
  wagelistNo: string;
  creditedDate: string;
  signature: string;
  attendanceBy: string;
};

export type FilledENmrPDFProps = {
  district?: string;
  taluka?: string;
  panchayat?: string;
  musterRollNo?: string;
  fromDate?: string;
  toDate?: string;
  totalAttendanceCount: number;
  approvalNo?: string;
  approvalDate?: string;
  workCode?: string;
  workName?: string;
  financialYear?: string;
  totalWage?: number;
  wage?: number;
  workersData: WorkerData[];
};

// Styles
const styles = StyleSheet.create({
  page: {
    orientation: "landscape",
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.1,
    padding: "4mm",
    backgroundColor: "white"
  },
  // Header Styles
  headerTable: {
    border: "1px solid black",
    backgroundColor: "#E9D7D0",
    marginBottom: 8
  },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1px solid black"
  },
  headerCell: {
    flex: 1,
    padding: 2,
    textAlign: "center",
    fontSize: 8,
    fontFamily: "NotoSansKannada",
    backgroundColor: "#D1D5DB" // gray-300
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoCell: {
    flex: 1,
    padding: 4,
    fontSize: 8,
    fontFamily: "NotoSansKannada",
    textAlign: "left"
  },
  workInfoCell: {
    flex: 2,
    padding: 4,
    fontSize: 8,
    fontFamily: "NotoSansKannada"
  },
  emptyRow: {
    flexDirection: "row"
    // borderTop: "1px solid #9CA3AF"
  },
  emptyCell: {
    flex: 1,
    padding: 4
  },
  // Measurement & Note Styles
  measurementBook: {
    marginBottom: 8,
    border: "1px solid #6B7280",
    textAlign: "center",
    backgroundColor: "#E9D7D0"
  },
  measurementHeader: {
    fontSize: 10,
    color: "white",
    backgroundColor: "#3E749F",
    padding: 2,
    paddingBottom: 4,
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  measurementBody: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 2,
    paddingBottom: 4,
    fontSize: 10,
    fontWeight: "bold"
  },
  noteSection: {
    backgroundColor: "#D1D5DB",
    padding: 2,
    marginBottom: 4
  },
  noteText: {
    fontSize: 10,
    color: "#FF0000",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 4
  },
  mustrollDetailHeader: {
    fontSize: 10,
    color: "white",
    backgroundColor: "#3E749F",
    textAlign: "center",
    padding: 2,
    paddingBottom: 3,
    fontWeight: "bold"
  },
  // Main Table Styles
  table: {
    border: "1px solid #3E749F"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#6898B5",
    color: "black"
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FEF9C3" // yellow-100,
  },
  bottomRow: {
    flexDirection: "row",
    backgroundColor: "#FEF9C3", // yellow-100
    borderBottom: "1px solid #3E749F",
    borderLeft: "1px solid #3E749F",
    borderRight: "1px solid #3E749F"
  },

  tableCell: {
    borderRight: "1px solid #3E749F",
    borderTop: "1px solid #3E749F",
    padding: 2,
    paddingTop: 4,
    textAlign: "center",
    fontSize: 7,
    fontFamily: "NotoSansKannada"
  },
  tableCellLastRow: {
    borderRight: "1px solid #3E749F",
    padding: 2,
    paddingTop: 4,
    textAlign: "center",
    fontSize: 7,
    fontFamily: "NotoSansKannada"
  },
  tableCellHeader: {
    padding: 2,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 7,
    fontFamily: "NotoSansKannada"
  },
  nameCell: {
    flexDirection: "column",
    textAlign: "left"
  },
  // Total Attendance Row
  totalAttendanceRow: {
    flexDirection: "row",
    backgroundColor: "#3E749F",
    color: "white",
    fontWeight: "bold"
  },
  totalAttendanceLabel: {
    textAlign: "center",
    fontSize: 10,
    padding: 2
  },
  totalAttendanceValue: {
    textAlign: "center",
    fontSize: 10,
    padding: 2,
    fontWeight: "bold",
    color: "white"
  },
  // Footer Styles
  footer: {
    marginTop: 8,
    border: "1px solid black",
    flexDirection: "row"
  },
  footerCol: {
    flex: 1,
    borderRight: "1px solid black",
    padding: 4
  },
  footerBox: {
    border: "1px solid black",
    marginBottom: 4
  },
  footerBoxThirdCol: {
    border: "1px solid black"
  },
  footerBoxHeader: {
    borderBottom: "1px solid black",
    padding: 2,
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  footerBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
    paddingBottom: 2,
    borderBottom: "1px solid black",
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  footerSignature: {
    paddingTop: 16,
    fontSize: 12,
    fontFamily: "NotoSansKannada"
  }
});

const FilledENmrPDF: React.FC<FilledENmrPDFProps> = ({
  district,
  taluka,
  panchayat,
  musterRollNo,
  fromDate,
  toDate,
  totalAttendanceCount,
  approvalNo,
  approvalDate,
  workCode,
  workName,
  financialYear,
  totalWage,
  wage,
  workersData
}) => {
  const firstPageRows = 12;
  const subsequentPageRows = 15;
  const totalPages =
    workersData.length > 0
      ? Math.ceil(
          Math.max(0, workersData.length - firstPageRows) / subsequentPageRows
        ) + 1
      : 1;

  const renderPage = (pageNumber: number) => {
    const isFirstPage = pageNumber === 1;
    const startIndex = isFirstPage
      ? 0
      : firstPageRows + (pageNumber - 2) * subsequentPageRows;
    const endIndex = isFirstPage
      ? firstPageRows
      : startIndex + subsequentPageRows;
    const pageData = workersData.slice(startIndex, endIndex);
    const isLastPage = pageNumber === totalPages;

    return (
      <Page
        key={pageNumber}
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        {isFirstPage && (
          <>
            <View style={styles.headerTable}>
              <View style={styles.headerRow}>
                <Text
                  style={[
                    styles.headerCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ರಾಜ್ಯ : KARNATAKA
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ಜಿಲ್ಲೆ : {district}
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ತಾಲೂಕು : {taluka}
                </Text>
                <Text style={styles.headerCell}>ಪಂಚಾಯಿತಿ : {panchayat}</Text>
              </View>
              <View
                style={[styles.infoRow, { borderBottom: "1px solid #9CA3AF" }]}
              >
                <Text
                  style={[
                    styles.infoCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ಮಸ್ಟರ್ ರೋಲ್ ಸಂಖ್ಯೆ : {musterRollNo}
                </Text>
                <Text
                  style={[
                    styles.infoCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ದಿನಾಂಕ ದಿಂದ : {fromDate} ದಿನಾಂಕದ ವರೆಗೆ : {toDate}
                </Text>
                <Text style={styles.infoCell}>
                  ಮುಂಜೂರಾತಿ ಸಂಖ್ಯೆ : {approvalNo} ಮುಂಜೂರಾತಿ ದಿನಾಂಕ :{" "}
                  {approvalDate}
                </Text>
              </View>
              <View
                style={[styles.infoRow, { borderBottom: "1px solid #9CA3AF" }]}
              >
                <Text
                  style={[
                    styles.infoCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                >
                  ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ : {workCode}
                </Text>
                <Text style={styles.workInfoCell}>
                  ಕಾಮಗಾರಿ ಹೆಸರು : {workName} {financialYear}
                </Text>
              </View>
              <View style={styles.emptyRow}>
                <Text
                  style={[
                    styles.emptyCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                ></Text>
                <Text
                  style={[
                    styles.emptyCell,
                    { borderRight: "1px solid #9CA3AF" }
                  ]}
                ></Text>
                <Text style={styles.emptyCell}></Text>
              </View>
            </View>
            <View style={styles.measurementBook}>
              <Text style={styles.measurementHeader}>
                Measurement Book Detail
              </Text>
              <View style={styles.measurementBody}>
                <Text style={{ marginRight: 28 }}>MB NO. </Text>
                <Text>Page NO. </Text>
              </View>
            </View>
            <View style={styles.noteSection}>
              <Text style={styles.noteText}>
                NOTE: Rows Highlighted By Yellow Color indicates attendance has
                been taken from Mobile Devices
              </Text>
              <Text style={styles.mustrollDetailHeader}>Mustroll Detail</Text>
            </View>
          </>
        )}

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "2.5%" }
              ]}
            >
              ಕ್ರ.ಸಂ.
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "12%" }
              ]}
            >
              ಹೆಸರು / ನೋಂದಣಿ ಸಂಖ್ಯೆ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "3%" }
              ]}
            >
              ಜಾತಿ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "3%" }
              ]}
            >
              ಹಳ್ಳಿ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "2%" }
              ]}
            >
              1
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "4%" }
              ]}
            >
              ಒಟ್ಟು ಹಾಜರಾತಿ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "5%" }
              ]}
            >
              ಒಂದು ದಿನದ ವೇತನ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "6%" }
              ]}
            >
              ಹಾಜರಾತಿ ತಕ್ಕಂತೆ ಬಾಕಿ ಹಣ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "4%" }
              ]}
            >
              ಪ್ರಯಾಣ ವೆಚ್ಚ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "6%" }
              ]}
            >
              Implements / Sharpening Charge
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "5%" }
              ]}
            >
              ಒಟ್ಟು ನಗದು ಪಾವತಿ
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "8%" }
              ]}
            >
              Postoffice/ Bank Name
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "7%" }
              ]}
            >
              Postoffice Code/ Branch name
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "7%" }
              ]}
            >
              Postoffice address/ Branch code
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "7%" }
              ]}
            >
              Wagelist No.
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "3.5%" }
              ]}
            >
              Status
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "6%" }
              ]}
            >
              A/c Credited Date
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "5%" }
              ]}
            >
              ಸಹಿ / ಹೆಬ್ಬೆರಳು ಗುರುತು
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                { width: "5%", borderRight: 0 }
              ]}
            >
              Attendance By
            </Text>
          </View>
          {pageData.map((worker) => (
            <View key={worker.slNo} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "2.5%" }]}>
                {worker.slNo}
              </Text>
              <View
                style={[styles.tableCell, styles.nameCell, { width: "12%" }]}
              >
                <Text>{worker.name}</Text>
                <Text>{worker.jobCardNo}</Text>
              </View>
              <Text style={[styles.tableCell, { width: "3%" }]}></Text>
              <Text style={[styles.tableCell, { width: "3%" }]}></Text>
              <Text style={[styles.tableCell, { width: "2%" }]}>P</Text>
              <Text style={[styles.tableCell, { width: "4%" }]}>
                {worker.totalAttendance}
              </Text>
              <Text style={[styles.tableCell, { width: "5%" }]}>
                {worker.oneDayWage}
              </Text>
              <Text style={[styles.tableCell, { width: "6%" }]}>
                {worker.pendingAmountByAttendance}
              </Text>
              <Text style={[styles.tableCell, { width: "4%" }]}>0</Text>
              <Text style={[styles.tableCell, { width: "6%" }]}>0</Text>
              <Text style={[styles.tableCell, { width: "5%" }]}>
                {worker.totalCashPayment}
              </Text>
              <Text
                style={[styles.tableCell, { width: "8%", textAlign: "center" }]}
              >
                {worker.bankName}
              </Text>
              <Text style={[styles.tableCell, { width: "7%" }]}></Text>
              <Text style={[styles.tableCell, { width: "7%" }]}></Text>
              <Text style={[styles.tableCell, { width: "7%" }]}>
                {worker.wagelistNo}
              </Text>
              <Text style={[styles.tableCell, { width: "3.5%" }]}></Text>
              <Text style={[styles.tableCell, { width: "6%" }]}>
                {worker.creditedDate}
              </Text>
              <Text style={[styles.tableCell, { width: "5%" }]}>
                {worker.signature}
              </Text>
              <Text style={[styles.tableCell, { width: "5%", borderRight: 0 }]}>
                {worker.attendanceBy}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.bottomRow]}>
          <Text style={[styles.tableCellLastRow, { width: "2.5%" }]}></Text>
          <Text
            style={[
              styles.tableCellLastRow,
              styles.totalAttendanceLabel,
              { width: "18%" }
            ]}
          >
            ದಿನವಹಿ ಹಾಜರಾತಿ
          </Text>

          <Text
            style={[
              styles.tableCellLastRow,
              styles.totalAttendanceValue,
              { width: "2%" }
            ]}
          >
            {totalAttendanceCount}
          </Text>
          <Text style={[styles.tableCellLastRow, { width: "4%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "5%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "6%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "4%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "6%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "5%" }]}></Text>
          <Text
            style={[
              styles.tableCellLastRow,
              { width: "8%", textAlign: "center" }
            ]}
          ></Text>
          <Text style={[styles.tableCellLastRow, { width: "7%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "7%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "7%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "3.5%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "6%" }]}></Text>
          <Text style={[styles.tableCellLastRow, { width: "5%" }]}></Text>
          <Text
            style={[styles.tableCellLastRow, { width: "5%", borderRight: 0 }]}
          ></Text>
        </View>

        {isLastPage && (
          <View style={styles.footer}>
            <View style={styles.footerCol}>
              <View style={styles.footerBox}>
                <Text style={styles.footerBoxHeader}>
                  ವೇತನ ವಿತರಣೆ ಸಂಬಂಧಿತ ಹಣ(In Rs.)
                </Text>
                <View style={styles.footerBoxRow}>
                  <Text>ವಿತರಿಸಿದ ಹಣ ಪ್ರ.ಜಾತಿ</Text>
                  <Text>0</Text>
                </View>
                <View style={styles.footerBoxRow}>
                  <Text>ವಿತರಿಸಿದ ಹಣ ಪ್ರ.ಪಂ</Text>
                  <Text>0</Text>
                </View>
                <View style={[styles.footerBoxRow, { borderBottom: 0 }]}>
                  <Text>ವಿತರಿಸಿದ ಹಣ ಇತರೆ</Text>
                  <Text>{totalWage}</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.footerCol,
                { justifyContent: "space-between", textAlign: "center" }
              ]}
            >
              <Text style={styles.footerSignature}>ಹಾಜರ ಪಡೆದವರ ಸಹಿ (ಸಹಿ)</Text>
              <Text style={styles.footerSignature}>
                ಪರಿಶೀಲನೆ ಮಾಡಿದವರ ಸಹಿ{"   "}
              </Text>
            </View>
            <View style={styles.footerCol}>
              <View style={styles.footerBoxThirdCol}>
                <Text style={styles.footerBoxHeader}>
                  ಒಟ್ಟು ನಗದು ಪಾವತಿ (In Rs.)
                </Text>
                <View style={styles.footerBoxRow}>
                  <Text>ನಗದು</Text>
                  <Text>{totalWage}</Text>
                </View>
                <View style={[styles.footerBoxRow, { borderBottom: 0 }]}>
                  <Text>ಸರಾಸರಿ ಕೂಲಿ ಸಂಸ್ಥೆ</Text>
                  <Text>{wage}</Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.footerCol,
                {
                  borderRight: 0,
                  justifyContent: "center",
                  textAlign: "center"
                }
              ]}
            >
              <Text style={{ fontSize: 12, fontFamily: "NotoSansKannada" }}>
                ಒಟ್ಟು ಕಾರ್ಮಿಕರ ನಗದು : {workersData.length}
              </Text>
            </View>
          </View>
        )}
      </Page>
    );
  };

  return <>{Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}</>;
};

export default FilledENmrPDF;
