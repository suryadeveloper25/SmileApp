
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   Alert,
//   BackHandler,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Linking,
// } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import LinearGradient from "react-native-linear-gradient";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { Divider } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import messaging from '@react-native-firebase/messaging';
// import { request, PERMISSIONS, openSettings } from "react-native-permissions";
// import VersionCheck from "react-native-version-check";
// import { NavigationProp } from "@react-navigation/native";
// import { RootStackParamList } from "../types"; // adjust import
// import { fonts } from "../root/config";
// import { useDispatch } from "react-redux";
// import { logoutAction } from "../root/userAction";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { SafeAreaView } from "react-native-safe-area-context";
// const { width, height } = Dimensions.get("window");
// const wp = (p: number) => (width * p) / 100;
// const hp = (p: number) => (height * p) / 100;

// const InstituteListScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [orgList, setOrgList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [mobileNo, setMobileNo] = useState<string>("");
//   const [customAlertVisible, setCustomAlertVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   // const [isChecking, setIsChecking] = useState(false);
//   const [isChecking, setIsChecking] = useState(false);
//   // ✅ Load institutes
//   const loadInstitutes = async () => {
//     try {
//       const storedMobile = await AsyncStorage.getItem("mobile");
//       setMobileNo(storedMobile || "");

//       const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
//       const response = await axios.post(url);

//       if (response.status === 200 && response.data?.isSuccess) {
//         setOrgList(response.data.orgList || []);
//         console.log('response.data.orgList==>', response.data.orgList)
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };



//   // ✅ Permissions
//   const requestPermissions = async () => {
//     const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//     if (result === "denied" || result === "blocked") {
//       Alert.alert(
//         "Permission Needed",
//         "Notification permission is required. Open settings?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Open Settings", onPress: () => openSettings() },
//         ]
//       );
//     }
//   };

//   const handleExitApp = () => {
//     setCustomAlertVisible(false); // hide popup
//     setTimeout(() => {
//       BackHandler.exitApp();
//     }, 100); // wait briefly for UI to update
//   };


//   const dispatch = useDispatch();

//   const Logout = async () => {
//     try {
//       await messaging().deleteToken();
//       await AsyncStorage.removeItem("isloggedIn");
//       await AsyncStorage.removeItem("mobile");

//       dispatch(logoutAction());
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       });
//     } catch (e) {
//       console.log("Error during logout", e);
//     }
//   };
//   const confirmLogout = () => {
//     setModalVisible(true);

//   };


// let backHandlerListener: any = null;
// let updateAlertShown = false;

// const checkForUpdate = async () => {
//   try {
//     const currentVersion = VersionCheck.getCurrentVersion();

//     // 🔹 Backend check (SOURCE OF TRUTH)
//     const response = await axios.post(
//       `https://www.vtsmile.in/app/api/version_check_api?cuarr_version=${currentVersion}`
//     );

//     if (!response.data?.isSuccess) return;

//     const { isUpdateRequired } = response.data;

//     console.log('Backend force update:', isUpdateRequired);

//     if (!isUpdateRequired) {
//       // Restore back button if update not required
//       if (backHandlerListener) {
//         backHandlerListener.remove();
//         backHandlerListener = null;
//       }
//       updateAlertShown = false;
//       return;
//     }

//     // Prevent multiple alerts
//     if (updateAlertShown) return;
//     updateAlertShown = true;

//     const playStoreUrl = await VersionCheck.getPlayStoreUrl();

//     // 🔒 Disable hardware back button
//     backHandlerListener = BackHandler.addEventListener(
//       'hardwareBackPress',
//       () => true
//     );

//     const showUpdateAlert = () => {
//       Alert.alert(
//         'Update Required',
//         'A new version of SMILE app is available. Please update to continue.',
//         [
//           {
//             text: 'UPDATE NOW',
//             onPress: async () => {
//               const supported = await Linking.canOpenURL(playStoreUrl);
//               if (supported) {
//                 Linking.openURL(playStoreUrl);
//               }
//               // Re-show alert if user comes back
//               setTimeout(showUpdateAlert, 1500);
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     };

//     showUpdateAlert();
//   } catch (error) {
//     console.log('Force update error:', error);
//   }
// }
//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       await requestPermissions();
//       await loadInstitutes();
//       await checkForUpdate();
//       setLoading(false);
//     };
//     init();

//     return () => {
//       if (backHandlerListener) {
//       backHandlerListener.remove();
//       backHandlerListener = null;
//     }
//     };
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       loadInstitutes();

//       const backAction = () => {
//         setCustomAlertVisible(true);
//         return true;
//       };
//       const backHandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         backAction
//       );

//       return () => backHandler.remove();
//     }, [])
//   );

//   const renderInstitute = ({ item }: any) => (
//     <View style={styles.cardWrapper}>
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           navigation.navigate("StudentsList", {
//             orgid: item.orgId,
//             orgName: item.orgName,
//             orgLogo: item.orgLogo,
//             studentId: item.studeId,
//             orgArea: item.orgArea,
//             orgCity: item.orgCity,
//           })
//         }
//       >
//         <View style={styles.cardHeader}>
//           {/* <Text style={styles.appName}>e-SCHOOL</Text> */}
//           {/* <Image
//             source={require("../assest/vt-logo-login.png")}
//             style={styles.logo}
//           /> */}
//           <Image
//             source={
//               item.orgLogo && item.orgLogo !== "null"
//                 ? { uri: item.orgLogo }
//                 : require("../assest/icons8-administrator-male-50.png")
//             }
//             style={styles.logo}
//           />
//         </View>

//         <View style={styles.cardBody}>
//           <Text style={styles.schoolName}>{item.orgName}</Text>
//           <Text style={styles.schoolAddress}>{item.orgCity}</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 ,backgroundColor:'#6A11CB',marginBottom:-30}}>
//       <LinearGradient
//         start={{ x: 0.0, y: 0.25 }}
//         end={{ x: 0.5, y: 1.0 }}
//         colors={["#6A11CB", "#2575FC", "#4e39adff"]}
//         style={styles.container}
//       >
//         {/* Header */}
//         <View style={styles.topRow}>
//           <TouchableOpacity
//             onPress={async () => {
//               setLoading(true);
//               await loadInstitutes();
//               setLoading(false);
//             }}
//           >
//             <Icon name="refresh" size={wp(6)} color="#FFD700" style={{ left: wp(3) }} />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Select Your School</Text>
//           <TouchableOpacity style={styles.circleIcon} onPress={confirmLogout} />
//         </View>

//         {/* Title Logo */}
//         <Image
//           source={require("../assest/smile-logo.png")}
//           style={styles.title}
//         />

//         {/* Main Content */}
//         {loading ? (
//           <ActivityIndicator size="large" color="#fff" style={{ marginTop: hp(10) }} />
//         ) : orgList.length > 0 ? (
//           <FlatList
//             data={orgList}
//             keyExtractor={(item) => item.orgId.toString()}
//             renderItem={renderInstitute}
//             contentContainerStyle={{ paddingBottom: hp(10) }}
//           />
//         ) : (
//           <View style={styles.noData}>
//             <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
//           </View>
//         )}

//         <Text style={styles.footer}>Powered by VT Technologies</Text>
//       </LinearGradient>

//       {/* Custom Exit Modal */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent1}>
//             <View style={{ flexDirection: 'row' }}>
//               <MaterialIcons name="crisis-alert" size={24} style={styles.modalIcon} />
//               <Text style={styles.modalTitle1}>Confirm Logout</Text>
//             </View>


//             <Divider style={styles.divider1} />
//             <Text style={styles.modalMessage}>Are you sure, you want to Logout?</Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setModalVisible(false)}>
//                 <Text style={styles.buttonText}>No</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.confirmButton}
//                 onPress={() => {
//                   setModalVisible(false);
//                   Logout();
//                 }}>
//                 <Text style={styles.buttonText}>Yes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={customAlertVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setCustomAlertVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <View style={{ flexDirection: 'row', }}>
//               <MaterialIcons name="crisis-alert" size={28} style={styles.icon2} />
//               <Text style={styles.modalTitle}>Confirm Exit</Text>
//             </View>

//             <Divider style={styles.divider} />
//             <Text style={styles.modalText}>Are you sure you want to exit?</Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalBtn, { backgroundColor: "#bcc6fbff" }]}
//                 onPress={() => setCustomAlertVisible(false)}
//               >
//                 <Text style={styles.modalBtnText}>No</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.modalBtn, { backgroundColor: "#e53935" }]}
//                 onPress={handleExitApp}
//               >
//                 <Text style={styles.modalBtnText}>Yes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default InstituteListScreen;

// // ✅ Responsive Styles
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: wp(3) },
//   topRow: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: hp(2),
//     marginBottom: hp(3),
//   },
//   headerText: { fontSize: wp(4.2), color: "#fff", fontFamily: fonts.ROBOTO_BOLD },
//   circleIcon: {
//     width: wp(6),
//     height: wp(6),
//     borderRadius: wp(3),
//     borderWidth: 2,
//     borderColor: "#FFD700",
//     marginRight: wp(4),
//   },
//   divider1: {
//     width: '100%',
//     backgroundColor: '#999',
//     height: 1,
//     marginVertical: RFValue(8),
//   },
//   modalTitle1: {
//     fontSize: wp(4.2),
//     fontFamily: fonts.FONT_BOLD,
//     color: "#c34646ff",
//     textAlign: "center",
//     paddingVertical: hp(1),
//     marginLeft: 5
//   },
//   modalContent1: {
//   width: wp(80),
//     backgroundColor: "#fbfbfbff",
//     borderRadius: wp(4),
//     padding: wp(5),
//     alignItems: "center",
//   },
//   modalMessage: {
//     fontSize: RFValue(14),
//     color: '#5e5d5dff',
//     marginVertical: RFValue(5),
//     textAlign: 'center',
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '90%',
//     top: hp(1)
//   },
//   cancelButton: {
//     backgroundColor: '#bcc6fbff',
//     paddingVertical: RFValue(10),
//     paddingHorizontal: RFValue(25),
//     borderRadius: 12,
//   },
//   confirmButton: {
//     backgroundColor: '#e53935',
//     paddingVertical: RFValue(10),
//     paddingHorizontal: RFValue(25),
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: RFValue(13),
//   },
//   modalIcon: { color: '#981313ff', marginTop: RFValue(8) },
//   title: {
//     width: wp(35),
//     height: hp(8),
//     alignSelf: "center",
//     resizeMode: "contain",
//     marginBottom: hp(2),
//   },
//   cardWrapper: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: wp(3),
//     padding: wp(5),
//     marginVertical: hp(12),
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: wp(3),
//     borderWidth: 1,
//     borderColor: "#830009",
//     padding: wp(3),
//   },
//   cardHeader: {
//     // flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   appName: {
//     fontSize: wp(4.2),
//     color: "blue",
//     fontWeight: "bold",
//   },
//   logo: {
//     width: wp(35),
//     height: wp(12),
//     resizeMode: "contain",
//   },
//   cardBody: { marginTop: hp(1.5) },
//   schoolName: {
//     fontSize: wp(4),
//     color: "#830009",
//     fontFamily: fonts.ROBOTO_BOLD,
//     textAlign: 'center'
//   },
//   schoolAddress: {
//     fontSize: wp(3.6),
//     color: "#830009",
//     marginTop: hp(0.5),
//     textAlign: 'center', fontFamily: fonts.ROBOTO_BOLD
//   },
//   noData: { alignItems: "center", marginTop: hp(5) },
//   noDataText: { color: "#fff", fontSize: wp(4), fontFamily: fonts.ROBOTO_BOLD },
//   footer: {
//     position: "absolute",
//     bottom: hp(5),
//     alignSelf: "center",
//     color: "#fff",
//     fontSize: wp(3.8),
//     fontFamily: fonts.FONT_BOLD
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: wp(80),
//     backgroundColor: "#fbfbfbff",
//     borderRadius: wp(4),
//     padding: wp(5),
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: wp(4.8),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: "#c34646ff",
//     marginBottom: hp(1),
//   },
//   icon2: { color: "#981313ff", marginBottom: hp(1) },
//   divider: {
//     height: 1,
//     backgroundColor: "#5b5959ff",
//     width: "100%",
//     marginVertical: hp(1),
//   },
//   modalText: {
//     fontSize: wp(3.8),
//     color: "#5e5d5dff",
//     textAlign: "center",
//     marginBottom: hp(2),
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   modalButtons: { flexDirection: "row", justifyContent: "space-between" },
//   modalBtn: {
//     borderRadius: wp(3),
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(8),
//     marginHorizontal: wp(2),
//   },
//   modalBtnText: { color: "#fff", fontFamily: fonts.ROBOTO_BOLD, fontSize: wp(3.8) },
// });


import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  BackHandler,
  Modal,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS, openSettings } from "react-native-permissions";
import VersionCheck from "react-native-version-check";
import { fonts } from "../root/config";
import { useDispatch } from "react-redux";
import { logoutAction } from "../root/userAction";
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;

const InstituteListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [orgList, setOrgList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileNo, setMobileNo] = useState<string>("");
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Use refs to track update state properly
  const updateBackHandlerRef = useRef<any>(null);
  const updateAlertShownRef = useRef(false);
  const isUpdateRequiredRef = useRef(false);

  const dispatch = useDispatch();

  // ✅ Load institutes
  const loadInstitutes = async () => {
    try {
      const storedMobile = await AsyncStorage.getItem("mobile");
      setMobileNo(storedMobile || "");

      const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
      const response = await axios.post(url);

      if (response.status === 200 && response.data?.isSuccess) {
        setOrgList(response.data.orgList || []);
        // console.log('response.data.orgList==>', response.data.orgList);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Permissions
  const requestPermissions = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    if (result === "denied" || result === "blocked") {
      Alert.alert(
        "Permission Needed",
        "Notification permission is required. Open settings?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => openSettings() },
        ]
      );
    }
  };

  const handleExitApp = () => {
    setCustomAlertVisible(false);
    setTimeout(() => {
      BackHandler.exitApp();
    }, 100);
  };

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
    setModalVisible(true);
  };

  // ✅ FIXED: Proper force update implementation
  const checkForUpdate = async () => {
    try {
      const currentVersion = VersionCheck.getCurrentVersion();

      // Backend check
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/version_check_api?cuarr_version=${currentVersion}`
      );

      if (!response.data?.isSuccess) return;

      const { isUpdateRequired } = response.data;
      isUpdateRequiredRef.current = isUpdateRequired;

      console.log('Backend force update:', isUpdateRequired);

      if (!isUpdateRequired) {
        // Restore back button if update not required
        if (updateBackHandlerRef.current) {
          updateBackHandlerRef.current.remove();
          updateBackHandlerRef.current = null;
        }
        updateAlertShownRef.current = false;
        return;
      }

      // Prevent multiple alerts
      if (updateAlertShownRef.current) return;
      updateAlertShownRef.current = true;

      const playStoreUrl = await VersionCheck.getPlayStoreUrl();

      // 🔒 Disable hardware back button for force update
      if (updateBackHandlerRef.current) {
        updateBackHandlerRef.current.remove();
      }

      updateBackHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // Block back button when update is required
          return true;
        }
      );

      const showUpdateAlert = () => {
        Alert.alert(
          'Update Required',
          'A new version of SMILE app is available. Please update to continue.',
          [
            {
              text: 'UPDATE NOW',
              onPress: async () => {
                try {
                  const supported = await Linking.canOpenURL(playStoreUrl);
                  if (supported) {
                    await Linking.openURL(playStoreUrl);
                  } else {
                    console.log("Cannot open Play Store URL");
                  }
                } catch (error) {
                  console.log("Error opening Play Store:", error);
                }
                // Re-show alert if user comes back without updating
                setTimeout(showUpdateAlert, 1500);
              },
            },
          ],
          { cancelable: false }
        );
      };

      showUpdateAlert();
    } catch (error) {
      console.log('Force update error:', error);
    }
  };

  // ✅ Initial setup effect
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await requestPermissions();
      await loadInstitutes();
      await checkForUpdate();
      setLoading(false);
    };
    init();

    // Cleanup on unmount
    return () => {
      if (updateBackHandlerRef.current) {
        updateBackHandlerRef.current.remove();
        updateBackHandlerRef.current = null;
      }
    };
  }, []);

  // ✅ FIXED: Handle back button based on update status
  useFocusEffect(
    useCallback(() => {
      loadInstitutes();

      let normalBackHandler: any = null;

      // Only set up normal back handler if update is NOT required
      if (!isUpdateRequiredRef.current) {
        const backAction = () => {
          setCustomAlertVisible(true);
          return true;
        };

        normalBackHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
      }

      return () => {
        // Only remove normal back handler, not the update one
        if (normalBackHandler) {
          normalBackHandler.remove();
        }
      };
    }, [])
  );

  const renderInstitute = ({ item }: any) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("StudentsList", {
            orgid: item.orgId,
            orgName: item.orgName,
            orgLogo: item.orgLogo,
            studentId: item.studeId,
            orgArea: item.orgArea,
            orgCity: item.orgCity,
          })
        }
      >
        <View style={styles.cardHeader}>
          <Image
            source={
              item.orgLogo && item.orgLogo !== "null"
                ? { uri: item.orgLogo }
                : require("../assest/icons8-administrator-male-50.png")
            }
            style={styles.logo}
          />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.schoolName}>{item.orgName}</Text>
          <Text style={styles.schoolAddress}>{item.orgCity}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6A11CB', marginBottom: -30 }}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={["#6A11CB", "#2575FC", "#4e39adff"]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={async () => {
              setLoading(true);
              await loadInstitutes();
              setLoading(false);
            }}
          >
            <Icon name="refresh" size={wp(6)} color="#FFD700" style={{ left: wp(3) }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Select Your School</Text>
          <TouchableOpacity style={styles.circleIcon} onPress={confirmLogout} />
        </View>

        {/* Title Logo */}
        <Image
          source={require("../assest/smile-logo.png")}
          style={styles.title}
        />

        {/* Main Content */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: hp(10) }} />
        ) : orgList.length > 0 ? (
          <FlatList
            data={orgList}
            keyExtractor={(item) => item.orgId.toString()}
            renderItem={renderInstitute}
            contentContainerStyle={{ paddingBottom: hp(10) }}
          />
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
          </View>
        )}

        <Text style={styles.footer}>Powered by VT Technologies</Text>
      </LinearGradient>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay5}>
          <View style={styles.modalContainer}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <MaterialIcons name="crisis-alert" size={24} color="#e53935" style={{ top: 3, marginLeft: 10 }} />
              <Text style={styles.modalTitle5}>Confirm Logout</Text>
            </View>

            {/* Divider */}
            <View style={styles.modalDivider} />

            {/* Message */}
            <Text style={styles.modalMessage5}>
              Are you sure you want to logout?
            </Text>

            {/* Buttons */}
            <View style={styles.modalButtonContainer5}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton5]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton5]}
                onPress={() => {
                  setModalVisible(false);
                  Logout();
                }}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
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
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setModalVisible(false);
                  Logout();
                }}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* Exit Confirmation Modal */}

      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomAlertVisible(false)}
      >
        <View style={styles.modalOverlay5}>
          <View style={styles.modalBox}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="crisis-alert" size={28} style={styles.icon2} />
              <Text style={styles.modalTitle5}>Confirm Exit</Text>
            </View>

            <Divider style={styles.modalDivider} />
            <Text style={styles.modalMessage5}>Are you sure you want to exit?</Text>

            <View style={styles.modalButtonContainer5}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#bcc6fbff" }]}
                onPress={() => setCustomAlertVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#e53935" }]}
                onPress={handleExitApp}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InstituteListScreen;

// ✅ Responsive Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(3) },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  headerText: { fontSize: wp(4.2), color: "#fff", fontFamily: fonts.ROBOTO_BOLD },
  circleIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 2,
    borderColor: "#FFD700",
    marginRight: wp(4),
  },
  divider1: {
    width: '100%',
    backgroundColor: '#999',
    height: 1,
    marginVertical: RFValue(8),
  },
  modalTitle1: {
    fontSize: wp(4.2),
    fontFamily: fonts.FONT_BOLD,
    color: "#c34646ff",
    textAlign: "center",
    paddingVertical: hp(1),
    marginLeft: 5
  },
  modalContent1: {
    width: wp(80),
    backgroundColor: "#fbfbfbff",
    borderRadius: wp(4),
    padding: wp(5),
    alignItems: "center",
  },

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
  modalIcon: { color: '#981313ff', marginTop: RFValue(8) },
  title: {
    width: wp(35),
    height: hp(8),
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: hp(2),
  },
  cardWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: wp(3),
    padding: wp(5),
    marginVertical: hp(2),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "#830009",
    padding: wp(3),
  },
  cardHeader: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  appName: {
    fontSize: wp(4.2),
    color: "blue",
    fontWeight: "bold",
  },
  logo: {
    width: wp(35),
    height: wp(12),
    resizeMode: "contain",
  },
  modalOverlay5: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp(85),
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconContainer: {
    flexDirection: 'row'
  },
  modalTitle5: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c34646ff',
    fontFamily: fonts.FONT_BOLD,
    marginBottom: 12,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#5b5959ff',
    width: '115%',
    marginBottom: 16,
  },
  modalMessage5: {
    fontSize: 16,
    fontFamily: fonts.FONT_MEDIUM,
    color: '#5e5d5dff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtonContainer5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton5: {
    backgroundColor: '#bcc6fbff',
  },
  confirmButton5: {
    backgroundColor: '#e53935',
  },
  buttonText5: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
  },
  cardBody: { marginTop: hp(1.5) },
  schoolName: {
    fontSize: wp(4),
    color: "#830009",
    fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'center'
  },
  schoolAddress: {
    fontSize: wp(3.6),
    color: "#830009",
    marginTop: hp(0.5),
    textAlign: 'center',
    fontFamily: fonts.ROBOTO_BOLD
  },
  noData: { alignItems: "center", marginTop: hp(5) },
  noDataText: { color: "#fff", fontSize: wp(4), fontFamily: fonts.ROBOTO_BOLD },
  footer: {
    position: "absolute",
    bottom: hp(5),
    alignSelf: "center",
    color: "#fff",
    fontSize: wp(3.8),
    fontFamily: fonts.FONT_BOLD
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: wp(80),
    backgroundColor: "#fbfbfbff",
    borderRadius: wp(4),
    padding: wp(5),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp(4.8),
    fontFamily: fonts.ROBOTO_BOLD,
    color: "#c34646ff",
    marginBottom: hp(1),
  },
  icon2: { color: "#981313ff", marginBottom: hp(1) },
  divider: {
    height: 1,
    backgroundColor: "#5b5959ff",
    width: "100%",
    marginVertical: hp(1),
  },
  modalText: {
    fontSize: wp(3.8),
    color: "#5e5d5dff",
    textAlign: "center",
    marginBottom: hp(2),
    fontFamily: fonts.ROBOTO_BOLD
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    borderRadius: wp(3),
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    marginHorizontal: wp(2),
  },
  modalBtnText: { color: "#fff", fontFamily: fonts.ROBOTO_BOLD, fontSize: wp(3.8) },
});