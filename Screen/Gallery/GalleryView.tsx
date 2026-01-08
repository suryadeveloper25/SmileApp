
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../root/config';
import ImageView from "react-native-image-viewing";

const { width } = Dimensions.get('window');

interface GalleryImageViewerProps {
  route: any
  navigation: any
}

const GalleryImageScreen: React.FC<GalleryImageViewerProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile, acaid, catid } = route.params;
  // console.log(route.params, 'route.params')

  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>({});
  const [imgList, setImgList] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchStudentData();
    fetchGalleryImages();
  }, []);

  const fetchStudentData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isloggedIn');
      const mobileNo = await AsyncStorage.getItem('mobile');

      const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`);
      if (response.data.isSuccess) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.post(`https://www.vtsmile.in/app/api/students/image_gallery_api?orgId=${orgid}&aca_id=${acaid}&category_id=${catid}`);
      if (response.data.isSuccess && response.data.galleryImage) {

        setImgList(response.data.galleryImage);
        setImages(response.data.galleryImage.map((img: any) => ({ uri: img.img_file_name })));
        // console.log('response.data.galleryImage==>', response.data.galleryImage)
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => { setCurrentIndex(index); setIsVisible(true); }}>
      <Image source={{ uri: item.img_file_name }} style={{ width: width / 4 - 1, height: 100, margin: 4 }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#9C27B0'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery - Images</Text>
        </View>

        <View style={styles.albumContainer}>
          <Icon name="image" size={24} color="#2a2a2aff" />
          <Text style={styles.albumTitle}>Album - {imgList.catName} ({imgList.length})</Text>
          <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
          <ScrollView contentContainerStyle={styles.content}>


            {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Album - {imgList.catName} ({imgList.length})
        </Text> */}
            <View style={styles.folderGrid}>

              <FlatList
                data={imgList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={{ padding: 4 }}
                ListEmptyComponent={() => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    {/* <Image source={require('./assets/images/smile-No-Data-Found-BG.png')} style={{ width: 100, height: 100 }} /> */}
                    <Text>Sorry, No Data Found!</Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>

        <ImageView
          images={images}
          imageIndex={currentIndex}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
        <TouchableOpacity
          style={{
            position: 'absolute', bottom: 20, right: 20, backgroundColor: '#784EB1',
            padding: 12, borderRadius: 30
          }}
          onPress={() => navigation.navigate('Video', { orgid, studentId, mobile })}
        >
          <Text style={{ color: '#FFD700', fontFamily: fonts.FONT_BOLD, }}>Videos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GalleryImageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },

  header: {
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

  },
  headerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fonts.FONT_BOLD,
    marginLeft: 78
  },
  folderIcon: {
    backgroundColor: '#fdd835',
    borderRadius: 6,
    padding: 4,
  },
  content: {
    padding: 10,
  },
  grid: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    backgroundColor: '#e0f0ff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: "95%", height: '60%', marginTop: 20, marginLeft: 10,
    backgroundColor: '#f5fdd8',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff9999',

  },
  albumTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 16,
    marginBottom: 10, marginLeft: 30, bottom: 23
  },
  folderGrid: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },



  fab: {
    position: 'absolute',
    bottom: 90,
    right: 22,
    backgroundColor: '#9B59B6',
    width: 56, height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#5B2C6F'
  },
});