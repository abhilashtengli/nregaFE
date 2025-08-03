import type React from "react";
import { Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { numberToWords } from "@/utils/numberToWords";

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

// --- TYPES ---
interface Material {
  material: string;
  unitPrice: string;
  quantity: string;
  amount: string;
}

export interface Bill {
  billDate: string;
  billNo: string;
  materialData: Material[];
}

export interface InvoicePDFProps {
  workCode: string;
  workName: string;
  vendorGstOne: string;
  vendorNameOne: string;
  block: string;
  district: string;
  panchayat: string;
  bill: Bill;
}

// --- STYLES ---
const brandColor = "#082f49"; // A deep, professional blue
const secondaryColor = "#f0f9ff"; // A very light blue for backgrounds
const textColor = "#334155";
const lightTextColor = "#64748b";
const borderColor = "#e2e8f0";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 30,
    backgroundColor: "#ffffff",
    color: textColor
  },
  headerContainer: {
    backgroundColor: secondaryColor,
    padding: 20,
    textAlign: "center",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  vendorName: {
    color: brandColor,
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4
  },
  vendorAddress: {
    fontSize: 9,
    color: lightTextColor
  },
  metaInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottom: `1px solid ${borderColor}`,
    borderTop: `1px solid ${borderColor}`,
    backgroundColor: "#f8fafc"
  },
  billToContainer: {
    flex: 1
  },
  billToTitle: {
    fontFamily: "Helvetica-Bold",
    color: brandColor,
    fontSize: 10,
    marginBottom: 4
  },
  billToText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold"
  },
  invoiceMetaContainer: {
    flex: 1,
    textAlign: "right"
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3
  },
  metaLabel: {
    fontFamily: "Helvetica-Bold",
    marginRight: 5
  },
  workDetailsContainer: {
    padding: 20
  },
  workName: {
    fontFamily: "NotoSansKannada",
    fontWeight: "normal",
    fontSize: 12,
    color: brandColor
  },
  workCode: {
    fontSize: 9,
    color: lightTextColor,
    marginTop: 2
  },
  table: {
    border: `1px solid ${borderColor}`,
    borderRadius: 6,
    overflow: "hidden" // Ensures border-radius is respected by children
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: brandColor,
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    borderBottom: "none" // The border is handled by the row below
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: `1px solid ${borderColor}`
  },
  tableCell: {
    padding: 8,
    textAlign: "center",
    borderRight: `1px solid ${borderColor}`
  },
  slNoCell: { width: "6%" },
  itemCell: { width: "32%", textAlign: "left" },
  unitCell: { width: "7%" },
  quantityCell: { width: "8%" },
  priceCell: { width: "11%", textAlign: "right" },
  gstCell: { width: "10%", textAlign: "right" },
  gstAmountCell: { width: "10%", textAlign: "right" },
  totalCell: {
    width: "16%",
    textAlign: "center",
    borderRight: "none",
    paddingRight: 3
  },
  tableFooterRow: {
    flexDirection: "row",
    borderTop: `2px solid ${brandColor}`,
    backgroundColor: secondaryColor
  },
  totalLabelCell: {
    width: "84%",
    textAlign: "right",
    padding: 8,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    borderRight: `1px solid ${borderColor}`
  },
  totalValueCell: {
    width: "16%",
    textAlign: "right",
    padding: 8,
    fontFamily: "Helvetica-Bold",
    fontSize: 10
  },
  summaryContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  amountInWordsContainer: {
    width: "60%",
    paddingRight: 20
  },
  summaryLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 5,
    color: brandColor
  },
  totalsContainer: {
    width: "40%",
    backgroundColor: secondaryColor,
    padding: 10,
    borderRadius: 6
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 9
  },
  finalTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingTop: 5,
    borderTop: `1px solid ${borderColor}`,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: brandColor
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  },
  kannadaText: {
    fontFamily: "NotoSansKannada"
  }
});

// --- COMPONENT ---
const InvoicePDF: React.FC<InvoicePDFProps> = ({
  workCode,
  workName,
  vendorGstOne,
  vendorNameOne,
  block,
  district,
  panchayat,
  bill
}) => {
  if (!bill) {
    return null;
  }

  const totalAmount = bill.materialData.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount || "0"),
    0
  );
  const amountInWords = numberToWords(totalAmount);

  return (
    <Page size="A4" style={styles.page}>
      <View>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.vendorName}>{vendorNameOne}</Text>
          <Text style={styles.vendorAddress}>
            R/O {panchayat}, TQ {block}, DIST {district} | GSTIN: {vendorGstOne}
          </Text>
        </View>

        {/* Bill To and Invoice Meta */}
        <View style={styles.metaInfoContainer}>
          <View style={styles.billToContainer}>
            <Text style={styles.billToTitle}>BILL TO:</Text>
            <Text style={styles.billToText}>
              Shipping To: GP PDO and PRESIDENT
            </Text>
          </View>
          <View style={styles.invoiceMetaContainer}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Invoice No.:</Text>
              <Text>{bill.billNo}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date:</Text>
              <Text>{bill.billDate}</Text>
            </View>
          </View>
        </View>

        {/* Name of Work */}
        <View style={styles.workDetailsContainer}>
          <Text style={styles.workName}>
            Name of Work : {workName} {workCode}
          </Text>
          {/* <Text style={styles.workCode}>Work Code: {workCode}</Text> */}
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.tableCell, styles.slNoCell]}>Sl.No</Text>
            <Text style={[styles.tableCell, styles.itemCell]}>
              Item Description
            </Text>
            <Text style={[styles.tableCell, styles.unitCell]}>Unit</Text>
            <Text style={[styles.tableCell, styles.quantityCell]}>Qty</Text>
            <Text style={[styles.tableCell, styles.priceCell]}>Price</Text>
            <Text style={[styles.tableCell, styles.gstCell]}>GST %</Text>
            <Text style={[styles.tableCell, styles.gstAmountCell]}>
              GST Amt
            </Text>
            <Text style={[styles.tableCell, styles.totalCell]}>Total</Text>
          </View>

          {/* Table Body */}
          {bill.materialData.map((item, index) => (
            <View key={index} style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableCell, styles.slNoCell]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.itemCell]}>
                {item.material}
              </Text>
              <Text style={[styles.tableCell, styles.unitCell]}>0</Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.priceCell]}>
                {Number.parseFloat(item.unitPrice).toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.gstCell]}>0%</Text>
              <Text style={[styles.tableCell, styles.gstAmountCell]}>0.00</Text>
              <Text style={[styles.tableCell, styles.totalCell]}>
                {Number.parseFloat(item.amount).toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Table Footer */}
          <View style={styles.tableFooterRow}>
            <Text style={styles.totalLabelCell}> Total</Text>
            <Text style={styles.totalValueCell}>
              {new Intl.NumberFormat("en-IN").format(totalAmount)}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer} wrap={false}>
          <View style={styles.amountInWordsContainer}>
            <Text style={styles.summaryLabel}>Amount in Words</Text>
            <Text>{amountInWords}</Text>
          </View>
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text>Sub Total:</Text>
              <Text>{new Intl.NumberFormat("en-IN").format(totalAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>State GST:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Centre GST:</Text>
              <Text>0.00</Text>
            </View>
            <View style={styles.finalTotalRow}>
              <Text>Total Amount:</Text>
              <Text>{new Intl.NumberFormat("en-IN").format(totalAmount)}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>
  );
};

export default InvoicePDF;
