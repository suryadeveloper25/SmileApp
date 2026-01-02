

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../root/config';

const { width, height } = Dimensions.get('window');

const VideoMainScreen = ({ route }) => {
  const { orgid, studentId, mobile } = route.params;
  const navigation = useNavigation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [acaYearList, setAcaYearList] = useState([]);
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    getStudentData();
    getAcademicYearList();
  }, []);

  const getStudentData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isloggedIn');
    const storedMobile = await AsyncStorage.getItem('mobile');
    setLoggedIn(isLoggedIn === 'true');
    setMobileNo(storedMobile || '');

    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${storedMobile}`
      );
      if (response.data.isSuccess && response.data.studDetails?.length > 0) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log('Error fetching student data', error);
    }
  };

  const getAcademicYearList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/gallery_academic_year_api?orgId=${orgid}`
      );
      if (response.data.isSuccess && response.data.activeAcademicYear) {
        setAcaYearList(response.data.activeAcademicYear);
      }
    } catch (error) {
      console.log('Error fetching academic year list', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFolder = ({ item }) => (
    <View style={styles.folderContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VideoCategory', {
            orgid,
            studentId,
            mobile,
            acaid: item.aca_Id,
          });
        }}
      >
        <Image source={require('../../assest/icons8-pictures-folder-94.png')} style={styles.folderImage} />
      </TouchableOpacity>
      <Text style={styles.folderText}>
        {item.aca_year} ({item.video_category_count})
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#784eb1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#830009', }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery - Videos</Text>
        </View>
        <View style={styles.albumContainer}>
          <Icon name="image" size={24} color="#2a2a2aff" />
          <Text style={styles.albumTitle}>Gallery Videos - List (Year wise)</Text>
          <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -13, bottom: 10 }} />
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.folderGrid}>

              {acaYearList.length > 0 ? (
                <FlatList
                  data={acaYearList}
                  renderItem={renderFolder}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  contentContainerStyle={{ padding: 10 }}
                />
              ) : (
                <View style={styles.noData}>
                  {/* <Image
            source={require('../assets/images/smile-No-Data-Found-BG.png')}
            style={{ width: 100, height: 100 }}
          /> */}
                  <Text style={styles.noDataText}>Sorry, No Data Found!.</Text>
                </View>
              )}
            </View>
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
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  noData: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  noDataImage: { width: 100, height: 100 },
  noDataText: { marginTop: 10, fontSize: 14, color: "#000" },
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
  folderContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
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
    fontFamily: fonts.ROBOTO_BOLD,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default VideoMainScreen;
