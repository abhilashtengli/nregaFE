import { Base_Url } from "@/lib/constant";
import { Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import mnreaga from "@/assets/MGNREGA logo.jpg";
import state_logo from "@/assets/State logo.jpeg";
import emblem from "@/assets/State embalm.jpeg";
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
type StageWisePhotosData = {
  gramPanchayat?: string;
  taluka?: string;
  district?: string;
  financialYear?: string;
  workName?: string;
  workCode?: string;
  beforeStageImageUrl?: string;
  duringStageImageUrl?: string;
  afterStageImageUrl?: string;
};

type StageWiseGTProp = {
  sWGTData: StageWisePhotosData;
};

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.3,
    padding: 15,
    backgroundColor: "white"
  },
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    height: "100%"
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderBottom: "1px solid black",
    paddingBottom: 16,
    height: 60,
    marginTop: 8
  },
  logoContainer: {
    width: 70,
    height: 70,
    flexShrink: 0
  },
  leftlogoContainer: {
    width: 80,
    height: 70,
    flexShrink: 0
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    maxWidth: 300
  },
  centerLogo: {
    width: 40,
    height: 30,
    objectFit: "contain",
    marginBottom: 4
  },
  centerTextContainer: {
    textAlign: "center",
    width: "100%"
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: "NotoSansKannada",
    lineHeight: 1.2
  },
  headerSubText: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    lineHeight: 1.2
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 8,
    paddingVertical: 4
  },
  mainTitle: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "NotoSansKannada",
    lineHeight: 1.3
  },
  workDetailsSection: {
    marginBottom: 10,
    paddingHorizontal: 5
  },
  workDetailText: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "NotoSansKannada",
    lineHeight: 1.8
  },
  stageContainer: {
    marginBottom: 8,
    breakInside: "avoid"
  },
  stageTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    fontFamily: "Helvetica-Bold"
  },
  photoContainer: {
    border: "1px solid #d1d5db",
    padding: 5,
    height: 110
  },
  photoImage: {
    width: "100%",
    height: 100,
    objectFit: "contain"
  },
  photoPlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center"
  },
  photoPlaceholderBox: {
    width: 40,
    height: 40,
    backgroundColor: "#e5e7eb",
    marginBottom: 5
  },
  photoPlaceholderText: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center"
  }
});

const StageWisePhotosPDF: React.FC<StageWiseGTProp> = ({ sWGTData }) => {
  const {
    gramPanchayat = "Default Gram Panchayat",
    taluka,
    district,
    financialYear,
    workName,
    workCode,
    beforeStageImageUrl,
    duringStageImageUrl,
    afterStageImageUrl
  } = sWGTData;

  // Function to render photo with proxy URL
  const renderPhoto = (
    imageUrl?: string,
    _altText?: string,
    placeholderText?: string
  ) => {
    if (imageUrl) {
      return (
        <Image
          style={styles.photoImage}
          src={`${Base_Url}/proxy-image?url=${encodeURIComponent(imageUrl)}`}
          cache={false}
        />
      );
    } else {
      return (
        <View style={styles.photoPlaceholder}>
          <View style={styles.photoPlaceholderBox}></View>
          <Text style={styles.photoPlaceholderText}>
            {placeholderText || "Photo Not Available"}
          </Text>
        </View>
      );
    }
  };

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header with three logos */}
        <View style={styles.headerSection}>
          {/* Left Logo */}
          <View style={styles.leftlogoContainer}>
            <Image style={styles.logo} src={mnreaga} />
          </View>

          {/* Center Section */}
          <View style={styles.centerSection}>
            <Image style={styles.centerLogo} src={emblem} />
            <View style={styles.centerTextContainer}>
              <Text style={styles.headerText}>
                ಗ್ರಾಮ ಪಂಚಾಯತಿ {gramPanchayat} ತಾ|| {taluka} ಜಿ|| {district}
              </Text>
              <Text style={styles.headerSubText}>
                ಮಹಾತ್ಮಾ ಗಾಂಧಿ ನರೇಗಾ ಯೋಜನೆ - ಕರ್ನಾಟಕ
              </Text>
            </View>
          </View>

          {/* Right Logo */}
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src={state_logo} />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            ಹಂತವಾರು ಕಾಮಗಾರಿ ಛಾಯಾಚಿತ್ರಗಳು (Stage Wise Work Photos)
          </Text>
        </View>

        {/* Work Details */}
        <View style={styles.workDetailsSection}>
          <Text style={styles.workDetailText}>
            ಕಾಮಗಾರಿ ಹೆಸರು : {financialYear} {workName}
          </Text>
          <Text style={styles.workDetailText}>
            ಕಾಮಗಾರಿ ಸಂಕೇತ ಸಂಖ್ಯೆ: {workCode}
          </Text>
        </View>

        {/* Before Stage */}
        <View style={styles.stageContainer}>
          <Text style={styles.stageTitle}>Before Stage</Text>
          <View style={styles.photoContainer}>
            {renderPhoto(beforeStageImageUrl, "Before Stage")}
          </View>
        </View>

        {/* During Stage */}
        <View style={styles.stageContainer}>
          <Text style={styles.stageTitle}>During Stage</Text>
          <View style={styles.photoContainer}>
            {renderPhoto(duringStageImageUrl, "During Stage")}
          </View>
        </View>

        {/* After Stage */}
        <View style={styles.stageContainer}>
          <Text style={styles.stageTitle}>After Stage</Text>
          <View style={styles.photoContainer}>
            {renderPhoto(afterStageImageUrl, "After Stage")}
          </View>
        </View>
      </View>
    </Page>
  );
};

export default StageWisePhotosPDF;
export type { StageWisePhotosData, StageWiseGTProp };
