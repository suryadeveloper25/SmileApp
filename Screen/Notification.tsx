

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image, ActivityIndicator, FlatList, Linking, } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { fonts } from '../root/config';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import notifee, { EventType } from '@notifee/react-native';

interface NotificationScreenProps {
  route: any;
  navigation: any;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile, clearBadge ,notificationData  } = route?.params || {};
    console.log('📦 Notification Data:', notificationData);
  const [tab, setTab] = useState('Other');
  const [loading, setLoading] = useState(true);

  // Student Data
  const [studentData, setStudentData] = useState<any>({});

  // Notifications
  const [notifyList, setNotifyList] = useState<any[]>([]);
  const [pdfNotifyList, setPDFNotifyList] = useState<any[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [soundInstance, setSoundInstance] = useState<any>(null);




  const fetchStudentData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isloggedIn');
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
      console.log('response.data.notify_list1234', response.data.notify_list)
      if (response.data.isSuccess) {
        setNotifyList(response.data.notify_list || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Notification Error:', error);
    }
  };

  const fetchPDFNotificationList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/pdf_notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId} `
      );
      console.log('response.data.pdf_notify_list===', response.data.pdf_notify_list)
      if (response.data.isSuccess && response.data.pdf_notify_list?.length) {
        setPDFNotifyList(response.data.pdf_notify_list);
      }
    } catch (error) {
      console.error('PDF Notification Error:', error);
    }
  };

  const playAudio = (fileName: string) => {
    if (!fileName) return console.log("No audio file found");

    // if same file tapped again -> Stop audio
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

    console.log("Try Play:", audioUrl);

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

  // const playAudio = (fileName: any) => {
  //   if (!fileName) return console.log("No audio file found");

  //   let audioUrl = fileName
  //     .replace("http://", "https://")
  //     .replace("vtsmile.in/app//", "vtsmile.in/app/");

  //   console.log("Try Play:", audioUrl);

  //   Sound.setCategory('Playback', true);

  //   const sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log("Audio load error:", error);
  //       return;
  //     }

  //     sound.play((success) => {
  //       if (!success) console.log("Playback failed");
  //       sound.release();
  //     });
  //   });
  // };



  useEffect(() => {
    const loadData = async () => {
      await fetchStudentData();
      // await fetchNotificationList();
      await fetchPDFNotificationList();
      setLoading(false);
    };
    loadData();
  }, []);



  useEffect(() => {
    fetchNotificationList();
    // 👁️ user viewed notifications → mark read
    clearBadge?.();
  }, []);



  //   useEffect(() => {
  //   // Foreground / background tap handling
  //   const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
  //     if (type === EventType.PRESS && detail.pressAction?.id === 'homeworkList') {
  //       navigation.navigate('Notification'); // 🔹 Your screen name
  //     }
  //   });

  //   // App opened from quit state
  //   notifee.getInitialNotification().then(initialNotification => {
  //     if (initialNotification?.pressAction?.id === 'homeworkList') {
  //       navigation.navigate('Notification');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [navigation]);


  const isValidFileUrl = (url?: string) => {
  if (!url || typeof url !== 'string') return false;

  // remove trailing spaces
  const cleanUrl = url.trim();

  // must not end with slash (folder)
  if (cleanUrl.endsWith('/')) return false;

  // must contain file extension
  return /\.(pdf|jpg|jpeg|png|doc|docx)$/i.test(cleanUrl);
};

const isValidAudioUrl = (url?: string) => {
  if (!url || typeof url !== 'string') return false;

  const cleanUrl = url.trim();

  return /\.(mp3|wav|aac|m4a|mp4)$/i.test(cleanUrl);
};
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (

    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title} numberOfLines={1}>
          {item.notify_title}
        </Text>
        <MaterialIcons name="notifications-none" size={16} color="#000" />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.message} numberOfLines={5}>
          {item.notify_msg}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(item.notify_pdf_url)}
        >
          <Image
            source={require('../assest/pdf_11180499.png')}
            style={styles.pdfIcon}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.row}>
        <MaterialIcons name="calendar-month" size={13} color="#999" style={{ marginRight: 5 }} />
        <Text style={styles.date}>{item.notify_date}</Text>
      </View>
    </View>

  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#830009', }}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={22} color="#fff" />
          </TouchableOpacity>
        </View>



        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'Other' && styles.tabActive]}
            onPress={() => setTab('Other')}
          >
            <Text style={[styles.tabText, tab === 'Other' && styles.tabTextActive]}>Other ({notifyList.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'PDF' && styles.tabActive]}
            onPress={() => setTab('PDF')}
          >
            <Text style={[styles.tabText, tab === 'PDF' && styles.tabTextActive]}>PDF ({pdfNotifyList.length})</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contentArea}>
          {tab === 'Other' ? (
            notifyList.length === 0 ? (
              <View style={styles.noNotif}>
                <Image source={require('../assest/smile-notifications-not-found.png')} style={styles.emptyImage} />
                <Text style={styles.noNotifText}>No Other notifications</Text>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <FlatList
                    data={notifyList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={{ backgroundColor: '#aec8ebff', marginBottom: 20, flex: 1, borderRadius: 12, padding: 15 }}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardTitle}>{item.notify_title || 'No Title'}</Text>
                          <MaterialIcons name="message" size={18} color="#444" />
                        </View>
                        <View style={styles.rowBetween}>
                          <Text style={styles.cardMessage}>{item.notify_msg || 'No Message'}</Text>
                       {isValidFileUrl(item.notify_attach) && (
                          <TouchableOpacity
                            onPress={() => Linking.openURL(item.notify_attach)}
                          >
                            <Image
                              source={require('../assest/pdf_11180499.png')}
                              style={styles.pdfIcon1}
                            />
                          </TouchableOpacity>
                         )}



                        </View>



                        {/* <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>

 
    {item.notify_attach ? (
      <TouchableOpacity
        style={styles.attachmentBtn}
        onPress={() => Linking.openURL(item.notify_attach)}
      >

        <MaterialIcons name="picture-as-pdf" size={20} color="#D32F2F" />
        <Text style={styles.attachmentText}>Open PDF</Text>
      </TouchableOpacity>
    ) : null}

 
   {item.audio_attach ? (
      <TouchableOpacity
        style={styles.attachmentBtn}
        onPress={() => playAudio(item.audio_attach)}
      >
        <MaterialIcons name="play-circle-fill" size={22} color="black" />
        <Text style={styles.attachmentText}>Play Audio</Text>
      </TouchableOpacity>
    ) : null}
   </View>   */}

                        <View style={styles.cardFooter}>

                          <MaterialIcons name="calendar-month" size={14} color="#3d3b3bff" />
                          <Text style={styles.cardDate}>{item.notify_date}</Text>
                          <View>
                            {isValidAudioUrl(item.audio_attach) && (
                            <TouchableOpacity onPress={() => playAudio(item.audio_attach)}>
                              {currentPlaying === item.audio_attach ? (
                                <MaterialIcons name="pause-circle-filled" size={24} color="red"  />
                              ) : (
                                <MaterialIcons name="play-circle-fill" size={24} color="black" />
                              )}
                            </TouchableOpacity>
                            )}
                          </View>


                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            )
          ) : (
            pdfNotifyList.length === 0 ? (
              <View style={styles.noNotif}>
                <Image source={require('../assest/smile-notifications-not-found.png')} style={styles.emptyImage} />
                <Text style={styles.noNotifText}>No PDF notifications</Text>
              </View>
            ) : (
              <FlatList
                data={pdfNotifyList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )
          )}


        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7c43bd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 60, marginBottom: 40

  },
  attachmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    elevation: 2,
    bottom: 13
  },
  attachmentText: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#333'
  }
  ,
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',

  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.ROBOTO_BOLD,
    color: '#000',
    width: '85%',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  message: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    fontFamily: fonts.ROBOTO_MEDIUM,
    marginRight: 10,
  },
  pdfIcon: {
    tintColor: '#f64444ff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    top: 5
  },
  pdfIcon1: {
    tintColor: '#f64444ff',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    bottom: 5
  },
  date: {
    fontSize: 12,
    color: '#888',
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  notificationItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.FONT_BOLD
  },
  emptyImage: {
    width: 152,
    height: 152,
    marginBottom: 16,
  },
  bellWrapper: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 6,
  },
  tabWrapper: {
    width: '95%', height: 60, right: 8,
    flexDirection: 'row',
    backgroundColor: '#ede6fc',
    borderRadius: 15,
    margin: 16,
    padding: 4,
    justifyContent: 'center',
  },
  tabBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 18,
    borderRadius: 10, backgroundColor: '#def8faff',
    marginHorizontal: 2, width: "45%", height: 40, marginTop: 5, right: 5,
  },
  tabActive: {
    backgroundColor: '#ffbe75',

  },
  tabText: {
    color: '#7b53ef',
    fontFamily: fonts.FONT_BOLD,
    fontSize: 14,
    marginLeft: 25,

  },
  tabTextActive: {
    color: '#fff',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#f6f8e7',
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 0, borderWidth: 1, borderColor: '#72736fff',
    padding: 10, marginBottom: 70
  },
  cardContainer: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#d2c5f6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: fonts.FONT_BOLD,
    fontSize: 15,
    color: '#444',
  },
  cardMessage: {
    fontSize: 14,
    color: '#474747',
    marginBottom: 12,
    fontFamily: fonts.ROBOTO_MEDIUM
  },
  cardFooter: {
    flexDirection: 'row',
   justifyContent:'space-between',
    alignItems: 'center',
    opacity: 0.7,
  },
  cardDate: {
    marginLeft: wp(-25),
    fontSize: 12,
    color: '#3e3838ff',
    fontFamily: fonts.ROBOTO_MEDIUM
  },
  swipeHint: {
    textAlign: 'right',
    color: '#e2810b',
    margin: 7,
    fontSize: 13,
  },
  noNotif: {
    flex: 1,
    alignItems: 'center',
    marginTop: 32,
  },
  noNotifText: {
    color: '#151515ff',
    fontSize: 15,
    fontFamily: fonts.FONT_BOLD
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
});

export default NotificationScreen;

