

// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Dimensions, TouchableOpacity, StatusBar, } from 'react-native';
// import { Card, Divider, } from 'react-native-paper';
// import { PieChart } from 'react-native-gifted-charts';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { fonts } from "../root/config";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { SafeAreaView } from "react-native-safe-area-context";
// interface AttendanceProps {
//   route: any;
// };

// const AttendanceScreen: React.FC<AttendanceProps> = ({ route }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation<any>();

//   // Student Data
//   const [studentData, setStudentData] = useState({});
//   // Attendance Data
//   const [attendance, setAttendance] = useState({});

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );
//       // console.log("Student Profile Response:", response.data.studDetails);

//       if (response.data.isSuccess && response.data.studDetails) {
//         const data = response.data.studDetails[0];
//         // console.log("Student Data:", data);
//         setStudentData({
//           name: data.stud_name || "",
//           std: data.std_name || "",
//           section: data.section || "",
//           roll: data.rollNo || "",
//           father: data.father_name || "",
//           mother: data.mother_name || "",
//           dob: data.dob || "",
//           gender: data.gender || "",
//           email: data.email_Id || "",
//         });

//       }
//     } catch (err) {
//       console.error(err);
//       // Alert.alert("Error", "Failed to load student data");
//     }
//   };

//   // Fetch Attendance Report
//   const getAttendanceReport = async () => {
//     try {
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/student_attendance_report_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
//       );

//       // console.log("Attendance Report Response:", res.data.studentAttdanceReport);
//       if (res.data.isSuccess && res.data.studentAttdanceReport) {
//         const data = res.data.studentAttdanceReport[0];
//         setAttendance({
//           acaYear: res.data.acadamicYear,
//           attPeriod: res.data.attdancePeriod,
//           presentDays: data.total_present,
//           absentDays: data.total_absent,
//           presentPer: data.present_percentage,
//           absentPer: data.absent_percentage,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Failed to load attendance data");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await getStudentData();
//       await getAttendanceReport();
//       setLoading(false);
//     };
//     fetchData();
//   }, []);


//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#6200EE" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
//   // const total = Number(attendance.presentDays) + Number(attendance.absentDays);
//   //   const pieData = [
//   //    { name: 'Present', value: (attendance.presentDays / total) * 100, color: '#ffc107', legendFontColor: '#7F7F7F', legendFontSize: 12 },
//   //   { name: 'Absent', value: (attendance.absentDays/ total) * 100, color: '#f44336', legendFontColor: '#7F7F7F', legendFontSize: 12 },
//   //   ];
//   // console.log("Pie Chart Data:", pieData); // Debug log

//   const presentPercentage = Number(attendance.presentPer) || 0;
//   const absentPercentage = Number(attendance.absentPer) || 0;

//   const pieData = [
//     {
//       name: 'Present',
//       value: presentPercentage,
//       color: '#ffc107',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 12,
//     },
//     {
//       name: 'Absent',
//       value: absentPercentage,
//       color: '#f44336',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 12,
//     },
//   ];


//   return (
//     <SafeAreaView style={{ flex: 1,backgroundColor:'#7c43bd' ,marginBottom:-30}}>

//       <View style={styles.container}>


//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>My Attendance</Text>
//           {/* <Icon size={32} name="menu" style={{ backgroundColor: '#e57373' }} /> */}
//         </View>

//         {/* Student Info Card */}
//         <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8, paddingBottom: 100 }}>
//           <Card style={styles.userCard}>
//             <Card.Content>

//               <Text style={styles.name}>{studentData.name}</Text>
//               <Text style={styles.details}>Class: {studentData.std} {studentData.section} | Roll No: {studentData.roll}</Text>
//             </Card.Content>
//           </Card>

//           {/* Attendance Summary */}
//           <Card style={styles.cardMain}>
//             <Card.Title title="My Attendance (2025–2026)" titleStyle={{ fontFamily: fonts.ROBOTO_BOLD }} style={{ bottom: 10, right: 10 }} left={() => <Icon name="list" size={25} color="#673ab7" style={{ bottom: 5, left: 10 }} />} />
//             <Divider style={{ backgroundColor: '#302d2dff', height: 1, marginHorizontal: 5, bottom: 25 }} />
//             <Card.Content>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Academic Year</Text>
//                 <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 15 }}>:</Text>
//                 <Text style={styles.value}>{attendance.acaYear}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Att. Period</Text>
//                 <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 41 }}>:</Text>
//                 <Text style={styles.value1}>{attendance.attPeriod}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Total Present</Text>
//                 <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 25 }}>:</Text>
//                 <Text style={styles.value2}>{attendance.presentDays} (Days)</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Total Absent</Text>
//                 <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', left: 28 }}>:</Text>
//                 <Text style={styles.value3}>{attendance.absentDays} (Days)</Text>
//               </View>
//             </Card.Content>
//           </Card>

//           {/* Attendance Pie Chart */}
//           <View style={styles.chartBox}>
//             <PieChart
//               data={pieData}
//               width={Dimensions.get('window').width - 30}
//               height={200}
//               chartConfig={{
//                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               }}
//               accessor="population"
//               backgroundColor="transparent"
//               paddingLeft="15"
//             />

//             <View style={styles.chartCenter}>
//               {/* <Icon size={25} name="person" color={'#fff'} style={styles.checkIcon} /> */}
//               {/* <Text style={styles.chartText}>{attendance.presentPer}%</Text> */}
//               {/* <Text style={styles.chartText}>{presentPercentage.toFixed()}%</Text> */}
//               {/* <Text style={styles.chartText1}>{absentPercentage.toFixed()}%</Text> */}
//             </View>
//             <View style={styles.legendRow}>
//               <View style={styles.legendItem}>
//                 <View style={[styles.legendDot, { backgroundColor: '#ffc107' }]} />
//                 <Text style={styles.legendLabel}>Present:{presentPercentage.toFixed()}%</Text>
//               </View>
//               <View style={styles.legendItem}>
//                 <View style={[styles.legendDot, { backgroundColor: '#f44336' }]} />
//                 <Text style={styles.legendLabel}>Absent: {absentPercentage.toFixed()}%</Text>
//               </View>
//             </View>
//           </View>

//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );

// }
// export default AttendanceScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },

//   header: {
//     flexDirection: 'row', alignItems: 'center',
//     backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between', fontFamily: fonts.FONT_BOLD

//   },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   headerTitle: { color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, right: 95 },
//   userCard: {
//     backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
//     paddingVertical: 14,
//   },
//   starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 4 },
//   name: { color: '#fff', fontSize: 18, fontFamily: fonts.FONT_BOLD, letterSpacing: 1, textAlign: 'center' },
//   details: { color: '#ede7f6', fontSize: 14, textAlign: 'center', marginTop: 2, fontFamily: fonts.ROBOTO_BOLD },
//   cardMain: {
//     backgroundColor: '#d1c4e9', margin: 12, borderRadius: 17, paddingVertical: 5, borderWidth: 1, borderColor: '#5e35b1', bottom: 10
//   },
//   infoRow: { flexDirection: 'row', marginVertical: 3, bottom: 10 },
//   label: { color: '#5e35b1', fontWeight: '600', fontSize: 15, fontFamily: fonts.ROBOTO_BOLD },
//   value: { color: '#222', fontSize: 15, marginLeft: 20, fontFamily: fonts.ROBOTO_MEDIUM  },
//   value1: { color: '#222', fontSize: 15, marginLeft: 45 , fontFamily: fonts.ROBOTO_MEDIUM },
//   value2: { color: '#222', fontSize: 15, marginLeft: 29, fontFamily: fonts.ROBOTO_MEDIUM  },
//   value3: { color: '#222', fontSize: 15, marginLeft: 33, fontFamily: fonts.ROBOTO_MEDIUM  },
//   chartBox: {
//     margin: 13, backgroundColor: '#f5f5fa', borderRadius: 16, alignItems: 'center',
//     padding: 18, borderWidth: 1.4, borderColor: '#f3e5f5', bottom: hp('1%'), height: hp('40%')
//   },
//   pieChart: { height: 140, width: 140, backgroundColor: 'transparent' },
//   chartCenter: {
//     position: 'absolute', top: 75, left: 45, alignItems: 'center'
//   },
//   checkIcon: { backgroundColor: '#43b13f', marginBottom: 2, borderRadius: 18 },
//   chartText: { color: '#43b13f', fontWeight: 'bold', fontSize: 17, marginLeft: 10 },
//   chartText1: { color: '#1039ceff', fontWeight: 'bold', fontSize: 17, left: 105, bottom: 95 },
//   legendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
//   legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 14 },
//   legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
//   legendLabel: { fontSize: 15, color: '#222', fontFamily: fonts.FONT_BOLD },
// });



import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Flow } from "react-native-animated-spinkit";

const { width, height } = Dimensions.get("window");

// ─── Responsive scale ─────────────────────────────────────────────────────────
const BASE_WIDTH = 375;
const scale = (size: number) => Math.round((width / BASE_WIDTH) * size);
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const sp = (size: number) => clamp(scale(size), size * 0.8, size * 1.2);

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: '#6A1B9A',
  primaryLight: '#8E24AA',
  primaryDark: '#4A0072',
  surface: '#FFFFFF',
  background: '#F3EDF7',
  cardBg: '#FDFAFF',
  present: '#00C853',
  presentLight: '#E8F5E9',
  absent: '#F44336',
  absentLight: '#FFEBEE',
  textPrimary: '#1A1A2E',
  textSecondary: '#5D4E6D',
  textMuted: '#9E8CA8',
  border: '#E1D5EC',
  gold: '#FFB300',
  white: '#FFFFFF',
};

interface AttendanceProps {
  route: any;
}

const AttendanceScreen: React.FC<AttendanceProps> = ({ route }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const [studentData, setStudentData] = useState<any>({});
  const [attendance, setAttendance] = useState<any>({});

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      if (response.data.isSuccess && response.data.studDetails) {
        const data = response.data.studDetails[0];
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
    }
  };

  const getAttendanceReport = async () => {
    try {
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/student_attendance_report_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );
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
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getStudentData();
      await getAttendanceReport();
      setLoading(false);
    })();
  }, []);

  // ── Loading ───────────────────────────────────────────────────────────────
  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.safeArea}>
  //       <StatusBar barStyle="light-content" backgroundColor={C.primary} />
  //       <View style={styles.loaderContainer}>
  //         <View style={styles.loaderCard}>
  //           <ActivityIndicator size={44} color={C.primary} />
  //           <Text style={styles.loaderText}>Loading Attendance...</Text>
  //         </View>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const presentPct = Number(attendance.presentPer) || 0;
  const absentPct = Number(attendance.absentPer) || 0;

  const pieData = [
    { value: presentPct, color: C.present, label: 'Present' },
    { value: absentPct, color: C.absent, label: 'Absent' },
  ];

  const chartSize = Math.min(width * 0.55, 200);
  const isGood = presentPct >= 75;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.primary} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-back" size={sp(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Attendance</Text>
        {/* <View style={styles.headerBtn} /> */}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Student Profile Card ── */}
        <View style={styles.profileCard}>
          {/* Avatar Circle */}
          {/* <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {studentData.name ? studentData.name.charAt(0).toUpperCase() : 'S'}
            </Text>
          </View> */}
          <Text style={styles.studentName}>{studentData.name || '—'}</Text>
          <View style={styles.profileBadgesRow}>
            <View style={styles.profileBadge}>
              <Icon name="group" size={sp(13)} color={C.surface} />
              <Text style={styles.profileBadgeText}>
                Class: {studentData.std} {studentData.section}
              </Text>
            </View>
            <View style={styles.profileBadgeDot} />
            <View style={styles.profileBadge}>
              <Icon name="format-list-numbered" size={sp(13)} color={C.surface} />
              <Text style={styles.profileBadgeText}>
                Roll No: {studentData.roll}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderTopColor: C.present }]}>
            <Text style={[styles.statValue, { color: C.present }]}>
              {attendance.presentDays ?? '—'}
            </Text>
            <Text style={styles.statLabel}>Present Days</Text>
            <View style={[styles.statBadge, { backgroundColor: C.presentLight }]}>
              <Text style={[styles.statBadgeText, { color: C.present }]}>
                {presentPct.toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={[styles.statCard, { borderTopColor: C.absent }]}>
            <Text style={[styles.statValue, { color: C.absent }]}>
              {attendance.absentDays ?? '—'}
            </Text>
            <Text style={styles.statLabel}>Absent Days</Text>
            <View style={[styles.statBadge, { backgroundColor: C.absentLight }]}>
              <Text style={[styles.statBadgeText, { color: C.absent }]}>
                {absentPct.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>

        {/* ── Attendance Detail Card ── */}
        <View style={styles.detailCard}>
          <View style={styles.detailCardHeader}>
            <View style={styles.detailCardIcon}>
              <Icon name="bar-chart" size={sp(18)} color={C.primaryLight} />
            </View>
            <Text style={styles.detailCardTitle}>Attendance Summary</Text>
          </View>
          <Divider style={styles.detailDivider} />

          <InfoRow
            icon="school"
            label="Academic Year"
            value={attendance.acaYear || '—'}
          />
          <InfoRow
            icon="date-range"
            label="Att. Period"
            value={attendance.attPeriod || '—'}
          />
          <InfoRow
            icon="check-circle"
            label="Total Present"
            value={`${attendance.presentDays ?? '—'} Days`}
            valueColor={C.present}
          />
          <InfoRow
            icon="cancel"
            label="Total Absent"
            value={`${attendance.absentDays ?? '—'} Days`}
            valueColor={C.absent}
            isLast
          />
        </View>

        {/* ── Pie Chart Card ── */}
        <View style={styles.chartCard}>
          <View style={styles.detailCardHeader}>
            <View style={styles.detailCardIcon}>
              <Icon name="pie-chart" size={sp(18)} color={C.primaryLight} />
            </View>
            <Text style={styles.detailCardTitle}>Attendance Overview</Text>
          </View>
          <Divider style={styles.detailDivider} />

          {/* Donut Chart */}
          <View style={styles.chartWrapper}>
            <PieChart
              data={pieData}
              donut
              radius={chartSize / 2}
              innerRadius={chartSize / 2 * 0.55}
              innerCircleColor={C.cardBg}
              strokeColor={C.surface}
              strokeWidth={2}
              centerLabelComponent={() => (
                <View style={styles.chartCenterLabel}>
                  <Text style={[styles.chartCenterPct, { color: isGood ? C.present : C.absent }]}>
                    {presentPct.toFixed(0)}%
                  </Text>
                  <Text style={styles.chartCenterSub}>Present</Text>
                </View>
              )}
            />
          </View>

          {/* Status Banner */}
          <View style={[styles.statusBanner, { backgroundColor: isGood ? C.presentLight : C.absentLight }]}>
            <Icon
              name={isGood ? "verified" : "warning"}
              size={sp(18)}
              color={isGood ? C.present : C.absent}
            />
            <Text style={[styles.statusText, { color: isGood ? C.present : C.absent }]}>
              {isGood
                ? 'Great! Attendance is above 75%'
                : 'Attendance below 75% — needs improvement'}
            </Text>
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            {[
              { color: C.present, label: 'Present', pct: presentPct },
              { color: C.absent, label: 'Absent', pct: absentPct },
            ].map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>
                  {item.label}
                </Text>
                <Text style={[styles.legendPct, { color: item.color }]}>
                  {item.pct.toFixed(1)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Progress Bar ── */}
        {/* <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Attendance Progress</Text>
            <Text style={[styles.progressPct, { color: isGood ? C.present : C.absent }]}>
              {presentPct.toFixed(1)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(presentPct, 100)}%` as any,
                  backgroundColor: isGood ? C.present : C.absent,
                },
              ]}
            />
       
            <View style={styles.progressMarker}>
              <View style={styles.progressMarkerLine} />
              <Text style={styles.progressMarkerLabel}>75%</Text>
            </View>
          </View>
          <View style={styles.progressFooter}>
            <Text style={styles.progressFooterText}>0%</Text>
            <Text style={styles.progressFooterText}>Minimum: 75%</Text>
            <Text style={styles.progressFooterText}>100%</Text>
          </View>
        </View> */}

        <View style={{ height: sp(20) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── InfoRow sub-component ────────────────────────────────────────────────────
const InfoRow = ({
  icon,
  label,
  value,
  valueColor,
  isLast,
}: {
  icon: string;
  label: string;
  value: string;
  valueColor?: string;
  isLast?: boolean;
}) => (
  <View style={[infoRowStyles.row, isLast && { borderBottomWidth: 0 }]}>
    <View style={infoRowStyles.iconWrap}>
      <Icon name={icon} size={sp(16)} color={C.primaryLight} />
    </View>
    <Text style={infoRowStyles.label}>{label}</Text>
    <Text style={[infoRowStyles.value, valueColor ? { color: valueColor } : {}]}>
      {value}
    </Text>
  </View>
);

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sp(11),
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  iconWrap: {
    width: sp(30),
    alignItems: 'center',
    marginRight: sp(8),
  },
  label: {
    flex: 1,
    fontSize: sp(13),
    color: C.textSecondary,
    fontFamily: fonts.FONT_MEDIUM,
  },
  value: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: '55%',
  },
});

export default AttendanceScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.primary,
  },

  // ── Loader ──
  loaderContainer: {
    flex: 1,
    backgroundColor: C.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderCard: {
    backgroundColor: C.surface,
    borderRadius: sp(20),
    padding: sp(36),
    alignItems: 'center',
    shadowColor: C.primary,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  loaderText: {
    marginTop: sp(14),
    fontSize: sp(14),
    color: C.textSecondary,
    fontFamily: fonts.FONT_MEDIUM,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: C.primary,
    paddingHorizontal: sp(16),
    paddingVertical: sp(14),
  },
  headerBtn: {
    width: sp(40),
    height: sp(40),
    borderRadius: sp(20),
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: sp(18),
    marginLeft: 80,
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
  },

  // ── Scroll ──
  scrollView: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContent: {
    padding: sp(14),
    paddingBottom: sp(80),
  },

  // ── Profile Card ──
  profileCard: {
    backgroundColor: C.primary,
    borderRadius: sp(20),
    paddingVertical: sp(22),
    paddingHorizontal: sp(16),
    alignItems: 'center',
    marginBottom: sp(14),
    shadowColor: C.primaryDark,
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  avatar: {
    width: sp(64),
    height: sp(64),
    borderRadius: sp(32),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sp(10),
  },
  avatarLetter: {
    fontSize: sp(28),
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
  },
  studentName: {
    fontSize: sp(18),
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.5,
    marginBottom: sp(8),
    textAlign: 'center',
  },
  profileBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp(8),
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: sp(20),
    paddingHorizontal: sp(10),
    paddingVertical: sp(4),
    gap: sp(4),
  },
  profileBadgeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: sp(12),
    fontFamily: fonts.FONT_MEDIUM,
  },
  profileBadgeDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  // ── Stats Row ──
  statsRow: {
    flexDirection: 'row',
    gap: sp(12),
    marginBottom: sp(14),
  },
  statCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    alignItems: 'center',
    borderTopWidth: sp(4),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: sp(28),
    fontFamily: fonts.FONT_BOLD,
    lineHeight: sp(34),
  },
  statLabel: {
    fontSize: sp(12),
    color: C.textMuted,
    fontFamily: fonts.FONT_MEDIUM,
    marginTop: sp(2),
    marginBottom: sp(8),
  },
  statBadge: {
    borderRadius: sp(20),
    paddingHorizontal: sp(10),
    paddingVertical: sp(3),
  },
  statBadgeText: {
    fontSize: sp(12),
    fontFamily: fonts.FONT_BOLD,
  },

  // ── Detail Card ──
  detailCard: {
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    marginBottom: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sp(12),
  },
  detailCardIcon: {
    width: sp(34),
    height: sp(34),
    borderRadius: sp(10),
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sp(10),
  },
  detailCardTitle: {
    fontSize: sp(15),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
  detailDivider: {
    backgroundColor: C.border,
    height: 1,
    marginBottom: sp(4),
  },

  // ── Chart Card ──
  chartCard: {
    backgroundColor: C.cardBg,
    borderRadius: sp(16),
    padding: sp(14),
    marginBottom: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  chartWrapper: {
    alignItems: 'center',
    paddingVertical: sp(16),
  },
  chartCenterLabel: {
    alignItems: 'center',
  },
  chartCenterPct: {
    fontSize: sp(22),
    fontFamily: fonts.FONT_BOLD,
    lineHeight: sp(28),
  },
  chartCenterSub: {
    fontSize: sp(11),
    color: C.textMuted,
    fontFamily: fonts.FONT_MEDIUM,
  },

  // ── Status Banner ──
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sp(10),
    paddingHorizontal: sp(14),
    paddingVertical: sp(10),
    gap: sp(8),
    marginBottom: sp(14),
  },
  statusText: {
    fontSize: sp(13),
    fontFamily: fonts.FONT_MEDIUM,
    flex: 1,
  },

  // ── Legend ──
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: sp(24),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp(6),
  },
  legendDot: {
    width: sp(10),
    height: sp(10),
    borderRadius: sp(5),
  },
  legendText: {
    fontSize: sp(13),
    color: C.textSecondary,
    fontFamily: fonts.FONT_MEDIUM,
  },
  legendPct: {
    fontSize: sp(13),
    fontFamily: fonts.FONT_BOLD,
  },

  // ── Progress Card ──
  progressCard: {
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sp(10),
  },
  progressTitle: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
  progressPct: {
    fontSize: sp(18),
    fontFamily: fonts.FONT_BOLD,
  },
  progressTrack: {
    height: sp(12),
    backgroundColor: '#EDE7F6',
    borderRadius: sp(6),
    overflow: 'visible',
    marginBottom: sp(6),
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: sp(6),
  },
  progressMarker: {
    position: 'absolute',
    left: '75%',
    top: -sp(4),
    alignItems: 'center',
  },
  progressMarkerLine: {
    width: sp(2),
    height: sp(20),
    backgroundColor: C.primaryLight,
    borderRadius: 1,
  },
  progressMarkerLabel: {
    fontSize: sp(10),
    color: C.primaryLight,
    fontFamily: fonts.FONT_BOLD,
    marginTop: sp(2),
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sp(20),
  },
  progressFooterText: {
    fontSize: sp(11),
    color: C.textMuted,
    fontFamily: fonts.FONT_REGULAR,
  },
});