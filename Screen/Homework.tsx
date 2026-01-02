import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Linking } from 'react-native';
// import { Calendar } from 'react-native-calendars';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Calendar, CalendarList } from 'react-native-calendars';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import { fonts, } from '../root/config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import notifee, { EventType } from '@notifee/react-native';
interface HomeworkScreenProps {
  route: any;
  navigation: any
};

const HomeworkScreen: React.FC<HomeworkScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [homeworkList, setHomeworkList] = useState([]);
  const [specialHomeworkList, setSpecialHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('Homework');
  const [dateList, setDateList] = useState([]);
  const [finalhwDate, setFinalHwDate] = useState("");
  const [finalSpecialHwDate, setFinalSpecialHwDate] = useState("");

  const [studentData, setStudentData] = useState({
    st_id: "",
    st_name: "",
    st_std: "",
    st_stdId: "",
    st_section: "",
    st_group: "",
    st_groupId: "",
    st_roll: "",
    st_mobile: "",
    st_gender: "",
    st_medium: "",
    st_blood: "",
    st_email: "",
    st_dob: "",
    st_father: "",
    st_mother: "",
    st_imageURL: "",
    st_staff_id: "",
  });

  // Dates
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);


  const generateDateList = async () => {
    let dates = [];
    const today = moment();

    // Add future dates
    for (let i = 1; i < 365; i++) {
      dates.push(today.clone().add(i, 'days').toDate());
    }

    // Add past dates
    for (let j = 30; j < 365; j++) {
      dates.push(today.clone().subtract(j, 'days').toDate());
    }

    setDateList(dates);
  };



  const getStudentData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem("isloggedIn");
      const mobileNo = await AsyncStorage.getItem("mobile");

      const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`);

      if (response.data.isSuccess && response.data.studDetails) {
        const details = response.data.studDetails[0];
        setStudentData({
          st_id: studentId,
          st_name: details.stud_name || "",
          st_std: details.std_name || "",
          st_stdId: details.std_Id || "",
          st_section: details.section || "",
          st_group: details.group_name || "",
          st_groupId: details.group_Id || "",
          st_roll: details.rollNo || "",
          st_mobile: mobileNo || "",
          st_gender: details.gender || "",
          st_medium: details.medium || "",
          st_blood: details.blood_group || "",
          st_email: details.email_Id || "",
          st_dob: details.dob || "",
          st_father: details.father_name || "",
          st_mother: details.mother_name || "",
          st_imageURL: details.photo_url || "",
          st_staff_id: details.staff_id || "",
        });
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
    }
  };



  const getHomeworkData = async () => {
    try {
      const section = studentData.st_section;
      const stdId = studentData.st_stdId;
      const finalGroup =
        studentData.st_groupId === "" || studentData.st_groupId === "-"
          ? "0"
          : studentData.st_groupId;

      const hwDate = finalhwDate || selectedDate;

      const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_homework_list_api?orgId=${orgid}&std_Id=${stdId}&group_Id=${finalGroup}&section=${section}&hw_date=${hwDate}`);

      // const response = await axios.post(
      //   `https://www.vtsmile.in/app/api/students/students_homework_list_api`,
      //   null,
      //   {
      //     params: {
      //       orgId: orgid,
      //       std_Id: studentData.st_stdId,
      //       group_Id: finalGroup,
      //       section: studentData.st_section,
      //       hw_date: hwDate,
      //     },
      //   }
      // );
      // console.log('response.data.homeworkDetails=llll=>', response.data.homeworkDetails)
      if (response.data.isSuccess) {
        setHomeworkList(response.data.homeworkDetails || []);
        setDataStatus(true);
      } else {
        setHomeworkList([]);
        setDataStatus(false);
      }
    } catch (error) {
      console.log("Error fetching homework:", error);
    }
  };

  const getSpecialHomeworkData = async () => {
    try {
      const section = studentData.st_section;
      const stdId = studentData.st_stdId;
      const finalGroup =
        studentData.st_groupId === "" || studentData.st_groupId === "-"
          ? "0"
          : studentData.st_groupId;

      const specialHwDate = finalSpecialHwDate
        ? finalSpecialHwDate
        : moment(selectedDate).format("D-M-YYYY");

      const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_special_homework_list_api?orgId=${orgid}&std_Id=${stdId}&group_Id=${finalGroup}&section=${section}&hw_date=${specialHwDate}&studId=${studentId}`);
      // console.log(orgid, stdId, section, specialHwDate, studentId)
      // const response = await axios.post(
      //   `https://www.vtsmile.in/app/api/students/students_special_homework_list_api`,
      //   null,
      //   {
      //     params: {
      //       orgId: orgid,
      //       std_Id: studentData.st_stdId,
      //       group_Id: finalGroup,
      //       section: studentData.st_section,
      //       hw_date: specialHwDate,
      //       studId: studentId,
      //     },
      //   }
      // );
      // console.log('response.data.specialhwDetailaaaaaaaaaas', response.data.specialhwDetails)
      if (response.data.isSuccess) {
        setSpecialHomeworkList(response.data.specialhwDetails || []);
        setDataStatus(true);
      } else {
        setSpecialHomeworkList([]);
        setDataStatus(false);
      }
    } catch (error) {
      console.log("Error fetching special homework:", error);
    }
  };

  //  useEffect(() => {
  //   const fetchData = async () => {
  //     await getStudentData();
  //     await generateDateList();
  //     await getHomeworkData();
  //     await getSpecialHomeworkData();
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [studentData.st_stdId,selectedDate]);

  useEffect(() => {
    if (studentData.st_stdId && selectedDate) {
      setLoading(true);
      getHomeworkData();
      getSpecialHomeworkData();
      setLoading(false);
    }
    getStudentData();
    generateDateList();

  }, [studentData, selectedDate]);

  useEffect(() => {
    // Foreground / background tap handling
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.pressAction?.id === 'homeworkList') {
        navigation.navigate('Homework'); // 🔹 Your screen name
      }
    });

    // App opened from quit state
    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification?.pressAction?.id === 'homeworkList') {
        navigation.navigate('Homework');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const isValidFileUrl = (url?: string) => {
    if (!url || typeof url !== 'string') return false;

    // remove trailing spaces
    const cleanUrl = url.trim();

    // must not end with slash (folder)
    if (cleanUrl.endsWith('/')) return false;

    // must contain file extension
    return /\.(pdf|jpg|jpeg|png|doc|docx)$/i.test(cleanUrl);
  };


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>My Homework</Text>
          {/* <Icon name="create-outline" size={28} color="yellow" style={styles.editIcon} /> */}
        </View>
        {/* <View style={styles.headerAvatar} /> */}
      </View>

      {/* Toggle Button Group */}
      <View style={{ backgroundColor: '#8659e5', width: "95%", height: 70, marginTop: 20, marginLeft: 10, borderRadius: 15 }}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 'Homework' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('Homework')}
          >
            <Text style={activeTab === 'Homework' ? styles.activeTabText : styles.inactiveTabText}>Homework</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'Special Homework' ? styles.activeTab1 : styles.inactiveTab1}
            onPress={() => setActiveTab('Special Homework')}
          >
            <Text style={activeTab === 'Special Homework' ? styles.activeTabText : styles.inactiveTabText}>Special Homework</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Date strip (Horizontal Calendar) */}
      <View style={styles.calendarWrapper}>

        <Calendar
          // horizontal={true}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [today]: {
              selected: today === selectedDate, // if today is selected
              marked: true,
              selectedColor: today === selectedDate ? 'orange' : 'purple', // green for today, orange if selected
              selectedTextColor: 'white',
              customStyles: {
                container: {
                  backgroundColor: today === selectedDate ? 'orange' : 'purple',
                },
                text: {
                  color: 'white',
                  fontWeight: 'bold',
                },
              },
            },
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: 'orange',
              selectedTextColor: 'white',
            },
          }}
          markingType={'custom'} // use custom to allow customStyles
        />



      </View>


      <ScrollView style={styles.homeworkContent}>
        {activeTab === 'Homework' ? (
          homeworkList.length === 0 ? (
            <View style={styles.emptyHomework}>
              <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
              <Text style={styles.emptyText}>No Homework Data Found!</Text>
            </View>
          ) : (
            homeworkList.map((item, index) => (
              <View key={index} style={styles.homeworkItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Text style={styles.homeworkSubject}>{item.subjectName}</Text>
                  {isValidFileUrl(item.hwAttach) && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.hwAttach)}
                    >
                      <Image
                        source={require('../assest/pdf_11180499.png')}
                        style={styles.pdfIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.homeworkTask}>{item.homeworkDesc}</Text>
                {/* <Text style={styles.homeworkTask}>{item.homeworkDesc}</Text> */}

              </View>
            ))
          )
        ) : (
          specialHomeworkList.length === 0 ? (
            <View style={styles.emptyHomework}>
              <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
              <Text style={styles.emptyText}>No Special Homework Data Found!</Text>
            </View>
          ) : (
            specialHomeworkList.map((item, index) => (
              <View key={index} style={styles.homeworkItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.homeworkSubject}>{item.subjectName}</Text>
                  {isValidFileUrl(item.spl_hw_attach) && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.spl_hw_attach)}
                    >
                      <Image
                        source={require('../assest/pdf_11180499.png')}
                        style={styles.pdfIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.homeworkTask}>{item.specialhwDesc}</Text>
                {/* <Text style={styles.homeworkTask}>{item.spl_hw_attach}</Text> */}

              </View>
            ))
          )
        )}
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fc' },

  homeworkItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  homeworkSubject: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7c43bd',
  },
  homeworkTask: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  pdfIcon: {
    tintColor: '#f64444ff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    top: 4
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7c43bd',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  backButton: {
    padding: 4,
    // backgroundColor: '#ad97ef',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: { color: '#fff', fontSize: 18, fontFamily: fonts.FONT_BOLD, marginRight: wp('8%') },
  editIcon: {},
  headerAvatar: {
    width: 24, height: 24,
    backgroundColor: '#ffb2d5',
    borderRadius: 12,
    marginLeft: 8
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 12,

  },
  activeTab: {
    width: '50%',
    backgroundColor: '#ffb2d5',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  activeTab1: {
    width: '50%',
    marginLeft: 5,
    backgroundColor: '#ffb2d5',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,

  },
  inactiveTab1: {
    width: '50%',
    backgroundColor: '#e0daf7',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  inactiveTab: {
    width: '50%',
    backgroundColor: '#e0daf7',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabText: { color: '#683ab7', fontFamily: fonts.ROBOTO_BOLD, fontSize: 16 },
  inactiveTabText: { color: '#ad97ef', fontFamily: fonts.ROBOTO_BOLD, fontSize: 16 },
  calendarWrapper: { marginHorizontal: 16, marginVertical: 2 },
  homeworkContent: { marginTop: 4, flex: 1 },
  emptyHomework: {
    backgroundColor: '#ffffffff', borderRadius: 14, padding: 24, alignItems: 'center', marginHorizontal: 8,
    borderWidth: 1, borderColor: '#62b6ed', marginTop: 18, height: 200
  },
  emptyImage: { width: "150%", height: 100, marginBottom: 15, resizeMode: 'contain' },
  emptyText: { fontSize: 17, color: '#62b6ed', fontFamily: fonts.FONT_BOLD, textAlign: 'center' },
  swipeText: {
    textAlign: 'center', color: '#ad97ef', fontSize: 15, paddingVertical: 2,
    bottom: 25, left: 60
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#e0daf7', paddingVertical: 10
  }
});

export default HomeworkScreen;

