

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import MaterialIcons from "@react-native-vector-icons/material-icons";
// import { useDispatch } from "react-redux";
// import { logoutAction } from "../root/userAction";
// import messaging from '@react-native-firebase/messaging';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { fonts } from "../root/config";
// import { Divider } from "react-native-paper";
// import { showMessage } from "react-native-flash-message";

// interface DrawerContentProps {
//   route: any;
//   navigation: any;
// }

// const CustomDrawer: React.FC<DrawerContentProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [studentData, setStudentData] = useState<any>({});
//   const [customAlertVisible, setCustomAlertVisible] = useState(false);

//   const dispatch = useDispatch();

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );

//       if (res.data.isSuccess && res.data.studDetails) {
//         const details = res.data.studDetails[0];
//         setStudentData({
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           imageURL: details.photo_url,
//           roll: details.rollNo,
//           admission: details.admsn_no,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };



//   const Logout = async () => {
//     try {
//       // 🔔 Delete FCM token (VERY IMPORTANT)
//       await messaging().deleteToken();
//       console.log("🔥 FCM token deleted on logout");

//       // 🧹 Clear local storage
//       await AsyncStorage.multiRemove([
//         "isloggedIn",
//         "mobile",
//         "fcmToken",
//       ]);

//       // 🧠 Clear redux state
//       dispatch(logoutAction());

//       // 🔁 Reset navigation
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       });

//       showMessage({
//         message: "Logged Out",
//         description: "You have successfully logged out!",
//         type: "success",
//         backgroundColor: "#1E90FF",
//         color: "#FFFFFF",
//       });
//     } catch (e) {
//       console.log("❌ Logout error:", e);

//       showMessage({
//         message: "Logout Failed",
//         description: "Something went wrong. Please try again!",
//         type: "danger",
//         backgroundColor: "#FF4C4C",
//         color: "#FFFFFF",
//       });
//     }
//   };

//   // const Logout = async () => {
//   //   try {
//   //     await AsyncStorage.removeItem("isloggedIn");
//   //     await AsyncStorage.removeItem("mobile");
//   //     dispatch(logoutAction());
//   //     navigation.reset({ index: 0, routes: [{ name: "Login" }] });

//   //     showMessage({
//   //       message: "Logged Out",
//   //       description: "You have successfully logged out!",
//   //       type: "success",
//   //       backgroundColor: "#1E90FF",
//   //       color: "#FFFFFF",
//   //     });
//   //   } catch (e) {
//   //     console.log("Logout error", e);
//   //     showMessage({
//   //       message: "Logout Failed",
//   //       description: "Something went wrong. Please try again!",
//   //       type: "danger",
//   //       backgroundColor: "#FF4C4C",
//   //       color: "#FFFFFF",
//   //     });
//   //   }
//   // };

//   useEffect(() => {
//     getStudentData();
//   }, []);

//   return (
//     <View style={styles.container}>

//       {/* ================= PROFILE SECTION ================= */}
//       <View style={styles.profileSection}>
//         <Image
//           style={styles.profileImage}
//           source={require("../assest/smile-app-icon.png")}
//         />

//         <Text style={styles.titleText}>SMILE</Text>

//         <View style={styles.welcomeBox}>
//           <Text style={styles.welcomeText}>Welcome,</Text>

//           <View style={styles.rowCenter}>
//             <MaterialIcons name="person" size={hp("3%")} color="#fff" />
//             <Text style={styles.userText}>{studentData.name?.toUpperCase()}</Text>
//           </View>

//           <View style={[styles.rowCenter, { marginTop: hp("1%") }]}>
//             <MaterialIcons name="phone" size={hp("3%")} color="#fff" />
//             <Text style={styles.userText}>{mobile}</Text>
//           </View>
//         </View>
//       </View>

//       {/* ================= MENU SECTION ================= */}
//       <View style={styles.menuContainer}>
//         {MenuItem("person", "Profile", () =>
//           navigation.navigate("HomeTab", { screen: "Profile" })
//         )}

//         {MenuItem("checklist-rtl", "Attendance", () =>
//           navigation.navigate("HomeTab", { screen: "Attendance" })
//         )}

//         {MenuItem("today", "TimeTable", () =>
//           navigation.navigate("Timetable", { orgid, studentId, mobile })
//         )}

//         {MenuItem("calendar-month", "Academic Calendar", () =>
//           navigation.navigate("Calender", { orgid, studentId, mobile })
//         )}

//         {MenuItem("list", "Examinations", () =>
//           navigation.navigate("Exam", { orgid, studentId, mobile })
//         )}

//         {MenuItem("attach-money", "Fees", () =>
//           navigation.navigate("Fees", { orgid, studentId, mobile })
//         )}

//         {MenuItem("notifications-none", "Notifications", () =>
//           navigation.navigate("HomeTab", { screen: "Notification" })
//         )}

//         {MenuItem("settings", "Setting", () =>
//           navigation.navigate("Setting", { orgid, studentId, mobile })
//         )}

//         {MenuItem("logout", "Logout", () =>
//           setCustomAlertVisible(true)
//         )}

//         <Text style={styles.versionLabel}>VT Technologies SMILE v18.10</Text>
//       </View>

      
//       <Modal
//         visible={customAlertVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setCustomAlertVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             {/* Icon */}
//             <View style={styles.iconContainer}>
//               <MaterialIcons name="crisis-alert" size={24} color="#e53935" style={{ top: 3, marginLeft: 10 }} />
//               <Text style={styles.modalTitle}>Confirm Logout</Text>
//             </View>

//             {/* Divider */}
//             <View style={styles.modalDivider} />

//             {/* Message */}
//             <Text style={styles.modalMessage}>
//               Are you sure you want to logout?
//             </Text>

//             {/* Buttons */}
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setCustomAlertVisible(false)}
//               >
//                 <Text style={styles.buttonText}>No</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.modalButton, styles.confirmButton]}
//                 onPress={() => { setCustomAlertVisible(false); Logout(); }} >

//                 <Text style={styles.buttonText}>Yes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// };

// export default CustomDrawer;

// /********************** MENU ITEM COMPONENT *************************/

// const MenuItem = (icon: string, title: string, onPress: () => void) => (
//   <View style={styles.menuRow}>
//     <MaterialIcons name={icon} size={hp("3%")} color="#fff" />
//     <TouchableOpacity onPress={onPress}>
//       <Text style={styles.menuText}>{title}</Text>
//     </TouchableOpacity>
//   </View>
// );

// /********************** STYLES *************************/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#220876ff",
//     padding: wp("5%"),
//   },

//   profileSection: {
//     alignItems: "center",
//     width: "100%",
//     // paddingBottom: hp("1%"),
//   },
//   divider: {
//     height: 1, backgroundColor: '#5b5959ff', marginVertical: 10, width: '115%',
//   },
//   profileImage: {
//     width: wp("38%"),
//     height: hp("20%"),
//     resizeMode: "contain",
//     bottom: hp(5),
//   },

//   titleText: {
//     color: "#fff",
//     fontSize: hp("3%"),
//     fontFamily: fonts.FONT_BOLD,
//     bottom: hp(9)
//   },

//   welcomeBox: {
//     width: "113.9%",
//     backgroundColor: "#21105fff",
//     padding: hp("1.5%"),
//     // borderRadius: wp("2%"),
//     bottom: hp(8)
//     // marginTop: hp("1%"),
//   },

//   welcomeText: {
//     color: "#fff",
//     fontSize: hp("2.2%"),
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: wp(85),
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 24,
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   iconContainer: {
//     flexDirection: 'row'
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#c34646ff',
//     fontFamily: fonts.FONT_BOLD,
//     marginBottom: 12,
//   },
//   modalDivider: {
//     height: 1,
//     backgroundColor: '#5b5959ff',
//     width: '115%',
//     marginBottom: 16,
//   },
//   modalMessage: {
//     fontSize: 16,
//     fontFamily: fonts.FONT_MEDIUM,
//     color: '#5e5d5dff',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     gap: 12,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#bcc6fbff',
//   },
//   confirmButton: {
//     backgroundColor: '#e53935',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//     fontFamily: fonts.FONT_BOLD,
//   },
//   menuContainer: {
//     flex: 1,
//     marginTop: hp("2%"),
//   },

//   rowCenter: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp("0.5%"),
//   },

//   userText: {
//     color: "#fff",
//     fontSize: hp("2.2%"),
//     marginLeft: wp("2%"),
//     fontFamily: fonts.ROBOTO_BOLD
//   },

//   menuRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: hp("2%"),
//     bottom: hp(9)
//   },

//   menuText: {
//     fontSize: hp("2.1%"),
//     color: "#fff",
//     marginLeft: wp("3%"),
//     fontFamily: fonts.ROBOTO_BOLD,

//   },

//   versionLabel: {
//     color: "#fff",
//     fontSize: hp("1.8%"),
//     marginTop: hp("3%"),
//     marginLeft: wp("2%"),
//     bottom: hp(7),
//     fontFamily: fonts.ROBOTO_BOLD
//   },

//   // modalOverlay: {
//   //   flex: 1,
//   //   backgroundColor: "rgba(0,0,0,0.6)",
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   // },

//   modalBox: {
//     width: wp("80%"),
//     backgroundColor: "#fff",
//     padding: hp("3%"),
//     borderRadius: wp("4%"),
//     alignItems: "center",
//   },

//   // modalTitle: {
//   //   fontSize: hp("2.5%"),
//   //   color: "#c34646",
//   //   fontWeight: "bold",
//   // },

//   modalMsg: {
//     fontSize: hp("2%"),
//     color: "#555",
//     marginTop: hp("2%"),
//     textAlign: "center",
//   },

//   modalRow: {
//     flexDirection: "row",
//     marginTop: hp("3%"),
//   },

//   noBtn: {
//     backgroundColor: "#bcc6fb",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("3%"),
//     marginRight: wp("3%"),
//   },

//   yesBtn: {
//     backgroundColor: "#e53935",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("3%"),
//   },

//   btnText: {
//     fontSize: hp("2%"),
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useDispatch } from "react-redux";
import { logoutAction } from "../root/userAction";
import messaging from '@react-native-firebase/messaging';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from "../root/config";
import { showMessage } from "react-native-flash-message";

interface DrawerContentProps {
  route: any;
  navigation: any;
}

const CustomDrawer: React.FC<DrawerContentProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [studentData, setStudentData] = useState<any>({});
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const dispatch = useDispatch();

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (res.data.isSuccess && res.data.studDetails) {
        const details = res.data.studDetails[0];
        setStudentData({
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          imageURL: details.photo_url,
          roll: details.rollNo,
          admission: details.admsn_no,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Logout = async () => {
    try {
      await messaging().deleteToken();

      await AsyncStorage.removeItem("isloggedIn");
      await AsyncStorage.removeItem("mobile");
      // await AsyncStorage.multiRemove([
      //   "isloggedIn",
      //   "mobile",
      //   "fcmToken",
      // ]);

      dispatch(logoutAction());

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

      showMessage({
        message: "Logged Out",
        description: "You have successfully logged out!",
        type: "success",
        backgroundColor: "#1E90FF",
        color: "#FFFFFF",
      });
    } catch (e) {
      console.log("❌ Logout error:", e);

      showMessage({
        message: "Logout Failed",
        description: "Something went wrong. Please try again!",
        type: "danger",
        backgroundColor: "#FF4C4C",
        color: "#FFFFFF",
      });
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
      style={styles.menuScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuContent}
      >
        {/* ================= PROFILE SECTION ================= */}
        <View style={styles.profileSection}>
          <Image
            style={styles.profileImage}
            source={require("../assest/smile-app-icon.png")}
          />

          <Text style={styles.titleText}>SMILE</Text>

          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeLabel}>Welcome back</Text>

            <View style={styles.userInfoRow}>
              <MaterialIcons name="person" size={hp("2.5%")} color="#fff" />
              <Text style={styles.userName}>{studentData.name?.toUpperCase()}</Text>
            </View>

            <View style={[styles.userInfoRow, { marginTop: hp("0.8%") }]}>
              <MaterialIcons name="phone" size={hp("2.5%")} color="#fff" />
              <Text style={styles.userPhone}>{mobile}</Text>
            </View>
          </View>
        </View>

        {/* ================= DIVIDER ================= */}
        <View style={styles.dividerLine} />

        {/* ================= MENU SECTION ================= */}
        <View style={styles.menuContainer}>
          {MenuItem("person", "Profile", () =>
            navigation.navigate("HomeTab", { screen: "Profile" })
          )}

          {MenuItem("checklist-rtl", "Attendance", () =>
            navigation.navigate("HomeTab", { screen: "Attendance" })
          )}

          {MenuItem("today", "TimeTable", () =>
            navigation.navigate("Timetable", { orgid, studentId, mobile })
          )}

          {MenuItem("calendar-month", "Academic Calendar", () =>
            navigation.navigate("Calender", { orgid, studentId, mobile })
          )}

          {MenuItem("assignment", "Examinations", () =>
            navigation.navigate("Exam", { orgid, studentId, mobile })
          )}

          {MenuItem("attach-money", "Fees", () =>
            navigation.navigate("Fees", { orgid, studentId, mobile })
          )}

          {MenuItem("notifications-none", "Notification", () =>
            navigation.navigate("HomeTab", { screen: "Notification" })
          )}

          {MenuItem("settings", "Setting", () =>
            navigation.navigate("Setting", { orgid, studentId, mobile })
          )}

          {MenuItem("logout", "Logout", () =>
            setCustomAlertVisible(true)
          )}
        </View>
      </ScrollView>

      {/* ================= VERSION LABEL ================= */}
      <Text style={styles.versionLabel}>VT Technologies SMILE v19.11</Text>

      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Icon and Title */}
            <View style={styles.iconContainer}>
              <MaterialIcons name="crisis-alert" size={28} color="#e53935" />
              <Text style={styles.modalTitle}>Confirm Logout</Text>
            </View>

            {/* Divider */}
            <View style={styles.modalDivider} />

            {/* Message */}
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setCustomAlertVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => { setCustomAlertVisible(false); Logout(); }}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawer;

/********************** MENU ITEM COMPONENT *************************/

const MenuItem = (icon: string, title: string, onPress: () => void) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconBackground}>
      <MaterialIcons name={icon} size={22} color="#fff" />
    </View>
    <Text style={styles.menuText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={hp("2.5%")} color="#fff" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

/********************** STYLES *************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#220876ff",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    // paddingTop: hp(1.5),
    paddingBottom: hp(5),
  },

  profileSection: {
    alignItems: "center",
    width: "100%",
    marginBottom: hp("1%"),
  },

  profileImage: {
    width: wp("40%"),
    height: hp("15%"),
    resizeMode: "contain",
    marginBottom: hp("1%"),
    top:5
  },

  titleText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: fonts.ROBOTO_BOLD,
    marginBottom: hp("1.5%"),
    letterSpacing: 1,
    bottom:10
  },

  welcomeBox: {
    width: "100%",
    backgroundColor: "#21105fff",
    padding: hp("2%"),
    paddingVertical: hp(1.2),
    borderRadius: wp("3%"),
    borderLeftWidth: wp("1%"),
    borderLeftColor: "rgb(166, 164, 173)",
  },

  welcomeLabel: {
    color: "rgb(229, 229, 250)",
    fontSize: 12,
    fontFamily: fonts.FONT_MEDIUM,
    marginBottom: hp("1%"),
  },

  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userName: {
    color: "#fff",
    fontSize: 14,
    marginLeft: wp("3%"),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.5,
  },

  userPhone: {
    color: "#fff",
    fontSize: 14,
    marginLeft: wp("3%"),
    fontFamily: fonts.ROBOTO_BOLD,
  },

  dividerLine: {
    // height: 1,
    // backgroundColor: "#3d2b7fff",
    // marginVertical: hp("1%"),
     height: 1,
    backgroundColor: "#2d1a8a",
    marginVertical: hp(1),
    
  },

  menuContainer: {
    flex: 1,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.6%"),
    paddingHorizontal: wp("2%"),
    borderRadius: wp("2.5%"),
  },

  iconBackground: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("5.5%"),
    backgroundColor: "#3d2b7fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  menuText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: fonts.ROBOTO_BOLD,
    flex: 1,
    letterSpacing: 0.3,
  },

  versionLabel: {
    color: "#8a7ba5ff",
    fontSize: hp("1.6%"),
    marginBottom: hp("1.5%"),
    marginLeft: wp("2%"),
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: "center",
    marginTop: hp("2%"),
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: wp("85%"),
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: hp("2.5%"),
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },

  modalTitle: {
    fontSize: hp("2.4%"),
    fontWeight: "bold",
    color: "#c34646ff",
    fontFamily: fonts.FONT_BOLD,
    marginLeft: wp("2%"),
  },

  modalDivider: {
    height: 1,
    backgroundColor: "#e0e0e0ff",
    width: "100%",
    marginBottom: hp("2%"),
  },

  modalMessage: {
    fontSize: hp("1.9%"),
    fontFamily: fonts.FONT_MEDIUM,
    color: "#666666ff",
    textAlign: "center",
    marginBottom: hp("2.5%"),
    lineHeight: 22,
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: wp("3%"),
  },

  modalButton: {
    flex: 1,
    paddingVertical: hp("1.5%"),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButton: {
    backgroundColor: "#bcc6fbff",
  },

  confirmButton: {
    backgroundColor: "#e53935",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: hp("1.9%"),
    fontFamily: fonts.FONT_BOLD,
  },
});