

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import { Calendar, } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Dimensions } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
// const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { fonts } from '../root/config';
import { showMessage } from 'react-native-flash-message';


interface leaveRequestProps {
  route: any;
  navigation: any;
}

const item = ['Leave', 'Permission',];
const data = [
  { label: 'Casual Leave', value: 1 },
  { label: 'Sick Leave', value: 2 },

]
const NewLeaveScreen: React.FC<leaveRequestProps> = ({ route, navigation }) => {

  const { orgid, studentId, mobile } = route?.params || {};
  // const navigation = useNavigation();  
  const [cause, setCause] = useState('');
  const [reasons, setReasons] = useState('');
  const [leaveName, setLeaveName] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState('Leave');
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState<string>("");
  //    const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [homeworkDate, setHomeworkDate] = useState<Date>(new Date());

  const [showToCalendar, setShowToCalendar] = useState(false);
  const [toDate, setToDate] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  const [LeaveId, setLeaveId] = useState<string>("");
  const [isLeaveFocus, setIsLeaveFocus] = useState(false);

  const [fromTime, setFromTime] = useState<string>(''); // For "From Time"
  const [toTime, setToTime] = useState<string>(''); // For "To Time"
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);


  // const getStudentsLeaveData = async () => {
  //   const leaveData = {
  //     orgid,
  //     studentId,
  //     type: selectedItem, 
  //     leave_Id: LeaveId,
  //     leaveName: leaveName, 
  //     reason: cause,
  //     prmsn_reason: reasons,
  //     prmsn_date: selectedDate,
  //     fromDate: fromDate || null,
  //     toDate: toDate || null,
  //     fromTime: fromTime || null,
  //     toTime: toTime || null,
  //     totalDays: leaveDays,
  //   };
  //     console.log("Collected Data:", leaveData);


  //   try {
  //     const url = `https://www.vtsmile.in/app/api/students/leave_application_student_api?orgId=${orgid}&studId=${studentId}&leave_appln_type=${selectedItem}&leave_type=${leaveName}&leave_reason=${cause}&from_date=${fromDate}&to_date=${toDate}&prmsn_date=${selectedDate}&from_time=${fromTime}&to_time=${toTime}&prmsn_reason=${reasons}`;
  //     console.log('url==>',url)
  //     await axios.post(url,leaveData);

  //      const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default channel',
  //     });

  //     await notifee.displayNotification({
  //       title: 'Leave Request Sent Successfull!',
  //       body: `Leave ${ cause}`,
  //       android: {
  //         channelId,
  //         smallIcon: 'ic_launcher', // make sure you have this icon in android/app/src/main/res
  //          pressAction: {
  //             id: 'Leave Request', // custom ID
  //            launchActivity: 'default', // ensures app opens when tapped
  //     },
  //       },
  //     });


  //   //  Alert.alert("Success", "Leave Request successfully");
  //    navigation.navigate('HomeTab')
  //     showMessage({
  //              message: "Success",
  //              description: `Leave Request sent Successfully `,
  //              type: "success",
  //              backgroundColor: "#28A745",
  //              color: "#FFFFFF",
  //            });
  //   } catch (error) {
  //     console.log("Error submitting leave:", error);
  //   }
  // };


  const getStudentsLeaveData = async () => {
    const leaveData = {
      orgid,
      studentId,
      type: selectedItem,
      leave_Id: LeaveId,
      leaveName: leaveName,
      reason: cause,
      prmsn_reason: reasons,
      prmsn_date: selectedDate,
      fromDate: fromDate || null,
      toDate: toDate || null,
      fromTime: fromTime || null,
      toTime: toTime || null,
      totalDays: leaveDays,
    };

    // console.log("Collected Data:", leaveData);

    try {
      const url = `https://www.vtsmile.in/app/api/students/leave_application_student_api?orgId=${orgid}&studId=${studentId}&leave_appln_type=${selectedItem}&leave_type=${leaveName}&leave_reason=${cause}&from_date=${fromDate}&to_date=${toDate}&prmsn_date=${selectedDate}&from_time=${fromTime}&to_time=${toTime}&prmsn_reason=${reasons}`;

      // console.log("url==>", url);

      // 👇 GET API RESPONSE
      const response = await axios.post(url, leaveData);

      // console.log("API Response:", response.data);

      let responseData = response.data;

      // 👇 If response is string, extract JSON
      if (typeof responseData === "string") {
        const jsonStart = responseData.indexOf("{");
        if (jsonStart !== -1) {
          responseData = JSON.parse(responseData.substring(jsonStart));
        }
      }

      // console.log("Parsed Response:", responseData);

      // 👇 CHECK SUCCESS CONDITION
      if (responseData?.isSuccess === true) {

        showMessage({
          message: "Success",
          description: "Leave Request sent Successfully",
          type: "success",
          backgroundColor: "#28A745",
          color: "#FFFFFF",
        });

        navigation.navigate("HomeTab");

      } else {
        showMessage({
          message: "Failed",
          description: responseData?.message || "Something went wrong.",
          type: "danger",
        });
      }

    } catch (error) {
      console.log("Error submitting leave:", error);

      showMessage({
        message: "Error",
        description: "Something went wrong. Try again later.",
        type: "danger",
      });
    }
  };


  //   const handleFromTimeConfirm = (time: Date) => {
  //   const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   setFromTime(formattedTime);
  //   setShowFromTimePicker(false);
  // };

  // const handleToTimeConfirm = (time: Date) => {
  //   const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //   setToTime(formattedTime);
  //   setShowToTimePicker(false);
  // };
  const formatTo12Hour = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // convert 0 → 12

    const hourStr = String(hours).padStart(2, "0");

    return `${hourStr}:${minutes}${ampm}`;  // 05:30pm
  };

  const handleFromTimeConfirm = (time: Date) => {
    const formattedTime = formatTo12Hour(time);
    setFromTime(formattedTime);
    setShowFromTimePicker(false);
  };

  const handleToTimeConfirm = (time: Date) => {
    const formattedTime = formatTo12Hour(time);
    setToTime(formattedTime);
    setShowToTimePicker(false);
  };


  const leaveDays = fromDate && toDate ? Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  useFocusEffect(
    useCallback(() => {
      setSelectedItem('Leave');
      setLeaveId('');
      setLeaveName('');
      setCause('');
      setFromDate('');
      setToDate('');
      setSelectedDate('');
      setFromTime('');
      setToTime('')
      setReasons('')

    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7c43bd', }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('leave') }}>
            <MaterialIcons name="arrow-back" size={25} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Leave</Text>
        </View>

        {/* <View style={{width:"95%",height:70,marginTop:20,marginLeft:10,borderRadius:15}}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={activeTab === 'Leave' ? styles.activeTab : styles.inactiveTab}
                onPress={() => setActiveTab('Leave')}
              >
                <Text style={activeTab === 'Leave' ? styles.activeTabText : styles.inactiveTabText}>Leave</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={activeTab === 'Permission' ? styles.activeTab1 : styles.inactiveTab1}
                onPress={() => setActiveTab('Permission')}
              >
                <Text style={activeTab === 'Permission' ? styles.activeTabText : styles.inactiveTabText}>Permission</Text>
              </TouchableOpacity>
            </View>
      </View> */}
        <View style={{ flexDirection: 'row', width: "95%", height: 70, marginTop: 20, marginLeft: 10, borderRadius: 15 }}>
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
        {selectedItem === 'Leave' && (
          <>
            <ScrollView>
              <View style={styles.card}>
                <View style={styles.row}>

                  <Text style={styles.label}>Leave Type</Text>
                  <View style={{ marginBottom: 20, }}>
                    <Dropdown
                      style={[styles.inputBox, isLeaveFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data}
                      search
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={!isLeaveFocus ? 'Select Leave' : '...'}
                      searchPlaceholder="Search..."
                      value={LeaveId}
                      onFocus={() => setIsLeaveFocus(true)}
                      onBlur={() => setIsLeaveFocus(false)}
                      onChange={(item) => {
                        setLeaveId(item.value);       // leave ID
                        setLeaveName(item.label);     // leave name
                        setIsLeaveFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <MaterialIcons
                          style={styles.icon}
                          color={isLeaveFocus ? 'blue' : 'black'}
                          name="list"
                          size={25}
                        />
                      )}
                      // 👇 Custom item rendering
                      renderItem={(item) => {
                        const isSelected = item.value === LeaveId;
                        return (
                          <View
                            style={{
                              padding: 15,
                              backgroundColor: isSelected ? '#66787cff' : 'white', // selected bg color
                            }}
                          >
                            <Text
                              style={{
                                color: isSelected ? 'white' : 'black', // selected text color
                                fontWeight: isSelected ? 'bold' : 'normal',
                              }}
                            >
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />

                  </View>
                </View>

                <View style={{ marginBottom: 20, }}>
                  <Text style={{ color: '#000000ff', fontFamily: fonts.ROBOTO_BOLD, marginBottom: 6, fontSize: 16 }}>Reasons</Text>
                  <View style={styles.inputBox1}>
                    <Image source={require('../assest/note_14562923.png')} style={styles.img} />
                    <TextInput
                      style={styles.input}
                      value={cause}
                      multiline={true}
                      onChangeText={setCause}
                    />
                  </View>
                </View>

                {/* <Text style={styles.label1}>Select a Date</Text> */}


                <View style={{ marginBottom: 20, marginTop: 20 }} >
                  <Text style={{ fontSize: 16, fontFamily: fonts.ROBOTO_BOLD, color: '#0A0A2F', marginBottom: 6, }}>From</Text>
                  <Pressable
                    style={styles.dropdown}
                    onPress={() => setShowCalendar(!showCalendar)}
                  >

                    <Text style={{ fontSize: 18, color: '#645f5fff', marginLeft: 20, fontFamily: fonts.ROBOTO_BOLD, }}>
                      {fromDate ? new Date(fromDate).toDateString() : "Select Date"}
                    </Text>
                  </Pressable>
                  {showCalendar && (
                    <Calendar
                      onDayPress={(day) => {
                        setFromDate(day.dateString);
                        setShowCalendar(false);
                      }}

                      current={fromDate || today}
                      markedDates={{
                        [fromDate]: {
                          selected: true,
                          marked: true,
                          disableTouchEvent: true,
                          selectedColor: "orange",
                          selectedTextColor: "white",
                        },
                        ...(fromDate !== today && {
                          [today]: {
                            customStyles: {
                              container: {
                                backgroundColor: '#3a0ee7ff',
                                borderRadius: 10,
                              },
                              text: {
                                color: '#fff',
                                fontWeight: 'bold',
                              },
                            },
                          },
                        }),
                      }}
                      markingType={'custom'}
                    />
                  )}
                </View>

                <View style={{ marginBottom: 20, }} >
                  <Text style={{ fontSize: 16, fontFamily: fonts.ROBOTO_BOLD, color: '#0A0A2F', marginBottom: 6, }}>To</Text>
                  <Pressable
                    style={styles.dropdown}
                    onPress={() => setShowToCalendar(!showToCalendar)}
                  >

                    <Text style={{ fontSize: 18, color: '#645f5fff', marginLeft: 20, fontFamily: fonts.ROBOTO_BOLD, }}>
                      {toDate ? new Date(toDate).toDateString() : "Select Date"}
                    </Text>
                  </Pressable>
                  {showToCalendar && (
                    <Calendar
                      onDayPress={(day) => {
                        setToDate(day.dateString);
                        setShowToCalendar(false);
                      }}

                      current={toDate || today}
                      markedDates={{
                        [toDate]: {
                          selected: true,
                          marked: true,
                          disableTouchEvent: true,
                          selectedColor: "orange",
                          selectedTextColor: "white",
                        },
                        ...(toDate !== today && {
                          [today]: {
                            customStyles: {
                              container: {
                                backgroundColor: '#3a0ee7ff',
                                borderRadius: 10,
                              },
                              text: {
                                color: '#fff',
                                fontWeight: 'bold',
                              },
                            },
                          },
                        }),
                      }}
                      markingType={'custom'}
                    />
                  )}
                </View>

              </View>

              <Pressable
                style={styles.button} onPress={getStudentsLeaveData}>
                <Text style={styles.buttonText}>
                  {fromDate && toDate
                    ? `Apply for ${leaveDays} Days Leave`
                    : "Apply"}
                </Text>
              </Pressable>
            </ScrollView>
          </>
        )}

        {selectedItem === 'Permission' && (
          <>
            <View style={styles.field4}>
              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowCalendar(!showCalendar)}
              >
                <MaterialIcons name="calendar-month" size={25} style={{ color: '#5d5959ff', }} />
                <Text style={{ fontSize: 15, color: '#645f5fff', right: 175 }}>
                  {selectedDate ? new Date(selectedDate).toDateString() : "Select Date"}
                </Text>
              </TouchableOpacity>

              {showCalendar && (
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    setHomeworkDate(new Date(day.dateString));
                    setShowCalendar(false);
                  }}

                  current={selectedDate || today}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      marked: true,
                      disableTouchEvent: true,
                      selectedColor: "orange",
                      selectedTextColor: "white",
                    },
                    ...(selectedDate !== today && {
                      [today]: {
                        customStyles: {
                          container: {
                            backgroundColor: '#3a0ee7ff',
                            borderRadius: 10,
                          },
                          text: {
                            color: '#fff',
                            fontWeight: 'bold',
                          },
                        },
                      },
                    }),
                  }}
                  markingType={'custom'}
                />
              )}


              <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={styles.label3}>Select Time</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#0A0A2F', fontFamily: fonts.ROBOTO_BOLD, marginBottom: 6, fontSize: 16, left: 20 }}>From Time</Text>

                  <Text style={{ color: '#0A0A2F', fontFamily: fonts.ROBOTO_BOLD, marginBottom: 6, fontSize: 16, right: 80 }}>To Time</Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Pressable
                    style={styles.dropdownT}
                    onPress={() => setShowFromTimePicker(true)}
                  >
                    <MaterialIcons name="access-time" size={25} style={{ color: '#5d5959ff' }} />
                    <Text style={{ fontSize: 15, color: '#645f5fff', marginLeft: 20 }}>
                      {fromTime || 'Select Time'}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={showFromTimePicker}
                    mode="time"
                    onConfirm={handleFromTimeConfirm}
                    onCancel={() => setShowFromTimePicker(false)}
                  />

                  <Pressable
                    style={styles.dropdownT}
                    onPress={() => setShowToTimePicker(true)}
                  >
                    <MaterialIcons name="access-time" size={25} style={{ color: '#5d5959ff' }} />
                    <Text style={{ fontSize: 15, color: '#645f5fff', marginLeft: 20 }}>
                      {toTime || 'Select Time'}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    isVisible={showToTimePicker}
                    mode="time"
                    onConfirm={handleToTimeConfirm}
                    onCancel={() => setShowToTimePicker(false)}
                  />

                </View>
              </View>
              {/* 
<View style={{ marginBottom: 20, marginLeft: 10 }}>
  <Text style={{ color: '#0A0A2F', fontWeight: '600', marginBottom: 6, fontSize: 16,}}>Select To Time</Text>
  <Pressable
    style={styles.dropdownT}
    onPress={() => setShowToTimePicker(true)}
  >
    <MaterialIcons name="access-time" size={25} style={{ color: '#5d5959ff' }} />
    <Text style={{ fontSize: 15, color: '#645f5fff', marginLeft: 20 }}>
      {toTime || 'Select Time'}
    </Text>
  </Pressable>
  <DateTimePickerModal
    isVisible={showToTimePicker}
    mode="time"
    onConfirm={handleToTimeConfirm}
    onCancel={() => setShowToTimePicker(false)}
  />
</View> */}

            </View>
            <View style={{ marginBottom: 20, marginLeft: 10, bottom: 20 }}>
              <Text style={{ color: '#000000ff', fontFamily: fonts.FONT_BOLD, marginBottom: 6, fontSize: 16, marginLeft: 10, }}>Reasons</Text>
              <View style={styles.inputBox1}>
                <Image source={require('../assest/note_14562923.png')} style={styles.img} />
                <TextInput
                  style={styles.input}
                  value={reasons}
                  multiline={true}
                  onChangeText={setReasons}
                />
              </View>
            </View>



            <Pressable
              style={styles.button} onPress={getStudentsLeaveData}>
              <Text style={styles.buttonText}>
                Apply
              </Text>
            </Pressable>
          </>
        )}


      </View>



    </SafeAreaView>
  );
}
export default NewLeaveScreen;

const styles = StyleSheet.create({
  // container: { flex: 1,  backgroundColor: '#F5F7FA', width: "96%", top: 5, marginLeft: 8, borderWidth: 1,borderBottomRightRadius:20 ,borderBottomLeftRadius:20,marginBottom:10,borderColor:'#830009' },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    // margin: wp('2%'),
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#830009',
  },
  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10, width: '100%', height: 60, backgroundColor: '#7c43bd', },
  headerTitle: { fontSize: 26, color: '#fff', marginLeft: 80, fontFamily: fonts.FONT_BOLD, top: 3 },
  backArrow: { fontSize: 24, color: '#fff', marginHorizontal: 10, left: 10, top: 4 },
  tabContainer: {
    flexDirection: 'row',
    margin: 12,

  },
  activeTab: {
    width: '50%',
    backgroundColor: '#ffb2d5',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  field4: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor: "#9ba2ffff",
    borderRadius: 12,
    padding: 12,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 2,
    marginLeft: 5
  },
  activeTab1: {
    width: '50%',
    marginLeft: 5,
    backgroundColor: '#ffb2d5',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10
  },
  inactiveTab1: {
    width: '50%',
    backgroundColor: '#e0daf7',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5
  },
  inactiveTab: {
    width: '50%',
    backgroundColor: '#e0daf7',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabText: { color: '#683ab7', fontWeight: 'bold', fontSize: 16 },
  inactiveTabText: { color: '#ad97ef', fontWeight: 'bold', fontSize: 16 },
  dayBtn: {
    width: "50%", height: 50,
    backgroundColor: '#bdc3c5ff',
    borderRadius: 5, padding: 2, margin: 2, right: 5
  },
  dayBtnActive: { backgroundColor: '#7c43bd' },
  dayText: { fontSize: 18, color: '#ffffffff', textAlign: 'center', padding: 10, fontFamily: fonts.ROBOTO_BOLD, },
  dayTextActive: { fontFamily: fonts.ROBOTO_BOLD, },
  inputBox1: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1b1bbeff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', width: '95%', marginLeft: 10
  },
  inputBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1b1bbeff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('4%'),
    marginLeft: wp('-30%'),
    minHeight: hp('5%'),
    paddingHorizontal: wp('2%'),
    width: wp('85%'),
    alignSelf: 'center',

  },
  input: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: '#222',
    fontFamily: fonts.ROBOTO_MEDIUM,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1b1bbeff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownT: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1b1bbeff',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },

  dropdown1: {
    minHeight: hp('5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: 10,
    borderWidth: 1,
    width: wp('85%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    color: "#5d5959ff",
    marginRight: 6,
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 6
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    elevation: 4,
    shadowColor: '#ededed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
  field: {
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    padding: 12, marginLeft: -80, right: 10
  },
  field1: {
    width: "95%",
    marginTop: 10, top: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 12, marginLeft: 5
  },
  field2: {
    width: "95%",
    borderRadius: 12,
    padding: 12,
    bottom: 10, marginLeft: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  label: {
    fontSize: 16,
    color: '#000000ff',
    fontFamily: fonts.FONT_BOLD,
    marginBottom: 6,
  },
  label3: {
    fontSize: 16,
    color: '#000000ff',
    fontFamily: fonts.FONT_BOLD,
    marginBottom: 6
  },
  label1: {
    fontSize: 16,
    color: '#000000ff',
    fontFamily: fonts.FONT_BOLD,
    marginLeft: 20
  },
  value: {
    fontSize: 16,
    color: '#393A50',
    fontWeight: '600',
  },
  calendarWrapper: {
    marginVertical: 8,
    alignSelf: 'center',
  },
  // button: {
  //   backgroundColor: '#6954F5',
  //   borderRadius: 10,
  //   paddingVertical: 18,
  //   paddingHorizontal: 20,
  //   width: '97%',
  //   alignItems: 'center',
  //   marginTop: 10,marginLeft:5
  // },
  button: {
    backgroundColor: '#7c43bd',
    borderRadius: 10,
    paddingVertical: hp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: fonts.FONT_BOLD,
    textTransform: 'capitalize',
  },
})


