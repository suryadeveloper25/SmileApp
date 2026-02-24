
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, Image, } from 'react-native';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import moment from 'moment';
// import { fonts } from '../root/config';
// import { SafeAreaView } from 'react-native-safe-area-context';


// interface TimetableProps {
//   route: any;
//   navigation: any
// };
// const TimeTableScreen: React.FC<TimetableProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [studentData, setStudentData] = useState({});
//   const [timetableData, setTimetableData] = useState<any>({
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//     Saturday: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [dataStatus, setDataStatus] = useState(false);
//   const [orgPeriods, setOrgPeriods] = useState(0);
//   const [todayIs, setTodayIs] = useState(moment().isoWeekday());

//   const [activeDay, setActiveDay] = useState("Monday");

//   // Get student data
//   const getStudentData = async () => {
//     try {
//       // const loggedIn = await AsyncStorage.getItem('isloggedIn');
//       const mobileNo = await AsyncStorage.getItem('mobile');
//       const st_orgId = orgid;
//       const st_id = studentId;
//       const st_mobile = mobileNo || mobile;

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${st_id}&mobile_no=${st_mobile}`
//       );
//       console.log('===>response.data.studDetails', response.data.studDetails)
//       if (response.data.isSuccess && response.data.studDetails) {
//         setStudentData(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.log('Error fetching student data:', error);
//       Alert.alert('Error', 'Unable to fetch student data');
//     }
//   };

//   // Get timetable data
//   const getTimetableData = async () => {
//     try {
//       const st_orgId = orgid;
//       const st_id = studentId;
//       const st_mobile = mobile;

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/time_table_api?orgId=${st_orgId}&studId=${st_id}&mobile_no=${st_mobile}`
//       );

//       if (response.data.isSuccess && response.data.time_table) {
//         setTimetableData(response.data.time_table);
//         setOrgPeriods(parseInt(response.data.no_of_org_periods, 10));
//         setDataStatus(true);
//       } else {
//         setDataStatus(false);
//         setOrgPeriods(0);
//       }
//     } catch (error) {
//       console.log('Error fetching timetable:', error);
//       setDataStatus(false);
//       setOrgPeriods(0);
//     }
//   };

//   useEffect(() => {
//     const todayIndex = new Date().getDay();
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     setActiveDay(todayIndex === 0 ? "Monday" : days[todayIndex]);
//   }, []);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       await getStudentData();
//       await getTimetableData();
//       setLoading(false);
//     };

//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#7c43bd' ,marginBottom:-30}}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={30} style={styles.Icon}
//               onPress={() => navigation.goBack()} />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Time Table</Text>
//         </View>
//         <View style={styles.weekdaysRow}>
//           <ScrollView horizontal={true}>
//             {days.map(day => (
//               <TouchableOpacity
//                 key={day}
//                 style={[
//                   styles.dayBtn,
//                   activeDay === day && styles.dayBtnActive,
//                 ]}
//                 onPress={() => setActiveDay(day)}
//               >
//                 <Text
//                   style={styles.dayText}>
//                   {day.slice(0, 3).toUpperCase()}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         <View style={{ flex: 1, backgroundColor: '#dae1f2ff', borderWidth: 1, borderColor: '#dae1f2ff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
//           <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8, paddingBottom: 200 }}>

//             <View style={styles.periodRow}>
//               {timetableData[activeDay]?.length > 0 ? (
//                 timetableData[activeDay].map((period: any, index: number,) => (
//                   <View key={index} style={styles.periodCard}>
//                     <View style={{ width: "100%", height: "16%", backgroundColor: '#A267E7', }}>
//                       <Text style={styles.periodTitle}>Period {index + 1}</Text>
//                     </View>
//                     {/* <AntDesign name="clock-o" size={24} style={styles.icon2} type={IconType.FontAwesome} /> */}
//                     <MaterialIcons name="punch-clock" size={24} style={styles.icon2} />
//                     <Text style={styles.periodTime}>  {period.time_from} - {period.time_to}</Text>
//                     <MaterialIcons name="edit" size={24} style={styles.icon3} />
//                     {/* <AntDesign name="edit" size={24} style={styles.icon2} type={IconType.FontAwesome} /> */}
//                     <Text style={styles.periodSubject}>
//                       {period.std_name}{period.section} / {period.subject_name}</Text>

//                     <Text style={styles.periodTeacher}>{period.staff_name}</Text>

//                   </View>
//                 ))
//               ) : (

//                 <View style={styles.noDataBox}>
//                   <Image
//                     source={require("../assest/smile-No-Data-Found-BG.png")}
//                     style={{ height: 120, resizeMode: "contain" }}
//                   />
//                   <Text style={styles.noDataText}>No Time Table Data Found!</Text>
//                 </View>
//               )}
//             </View>

//           </ScrollView>
//         </View>

//       </View>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', width: "100%", },
//   header: { width: '100%', height: 60, backgroundColor: '#7c43bd', flexDirection: 'row' },
//   backArrow: { fontSize: 22, color: '#fff' },
//   headerText: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#fff', top: 20, fontFamily: fonts.FONT_BOLD, marginLeft: 80 },
//   circleBtn: {
//     width: 30, height: 30, borderRadius: 15, backgroundColor: '#4B73FF',
//   },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   weekdaysRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   dayBtn: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     backgroundColor: '#eee',
//     borderRadius: 8, marginLeft: 5
//   },
//   icon2: {
//     top: 12,
//     color: '#929a9eff'
//   },
//   icon3: {
//     top: 3,
//     color: '#929a9eff'
//   },
//   noDataBox: { alignItems: "center", marginTop: 40 },
//   noDataText: { fontSize: 16, fontWeight: "600", color: "#444", marginTop: 10 },
//   dayBtnActive: { backgroundColor: '#A267E7' },
//   dayText: { fontSize: 14, color: '#333', fontFamily: fonts.FONT_BOLD },
//   dayTextActive: { fontWeight: 'bold' },
//   timetableContainer: { flexGrow: 1, padding: 8, paddingBottom: 100, },
//   periodRow: {
//     flexDirection: 'row', flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   periodCard: {
//     width: "48%", height: '25%',       // 🔹 Two columns
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     elevation: 2,         // for Android shadow
//     shadowColor: "#000",  // for iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   periodTitle: { fontWeight: 'bold', color: '#fff', marginBottom: 2, fontSize: 16, fontFamily: fonts.FONT_BOLD, textAlign: 'center' },
//   periodSubject: { fontSize: 14, color: '#333', marginLeft: 28, bottom: 20, },
//   periodTime: { fontSize: 14, color: '#555', marginLeft: 25, bottom: 10 },
//   periodTeacher: { fontSize: 14, color: '#3e3d3dff', marginLeft: 28, bottom: 15 },
//   placeholder: { color: '#ccc', textAlign: 'center', marginTop: 20 },
//   swipeText: { textAlign: 'right', color: '#666', marginTop: 10, marginBottom: 15, right: 10 },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#eee',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   Icon: {
//     left: 10, top: 20, color: "#fff"
//   },
// });

// export default TimeTableScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { fonts } from '../root/config';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Responsive helper functions
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Calculate card width for responsive grid
const getCardWidth = () => {
  const screenWidth = width;
  const padding = moderateScale(16);
  const gap = moderateScale(12);

  if (screenWidth < 360) {
    // Small devices - 1 column
    return screenWidth - (padding * 2);
  } else if (screenWidth < 600) {
    // Medium devices - 2 columns
    return (screenWidth - (padding * 2) - gap) / 2;
  } else {
    // Large devices/tablets - 3 columns
    return (screenWidth - (padding * 2) - (gap * 2)) / 3;
  }
};

interface TimetableProps {
  route: any;
  navigation: any;
}

const TimeTableScreen: React.FC<TimetableProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [studentData, setStudentData] = useState({});
  const [timetableData, setTimetableData] = useState<any>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [loading, setLoading] = useState(true);
  const [dataStatus, setDataStatus] = useState(false);
  const [orgPeriods, setOrgPeriods] = useState(0);
  const [todayIs, setTodayIs] = useState(moment().isoWeekday());
  const [activeDay, setActiveDay] = useState("Monday");

  // Get student data
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('mobile');
      const st_orgId = orgid;
      const st_id = studentId;
      const st_mobile = mobileNo || mobile;

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${st_id}&mobile_no=${st_mobile}`
      );

      if (response.data.isSuccess && response.data.studDetails) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log('Error fetching student data:', error);
      Alert.alert('Error', 'Unable to fetch student data');
    }
  };

  // Get timetable data
  const getTimetableData = async () => {
    try {
      const st_orgId = orgid;
      const st_id = studentId;
      const st_mobile = mobile;

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/time_table_api?orgId=${st_orgId}&studId=${st_id}&mobile_no=${st_mobile}`
      );

      if (response.data.isSuccess && response.data.time_table) {
        setTimetableData(response.data.time_table);
        setOrgPeriods(parseInt(response.data.no_of_org_periods, 10));
        setDataStatus(true);
      } else {
        setDataStatus(false);
        setOrgPeriods(0);
      }
    } catch (error) {
      console.log('Error fetching timetable:', error);
      setDataStatus(false);
      setOrgPeriods(0);
    }
  };

  useEffect(() => {
    const todayIndex = new Date().getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setActiveDay(todayIndex === 0 ? "Monday" : days[todayIndex]);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getStudentData();
      await getTimetableData();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7c43bd" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Time Table</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Day Selector */}
        <View style={styles.weekdaysContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weekdaysContent}
          >
            {days.map((day, index) => {
              const isToday = activeDay === day;
              const dayIndex = new Date().getDay();
              const todayDayName = days[dayIndex === 0 ? 0 : dayIndex - 1];
              const isTodayDay = day === todayDayName;

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayBtn,
                    isToday && styles.dayBtnActive,
                  ]}
                  onPress={() => setActiveDay(day)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isToday && styles.dayTextActive,
                    ]}
                  >
                    {day.slice(0, 3).toUpperCase()}
                  </Text>
                  {isTodayDay && (
                    <View style={styles.todayIndicator} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Timetable Content */}
        <View style={styles.timetableContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {timetableData[activeDay]?.length > 0 ? (
              <View style={styles.periodGrid}>
                {timetableData[activeDay].map((period: any, index: number) => (
                  <View key={index} style={styles.periodCard}>
                    {/* Period Header */}
                    <View style={styles.periodHeader}>
                      <Text style={styles.periodTitle}>Period {index + 1}</Text>
                    </View>

                    {/* Period Content */}
                    <View style={styles.periodContent}>
                      {/* Time */}
                      <View style={styles.periodRow}>
                        <MaterialIcons
                          name="access-time"
                          size={moderateScale(18)}
                          color="#7c43bd"
                          style={styles.periodIcon}
                        />
                        <Text style={styles.periodTime}>
                          {period.time_from} - {period.time_to}
                        </Text>
                      </View>

                      {/* Subject */}
                      <View style={styles.periodRow}>
                        <MaterialIcons
                          name="menu-book"
                          size={moderateScale(18)}
                          color="#7c43bd"
                          style={styles.periodIcon}
                        />
                        <Text style={styles.periodSubject} numberOfLines={2}>
                          {period.std_name}{period.section ? ` / ${period.section}` : ''} / {period.subject_name}
                        </Text>
                      </View>

                      {/* Teacher */}
                      {period.staff_name && (
                        <View style={styles.periodRow}>
                          <MaterialIcons
                            name="person"
                            size={moderateScale(18)}
                            color="#7c43bd"
                            style={styles.periodIcon}
                          />
                          <Text style={styles.periodTeacher} numberOfLines={1}>
                            {period.staff_name}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Image
                  source={require("../assest/smile-No-Data-Found-BG.png")}
                  style={styles.noDataImage}
                  resizeMode="contain"
                />
                <Text style={styles.noDataText}>No Time Table Data Found!</Text>
                <Text style={styles.noDataSubText}>
                  There are no classes scheduled for {activeDay}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TimeTableScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6A1B9A',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: moderateScale(10),
    fontFamily: fonts.ROBOTO_REGULAR || 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: '#221E1E',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: '#6A1B9A',
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  backButton: {
    padding: moderateScale(4),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.FONT_BOLD || 'Poppins-Bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: moderateScale(32),
  },

  // Weekdays Selector
  weekdaysContainer: {
    backgroundColor: '#fff',
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  weekdaysContent: {
    paddingHorizontal: moderateScale(12),
  },
  dayBtn: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: '#F0F0F0',
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(4),
    minWidth: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayBtnActive: {
    backgroundColor: '#7c43bd',
    elevation: 3,
    shadowColor: '#7c43bd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dayText: {
    fontSize: moderateScale(13),
    color: '#666',
    fontFamily: fonts.FONT_BOLD || 'Poppins-Bold',
  },
  dayTextActive: {
    color: '#fff',
  },
  todayIndicator: {
    position: 'absolute',
    top: moderateScale(4),
    right: moderateScale(4),
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#4CAF50',
  },

  // Timetable Container
  timetableContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: moderateScale(16),
    paddingBottom: moderateScale(30),
  },

  // Period Grid
  periodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodCard: {
    width: getCardWidth(),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  periodHeader: {
    backgroundColor: '#7c43bd',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
  },
  periodTitle: {
    fontSize: moderateScale(14),
    fontFamily: fonts.FONT_BOLD || 'Poppins-Bold',
    color: '#fff',
  },
  periodContent: {
    padding: moderateScale(12),
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  periodIcon: {
    marginRight: moderateScale(8),
  },
  periodTime: {
    fontSize: moderateScale(13),
    color: '#555',
    fontFamily: fonts.ROBOTO_REGULAR || 'Roboto-Regular',
    flex: 1,
  },
  periodSubject: {
    fontSize: moderateScale(13),
    color: '#333',
    fontFamily: fonts.ROBOTO_BOLD || 'Roboto-Bold',
    flex: 1,
  },
  periodTeacher: {
    fontSize: moderateScale(13),
    color: '#666',
    fontFamily: fonts.ROBOTO_REGULAR || 'Roboto-Regular',
    flex: 1,
  },

  // No Data State
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(60),
    paddingHorizontal: moderateScale(24),
  },
  noDataImage: {
    height: moderateScale(150),
    width: width * 0.6,
    marginBottom: moderateScale(16),
  },
  noDataText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.FONT_BOLD || 'Poppins-Bold',
    color: '#444',
    marginBottom: moderateScale(8),
    textAlign: 'center',
  },
  noDataSubText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.ROBOTO_REGULAR || 'Roboto-Regular',
    color: '#666',
    textAlign: 'center',
  },
});