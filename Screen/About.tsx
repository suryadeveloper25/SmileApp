

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Dimensions,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../root/userAction';
import { Divider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import messaging from '@react-native-firebase/messaging';
// For Responsive Layout
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../root/config';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AboutScreenProps {
  route: any;
  navigation: any;
}
const AboutScreen: React.FC<AboutScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [showDropdown, setShowDropdown] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const dispatch = useDispatch();


  const Logout = async () => {
    try {
      await messaging().deleteToken();
      await AsyncStorage.removeItem("isloggedIn");
      await AsyncStorage.removeItem("mobile");
      dispatch(logoutAction());
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });

      showMessage({
        message: "Logged Out",
        description: "You have successfully logged out!",
        type: "success",
        backgroundColor: "#1E90FF",
        color: "#FFFFFF",
      });
    } catch (e) {
      console.log("Logout error", e);
      showMessage({
        message: "Logout Failed",
        description: "Something went wrong. Please try again!",
        type: "danger",
        backgroundColor: "#FF4C4C",
        color: "#FFFFFF",
      });
    }
  };


  const handleLogoutPress = () => {
    setCustomAlertVisible(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowDropdown(false);
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#830009' }}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Setting', { orgid, studentId, mobile })}>
              <MaterialIcons
                name="arrow-back"
                size={RFValue(26)}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>About</Text>

            {/* Menu Dropdown */}
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                <Image
                  source={require('../assest/icons8-menu-vertical-50.png')}
                  style={styles.menuIcon}
                />
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Setting');
                    }}
                    style={styles.dropdownItem}
                  >
                    <MaterialIcons name="settings" size={20} color="red" />
                    <Text style={styles.dropdownText}>Settings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogoutPress}
                    style={styles.dropdownItem}
                  >
                    <MaterialIcons name="logout" size={20} color="red" />
                    <Text style={styles.dropdownText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Top Section */}
          <View style={styles.topSection}>
            <Image
              source={require('../assest/ic_notification.png')}
              style={styles.aboutImage}
            />
            <Text style={styles.aboutTitle}>About SMILE Faculty App</Text>
          </View>

          {/* Info Section */}
          <View style={styles.form}>
            <Text style={styles.aboutDescription}>
              {`SMILE Faculty – ERP provides your school with a branded mobile app available for download on the Google Play Store. This app offers tailored access for management, faculty, students, and parents to engage in their respective activities. Through this app, student attendance can be easily tracked, and can be conveniently processed. Additionally, the app facilitates seamless communication from the management and faculty, ensuring that all school-related updates and activities are effectively shared.`}
            </Text>

            <Text style={styles.poweredText}>- Powered by VT Technologies</Text>
          </View>

          {/* Custom Logout Modal */}
          <Modal
            visible={customAlertVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setCustomAlertVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcons name="crisis-alert" size={24} style={styles.icon2} />
                  <Text style={styles.modalTitle}>Confirm Logout</Text>
                </View>

                <Divider style={styles.divider} />
                <Text style={styles.modalMessage}>
                  Are you sure, you want to Logout?
                </Text>

                <View style={styles.modalButtonRow}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#bcc6fbff' }]}
                    onPress={() => setCustomAlertVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#e53935' }]}
                    onPress={() => {
                      setCustomAlertVisible(false);
                      Logout();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ---------- HEADER ----------
  header: {
    width: '100%',
    height: hp('8%'),
    backgroundColor: '#730673ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
  },
  backIcon: {
    color: '#fff',
  },
  headerText: {
    fontSize: hp('2.8%'),
    fontFamily: fonts.FONT_BOLD,
    color: '#fff',
    marginLeft: wp('35%'),
  },
  menuWrapper: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('1%'),
  },
  menuIcon: {
    top: hp(1),
    width: wp('8%'),
    height: wp('8%'),
    tintColor: '#fff',
  },

  // ---------- DROPDOWN ----------
  dropdown: {
    position: 'absolute',
    top: hp('5.5%'),
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 10,
    width: wp('38%'),
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  dropdownText: {
    fontSize: hp('1.9%'),
    color: '#333',
    marginLeft: wp('2%'),
    fontFamily: fonts.FONT_BOLD,
  },

  // ---------- TOP SECTION ----------
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: hp('25%'),
    backgroundColor: '#730673ff',
    borderBottomRightRadius: wp('4%'),
    borderBottomLeftRadius: wp('4%'),
  },
  aboutImage: {
    width: wp('18%'),
    height: wp('18%'),
    marginBottom: hp('1%'),
  },
  aboutTitle: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontFamily: fonts.ROBOTO_BOLD,
  },

  // ---------- FORM / INFO ----------
  form: {
    backgroundColor: '#c8faeeff',
    marginHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    padding: wp('5%'),
    elevation: 3,
    marginTop: -hp('3%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  aboutDescription: {
    color: '#6a6666ff',
    fontSize: hp('1.9%'),
    textAlign: 'justify',
    lineHeight: hp('2.7%'),
    fontFamily: fonts.ROBOTO_REGULAR,
  },
  poweredText: {
    color: '#000',
    fontSize: hp('2%'),
    fontFamily: fonts.FONT_BOLD,
    marginTop: hp('1.5%'),
  },

  // ---------- MODAL ----------
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: wp('80%'),
    backgroundColor: '#fbfbfbff',
    borderRadius: 12,
    paddingVertical: hp('3%'),
    alignItems: 'center',

  },
  modalTitle: {
    fontSize: hp('2.3%'),
    fontFamily: fonts.FONT_BOLD,
    color: '#c34646ff',
    marginBottom: hp('1%'),
    marginLeft: 5, top: 1
  },
  icon2: {
    color: '#981313ff',
    marginVertical: hp('0.5%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#5b5959ff',
    width: '90%',
    marginVertical: hp('1.5%'),
  },
  modalMessage: {
    fontSize: hp('1.9%'),
    color: '#5e5d5dff',
    textAlign: 'center',
    marginBottom: hp('2%'),
    fontFamily: fonts.ROBOTO_BOLD,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 15,
    marginHorizontal: wp('2%'),
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
    fontSize: hp('2%'),
  },
});




