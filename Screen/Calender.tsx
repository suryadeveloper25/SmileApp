

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Calendar, CalendarList } from 'react-native-calendars';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import moment from "moment";
// import { fonts } from "../root/config";
// import { SafeAreaView } from "react-native-safe-area-context";

// interface CalendarScreenProps {
//   route: any;
//   navigation: any
// };
// const CalendarScreen: React.FC<CalendarScreenProps> = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [loading, setLoading] = useState(true);
//   const [studentData, setStudentData] = useState<any>({});
//   const [holidays, setHolidays] = useState([]);
//   const [markedDates, setMarkedDates] = useState({});
//   const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

//   const getStudentData = async () => {
//     try {
//       const mobileNo = await AsyncStorage.getItem("mobile");

//       const res = await axios.post(
//         `https://www.vtsmile.in/app/api/students/dashboard_students_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`
//       );

//       if (res.data.isSuccess && res.data.studDetails) {
//         const details = res.data.studDetails[0];
//         setStudentData({
//           name: details.stud_name,
//           std: details.std_name,
//           section: details.section,
//           group: details.group_name,
//           imageURL: details.photo_url,
//           roll: details.rollNo,
//           admission: details.admsn_no,
//         });
//       }
//     } catch (error) {
//     }
//   };


//   const getHolidays = async () => {
//     try {
//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/holiday_calendar_api?orgId=${orgid}`
//       );
//       if (response.data?.holidays_events) {
//         const events = response.data.holidays_events.map((h) => ({
//           date: h.holiday_date,
//           name: h.holiday_name,
//           type: h.holiday_type,
//         }));

//         setHolidays(events);

//         // 🎨 Create color-coded marks
//         const marks = {};
//         events.forEach((e) => {
//           marks[e.date] = {
//             marked: true,

//             dotColor:
//               e.type === "Week-Off"
//                 ? "#b1028eff"
//                 : e.type === "Event"
//                   ? "#FB548B"
//                   : "#36B37B",
//           };
//         });

//         setMarkedDates({
//           ...marks,
//           [moment().format("YYYY-MM-DD")]: {
//             selected: true,
//             selectedColor: "#ec6337",
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching calendar data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     getStudentData();
//     getHolidays();
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
//   const handleDayPress = (day) => {
//     const newMarks = { ...markedDates };
//     Object.keys(newMarks).forEach((d) => {
//       if (newMarks[d].selected) delete newMarks[d].selected;
//     });
//     newMarks[day.dateString] = {
//       ...(newMarks[day.dateString] || {}),
//       selected: true,
//       selectedColor: "#ec6337",
//     };
//     setMarkedDates(newMarks);
//     setSelectedDate(day.dateString);
//   };

//   const eventsForDate = holidays.filter(
//     (h) => h.date === selectedDate
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor:'#6A1B9A',marginBottom:-30}}>
//       {/* Header */}
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Academic Calendar</Text>
//         </View>

//         {/* Calendar */}
//         <View>
//           <CalendarList
//             pastScrollRange={12}
//             futureScrollRange={12}
//             scrollEnabled
//             showScrollIndicator
//             horizontal
//             pagingEnabled
//             markedDates={markedDates}
//             onDayPress={handleDayPress}
//             theme={{
//               calendarBackground: "#894fccff",
//               monthTextColor: "#fff",
//               dayTextColor: "#fff",
//               arrowColor: "#fff",
//               textMonthFontWeight: "600",
//               todayTextColor: "#efeeefff",
//               todayBackgroundColor: '#FB6597'
//             }}
//           />
//         </View>


//         {/* Events */}
//         <View style={styles.eventsBox}>
//           <Text style={styles.eventDateText}>
//             {moment(selectedDate).format("dddd, MMMM Do YYYY")}
//           </Text>

//           {eventsForDate.length > 0 ? (
//             eventsForDate.map((event, index) => (
//               <View key={index} style={styles.eventCard}>
//                 <Text style={styles.eventItem}>
//                   {event.type === "Week-off" ? "🛑 " : "🛑"}
//                   {event.name}
//                 </Text>
//                 <Text style={styles.eventType}>{event.type}</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noEventsText}>No events for this day</Text>
//           )}
//         </View>
//       </View>


//     </SafeAreaView>
//   );
// };

// export default CalendarScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', width: "100%", },
//   //  header: { width: '100%', height: 60, backgroundColor: '#7b2cbf', flexDirection: 'row', },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16, height: 60,
//     backgroundColor: '#6A1B9A',
//   },
//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
//   headerTitle: {
//     fontSize: 18,
//     color: '#fff',
//     fontFamily: fonts.FONT_BOLD,
//     marginRight: 80,
//   },
//   eventCard: {
//     backgroundColor: "#37a4ecff",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   noEventsText: {
//     fontSize: 16,
//     color: '#000',
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   eventType: {
//     color: "#f7dede",
//     fontSize: 13,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   eventsBox: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#e9f5d0',
//     borderRadius: 10,
//     marginHorizontal: 10, minHeight: "35%",
//   },
//   eventDateText: {
//     fontSize: 16,
//     color: '#555',
//     fontFamily: fonts.ROBOTO_BOLD,
//     marginBottom: 10,
//   },
//   eventItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width, height } = Dimensions.get("window");
const BASE_WIDTH = 360;
const scale = width / BASE_WIDTH;
const normalize = (size: number) => Math.round(size * scale);
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);
const wp = (pct: number) => (width * pct) / 100;
const hp = (pct: number) => (height * pct) / 100;

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  // Calendar purple header
  headerBg: "#4A148C",
  calBg: "#6A1B9A",
  calBgLight: "#7B1FA2",

  // Page background
  pageBg: "#F9F7FF",

  // Event colours
  weekOff: "#D81B60",      // deep rose
  event: "#1565C0",        // royal blue
  holiday: "#2E7D32",      // forest green

  // Today dot
  todayDot: "#FF6D00",

  // Cards
  cardBg: "#FFFFFF",
  cardBorder: "#EDE9FE",

  // Text
  textDark: "#1A1035",
  textMid: "#4B5563",
  textLight: "#9CA3AF",
  textWhite: "#FFFFFF",

  // Tag colours
  tagWeekOff: { bg: "#FCE4EC", text: "#C2185B" },
  tagEvent: { bg: "#E3F2FD", text: "#1565C0" },
  tagHoliday: { bg: "#E8F5E9", text: "#2E7D32" },

  shadow: "rgba(74,20,140,0.15)",
};

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface CalendarScreenProps {
  route: any;
  navigation: any;
}

interface HolidayEvent {
  date: string;
  name: string;
  type: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const dotColorForType = (type: string) => {
  if (type === "Week-Off") return C.weekOff;
  if (type === "Event") return C.event;
  return C.holiday;
};

const tagStyleForType = (type: string) => {
  if (type === "Week-Off") return C.tagWeekOff;
  if (type === "Event") return C.tagEvent;
  return C.tagHoliday;
};

const iconForType = (type: string) => {
  if (type === "Week-Off") return "weekend";
  if (type === "Event") return "event";
  return "beach-access";
};

// ─── Component ────────────────────────────────────────────────────────────────
const CalendarScreen: React.FC<CalendarScreenProps> = ({ route, navigation }) => {
  const { orgid, studentId } = route?.params || {};

  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState<HolidayEvent[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));

  // ── API ──────────────────────────────────────────────────────────────────
  const getHolidays = async () => {
    try {
      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/holiday_calendar_api?orgId=${orgid}`
      );
     
      if (response.data?.holidays_events) {
        const events: HolidayEvent[] = response.data.holidays_events.map((h: any) => ({
          date: h.holiday_date,
          name: h.holiday_name,
          type: h.holiday_type,
        }));
        setHolidays(events);
        buildMarkedDates(events, moment().format("YYYY-MM-DD"));
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildMarkedDates = (events: HolidayEvent[], selected: string) => {
    const marks: any = {};
    events.forEach((e) => {
      marks[e.date] = {
        marked: true,
        dotColor: dotColorForType(e.type),
      };
    });
    // Merge today / selected
    marks[selected] = {
      ...(marks[selected] || {}),
      selected: true,
      selectedColor: C.todayDot,
    };
    setMarkedDates(marks);
  };

  useEffect(() => {
    getHolidays();
  }, []);

  // ── Day press ────────────────────────────────────────────────────────────
  const handleDayPress = (day: { dateString: string }) => {
    const newMarks = { ...markedDates };
    // clear old selection
    Object.keys(newMarks).forEach((d) => {
      if (newMarks[d]?.selected) {
        newMarks[d] = { ...newMarks[d] };
        delete newMarks[d].selected;
        delete newMarks[d].selectedColor;
      }
    });
    newMarks[day.dateString] = {
      ...(newMarks[day.dateString] || {}),
      selected: true,
      selectedColor: C.todayDot,
    };
    setMarkedDates(newMarks);
    setSelectedDate(day.dateString);
  };

  const eventsForDate = holidays.filter((h) => h.date === selectedDate);
  const isToday = selectedDate === moment().format("YYYY-MM-DD");

  // ── Loading ──────────────────────────────────────────────────────────────
  // if (loading) {
  //   return (
  //     <View style={styles.loaderBg}>
  //       <View style={styles.loaderCard}>
  //         <ActivityIndicator size="large" color={C.calBg} />
  //         <Text style={styles.loaderText}>Loading calendar…</Text>
  //       </View>
  //     </View>
  //   );
  // }
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // ── Legend item ──────────────────────────────────────────────────────────
  const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );

  // ── Event card ───────────────────────────────────────────────────────────
  const EventCard = ({ event }: { event: HolidayEvent }) => {
    const tag = tagStyleForType(event.type);
    return (
      <View style={styles.eventCard}>
        <View style={[styles.eventStripe, { backgroundColor: dotColorForType(event.type) }]} />
        <View style={styles.eventContent}>
          <View style={styles.eventTopRow}>
            <MaterialIcons
              name={iconForType(event.type)}
              size={clamp(normalize(18), 16, 22)}
              color={dotColorForType(event.type)}
            />
            <Text style={styles.eventName} numberOfLines={2}>
              {event.name}
            </Text>
          </View>
          <View style={[styles.eventTag, { backgroundColor: tag.bg }]}>
            <Text style={[styles.eventTagText, { color: tag.text }]}>{event.type}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {/* <StatusBar backgroundColor={C.headerBg} barStyle="light-content" /> */}
      <SafeAreaView style={styles.safeArea} edges={["top"]}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            // style={styles.backBtn}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="arrow-back" size={normalize(24)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Academic Calendar</Text>
          {/* <View style={styles.headerRight}>
            <View style={styles.monthBadge}>
              <Text style={styles.monthBadgeText}>
                {moment(selectedDate).format("MMM")}
              </Text>
            </View>
          </View> */}
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: C.pageBg }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(20) }}
          showsVerticalScrollIndicator={false}
        >

          {/* ── Calendar ── */}
          <View style={styles.calendarWrapper}>
            <CalendarList
              pastScrollRange={12}
              futureScrollRange={12}
              scrollEnabled
              showScrollIndicator={false}
              horizontal
              pagingEnabled
              markedDates={markedDates}
              onDayPress={handleDayPress}
              calendarWidth={width}
              // Constrain height so it doesn't eat the whole screen
              style={{ height: clamp(hp(38), 280, 340) }}
              theme={{
                calendarBackground: C.calBg,
                monthTextColor: "#fff",
                dayTextColor: "#E9D5FF",
                arrowColor: "#E9D5FF",
                textMonthFontSize: clamp(normalize(15), 13, 18),
                textMonthFontWeight: "700",
                todayTextColor: "#fff",
                todayBackgroundColor: C.todayDot,
                textDayFontSize: clamp(normalize(13), 11, 15),
                textDayHeaderFontSize: clamp(normalize(11), 10, 13),
                textSectionTitleColor: "rgba(255,255,255,0.6)",
                selectedDayBackgroundColor: C.todayDot,
                selectedDayTextColor: "#fff",
                dotColor: "#fff",
                selectedDotColor: "#fff",
              }}
            />
          </View>

          {/* ── Legend strip ── */}
          {/* <View style={styles.legendStrip}>
            <LegendDot color={C.weekOff} label="Week-Off" />
            <LegendDot color={C.event} label="Event" />
            <LegendDot color={C.holiday} label="Holiday" />
            <LegendDot color={C.todayDot} label="Selected" />
          </View> */}

          {/* ── Events panel ── */}
          <View style={styles.eventsPanel}>
            {/* Date heading */}
            <View style={styles.eventsPanelHeader}>
              <View style={styles.calIconBox}>
                <MaterialIcons
                  name="today"
                  size={clamp(normalize(20), 18, 24)}
                  color={C.calBg}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dayName}>
                  {moment(selectedDate).format("dddd")}
                  {isToday ? "  •  Today" : ""}
                </Text>
                <Text style={styles.fullDate}>
                  {moment(selectedDate).format("MMMM Do, YYYY")}
                </Text>
              </View>
              {eventsForDate.length > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{eventsForDate.length}</Text>
                </View>
              )}
            </View>

            {/* Divider */}
            <View style={styles.panelDivider} />

            {/* Event list or empty */}
            {eventsForDate.length > 0 ? (
              eventsForDate.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <View style={styles.emptyIconCircle}>
                  <MaterialIcons
                    name="event-available"
                    size={clamp(normalize(40), 34, 48)}
                    color={C.calBg}
                  />
                </View>
                <Text style={styles.emptyTitle}>No events scheduled</Text>
                <Text style={styles.emptySubtitle}>
                  This is a regular school day.{"\n"}Select another date to view events.
                </Text>
              </View>
            )}
          </View>

          <View style={{ height: hp(4) }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CalendarScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.headerBg,
  },

  // Loading
  loaderBg: {
    flex: 1,
    backgroundColor: C.pageBg,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderCard: {
    backgroundColor: "#fff",
    borderRadius: normalize(20),
    padding: normalize(32),
    alignItems: "center",
    gap: normalize(12),
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  loaderText: {
    fontSize: clamp(normalize(14), 12, 16),
    color: C.textMid,
  },

  // Header
  header: {
    backgroundColor: C.headerBg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  backBtn: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: C.textWhite,
    fontSize: clamp(normalize(17), 15, 20),
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  headerRight: {
    width: normalize(40),
    alignItems: "flex-end",
  },
  monthBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: normalize(8),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
  },
  monthBadgeText: {
    color: "#fff",
    fontSize: clamp(normalize(11), 10, 13),
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Calendar
  calendarWrapper: {
    backgroundColor: C.calBg,
    overflow: "hidden",
    borderBottomLeftRadius: normalize(28),
    borderBottomRightRadius: normalize(28),
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },

  // Legend
  legendStrip: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp(4),
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(4),
    backgroundColor: C.pageBg,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(5),
  },
  legendDot: {
    width: normalize(9),
    height: normalize(9),
    borderRadius: normalize(5),
  },
  legendLabel: {
    fontSize: clamp(normalize(11), 10, 13),
    color: C.textMid,
    fontWeight: "600",
  },

  // Events panel
  eventsPanel: {
    backgroundColor: C.cardBg,
    marginHorizontal: wp(4),
    borderRadius: normalize(20),
    padding: wp(4),
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: C.cardBorder,
    marginTop: hp(0.5),
    marginBottom: hp(1),
  },
  eventsPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
    marginBottom: hp(1.2),
  },
  calIconBox: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(14),
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },
  dayName: {
    fontSize: clamp(normalize(13), 11, 15),
    color: C.textMid,
    fontWeight: "600",
    marginBottom: normalize(2),
  },
  fullDate: {
    fontSize: clamp(normalize(16), 14, 19),
    color: C.textDark,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  countBadge: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: C.calBg,
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: {
    color: "#fff",
    fontSize: clamp(normalize(13), 11, 15),
    fontWeight: "800",
  },
  panelDivider: {
    height: 1,
    backgroundColor: C.cardBorder,
    marginBottom: hp(1.5),
  },

  // Event card
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderRadius: normalize(14),
    marginBottom: hp(1.2),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    // subtle shadow
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventStripe: {
    width: normalize(5),
    borderRadius: normalize(5),
    margin: normalize(4),
    marginRight: 0,
    borderTopLeftRadius: normalize(12),
    borderBottomLeftRadius: normalize(12),
  },
  eventContent: {
    flex: 1,
    padding: normalize(12),
    gap: normalize(8),
  },
  eventTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: normalize(8),
  },
  eventName: {
    flex: 1,
    fontSize: clamp(normalize(14), 12, 16),
    color: C.textDark,
    fontWeight: "700",
    lineHeight: clamp(normalize(20), 18, 24),
  },
  eventTag: {
    alignSelf: "flex-start",
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(3),
    borderRadius: normalize(20),
  },
  eventTagText: {
    fontSize: clamp(normalize(11), 10, 13),
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
  },
  emptyIconCircle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(1.5),
  },
  emptyTitle: {
    fontSize: clamp(normalize(16), 14, 19),
    fontWeight: "800",
    color: C.textDark,
    marginBottom: hp(0.6),
  },
  emptySubtitle: {
    fontSize: clamp(normalize(13), 11, 15),
    color: C.textMid,
    textAlign: "center",
    lineHeight: clamp(normalize(20), 18, 24),
  },
});