

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { fonts } from "../root/config";
import { SafeAreaView } from "react-native-safe-area-context";

interface CalendarScreenProps {
  route: any;
  navigation: any
};
const CalendarScreen: React.FC<CalendarScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>({});
  const [holidays, setHolidays] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  const getStudentData = async () => {
    try {
      const mobileNo = await AsyncStorage.getItem("mobile");

      const res = await axios.post(
        `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
      );

      if (res.data.isSuccess && res.data.studDetails) {
        const details = res.data.studDetails[0];
        setStudentData({
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          imageURL: details.photo_url,
          roll: details.rollNo,
          admission: details.admsn_no,
        });
      }
    } catch (error) {
    }
  };


  const getHolidays = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/holiday_calendar_api?orgId=${orgid}`
      );
      if (response.data?.holidays_events) {
        const events = response.data.holidays_events.map((h) => ({
          date: h.holiday_date,
          name: h.holiday_name,
          type: h.holiday_type,
        }));

        setHolidays(events);

        // 🎨 Create color-coded marks
        const marks = {};
        events.forEach((e) => {
          marks[e.date] = {
            marked: true,

            dotColor:
              e.type === "Week-Off"
                ? "#b1028eff"
                : e.type === "Event"
                  ? "#FB548B"
                  : "#36B37B",
          };
        });

        setMarkedDates({
          ...marks,
          [moment().format("YYYY-MM-DD")]: {
            selected: true,
            selectedColor: "#ec6337",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getStudentData();
    getHolidays();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleDayPress = (day) => {
    const newMarks = { ...markedDates };
    Object.keys(newMarks).forEach((d) => {
      if (newMarks[d].selected) delete newMarks[d].selected;
    });
    newMarks[day.dateString] = {
      ...(newMarks[day.dateString] || {}),
      selected: true,
      selectedColor: "#ec6337",
    };
    setMarkedDates(newMarks);
    setSelectedDate(day.dateString);
  };

  const eventsForDate = holidays.filter(
    (h) => h.date === selectedDate
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#7c43bd'}}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Academic Calendar</Text>
        </View>

        {/* Calendar */}
        <View>
          <CalendarList
            pastScrollRange={12}
            futureScrollRange={12}
            scrollEnabled
            showScrollIndicator
            horizontal
            pagingEnabled
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              calendarBackground: "#894fccff",
              monthTextColor: "#fff",
              dayTextColor: "#fff",
              arrowColor: "#fff",
              textMonthFontWeight: "600",
              todayTextColor: "#efeeefff",
              todayBackgroundColor: '#FB6597'
            }}
          />
        </View>


        {/* Events */}
        <View style={styles.eventsBox}>
          <Text style={styles.eventDateText}>
            {moment(selectedDate).format("dddd, MMMM Do YYYY")}
          </Text>

          {eventsForDate.length > 0 ? (
            eventsForDate.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                <Text style={styles.eventItem}>
                  {event.type === "Week-off" ? "🛑 " : "🛑"}
                  {event.name}
                </Text>
                <Text style={styles.eventType}>{event.type}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this day</Text>
          )}
        </View>
      </View>


    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  //  header: { width: '100%', height: 60, backgroundColor: '#7b2cbf', flexDirection: 'row', },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16, height: 60,
    backgroundColor: '#7c43bd',
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: fonts.FONT_BOLD,
    marginRight: 80,
  },
  eventCard: {
    backgroundColor: "#37a4ecff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  noEventsText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.ROBOTO_BOLD,
  },
  eventType: {
    color: "#f7dede",
    fontSize: 13,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  eventsBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e9f5d0',
    borderRadius: 10,
    marginHorizontal: 10, minHeight: "35%",
  },
  eventDateText: {
    fontSize: 16,
    color: '#555',
    fontFamily: fonts.ROBOTO_BOLD,
    marginBottom: 10,
  },
  eventItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

