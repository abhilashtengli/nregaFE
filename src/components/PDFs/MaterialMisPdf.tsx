import type React from "react";
import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Font registration for Kannada support
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf"
});
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Types matching the backend response
interface Material {
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
  billNo: string;
  billAmount: string;
  billDate: string;
  dateOfPayment: string;
}

interface MaterialMisData {
  workCode: string;
  vendorName: string;
  financialYear: string;
  materialData: Material[];
  workName: string;
  materialVoucherInfo: {
    vendorName: string;
    financialYear: string;
  };
}

interface MaterialMisPDFProps {
  data: MaterialMisData;
}

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 52,
    backgroundColor: "white"
  },
  container: {
    width: "100%",
    maxWidth: 794,
    margin: "0 auto",
    border: "1px solid black"
  },
  workCodeHeader: {
    padding: "4px 2px",
    backgroundColor: "#e6d3f7", // purple-200 equivalent
    borderBottom: "1px solid black",
    fontWeight: "bold",
    fontSize: 8
  },
  materialSection: {
    width: "100%"
  },
  billInfoRow: {
    flexDirection: "row",
    fontSize: 6,
    backgroundColor: "#f0e3ee",
    borderBottom: "1px solid black"
  },
  billInfoCell: {
    flex: 1,
    padding: "4px 2px",
    borderRight: "1px solid black",
    fontWeight: "bold"
  },
  billInfoCellLast: {
    flex: 1,
    padding: "4px 2px",
    fontWeight: "bold"
  },
  vendorInfoRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    backgroundColor: "#f0e3ee",
    fontSize: 6
  },
  vendorInfoCellLeft: {
    flex: 1,
    padding: "4px 2px",
    borderRight: "1px solid black",
    fontWeight: "bold"
  },
  vendorInfoCellRight: {
    flex: 1,
    padding: "4px 2px",
    textAlign: "right",
    fontWeight: "bold"
  },
  materialHeaderRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    backgroundColor: "#f0e3ee",
    fontSize: 6
  },
  materialHeaderCell: {
    flex: 1,
    padding: "4px 2px",
    borderRight: "1px solid black",
    fontWeight: "bold",
    color: "#2563eb" // blue-600 equivalent
  },
  materialHeaderCellLast: {
    flex: 1,
    padding: "4px 2px",
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center"
  },
  materialHeaderCellCenter: {
    flex: 1,
    padding: "4px 2px",
    borderRight: "1px solid black",
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center"
  },
  materialDataRow: {
    flexDirection: "row",
    fontWeight: "bold",
    borderBottom: "1px solid black",
    backgroundColor: "#f0e3ee",
    fontSize: 6
  },
  materialDataCell: {
    flex: 1,
    padding: "4px 2px",
    borderRight: "1px solid black"
  },
  materialDataCellLast: {
    flex: 1,
    padding: "4px 2px"
  },
  totalAmountRow: {
    flexDirection: "row",
    backgroundColor: "#f0e3ee",
    fontSize: 6
  },
  totalAmountCellLeft: {
    flex: 3.03,
    padding: 4,
    textAlign: "center",
    borderRight: "1px solid black",
    fontWeight: "bold"
  },
  totalAmountCellRight: {
    flex: 0.97,
    padding: 4,
    textAlign: "center",
    fontWeight: "bold"
  },
  pageFooter: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "grey"
  },
  boldLabel: {
    fontWeight: "bold"
  },
  kannadaText: {
    fontFamily: "NotoSansKannada"
  }
});

const MaterialMisPDF: React.FC<MaterialMisPDFProps> = ({ data }) => {
  if (!data) {
    return (
      <Page size="A4" style={styles.page}>
        <Text>No data provided.</Text>
      </Page>
    );
  }
  const { workCode, vendorName, financialYear, materialData, workName } = data;
  const totalAmount = materialData.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount || "0"),
    0
  );

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Work Code Header - Fixed on every page */}
        <View style={styles.workCodeHeader} fixed>
          <Text>
            Work Code: <Text style={styles.kannadaText}>{workName}</Text> (
            {financialYear})({workCode})
          </Text>
        </View>

        {/* Material Sections */}
        {materialData.map((material, index) => (
          <View key={index} style={styles.materialSection} wrap={false}>
            {/* Bill Information Row */}
            <View style={styles.billInfoRow}>
              <View style={styles.billInfoCell}>
                <Text>
                  <Text style={styles.boldLabel}>Bill No.:</Text>
                  {material.billNo}
                </Text>
              </View>
              <View style={styles.billInfoCell}>
                <Text>
                  <Text style={styles.boldLabel}>Bill Amount:</Text>
                  {material.billAmount}
                </Text>
              </View>
              <View style={styles.billInfoCell}>
                <Text>
                  <Text style={styles.boldLabel}>Bill Date:</Text>
                  {material.billDate}
                </Text>
              </View>
              <View style={styles.billInfoCellLast}>
                <Text>
                  <Text style={styles.boldLabel}>Date of Payment</Text>
                  {material.dateOfPayment}
                </Text>
              </View>
            </View>
            {/* Vendor Information Row */}
            <View style={styles.vendorInfoRow}>
              <View style={styles.vendorInfoCellLeft}>
                <Text>
                  <Text style={styles.boldLabel}>Vendor name:</Text>
                  {vendorName}
                </Text>
              </View>
              <View style={styles.vendorInfoCellRight}>
                <Text>
                  <Text style={styles.boldLabel}>Financial Year:</Text>
                  {financialYear}
                </Text>
              </View>
            </View>
            {/* Material Header Row */}
            <View style={styles.materialHeaderRow}>
              <View style={styles.materialHeaderCell}>
                <Text>Material</Text>
              </View>
              <View style={styles.materialHeaderCellCenter}>
                <Text>Unit Price (In Rupees)</Text>
              </View>
              <View style={styles.materialHeaderCellCenter}>
                <Text>Quantity</Text>
              </View>
              <View style={styles.materialHeaderCellLast}>
                <Text>Amount (In Rupees)</Text>
              </View>
            </View>
            {/* Material Data Row */}
            <View style={styles.materialDataRow}>
              <View style={styles.materialDataCell}>
                <Text>{material.material}</Text>
              </View>
              <View style={styles.materialDataCell}>
                <Text>{material.unitPrice}</Text>
              </View>
              <View style={styles.materialDataCell}>
                <Text>{material.quantity}</Text>
              </View>
              <View style={styles.materialDataCellLast}>
                <Text>{material.amount}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Total Amount Row - appears only once at the end */}
        <View style={styles.totalAmountRow}>
          <View style={styles.totalAmountCellLeft}>
            <Text>Total Amount</Text>
          </View>
          <View style={styles.totalAmountCellRight}>
            <Text>{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Page number footer - fixed on every page */}
      <Text
        style={styles.pageFooter}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>
  );
};

export default MaterialMisPDF;
export type { MaterialMisData, Material };
