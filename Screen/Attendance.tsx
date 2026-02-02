

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Dimensions, TouchableOpacity, StatusBar, } from 'react-native';
import { Card, Divider, } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../root/config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
interface AttendanceProps {
  route: any;
};

const AttendanceScreen: React.FC<AttendanceProps> = ({ route }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  // Student Data
  const [studentData, setStudentData] = useState({});
  // Attendance Data
  const [attendance, setAttendance] = useState({});

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      // console.log("Student Profile Response:", response.data.studDetails);

      if (response.data.isSuccess && response.data.studDetails) {
        const data = response.data.studDetails[0];
        // console.log("Student Data:", data);
        setStudentData({
          name: data.stud_name || "",
          std: data.std_name || "",
          section: data.section || "",
          roll: data.rollNo || "",
          father: data.father_name || "",
          mother: data.mother_name || "",
          dob: data.dob || "",
          gender: data.gender || "",
          email: data.email_Id || "",
        });

      }
    } catch (err) {
      console.error(err);
      // Alert.alert("Error", "Failed to load student data");
    }
  };

  // Fetch Attendance Report
  const getAttendanceReport = async () => {
    try {
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/student_attendance_report_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );

      // console.log("Attendance Report Response:", res.data.studentAttdanceReport);
      if (res.data.isSuccess && res.data.studentAttdanceReport) {
        const data = res.data.studentAttdanceReport[0];
        setAttendance({
          acaYear: res.data.acadamicYear,
          attPeriod: res.data.attdancePeriod,
          presentDays: data.total_present,
          absentDays: data.total_absent,
          presentPer: data.present_percentage,
          absentPer: data.absent_percentage,
        });
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load attendance data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getStudentData();
      await getAttendanceReport();
      setLoading(false);
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading...</Text>
      </View>
    );
  }
  // const total = Number(attendance.presentDays) + Number(attendance.absentDays);
  //   const pieData = [
  //    { name: 'Present', value: (attendance.presentDays / total) * 100, color: '#ffc107', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  //   { name: 'Absent', value: (attendance.absentDays/ total) * 100, color: '#f44336', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  //   ];
  // console.log("Pie Chart Data:", pieData); // Debug log

  const presentPercentage = Number(attendance.presentPer) || 0;
  const absentPercentage = Number(attendance.absentPer) || 0;

  const pieData = [
    {
      name: 'Present',
      value: presentPercentage,
      color: '#ffc107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Absent',
      value: absentPercentage,
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#7c43bd' ,marginBottom:-30}}>
      
      <View style={styles.container}>


        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Attendance</Text>
          {/* <Icon size={32} name="menu" style={{ backgroundColor: '#e57373' }} /> */}
        </View>

        {/* Student Info Card */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8, paddingBottom: 100 }}>
          <Card style={styles.userCard}>
            <Card.Content>
              {/* <View style={styles.starsRow}>
            <Icon name="star" size={18} color="#ffd600" />
            <Icon name="star" size={18} color="#ffd600" />
            <Icon name="star" size={18} color="#ffd600" />
          </View> */}
              <Text style={styles.name}>{studentData.name}</Text>
              <Text style={styles.details}>Class: {studentData.std} {studentData.section} | Roll No: {studentData.roll}</Text>
            </Card.Content>
          </Card>

          {/* Attendance Summary */}
          <Card style={styles.cardMain}>
            <Card.Title title="My Attendance (2025–2026)" titleStyle={{ fontFamily: fonts.ROBOTO_BOLD }} style={{ bottom: 10, right: 10 }} left={() => <Icon name="list" size={25} color="#673ab7" style={{ bottom: 5, left: 10 }} />} />
            <Divider style={{ backgroundColor: '#302d2dff', height: 1, marginHorizontal: 5, bottom: 25 }} />
            <Card.Content>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Academic Year</Text>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 15 }}>:</Text>
                <Text style={styles.value}>{attendance.acaYear}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Att. Period</Text>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 41 }}>:</Text>
                <Text style={styles.value1}>{attendance.attPeriod}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Total Present</Text>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 25 }}>:</Text>
                <Text style={styles.value2}>{attendance.presentDays} (Days)</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Total Absent</Text>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 28 }}>:</Text>
                <Text style={styles.value3}>{attendance.absentDays} (Days)</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Attendance Pie Chart */}
          <View style={styles.chartBox}>
            <PieChart
              data={pieData}
              width={Dimensions.get('window').width - 30}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />

            <View style={styles.chartCenter}>
              {/* <Icon size={25} name="person" color={'#fff'} style={styles.checkIcon} /> */}
              {/* <Text style={styles.chartText}>{attendance.presentPer}%</Text> */}
              {/* <Text style={styles.chartText}>{presentPercentage.toFixed()}%</Text> */}
              {/* <Text style={styles.chartText1}>{absentPercentage.toFixed()}%</Text> */}
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#ffc107' }]} />
                <Text style={styles.legendLabel}>Present:{presentPercentage.toFixed()}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#f44336' }]} />
                <Text style={styles.legendLabel}>Absent: {absentPercentage.toFixed()}%</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );

}
export default AttendanceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },

  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between', fontFamily: fonts.FONT_BOLD

  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: { color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, right: 95 },
  userCard: {
    backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
    paddingVertical: 14,
  },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 4 },
  name: { color: '#fff', fontSize: 18, fontFamily: fonts.FONT_BOLD, letterSpacing: 1, textAlign: 'center' },
  details: { color: '#ede7f6', fontSize: 14, textAlign: 'center', marginTop: 2, fontFamily: fonts.ROBOTO_BOLD },
  cardMain: {
    backgroundColor: '#d1c4e9', margin: 12, borderRadius: 17, paddingVertical: 5, borderWidth: 1, borderColor: '#5e35b1', bottom: 10
  },
  infoRow: { flexDirection: 'row', marginVertical: 3, bottom: 10 },
  label: { color: '#5e35b1', fontWeight: '600', fontSize: 15, fontFamily: fonts.ROBOTO_BOLD },
  value: { color: '#222', fontSize: 15, marginLeft: 20, fontFamily: fonts.ROBOTO_MEDIUM  },
  value1: { color: '#222', fontSize: 15, marginLeft: 45 , fontFamily: fonts.ROBOTO_MEDIUM },
  value2: { color: '#222', fontSize: 15, marginLeft: 29, fontFamily: fonts.ROBOTO_MEDIUM  },
  value3: { color: '#222', fontSize: 15, marginLeft: 33, fontFamily: fonts.ROBOTO_MEDIUM  },
  chartBox: {
    margin: 13, backgroundColor: '#f5f5fa', borderRadius: 16, alignItems: 'center',
    padding: 18, borderWidth: 1.4, borderColor: '#f3e5f5', bottom: hp('1%'), height: hp('40%')
  },
  pieChart: { height: 140, width: 140, backgroundColor: 'transparent' },
  chartCenter: {
    position: 'absolute', top: 75, left: 45, alignItems: 'center'
  },
  checkIcon: { backgroundColor: '#43b13f', marginBottom: 2, borderRadius: 18 },
  chartText: { color: '#43b13f', fontWeight: 'bold', fontSize: 17, marginLeft: 10 },
  chartText1: { color: '#1039ceff', fontWeight: 'bold', fontSize: 17, left: 105, bottom: 95 },
  legendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 14 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendLabel: { fontSize: 15, color: '#222', fontFamily: fonts.FONT_BOLD },
});


