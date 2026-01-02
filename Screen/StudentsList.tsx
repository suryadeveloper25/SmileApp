// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ScrollView, Modal,  TouchableWithoutFeedback,
//   Linking,
//   // ActivityIndicator,
//   Alert,
//   Dimensions,  FlatList,
//   ActivityIndicator,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// // import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { Divider } from "react-native-paper";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// const { width } = Dimensions.get('window');

// // type StudentsListScreenProps = {
// //   route: {
// //     params: {
// //       orgid: string;
// //       orgName: string;
// //       studentId: string;
// //       orgCity: string;
// //     };
// //   };
// // };
//  type StudentsListScreenProps = {
//    route: any
//    navigation: any;
// };

// const StudentsListScreen = ({ route, navigation }: StudentsListScreenProps) => {
//    const {
//     orgid,
//     orgName,
//     studentId,
//     orgCity,
//   } = route.params;
//   console.log(route.params,'routrrrrrr')

//   const [modalVisible, setModalVisible] = useState(false);

//   const [studentsList, setStudentsList] = useState([]);
//   const [insName, setInsName] = useState('');
//   const [insContact, setInsContact] = useState('');
//   const [insMail, setInsMail] = useState('');
//   const [insWeb, setInsWeb] = useState('');
//   const [insLogo, setInsLogo] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [loading, setLoading] = useState(true);

//    // Fetch students list
//   const fetchStudentsList = async () => {
//     try {
//       const loggedIn = await AsyncStorage.getItem('isloggedIn');
//       const mobile = await AsyncStorage.getItem('mobile');
//       setMobileNo(mobile || '');

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/institute_student_list?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobile}`
//       );
//       console.log(response,'res----------------12345')

//       if (response.data.isSuccess && response.data.studList) {
//         console.log('response.data.isSuccess==>',response.data.isSuccess,'response.data.studList===>',response.data.studList)
//         setStudentsList(response.data.studList);
//         const firstStudent = response.data.studList[0];
//         setInsName(firstStudent.orgName);
//         setInsLogo(firstStudent.orgLogo);
//         setInsContact(firstStudent.orgContact);
//         setInsMail(firstStudent.orgMail);
//         setInsWeb(firstStudent.orgWeb);
//       }
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', 'Failed to load students list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudentsList();
//   }, []);

//   const handleCall = (phone) => {
//     const phoneNumber = phone ? `tel:${phone}` : 'tel:+910000000000';
//     Linking.openURL(phoneNumber).catch(() =>
//       Alert.alert('Error', 'Cannot open dialer')
//     );
//   };

//   const handleEmail = (email) => {
//     const emailAddress = email || 'info@vttechnologies.in';
//     const url = `mailto:${emailAddress}?subject=Enquiry mail from SMILE App&body=Hi,`;
//     Linking.openURL(url).catch(() =>
//       Alert.alert('Error', 'Cannot open mail app')
//     );
//   };

//   const handleWeb = (web) => {
//     const url = web ? `https://${web}` : 'https://www.vttechnologies.in';
//     Linking.openURL(url).catch(() =>
//       Alert.alert('Error', 'Cannot open browser')
//     );
//   };

//     const renderStudentItem = ({ item }) => {
//     return (
//             <View style={styles.cardWrapper1}>

//               <TouchableOpacity
//   onPress={() =>
//   navigation.navigate('DrawerNav', { 
//   orgid,
//   studentId: item.stud_profile_Id,
//   mobile: mobileNo
// })


//   }
// >

//                 {console.log('item.stud_profile_Id==>',item.stud_profile_Id,'orgid==>',orgid,'mobileNo==>',mobileNo)}
//                 <View style={styles.studentCard}>
//                     <Image
//                      source={
//                          item.image && item.image !== 'null'
//                          ? { uri: item.image }
//                          : require('../assest/icons8-administrator-male-50.png')
//                       }
//                      style={styles.avatar}
//                    />
//                        <Divider style={{ right:18,backgroundColor: '#c64242ff',width:1, height: "130%",marginHorizontal:10 }} />

//                   <View style={{ flex: 1,right:15 }}>
//                     <Text style={styles.studentName}>{item.name}
//                     </Text>
//                     <Text style={styles.studentClass}> 
//                        Class: {item.standard} {item.section}
//                       </Text> 
//                   </View>
//                   <Icon name="chevron-right" size={24} color="#830009" />
//                 </View>
//               </TouchableOpacity>
//           </View>
//     );
//   };

//    if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#064273" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <LinearGradient colors={["#6A11CB", "#2575FC"]} style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color="#FFD700" />
//           </TouchableOpacity>
//           <View>
//             <Image source={require("../assest/smile-logo.png")}
//               style={styles.headerTitle1}
//             />
//           </View>
//           <TouchableOpacity>
//             <MaterialIcons name="logout" size={24} color="#FFD700" />
//           </TouchableOpacity>
//         </View>

//         {/* Welcome Text */}
//         <Text style={styles.welcome}>Welcome!, Dear Parent</Text>

//         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//           {/* School Card */}
//           <View style={styles.cardWrapper}>
//             <View style={styles.schoolCard}>
//               <View style={{ flexDirection: 'row', marginBottom: 60, right: 15 }}>
//                 {/* <Text style={{ left: 140, bottom: 10, fontSize: 16, fontWeight: 'bold', fontFamily: 'poppins', color: 'blue' }}>e-SCHOOL</Text>
//                 <Image
//                   source={require("../assest/vt-logo-login.png")} // replace with your logo
//                   style={styles.logo}
//                 /> */}

//                  <Image
//                     source={
//                     insLogo && insLogo !== 'null'
//                     ? { uri: insLogo }
//                     : require('../assest/icons8-administrator-male-50.png')
//                      }
//                 style={styles.logo1}
//                />

//               </View>

//               <View style={{right:200}}>
//                 <Text style={styles.schoolName}>
//                  {orgName}
//                 </Text>
//                 <Text style={styles.schoolAddress}>{orgCity}</Text>
//               </View>
//             </View>
//             <View style={{ bottom: 65 }}>
//               <Divider style={{ backgroundColor: '#c64242ff', height: 1, marginVertical: 10, marginHorizontal: 5 }} />
//             </View>

//             <View style={styles.cardFooter}>
//              <TouchableOpacity onPress={() => setModalVisible(true)}>
//                 <Text style={styles.viewSchool}>View School</Text>
//               </TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//                 <MaterialIcons name="tune" size={24} color="#830009" />
//               </TouchableOpacity>
//             </View>

//           </View>

//           {/* Student Cards */}

//            <FlatList
//         data={studentsList}
//         keyExtractor={(item) => item.stud_profile_Id.toString()}
//         renderItem={renderStudentItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />

//         </ScrollView>

//         {/* Footer */}
//         <Text style={styles.footer}>Powered by VT Technologies</Text>
//       </LinearGradient>

//           <Modal
//         visible={modalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//          <View style={styles.modalOverlay}>
//           <TouchableWithoutFeedback>
//           <View style={styles.modalContainer}>
//             <View style={{ marginBottom: 10,width:"114.5%",height:50,backgroundColor:'pink',bottom:19.5,borderRadius:10}}>

//             <Text style={styles.modalTitle}>Contact Details</Text>
//             </View>

//             <View style={{ flexDirection: 'row',marginLeft:-220 }}>
//                 <Text style={{ left: 155, bottom: 10, fontSize: 16, fontWeight: 'bold', fontFamily: 'poppins', color: 'blue' }}>e-SCHOOL</Text>
//                 <Image
//                   source={require("../assest/vt-logo-login.png")} // replace with your logo
//                   style={styles.logo}
//                 />
//               </View>
//             <Text style={styles.modalText}>{orgName}</Text>
//           <View style={{flexDirection:'row', marginRight:130}}>
//            <Icon name="phone" size={25} color="#830009" />
//             <TouchableOpacity onPress={() => handleCall(insContact)}>
//             <Text style={{marginLeft:10,top:5}}>Call: {insContact || '+91 - 00000 00000'}</Text>
//           </TouchableOpacity>
//                  {/* <Text style={{marginLeft:10,top:5}}>8976543678</Text> */}
//           </View>
//            <View style={{flexDirection:'row', marginRight:90,marginTop:10}}>
//            <Icon name="mail" size={25} color="#830009"style={{marginLeft:40 }} />
//              <TouchableOpacity onPress={() => handleEmail(insMail)}>
//             <Text style={{marginLeft:10,top:5,width:'100%'}}>Email: {insMail || 'info@vttechnologies.in'}</Text>
//           </TouchableOpacity>
//                  {/* <Text style={{marginLeft:10,top:5}}>vttech123@gamil.com</Text> */}
//           </View>
//            <View style={{flexDirection:'row',marginTop:10}}>
//            <Icon name="source" size={25} color="#830009" style={{marginLeft:-30}} />
//               <TouchableOpacity onPress={() => handleWeb(insWeb)}>
//             <Text style={{marginLeft:5,top:5,color:'#2f0dc7ff'}}>Web: {insWeb || '-'}</Text>
//           </TouchableOpacity>
//                  {/* <Text style={{marginLeft:10,top:5}}>{'VT-TECHNOLOGIES-INDIA-PRIVATE'}</Text> */}
//           </View>

//           </View>
//           </TouchableWithoutFeedback>
//         </View>
//    </TouchableWithoutFeedback>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default StudentsListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   header: {
//     marginTop: 40,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerTitle1: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#FFD700",
//   },
//   welcome: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 16, marginTop: 20,
//     marginVertical: 15,
//   },
//   cardWrapper: {
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 15,
//     padding: 10,
//     height: "40%",
//     marginTop: 10,

//   },
//     logo1: {
//     width: 180,
//     height: 40,
//     resizeMode: "contain",
//     bottom:20,marginLeft:70,marginTop:5
//   },
//   cardWrapper1: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     borderRadius: 15,
//     padding: 10,
//     height: "70%",
//     marginTop: 15,

//   },
//   schoolCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     height: "85%",
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#830009",
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//     marginRight: 10,
//     bottom: 20, left: 26
//   },
//   schoolName: {
//     fontSize: 14,
//     letterSpacing: 0.5,
//   marginLeft:-30,
//     color: "#830009",
//     fontWeight: "600",
//   },
//   schoolAddress: {
//     left: 25, top: 5,
//     fontSize: 12,
//     color: "#830009",
//   },
//   cardFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     bottom: 55,
//   },
//   viewSchool: {
//     fontSize: 16,
//     color: "#830009",
//     fontWeight: "bold",
//   },
//   studentCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#830009",
//     marginBottom: 15, top: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#ddd",
//     marginRight: 15,
//   },
//   studentName: {
//     fontSize: 14,
//     color: "#000",
//     fontWeight: "600",
//   },
//   studentClass: {
//     fontSize: 12,
//     color: "green",
//     fontWeight: "500",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 40,
//     alignSelf: "center",
//     color: "#fff",
//     fontSize: 14,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: { fontSize: 18, fontWeight: "bold", color:'#fff',
//    textAlign:'center',top:15
//   },
//   modalText: { fontSize: 16,bottom:15 },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: "#2575FC",
//     padding: 10,
//     borderRadius: 8,
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Divider } from "react-native-paper";
 import messaging from '@react-native-firebase/messaging';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fonts } from "../root/config";
import { useDispatch } from "react-redux";
import { logoutAction } from "../root/userAction";
import { RFValue } from 'react-native-responsive-fontsize';
const { width } = Dimensions.get("window");

const StudentsListScreen = ({ route, navigation }) => {
  const { orgid, orgName, studentId, orgCity } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [insName, setInsName] = useState("");
  const [insContact, setInsContact] = useState("");
  const [insMail, setInsMail] = useState("");
  const [insWeb, setInsWeb] = useState("");
  const [insLogo, setInsLogo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const fetchStudentsList = async () => {
    try {
      const mobile = await AsyncStorage.getItem("mobile");
      setMobileNo(mobile || "");
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/institute_student_list?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobile}`
      );
      console.log(' response.data.studList=>', response.data.studList)
      if (response.data.isSuccess && response.data.studList) {
        setStudentsList(response.data.studList);
        const firstStudent = response.data.studList[0];
        setInsName(firstStudent.orgName);
        setInsLogo(firstStudent.orgLogo);
        setInsContact(firstStudent.orgContact);
        setInsMail(firstStudent.orgMail);
        setInsWeb(firstStudent.orgWeb);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load students list");
    } finally {
      setLoading(false);
    }
  };
  //   const funLogout = async () => {
  //   await AsyncStorage.removeItem("isloggedIn");
  //   await AsyncStorage.removeItem("mobile");
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });
  // };

  const dispatch = useDispatch();

  const Logout = async () => {
    try {
    await messaging().deleteToken();
  
      await AsyncStorage.removeItem("isloggedIn");
      await AsyncStorage.removeItem("mobile");

      dispatch(logoutAction());
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.log("Error during logout", e);
    }
  };
  const confirmLogout = () => {
    setCustomAlertVisible(true);
    // Alert.alert("LOGOUT?", "Are you sure, you want to logout?", [
    //   { text: "No", style: "cancel" },
    //   { text: "Yes", onPress: funLogout },
    // ]);
  };

  useEffect(() => {
    fetchStudentsList();
  }, []);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone || "+910000000000"}`).catch(() =>
      Alert.alert("Error", "Cannot open dialer")
    );
  };

  const handleEmail = (email) => {
    Linking.openURL(
      `mailto:${email || "info@vttechnologies.in"}?subject=Enquiry mail from SMILE App&body=Hi,`
    ).catch(() => Alert.alert("Error", "Cannot open mail app"));
  };

  const handleWeb = (web) => {
    Linking.openURL(`https://${web || "www.vttechnologies.in"}`).catch(() =>
      Alert.alert("Error", "Cannot open browser")
    );
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.cardWrapper1}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DrawerNav", {
            orgid,
            studentId: item.stud_profile_Id,
            mobile: mobileNo,
            orgName,
          })
        }

      >

        <View style={styles.studentCard}>
          <Image
            source={
              item.image && item.image !== "null"
                ? { uri: item.image }
                : require("../assest/icons8-administrator-male-50.png")
            }
            style={styles.avatar}
          />
          <Divider
            style={{
              backgroundColor: "#c64242ff",
              width: wp("0.3%"),
              height: "130%",
              marginHorizontal: wp("2%"),
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.studentClass}>
              Class: {item.standard} {item.section}
            </Text>
          </View>
          <Icon name="chevron-right" size={wp("6%")} color="#830009" />
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#064273" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#6A11CB", "#2575FC"]} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={wp("6%")} color="#FFD700" />
          </TouchableOpacity>
          <Image
            source={require("../assest/smile-logo.png")}
            style={styles.headerTitle1}
          />
          <TouchableOpacity>
            <MaterialIcons name="logout" size={wp("6%")} color="#FFD700" onPress={confirmLogout} />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcome}>Welcome!, Dear Parent</Text>

        <ScrollView contentContainerStyle={{ paddingBottom: hp("10%") }}>
          {/* School Card */}
          <View style={styles.cardWrapper}>
            <View style={styles.schoolCard}>
              <View>
                <Image
                  source={
                    insLogo && insLogo !== "null"
                      ? { uri: insLogo }
                      : require("../assest/icons8-administrator-male-50.png")
                  }
                  style={styles.logo1}
                />
              </View>
              <View style={{ marginLeft: wp("3%") }}>
                <Text style={styles.schoolName}>{orgName}</Text>
                <Text style={styles.schoolAddress}>{orgCity}</Text>


              </View>
              <View style={{ flex: 1 }}>
                <Divider style={styles.divider} />
              </View>


              <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={styles.viewSchool}>View School</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <MaterialIcons name="tune" size={wp("6%")} color="#830009" />
                </TouchableOpacity>
              </View>
            </View>


          </View>

          {/* Student Cards */}
          <FlatList
            data={studentsList}
            keyExtractor={(item) => item.stud_profile_Id.toString()}
            renderItem={renderStudentItem}
            contentContainerStyle={{ paddingBottom: hp("5%") }}
          />
        </ScrollView>

        <Text style={styles.footer}>Powered by VT Technologies</Text>
      </LinearGradient>
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomAlertVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent1}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="crisis-alert" size={24} style={styles.modalIcon} />
              <Text style={styles.modalTitle1}>Confirm Logout</Text>
            </View>


            <Divider style={styles.divider1} />
            <Text style={styles.modalMessage}>Are you sure, you want to Logout?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setCustomAlertVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setCustomAlertVisible(false);
                  Logout();
                }}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Contact Details</Text>
                </View>

                <Text style={styles.modalText}>{orgName}</Text>

                <View style={styles.contactRow}>
                  <Icon name="phone" size={wp("5.5%")} color="#830009" />
                  <TouchableOpacity onPress={() => handleCall(insContact)}>
                    <Text style={styles.contactText}>
                      Call: {insContact || "+91 - 00000 00000"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.contactRow}>
                  <Icon name="mail" size={wp("5.5%")} color="#830009" />
                  <TouchableOpacity onPress={() => handleEmail(insMail)}>
                    <Text style={styles.contactText}>
                      Email: {insMail || "info@vttechnologies.in"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.contactRow}>
                  <Icon name="source" size={wp("5.5%")} color="#830009" />
                  <TouchableOpacity onPress={() => handleWeb(insWeb)}>
                    <Text style={[styles.contactText, { color: "#2f0dc7ff" }]}>
                      Web: {insWeb || "-"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

export default StudentsListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: wp("4%") },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    marginTop: hp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle1: {
    width: wp("35%"),
    height: hp("3%"),
    resizeMode: "contain",
  },
  welcome: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp("4%"),
    marginVertical: hp("2%"),
    fontFamily: fonts.ROBOTO_BOLD
  },
  cardWrapper: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 15,
    padding: wp("4%"),
    marginTop: hp("1%"),
  },
  schoolCard: {
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp("3%"),
    borderWidth: 1,
    borderColor: "#830009",
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fbfbfbff',
    borderRadius: 12,
    padding: RFValue(16),
    alignItems: 'center',
  },
  modalContent1: {
    width: '80%',
    height: '22%',
    backgroundColor: '#fbfbfbff',
    borderRadius: 12,
    padding: RFValue(5),
    alignItems: 'center',
  },
  modalIcon: { color: '#981313ff', marginTop: RFValue(8) },
  modalMessage: {
    fontSize: RFValue(14),
    color: '#5e5d5dff',
    marginVertical: RFValue(5),
    textAlign: 'center',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    top: hp(1)
  },
  cancelButton: {
    backgroundColor: '#bcc6fbff',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(25),
    borderRadius: 12,
  },
  confirmButton: {
    backgroundColor: '#e53935',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(25),
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
    fontSize: RFValue(13),
  },
  logo1: {
    width: wp("30%"),
    height: hp("6%"),
    resizeMode: "contain",
  },
  schoolName: {
    fontSize: wp("3.8%"),
    color: "#830009",
    fontFamily: fonts.ROBOTO_BOLD
  },
  schoolAddress: {
    fontSize: wp("3.2%"),
    color: "#830009",
    marginLeft: wp("10%"),
    fontFamily: fonts.ROBOTO_BOLD
  },
  divider: {
    backgroundColor: "#c64242ff",
    height: 1,
    marginVertical: hp("1%"),
    marginHorizontal: wp('-42%'),
    right: 1
    // marginRight:wp(35)
  },
  divider1: {
    width: '100%',
    backgroundColor: '#999',
    height: 1,
    marginVertical: RFValue(8),
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("3%"),
    marginTop: hp("1%"),
  },
  viewSchool: {
    fontSize: wp("4%"),
    color: "#830009",
    fontFamily: fonts.ROBOTO_BOLD,
    marginRight: wp(50),
    width: '100%'
  },
  cardWrapper1: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 15,
    padding: wp("3%"),
    marginVertical: hp("1%"),
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp("3%"),
    borderWidth: 1,
    borderColor: "#830009",
  },
  avatar: {
    resizeMode: 'cover',
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("10%"),
    backgroundColor: "#ddd",
    marginRight: wp("4%"),
  },
  studentName: { fontSize: wp("3.8%"), color: "#000", fontFamily: fonts.ROBOTO_BOLD },
  studentClass: { fontSize: wp("3.2%"), color: "green", fontFamily: fonts.ROBOTO_REGULAR },
  footer: {
    position: "absolute",
    bottom: hp("3%"),
    alignSelf: "center",
    color: "#fff",
    fontSize: wp("3.2%"),
    fontFamily: fonts.ROBOTO_BOLD
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp("80%"),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp("5%"),
  },
  modalHeader: {
    backgroundColor: "pink",
    borderRadius: 10,
    marginBottom: hp("2%"),

  },
  modalTitle: {
    fontSize: wp("5%"),
    fontFamily: fonts.FONT_BOLD,
    color: "#fcf9f9ff",
    textAlign: "center",
    paddingVertical: hp("1%"),
  },
  modalTitle1: {
    fontSize: wp("5%"),
    fontFamily: fonts.FONT_BOLD,
    color: "#c34646ff",
    textAlign: "center",
    paddingVertical: hp("1%"),
    marginLeft: 5
  },
  modalText: { fontSize: wp("4.5%"), marginBottom: hp("2%"), textAlign: 'center', fontFamily: fonts.ROBOTO_BOLD },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  contactText: { marginLeft: wp("3%"), fontSize: wp("3.6%"), fontFamily: fonts.ROBOTO_BOLD },
});

// // services/apiService.ts

// import axios from "axios";
// import { API_URL } from "../root/config";

// // Create a reusable axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 15000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ------------------
// // POST
// // ------------------
// export const postService = async (endPoint: string, data: any) => {
//   try {
//     const response = await api.post(endPoint, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ------------------
// // GET
// // ------------------
// export const getService = async (endPoint: string) => {
//   try {
//     const response = await api.get(endPoint);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ------------------
// // PUT
// // ------------------
// export const putService = async (endPoint: string, data: any) => {
//   try {
//     const response = await api.put(endPoint, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ------------------
// // DELETE
// // ------------------
// export const deleteService = async (endPoint: string, data?: any) => {
//   try {
//     const response = await api.delete(endPoint, { data });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ------------------
// // MULTIPART UPLOAD
// // ------------------
// export const uploadMultiPart = async (endPoint: string, formData: any) => {
//   try {
//     const response = await api.post(endPoint, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.log("Upload Error:", error);
//     throw error;
//   }
// };

// }