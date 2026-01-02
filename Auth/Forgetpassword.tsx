

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,Image,KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../root/config';
import { showMessage } from 'react-native-flash-message';

const ForgotPasswordScreen = () => {
  // const [email, setEmail] = useState('');
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
    // Alert.alert("Error", "Please enter registered email!");
      return;
    }
    setIsLoading(true);
    try {
      setIsLoading(true);
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
        navigation.navigate('Login'); // adjust your navigation route name
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B4EFF" />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Logo & Title */}
      <View style={styles.logoContainer}>
        {/* <Image
                  source={require('../assest/VT-Technologies-Logo-White.png')} 
                  style={styles.logo}
                /> */}
                 <Image
                                 source={require('../assest/VT-Technologies-Logo-White-SMILE.png')} 
                                 style={styles.logo}
                               />
                
        {/* <Text style={styles.logoText}>SMILE</Text> */}
      </View>

      {/* Card */}
      <View style={styles.card}>
            <Image source={require('../assest/smile-logo.png')} style={styles.smileText}/>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your registered email and reset password details (or) instructions will be sent to your mail!
        </Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Registered Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity 
        onPress={handleForgotRequest}
         disabled={isLoading}>
          <LinearGradient
            colors={['#4b00ff', '#b57fff']}
            style={styles.button}>
            <Text style={styles.buttonText}>Send Now</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Powered by VT Technologies</Text>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B4EFF',
    paddingTop: 40,
  },
  backButton: {
    marginLeft: 15,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',bottom:5,
    letterSpacing:0.5
  },
    logo: {
    width: 180,
    height: 50,
     top:15,
     marginRight:20,
     resizeMode: 'contain',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  smileText: {
   marginLeft:110,
   marginBottom: 10,
  },
  title: {
    right:5,
    textAlign: 'center',
    fontSize: 18,
   fontFamily: fonts.FONT_BOLD,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    backgroundColor: '#E0F0FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#333',
     fontFamily: fonts.ROBOTO_MEDIUM,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
     fontFamily: fonts.ROBOTO_BOLD,
  },
  footer: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 13,
    marginTop: 30,
     fontFamily: fonts.ROBOTO_MEDIUM,
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native';

// const ForgotPasswordScreen = () => {
//   const navigation = useNavigation<any>();
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleForgotRequest = async () => {
//     if (!email.trim()) {
//       Toast.show({
//         type: 'error',
//         text1: 'Please Enter Registered/Valid Email',
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const url = `https://www.vtsmile.in/app/api/students/app_forgot_password_request_students?email=${email}`;
//       const res = await axios.post(url);

//       if (res.data?.isSuccess) {
//         Toast.show({
//           type: 'success',
//           text1: 'Your Forgot Request Sent, Thank You!',
//         });
//         navigation.navigate('Login'); // adjust your navigation route name
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Sorry Failed, Invalid Request!',
//         });
//       }
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Sorry Failed, Invalid Request!',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#332ecb', '#e09bfb']}
//       start={{ x: 1, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.logoContainer}>
//             {/* <Image
//               source={require('../assets/images/VT-Technologies-Logo-White-SMILE.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             /> */}
//           </View>

//           <View style={styles.card}>
//             {/* <Image
//               source={require('../assets/images/smile-logo.png')}
//               style={styles.smallLogo}
//               resizeMode="contain"
//             /> */}
//             <Text style={styles.title}>Forgot Password</Text>
//             <View style={styles.infoBox}>
//               <Text style={styles.infoText}>
//                 Enter your registered email and reset password details (or)
//                 instructions will be sent to your mail!.
//               </Text>
//             </View>

//             <TextInput
//               placeholder="Registered Email"
//               placeholderTextColor="#777"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               style={styles.input}
//             />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleForgotRequest}
//               disabled={isLoading}>
//               <LinearGradient
//                 colors={['#332ecb', '#e09bfb']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.buttonGradient}>
//                 <Text style={styles.buttonText}>
//                   {isLoading ? 'Sending...' : 'Send Now'}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             <Text style={styles.footerText}>Powered by VT Technologies</Text>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// }
// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 120,
//   },
//   logo: {
//     height: 40,
//     width: 180,
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginTop: 30,
//     borderRadius: 18,
//     padding: 20,
//     elevation: 4,
//   },
//   smallLogo: {
//     height: 25,
//     width: 120,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: 'Poppins',
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 10,
//   },
//   infoBox: {
//     backgroundColor: '#bbdefb',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//   },
//   infoText: {
//     color: '#000',
//     fontSize: 13,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 7,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 25,
//   },
//   button: {
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   buttonGradient: {
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontFamily: 'Poppins',
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   footerText: {
//     textAlign: 'center',
//     marginTop: 30,
//     fontSize: 13,
//     color: '#000',
//   },
// });
