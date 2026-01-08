

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image, 
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { BarChart } from "react-native-gifted-charts/dist/BarChart";
import { fonts } from "../root/config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
// import { BarChart } from "react-native-gifted-charts";

  // const DropdownSection = [
  //  'Mid Term','Final Exam','Unit Test'
  // ]
const item = ['Examination', 'Daily Test',];
  interface ProgressReportScreenProps {
  route:any
  navigation: any
}
const ProgressReportScreen: React.FC<ProgressReportScreenProps> = ({route , navigation}) => {
  const { orgid, studentId, mobile } = route?.params || {};
    const [loading, setLoading] = useState(true);
      const [studentData, setStudentData] = useState({});
  const [selectedItem, setSelectedItem] = useState('Examination');
  //  const [examList, setExamList] = useState([]);
  // const [selectedExam, setSelectedExam] = useState("");

   const [selectedExam, setSelectedExam] = useState(null);
  const [examList, setShowExam] = useState([]);
//  const [searchText, setSearchText] = useState("");
 const [selectedTest, setSelectedTest] = useState(null);
  const [testList, setTestList] = useState([]);
  const [testReport, setTestReport] = useState([]);
  const [testChartData, setTestChartData] = useState([]);
  const [testName, setTestName] = useState("");


  const [progressReport, setProgressReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [examName, setExamName] = useState("");
  const [acaYear, setAcaYear] = useState("");

  const data = examList.map((exam) => ({
    label: exam.exam_name,
    value: exam.examId,
  }));

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (response.data.isSuccess && response.data.studDetails) {
        const data = response.data.studDetails[0];
        setStudentData({
          stud_name: data.stud_name,
          std_name: data.std_name,
          section: data.section,
          rollNo: data.rollNo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

   const getExaminationsData = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`
      );
  //  console.log("response.data.examList==>",response.data.examList)
      if (response.data.isSuccess && response.data.examList) {
        setShowExam(response.data.examList);
      }
    } catch (error) {
      console.log(error);
    }
  };

      const getTestdata = async () => {
        try {
            const url = `https://www.vtsmile.in/app/api/faculties/staff_test_list_api?orgId=${orgid}`;
            const res = await axios.post(url);

            // console.log('----------.', res.data.today_list)
            if (res.data.isSuccess && res.data.today_list) {
                setTestList(res.data.today_list);
            } else {
                setTestList([]);
            }
        } catch (err) {
            console.log(err)
        }
    }

 const getProgressReportData = async (examId) => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
      );
// console.log("Progress Report Response:", response.data);
      if (response.data.isSuccess && response.data.student_progress_report) {
        setProgressReport(response.data.student_progress_report);
        setChartData(
          response.data.student_progress_report.map((item) =>
            Number(item.total_mark)
          )
        );
        setExamName(response.data.examName);
        setAcaYear(response.data.acadamicYear);
      } else {
        setProgressReport([]);
        setChartData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };


   const getDailyTestReportData = async (testId) => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/student_test_mark_api?orgId=${orgid}&testId=${testId}&studId=${studentId}`
      );

      //  console.log("response.data.test_mark==>", response.data);
      if (response.data.isSuccess && response.data.test_mark) {
        setTestReport(response.data.test_mark);
        setTestChartData(
          response.data.test_mark.map((item) =>
            Number(item.total_mark)
          )
        );
      } else {
        setTestReport([]);
        setTestChartData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    const fetchData = async () => {
      await getStudentData();
      await getExaminationsData();
      await getTestdata();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      getProgressReportData(selectedExam);
    }
  }, [selectedExam]);

    useEffect(() => {
    if (selectedTest) {
      getDailyTestReportData(selectedTest);
    }
  }, [selectedTest]);


    if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#784EB1" />
          <Text>Loading...</Text>
      </View>
    );
  }
const todayDate = new Date().toISOString().split('T')[0];

const todayTestReport = testReport.filter(item => {
  if (!item.test_date || !item.test_Id) return false;

  const itemDate = item.test_date.split(' ')[0];

  return (
    itemDate === todayDate &&
    String(item.test_Id) === String(selectedTest)
  );
});


const getLatestSubjectMarks = (data) => {
  const map = new Map();

  data.forEach(item => {
    const key = item.sub_name;

    // keep latest entry (based on test_mark_Id or test_date)
    if (
      !map.has(key) ||
      Number(item.test_mark_Id) > Number(map.get(key).test_mark_Id)
    ) {
      map.set(key, item);
    }
  });

  return Array.from(map.values());
};

const removeExamDuplicateBySubject = (data) => {
  const map = new Map();

  data.forEach(item => {
    // subject_id is the unique key
    map.set(item.subject_id, item);
  });

  // keeps LAST occurrence automatically
  return Array.from(map.values());
};

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#7c43bd'}}>
      <View  style={styles.container}>

      {/* Header */}
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
         <Icon name="arrow-back" size={24} color="#fff" />
         </TouchableOpacity>
        <Text style={styles.progressText}>Progress Report</Text>
       
      </View>
      <View>
               <View style={styles.weekdaysRow}>
                  {item.map(index => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayBtn,
                        selectedItem === index && styles.dayBtnActive,
                      ]}
                      onPress={() => setSelectedItem(index)}
                    >

                      <Text
                        style={[
                          styles.dayText,
                          selectedItem === index && styles.dayTextActive,
                        ]}
                      >
                        {index}
                      </Text>
                    </TouchableOpacity>
                  ))}

                </View>
  {selectedItem === 'Examination' && (
    <>
  
       <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
    
    <View style={styles.profileCard}>
 
          <Text style={styles.studentName}>{studentData.stud_name}</Text>
          <Text style={styles.classText}>  Class: {studentData.std_name} {studentData.section} | Roll No:{" "}
          {studentData.rollNo}</Text>
        </View>
      {/* Dropdown Examination Select */}
      <View style={styles.dropdownBox}>
      
    
    
        <View>
          {/* <TouchableOpacity style={styles.dropdown}
            onPress={() => setShowExam(!examList)}>
             <MaterialIcons name="format-list-bulleted-add" size={25} style={{color:'#fff',top:25}} />
            <Text style={styles.dropdownText1}>     {selectedExam || 'selectedExam'}</Text>
            <MaterialIcons
              name={examList ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              style={{ color: '#f7f7f7ff', marginLeft: 'auto', bottom: 18 }}
            />
          </TouchableOpacity> */}

              <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Examination Here"
        searchPlaceholder="Search..."
        value={selectedExam}
        onChange={(item) => {
          setSelectedExam(item.value);
        }}
      />
{/* 
          {showExam && (
            <View style={styles.dropdownList}>
              <View style={{borderBottomWidth:1,width:"95%",marginLeft:8,bottom:30}}>
                <MaterialIcons name="search" size={25} style={{color:'#000000ff',top:38}} />
              <TextInput 
               style={styles.input}
               placeholder='Select Exam' 
               placeholderTextColor={'black'}
                value={searchText}
                  onChangeText={setSearchText} 
               >
              </TextInput>
              </View>

              {showExam.length > 0 ? (
              showExam.map((exam) => (
                <TouchableOpacity
                  key={exam.id}
                  onPress={() => {
                    setSelectedExam(exam);
                    setShowExam(false);
                    setSearchText("");
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{exam.name}</Text>
                </TouchableOpacity>
              ))
            ) :(
               <Text
                  style={{
                    padding: 10,
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  No matches found
                </Text>
            )}
            </View>
          )} */}
        </View>

      </View>

      {/* Progress Report / Empty State */}
      <View style={styles.cardArea}>
        <View style={styles.cardHeader}>
          <Icon name="person" size={24} color="#6c63ff" style={{top:10,right:5}}/>
          <Text style={styles.cardHeaderText}>Progress Report - {examName} ({acaYear})</Text>
        </View>
      <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />

         {progressReport.length > 0 ? (
            <View style={styles.tableContainer}>
              <View style={{flexDirection:'row',padding:1,justifyContent:'space-between',}}>
               <Text style={{flex:2, fontFamily: fonts.ROBOTO_BOLD}}>Subject</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:10,left:5}}>Max</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,}}>Scored</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:5}}>Result</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:5,left:5}}>Grade</Text>

              </View>
              
              {/* {progressReport.map((item, index) => ( */}
              {removeExamDuplicateBySubject(progressReport).map((item, index) => (

                <View
              key={index}
              style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
              ]}
            >
             
              <Text style={styles.cell}>{item.sub_name}</Text>
              <Text style={styles.cellCenter}>100</Text>
              <Text style={styles.cellCenter}>{item.total_mark}</Text>
              <Text style={styles.cellCenter}>{item.result}</Text>
              <Text style={styles.cellCenter}>{item.grade}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noData}>
         <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
          <Text style={{fontFamily:fonts.ROBOTO_BOLD}}>Sorry!, No data found!</Text>
          <Text style={{ color: "red" }}>(Note: Please Select Examination)</Text>
        </View>
      
        )}

         {chartData.length > 0 && (
          <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
       
        <BarChart
     
          data={removeExamDuplicateBySubject(progressReport).map((item) => ({
            value: Number(item.total_mark),
            label: item.sub_name,
            frontColor: "#784EB1",
            
          }))}
          spacing={30}
          barWidth={30}
          maxValue={100}
          stepValue={20}
          showGradient={true}
          frontColor="#784EB1"
          width={Dimensions.get("window").width - 130}
          height={190}
          // style={{ marginVertical: 16, borderRadius: 8, marginTop: 10,top:10  }}
        />
  </View>
      
      )}
     
      
      
      </View>
      </ScrollView>
  </>
  )}

  {selectedItem === 'Daily Test' && (
    <>
       {/* <ScrollView contentContainerStyle={{ paddingBottom: 200 }}> */}
    
    <View style={styles.profileCard}>
 
          <Text style={styles.studentName}>{studentData.stud_name}</Text>
          <Text style={styles.classText}>  Class: {studentData.std_name} {studentData.section} | Roll No:{" "}
          {studentData.rollNo}</Text>
        </View>
      {/* Dropdown Examination Select */}
      <View style={styles.dropdownBox}>
      
    
    
        <View>
         

              <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={testList.length > 0 ? testList.map((t) => ({
          label: t.test_name,
          value: t.test_Id
        })) : []}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Test Here"
        searchPlaceholder="Search..."
        value={selectedTest}
        onChange={(item) => {
          setSelectedTest(item.value);
          setTestName(item.label);
          //  setTestReport([]);
        }}
      />

        </View>

      </View>

      {/* Progress Report / Empty State */}
      <View style={styles.cardArea1}>

        <View style={styles.cardHeader}>
           

          <Icon name="person" size={24} color="#6c63ff" style={{top:10,right:5}}/>
         <Text style={styles.cardHeaderText}>
           Test Report- {testName} -
</Text>
{todayTestReport.length > 0 && (
  <Text style={styles.testdate}>{todayDate}</Text>
)}

          {/* <Text style={styles.cardHeaderText}>Test Report - {testName}-({item.test_date})</Text> */}
        </View>
      <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />
       <>
       <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
         {todayTestReport.length > 0 ? (

            <View style={styles.tableContainer}>
              <View style={{flexDirection:'row',paddingBottom:10,justifyContent:'space-between',}}>
               <Text style={{flex:2, fontFamily: fonts.ROBOTO_BOLD,left:10,top:5}}>Subject</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:-25,top:5}}>Max</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:-30,top:5}}>Total Mark</Text>
               {/* <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,left:5}}>Result</Text>
               <Text style={{flex:1, fontFamily: fonts.ROBOTO_BOLD,marginLeft:5,left:5}}>Grade</Text> */}

              </View>
             {/* {todayTestReport.map((item, index) => ( */}
{getLatestSubjectMarks(todayTestReport).map((item, index) => (

                <View
              key={index}
              style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
              ]}
            >
             
              <Text style={styles.cell1}>{item.sub_name}</Text>
               <Text style={styles.cellCenter1}>{item.maximum_mark}</Text>
              <Text style={styles.cellCenter2}>{item.total_mark}</Text>
              {/* <Text style={styles.cellCenter}>{item.result}</Text>
              <Text style={styles.cellCenter}>{item.grade}</Text> */}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noData}>
         <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
          <Text style={{fontFamily:fonts.ROBOTO_BOLD}}>Sorry!, No data found!</Text>
          <Text style={{ color: "red" }}>(Note: Please Select Test)</Text>
        </View>
      
        )}
{/* 
         {testChartData.length > 0 && (
          <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
       
        <BarChart
          data={testReport.map((item) => ({
            value: Number(item.total_mark),
            label: item.sub_name,
            frontColor: "#784EB1",
            
          }))}
          spacing={30}
          barWidth={30}
          maxValue={100}
          stepValue={20}
          showGradient={true}
          frontColor="#784EB1"
          width={Dimensions.get("window").width - 130}
          height={190}
          // style={{ marginVertical: 16, borderRadius: 8, marginTop: 10,top:10  }}
        />
  </View>
      
      )}
      */}
         </ScrollView>
      </>
      </View>
   {/* </ScrollView> */}
    </>
  )}
      </View>
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#ffffffff', width: "100%",  },
  headerBox: {
   flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between',
  },
  progressText: {
   color: '#fff', fontSize: 20,  fontFamily: fonts.FONT_BOLD,right:95 },
  profileCard: {
    backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
    paddingVertical: 14,
  },
    starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 4 },
  tableContainer: { marginTop: 20 ,borderWidth: 1, borderColor: '#ddd', borderRadius: 8,},
  examTitle: { fontSize: 16, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 },
  row: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 5 },
  cell: { flex: 2, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD},
  cell1: { flex: 2, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,left:10},
  testdate: {fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_MEDIUM,left:10,top:12,width:"100%"},
  cellCenter: { flex: 1, fontSize: 14, textAlign: "center", color: "#000" ,fontFamily:fonts.ROBOTO_BOLD},
  cellCenter1: { flex: 1, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,right:12},
    cellCenter2: { flex: 1, fontSize: 14, color: "#000" ,fontFamily:fonts.ROBOTO_BOLD,},
  noData: { alignItems: "center", marginTop: 50 },


  studentName: {
    color: '#ffffff',
    fontSize: 16,
   fontFamily: fonts.FONT_BOLD,
    marginTop: 7,
    letterSpacing: 0.5,textAlign: 'center' 
  },
  classText: {
     fontFamily: fonts.ROBOTO_BOLD,
     color: '#ffffffff',
    fontSize: 13,
    marginTop: 4,textAlign: 'center',
  },
  dropdownBox: {
    paddingHorizontal: 16,
    marginBottom: 14,
    marginTop: 4,
  },
  dropdownButton: {
    width: '100%',
    backgroundColor: '#fde2fe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0bfff',
  },
    input: {
     marginLeft:25,top:5,
    fontSize: 16,
    color: '#222'
  },
  dropdownButtonText: {
    color: '#6c63ff',
    fontSize: 15,
    fontWeight: '600',
  },

   weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginTop: 30, marginRight: 40, right: 10, bottom: 10

  },
  dayBtn: {
    width: "55%", height: hp(5),
    marginLeft: 5,
    backgroundColor: '#bdc3c5ff',
    borderRadius: 5,

  },
  dayBtnActive: { backgroundColor: '#7c43bd' },
  dayText: { fontSize: 16, color: '#ffffffff', top: 5, textAlign: 'center', fontFamily: fonts.FONT_REGULAR },
  dayTextActive: { fontWeight: 'bold' },
  cardArea: {
    marginHorizontal: 14,
    backgroundColor: '#f3f2ff',
    borderRadius: 10,
    padding: 18,
    marginTop: 5,
    height: hp(71),
    borderWidth: 1,
    borderColor: '#2626cdff',
  },
   cardArea1: {
    marginHorizontal: 14,
    backgroundColor: '#f3f2ff',
    borderRadius: 10,
    padding: 18,
    marginTop: 5,
    height: hp(55),
    borderWidth: 1,
    borderColor: '#2626cdff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    bottom:10,right:5,
  },
  cardHeaderText: {
    fontFamily: fonts.ROBOTO_BOLD,
    fontSize: 16,
    color: '#333',
    marginLeft: 3,
    top:12
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  emptyImage: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    color: '#6c63ff',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  emptyNote: {
    fontSize: 13,
    color: '#e25151',
    fontWeight: '500',
  },

  dropdownList: {
    backgroundColor: '#ffffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    paddingVertical: 5,
    elevation: 3, // adds shadow on Android
    zIndex: 1
  },
  dropdownItem: {
    bottom:15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  // dropdown: {
  //   backgroundColor: '#7c43bd',
  //   borderRadius: 10,
  //   padding: 8,
  //   height: 45,
  //   justifyContent: 'center',
  // },
  dropdownText: {
    fontSize: 15,
    color: '#000000ff',

  },
   dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdownText1: {
    fontSize: 15,
    color: '#fefefeff', left:20,top:3

  },
});

export default ProgressReportScreen;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// // import DropDownPicker from 'react-native-dropdown-picker';
// // import { BarChart } from 'react-native-chart-kit';

// const ProgressReportScreen = ({ orgid, studentId, mobile }) => {
//   const [studentData, setStudentData] = useState({});
//   const [examList, setExamList] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [progressReport, setProgressReport] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudentData();
//     fetchExams();
//   }, []);

//   useEffect(() => {
//     if (selectedExam) {
//       fetchProgressReport(selectedExam);
//       fetchChartData(selectedExam);
//     } else {
//       setProgressReport([]);
//       setChartData([]);
//     }
//   }, [selectedExam]);

//   const fetchStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem('mobile');
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );
//       if (response.data.isSuccess && response.data.studDetails?.length) {
//         setStudentData(response.data.studDetails[0]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExams = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`
//       );
//       if (response.data.isSuccess && response.data.examList?.length) {
//         const dropdownItems = response.data.examList.map(exam => ({
//           label: exam.exam_name,
//           value: exam.examId,
//         }));
//         setExamList(dropdownItems);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const fetchProgressReport = async examId => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
//       );
//       if (response.data.isSuccess && response.data.student_progress_report) {
//         setProgressReport(response.data.student_progress_report);
//       } else {
//         setProgressReport([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchChartData = async examId => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
//       );
//       if (response.data.isSuccess && response.data.student_progress_report) {
//         setChartData(response.data.student_progress_report);
//       } else {
//         setChartData([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const screenWidth = Dimensions.get('window').width;

//   const chartConfig = {
//     backgroundGradientFrom: '#fff',
//     backgroundGradientTo: '#fff',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(120, 82, 177, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: '6',
//       strokeWidth: '2',
//       stroke: '#ffa726',
//     },
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#784eb1" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Student Info */}
//       <View style={styles.studentInfo}>
//         <Text style={styles.studentName}>{studentData.stud_name?.toUpperCase()}</Text>
//         <Text style={styles.studentClass}>
//           Class: {studentData.std_name} {studentData.section} | Roll No: {studentData.rollNo}
//         </Text>
//       </View>

//       {/* Exam Dropdown */}
//       {/* <DropDownPicker
//         open={!!selectedExam}
//         value={selectedExam}
//         items={examList}
//         setOpen={() => {}}
//         setValue={setSelectedExam}
//         setItems={setExamList}
//         placeholder="Select Examination"
//         containerStyle={{ marginVertical: 10 }}
//         zIndex={1000}
//       /> */}

//       {/* Progress Report Table */}
//       {progressReport.length ? (
//         <View style={styles.tableContainer}>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.cell, { flex: 2 }]}>Subject</Text>
//             <Text style={styles.cell}>Max</Text>
//             <Text style={styles.cell}>Scored</Text>
//             <Text style={styles.cell}>Result</Text>
//             <Text style={styles.cell}>Grade</Text>
//           </View>
//           {progressReport.map((item, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.tableRow,
//                 { backgroundColor: index % 2 === 0 ? '#efe7fd' : '#fff' },
//               ]}
//             >
//               <Text style={[styles.cell, { flex: 2 }]}>{item.sub_name}</Text>
//               <Text style={styles.cell}>100</Text>
//               <Text style={styles.cell}>{item.total_mark}</Text>
//               <Text style={styles.cell}>{item.result}</Text>
//               <Text style={styles.cell}>{item.grade}</Text>
//             </View>
//           ))}
//         </View>
//       ) : (
//         <View style={styles.noData}>
//           {/* <Image
//             source={require('../assets/images/smile-No-Data-Found-BG.png')}
//             style={{ width: 100, height: 100 }}
//           /> */}
//           <Text>Sorry!, No data found!.</Text>
//           <Text style={{ color: 'red' }}>(Note: Please Select Examination)</Text>
//         </View>
//       )}

//       {/* Bar Chart */}
//       {chartData.length ? (
//         <></>
//         // <BarChart
//         //   data={{
//         //     labels: chartData.map(item => item.sub_name),
//         //     datasets: [
//         //       {
//         //         data: chartData.map(item => parseFloat(item.total_mark)),
//         //       },
//         //     ],
//         //   }}
//         //   width={screenWidth - 20}
//         //   height={220}
//         //   chartConfig={chartConfig}
//         //   verticalLabelRotation={30}
//         //   fromZero
//         //   style={{ marginVertical: 10, borderRadius: 16 }}
//         // />
//       ) : null}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: '#fff' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   studentInfo: { marginBottom: 10 },
//   studentName: { fontSize: 18, fontWeight: 'bold' },
//   studentClass: { fontSize: 14, marginTop: 5 },
//   tableContainer: { marginVertical: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
//   tableHeader: { flexDirection: 'row', backgroundColor: '#784eb1', padding: 5 },
//   tableRow: { flexDirection: 'row', padding: 5 },
//   cell: { flex: 1, textAlign: 'center', fontSize: 13 },
//   noData: { justifyContent: 'center', alignItems: 'center', marginTop: 20 },
// });

// export default ProgressReportScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   Dimensions,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// // import { Picker } from "@react-native-picker/picker";
// import { BarChart } from "react-native-gifted-charts";

// interface ProgressReportScreenProps {
//   route:any
// }

// const ProgressReportScreen: React.FC<ProgressReportScreenProps> = ({route}) => {
//   const { orgid, studentId } = route?.params || {};
//   const [loading, setLoading] = useState(true);

//   // STUDENT DATA
//   const [studentData, setStudentData] = useState({});
  
//   // EXAM LIST
//   const [examList, setExamList] = useState([]);
//   const [selectedExam, setSelectedExam] = useState("");

//   // PROGRESS REPORT
//   const [progressReport, setProgressReport] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [examName, setExamName] = useState("");
//   const [acaYear, setAcaYear] = useState("");

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );

//       if (response.data.isSuccess && response.data.studDetails) {
//         const data = response.data.studDetails[0];
//         setStudentData({
//           stud_name: data.stud_name,
//           std_name: data.std_name,
//           section: data.section,
//           rollNo: data.rollNo,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getExaminationsData = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`
//       );

//       if (response.data.isSuccess && response.data.examList) {
//         setExamList(response.data.examList);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getProgressReportData = async (examId) => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/all_progress_report_api?orgId=${orgid}&studId=${studentId}&examId=${examId}`
//       );
// console.log("Progress Report Response:", response.data);
//       if (response.data.isSuccess && response.data.student_progress_report) {
//         setProgressReport(response.data.student_progress_report);
//         setChartData(
//           response.data.student_progress_report.map((item) =>
//             Number(item.total_mark)
//           )
//         );
//         setExamName(response.data.examName);
//         setAcaYear(response.data.acadamicYear);
//       } else {
//         setProgressReport([]);
//         setChartData([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await getStudentData();
//       await getExaminationsData();
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedExam) {
//       getProgressReportData(selectedExam);
//     }
//   }, [selectedExam]);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#784EB1" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* STUDENT INFO */}
//       <View style={styles.studentInfo}>
//         <Text style={styles.studentName}>{studentData.stud_name}</Text>
//         <Text style={styles.studentDetails}>
//           Class: {studentData.std_name} {studentData.section} | Roll No:{" "}
//           {studentData.rollNo}
//         </Text>
//       </View>

//       {/* EXAM DROPDOWN */}
//       <View style={styles.pickerContainer}>
//         {/* <Picker
//           selectedValue={selectedExam}
//           onValueChange={(itemValue) => setSelectedExam(itemValue)}
//         >
//           <Picker.Item label="Select Examination Here" value="" />
//           {examList.map((exam) => (
//             <Picker.Item
//               key={exam.examId}
//               label={exam.exam_name}
//               value={exam.examId}
//             />
//           ))}
//         </Picker> */}
//       </View>

//       {/* PROGRESS REPORT TABLE */}
//       {progressReport.length > 0 ? (
//         <View style={styles.tableContainer}>
//           <Text style={styles.examTitle}>
//             Progress Report - {examName} ({acaYear})
//           </Text>
//           {progressReport.map((item, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.row,
//                 { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
//               ]}
//             >
//               <Text style={styles.cell}>{item.sub_name}</Text>
//               <Text style={styles.cellCenter}>100</Text>
//               <Text style={styles.cellCenter}>{item.total_mark}</Text>
//               <Text style={styles.cellCenter}>{item.result}</Text>
//               <Text style={styles.cellCenter}>{item.grade}</Text>
//             </View>
//           ))}
//         </View>
//       ) : (
//         <View style={styles.noData}>
//           {/* <Image
//             source={require("../assets/images/smile-No-Data-Found-BG.png")}
//             style={{ width: 100, height: 100 }}
//           /> */}
//           <Text>Sorry!, No data found!</Text>
//           <Text style={{ color: "red" }}>(Note: Please Select Examination)</Text>
//         </View>
//       )}

//       {/* BAR CHART */}
//       {chartData.length > 0 && (
       
//         <BarChart
//           data={progressReport.map((item) => ({
//             value: Number(item.total_mark),
//             label: item.sub_name,
//             frontColor: "#784EB1",
//           }))}
//           width={Dimensions.get("window").width - 40}
//           height={220}
//           style={{ marginVertical: 16, borderRadius: 8 }}
//         />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   studentInfo: { marginBottom: 10 },
//   studentName: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   studentDetails: { fontSize: 14, color: "#000" },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   tableContainer: { marginTop: 20 },
//   examTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
//   row: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 5 },
//   cell: { flex: 2, fontSize: 14, color: "#000" },
//   cellCenter: { flex: 1, fontSize: 14, textAlign: "center", color: "#000" },
//   noData: { alignItems: "center", marginTop: 50 },
// });

// export default ProgressReportScreen;

