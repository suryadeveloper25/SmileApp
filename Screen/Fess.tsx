
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Divider } from 'react-native-paper';
import { fonts } from '../root/config';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get("window");

const wp = (percentage: number) => (width * percentage) / 100;
const hp = (percentage: number) => (height * percentage) / 100;

interface FeesScreenprops {
  route: any
  navigation: any
}

const FeesScreen: React.FC<FeesScreenprops> = ({ route, navigation }) => {
  const { orgid, studentId, mobile } = route?.params || {};
  const [activeTab, setActiveTab] = useState('Tuition');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileNo, setMobileNo] = useState('');

  const [studentData, setStudentData] = useState({
    id: '',
    name: '',
    std: '',
    section: '',
    group: '',
    roll: '',
    mobile: '',
    gender: '',
    medium: '',
    blood: '',
    email: '',
    dob: '',
    father: '',
    mother: '',
    aca: '',
    admission: '',
    teacher: '',
    address: '',
    imageURL: ''
  });

  const [pendingTutionFeeList, setPendingTutionFeeList] = useState([]);
  const [totalPending, setTotalPending] = useState('');
  const [pendingBusFeeList, setPendingBusFeeList] = useState([]);
  const [totalBusPending, setTotalBusPending] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // GET STUDENT DATA
  const getStudentData = async () => {
    try {
      const loggedInStatus = await AsyncStorage.getItem('isloggedIn');
      const storedMobile = await AsyncStorage.getItem('mobile');
      setLoggedIn(loggedInStatus === 'true');
      setMobileNo(storedMobile ?? '');

      const response = await axios.post(`https://www.vtsmile.in/app/api/students/students_profile_data_api`, null, {
        params: {
          orgId: orgid,
          studeId: studentId,
          mobile_no: storedMobile
        }
      });

      if (response.data.isSuccess && response.data.studDetails?.length) {
        const details = response.data.studDetails[0];
        setStudentData({
          id: studentId,
          name: details.stud_name,
          std: details.std_name,
          section: details.section,
          group: details.group_name,
          roll: details.rollNo,
          mobile: storedMobile,
          gender: details.gender,
          medium: details.medium,
          blood: details.blood_group,
          email: details.email_Id,
          dob: details.dob,
          father: details.father_name,
          mother: details.mother_name,
          aca: '',
          admission: '',
          teacher: details.staff_name,
          address: details.address,
          imageURL: details.photo_url
        });
      }
    } catch (error) {
      console.log('Error fetching student data:', error);
    }
  };

  // GET PENDING TUTION FEE
  const pendingTutionFeeData = async () => {
    try {
      const response = await axios.post(`https://www.vtsmile.in/app/api/students/fee_pending_api`, null, {
        params: {
          orgId: orgid,
          stuId: studentId
        }
      });
      // console.log('response.data.total_pending)--->', response.data.total_pending, 'response.data.fee_pending_dtl==>', response.data.fee_pending_dtl)
      if (response.data.isSuccess) {
        setTotalPending(response.data.total_pending);
        if (response.data.fee_pending_dtl) {
          setPendingTutionFeeList(response.data.fee_pending_dtl);
        } else {
          setErrorMsg('No Data Found!');
        }
      } else {
        setErrorMsg('No Data Found!');
      }
    } catch (error) {
      console.log('Error fetching tution fee:', error);
    }
  };

  // GET PENDING BUS FEE
  const pendingBusFeeData = async () => {
    try {
      const response = await axios.post(`https://www.vtsmile.in/app/api/students/bus_fee_pending_api`, null, {
        params: {
          orgId: orgid,
          stuId: studentId
        }
      });
      // console.log('response.data.bus_fee_pending_dtl=====>', response.data.bus_fee_pending_dtl, 'response.data.total_pending==>', response.data.total_pending)
      if (response.data.isSuccess && response.data.bus_fee_pending_dtl) {
        setTotalBusPending(response.data.total_pending);
        setPendingBusFeeList(response.data.bus_fee_pending_dtl);
      } else {
        setErrorMsg('No Data Found!');
      }
    } catch (error) {
      console.log('Error fetching bus fee:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStudentData();
      await pendingTutionFeeData();
      await pendingBusFeeData();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#7c43bd',marginBottom:-30 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Fee Payments</Text>

          </View>

          {/* Student Info Card */}
          <View style={styles.studentCard}>
            {/* <Text style={styles.stars}>★ ★ ★</Text> */}
            <Text style={styles.name}>{studentData.name}</Text>
            <Text style={styles.detail}>Std: {studentData.std} {studentData.section} Roll No: {studentData.roll}</Text>

          </View>

          {/* Tabs */}
          <View>


            <View style={styles.tabs}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'Tuition' && styles.tabActive,
                ]}
                onPress={() => setActiveTab('Tuition')}
              >
                <MaterialIcons name="payment" size={20} color={activeTab === 'Tuition' ? '#fff' : '#29292cff'} />
                <Text style={[styles.tabText, activeTab === 'Tuition' && styles.tabTextActive]}>Tuition Fee</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === 'Bus' && styles.tabActive,
                ]}
                onPress={() => setActiveTab('Bus')}
              >
                <MaterialIcons name="directions-bus" size={20} color={activeTab === 'Bus' ? '#fff' : '#0d0d0eff'} />
                <Text style={[styles.tabText, activeTab === 'Bus' && styles.tabTextActive]}>Bus Fee</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {activeTab === 'Tuition' && (
      <View style={styles.statusBox}>
        <FlatList
          data={pendingTutionFeeList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.feeItem}>
              <Text style={{marginRight:150,color:'black',fontWeight:'600'}}>{item.fee_type}</Text>
              <Text style={{right:40, color:'black',fontWeight:'600'}}> ₹{item.Amount}</Text>
                
            </View>
          )}
        />
         <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Total Pending Amount</Text>
          <Text style={styles.amountValue}>₹ {totalPending}</Text>
        </View>
        
         <Image source={require('../assest/smile-No-Data-Found-BG.png')}  style={{ width: 150, height: 150, alignSelf: 'center' }} />
        <Text style={styles.statusText}>You have no pending fees!</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Total Pending Amount</Text>
          <Text style={styles.amountValue}>₹ {totalPending}</Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
        <Text style={styles.swipeText}>→ Swipe to Bus Fee</Text>
      </View>
   )} */}
          {activeTab === 'Tuition' && (
            <View style={styles.statusBox}>
              {pendingTutionFeeList && pendingTutionFeeList.length > 0 ? (
                <>
                  <FlatList
                    data={pendingTutionFeeList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>
                          {item.fee_type}
                        </Text>
                        <Text style={styles.feeAmount}>
                          ₹ {item.Amount}
                        </Text>
                      </View>
                    )}
                  />
                  {/* Divider Line */}
                  <View style={styles.divider} />

                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Total Pending Amount</Text>
                    <Text style={styles.amountValue}>₹ {totalPending}</Text>
                  </View>
                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Image
                    source={require('../assest/smile-No-Data-Found-BG.png')}
                    style={{ width: 150, height: 150, alignSelf: 'center' }}
                  />
                  <Text style={styles.statusText}>You have no pending fees!</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Total Pending Amount</Text>
                    <Text style={styles.amountValue}>₹{totalPending}</Text>
                  </View>

                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {activeTab === 'Bus' && (
            <View style={[styles.statusBox, { backgroundColor: "#c5e5f6" }]}>
              {pendingBusFeeList && pendingBusFeeList.length > 0 ? (
                <>

                  <FlatList
                    data={pendingBusFeeList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLabel}>
                          {item.bus_fee_type}
                        </Text>
                        <Text style={styles.feeAmount}>
                          ₹ {item.amount} ({item.status})
                        </Text>
                      </View>
                    )}
                  />
                  {/* Divider Line */}
                  <View style={styles.divider} />

                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Total Pending Amount</Text>
                    <Text style={styles.amountValue}>₹ {totalBusPending}</Text>
                  </View>
                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Image source={require('../assest/smile-No-Data-Found-BG.png')} style={{ width: 150, height: 150, alignSelf: 'center' }} />
                  <Text style={styles.statusText}>You have no pending fees!</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Total Pending Amount</Text>
                    <Text style={styles.amountValue}>₹ {totalBusPending}</Text>
                  </View>

                  <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                  {/* <Text style={styles.swipeText}>→ Swipe to Bus Fee</Text> */}
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    height: hp(7),
    backgroundColor: '#7c43bd',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.FONT_BOLD,
    fontSize: wp(4.5),
    color: "#fff",
  },
  backBtn: { padding: wp(2) },
  studentCard: {
    backgroundColor: "#7c43bd",
    margin: wp(4),
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: "center",
  },
  name: { color: "#fff", fontSize: wp(4.5), fontFamily: fonts.FONT_BOLD, },
  detail: { color: "#f5f6fa", fontSize: wp(3.5), marginTop: hp(0.5), fontFamily: fonts.ROBOTO_BOLD, },
  tabs: {
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // marginVertical: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: hp(1.5),
    //  paddingHorizontal: wp(8),
    backgroundColor: 'purple',
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 7, height: 60
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderRadius: wp(3),
    backgroundColor: "#e8eaf6",
  },
  tabActive: { backgroundColor: "#ec0a7b" },
  tabText: { marginLeft: wp(2), fontSize: wp(3.8), fontFamily: fonts.FONT_BOLD, },
  tabTextActive: { color: "#fff", fontFamily: fonts.FONT_BOLD, },
  statusBox: {
    backgroundColor: "#f0f6c5",
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    padding: wp(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  feeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(0.8),
  },
  feeLabel: { color: "#000", fontSize: wp(3.8), fontFamily: fonts.ROBOTO_BOLD, },
  feeAmount: { color: "#000", fontFamily: fonts.FONT_BOLD, },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: hp(1.5),
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  amountLabel: { fontSize: wp(4), color: "#333", fontFamily: fonts.ROBOTO_BOLD, },
  amountValue: { fontSize: wp(4), color: "#EA4C89", fontFamily: fonts.FONT_BOLD, },
  payButton: {
    backgroundColor: "#6C63FF",
    borderRadius: wp(5),
    paddingVertical: hp(1.5),
    marginTop: hp(2.5),
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontFamily: fonts.FONT_BOLD,
    fontSize: wp(4),
  },
  statusText: {
    textAlign: "center",
    color: "#6C63FF",
    fontWeight: "700",
    marginVertical: hp(1.5),
  },
  noDataImage: {
    width: wp(40),
    height: hp(20),
    alignSelf: "center",
  },
});

export default FeesScreen;


