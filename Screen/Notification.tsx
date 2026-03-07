

// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList, Linking, } from 'react-native';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { fonts } from '../root/config';
// import Sound from 'react-native-sound';
// import { useFocusEffect } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import notifee, { EventType } from '@notifee/react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface NotificationScreenProps {
//   route: any;
//   navigation: any;
// }

// const NotificationScreen: React.FC<NotificationScreenProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile, clearBadge, notificationData } = route?.params || {};
//   // console.log('📦 Notification Data:', notificationData);
//   const [tab, setTab] = useState('Other');
//   const [loading, setLoading] = useState(true);

//   // Student Data
//   const [studentData, setStudentData] = useState<any>({});

//   // Notifications
//   const [notifyList, setNotifyList] = useState<any[]>([]);
//   const [pdfNotifyList, setPDFNotifyList] = useState<any[]>([]);
//   const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
//   const [soundInstance, setSoundInstance] = useState<any>(null);




//   const fetchStudentData = async () => {
//     try {
//       const loggedIn = await AsyncStorage.getItem('isloggedIn');
//       const mobileNo = await AsyncStorage.getItem('mobile');

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );

//       if (response.data.isSuccess && response.data.studDetails?.length) {
//         const details = response.data.studDetails[0];
//         setStudentData({
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           imageURL: details.photo_url,
//           roll: details.rollNo,
//           dob: details.dob,
//           blood: details.blood_group,
//           gender: details.gender,
//           father: details.father_name,
//           mother: details.mother_name,
//           medium: details.medium,
//           email: details.email_Id,
//           teacher: details.staff_name,
//           address: details.address,
//           admission: details.admsn_no,
//         });
//       }
//     } catch (error) {
//       console.error('Student Data Error:', error);
//     }
//   };

//   const fetchNotificationList = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
//       );
//       // console.log('response.data.notify_list1234', response.data.notify_list)
//       if (response.data.isSuccess) {
//         setNotifyList(response.data.notify_list || []);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Notification Error:', error);
//     }
//   };

//   const fetchPDFNotificationList = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/pdf_notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId} `
//       );
//       // console.log('response.data.pdf_notify_list===', response.data.pdf_notify_list)
//       if (response.data.isSuccess && response.data.pdf_notify_list?.length) {
//         setPDFNotifyList(response.data.pdf_notify_list);
//       }
//     } catch (error) {
//       console.error('PDF Notification Error:', error);
//     }
//   };

//   const playAudio = (fileName: string) => {
//     if (!fileName) return console.log("No audio file found");

//     // if same file tapped again -> Stop audio
//     if (currentPlaying === fileName && soundInstance) {
//       soundInstance.stop(() => {
//         soundInstance.release();
//         setSoundInstance(null);
//         setCurrentPlaying(null);
//       });
//       return;
//     }

//     let audioUrl = fileName
//       .replace("http://", "https://")
//       .replace("vtsmile.in/app//", "vtsmile.in/app/");

//     console.log("Try Play:", audioUrl);

//     Sound.setCategory('Playback', true);

//     const sound = new Sound(audioUrl, undefined, (error) => {
//       if (error) {
//         console.log("Audio load error:", error);
//         return;
//       }

//       setSoundInstance(sound);
//       setCurrentPlaying(fileName);

//       sound.play((success) => {
//         if (!success) console.log("Playback failed");
//         sound.release();
//         setSoundInstance(null);
//         setCurrentPlaying(null);
//       });
//     });
//   };



//   useEffect(() => {
//     const loadData = async () => {
//       await fetchStudentData();
//       // await fetchNotificationList();
//       await fetchPDFNotificationList();
//       setLoading(false);
//     };
//     loadData();
//   }, []);



//   useEffect(() => {
//     fetchNotificationList();
//     // 👁️ user viewed notifications → mark read
//     clearBadge?.();
//   }, []);



//   const isValidFileUrl = (url?: string) => {
//     if (!url || typeof url !== 'string') return false;

//     // remove trailing spaces
//     const cleanUrl = url.trim();

//     // must not end with slash (folder)
//     if (cleanUrl.endsWith('/')) return false;

//     // must contain file extension
//     return /\.(pdf|jpg|jpeg|png|doc|docx)$/i.test(cleanUrl);
//   };

//   const isValidAudioUrl = (url?: string) => {
//     if (!url || typeof url !== 'string') return false;

//     const cleanUrl = url.trim();

//     return /\.(mp3|wav|aac|m4a|mp4)$/i.test(cleanUrl);
//   };
//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }: any) => (

//     <View style={styles.card}>
//       <View style={styles.rowBetween}>
//         <Text style={styles.title} numberOfLines={1}>
//           {item.notify_title}
//         </Text>
//         <MaterialIcons name="notifications-none" size={16} color="#000" />
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.row}>
//         <Text style={styles.message} numberOfLines={5}>
//           {item.notify_msg}
//         </Text>
//         <TouchableOpacity
//           onPress={() => Linking.openURL(item.notify_pdf_url)}
//         >
//           <Image
//             source={require('../assest/pdf_11180499.png')}
//             style={styles.pdfIcon}
//           />
//         </TouchableOpacity>

//       </View>

//       <View style={styles.row}>
//         <MaterialIcons name="calendar-month" size={13} color="#999" style={{ marginRight: 5 }} />
//         <Text style={styles.date}>{item.notify_date}</Text>
//       </View>
//     </View>

//   );


//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#6A1B9A', }}>
//       <View style={styles.container}>
//         <View style={styles.headerBar}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <TouchableOpacity>
//             <MaterialIcons name="notifications-none" size={22} color="#fff" />
//           </TouchableOpacity>
//         </View>



//         <View style={styles.tabWrapper}>
//           <TouchableOpacity
//             style={[styles.tabBtn, tab === 'Other' && styles.tabActive]}
//             onPress={() => setTab('Other')}
//           >
//             <Text style={[styles.tabText, tab === 'Other' && styles.tabTextActive]}>Other ({notifyList.length})</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tabBtn, tab === 'PDF' && styles.tabActive]}
//             onPress={() => setTab('PDF')}
//           >
//             <Text style={[styles.tabText, tab === 'PDF' && styles.tabTextActive]}>PDF ({pdfNotifyList.length})</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.contentArea}>
//           {tab === 'Other' ? (
//             notifyList.length === 0 ? (
//               <View style={styles.noNotif}>
//                 <Image source={require('../assest/smile-notifications-not-found.png')} style={styles.emptyImage} />
//                 <Text style={styles.noNotifText}>No Other notifications</Text>
//               </View>
//             ) : (
//               <View style={styles.cardContainer}>
//                 <View style={styles.card}>
//                   <FlatList
//                     data={notifyList}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                       <View style={{ backgroundColor: '#aec8ebff', marginBottom: 20, flex: 1, borderRadius: 12, padding: 15 }}>
//                         <View style={styles.cardHeader}>
//                           <Text style={styles.cardTitle}>{item.notify_title || 'No Title'}</Text>
//                           <MaterialIcons name="message" size={18} color="#444" />
//                         </View>
//                         <View style={styles.rowBetween}>
//                           <Text style={styles.cardMessage}>{item.notify_msg || 'No Message'}</Text>
//                           {isValidFileUrl(item.notify_attach) && (
//                             <TouchableOpacity
//                               onPress={() => Linking.openURL(item.notify_attach)}
//                             >
//                               <Image
//                                 source={require('../assest/pdf_11180499.png')}
//                                 style={styles.pdfIcon1}
//                               />
//                             </TouchableOpacity>
//                           )}



//                         </View>


//                         <View style={styles.cardFooter}>

//                           <MaterialIcons name="calendar-month" size={14} color="#3d3b3bff" />
//                           <Text style={styles.cardDate}>{item.notify_date}</Text>
//                           <View>
//                             {isValidAudioUrl(item.audio_attach) && (
//                               <TouchableOpacity onPress={() => playAudio(item.audio_attach)}>
//                                 {currentPlaying === item.audio_attach ? (
//                                   <MaterialIcons name="pause-circle-filled" size={24} color="red" />
//                                 ) : (
//                                   <MaterialIcons name="play-circle-fill" size={24} color="black" />
//                                 )}
//                               </TouchableOpacity>
//                             )}
//                           </View>


//                         </View>
//                       </View>
//                     )}
//                   />
//                 </View>
//               </View>
//             )
//           ) : (
//             pdfNotifyList.length === 0 ? (
//               <View style={styles.noNotif}>
//                 <Image source={require('../assest/smile-notifications-not-found.png')} style={styles.emptyImage} />
//                 <Text style={styles.noNotifText}>No PDF notifications</Text>
//               </View>
//             ) : (
//               <FlatList
//                 data={pdfNotifyList}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={renderItem}
//                 showsVerticalScrollIndicator={false}
//               />
//             )
//           )}


//         </ScrollView>

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ffffff', width: "100%", },
//   headerBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#6A1B9A',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     height: 60, marginBottom: 40

//   },
//   attachmentBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginRight: 10,
//     elevation: 2,
//     bottom: 13
//   },
//   attachmentText: {
//     marginLeft: 6,
//     fontWeight: '600',
//     color: '#333'
//   }
//   ,
//   row: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',

//   },

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 14,
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: '#000',
//     width: '85%',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 5,
//   },
//   message: {
//     flex: 1,
//     fontSize: 13,
//     color: '#333',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     marginRight: 10,
//   },
//   pdfIcon: {
//     tintColor: '#f64444ff',
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     top: 5
//   },
//   pdfIcon1: {
//     tintColor: '#f64444ff',
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     bottom: 5
//   },
//   date: {
//     fontSize: 12,
//     color: '#888',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//   },
//   notificationItem: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 5,
//     borderRadius: 5,
//   },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: fonts.FONT_BOLD
//   },
//   emptyImage: {
//     width: 152,
//     height: 152,
//     marginBottom: 16,
//   },
//   bellWrapper: {
//     alignItems: 'center',
//     marginTop: -20,
//     marginBottom: 6,
//   },
//   tabWrapper: {
//     width: '95%', height: 60, right: 8,
//     flexDirection: 'row',
//     backgroundColor: '#ede6fc',
//     borderRadius: 15,
//     margin: 16,
//     padding: 4,
//     justifyContent: 'center',
//   },
//   tabBtn: {
//     flexDirection: 'row', alignItems: 'center',
//     paddingVertical: 10, paddingHorizontal: 18,
//     borderRadius: 10, backgroundColor: '#def8faff',
//     marginHorizontal: 2, width: "45%", height: 40, marginTop: 5, right: 5,
//   },
//   tabActive: {
//     backgroundColor: '#ffbe75',

//   },
//   tabText: {
//     color: '#7b53ef',
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: 14,
//     marginLeft: 25,

//   },
//   tabTextActive: {
//     color: '#fff',
//   },
//   contentArea: {
//     flex: 1,
//     backgroundColor: '#f6f8e7',
//     borderRadius: 12,
//     marginHorizontal: 8,
//     marginTop: 0, borderWidth: 1, borderColor: '#72736fff',
//     padding: 10, marginBottom: 80
//   },
//   cardContainer: {
//     marginVertical: 8,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 10,
//     shadowColor: '#d2c5f6',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.25,
//     elevation: 1,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontFamily: fonts.FONT_BOLD,
//     fontSize: 15,
//     color: '#444',
//   },
//   cardMessage: {
//     fontSize: 14,
//     color: '#474747',
//     marginBottom: 12,
//     fontFamily: fonts.ROBOTO_MEDIUM
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     opacity: 0.7,
//   },
//   cardDate: {
//     marginLeft: wp(-25),
//     fontSize: 12,
//     color: '#3e3838ff',
//     fontFamily: fonts.ROBOTO_MEDIUM
//   },
//   swipeHint: {
//     textAlign: 'right',
//     color: '#e2810b',
//     margin: 7,
//     fontSize: 13,
//   },
//   noNotif: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 32,
//   },
//   noNotifText: {
//     color: '#151515ff',
//     fontSize: 15,
//     fontFamily: fonts.FONT_BOLD
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     paddingVertical: 7,
//     backgroundColor: '#fff',
//   },
// });

// export default NotificationScreen;



import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Linking, Platform, StatusBar } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { fonts } from '../root/config';
import Sound from 'react-native-sound';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import notifee, { EventType } from '@notifee/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NotificationScreenProps {
  route: any;
  navigation: any;
}

interface GroupedNotification {
  date: string;
  formattedDate: string;
  notifications: any[];
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile, clearBadge, notificationData } = route?.params || {};
  const [tab, setTab] = useState('Other');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Helper function to parse date from "24-02-2026 06:00:55 PM" format
  const parseDate = (dateString: string): Date => {
    try {
      const datePart = dateString.split(' ')[0];
      const [day, month, year] = datePart.split('-');
      return new Date(`${year}-${month}-${day}`);
    } catch (error) {
      console.log('Date parsing error:', error);
      return new Date();
    }
  };

  const extractDateOnly = (dateString: string): string => {
    return dateString.split(' ')[0];
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = parseDate(dateString);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return dateString;
    }
  };

  const groupNotificationsByDate = (notifications: any[]): GroupedNotification[] => {
    const grouped: { [key: string]: any[] } = {};

    const sorted = [...notifications].sort((a, b) => {
      try {
        const dateA = parseDate(a.notify_date).getTime();
        const dateB = parseDate(b.notify_date).getTime();
        return dateB - dateA;
      } catch (error) {
        return 0;
      }
    });

    sorted.forEach((notification) => {
      const dateKey = extractDateOnly(notification.notify_date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(notification);
    });

    return Object.keys(grouped).map(dateKey => ({
      date: dateKey,
      formattedDate: formatDate(dateKey),
      notifications: grouped[dateKey],
    }));
  };

  const [studentData, setStudentData] = useState<any>({});
  const [notifyList, setNotifyList] = useState<any[]>([]);
  const [groupedNotifyList, setGroupedNotifyList] = useState<GroupedNotification[]>([]);
  const [pdfNotifyList, setPDFNotifyList] = useState<any[]>([]);
  const [groupedPdfNotifyList, setGroupedPdfNotifyList] = useState<GroupedNotification[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [soundInstance, setSoundInstance] = useState<any>(null);

  const fetchStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('mobile');
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (response.data.isSuccess && response.data.studDetails?.length) {
        const details = response.data.studDetails[0];
        setStudentData({
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          imageURL: details.photo_url,
          roll: details.rollNo,
          dob: details.dob,
          blood: details.blood_group,
          gender: details.gender,
          father: details.father_name,
          mother: details.mother_name,
          medium: details.medium,
          email: details.email_Id,
          teacher: details.staff_name,
          address: details.address,
          admission: details.admsn_no,
        });
      }
    } catch (error) {
      console.error('Student Data Error:', error);
    }
  };

  const fetchNotificationList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );
      // console.log( response.data.notify_list,' response.data.notify_list==>')
      if (response.data.isSuccess) {
        const notificationList = response.data.notify_list || [];
        setNotifyList(notificationList);
        const grouped = groupNotificationsByDate(notificationList);
        setGroupedNotifyList(grouped);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Notification Error:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchPDFNotificationList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/pdf_notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );
      // console.log(response.data.pdf_notify_list,"response.data.pdf_notify_list===>")
      if (response.data.isSuccess && response.data.pdf_notify_list?.length) {
        const pdfList = response.data.pdf_notify_list;
        setPDFNotifyList(pdfList);
        const grouped = groupNotificationsByDate(pdfList);
        setGroupedPdfNotifyList(grouped);
      }
    } catch (error) {
      console.error('PDF Notification Error:', error);
    }
  };

  const isValidFileUrl = (url?: string) => {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.trim();
    if (cleanUrl.endsWith('/')) return false;
    return /\.(pdf|jpg|jpeg|png|doc|docx)$/i.test(cleanUrl);
  };

  const isValidAudioUrl = (url?: string) => {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.trim();
    if (cleanUrl.endsWith('/')) return false;
    return /\.(mp3|wav|aac|m4a|mp4)$/i.test(cleanUrl);
  };

  const playAudio = (fileName: string) => {
    if (!fileName) return console.log("No audio file found");

    if (currentPlaying === fileName && soundInstance) {
      soundInstance.stop(() => {
        soundInstance.release();
        setSoundInstance(null);
        setCurrentPlaying(null);
      });
      return;
    }

    let audioUrl = fileName
      .replace("http://", "https://")
      .replace("vtsmile.in/app//", "vtsmile.in/app/");

    Sound.setCategory('Playback', true);

    const sound = new Sound(audioUrl, undefined, (error) => {
      if (error) {
        console.log("Audio load error:", error);
        return;
      }

      setSoundInstance(sound);
      setCurrentPlaying(fileName);

      sound.play((success) => {
        if (!success) console.log("Playback failed");
        sound.release();
        setSoundInstance(null);
        setCurrentPlaying(null);
      });
    });
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    const loadData = async () => {
      await fetchStudentData();
      await fetchPDFNotificationList();
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    fetchNotificationList();
    clearBadge?.();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotificationList();
    await fetchPDFNotificationList();
  };

  if (loading) {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: '#6A1B9A' }}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6A1B9A" />
          <Text style={styles.loadingText}>Loading Notifications...</Text>
        </View>
      // </SafeAreaView>
    );
  }

  const NotificationCardItem = ({ item }: any) => (
    <View style={styles.notificationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="message" size={wp(5)} color="#6A1B9A" />
          <Text style={styles.cardTitle} numberOfLines={1}>{item.notify_title || 'No Title'}</Text>
        </View>
      </View>
      {/* <View style={styles.divider} /> */}
      <View style={styles.cardMessageContainer}>
        <Text style={styles.cardMessage} numberOfLines={2}>{item.notify_msg || 'No Message'}</Text>
        {isValidFileUrl(item.notify_attach) && (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.notify_attach)}
            style={styles.attachIconContainer}
          >
            <View>
             <Image
                source={require('../assest/pdf_11180499.png')}
                 style={styles.pdfIcon1} />
              {/* <MaterialIcons name="picture-as-pdf" size={wp(5)} color="#FF5252" /> */}
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateTimeContainer}>
          <MaterialIcons name="access-time" size={wp(3.5)} color="#5d5b5b" />
          <Text style={styles.cardDate}>{item.notify_date}</Text>
        </View>

        {isValidAudioUrl(item.audio_attach) && (
          <TouchableOpacity 
            onPress={() => playAudio(item.audio_attach)}
          
          >
            <View style={[styles.audioButtonInner, currentPlaying === item.audio_attach && styles.audioPlaying]}>
              <MaterialIcons 
                name={currentPlaying === item.audio_attach ? "pause" : "play-arrow"} 
                size={wp(4.5)} 
                color={currentPlaying === item.audio_attach ? "#FF5252" : "#6A1B9A"} 
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const PDFCardItem = ({ item }: any) => (
    <View style={styles.pdfCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="message" size={wp(5)} color="#6A1B9A"/>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.notify_title || 'No Title'}</Text>
        </View>
      </View>

      {/* <View style={styles.divider} /> */}

      <View style={styles.cardMessageContainer}>
        <Text style={styles.cardMessage} numberOfLines={2}>{item.notify_msg || 'No Message'}</Text>
        {isValidFileUrl(item.notify_pdf_url) && (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.notify_pdf_url)}
            style={styles.attachIconContainer}
          >
            <View>
               <Image
                source={require('../assest/pdf_11180499.png')}
                 style={styles.pdfIcon1} />
              {/* <MaterialIcons name="picture-as-pdf" size={wp(5)} color="#b41010" /> */}
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateTimeContainer}>
          <MaterialIcons name="calendar-month" size={wp(3.5)} color="#7A7A7A" />
          <Text style={styles.cardDate}>{item.notify_date}</Text>
        </View>
      </View>
    </View>
  );

  const DateHeader = ({ formattedDate }: any) => (
    <View style={styles.dateHeaderContainer}>
      <View style={styles.dateIconBg}>
        <MaterialIcons name="calendar-month" size={wp(5)} color="#FFFFFF" />
      </View>
      <Text style={styles.dateHeader}>{formattedDate}</Text>
    </View>
  );

  const EmptyState = ({ message }: any) => (
    <View style={styles.noNotif}>
      <MaterialIcons name="notifications-off" size={wp(15)} color="#D0D0D0" />
      <Text style={styles.noNotifText}>{message}</Text>
      <Text style={styles.noNotifSubtext}>Check back later for updates</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6A1B9A' }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <MaterialIcons name="arrow-back" size={wp(6)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <MaterialIcons name="notifications-active" size={wp(6)} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tab Section */}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'Other' && styles.tabActive]}
            onPress={() => setTab('Other')}
          >
            <MaterialIcons 
              name="mail" 
              size={wp(4)} 
              color={tab === 'Other' ? '#fff' : '#7B68BE'} 
              style={{ marginRight: wp(1.5) }}
            />
            <Text style={[styles.tabText, tab === 'Other' && styles.tabTextActive]}>
              Other ({notifyList.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, tab === 'PDF' && styles.tabActive]}
            onPress={() => setTab('PDF')}
          >
            <MaterialIcons 
              name="picture-as-pdf" 
              size={wp(4)} 
              color={tab === 'PDF' ? '#fff' : '#7B68BE'} 
              style={{ marginRight: wp(1.5) }}
            />
            <Text style={[styles.tabText, tab === 'PDF' && styles.tabTextActive]}>
              PDF ({pdfNotifyList.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <ScrollView 
          style={styles.contentArea}
           contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 1 }}
          onScroll={handleRefresh}
        >
          {tab === 'Other' ? (
            groupedNotifyList.length === 0 ? (
              <EmptyState message="No notifications yet" />
            ) : (
              <View style={styles.notificationsList}>
                {groupedNotifyList.map((group, groupIndex) => (
                  <View key={groupIndex}>
                    <DateHeader formattedDate={group.formattedDate} />
                    {group.notifications.map((item, notifIndex) => (
                      <NotificationCardItem key={notifIndex} item={item} />
                    ))}
                  </View>
                ))}
              </View>
            )
          ) : (
            groupedPdfNotifyList.length === 0 ? (
              <EmptyState message="No PDF files" />
            ) : (
              <View style={styles.notificationsList}>
                {groupedPdfNotifyList.map((group, groupIndex) => (
                  <View key={groupIndex}>
                    <DateHeader formattedDate={group.formattedDate} />
                    {group.notifications.map((item, notifIndex) => (
                      <PDFCardItem key={notifIndex} item={item} />
                    ))}
                  </View>
                ))}
              </View>
            )
          )}
          {/* <View style={styles.bottomPadding} /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6A1B9A',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    // elevation: 6,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.3,
  },
  headerBtn: {
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: wp(5.5),
    fontFamily: fonts.FONT_BOLD,
    fontWeight: '700',
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1.8),
    marginHorizontal: wp(3),
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    backgroundColor: '#F3E5F5',
    borderRadius: wp(2.5),
    elevation: 2,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
  },
  dateIconBg: {
    backgroundColor: '#6A1B9A',
    borderRadius: wp(2),
    padding: wp(1.5),
    marginRight: wp(2),
  },
  dateHeader: {
    fontSize: wp(3.8),
    fontFamily: fonts.FONT_BOLD,
    color: '#6A1B9A',
    fontWeight: '600',
  },
  notificationsList: {
    paddingVertical: hp(1),
  },
  notificationCard: {
    backgroundColor: '#E8F0FF',
    marginBottom: hp(1.5),
    borderRadius: wp(3),
    padding: wp(4),
    marginHorizontal: wp(3),
    borderLeftWidth: wp(1),
    borderLeftColor: '#6A1B9A',
    elevation: 2,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
  },
  pdfCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(1.5),
    marginHorizontal: wp(3),
    borderLeftWidth: wp(1),
    borderLeftColor: '#FF5252',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: '#6A1B9A',
    marginRight: wp(2),
  },
  cardTitle: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 18,
    color: '#2C2C2C',
    flex: 1,
    marginLeft:10,bottom:3

  },
    pdfIcon1: {
    tintColor: '#f64444ff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    bottom: 5
  },
  cardMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1.5),
  },
  cardMessage: {
    fontSize: 15,
    color: '#3a3939',
    fontFamily: fonts.ROBOTO_MEDIUM,
    flex: 1,
    lineHeight: wp(5),
  },
  attachIconContainer: {
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBadge: {
    backgroundColor: '#051994',
    borderRadius: wp(2.5),
    padding: wp(2),
    elevation: 1,
  },
  openPdfBadge: {
    backgroundColor: '#FF5252',
    borderRadius: wp(2.5),
    padding: wp(2),
    elevation: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(1.2),
    // borderTopWidth: 0.5,
    // borderTopColor: '#E0E0E0',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardDate: {
    marginLeft: wp(1.5),
    fontSize: wp(3),
    color: '#5d5b5b',
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  audioButton: {
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButtonInner: {
    backgroundColor: '#F5F5F5',
    borderRadius: wp(2.5),
    padding: wp(2),
    elevation: 1,
    left:5
  },
  audioPlaying: {
    backgroundColor: '#FFEBEE',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#E0E0E0',
    marginVertical: hp(1),
  },
  loader: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#6A1B9A',
    fontFamily: fonts.FONT_BOLD,
    fontWeight: '600',
  },
  tabWrapper: {
    width: wp(90),
    height: hp(6),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#e2d6e3',
    borderRadius: wp(3),
    marginVertical: hp(1.5),
    paddingVertical: wp(1),
    paddingHorizontal: wp(1),
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2.5),
    backgroundColor: '#ffffffef',
    marginHorizontal: wp(0.8),
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.08,
  },
  tabActive: {
    backgroundColor: '#6A1B9A',
    elevation: 4,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  tabText: {
    color: '#7B68BE',
    fontFamily: fonts.FONT_BOLD,
    fontSize: 15,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    // paddingVertical: hp(1),
  },
  scrollContent: {  paddingBottom: hp(30) },
  bottomPadding: {
    height: hp(2),
  },
  noNotif: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(5),
  },
  noNotifText: {
    color: '#8A8A8A',
    fontSize: wp(4),
    fontFamily: fonts.FONT_BOLD,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: hp(2),
  },
  noNotifSubtext: {
    color: '#BDBDBD',
    fontSize: wp(3.2),
    fontFamily: fonts.ROBOTO_MEDIUM,
    textAlign: 'center',
    marginTop: hp(1),
  },
});

export default NotificationScreen;