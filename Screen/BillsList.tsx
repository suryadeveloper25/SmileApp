// import React, { useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fonts } from '../root/config';

// // ─── Responsive helpers ──────────────────────────────────────────────────────
// const { width, height } = Dimensions.get('window');

// const BASE_WIDTH = 360;
// const scale = width / BASE_WIDTH;
// const normalize = (size: number) => Math.round(size * scale);

// const wp = (pct: number) => (width * pct) / 100;
// const hp = (pct: number) => (height * pct) / 100;

// const clamp = (val: number, min: number, max: number) =>
//   Math.min(Math.max(val, min), max);

// // ─── Design tokens ────────────────────────────────────────────────────────────
// const COLORS = {
//   primary: '#6A1B9A',
//   primaryDark: '#6A1B9A',
//   primaryLight: '#ffffff',
//   accent: '#EC4899',
//   textPrimary: '#1E1B4B',
//   textSecondary: '#6B7280',
//   shadow: 'rgba(124, 58, 237, 0.18)',
// };

// // ─── Interfaces ───────────────────────────────────────────────────────────────
// interface BillData {
//   billNo: string;
//   billDate: string;
//   amount: string;
//   orgId: string;
// }

// interface BillsListScreenProps {
//   route: any;
//   navigation: any;
// }

// interface StudentData {
//   id: string;
//   name: string;
//   std: string;
//   section: string;
//   roll: string;
// }

// // ─── Component ────────────────────────────────────────────────────────────────
// const BillsListScreen: React.FC<BillsListScreenProps> = ({ route, navigation }) => {
//   // ✅ FIX 1: Validate route params exist
//   const { bills = [], orgid, studentId, studentData } = route?.params || {};

//   // Validate required params
//   if (!orgid || !studentId) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Receipts</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Error: Missing required parameters</Text>
//           <TouchableOpacity
//             style={styles.retryBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.retryBtnText}>Go Back</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   /**
//    * Navigate to bill details screen
//    */
//   const handleBillPress = (bill: BillData) => {
//     // ✅ FIX 2: Validate bill data before navigation
//     if (!bill || !bill.billNo || !bill.billDate) {
//       Alert.alert('Error', 'Invalid bill data');
//       return;
//     }

//     navigation.navigate('BillDetails', {
//       bill,
//       bills,                    // ✅ Pass bills array so we can go back with data
//       orgid,
//       studentId,
//       studentData,
//     });
//   };

//   const renderBillItem = ({ item, index }: { item: BillData; index: number }) => (
//     <TouchableOpacity
//       style={[
//         styles.billItem,
//         index % 2 === 0 && styles.billItemEven,
//       ]}
//       onPress={() => handleBillPress(item)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.billItemLeft}>
//         <View style={[styles.billDot, { backgroundColor: COLORS.primary }]} />
//         <View style={styles.billInfo}>
//           <Text style={styles.billNumber} numberOfLines={1}>
//             Bill No. {item.billNo}
//           </Text>
//           <Text style={styles.billDate}>{item.billDate}</Text>
//         </View>
//       </View>
//       <View style={styles.billItemRight}>
//         <Text style={styles.billAmount}>
//           ₹{parseFloat(item.amount || '0').toFixed(2)}
//         </Text>
//         <MaterialIcons
//           name="chevron-right"
//           size={normalize(20)}
//           color={COLORS.primary}
//         />
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             // ✅ FIX 3: Navigate back to FeesScreen with all data
//             onPress={() =>
//               navigation.navigate('Fees', {
//                 orgid,
//                 studentId,
//                 mobile: '',  // Add mobile if you have it from props
//                 studentData,
//               })
//             }
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Receipts</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {bills && bills.length > 0 ? (
//             <View style={styles.contentCard}>
//               <FlatList
//                 data={bills}
//                 keyExtractor={(_, i) => `bill-${i}`}
//                 renderItem={renderBillItem}
//                 scrollEnabled={false}
//                 style={{ paddingHorizontal: wp(4), paddingTop: hp(1) }}
//               />
//             </View>
//           ) : (
//             <View style={styles.emptyState}>
//               <View style={styles.emptyIconCircle}>
//                 <MaterialIcons
//                   name="description"
//                   size={normalize(52)}
//                   color={COLORS.primary}
//                 />
//               </View>
//               <Text style={styles.emptyTitle}>No Bills</Text>
//               <Text style={styles.emptySubtitle}>
//                 No bill receipts available yet.
//               </Text>
//             </View>
//           )}
//           <View style={{ height: hp(4) }} />
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.primaryDark,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     backgroundColor: '#e5e4e9',
//     paddingBottom: hp(2),
//   },
//   header: {
//     backgroundColor: COLORS.primaryDark,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.6),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: clamp(normalize(18), 15, 20),
//     fontFamily: fonts.FONT_BOLD,
//     letterSpacing: 0.5,
//   },
//   contentCard: {
//     paddingBottom: hp(10),
//     marginHorizontal: wp(4),
//     marginTop: hp(2),
//     borderRadius: normalize(20),
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     shadowColor: 'rgba(0,0,0,0.10)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   billItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: hp(1.5),
//     paddingHorizontal: wp(2),
//     borderRadius: normalize(10),
//     marginTop: hp(1),
//   },
//   billItemEven: {
//     backgroundColor: 'rgba(106, 27, 154, 0.04)',
//   },
//   billItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     gap: wp(3),
//   },
//   billDot: {
//     width: normalize(10),
//     height: normalize(10),
//     borderRadius: normalize(5),
//     flexShrink: 0,
//   },
//   billInfo: {
//     flex: 1,
//   },
//   billNumber: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//     marginBottom: 4,
//   },
//   billDate: {
//     fontSize: clamp(normalize(11), 10, 13),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billItemRight: {
//     alignItems: 'flex-end',
//     flexDirection: 'row',
//     gap: wp(2),
//   },
//   billAmount: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: wp(4),
//   },
//   errorText: {
//     fontSize: clamp(normalize(16), 14, 18),
//     color: '#EF4444',
//     textAlign: 'center',
//     marginBottom: hp(2),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   retryBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: wp(6),
//     paddingVertical: hp(1.5),
//     borderRadius: normalize(12),
//   },
//   retryBtnText: {
//     color: '#fff',
//     fontSize: clamp(normalize(14), 12, 16),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: hp(4),
//     paddingHorizontal: wp(6),
//     marginTop: hp(4),
//   },
//   emptyIconCircle: {
//     width: normalize(96),
//     height: normalize(96),
//     borderRadius: normalize(48),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: hp(1.5),
//     backgroundColor: '#F3E5FF',
//   },
//   emptyTitle: {
//     fontSize: clamp(normalize(20), 18, 24),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.textPrimary,
//     marginBottom: hp(0.8),
//   },
//   emptySubtitle: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textSecondary,
//     textAlign: 'center',
//     lineHeight: normalize(20),
//   },
// });

// export default BillsListScreen;

import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../root/config';

// ─── Responsive helpers ──────────────────────────────────────────────────────
const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 360;
const scale = width / BASE_WIDTH;
const normalize = (size: number) => Math.round(size * scale);

const wp = (pct: number) => (width * pct) / 100;
const hp = (pct: number) => (height * pct) / 100;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

// ─── Enhanced Design Tokens ────────────────────────────────────────────────────
const COLORS = {
  // Primary gradient palette - refined purple spectrum
  primary: '#6A1B9A',
  primaryDark: '#6A1B9A',
  primaryLight: '#8B5CF6',
  
  // Accent - vibrant teal for secondary actions
  accent: '#14B8A6',
  accentLight: '#2DD4BF',
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Text hierarchy
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Backgrounds
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F9FAFB',
  bgTertiary: '#F3F4F6',
  
  // Shadows & effects
  shadow: 'rgba(124, 58, 237, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.08)',
};

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface BillData {
  billNo: string;
  billDate: string;
  amount: string;
  orgId: string;
}

interface BillsListScreenProps {
  route: any;
  navigation: any;
}

interface StudentData {
  id: string;
  name: string;
  std: string;
  section: string;
  roll: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
const BillsListScreen: React.FC<BillsListScreenProps> = ({ route, navigation }) => {
  // ✅ FIX 1: Validate route params exist
  const { bills = [], orgid, studentId, studentData } = route?.params || {};

  // Validate required params
  if (!orgid || !studentId) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={normalize(24)}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bill Receipts</Text>
          <View style={{ width: normalize(40) }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: Missing required parameters</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Navigate to bill details screen
   */
  const handleBillPress = (bill: BillData) => {
    // ✅ FIX 2: Validate bill data before navigation
    if (!bill || !bill.billNo || !bill.billDate) {
      Alert.alert('Error', 'Invalid bill data');
      return;
    }

    navigation.navigate('BillDetails', {
      bill,
      bills,
      orgid,
      studentId,
      studentData,
    });
  };

  const renderBillItem = ({ item, index }: { item: BillData; index: number }) => (
    <TouchableOpacity
      style={[
        styles.billItem,
        index % 2 === 0 && styles.billItemAlt,
      ]}
      onPress={() => handleBillPress(item)}
      activeOpacity={0.6}
    >
      <View style={styles.billItemLeft}>
        {/* Status indicator badge */}
        <View style={styles.billStatusBadge}>
          <View style={styles.billStatusDot} />
        </View>
        
        <View style={styles.billTextContainer}>
          <Text style={styles.billNumber} numberOfLines={1}>
            Bill {item.billNo}
          </Text>
          <Text style={styles.billDate}>{item.billDate}</Text>
        </View>
      </View>

      <View style={styles.billItemRight}>
        <Text style={styles.billAmount}>
          ₹{parseFloat(item.amount || '0').toFixed(2)}
        </Text>
        <MaterialIcons
          name="chevron-right"
          size={normalize(22)}
          color={COLORS.textTertiary}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Enhanced Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Fees', {
                orgid,
                studentId,
                mobile: '',
                studentData,
              })
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={normalize(24)}
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Bill Receipts</Text>
            
          </View>
     
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {bills && bills.length > 0 ? (
            <View style={styles.contentCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>Recent Bills</Text>
              </View>
              
              <FlatList
                data={bills}
                keyExtractor={(_, i) => `bill-${i}`}
                renderItem={renderBillItem}
                scrollEnabled={false}
                style={{ paddingHorizontal: wp(3) }}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconCircle}>
                <MaterialIcons
                  name="receipt-long"
                  size={normalize(56)}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.emptyTitle}>No Bills Available</Text>
              <Text style={styles.emptySubtitle}>
                No bill receipts are available at the moment.
              </Text>
            </View>
          )}
          <View style={{ height: hp(3) }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  
  // Header Styles
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    paddingBottom: hp(2.2),
  },
  
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  
  headerTitle: {
    color: '#fff',
    fontSize: clamp(normalize(22), 20, 24),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.3,
    marginBottom: hp(0.3),
  },
  
  headerSubtitle: {
    color: COLORS.accentLight,
    fontSize: clamp(normalize(12), 11, 13),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.2,
  },

  // Scroll Content
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.bgSecondary,
    paddingBottom: hp(2),
  },

  // Content Card
  contentCard: {
    flex:1,
    marginHorizontal: wp(4),
    marginTop: hp(2.5),
    borderRadius: normalize(20),
    backgroundColor: "#ffffff",
    overflow:'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },

  cardHeader: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgTertiary,
  },

  cardHeaderTitle: {
    fontSize: clamp(normalize(16), 15, 18),
    fontFamily: fonts.FONT_BOLD,
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },

  // Bill Item Styles - Enhanced hierarchy
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(3),
    borderRadius:15,
    marginTop:20
  },

  billItemAlt: {
    backgroundColor: "rgba(224, 232, 235, 0.97)",
  },

  billItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp(3.5),
  },

  billStatusBadge: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accentLight + '20',
  },

  billStatusDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: COLORS.accent,
  },

  billTextContainer: {
    flex: 1,
  },

  billNumber: {
    fontSize: clamp(normalize(15), 14, 16),
    color: COLORS.textPrimary,
    fontFamily: fonts.FONT_BOLD,
    marginBottom: hp(0.5),
    letterSpacing: 0.2,
  },

  billDate: {
    fontSize: clamp(normalize(12), 11, 13),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.1,
  },

  billItemRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: wp(2.5),
    alignSelf: 'center',
  },

  billAmount: {
    fontSize: clamp(normalize(16), 15, 18),
    color: COLORS.primary,
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.3,
  },

  chevronIcon: {
    marginTop: hp(0.2),
    color:"#7d7a7a"
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },

  errorText: {
    fontSize: clamp(normalize(16), 14, 18),
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: hp(2),
    fontFamily: fonts.ROBOTO_BOLD,
  },

  retryBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: wp(8),
    paddingVertical: hp(1.6),
    borderRadius: normalize(12),
  },

  retryBtnText: {
    color: '#fff',
    fontSize: clamp(normalize(14), 13, 15),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.2,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: hp(5),
    paddingHorizontal: wp(6),
    marginTop: hp(5),
  },

  emptyIconCircle: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2.5),
    backgroundColor: COLORS.primary + '12',
  },

  emptyTitle: {
    fontSize: clamp(normalize(20), 18, 22),
    fontFamily: fonts.FONT_BOLD,
    color: COLORS.textPrimary,
    marginBottom: hp(1),
    letterSpacing: 0.2,
  },

  emptySubtitle: {
    fontSize: clamp(normalize(13), 12, 14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: normalize(20),
    fontFamily: fonts.ROBOTO_BOLD,
  },
});

export default BillsListScreen;