import { Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import mnreaga from "@/assets/MGNREGA logo.jpg";
import state_logo from "@/assets/State logo.jpeg";
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
interface MGNREGAData {
  state: string;
  district: string;
  taluka: string;
  gramPanchayat: string;
  workCategory: string;
  workCode: string;
  workName: string;
  sanctionedYear: string;
  projectLocation: string;
  grama: string;
  gramaPanchayat: string;
  talukaDetails: string;
  districtDetails: string;
  legislativeAssemblyConstituency: string;
  lokSabhaConstituency: string;
  stateDetails: string;
  workStartDate: string;
  technicalSanctionNo: string;
  estimateLabourCharge: string;
  estimatedMaterialCharge: string;
  estimatedSkilledCost: string;
  estimatedSemiSkilledCost: string;
  contingencyCost: string;
  estimatedTotal: string;
  throughMGNREGAfunding: string;
  spentLabourCharges?: string;
  spentMaterialCharges?: string;
  spentTotalCharges?: string;
}

interface MGNREGAFrontPagePDFProps {
  frontPageData: MGNREGAData;
}

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.3,
    padding: 25,
    backgroundColor: "white"
  },
  decorativeBorder: {
    border: "3px solid black",
    padding: 20,
    backgroundColor: "white"
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },
  logoContainer: {
    width: 80,
    height: 70,
    flexShrink: 0
  },
  StatelogoContainer: {
    width: 70,
    height: 70,
    flexShrink: 0
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  centerTitle: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 20
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 9,
    fontFamily: "NotoSansKannada"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 8,
    fontFamily: "NotoSansKannada"
  },
  locationText: {
    fontSize: 12,
    marginBottom: 6,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  gramPanchayatTitle: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "NotoSansKannada"
  },
  horizontalLine: {
    borderBottom: "2px solid black",
    marginBottom: 20
  },
  contentSection: {
    flexDirection: "column"
  },
  contentItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start"
  },
  serialNumber: {
    fontWeight: "normal",
    marginRight: 8,
    width: 25,
    fontSize: 10
  },
  contentText: {
    flex: 1,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 1.4
  },
  workCodeContextText: {
    flex: 1,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 1.4,
    marginTop: 18
  },
  underlineText: {
    textDecoration: "underline",
    marginTop: 3
  },
  locationGrid: {
    marginLeft: 30,
    marginBottom: 12
  },
  locationRow: {
    flexDirection: "row",
    marginBottom: 6
  },
  locationLeft: {
    width: "50%",
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  locationRight: {
    width: "50%",
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  costSection: {
    flex: 1
  },
  costHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6
  },
  costHeaderText: {
    fontWeight: "normal",
    fontFamily: "NotoSansKannada",
    fontSize: 10,
    width: "40%"
  },
  costValues: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between"
  },
  costValue: {
    fontWeight: "normal",
    fontSize: 10,
    fontFamily: "NotoSansKannada"
  },
  subDetails: {
    fontSize: 10,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  subDetailItem: {
    marginBottom: 4
  },
  assetDetails: {
    flex: 1,
    flexDirection: "column"
  },
  assetSubItem: {
    marginLeft: 20,
    fontSize: 10,
    marginTop: 6,
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  kannadaData: {
    fontFamily: "NotoSansKannada",
    fontWeight: "bold"
  },
  headerKannadaData: {
    fontFamily: "NotoSansKannada",
    fontWeight: "normal"
  },
  englishData: {
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  breakLine: {
    marginTop: 6,
    marginBottom: 2
  }
});

const FrontPagePDF: React.FC<MGNREGAFrontPagePDFProps> = ({
  frontPageData
}) => {
  const {
    state,
    district,
    taluka,
    gramPanchayat,
    workCategory,
    workCode,
    sanctionedYear,
    technicalSanctionNo,
    projectLocation,
    grama,
    gramaPanchayat,
    talukaDetails,
    districtDetails,
    legislativeAssemblyConstituency,
    lokSabhaConstituency,
    stateDetails,
    workStartDate,
    workName,
    estimateLabourCharge,
    estimatedMaterialCharge,
    estimatedTotal,
    throughMGNREGAfunding,
    spentLabourCharges = "",
    spentMaterialCharges = "",
    spentTotalCharges = ""
  } = frontPageData;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.decorativeBorder}>
        {/* Header Section with Logos */}
        <View style={styles.headerSection}>
          {/* Left Logo */}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={mnreaga} />
          </View>

          {/* Center Title */}
          <View style={styles.centerTitle}>
            <Text style={styles.mainTitle}>
              ಮಹಾತ್ಮಾ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ {"  "}
            </Text>
            <Text style={styles.subtitle}>ಉದ್ಯೋಗ ಖಾತರಿ ಯೋಜನೆ {"  "}</Text>
            <Text style={styles.locationText}>
              ರಾಜ್ಯ: <Text style={styles.headerKannadaData}>{state}</Text>,
              ಜಿಲ್ಲೆ: <Text style={styles.headerKannadaData}>{district}</Text>,
              ತಾ: <Text style={styles.headerKannadaData}>{taluka}</Text>
            </Text>
            <Text style={styles.gramPanchayatTitle}>
              ಗ್ರಾಮ ಪಂಚಾಯತಿ:{" "}
              <Text style={styles.headerKannadaData}>{gramPanchayat}</Text>
            </Text>
          </View>

          {/* Right Logo */}
          <View style={styles.StatelogoContainer}>
            <Image style={styles.logo} src={state_logo} />
          </View>
        </View>

        {/* Horizontal Line */}
        <View style={styles.horizontalLine} />

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* 1. Work Details */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>1.</Text>
            <View style={styles.assetDetails}>
              <Text style={styles.contentText}>
                ಕಾಮಗಾರಿ ಹೆಸರು:{" "}
                <Text style={styles.kannadaData}>{workName}</Text>
              </Text>
              <View style={styles.breakLine}>
                <Text style={styles.workCodeContextText}>
                  ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ:{" "}
                  <Text style={[styles.underlineText, styles.englishData]}>
                    {workCode}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* 2. Sanctioned Year */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>2.</Text>
            <Text style={styles.contentText}>
              ಕಾಮಗಾರಿ ಅನುಮೋದನ ವರ್ಷ:{" "}
              <Text style={[styles.underlineText, styles.englishData]}>
                {sanctionedYear}
              </Text>
            </Text>
          </View>

          {/* 3. Technical Sanction */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>3.</Text>
            <Text style={styles.contentText}>
              ತಾಂತ್ರಿಕ ಅನುಮತಿ ಪತ್ರ ಸಂಖ್ಯೆ:{" "}
              <Text style={[styles.underlineText, styles.englishData]}>
                {technicalSanctionNo}
              </Text>
            </Text>
          </View>

          {/* 4. Project Location */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>4.</Text>
            <Text style={styles.contentText}>
              ಕಾಮಗಾರಿ ಸ್ಥಳ:{" "}
              <Text style={[styles.underlineText, styles.kannadaData]}>
                {projectLocation}
              </Text>
            </Text>
          </View>

          {/* Location Grid */}
          <View style={styles.locationGrid}>
            <View style={styles.locationRow}>
              <Text style={styles.locationLeft}>
                ಎ. ಗ್ರಾಮ : <Text style={styles.kannadaData}>{grama}</Text>
              </Text>
              <Text style={styles.locationRight}>
                ಬಿ. ಗ್ರಾಮ ಪಂಚಾಯತಿ :{" "}
                <Text style={styles.kannadaData}>{gramaPanchayat}</Text>
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLeft}>
                ಸಿ. ತಾಲೂಕು :{" "}
                <Text style={styles.kannadaData}>{talukaDetails}</Text>
              </Text>
              <Text style={styles.locationRight}>
                ಡಿ. ಜಿಲ್ಲೆ :{" "}
                <Text style={styles.kannadaData}>{districtDetails}</Text>
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLeft}>
                ಇ. ವಿಧಾನಸಭಾ ಮತದಾತಿ :{" "}
                <Text style={styles.kannadaData}>
                  {legislativeAssemblyConstituency}
                </Text>
              </Text>
              <Text style={styles.locationRight}>
                ಎಫ್. ಲೋಕ ಸಭಾ ಮತದಾತಿ :{" "}
                <Text style={styles.kannadaData}>{lokSabhaConstituency}</Text>
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLeft}>
                ಜಿ. ರಾಜ್ಯ :{" "}
                <Text style={styles.kannadaData}>{stateDetails}</Text>
              </Text>
            </View>
          </View>

          {/* 5. Administrative Category */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>5.</Text>
            <Text style={styles.contentText}>
              ಕಾಮಗಾರಿ ಅನುಷ್ಠಾನ ಏಜೆನ್ಸಿ: Gram Panchayat (3)
            </Text>
          </View>

          {/* 6. Department */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>6.</Text>
            <Text style={styles.contentText}>
              ಕಾಮಗಾರಿ ವರ್ಗ (ಗುಚ್ಚ):{" "}
              <Text style={[styles.underlineText, styles.englishData]}>
                {workCategory}
              </Text>
            </Text>
          </View>

          {/* 7. Work Start Date */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>7.</Text>
            <Text style={styles.contentText}>
              ಕಾಮಗಾರಿ ಪ್ರಾರಂಭ ದಿನಾಂಕ :{" "}
              <Text style={[styles.underlineText, styles.englishData]}>
                {workStartDate}
              </Text>
            </Text>
          </View>

          {/* 8. Work End Date */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>8.</Text>
            <Text style={styles.contentText}>ಕಾಮಗಾರಿ ಮುಕ್ತಾಯ ದಿನಾಂಕ :</Text>
          </View>

          {/* 9. Estimated Cost */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>9</Text>
            <View style={styles.costSection}>
              <View style={styles.costHeader}>
                <Text style={styles.costHeaderText}>
                  ಅಂದಾಜು ವೆಚ್ಚ (ರೂ. ಗಳಲ್ಲಿ) :
                </Text>
                <View style={styles.costValues}>
                  <Text style={styles.costValue}>
                    ಕೂಲಿ:{" "}
                    <Text style={[styles.underlineText, styles.englishData]}>
                      {estimateLabourCharge}
                    </Text>
                  </Text>
                  <Text style={styles.costValue}>
                    ಸಾಮಗ್ರಿ:{" "}
                    <Text style={[styles.underlineText, styles.englishData]}>
                      {estimatedMaterialCharge}
                    </Text>
                  </Text>
                  <Text style={styles.costValue}>
                    ಒಟ್ಟು:{" "}
                    <Text style={[styles.underlineText, styles.englishData]}>
                      {estimatedTotal}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.subDetails}>
                <View style={styles.subDetailItem}>
                  <Text>
                    a. MGNREGA ನಿಧಿಯಿಂದ:{" "}
                    <Text style={[styles.underlineText, styles.englishData]}>
                      {throughMGNREGAfunding}
                    </Text>
                  </Text>
                </View>
                <View style={styles.subDetailItem}>
                  <Text>b. ಒಗ್ಗೂಡಿಸುವಿಕೆ ಇದ್ದಲ್ಲಿ (ಯೋಜನೆಯ ಹೆಸರು): {"  "}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 11. Asset Details */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>10.</Text>
            <View style={styles.costSection}>
              <View style={styles.costHeader}>
                <Text style={styles.costHeaderText}>
                  ಖರ್ಚಾದ ವೆಚ್ಚ (ರೂ. ಗಳಲ್ಲಿ) :
                </Text>
                <View style={styles.costValues}>
                  <Text style={styles.costValue}>
                    ಕೂಲಿ:{" "}
                    <Text style={styles.englishData}>{spentLabourCharges}</Text>
                  </Text>
                  <Text style={styles.costValue}>
                    ಸಾಮಗ್ರಿ:{" "}
                    <Text style={styles.englishData}>
                      {spentMaterialCharges}
                    </Text>
                  </Text>
                  <Text style={styles.costValue}>
                    ಒಟ್ಟು:{" "}
                    <Text style={styles.englishData}>{spentTotalCharges}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.subDetails}>
                <View style={styles.subDetailItem}>
                  <Text>a. MGNREGA ನಿಧಿಯಿಂದ:</Text>
                </View>
                <View style={styles.subDetailItem}>
                  <Text>b. ಒಗ್ಗೂಡಿಸುವಿಕೆ ಇದ್ದಲ್ಲಿ (ಯೋಜನೆಯ ಹೆಸರು): {"  "}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>11.</Text>
            <View style={styles.costSection}>
              <View style={styles.costHeader}>
                <Text style={styles.costHeaderText}>ಆಸ್ತಿಯ ಜಿಯೋಟ್ಯಾಗ್:</Text>
              </View>
              <View style={styles.subDetails}>
                <View style={styles.subDetailItem}>
                  <Text>a. ಆಸ್ತಿಯ ಗುರುತಿನ ಸಂಖ್ಯೆ (Asset Id):</Text>
                </View>
                <View style={styles.subDetailItem}>
                  <Text>b. GPS Location: Lat: Lan:</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 12. GRS Details */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>12.</Text>
            <Text style={styles.contentText}>
              ಗ್ರಾಮ ರೋಜಗಾರ ಸಹಾಯಕ (GRS) ಸಂಕೇತ: {"  "}
            </Text>
          </View>

          {/* 13. TA/JE/BFT Details */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>13.</Text>
            <Text style={styles.contentText}>TA/ JE/ BFT ಸಂಕೇತ: {"  "}</Text>
          </View>

          {/* 14. Social Audit */}
          <View style={styles.contentItem}>
            <Text style={styles.serialNumber}>14.</Text>
            <Text style={styles.contentText}>
              ಸಾಮಾಜಿಕ ಲೆಕ್ಕ ಪರಿಶೋಧನೆ ಮಾಡಲಾಗಿದೆಯೇ (ಹೌದು / ಇಲ್ಲ): {"  "}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default FrontPagePDF;
export type { MGNREGAFrontPagePDFProps, MGNREGAData };
