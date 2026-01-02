

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Card, Divider } from 'react-native-paper';
import { logoutAction } from '../root/userAction';
import { useDispatch } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../root/config';
import { showMessage } from 'react-native-flash-message';
  import messaging from '@react-native-firebase/messaging';
const { width, height } = Dimensions.get('window');

interface SettingScreenProps {
  route: any;
  navigation: any;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  console.log('route?.params ', route?.params)
  const [showDropdown, setShowDropdown] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>({});
  const [mobileNo, setMobileNo] = useState<string>('');

  const getProfileData = async () => {
    try {
      const savedMobile = await AsyncStorage.getItem('mobile');
      setMobileNo(savedMobile || mobile);

      const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${savedMobile || mobile}`;
      const response = await axios.post(url);
      console.log('=========response.data.studDetailssphoto=====>', response.data.studDetails)
      if (response.data.isSuccess && response.data.studDetails?.length > 0) {
        setStudent(response.data.studDetails[0]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };


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

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => { setShowDropdown(false); Keyboard.dismiss(); }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeTab', { orgid, studentId, mobile })}>
            <MaterialIcons name="arrow-back" size={RFValue(26)} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerText}>Setting</Text>

          <View style={styles.profileWrapper}>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              {/* <Image
                source={require('../assest/icons8-administrator-male-50.png')}
                style={styles.profileImage}
              /> */}
              <Image
                source={
                  student.photo_url
                    ? { uri: student.photo_url }
                    : require('../assest/icons8-administrator-male-50.png')
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}
                  style={styles.dropdownItem}>
                  <MaterialIcons name="settings" size={20} color="red" />
                  <Text style={styles.dropdownText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLogoutPress}
                  style={styles.dropdownItem}>
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
            source={require('../assest/icons8-security-configuration-64.png')}
            style={styles.topIcon}
          />
          <Text style={styles.topText}>App Setting</Text>
        </View>

        {/* Main Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.infoRow}>
              <MaterialIcons name="password" size={25} style={styles.icon} />
              <Text style={styles.infoLabel}>Reset Password</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen', { orgid, studentId, mobile })
              }>

                <MaterialIcons name="arrow-circle-right" size={30} style={styles.iconRight} />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>To reset your app password</Text>

            <View style={styles.infoRow}>
              <MaterialIcons name="format-list-bulleted-add" size={25} style={styles.icon} />
              <Text style={styles.infoLabel}>About SMILE Faculty</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AboutScreen', { orgid, studentId, mobile })}>
                <MaterialIcons name="arrow-circle-right" size={30} style={styles.iconRight} />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>About app terms and details</Text>
          </Card.Content>
        </Card>

        <View style={styles.imageWrapper}>
          <Image
            source={require('../assest/smile-settings-main-bg.png')}
            style={styles.setImg}
          />
        </View>

        {/* Logout Modal */}
        <Modal
          visible={customAlertVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCustomAlertVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="crisis-alert" size={24} style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Confirm Logout</Text>
              </View>


              <Divider style={styles.divider} />
              <Text style={styles.modalMessage}>Are you sure, you want to Logout?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setCustomAlertVisible(false)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    setCustomAlertVisible(false);
                    Logout();
                  }}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#730673ff',
    paddingHorizontal: RFValue(16),
    height: height * 0.1,
  },
  headerText: {
    fontSize: wp('5.5%'),
    fontFamily: fonts.FONT_BOLD,
    color: '#fff',
    marginLeft: wp('30%'),
  },
  profileWrapper: {
    marginLeft: 'auto',
    marginRight: wp('1%'),
    backgroundColor: '#fbfbfbff',
    borderRadius: wp('10%'),
    padding: 5,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: wp('9%'), height: wp('9%'), borderRadius: 15 },

  dropdown: {
    // position: 'absolute',
    // top: RFValue(45),
    // right: 0,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // elevation: 5,
    // paddingVertical: 8,
    // width: RFValue(140),
    position: 'absolute',
    top: 55,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 10,
    zIndex: 999,
    width: 140,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: RFValue(14),
    color: '#333',
    marginLeft: 10,
    fontFamily: fonts.FONT_BOLD,
  },
  topSection: {
    alignItems: 'center',
    backgroundColor: '#730673ff',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    paddingVertical: height * 0.03,
  },
  topIcon: {
    width: RFValue(70),
    height: RFValue(70),
    resizeMode: 'contain',
  },
  topText: {
    color: '#fff',
    fontSize: RFValue(16),
    marginTop: RFValue(8),
    fontFamily: fonts.ROBOTO_BOLD,
  },
  card: {
    margin: RFValue(12),
    borderRadius: 16,
    elevation: 6,
    borderColor: '#000',
    borderWidth: 0.5,
    top: hp(2),
    height: height * 0.22
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(15),
    justifyContent: 'space-between',
  },
  infoLabel: {
    flex: 1,
    color: '#5e5a5aff',
    fontSize: RFValue(15),
    fontFamily: fonts.FONT_BOLD,
  },
  infoValue: {
    color: '#2d2c2cff',
    fontSize: RFValue(13),
    marginLeft: RFValue(40),
    fontFamily: fonts.ROBOTO_BOLD
  },
  icon: { color: '#000', marginRight: RFValue(10) },
  iconRight: { color: '#000' },
  imageWrapper: {
    alignItems: 'center',
    marginTop: RFValue(20),
  },
  setImg: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fbfbfbff',
    borderRadius: 12,
    padding: RFValue(16),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: RFValue(17),
    fontFamily: fonts.FONT_BOLD,
    color: '#c34646ff',
    top: hp(0.6),
    marginLeft: wp(1)
  },
  modalIcon: { color: '#981313ff', marginTop: RFValue(8) },
  modalMessage: {
    fontSize: RFValue(14),
    color: '#5e5d5dff',
    marginVertical: RFValue(16),
    textAlign: 'center',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
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
  divider: {
    width: '100%',
    backgroundColor: '#999',
    height: 1,
    marginVertical: RFValue(8),
  },
});

export default SettingScreen;
