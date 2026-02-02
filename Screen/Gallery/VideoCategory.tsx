

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { fonts } from "../../root/config";
const { width, height } = Dimensions.get("window");

const VideoCategoryScreen = ({ route }) => {
  const { orgid, studentId, mobile, acaid } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [vidCategoryList, setVidCategoryList] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [noData, setNoData] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  // Fetch student data
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const response = await fetch(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`,
        { method: "POST" }
      );
      const body = await response.json();
      if (body.isSuccess && body.studDetails) {
        setStudentData(body.studDetails[0]);
      }
    } catch (error) {
      console.log("Student Data Error:", error);
    }
  };

  // Fetch video category list
  const getVideosCategoryList = async () => {
    try {
      const response = await fetch(
        `https://www.vtsmile.in/app/api/students/gallery_video_category_api?orgId=${orgid}&aca_id=${acaid}`,
        { method: "POST" }
      );
      const body = await response.json();
      if (body.isSuccess && body.videoCategory && body.videoCategory.length > 0) {
        setVidCategoryList(body.videoCategory);
        // console.log('body.videoCategory---->', body.videoCategory)
      } else {
        setNoData(true);
      }
    } catch (error) {
      console.log("Video Category Error:", error);
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentData();
    getVideosCategoryList();
  }, []);

  const handleFolderPress = (item) => {
    navigation.navigate("VideoViewScreen", {
      catName: item.category_name,
      catid: item.img_vdo_category_Id,
      type: item.type,
      acaid,
      orgid,
      studentId,
      mobile,
    });
    // console.log(handleFolderPress, 'hhhhhhhhhhhhhhhhhhhh', 'catpppppp', acaid,)
  };


  const renderItem = ({ item }) => (
    <View
      style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleFolderPress(item)}>
        <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />

        <Text style={styles.categoryText}>
          {item.category_name} ({item.video_count})
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7832b1" />
        <Text>Loading...</Text>
      </View>
    );
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#9C27B0',marginBottom:-30 }}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery - Images</Text>
        </View>

        {/* Content */}

        <View style={styles.albumContainer}>
          <Icon name="image" size={24} color="#2a2a2aff" />
          <Text style={styles.albumTitle}>Gallery Albums - List (Year wise)</Text>
          <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
          <ScrollView contentContainerStyle={styles.content}>
            {isAccordionOpen && (
              <View style={styles.folderGrid}>
                {vidCategoryList.length > 0 ? (
                  <FlatList
                    data={vidCategoryList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
                ) : (
                  <View style={styles.noData}>
                    <Image
                      source={require("../../assest/smile-No-Data-Found-BG.png")}
                      style={{ width: 100, height: 100 }}
                    />
                    <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  folderImage: { width: 75, height: 75 },
  categoryText: { marginTop: 5, fontSize: 13, fontFamily: fonts.ROBOTO_BOLD, textAlign: "center" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 10,
  },
  noData: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: '25%'
  },
  noDataText: {
    marginTop: 10,
    fontSize: 14,
    color: "#000",
    fontFamily: fonts.FONT_BOLD,
  },
  albumContainer: {
    width: "95%", height: '75%', marginTop: 20, marginLeft: 10,
    backgroundColor: '#f5fdd8',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff9999',

  },
  folderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 16,
    marginBottom: 10, marginLeft: 30, bottom: 23
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoCategoryScreen;
