

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  // ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Image,
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

  return (
    <SafeAreaView style={{ flex: 1, }}>

      <View style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.progressText}>My Class</Text>

        </View>
        {/* <View style={styles.header}>
          
             <TouchableOpacity onPress={()=> navigation.navigate('Home')}  style={styles.backBtn}>
                      <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
          <Text style={styles.headerText}>My Class</Text>
        </View> */}
        <View style={styles.profileBox}>

          <Text style={styles.profileName}>  {student.stud_name?.toUpperCase() || "Student Name"}</Text>
          <Text style={styles.classInfo}>    Class: {student.std_name || "-"} {student.section || ""}   Roll No: {student.rollNo || "-"}</Text>
        </View>

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
                <ScrollView>

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
    backgroundColor: '#7c43bd',
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
    backgroundColor: '#7c43bd',
    padding: 15, width: '95%', marginLeft: 10,
    borderRadius: 10, marginTop: 20,
    alignItems: 'center',
  },
  headerBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between',
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
    marginTop: 20,
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
