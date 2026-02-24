

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Divider } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
// import { fonts } from "../../root/config";
// const { width, height } = Dimensions.get("window");

// const VideoCategoryScreen = ({ route }) => {
//   const { orgid, studentId, mobile, acaid } = route.params;
//   const navigation = useNavigation();

//   const [loading, setLoading] = useState(true);
//   const [vidCategoryList, setVidCategoryList] = useState([]);
//   const [studentData, setStudentData] = useState({});
//   const [noData, setNoData] = useState(false);
//   const [isAccordionOpen, setIsAccordionOpen] = useState(true);
//   // Fetch student data
//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const response = await fetch(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`,
//         { method: "POST" }
//       );
//       const body = await response.json();
//       if (body.isSuccess && body.studDetails) {
//         setStudentData(body.studDetails[0]);
//       }
//     } catch (error) {
//       console.log("Student Data Error:", error);
//     }
//   };

//   // Fetch video category list
//   const getVideosCategoryList = async () => {
//     try {
//       const response = await fetch(
//         `https://www.vtsmile.in/app/api/students/gallery_video_category_api?orgId=${orgid}&aca_id=${acaid}`,
//         { method: "POST" }
//       );
//       const body = await response.json();
//       if (body.isSuccess && body.videoCategory && body.videoCategory.length > 0) {
//         setVidCategoryList(body.videoCategory);
//         // console.log('body.videoCategory---->', body.videoCategory)
//       } else {
//         setNoData(true);
//       }
//     } catch (error) {
//       console.log("Video Category Error:", error);
//       setNoData(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStudentData();
//     getVideosCategoryList();
//   }, []);

//   const handleFolderPress = (item) => {
//     navigation.navigate("VideoViewScreen", {
//       catName: item.category_name,
//       catid: item.img_vdo_category_Id,
//       type: item.type,
//       acaid,
//       orgid,
//       studentId,
//       mobile,
//     });
//     // console.log(handleFolderPress, 'hhhhhhhhhhhhhhhhhhhh', 'catpppppp', acaid,)
//   };


//   const renderItem = ({ item }) => (
//     <View
//       style={styles.itemContainer}>
//       <TouchableOpacity onPress={() => handleFolderPress(item)}>
//         <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />

//         <Text style={styles.categoryText}>
//           {item.category_name} ({item.video_count})
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#7832b1" />
//         <Text>Loading...</Text>
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
//             {isAccordionOpen && (
//               <View style={styles.folderGrid}>
//                 {vidCategoryList.length > 0 ? (
//                   <FlatList
//                     data={vidCategoryList}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={2}
//                     contentContainerStyle={{ paddingBottom: 20 }}
//                   />
//                 ) : (
//                   <View style={styles.noData}>
//                     <Image
//                       source={require("../../assest/smile-No-Data-Found-BG.png")}
//                       style={{ width: 100, height: 100 }}
//                     />
//                     <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
//                   </View>
//                 )}
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', width: "100%", },

//   header: {
//     backgroundColor: '#9C27B0',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,

//   },
//   headerText: {
//     fontSize: 18,
//     color: '#ffffff',
//     fontFamily: fonts.FONT_BOLD,
//     marginLeft: 78
//   },
//   itemContainer: {
//     flex: 1,
//     margin: 10,
//     alignItems: "center",
//   },
//   folderImage: { width: 75, height: 75 },
//   categoryText: { marginTop: 5, fontSize: 13, fontFamily: fonts.ROBOTO_BOLD, textAlign: "center" },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     padding: 10,
//   },
//   noData: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 50,
//     marginLeft: '25%'
//   },
//   noDataText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#000",
//     fontFamily: fonts.FONT_BOLD,
//   },
//   albumContainer: {
//     width: "95%", height: '75%', marginTop: 20, marginLeft: 10,
//     backgroundColor: '#f5fdd8',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ff9999',

//   },
//   folderGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   albumTitle: {
//     fontFamily: fonts.ROBOTO_BOLD,
//     fontSize: 16,
//     marginBottom: 10, marginLeft: 30, bottom: 23
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default VideoCategoryScreen;
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../root/config';

const { width } = Dimensions.get('window');

// ✅ Typed interface
interface CategoryItem {
  category_name: string;
  video_count: string;
  img_vdo_category_Id: string;
  type: string;
}

const VideoCategoryScreen = ({ route }: any) => {
  const { orgid, studentId, mobile, acaid } = route.params;
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(true);
  const [vidCategoryList, setVidCategoryList] = useState<CategoryItem[]>([]);

  // ✅ KEY FIX: useFocusEffect re-runs every time this screen comes into focus.
  // Resets stale data before each fresh fetch — fixes "previous folder data showing" bug.
  useFocusEffect(
    useCallback(() => {
      setVidCategoryList([]);
      setIsLoading(true);
      fetchVideoCategories();
    }, [acaid, orgid]) // ✅ re-run whenever acaid or orgid changes
  );

  const fetchVideoCategories = async () => {
    try {
      const response = await fetch(
        `https://www.vtsmile.in/app/api/students/gallery_video_category_api?orgId=${orgid}&aca_id=${acaid}`,
        { method: 'POST' }
      );
      const body = await response.json();

      if (body.isSuccess && body.videoCategory?.length > 0) {
        setVidCategoryList(body.videoCategory);
      } else {
        setVidCategoryList([]);
      }
    } catch (error) {
      console.log('Video Category Error:', error);
      setVidCategoryList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderPress = (item: CategoryItem) => {
    navigation.navigate('VideoViewScreen', {
      catName: item.category_name,
      catid: item.img_vdo_category_Id,
      type: item.type,
      acaid,
      orgid,
      studentId,
      mobile,
    });
  };

  // ✅ Use navigation.goBack() — not navigation.navigate() — to correctly pop the screen
  const handleGoBack = () => {
    navigation.navigate('Video' ,{
      orgid,
      studentId,
      mobile,
      acaid,
    });
  };

  const renderCategory = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.folderContainer}
      onPress={() => handleFolderPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={require('../../assest/icons8-pictures-folder-94.png')}
        style={styles.folderImage}
      />
      <Text style={styles.folderText} numberOfLines={2}>
        {item.category_name}
      </Text>
      {/* ✅ Count badge matching GalleryImageCategoryScreen style */}
      <View style={styles.countBadge}>
        <Icon name="videocam" size={12} color="#fff" />
        <Text style={styles.countText}>{item.video_count} Videos</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.noData}>
      <Image
        source={require('../../assest/smile-No-Data-Found-BG.png')}
        style={{ width: 120, height: 120 }}
        resizeMode="contain"
      />
      <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
    </View>
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Icon name="videocam" size={20} color="#9C27B0" />
      <Text style={styles.albumTitle}>Gallery Videos - Category List</Text>
    </View>
  );

  // ✅ Full-screen loading spinner (matches other screens)
  if (isLoading) {
    return (
      // <SafeAreaView style={styles.safeArea}>
      //   <View style={styles.header}>
      //     <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
      //       <Icon name="arrow-back" size={24} color="#fff" />
      //     </TouchableOpacity>
      //     <Text style={styles.headerText}>Gallery - Videos</Text>
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
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gallery - Videos</Text>
      </View>
 <View style={{flex:1,backgroundColor:'#FFFF',marginBottom:-30}}>
      {/* Card Container */}
      <View style={styles.albumContainer}>
        {/* <Divider style={styles.divider} /> */}

        {/* ✅ FlatList only — no ScrollView wrapper */}
        <FlatList
          data={vidCategoryList}
          renderItem={renderCategory}
          keyExtractor={(item) => item.img_vdo_category_Id.toString()}
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

export default VideoCategoryScreen;

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
    marginRight: 28, // offsets back button so title is visually centred
  },
  albumContainer: {
    flex: 1,
    backgroundColor: '#f5fdd8',
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 15,
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