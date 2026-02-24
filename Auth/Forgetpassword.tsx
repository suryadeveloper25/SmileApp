

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   StatusBar,Image,KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native';
// import { fonts } from '../root/config';
// import { showMessage } from 'react-native-flash-message';

// const ForgotPasswordScreen = () => {
//   // const [email, setEmail] = useState('');
//     const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
// const navigation = useNavigation();

//   const handleForgotRequest = async () => {
//     if (!email) {
//       showMessage({
//       message: "Error",
//       description: "Please enter your registered email address!",
//       type: "danger",
//       backgroundColor: "#E10808",
//       color: "#FFFFFF",
//     });
//     // Alert.alert("Error", "Please enter registered email!");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       setIsLoading(true);
//       const url = `https://www.vtsmile.in/app/api/students/app_forgot_password_request_students?email=${email}`;
//       const res = await axios.post(url);

//       if (res.data?.isSuccess) {
//        showMessage({
//         message: "Request Sent",
//         description: "Password reset request has been successfully sent!",
//         type: "success",
//         backgroundColor: "#28A745",
//         color: "#FFFFFF",
//       });
//         navigation.navigate('Login'); // adjust your navigation route name
//       } else {
//         showMessage({
//         message: "Failed",
//         description: "Invalid email address or request!",
//         type: "danger",
//         backgroundColor: "#ff4c4c",
//         color: "#FFFFFF",
//       });
//       }
//     } catch (error) {
//       showMessage({
//       message: "Network Error",
//       description: "Please check your internet connection!",
//       type: "danger",
//       backgroundColor: "#E67E22",
//       color: "#FFFFFF",
//     });
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#6B4EFF" />

//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Icon name="arrow-back" size={24} color="#fff" />
//       </TouchableOpacity>

//       {/* Logo & Title */}
//       <View style={styles.logoContainer}>
//         {/* <Image
//                   source={require('../assest/VT-Technologies-Logo-White.png')} 
//                   style={styles.logo}
//                 /> */}
//                  <Image
//                                  source={require('../assest/VT-Technologies-Logo-White-SMILE.png')} 
//                                  style={styles.logo}
//                                />

//         {/* <Text style={styles.logoText}>SMILE</Text> */}
//       </View>

//       {/* Card */}
//       <View style={styles.card}>
//             <Image source={require('../assest/smile-logo.png')} style={styles.smileText}/>
//         <Text style={styles.title}>Forgot Password</Text>
//         <Text style={styles.subtitle}>
//           Enter your registered email and reset password details (or) instructions will be sent to your mail!
//         </Text>

//         {/* Input Field */}
//         <View style={styles.inputContainer}>
//           <Icon name="email" size={20} color="#999" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Registered Email"
//             placeholderTextColor="#999"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             onChangeText={setEmail}
//             value={email}
//           />
//         </View>

//         {/* Send Button */}
//         <TouchableOpacity 
//         onPress={handleForgotRequest}
//          disabled={isLoading}>
//           <LinearGradient
//             colors={['#4b00ff', '#b57fff']}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Send Now</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* Footer */}
//         <Text style={styles.footer}>Powered by VT Technologies</Text>
//       </View>
//     </View>
//   );
// };

// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6B4EFF',
//     paddingTop: 40,
//   },
//   backButton: {
//     marginLeft: 15,
//     marginBottom: 10,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   logoText: {
//     fontSize: 26,
//     color: '#fff',
//     fontWeight: 'bold',bottom:5,
//     letterSpacing:0.5
//   },
//     logo: {
//     width: 180,
//     height: 50,
//      top:15,
//      marginRight:20,
//      resizeMode: 'contain',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 25,
//   },
//   smileText: {
//    marginLeft:110,
//    marginBottom: 10,
//   },
//   title: {
//     right:5,
//     textAlign: 'center',
//     fontSize: 18,
//    fontFamily: fonts.FONT_BOLD,
//     marginBottom: 10,
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#555',
//     backgroundColor: '#E0F0FF',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 20,
//     fontFamily: fonts.ROBOTO_MEDIUM,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     height: 45,
//     color: '#333',
//      fontFamily: fonts.ROBOTO_MEDIUM,
//   },
//   button: {
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//      fontFamily: fonts.ROBOTO_BOLD,
//   },
//   footer: {
//     textAlign: 'center',
//     color: '#aaa',
//     fontSize: 13,
//     marginTop: 30,
//      fontFamily: fonts.ROBOTO_MEDIUM,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../root/config';
import { showMessage } from 'react-native-flash-message';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleForgotRequest = async () => {
    if (!email) {
      showMessage({
        message: "Error",
        description: "Please enter your registered email address!",
        type: "danger",
        backgroundColor: "#E10808",
        color: "#FFFFFF",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage({
        message: "Invalid Email",
        description: "Please enter a valid email address!",
        type: "danger",
        backgroundColor: "#E10808",
        color: "#FFFFFF",
      });
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://www.vtsmile.in/app/api/students/app_forgot_password_request_students?email=${email}`;
      const res = await axios.post(url);

      if (res.data?.isSuccess) {
        showMessage({
          message: "Request Sent",
          description: "Password reset request has been successfully sent!",
          type: "success",
          backgroundColor: "#28A745",
          color: "#FFFFFF",
        });
        navigation.navigate('Login');
      } else {
        showMessage({
          message: "Failed",
          description: "Invalid email address or request!",
          type: "danger",
          backgroundColor: "#ff4c4c",
          color: "#FFFFFF",
        });
      }
    } catch (error) {
      showMessage({
        message: "Network Error",
        description: "Please check your internet connection!",
        type: "danger",
        backgroundColor: "#E67E22",
        color: "#FFFFFF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <SafeAreaView style={{flex:1, backgroundColor:'#6a11cb',}} edges={['top']}>
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={26} color="#fff" />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assest/VT-Technologies-Logo-White-SMILE.png')}
                style={styles.logo}
              />
            </View>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Smile Logo */}
            <View style={styles.smileLogoContainer}>
              <Image
                source={require('../assest/smile-logo.png')}
                style={styles.smileLogo}
              />
            </View>

            {/* Icon Illustration */}
            {/* <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Icon name="lock-reset" size={50} color="#6a11cb" />
              </View>
            </View> */}

            {/* Title */}
            <Text style={styles.title}>Forgot Password?</Text>

            {/* Subtitle */}
            <View style={styles.subtitleContainer}>
              <Icon name="info-outline" size={18} color="#2575fc" style={styles.infoIcon} />
              <Text style={styles.subtitle}>
                Enter your registered email address and we'll send you instructions to reset your password.
              </Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Icon name="email" size={22} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your registered email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setEmail}
                  value={email}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Send Button */}
            <TouchableOpacity
              onPress={handleForgotRequest}
              disabled={isLoading}
              activeOpacity={0.8}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={['#6a11cb', '#b983ff']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Send Now</Text>
                    <Icon name="send" size={20} color="#fff" style={styles.sendIcon} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backToLoginContainer}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={18} color="#6a11cb" />
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footer}>Powered by VT Technologies</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
      {/* {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#6a11cb" />
            <Text style={styles.loadingText}>Sending request...</Text>
          </View>
        </View>
      )} */}
    </LinearGradient>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: hp(5),
    paddingBottom: hp(2),
  },
  backButton: {
    marginLeft: wp(4),
    marginBottom: hp(2),
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: wp(50),
    height: hp(6),
    resizeMode: 'contain',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  smileLogoContainer: {
    alignItems: 'center',
    marginBottom: hp(1),
  },
  smileLogo: {
    width: wp(25),
    height: hp(12),
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  iconCircle: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    backgroundColor: '#F0E6FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6a11cb',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: wp(6),
    fontFamily: fonts.FONT_BOLD,
    textAlign: 'center',
    color: '#333',
    marginBottom: hp(1.5),
  },
  subtitleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F4FD',
    padding: wp(4),
    borderRadius: 12,
    marginBottom: hp(3),
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: wp(2),
    marginTop: 2,
  },
  subtitle: {
    flex: 1,
    fontSize: wp(3.5),
    color: '#555',
    fontFamily: fonts.ROBOTO_MEDIUM,
    lineHeight: 20,
  },
  inputWrapper: {
    marginBottom: hp(3),
  },
  inputLabel: {
    fontSize: wp(4),
    color: '#333',
    fontFamily: fonts.ROBOTO_BOLD,
    marginBottom: hp(1),
    marginLeft: wp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: wp(3),
    backgroundColor: '#F9F9F9',
    height: hp(6.5),
  },
  inputIcon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    color: '#333',
    fontFamily: fonts.ROBOTO_MEDIUM,
    paddingVertical: 0,
  },
  buttonContainer: {
    marginBottom: hp(2),
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#6a11cb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  button: {
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.5,
  },
  sendIcon: {
    marginLeft: wp(2),
  },
  backToLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
  },
  backToLoginText: {
    color: '#6a11cb',
    fontSize: wp(4),
    fontFamily: fonts.ROBOTO_BOLD,
    marginLeft: wp(1),
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: wp(3.5),
    marginTop: hp(3),
    fontFamily: fonts.ROBOTO_MEDIUM,
    letterSpacing: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#333',
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
});