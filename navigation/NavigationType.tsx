import type { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer'

export type ApplicationStackParamList = {
    InstituteList: undefined;
    StudentsList: undefined;
    HomeTab: undefined;
    Home: undefined;
    Attendance: undefined;
    Profile: undefined;
    Notification: undefined;
    Setting: undefined;
    Calender: undefined;
    Homework: undefined;
    Timetable: undefined;
    ProgressReport: undefined;
    Feedback: undefined;
    Route: undefined;
    Fees: undefined;
    Exam: undefined;
    Myclass: undefined;
    Gallery: undefined;
    DrawerNav: undefined;
    FeedbackNewScreen: undefined;
    AboutScreen: undefined;
    Video: undefined;
    ResetPasswordScreen: undefined;
    Newleave: undefined;

};

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>;

export type AuthStackParamList = {
    SmileWelcomeScreen: undefined;
    Login: undefined;
    ForgotPassword: undefined;
    InstituteList: undefined;
    StudentsList: undefined;
    DrawerNav: undefined;
    HomeTab: undefined;
    SplashScreen: undefined;
    Notification:undefined;
}


export type AuthStackScreenPrpos = StackScreenProps<AuthStackParamList>;


export type BottomTabParamList = {
    Home: { orgid: string; studentId: string; mobile: string };
    Attendance: { orgid: string; studentId: string; mobile: string };;
    Profile: { orgid: string; studentId: string; mobile: string };;
    Notification: { orgid: string; studentId: string; mobile: string };;
};

export type BottomTabScreenProps = RNBottomTabScreenProps<BottomTabParamList>;

export type DrawerNaviagtorParamList = {
    HomeTab: { orgid: string; studentId: string; mobile: string };
    Home: { orgid: string; studentId: string; mobile: string };
    Profile: undefined;
    Attendance: undefined;
    Notification: undefined;
    Setting: undefined;
    GalleryImageCategory: undefined;
    GalleryImageScreen: { categoryId: string; categoryName: string };
    VideoCategory: undefined;
    VideoViewScreen: { videoId: string; videoTitle: string };
    leave: undefined;
    Calender: undefined;
    Homework: undefined;
    Timetable: undefined;
    ProgressReport: undefined;
    Feedback: undefined;
    Route: undefined;
    Fees: undefined;
    Exam: undefined;
    Myclass: undefined;
    Gallery: undefined;
    DrawerNav: undefined;
    FeedbackNewScreen: undefined;
    AboutScreen: undefined;
    Video: undefined;
    ResetPasswordScreen: undefined;
    Newleave: undefined;

}

export type DrawerNaviagtorScreenProps = DrawerNavigationProp<DrawerNaviagtorParamList>;