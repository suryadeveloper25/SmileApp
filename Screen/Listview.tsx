// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { fonts, hp, normalize, wp } from "../root/config";
// import { useNavigation } from "@react-navigation/native";
// const ITEM_HEIGHT = 70;

// const StopListScreen = ({ route }: any) => {
//   const { trackingData, busLocation, reachedStops } = route.params;
//   const navigation =useNavigation();
//   const busAnim = useRef(new Animated.Value(0)).current;
//   const [activeEtaIndex, setActiveEtaIndex] = useState<number | null>(null);
//   const MIN_PER_STOP = 3;


//   // 🚌 Smooth bus movement
//   useEffect(() => {
//     const nextIndex = trackingData.findIndex(
//       (_: any, i: number) => !reachedStops.includes(i)
//     );

//     if (nextIndex >= 0) {
//       Animated.timing(busAnim, {
//         toValue: nextIndex * ITEM_HEIGHT,
//         duration: 900,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [busLocation]);

// const currentStopIndex = trackingData.findIndex(
//   (_: any, i: number) => !reachedStops.includes(i)
// );

//   const renderItem = ({ item, index }: any) => {
//     const isReached = reachedStops.includes(index);

//     return (
//       <View style={styles.row}>
//         <View style={styles.timeline}>
//           <View
//             style={[
//               styles.dot,
//               isReached && styles.dotReached,
//             ]}
//           />
//           {index !== trackingData.length - 1 && (
//             <View style={styles.dashedLine} />
//           )}
//         </View>

//         {/* STOP NAME */}
//         <View style={styles.textContainer}>
//           <Text
//             style={[
//               styles.stopName,
//               isReached && styles.reachedText,
//             ]}
//           >
//             {item.stop_name}
//           </Text>
//                 {activeEtaIndex === index && index >= currentStopIndex && (
//   <Text style={styles.etaValue}>
//     Arriving in {(index - currentStopIndex) * MIN_PER_STOP} min
//   </Text>
// )}
//         </View>

//         {/* ETA BUTTON */}
//         <TouchableOpacity
//   style={styles.etaBtn}
//   onPress={() =>
//     setActiveEtaIndex(activeEtaIndex === index ? null : index)
//   }
// >
//   <Text style={styles.etaText}>ETA</Text>
// </TouchableOpacity>

//         {/* <TouchableOpacity style={styles.etaBtn}>
//           <Text style={styles.etaText}>ETA</Text>
//         </TouchableOpacity> */}

//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//     <View style={styles.header}>
//            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Route")}>
//              <Icon name="arrow-back" size={22} color="#fff" />
//            </TouchableOpacity>

//            <Text style={styles.headerTitle}>Bus Route</Text>
//          </View>

//       <Animated.View
//         style={[
//           styles.busIcon,
//           { transform: [{ translateY: busAnim }] },
//         ]}
//       >
//         <Text style={{ fontSize: 22 }}>🚌</Text>
//       </Animated.View>

//       <FlatList
//         data={trackingData}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingLeft: 20, paddingTop: 10 }}
//         getItemLayout={(_, index) => ({
//           length: ITEM_HEIGHT,
//           offset: ITEM_HEIGHT * index,
//           index,
//         })}
//       />


//     </View>
//   );
// };

// export default StopListScreen;


// const styles = StyleSheet.create({
//   row: {
//     height: ITEM_HEIGHT,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingRight: 12,
//   },
// etaValue: {
//   fontSize: 12,
//   color: "#ff6b00",
//   marginTop: 4,
// },

//   /* TIMELINE */
//   timeline: {
//     width: 30,
//     alignItems: "center",
//   },
//   dot: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     borderWidth: 3,
//     borderColor: "#2E7D32",
//     backgroundColor: "#fff",
//     zIndex: 2,
//   },
//     header: {
//       height: hp(7),
//       backgroundColor: "#7c43bd",
//       flexDirection: "row",
//       alignItems: "center",
//       paddingHorizontal: wp(4),
//     },

//     backBtn: { width: wp(10) },

//     headerTitle: {
//       flex: 1,
//       textAlign: "center",
//       fontSize: 18,
//       color: "#fff",
//       fontFamily: fonts.ROBOTO_BOLD,
//       right: wp(2)
//     },

//   dotReached: {
//     backgroundColor: "#2E7D32",
//   },
//   dashedLine: {
//     width: 2,
//     flex: 1,
//     borderStyle: "dashed",
//     borderWidth: 1,
//     borderColor: "#2E7D32",
//     marginTop: 2,
//   },

//   /* TEXT */
//   textContainer: {
//     flex: 1,
//     paddingLeft: 10,
//   },
//   stopName: {
//     fontSize: 15,
//     color: "#222",
//   },
//   reachedText: {
//     fontWeight: "bold",
//   },

//   /* ETA */
//   etaBtn: {
//     backgroundColor: "#2E7D32",
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   etaText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 13,
//   },

//   /* BUS */
//   busIcon: {
//     position: "absolute",
//     left: 5,
//    zIndex: 10,
//    marginTop:55,
//   },
// });


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fonts, hp, wp } from "../root/config";

const ITEM_HEIGHT = 70;
const MIN_PER_STOP = 3;

const StopListScreen = ({ route }: any) => {
  const { trackingData, busLocation, reachedStops } = route.params;
  const navigation = useNavigation();
  const busAnim = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  const [activeEtaIndex, setActiveEtaIndex] = useState<number | null>(null);

  /* ---------------------------------------------------
     STEP 1: FIND CURRENT STOP INDEX
  --------------------------------------------------- */
  const currentStopIndex = trackingData.findIndex(
    (_: any, i: number) => !reachedStops.includes(i)
  );

  /* ---------------------------------------------------
     STEP 2: PROGRESS CALCULATION
  --------------------------------------------------- */
  const getProgressBetweenStops = (
    bus: any,
    start: any,
    end: any
  ) => {
    const totalDistance = Math.hypot(
      end.latitude - start.latitude,
      end.longitude - start.longitude
    );

    const currentDistance = Math.hypot(
      bus.latitude - start.latitude,
      bus.longitude - start.longitude
    );

    if (totalDistance === 0) return 0;
    return Math.min(Math.max(currentDistance / totalDistance, 0), 1);
  };

  /* ---------------------------------------------------
     STEP 3: LIVE BUS MOVEMENT
  --------------------------------------------------- */
  useEffect(() => {
    if (
      currentStopIndex < 0 ||
      currentStopIndex >= trackingData.length - 1
    )
      return;

    const startStop = trackingData[currentStopIndex];
    const nextStop = trackingData[currentStopIndex + 1];

    const progress = getProgressBetweenStops(
      busLocation,
      startStop,
      nextStop
    );

    const yPosition =
      (currentStopIndex + progress) * ITEM_HEIGHT;

    Animated.timing(busAnim, {
      toValue: yPosition,
      duration: 600,
      useNativeDriver: true,
    }).start();

  }, [busLocation]);

  /* ---------------------------------------------------
     STEP 4: AUTO SCROLL LIST
  --------------------------------------------------- */
  useEffect(() => {
    if (currentStopIndex >= 0) {
      listRef.current?.scrollToIndex({
        index: currentStopIndex,
        animated: true,
        viewPosition: 0.4,
      });
    }
  }, [currentStopIndex]);

  /* ---------------------------------------------------
     RENDER EACH STOP
  --------------------------------------------------- */
  const renderItem = ({ item, index }: any) => {
    const isReached = reachedStops.includes(index);

    return (
      <View style={styles.row}>
        <View style={styles.timeline}>
          <View
            style={[
              styles.dot,
              isReached && styles.dotReached,
            ]}
          />
          {index !== trackingData.length - 1 && (
            <View style={styles.dashedLine} />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.stopName,
              isReached && styles.reachedText,
            ]}
          >
            {item.stop_name}
          </Text>

          {activeEtaIndex === index && index >= currentStopIndex && (
            <Text style={styles.etaValue}>
              Arriving in {(index - currentStopIndex) * MIN_PER_STOP} min
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.etaBtn}
          onPress={() =>
            setActiveEtaIndex(
              activeEtaIndex === index ? null : index
            )
          }
        >
          <Text style={styles.etaText}>ETA</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("Route")}
        >
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Route</Text>
      </View>

      {/* BUS ICON */}
      <Animated.View
        style={[
          styles.busIcon,
          { transform: [{ translateY: busAnim }] },
        ]}
      >
        <Text style={{ fontSize: 22 }}>🚌</Text>
      </Animated.View>

      {/* STOP LIST */}
      <FlatList
        ref={listRef}
        data={trackingData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: 20, paddingTop: 10 }}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

export default StopListScreen;

/* ---------------------------------------------------
   STYLES
--------------------------------------------------- */
const styles = StyleSheet.create({
  row: {
    height: ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
  etaValue: {
    fontSize: 12,
    color: "#ff6b00",
    marginTop: 4,
  },
  timeline: {
    width: 30,
    alignItems: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#2E7D32",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  dotReached: {
    backgroundColor: "#2E7D32",
  },
  dashedLine: {
    width: 2,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#2E7D32",
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  stopName: {
    fontSize: 15,
    color: "#222",
  },
  reachedText: {
    fontWeight: "bold",
  },
  etaBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  etaText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  busIcon: {
    position: "absolute",
    left: 5,
    zIndex: 10,
    marginTop: 55,
  },
  header: {
    height: hp(7),
    backgroundColor: "#7c43bd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  backBtn: { width: wp(10) },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: fonts.ROBOTO_BOLD,
    right: wp(2),
  },
});
