

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Video from "react-native-video";
import { fonts } from "../../root/config";

const { width, height } = Dimensions.get("window");

interface VideoViewScreenProps {
  route: any
  navigation: any
}
const VideoViewScreen: React.FC<VideoViewScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile, acaid, catid, } = route.params;
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [vidList, setVidList] = useState([]);
  const [isFolder, setIsFolder] = useState("");

  // Fetch student data
  const getStudentData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem("isloggedIn");
      const mobileNo = await AsyncStorage.getItem("mobile");

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (response.data.isSuccess && response.data.studDetails) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch videos list
  const getVideosList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/video_gallery_api?orgId=${orgid}&aca_id=${acaid}&category_id=${catid}`
      );

      if (response.data.isSuccess && response.data.galleryVideo) {
        setVidList(response.data.galleryVideo);
      } else {
        setIsFolder("No Data");
      }
    } catch (err) {
      console.log(err);
      setIsFolder("No Data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStudentData();
      await getVideosList();
      setLoading(false);
    };
    fetchData();
  }, []);


  //   const renderImage = ({ item }) => (

  //   <View style={styles.imageContainer}>
  //     {item.source ? (
  //       <Image source={item.source} style={styles.image} />
  //     ) : (
  //       <View style={styles.placeholder}>
  //         <Icon name="person-circle-outline" size={60} color="#ccc" />
  //       </View>
  //     )}
  //   </View>
  // );

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.img_file_name }}
        style={styles.video}
        controls
        resizeMode="cover"
      />
    </View>
  );
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7200b1" />
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1, }}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery - Videos</Text>
        </View>

        {/* Content */}



        <View style={styles.albumContainer}>
          <Icon name="image" size={24} color="#2a2a2aff" />
          <Text style={styles.albumTitle}>Video - Demo(5)</Text>
          <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.folderGrid}>

              <FlatList
                data={vidList}
                renderItem={renderVideoItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 10 }}
              />

            </View>
          </ScrollView>
          <View>

            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                getVideosList().then(() => setLoading(false));
              }}
            >
              <Text style={{ color: "blue", marginTop: 5, fontFamily: fonts.FONT_BOLD, }}>Reload</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Gallery', { orgid, studentId, mobile })}>
          <MaterialIcons name="image" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VideoViewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },

  header: {
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  videoContainer: {
    flex: 1,
    margin: 2,
    height: 150,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
    borderRadius: 20,
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
    width: "95%", height: '70%', marginTop: 20, marginLeft: 10,
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


