
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Dimensions,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { logoutAction } from '../root/userAction';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../root/config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
 import messaging from '@react-native-firebase/messaging';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

interface ResetPasswordScreenProps {
  route: any;
  navigation: any;
}
const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);

  const [errOld, setErrOld] = useState(false);
  const [errNew, setErrNew] = useState(false);
  const [errConfirm, setErrConfirm] = useState(false);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>({});
  const [mobileNo, setMobileNo] = useState<string>('');

  const mountedRef = useRef(true);


  useEffect(() => {
    mountedRef.current = true;
    getProfileData();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getProfileData = async () => {
    try {
      const savedMobile = await AsyncStorage.getItem('mobile');
      setMobileNo(savedMobile || mobile);

      const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${savedMobile || mobile}`;
      const response = await axios.post(url);
    
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

  const handleLogoutAndNavigateToLogin = async () => {
    try {
      await AsyncStorage.removeItem('isloggedIn');
      await AsyncStorage.removeItem('mobile');
      // Depending on your app: you might clear more keys or call a session manager.
    } catch (e) {
      // ignore
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // ensure you have a 'Login' route
      });
    }
  };

  const validateAndSubmit = async () => {
    Keyboard.dismiss();
    // clear prior errors
    setErrOld(false);
    setErrNew(false);
    setErrConfirm(false);
    setMessage('');

    const trimmedOld = oldPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    // simple validations (mirror your Flutter checks)
    let hasError = false;
    if (!trimmedOld) {
      setErrOld(true);
      hasError = true;
    }
    if (!trimmedNew) {
      setErrNew(true);
      hasError = true;
    }
    if (!trimmedConfirm) {
      setErrConfirm(true);
      hasError = true;
    }
    if (hasError) {
      setMessage('Please fill required fields');
      return;
    }

    if (trimmedNew !== trimmedConfirm) {
      setMessage("Sorry!, Passwords does not match.");
      return;
    }
    try {
      setLoading(true);


      const putUrl = `https://www.vtsmile.in/app/api/students/students_password_reset?mobile=${mobile}&old_password=${oldPassword}&new_password=${newPassword}`;

      // axios.put as Flutter used http.put
      const response = await axios.put(putUrl);

      if (!mountedRef.current) return;

      if (response.status === 200 && response.data) {
        const body = response.data;
      
        if (body.isSuccess === true) {
          // show success and logout
          Alert.alert('Success', body.message || 'Password updated', [
            {
              text: 'OK',
              onPress: () => {
                handleLogoutAndNavigateToLogin();
              },
            },
          ]);
        } else {
          setMessage(body.message ? body.message.toString() : 'Unable to update password');
        }
      } else {
        setMessage('Server error while updating password');
      }
    } catch (err) {
      console.warn('updatePassword error', err?.message || err);
      setMessage('Network error while updating password');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  const renderError = (cond, msg) => {
    if (!cond) return null;
    return <Text style={styles.errorText}>{msg}</Text>;
  };



  const handleLogoutPress = () => {
    setCustomAlertVisible(true);
  };


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowDropdown(false);
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting', { orgid, studentId, mobile })}
            >
              <MaterialIcons
                name="arrow-back"
                size={wp('7%')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Reset Password</Text>

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

          {/* TOP SECTION */}
          <View style={styles.topSection}>
            <Image
              source={require('../assest/ic_notification.png')}
              style={styles.iconImage}
            />
            <Text style={styles.topText}>Change Your Password</Text>
          </View>

          {/* FORM SECTION */}
          <View style={styles.form}>
            {/* OLD PASSWORD */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="password" size={24} color="#777" />
              {/* <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholderTextColor="#aaa"
              /> */}
              <TextInput
                style={styles.input}
                value={oldPassword}
                onChangeText={(t) => setOldPassword(t)}
                placeholder="Old Password"
                placeholderTextColor="#666"
                secureTextEntry={!oldVisible}
                maxLength={10}
                textContentType="password"
                autoComplete="off"
                returnKeyType="next"
              />
              <Pressable
                onPress={() => setOldVisible((v) => !v)}
                style={styles.visibilityBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name={oldVisible ? 'visibility' : 'visibility-off'} size={20} color="#333" />
              </Pressable>
            </View>
            {renderError(errOld, 'Please Enter Old Password!')}

            {/* NEW PASSWORD */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="password" size={24} color="#777" />
              {/* <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor="#aaa"
              /> */}
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={(t) => setNewPassword(t)}
                placeholder="New Password"
                placeholderTextColor="#666"
                secureTextEntry={!newVisible}
                maxLength={10}
                textContentType="newPassword"
                autoComplete="off"
                returnKeyType="next"
              />
              <Pressable
                onPress={() => setNewVisible((v) => !v)}
                style={styles.visibilityBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name={newVisible ? 'visibility' : 'visibility-off'} size={20} color="#333" />
              </Pressable>
            </View>
            {renderError(errNew, 'Please Enter New Password!')}

            {/* CONFIRM PASSWORD */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="password" size={24} color="#777" />
              {/* <TextInput
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholderTextColor="#aaa"
              /> */}
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(t) => setConfirmPassword(t)}
                placeholder="Confirm New Password"
                placeholderTextColor="#666"
                secureTextEntry={!confirmVisible}
                maxLength={10}
                textContentType="newPassword"
                autoComplete="off"
                returnKeyType="done"
              />
              <Pressable
                onPress={() => setConfirmVisible((v) => !v)}
                style={styles.visibilityBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Icon name={confirmVisible ? 'visibility' : 'visibility-off'} size={20} color="#333" />
              </Pressable>
            </View>
            {renderError(errConfirm, 'Please Confirm New Password!')}


            {!!message && (
              <View style={styles.messageRow}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            )}

            {/* RESET BUTTON */}
            <View>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={validateAndSubmit}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.resetButtonText}>RESET</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTTOM IMAGE */}
          <View style={styles.bottomImageContainer}>
            <Image
              source={require('../assest/smile-settings-reset-password-bg.png')}
              style={styles.bottomImage}
            />
          </View>
        </View>

        {/* CUSTOM ALERT MODAL */}
        <Modal
          visible={customAlertVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCustomAlertVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="crisis-alert" size={24} style={styles.icon2} />
                <Text style={styles.modalTitle}>Confirm Logout</Text>
              </View>
              <Divider style={styles.divider} />

              <Text style={styles.modalMessage}>
                Are you sure, you want to Logout?
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.noButton}
                  onPress={() => setCustomAlertVisible(false)}
                >
                  <Text style={styles.noText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.yesButton}
                  onPress={() => {
                    setCustomAlertVisible(false);
                    Logout();
                  }}
                >
                  <Text style={styles.yesText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#730673ff',marginBottom:-30  },
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    width: '100%',
    height: hp('8%'),
    backgroundColor: '#730673ff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageRow: {
    marginTop: 6,
    alignItems: 'center',
  },
  messageText: {
    color: '#b00020',
    fontSize: 14,
    textAlign: 'center',
  },
  visibilityBtn: {
    padding: 8,
  },
  buttonRow: {
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  backIcon: { color: '#fff', marginLeft: wp('4%') },
  headerText: {
    fontSize: wp('5.5%'),
    fontFamily: fonts.FONT_BOLD,
    color: '#fff',
    marginLeft: wp('20%'),
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileWrapper: {
    marginLeft: 'auto',
    marginRight: wp('4%'),
    backgroundColor: '#fbfbfbff',
    borderRadius: wp('10%'),
    padding: 5,
  },
  profileImage: { width: wp('9%'), height: wp('9%'), borderRadius: 20 },

  topSection: {
    alignItems: 'center',
    backgroundColor: '#730673ff',
    height: hp('25%'),
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  iconImage: { width: wp('20%'), height: wp('20%'), marginTop: hp('5%') },
  topText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginTop: hp('1%'),
    fontFamily: fonts.ROBOTO_BOLD,
  },

  form: {
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    borderRadius: 18,
    padding: wp('4%'),
    marginTop: -hp('4%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#616060ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    fontSize: wp('4%'),
    color: '#222',
    fontFamily: fonts.FONT_BOLD,
  },
  resetButton: {
    backgroundColor: '#730673ff',
    borderRadius: 8,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontFamily: fonts.FONT_BOLD,
  },

  bottomImageContainer: {
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  bottomImage: {
    width: wp('55%'),
    height: hp('25%'),
    resizeMode: 'contain',
  },

  dropdown: {
    // position: 'absolute',
    // top: hp('6%'),
    // right: -10,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // elevation: 5,
    // width: wp('35%'),
    // paddingVertical: 8,
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
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
  },
  dropdownText: {
    fontSize: wp('3.8%'),
    color: '#333',
    marginLeft: 10,
    fontFamily: fonts.FONT_BOLD,
  },

  // Modal
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
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    width: '100%',
    marginTop: -6,
    color: '#b00020',
    fontSize: 13,
    paddingHorizontal: 6,
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontFamily: fonts.FONT_BOLD,
    color: '#c34646ff',
    top: hp(0.6),
    marginLeft: wp(1)
  },
  modalMessage: {
    fontSize: wp('4%'),
    color: '#5e5d5dff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noButton: {
    backgroundColor: '#bcc6fbff',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 15,
    marginRight: wp('3%'),
  },
  yesButton: {
    backgroundColor: '#e53935',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 15,
  },
  noText: { color: '#fff', fontFamily: fonts.FONT_BOLD, },
  yesText: { color: '#fff', fontFamily: fonts.FONT_BOLD, },
  icon2: {
    color: '#981313ff',
    marginVertical: hp('1%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#5b5959ff',
    width: '100%',
    marginVertical: hp('1%'),
  },
});