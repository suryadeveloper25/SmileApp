
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, Image, } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { fonts } from '../root/config';
import { SafeAreaView } from 'react-native-safe-area-context';


interface TimetableProps {
  route: any;
  navigation: any
};
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
      // const loggedIn = await AsyncStorage.getItem('isloggedIn');
      const mobileNo = await AsyncStorage.getItem('mobile');
      const st_orgId = orgid;
      const st_id = studentId;
      const st_mobile = mobileNo || mobile;

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${st_id}&mobile_no=${st_mobile}`
      );
      console.log('===>response.data.studDetails', response.data.studDetails)
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7c43bd' ,marginBottom:-30}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} style={styles.Icon}
              onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Time Table</Text>
        </View>
        <View style={styles.weekdaysRow}>
          <ScrollView horizontal={true}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayBtn,
                  activeDay === day && styles.dayBtnActive,
                ]}
                onPress={() => setActiveDay(day)}
              >
                <Text
                  style={styles.dayText}>
                  {day.slice(0, 3).toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1, backgroundColor: '#dae1f2ff', borderWidth: 1, borderColor: '#dae1f2ff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8, paddingBottom: 200 }}>

            <View style={styles.periodRow}>
              {timetableData[activeDay]?.length > 0 ? (
                timetableData[activeDay].map((period: any, index: number,) => (
                  <View key={index} style={styles.periodCard}>
                    <View style={{ width: "100%", height: "16%", backgroundColor: '#A267E7', }}>
                      <Text style={styles.periodTitle}>Period {index + 1}</Text>
                    </View>
                    {/* <AntDesign name="clock-o" size={24} style={styles.icon2} type={IconType.FontAwesome} /> */}
                    <MaterialIcons name="punch-clock" size={24} style={styles.icon2} />
                    <Text style={styles.periodTime}>  {period.time_from} - {period.time_to}</Text>
                    <MaterialIcons name="edit" size={24} style={styles.icon3} />
                    {/* <AntDesign name="edit" size={24} style={styles.icon2} type={IconType.FontAwesome} /> */}
                    <Text style={styles.periodSubject}>
                      {period.std_name}{period.section} / {period.subject_name}</Text>

                    <Text style={styles.periodTeacher}>{period.staff_name}</Text>

                  </View>
                ))
              ) : (

                <View style={styles.noDataBox}>
                  <Image
                    source={require("../assest/smile-No-Data-Found-BG.png")}
                    style={{ height: 120, resizeMode: "contain" }}
                  />
                  <Text style={styles.noDataText}>No Time Table Data Found!</Text>
                </View>
              )}
            </View>

          </ScrollView>
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  header: { width: '100%', height: 60, backgroundColor: '#7c43bd', flexDirection: 'row' },
  backArrow: { fontSize: 22, color: '#fff' },
  headerText: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#fff', top: 20, fontFamily: fonts.FONT_BOLD, marginLeft: 80 },
  circleBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: '#4B73FF',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  dayBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 8, marginLeft: 5
  },
  icon2: {
    top: 12,
    color: '#929a9eff'
  },
  icon3: {
    top: 3,
    color: '#929a9eff'
  },
  noDataBox: { alignItems: "center", marginTop: 40 },
  noDataText: { fontSize: 16, fontWeight: "600", color: "#444", marginTop: 10 },
  dayBtnActive: { backgroundColor: '#A267E7' },
  dayText: { fontSize: 14, color: '#333', fontFamily: fonts.FONT_BOLD },
  dayTextActive: { fontWeight: 'bold' },
  timetableContainer: { flexGrow: 1, padding: 8, paddingBottom: 100, },
  periodRow: {
    flexDirection: 'row', flexWrap: "wrap",
    justifyContent: "space-between",
  },
  periodCard: {
    width: "48%", height: '25%',       // 🔹 Two columns
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    elevation: 2,         // for Android shadow
    shadowColor: "#000",  // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  periodTitle: { fontWeight: 'bold', color: '#fff', marginBottom: 2, fontSize: 16, fontFamily: fonts.FONT_BOLD, textAlign: 'center' },
  periodSubject: { fontSize: 14, color: '#333', marginLeft: 28, bottom: 20, },
  periodTime: { fontSize: 14, color: '#555', marginLeft: 25, bottom: 10 },
  periodTeacher: { fontSize: 14, color: '#3e3d3dff', marginLeft: 28, bottom: 15 },
  placeholder: { color: '#ccc', textAlign: 'center', marginTop: 20 },
  swipeText: { textAlign: 'right', color: '#666', marginTop: 10, marginBottom: 15, right: 10 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  Icon: {
    left: 10, top: 20, color: "#fff"
  },
});

export default TimeTableScreen;

