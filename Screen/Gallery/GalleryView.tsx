
// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Divider } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fonts } from '../../root/config';
// import ImageView from "react-native-image-viewing";

// const { width } = Dimensions.get('window');

// interface GalleryImageViewerProps {
//   route: any
//   navigation: any
// }

// const GalleryImageScreen: React.FC<GalleryImageViewerProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile, acaid, catid } = route.params;
//   // console.log(route.params, 'route.params')

//   const [loading, setLoading] = useState(true);
//   const [studentData, setStudentData] = useState<any>({});
//   const [imgList, setImgList] = useState<any[]>([]);
//   const [images, setImages] = useState<any[]>([]);
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchStudentData();
//     fetchGalleryImages();
//   }, []);

//   const fetchStudentData = async () => {
//     try {
//       const loggedIn = await AsyncStorage.getItem('isloggedIn');
//       const mobileNo = await AsyncStorage.getItem('mobile');

//       const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`);
//       if (response.data.isSuccess) {
//         setStudentData(response.data.studDetails[0]);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchGalleryImages = async () => {
//     try {
//       const response = await axios.post(`https://www.vtsmile.in/app/api/students/image_gallery_api?orgId=${orgid}&aca_id=${acaid}&category_id=${catid}`);
//       if (response.data.isSuccess && response.data.galleryImage) {
//           console.log(response.data.galleryImage,'===========>response.data.galleryImage')
//         setImgList(response.data.galleryImage);
//         setImages(response.data.galleryImage.map((img: any) => ({ uri: img.img_file_name })));
//         // console.log('response.data.galleryImage==>', response.data.galleryImage)
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item, index }: { item: any; index: number }) => (
//     <TouchableOpacity onPress={() => { setCurrentIndex(index); setIsVisible(true); }}>
//       <Image source={{ uri: item.img_file_name }} style={{ width: width / 4 - 1, height: 100, margin: 4 }} />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 ,backgroundColor:'#9C27B0',marginBottom:-30}}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.navigate('GalleryImageCategory', orgid,studentId,mobile)}>
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Gallery - Images</Text>
//         </View>

//         <View style={styles.albumContainer}>
//           <Icon name="image" size={24} color="#2a2a2aff" />
//           <Text style={styles.albumTitle}>Album - {imgList.catName} ({imgList.length})</Text>
//           <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
//           <ScrollView contentContainerStyle={styles.content}>


//             {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
//           Album - {imgList.catName} ({imgList.length})
//         </Text> */}
//             <View style={styles.folderGrid}>

//               <FlatList
//                 data={imgList}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 numColumns={3}
//                 contentContainerStyle={{ padding: 4 }}
//                 ListEmptyComponent={() => (
//                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
//                     {/* <Image source={require('./assets/images/smile-No-Data-Found-BG.png')} style={{ width: 100, height: 100 }} /> */}
//                     <Text>Sorry, No Data Found!</Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </ScrollView>
//         </View>

//         <ImageView
//           images={images}
//           imageIndex={currentIndex}
//           visible={isVisible}
//           onRequestClose={() => setIsVisible(false)}
//         />
//         <TouchableOpacity
//           style={{
//             position: 'absolute', bottom: 50, right: 20, backgroundColor: '#784EB1',
//             padding: 12, borderRadius: 30
//           }}
//           onPress={() => navigation.navigate('Video', { orgid, studentId, mobile })}
//         >
//           <Text style={{ color: '#FFD700', fontFamily: fonts.FONT_BOLD, }}>Videos</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default GalleryImageScreen;

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
//   folderIcon: {
//     backgroundColor: '#fdd835',
//     borderRadius: 6,
//     padding: 4,
//   },
//   content: {
//     padding: 10,
//   },
//   grid: {
//     paddingHorizontal: 10,
//     paddingTop: 10,
//   },
//   imageContainer: {
//     flex: 1,
//     aspectRatio: 1,
//     margin: 5,
//     backgroundColor: '#e0f0ff',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   placeholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   albumContainer: {
//     width: "95%", height: '60%', marginTop: 20, marginLeft: 10,
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



//   fab: {
//     position: 'absolute',
//     bottom: 120,
//     right: 22,
//     backgroundColor: '#9B59B6',
//     width: 56, height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 6,
//     shadowColor: '#5B2C6F'
//   },
// });

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../root/config';
import ImageView from 'react-native-image-viewing';

const { width } = Dimensions.get('window');

// ✅ Typed interface matching actual API response
interface GalleryImage {
  img_file_name: string;
  img_title: string;
  upload_time: string;
  upload_date: string;
  img_desc: string;
  orgId: string;
  aca_Id: string;
  category: string;
}

interface GalleryImageScreenProps {
  route: any;
  navigation: any;
}

const GalleryImageScreen: React.FC<GalleryImageScreenProps> = ({ route, navigation }) => {
  // ✅ Destructure all params correctly — including catName passed from CategoryScreen
  const { orgid, studentId, mobile, acaid, catid, catName } = route.params;

  const [loading, setLoading] = useState(true);
  const [imgList, setImgList] = useState<GalleryImage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ useFocusEffect alternative: re-fetch when catid changes to fix same-image issue
  useEffect(() => {
    setImgList([]);       // ✅ Clear old data before fetching new category
    setLoading(true);
    fetchGalleryImages();
  }, [catid]);            // ✅ Depend on catid — different category = fresh fetch

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/image_gallery_api?orgId=${orgid}&aca_id=${acaid}&category_id=${catid}`
      );

      if (response.data.isSuccess && response.data.galleryImage?.length > 0) {
        setImgList(response.data.galleryImage);
      } else {
        setImgList([]);
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setImgList([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Build images array from imgList for ImageView — derived directly
  const viewerImages = imgList.map((img) => ({ uri: img.img_file_name }));

  const handleImagePress = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsVisible(true);
  }, []);

  // ✅ Back navigation with all required params properly passed as object
  const handleGoBack = () => {
    navigation.navigate('GalleryImageCategory', {
      orgid,
      studentId,
      mobile,
      acaid,
    });
  };

  const renderItem = ({ item, index }: { item: GalleryImage; index: number }) => (
    <TouchableOpacity
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
      style={styles.imageWrapper}
    >
      <Image
        source={{ uri: item.img_file_name }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      {/* ✅ Show image title from API */}
      {item.img_title ? (
        <Text style={styles.imageTitle} numberOfLines={1}>
          {item.img_title}
        </Text>
      ) : null}
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
      <Icon name="image" size={20} color="#9C27B0" />
      {/* ✅ catName from route params, imgList.length is correct count */}
      <Text style={styles.albumTitle}>
        Album - {catName ?? 'Gallery'} ({imgList.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        {/* ✅ Fixed back navigation — passes params as proper object */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gallery - Images</Text>
      </View>
 <View style={{flex:1,backgroundColor:'#FFFF',marginBottom:-30}}>
      {/* Card Container */}
      <View style={styles.albumContainer}>
        {/* <Divider style={styles.divider} /> */}

        {loading ? (
          <View style={styles.noData}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          // ✅ FlatList directly — no ScrollView wrapper (fixes render/scroll issues)
          <FlatList
            data={imgList}
            renderItem={renderItem}
            // ✅ Use img_file_name + index as key — unique per item, fixes same-image bug
            keyExtractor={(item, index) =>
              `${item.category}_${item.img_file_name}_${index}`
            }
            numColumns={3}
            contentContainerStyle={styles.flatListContent}
            columnWrapperStyle={styles.columnWrapper}
            ListHeaderComponent={renderListHeader}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* ✅ Full-screen image viewer — uses derived viewerImages, not separate state */}
      <ImageView
        images={viewerImages}
        imageIndex={currentIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />

    
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Video', { orgid, studentId, mobile })}
        activeOpacity={0.8}
      >
        <Icon name="videocam" size={20} color="#FFD700" />
        <Text style={styles.fabText}>Videos</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GalleryImageScreen;

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
    marginBottom: 80, // leave room for FAB
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
    paddingHorizontal: 6,
    paddingBottom: 20,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 4,
    marginBottom: 4,
  },
  imageWrapper: {
    width: width / 3 - 10,
    marginHorizontal: 2,
    backgroundColor: '#e8e8e8',
    borderRadius: 6,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 100,
  },
  imageTitle: {
    fontSize: 10,
    color: '#333',
    fontFamily: fonts.ROBOTO_BOLD,
    paddingHorizontal: 4,
    paddingVertical: 3,
    backgroundColor: '#fff',
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
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#784EB1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#5B2C6F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: '#FFD700',
    fontFamily: fonts.FONT_BOLD,
    marginLeft: 6,
    fontSize: 14,
  },
});