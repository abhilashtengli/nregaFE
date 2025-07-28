import { Base_Url } from "@/lib/constant";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Regular.ttf",
  fontWeight: "normal"
});

Font.register({
  family: "NotoSansKannada",
  src: "/fonts/NotoSansKannada-Bold.ttf",
  fontWeight: "bold"
});

// Type definitions
type GPAbstractProps = {
  workName: string;
  workStatus: string;
  sanctionedYear: string;
  workCode: string;
  workPurposeStatus: string;
  sanctionNoAndDate: string;
  includedInPerspectivePlan: string;
  approvedInAnnualPlan: string;
  estimatedCost: string;
  workStartDate: string;
  expenditureIncurred: {
    unskilled: string;
    semiSkilled: string;
    skilled: string;
    material: string;
    contingency: string;
    total: string;
  };
  employmentGenerated: {
    unskilled: {
      persondays: string;
      totalPersons: string;
    };
    semiSkilled: {
      persondays: string;
      totalPersons: string;
    };
    skilled: {
      persondays: string;
      totalPersons: string;
    };
  };
  musterRollDetails: string;
  beforeWorkPhoto: string | null;
  duringWorkPhoto: string | null;
  afterWorkPhoto: string | null;
};

type GPAbstractData = {
  GpAbstractData: GPAbstractProps;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    lineHeight: 1.1,
    padding: 12,
    backgroundColor: "white"
  },
  container: {
    flexDirection: "column"
  },
  header: {
    textAlign: "center",
    marginBottom: 8
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 1
  },
  redBanner: {
    backgroundColor: "white",
    border: "1px solid black",
    padding: 4,
    marginTop: 4,
    marginBottom: 4
  },
  redBannerText: {
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    fontSize: 9
  },
  dateText: {
    fontSize: 8,
    marginTop: 2
  },
  locationTable: {
    border: "1px solid black",
    marginBottom: 8
  },
  locationRow: {
    flexDirection: "row"
  },
  locationCell: {
    border: "1px solid black",
    padding: 4,
    backgroundColor: "white",
    fontWeight: "normal",
    fontSize: 8,
    flex: 1
  },
  table: {
    border: "1px solid black",
    marginBottom: 8
  },
  tableRow: {
    flexDirection: "row"
  },
  tableRowForExpenditure: {
    flexDirection: "row"
  },
  tableHeaderCell: {
    border: "1px solid black",
    padding: 4,
    backgroundColor: "white",
    fontWeight: "normal",
    fontSize: 8
  },
  tableCell: {
    border: "1px solid black",
    padding: 4,
    fontSize: 8,
    fontWeight: "normal"
  },
  tableCellCenter: {
    border: "1px solid black",
    padding: 4,
    fontSize: 8,
    fontWeight: "normal",
    textAlign: "center"
  },
  sectionHeader: {
    backgroundColor: "white",
    padding: 4,
    borderBottom: "1px solid black",
    fontWeight: "bold",
    fontSize: 8
  },
  photoSection: {
    border: "1px solid black"
  },
  photoHeaderRow: {
    flexDirection: "row"
  },
  photoHeaderCell: {
    border: "1px solid black",
    padding: 4,
    backgroundColor: "white",
    fontWeight: "normal",
    fontSize: 8,
    textAlign: "center",
    flex: 1
  },
  photoRow: {
    flexDirection: "row",
    height: 80
  },
  photoCell: {
    border: "1px solid black",
    padding: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  photoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  photoPlaceholder: {
    alignItems: "center",
    justifyContent: "center"
  },
  photoPlaceholderBox: {
    width: 20,
    height: 20,
    backgroundColor: "#d1d5db",
    marginBottom: 2
  },
  photoPlaceholderText: {
    color: "#6b7280",
    fontSize: 7
  },
  kannadaText: {
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  englishText: {
    fontFamily: "Helvetica",
    fontWeight: "normal"
  },
  workNameText: {
    fontSize: 8,
    fontWeight: "normal",
    lineHeight: 1.2
  }
});

const GPAbstractPDF: React.FC<GPAbstractData> = ({ GpAbstractData }) => {
  const {
    workName,
    workStatus,
    workPurposeStatus,
    sanctionNoAndDate,
    includedInPerspectivePlan,
    approvedInAnnualPlan,
    estimatedCost,
    workStartDate,
    workCode,
    sanctionedYear,
    expenditureIncurred,
    employmentGenerated,
    musterRollDetails,
    beforeWorkPhoto,
    duringWorkPhoto
  } = GpAbstractData;

  const estimatedCompletionTime = "0.6";
  const natureOfWork = "";
  const startStatus = "";
  const endStatus = "";
  const startLocation = "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Govt. of India</Text>
            <Text style={styles.headerText}>Ministry of Rural Development</Text>
            <Text style={styles.headerText}>
              Department of Rural Development
            </Text>
            <View style={styles.redBanner}>
              <Text style={styles.redBannerText}>
                The Mahatma Gandhi National Rural Employment Guarantee Act
              </Text>
            </View>
            <Text style={styles.dateText}>Wednesday, July 9, 2025</Text>
          </View>

          {/* Location Header */}
          <View style={styles.locationTable}>
            <View style={styles.locationRow}>
              <Text style={styles.locationCell}>State : KARNATAKA</Text>
              <Text style={styles.locationCell}>District : KALABURAGI</Text>
              <Text style={styles.locationCell}>Block : JEVARGI</Text>
              <Text style={styles.locationCell}>Panchayat : RANJANGI</Text>
            </View>
          </View>

          {/* Work Details Table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Work Name
              </Text>
              <View style={[styles.tableCell, { width: "40%" }]}>
                <Text style={styles.workNameText}>
                  <Text style={styles.englishText}>({workCode})</Text>{" "}
                  <Text style={styles.kannadaText}>{workName}</Text>{" "}
                  <Text style={styles.englishText}>({sanctionedYear})</Text>
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Nature of Work
              </Text>
              <Text style={[styles.tableCell, { width: "40%" }]}>
                {natureOfWork}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Work Status
              </Text>
              <Text style={[styles.tableCell, { width: "40%" }]}>
                {workStatus}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Work Purpose status
              </Text>
              <Text style={[styles.tableCell, { width: "40%" }]}>
                {workPurposeStatus}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "20%" }]}>
                Scope of Work
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  { width: "16.67%", textAlign: "center" }
                ]}
              >
                Start Status
              </Text>
              <Text style={[styles.tableCell, { width: "23.3%" }]}>
                {startStatus}
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  { width: "16.67%", textAlign: "center" }
                ]}
              >
                End Status
              </Text>
              <Text style={[styles.tableCell, { width: "23.3%" }]}>
                {endStatus}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Sanction No. and Sanction Date : {sanctionNoAndDate}
              </Text>

              <Text style={[styles.tableHeaderCell, { width: "40%" }]}>
                Whether Included in Five Year Perspective Plan :
                {includedInPerspectivePlan}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                Whether Work Approved in Annual Plan : {approvedInAnnualPlan}
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "40%" }]}>
                Estimated Cost (In Lakhs) : {estimatedCost}
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeaderCell, { width: "60%" }]}>
                  Estimated Completion Time (in Months)
                </Text>
                <Text style={[styles.tableCell, { width: "40%" }]}>
                  {estimatedCompletionTime}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "20%" }]}>
                Location
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "16.67%" }]}>
                Start Location
              </Text>
              <Text style={[styles.tableCell, { width: "63.33%" }]}>
                {startLocation}
              </Text>
            </View>
          </View>

          {/* Sanction and Planning Details */}

          {/* Expenditure Incurred */}
          <View style={styles.table}>
            <Text style={styles.sectionHeader}>
              Expenditure Incurred (in Rs.)
            </Text>
            <View style={styles.tableRowForExpenditure}>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.67%" }
                ]}
              >
                Unskilled
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.67%" }
                ]}
              >
                Semi-Skilled
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.67%" }
                ]}
              >
                Skilled
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.67%" }
                ]}
              >
                Material
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.67%" }
                ]}
              >
                Contingency
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "16.65%" }
                ]}
              >
                Total
              </Text>
            </View>
            <View style={styles.tableRowForExpenditure}>
              <Text style={[styles.tableCellCenter, { width: "16.67%" }]}>
                {expenditureIncurred.unskilled}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "16.67%" }]}>
                {expenditureIncurred.semiSkilled}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "16.67%" }]}>
                {expenditureIncurred.skilled}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "16.67%" }]}>
                {expenditureIncurred.material}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "16.67%" }]}>
                {expenditureIncurred.contingency}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "16.65%" }]}>
                {expenditureIncurred.total}
              </Text>
            </View>
          </View>

          {/* Employment Generated */}
          <View style={styles.table}>
            <Text style={styles.sectionHeader}>Employment Generated</Text>
            <View style={styles.tableRowForExpenditure}>
              <Text
                style={[styles.tableHeaderCell, { width: "33.33%" }]}
              ></Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "33.33%" }
                ]}
              >
                Persondays
              </Text>
              <Text
                style={[
                  styles.tableHeaderCell,
                  styles.tableCellCenter,
                  { width: "33.34%" }
                ]}
              >
                Total No. of Persons Given Work
              </Text>
            </View>
            <View style={styles.tableRowForExpenditure}>
              <Text style={[styles.tableHeaderCell, { width: "33.33%" }]}>
                Unskilled
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.33%" }]}>
                {employmentGenerated.unskilled.persondays}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.34%" }]}>
                {employmentGenerated.unskilled.totalPersons}
              </Text>
            </View>
            <View style={styles.tableRowForExpenditure}>
              <Text style={[styles.tableHeaderCell, { width: "33.33%" }]}>
                Semi-Skilled
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.33%" }]}>
                {employmentGenerated.semiSkilled.persondays}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.34%" }]}>
                {employmentGenerated.semiSkilled.totalPersons}
              </Text>
            </View>
            <View style={styles.tableRowForExpenditure}>
              <Text style={[styles.tableHeaderCell, { width: "33.33%" }]}>
                Skilled
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.33%" }]}>
                {employmentGenerated.skilled.persondays}
              </Text>
              <Text style={[styles.tableCellCenter, { width: "33.34%" }]}>
                {employmentGenerated.skilled.totalPersons}
              </Text>
            </View>
          </View>

          {/* Additional Details */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "50%" }]}>
                Distinct Number of Muster Rolls used(Amount)
              </Text>
              <Text style={[styles.tableCell, { width: "50%" }]}>
                {musterRollDetails}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeaderCell, { width: "50%" }]}>
                Work start date
              </Text>
              <Text style={[styles.tableCell, { width: "50%" }]}>
                {workStartDate}
              </Text>
            </View>
          </View>

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            <Text style={styles.sectionHeader}>Photo Uploaded of Work</Text>
            <View style={styles.photoHeaderRow}>
              <Text style={styles.photoHeaderCell}>
                Before Start of Work(Work Site)
              </Text>
              <Text style={styles.photoHeaderCell}>
                During Execution of Works
              </Text>
            </View>
            <View style={styles.photoRow}>
              <View style={styles.photoCell}>
                {beforeWorkPhoto ? (
                  //   <Image style={styles.photoImage} src={beforeWorkPhoto} />
                  <Image
                    style={styles.photoImage}
                    src={`${Base_Url}/proxy-image?url=${encodeURIComponent(
                      beforeWorkPhoto
                    )}`}
                    cache={false}
                  />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <View style={styles.photoPlaceholderBox}></View>
                    <Text style={styles.photoPlaceholderText}>
                      Photo Not Available
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.photoCell}>
                {duringWorkPhoto ? (
                  <Image
                    style={styles.photoImage}
                    src={`${Base_Url}/proxy-image?url=${encodeURIComponent(
                      duringWorkPhoto
                    )}`}
                    cache={false}
                  />
                ) : (
                  //   <Image style={styles.photoImage} src={duringWorkPhoto} />
                  <View style={styles.photoPlaceholder}>
                    <View style={styles.photoPlaceholderBox}></View>
                    <Text style={styles.photoPlaceholderText}>
                      Photo Not Available
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GPAbstractPDF;
export type { GPAbstractData, GPAbstractProps };
