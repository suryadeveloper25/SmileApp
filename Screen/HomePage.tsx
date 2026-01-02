


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
  Alert,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DrawerActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../root/config';
import { clearNotification, getNotification } from './notificationStorage';
import { navigate } from './navigationRef';

const { width, height } = Dimensions.get('window');

const gridItems = [
  {
    title: 'My Attendance', icon: require('../assest/immigration_3125932.png'), screen: 'Attendance',
    colors: ['#FF512F', '#d21a6dff']
  },

  {
    title: 'My Timetable', icon: require('../assest/calendar_7528861.png'), screen: 'Timetable',
    colors: ['#1FA2FF', '#5b3fe2ff', ]
  },

  {
    title: 'My Homework', icon: require('../assest/homework_11647283.png'), screen: 'Homework',
    colors: ['#490b76ff', '#ae75d6ff']
  },

  {
    title: 'Exam', icon: require('../assest/exam_17030759.png'), screen: 'Exam',
    colors: ['#046A38', '#28f08fff']
  },

  {
    title: 'Progress Report', icon: require('../assest/test_5386526.png'), screen: 'ProgressReport',
    colors: ['#F7971E', '#FFD200']
  },

  {
    title: 'My Class', icon: require('../assest/teacher_11984957.png'), screen: 'Myclass',
    colors: ['#00B4DB', '#0083B0']
  },

  {
    title: 'Calendar', icon: require('../assest/date_5014284.png'), screen: 'Calender',
    colors: ['#DA22FF', '#9733EE']
  },

  {
    title: 'Fees', icon: require('../assest/receipt_8104817.png'), screen: 'Fees',
    colors: ['#314755', '#26a0da']
  },


  {
    title: 'Gallery', icon: require('../assest/photo_14627046.png'), isModal: true,
    colors: ['#FF5F6D', '#FFC371']
  },

  {
    title: 'Leave Request', icon: require('../assest/recipient_9101806.png'), screen: 'leave',
    colors: ['#56CCF2', '#2F80ED']
  },


  {
    title: 'Feedback', icon: require('../assest/feedback_18610975.png'), screen: 'Feedback',
    colors: ['#8b0a46ff', '#ef519bff']
  },

  {
    title: 'Bus Tracking', icon: require('../assest/school-bus_16468513.png'), screen: 'Route',
    colors: ['#12053c', '#99616eff',]
  },

];


const HomeScreen: React.FC<any> = ({ navigation, route }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [studentData, setStudentData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('mobile');
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      // console.log('res.data.studDetails==>', res.data.studDetails)
      if (res.data.isSuccess && res.data.studDetails) {
        const details = res.data.studDetails[0];
        setStudentData({
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          image: details.photo_url,
          roll: details.rollNo,
          admission: details.admsn_no,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch student data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);


  useEffect(() => {
  const checkNotification = async () => {
    const data = await getNotification();

    if (data) {
      console.log('✅ Navigating with data:', data);

      clearNotification();

      navigate('Notification', {
        notificationData: data
      });
    }
  };

  checkNotification();
}, []);
  if (loading) return <Text style={{ textAlign: 'center', marginTop: hp(40) }}>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View >
        <LinearGradient
          colors={['#220876ff', '#3621baff']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.9 }}

          style={styles.header}

        >
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={RFValue(24)} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerLogos}>
            <Image source={require('../assest/vt-logo-login.png')} style={styles.logoLarge} />
            <Image source={require('../assest/smile-logo.png')} style={styles.logoSmall} />
          </View>
        </LinearGradient>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <LinearGradient
            colors={['#F1D302', '#8f885dff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}

            style={styles.schoolCard}

          >
            {/* <Text style={styles.schoolName}>{studentData.institute_name}</Text> */}

            <View style={styles.profileInfo}>
              <View style={{  width: wp('17%'), height: hp('8%'), borderRadius: 35 }}>
                <Image
                  source={
                    studentData.image
                      ? { uri: studentData.image }
                      : require('../assest/icons8-administrator-male-50.png')
                  }
                  style={styles.profileImage}
                />
              </View>

              <View style={styles.profileText}>
                <Text style={styles.profileName}>{studentData.name?.toUpperCase()}</Text>

                <Text style={styles.profileRole}>Class: {studentData.std} {studentData.section}</Text>
                <Text style={styles.profileClass}>Roll No: {studentData.roll}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() =>
                item.isModal
                  ? setModalVisible(true)
                  : navigation.navigate(item.screen, { orgid, studentId, mobile })
              }
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gridGradient}
              >
                <Image source={item.icon} style={styles.gridIcon} />
              </LinearGradient>
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalOptions}>
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Gallery', { orgid, studentId, mobile });
                  }}
                >
                  <Image source={require('../assest/icons8-gallery-64.png')} style={styles.modalIcon} />
                  <Text style={styles.modalOptionText}>Gallery</Text>
                </Pressable>

                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Video', { orgid, studentId, mobile });
                  }}
                >
                  <Image source={require('../assest/icons8-movies-folder-50.png')} style={styles.modalIcon} />
                  <Text style={styles.modalOptionText}>Videos</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    width: '100%',
    height: hp(8),
    // backgroundColor: '#220876ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    justifyContent: 'space-between'
  },
  headerLogos: { flexDirection: 'row', alignItems: 'center', gap: wp(2), right: wp('25%') },
  logoSmall: { width: wp(30), height: wp(10), resizeMode: 'contain' },
  logoLarge: { width: wp(10), height: wp(10), resizeMode: 'contain', left: wp('1%') },
  scrollContainer: { flexGrow: 1, paddingBottom: hp(10), alignItems: 'center' },
  schoolCard: {
    width: wp(100),
    height: hp(16),
    backgroundColor: 'purple',
    padding: wp(5),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // marginTop: hp(2)
  },
  schoolName: { fontWeight: '800', fontSize: RFValue(18), color: '#fff', textAlign: 'center', marginBottom: hp(1) },
  profileInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  profileImage: { width: wp(15), height: wp(15), borderRadius: 27, top: wp(1.8), left: wp(1.5), },
  profileText: { flex: 1, marginLeft: wp(4) },
  profileName: { fontSize: RFValue(16), fontFamily: fonts.FONT_BOLD, color: '#fff',top:wp(1.5)  },
  profileRole: { color: '#fff', fontSize: RFValue(13), fontFamily: fonts.ROBOTO_BOLD,top:wp(1.5)  },
  profileClass: { color: '#fff', fontSize: RFValue(13), fontFamily: fonts.ROBOTO_BOLD, top:wp(1.5)  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginTop: hp(2)
  },
  gridItem: {
    width: wp(27),
    alignItems: 'center',
    marginBottom: hp(3)
  },
  gridGradient: {
    width: wp(18),
    height: wp(18),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridIcon: { width: wp(10), height: wp(10), resizeMode: 'contain', tintColor: '#fff' },
  gridText: { fontSize: RFValue(11), fontFamily: fonts.FONT_BOLD, color: '#000', textAlign: 'center', marginTop: hp(1), width: '120%' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: wp(75),
    height: hp(18),
    borderRadius: 14,
    padding: wp(4),
    backgroundColor: '#ffd5d5ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOptions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  modalOption: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp(1),
    width: '40%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'purple',
    //  fontFamily: fonts.FONT_BOLD,
  },
  modalIcon: { width: wp(10), height: wp(10), marginBottom: hp(1) },
  modalOptionText: { fontSize: RFValue(12), fontWeight: '600', color: '#000' }
});





// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Pressable,
//   Dimensions,
//   Alert,
//   StatusBar,
//   ImageBackground
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { DrawerActions } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { fonts } from '../root/config';
// import { clearNotification, getNotification } from './notificationStorage';
// import { navigate } from './navigationRef';

// const { width, height } = Dimensions.get('window');

// const gridItems = [
//   {
//     title: 'My Attendance', icon: require('../assest/immigration_3125932.png'), screen: 'Attendance',
//     colors: ['#7871ff', '#6feaff']
//   },

//   {
//     title: 'My Timetable', icon: require('../assest/calendar_7528861.png'), screen: 'Timetable',
//     colors: ['#1FA2FF', '#5b3fe2ff', ]
//   },

//   {
//     title: 'My Homework', icon: require('../assest/homework_11647283.png'), screen: 'Homework',
//     colors: ['#490b76ff', '#ae75d6ff']
//   },

//   {
//     title: 'Exam', icon: require('../assest/exam_17030759.png'), screen: 'Exam',
//     colors: ['#046A38', '#28f08fff']
//   },

//   {
//     title: 'Progress Report', icon: require('../assest/test_5386526.png'), screen: 'ProgressReport',
//     colors: ['#F7971E', '#FFD200']
//   },

//   {
//     title: 'My Class', icon: require('../assest/teacher_11984957.png'), screen: 'Myclass',
//     colors: ['#00B4DB', '#0083B0']
//   },

//   {
//     title: 'Calendar', icon: require('../assest/date_5014284.png'), screen: 'Calender',
//     colors: ['#DA22FF', '#9733EE']
//   },

//   {
//     title: 'Fees', icon: require('../assest/receipt_8104817.png'), screen: 'Fees',
//     colors: ['#314755', '#26a0da']
//   },


//   {
//     title: 'Gallery', icon: require('../assest/photo_14627046.png'), isModal: true,
//     colors: ['#FF5F6D', '#FFC371']
//   },

//   {
//     title: 'Leave Request', icon: require('../assest/recipient_9101806.png'), screen: 'leave',
//     colors: ['#56CCF2', '#2F80ED']
//   },


//   {
//     title: 'Feedback', icon: require('../assest/feedback_18610975.png'), screen: 'Feedback',
//     colors: ['#8b0a46ff', '#ef519bff']
//   },

//   {
//     title: 'Route', icon: require('../assest/school-bus_16468513.png'), screen: 'Route',
//     colors: ['#12053c', '#99616eff',]
//   },

// ];


// const HomeScreen: React.FC<any> = ({ navigation, route }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [modalVisible, setModalVisible] = useState(false);
//   const [studentData, setStudentData] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem('mobile');
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );
//       console.log('res.data.studDetails==>', res.data.studDetails)
//       if (res.data.isSuccess && res.data.studDetails) {
//         const details = res.data.studDetails[0];
//         setStudentData({
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           image: details.photo_url,
//           roll: details.rollNo,
//           admission: details.admsn_no,
//         });
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch student data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStudentData();
//   }, []);


//   useEffect(() => {
//   const checkNotification = async () => {
//     const data = await getNotification();

//     if (data) {
//       console.log('✅ Navigating with data:', data);

//       clearNotification();

//       navigate('Notification', {
//         notificationData: data
//       });
//     }
//   };

//   checkNotification();
// }, []);
//   if (loading) return <Text style={{ textAlign: 'center', marginTop: hp(40) }}>Loading...</Text>;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />
//       <View >
//         <LinearGradient
//           colors={['#220876ff', '#3621baff']}
//           start={{ x: 0, y: 0.5 }}
//           end={{ x: 0, y: 0.9 }}

//           style={styles.header}

//         >
//           <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
//             <MaterialIcons name="menu" size={RFValue(24)} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.headerLogos}>
//             <Image source={require('../assest/vt-logo-login.png')} style={styles.logoLarge} />
//             <Image source={require('../assest/smile-logo.png')} style={styles.logoSmall} />
//           </View>
//         </LinearGradient>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.schoolCard}>
//           {/* <LinearGradient
//             colors={['#F1D302', '#8f885dff']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 0, y: 0.9 }}

//             style={styles.schoolCard}

//           > */}
//             {/* <Text style={styles.schoolName}>{studentData.institute_name}</Text> */}

//             <View style={styles.profileInfo}>
//               <ImageBackground
//                 source={
//                   studentData.image
//                     ? { uri: studentData.image }
//                     : require('../assest/icons8-administrator-male-50.png')
//                 }
//                 style={styles.bgImage}
//                 blurRadius={15} // 👈 BLUR AMOUNT (10–20 ideal)
//               >
//               {/* Foreground Profile Image */}
              
//               </ImageBackground>
//               <View style={{  width: wp('17%'), height: hp('8%'), borderRadius: 35 }}>
//                 <Image
//                   source={
//                     studentData.image
//                       ? { uri: studentData.image }
//                       : require('../assest/icons8-administrator-male-50.png')
//                   }
//                   style={styles.profileImage}
//                 />
//               </View>

//               <View style={styles.profileText}>
//                 <Text style={styles.profileName}>{studentData.name?.toUpperCase()}</Text>

//                 <Text style={styles.profileRole}>Class: {studentData.std} {studentData.section}</Text>
//                 <Text style={styles.profileClass}>Roll No: {studentData.roll}</Text>
//               </View>
//             </View>
//           {/* </LinearGradient> */}
//         </View>


//         {/* === GRID MENU === */}
//         {/* <View style={styles.gridContainer}>
//           {[
//             { title: 'My Attendance', icon: require('../assest/immigration_3125918.png'), screen: 'Attendance' },
//             { title: 'My Timetable', icon: require('../assest/calendar_5602938.png'), screen: 'Timetable' },
//             { title: 'My Homework', icon: require('../assest/homework_11647164.png'), screen: 'Homework' },
//             { title: 'Progress Report', icon: require('../assest/accomplish_14013958.png'), screen: 'ProgressReport' },
//             { title: 'My Class', icon: require('../assest/teacher_11984957.png'), screen: 'Myclass' },
//             { title: 'Exam', icon: require('../assest/exam_17030759.png'), screen: 'Exam' },
//             { title: 'Calendar', icon: require('../assest/date_5014284.png'), screen: 'Calender' },
//             { title: 'Route', icon: require('../assest/school-bus_16468513.png'), screen: 'Route' },
//             { title: 'Gallery', icon: require('../assest/photo_14627046.png'), isModal: true },
//             { title: 'Leave Request', icon: require('../assest/recipient_9101768.png'), screen: 'leave' },
//             { title: 'Feedback', icon: require('../assest/feedback_18610975.png'), screen: 'Feedback' },
//             { title: 'Fees', icon: require('../assest/receipt_8104817.png'), screen: 'Fees' },
//           ].map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.gridItem}
//               onPress={() => item.isModal ? setModalVisible(true) : navigation.navigate(item.screen, { orgid, studentId, mobile })}
//             >
//               <LinearGradient
//                 colors={['#231557', '#FF1361']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.gridGradient}
//               >
//                 <Image source={item.icon} style={styles.gridIcon} />
//               </LinearGradient>
//               <Text style={styles.gridText}>{item.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View> */}
//         <View style={styles.gridContainer}>
//           {gridItems.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.gridItem}
//               onPress={() =>
//                 item.isModal
//                   ? setModalVisible(true)
//                   : navigation.navigate(item.screen, { orgid, studentId, mobile })
//               }
//             >
//               <LinearGradient
//                 colors={item.colors}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.gridGradient}
//               >
//                 <Image source={item.icon} style={styles.gridIcon} />
//               </LinearGradient>
//               <Text style={styles.gridText}>{item.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>


//         {/* MODAL */}
//         <Modal
//           animationType="slide"
//           transparent
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalOptions}>
//                 <Pressable
//                   style={styles.modalOption}
//                   onPress={() => {
//                     setModalVisible(false);
//                     navigation.navigate('Gallery', { orgid, studentId, mobile });
//                   }}
//                 >
//                   <Image source={require('../assest/icons8-gallery-64.png')} style={styles.modalIcon} />
//                   <Text style={styles.modalOptionText}>Gallery</Text>
//                 </Pressable>

//                 <Pressable
//                   style={styles.modalOption}
//                   onPress={() => {
//                     setModalVisible(false);
//                     navigation.navigate('Video', { orgid, studentId, mobile });
//                   }}
//                 >
//                   <Image source={require('../assest/icons8-movies-folder-50.png')} style={styles.modalIcon} />
//                   <Text style={styles.modalOptionText}>Videos</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#f3f6fd' },
//   header: {
//     width: '100%',
//     height: hp(8),
//     // backgroundColor: '#220876ff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: wp(4),
//     justifyContent: 'space-between',
//   },
//   headerLogos: { flexDirection: 'row', alignItems: 'center', gap: wp(2), right: wp('25%') },
//   logoSmall: { width: wp(30), height: wp(10), resizeMode: 'contain' },
//   logoLarge: { width: wp(10), height: wp(10), resizeMode: 'contain', left: wp('1%') },
//   scrollContainer: { flexGrow: 1, paddingBottom: hp(10), alignItems: 'center' },
//   schoolCard: {
//     width: wp(100),
//     height: hp(16),
//     backgroundColor: 'blue',
//     padding: wp(5),
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     // marginTop: hp(2)
//   },
//   schoolName: { fontWeight: '800', fontSize: RFValue(18), color: '#fff', textAlign: 'center', marginBottom: hp(1) },
//   profileInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   profileImage: { width: wp(15), height: wp(15), borderRadius: 27, top: wp(1.8), left: wp(1.5), },
//   profileText: { flex: 1, marginLeft: wp(4) },
//   profileName: { fontSize: RFValue(16), fontFamily: fonts.FONT_BOLD, color: '#fff',top:wp(1.5)  },
//   profileRole: { color: '#fff', fontSize: RFValue(13), fontFamily: fonts.ROBOTO_BOLD,top:wp(1.5)  },
//   profileClass: { color: '#fff', fontSize: RFValue(13), fontFamily: fonts.ROBOTO_BOLD, top:wp(1.5)  },

//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(5),
//     marginTop: hp(2)
//   },
//   gridItem: {
//     width: wp(27),
//     alignItems: 'center',
//     marginBottom: hp(3)
//   },
//   gridGradient: {
//     width: wp(18),
//     height: wp(18),
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center', 
//     boxShadow: '0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1)',
//     borderColor:'#e6e6e6', borderWidth:1, borderStyle: 'solid', padding:10
//   },
//   gridIcon: { width: wp(10), height: wp(10), resizeMode: 'contain', tintColor: '#fff' },
//   gridText: { fontSize: RFValue(11), fontFamily: fonts.FONT_MEDIUM, color: '#000', textAlign: 'center', marginTop: hp(1), width: '120%' },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalContainer: {
//     width: wp(75),
//     height: hp(18),
//     borderRadius: 14,
//     padding: wp(4),
//     backgroundColor: '#ffd5d5ff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   modalOptions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
//   modalOption: {
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: hp(1),
//     width: '40%',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'purple',
//     //  fontFamily: fonts.FONT_BOLD,
//   },
//   modalIcon: { width: wp(10), height: wp(10), marginBottom: hp(1) },
//   modalOptionText: { fontSize: RFValue(12), fontWeight: '600', color: '#000' },
//   bgImage : {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     top: "-20%",
//     left: 0,
//     resizeMode: 'cover',
//     filter: "blur(30px)",
//     transform: "scale(1.2)",
//   }
// });
