// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
//   SafeAreaView,
//   Modal,
//   Linking,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
// import MaterialIcons from "@react-native-vector-icons/material-icons";
// import { PERMISSIONS, request, openSettings } from 'react-native-permissions';
// import VersionCheck from 'react-native-version-check';
// import { Divider } from "react-native-paper";
// import axios from "axios";

// type RootStackParamList = {
//   StudentsList: {
//     orgid: any;
//     orgName: any;
//     orgLogo: any;
//     studentId: any;
//     orgArea: any;
//     orgCity: any;
//   };
//   // Add other screens if needed
// };

// const InstituteListScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [orgList, setOrgList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [mobileNo, setMobileNo] = useState<string>("");
//   const [customAlertVisible, setCustomAlertVisible] = useState(false);
//   const [isChecking, setIsChecking] = useState(false);


//     const loadInstitutes = async () => {
//     try {
//       const storedMobile = await AsyncStorage.getItem("mobile");
//       setMobileNo(storedMobile || "");

//       const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
//       const response = await axios.post(url);

//       if (response.status === 200 && response.data?.isSuccess) {
//         const list = response.data.orgList || [];
//         setOrgList(list);
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };
// const funLogout = async () => {
//     await AsyncStorage.removeItem("isloggedIn");
//     await AsyncStorage.removeItem("mobile");
//     navigation.reset({
//       index: 0,
//       routes: [{ name: "Login" }],
//     });
//   };

//   // ✅ Request permissions
//   const requestPermissions = async () => {
//     const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
//     if (result === 'denied' || result === 'blocked') {
//       Alert.alert(
//         'Permission Needed',
//         'Notification permission is required. Open settings?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Open Settings', onPress: () => openSettings() },
//         ]
//       );
//     }
//   };

//     // ✅ Version check
//   const checkVersion = async () => {
//     try {
//       setIsChecking(true);
//       const latestVersion = await VersionCheck.getLatestVersion();
//       const currentVersion = await VersionCheck.getCurrentVersion();

//       if (latestVersion !== currentVersion) {
//         Alert.alert(
//           'New Version Available',
//           'We have made improvements to SMILE app, please update to continue.',
//           [
//             {
//               text: 'Update Now',
//               style: 'destructive',
//               onPress: async () => Linking.openURL(await VersionCheck.getStoreUrl()),
//             },
//           ],
//           { cancelable: false }
//         );
//       }
//     } catch (e) {
//       console.log('Version check failed:', e);
//     } finally {
//       setIsChecking(false);
//     }
//   };


//   const confirmLogout = () => {
//     Alert.alert("LOGOUT?", "Are you sure, you want to logout?", [
//       { text: "No", style: "cancel" },
//       { text: "Yes", onPress: funLogout },
//     ]);
//   };

//   // ✅ Equivalent to initState()
//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       await requestPermissions();
//       await loadInstitutes();
//       await checkVersion();
//       setLoading(false);
//     };
//     init();
//   }, []);

//       useFocusEffect(
//     useCallback(() => {
//         loadInstitutes();

//       const backAction = () => {
//      setCustomAlertVisible(true); // show custom alert
//       return true; // prevent default back action
// };
//       const backHandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         backAction
//       );

//       return () => backHandler.remove();
//     }, [])
//   );

// const renderInstitute = ({ item }: any) => (
//   <View style={styles.cardWrapper}>
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() =>
//         navigation.navigate("StudentsList", {
//           orgid: item.orgId,
//           orgName: item.orgName,
//           orgLogo: item.orgLogo,
//           studentId: item.studeId,
//           orgArea: item.orgArea,
//           orgCity: item.orgCity,

//         })
//       }
//     >

//             <View style={{flexDirection:'row',marginBottom:65,marginTop:10}}>
//               <Text style={{left:128,top:10,fontSize:16,fontWeight:'bold',fontFamily:'poppins',color:'blue'}}>e-SCHOOL</Text>
//              <Image
//               source={require("../assest/vt-logo-login.png")} //,replace with your logo
//               style={styles.logo}
//             />
//             </View>

//             <View style={{flex:1,marginTop:30,}}>
//               <Text style={styles.schoolName}>
//                {item.orgName}
//               </Text>
//               <Text style={styles.schoolAddress}>{item.orgCity}</Text>
//             </View>


//             {/* <Icon name="edit" size={20} color="#830009" /> */}
//           </TouchableOpacity>


//       </View>

//   );
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{flex:1}}>
//               {/* Gradient Background */}
//       <LinearGradient
//         start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
//         colors={["#6A11CB", "#2575FC" ,"#4e39adff"]}
//         style={styles.container}
//       >
//         {/* Top Row */}
//         <View style={styles.topRow}>
//           <TouchableOpacity
//   onPress={async () => {
//     setLoading(true);
//     await loadInstitutes();
//     // await checkVersion();
//     setLoading(false);
//   }}
// >
//   <Icon name="refresh" size={24} color="#FFD700" style={{left: 20}} />
// </TouchableOpacity>
//           {/* <Icon name="refresh" size={24} color="#FFD700" style={{left:20}} /> */}
//           <Text style={styles.headerText}>Select Your School</Text>
//            <TouchableOpacity style={styles.circleIcon} onPress={confirmLogout}></TouchableOpacity>
//         </View>

//         {/* Title */}
//         <View>
//            <Image
//               source={require("../assest/smile-logo.png")} // replace with your logo
//               style={styles.title}
//             />

//         </View>

//     {loading ? (
//         <ActivityIndicator size="large" color="#fff" />
//       ) : orgList.length > 0 ? (
//         <FlatList
//           data={orgList}
//           keyExtractor={(item) => item.orgId.toString()}
//           renderItem={renderInstitute}
//           contentContainerStyle={{ paddingBottom: 50 }}
//         />
//       ) : (
//         <View style={styles.noData}>
//           {/* <Image
//             source={require("./assets/no-data.png")}
//             style={{ width: 120, height: 120 }}
//           /> */}
//           <Text style={styles.noDataText}>Sorry, No Data Found!</Text>
//         </View>
//       )}


//         {/* Footer */}
//         <Text style={styles.footer}>Powered by VT Technologies</Text>
//       </LinearGradient>
//             <Modal
//   visible={customAlertVisible}
//   transparent
//   animationType="fade"
//   onRequestClose={() => setCustomAlertVisible(false)}
// >
//   <View style={{
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center"
//   }}>
//     <View style={{
//       width: "80%",height:180,
//       backgroundColor: "#fbfbfbff",   // 🔹 Background color
//       borderRadius: 12,
//       padding: 20,
//       alignItems: "center"
//     }}>

//       <Text style={{
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#c34646ff",           // 🔹 Title text color
//         marginBottom: 10,bottom:5,marginLeft:10
//       }}>
//         Confirm Exit
//       </Text>
//       <MaterialIcons name="crisis-alert" size={24} style={styles.icon2} />
//        <Divider style={styles.divider} />

//       <Text style={{
//         fontSize: 15,
//         // fontFamily:fonts.FONT_MEDIUM,
//         color: "#5e5d5dff",           // 🔹 Message text color
//         marginBottom: 20,
//         textAlign: "center",bottom:30
//       }}>
//         Are you sure you want to exit?
//       </Text>

//       <View style={{ flexDirection: "row", justifyContent: "space-between" ,bottom:25}}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#bcc6fbff",   // 🔹 Button bg
//             paddingVertical: 10,
//             paddingHorizontal: 30,
//             borderRadius: 15,
//             marginRight: 10
//           }}
//           onPress={() => setCustomAlertVisible(false)}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>No</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             backgroundColor: "#e53935",   // 🔹 Button bg
//             paddingVertical: 10,
//             paddingHorizontal: 30,
//             borderRadius: 15,marginLeft: 10
//           }}
//           onPress={() =>navigation.navigate('Login')}
//         >
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>Yes</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// </Modal>
//     </View>

//     </SafeAreaView>
//   );
// };

// export default InstituteListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: "center",
//     padding: 3,
//   },
//   topRow: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 25,
//     marginBottom: 30,
//   },
//   headerText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//     icon2: {
//     right: 65,bottom:40, color: "#981313ff"
//   },
//   divider: {
//     height: 1, backgroundColor: '#5b5959ff', marginVertical: 10, width: '115%',bottom:35,
//   },
//   circleIcon: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: "#FFD700",right:20
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#FFD700",
//     marginBottom: 20,
//    marginLeft:140,
//   },
//   cardWrapper: {
//     flex:1,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 15,
//     padding: 10,
//      height: "100%",width:'95%',
//     marginTop: 80,marginLeft:12
//   },
//   noData: {
//     alignItems: "center",
//     marginTop: 50,
//   },
//   noDataText: {
//     marginTop: 8,
//     color: "#fff",
//     fontSize: 16,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     borderWidth: 1,
//     marginTop:80,bottom:40,
//     height:'47%',width:'100%',
//     borderColor: "#830009",
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//     marginRight: 10,
//   },
//   schoolName: {
//     letterSpacing:1,
//     fontSize: 14,
//     color: "#830009",
//     fontWeight: "600",
//     marginLeft:-90,
//   },
//   schoolAddress: {
//     flex:1,
//     right:30,
//     top:5,
//     fontSize: 12,
//     color: "#830009",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 20,
//     fontSize: 14,
//     color: "#fff", marginLeft:100,
//   },
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
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // adjust import
import { fonts } from "../root/config";
import { useDispatch } from "react-redux";
import { logoutAction } from "../root/userAction";
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
const wp = (p: number) => (width * p) / 100;
const hp = (p: number) => (height * p) / 100;

const InstituteListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [orgList, setOrgList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileNo, setMobileNo] = useState<string>("");
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [isChecking, setIsChecking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  // ✅ Load institutes
  const loadInstitutes = async () => {
    try {
      const storedMobile = await AsyncStorage.getItem("mobile");
      setMobileNo(storedMobile || "");

      const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
      const response = await axios.post(url);

      if (response.status === 200 && response.data?.isSuccess) {
        setOrgList(response.data.orgList || []);
        console.log('response.data.orgList==>', response.data.orgList)
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
    setCustomAlertVisible(false); // hide popup
    setTimeout(() => {
      BackHandler.exitApp();
    }, 100); // wait briefly for UI to update
  };


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
    setModalVisible(true);

  };


let backHandlerListener: any = null;
let updateAlertShown = false;

const checkForUpdate = async () => {
  try {
    const currentVersion = VersionCheck.getCurrentVersion();

    // 🔹 Backend check (SOURCE OF TRUTH)
    const response = await axios.post(
      `https://www.vtsmile.in/app/api/version_check_api?cuarr_version=${currentVersion}`
    );

    if (!response.data?.isSuccess) return;

    const { isUpdateRequired } = response.data;

    console.log('Backend force update:', isUpdateRequired);

    if (!isUpdateRequired) {
      // Restore back button if update not required
      if (backHandlerListener) {
        backHandlerListener.remove();
        backHandlerListener = null;
      }
      updateAlertShown = false;
      return;
    }

    // Prevent multiple alerts
    if (updateAlertShown) return;
    updateAlertShown = true;

    const playStoreUrl = await VersionCheck.getPlayStoreUrl();

    // 🔒 Disable hardware back button
    backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    const showUpdateAlert = () => {
      Alert.alert(
        'Update Required',
        'A new version of SMILE app is available. Please update to continue.',
        [
          {
            text: 'UPDATE NOW',
            onPress: async () => {
              const supported = await Linking.canOpenURL(playStoreUrl);
              if (supported) {
                Linking.openURL(playStoreUrl);
              }
              // Re-show alert if user comes back
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
}
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await requestPermissions();
      await loadInstitutes();
      await checkForUpdate();
      setLoading(false);
    };
    init();

    return () => {
      if (backHandlerListener) {
      backHandlerListener.remove();
      backHandlerListener = null;
    }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadInstitutes();

      const backAction = () => {
        setCustomAlertVisible(true);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
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
          {/* <Text style={styles.appName}>e-SCHOOL</Text> */}
          {/* <Image
            source={require("../assest/vt-logo-login.png")}
            style={styles.logo}
          /> */}
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
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#6A11CB',marginBottom:-30}}>
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

      {/* Custom Exit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
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
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
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
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={{ flexDirection: 'row', }}>
              <MaterialIcons name="crisis-alert" size={28} style={styles.icon2} />
              <Text style={styles.modalTitle}>Confirm Exit</Text>
            </View>

            <Divider style={styles.divider} />
            <Text style={styles.modalText}>Are you sure you want to exit?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#bcc6fbff" }]}
                onPress={() => setCustomAlertVisible(false)}
              >
                <Text style={styles.modalBtnText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#e53935" }]}
                onPress={handleExitApp}
              >
                <Text style={styles.modalBtnText}>Yes</Text>
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
    marginVertical: hp(12),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "#830009",
    padding: wp(3),
  },
  cardHeader: {
    // flexDirection: "row",
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
    textAlign: 'center', fontFamily: fonts.ROBOTO_BOLD
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
