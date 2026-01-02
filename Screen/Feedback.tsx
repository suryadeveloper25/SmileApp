
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  // ScrollView,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-dynamic-vector-icons";
import { Divider } from "react-native-paper";
import { fonts } from "../root/config";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
interface FeedbackScreenProps {
  route: any
  navigation: any
}
const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {}

  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  const [feedbackList, setFeedbackList] = useState([]);
  // const [student, setStudent] = useState({});
  const [staffId, setStaffId] = useState("");
  const [isData, setIsData] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  // 🔹 Fetch student data
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const isLoggedIn = await AsyncStorage.getItem("isloggedIn");

      const st_orgId = orgid;
      const st_id = studentId;
      const st_mobile = mobileNo;

      const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${st_id}&mobile_no=${st_mobile}`;

      const response = await axios.post(url);
      const body = response.data;

      if (body.isSuccess && body.studDetails) {
        const details = body.studDetails[0];
        const formattedData = {
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          photoUrl: details.photo_url,
          roll: details.rollNo,
          dob: details.dob,
          blood: details.blood_group,
          gender: details.gender,
          father: details.father_name,
          mother: details.mother_name,
          medium: details.medium,
          email: details.email_Id,
          staffId: details.staff_id,
        };

        setStudentData(formattedData);
        setStaffId(details.staff_id);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // 🔹 Fetch feedback list

  const getFeedbackList = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");

      const url = `https://www.vtsmile.in/app/api/students/students_feedback_list?orgId=${orgid}&studId=${studentId}&mobile_no=${mobileNo}&staff_Id=${staffId}`;

      const response = await axios.post(url);
      const body = response.data;

      if (body.isSuccess && Array.isArray(body.feedbackdetails)) {

        // 🔥 Safely sort by date (DESC — latest first)
        const sortedList = body.feedbackdetails.sort((a, b) => {
          return parseDate(b.feedbackDate) - parseDate(a.feedbackDate);
        });

        setFeedbackList(sortedList);
        setIsData(true);

      } else {
        setIsData(false);
      }

    } catch (error) {
      console.error("Error fetching feedback list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert DD-MM-YYYY → Date
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split("-");
    if (parts.length !== 3) return new Date(dateStr);

    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  };



  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      await getStudentData();
      setIsLoading(false);
    };
    fetchAll();
  }, []);

  // Fetch feedback list after staff ID is ready
  useFocusEffect(
    useCallback(() => {
      if (staffId) {
        getFeedbackList();   // <-- Refresh feedback every time screen reopens

      }
    }, [staffId])
  );



  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="list" size={24} color="#1f1818ff" />
        <Text style={styles.title}>{item.feedbackTitle}</Text>
      </View>

      <View style={styles.divider} />
      <Text style={styles.desc}>{item.feedbackdescription}</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <MaterialIcons name="calendar-month" size={14} color="#3d3b3bff" style={{ top: 8 }} />
        {/* <Image source={require('../assest/icons8-clock-48.png')} style={{width:25,height:25,top:5}} /> */}
        <Text style={styles.date}>{item.feedbackDate}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
      
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color="#fff" style={styles.backBtn} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Feedback</Text>
        </View>

        <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => setCollapsed(!collapsed)}
            style={styles.accordionHeader}
          >
            <Icon name="list" size={24} color="#514848ff" />
            <Text style={styles.listTitle}>List of your feedbacks ({feedbackList?.length || 0})</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#514848ff" />

            {/* <Text style={{ fontSize: 18 }}>{collapsed ? "▲" : "▼"}</Text> */}

          </TouchableOpacity>

          <Divider style={{ backgroundColor: '#b6b5b5ff', height: 1, marginHorizontal: -1, marginTop: 6,top:5 }} />
  
      {/* {!collapsed && ( */}
  <FlatList
    data={feedbackList}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    contentContainerStyle={{
      paddingBottom: 80,
      marginTop: 10,
      flexGrow: feedbackList.length === 0 ? 1 : 0,
    }}
    ListEmptyComponent={
      <View style={styles.emptyBox}>
        <Image
          source={require('../assest/smile-No-Data-Found-BG.png')}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>You have no feedbacks</Text>
      </View>
    }
  />
{/* )} */}
        </View>
      
      

      </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            navigation.navigate("FeedbackNewScreen", {
              orgid,
              studentId,
              mobile,
            })
          }
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },
  // header: {
  //   backgroundColor: "#7852b1",
  //   paddingVertical: 40,
  //   borderBottomRightRadius: 40,
  //   borderBottomLeftRadius: 40,
  //   alignItems: "center",
  // },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
  },
  backBtn: { marginLeft: 10, },
  listContainer: {
    maxHeight: '80%',
    marginTop: 20,
    width: '95%', 
    paddingVertical: 5,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    // borderTopLeftRadius:10,
    // borderTopRightRadius:10,
    borderRadius: 10,
    backgroundColor: '#e3f3ff',
  },
  listTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 16, right: 40
  },
  headerBox: {
    flexDirection: 'row',
    backgroundColor: '#7c43bd', padding: 16,
  },
  headerText: {
    color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, marginLeft: 80,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
 
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.FONT_BOLD,
    color: "#3c58e8", marginLeft: 10
  },
  desc: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    lineHeight: 20,
    fontFamily: fonts.ROBOTO_BOLD
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ec6337",
    marginVertical: 6,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#777", marginLeft: 10,
    fontFamily: fonts.FONT_BOLD
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#7852b1",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  fabText: {
    color: "#fbdc5b",
    fontSize: 30,
    fontWeight: "600",
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
     paddingVertical: 50,
  },
   emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  emptyText: {
    color: "#333",
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.FONT_BOLD
  },
});


// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   // ScrollView,
//   Image,
//   ActivityIndicator,
//   ScrollView,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import Octicons from "react-native-dynamic-vector-icons";
// import { Divider } from "react-native-paper";
// import { fonts } from "../root/config";
// import { useFocusEffect } from "@react-navigation/native";
// import MaterialIcons from "@react-native-vector-icons/material-icons";
// interface FeedbackScreenProps {
//   route: any
//   navigation: any
// }
// const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {}

//   const [isLoading, setIsLoading] = useState(true);
//   const [studentData, setStudentData] = useState<any>(null);
//   const [feedbackList, setFeedbackList] = useState([]);
//   // const [student, setStudent] = useState({});
//   const [staffId, setStaffId] = useState("");
//   const [isData, setIsData] = useState(false);
//   const [collapsed, setCollapsed] = useState(true);
//   // 🔹 Fetch student data
//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const isLoggedIn = await AsyncStorage.getItem("isloggedIn");

//       const st_orgId = orgid;
//       const st_id = studentId;
//       const st_mobile = mobileNo;

//       const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${st_orgId}&studeId=${st_id}&mobile_no=${st_mobile}`;
//       console.log('url==>', url)
//       const response = await axios.post(url);
//       const body = response.data;

//       if (body.isSuccess && body.studDetails) {
//         const details = body.studDetails[0];
//         const formattedData = {
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           photoUrl: details.photo_url,
//           roll: details.rollNo,
//           dob: details.dob,
//           blood: details.blood_group,
//           gender: details.gender,
//           father: details.father_name,
//           mother: details.mother_name,
//           medium: details.medium,
//           email: details.email_Id,
//           staffId: details.staff_id,
//         };

//         setStudentData(formattedData);
//         setStaffId(details.staff_id);
//       }
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//     }
//   };

//   // 🔹 Fetch feedback list

//   const getFeedbackList = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");

//       const url = `https://www.vtsmile.in/app/api/students/students_feedback_list?orgId=${orgid}&studId=${studentId}&mobile_no=${mobileNo}&staff_Id=${staffId}`;

//       const response = await axios.post(url);
//       const body = response.data;

//       if (body.isSuccess && Array.isArray(body.feedbackdetails)) {

//         // 🔥 Safely sort by date (DESC — latest first)
//         const sortedList = body.feedbackdetails.sort((a, b) => {
//           return parseDate(b.feedbackDate) - parseDate(a.feedbackDate);
//         });

//         setFeedbackList(sortedList);
//         setIsData(true);

//       } else {
//         setIsData(false);
//       }

//     } catch (error) {
//       console.error("Error fetching feedback list:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to convert DD-MM-YYYY → Date
//   const parseDate = (dateStr) => {
//     if (!dateStr) return new Date(0);
//     const parts = dateStr.split("-");
//     if (parts.length !== 3) return new Date(dateStr);

//     const [day, month, year] = parts;
//     return new Date(`${year}-${month}-${day}`);
//   };


//   // const getFeedbackList = async () => {
//   //   try {
//   //     const mobileNo = await AsyncStorage.getItem("mobile");

//   //     const url = `https://www.vtsmile.in/app/api/students/students_feedback_list?orgId=${orgid}&studId=${studentId}&mobile_no=${mobileNo}&staff_Id=${staffId}`;

//   //     const response = await axios.post(url);
//   //     const body = response.data;

//   //     if (body.isSuccess && Array.isArray(body.feedbackdetails)) {

//   //       // 🔥 Sort newest first (descending)
//   //       const sortedList = body.feedbackdetails.sort(
//   //         (a, b) => new Date(b.feedbackDate) - new Date(a.feedbackDate)
//   //       );

//   //       setFeedbackList(sortedList);
//   //       setIsData(true);

//   //     } else {
//   //       setIsData(false);
//   //     }

//   //   } catch (error) {
//   //     console.error("Error fetching feedback list:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const getFeedbackList = async () => {
//   //   try {
//   //     const mobileNo = await AsyncStorage.getItem("mobile");

//   //     const st_orgId = orgid;
//   //     const st_id = studentId;
//   //     const st_mobile = mobileNo;

//   //     const url = `https://www.vtsmile.in/app/api/students/students_feedback_list?orgId=${st_orgId}&studId=${st_id}&mobile_no=${st_mobile}&staff_Id=${staffId}`;

//   //     const response = await axios.post(url);
//   //     const body = response.data;

//   //     if (body.isSuccess && body.feedbackdetails) {
//   //       setFeedbackList(body.feedbackdetails);
//   //       setIsData(true);
//   //     } else {
//   //       setIsData(false);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching feedback list:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     const fetchAll = async () => {
//       setIsLoading(true);
//       await getStudentData();
//       setIsLoading(false);
//     };
//     fetchAll();
//   }, []);

//   // Fetch feedback list after staff ID is ready
//   useFocusEffect(
//     useCallback(() => {
//       if (staffId) {
//         getFeedbackList();   // <-- Refresh feedback every time screen reopens

//       }
//     }, [staffId])
//   );



//   if (isLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={{ flexDirection: 'row' }}>
//         <Icon name="list" size={24} color="#1f1818ff" />
//         <Text style={styles.title}>{item.feedbackTitle}</Text>
//       </View>

//       <View style={styles.divider} />
//       <Text style={styles.desc}>{item.feedbackdescription}</Text>
//       <View style={{ flexDirection: 'row', marginTop: 10 }}>
//         <MaterialIcons name="calendar-month" size={14} color="#3d3b3bff" style={{ top: 8 }} />
//         {/* <Image source={require('../assest/icons8-clock-48.png')} style={{width:25,height:25,top:5}} /> */}
//         <Text style={styles.date}>{item.feedbackDate}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         {/* Header */}
//         <View style={styles.headerBox}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={25} color="#fff" style={styles.backBtn} />
//           </TouchableOpacity>

//           <Text style={styles.headerText}>Feedback</Text>
//         </View>

//         <View style={styles.listContainer}>
//           <TouchableOpacity
//             onPress={() => setCollapsed(!collapsed)}
//             style={styles.accordionHeader}
//           >
//             <Icon name="person" size={24} color="#514848ff" />
//             <Text style={styles.listTitle}>List of your feedbacks ({feedbackList?.length || 0})</Text>
//             <Icon name="keyboard-arrow-down" size={24} color="#514848ff" />

//             {/* <Text style={{ fontSize: 18 }}>{collapsed ? "▲" : "▼"}</Text> */}

//           </TouchableOpacity>

//           <Divider style={{ backgroundColor: '#b6b5b5ff', height: 1, marginHorizontal: -1, marginTop: 5 }} />
//           {/* Content */}
//           {isLoading ? (
//             <ActivityIndicator
//               size="large"
//               color="#7852b1"
//               style={{ marginTop: 40 }}
//             />
//           ) : feedbackList.length > 0 ? (
//             <View style={{ padding: 1, bottom: 10, height: 500 }}>
//               <ScrollView>
//                 <FlatList
//                   data={feedbackList}
//                   keyExtractor={(item, index) => index.toString()}
//                   renderItem={renderItem}
//                   style={{ width: '100%' }}
//                   contentContainerStyle={{ paddingBottom: 80, marginTop: 20 }}
//                 />
//               </ScrollView>
//             </View>

//           ) : (
//             <View style={styles.emptyBox}>
//               {/* <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
//           <Text style={styles.emptyText}>You have no feedbacks</Text> */}
//             </View>
//           )}
//         </View>
//         {/* Floating button */}
//         <TouchableOpacity
//           style={styles.fab}
//           onPress={() =>
//             navigation.navigate("FeedbackNewScreen", {
//               orgid,
//               studentId,
//               mobile,
//             })
//           }
//         >
//           <Text style={styles.fabText}>+</Text>
//         </TouchableOpacity>

//       </View>
//     </SafeAreaView>
//   );
// };

// export default FeedbackScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },
//   // header: {
//   //   backgroundColor: "#7852b1",
//   //   paddingVertical: 40,
//   //   borderBottomRightRadius: 40,
//   //   borderBottomLeftRadius: 40,
//   //   alignItems: "center",
//   // },
//   accordionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 5,
//     alignItems: "center",
//   },
//   backBtn: { marginLeft: 10, },
//   listContainer: {
//     maxHeight: '95%',
//     marginTop: 20,
//     width: '95%', paddingVertical: 5,
//     marginHorizontal: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     backgroundColor: '#e3f3ff',
//   },
//   listTitle: {
//     fontFamily: fonts.ROBOTO_BOLD,
//     fontSize: 16, right: 40
//   },
//   headerBox: {
//     flexDirection: 'row',
//     backgroundColor: '#7c43bd', padding: 16,
//   },
//   headerText: {
//     color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, marginLeft: 80,
//   },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   emptyImage: {
//     width: 72,
//     height: 72,
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 15,
//     marginVertical: 8,
//     borderRadius: 10,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.15,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 15,
//     fontFamily: fonts.FONT_BOLD,
//     color: "#3c58e8", marginLeft: 10
//   },
//   desc: {
//     fontSize: 14,
//     color: "#444",
//     marginTop: 8,
//     lineHeight: 20,
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ec6337",
//     marginVertical: 6,
//   },
//   date: {
//     marginTop: 8,
//     fontSize: 12,
//     color: "#777", marginLeft: 10,
//     fontFamily: fonts.FONT_BOLD
//   },
//   fab: {
//     position: "absolute",
//     bottom: -120,
//     right: 20,
//     backgroundColor: "#7852b1",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 6,
//   },
//   fabText: {
//     color: "#fbdc5b",
//     fontSize: 30,
//     fontWeight: "600",
//   },
//   emptyBox: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyText: {
//     color: "#333",
//     fontSize: 14,
//     marginTop: 8,
//     fontFamily: fonts.FONT_BOLD
//   },
// });

