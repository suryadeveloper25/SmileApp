

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import { Divider } from 'react-native-paper';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { RFValue } from 'react-native-responsive-fontsize';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { fonts } from '../root/config';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const ProfileScreen = ({ route, navigation }: any) => {
//   const { orgid, studentId, mobile } = route.params;

//   const [loading, setLoading] = useState(true);
//   const [student, setStudent] = useState<any>({});
//   const [mobileNo, setMobileNo] = useState<string>('');

//   const getProfileData = async () => {
//     try {
//       const savedMobile = await AsyncStorage.getItem('mobile');
//       setMobileNo(savedMobile || mobile);

//       const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${savedMobile || mobile}`;
//       const response = await axios.post(url);
//       // console.log('=========response.data.studDetailssphoto=====>', response.data.studDetails)
//       if (response.data.isSuccess && response.data.studDetails?.length > 0) {
//         setStudent(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProfileData();
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
//     <SafeAreaView style={{ flex: 1,backgroundColor:'#6A1B9A' }}>
//       <View style={styles.container}>

//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color="white" style={styles.backIcon} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Profile</Text>
//           <View style={styles.avatar}>
//             <Image
//               source={
//                 student.photo_url
//                   ? { uri: student.photo_url }
//                   : require('../assest/icons8-administrator-male-50.png')
//               }
//               style={styles.profileImage}
//             />
//           </View>
//         </View>

//         {/* Star Section */}
//         <View style={styles.starSection}>
//           <Text style={styles.studentName}>{student.stud_name?.toUpperCase()}</Text>
//           <View style={styles.classInfo}>
//             <Text style={styles.infoText}>Class: {student.std_name} {student.section} </Text>
//             <Text style={styles.infoText}> | Roll No: {student.rollNo}</Text>
//           </View>
//         </View>
//         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//           {/* Personal Details Section */}
//           <View style={styles.card}>
//             <View style={styles.cardHeader}>
//               <MaterialIcons name="person" size={20} color="#000" />
//               <Text style={styles.cardTitle}>Personal Details</Text>

//             </View>
//             <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
//             <View style={styles.cardContent}>
//               {renderRow('Father Name', student.father_name)}
//               {renderRow('Mother Name', student.mother_name)}
//               {renderRow('Date of Birth', student.dob)}
//               {renderRow('Blood Group', student.blood_group)}
//               {renderRow('Gender', student.gender)}

//             </View>
//           </View>

//           {/* Educational Details Section */}
//           <View style={[styles.card, { backgroundColor: '#f3eaff' }]}>
//             <View style={styles.cardHeader}>
//               <MaterialIcons name="book" size={20} color="#000" />
//               <Text style={styles.cardTitle}>Educational Details</Text>
//             </View>
//             <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
//             <View style={styles.cardContent}>
//               {renderRow('Std & Sec', `${student.std_name} ${student.section}`)}
//               {renderRow('Group', student.group_name)}
//               {renderRow('Roll No.', student.rollNo)}
//               {renderRow('Medium', student.medium)}
//               {renderRow('Class Teacher', student.staff_name)}

//             </View>
//           </View>
//           <View style={[styles.card, { backgroundColor: '#ffe9f1ff' }]}>
//             <View style={styles.cardHeader}>
//               <MaterialIcons name="contacts" size={20} color="#000" />
//               <Text style={styles.cardTitle}>Communication Details</Text>
//             </View>
//             <Divider style={{ backgroundColor: '#f26767ff', height: 1, marginHorizontal: -15, bottom: 10 }} />
//             <View style={styles.cardContent}>
//               {renderRow('Mobile No.', mobileNo)}
//               {renderRow('Email', student.email_Id)}
//               {renderRow('Address', student.address)}

//             </View>
//           </View>



//         </ScrollView>
//       </View>

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
//   container: { flex: 1, backgroundColor: '#fff', width: "100%", },
//   header: {
//     backgroundColor: '#6A1B9A',
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//   },
//   backIcon: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 25,
//     fontFamily: fonts.FONT_BOLD,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     backgroundColor: '#eee',
//     borderRadius: 20,
//   },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   studentName: {
//     fontSize: 16,
//     fontFamily: fonts.FONT_BOLD,
//     color: 'white',
//     textAlign: 'center',
//   },
//   starSection: {
//     backgroundColor: '#a07edc',
//     margin: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//     padding: 10,
//   },
//   star: {
//     fontSize: 22,
//     marginBottom: 8,
//   },
//   classInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '60%',
//   },
//   profileImage: { width: wp(10), height: wp(10), left: wp(1), borderRadius: 15, top: 2 },
//   infoText: {
//     color: '#fff',
//     fontSize: 14,
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   card: {
//     backgroundColor: '#d5f1f9',
//     borderRadius: 12,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#f26767ff',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontFamily: fonts.FONT_BOLD,
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   cardContent: {},
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 8,

//   },
//   label: {
//     width: 120,
//     fontSize: 14,
//     color: '#333',
//     fontFamily: fonts.ROBOTO_BOLD
//   },
//   colon: {
//     marginHorizontal: 5,
//   },
//   value: {
//     flex: 1,
//     fontSize: 14,
//     color: '#444',
//     fontFamily: fonts.ROBOTO_MEDIUM
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
// });

// export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../root/config';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 360;
const scale = width / BASE_WIDTH;
const normalize = (size: number) => Math.round(size * scale);
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);
const wp = (pct: number) => (width * pct) / 100;
const hp = (pct: number) => (height * pct) / 100;

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  // Brand
  primary: '#6A1B9A',
  primaryDark: '#6A1B9A',
  primaryMid: '#7B1FA2',
  primaryLight: '#EDE9FE',

  // Section tints – distinct but harmonious
  personalBg: '#F0FDF4',     // mint green
  personalBorder: '#86EFAC',
  personalIcon: '#16A34A',
  personalAccent: '#22C55E',

  educationBg: '#FFF7ED',    // warm amber
  educationBorder: '#FCD34D',
  educationIcon: '#D97706',
  educationAccent: '#F59E0B',

  contactBg: '#EFF6FF',      // sky blue
  contactBorder: '#93C5FD',
  contactIcon: '#2563EB',
  contactAccent: '#3B82F6',

  // Shared
  surface: '#FFFFFF',
  pageBg: '#F8F7FF',
  textDark: '#1A1035',
  textMid: '#374151',
  textLight: '#6B7280',
  textMuted: '#9CA3AF',
  divider: '#E5E7EB',
  shadow: 'rgba(74,20,140,0.15)',
};

// ─── Component ────────────────────────────────────────────────────────────────
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

  // ── Loading ────────────────────────────────────────────────────────────────
  // if (loading) {
  //   return (
  //     <View style={styles.loaderBg}>
  //       <View style={styles.loaderCard}>
  //         <ActivityIndicator size="large" color={C.primary} />
  //         <Text style={styles.loaderText}>Loading profile…</Text>
  //       </View>
  //     </View>
  //   );
  // }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }
  // Avatar initials fallback
  const initials = student.stud_name
    ? student.stud_name
      .split(' ')
      .slice(0, 2)
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
    : 'S';

  return (
    <>
      <StatusBar backgroundColor={C.primaryDark} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="arrow-back" size={normalize(24)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          {/* <View style={styles.headerAvatar}>
            {student.photo_url ? (
              <Image
                source={{ uri: student.photo_url }}
                style={styles.headerAvatarImg}
              />
            ) : (
              <Text style={styles.headerAvatarInitials}>{initials[0]}</Text>
            )}
          </View> */}
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: C.pageBg }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero card ── */}
          <View style={styles.heroCard}>
            {/* Large avatar */}
            <View style={styles.heroAvatarRing}>
              {student.photo_url ? (
                <Image
                  source={{ uri: student.photo_url }}
                  style={styles.heroAvatarImg}
                />
              ) : (
                <View style={styles.heroAvatarFallback}>
                  <Text style={styles.heroAvatarInitials}>{initials}</Text>
                </View>
              )}
            </View>

            <Text style={styles.heroName} numberOfLines={2}>
              {student.stud_name?.toUpperCase() || 'STUDENT NAME'}
            </Text>

            {/* Pill row */}
            <View style={styles.heroPillsRow}>
              <HeroPill
                icon="group"
                label={`Class: ${student.std_name || '–'} – ${student.section || '–'}`}
              />
              <HeroPill icon="list" label={`Roll No: ${student.rollNo || '–'}`} />
              {/* {student.gender ? (
                <HeroPill
                  icon={student.gender === 'Male' ? 'male' : 'female'}
                  label={student.gender}
                />
              ) : null} */}
            </View>
          </View>

          {/* ── Personal Details ── */}
          <SectionCard
            icon="person"
            title="Personal Details"
            bg={C.personalBg}
            border={C.personalBorder}
            iconColor={C.personalIcon}
            accentColor={C.personalAccent}
            rows={[
              { label: 'Father', value: student.father_name },
              { label: 'Mother', value: student.mother_name },
              { label: 'Date of Birth', value: student.dob },
              { label: 'Blood Group', value: student.blood_group },
              { label: 'Gender', value: student.gender },
            ]}
          />

          {/* ── Educational Details ── */}
          <SectionCard
            icon="school"
            title="Educational Details"
            bg={C.educationBg}
            border={C.educationBorder}
            iconColor={C.educationIcon}
            accentColor={C.educationAccent}
            rows={[
              { label: 'Std & Section', value: `${student.std_name || '–'} ${student.section || ''}` },
              { label: 'Group', value: student.group_name },
              { label: 'Roll No.', value: student.rollNo },
              { label: 'Medium', value: student.medium },
              { label: 'Class Teacher', value: student.staff_name },
            ]}
          />

          {/* ── Communication Details ── */}
          <SectionCard
            icon="contact-phone"
            title="Communication"
            bg={C.contactBg}
            border={C.contactBorder}
            iconColor={C.contactIcon}
            accentColor={C.contactAccent}
            rows={[
              { label: 'Mobile', value: mobileNo },
              { label: 'Email', value: student.email_Id },
              { label: 'Address', value: student.address },
            ]}
          />

          <View style={{ height: hp(4) }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const HeroPill = ({ icon, label }: { icon: string; label: string }) => (
  <View style={heroStyles.pill}>
    <MaterialIcons name={icon} size={clamp(normalize(13), 11, 15)} color="#ffff" />
    <Text style={heroStyles.pillLabel} numberOfLines={1}>{label}</Text>
  </View>
);

interface SectionCardProps {
  icon: string;
  title: string;
  bg: string;
  border: string;
  iconColor: string;
  accentColor: string;
  rows: { label: string; value?: string }[];
}

const SectionCard = ({
  icon, title, bg, border, iconColor, accentColor, rows,
}: SectionCardProps) => (
  <View style={[cardStyles.card, { backgroundColor: bg, borderColor: border }]}>
    {/* Card header */}
    <View style={cardStyles.header}>
      <View style={[cardStyles.iconBox, { backgroundColor: `${iconColor}18` }]}>
        <MaterialIcons
          name={icon}
          size={clamp(normalize(20), 17, 24)}
          color={iconColor}
        />
      </View>
      <Text style={cardStyles.title}>{title}</Text>
      <View style={[cardStyles.titleUnderline, { backgroundColor: accentColor }]} />
    </View>

    {/* Divider */}
    <View style={[cardStyles.divider, { backgroundColor: border }]} />

    {/* Rows */}
    {rows.map((row, i) => (
      <DetailRow
        key={i}
        label={row.label}
        value={row.value}
        isLast={i === rows.length - 1}
        accentColor={accentColor}
      />
    ))}
  </View>
);

const DetailRow = ({
  label, value, isLast, accentColor,
}: {
  label: string; value?: string; isLast: boolean; accentColor: string;
}) => (
  <View style={[rowStyles.row, !isLast && rowStyles.rowBorder]}>
    <View style={[rowStyles.labelDot, { backgroundColor: accentColor }]} />
    <Text style={rowStyles.label} numberOfLines={1}>{label}</Text>
    <Text style={rowStyles.value} numberOfLines={label === 'Address' ? 3 : 1}>
      {value || '–'}
    </Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(30),
  },

  // Loader
  loaderBg: {
    flex: 1,
    backgroundColor: C.pageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(20),
    padding: normalize(32),
    alignItems: 'center',
    gap: normalize(12),
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  loaderText: {
    fontSize: clamp(normalize(14), 12, 16),
    color: C.textLight,
    fontWeight: '600',
  },

  // Header
  header: {
    backgroundColor: C.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  backBtn: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5, left: 5
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: normalize(22),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
    marginRight: 24,
    right: 15
  },
  headerAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerAvatarImg: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
  },
  headerAvatarInitials: {
    color: '#fff',
    fontSize: clamp(normalize(15), 12, 18),
    fontWeight: '800',
  },

  // Hero card
  heroCard: {
    backgroundColor: C.primary,
    paddingVertical: hp(3),
    paddingHorizontal: wp(6),
    alignItems: 'center',
    borderBottomLeftRadius: normalize(32),
    borderBottomRightRadius: normalize(32),
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: hp(2.5),
  },
  heroAvatarRing: {
    width: normalize(96),
    height: normalize(96),
    borderRadius: normalize(48),
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  heroAvatarImg: {
    width: normalize(90),
    height: normalize(90),
    borderRadius: normalize(45),
  },
  heroAvatarFallback: {
    width: normalize(90),
    height: normalize(90),
    borderRadius: normalize(45),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAvatarInitials: {
    color: '#fff',
    fontSize: clamp(normalize(32), 26, 40),
    fontWeight: '900',
    letterSpacing: 2,
  },
  heroName: {
    color: '#fff',
    fontSize: clamp(normalize(18), 15, 22),
    fontWeight: '900',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: hp(1.5),
    maxWidth: wp(85),
  },
  heroPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: wp(2),
  },
});

const heroStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: normalize(20),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  pillLabel: {
    color: '#ffff',
    fontSize: clamp(normalize(11.5), 10, 13),
    fontWeight: '700',
  },
});

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: normalize(18),
    marginHorizontal: wp(4),
    marginBottom: hp(1.8),
    paddingHorizontal: wp(4),
    paddingTop: hp(1.6),
    paddingBottom: hp(0.6),
    borderWidth: 1.5,
    shadowColor: 'rgba(0,0,0,0.07)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    gap: wp(2),
    position: 'relative',
  },
  iconBox: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: clamp(normalize(15), 13, 17),
    fontWeight: '800',
    color: C.textDark,
    letterSpacing: 0.2,
  },
  titleUnderline: {
    position: 'absolute',
    bottom: -hp(0.5),
    left: normalize(44),
    height: 2.5,
    width: normalize(32),
    borderRadius: 2,
  },
  divider: {
    height: 1,
    marginBottom: hp(1.2),
    borderRadius: 1,
    opacity: 0.6,
  },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(0.9),
    gap: wp(2),
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  labelDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    marginTop: normalize(5),
    flexShrink: 0,
  },
  label: {
    width: wp(28),
    fontSize: clamp(normalize(13), 11, 15),
    color: C.textLight,
    fontWeight: '700',
    flexShrink: 0,
  },
  value: {
    flex: 1,
    fontSize: clamp(normalize(13), 11, 15),
    color: C.textDark,
    fontWeight: '600',
    lineHeight: clamp(normalize(19), 17, 22),
  },
});

export default ProfileScreen;