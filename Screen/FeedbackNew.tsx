

// NewFeedback.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../root/config";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
// import { useNavigation, useRoute } from "@react-navigation/native";

interface FeedbackNewScreenProps {
  route: any
  navigation: any
}

const FeedbackNewScreen: React.FC<FeedbackNewScreenProps> = ({ route, navigation }) => {
  // const navigation = useNavigation<any>();
  const { orgid, studentId, mobile } = route.params || {};

  const [feedTitle, setFeedTitle] = useState("");
  const [feedDesc, setFeedDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<any>({});

  const [errorFeedTitle, setErrorFeedTitle] = useState(false);
  const [errorFeedDesc, setErrorFeedDesc] = useState(false);

  // Fetch Student Profile
  const getStudentData = async () => {
    setLoading(true);
    try {
      const storedMobile = await AsyncStorage.getItem("mobile");
      const mobileNo = storedMobile || mobile;

      const url = `https://www.vtsmile.in/app/api/students/students_profile_data_api?orgId=${orgid}&studeId=${studentId}&mobile_no=${mobileNo}`;
      const res = await axios.post(url);

      if (res.data.isSuccess && res.data.studDetails?.length) {
        const details = res.data.studDetails[0];
        setStudent(details);
      } else {
        Alert.alert("Error", "Student details not found.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setFeedDesc('');
      setFeedTitle('')
    }, [])
  );


  // Save Feedback
  const saveFeedback = async () => {
    if (!feedTitle.trim() || !feedDesc.trim()) {
      setErrorFeedTitle(!feedTitle.trim());
      setErrorFeedDesc(!feedDesc.trim());
      return;
    }

    try {
      setLoading(true);
      const staffId = student?.staff_id ?? "";

      const data = {
        orgId: orgid,
        studId: studentId,
        mobile_no: mobile,
        staff_Id: staffId,
        title: feedTitle,
        message: feedDesc,
      }
 

      const url = `https://www.vtsmile.in/app/api/students/students_feedback_save?orgId=${orgid}&studId=${studentId}&mobile_no=${mobile}&staff_Id=${staffId}&title=${feedTitle}&message=${feedDesc}`;
  
      await axios.post(url, data)

      // Alert.alert("Success", "Feedback sent successfully!");
      navigation.navigate("Feedback", {
        orgid,
        studentId,
        mobile,
      });
      showMessage({
        message: "Success",
        description: "Feedback sent successfully!",
        type: "success",
        backgroundColor: "#28A745",
        color: "#FFFFFF",
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to send feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6e44ac" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#7c43bd'}}>
      <View style={styles.container}>
        {/* Student Info */}

        <View style={styles.header}>

          <TouchableOpacity onPress={() => navigation.navigate("Feedback", { orgid, studentId, mobile })}>
            <Icon name="arrow-back" size={26} color="#fff" style={styles.backBtn} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Feedback</Text>
        </View>

        <View style={styles.headerBox}>
          <Text style={styles.name}>{student?.stud_name?.toUpperCase()}</Text>
          <Text style={styles.subText}>
            Class: {student?.std_name} {student?.section} | Roll No:{" "}
            {student?.rollNo}
          </Text>
        </View>

        {/* Feedback Form */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="list" size={25} color="#2e2a2aff" />
            <Text style={styles.heading}>New Feedback</Text>
          </View>


          <TextInput
            style={[styles.input, errorFeedTitle && styles.errorInput]}
            placeholderTextColor={'black'}
            placeholder="Title"
            value={feedTitle}
            onChangeText={(t) => {
              setFeedTitle(t);
              setErrorFeedTitle(false);
            }}
          />
          {errorFeedTitle && (
            <Text style={styles.errorText}>Please enter feedback title!</Text>
          )}

          <TextInput
            style={[styles.input, styles.textArea, errorFeedDesc && styles.errorInput]}
            placeholderTextColor={'black'}
            placeholder="Description"
            multiline
            numberOfLines={6}
            value={feedDesc}
            onChangeText={(t) => {
              setFeedDesc(t);
              setErrorFeedDesc(false);
            }}
          />
          {errorFeedDesc && (
            <Text style={styles.errorText}>
              Please enter your thoughts/description
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={saveFeedback}>
            <Text style={styles.buttonText}>SEND NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackNewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', width: "100%", },
  headerBox: {
    // backgroundColor: "#886BB6",
    // borderBottomColor: "#8B0000",
    // borderBottomWidth: 3,
    // alignItems: "center",
    // paddingVertical: 20,
    backgroundColor: '#7c43bd',
    padding: 15, width: '95%', marginLeft: 10,
    borderRadius: 10, marginTop: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7c43bd', padding: 16,
  },
  backBtn: { marginLeft: 10, },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 80,
    fontFamily: fonts.FONT_BOLD,
    textAlign: 'center',
  },
  name: {
    color: "white",
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 1,
  },
  subText: {
    color: "white",
    fontSize: 14,
    marginTop: 6,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  card: {
    height: 370,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#7b4fc9'
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.FONT_BOLD,
    marginBottom: 10,
    marginLeft: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6E44AC",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
