import type React from "react";
import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Register Kannada font
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
type Material = {
  materialName: string;
  quantity: string;
};

export type MaterialSupplyRegisterProps = {
  workCode: string;
  workName: string;
  vendorName: string;
  materialData: Material[];
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  header: {
    textAlign: "center",
    marginBottom: 7,
    color: "red", // Medium Red
    fontFamily: "NotoSansKannada",
    lineHeight: 1.2
  },
  mainHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    letterSpacing: 1
  },
  subHeading: {
    fontSize: 12,
    textDecoration: "underline"
  },
  detailsSection: {
    fontFamily: "NotoSansKannada",
    color: "red", // Medium Red
    fontSize: 11,
    lineHeight: 2.5,
    fontWeight: "bold",
    marginBottom: 10
  },
  detailText: {
    fontWeight: "bold"
  },
  table: {
    border: "1px solid #FFC7CE" // Light Red
  },
  tableRow: {
    flexDirection: "row"
  },
  tableHeader: {
    backgroundColor: "white", // Very light red for header background
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    color: "red"
  },
  tableCell: {
    borderRight: "1px solid #FFC7CE",
    borderTop: "1px solid #FFC7CE",
    padding: 8,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  slNoCell: {
    width: "10%"
  },
  materialNameCell: {
    width: "35%",
    textAlign: "center",
    fontFamily: "NotoSansKannada"
  },
  unitCell: {
    width: "15%",
    fontFamily: "NotoSansKannada"
  },
  dateCell: {
    width: "15%"
  },
  signatureCell: {
    width: "15%"
  },
  miscCell: {
    width: "10%"
  }
});

const MaterialSupplyRegisterPDF: React.FC<MaterialSupplyRegisterProps> = ({
  workCode,
  workName,
  vendorName,
  materialData
}) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainHeading}>ಸಾಮಗ್ರಿ ವಿತರಣಾ ವಹಿ</Text>
          <Text style={styles.subHeading}>ಸಾಮಗ್ರಿಗಳ ವಿತರಣೆ</Text>
        </View>
        <View style={styles.detailsSection}>
          <Text>
            <Text style={styles.detailText}>1. ಕಾಮಗಾರಿ ಹೆಸರು :</Text> {workName}
          </Text>
          <Text>
            <Text style={styles.detailText}>2. ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ :</Text>{" "}
            {workCode}
          </Text>
          <Text>
            <Text style={styles.detailText}>3. ಸಾಮಗ್ರಿ ಸರಬರಾಜುದಾರ :</Text>{" "}
            {vendorName}
          </Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <Text style={[styles.tableCell, styles.slNoCell]}>ಕ್ರಮ ಸಂಖ್ಯೆ</Text>
            <Text style={[styles.tableCell, styles.materialNameCell]}>
              ಸಾಮಗ್ರಿಗಳ ಹೆಸರು
            </Text>
            <Text style={[styles.tableCell, styles.unitCell]}>ಪರಿಮಾಣ</Text>
            <Text style={[styles.tableCell, styles.dateCell]}>
              ವಿತರಿಸಿದ ದಿನಾಂಕ
            </Text>
            <Text style={[styles.tableCell, styles.signatureCell]}>
              ಸಾಮಗ್ರಿ ಪಡೆದವರ ಸಹಿ
            </Text>
            <Text
              style={[styles.tableCell, styles.miscCell, { borderRight: 0 }]}
            >
              ಪರ
            </Text>
          </View>

          {/* Table Body */}
          {materialData.map((material, index) => (
            <View key={index} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCell, styles.slNoCell]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.materialNameCell]}>
                {material.materialName}
              </Text>
              <Text style={[styles.tableCell, styles.unitCell]}>
                {material.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.dateCell]}></Text>
              <Text style={[styles.tableCell, styles.signatureCell]}></Text>
              <Text
                style={[styles.tableCell, styles.miscCell, { borderRight: 0 }]}
              ></Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
};

export default MaterialSupplyRegisterPDF;
