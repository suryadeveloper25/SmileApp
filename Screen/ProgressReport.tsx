
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { Divider } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Dropdown } from "react-native-element-dropdown";
// import { BarChart } from "react-native-gifted-charts";
// import { fonts } from "../root/config";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import { Flow } from "react-native-animated-spinkit";

// const { width } = Dimensions.get("window");

// // ─── Responsive scale ─────────────────────────────────────────────────────────
// const BASE = 375;
// const scale = (n: number) => Math.round((width / BASE) * n);
// const sp = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.22);

// // ─── Design tokens ────────────────────────────────────────────────────────────
// const C = {
//   primary:      '#6A1B9A',
//   primaryLight: '#9C27B0',
//   accent:       '#7C4DFF',
//   accentLight:  '#EDE7F6',
//   surface:      '#FFFFFF',
//   background:   '#F5F0FB',
//   cardBg:       '#FDFAFF',
//   textPrimary:  '#1A1A2E',
//   textSecondary:'#5D4E6D',
//   textMuted:    '#9E8CA8',
//   border:       '#E1D5EC',
//   pass:         '#00897B',
//   passLight:    '#E0F2F1',
//   fail:         '#E53935',
//   failLight:    '#FFEBEE',
//   stripe1:      '#EDE7F6',
//   stripe2:      '#FDFAFF',
//   barColor:     '#7C4DFF',
//   white:        '#FFFFFF',
// };

// const TAB_ITEMS = ['Examination', 'Daily Test'];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const removeDuplicateBySubject = (data: any[]) => {
//   const map = new Map();
//   data.forEach(item => map.set(item.subject_id, item));
//   return Array.from(map.values());
// };

// const getLatestSubjectMarks = (data: any[]) => {
//   const map = new Map();
//   data.forEach(item => {
//     const key = item.sub_name;
//     if (!map.has(key) || Number(item.test_mark_Id) > Number(map.get(key).test_mark_Id)) {
//       map.set(key, item);
//     }
//   });
//   return Array.from(map.values());
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────
// const TableHeader = ({ cols }: { cols: string[] }) => (
//   <View style={tableStyles.header}>
//     {cols.map((col, i) => (
//       <Text
//         key={i}
//         style={[tableStyles.headerCell, i === 0 ? tableStyles.subjectCol : tableStyles.dataCol]}
//       >
//         {col}
//       </Text>
//     ))}
//   </View>
// );

// const TableRow = ({ item, index, cols }: { item: any; index: number; cols: string[] }) => (
//   <View style={[tableStyles.row, { backgroundColor: index % 2 === 0 ? C.stripe1 : C.stripe2 }]}>
//     {cols.map((col, i) => (
//       <Text
//         key={i}
//         style={[tableStyles.cell, i === 0 ? tableStyles.subjectCol : tableStyles.dataCol]}
//         numberOfLines={2}
//       >
//         {item[col] ?? '—'}
//       </Text>
//     ))}
//   </View>
// );

// const EmptyState = ({ message }: { message: string }) => (
//   <View style={emptyStyles.container}>
//     <View style={emptyStyles.iconCircle}>
//       <Icon name="assignment" size={sp(36)} color={C.textMuted} />
//     </View>
//     <Text style={emptyStyles.title}>No Data Found</Text>
//     <Text style={emptyStyles.note}>{message}</Text>
//   </View>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────
// interface Props { route: any; navigation: any; }

// const ProgressReportScreen: React.FC<Props> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};

//   const [loading, setLoading]               = useState(true);
//   const [studentData, setStudentData]       = useState<any>({});
//   const [selectedItem, setSelectedItem]     = useState('Examination');

//   // Examination
//   const [selectedExam, setSelectedExam]     = useState<any>(null);
//   const [examList, setExamList]             = useState<any[]>([]);
//   const [progressReport, setProgressReport] = useState<any[]>([]);
//   const [examName, setExamName]             = useState('');
//   const [acaYear, setAcaYear]               = useState('');

//   // Daily Test
//   const [selectedTest, setSelectedTest]     = useState<any>(null);
//   const [testList, setTestList]             = useState<any[]>([]);
//   const [testReport, setTestReport]         = useState<any[]>([]);
//   const [testName, setTestName]             = useState('');

//   // ── API calls ────────────────────────────────────────────────────────────────
//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );
//       if (res.data.isSuccess && res.data.studDetails) {
//         const d = res.data.studDetails[0];
//         setStudentData({ stud_name: d.stud_name, std_name: d.std_name, section: d.section, rollNo: d.rollNo });
//       }
//     } catch (e) { console.log(e); }
//   };

//   const getExaminationsData = async () => {
//     try {
//       const res = await axios.post(`https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`);
//       if (res.data.isSuccess && res.data.examList) setExamList(res.data.examList);
//     } catch (e) { console.log(e); }
//   };

//   const getTestData = async () => {
//     try {
//       const res = await axios.post(`https://www.vtsmile.in/app/api/faculties/staff_test_list_api?orgId=${orgid}`);
//       if (res.data.isSuccess && res.data.today_list) setTestList(res.data.today_list);
//     } catch (e) { console.log(e); }
//   };

//   const getProgressReport = async (examId: any) => {
//     try {
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
//       );
//       if (res.data.isSuccess && res.data.student_progress_report) {
//         setProgressReport(res.data.student_progress_report);
//         setExamName(res.data.examName);
//         setAcaYear(res.data.acadamicYear);
//       } else {
//         setProgressReport([]);
//       }
//     } catch (e) { console.log(e); }
//   };

//   const getTestReport = async (testId: any) => {
//     try {
//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/student_test_mark_api?orgId=${orgid}&testId=${testId}&studId=${studentId}`
//       );
//       console.log(res.data.test_mark,'res.data.test_mark===>')
//       if (res.data.isSuccess && res.data.test_mark) {
//         setTestReport(res.data.test_mark);
//       } else {
//         setTestReport([]);
//       }
//     } catch (e) { console.log(e); }
//   };

//   useEffect(() => {
//     (async () => {
//       await getStudentData();
//       await getExaminationsData();
//       await getTestData();
//       setLoading(false);
//     })();
//   }, []);

//   useEffect(() => { if (selectedExam) getProgressReport(selectedExam); }, [selectedExam]);
//   useEffect(() => { if (selectedTest) getTestReport(selectedTest); }, [selectedTest]);

//   // ── Derived data ─────────────────────────────────────────────────────────────
//   const todayDate   = new Date().toISOString().split('T')[0];
//   const examDropData = examList.map(e => ({ label: e.exam_name, value: e.examId }));
//   const testDropData = testList.map(t => ({ label: t.test_name, value: t.test_Id }));

//   const deduplicatedReport = removeDuplicateBySubject(progressReport);
//   const todayTestReport    = getLatestSubjectMarks(
//     testReport.filter(item => {
//       const d = item.test_date?.split(' ')[0];
//       return d === todayDate && String(item.test_Id) === String(selectedTest);
//     })
//   );

//   const barData = deduplicatedReport.map(item => ({
//     value:      Number(item.total_mark),
//     label:      item.sub_name?.length > 4 ? item.sub_name.substring(0, 4) : item.sub_name,
//     frontColor: C.barColor,
//     gradientColor: '#CE93D8',
//   }));

//   // ── Loading ───────────────────────────────────────────────────────────────────

//    if (loading) {
//       return (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#6200EE" />
//           <Text>Loading...</Text>
//         </View>
//       );
//     }
//   // if (loading) {
//   //   return (
//   //     <SafeAreaView style={styles.safeArea}>
//   //       <StatusBar barStyle="light-content" backgroundColor={C.primary} />
//   //       <View style={styles.loaderContainer}>
//   //         <View style={styles.loaderCard}>
//   //           <ActivityIndicator size={44} color={C.primary} />
//   //           <Text style={styles.loaderText}>Loading Progress Report...</Text>
//   //         </View>
//   //       </View>
//   //     </SafeAreaView>
//   //   );
//   // }

//   // ── Shared Profile + Dropdown block ──────────────────────────────────────────
//   const ProfileCard = () => (
//     <View style={styles.profileCard}>

//       <Text style={styles.studentName}>{studentData.stud_name || '—'}</Text>
//       <View style={styles.badgesRow}>
//         <View style={styles.badge}>
//           <Icon name="group" size={sp(12)} color="rgba(255,255,255,0.8)" />
//           <Text style={styles.badgeText}>Class: {studentData.std_name} {studentData.section}</Text>
//         </View>
//         <View style={styles.badgeDot} />
//         <View style={styles.badge}>
//           <Icon name="format-list-numbered" size={sp(12)} color="rgba(255,255,255,0.8)" />
//           <Text style={styles.badgeText}>Roll: {studentData.rollNo}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   // ── Render ────────────────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <StatusBar barStyle="light-content" backgroundColor={C.primary} />
//     <View style={{flex:1,backgroundColor:"#ffff"}}>

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity  onPress={() => navigation.goBack()} activeOpacity={0.7}>
//           <Icon name="arrow-back" size={sp(22)} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Progress Report</Text>
//         {/* <View style={styles.headerBtn} /> */}
//       </View>

//       {/* Tab Bar */}
//       <View style={styles.tabBar}>
//         {TAB_ITEMS.map(tab => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, selectedItem === tab && styles.tabActive]}
//             onPress={() => setSelectedItem(tab)}
//             activeOpacity={0.8}
//           >
//             <Icon
//               name={tab === 'Examination' ? 'school' : 'quiz'}
//               size={sp(16)}
//               color={selectedItem === tab ? '#fff' : 'rgba(255,255,255,0.55)'}
//               style={{ marginRight: sp(5) }}
//             />
//             <Text style={[styles.tabText, selectedItem === tab && styles.tabTextActive]}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* ── EXAMINATION TAB ── */}
//       {selectedItem === 'Examination' && (
//         <ScrollView
//           style={styles.scroll}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <ProfileCard />

//           {/* Exam Dropdown */}
//           <View style={styles.dropCard}>
//             <View style={styles.dropCardHeader}>
//               <View style={styles.dropCardIcon}>
//                 <Icon name="school" size={sp(16)} color={C.primaryLight} />
//               </View>
//               <Text style={styles.dropCardTitle}>Select Examination</Text>
//             </View>
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.dropPlaceholder}
//               selectedTextStyle={styles.dropSelected}
//               inputSearchStyle={styles.dropSearch}
//               iconStyle={styles.dropIcon}
//               data={examDropData}
//               search
//               maxHeight={280}
//               labelField="label"
//               valueField="value"
//               placeholder="Choose an examination..."
//               searchPlaceholder="Search exam..."
//               value={selectedExam}
//               onChange={item => setSelectedExam(item.value)}
//               renderLeftIcon={() => (
//                 <Icon name="event-note" size={sp(18)} color={C.primaryLight} style={{ marginRight: sp(8) }} />
//               )}
//               renderItem={item => {
//                 const isSelected = item.value === selectedExam;
//                 return (
//                   <View style={[styles.dropItem, isSelected && styles.dropItemSelected]}>
//                     <Text style={[styles.dropItemText, isSelected && styles.dropItemTextSelected]}>
//                       {item.label}
//                     </Text>
//                     {isSelected && <Icon name="check" size={sp(16)} color="#fff" />}
//                   </View>
//                 );
//               }}
//             />
//           </View>

//           {/* Results Card */}
//           <View style={styles.resultsCard}>
//             {/* Card header */}
//             <View style={styles.resultsHeader}>
//               <View style={styles.resultsHeaderIcon}>
//                 <Icon name="assignment" size={sp(17)} color={C.primaryLight} />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.resultsTitle}>Progress Report</Text>
//                 {examName ? (
//                   <Text style={styles.resultsSubtitle}>{examName} · {acaYear}</Text>
//                 ) : null}
//               </View>
//             </View>
//             <Divider style={styles.divider} />

//             {deduplicatedReport.length > 0 ? (
//               <>
//                 {/* Table */}
//                 <View style={styles.tableWrap}>
//                   <TableHeader cols={['Subject', 'Max', 'Scored', 'Result', 'Grade']} />
//                   {deduplicatedReport.map((item, index) => (
//                     <View
//                       key={index}
//                       style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? C.stripe1 : C.stripe2 }]}
//                     >
//                       <Text style={[styles.tableCell, styles.subjectCol]} numberOfLines={2}>
//                         {item.sub_name}
//                       </Text>
//                       <Text style={[styles.tableCell, styles.dataCol]}>100</Text>
//                       <Text style={[styles.tableCell, styles.dataCol]}>{item.total_mark}</Text>
//                       <Text style={[
//                         styles.tableCell,
//                         styles.dataCol,
//                         { color: item.result === 'Pass' ? C.pass : C.fail, fontFamily: fonts.ROBOTO_BOLD }
//                       ]}>
//                         {item.result}
//                       </Text>
//                       <Text style={[styles.tableCell, styles.dataCol, { color: C.accent, fontFamily: fonts.ROBOTO_BOLD }]}>
//                         {item.grade}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>

//                 {/* Bar Chart */}
//                 <View style={styles.chartSection}>
//                   <View style={styles.chartHeaderRow}>
//                     <View style={styles.dropCardIcon}>
//                       <Icon name="bar-chart" size={sp(16)} color={C.primaryLight} />
//                     </View>
//                     <Text style={styles.chartTitle}>Marks Overview</Text>
//                   </View>
//                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     <BarChart
//                       data={barData}
//                       spacing={sp(20)}
//                       barWidth={sp(28)}
//                       maxValue={100}
//                       stepValue={20}
//                       showGradient
//                       frontColor={C.barColor}
//                       gradientColor="#CE93D8"
//                       width={Math.max(barData.length * sp(52), width - sp(80))}
//                       height={sp(180)}
//                       barBorderRadius={sp(4)}
//                       yAxisTextStyle={{ color: C.textMuted, fontSize: sp(11) }}
//                       xAxisLabelTextStyle={{ color: C.textSecondary, fontSize: sp(10) }}
//                       rulesColor={C.border}
//                       noOfSections={5}
//                     />
//                   </ScrollView>
//                 </View>
//               </>
//             ) : (
//               <EmptyState message="Please select an examination to view the report." />
//             )}
//           </View>

//           <View style={{ height: sp(20) }} />
//         </ScrollView>
//       )}

//       {/* ── DAILY TEST TAB ── */}
//       {selectedItem === 'Daily Test' && (
//         <ScrollView
//           style={styles.scroll}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <ProfileCard />

//           {/* Test Dropdown */}
//           <View style={styles.dropCard}>
//             <View style={styles.dropCardHeader}>
//               <View style={styles.dropCardIcon}>
//                 <Icon name="quiz" size={sp(16)} color={C.primaryLight} />
//               </View>
//               <Text style={styles.dropCardTitle}>Select Daily Test</Text>
//             </View>
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.dropPlaceholder}
//               selectedTextStyle={styles.dropSelected}
//               inputSearchStyle={styles.dropSearch}
//               iconStyle={styles.dropIcon}
//               data={testDropData}
//               search
//               maxHeight={280}
//               labelField="label"
//               valueField="value"
//               placeholder="Choose a test..."
//               searchPlaceholder="Search test..."
//               value={selectedTest}
//               onChange={item => {
//                 setSelectedTest(item.value);
//                 setTestName(item.label);
//               }}
//               renderLeftIcon={() => (
//                 <Icon name="edit-note" size={sp(18)} color={C.primaryLight} style={{ marginRight: sp(8) }} />
//               )}
//               renderItem={item => {
//                 const isSelected = item.value === selectedTest;
//                 return (
//                   <View style={[styles.dropItem, isSelected && styles.dropItemSelected]}>
//                     <Text style={[styles.dropItemText, isSelected && styles.dropItemTextSelected]}>
//                       {item.label}
//                     </Text>
//                     {isSelected && <Icon name="check" size={sp(16)} color="#fff" />}
//                   </View>
//                 );
//               }}
//             />
//           </View>

//           {/* Test Results Card */}
//           <View style={styles.resultsCard}>
//             <View style={styles.resultsHeader}>
//               <View style={styles.resultsHeaderIcon}>
//                 <Icon name="grading" size={sp(17)} color={C.primaryLight} />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.resultsTitle}>Test Report</Text>
//                 {testName ? (
//                   <Text style={styles.resultsSubtitle}>{testName} · {todayDate}</Text>
//                 ) : null}
//               </View>
//             </View>
//             <Divider style={styles.divider} />

//             {todayTestReport.length > 0 ? (
//               <View style={styles.tableWrap}>
//                 {/* Header */}
//                 <View style={[styles.tableRow, styles.tableHeaderRow]}>
//                   <Text style={[styles.tableCell, styles.subjectCol, styles.tableHeaderCell]}>Subject</Text>
//                   <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Max Marks</Text>
//                   <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Scored</Text>
//                 </View>
//                 {todayTestReport.map((item, index) => (
//                   <View
//                     key={index}
//                     style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? C.stripe1 : C.stripe2 }]}
//                   >
//                     <Text style={[styles.tableCell, styles.subjectCol]} numberOfLines={2}>
//                       {item.sub_name}
//                     </Text>
//                     <Text style={[styles.tableCell, styles.dataCol]}>{item.maximum_mark}</Text>
//                     <Text style={[styles.tableCell, styles.dataCol, { color: C.accent, fontFamily: fonts.ROBOTO_BOLD }]}>
//                       {item.total_mark}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             ) : (
//               <EmptyState message="Please select a test to view today's results." />
//             )}
//           </View>

//           <View style={{ height: sp(20) }} />
//         </ScrollView>
//       )}

//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProgressReportScreen;

// // ─── Shared table sub-styles ──────────────────────────────────────────────────
// const tableStyles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     backgroundColor: '#6A1B9A',
//     paddingVertical: sp(10),
//     paddingHorizontal: sp(8),
//     borderRadius: sp(6),
//     marginBottom: sp(4),
//   },
//   headerCell: {
//     color: '#fff',
//     fontSize: sp(12),
//     fontFamily: fonts.ROBOTO_BOLD,
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: sp(9),
//     paddingHorizontal: sp(8),
//     borderRadius: sp(4),
//     marginBottom: sp(2),
//   },
//   cell: {
//     fontSize: sp(13),
//     color: '#1A1A2E',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     textAlign: 'center',
//   },
//   subjectCol: { flex: 2, textAlign: 'left' },
//   dataCol:    { flex: 1, textAlign: 'center' },
// });

// const emptyStyles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingVertical: sp(36),
//   },
//   iconCircle: {
//     width: sp(72),
//     height: sp(72),
//     borderRadius: sp(36),
//     backgroundColor: '#EDE7F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: sp(14),
//   },
//   title: {
//     fontSize: sp(16),
//     color: '#5D4E6D',
//     fontFamily: fonts.ROBOTO_BOLD,
//     marginBottom: sp(6),
//   },
//   note: {
//     fontSize: sp(13),
//     color: '#E53935',
//     fontFamily: fonts.FONT_MEDIUM,
//     textAlign: 'center',
//     paddingHorizontal: sp(20),
//   },
// });

// // ─── Main Styles ──────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: C.primary,
//   },

//   // Loader
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: C.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  
//   loaderCard: {
//     backgroundColor: C.surface,
//     borderRadius: sp(20),
//     padding: sp(36),
//     alignItems: 'center',
//     shadowColor: C.primary,
//     shadowOpacity: 0.12,
//     shadowRadius: 16,
//     elevation: 6,
//   },
//   loaderText: {
//     marginTop: sp(14),
//     fontSize: sp(14),
//     color: '#5D4E6D',
//     fontFamily: fonts.FONT_MEDIUM,
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // justifyContent: 'space-between',
//     backgroundColor: C.primary,
//     paddingHorizontal: sp(16),
//     paddingVertical: sp(14),
//   },
//   headerBtn: {
//     width: sp(40),
//     height: sp(40),
//     borderRadius: sp(20),
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: sp(18),
//     marginLeft:80,
//     fontFamily: fonts.FONT_BOLD,
//     letterSpacing: 0.4,
//   },

//   // Tab Bar
//   tabBar: {
//     flexDirection: 'row',
//     marginTop:20,
//     paddingHorizontal: sp(16),
//     paddingBottom: sp(12),
//     gap: sp(10),
//   },
//   tab: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: sp(10),
//     borderRadius: sp(10),
//     backgroundColor: 'rgba(63, 51, 51, 0.12)',
//   },
//   tabActive: {
//     backgroundColor: "#7c43bd",
//     shadowColor: C.accent,
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   tabText: {
//     fontSize: sp(13),
//     color: 'rgba(255,255,255,0.65)',
//     fontFamily: fonts.FONT_MEDIUM,
//   },
//   tabTextActive: {
//     color: '#fff',
//     fontFamily: fonts.FONT_BOLD,
//   },

//   // Scroll
//   scroll: { flex: 1, backgroundColor: C.background },
//   scrollContent: { padding: sp(14), paddingBottom: sp(30) },

//   // Profile Card
//   profileCard: {
//     backgroundColor: C.primary,
//     borderRadius: sp(20),
//     paddingVertical: sp(20),
//     paddingHorizontal: sp(16),
//     alignItems: 'center',
//     marginBottom: sp(14),
//     shadowColor: '#000',
//     shadowOpacity: 0.18,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   avatar: {
//     width: sp(56),
//     height: sp(56),
//     borderRadius: sp(28),
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderWidth: 2,
//     borderColor: 'rgba(255,255,255,0.45)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: sp(9),
//   },
//   avatarLetter: {
//     fontSize: sp(26),
//     color: '#fff',
//     fontFamily: fonts.FONT_BOLD,
//   },
//   studentName: {
//     color: '#fff',
//     fontSize: sp(17),
//     fontFamily: fonts.FONT_BOLD,
//     letterSpacing: 0.4,
//     textAlign: 'center',
//     marginBottom: sp(7),
//   },
//   badgesRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: sp(6),
//   },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: sp(20),
//     paddingHorizontal: sp(10),
//     paddingVertical: sp(4),
//     gap: sp(4),
//   },
//   badgeText: {
//     color: '#ffffff',
//     fontSize: sp(12),
//     fontFamily: fonts.FONT_MEDIUM,
//   },
//   badgeDot: {
//     width: sp(4),
//     height: sp(4),
//     borderRadius: sp(2),
//     backgroundColor: 'rgba(255,255,255,0.35)',
//   },

//   // Dropdown Card
//   dropCard: {
//     backgroundColor: C.surface,
//     borderRadius: sp(16),
//     padding: sp(14),
//     marginBottom: sp(14),
//     shadowColor: C.primary,
//     shadowOpacity: 0.07,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   dropCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: sp(10),
//   },
//   dropCardIcon: {
//     width: sp(32),
//     height: sp(32),
//     borderRadius: sp(8),
//     backgroundColor: C.accentLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: sp(10),
//   },
//   dropCardTitle: {
//     fontSize: sp(14),
//     color: C.textPrimary,
//     fontFamily: fonts.FONT_BOLD,
//   },
//   dropdown: {
//     height: sp(50),
//     backgroundColor: C.background,
//     borderRadius: sp(10),
//     paddingHorizontal: sp(12),
//     borderWidth: 1,
//     borderColor: C.border,
//   },
//   dropPlaceholder: {
//     fontSize: sp(14),
//     color: C.textMuted,
//     fontFamily: fonts.FONT_REGULAR,
//   },
//   dropSelected: {
//     fontSize: sp(14),
//     color: C.textPrimary,
//     fontFamily: fonts.FONT_MEDIUM,
//   },
//   dropSearch: {
//     height: sp(40),
//     fontSize: sp(14),
//     color: C.textPrimary,
//   },
//   dropIcon: { width: sp(20), height: sp(20) },
//   dropItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: sp(13),
//     paddingHorizontal: sp(16),
//   },
//   dropItemSelected: { backgroundColor: C.accent },
//   dropItemText: {
//     flex: 1,
//     fontSize: sp(14),
//     color: C.textPrimary,
//     fontFamily: fonts.FONT_REGULAR,
//   },
//   dropItemTextSelected: { color: '#fff', fontFamily: fonts.FONT_MEDIUM },

//   // Results Card
//   resultsCard: {
//     backgroundColor: C.surface,
//     borderRadius: sp(16),
//     padding: sp(14),
//     shadowColor: C.primary,
//     shadowOpacity: 0.07,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   resultsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: sp(10),
//   },
//   resultsHeaderIcon: {
//     width: sp(36),
//     height: sp(36),
//     borderRadius: sp(10),
//     backgroundColor: C.accentLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: sp(10),
//   },
//   resultsTitle: {
//     fontSize: sp(15),
//     color: C.textPrimary,
//     fontFamily: fonts.FONT_BOLD,
//   },
//   resultsSubtitle: {
//     fontSize: sp(12),
//     color: C.textMuted,
//     fontFamily: fonts.FONT_REGULAR,
//     marginTop: sp(2),
//   },
//   divider: {
//     backgroundColor: C.border,
//     height: 1,
//     marginBottom: sp(12),
//   },

//   // Table
//   tableWrap: {
//     borderRadius: sp(10),
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: C.border,
//   },
//   tableHeaderRow: {
//     backgroundColor: C.primary,
//   },
//   tableHeaderCell: {
//     color: '#fff',
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: sp(10),
//     paddingHorizontal: sp(10),
//   },
//   tableCell: {
//     fontSize: sp(13),
//     color: C.textPrimary,
//     fontFamily: fonts.ROBOTO_MEDIUM,
//   },
//   subjectCol: { flex: 2, textAlign: 'left' },
//   dataCol:    { flex: 1, textAlign: 'center' },

//   // Chart
//   chartSection: {
//     marginTop: sp(16),
//   },
//   chartHeaderRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: sp(10),
//   },
//   chartTitle: {
//     fontSize: sp(14),
//     color: C.textPrimary,
//     fontFamily: fonts.FONT_BOLD,
//   },
// });

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image, 
// //   ActivityIndicator,
// //   Dimensions,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';
// // import { Divider } from 'react-native-paper';
// // import Icon from "react-native-vector-icons/MaterialIcons";
// // // import MaterialIcons from '@react-native-vector-icons/material-icons';
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import axios from "axios";
// // import { Dropdown } from "react-native-element-dropdown";
// // import { BarChart } from "react-native-gifted-charts/dist/BarChart";
// // import { fonts } from "../root/config";
// // import {
// //   widthPercentageToDP as wp,
// //   heightPercentageToDP as hp,
// // } from 'react-native-responsive-screen';
// // import { SafeAreaView } from "react-native-safe-area-context";
// // // import { BarChart } from "react-native-gifted-charts";

// //   // const DropdownSection = [
// //   //  'Mid Term','Final Exam','Unit Test'
// //   // ]
// // const item = ['Examination', 'Daily Test',];
// //   interface ProgressReportScreenProps {
// //   route:any
// //   navigation: any
// // }
// // const ProgressReportScreen: React.FC<ProgressReportScreenProps> = ({route , navigation}) => {
// //   const { orgid, studentId, mobile } = route?.params || {};
// //     const [loading, setLoading] = useState(true);
// //       const [studentData, setStudentData] = useState({});
// //   const [selectedItem, setSelectedItem] = useState('Examination');
// //   //  const [examList, setExamList] = useState([]);
// //   // const [selectedExam, setSelectedExam] = useState("");

// //    const [selectedExam, setSelectedExam] = useState(null);
// //   const [examList, setShowExam] = useState([]);
// // //  const [searchText, setSearchText] = useState("");
// //  const [selectedTest, setSelectedTest] = useState(null);
// //   const [testList, setTestList] = useState([]);
// //   const [testReport, setTestReport] = useState([]);
// //   const [testChartData, setTestChartData] = useState([]);
// //   const [testName, setTestName] = useState("");


// //   const [progressReport, setProgressReport] = useState([]);
// //   const [chartData, setChartData] = useState([]);
// //   const [examName, setExamName] = useState("");
// //   const [acaYear, setAcaYear] = useState("");

// //   const data = examList.map((exam) => ({
// //     label: exam.exam_name,
// //     value: exam.examId,
// //   }));

// //   const getStudentData = async () => {
// //     try {
// //       const mobileNo = await AsyncStorage.getItem("mobile");
// //       const response = await axios.post(
// //         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
// //       );

// //       if (response.data.isSuccess && response.data.studDetails) {
// //         const data = response.data.studDetails[0];
// //         setStudentData({
// //           stud_name: data.stud_name,
// //           std_name: data.std_name,
// //           section: data.section,
// //           rollNo: data.rollNo,
// //         });
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //    const getExaminationsData = async () => {
// //     try {
// //       const response = await axios.post(
// //         `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`
// //       );
// //   //  console.log("response.data.examList==>",response.data.examList)
// //       if (response.data.isSuccess && response.data.examList) {
// //         setShowExam(response.data.examList);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //       const getTestdata = async () => {
// //         try {
// //             const url = `https://www.vtsmile.in/app/api/faculties/staff_test_list_api?orgId=${orgid}`;
// //             const res = await axios.post(url);

// //             // console.log('----------.', res.data.today_list)
// //             if (res.data.isSuccess && res.data.today_list) {
// //                 setTestList(res.data.today_list);
// //             } else {
// //                 setTestList([]);
// //             }
// //         } catch (err) {
// //             console.log(err)
// //         }
// //     }

// //  const getProgressReportData = async (examId) => {
// //     try {
// //       const response = await axios.post(
// //         `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
// //       );
// // // console.log("Progress Report Response:", response.data);
// //       if (response.data.isSuccess && response.data.student_progress_report) {
// //         setProgressReport(response.data.student_progress_report);
// //         setChartData(
// //           response.data.student_progress_report.map((item) =>
// //             Number(item.total_mark)
// //           )
// //         );
// //         setExamName(response.data.examName);
// //         setAcaYear(response.data.acadamicYear);
// //       } else {
// //         setProgressReport([]);
// //         setChartData([]);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };


// //    const getDailyTestReportData = async (testId) => {
// //     try {
// //       const response = await axios.post(
// //         `https://www.vtsmile.in/app/api/students/student_test_mark_api?orgId=${orgid}&testId=${testId}&studId=${studentId}`
// //       );

// //       //  console.log("response.data.test_mark==>", response.data);
// //       if (response.data.isSuccess && response.data.test_mark) {
// //         setTestReport(response.data.test_mark);
// //         setTestChartData(
// //           response.data.test_mark.map((item) =>
// //             Number(item.total_mark)
// //           )
// //         );
// //       } else {
// //         setTestReport([]);
// //         setTestChartData([]);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //     useEffect(() => {
// //     const fetchData = async () => {
// //       await getStudentData();
// //       await getExaminationsData();
// //       await getTestdata();
// //       setLoading(false);
// //     };
// //     fetchData();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedExam) {
// //       getProgressReportData(selectedExam);
// //     }
// //   }, [selectedExam]);

// //     useEffect(() => {
// //     if (selectedTest) {
// //       getDailyTestReportData(selectedTest);
// //     }
// //   }, [selectedTest]);


// //     if (loading) {
// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
// //         <ActivityIndicator size="large" color="#784EB1" />
// //           <Text>Loading...</Text>
// //       </View>
// //     );
// //   }
// // const todayDate = new Date().toISOString().split('T')[0];

// // const todayTestReport = testReport.filter(item => {
// //   if (!item.test_date || !item.test_Id) return false;

// //   const itemDate = item.test_date.split(' ')[0];

// //   return (
// //     itemDate === todayDate &&
// //     String(item.test_Id) === String(selectedTest)
// //   );
// // });


// // const getLatestSubjectMarks = (data) => {
// //   const map = new Map();

// //   data.forEach(item => {
// //     const key = item.sub_name;

// //     // keep latest entry (based on test_mark_Id or test_date)
// //     if (
// //       !map.has(key) ||
// //       Number(item.test_mark_Id) > Number(map.get(key).test_mark_Id)
// //     ) {
// //       map.set(key, item);
// //     }
// //   });

// //   return Array.from(map.values());
// // };

// // const removeExamDuplicateBySubject = (data) => {
// //   const map = new Map();

// //   data.forEach(item => {
// //     // subject_id is the unique key
// //     map.set(item.subject_id, item);
// //   });

// //   // keeps LAST occurrence automatically
// //   return Array.from(map.values());
// // };

// //   return (
// //     <SafeAreaView style={{flex:1, backgroundColor:'#7c43bd',marginBottom:-30}}>
// //       <View  style={styles.container}>

// //       {/* Header */}
// //       <View style={styles.headerBox}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //          <Icon name="arrow-back" size={24} color="#fff" />
// //          </TouchableOpacity>
// //         <Text style={styles.progressText}>Progress Report</Text>
       
// //       </View>
// //       <View>
// //                <View style={styles.weekdaysRow}>
// //                   {item.map(index => (
// //                     <TouchableOpacity
// //                       key={index}
// //                       style={[
// //                         styles.dayBtn,
// //                         selectedItem === index && styles.dayBtnActive,
// //                       ]}
// //                       onPress={() => setSelectedItem(index)}
// //                     >

// //                       <Text
// //                         style={[
// //                           styles.dayText,
// //                           selectedItem === index && styles.dayTextActive,
// //                         ]}
// //                       >
// //                         {index}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   ))}

// //                 </View>
// //   {selectedItem === 'Examination' && (
// //     <>
  
// //        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
    
// //     <View style={styles.profileCard}>
 
// //           <Text style={styles.studentName}>{studentData.stud_name}</Text>
// //           <Text style={styles.classText}>  Class: {studentData.std_name} {studentData.section} | Roll No:{" "}
// //           {studentData.rollNo}</Text>
// //         </View>
// //       {/* Dropdown Examination Select */}
// //       <View style={styles.dropdownBox}>
      
    
    
// //         <View>
// //           {/* <TouchableOpacity style={styles.dropdown}
// //             onPress={() => setShowExam(!examList)}>
// //              <MaterialIcons name="format-list-bulleted-add" size={25} style={{color:'#fff',top:25}} />
// //             <Text style={styles.dropdownText1}>     {selectedExam || 'selectedExam'}</Text>
// //             <MaterialIcons
// //               name={examList ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
// //               size={30}
// //               style={{ color: '#f7f7f7ff', marginLeft: 'auto', bottom: 18 }}
// //             />
// //           </TouchableOpacity> */}

// //               <Dropdown
// //         style={styles.dropdown}
// //         placeholderStyle={styles.placeholderStyle}
// //         selectedTextStyle={styles.selectedTextStyle}
// //         inputSearchStyle={styles.inputSearchStyle}
// //         iconStyle={styles.iconStyle}
// //         data={data}
// //         search
// //         maxHeight={300}
// //         labelField="label"
// //         valueField="value"
// //         placeholder="Select Examination Here"
// //         searchPlaceholder="Search..."
// //         value={selectedExam}
// //         onChange={(item) => {
// //           setSelectedExam(item.value);
// //         }}
// //       />
// // {/* 
// //           {showExam && (
// //             <View style={styles.dropdownList}>
// //               <View style={{borderBottomWidth:1,width:"95%",marginLeft:8,bottom:30}}>
// //                 <MaterialIcons name="search" size={25} style={{color:'#000000ff',top:38}} />
// //               <TextInput 
// //                style={styles.input}
// //                placeholder='Select Exam' 
// //                placeholderTextColor={'black'}
// //                 value={searchText}
// //                   onChangeText={setSearchText} 
// //                >
// //               </TextInput>
// //               </View>

// //               {showExam.length > 0 ? (
// //               showExam.map((exam) => (
// //                 <TouchableOpacity
// //                   key={exam.id}
// //                   onPress={() => {
// //                     setSelectedExam(exam);
// //                     setShowExam(false);
// //                     setSearchText("");
// //                   }}
// //                   style={styles.dropdownItem}
// //                 >
// //                   <Text style={styles.dropdownText}>{exam.name}</Text>
// //                 </TouchableOpacity>
// //               ))
// //             ) :(
// //                <Text
// //                   style={{
// //                     padding: 10,
// //                     textAlign: "center",
// //                     color: "gray",
// //                   }}
// //                 >
// //                   No matches found
// //                 </Text>
// //             )}
// //             </View>
// //           )} */}
// //         </View>

// //       </View>

// //       {/* Progress Report / Empty State */}
// //       <View style={styles.cardArea}>
// //         <View style={styles.cardHeader}>
// //           <Icon name="person" size={24} color="#6c63ff" style={{top:10,right:5}}/>
// //           <Text style={styles.cardHeaderText}>Progress Report - {examName} ({acaYear})</Text>
// //         </View>
// //       <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />

// //          {progressReport.length > 0 ? (
// //             <View style={styles.tableContainer}>
// //               <View style={{flexDirection:'row',padding:1,justifyContent:'space-between',}}>
// //                <Text style={{flex:2, fontFamily: fonts.ROBOTO_BOLD}}>Subject</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:10,left:5}}>Max</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,}}>Scored</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:5}}>Result</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:5,left:5}}>Grade</Text>

// //               </View>
              
// //               {/* {progressReport.map((item, index) => ( */}
// //               {removeExamDuplicateBySubject(progressReport).map((item, index) => (

// //                 <View
// //               key={index}
// //               style={[
// //                 styles.row,
// //                 { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
// //               ]}
// //             >
             
// //               <Text style={styles.cell}>{item.sub_name}</Text>
// //               <Text style={styles.cellCenter}>100</Text>
// //               <Text style={styles.cellCenter}>{item.total_mark}</Text>
// //               <Text style={styles.cellCenter}>{item.result}</Text>
// //               <Text style={styles.cellCenter}>{item.grade}</Text>
// //             </View>
// //           ))}
// //         </View>
// //       ) : (
// //         <View style={styles.noData}>
// //          <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
// //           <Text style={{fontFamily:fonts.ROBOTO_BOLD}}>Sorry!, No data found!</Text>
// //           <Text style={{ color: "red" }}>(Note: Please Select Examination)</Text>
// //         </View>
      
// //         )}

// //          {chartData.length > 0 && (
// //           <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
       
// //         <BarChart
     
// //           data={removeExamDuplicateBySubject(progressReport).map((item) => ({
// //             value: Number(item.total_mark),
// //             label: item.sub_name,
// //             frontColor: "#784EB1",
            
// //           }))}
// //           spacing={30}
// //           barWidth={30}
// //           maxValue={100}
// //           stepValue={20}
// //           showGradient={true}
// //           frontColor="#784EB1"
// //           width={Dimensions.get("window").width - 130}
// //           height={190}
// //           // style={{ marginVertical: 16, borderRadius: 8, marginTop: 10,top:10  }}
// //         />
// //   </View>
      
// //       )}
     
      
      
// //       </View>
// //       </ScrollView>
// //   </>
// //   )}

// //   {selectedItem === 'Daily Test' && (
// //     <>
// //        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
    
// //     <View style={styles.profileCard}>
 
// //           <Text style={styles.studentName}>{studentData.stud_name}</Text>
// //           <Text style={styles.classText}>  Class: {studentData.std_name} {studentData.section} | Roll No:{" "}
// //           {studentData.rollNo}</Text>
// //         </View>
// //       {/* Dropdown Examination Select */}
// //       <View style={styles.dropdownBox}>
      
    
    
// //         <View>
         

// //               <Dropdown
// //         style={styles.dropdown}
// //         placeholderStyle={styles.placeholderStyle}
// //         selectedTextStyle={styles.selectedTextStyle}
// //         inputSearchStyle={styles.inputSearchStyle}
// //         iconStyle={styles.iconStyle}
// //         data={testList.length > 0 ? testList.map((t) => ({
// //           label: t.test_name,
// //           value: t.test_Id
// //         })) : []}
// //         search
// //         maxHeight={300}
// //         labelField="label"
// //         valueField="value"
// //         placeholder="Select Test Here"
// //         searchPlaceholder="Search..."
// //         value={selectedTest}
// //         onChange={(item) => {
// //           setSelectedTest(item.value);
// //           setTestName(item.label);
// //           //  setTestReport([]);
// //         }}
// //       />

// //         </View>

// //       </View>

// //       {/* Progress Report / Empty State */}
// //       <View style={styles.cardArea1}>

// //         <View style={styles.cardHeader}>
           

// //           <Icon name="person" size={24} color="#6c63ff" style={{top:10,right:5}}/>
// //          <Text style={styles.cardHeaderText}>
// //            Test Report- {testName} -
// // </Text>
// // {todayTestReport.length > 0 && (
// //   <Text style={styles.testdate}>{todayDate}</Text>
// // )}

// //           {/* <Text style={styles.cardHeaderText}>Test Report - {testName}-({item.test_date})</Text> */}
// //         </View>
// //       <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />
// //        <>
// //        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
// //          {todayTestReport.length > 0 ? (

// //             <View style={styles.tableContainer}>
// //               <View style={{flexDirection:'row',paddingBottom:10,justifyContent:'space-between',}}>
// //                <Text style={{flex:2, fontFamily: fonts.ROBOTO_BOLD,left:10,top:5}}>Subject</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:-25,top:5}}>Max</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:-30,top:5}}>Total Mark</Text>
// //                {/* <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:5}}>Result</Text>
// //                <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:5,left:5}}>Grade</Text> */}

// //               </View>
// //              {/* {todayTestReport.map((item, index) => ( */}
// // {getLatestSubjectMarks(todayTestReport).map((item, index) => (

// //                 <View
// //               key={index}
// //               style={[
// //                 styles.row,
// //                 { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
// //               ]}
// //             >
             
// //               <Text style={styles.cell1}>{item.sub_name}</Text>
// //                <Text style={styles.cellCenter1}>{item.maximum_mark}</Text>
// //               <Text style={styles.cellCenter2}>{item.total_mark}</Text>
// //               {/* <Text style={styles.cellCenter}>{item.result}</Text>
// //               <Text style={styles.cellCenter}>{item.grade}</Text> */}
// //             </View>
// //           ))}
// //         </View>
// //       ) : (
// //         <View style={styles.noData}>
// //          <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
// //           <Text style={{fontFamily:fonts.ROBOTO_BOLD}}>Sorry!, No data found!</Text>
// //           <Text style={{ color: "red" }}>(Note: Please Select Test)</Text>
// //         </View>
      
// //         )}
// // {/* 
// //          {testChartData.length > 0 && (
// //           <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
       
// //         <BarChart
// //           data={testReport.map((item) => ({
// //             value: Number(item.total_mark),
// //             label: item.sub_name,
// //             frontColor: "#784EB1",
            
// //           }))}
// //           spacing={30}
// //           barWidth={30}
// //           maxValue={100}
// //           stepValue={20}
// //           showGradient={true}
// //           frontColor="#784EB1"
// //           width={Dimensions.get("window").width - 130}
// //           height={190}
// //           // style={{ marginVertical: 16, borderRadius: 8, marginTop: 10,top:10  }}
// //         />
// //   </View>
      
// //       )}
// //       */}
// //          </ScrollView>
// //       </>
// //       </View>
// //    </ScrollView>
// //     </>
// //   )}
// //       </View>
// //           </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //    container: { flex: 1, backgroundColor: '#ffffffff', width: "100%",  },
// //   headerBox: {
// //    flexDirection: 'row', alignItems: 'center',
// //     backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between',
// //   },
// //   progressText: {
// //    color: '#fff', fontSize: 20,  fontFamily: fonts.FONT_BOLD,right:95 },
// //   profileCard: {
// //     backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
// //     paddingVertical: 14,
// //   },
// //     starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 4 },
// //   tableContainer: { marginTop: 20 ,borderWidth: 1, borderColor: '#ddd', borderRadius: 8,},
// //   examTitle: { fontSize: 16, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 },
// //   row: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 5 },
// //   cell: { flex: 2, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD},
// //   cell1: { flex: 2, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,left:10},
// //   testdate: {fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_MEDIUM,left:10,top:12,width:"100%"},
// //   cellCenter: { flex: 1, fontSize: 14, textAlign: "center", color: "#000" ,fontFamily:fonts.ROBOTO_BOLD},
// //   cellCenter1: { flex: 1, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,right:12},
// //     cellCenter2: { flex: 1, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,},
// //   noData: { alignItems: "center", marginTop: 50 },


// //   studentName: {
// //     color: '#ffffff',
// //     fontSize: 16,
// //    fontFamily: fonts.FONT_BOLD,
// //     marginTop: 7,
// //     letterSpacing: 0.5,textAlign: 'center' 
// //   },
// //   classText: {
// //      fontFamily: fonts.ROBOTO_BOLD,
// //      color: '#ffffffff',
// //     fontSize: 13,
// //     marginTop: 4,textAlign: 'center',
// //   },
// //   dropdownBox: {
// //     paddingHorizontal: 16,
// //     marginBottom: 14,
// //     marginTop: 4,
// //   },
// //   dropdownButton: {
// //     width: '100%',
// //     backgroundColor: '#fde2fe',
// //     borderRadius: 8,
// //     borderWidth: 1,
// //     borderColor: '#d0bfff',
// //   },
// //     input: {
// //      marginLeft:25,top:5,
// //     fontSize: 16,
// //     color: '#222'
// //   },
// //   dropdownButtonText: {
// //     color: '#6c63ff',
// //     fontSize: 15,
// //     fontWeight: '600',
// //   },

// //    weekdaysRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 10,
// //     marginTop: 30, marginRight: 40, right: 10, bottom: 10

// //   },
// //   dayBtn: {
// //     width: "55%", height: hp(5),
// //     marginLeft: 5,
// //     backgroundColor: '#bdc3c5ff',
// //     borderRadius: 5,

// //   },
// //   dayBtnActive: { backgroundColor: '#7c43bd' },
// //   dayText: { fontSize: 16, color: '#ffffffff', top: 5, textAlign: 'center', fontFamily: fonts.FONT_REGULAR },
// //   dayTextActive: { fontWeight: 'bold' },
// //   cardArea: {
// //     marginHorizontal: 14,
// //     backgroundColor: '#f3f2ff',
// //     borderRadius: 10,
// //     padding: 18,
// //     marginTop: 5,
// //     height: hp(71),
// //     borderWidth: 1,
// //     borderColor: '#2626cdff',
// //   },
// //    cardArea1: {
// //     marginHorizontal: 14,
// //     backgroundColor: '#f3f2ff',
// //     borderRadius: 10,
// //     padding: 18,
// //     marginTop: 5,
// //     height: hp(55),
// //     borderWidth: 1,
// //     borderColor: '#2626cdff',
// //   },
// //   cardHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     bottom:10,right:5,
// //   },
// //   cardHeaderText: {
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     fontSize: 16,
// //     color: '#333',
// //     marginLeft: 3,
// //     top:12
// //   },
// //   emptyState: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 30,
// //   },
// //   emptyImage: {
// //     width: 72,
// //     height: 72,
// //     marginBottom: 16,
// //   },
// //   emptyTitle: {
// //     fontSize: 18,
// //     color: '#6c63ff',
// //     fontWeight: 'bold',
// //     marginBottom: 7,
// //   },
// //   emptyNote: {
// //     fontSize: 13,
// //     color: '#e25151',
// //     fontWeight: '500',
// //   },

// //   dropdownList: {
// //     backgroundColor: '#ffffffff',
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginTop: 5,
// //     paddingVertical: 5,
// //     elevation: 3, // adds shadow on Android
// //     zIndex: 1
// //   },
// //   dropdownItem: {
// //     bottom:15,
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //   },
// //   // dropdown: {
// //   //   backgroundColor: '#7c43bd',
// //   //   borderRadius: 10,
// //   //   padding: 8,
// //   //   height: 45,
// //   //   justifyContent: 'center',
// //   // },
// //   dropdownText: {
// //     fontSize: 15,
// //     color: '#000000ff',

// //   },
// //    dropdown: {
// //     height: 50,
// //     borderColor: "#ccc",
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 8,
// //   },
// //   placeholderStyle: {
// //     fontSize: 16,
// //     color: "#999",
// //   },
// //   selectedTextStyle: {
// //     fontSize: 16,
// //     color: "#000",
// //   },
// //   inputSearchStyle: {
// //     height: 40,
// //     fontSize: 16,
// //   },
// //   iconStyle: {
// //     width: 20,
// //     height: 20,
// //   },
// //   dropdownText1: {
// //     fontSize: 15,
// //     color: '#fefefeff', left:20,top:3

// //   },
// // });

// // export default ProgressReportScreen;



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { BarChart } from "react-native-gifted-charts";
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Responsive scale ─────────────────────────────────────────────────────────
const BASE = 375;
const scale = (n: number) => Math.round((width / BASE) * n);
const sp = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.22);

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  primary:      '#6A1B9A',
  primaryLight: '#9C27B0',
  accent:       '#7C4DFF',
  accentLight:  '#EDE7F6',
  surface:      '#FFFFFF',
  background:   '#F5F0FB',
  cardBg:       '#FDFAFF',
  textPrimary:  '#1A1A2E',
  textSecondary:'#5D4E6D',
  textMuted:    '#9E8CA8',
  border:       '#E1D5EC',
  pass:         '#00897B',
  passLight:    '#E0F2F1',
  fail:         '#E53935',
  failLight:    '#FFEBEE',
  stripe1:      '#EDE7F6',
  stripe2:      '#FDFAFF',
  barColor:     '#7C4DFF',
  white:        '#FFFFFF',
};

const TAB_ITEMS = ['Examination', 'Daily Test'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const removeDuplicateBySubject = (data: any[]) => {
  const map = new Map();
  data.forEach(item => map.set(item.subject_id, item));
  return Array.from(map.values());
};

const getLatestSubjectMarks = (data: any[]) => {
  const map = new Map();
  data.forEach(item => {
    const key = item.sub_name;
    if (!map.has(key) || Number(item.test_mark_Id) > Number(map.get(key).test_mark_Id)) {
      map.set(key, item);
    }
  });
  return Array.from(map.values());
};

// ─── Date Helpers ─────────────────────────────────────────────────────────────
const formatDate = (date: Date): string => date.toISOString().split('T')[0];

const formatDisplayDate = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getDayLabel = (dateStr: string): string => {
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short' });
};

// Generate last N days as date strings (most recent first)
const getRecentDates = (n = 7): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < n; i++) {
    dates.push(formatDate(new Date(Date.now() - i * 86400000)));
  }
  return dates;
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const EmptyState = ({ message }: { message: string }) => (
  <View style={emptyStyles.container}>
    <View style={emptyStyles.iconCircle}>
      <Icon name="assignment" size={sp(36)} color={C.textMuted} />
    </View>
    <Text style={emptyStyles.title}>No Data Found</Text>
    <Text style={emptyStyles.note}>{message}</Text>
  </View>
);

// ─── Date Filter Strip ────────────────────────────────────────────────────────
interface DateFilterProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availableDates?: string[]; // dates that have data
}

const DateFilterStrip: React.FC<DateFilterProps> = ({ selectedDate, onSelectDate, availableDates }) => {
  const recentDates = getRecentDates(30);

  return (
    <View style={dateStyles.wrapper}>
      <View style={dateStyles.headerRow}>
        <View style={dateStyles.iconBox}>
          <Icon name="calendar-today" size={sp(14)} color={C.primaryLight} />
        </View>
        <Text style={dateStyles.headerLabel}>Filter by Date</Text>
        <Text style={dateStyles.selectedLabel}>{formatDisplayDate(selectedDate)}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={dateStyles.strip}
      >
        {recentDates.map(date => {
          const isSelected = date === selectedDate;
          const hasData = availableDates ? availableDates.includes(date) : false;
          return (
            <TouchableOpacity
              key={date}
              style={[
                dateStyles.chip,
                isSelected && dateStyles.chipActive,
                hasData && !isSelected && dateStyles.chipHasData,
              ]}
              onPress={() => onSelectDate(date)}
              activeOpacity={0.75}
            >
              <Text style={[dateStyles.chipDay, isSelected && dateStyles.chipDayActive]}>
                {getDayLabel(date)}
              </Text>
              <Text style={[dateStyles.chipDate, isSelected && dateStyles.chipDateActive]}>
                {date.slice(8)}
              </Text>
              {hasData && (
                <View style={[dateStyles.dot, isSelected && dateStyles.dotActive]} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props { route: any; navigation: any; }

const ProgressReportScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [loading, setLoading]               = useState(true);
  const [studentData, setStudentData]       = useState<any>({});
  const [selectedItem, setSelectedItem]     = useState('Examination');

  // Examination
  const [selectedExam, setSelectedExam]     = useState<any>(null);
  const [examList, setExamList]             = useState<any[]>([]);
  const [progressReport, setProgressReport] = useState<any[]>([]);
  const [examName, setExamName]             = useState('');
  const [acaYear, setAcaYear]               = useState('');

  // Daily Test
  const [selectedTest, setSelectedTest]     = useState<any>(null);
  const [testList, setTestList]             = useState<any[]>([]);
  const [testReport, setTestReport]         = useState<any[]>([]);
  const [testName, setTestName]             = useState('');
  const [selectedDate, setSelectedDate]     = useState<string>(formatDate(new Date()));

  // ── API calls ────────────────────────────────────────────────────────────────
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );
      if (res.data.isSuccess && res.data.studDetails) {
        const d = res.data.studDetails[0];
        setStudentData({ stud_name: d.stud_name, std_name: d.std_name, section: d.section, rollNo: d.rollNo });
      }
    } catch (e) { console.log(e); }
  };

  const getExaminationsData = async () => {
    try {
      const res = await axios.post(`https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`);
      if (res.data.isSuccess && res.data.examList) setExamList(res.data.examList);
    } catch (e) { console.log(e); }
  };

  const getTestData = async () => {
    try {
      const res = await axios.post(`https://www.vtsmile.in/app/api/faculties/staff_test_list_api?orgId=${orgid}`);
      if (res.data.isSuccess && res.data.today_list) setTestList(res.data.today_list);
    } catch (e) { console.log(e); }
  };

  const getProgressReport = async (examId: any) => {
    try {
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
      );
      if (res.data.isSuccess && res.data.student_progress_report) {
        setProgressReport(res.data.student_progress_report);
        setExamName(res.data.examName);
        setAcaYear(res.data.acadamicYear);
      } else {
        setProgressReport([]);
      }
    } catch (e) { console.log(e); }
  };

  const getTestReport = async (testId: any) => {
    try {
      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/student_test_mark_api?orgId=${orgid}&testId=${testId}&studId=${studentId}`
      );
      if (res.data.isSuccess && res.data.test_mark) {
        setTestReport(res.data.test_mark);
      } else {
        setTestReport([]);
      }
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    (async () => {
      await getStudentData();
      await getExaminationsData();
      await getTestData();
      setLoading(false);
    })();
  }, []);

  useEffect(() => { if (selectedExam) getProgressReport(selectedExam); }, [selectedExam]);
  useEffect(() => {
    if (selectedTest) {
      setTestReport([]); // clear old results while loading
      getTestReport(selectedTest);
    }
  }, [selectedTest]);

  // ── Derived data ─────────────────────────────────────────────────────────────
  const examDropData = examList.map(e => ({ label: e.exam_name, value: e.examId }));
  const testDropData = testList.map(t => ({ label: t.test_name, value: t.test_Id }));

  const deduplicatedReport = removeDuplicateBySubject(progressReport);

  // All unique dates available in testReport for the selected test
  const availableDatesForTest: string[] = selectedTest
    ? [...new Set(
        testReport
          .filter(item => String(item.test_Id) === String(selectedTest))
          .map(item => item.test_date?.split(' ')[0])
          .filter(Boolean)
      )] as string[]
    : [];

  // Filter test report by selected test AND selected date
  const filteredTestReport = getLatestSubjectMarks(
    testReport.filter(item => {
      const itemDate = item.test_date?.split(' ')[0];
      return (
        String(item.test_Id) === String(selectedTest) &&
        itemDate === selectedDate
      );
    })
  );

  const barData = deduplicatedReport.map(item => ({
    value:      Number(item.total_mark),
    label:      item.sub_name?.length > 4 ? item.sub_name.substring(0, 4) : item.sub_name,
    frontColor: C.barColor,
    gradientColor: '#CE93D8',
  }));

  // ── Loading ───────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // ── Profile Card ──────────────────────────────────────────────────────────────
  const ProfileCard = () => (
    <View style={styles.profileCard}>
      <Text style={styles.studentName}>{studentData.stud_name || '—'}</Text>
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Icon name="group" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Class: {studentData.std_name} {studentData.section}</Text>
        </View>
        <View style={styles.badgeDot} />
        <View style={styles.badge}>
          <Icon name="format-list-numbered" size={sp(12)} color="rgba(255,255,255,0.8)" />
          <Text style={styles.badgeText}>Roll: {studentData.rollNo}</Text>
        </View>
      </View>
    </View>
  );

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={C.primary} />
      <View style={{ flex: 1, backgroundColor: "#ffff" }}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={sp(22)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Progress Report</Text>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {TAB_ITEMS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedItem === tab && styles.tabActive]}
              onPress={() => setSelectedItem(tab)}
              activeOpacity={0.8}
            >
              <Icon
                name={tab === 'Examination' ? 'school' : 'quiz'}
                size={sp(16)}
                color={selectedItem === tab ? '#fff' : 'rgba(255,255,255,0.55)'}
                style={{ marginRight: sp(5) }}
              />
              <Text style={[styles.tabText, selectedItem === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── EXAMINATION TAB ── */}
        {selectedItem === 'Examination' && (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <ProfileCard />

            {/* Exam Dropdown */}
            <View style={styles.dropCard}>
              <View style={styles.dropCardHeader}>
                <View style={styles.dropCardIcon}>
                  <Icon name="school" size={sp(16)} color={C.primaryLight} />
                </View>
                <Text style={styles.dropCardTitle}>Select Examination</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropPlaceholder}
                selectedTextStyle={styles.dropSelected}
                inputSearchStyle={styles.dropSearch}
                iconStyle={styles.dropIcon}
                data={examDropData}
                search
                maxHeight={280}
                labelField="label"
                valueField="value"
                placeholder="Choose an examination..."
                searchPlaceholder="Search exam..."
                value={selectedExam}
                onChange={item => setSelectedExam(item.value)}
                renderLeftIcon={() => (
                  <Icon name="event-note" size={sp(18)} color={C.primaryLight} style={{ marginRight: sp(8) }} />
                )}
                renderItem={item => {
                  const isSelected = item.value === selectedExam;
                  return (
                    <View style={[styles.dropItem, isSelected && styles.dropItemSelected]}>
                      <Text style={[styles.dropItemText, isSelected && styles.dropItemTextSelected]}>
                        {item.label}
                      </Text>
                      {isSelected && <Icon name="check" size={sp(16)} color="#fff" />}
                    </View>
                  );
                }}
              />
            </View>

            {/* Results Card */}
            <View style={styles.resultsCard}>
              <View style={styles.resultsHeader}>
                <View style={styles.resultsHeaderIcon}>
                  <Icon name="assignment" size={sp(17)} color={C.primaryLight} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultsTitle}>Progress Report</Text>
                  {examName ? (
                    <Text style={styles.resultsSubtitle}>{examName} · {acaYear}</Text>
                  ) : null}
                </View>
              </View>
              <Divider style={styles.divider} />

              {deduplicatedReport.length > 0 ? (
                <>
                  <View style={styles.tableWrap}>
                    {/* Header Row */}
                    <View style={[styles.tableRow, styles.tableHeaderRow]}>
                      <Text style={[styles.tableCell, styles.subjectCol, styles.tableHeaderCell]}>Subject</Text>
                      <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Max</Text>
                      <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Scored</Text>
                      <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Result</Text>
                      <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Grade</Text>
                    </View>
                    {deduplicatedReport.map((item, index) => (
                      <View
                        key={index}
                        style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? C.stripe1 : C.stripe2 }]}
                      >
                        <Text style={[styles.tableCell, styles.subjectCol]} numberOfLines={2}>
                          {item.sub_name}
                        </Text>
                        <Text style={[styles.tableCell, styles.dataCol]}>100</Text>
                        <Text style={[styles.tableCell, styles.dataCol]}>{item.total_mark}</Text>
                        <Text style={[
                          styles.tableCell,
                          styles.dataCol,
                          { color: item.result === 'Pass' ? C.pass : C.fail, fontFamily: fonts.ROBOTO_BOLD }
                        ]}>
                          {item.result}
                        </Text>
                        <Text style={[styles.tableCell, styles.dataCol, { color: C.accent, fontFamily: fonts.ROBOTO_BOLD }]}>
                          {item.grade}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Bar Chart */}
                  <View style={styles.chartSection}>
                    <View style={styles.chartHeaderRow}>
                      <View style={styles.dropCardIcon}>
                        <Icon name="bar-chart" size={sp(16)} color={C.primaryLight} />
                      </View>
                      <Text style={styles.chartTitle}>Marks Overview</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <BarChart
                        data={barData}
                        spacing={sp(20)}
                        barWidth={sp(28)}
                        maxValue={100}
                        stepValue={20}
                        showGradient
                        frontColor={C.barColor}
                        gradientColor="#CE93D8"
                        width={Math.max(barData.length * sp(52), width - sp(80))}
                        height={sp(180)}
                        barBorderRadius={sp(4)}
                        yAxisTextStyle={{ color: C.textMuted, fontSize: sp(11) }}
                        xAxisLabelTextStyle={{ color: C.textSecondary, fontSize: sp(10) }}
                        rulesColor={C.border}
                        noOfSections={5}
                      />
                    </ScrollView>
                  </View>
                </>
              ) : (
                <EmptyState message="Please select an examination to view the report." />
              )}
            </View>

            <View style={{ height: sp(20) }} />
          </ScrollView>
        )}

        {/* ── DAILY TEST TAB ── */}
        {selectedItem === 'Daily Test' && (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <ProfileCard />

            {/* Test Dropdown */}
            <View style={styles.dropCard}>
              <View style={styles.dropCardHeader}>
                <View style={styles.dropCardIcon}>
                  <Icon name="quiz" size={sp(16)} color={C.primaryLight} />
                </View>
                <Text style={styles.dropCardTitle}>Select Daily Test</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropPlaceholder}
                selectedTextStyle={styles.dropSelected}
                inputSearchStyle={styles.dropSearch}
                iconStyle={styles.dropIcon}
                data={testDropData}
                search
                maxHeight={280}
                labelField="label"
                valueField="value"
                placeholder="Choose a test..."
                searchPlaceholder="Search test..."
                value={selectedTest}
                onChange={item => {
                  setSelectedTest(item.value);
                  setTestName(item.label);
                  // Reset to today when switching tests
                  setSelectedDate(formatDate(new Date()));
                }}
                renderLeftIcon={() => (
                  <Icon name="edit-note" size={sp(18)} color={C.primaryLight} style={{ marginRight: sp(8) }} />
                )}
                renderItem={item => {
                  const isSelected = item.value === selectedTest;
                  return (
                    <View style={[styles.dropItem, isSelected && styles.dropItemSelected]}>
                      <Text style={[styles.dropItemText, isSelected && styles.dropItemTextSelected]}>
                        {item.label}
                      </Text>
                      {isSelected && <Icon name="check" size={sp(16)} color="#fff" />}
                    </View>
                  );
                }}
              />
            </View>

            {/* ── DATE FILTER STRIP ── */}
            <DateFilterStrip
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              availableDates={availableDatesForTest}
            />

            {/* Test Results Card */}
            <View style={styles.resultsCard}>
              <View style={styles.resultsHeader}>
                <View style={styles.resultsHeaderIcon}>
                  <Icon name="grading" size={sp(17)} color={C.primaryLight} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultsTitle}>Test Report</Text>
                  {testName ? (
                    <Text style={styles.resultsSubtitle}>
                      {testName} · {formatDisplayDate(selectedDate)}
                    </Text>
                  ) : null}
                </View>
              </View>
              <Divider style={styles.divider} />

              {!selectedTest ? (
                <EmptyState message="Please select a test to view results." />
              ) : filteredTestReport.length > 0 ? (
                <View style={styles.tableWrap}>
                  {/* Header */}
                  <View style={[styles.tableRow, styles.tableHeaderRow]}>
                    <Text style={[styles.tableCell, styles.subjectCol, styles.tableHeaderCell]}>Subject</Text>
                    <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Max Marks</Text>
                    <Text style={[styles.tableCell, styles.dataCol, styles.tableHeaderCell]}>Scored</Text>
                  </View>
                  {filteredTestReport.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? C.stripe1 : C.stripe2 }]}
                    >
                      <Text style={[styles.tableCell, styles.subjectCol]} numberOfLines={2}>
                        {item.sub_name}
                      </Text>
                      <Text style={[styles.tableCell, styles.dataCol]}>{item.maximum_mark}</Text>
                      <Text style={[styles.tableCell, styles.dataCol, { color: C.accent, fontFamily: fonts.ROBOTO_BOLD }]}>
                        {item.total_mark}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.noDataForDate}>
                  <View style={emptyStyles.iconCircle}>
                    <Icon name="event-busy" size={sp(32)} color={C.textMuted} />
                  </View>
                  <Text style={emptyStyles.title}>No Results for This Date</Text>
                  <Text style={emptyStyles.note}>
                    No test data found for {formatDisplayDate(selectedDate)}.{'\n'}
                    {availableDatesForTest.length > 0
                      ? 'Try selecting a highlighted date above.'
                      : 'Select a different date or test.'}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ height: sp(20) }} />
          </ScrollView>
        )}

      </View>
    </SafeAreaView>
  );
};

export default ProgressReportScreen;

// ─── Date Filter Styles ───────────────────────────────────────────────────────
const dateStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    marginBottom: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sp(12),
  },
  iconBox: {
    width: sp(32),
    height: sp(32),
    borderRadius: sp(8),
    backgroundColor: C.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sp(10),
  },
  headerLabel: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
    flex: 1,
  },
  selectedLabel: {
    fontSize: sp(11),
    color: C.textMuted,
    fontFamily: fonts.FONT_REGULAR,
  },
  strip: {
    paddingRight: sp(8),
    gap: sp(8),
    flexDirection: 'row',
  },
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sp(12),
    paddingVertical: sp(8),
    borderRadius: sp(12),
    backgroundColor: C.background,
    borderWidth: 1,
    borderColor: C.border,
    minWidth: sp(54),
  },
  chipActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
    shadowColor: C.primary,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  chipHasData: {
    borderColor: C.accent,
    borderWidth: 1.5,
  },
  chipDay: {
    fontSize: sp(10),
    color: C.textSecondary,
    fontFamily: fonts.FONT_MEDIUM,
    marginBottom: sp(2),
  },
  chipDayActive: {
    color: '#fff',
  },
  chipDate: {
    fontSize: sp(15),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
  chipDateActive: {
    color: '#fff',
  },
  dot: {
    width: sp(5),
    height: sp(5),
    borderRadius: sp(3),
    backgroundColor: C.accent,
    marginTop: sp(3),
  },
  dotActive: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});

// ─── Empty State Styles ───────────────────────────────────────────────────────
const emptyStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: sp(36),
  },
  iconCircle: {
    width: sp(72),
    height: sp(72),
    borderRadius: sp(36),
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sp(14),
  },
  title: {
    fontSize: sp(16),
    color: '#5D4E6D',
    fontFamily: fonts.ROBOTO_BOLD,
    marginBottom: sp(6),
  },
  note: {
    fontSize: sp(13),
    color: '#E53935',
    fontFamily: fonts.FONT_MEDIUM,
    textAlign: 'center',
    paddingHorizontal: sp(20),
  },
});

// ─── Main Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.primary,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    paddingHorizontal: sp(16),
    paddingVertical: sp(14),
  },
  headerTitle: {
    color: '#fff',
    fontSize: sp(18),
    marginLeft: sp(55),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: sp(16),
    paddingBottom: sp(12),
    gap: sp(10),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sp(10),
    borderRadius: sp(10),
    backgroundColor: '#3f313141',
  },
  tabActive: {
    backgroundColor: "#7c43bd",
    shadowColor: C.accent,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: sp(13),
    color: 'rgba(255,255,255,0.65)',
    fontFamily: fonts.FONT_MEDIUM,
  },
  tabTextActive: {
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
  },
  scroll: { flex: 1, backgroundColor: C.background },
  scrollContent: { padding: sp(14), paddingBottom: sp(30) },
  profileCard: {
    backgroundColor: C.primary,
    borderRadius: sp(20),
    paddingVertical: sp(20),
    paddingHorizontal: sp(16),
    alignItems: 'center',
    marginBottom: sp(14),
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  studentName: {
    color: '#fff',
    fontSize: sp(17),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.4,
    textAlign: 'center',
    marginBottom: sp(7),
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: sp(6),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: sp(20),
    paddingHorizontal: sp(10),
    paddingVertical: sp(4),
    gap: sp(4),
  },
  badgeText: {
    color: '#ffffff',
    fontSize: sp(12),
    fontFamily: fonts.FONT_MEDIUM,
  },
  badgeDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dropCard: {
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    marginBottom: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  dropCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sp(10),
  },
  dropCardIcon: {
    width: sp(32),
    height: sp(32),
    borderRadius: sp(8),
    backgroundColor: C.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sp(10),
  },
  dropCardTitle: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
  dropdown: {
    height: sp(50),
    backgroundColor: C.background,
    borderRadius: sp(10),
    paddingHorizontal: sp(12),
    borderWidth: 1,
    borderColor: C.border,
  },
  dropPlaceholder: {
    fontSize: sp(14),
    color: C.textMuted,
    fontFamily: fonts.FONT_REGULAR,
  },
  dropSelected: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_MEDIUM,
  },
  dropSearch: {
    height: sp(40),
    fontSize: sp(14),
    color: C.textPrimary,
  },
  dropIcon: { width: sp(20), height: sp(20) },
  dropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sp(13),
    paddingHorizontal: sp(16),
  },
  dropItemSelected: { backgroundColor: C.accent },
  dropItemText: {
    flex: 1,
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_REGULAR,
  },
  dropItemTextSelected: { color: '#fff', fontFamily: fonts.FONT_MEDIUM },
  resultsCard: {
    backgroundColor: C.surface,
    borderRadius: sp(16),
    padding: sp(14),
    shadowColor: C.primary,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sp(10),
  },
  resultsHeaderIcon: {
    width: sp(36),
    height: sp(36),
    borderRadius: sp(10),
    backgroundColor: C.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sp(10),
  },
  resultsTitle: {
    fontSize: sp(15),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
  resultsSubtitle: {
    fontSize: sp(12),
    color: C.textMuted,
    fontFamily: fonts.FONT_REGULAR,
    marginTop: sp(2),
  },
  divider: {
    backgroundColor: C.border,
    height: 1,
    marginBottom: sp(12),
  },
  tableWrap: {
    borderRadius: sp(10),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
  },
  tableHeaderRow: {
    backgroundColor: C.primary,
  },
  tableHeaderCell: {
    color: '#fff',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: sp(10),
    paddingHorizontal: sp(10),
  },
  tableCell: {
    fontSize: sp(13),
    color: C.textPrimary,
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  subjectCol: { flex: 2, textAlign: 'left' },
  dataCol:    { flex: 1, textAlign: 'center' },
  noDataForDate: {
    alignItems: 'center',
    paddingVertical: sp(30),
  },
  chartSection: {
    marginTop: sp(16),
  },
  chartHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sp(10),
  },
  chartTitle: {
    fontSize: sp(14),
    color: C.textPrimary,
    fontFamily: fonts.FONT_BOLD,
  },
});