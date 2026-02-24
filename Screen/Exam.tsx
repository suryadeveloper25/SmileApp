
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image, TouchableOpacity,
//   ActivityIndicator,
//   ScrollView
// } from 'react-native';
// import { Divider } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import { Dropdown } from "react-native-element-dropdown";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { fonts } from "../root/config";
// import { SafeAreaView } from "react-native-safe-area-context";
// interface ExamScreenScreenProps {
//   route: any
//   navigation: any
// }
// const ExamScreen: React.FC<ExamScreenScreenProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [studentData, setStudentData] = useState({});
//   const [examList, setExamList] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [examTable, setExamTable] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch student profile data
//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem('mobile');
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`)
//       if (response.data.isSuccess && response.data.studDetails.length > 0) {
//         setStudentData(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch exam list
//   const getExams = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`);
//       if (response.data.isSuccess && response.data.examList) {
//         setExamList(response.data.examList.map(ex => ({ label: ex.exam_name, value: ex.examId })));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch exam timetable for selected exam
//   // const getExamTable = async (examId) => {
//   //   if (!examId) return;
//   //   try {
//   //     const response = await axios.post(
//   //       `https://www.vtsmile.in/app/api/students/examination_timetable_api?orgId=${orgid}&exam_Id=${examId}&studId=${studentId}&mobile_no=${mobile}`
//   //     );
//   //     console.log(response.data.examSchedule,'===>response.data.examSchedule')
//   //     if (response.data.isSuccess && response.data.examSchedule) {
//   //       setExamTable(response.data.examSchedule);
//   //     } else {
//   //       setExamTable([]);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const getExamTable = async (examId) => {
//   if (!examId) return;
//   try {
//     const response = await axios.post(
//       `https://www.vtsmile.in/app/api/students/examination_timetable_api?orgId=${orgid}&exam_Id=${examId}&studId=${studentId}&mobile_no=${mobile}`
//     );
//     console.log(response.data.examSchedule, '===>response.data.examSchedule');

//     if (response.data.isSuccess && response.data.examSchedule) {
//       // Sort exam schedule by date in ascending order
//       const sortedExamSchedule = response.data.examSchedule.sort((a, b) => {
//         // Convert DD-MM-YYYY format to Date object for comparison
//         const dateA = new Date(a.exam_date.split('-').reverse().join('-'));
//         const dateB = new Date(b.exam_date.split('-').reverse().join('-'));
//         return dateA - dateB;
//       });

//       setExamTable(sortedExamSchedule);
//     } else {
//       setExamTable([]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

//   useEffect(() => {
//     setLoading(true);
//     getStudentData();
//     getExams();
//     getExamTable(selectedExam);
//     setLoading(false);
//   }, [selectedExam]);

//   // useEffect(() => {
//   //   getExamTable(selectedExam);
//   // }, [selectedExam]);

//   // const renderExamItem = ({ item, index }) => (
//   //   <View style={[styles.tableRow, index % 2 === 0 && { backgroundColor: "#EFE7FD" }]}>
//   //     <Text style={styles.tableCell}>{item.sub_name}</Text>
//   //     <Text style={styles.tableCell}>{item.exam_session}</Text>
//   //     <Text style={styles.tableCell}>{item.exam_date}</Text>
//   //   </View>
//   // );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{flex:1,backgroundColor:'#7c43bd',marginBottom:-30}}>
//       <View  style={styles.container}>

//       {/* Header */}
//       <View style={styles.headerBox}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.progressText}>Examinations</Text>

//       </View>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom:100}}
//           // bounces={true}
//         >
//       <View style={styles.profileCard}>
//         <Text style={styles.studentName}>{studentData.stud_name?.toUpperCase()}</Text>
//         <Text style={styles.classText}>Class: {studentData.std_name} {studentData.section} | Roll No: {studentData.rollNo}</Text>
//       </View>
//       {/* Dropdown Examination Select */}
//       <View style={styles.dropdownBox}>



//         {/* <View>
//           <TouchableOpacity style={styles.dropdown}
//             onPress={() => setShowExam(!showExam)}>
//              <MaterialIcons name="format-list-bulleted-add" size={25} style={{color:'#fff',top:25}} />
//             <Text style={styles.dropdownText1}>     {selectedExam || 'selectedExam'}</Text>
//             <MaterialIcons
//               name={showExam ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//               size={30}
//               style={{ color: '#f7f7f7ff', marginLeft: 'auto', bottom: 18 }}
//             />
//           </TouchableOpacity>

//           {showExam && (
//             <View style={styles.dropdownList}>
//               <View style={{borderBottomWidth:1,width:"95%",marginLeft:8,bottom:30}}>
//                 <MaterialIcons name="search" size={25} style={{color:'#000000ff',top:38}} />
//               <TextInput 
//                style={styles.input}
//                placeholder='Select Exam' 
//                placeholderTextColor={'black'}
//                 value={searchText}
//                   onChangeText={setSearchText} 
//                >
//               </TextInput>
//               </View>

//               {filteredExams.length > 0 ? (
//               filteredExams.map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => {
//                     setSelectedExam(item);
//                     setShowExam(false);
//                     setSearchText("");
//                   }}
//                   style={styles.dropdownItem}
//                 >
//                   <Text style={styles.dropdownText}>{item}</Text>
//                 </TouchableOpacity>
//               ))
//             ) :(
//                <Text
//                   style={{
//                     padding: 10,
//                     textAlign: "center",
//                     color: "gray",
//                   }}
//                 >
//                   No matches found
//                 </Text>
//             )}
//             </View>
//           )}
//         </View> */}

//         <View >
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             iconStyle={styles.iconStyle}
//             data={examList}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder="Select Examination Here"
//             searchPlaceholder="Search..."
//             value={selectedExam}
//             onChange={(item) => {
//               setSelectedExam(item.value);
//             }}

//           />
//         </View>

//       </View>

//       {/* Progress Report / Empty State */}
//       <View style={styles.cardArea}>
//         <View style={styles.cardHeader}>
//           <Icon name="person" size={24} color="#6c63ff" style={{ top: 10, right: 5 }} />
//           <Text style={styles.cardHeaderText}>Examination -Time Table</Text>
//         </View>
//         <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />

//         {examTable.length > 0 ? (
//           <View style={styles.tableContainer}>

//             <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', }}>
//               <Text style={{ flex: 2, fontFamily: fonts.ROBOTO_BOLD, marginLeft: 5 }}>Subject</Text>
//               <Text style={{ flex: 1.6, fontFamily: fonts.ROBOTO_BOLD, }}>Session</Text>
//               <Text style={{ flex: 1, fontFamily: fonts.ROBOTO_BOLD, left: 10 }}>Date</Text>

//             </View>

//             {examTable.map((item, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.starsRow, { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
//                 ]}
//               >

//                 <Text style={styles.cell}>{item.sub_name}</Text>
//                 <Text style={styles.cellCenter}>{item.exam_session}</Text>
//                 <Text style={styles.cellCenter1}>{item.exam_date}</Text>

//               </View>
//             ))}
//           </View>
//           // <FlatList
//           //   data={examTable}
//           //   keyExtractor={(item, index) => index.toString()}
//           //   renderItem={renderExamItem}
//           // />
//         ) : (
//           <View style={styles.noDataContainer}>
//             <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
//             <Text>Sorry! No data found.</Text>
//             <Text>(Note: Please Select Examination)</Text>
//           </View>
//         )}

//       </View>
//       </ScrollView>
//           </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },
//   headerBox: {
//     flexDirection: 'row', alignItems: 'center',
//     backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between',
//   },
//   cell: { flex: 2, fontSize: 14, color: "#000", padding: 2, fontFamily: fonts.ROBOTO_BOLD, },
//   cellCenter: { flex: 1, fontSize: 14, color: "#000", fontFamily: fonts.ROBOTO_BOLD, },
//   cellCenter1: { flex: 1.2, fontSize: 14, color: "#000", fontFamily: fonts.ROBOTO_BOLD, },
//   progressText: {
//     color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, right: 95
//   },
//   profileCard: {
//     backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
//     paddingVertical: 14,
//   },
//   starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 1, padding: 8 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   studentName: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontFamily: fonts.FONT_BOLD,
//     marginTop: 7,
//     letterSpacing: 0.5, textAlign: 'center'
//   },
//   tableContainer: { marginTop: 20, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, },
//   tableTitle: { fontSize: 15, fontWeight: "600", marginBottom: 10 },
//   tableRow: { flexDirection: "row", paddingVertical: 10 },
//   tableCell: { flex: 1, textAlign: "center", fontSize: 13 },
//   dropdown: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: "#999",
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   noDataContainer: { justifyContent: "center", alignItems: "center", padding: 20 },
//   classText: {
//     color: '#ffffffff',
//     fontSize: 13,
//     marginTop: 4, textAlign: 'center',
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   dropdownBox: {
//     paddingHorizontal: 16,
//     marginBottom: 14,
//     marginTop: 4,
//   },
//   dropdownButton: {
//     width: '100%',
//     backgroundColor: '#fde2fe',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#d0bfff',
//   },
//   input: {
//     marginLeft: 25, top: 5,
//     fontSize: 16,
//     color: '#222'
//   },
//   dropdownButtonText: {
//     color: '#6c63ff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   cardArea: {
//     marginHorizontal: 14,
//     backgroundColor: '#f3f2ff',
//     borderRadius: 10,
//     padding: 18,
//     marginTop: 5,
//     minHeight: 330,
//     borderWidth: 1,
//     borderColor: '#2626cdff',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10, bottom: 10
//   },
//   cardHeaderText: {
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 5, top: 12
//   },
//   emptyState: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 30,
//   },
//   emptyImage: {
//     width: 72,
//     height: 72,
//     marginBottom: 16,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     color: '#6c63ff',
//     fontWeight: 'bold',
//     marginBottom: 7,
//   },
//   emptyNote: {
//     fontSize: 13,
//     color: '#e25151',
//     fontWeight: '500',
//   },

//   dropdownList: {
//     backgroundColor: '#ffffffff',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginTop: 5,
//     paddingVertical: 5,
//     elevation: 3, // adds shadow on Android
//     zIndex: 1
//   },
//   dropdownItem: {
//     bottom: 15,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   // dropdown: {
//   //   backgroundColor: '#7c43bd',
//   //   borderRadius: 10,
//   //   padding: 8,
//   //   height: 45,
//   //   justifyContent: 'center',
//   // },
//   dropdownText: {
//     fontSize: 15,
//     color: '#000000ff',

//   },
//   dropdownText1: {
//     fontSize: 15,
//     color: '#fefefeff', left: 20, top: 3

//   },
// });

// export default ExamScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const BASE = 375;
const scale = (n: number) => Math.round((width / BASE) * n);
const sp = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.22);

interface ExamScreenProps {
  route: any;
  navigation: any;
}

interface ExamItem {
  sub_name: string;
  exam_session: string;
  exam_date: string;
}

const ExamScreen: React.FC<ExamScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [studentData, setStudentData] = useState<any>({});
  const [examList, setExamList] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [examTable, setExamTable] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch student profile data
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('mobile');
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      if (response.data.isSuccess && response.data.studDetails.length > 0) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log("Student data fetch error:", error);
    }
  };

  // Fetch exam list
  const getExams = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`
      );
      if (response.data.isSuccess && response.data.examList) {
        setExamList(
          response.data.examList.map((ex: any) => ({
            label: ex.exam_name,
            value: ex.examId,
          }))
        );
      }
    } catch (error) {
      console.log("Exam list fetch error:", error);
    }
  };

  // Fetch exam timetable for selected exam
  const getExamTable = async (examId: string | null) => {
    if (!examId) return;
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/examination_timetable_api?orgId=${orgid}&exam_Id=${examId}&studId=${studentId}&mobile_no=${mobile}`
      );

      if (response.data.isSuccess && response.data.examSchedule) {
        // Sort exam schedule by date in ascending order
        const sortedExamSchedule = response.data.examSchedule.sort((a: any, b: any) => {
          const dateA = new Date(a.exam_date.split('-').reverse().join('-'));
          const dateB = new Date(b.exam_date.split('-').reverse().join('-'));
          return dateA.getTime() - dateB.getTime();
        });

        setExamTable(sortedExamSchedule);
      } else {
        setExamTable([]);
      }
    } catch (error) {
      console.log("Exam table fetch error:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await getStudentData();
      await getExams();
      if (selectedExam) {
        await getExamTable(selectedExam);
      }
      setLoading(false);
    };
    loadData();
  }, [selectedExam]);

  if (loading && !studentData.stud_name) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#7c43bd" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const ProfileCard = () => (
    <View style={styles.profileCard}>

      <Text style={styles.studentName}>{studentData.stud_name || '—'}</Text>
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Icon name="group" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Class: {studentData.std_name} {studentData.section}</Text>
        </View>
        <View style={styles.badgeDot} />
        <View style={styles.badge}>
          <Icon name="format-list-numbered" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Roll: {studentData.rollNo}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={"#6A1B9A"} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBox}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-back" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Examinations</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={{ padding: sp(14) }}>
            <ProfileCard />
          </View>
          {/* <View style={styles.profileCard}>
            <Text style={styles.studentName}>
              {studentData.stud_name?.toUpperCase() || "STUDENT NAME"}
            </Text>
            <Text style={styles.classText}>
              Class: {studentData.std_name || "-"} {studentData.section || ""} | Roll No:{" "}
              {studentData.rollNo || "-"}
            </Text>
          </View> */}

          {/* Dropdown Examination Select */}
          <View style={styles.dropdownBox}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.dropdownContainer}
              data={examList}
              search
              maxHeight={hp('35%')}
              labelField="label"
              valueField="value"
              placeholder="Select Examination Here"
              searchPlaceholder="Search..."
              value={selectedExam}
              onChange={(item) => {
                setSelectedExam(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  name="format-list-bulleted"
                  size={wp('5%')}
                  color="#666"
                  style={styles.dropdownIcon}
                />
              )}
            />
          </View>

          {/* Examination Time Table Card */}
          <View style={styles.cardArea}>
            <View style={styles.cardHeader}>
              <Icon name="event-note" size={wp('6%')} color="#6c63ff" />
              <Text style={styles.cardHeaderText}>Examination - Time Table</Text>
            </View>
            <Divider style={styles.divider} />

            {examTable.length > 0 ? (
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.headerCell, styles.subjectColumn]}>Subject</Text>
                  <Text style={[styles.headerCell, styles.sessionColumn]}>Session</Text>
                  <Text style={[styles.headerCell, styles.dateColumn]}>Date</Text>
                </View>

                {/* Table Rows */}
                {examTable.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
                    ]}
                  >
                    <Text
                      style={[styles.tableCell, styles.subjectColumn]}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.sub_name}
                    </Text>
                    <Text style={[styles.tableCell, styles.sessionColumn]}>
                      {item.exam_session}
                    </Text>
                    <Text style={[styles.tableCell, styles.dateColumn]}>
                      {item.exam_date}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Image
                  source={require('../assest/smile-No-Data-Found-BG.png')}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
                <Text style={styles.noDataText}>Sorry! No data found.</Text>
                <Text style={styles.noteText}>(Note: Please Select Examination)</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6A1B9A',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#666',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  scrollContent: {
    paddingBottom: hp('20%'),
    // padding: sp(14)
  },

  // Header Styles
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6A1B9A',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  backButton: {
    padding: wp('2%'),
  },
  headerText: {
    color: '#fff',
    fontSize: wp('5.5%'),
    fontFamily: fonts.FONT_BOLD,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: wp('10%'),
  },

  // Profile Card Styles
  // profileCard: {
  //   backgroundColor: '#7c43bd',
  //   marginHorizontal: wp('4%'),
  //   marginTop: hp('2%'),
  //   borderRadius: 12,
  //   paddingVertical: hp('2%'),
  //   paddingHorizontal: wp('4%'),
  //   elevation: 3,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.15,
  //   shadowRadius: 3,
  // },
  // studentName: {
  //   color: '#fff',
  //   fontSize: wp('4.5%'),
  //   fontFamily: fonts.FONT_BOLD,
  //   textAlign: 'center',
  //   letterSpacing: 0.5,
  // },
  classText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
    textAlign: 'center',
    fontFamily: fonts.ROBOTO_BOLD,
  },

  profileCard: {
    backgroundColor: "#6A1B9A",
    borderRadius: sp(20),
    paddingVertical: sp(20),
    paddingHorizontal: sp(16),
    alignItems: 'center',
    marginBottom: sp(14),
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  avatar: {
    width: sp(56),
    height: sp(56),
    borderRadius: sp(28),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sp(9),
  },
  avatarLetter: {
    fontSize: sp(26),
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
  },
  studentName: {
    color: '#fff',
    fontSize: sp(17),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
    textAlign: 'center',
    marginBottom: sp(7),
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: sp(6),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: sp(20),
    paddingHorizontal: sp(10),
    paddingVertical: sp(4),
    gap: sp(4),
  },
  badgeText: {
    color: '#ffffff',
    fontSize: sp(12),
    fontFamily: fonts.FONT_MEDIUM,
  },
  badgeDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // Dropdown Styles
  dropdownBox: {
    paddingHorizontal: wp('4%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  dropdown: {
    height: hp('6.5%'),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  dropdownIcon: {
    marginRight: wp('2%'),
  },
  placeholderStyle: {
    fontSize: wp('3.8%'),
    color: "#999",
    fontFamily: fonts.ROBOTO_BOLD,
  },
  selectedTextStyle: {
    fontSize: wp('3.8%'),
    color: "#000",
    fontFamily: fonts.ROBOTO_BOLD,
  },
  inputSearchStyle: {
    height: hp('5%'),
    fontSize: wp('3.8%'),
    borderRadius: 8,
  },
  iconStyle: {
    width: wp('5%'),
    height: wp('5%'),
  },

  // Card Area Styles
  cardArea: {
    marginHorizontal: wp('4%'),
    backgroundColor: '#f3f2ff',
    borderRadius: 12,
    padding: wp('4%'),
    marginTop: hp('1%'),
    minHeight: hp('45%'),
    borderWidth: 1,
    borderColor: '#d0bfff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  cardHeaderText: {
    fontFamily: fonts.FONT_BOLD,
    fontSize: wp('4.2%'),
    color: '#333',
    marginLeft: wp('2%'),
  },
  divider: {
    backgroundColor: '#d0bfff',
    height: 1,
    marginVertical: hp('1%'),
  },

  // Table Styles
  tableContainer: {
    marginTop: hp('2%'),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#d6e0f0',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },

  // Column Styles
  subjectColumn: {
    flex: 2,
    paddingRight: wp('2%'),
  },
  sessionColumn: {
    flex: 1.3,
    textAlign: 'center',
  },
  dateColumn: {
    flex: 1.2,
    textAlign: 'center',
  },

  // Cell Styles
  headerCell: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: wp('3.8%'),
    color: '#333',
  },
  tableCell: {
    fontSize: wp('3.5%'),
    fontFamily: fonts.ROBOTO_BOLD,
    color: '#000',
  },

  // No Data Styles
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp('6%'),
  },
  emptyImage: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('2%'),
  },
  noDataText: {
    fontSize: wp('4%'),
    color: '#666',
    fontFamily: fonts.ROBOTO_BOLD,
    marginBottom: hp('0.5%'),
  },
  noteText: {
    fontSize: wp('3.5%'),
    color: '#e25151',
    fontFamily: fonts.ROBOTO_BOLD,
  },
});

export default ExamScreen;