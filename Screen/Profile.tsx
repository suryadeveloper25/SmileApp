

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Divider } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../root/config';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ route, navigation }: any) => {
  const { orgid, studentId, mobile } = route.params;

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>({});
  const [mobileNo, setMobileNo] = useState<string>('');

  const getProfileData = async () => {
    try {
      const savedMobile = await AsyncStorage.getItem('mobile');
      setMobileNo(savedMobile || mobile);

      const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${savedMobile || mobile}`;
      const response = await axios.post(url);
      // console.log('=========response.data.studDetailssphoto=====>', response.data.studDetails)
      if (response.data.isSuccess && response.data.studDetails?.length > 0) {
        setStudent(response.data.studDetails[0]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
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
    <SafeAreaView style={{ flex: 1,backgroundColor:'#814fcb' }}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.avatar}>
            <Image
              source={
                student.photo_url
                  ? { uri: student.photo_url }
                  : require('../assest/icons8-administrator-male-50.png')
              }
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Star Section */}
        <View style={styles.starSection}>
          <Text style={styles.studentName}>{student.stud_name?.toUpperCase()}</Text>
          <View style={styles.classInfo}>
            <Text style={styles.infoText}>Class: {student.std_name} {student.section} </Text>
            <Text style={styles.infoText}> | Roll No: {student.rollNo}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Personal Details Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="person" size={20} color="#000" />
              <Text style={styles.cardTitle}>Personal Details</Text>

            </View>
            <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
            <View style={styles.cardContent}>
              {renderRow('Father Name', student.father_name)}
              {renderRow('Mother Name', student.mother_name)}
              {renderRow('Date of Birth', student.dob)}
              {renderRow('Blood Group', student.blood_group)}
              {renderRow('Gender', student.gender)}

            </View>
          </View>

          {/* Educational Details Section */}
          <View style={[styles.card, { backgroundColor: '#f3eaff' }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="book" size={20} color="#000" />
              <Text style={styles.cardTitle}>Educational Details</Text>
            </View>
            <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
            <View style={styles.cardContent}>
              {renderRow('Std & Sec', `${student.std_name} ${student.section}`)}
              {renderRow('Group', student.group_name)}
              {renderRow('Roll No.', student.rollNo)}
              {renderRow('Medium', student.medium)}
              {renderRow('Class Teacher', student.staff_name)}

            </View>
          </View>
          <View style={[styles.card, { backgroundColor: '#ffe9f1ff' }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="contacts" size={20} color="#000" />
              <Text style={styles.cardTitle}>Communication Details</Text>
            </View>
            <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
            <View style={styles.cardContent}>
              {renderRow('Mobile No.', mobileNo)}
              {renderRow('Email', student.email_Id)}
              {renderRow('Address', student.address)}

            </View>
          </View>



        </ScrollView>
      </View>

    </SafeAreaView>
  );
};
const renderRow = (label: string, value: string) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.colon}>:</Text>
    <Text style={styles.value}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  header: {
    backgroundColor: '#814fcb',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 25,
    fontFamily: fonts.FONT_BOLD,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  studentName: {
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
    color: 'white',
    textAlign: 'center',
  },
  starSection: {
    backgroundColor: '#a07edc',
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
  },
  star: {
    fontSize: 22,
    marginBottom: 8,
  },
  classInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  profileImage: { width: wp(10), height: wp(10), left: wp(1), borderRadius: 15, top: 2 },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.ROBOTO_BOLD
  },
  card: {
    backgroundColor: '#d5f1f9',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#f26767ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: fonts.FONT_BOLD,
    marginLeft: 8,
    fontSize: 16,
  },
  cardContent: {},
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,

  },
  label: {
    width: 120,
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.ROBOTO_BOLD
  },
  colon: {
    marginHorizontal: 5,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    fontFamily: fonts.ROBOTO_MEDIUM
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const ProfileScreen = ({ route }: any) => {
//   const { orgid, studentId, mobile } = route.params;

//   const [loading, setLoading] = useState(true);
//   const [student, setStudent] = useState<any>({});
//   const [mobileNo, setMobileNo] = useState<string>('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const savedMobile = await AsyncStorage.getItem('mobile');
//         setMobileNo(savedMobile || mobile);

//         const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${savedMobile || mobile}`;
//         const response = await axios.post(url);
//         // console.log('=========response.data.studDetails=====>',response.data.studDetails)
//         if (response.data.isSuccess && response.data.studDetails?.length > 0) {
//           setStudent(response.data.studDetails[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007BFF" />
//         <Text style={{ marginTop: 10 }}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.headerBox}>
//           <Text style={styles.studentName}>{student.stud_name?.toUpperCase()}</Text>
//           <Text style={styles.studentClass}>
//             Class: {student.std_name} {student.section} | Roll No: {student.rollNo}
//           </Text>
//         </View>

//         {/* PERSONAL DETAILS */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Personal Details</Text>
//           {renderRow('Father Name', student.father_name)}
//           {renderRow('Mother Name', student.mother_name)}
//           {renderRow('Date of Birth', student.dob)}
//           {renderRow('Blood Group', student.blood_group)}
//           {renderRow('Gender', student.gender)}
//         </View>

//         {/* EDUCATIONAL DETAILS */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Educational Details</Text>
//           {renderRow('Std & Sec', `${student.std_name} ${student.section}`)}
//           {renderRow('Group', student.group_name)}
//           {renderRow('Roll No.', student.rollNo)}
//           {renderRow('Medium', student.medium)}
//           {renderRow('Class Teacher', student.staff_name)}
//         </View>

//         {/* COMMUNICATION DETAILS */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Communication Details</Text>
//           {renderRow('Mobile No.', mobileNo)}
//           {renderRow('Email', student.email_Id)}
//           {renderRow('Address', student.address)}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const renderRow = (label: string, value: string) => (
//   <View style={styles.row}>
//     <Text style={styles.label}>{label}</Text>
//     <Text style={styles.colon}>:</Text>
//     <Text style={styles.value}>{value || '-'}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F9FAFB' },
//   scroll: { padding: 16 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   headerBox: {
//     backgroundColor: '#007BFF',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 16,
//   },
//   studentName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'white',
//     textAlign: 'center',
//   },
//   studentClass: {
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 4,
//   },
//   section: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 14,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   label: {
//     width: '35%',
//     fontSize: 13.5,
//     color: '#444',
//   },
//   colon: {
//     width: '5%',
//     textAlign: 'center',
//     fontSize: 13.5,
//     color: '#444',
//   },
//   value: {
//     width: '60%',
//     fontSize: 13.5,
//     color: '#222',
//   },
// });

// export default ProfileScreen;
