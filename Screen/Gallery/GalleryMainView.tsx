

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import { Divider } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fonts } from "../../root/config";

// interface GalleryImageMainProps {
//   route: any;
//   navigation: any
// }

// const GalleryMainScreen: React.FC<GalleryImageMainProps> = ({ route, navigation }) => {

//   const { orgid, studentId, mobile } = route.params;

//   const [loading, setLoading] = useState(true);
//   const [studentData, setStudentData] = useState<any>({});
//   const [acaYearList, setAcaYearList] = useState<any[]>([]);

//   const getStudentData = async () => {
//     try {
//       const loggedIn = await AsyncStorage.getItem("isloggedIn");
//       const storedMobile = await AsyncStorage.getItem("mobile");

//       const st_mobile = storedMobile || mobile;
//       const st_orgId = orgid;

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${studentId}&mobile_no=${st_mobile}`
//       );

//       if (response.data.isSuccess && response.data.studDetails?.length) {
//         setStudentData(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.log("Error fetching student data:", error);
//     }
//   };

//   const getAcademicYearList = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/gallery_academic_year_api?orgId=${orgid}`
//       );

//       if (response.data.isSuccess && response.data.activeAcademicYear?.length) {
//         setAcaYearList(response.data.activeAcademicYear);
//       } else {
//         setAcaYearList([]);
//       }
//     } catch (error) {
//       console.log("Error fetching academic years:", error);
//       setAcaYearList([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStudentData();
//     getAcademicYearList();
//   }, []);


//   const renderFolder = ({ item }: any) => {
//     return (
//       <TouchableOpacity
//         style={styles.folderContainer}
//         onPress={() =>
//           navigation.navigate("GalleryImageCategory", {
//             acaid: item.aca_Id,
//             orgid,
//             studentId,
//             mobile,
//           })
//         }
//       >
//         <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />
//         <Text style={styles.folderText}>
//           {item.aca_year} ({item.img_category_count})
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#FF0000" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor:'#9C27B0',marginBottom:-30 }}>
//       {/* Header */}
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Gallery - Images</Text>
//         </View>

//         {/* Content */}

//         <View style={styles.albumContainer}>
//           <Icon name="image" size={24} color="#2a2a2aff" />
//           <Text style={styles.albumTitle}>Gallery Albums - List (Year wise)</Text>
//           <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
//           <ScrollView contentContainerStyle={styles.content}>
//             <View style={styles.folderGrid}>


//               {acaYearList.length ? (
//                 <FlatList
//                   data={acaYearList}
//                   renderItem={renderFolder}
//                   keyExtractor={(item) => item.aca_Id.toString()}
//                   numColumns={2}
//                   contentContainerStyle={styles.flatListContainer}
//                 />
//               ) : (
//                 <View style={styles.noData}>
//                   {/* <Image
//             source={require("../assets/images/smile-No-Data-Found-BG.png")}
//             style={styles.noDataImage}
//           /> */}
//                   <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
//                 </View>
//               )}
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default GalleryMainScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', width: "100%", },

//   header: {
//     backgroundColor: '#9C27B0',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,

//   },
//   flatListContainer: { paddingHorizontal: 10, paddingVertical: 20 },
//   folderContainer: {
//     flex: 1,
//     margin: 10,
//     alignItems: "center",
//   },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   noData: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
//   noDataImage: { width: 100, height: 100 },
//   noDataText: { marginTop: 10, fontSize: 14, color: "#000", fontFamily: fonts.FONT_BOLD, },
//   headerText: {
//     fontSize: 18,
//     color: '#ffffff',
//     fontFamily: fonts.FONT_BOLD,
//     marginLeft: 78
//   },
//   folderIcon: {
//     backgroundColor: '#fdd835',
//     borderRadius: 6,
//     padding: 4,
//   },
//   content: {
//     padding: 10,
//   },
//   albumContainer: {
//     width: "95%", height: '75%', marginTop: 20, marginLeft: 10,
//     backgroundColor: '#f5fdd8',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ff9999',

//   },
//   albumTitle: {
//     fontFamily: fonts.ROBOTO_BOLD,
//     fontSize: 16,
//     marginBottom: 10, marginLeft: 30, bottom: 23
//   },
//   folderGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   folderItem: {
//     width: '30%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   folderImage: {
//     width: 60,
//     height: 60,
//     resizeMode: 'contain',
//   },
//   folderText: {
//     marginTop: 6,
//     textAlign: 'center',
//     fontSize: 14,
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../root/config";

const { width } = Dimensions.get("window");

// ✅ Typed interface for academic year API response
interface AcademicYear {
  aca_Id: string;
  aca_year: string;
  img_category_count: string;
}

interface GalleryImageMainProps {
  route: any;
  navigation: any;
}

const GalleryMainScreen: React.FC<GalleryImageMainProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route.params;

  const [loading, setLoading] = useState(true);
  const [acaYearList, setAcaYearList] = useState<AcademicYear[]>([]);

  useEffect(() => {
    getAcademicYearList();
  }, []);

  const getAcademicYearList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/gallery_academic_year_api?orgId=${orgid}`
      );

      if (response.data.isSuccess && response.data.activeAcademicYear?.length > 0) {
        setAcaYearList(response.data.activeAcademicYear);
      } else {
        setAcaYearList([]);
      }
    } catch (error) {
      console.log("Error fetching academic years:", error);
      setAcaYearList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderPress = (item: AcademicYear) => {
    navigation.navigate("GalleryImageCategory", {
      acaid: item.aca_Id,
      orgid,
      studentId,
      mobile,
    });
  };

  const renderFolder = ({ item }: { item: AcademicYear }) => (
    <TouchableOpacity
      style={styles.folderContainer}
      onPress={() => handleFolderPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={require('../../assest/icons8-pictures-folder-94.png')}
        style={styles.folderImage}
      />
      {/* ✅ Show academic year name */}
      <Text style={styles.folderText} numberOfLines={2}>
        {item.aca_year}
      </Text>
      {/* ✅ Show category count as a badge */}
      <View style={styles.countBadge}>
        <Icon name="photo-library" size={12} color="#fff" />
        <Text style={styles.countText}>
          {item.img_category_count} Albums
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.noData}>
      <Image
        source={require("../../assest/smile-No-Data-Found-BG.png")}
        style={{ width: 120, height: 120 }}
        resizeMode="contain"
      />
      <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
    </View>
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Icon name="image" size={20} color="#9C27B0" />
      <Text style={styles.albumTitle}>
        Gallery Albums - List (Year wise)
      </Text>
        {/* <Divider style={styles.divider} /> */}
    </View>
  );

  // ✅ Full-screen loading spinner
  if (loading) {
    return (
      // <SafeAreaView style={styles.safeArea}>
      //   <View style={styles.header}>
      //     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      //       <Icon name="arrow-back" size={24} color="#fff" />
      //     </TouchableOpacity>
      //     <Text style={styles.headerText}>Gallery - Images</Text>
      //   </View>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#9C27B0" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      // </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gallery - Images</Text>
      </View>
      <View style={{flex:1,backgroundColor:'#FFFF',marginBottom:-30}}>
      {/* Card Container */}
      <View style={styles.albumContainer}>
      

        {/* ✅ FlatList directly — no ScrollView wrapper to avoid render conflict */}
        <FlatList
          data={acaYearList}
          renderItem={renderFolder}
          // ✅ Use aca_Id as unique key
          keyExtractor={(item) => item.aca_Id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default GalleryMainScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6A1B9A',
  },
  header: {
    backgroundColor: '#6A1B9A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fonts.FONT_BOLD,
    flex: 1,
    textAlign: 'center',
    marginRight: 28, // offsets back button so title is visually centered
  },
  albumContainer: {
    flex: 1,
    backgroundColor: '#f5fdd8',
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff9999',
    overflow: 'hidden',
    
  },
  divider: {
    backgroundColor: '#f26767ff',
    height: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  albumTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 15,
    color: '#2a2a2a',
    marginLeft: 8,
    flexShrink: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  folderContainer: {
    alignItems: 'center',
    marginVertical: 8,
    width: width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  folderImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  folderText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: fonts.ROBOTO_BOLD,
    color: '#2a2a2a',
    marginBottom: 6,
    lineHeight: 18,
  },
  // ✅ Purple badge to show album count clearly
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  countText: {
    fontSize: 11,
    color: '#fff',
    fontFamily: fonts.ROBOTO_BOLD,
    marginLeft: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60,
  },
  noDataText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.ROBOTO_BOLD,
  },
});