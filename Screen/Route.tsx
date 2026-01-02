
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
//   StyleSheet,
// } from "react-native";

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// interface BusRouteProps {
// route: any;
// navigation: any;
// }

// const RouteScreen: React.FC<BusRouteProps> = ({route, navigation}) => {
//     const { orgid, studentId, mobile } = route?.params || {};

//   const [loading, setLoading] = useState(true);
//   const [studentData, setStudentData] = useState({});
//   const [listRoute, setListRoute] = useState([]);
//   const [reverseListRoute, setReverseListRoute] = useState([]);

//   const [routeName, setRouteName] = useState("");
//   const [mngStartFrom, setMngStartFrom] = useState("");
//   const [mngEndFrom, setMngEndFrom] = useState("");
//   const [evgStartFrom, setEvgStartFrom] = useState("");
//   const [evgEndFrom, setEvgEndFrom] = useState("");

//   const getStudent = async () => {
//     const url = `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobile}`;

//     try {
//       const res = await axios.post(url);
//       if (res.data.isSuccess && res.data.studDetails) {
//         setStudentData(res.data.studDetails[0]);
//       }
//     } catch (err) {
//       console.log(err);
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
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     await getStudent();
//     await getBusRoute();
//     setTimeout(() => setLoading(false), 800);
//   };

//   // ----------------------------
//   // Morning Tab UI
//   // ----------------------------
//   const MorningRoute = () => (
//     <ScrollView style={{ padding: 12 }}>
//       {listRoute.length === 0 ? (
//         <NoData />
//       ) : (
//         <>
//           <Text style={styles.routeTitle}>Your Route - Starts Here</Text>

//           {listRoute.map((item, index) => (
//             <View key={index} style={styles.itemBox}>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Icon
//                   name={mngStartFrom === item.stoppingName ? "directions-walk" : "location-on"}
//                   size={22}
//                   color={mngStartFrom === item.stoppingName ? "red" : "#6a1b9a"}
//                 />

//                 <Text style={styles.stopText}>
//                   {item.stoppingName}
//                   {mngStartFrom === item.stoppingName ? " (Your Stopping)" : ""}
//                 </Text>
//               </View>

//               <Text style={styles.timeText}>
//                 {mngStartFrom === item.stoppingName
//                   ? "Your Time: "
//                   : "Time: "}
//                 {item.morning_time}
//               </Text>
//             </View>
//           ))}

//           <Text style={styles.routeEnd}>{mngEndFrom}</Text>
//         </>
//       )}
//     </ScrollView>
//   );

//   // ----------------------------
//   // Evening Tab UI
//   // ----------------------------
//   const EveningRoute = () => (
//     <ScrollView style={{ padding: 12 }}>
//       {reverseListRoute.length === 0 ? (
//         <NoData />
//       ) : (
//         <>
//           <Text style={styles.routeTitle}>Your Route Ends Here</Text>

//           {reverseListRoute.map((item, index) => (
//             <View key={index} style={styles.itemBox}>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Icon
//                   name={
//                     evgEndFrom === item.stoppingName ? "location-pin" : "location-on"
//                   }
//                   size={22}
//                   color={evgEndFrom === item.stoppingName ? "red" : "#6a1b9a"}
//                 />

//                 <Text style={styles.stopText}>
//                   {item.stoppingName}
//                   {evgEndFrom === item.stoppingName ? " (Your Stopping)" : ""}
//                 </Text>
//               </View>

//               <Text style={styles.timeText}>
//                 {evgEndFrom === item.stoppingName ? "Your Time: " : "Time: "}
//                 {item.evening_time}
//               </Text>
//             </View>
//           ))}

//           <Text style={styles.routeEnd}>Route Name: {routeName}</Text>
//         </>
//       )}
//     </ScrollView>
//   );

//   // Tab System
//   const layout = Dimensions.get("window");
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "morning", title: "Morning" },
//     { key: "evening", title: "Evening" },
//   ]);

//   const renderScene = SceneMap({
//     morning: MorningRoute,
//     evening: EveningRoute,
//   });

//   // No Data UI
//   const NoData = () => (
//     <View style={{ alignItems: "center", marginTop: 50 }}>
//       {/* <Image source={require("../assets/nodata.png")} style={{ width: 130, height: 130 }} /> */}
//       <Text style={{ fontSize: 16, fontWeight: "500" }}>
//         Sorry!, No route data found!
//       </Text>
//     </View>
//   );

//   // -----------------------------------
//   // MAIN UI
//   // -----------------------------------
//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       {loading ? (
//         <ActivityIndicator size="large" style={{ marginTop: 50 }} />
//       ) : (
//         <>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Bus Route - {routeName}</Text>
//           </View>

//           {/* TABS */}
//           {/* <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: layout.width }}
//             renderTabBar={(props) => (
//               <TabBar
//                 {...props}
//                 indicatorStyle={{ backgroundColor: "#fff" }}
//                 style={{ backgroundColor: "#7a52b1" }}
//               />
//             )}
//           /> */}
//         </>
//       )}
//     </View>
//   );
// };

// export default RouteScreen;

// // --------------------
// // STYLES
// // --------------------
// const styles = StyleSheet.create({
//   header: {
//     height: 100,
//     backgroundColor: "#7a52b1",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   routeTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "green",
//   },
//   itemBox: {
//     marginBottom: 16,
//     padding: 12,
//     backgroundColor: "#e8def8",
//     borderRadius: 10,
//     borderColor: "#900",
//     borderWidth: 1,
//   },
//   stopText: {
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#000",
//   },
//   timeText: {
//     marginTop: 5,
//     marginLeft: 35,
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#444",
//   },
//   routeEnd: {
//     marginTop: 20,
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#7a52b1",
//   },
// });



// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, Image } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { fonts } from '../root/config';



// interface BusRouteProps {
// route: any;
// navigation: any;
// }

// const RouteScreen: React.FC<BusRouteProps> = ({route, navigation}) => {
//     const { orgid, studentId, mobile } = route?.params || {};
//   const mapRef = useRef(null);
//   const chennaiRegion = {
//     latitude: 13.0484,
//     longitude: 80.2496,
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1,
//   };
//    const [isVisible, setIsVisible] = useState(true);
// //  const [selectedIndex, setSelectedIndex] = useState(0);
// const [showAll, setShowAll] = useState(false);

//   const [studentData, setStudentData] = useState<any>({});
//    const [listRoute, setListRoute] = useState<any[]>([]);
//   const [reverseListRoute, setReverseListRoute] = useState<any[]>([]);
//   const [routeName, setRouteName] = useState("");
//   const [mngStartFrom, setMngStartFrom] = useState("");
//   const [mngEndFrom, setMngEndFrom] = useState("");
//   const [evgStartFrom, setEvgStartFrom] = useState("");
//   const [evgEndFrom, setEvgEndFrom] = useState("");

//   const getStudent = async () => {
//     const url = `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobile}`;

//     try {
//       const res = await axios.post(url);
//       if (res.data.isSuccess && res.data.studDetails) {
//         setStudentData(res.data.studDetails[0]);
//       }
//     } catch (err) {
//       console.log(err);
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
//       console.log('res.data.stoppings',res.data.stoppings,'res.data.routeName ==>',res.data.routeName ,'res.data.endchoolStoping ==>',res.data.endchoolStoping )
//     } catch (err) {
//       console.log(err);
//     }
//   };



//   useEffect(() => {
//     const fetchData = async () => {
//       await getStudent();
//       await getBusRoute();
//       setIsVisible(false);
//     };
//     fetchData();
//   }, []);

//   if (isVisible) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* Top Bar */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerTitle}>Metropolitan Transport Corporation, Chennai LTD.</Text>
// //         <TouchableOpacity style={styles.sosButton}>
// //           <Text style={styles.sosText}>SOS</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Search Box */}
// //       <View style={styles.searchBox}>
// //         <Icon name="search" size={24} color="#999" />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter destination or bus number"
// //           value={search}
// //           onChangeText={setSearch}
// //         />
// //       </View>

// //  <MapView style={styles.map} initialRegion={chennaiRegion}>
// //   {listRoute.map((item, index) => (
// //     <Marker
// //       key={index}
// //       coordinate={{
// //         latitude: Number(item.latitude),
// //         longitude: Number(item.longitude),
// //       }}
// //       title={item.stop_name}
// //       description={`Seq: ${item.sequence}`}
// //     />
// //   ))}
// // </MapView>

// // <View style={styles.bottomPanel}>
// //   <Text style={styles.panelTitle}>Route: {routeName}</Text>

// //   {/* Horizontal Scroll Stops */}
// //   <FlatList
// //     horizontal
// //     data={listRoute}
// //     renderItem={({ item }) => (
// //       <View style={styles.stopCard}>
// //         <Text style={styles.stopName}>{item.stoppingName}</Text>
// //         <Text style={styles.stopInfo}>Morning Time: {item.morning_time || 'N/A'}</Text>
// //         <Text style={styles.stopInfo}>Evening Time: {item.evening_time || 'N/A'}</Text>
// //       </View>
// //     )}
// //     keyExtractor={(item, index) => index.toString()}
// //   />

// //   {/* See All Toggle */}
// //   <TouchableOpacity onPress={() => setShowAll(!showAll)}>
// //     <Text style={styles.seeAll}>{showAll ? "Hide" : "See All"}</Text>
// //   </TouchableOpacity>

// //   {/* FULL LIST (Vertical) */}
// //   {showAll && (
// //     <FlatList
// //       data={listRoute}
// //       style={{ marginTop: 10 }}
// //       renderItem={({ item }) => (
// //         <View style={styles.fullListCard}>
// //           <Text style={styles.stopName}>{item.stoppingName}</Text>
// //           <Text style={styles.stopInfo}>Morning: {item.morning_time || "N/A"}</Text>
// //           <Text style={styles.stopInfo}>Evening: {item.evening_time || "N/A"}</Text>
// //         </View>
// //       )}
// //       keyExtractor={(item, index) => index.toString()}
// //     />
// //   )}
// // </View>


// //     </SafeAreaView>
// <SafeAreaView style={styles.container}>


//   {/* Map with Live Bus & Stops */}
//   <MapView style={styles.map}
//    showsUserLocation={true}
//   ref={mapRef} 
//    provider={PROVIDER_GOOGLE}
//    loadingEnabled
//    initialRegion={chennaiRegion}>
//     {listRoute.map((item, index) => (
//       <Marker
//         key={index}
//         coordinate={{
//           latitude: Number(item.latitude),
//           longitude: Number(item.longitude),
//         }}
//         title={item.stoppingName}
//         description={`Morning: ${item.morning_time}`}
//       />
//     ))}

//     {/* Example Bus Live Location Marker */}
//     <Marker
//       coordinate={{
//         latitude: studentData?.bus_latitude
//           ? Number(studentData.bus_latitude)
//           : 13.0484,
//         longitude: studentData?.bus_longitude
//           ? Number(studentData.bus_longitude)
//           : 80.2496,
//       }}
//       pinColor="red"
//       title="Live Bus Location"
//     />
//   </MapView>

//   {/* Bottom Panel */}
//   <View style={styles.bottomPanel}>
//     <Text style={styles.panelTitle}>Route: {routeName}</Text>

//     {/* 🔹 IF showAll = FALSE → show horizontal list */}
//     {!showAll && (
//       <>
//         <FlatList
//           horizontal
//           data={listRoute}
//           renderItem={({ item }) => (
//             <View style={styles.stopCard}>
//               <Text style={styles.stopName1}>{item.stoppingName}</Text>
//               <Text style={styles.stopInfo3}>Morning: {item.morning_time || 'N/A'}</Text>
//               <Text style={styles.stopInfo3}>Evening: {item.evening_time || 'N/A'}</Text>
//             </View>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />

//         <TouchableOpacity onPress={() => setShowAll(true)}>
//           <Text style={styles.seeAll}>See All</Text>
//         </TouchableOpacity>
//       </>
//     )}

//     {/* 🔹 IF showAll = TRUE → show vertical list */}
//     {showAll && (
//       <View style={{ height: 350 }}>
//       {/* <ScrollView style={{ maxHeight: 400 }}> */}
//         <FlatList
//           data={listRoute}
//           //  style={{ maxHeight: 300 }}   

//           renderItem={({ item }) => (
//             <View>
//               <View style={{flexDirection:'row'}}>

//               <Image
//                    source={require('../assest/location_7263478.png')}
//                              style={{width:50,height:50,right:10,top:10}}
//                   />
//                   <Text style={styles.stopName}>{item.stoppingName}</Text>

//               </View>
//                  <Text style={styles.stopInfo}>Morning: {item.morning_time || 'N/A'}</Text>

//                 <Text style={styles.stopInfo1}>----------</Text>

//             </View>

//           )}
//           keyExtractor={(item, index) => index.toString()}
//               showsVerticalScrollIndicator={true}
//         />

//         <Text style={{color:'black',fontSize:16,fontFamily:fonts.FONT_BOLD, marginLeft:50}}>{mngEndFrom}</Text>

//         <TouchableOpacity onPress={() => setShowAll(false)}>
//           <Text style={styles.seeAll}>Hide</Text>
//         </TouchableOpacity>
//    {/* </ScrollView> */}
//       </View>
//     )}
//   </View>
// </SafeAreaView>

//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#222' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between', alignItems: 'center',
//     paddingHorizontal: 18, paddingTop: 12, paddingBottom: 6,
//     backgroundColor: '#fff'
//   },
//   fullListCard: {
//   backgroundColor: "#fff",
//   padding: 12,
//   borderRadius: 8,
//   marginVertical: 6,
//   elevation: 2
// },
//    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

//   headerTitle: { fontSize: 15, color: '#333', fontWeight: 'bold', flex: 1 },
//   sosButton: { backgroundColor: '#FFD600', padding: 8, borderRadius: 20 },
//   sosText: { color: '#333', fontWeight: 'bold', fontSize: 15 },
//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff', paddingHorizontal: 12,
//     margin: 10, borderRadius: 8
//   },
//   input: { flex: 1, padding: 10, color: '#222' },
//   map: { flex: 1, minHeight: 300 },
//   bottomPanel: {
//     backgroundColor: '#fff', paddingVertical: 12,
//     paddingHorizontal: 15, borderTopLeftRadius: 16, borderTopRightRadius: 16,
//     shadowColor: '#888', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1
//   },
//   panelTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 6 },
//   stopCard: {
//     backgroundColor: '#F2F2F2', padding: 12, borderRadius: 10,
//     marginRight: 8, minWidth: 120
//   },
//   stopName1: { fontWeight: 'bold', fontSize: 14, color: '#222'},
//    stopInfo3: { fontSize: 13, color: '#555',},
//   stopName: { fontWeight: 'bold', fontSize: 14, color: '#222' ,top:15,marginLeft:10},
//   stopInfo: { fontSize: 13, color: '#555',marginLeft:60,bottom:15},
//    stopInfo1: {  width: 2,
//     height: 110,
//     backgroundColor: '#bc1818ff',
//     marginLeft: 14, },
//   seeAll: { color: '#1573D9', marginTop: 4, fontWeight: 'bold', fontSize: 13 }
// });
// export default RouteScreen;

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  // FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  // ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Polygon,
} from 'react-native-maps';
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts, hp, normalize, wp } from "../root/config";
import { Calendar, } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from "react-native-element-dropdown";
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


  const loadTrackingDetails = async () => {
    try {
      setLoading(true);
     
      const url =`https://www.vtsmile.in/app/api/students/student_vehicle_tracking_api?orgId=${orgid}&studentId=${studentId}&date=${selectedDate}&trackingType=${tab}`
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
      }
    } catch (err) {
      console.log(err);
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

const checkStopArrival = (busLat: number, busLng: number) => {
  trackingData.forEach((stop, index) => {
    if (reachedStopsRef.current.has(index)) return;

    if (
      isBusNearStop(
        busLat,
        busLng,
        Number(stop.latitude),
        Number(stop.longitude)
      )
    ) {
      reachedStopsRef.current.add(index);

      Alert.alert(
        "🚌 Bus Arrived",
        `Bus has reached ${stop.stop_name}`
      );
    }
  });
};


const getStopStatus = (item: any, index: number) => {
  if (reachedStopsRef.current.has(index)) {
    return {
      text: `Reached at ${item.reached_time || "--"}`,
      color: "green",
    };
  }

  if (busLocation) {
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

  return { text: "Upcoming", color: "#999" };
};



  if (loading) {
    return <ActivityIndicator size="large"  style={{flex: 1, justifyContent: "center", alignItems: "center" }}/>;
  }




  return (
    <SafeAreaView style={styles.main}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={normalize(22)} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bus Route</Text>
      </View>



      <View style={{ flex:1,padding:10}}>

     
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
          style={[styles.tabBtn, tab === "Evening" && styles.tabActive]}
          onPress={() => setTab("Evening")}
        >
          <Text style={[styles.tabText, tab === "Evening" && styles.tabTextActive]}>
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
          : `ETA: ${
              busLocation
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

{/* <View style={{ flex: 1, backgroundColor: "#fff" }}>
  <FlatList
    data={trackingData}
    keyExtractor={(_, index) => index.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ padding: 12 }}
    renderItem={({ item, index }) => {
      const status = getStopStatus(item, index);
      const isReached = reachedStopsRef.current.has(index);
      const nextStopIndex = getNextStopIndex();
       const isNextStop = index === nextStopIndex;


      return (
        <TouchableOpacity
          style={[
            styles.stopCard,
            // isReached && { backgroundColor: "#e8f9f0" },
                isReached && styles.reachedStop,
                isNextStop && styles.nextStopHighlight, // 🔔 
          ]}
          onPress={() => {
            mapRef.current?.animateToRegion(
              {
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              800
            );
          }}
        >
          <View style={styles.stopLeft}>
            <Text style={styles.stopIndex}>{index + 1}</Text>
            <View style={styles.verticalLine} />
          </View>

          <View style={styles.stopCenter}>
            <Text style={styles.stopName}>{item.stop_name}</Text>
            <Text style={[styles.stopTime, { color: status.color }]}>
              {status.text}
            </Text>
          </View>

          <View style={styles.stopRight}>
            {isReached ? (
              <Text style={{ fontSize: 18 }}>✅</Text>
            ) : (
              <Text style={{ fontSize: 18 }}>🕒</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }}
  />
</View> */}



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
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1 },

  stopChip: {
 padding:8,
  top:5,
  height:80,
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

  stopName: {
    fontSize: normalize(16),
    color: "#0e100fff",
    fontFamily: fonts.ROBOTO_BOLD,
  },

  stopTime: {
    fontSize: normalize(13),
    color: "#ba1111",
    fontFamily: fonts.ROBOTO_BOLD,
    marginTop: 4,
  },

  noDataSection: {
    alignItems: "center",
    paddingVertical: hp(3),
  },

  noDataImage: { width: wp(30), height: wp(30) },

  noDataText: { marginTop: 10, color: "#7956E2", fontSize: normalize(14) },
});

export default RouteScreen;


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


// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
// } from "react-native";
// import MapView, { MarkerAnimated, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";
// import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

// interface BusRouteProps {
//   route: any;
//   navigation: any;
// }

// Geolocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: "always",
//   enableBackgroundLocationUpdates: false,
//   locationProvider: "auto",
// });

// const RouteScreen: React.FC<BusRouteProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [routes, setRoutes] = useState("Route 1");
//   const mapRef = useRef(null);
//   const watchIdRef = useRef<number | null>(null);

//   const [userCoordinates, setUserCoordinates] = useState({
//     latitude: 13.085493150294939,
//     longitude: 80.26317052336563,
//   });

//   const [routeCoordinates, setRouteCoordinates] = useState<
//     { latitude: number; longitude: number }[]
//   >([]);

//   const busMarker = useRef(
//     new AnimatedRegion({
//       latitude: 13.085493150294939,
//       longitude: 80.26317052336563,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     })
//   ).current;

//   // -----------------------------
//   // 🔹 Request Android Permission
//   // -----------------------------
//   const requestLocationPermission = async () => {
//     if (Platform.OS === "ios") return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Location Permission",
//         message: "This app needs location access to track the bus.",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       }
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   // ----------------------------------------
//   // 🔹 Ensure GPS is turned ON
//   // ----------------------------------------
//   const checkIfLocationEnabled = async () => {
//     const result = await check(
//       Platform.OS === "android"
//         ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//         : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//     );

//     if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
//       Alert.alert(
//         "Location Required",
//         "Enable GPS to use Live Bus Tracking",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Open Settings", onPress: () => Linking.openSettings() },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   // -----------------------------
//   // 🔹 Start Tracking
//   // -----------------------------
//   useEffect(() => {
//     (async () => {
//       const permission = await requestLocationPermission();
//       if (!permission) return;

//       checkIfLocationEnabled();

//       Geolocation.getCurrentPosition(
//         ({ coords }) => {
//           setUserCoordinates({
//             latitude: coords.latitude,
//             longitude: coords.longitude,
//           });
//         },
//         (err) => console.log("GPS Error:", err),
//         { enableHighAccuracy: true }
//       );

//       // 🔥 Start watching user movement
//       const id = Geolocation.watchPosition(
//         ({ coords }) => {
//           const { latitude, longitude } = coords;

//           // Update polyline — avoid unlimited growth
//           setRouteCoordinates((prev) => {
//             const last = prev[prev.length - 1];
//             if (!last || last.latitude !== latitude || last.longitude !== longitude) {
//               return [...prev, { latitude, longitude }];
//             }
//             return prev;
//           });

//           setUserCoordinates({ latitude, longitude });
//         },
//         (err) => console.log("Watch Error:", err),
//         {
//           enableHighAccuracy: true,
//           distanceFilter: 1,
//           interval: 3000,
//         }
//       );

//       watchIdRef.current = id as unknown as number;
//     })();

//     // 🔥 Cleanup on unmount
//     return () => {
//       if (watchIdRef.current !== null) {
//         Geolocation.clearWatch(watchIdRef.current);
//         watchIdRef.current = null;
//       }
//     };
//   }, []);

//   // -----------------------------
//   // 🔹 Animate Bus Marker Every 5 sec (example)
//   // -----------------------------
//   useEffect(() => {
//     // Example bus movement mock — replace with API later
//     const interval = setInterval(() => {
//       busMarker.timing({
//         latitude: 13.075 + Math.random() * 0.02,
//         longitude: 80.21 + Math.random() * 0.02,
//         duration: 1500,
//         useNativeDriver: false,
//       }).start();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bus Live Tracking</Text>

//       {/* Route Selector */}
//       <View style={styles.routeContainer}>
//         {["Route 1", "Route 2"].map((r) => (
//           <TouchableOpacity
//             key={r}
//             style={[styles.routeBox, routes === r && styles.routeBoxSelected]}
//             onPress={() => setRoutes(r)}
//           >
//             <Text
//               style={[styles.routeText, routes === r && styles.routeTextSelected]}
//             >
//               {r}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* MAP */}
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation
//         loadingEnabled
//         initialRegion={{
//           latitude: userCoordinates.latitude,
//           longitude: userCoordinates.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {/* Bus Marker */}
//         <MarkerAnimated coordinate={busMarker}>
//           <View>
//             <Text style={{color: 'red',fontSize:35}}>🚌 Bus</Text>
//           </View>
//         </MarkerAnimated>

//         {/* User Marker */}
//         <MarkerAnimated coordinate={userCoordinates} title="You" pinColor='green'/>

//         {/* Polyline of user movement */}
//         <Polyline coordinates={routeCoordinates} strokeWidth={6} strokeColor="red" />
//       </MapView>
//     </View>
//   );
// };

// export default RouteScreen;

// // ---------------- Styles --------------------

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
//   map: { flex: 1 },
//   routeContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
//   routeBox: {
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginHorizontal: 5,
//   },
//   routeBoxSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
//   routeText: { fontSize: 16 },
//   routeTextSelected: { color: "#fff" },
// });



