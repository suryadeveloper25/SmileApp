
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { fonts } from '../root/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showMessage,} from "react-native-flash-message";

const LoginScreen = () => {
   const navigation = useNavigation();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

const getNewFcmToken = async () => {
  try {
    console.log("🔄 Deleting old FCM token...");
    await messaging().deleteToken();

    const newToken = await messaging().getToken();

    if (!newToken) {
      console.log("❌ Failed to generate FCM token");
      return null;
    }

    console.log("🔥 NEW FCM TOKEN GENERATED:", newToken);

    await AsyncStorage.setItem("fcmToken", newToken);

    return newToken;
  } catch (error) {
    console.log("❌ FCM Token Error:", error);
    return null;
  }
};


const logIn = async () => {
  if (!mobile || !password) {
    showMessage({
      message: "Error",
      description: "Please enter a valid Mobile Number and Password!",
      type: "danger",
      backgroundColor: "#e10808ff",
      color: "#FFFFFF",
    });
    return;
  }

  setIsLoading(true);

  try {
    const loginAPIUrl = `https://www.vtsmile.in/app/api/students/login_api?mobile_no=${mobile}&org_password=${password}`;

    const response = await axios.post(loginAPIUrl);
    // console.log("Login Response =>", response.data);

    if (response.status !== 200) {
      throw new Error("Invalid API Response");
    }

    const body = response.data;

    if (!(body.isSuccess === true && Array.isArray(body.orgList) && body.orgList.length > 0)) {
      showMessage({
        message: "Login Failed",
        description: "Invalid Mobile Number or Password!",
        type: "danger",
      });
      return;
    }

    // Extract IDs
    const orgId = parseInt(body.orgList[0].orgId, 10);
    const studId = parseInt(body.orgList[0].studeId, 10); // FIXED

    // Validate IDs
    if (isNaN(orgId) || isNaN(studId)) {
      console.log("❌ INVALID IDs:", orgId, studId);
      showMessage({
        message: "Invalid Data",
        description: "Backend returned invalid student/org id.",
        type: "danger",
      });
      return;
    }

    // Get FCM Token (Required)
    const token = await getNewFcmToken();
    console.log("FINAL FCM Token:", token);

    if (!token) {
      showMessage({
        message: "FCM Error",
        description: "Unable to get FCM Token.",
        type: "danger",
      });
      return;
    }

    // Save token to Firebase Token API
    const tokenAPIUrl = "https://www.vtsmile.in/app/api/students/fbase_token_api";

    await axios.post(tokenAPIUrl, {
      mobile_no: mobile,
      token: token,      // FIXED
    });

    // Prepare FormData for student_token_save_api
    const tokenForm = new FormData();
    tokenForm.append("orgId", orgId.toString());
    tokenForm.append("studId", studId.toString());
    tokenForm.append("mobile",mobile);
    tokenForm.append("token", token);   // FIXED
    // console.log("tokenform==>",tokenForm)

    const tokenRes = await axios.post(
      "https://www.vtsmile.in/app/api/students/student_token_save_api",
      tokenForm,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // console.log("Student Token Save API Response:", tokenRes.data);

    const tokenSuccess =
      tokenRes.data?.isSuccess === true || tokenRes.data?.isSuceess === true;

    if (!tokenSuccess) {
      showMessage({
        message: "Token Save Failed",
        description: "Unable to save student token!",
        type: "danger",
      });
      return;
    }

    // Save login details
    await AsyncStorage.setItem("isloggedIn", "true");
    await AsyncStorage.setItem("mobile", mobile);

    navigation.navigate("InstituteList");

    showMessage({
      message: "Login Successful",
      description: "Welcome back!",
      type: "success",
    });

  } catch (error) {
    console.error("Login Error:", error);
    showMessage({
      message: "Network Error",
      description: "Check your Internet and try again!",
      type: "danger",
      backgroundColor: "#FF6B00",
      color: "#FFFFFF",
    });
  } finally {
    setIsLoading(false);
  }
};


const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem("isloggedIn");

    if (isLoggedIn === "true") {
      navigation.reset({
        index: 0,
        routes: [{ name: "InstituteList" }],
      });
    }
  } catch (error) {
    console.log("Auto Login Error:", error);
  }
};
useEffect(() => {
  checkLoginStatus();
}, []);



   if (isLoading) {
      return (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      );
    }


  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.topLogo}>
          {/* {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      )} */}
          <Image
                 source={require('../assest/VT-Technologies-Logo-White-SMILE.png')} 
                 style={styles.logo}
               />
      </View>

      <View style={styles.card}>
        <View style={styles.smileLogo}>
           <Image source={require('../assest/smile-logo.png')} />
        </View>

        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Sign in to access student information.</Text>
        <View>        
          <Text style={styles.mobileText}>Mobile Number</Text>
        <MaterialIcons name="phone-iphone" size={22} color="#666" style={{top:33,left:10}} />
        <TextInput
          style={styles.input}
          placeholder=" Enter Mobile Number"
          placeholderTextColor={'black'}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={setMobile}
          value={mobile}
        />
     </View>
     <View>   
     <Text style={styles.PasswordText}>Password</Text>
        <MaterialIcons name="password" size={22} color="#666" style={{top:15,left:10}} />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your Password"
            placeholderTextColor={'black'}
            secureTextEntry={hidePassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      
</View>

        <TouchableOpacity style={styles.signInButton} onPress={logIn} disabled={isLoading} >
          <LinearGradient
            colors={['#6a11cb', '#b983ff']}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
          <View style={{flexDirection:'row',marginLeft: wp(20)}}>
            <Icon name="lock" size={22} color="#333" style={{top:2,left:wp(-2)}}/>
          <Text style={styles.forgotText}>Forgot Your Password?</Text>
          </View>
         
        </TouchableOpacity>

         <Text style={styles.footerText}>Powered by VT Technologies</Text>
      </View>

     
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topLogo: {
    marginTop: 60,
    alignItems: 'center',
  },
   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  topTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing:1,
  },
    loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  card: {
    marginTop: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 180,
    height: 50,
   top:20,
    resizeMode: 'contain',
  },
  smileLogo: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 22,
  fontFamily: fonts.ROBOTO_BOLD,
    textAlign: 'center',
    marginVertical: 5,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.ROBOTO_MEDIUM
  },
   mobileText: {
    fontSize: 16,
    color: '#555',
   fontFamily: fonts.ROBOTO_BOLD,
    left:8,top:18
 
  },
  PasswordText :{
    fontSize: 16,
    color: '#555',
   fontFamily: fonts.ROBOTO_BOLD,
    marginTop:10,
    left:8,marginBottom:5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal:35,
    color:'black',
    marginBottom: 15,
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,bottom:20
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal:25,
    fontFamily: fonts.ROBOTO_MEDIUM,
    color:'black'
  },
  signInButton: {
    marginBottom: 15,
  },
  gradientButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  forgotText: {
    color: '#333',
    textAlign: 'center',
    marginLeft:wp(-2),
    fontFamily: fonts.FONT_MEDIUM,
    marginTop: 5,
  },
  footerText: {
    textAlign: 'center',
    marginTop:30,
    color: '#292727ff',
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 14,
    letterSpacing:0.5
  },
});

export default LoginScreen;
