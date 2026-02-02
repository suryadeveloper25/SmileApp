

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Divider } from "react-native-paper";
import { fonts } from "../../root/config";
const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  GalleryImageScreen: {
    catName: string;
    catid: string;
    type: string;
    acaid: string;
    orgid: string;
    studentId: string;
    mobile: string;
  };
};

const GalleryImageCategoryScreen = ({ route }: any) => {
  const { orgid, studentId, mobile, acaid } = route.params;
  // console.log(route.params, 'route.params')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(true);
  const [imgCategoryList, setImgCategoryList] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  useEffect(() => {
    fetchStudentData();
    fetchImageCategories();
  }, []);

  const fetchStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const isLoggedIn = await AsyncStorage.getItem("isloggedIn");

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (response.data.isSuccess && response.data.studDetails?.length > 0) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
    }
  };

  const fetchImageCategories = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/gallery_image_category_api?orgId=${orgid}&aca_id=${acaid}`
      );
      if (response.data.isSuccess && response.data.imageCategory?.length > 0) {
        setImgCategoryList(response.data.imageCategory);
        // console.log('response.data.imageCategory==============', response.data.imageCategory)
      } else {
        setImgCategoryList([]);
      }
    } catch (error) {
      console.log("Error fetching image categories:", error);
      setImgCategoryList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderPress = (item) => {
    navigation.navigate("GalleryImageScreen", {
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

  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <TouchableOpacity onPress={() => handleFolderPress(item)}>
        <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />

      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFolderPress(item)}>
        <Text style={styles.categoryText}>
          {item.category_name} ({item.image_count})
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#9C27B0' ,marginBottom:-30}}>

      <View style={styles.container}>
        {/* <Spinner visible={isLoading} textContent={"Loading..."} /> */}
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery - Images</Text>
        </View>
        <View style={styles.albumContainer}>
          <Icon name="image" size={24} color="#2a2a2aff" />
          <Text style={styles.albumTitle}>Gallery Albums - Category List</Text>
          <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
          <ScrollView style={{ flex: 1, padding: 10 }}>
            {isAccordionOpen && (
              <View style={styles.accordion}>
                {imgCategoryList.length > 0 ? (
                  <FlatList
                    data={imgCategoryList}
                    renderItem={renderCategory}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
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
  header: {
    // width: width,
    // height: height / 5.3,
    // backgroundColor: "purple",
    // justifyContent: "center",
    // alignItems: "center",
    // borderBottomWidth: 3,
    // borderBottomColor: "red",
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  albumContainer: {
    width: "95%", height: '75%', marginTop: 20, marginLeft: 10,
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
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  headerText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: fonts.FONT_BOLD,
    marginLeft: 78
  },
  accordion: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folderImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  categoryItem: {
    alignItems: "center",
    marginVertical: 5,
    width: width / 2 - 15,
  },
  folderIcon: {
    width: 75,
    height: 75,
    marginBottom: 5,
  },
  categoryText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: fonts.ROBOTO_BOLD,
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
  },
});

export default GalleryImageCategoryScreen;


