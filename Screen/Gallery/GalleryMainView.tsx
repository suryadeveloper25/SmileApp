

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../root/config";

interface GalleryImageMainProps {
  route: any;
  navigation: any
}

const GalleryMainScreen: React.FC<GalleryImageMainProps> = ({ route, navigation }) => {

  const { orgid, studentId, mobile } = route.params;

  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>({});
  const [acaYearList, setAcaYearList] = useState<any[]>([]);

  const getStudentData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem("isloggedIn");
      const storedMobile = await AsyncStorage.getItem("mobile");

      const st_mobile = storedMobile || mobile;
      const st_orgId = orgid;

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${studentId}&mobile_no=${st_mobile}`
      );

      if (response.data.isSuccess && response.data.studDetails?.length) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
    }
  };

  const getAcademicYearList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/gallery_academic_year_api?orgId=${orgid}`
      );

      if (response.data.isSuccess && response.data.activeAcademicYear?.length) {
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

  useEffect(() => {
    getStudentData();
    getAcademicYearList();
  }, []);


  const renderFolder = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.folderContainer}
        onPress={() =>
          navigation.navigate("GalleryImageCategory", {
            acaid: item.aca_Id,
            orgid,
            studentId,
            mobile,
          })
        }
      >
        <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />
        <Text style={styles.folderText}>
          {item.aca_year} ({item.img_category_count})
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF0000" />
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
            <View style={styles.folderGrid}>


              {acaYearList.length ? (
                <FlatList
                  data={acaYearList}
                  renderItem={renderFolder}
                  keyExtractor={(item) => item.aca_Id.toString()}
                  numColumns={2}
                  contentContainerStyle={styles.flatListContainer}
                />
              ) : (
                <View style={styles.noData}>
                  {/* <Image
            source={require("../assets/images/smile-No-Data-Found-BG.png")}
            style={styles.noDataImage}
          /> */}
                  <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GalleryMainScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },

  header: {
    backgroundColor: '#9C27B0',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

  },
  flatListContainer: { paddingHorizontal: 10, paddingVertical: 20 },
  folderContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  noData: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  noDataImage: { width: 100, height: 100 },
  noDataText: { marginTop: 10, fontSize: 14, color: "#000", fontFamily: fonts.FONT_BOLD, },
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
  folderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folderItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  folderImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  folderText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.ROBOTO_BOLD
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

