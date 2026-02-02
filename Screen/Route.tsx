// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   // FlatList,
//   Image,
//   ActivityIndicator,
//   StyleSheet,
//   // ScrollView,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import SegmentedControlTab from 'react-native-segmented-control-tab';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fonts, hp, normalize, wp } from "../root/config";
// import { Calendar, } from 'react-native-calendars';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// interface BusRouteProps {
//   route: any;
//   navigation: any;
// }

// const RouteScreen: React.FC<BusRouteProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [tab, setTab] = useState("Morning");
//   const [loading, setLoading] = useState(true);

//   const [studentData, setStudentData] = useState({});
//   const [listRoute, setListRoute] = useState([]);
//   const [reverseListRoute, setReverseListRoute] = useState([]);
//   const [routeName, setRouteName] = useState("");
//   const [mngStartFrom, setMngStartFrom] = useState("");
//   const [mngEndFrom, setMngEndFrom] = useState("");
//   const [evgStartFrom, setEvgStartFrom] = useState("");
//   const [evgEndFrom, setEvgEndFrom] = useState("");
//     const [showCalendar, setShowCalendar] = useState(false);
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedDate, setSelectedDate] = useState<string>(today);
//   const [homeworkDate, setHomeworkDate] = useState<Date>(new Date());
//   const getStudent = async () => {
//     const url = `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobile}`;
//     try {
//       const res = await axios.post(url);
//       console.log("res.data.studDetails==>",res.data.studDetails)
//       if (res.data.isSuccess && res.data.studDetails) {
//         setStudentData(res.data.studDetails[0]);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const getBusRoute = async () => {
//     const url = `https://www.vtsmile.in/app/api/students/students_bus_route_list_api?orgId=${orgid}&studId=${studentId}&mobile_no=${mobile}`;

//     try {
//       const res = await axios.post(url);
//       if (res.data.isSuccess) {
//         setListRoute(res.data.stoppings || []);
//         setReverseListRoute((res.data.stoppings || []).slice().reverse());
//         setRouteName(res.data.routeName || "");
//         setMngStartFrom(res.data.startstopping || "");
//         setMngEndFrom(res.data.endchoolStoping || "");
//         setEvgStartFrom(res.data.endchoolStoping || "");
//         setEvgEndFrom(res.data.startstopping || "");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       await getStudent();
//       await getBusRoute();
//       setLoading(false);
//     };
//     fetch();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#830009" />
//         <Text style={{ marginTop: 10 }}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.main}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={normalize(22)} color="#fff" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Bus Route</Text>
//       </View>



//       {/* TAB BUTTONS */}
//       <View style={styles.tabWrapper}>
//         <TouchableOpacity
//           style={[styles.tabBtn, tab === "Morning" && styles.tabActive]}
//           onPress={() => setTab("Morning")}
//         >
//           <Text style={[styles.tabText, tab === "Morning" && styles.tabTextActive]}>
//             Morning
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tabBtn, tab === "Evening" && styles.tabActive]}
//           onPress={() => setTab("Evening")}
//         >
//           <Text style={[styles.tabText, tab === "Evening" && styles.tabTextActive]}>
//             Evening
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* LIST AREA */}
//       <View style={styles.listContainer}>
//         {/* TOP STARTING POINT */}
//         <View style={styles.topStartBox}>
//           {tab === "Morning" ?
//             <Image
//               source={require("../assest/school_15292710.png")}
//               style={styles.schoolIcon}
//             /> :
//             <Image
//               source={require("../assest/icons8-school-50.png")}
//               style={styles.schoolIcon}
//             />

//           }
//           <Text style={styles.startText}>
//             {tab === "Morning" ? mngStartFrom : evgStartFrom}
//           </Text>
//         </View>

//         {/* ROUTE LIST */}
//         <FlatList
//           data={tab === "Morning" ? listRoute : reverseListRoute}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.routeCard}>
//               <View style={styles.leftIndicator}>
//                 <View style={styles.line} />
//                 <Image
//                   source={require("../assest/location_7263478.png")}
//                   style={styles.locIcon}
//                 />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.stopName}>{item.stoppingName}</Text>
//                 <Text style={styles.stopTime}>
//                   Time: {tab === "Morning" ? item.morning_time : item.evening_time}
//                 </Text>
//               </View>
//             </View>
//           )}
//           ListEmptyComponent={
//             <View style={styles.noDataSection}>
//               <Image
//                 source={require("../assest/smile-No-Data-Found-BG.png")}
//                 style={styles.noDataImage}
//               />
//               <Text style={styles.noDataText}>No route data found</Text>
//             </View>
//           }
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   main: { flex: 1 },

//   loading: { flex: 1, justifyContent: "center", alignItems: "center" },

//   header: {
//     height: hp(7),
//     backgroundColor: "purple",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp(4),
//   },

//   backBtn: { width: wp(10) },

//   headerTitle: {
//     flex: 1,
//     textAlign: "center",
//     fontSize: normalize(18),
//     color: "#fff",
//     fontFamily: fonts.ROBOTO_BOLD,
//     right: wp(2)
//   },

//   tabWrapper: {
//     flexDirection: "row",
//     marginTop: hp(1.5),
//     marginHorizontal: wp(4),
//     backgroundColor: "#ede6fc",
//     borderRadius: 12,
//     padding: 4,
//   },

//   tabBtn: {
//     flex: 1,
//     paddingVertical: hp(1.5),
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   tabActive: { backgroundColor: "#ffbe75" },

//   tabText: {
//     fontSize: normalize(14),
//     fontWeight: "600",
//     color: "#000",
//     fontFamily: fonts.ROBOTO_BOLD,
//   },

//   tabTextActive: { color: "#fff", fontFamily: fonts.ROBOTO_BOLD, },

//   listContainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     marginTop: hp(2),
//     marginHorizontal: wp(3),
//     borderRadius: 15,
//     padding: wp(3),
//   },

//   topStartBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp(2),
//   },

//   schoolIcon: {
//     width: wp(10),
//     height: wp(10),
//   },

//   startText: {
//     marginLeft: wp(4),
//     fontSize: normalize(16),
//     fontFamily: fonts.FONT_BOLD,
//     color: "green",
//   },

//   routeCard: {
//     flexDirection: "row",
//     marginBottom: hp(2),
//     padding: wp(3),
//     backgroundColor: "#f9f9f9",
//     borderRadius: 12,
//     elevation: 2,
//   },

//   leftIndicator: {
//     alignItems: "center",
//     marginRight: wp(4),
//   },

//   line: {
//     width: 2,
//     height: hp(6),
//     backgroundColor: "#ff9800",
//     marginBottom: 4,
//   },

//    field: {
//     width: "100%",
//     marginTop: 5,
//     marginBottom: 20,
//     backgroundColor: "#1c2ae7ff",
//     borderRadius: 12,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//     label: {
//     fontSize: 16,
//     color: '#ffffffff',
//     marginBottom: 6,
//     fontFamily: fonts.FONT_BOLD
//   },
//     dropdown: {
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     minHeight: 45,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   locIcon: {
//     width: wp(9),
//     height: wp(9),
//   },

//   stopName: {
//     fontSize: normalize(16),
//     color: "#0e100fff",
//     fontFamily: fonts.ROBOTO_BOLD,
//   },

//   stopTime: {
//     fontSize: normalize(13),
//     color: "#ba1111",
//     fontFamily: fonts.ROBOTO_BOLD,
//     marginTop: 4,
//   },

//   noDataSection: {
//     alignItems: "center",
//     paddingVertical: hp(3),
//   },

//   noDataImage: { width: wp(30), height: wp(30) },

//   noDataText: { marginTop: 10, color: "#7956E2", fontSize: normalize(14) },
// });

// export default RouteScreen;





// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   Modal,
// } from "react-native";

// import MapView, {
//   Marker,
//   Polyline,
//   PROVIDER_GOOGLE,
//   AnimatedRegion,
// } from 'react-native-maps';
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fonts, hp, normalize, wp } from "../root/config";
// import { Calendar } from 'react-native-calendars';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

// interface BusRouteProps {
//   route: any;
//   navigation: any;
// }

// interface TrackingDetail {
//   vehicle_track_Id: string;
//   driver_Id: string;
//   route_Id: string;
//   stop_Id: string;
//   stop_lat: string;
//   stop_lng: string;
//   reached_date: string;
//   reached_time: string;
//   route_name: string;
//   stop_name: string;
// }

// const DEFAULT_COORDINATE = {
//   latitude: 13.053215,
//   longitude: 80.224194,
// };

// const RouteScreen: React.FC<BusRouteProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const mapRef = useRef<MapView>(null);
//   const [tab, setTab] = useState("morning");
//   const [loading, setLoading] = useState(true);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedDate, setSelectedDate] = useState<string>(today);
//   const [showStopModal, setShowStopModal] = useState(false);
//   const [selectedStop, setSelectedStop] = useState<any>(null);

//   const [trackingData, setTrackingData] = useState<TrackingDetail[]>([]);
//   const [routeName, setRouteName] = useState('');
//   const [uniqueStops, setUniqueStops] = useState<any[]>([]);
//   const [lastReachedStop, setLastReachedStop] = useState<any>(null);
//   const [busLocation, setBusLocation] = useState<any>(null);

//   const animatedCoordinate = useRef(
//     new AnimatedRegion({
//       latitude: DEFAULT_COORDINATE.latitude,
//       longitude: DEFAULT_COORDINATE.longitude,
//       latitudeDelta: 0,
//       longitudeDelta: 0,
//     })
//   ).current;

//   useEffect(() => {
//     LocationServicesDialogBox.checkLocationServicesIsEnabled({
//       message: `
//       <h6 style="margin:0 0 8px 0;">For a better experience, your device will need to use Location Accuracy</h6>
//       <p style="margin:8px 0;">The following settings should be on:</p>
//       <ul style="padding-left:18px; margin:8px 0;">
//         <h6><b>Device location</b></h6>
//         <h6>Location Accuracy, which provides more accurate location for apps and services.</h6>
//       </ul>
//       <p style="font-size:13px;">
//         You can change this at any time in location settings.
//         <br/><br/>
//         <a href="#" style="color:#4285F4;">Learn more</a>
//       </p>
//     `,
//       ok: "Turn on",
//       cancel: "No, thanks",
//       enableHighAccuracy: true,
//       showDialog: true,
//       openLocationServices: true,
//       preventOutSideTouch: false,
//       preventBackClick: false,
//       providerListener: false,
//     })
//       .then(success => console.log(success))
//       .catch(error => console.log(error.message));

//     return () => {
//       LocationServicesDialogBox.stopListener();
//     };
//   }, []);

//   useEffect(() => {
//     loadTrackingDetails();
//   }, [selectedDate, tab]);

//   const loadTrackingDetails = async () => {
//     try {
//       setLoading(true);

//       const url = `https://www.vtsmile.in/app/api/students/student_vehicle_tracking_api?orgId=${orgid}&studentId=${studentId}&date=${selectedDate}&trackingType=${tab}`;
//       const result = await axios.post(url);

//       if (result.data.isSuccess && result.data.tracking_details?.length > 0) {
//         const details: TrackingDetail[] = result.data.tracking_details;
//         setTrackingData(details);
//         setRouteName(result.data.route_name || details[0]?.route_name || '');

//         // Group stops by stop_Id to get unique stops with latest reached time
//         const stopMap = new Map();

//         details.forEach((item) => {
//           const stopId = item.stop_Id;
//           const existingStop = stopMap.get(stopId);

//           // Keep the entry with the latest reached_time
//           if (!existingStop || 
//               (item.reached_time && item.reached_time > existingStop.reached_time)) {
//             stopMap.set(stopId, {
//               ...item,
//               latitude: Number(item.stop_lat),
//               longitude: Number(item.stop_lng),
//               isReached: !!item.reached_time,
//             });
//           }
//         });

//         const stopsArray = Array.from(stopMap.values());
//         setUniqueStops(stopsArray);

//         // Find the last reached stop (most recent time)
//         const reachedStops = stopsArray
//           .filter(s => s.isReached)
//           .sort((a, b) => {
//             const timeA = a.reached_time || "00:00:00";
//             const timeB = b.reached_time || "00:00:00";
//             return timeB.localeCompare(timeA);
//           });

//         const lastStop = reachedStops[0];
//         setLastReachedStop(lastStop);

//         if (lastStop) {
//           const busPos = {
//             latitude: lastStop.latitude,
//             longitude: lastStop.longitude,
//           };
//           setBusLocation(busPos);

//           animatedCoordinate.timing({
//             latitude: busPos.latitude,
//             longitude: busPos.longitude,
//             duration: 1000,
//             useNativeDriver: false,
//           }).start();
//         }

//         // Auto fit all stops on map
//         const coordinates = stopsArray.map(s => ({
//           latitude: s.latitude,
//           longitude: s.longitude,
//         }));

//         setTimeout(() => {
//           if (coordinates.length > 0) {
//             mapRef.current?.fitToCoordinates(coordinates, {
//               edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
//               animated: true,
//             });
//           }
//         }, 500);
//       } else {
//         setTrackingData([]);
//         setUniqueStops([]);
//         setLastReachedStop(null);
//         setBusLocation(null);
//       }
//     } catch (err) {
//       console.log("Error loading tracking details:", err);
//       Alert.alert("Error", "Failed to load tracking data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getNextUnreachedStop = () => {
//     return uniqueStops.find(stop => !stop.isReached);
//   };

//   if (loading) {
//     return (
//       <ActivityIndicator 
//         size="large" 
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }} 
//       />
//     );
//   }

//   return (
//     <SafeAreaView style={styles.main}>
//       <View style={{ flex: 1, backgroundColor: '#fff' }}>
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//             <Icon name="arrow-back" size={normalize(22)} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bus Route</Text>
//         </View>

//         <View style={{ flex: 1, padding: 10 }}>
//           {/* Date Selector */}
//           <View style={styles.field}>
//             <Text style={styles.label}>Select Date</Text>
//             <TouchableOpacity
//               style={styles.dropdown}
//               onPress={() => setShowCalendar(!showCalendar)}
//             >
//               <MaterialIcons name="calendar-month" size={25} style={{ color: '#5d5959ff', top: 10 }} />
//               <Text style={{ fontSize: 15, color: '#645f5fff', left: 35, bottom: 12 }}>
//                 {selectedDate ? new Date(selectedDate).toDateString() : "Select Date"}
//               </Text>
//             </TouchableOpacity>

//             {showCalendar && (
//               <Calendar
//                 onDayPress={(day) => {
//                   setSelectedDate(day.dateString);
//                   setShowCalendar(false);
//                 }}
//                 current={selectedDate || today}
//                 markedDates={{
//                   [selectedDate]: {
//                     selected: true,
//                     marked: true,
//                     disableTouchEvent: true,
//                     selectedColor: "orange",
//                     selectedTextColor: "white",
//                   },
//                   ...(selectedDate !== today && {
//                     [today]: {
//                       customStyles: {
//                         container: {
//                           backgroundColor: '#3a0ee7ff',
//                           borderRadius: 10,
//                         },
//                         text: {
//                           color: '#fff',
//                           fontWeight: 'bold',
//                         },
//                       },
//                     },
//                   }),
//                 }}
//                 markingType={'custom'}
//               />
//             )}
//           </View>

//           {/* Tab Buttons */}
//           <View style={styles.tabWrapper}>
//             <TouchableOpacity
//               style={[styles.tabBtn, tab === "morning" && styles.tabActive]}
//               onPress={() => setTab("morning")}
//             >
//               <Text style={[styles.tabText, tab === "morning" && styles.tabTextActive]}>
//                 Morning
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.tabBtn, tab === "evening" && styles.tabActive]}
//               onPress={() => setTab("evening")}
//             >
//               <Text style={[styles.tabText, tab === "evening" && styles.tabTextActive]}>
//                 Evening
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Route Name Display */}
//           {routeName && (
//             <View style={styles.routeNameBox}>
//               <Text style={styles.routeNameText}>Route: {routeName}</Text>
//               {lastReachedStop && (
//                 <Text style={styles.lastStopText}>
//                   Last Stop: {lastReachedStop.stop_name} at {lastReachedStop.reached_time}
//                 </Text>
//               )}
//             </View>
//           )}

//           {/* Map View */}
//           <MapView
//             ref={mapRef}
//             provider={PROVIDER_GOOGLE}
//             style={{ flex: 1, borderRadius: 12, marginTop: 10 }}
//             initialRegion={{
//               ...DEFAULT_COORDINATE,
//               latitudeDelta: 0.05,
//               longitudeDelta: 0.05,
//             }}
//             showsCompass={true}
//           >
//             {/* Draw polyline connecting all stops */}
//             {uniqueStops.length > 1 && (
//               <Polyline
//                 coordinates={uniqueStops.map(s => ({
//                   latitude: s.latitude,
//                   longitude: s.longitude,
//                 }))}
//                 strokeWidth={4}
//                 strokeColor="#1abc9c"
//                 lineDashPattern={[10, 5]}
//               />
//             )}

//             {/* Stop Markers */}
//             {uniqueStops.map((item, index) => (
//               <Marker
//                 key={`${item.stop_Id}-${index}`}
//                 coordinate={{
//                   latitude: item.latitude,
//                   longitude: item.longitude,
//                 }}
//                 title={item.stop_name}
//                 description={
//                   item.isReached
//                     ? `Reached at ${item.reached_time}`
//                     : "Not reached yet"
//                 }
//                 pinColor={item.isReached ? "green" : "red"}
//                 onPress={() => {
//                   setSelectedStop(item);
//                   setShowStopModal(true);
//                 }}
//               />
//             ))}

//             {/* Bus Location (at last reached stop) */}
//             {busLocation && (
//               <Marker.Animated coordinate={animatedCoordinate}>
//                 <Text style={{ fontSize: 35 }}>🚌</Text>
//               </Marker.Animated>
//             )}
//           </MapView>

//           {/* Horizontal Stop List */}
//           <View style={{ height: 100, backgroundColor: "#fff", marginTop: 10 }}>
//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={uniqueStops}
//               keyExtractor={(item, i) => `${item.stop_Id}-${i}`}
//               contentContainerStyle={{ paddingHorizontal: 10 }}
//               renderItem={({ item, index }) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     setSelectedStop(item);
//                     setShowStopModal(true);
//                   }}
//                   style={[
//                     styles.stopChip,
//                     item.isReached && styles.stopChipReached,
//                     lastReachedStop?.stop_Id === item.stop_Id && styles.stopChipActive,
//                   ]}
//                 >
//                   <Text style={styles.stopChipText} numberOfLines={1}>
//                     {item.stop_name}
//                   </Text>
//                   {item.isReached && (
//                     <Text style={styles.stopTimeText}>{item.reached_time}</Text>
//                   )}
//                   <Text style={{ fontSize: 10, color: "#555", marginTop: 2 }}>
//                     {item.isReached ? "✓ Reached" : "⏳ Pending"}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>

//           {/* Stop Details Modal */}
//           <Modal visible={showStopModal} animationType="slide" transparent>
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalBox}>
//                 <Text style={styles.modalTitle}>
//                   {selectedStop?.stop_name}
//                 </Text>

//                 <View style={styles.modalContent}>
//                   <Text style={styles.modalLabel}>Route:</Text>
//                   <Text style={styles.modalValue}>{selectedStop?.route_name}</Text>
//                 </View>

//                 <View style={styles.modalContent}>
//                   <Text style={styles.modalLabel}>Status:</Text>
//                   <Text style={[
//                     styles.modalValue,
//                     { color: selectedStop?.isReached ? "green" : "orange" }
//                   ]}>
//                     {selectedStop?.isReached ? "Reached" : "Not Reached"}
//                   </Text>
//                 </View>

//                 {selectedStop?.isReached && (
//                   <>
//                     <View style={styles.modalContent}>
//                       <Text style={styles.modalLabel}>Reached Time:</Text>
//                       <Text style={styles.modalValue}>{selectedStop?.reached_time}</Text>
//                     </View>

//                     <View style={styles.modalContent}>
//                       <Text style={styles.modalLabel}>Reached Date:</Text>
//                       <Text style={styles.modalValue}>{selectedStop?.reached_date}</Text>
//                     </View>
//                   </>
//                 )}

//                 <View style={styles.modalContent}>
//                   <Text style={styles.modalLabel}>Coordinates:</Text>
//                   <Text style={styles.modalValue}>
//                     {selectedStop?.latitude.toFixed(5)}, {selectedStop?.longitude.toFixed(5)}
//                   </Text>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.modalBtn}
//                   onPress={() => setShowStopModal(false)}
//                 >
//                   <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from "react-native";

import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts, hp, normalize, wp } from "../root/config";
import { Calendar, } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


interface BusRouteProps {
  route: any;
  navigation: any;
}

const DEFAULT_COORDINATE = {
  latitude: 13.053215,
  longitude: 80.224194,
};

const RouteScreen: React.FC<BusRouteProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const mapRef = useRef<MapView>(null);
  const [tab, setTab] = useState("morning");
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [homeworkDate, setHomeworkDate] = useState<Date>(new Date());
  const busLocationRef = useRef<any>(null);
  const reachedStopsRef = useRef<Set<number>>(new Set());
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);
  const [showStopModal, setShowStopModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<any>(null);

  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [routeName, setRouteName] = useState('');
  const [stopName, setStopName] = useState('');
  const [reachedTime, setReachedTime] = useState('');
  const [path, setPath] = useState<any[]>([]);
  const [busLocation, setBusLocation] = useState<any>(null);
  // const [locationPromptShown, setLocationPromptShown] = useState(false);

  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: DEFAULT_COORDINATE.latitude,
      longitude: DEFAULT_COORDINATE.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;
  useEffect(() => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: `
      <h6 style="margin:0 0 8px 0;">For a better experience, your device will need to use Location Accuracy</h6>

      <p style="margin:8px 0;">The following settings should be on:</p>

      <ul style="padding-left:18px; margin:8px 0;">
        <h6><b>Device location</b></h6>
        <h6>
          Location Accuracy, which provides more accurate location for apps and services.
        </h6>
      </ul>

      <p style="font-size:13px;">
        You can change this at any time in location settings.
        <br/><br/>
        <a href="#" style="color:#4285F4;">Learn more</a>
      </p>
    `,
          ok: "Turn on",
          cancel: "No, thanks",
          enableHighAccuracy: true,
          showDialog: true,
          openLocationServices: true,
          preventOutSideTouch: false,
          preventBackClick: false,
          providerListener: false,
    })
      .then(success => console.log(success))
      .catch(error => console.log(error.message));

    return () => {
      LocationServicesDialogBox.stopListener();
    };
  }, []); // ✅ EMPTY dependency → runs once


  useEffect(() => {
    loadTrackingDetails();
  }, [selectedDate, tab]);
  // useEffect(() => {
  //   loadTrackingDetails();
  // }, [selectedDate, tab]);


  const loadTrackingDetails = async () => {
    try {
      setLoading(true);

      const url = `https://www.vtsmile.in/app/api/students/student_vehicle_tracking_api?orgId=${orgid}&studentId=${studentId}&date=${selectedDate}&trackingType=${tab}`
      const result = await axios.post(url);
      //   console.log('resuly==>',result)
      //  console.log('result.data.tracking_details===>',result.data.tracking_details)
      if (result.data.isSuccess && result.data.tracking_details?.length > 0) {
        const details = result.data.tracking_details;

        setTrackingData(details);
        setRouteName(result.data.route_name);
        setStopName(result.data.stop_name);
        setReachedTime(result.data.reached_time);

        // 👉 Convert API data to map coordinates
        const coordinates = details.map((item: any) => ({
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }));

        setPath(coordinates);

        // 👉 Set last point as bus current location
        const lastPoint = coordinates[coordinates.length - 1];
        if (lastPoint) {
          setBusLocation(lastPoint);

          animatedCoordinate.timing({
            latitude: lastPoint.latitude,
            longitude: lastPoint.longitude,
            duration: 1000,
            useNativeDriver: false,
          }).start();

          // ✅ CHECK STOP ARRIVAL
          checkStopArrival(lastPoint.latitude, lastPoint.longitude);
        }

        // 👉 Auto fit route on map
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true,
          });
        }, 500);
      } else {
        setTrackingData([]);
        //  Alert.alert("No Data", "No tracking data available for this date and time.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Error",
        "Failed to load tracking data. Please check your connection and try again."
      );
      setTrackingData([]);
    } finally {
      setLoading(false);
    }
  };


  const getDistanceKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth radius
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };


  const calculateETA = (
    busLat: number,
    busLng: number,
    stopLat: number,
    stopLng: number
  ) => {
    const distanceKm = getDistanceKm(busLat, busLng, stopLat, stopLng);

    const avgSpeed = 30; // 🚍 km/hr (adjust if backend gives speed)
    const timeHours = distanceKm / avgSpeed;
    const minutes = Math.round(timeHours * 60);

    if (minutes <= 0) return "Arriving";
    if (minutes === 1) return "1 min";

    return `${minutes} mins`;
  };
  const getNextStopIndex = () => {
    return trackingData.findIndex(
      (_, index) => !reachedStopsRef.current.has(index)
    );
  };

  const isBusNearStop = (
    busLat: number,
    busLng: number,
    stopLat: number,
    stopLng: number
  ) => {
    const distanceKm = getDistanceKm(busLat, busLng, stopLat, stopLng);
    return distanceKm * 1000 <= 100; // 📍 100 meters
  };

  const alertedStopsRef = useRef<Set<number>>(new Set());

  const checkStopArrival = (busLat: number, busLng: number) => {
    trackingData.forEach((stop, index) => {
      if (reachedStopsRef.current.has(index)) return;
      if (alertedStopsRef.current.has(index)) return; // Don't alert again

      if (
        isBusNearStop(
          busLat,
          busLng,
          Number(stop.latitude),
          Number(stop.longitude)
        )
      ) {
        reachedStopsRef.current.add(index);
        alertedStopsRef.current.add(index);

        Alert.alert(
          "🚌 Bus Arrived",
          `Bus has reached ${stop.stop_name}`,
          [{ text: "OK" }]
        );
      }
    });
  };
  // const checkStopArrival = (busLat: number, busLng: number) => {
  //   trackingData.forEach((stop, index) => {
  //     if (reachedStopsRef.current.has(index)) return;

  //     if (
  //       isBusNearStop(
  //         busLat,
  //         busLng,
  //         Number(stop.latitude),
  //         Number(stop.longitude)
  //       )
  //     ) {
  //       reachedStopsRef.current.add(index);

  //       Alert.alert(
  //         "🚌 Bus Arrived",
  //         `Bus has reached ${stop.stop_name}`
  //       );
  //     }
  //   });
  // };


  // const getStopStatus = (item: any, index: number) => {
  //   if (reachedStopsRef.current.has(index)) {
  //     return {
  //       text: `Reached at ${item.reached_time || "--"}`,
  //       color: "green",
  //     };
  //   }

  //   if (busLocation) {
  //     return {
  //       text: `ETA ${calculateETA(
  //         busLocation.latitude,
  //         busLocation.longitude,
  //         Number(item.latitude),
  //         Number(item.longitude)
  //       )}`,
  //       color: "#ff9800",
  //     };
  //   }

  //   return { text: "Upcoming", color: "#999" };
  // };

  const getStopStatus = (item: any, index: number) => {
    // Already reached
    if (reachedStopsRef.current.has(index)) {
      return {
        text: `Reached at ${item.reached_time || "--"}`,
        color: "green",
      };
    }

    // Next stop (upcoming)
    if (busLocation && !reachedStopsRef.current.has(index)) {
      const nextStopIndex = getNextStopIndex();

      // Only show ETA for next stop or upcoming stops
      if (index >= nextStopIndex) {
        return {
          text: `ETA ${calculateETA(
            busLocation.latitude,
            busLocation.longitude,
            Number(item.latitude),
            Number(item.longitude)
          )}`,
          color: "#ff9800",
        };
      }
    }

    return { text: "Upcoming", color: "#999" };
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
  }




  return (
    <SafeAreaView style={styles.main}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>


        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={normalize(22)} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bus Route</Text>
        </View>



        <View style={{ flex: 1, padding: 10 }}>


          <View style={styles.field}>
            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <MaterialIcons name="calendar-month" size={25} style={{ color: '#5d5959ff', top: 10 }} />
              <Text style={{ fontSize: 15, color: '#645f5fff', left: 35, bottom: 12 }}>
                {selectedDate ? new Date(selectedDate).toDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setHomeworkDate(new Date(day.dateString));
                  setShowCalendar(false);
                }}

                current={selectedDate || today}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    marked: true,
                    disableTouchEvent: true,
                    selectedColor: "orange",
                    selectedTextColor: "white",
                  },
                  ...(selectedDate !== today && {
                    [today]: {
                      customStyles: {
                        container: {
                          backgroundColor: '#3a0ee7ff',
                          borderRadius: 10,
                        },
                        text: {
                          color: '#fff',
                          fontWeight: 'bold',
                        },
                      },
                    },
                  }),
                }}
                markingType={'custom'}
              />
            )}
          </View>

          <View >

            {/* TAB BUTTONS */}
            <View style={styles.tabWrapper}>
              <TouchableOpacity
                style={[styles.tabBtn, tab === "morning" && styles.tabActive]}
                onPress={() => setTab("morning")}
              >
                <Text style={[styles.tabText, tab === "morning" && styles.tabTextActive]}>
                  Morning
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabBtn, tab === "evening" && styles.tabActive]}
                onPress={() => setTab("evening")}
              >
                <Text style={[styles.tabText, tab === "evening" && styles.tabTextActive]}>
                  Evening
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              ...DEFAULT_COORDINATE,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsCompass={true}
          >

            {path.length > 1 && (
              <Polyline
                coordinates={path}
                strokeWidth={5}
                strokeColor="#1abc9c"
              />
            )}
            {trackingData.map((item, index) => {
              const isReached = reachedStopsRef.current.has(index);

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: Number(item.latitude),
                    longitude: Number(item.longitude),
                  }}
                  title={item.stop_name}
                  description={
                    isReached
                      ? `Reached at ${item.reached_time}`
                      : `ETA: ${busLocation
                        ? calculateETA(
                          busLocation.latitude,
                          busLocation.longitude,
                          Number(item.latitude),
                          Number(item.longitude)
                        )
                        : "--"
                      }`
                  }
                  pinColor={isReached ? "green" : "red"}   // ✅ MARKING
                />
              );
            })}


            {/* {trackingData.map((item, index) => (
  <Marker
    key={index}
    coordinate={{
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    }}
    title={item.stop_name}
    description={`Reached at ${item.reached_time}`}
  />
))} */}
            {busLocation && (
              <Marker.Animated coordinate={animatedCoordinate}>
                <Text style={{ fontSize: 35 }}>🚌</Text>
              </Marker.Animated>
            )}



          </MapView>

          {/* 🔵 HORIZONTAL STOP LIST */}
          <View style={{ height: 90, backgroundColor: "#fff" }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={trackingData}
              keyExtractor={(_, i) => i.toString()}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              renderItem={({ item, index }) => {
                const isActive = selectedStopIndex === index;
                const isReached = reachedStopsRef.current.has(index);

                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("StopListScreen", {
                        trackingData,
                        busLocation,
                        reachedStops: Array.from(reachedStopsRef.current),
                        selectedStopIndex: index,
                      })
                    }

                    style={[
                      styles.stopChip,
                      isActive && styles.stopChipActive,
                      isReached && styles.stopChipReached,
                    ]}
                  >
                    <Text style={styles.stopChipText}>{item.stop_name}</Text>
                    <Text style={styles.stopChipText}>{item.reached_time}</Text>

                    <Text style={{ fontSize: 11, color: "#555" }}>
                      {isReached ? "Reached" : "Upcoming"}
                    </Text>
                  </TouchableOpacity>


                );
              }}
            />
          </View>





          <Modal visible={showStopModal} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>

                {/* <Image
        source={require("../assets/bus_stop.png")} // add image
        style={styles.modalImage}
        resizeMode="contain"
      /> */}

                <Text style={styles.modalTitle}>
                  {selectedStop?.stop_name}
                </Text>

                <Text style={styles.modalText}>
                  Reached Time: {selectedStop?.reached_time || "Not yet"}
                </Text>

                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => setShowStopModal(false)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>


        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#7c43bd' },
  stopChip: {
    padding: 8,
    top: 5,
    height: 80,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    alignItems: "center",
  },

  stopChipActive: {
    backgroundColor: "#ff9800",
  },

  stopChipReached: {
    backgroundColor: "#4caf50",
  },

  stopChipText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  detailsHeader: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  detailsSub: {
    fontSize: 14,
    color: "#ff9800",
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  modalImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },

  modalBtn: {
    marginTop: 15,
    backgroundColor: "#ff9800",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },


  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  stopCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    elevation: 2,
  },

  stopLeft: {
    alignItems: "center",
    marginRight: 12,
  },
  nextStopHighlight: {
    borderWidth: 2,
    borderColor: "#ff9800",
    backgroundColor: "#fff8e1",
  },
  reachedStop: {
    backgroundColor: "#e8f9f0",
  },

  stopIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6E44AC",
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "bold",
  },

  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: "#ddd",
    marginTop: 4,
  },

  stopCenter: {
    flex: 1,
  },

  stopRight: {
    marginLeft: 10,
  },

  stopName: {
    fontSize: 15,
    fontFamily: fonts.ROBOTO_BOLD,
    color: "#000",
  },

  stopTime: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: fonts.ROBOTO_BOLD,
  },

  header: {
    height: hp(7),
    backgroundColor: "#7c43bd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },

  backBtn: { width: wp(10) },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: normalize(18),
    color: "#fff",
    fontFamily: fonts.ROBOTO_BOLD,
    right: wp(2)
  },

  tabWrapper: {
    flexDirection: "row",
    marginTop: hp(1.5),
    marginHorizontal: wp(4),
    backgroundColor: "#ede6fc",
    borderRadius: 12,
    padding: 4,
  },
  button: {
    backgroundColor: "#6E44AC",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 1,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: hp(1.5),
    borderRadius: 10,
    alignItems: "center",
  },

  tabActive: { backgroundColor: "#ffbe75" },

  tabText: {
    fontSize: normalize(14),
    fontWeight: "600",
    color: "#000",
    fontFamily: fonts.ROBOTO_BOLD,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  tabTextActive: { color: "#fff", fontFamily: fonts.ROBOTO_BOLD, },

  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: hp(2),
    marginHorizontal: wp(3),
    borderRadius: 15,
    padding: wp(3),
  },

  topStartBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },

  schoolIcon: {
    width: wp(10),
    height: wp(10),
  },

  startText: {
    marginLeft: wp(4),
    fontSize: normalize(16),
    fontFamily: fonts.FONT_BOLD,
    color: "green",
  },

  routeCard: {
    flexDirection: "row",
    marginBottom: hp(2),
    padding: wp(3),
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    elevation: 2,
  },

  leftIndicator: {
    alignItems: "center",
    marginRight: wp(4),
  },

  line: {
    width: 2,
    height: hp(6),
    backgroundColor: "#ff9800",
    marginBottom: 4,
  },

  field: {
    width: "100%",
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#7c43bd",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#ffffffff',
    marginBottom: 6,
    fontFamily: fonts.FONT_BOLD
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 45,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  locIcon: {
    width: wp(9),
    height: wp(9),
  },

  noDataSection: {
    alignItems: "center",
    paddingVertical: hp(3),
  },

  noDataImage: { width: wp(30), height: wp(30) },

  noDataText: { marginTop: 10, color: "#7956E2", fontSize: normalize(14) },
});

export default RouteScreen;


