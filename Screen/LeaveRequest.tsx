

import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect, } from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
// import notifee, { EventType } from '@notifee/react-native';
import { fonts } from '../root/config';


interface leaveRequestProps {
  route: any;
  navigation: any;
}


const LeavesScreen: React.FC<leaveRequestProps> = ({ route, navigation }) => {

  const { orgid, studentId, mobile } = route?.params || {};
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [leaveData, setLeaveData] = useState([]);
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'leave', label: 'Leave' },
    { key: 'permission', label: 'Permission' },
  ];

  const getleaverequestData = async () => {
    try {
      const res = `https://www.vtsmile.in/app/api/students/leave_list_student_api?orgId=${orgid}&studId=${studentId}`;
      const response = await axios.post(res);
      // console.log('response.data.req_list_result)=>', response.data.req_list_result)
      if (response.data.isSuccess && response.data.req_list_result) {
        setLeaveData(response.data.req_list_result);
      } else {
        setLeaveData([]);
      }
    } catch (err) {
      console.log('Error fetching leave data', err);
    } finally {
      setIsLoading(false);
    }
  }

  const getFilteredData = () => {
    if (selectedFilter === 'all') return leaveData;

    return leaveData.filter(item => {
      const type = item.leave_appln_type?.toLowerCase() || '-';
      if (selectedFilter === 'leave') {
        return type === 'leave';
      } else if (selectedFilter === 'permission') {
        return type === 'permission';
      }
      return false;
    });
  };

  // const getFilteredData = () => {
  //   if (selectedFilter === 'all') return leaveData;

  //   return leaveData.filter(item => 
  //     item.leave_appln_type?.toLowerCase() === selectedFilter
  //   );
  // };

  /// Function to get background color based on status

  const getStatusBackgroundColor = (approval_status: string) => {
    switch (approval_status?.toLowerCase()) {
      case 'approved':
        return '#4CAF50'; // Green
      case 'pending':
        return '#FFC107'; // Yellow
      case 'rejected':
        return '#F44336'; // Red
      default:
        return '#645b83ff'; // Gray
    }
  };


  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getleaverequestData();
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3c58e8" />
        <Text style={{ marginTop: 10, fontFamily: 'Poppins-Regular' }}>Loading...</Text>
      </View>
    );
  }

  // ✅ Group leaveData by from_date
  const groupByDate = (data) => {
    return data.reduce((groups, item) => {
      const dateKey = item.from_date || item.prmsn_date || 'Unknown Date';
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
      return groups;
    }, {});
  };

  const groupedLeaves = groupByDate(getFilteredData());
  const sortedDates = Object.keys(groupedLeaves).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7c43bd', }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialIcons name="arrow-back" size={25} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leave Request</Text>
        </View>

        <View style={styles.topBar}>
          <Text style={styles.header1}>Leaves</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Newleave', { orgid, studentId, mobile })}>
              <Text style={styles.plus}>Apply Leave</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabsContainer}>
          {filters.map(filter => {
            // Calculate the count for this tab
            // const count =
            //   filter.key === 'all'
            //     ? leaveData.length
            //     : leaveData.filter(f => f.leave_appln_type?.toLowerCase() === filter.key).length;
            const count =
              filter.key === 'all'
                ? leaveData.length
                : leaveData.filter(f => {
                  const type = f.leave_appln_type?.toLowerCase() || '-';
                  return type === filter.key;
                }).length;

            return (
              <TouchableOpacity
                key={filter.key}
                style={[styles.tab, selectedFilter === filter.key && styles.tabSelected]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text
                  style={{
                    color: selectedFilter === filter.key ? '#221E1E' : '#A0A3BD',
                    fontFamily: fonts.ROBOTO_BOLD,
                  }}
                >
                  {filter.label} ({count})
                </Text>

                {filter.key !== 'all' && (
                  <View
                    style={[
                      styles.dot,
                      filter.key === 'leave' && { backgroundColor: '#FFD660' },
                      filter.key === 'permission' && { backgroundColor: '#4B72FF' },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>


        {/* <ScrollView>
  {getFilteredData().map((leave, idx) => (
    <View key={idx} style={styles.leaveCard}>
      <View style={styles.leaveLeft}>
        <Text style={styles.leaveType1}>{leave.leave_appln_type}</Text>
        <Text style={styles.leaveType}>{leave.leave_reason}</Text>
        <Text style={styles.leaveDate}>
          {leave.from_date}  {leave.to_date} {leave.from_time} {leave.to_time}
        </Text>
        <Text style={[styles.leaveTag, { color: leave.tagColor, backgroundColor: leave.tagBg }]}>
          {leave.leave_type}
        </Text>
      </View>
      <View style={styles.statusContainer}>
<Text
  style={[
    styles.statusText,
    { backgroundColor: getStatusBackgroundColor(leave.status || leave.remark) },
  ]}
>
  {leave.remark || leave.status}
</Text>

      </View>
    </View>
  ))}
</ScrollView> */}

        {/* <ScrollView>
          {sortedDates.map((date) => (
            <View key={date}>
              <Text style={{ fontSize: 16, fontWeight: '700', marginVertical: 10, marginLeft: 10, color: '#2c2b2bff' }}>
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Text>

              {groupedLeaves[date].map((leave, idx) => (
                <View key={idx} style={styles.leaveCard}>
                  <View style={styles.leaveLeft}>
                          <View style={styles.statusContainer}>
                    <Text
                      style={[
                        styles.statusText,
                        { backgroundColor: getStatusBackgroundColor(leave.approval_status || leave.remark) },
                      ]}
                    >
                      {leave.remark || leave.approval_status}
                    </Text>
                  </View>
                  <View style={{bottom:20}}>
                    <View style={{flexDirection:'row',}}>

                    <Text style={styles.leaveType1}>Apply Type :</Text> <Text style={styles.leaveValue}> {leave.leave_appln_type ? leave.leave_appln_type : '-'}</Text>
                
                    </View>
                       <View style={{flexDirection:'row'}}>
                        <Text style={styles.leaveType1}>Reason : </Text> <Text style={styles.leaveValue}>{leave.leave_reason}</Text>
                       </View>
                    <View style={{flexDirection:'row'}}>
                       <Text style={styles.leaveType1}>Date : </Text>
                   
                      <Text style={styles.leaveType2}>From : </Text>
                      <Text style={styles.leaveValue}>{leave.from_date} </Text> 
                      <Text style={styles.leaveType2}> TO :</Text> 
                      <Text style={styles.leaveValue}> {leave.to_date}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                          <Text style={styles.leaveType1}>Permission Date : </Text>
                        <Text style={styles.leaveDate}>{leave.prmsn_date}</Text>
                        </View>
                       <View style={{flexDirection:'row'}}>
                         <Text style={styles.leaveType1}>Time : </Text>
                    <Text style={styles.leaveDate}>{leave.from_time}  {leave.to_time}</Text> 
                     </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.leaveType1}>
                     Leave Type :</Text> <Text style={styles.leaveValue}>{leave.leave_type}
                    </Text>
                     </View>
                  </View>
                  </View>
                
                </View>
              ))}
            </View>
          ))}
        </ScrollView> */}
        <ScrollView>
          {sortedDates.map((date) => (
            <View key={date}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.FONT_BOLD,
                  marginVertical: 10,
                  marginLeft: 10,
                  color: '#2c2b2bff',
                }}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>

              {groupedLeaves[date].map((leave, idx) => (
                <View key={idx} style={styles.leaveCard}>
                  <View style={styles.leaveLeft}>
                    <View style={styles.statusContainer}>
                      <Text
                        style={[
                          styles.statusText,
                          {
                            backgroundColor: getStatusBackgroundColor(
                              leave.approval_status || leave.remark
                            ),
                          },
                        ]}
                      >
                        {leave.remark || leave.approval_status}
                      </Text>
                    </View>

                    <View style={{ bottom: 20 }}>
                      {/* Apply Type */}
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.leaveType1}>Apply Type :</Text>
                        <Text style={styles.leaveValue}>
                          {' '}
                          {leave.leave_appln_type ? leave.leave_appln_type : '-'}
                        </Text>
                      </View>

                      {/* Reason */}
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.leaveType1}>Reason : </Text>
                        <Text style={styles.leaveValue}>{leave.leave_reason} {leave.prmsn_reason} </Text>
                      </View>

                      {/* ✅ SHOW Leave details for Leave & All */}
                      {(leave.leave_appln_type === 'Leave' ||
                        leave.leave_appln_type === 'All') && (
                          <>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.leaveType1}>Date : </Text>
                              <Text style={styles.leaveType2}>From : </Text>
                              <Text style={styles.leaveValue}>{leave.from_date}</Text>
                              <Text style={styles.leaveType2}>  TO :</Text>
                              <Text style={styles.leaveValue}>{leave.to_date}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.leaveType1}>Leave Type :</Text>
                              <Text style={styles.leaveValue}>{leave.leave_type} </Text>
                            </View>
                          </>
                        )}

                      {/* ✅ SHOW Permission details ONLY for Permission */}
                      {leave.leave_appln_type === 'Permission' && (
                        <>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.leaveType1}>Permission Date : </Text>
                            <Text style={styles.leaveDate}>{leave.prmsn_date}</Text>

                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.leaveType1}>Time : </Text>
                            <Text style={styles.leaveDate}>
                              {leave.from_time} - {leave.to_time}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

      </View>

    </SafeAreaView>
  );
}
export default LeavesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', width: "100%", },
  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10, width: '100%', height: 60, backgroundColor: '#7c43bd', },
  headerTitle: { fontSize: 20, color: '#fff', marginLeft: 80, top: 3, fontFamily: fonts.FONT_BOLD, },
  backArrow: { fontSize: 24, color: '#fff', marginHorizontal: 10, left: 10, top: 4 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  header1: {
    fontSize: 30,
    fontFamily: fonts.ROBOTO_BOLD,
    color: '#221E1E',
    marginLeft: 10, marginTop: 10
  },
  leaveValue: {
    color: '#221E1E', fontSize: 14, marginLeft: 8, top: 3, fontFamily: fonts.ROBOTO_BOLD,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  iconButton: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#4B72FF',
    borderRadius: 8,
    width: 40, height: 40,
    margin: 10,
    alignItems: 'center',
  },
  plus: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.ROBOTO_BOLD,
    marginLeft: 5
  },
  fab: {
    position: 'absolute',
    right: 25,
    backgroundColor: '#7c43bd',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#dededeff',
    borderRadius: 10,
    padding: 4, margin: 4,
    marginBottom: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 6,
  },
  tabSelected: {
    backgroundColor: '#F5F7FA',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 8,
  },
  sectionHeader: {
    color: '#A0A3BD',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 6,
  },
  leaveCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 5,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 2,
    // height:200
  },
  leaveLeft: {
    top: 10,
    flex: 1,
  },
  leaveType: {
    color: '#A0A3BD',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  leaveType1: {
    color: '#2a2828ff',
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
    marginBottom: 2,
  },
  leaveType2: {
    color: '#2a2828ff',
    fontSize: 15,
    top: 2,
    fontFamily: fonts.ROBOTO_BOLD,
    // fontWeight: '600',
    // marginBottom: 2,
  },
  leaveDate: {
    color: '#221E1E',
    fontSize: 15,
    top: 2,
    fontFamily: fonts.ROBOTO_BOLD,
    // fontWeight: '700',
    // marginBottom: 6,
  },
  leaveTag: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 13,
    borderRadius: 8,
    fontFamily: fonts.ROBOTO_BOLD,
    paddingHorizontal: 12,
    paddingVertical: 4,
    overflow: 'hidden',
    color: '#ffffffff',
  },
});


// import React, { useCallback, useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import axios from 'axios';

// // --- your component ---
// const LeavesScreen = ({ route, navigation }) => {
//   const { orgid, studentId, mobile } = route?.params || {};
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [leaveData, setLeaveData] = useState([]);

//   const filters = [
//     { key: 'all', label: 'All' },
//     { key: 'leave', label: 'Leave' },
//     { key: 'permission', label: 'Permission' },
//   ];

//   const getleaverequestData = async () => {
//     try {
//       const res = `https://www.vtsmile.in/app/api/students/leave_list_student_api?orgId=${orgid}&studId=${studentId}`;
//       const response = await axios.post(res);
//       if (response.data.isSuccess && response.data.req_list_result) {
//         setLeaveData(response.data.req_list_result);
//       } else {
//         setLeaveData([]);
//       }
//     } catch (err) {
//       console.log('Error fetching leave data', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getFilteredData = () => {
//     if (selectedFilter === 'all') return leaveData;
//     return leaveData.filter(item =>
//       item.leave_appln_type?.toLowerCase() === selectedFilter
//     );
//   };

//   const getStatusBackgroundColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return '#4CAF50';
//       case 'pending':
//         return '#FFC107';
//       case 'rejected':
//         return '#F44336';
//       default:
//         return '#149f6eff';
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       setIsLoading(true);
//       getleaverequestData();
//     }, [])
//   );

//   if (isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#3c58e8" />
//         <Text style={{ marginTop: 10, fontFamily: 'Poppins-Regular' }}>Loading...</Text>
//       </View>
//     );
//   }

//   // ✅ Group leaveData by from_date
//   const groupByDate = (data) => {
//     return data.reduce((groups, item) => {
//       const dateKey = item.from_date || 'Unknown Date';
//       if (!groups[dateKey]) groups[dateKey] = [];
//       groups[dateKey].push(item);
//       return groups;
//     }, {});
//   };

//   const groupedLeaves = groupByDate(getFilteredData());
//   const sortedDates = Object.keys(groupedLeaves).sort((a, b) => new Date(b) - new Date(a)); // latest first

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#830009' }}>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <MaterialIcons name="arrow-back" size={25} style={styles.backArrow} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Leave Request</Text>
//         </View>

//         {/* Top bar */}
//         <View style={styles.topBar}>
//           <Text style={styles.header1}>Leaves</Text>
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//             <TouchableOpacity
//               style={styles.fab}
//               onPress={() => navigation.navigate('Newleave', { orgid, studentId, mobile })}
//             >
//               <Text style={styles.plus}>Apply Leave</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Filter Tabs */}
//         <View style={styles.tabsContainer}>
//           {filters.map(filter => (
//             <TouchableOpacity
//               key={filter.key}
//               style={[styles.tab, selectedFilter === filter.key && styles.tabSelected]}
//               onPress={() => setSelectedFilter(filter.key)}
//             >
//               <Text
//                 style={{
//                   color: selectedFilter === filter.key ? '#221E1E' : '#A0A3BD',
//                   fontWeight: '600',
//                 }}
//               >
//                 {filter.label} ({getFilteredData().filter(f => filter.key === 'all' || f.leave_appln_type?.toLowerCase() === filter.key).length})
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* ✅ Date-wise grouped leave list */}
//         <ScrollView>
//           {sortedDates.map((date) => (
//             <View key={date}>
//               <Text style={{ fontSize: 16, fontWeight: '700', marginVertical: 10, marginLeft: 10, color: '#fff' }}>
//                 {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//               </Text>

//               {groupedLeaves[date].map((leave, idx) => (
//                 <View key={idx} style={styles.leaveCard}>
//                   <View style={styles.leaveLeft}>
//                     <Text style={styles.leaveType1}>{leave.leave_appln_type}</Text>
//                     <Text style={styles.leaveType}>{leave.leave_reason}</Text>
//                     <Text style={styles.leaveDate}>
//                       {leave.from_date} {leave.to_date} {leave.from_time} {leave.to_time}
//                     </Text>
//                     <Text
//                       style={[
//                         styles.leaveTag,
//                         { color: leave.tagColor, backgroundColor: leave.tagBg },
//                       ]}
//                     >
//                       {leave.leave_type}
//                     </Text>
//                   </View>
//                   <View style={styles.statusContainer}>
//                     <Text
//                       style={[
//                         styles.statusText,
//                         { backgroundColor: getStatusBackgroundColor(leave.status || leave.remark) },
//                       ]}
//                     >
//                       {leave.remark || leave.status}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LeavesScreen;
