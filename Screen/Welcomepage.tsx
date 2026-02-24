// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { fonts } from '../root/config';

// const SmileWelcomeScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assest/VT-Technologies-Logo-White-SMILE.png')}
//           style={styles.logo}
//         />
//         {/* <Text style={{letterSpacing:0.5,fontSize:24,fontWeight:'bold',color:'#fff',marginLeft:100,right:30,top:3}}>SMILE</Text> */}
//       </View>

//       <View style={styles.card}>
//         <View style={styles.title}>
//           <Image source={require('../assest/smile-logo.png')} style={styles.smile} />
//         </View>
//         <Text style={styles.subtitle}>Powered by VT Technologies</Text>

//         <Image
//           source={require('../assest/VT-SMILE-Get-Started.png')}
//           style={styles.docsImage}
//         />

//         <Text style={styles.description}>
//           A Comprehensive solution for efficient{'\n'}
//           School Management System.
//         </Text>

//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
//           <LinearGradient
//             colors={['#6a11cb', '#c74aef']}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.buttonText}>Get Started</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// };

// export default SmileWelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   logo: {
//     width: 190,
//     height: 100,
//     top: 20,
//     resizeMode: 'contain',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 24,
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   smile: {
//     color: '#FF6B6B',
//     fontWeight: 'bold',
//     fontSize: 28,
//   },
//   emoji: {
//     fontSize: 28,
//     color: '#6a11cb',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginTop: 15,
//     fontFamily: fonts.ROBOTO_MEDIUM
//   },
//   docsImage: {
//     width: 250,
//     height: 230,
//     resizeMode: 'stretch',
//     marginVertical: 30,
//   },
//   description: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#333',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     marginBottom: 30, letterSpacing: 0.5
//   },
//   button: {
//     width: '100%',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   buttonGradient: {
//     paddingVertical: 15,
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
// });



import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../root/config';

const { width, height } = Dimensions.get('window');

// ─── Responsive scale ─────────────────────────────────────────────────────────
const BASE = 375;
const scale = (n: number) => Math.round((width / BASE) * n);
const vscale = (n: number) => Math.round((height / 812) * n);
const sp = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.2);

// ─── Design Tokens ────────────────────────────────────────────────────────────
const GRAD_TOP = '#6A11CB';
const GRAD_BOTTOM = '#2575FC';
const GRAD_BTN = ['#6A11CB', '#C74AEF'];

const SmileWelcomeScreen = () => {
  const navigation = useNavigation<any>();

  // ── Disable Android hardware back button on welcome screen ───────────────
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true; // returning true blocks the back action
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  // ── Prevent swipe-back gesture on iOS & hide header back button ─────────
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,       // removes header back button
      gestureEnabled: false,        // disables iOS swipe-back gesture
    });
  }, [navigation]);

  // ── Entrance animations ──────────────────────────────────────────────────
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslate = useRef(new Animated.Value(-30)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(60)).current;
  const imgScale = useRef(new Animated.Value(0.85)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo slides in from top
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(logoTranslate, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
      ]),
      // Card rises up
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(cardTranslate, { toValue: 0, tension: 50, friction: 9, useNativeDriver: true }),
      ]),
      // Illustration bounces in
      Animated.spring(imgScale, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
      // Button fades in last
      Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  // ── Image dimensions responsive ───────────────────────────────────────────
  const illustrationSize = Math.min(width * 0.72, 280);
  const logoH = vscale(90);
  const logoW = scale(180);

  return (
    <LinearGradient colors={[GRAD_TOP, GRAD_BOTTOM]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={GRAD_TOP} translucent />

      {/* ── Top gradient area: logo + decorative circles ── */}
      <View style={styles.topArea}>
        {/* Decorative blobs */}
        <View style={[styles.blob, styles.blobTopRight]} />
        <View style={[styles.blob, styles.blobBottomLeft]} />

        <SafeAreaView edges={['top']}>
          <Animated.View
            style={[
              styles.logoContainer,
              { opacity: logoOpacity, transform: [{ translateY: logoTranslate }] },
            ]}
          >
            <Image
              source={require('../assest/VT-Technologies-Logo-White-SMILE.png')}
              style={[styles.logo, { width: logoW, height: logoH }]}
              resizeMode="contain"
            />
            {/* Version tag */}
            {/* <View style={styles.versionTag}>
              <Text style={styles.versionText}>v2.0</Text>
            </View> */}
          </Animated.View>
        </SafeAreaView>
      </View>

      {/* ── White card ── */}
      <Animated.View
        style={[
          styles.card,
          { opacity: cardOpacity, transform: [{ translateY: cardTranslate }] },
        ]}
      >
        {/* Smile logo */}
        <View style={styles.smileRow}>
          <Image
            source={require('../assest/smile-logo.png')}
            style={styles.smileLogo}
            resizeMode="contain"
          />
        </View>

        {/* Powered by */}
        <View style={styles.poweredRow}>
          <View style={styles.poweredDot} />
          <Text style={styles.poweredText}>Powered by VT Technologies</Text>
          <View style={styles.poweredDot} />
        </View>

        {/* Illustration */}
        <Animated.Image
          source={require('../assest/VT-SMILE-Get-Started.png')}
          style={[
            styles.illustration,
            {
              width: illustrationSize,
              height: illustrationSize * 0.88,
              transform: [{ scale: imgScale }],
            },
          ]}
          resizeMode="contain"
        />

        {/* Description */}
        <Text style={styles.description}>
          A comprehensive solution for efficient{'\n'}School Management.
        </Text>

        {/* Feature chips */}
        {/* <View style={styles.chipsRow}>
          {['Attendance', 'Homework', 'Reports'].map(label => (
            <View key={label} style={styles.chip}>
              <Text style={styles.chipText}>{label}</Text>
            </View>
          ))}
        </View> */}

        {/* CTA Button */}
        <Animated.View style={[styles.btnWrapper, { opacity: btnOpacity }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
            style={styles.btnTouchable}
          >
            <LinearGradient
              colors={GRAD_BTN}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Get Started</Text>
              <View style={styles.btnArrow}>
                <Text style={styles.btnArrowText}>›</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom note */}
        {/* <Text style={styles.bottomNote}>
          Trusted by 500+ schools across India
        </Text> */}
      </Animated.View>
    </LinearGradient>
  );
};

export default SmileWelcomeScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ── Top gradient section ──
  topArea: {
    flex: 0,
    paddingBottom: sp(10),
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  blobTopRight: {
    width: scale(180),
    height: scale(180),
    top: -scale(60),
    right: -scale(40),
  },
  blobBottomLeft: {
    width: scale(120),
    height: scale(120),
    bottom: -scale(30),
    left: -scale(20),
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: vscale(20),
    paddingBottom: vscale(10),
  },
  logo: {
    // width & height set inline
  },
  versionTag: {
    marginTop: sp(8),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: sp(20),
    paddingHorizontal: sp(12),
    paddingVertical: sp(3),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  versionText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: sp(11),
    fontFamily: fonts.ROBOTO_MEDIUM,
    letterSpacing: 1,
  },

  // ── Card ──
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: sp(32),
    borderTopRightRadius: sp(32),
    paddingHorizontal: sp(24),
    paddingTop: sp(24),
    paddingBottom: sp(16),
    alignItems: 'center',
    // Subtle top shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    elevation: 10,
  },

  // ── Smile logo row ──
  smileRow: {
    alignItems: 'center',
    marginBottom: sp(8),
  },
  smileLogo: {
    width: scale(140),
    height: sp(44),
  },

  // ── Powered by ──
  poweredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sp(6),
    marginBottom: sp(18),
  },
  poweredDot: {
    width: sp(4),
    height: sp(4),
    borderRadius: sp(2),
    backgroundColor: '#D1C4E9',
  },
  poweredText: {
    fontSize: sp(12),
    color: '#9E8CA8',
    fontFamily: fonts.ROBOTO_MEDIUM,
    letterSpacing: 0.3,
  },

  // ── Illustration ──
  illustration: {
    // width & height set inline
    marginBottom: sp(16),
  },

  // ── Description ──
  description: {
    textAlign: 'center',
    fontSize: sp(15),
    color: '#444',
    fontFamily: fonts.ROBOTO_MEDIUM,
    lineHeight: sp(24),
    letterSpacing: 0.3,
    marginBottom: sp(16),
  },

  // ── Feature chips ──
  chipsRow: {
    flexDirection: 'row',
    gap: sp(8),
    marginBottom: sp(24),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#F3E5F5',
    borderRadius: sp(20),
    paddingHorizontal: sp(14),
    paddingVertical: sp(5),
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  chipText: {
    fontSize: sp(12),
    color: '#6A1B9A',
    fontFamily: fonts.ROBOTO_MEDIUM,
  },

  // ── CTA Button ──
  btnWrapper: {
    width: '100%',
    marginBottom: sp(16),
  },
  btnTouchable: {
    width: '100%',
    borderRadius: sp(14),
    overflow: 'hidden',
    shadowColor: '#6A11CB',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sp(16),
    borderRadius: sp(14),
  },
  btnText: {
    color: '#fff',
    fontSize: sp(16),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.5,
  },
  btnArrow: {
    marginLeft: sp(8),
    width: sp(24),
    height: sp(24),
    borderRadius: sp(12),
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnArrowText: {
    color: '#fff',
    fontSize: sp(18),
    fontFamily: fonts.ROBOTO_BOLD,
    lineHeight: sp(22),
  },

  // ── Bottom note ──
  bottomNote: {
    fontSize: sp(11),
    color: '#BDBDBD',
    fontFamily: fonts.ROBOTO_MEDIUM,
    letterSpacing: 0.2,
  },
});
// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fonts } from '../root/config';

// const { width, height } = Dimensions.get('window');

// // ─── Responsive scale ─────────────────────────────────────────────────────────
// const BASE = 375;
// const scale  = (n: number) => Math.round((width / BASE) * n);
// const vscale = (n: number) => Math.round((height / 812) * n);
// const sp     = (n: number) => Math.min(Math.max(scale(n), n * 0.78), n * 1.2);

// // ─── Design Tokens ────────────────────────────────────────────────────────────
// const GRAD_TOP    = '#6A11CB';
// const GRAD_BOTTOM = '#2575FC';
// const GRAD_BTN    = ['#6A11CB', '#C74AEF'];

// const SmileWelcomeScreen = () => {
//   const navigation = useNavigation<any>();

//   // ── Entrance animations ──────────────────────────────────────────────────
//   const logoOpacity   = useRef(new Animated.Value(0)).current;
//   const logoTranslate = useRef(new Animated.Value(-30)).current;
//   const cardOpacity   = useRef(new Animated.Value(0)).current;
//   const cardTranslate = useRef(new Animated.Value(60)).current;
//   const imgScale      = useRef(new Animated.Value(0.85)).current;
//   const btnOpacity    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       // Logo slides in from top
//       Animated.parallel([
//         Animated.timing(logoOpacity,   { toValue: 1, duration: 600, useNativeDriver: true }),
//         Animated.spring(logoTranslate, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
//       ]),
//       // Card rises up
//       Animated.parallel([
//         Animated.timing(cardOpacity,   { toValue: 1, duration: 500, useNativeDriver: true }),
//         Animated.spring(cardTranslate, { toValue: 0, tension: 50, friction: 9, useNativeDriver: true }),
//       ]),
//       // Illustration bounces in
//       Animated.spring(imgScale, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
//       // Button fades in last
//       Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   // ── Image dimensions responsive ───────────────────────────────────────────
//   const illustrationSize = Math.min(width * 0.72, 280);
//   const logoH = vscale(90);
//   const logoW = scale(180);

//   return (
//     <LinearGradient colors={[GRAD_TOP, GRAD_BOTTOM]} style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={GRAD_TOP} translucent />

//       {/* ── Top gradient area: logo + decorative circles ── */}
//       <View style={styles.topArea}>
//         {/* Decorative blobs */}
//         <View style={[styles.blob, styles.blobTopRight]} />
//         <View style={[styles.blob, styles.blobBottomLeft]} />

//         <SafeAreaView edges={['top']}>
//           <Animated.View
//             style={[
//               styles.logoContainer,
//               { opacity: logoOpacity, transform: [{ translateY: logoTranslate }] },
//             ]}
//           >
//             <Image
//               source={require('../assest/VT-Technologies-Logo-White-SMILE.png')}
//               style={[styles.logo, { width: logoW, height: logoH }]}
//               resizeMode="contain"
//             />
//             {/* Version tag */}
//             {/* <View style={styles.versionTag}>
//               <Text style={styles.versionText}>v2.0</Text>
//             </View> */}
//           </Animated.View>
//         </SafeAreaView>
//       </View>

//       {/* ── White card ── */}
//       <Animated.View
//         style={[
//           styles.card,
//           { opacity: cardOpacity, transform: [{ translateY: cardTranslate }] },
//         ]}
//       >
//         {/* Smile logo */}
//         <View style={styles.smileRow}>
//           <Image
//             source={require('../assest/smile-logo.png')}
//             style={styles.smileLogo}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Powered by */}
//         <View style={styles.poweredRow}>
//           <View style={styles.poweredDot} />
//           <Text style={styles.poweredText}>Powered by VT Technologies</Text>
//           <View style={styles.poweredDot} />
//         </View>

//         {/* Illustration */}
//         <Animated.Image
//           source={require('../assest/VT-SMILE-Get-Started.png')}
//           style={[
//             styles.illustration,
//             {
//               width: illustrationSize,
//               height: illustrationSize * 0.88,
//               transform: [{ scale: imgScale }],
//             },
//           ]}
//           resizeMode="contain"
//         />

//         {/* Description */}
//         <Text style={styles.description}>
//           A comprehensive solution for efficient{'\n'}School Management.
//         </Text>

//         {/* Feature chips */}
//         {/* <View style={styles.chipsRow}>
//           {['Attendance', 'Homework', 'Reports'].map(label => (
//             <View key={label} style={styles.chip}>
//               <Text style={styles.chipText}>{label}</Text>
//             </View>
//           ))}
//         </View> */}

//         {/* CTA Button */}
//         <Animated.View style={[styles.btnWrapper, { opacity: btnOpacity }]}>
//           <TouchableOpacity
//             activeOpacity={0.85}
//             onPress={() => navigation.navigate('Login')}
//             style={styles.btnTouchable}
//           >
//             <LinearGradient
//               colors={GRAD_BTN}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.btnGradient}
//             >
//               <Text style={styles.btnText}>Get Started</Text>
//               <View style={styles.btnArrow}>
//                 <Text style={styles.btnArrowText}>›</Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Bottom note */}
//         {/* <Text style={styles.bottomNote}>
//           Trusted by 500+ schools across India
//         </Text> */}
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// export default SmileWelcomeScreen;

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   // ── Top gradient section ──
//   topArea: {
//     flex: 0,
//     paddingBottom: sp(10),
//     overflow: 'hidden',
//   },
//   blob: {
//     position: 'absolute',
//     borderRadius: 9999,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//   },
//   blobTopRight: {
//     width:  scale(180),
//     height: scale(180),
//     top:    -scale(60),
//     right:  -scale(40),
//   },
//   blobBottomLeft: {
//     width:  scale(120),
//     height: scale(120),
//     bottom: -scale(30),
//     left:   -scale(20),
//   },
//   logoContainer: {
//     alignItems: 'center',
//     paddingTop: vscale(20),
//     paddingBottom: vscale(10),
//   },
//   logo: {
//     // width & height set inline
//   },
//   versionTag: {
//     marginTop: sp(8),
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: sp(20),
//     paddingHorizontal: sp(12),
//     paddingVertical: sp(3),
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   versionText: {
//     color: 'rgba(255,255,255,0.85)',
//     fontSize: sp(11),
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     letterSpacing: 1,
//   },

//   // ── Card ──
//   card: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius:  sp(32),
//     borderTopRightRadius: sp(32),
//     paddingHorizontal: sp(24),
//     paddingTop: sp(24),
//     paddingBottom: sp(16),
//     alignItems: 'center',
//     // Subtle top shadow
//     shadowColor: '#000',
//     shadowOpacity: 0.12,
//     shadowOffset: { width: 0, height: -4 },
//     shadowRadius: 16,
//     elevation: 10,
//   },

//   // ── Smile logo row ──
//   smileRow: {
//     alignItems: 'center',
//     marginBottom: sp(8),
//   },
//   smileLogo: {
//     width:  scale(140),
//     height: sp(44),
//   },

//   // ── Powered by ──
//   poweredRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: sp(6),
//     marginBottom: sp(18),
//   },
//   poweredDot: {
//     width: sp(4),
//     height: sp(4),
//     borderRadius: sp(2),
//     backgroundColor: '#D1C4E9',
//   },
//   poweredText: {
//     fontSize: sp(12),
//     color: '#9E8CA8',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     letterSpacing: 0.3,
//   },

//   // ── Illustration ──
//   illustration: {
//     // width & height set inline
//     marginBottom: sp(16),
//   },

//   // ── Description ──
//   description: {
//     textAlign: 'center',
//     fontSize: sp(15),
//     color: '#444',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     lineHeight: sp(24),
//     letterSpacing: 0.3,
//     marginBottom: sp(16),
//   },

//   // ── Feature chips ──
//   chipsRow: {
//     flexDirection: 'row',
//     gap: sp(8),
//     marginBottom: sp(24),
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   chip: {
//     backgroundColor: '#F3E5F5',
//     borderRadius: sp(20),
//     paddingHorizontal: sp(14),
//     paddingVertical: sp(5),
//     borderWidth: 1,
//     borderColor: '#E1BEE7',
//   },
//   chipText: {
//     fontSize: sp(12),
//     color: '#6A1B9A',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//   },

//   // ── CTA Button ──
//   btnWrapper: {
//     width: '100%',
//     marginBottom: sp(16),
//   },
//   btnTouchable: {
//     marginTop:20,
//     width: '100%',
//     borderRadius: sp(14),
//     overflow: 'hidden',
//     shadowColor: '#6A11CB',
//     shadowOpacity: 0.35,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   btnGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: sp(16),
//     borderRadius: sp(14),
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: sp(16),
//     fontFamily: fonts.ROBOTO_BOLD,
//     letterSpacing: 0.5,
//   },
//   btnArrow: {
//     marginLeft: sp(8),
//     width:  sp(24),
//     height: sp(24),
//     borderRadius: sp(12),
//     backgroundColor: 'rgba(255,255,255,0.25)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnArrowText: {
//     color: '#fff',
//     fontSize: sp(18),
//     fontFamily: fonts.ROBOTO_BOLD,
//     lineHeight: sp(22),
//   },

//   // ── Bottom note ──
//   bottomNote: {
//     fontSize: sp(11),
//     color: '#BDBDBD',
//     fontFamily: fonts.ROBOTO_MEDIUM,
//     letterSpacing: 0.2,
//   },
// });