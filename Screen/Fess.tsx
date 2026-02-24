
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios'
// import { Divider } from 'react-native-paper';
// import { fonts } from '../root/config';
// import { SafeAreaView } from 'react-native-safe-area-context';


// const { width, height } = Dimensions.get("window");

// const wp = (percentage: number) => (width * percentage) / 100;
// const hp = (percentage: number) => (height * percentage) / 100;

// interface FeesScreenprops {
//   route: any
//   navigation: any
// }

// const FeesScreen: React.FC<FeesScreenprops> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [activeTab, setActiveTab] = useState('Tuition');
//   const [isLoading, setIsLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [mobileNo, setMobileNo] = useState('');

//   const [studentData, setStudentData] = useState({
//     id: '',
//     name: '',
//     std: '',
//     section: '',
//     group: '',
//     roll: '',
//     mobile: '',
//     gender: '',
//     medium: '',
//     blood: '',
//     email: '',
//     dob: '',
//     father: '',
//     mother: '',
//     aca: '',
//     admission: '',
//     teacher: '',
//     address: '',
//     imageURL: ''
//   });

//   const [pendingTutionFeeList, setPendingTutionFeeList] = useState([]);
//   const [totalPending, setTotalPending] = useState('');
//   const [pendingBusFeeList, setPendingBusFeeList] = useState([]);
//   const [totalBusPending, setTotalBusPending] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   // GET STUDENT DATA
//   const getStudentData = async () => {
//     try {
//       const loggedInStatus = await AsyncStorage.getItem('isloggedIn');
//       const storedMobile = await AsyncStorage.getItem('mobile');
//       setLoggedIn(loggedInStatus === 'true');
//       setMobileNo(storedMobile ?? '');

//       const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_profile_data_api`, null, {
//         params: {
//           orgId: orgid,
//           studeId: studentId,
//           mobile_no: storedMobile
//         }
//       });

//       if (response.data.isSuccess && response.data.studDetails?.length) {
//         const details = response.data.studDetails[0];
//         setStudentData({
//           id: studentId,
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           roll: details.rollNo,
//           mobile: storedMobile,
//           gender: details.gender,
//           medium: details.medium,
//           blood: details.blood_group,
//           email: details.email_Id,
//           dob: details.dob,
//           father: details.father_name,
//           mother: details.mother_name,
//           aca: '',
//           admission: '',
//           teacher: details.staff_name,
//           address: details.address,
//           imageURL: details.photo_url
//         });
//       }
//     } catch (error) {
//       console.log('Error fetching student data:', error);
//     }
//   };

//   // GET PENDING TUTION FEE
//   const pendingTutionFeeData = async () => {
//     try {
//       const response = await axios.post(`https://www.vtsmile.in/app/api/students/fee_pending_api`, null, {
//         params: {
//           orgId: orgid,
//           stuId: studentId
//         }
//       });
//       // console.log('response.data.total_pending)--->', response.data.total_pending, 'response.data.fee_pending_dtl==>', response.data.fee_pending_dtl)
//       if (response.data.isSuccess) {
//         setTotalPending(response.data.total_pending);
//         if (response.data.fee_pending_dtl) {
//           setPendingTutionFeeList(response.data.fee_pending_dtl);
//         } else {
//           setErrorMsg('No Data Found!');
//         }
//       } else {
//         setErrorMsg('No Data Found!');
//       }
//     } catch (error) {
//       console.log('Error fetching tution fee:', error);
//     }
//   };

//   // GET PENDING BUS FEE
//   const pendingBusFeeData = async () => {
//     try {
//       const response = await axios.post(`https://www.vtsmile.in/app/api/students/bus_fee_pending_api`, null, {
//         params: {
//           orgId: orgid,
//           stuId: studentId
//         }
//       });
//       // console.log('response.data.bus_fee_pending_dtl=====>', response.data.bus_fee_pending_dtl, 'response.data.total_pending==>', response.data.total_pending)
//       if (response.data.isSuccess && response.data.bus_fee_pending_dtl) {
//         setTotalBusPending(response.data.total_pending);
//         setPendingBusFeeList(response.data.bus_fee_pending_dtl);
//       } else {
//         setErrorMsg('No Data Found!');
//       }
//     } catch (error) {
//       console.log('Error fetching bus fee:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await getStudentData();
//       await pendingTutionFeeData();
//       await pendingBusFeeData();
//       setIsLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1,backgroundColor:'#6A1B9A',marginBottom:-30 }}>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//               <Icon name="arrow-back" size={24} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Fee Payments</Text>

//           </View>

//           {/* Student Info Card */}
//           <View style={styles.studentCard}>
//             {/* <Text style={styles.stars}>★ ★ ★</Text> */}
//             <Text style={styles.name}>{studentData.name}</Text>
//             <Text style={styles.detail}>Std: {studentData.std} {studentData.section} Roll No: {studentData.roll}</Text>

//           </View>

//           {/* Tabs */}
//           <View>


//             <View style={styles.tabs}>
//               <TouchableOpacity
//                 style={[
//                   styles.tab,
//                   activeTab === 'Tuition' && styles.tabActive,
//                 ]}
//                 onPress={() => setActiveTab('Tuition')}
//               >
//                 <MaterialIcons name="payment" size={20} color={activeTab === 'Tuition' ? '#fff' : '#29292cff'} />
//                 <Text style={[styles.tabText, activeTab === 'Tuition' && styles.tabTextActive]}>Tuition Fee</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.tab,
//                   activeTab === 'Bus' && styles.tabActive,
//                 ]}
//                 onPress={() => setActiveTab('Bus')}
//               >
//                 <MaterialIcons name="directions-bus" size={20} color={activeTab === 'Bus' ? '#fff' : '#0d0d0eff'} />
//                 <Text style={[styles.tabText, activeTab === 'Bus' && styles.tabTextActive]}>Bus Fee</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* {activeTab === 'Tuition' && (
//       <View style={styles.statusBox}>
//         <FlatList
//           data={pendingTutionFeeList}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.feeItem}>
//               <Text style={{marginRight:150,color:'black',fontWeight:'600'}}>{item.fee_type}</Text>
//               <Text style={{right:40, color:'black',fontWeight:'600'}}> ₹{item.Amount}</Text>

//             </View>
//           )}
//         />
//          <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Total Pending Amount</Text>
//           <Text style={styles.amountValue}>₹ {totalPending}</Text>
//         </View>

//          <Image source={require('../assest/smile-No-Data-Found-BG.png')}  style={{ width: 150, height: 150, alignSelf: 'center' }} />
//         <Text style={styles.statusText}>You have no pending fees!</Text>
//         <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Total Pending Amount</Text>
//           <Text style={styles.amountValue}>₹ {totalPending}</Text>
//         </View>
//         <TouchableOpacity style={styles.payButton}>
//           <Text style={styles.payButtonText}>Pay Now</Text>
//         </TouchableOpacity>
//         <Text style={styles.swipeText}>→ Swipe to Bus Fee</Text>
//       </View>
//    )} */}
//           {activeTab === 'Tuition' && (
//             <View style={styles.statusBox}>
//               {pendingTutionFeeList && pendingTutionFeeList.length > 0 ? (
//                 <>
//                   <FlatList
//                     data={pendingTutionFeeList}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <View style={styles.feeItem}>
//                         <Text style={styles.feeLabel}>
//                           {item.fee_type}
//                         </Text>
//                         <Text style={styles.feeAmount}>
//                           ₹ {item.Amount}
//                         </Text>
//                       </View>
//                     )}
//                   />
//                   {/* Divider Line */}
//                   <View style={styles.divider} />

//                   <View style={styles.amountRow}>
//                     <Text style={styles.amountLabel}>Total Pending Amount</Text>
//                     <Text style={styles.amountValue}>₹ {totalPending}</Text>
//                   </View>
//                   <TouchableOpacity style={styles.payButton}>
//                     <Text style={styles.payButtonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 </>
//               ) : (
//                 <>
//                   <Image
//                     source={require('../assest/smile-No-Data-Found-BG.png')}
//                     style={{ width: 150, height: 150, alignSelf: 'center' }}
//                   />
//                   <Text style={styles.statusText}>You have no pending fees!</Text>
//                   <View style={styles.amountRow}>
//                     <Text style={styles.amountLabel}>Total Pending Amount</Text>
//                     <Text style={styles.amountValue}>₹{totalPending}</Text>
//                   </View>

//                   <TouchableOpacity style={styles.payButton}>
//                     <Text style={styles.payButtonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//           )}

//           {activeTab === 'Bus' && (
//             <View style={[styles.statusBox, { backgroundColor: "#c5e5f6" }]}>
//               {pendingBusFeeList && pendingBusFeeList.length > 0 ? (
//                 <>

//                   <FlatList
//                     data={pendingBusFeeList}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <View style={styles.feeItem}>
//                         <Text style={styles.feeLabel}>
//                           {item.bus_fee_type}
//                         </Text>
//                         <Text style={styles.feeAmount}>
//                           ₹ {item.amount} ({item.status})
//                         </Text>
//                       </View>
//                     )}
//                   />
//                   {/* Divider Line */}
//                   <View style={styles.divider} />

//                   <View style={styles.amountRow}>
//                     <Text style={styles.amountLabel}>Total Pending Amount</Text>
//                     <Text style={styles.amountValue}>₹ {totalBusPending}</Text>
//                   </View>
//                   <TouchableOpacity style={styles.payButton}>
//                     <Text style={styles.payButtonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 </>
//               ) : (
//                 <>
//                   <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={{ width: 150, height: 150, alignSelf: 'center' }} />
//                   <Text style={styles.statusText}>You have no pending fees!</Text>
//                   <View style={styles.amountRow}>
//                     <Text style={styles.amountLabel}>Total Pending Amount</Text>
//                     <Text style={styles.amountValue}>₹ {totalBusPending}</Text>
//                   </View>

//                   <TouchableOpacity style={styles.payButton}>
//                     <Text style={styles.payButtonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                   {/* <Text style={styles.swipeText}>→ Swipe to Bus Fee</Text> */}
//                 </>
//               )}
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </ SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({

//   container: { flex: 1, backgroundColor: "#fff" },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   header: {
//     height: hp(7),
//     backgroundColor: '#6A1B9A',
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp(4),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: "center",
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: wp(4.5),
//     color: "#fff",
//   },
//   backBtn: { padding: wp(2) },
//   studentCard: {
//     backgroundColor: "#7c43bd",
//     margin: wp(4),
//     padding: wp(4),
//     borderRadius: wp(3),
//     alignItems: "center",
//   },
//   name: { color: "#fff", fontSize: wp(4.5), fontFamily: fonts.FONT_BOLD, },
//   detail: { color: "#f5f6fa", fontSize: wp(3.5), marginTop: hp(0.5), fontFamily: fonts.ROBOTO_BOLD, },
//   tabs: {
//     // flexDirection: "row",
//     // justifyContent: "space-evenly",
//     // marginVertical: hp(1.5),
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginVertical: hp(1.5),
//     //  paddingHorizontal: wp(8),
//     backgroundColor: 'purple',
//     borderRadius: 10,
//     marginHorizontal: 16,
//     padding: 7, height: 60
//   },
//   tab: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(8),
//     borderRadius: wp(3),
//     backgroundColor: "#e8eaf6",
//   },
//   tabActive: { backgroundColor: "#ec0a7b" },
//   tabText: { marginLeft: wp(2), fontSize: wp(3.8), fontFamily: fonts.FONT_BOLD, },
//   tabTextActive: { color: "#fff", fontFamily: fonts.FONT_BOLD, },
//   statusBox: {
//     backgroundColor: "#f0f6c5",
//     marginHorizontal: wp(4),
//     borderRadius: wp(3),
//     padding: wp(4),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   feeItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: hp(0.8),
//   },
//   feeLabel: { color: "#000", fontSize: wp(3.8), fontFamily: fonts.ROBOTO_BOLD, },
//   feeAmount: { color: "#000", fontFamily: fonts.FONT_BOLD, },
//   divider: {
//     height: 1,
//     backgroundColor: "#ccc",
//     marginVertical: hp(1.5),
//   },
//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp(1),
//   },
//   amountLabel: { fontSize: wp(4), color: "#333", fontFamily: fonts.ROBOTO_BOLD, },
//   amountValue: { fontSize: wp(4), color: "#EA4C89", fontFamily: fonts.FONT_BOLD, },
//   payButton: {
//     backgroundColor: "#6C63FF",
//     borderRadius: wp(5),
//     paddingVertical: hp(1.5),
//     marginTop: hp(2.5),
//     alignItems: "center",
//   },
//   payButtonText: {
//     color: "#fff",
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: wp(4),
//   },
//   statusText: {
//     textAlign: "center",
//     color: "#6C63FF",
//     fontWeight: "700",
//     marginVertical: hp(1.5),
//   },
//   noDataImage: {
//     width: wp(40),
//     height: hp(20),
//     alignSelf: "center",
//   },
// });

// export default FeesScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../root/config';

// ─── Responsive helpers ──────────────────────────────────────────────────────
const { width, height } = Dimensions.get('window');

// Normalise against a 360-wide baseline (common mid-range Android)
const BASE_WIDTH = 360;
const scale = width / BASE_WIDTH;
const normalize = (size: number) => Math.round(size * scale);

const wp = (pct: number) => (width * pct) / 100;
const hp = (pct: number) => (height * pct) / 100;

// Clamp a value so it looks good on both tiny (≤360) and large (≥480) screens
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

// ─── Design tokens ────────────────────────────────────────────────────────────
const COLORS = {
  primary: '#6A1B9A',       // vibrant violet
  primaryDark: '#6A1B9A',
  primaryLight: '#ffffff',
  accent: '#EC4899',        // hot pink CTA
  accentLight: '#FCE7F3',
  tuitionBg: '#e0dada',     // soft lavender card
  busBg: '#E0F2FE',         // sky-blue card
  surface: '#FFFFFF',
  textPrimary: '#1E1B4B',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  divider: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  shadow: 'rgba(124, 58, 237, 0.18)',
};

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface FeesScreenProps {
  route: any;
  navigation: any;
}

// ─── Component ────────────────────────────────────────────────────────────────
const FeesScreen: React.FC<FeesScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [activeTab, setActiveTab] = useState<'Tuition' | 'Bus'>('Tuition');
  const [isLoading, setIsLoading] = useState(true);
  const [mobileNo, setMobileNo] = useState('');

  const [studentData, setStudentData] = useState({
    id: '',
    name: '',
    std: '',
    section: '',
    roll: '',
  });

  const [pendingTuitionFeeList, setPendingTuitionFeeList] = useState<any[]>([]);
  const [totalPending, setTotalPending] = useState('0');
  const [pendingBusFeeList, setPendingBusFeeList] = useState<any[]>([]);
  const [totalBusPending, setTotalBusPending] = useState('0');

  // ── API calls ──────────────────────────────────────────────────────────────
  const getStudentData = async () => {
    try {
      const storedMobile = await AsyncStorage.getItem('mobile');
      setMobileNo(storedMobile ?? '');
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api`,
        null,
        { params: { orgId: orgid, studeId: studentId, mobile_no: storedMobile } },
      );
      if (response.data.isSuccess && response.data.studDetails?.length) {
        const d = response.data.studDetails[0];
        setStudentData({
          id: studentId,
          name: d.stud_name,
          std: d.std_name,
          section: d.section,
          roll: d.rollNo,
        });
      }
    } catch (e) {
      console.log('Error fetching student data:', e);
    }
  };

  const pendingTuitionFeeData = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/fee_pending_api`,
        null,
        { params: { orgId: orgid, stuId: studentId } },
      );
      if (response.data.isSuccess) {
        setTotalPending(response.data.total_pending ?? '0');
        setPendingTuitionFeeList(response.data.fee_pending_dtl ?? []);
      }
    } catch (e) {
      console.log('Error fetching tuition fee:', e);
    }
  };

  const pendingBusFeeData = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/bus_fee_pending_api`,
        null,
        { params: { orgId: orgid, stuId: studentId } },
      );
      if (response.data.isSuccess && response.data.bus_fee_pending_dtl) {
        setTotalBusPending(response.data.total_pending ?? '0');
        setPendingBusFeeList(response.data.bus_fee_pending_dtl);
      }
    } catch (e) {
      console.log('Error fetching bus fee:', e);
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([getStudentData(), pendingTuitionFeeData(), pendingBusFeeData()]);
      setIsLoading(false);
    })();
  }, []);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loaderText}>Loading fee details…</Text>
        </View>
      </View>
    );
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const isTuition = activeTab === 'Tuition';
  const currentList = isTuition ? pendingTuitionFeeList : pendingBusFeeList;
  const currentTotal = isTuition ? totalPending : totalBusPending;
  const hasPending = currentList.length > 0;

  // ── Render fee row ─────────────────────────────────────────────────────────
  const renderFeeRow = ({ item, index }: { item: any; index: number }) => (
    <View
      style={[
        styles.feeRow,
        index % 2 === 0 && styles.feeRowEven,
      ]}
    >
      <View style={styles.feeRowLeft}>
        <View style={[styles.feeDot, { backgroundColor: isTuition ? COLORS.primary : COLORS.accent }]} />
        <Text style={styles.feeLabel} numberOfLines={2}>
          {isTuition ? item.fee_type : item.bus_fee_type}
        </Text>
      </View>
      <View style={styles.feeRowRight}>
        <Text style={styles.feeAmount}>₹{isTuition ? item.Amount : item.amount}</Text>
        {!isTuition && item.status && (
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'Paid' ? '#D1FAE5' : '#FEF3C7' },
          ]}>
            <Text style={[
              styles.statusBadgeText,
              { color: item.status === 'Paid' ? COLORS.success : COLORS.warning },
            ]}>
              {item.status}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <TouchableOpacity
              // style={styles.backBtn}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="arrow-back" size={normalize(24)} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Fee Payments</Text>
            {/* Right placeholder keeps title centred */}
            <View style={{ width: normalize(40) }} />
          </View>

          {/* ── Student card ── */}
          <View style={styles.studentCard}>
            {/* Avatar initials */}
            {/* <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {studentData.name
                  ? studentData.name
                      .split(' ')
                      .slice(0, 2)
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'S'}
              </Text>
            </View> */}

            <Text style={styles.studentName} numberOfLines={1}>
              {studentData.name || 'Student Name'}
            </Text>

            {/* Info pills */}
            <View style={styles.infoPillsRow}>
              <InfoPill icon="group" label={`Class ${studentData.std} – ${studentData.section}`} />
              <InfoPill icon="list" label={`Roll No. ${studentData.roll}`} />
            </View>
          </View>

          {/* ── Tab bar ── */}
          <View style={styles.tabBar}>
            <TabButton
              label="Tuition Fee"
              icon="payment"
              active={isTuition}
              onPress={() => setActiveTab('Tuition')}
              color={COLORS.primary}
            />
            <TabButton
              label="Bus Fee"
              icon="directions-bus"
              active={!isTuition}
              onPress={() => setActiveTab('Bus')}
              color={COLORS.primary}
            />
          </View>

          {/* ── Content card ── */}
          <View style={[
            styles.contentCard,
            { backgroundColor: isTuition ? COLORS.tuitionBg : COLORS.busBg },
          ]}>
            {/* Card header strip */}
            <View style={[
              styles.cardHeaderStrip,
              { backgroundColor: isTuition ? COLORS.primaryLight : '#bacafd' },
            ]}>
              <MaterialIcons
                name={isTuition ? 'payment' : 'directions-bus'}
                size={normalize(18)}
                color={isTuition ? COLORS.primary : '#0369A1'}
              />
              <Text style={[
                styles.cardHeaderText,
                { color: isTuition ? COLORS.primary : '#0369A1' },
              ]}>
                {isTuition ? 'Pending Tuition Fees' : 'Pending Bus Fees'}
              </Text>
            </View>

            {hasPending ? (
              <>
                {/* Fee list */}
                <FlatList
                  data={currentList}
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={renderFeeRow}
                  scrollEnabled={false}
                  style={styles.feeList}
                  ItemSeparatorComponent={() => <View style={styles.feeListSeparator} />}
                />

                {/* Total row */}
                <View style={styles.totalContainer}>
                  <View style={[
                    styles.totalRow,
                    { borderColor: isTuition ? COLORS.primary : '#0369A1' },
                  ]}>
                    <Text style={styles.totalLabel}>Total Pending Amount
                    </Text>
                    <Text style={[
                      styles.totalValue,
                      { color: isTuition ? COLORS.primary : '#0369A1' },
                    ]}>
                      ₹ {currentTotal}
                    </Text>
                  </View>
                </View>

                {/* Pay button */}
                <TouchableOpacity
                  style={[
                    styles.payBtn,
                    { backgroundColor: isTuition ? COLORS.primary : COLORS.accent },
                  ]}
                  activeOpacity={0.85}
                >
                  {/* <MaterialIcons name="lock" size={normalize(16)} color="#fff" /> */}
                  <Text style={styles.payBtnText}>Pay Now</Text>
                  {/* <MaterialIcons name="arrow-forward" size={normalize(16)} color="#fff" /> */}
                </TouchableOpacity>

                {/* <Text style={styles.secureNote}>🔒 Payments are SSL encrypted & secure</Text> */}
              </>
            ) : (
              /* Empty state */
              <View style={styles.emptyState}>
                <View style={[
                  styles.emptyIconCircle,
                  { backgroundColor: isTuition ? COLORS.primaryLight : '#BAE6FD' },
                ]}>
                  <MaterialIcons
                    name="check-circle"
                    size={normalize(52)}
                    color={isTuition ? COLORS.primary : '#0369A1'}
                  />
                </View>
                <Text style={styles.emptyTitle}>All Clear!</Text>
                <Text style={styles.emptySubtitle}>
                  No pending {isTuition ? 'tuition' : 'bus'} fees.{'\n'}You're up to date.
                </Text>
                <View style={[
                  styles.emptyAmountRow,
                  { borderColor: isTuition ? COLORS.primaryLight : '#BAE6FD' },
                ]}>
                  <Text style={styles.emptyAmountLabel}>Total Pending Amount</Text>
                  <Text style={[
                    styles.emptyAmountValue,
                    { color: COLORS.success },
                  ]}>
                    ₹ 0.00
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* bottom breathing room */}
          <View style={{ height: hp(4) }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ─── Small reusable sub-components ────────────────────────────────────────────
const InfoPill = ({ icon, label }: { icon: string; label: string }) => (
  <View style={pillStyles.pill}>
    <MaterialIcons name={icon} size={normalize(13)} color={COLORS.primaryLight} />
    <Text style={pillStyles.label}>{label}</Text>
  </View>
);

const TabButton = ({
  label, icon, active, onPress, color,
}: {
  label: string; icon: string; active: boolean; onPress: () => void; color: string;
}) => (
  <TouchableOpacity
    style={[tabBtnStyles.btn, active && { backgroundColor: color, ...tabBtnStyles.btnActive }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <MaterialIcons
      name={icon}
      size={normalize(18)}
      color={active ? '#fff' : COLORS.textSecondary}
    />
    <Text style={[tabBtnStyles.label, active && tabBtnStyles.labelActive]}>{label}</Text>
  </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#F8F7FF',
    paddingBottom: hp(2),
  },

  // Loader
  loaderContainer: {
    flex: 1,
    backgroundColor: '#F8F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    padding: normalize(32),
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
    gap: normalize(12),
  },
  loaderText: {
    fontSize: clamp(normalize(14), 12, 16),
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },

  // Header
  header: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    // Raised bottom edge into card
    borderBottomLeftRadius: normalize(0),
    borderBottomRightRadius: normalize(0),
  },
  backBtn: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: clamp(normalize(18), 15, 20),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.5,
  },

  // Student card
  // studentCard: {
  //   backgroundColor: COLORS.primary,
  //   marginHorizontal: 0,
  //   paddingVertical: hp(3),
  //   paddingHorizontal: wp(5),
  //   alignItems: 'center',
  //   // curved bottom
  //   borderBottomLeftRadius: normalize(32),
  //   borderBottomRightRadius: normalize(32),
  //   // subtle shadow going downward
  //   shadowColor: COLORS.primary,
  //   shadowOffset: { width: 0, height: 8 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 12,
  //   elevation: 10,
  // },

  studentCard: {
    backgroundColor: "#6A1B9A",
    margin: wp(4),
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: "center",
  },
  avatar: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  avatarText: {
    color: '#fff',
    fontSize: clamp(normalize(22), 18, 26),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 1,
  },
  studentName: {
    color: '#fff',
    fontSize: clamp(normalize(18), 16, 22),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
    marginBottom: hp(1.2),
    textAlign: 'center',
    maxWidth: wp(80),
  },
  infoPillsRow: {
    flexDirection: 'row',
    gap: wp(2),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    marginBottom: hp(1.5),
    backgroundColor: '#E9E5FF',
    borderRadius: normalize(16),
    padding: normalize(5),
    gap: normalize(4),
    // shadow
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },

  // Content card
  contentCard: {
    maxHeight: '100%',
    paddingBottom: hp(10),
    marginHorizontal: wp(4),
    borderRadius: normalize(20),
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeaderStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    gap: wp(2),
  },
  cardHeaderText: {
    fontSize: clamp(normalize(13), 12, 15),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.3,
  },

  // Fee list
  feeList: {
    paddingHorizontal: wp(4),
    paddingTop: hp(0.5),
  },
  feeListSeparator: { height: 0 },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(2),
    borderRadius: normalize(10),
    marginTop: 20
  },
  feeRowEven: {
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  feeRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp(2),
    paddingRight: wp(2),
  },
  feeDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    flexShrink: 0,
  },
  feeLabel: {
    flex: 1,
    fontSize: clamp(normalize(13), 11, 15),
    color: COLORS.textPrimary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  feeRowRight: {
    alignItems: 'flex-end',
    gap: normalize(4),
  },
  feeAmount: {
    fontSize: clamp(normalize(13), 12, 15),
    color: COLORS.textPrimary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  statusBadge: {
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(2),
    borderRadius: normalize(6),
  },
  statusBadgeText: {
    fontSize: clamp(normalize(10), 9, 12),
    fontFamily: fonts.ROBOTO_BOLD,
  },

  // Total
  totalContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    borderWidth: 1.5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
  },
  totalLabel: {
    fontSize: clamp(normalize(14), 12, 16),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  totalValue: {
    fontSize: clamp(normalize(18), 16, 22),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.5,
  },

  // Pay button
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(2),
    borderRadius: normalize(16),
    paddingVertical: hp(1.8),
    gap: wp(2),
    // shadow
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  payBtnText: {
    color: '#fff',
    fontSize: clamp(normalize(15), 13, 17),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.4,
  },
  secureNote: {
    textAlign: 'center',
    fontSize: clamp(normalize(11), 10, 13),
    color: COLORS.textMuted,
    marginTop: hp(1),
    marginBottom: hp(1.5),
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: hp(3),
    paddingHorizontal: wp(6),
  },
  emptyIconCircle: {
    width: normalize(96),
    height: normalize(96),
    borderRadius: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
  },
  emptyTitle: {
    fontSize: clamp(normalize(20), 18, 24),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.textPrimary,
    marginBottom: hp(0.8),
  },
  emptySubtitle: {
    fontSize: clamp(normalize(13), 12, 15),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: normalize(20),
    marginBottom: hp(2),
  },
  emptyAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    borderWidth: 1.5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
    width: '100%',
    marginBottom: hp(0.5),
  },
  emptyAmountLabel: {
    fontSize: clamp(normalize(13), 12, 15),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  emptyAmountValue: {
    fontSize: clamp(normalize(16), 14, 20),
    fontFamily: fonts.ROBOTO_BOLD,
  },
});

const pillStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: normalize(20),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    gap: normalize(4),
  },
  label: {
    color: '#fff',
    fontSize: clamp(normalize(12), 10, 13),
    fontFamily: fonts.ROBOTO_BOLD,
  },
});

const tabBtnStyles = StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.1),
    borderRadius: normalize(12),
    gap: wp(1.5),
  },
  btnActive: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: clamp(normalize(13), 12, 15),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.textSecondary,
  },
  labelActive: {
    color: '#fff',
    fontFamily: fonts.ROBOTO_BOLD,
  },
});

export default FeesScreen;


// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, TouchableOpacity, FlatList, ActivityIndicator,
//   StyleSheet, ScrollView, Dimensions, Platform, StatusBar, Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import RazorpayCheckout from 'react-native-razorpay';
// import { fonts } from '../root/config';

// // ─── Responsive helpers ───────────────────────────────────────────────────────
// const { width, height } = Dimensions.get('window');
// const BASE_WIDTH = 360;
// const scale = width / BASE_WIDTH;
// const normalize = (size: number) => Math.round(size * scale);
// const wp = (pct: number) => (width * pct) / 100;
// const hp = (pct: number) => (height * pct) / 100;
// const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// // ─── Design tokens ─────────────────────────────────────────────────────────────
// const COLORS = {
//   primary: '#6A1B9A',
//   primaryDark: '#6A1B9A',
//   primaryLight: '#ffffff',
//   accent: '#EC4899',
//   accentLight: '#FCE7F3',
//   tuitionBg: '#e0dada',
//   busBg: '#E0F2FE',
//   surface: '#FFFFFF',
//   textPrimary: '#1E1B4B',
//   textSecondary: '#6B7280',
//   textMuted: '#9CA3AF',
//   divider: '#E5E7EB',
//   success: '#10B981',
//   warning: '#F59E0B',
//   error: '#EF4444',
//   shadow: 'rgba(124, 58, 237, 0.18)',
// };

// // ─── Razorpay Config ──────────────────────────────────────────────────────────
// // ⚠️ Replace with your actual Razorpay Key ID from dashboard.razorpay.com
// const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXXXXXX';

// // ─── Interfaces ────────────────────────────────────────────────────────────────
// interface FeesScreenProps {
//   route: any;
//   navigation: any;
// }

// // ─── Component ─────────────────────────────────────────────────────────────────
// const FeesScreen: React.FC<FeesScreenProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [activeTab, setActiveTab] = useState<'Tuition' | 'Bus'>('Tuition');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPaymentLoading, setIsPaymentLoading] = useState(false);
//   const [mobileNo, setMobileNo] = useState('');

//   const [studentData, setStudentData] = useState({
//     id: '', name: '', std: '', section: '', roll: '', email: '',
//   });

//   const [pendingTuitionFeeList, setPendingTuitionFeeList] = useState<any[]>([]);
//   const [totalPending, setTotalPending] = useState('0');
//   const [pendingBusFeeList, setPendingBusFeeList] = useState<any[]>([]);
//   const [totalBusPending, setTotalBusPending] = useState('0');

//   // ── API calls ──────────────────────────────────────────────────────────────
//   const getStudentData = async () => {
//     try {
//       const storedMobile = await AsyncStorage.getItem('mobile');
//       setMobileNo(storedMobile ?? '');
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api`,
//         null,
//         { params: { orgId: orgid, studeId: studentId, mobile_no: storedMobile } },
//       );
//       if (response.data.isSuccess && response.data.studDetails?.length) {
//         const d = response.data.studDetails[0];
//         setStudentData({
//           id: studentId,
//           name: d.stud_name,
//           std: d.std_name,
//           section: d.section,
//           roll: d.rollNo,
//           email: d.email ?? '',
//         });
//       }
//     } catch (e) {
//       console.log('Error fetching student data:', e);
//     }
//   };

//   const pendingTuitionFeeData = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/fee_pending_api`,
//         null,
//         { params: { orgId: orgid, stuId: studentId } },
//       );
//       if (response.data.isSuccess) {
//         setTotalPending(response.data.total_pending ?? '0');
//         setPendingTuitionFeeList(response.data.fee_pending_dtl ?? []);
//       }
//     } catch (e) {
//       console.log('Error fetching tuition fee:', e);
//     }
//   };

//   const pendingBusFeeData = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/bus_fee_pending_api`,
//         null,
//         { params: { orgId: orgid, stuId: studentId } },
//       );
//       if (response.data.isSuccess && response.data.bus_fee_pending_dtl) {
//         setTotalBusPending(response.data.total_pending ?? '0');
//         setPendingBusFeeList(response.data.bus_fee_pending_dtl);
//       }
//     } catch (e) {
//       console.log('Error fetching bus fee:', e);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await Promise.all([getStudentData(), pendingTuitionFeeData(), pendingBusFeeData()]);
//       setIsLoading(false);
//     })();
//   }, []);

//   // ── Razorpay Payment Handler ───────────────────────────────────────────────
//   const handlePayNow = async () => {
//     const amountStr = isTuition ? totalPending : totalBusPending;
//     const amountFloat = parseFloat(amountStr);

//     if (!amountFloat || amountFloat <= 0) {
//       Alert.alert('Invalid Amount', 'No pending amount to pay.');
//       return;
//     }

//     setIsPaymentLoading(true);

//     try {
//       // ── STEP 1: Create Razorpay Order on your backend ──────────────────────
//       // Your backend should call Razorpay Orders API and return { id, amount, currency }
//       // Replace this URL with your actual backend endpoint.
//       const orderResponse = await axios.post(
//         `https://www.vtsmile.in/app/api/payments/create_order`,
//         {
//           amount: Math.round(amountFloat * 100), // Razorpay expects paise (₹1 = 100 paise)
//           currency: 'INR',
//           receipt: `rcpt_${studentId}_${Date.now()}`,
//           notes: {
//             studentId,
//             orgid,
//             feeType: isTuition ? 'Tuition' : 'Bus',
//           },
//         },
//       );

//       const { id: orderId } = orderResponse.data;

//       // ── STEP 2: Open Razorpay Checkout ─────────────────────────────────────
//       const options = {
//         description: `${isTuition ? 'Tuition' : 'Bus'} Fee Payment`,
//         image: 'https://www.vtsmile.in/logo.png', // Replace with your school logo URL
//         currency: 'INR',
//         key: RAZORPAY_KEY_ID,
//         amount: Math.round(amountFloat * 100).toString(), // in paise
//         name: 'School Fee Portal',
//         order_id: orderId,
//         prefill: {
//           email: studentData.email || 'parent@example.com',
//           contact: mobileNo || mobile || '',
//           name: studentData.name,
//         },
//         theme: {
//           color: isTuition ? COLORS.primary : COLORS.accent,
//         },
//       };

//       const paymentData = await RazorpayCheckout.open(options);

//       // ── STEP 3: Verify payment on your backend ─────────────────────────────
//       // Always verify payment signature server-side. Never trust client alone.
//       const verifyResponse = await axios.post(
//         `https://www.vtsmile.in/app/api/payments/verify_payment`,
//         {
//           razorpay_order_id: paymentData.razorpay_order_id,
//           razorpay_payment_id: paymentData.razorpay_payment_id,
//           razorpay_signature: paymentData.razorpay_signature,
//           studentId,
//           orgid,
//           feeType: isTuition ? 'Tuition' : 'Bus',
//           amount: amountFloat,
//         },
//       );

//       if (verifyResponse.data.isSuccess) {
//         Alert.alert(
//           '✅ Payment Successful',
//           `Payment of ₹${amountFloat} for ${isTuition ? 'Tuition' : 'Bus'} Fee was successful!\n\nPayment ID: ${paymentData.razorpay_payment_id}`,
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 // Refresh fee data after successful payment
//                 setIsLoading(true);
//                 Promise.all([pendingTuitionFeeData(), pendingBusFeeData()]).then(() =>
//                   setIsLoading(false),
//                 );
//               },
//             },
//           ],
//         );
//       } else {
//         Alert.alert('⚠️ Verification Failed', 'Payment was made but verification failed. Please contact support.');
//       }
//     } catch (error: any) {
//       // Razorpay returns error with `code` and `description` on dismissal or failure
//       if (error?.code === 0) {
//         // User dismissed the payment sheet — no alert needed
//         console.log('Payment dismissed by user');
//       } else {
//         Alert.alert(
//           '❌ Payment Failed',
//           error?.description ?? 'Something went wrong. Please try again.',
//         );
//       }
//     } finally {
//       setIsPaymentLoading(false);
//     }
//   };

//   // ── Loading ────────────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <View style={styles.loaderCard}>
//           <ActivityIndicator size="large" color={COLORS.primary} />
//           <Text style={styles.loaderText}>Loading fee details…</Text>
//         </View>
//       </View>
//     );
//   }

//   // ── Derived ────────────────────────────────────────────────────────────────
//   const isTuition = activeTab === 'Tuition';
//   const currentList = isTuition ? pendingTuitionFeeList : pendingBusFeeList;
//   const currentTotal = isTuition ? totalPending : totalBusPending;
//   const hasPending = currentList.length > 0;

//   // ── Render fee row ─────────────────────────────────────────────────────────
//   const renderFeeRow = ({ item, index }: { item: any; index: number }) => (
//     <View style={[styles.feeRow, index % 2 === 0 && styles.feeRowEven]}>
//       <View style={styles.feeRowLeft}>
//         <View style={[styles.feeDot, { backgroundColor: isTuition ? COLORS.primary : COLORS.accent }]} />
//         <Text style={styles.feeLabel} numberOfLines={2}>
//           {isTuition ? item.fee_type : item.bus_fee_type}
//         </Text>
//       </View>
//       <View style={styles.feeRowRight}>
//         <Text style={styles.feeAmount}>₹{isTuition ? item.Amount : item.amount}</Text>
//         {!isTuition && item.status && (
//           <View style={[
//             styles.statusBadge,
//             { backgroundColor: item.status === 'Paid' ? '#D1FAE5' : '#FEF3C7' },
//           ]}>
//             <Text style={[
//               styles.statusBadgeText,
//               { color: item.status === 'Paid' ? COLORS.success : COLORS.warning },
//             ]}>
//               {item.status}
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   // ── Main render ────────────────────────────────────────────────────────────
//   return (
//     <>
//       <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
//               <Icon name="arrow-back" size={normalize(24)} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Fee Payments</Text>
//             <View style={{ width: normalize(40) }} />
//           </View>

//           {/* Student card */}
//           <View style={styles.studentCard}>
//             <Text style={styles.studentName} numberOfLines={1}>
//               {studentData.name || 'Student Name'}
//             </Text>
//             <View style={styles.infoPillsRow}>
//               <InfoPill icon="group" label={`Class ${studentData.std} – ${studentData.section}`} />
//               <InfoPill icon="list" label={`Roll No. ${studentData.roll}`} />
//             </View>
//           </View>

//           {/* Tab bar */}
//           <View style={styles.tabBar}>
//             <TabButton label="Tuition Fee" icon="payment" active={isTuition} onPress={() => setActiveTab('Tuition')} color={COLORS.primary} />
//             <TabButton label="Bus Fee" icon="directions-bus" active={!isTuition} onPress={() => setActiveTab('Bus')} color={COLORS.primary} />
//           </View>

//           {/* Content card */}
//           <View style={[styles.contentCard, { backgroundColor: isTuition ? COLORS.tuitionBg : COLORS.busBg }]}>
//             {/* Card header strip */}
//             <View style={[styles.cardHeaderStrip, { backgroundColor: isTuition ? COLORS.primaryLight : '#bacafd' }]}>
//               <MaterialIcons name={isTuition ? 'payment' : 'directions-bus'} size={normalize(18)} color={isTuition ? COLORS.primary : '#0369A1'} />
//               <Text style={[styles.cardHeaderText, { color: isTuition ? COLORS.primary : '#0369A1' }]}>
//                 {isTuition ? 'Pending Tuition Fees' : 'Pending Bus Fees'}
//               </Text>
//             </View>

//             {hasPending ? (
//               <>
//                 <FlatList
//                   data={currentList}
//                   keyExtractor={(_, i) => i.toString()}
//                   renderItem={renderFeeRow}
//                   scrollEnabled={false}
//                   style={styles.feeList}
//                   ItemSeparatorComponent={() => <View style={styles.feeListSeparator} />}
//                 />

//                 {/* Total row */}
//                 <View style={styles.totalContainer}>
//                   <View style={[styles.totalRow, { borderColor: isTuition ? COLORS.primary : '#0369A1' }]}>
//                     <Text style={styles.totalLabel}>Total Pending Amount</Text>
//                     <Text style={[styles.totalValue, { color: isTuition ? COLORS.primary : '#0369A1' }]}>
//                       ₹ {currentTotal}
//                     </Text>
//                   </View>
//                 </View>

//                 {/* ── Pay Now Button with Razorpay ── */}
//                 <TouchableOpacity
//                   style={[
//                     styles.payBtn,
//                     { backgroundColor: isTuition ? COLORS.primary : COLORS.accent },
//                     isPaymentLoading && styles.payBtnDisabled,
//                   ]}
//                   activeOpacity={0.85}
//                   onPress={handlePayNow}
//                   disabled={isPaymentLoading}
//                 >
//                   {isPaymentLoading ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <>
//                       <MaterialIcons name="lock" size={normalize(16)} color="#fff" />
//                       <Text style={styles.payBtnText}>Pay Now  ₹{currentTotal}</Text>
//                       <MaterialIcons name="arrow-forward" size={normalize(16)} color="#fff" />
//                     </>
//                   )}
//                 </TouchableOpacity>

//                 <Text style={styles.secureNote}>🔒 Payments are SSL encrypted & secure via Razorpay</Text>
//               </>
//             ) : (
//               <View style={styles.emptyState}>
//                 <View style={[styles.emptyIconCircle, { backgroundColor: isTuition ? COLORS.primaryLight : '#BAE6FD' }]}>
//                   <MaterialIcons name="check-circle" size={normalize(52)} color={isTuition ? COLORS.primary : '#0369A1'} />
//                 </View>
//                 <Text style={styles.emptyTitle}>All Clear!</Text>
//                 <Text style={styles.emptySubtitle}>
//                   No pending {isTuition ? 'tuition' : 'bus'} fees.{'\n'}You're up to date.
//                 </Text>
//                 <View style={[styles.emptyAmountRow, { borderColor: isTuition ? COLORS.primaryLight : '#BAE6FD' }]}>
//                   <Text style={styles.emptyAmountLabel}>Total Pending Amount</Text>
//                   <Text style={[styles.emptyAmountValue, { color: COLORS.success }]}>₹ 0.00</Text>
//                 </View>
//               </View>
//             )}
//           </View>

//           <View style={{ height: hp(4) }} />
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────
// const InfoPill = ({ icon, label }: { icon: string; label: string }) => (
//   <View style={pillStyles.pill}>
//     <MaterialIcons name={icon} size={normalize(13)} color={COLORS.primaryLight} />
//     <Text style={pillStyles.label}>{label}</Text>
//   </View>
// );

// const TabButton = ({ label, icon, active, onPress, color }: { label: string; icon: string; active: boolean; onPress: () => void; color: string }) => (
//   <TouchableOpacity
//     style={[tabBtnStyles.btn, active && { backgroundColor: color, ...tabBtnStyles.btnActive }]}
//     onPress={onPress}
//     activeOpacity={0.8}
//   >
//     <MaterialIcons name={icon} size={normalize(18)} color={active ? '#fff' : COLORS.textSecondary} />
//     <Text style={[tabBtnStyles.label, active && tabBtnStyles.labelActive]}>{label}</Text>
//   </TouchableOpacity>
// );

// // ─── Styles (same as original + payBtnDisabled addition) ──────────────────────
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: COLORS.primaryDark },
//   scrollContent: { flexGrow: 1, backgroundColor: '#F8F7FF', paddingBottom: hp(2) },
//   loaderContainer: { flex: 1, backgroundColor: '#F8F7FF', justifyContent: 'center', alignItems: 'center' },
//   loaderCard: { backgroundColor: '#fff', borderRadius: normalize(20), padding: normalize(32), alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 1, shadowRadius: 16, elevation: 10, gap: normalize(12) },
//   loaderText: { fontSize: clamp(normalize(14), 12, 16), color: COLORS.textSecondary, letterSpacing: 0.3 },
//   header: { backgroundColor: COLORS.primaryDark, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(4), paddingVertical: hp(1.6) },
//   headerTitle: { flex: 1, textAlign: 'center', color: '#fff', fontSize: clamp(normalize(18), 15, 20), fontFamily: fonts.FONT_BOLD, letterSpacing: 0.5 },
//   studentCard: { backgroundColor: '#6A1B9A', margin: wp(4), padding: wp(4), borderRadius: wp(3), alignItems: 'center' },
//   studentName: { color: '#fff', fontSize: clamp(normalize(18), 16, 22), fontFamily: fonts.FONT_BOLD, letterSpacing: 0.4, marginBottom: hp(1.2), textAlign: 'center', maxWidth: wp(80) },
//   infoPillsRow: { flexDirection: 'row', gap: wp(2), flexWrap: 'wrap', justifyContent: 'center' },
//   tabBar: { flexDirection: 'row', marginHorizontal: wp(4), marginTop: hp(2.5), marginBottom: hp(1.5), backgroundColor: '#E9E5FF', borderRadius: normalize(16), padding: normalize(5), gap: normalize(4), shadowColor: 'rgba(0,0,0,0.08)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 3 },
//   contentCard: { maxHeight: '100%', paddingBottom: hp(10), marginHorizontal: wp(4), borderRadius: normalize(20), overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.10)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },
//   cardHeaderStrip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(4), paddingVertical: hp(1.2), gap: wp(2) },
//   cardHeaderText: { fontSize: clamp(normalize(13), 12, 15), fontFamily: fonts.ROBOTO_BOLD, letterSpacing: 0.3 },
//   feeList: { paddingHorizontal: wp(4), paddingTop: hp(0.5) },
//   feeListSeparator: { height: 0 },
//   feeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: hp(1.2), paddingHorizontal: wp(2), borderRadius: normalize(10), marginTop: 20 },
//   feeRowEven: { backgroundColor: 'rgba(255,255,255,0.55)' },
//   feeRowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: wp(2), paddingRight: wp(2) },
//   feeDot: { width: normalize(8), height: normalize(8), borderRadius: normalize(4), flexShrink: 0 },
//   feeLabel: { flex: 1, fontSize: clamp(normalize(13), 11, 15), color: COLORS.textPrimary, fontFamily: fonts.ROBOTO_BOLD },
//   feeRowRight: { alignItems: 'flex-end', gap: normalize(4) },
//   feeAmount: { fontSize: clamp(normalize(13), 12, 15), color: COLORS.textPrimary, fontFamily: fonts.ROBOTO_BOLD },
//   statusBadge: { paddingHorizontal: normalize(7), paddingVertical: normalize(2), borderRadius: normalize(6) },
//   statusBadgeText: { fontSize: clamp(normalize(10), 9, 12), fontFamily: fonts.ROBOTO_BOLD },
//   totalContainer: { paddingHorizontal: wp(4), paddingTop: hp(1), paddingBottom: hp(0.5) },
//   totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: normalize(12), borderWidth: 1.5, paddingHorizontal: wp(4), paddingVertical: hp(1.4) },
//   totalLabel: { fontSize: clamp(normalize(14), 12, 16), color: COLORS.textSecondary, fontFamily: fonts.ROBOTO_BOLD },
//   totalValue: { fontSize: clamp(normalize(18), 16, 22), fontFamily: fonts.ROBOTO_BOLD, letterSpacing: 0.5 },
//   payBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: wp(4), marginTop: hp(2), borderRadius: normalize(16), paddingVertical: hp(1.8), gap: wp(2), shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 8, elevation: 6, minHeight: normalize(54) },
//   payBtnDisabled: { opacity: 0.7 },
//   payBtnText: { color: '#fff', fontSize: clamp(normalize(15), 13, 17), fontFamily: fonts.ROBOTO_BOLD, letterSpacing: 0.4 },
//   secureNote: { textAlign: 'center', fontSize: clamp(normalize(11), 10, 13), color: COLORS.textMuted, marginTop: hp(1), marginBottom: hp(1.5) },
//   emptyState: { alignItems: 'center', paddingVertical: hp(3), paddingHorizontal: wp(6) },
//   emptyIconCircle: { width: normalize(96), height: normalize(96), borderRadius: normalize(48), alignItems: 'center', justifyContent: 'center', marginBottom: hp(1.5) },
//   emptyTitle: { fontSize: clamp(normalize(20), 18, 24), fontFamily: fonts.ROBOTO_BOLD, color: COLORS.textPrimary, marginBottom: hp(0.8) },
//   emptySubtitle: { fontSize: clamp(normalize(13), 12, 15), color: COLORS.textSecondary, textAlign: 'center', lineHeight: normalize(20), marginBottom: hp(2) },
//   emptyAmountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: normalize(12), borderWidth: 1.5, paddingHorizontal: wp(4), paddingVertical: hp(1.4), width: '100%', marginBottom: hp(0.5) },
//   emptyAmountLabel: { fontSize: clamp(normalize(13), 12, 15), color: COLORS.textSecondary, fontFamily: fonts.ROBOTO_BOLD },
//   emptyAmountValue: { fontSize: clamp(normalize(16), 14, 20), fontFamily: fonts.ROBOTO_BOLD },
// });

// const pillStyles = StyleSheet.create({
//   pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: normalize(20), paddingHorizontal: wp(3), paddingVertical: hp(0.5), gap: normalize(4) },
//   label: { color: '#fff', fontSize: clamp(normalize(12), 10, 13), fontFamily: fonts.ROBOTO_BOLD },
// });

// const tabBtnStyles = StyleSheet.create({
//   btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: hp(1.1), borderRadius: normalize(12), gap: wp(1.5) },
//   btnActive: { shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 5, elevation: 4 },
//   label: { fontSize: clamp(normalize(13), 12, 15), fontFamily: fonts.ROBOTO_BOLD, color: COLORS.textSecondary },
//   labelActive: { color: '#fff', fontFamily: fonts.ROBOTO_BOLD },
// });

// export default FeesScreen;