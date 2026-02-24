

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  // Image,
  // FlatList,
  // Dimensions,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Collapsible from "react-native-collapsible";
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');
const BASE = 375;
const scale = (n: number) => Math.round((width / BASE) * n);
const sp = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.22);

interface MyclassScreenProps {
  route: any;
  navigation: any
}

interface Student {
  stud_name: string;
  rollNo: string;
}

const MyclassScreen: React.FC<MyclassScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [student, setStudent] = useState<any>({});
  const [classList, setClassList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      if (response.data.isSuccess && response.data.studDetails?.length > 0) {
        setStudent(response.data.studDetails[0]);
      }
    } catch (error) {
      console.error("Student fetch error:", error);
    }
  };

  const getMyClassList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/my_class_student_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );
      if (response.data.isSuccess && response.data.myClassList) {
        // Sort by grade descending
        const sortedList = response.data.myClassList.sort((a: any, b: any) => {
          const gradeA = parseFloat(a.grade) || 0;
          const gradeB = parseFloat(b.grade) || 0;
          return gradeB - gradeA; // Descending order
        });
        setClassList(sortedList);
      }
    } catch (error) {
      console.error("Class list fetch error:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await getStudentData();
      await getMyClassList();
      setTimeout(() => setLoading(false), 1000);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#7954B4" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  const ProfileCard = () => (
    <View style={styles.profileCard}>

      <Text style={styles.studentName}>{student.stud_name || '—'}</Text>
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Icon name="group" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Class: {student.std_name} {student.section}</Text>
        </View>
        <View style={styles.badgeDot} />
        <View style={styles.badge}>
          <Icon name="format-list-numbered" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Roll: {student.rollNo}</Text>
        </View>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6A1B9A', marginBottom: -30 }}>

      <View style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.progressText}>My Class</Text>

        </View>
        <View style={{ padding: sp(14) }}>
          <ProfileCard />
        </View>
        {/* <View style={styles.header}>
          
             <TouchableOpacity onPress={()=> navigation.navigate('Home')}  style={styles.backBtn}>
                      <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
          <Text style={styles.headerText}>My Class</Text>
        </View> */}
        {/* <View style={styles.profileBox}>

          <Text style={styles.profileName}>  {student.stud_name?.toUpperCase() || "Student Name"}</Text>
          <Text style={styles.classInfo}>    Class: {student.std_name || "-"} {student.section || ""}   Roll No: {student.rollNo || "-"}</Text>
        </View> */}

        <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => setCollapsed(!collapsed)}
            style={styles.accordionHeader}
          >
            <Icon name="person" size={24} color="#514848ff" />
            <Text style={styles.listTitle}>My Class Students - List</Text>
            {!collapsed ?
              <Icon name="keyboard-arrow-down" size={24} color="#514848ff" />
              :
              <Icon name="keyboard-arrow-up" size={24} color="#514848ff" />
            }

          </TouchableOpacity>

          <Collapsible collapsed={collapsed}>
            <Divider style={{ backgroundColor: '#b6b5b5ff', height: 1, marginHorizontal: -1, marginTop: 5 }} />
            {classList.length > 0 ? (
              <View style={{ padding: 10, bottom: 10, height: 500 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}
                  showsVerticalScrollIndicator={false}>

                  <FlatList
                    data={classList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          styles.row,
                          { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff", paddingHorizontal: 1 },
                        ]}
                      >
                        <Text style={styles.cell}>{index + 1}</Text>
                        <Text style={[styles.cell2, { flex: 1 }]}>{item.stud_name}</Text>
                        <Text style={styles.cell3}>{item.grade}</Text>
                      </View>
                    )}
                    ListHeaderComponent={() => (
                      <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>No.</Text>
                        <Text style={[styles.headerCell1, { flex: 2 }]}>Name</Text>
                        <Text style={styles.headerCell3}>Grade</Text>
                      </View>
                    )}
                  />
                </ScrollView>
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
                <Text style={styles.noDataText}>Sorry!, No data found!</Text>
              </View>
            )}
          </Collapsible>

        </View>
      </View>
    </SafeAreaView>
  );
}
export default MyclassScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  header: {
    backgroundColor: '#6A1B9A',
    paddingHorizontal: 20,

  },
  backBtn: { top: 25, marginLeft: 10, },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    fontFamily: fonts.FONT_BOLD,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    paddingHorizontal: 1, marginTop: 20
  },
  profileBox: {
    backgroundColor: '#6A1B9A',
    padding: 15, width: '95%', marginLeft: 10,
    borderRadius: 10, marginTop: 20,
    alignItems: 'center',
  },
  headerBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#6A1B9A', padding: 16, justifyContent: 'space-between',
  },
  progressText: {
    color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, right: wp('33%')
  },
  emptyImage: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  noDataText: {
    marginTop: 10,
    fontSize: 13.5,
    color: "#000",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
  },
  stars: {
    fontSize: 18,
    marginBottom: 5,
  },
  profileName: {
    fontFamily: fonts.FONT_BOLD,
    fontSize: 16,
    color: '#fff',
  },
  classInfo: {
    color: '#eee',
    fontSize: 14,
    marginTop: 5,
    fontFamily: fonts.ROBOTO_BOLD
  },
  listContainer: {
    maxHeight: '75%',
    marginTop: 5,
    width: '95%', paddingVertical: 5,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#e3f3ff',
  },
  listTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 16, right: 40
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d6e0f0',
    paddingVertical: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'center',
    right: 20,
    // marginLeft:1

  },
  headerCell1: {
    flex: 1,
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'center',
    right: 30
  },
  headerCell2: {
    flex: 1,
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'center',
    right: 5
  },
  headerCell3: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    right: 5
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
  row: {
    flexDirection: 'row',
    backgroundColor: '#f4f0ff',
    paddingVertical: 10, paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    left: 15, fontSize: 12, fontFamily: fonts.ROBOTO_BOLD
  },
  cell1: {
    flex: 1, fontSize: 12, right: 40, fontFamily: fonts.ROBOTO_BOLD
  },
  cell2: {
    fontSize: 12, marginLeft: -30, right: 80, fontFamily: fonts.ROBOTO_BOLD
  },
  cell3: {
    fontSize: 12, right: 40, fontFamily: fonts.ROBOTO_BOLD
  },

});


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   FlatList,
//   Dimensions,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import Collapsible from "react-native-collapsible";
// import LinearGradient from "react-native-linear-gradient";

// interface MyclassScreenProps {
//   route: any;
// }

// interface Student {
//   stud_name: string;
//   rollNo: string;
// }

// const MyclassScreen: React.FC<MyclassScreenProps> = ({ route }) => {
//    const { orgid, studentId, mobile } = route?.params || {};
//   const [student, setStudent] = useState<any>({});
//   const [classList, setClassList] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [collapsed, setCollapsed] = useState(false);

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );
//       if (response.data.isSuccess && response.data.studDetails?.length > 0) {
//         setStudent(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.error("Student fetch error:", error);
//     }
//   };

//   const getMyClassList = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/my_class_student_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
//       );
//       if (response.data.isSuccess && response.data.myClassList) {
//         setClassList(response.data.myClassList);
//       }
//     } catch (error) {
//       console.error("Class list fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await getStudentData();
//       await getMyClassList();
//       setTimeout(() => setLoading(false), 1000);
//     };
//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#7954B4" />
//         <Text style={{ marginTop: 10 }}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={["#7852B1", "#7852B1"]}
//         style={styles.headerContainer}
//       >
//         <View style={styles.profileBox}>
//           <Text style={styles.studentName}>
//             {student.stud_name?.toUpperCase() || "Student Name"}
//           </Text>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoText}>
//               Class: {student.std_name || "-"} {student.section || ""}
//             </Text>
//             <Text style={styles.infoText}>Roll No: {student.rollNo || "-"}</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Accordion */}
//       <View style={styles.accordionContainer}>
//         <TouchableOpacity
//           onPress={() => setCollapsed(!collapsed)}
//           style={styles.accordionHeader}
//         >
//           <Text style={styles.accordionTitle}>My Class Students - List</Text>
//           <Text style={{ fontSize: 18 }}>{collapsed ? "▲" : "▼"}</Text>
//         </TouchableOpacity>

//         <Collapsible collapsed={collapsed}>
//         {console.log(classList,'classlistttttt')}
//           {classList.length > 0 ? (
//             <FlatList
//               data={classList}
//               keyExtractor={(_, index) => index.toString()}
//               renderItem={({ item, index }) => (
//                 <View
//                   style={[
//                     styles.row,
//                     { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
//                   ]}
//                 >
//                   <Text style={styles.cell}>{index + 1}</Text>
//                   <Text style={[styles.cell, { flex: 2 }]}>{item.stud_name}</Text>
//                   <Text style={styles.cell}>{item.rollNo}</Text>
//                 </View>
//               )}
//               ListHeaderComponent={() => (
//                 <View style={styles.headerRow}>
//                   <Text style={styles.headerCell}>No.</Text>
//                   <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
//                   <Text style={styles.headerCell}>Roll No.</Text>
//                 </View>
//               )}
//             />
//           ) : (
//             <View style={styles.noDataContainer}>
//               {/* <Image
//                 source={require("../assets/images/smile-No-Data-Found-BG.png")}
//                 style={{ width: 100, height: 100 }}
//                 resizeMode="contain"
//               /> */}
//               <Text style={styles.noDataText}>Sorry!, No data found!</Text>
//             </View>
//           )}
//         </Collapsible>
//       </View>
//     </ScrollView>
//   );
// };

// export default MyclassScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   centered: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerContainer: {
//     height: Dimensions.get("window").height / 3.5,
//     borderBottomLeftRadius: 32,
//     borderBottomRightRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileBox: {
//     backgroundColor: "#886BB6",
//     borderRadius: 12,
//     paddingVertical: 8,
//     paddingHorizontal: 24,
//     alignItems: "center",
//   },
//   studentName: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
//   infoRow: {
//     flexDirection: "row",
//     marginTop: 4,
//     gap: 16,
//   },
//   infoText: {
//     color: "#fff",
//     fontSize: 13,
//   },
//   accordionContainer: {
//     marginHorizontal: 10,
//     marginTop: 16,
//     borderWidth: 1,
//     borderColor: "#B00",
//     borderRadius: 6,
//     backgroundColor: "#D7F0F6",
//   },
//   accordionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 12,
//     alignItems: "center",
//   },
//   accordionTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#000",
//   },
//   row: {
//     flexDirection: "row",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderBottomWidth: 0.5,
//     borderColor: "#eee",
//   },
//   headerRow: {
//     flexDirection: "row",
//     backgroundColor: "#F8F8F8",
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
//   cell: {
//     flex: 1,
//     color: "#000",
//     fontSize: 13,
//   },
//   headerCell: {
//     flex: 1,
//     fontWeight: "700",
//     fontSize: 13,
//   },
//   noDataContainer: {
//     alignItems: "center",
//     paddingVertical: 30,
//   },
//   noDataText: {
//     marginTop: 10,
//     fontSize: 13.5,
//     color: "#000",
//   },
// });
