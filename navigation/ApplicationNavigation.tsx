
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ApplicationStackParamList, AuthStackParamList, BottomTabParamList, DrawerNaviagtorParamList } from '../navigation/NavigationType';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import InstituteListScreen from '../Screen/InstituteList';
import HomeScreen from '../Screen/HomePage';
import LoginScreen from '../Auth/Login';
import ForgotPasswordScreen from '../Auth/Forgetpassword';
import AttendanceScreen from '../Screen/Attendance';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import NotificationScreen from '../Screen/Notification';
import ProfileScreen from '../Screen/Profile';
import SettingScreen from '../Screen/Setting';
import CustomDrawer from './CustomDrawer';
import CalendarScreen from '../Screen/Calender';
import ExamScreen from '../Screen/Exam';
import FeedbackScreen from '../Screen/Feedback';
import FeesScreen from '../Screen/Fess';
import GalleryScreen from '../Screen/Gallery/GalleryMainView';
import HomeworkScreen from '../Screen/Homework';
import MyclassScreen from '../Screen/Myclass';
import ProgressReportScreen from '../Screen/ProgressReport';
import RouteScreen from '../Screen/Route';
import TimetableScreen from '../Screen/Timetable';
import FeedbackNewScreen from '../Screen/FeedbackNew';
import AboutScreen from '../Screen/About';
import ResetPasswordScreen from '../Screen/ResetPassword';
import VideoScreen from '../Screen/Gallery/VideoMainView';
import GalleryImageCategoryScreen from '../Screen/Gallery/GalleyImageCategoty';
import GalleryImageScreen from '../Screen/Gallery/GalleryView';
import VideoCategoryScreen from '../Screen/Gallery/VideoCategory';
import VideoViewScreen from '../Screen/Gallery/VideoView';
import SmileWelcomeScreen from '../Screen/Welcomepage';
import LeavesScreen from '../Screen/LeaveRequest';
import NewLeaveScreen from '../Screen/Newleave';
import { fonts, moderateScale, scale, verticalScale } from '../root/config';
import SplashScreen from '../Screen/Splash';
import StudentsListScreen from '../Screen/StudentsList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { parseNotifyDate } from '../Screen/badgeService';
import StopListScreen from '../Screen/Listview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const Stack = createStackNavigator<ApplicationStackParamList>();

export const ApplicationNavigator: React.FC = () => {

  return (
    <Stack.Navigator initialRouteName='InstituteList' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InstituteList" component={InstituteListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentsList" component={StudentsListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Calender" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Homework" component={HomeworkScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Timetable" component={TimetableScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProgressReport" component={ProgressReportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Route" component={RouteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Fees" component={FeesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Exam" component={ExamScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Myclass" component={MyclassScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Gallery" component={GalleryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Newleave" component={NewLeaveScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StopListScreen" component={StopListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC<any> = () => {
    // const { orgid, studentId, mobile } = route.params || {};
  return (
    <AuthStack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='SplashScreen' component={SplashScreen} />
      <AuthStack.Screen name='SmileWelcomeScreen' component={SmileWelcomeScreen} />
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <AuthStack.Screen name="InstituteList" component={InstituteListScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="StudentsList" component={StudentsListScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="DrawerNav" component={DrawerNav} />
       <AuthStack.Screen name="Notification" component={NotificationScreen} />
    </AuthStack.Navigator>
  );
}

const LAST_SEEN_KEY = 'lastSeenNotificationTime';

export const TabNavigator = createBottomTabNavigator<BottomTabParamList>();

const HomeTab: React.FC = ({ route }) => {
  const { orgid, studentId, mobile , } = route.params || {};

  // const [notifyList, setNotifyList] = useState<any[]>([]);
   const [badgeCount, setBadgeCount] = useState(0);
     const insets = useSafeAreaInsets();

// const fetchNotificationList = async () => {
//   try {
//     const response = await axios.post(
//       `https://www.vtsmile.in/app/api/students/notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
//     );

//     if (response.data.isSuccess) {
//       const list = response.data.notify_list || [];
//       setNotifyList(list);
//       setBadgeCount(list.length); // 🔔 set badge
//     }
//   } catch (error) {
//     console.error('Notification Error:', error);
//   }
// };

  const fetchNotificationList = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/notification_list_api?orgId=${orgid}&mobile_no=${mobile}&studId=${studentId}`
      );

      if (response.data.isSuccess) {
        const list = response.data.notify_list || [];

        const lastSeen = await AsyncStorage.getItem(LAST_SEEN_KEY);
        const lastSeenTime = lastSeen ? new Date(lastSeen) : null;

        const unreadCount = list.filter((item: any) => {
          if (!item.notify_date) return false;
          const notifyTime = parseNotifyDate(item.notify_date);
          return !lastSeenTime || notifyTime > lastSeenTime;
        }).length;

        setBadgeCount(unreadCount);
      }
    } catch (e) {
      console.log('Notification Error', e);
    }
  };
// useFocusEffect(
//   useCallback(() => {
//     fetchNotificationList();
//   }, [])
// );

  useFocusEffect(
    useCallback(() => {
      fetchNotificationList();
    }, [orgid, studentId, mobile])
  );
  // const clearBadge = () => {
  //   setBadgeCount(0);
  // };

    const clearBadge = async () => {
    await AsyncStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    setBadgeCount(0);
  };




  return (
    <TabNavigator.Navigator 
      initialRouteName='Home' 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffffff',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#220876ff',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0, // 🔥 Critical: pin to bottom
          left: 0,
          right: 0,
          height: 65 + (insets.bottom || 10), // 🔥 Add safe area
          paddingBottom: insets.bottom || 10, // 🔥 Padding for home indicator
          paddingTop: 8,
          paddingHorizontal: 0,
          elevation: 0,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fonts.FONT_MEDIUM,
          marginBottom: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <TabNavigator.Screen 
        name='Home' 
        component={HomeScreen}
        initialParams={{ orgid, studentId, mobile }}
        options={{
          tabBarLabel: 'Home', 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={24} />
          ),
        }}
      />
      
      <TabNavigator.Screen 
        name="Attendance" 
        component={AttendanceScreen}
        initialParams={{ orgid, studentId, mobile }}
        options={{
          tabBarLabel: 'Attendance', 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist-rtl" color={color} size={24} />
          ),
        }} 
      />
      
      <TabNavigator.Screen 
        name="Profile" 
        component={ProfileScreen}
        initialParams={{ orgid, studentId, mobile }}
        options={{
          tabBarLabel: 'Profile', 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={24} />
          ),
        }} 
      />
      
      <TabNavigator.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={{ orgid, studentId, mobile, clearBadge }}
        options={{
          tabBarLabel: 'Notification',
          tabBarBadge: badgeCount > 0 ? badgeCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: '#fff',
            fontSize: 9,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            top: 2,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={24} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};



const Drawer = createDrawerNavigator<DrawerNaviagtorParamList>();

export const DrawerNav: React.FC = ({ route }) => {
  const { orgid, studentId, mobile } = route.params || {};
  return (
    <Drawer.Navigator initialRouteName='HomeTab'
      screenOptions={{
        drawerStyle: { width: '80%', }
      }}
      drawerContent={(props) => <CustomDrawer route={route} {...props} />}
    >
      <Drawer.Screen name="HomeTab" component={HomeTab}

        initialParams={{ orgid, studentId, mobile }}
        options={{ headerShown: false }} />

      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Attendance' component={AttendanceScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Notification' component={NotificationScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Timetable" component={TimetableScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Calender" component={CalendarScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Homework" component={HomeworkScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="ProgressReport" component={ProgressReportScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Route" component={RouteScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Fees" component={FeesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Exam" component={ExamScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Myclass" component={MyclassScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Gallery" component={GalleryScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Newleave" component={NewLeaveScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="FeedbackNewScreen" component={FeedbackNewScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="GalleryImageCategory" component={GalleryImageCategoryScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="GalleryImageScreen" component={GalleryImageScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="VideoCategory" component={VideoCategoryScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="VideoViewScreen" component={VideoViewScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="leave" component={LeavesScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="StopListScreen" component={StopListScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}