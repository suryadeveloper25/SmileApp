
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image, TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";
interface ExamScreenScreenProps {
  route: any
  navigation: any
}
const ExamScreen: React.FC<ExamScreenScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};

  const [studentData, setStudentData] = useState({});
  const [examList, setExamList] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examTable, setExamTable] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student profile data
  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem('mobile');
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`)
      if (response.data.isSuccess && response.data.studDetails.length > 0) {
        setStudentData(response.data.studDetails[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch exam list
  const getExams = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/examination_list_api?orgId=${orgid}`);
      if (response.data.isSuccess && response.data.examList) {
        setExamList(response.data.examList.map(ex => ({ label: ex.exam_name, value: ex.examId })));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch exam timetable for selected exam
  const getExamTable = async (examId) => {
    if (!examId) return;
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/examination_timetable_api?orgId=${orgid}&exam_Id=${examId}&studId=${studentId}&mobile_no=${mobile}`
      );
      if (response.data.isSuccess && response.data.examSchedule) {
        setExamTable(response.data.examSchedule);
      } else {
        setExamTable([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getStudentData();
    getExams();
    getExamTable(selectedExam);
    setLoading(false);
  }, [selectedExam]);

  // useEffect(() => {
  //   getExamTable(selectedExam);
  // }, [selectedExam]);

  // const renderExamItem = ({ item, index }) => (
  //   <View style={[styles.tableRow, index % 2 === 0 && { backgroundColor: "#EFE7FD" }]}>
  //     <Text style={styles.tableCell}>{item.sub_name}</Text>
  //     <Text style={styles.tableCell}>{item.exam_session}</Text>
  //     <Text style={styles.tableCell}>{item.exam_date}</Text>
  //   </View>
  // );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#7c43bd',marginBottom:-30}}>
      <View  style={styles.container}>

      {/* Header */}
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.progressText}>Examinations</Text>

      </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:100}}
          // bounces={true}
        >
      <View style={styles.profileCard}>
        <Text style={styles.studentName}>{studentData.stud_name?.toUpperCase()}</Text>
        <Text style={styles.classText}>Class: {studentData.std_name} {studentData.section} | Roll No: {studentData.rollNo}</Text>
      </View>
      {/* Dropdown Examination Select */}
      <View style={styles.dropdownBox}>



        {/* <View>
          <TouchableOpacity style={styles.dropdown}
            onPress={() => setShowExam(!showExam)}>
             <MaterialIcons name="format-list-bulleted-add" size={25} style={{color:'#fff',top:25}} />
            <Text style={styles.dropdownText1}>     {selectedExam || 'selectedExam'}</Text>
            <MaterialIcons
              name={showExam ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              style={{ color: '#f7f7f7ff', marginLeft: 'auto', bottom: 18 }}
            />
          </TouchableOpacity>

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

              {filteredExams.length > 0 ? (
              filteredExams.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedExam(item);
                    setShowExam(false);
                    setSearchText("");
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
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
          )}
        </View> */}

        <View >
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={examList}
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
        </View>

      </View>

      {/* Progress Report / Empty State */}
      <View style={styles.cardArea}>
        <View style={styles.cardHeader}>
          <Icon name="person" size={24} color="#6c63ff" style={{ top: 10, right: 5 }} />
          <Text style={styles.cardHeaderText}>Examination -Time Table</Text>
        </View>
        <Divider style={{ backgroundColor: '#6c63ff', height: 1, marginHorizontal: -18, }} />

        {examTable.length > 0 ? (
          <View style={styles.tableContainer}>

            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', }}>
              <Text style={{ flex: 2, fontFamily: fonts.ROBOTO_BOLD, marginLeft: 5 }}>Subject</Text>
              <Text style={{ flex: 1.6, fontFamily: fonts.ROBOTO_BOLD, }}>Session</Text>
              <Text style={{ flex: 1, fontFamily: fonts.ROBOTO_BOLD, left: 10 }}>Date</Text>

            </View>

            {examTable.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.starsRow, { backgroundColor: index % 2 === 0 ? "#EFE7FD" : "#fff" },
                ]}
              >

                <Text style={styles.cell}>{item.sub_name}</Text>
                <Text style={styles.cellCenter}>{item.exam_session}</Text>
                <Text style={styles.cellCenter1}>{item.exam_date}</Text>

              </View>
            ))}
          </View>
          // <FlatList
          //   data={examTable}
          //   keyExtractor={(item, index) => index.toString()}
          //   renderItem={renderExamItem}
          // />
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={styles.emptyImage} />
            <Text>Sorry! No data found.</Text>
            <Text>(Note: Please Select Examination)</Text>
          </View>
        )}

      </View>
      </ScrollView>
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffffff', width: "100%", },
  headerBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#7c43bd', padding: 16, justifyContent: 'space-between',
  },
  cell: { flex: 2, fontSize: 14, color: "#000", padding: 2, fontFamily: fonts.ROBOTO_BOLD, },
  cellCenter: { flex: 1, fontSize: 14, color: "#000", fontFamily: fonts.ROBOTO_BOLD, },
  cellCenter1: { flex: 1.2, fontSize: 14, color: "#000", fontFamily: fonts.ROBOTO_BOLD, },
  progressText: {
    color: '#fff', fontSize: 20, fontFamily: fonts.FONT_BOLD, right: 95
  },
  profileCard: {
    backgroundColor: '#7c43bd', margin: 12, borderRadius: 18,
    paddingVertical: 14,
  },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 1, padding: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  studentName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
    marginTop: 7,
    letterSpacing: 0.5, textAlign: 'center'
  },
  tableContainer: { marginTop: 20, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, },
  tableTitle: { fontSize: 15, fontWeight: "600", marginBottom: 10 },
  tableRow: { flexDirection: "row", paddingVertical: 10 },
  tableCell: { flex: 1, textAlign: "center", fontSize: 13 },
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
  noDataContainer: { justifyContent: "center", alignItems: "center", padding: 20 },
  classText: {
    color: '#ffffffff',
    fontSize: 13,
    marginTop: 4, textAlign: 'center',
    fontFamily: fonts.ROBOTO_BOLD,
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
    marginLeft: 25, top: 5,
    fontSize: 16,
    color: '#222'
  },
  dropdownButtonText: {
    color: '#6c63ff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardArea: {
    marginHorizontal: 14,
    backgroundColor: '#f3f2ff',
    borderRadius: 10,
    padding: 18,
    marginTop: 5,
    minHeight: 330,
    borderWidth: 1,
    borderColor: '#2626cdff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, bottom: 10
  },
  cardHeaderText: {
    fontFamily: fonts.FONT_BOLD,
    fontSize: 16,
    color: '#333',
    marginLeft: 5, top: 12
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
    bottom: 15,
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
  dropdownText1: {
    fontSize: 15,
    color: '#fefefeff', left: 20, top: 3

  },
});

export default ExamScreen;
