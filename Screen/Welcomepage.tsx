import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../root/config';

const SmileWelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a11cb" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assest/VT-Technologies-Logo-White-SMILE.png')}
          style={styles.logo}
        />
        {/* <Text style={{letterSpacing:0.5,fontSize:24,fontWeight:'bold',color:'#fff',marginLeft:100,right:30,top:3}}>SMILE</Text> */}
      </View>

      <View style={styles.card}>
        <View style={styles.title}>
          <Image source={require('../assest/smile-logo.png')} style={styles.smile} />
        </View>
        <Text style={styles.subtitle}>Powered by VT Technologies</Text>

        <Image
          source={require('../assest/VT-SMILE-Get-Started.png')}
          style={styles.docsImage}
        />

        <Text style={styles.description}>
          A Comprehensive solution for efficient{'\n'}
          School Management System.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#6a11cb', '#c74aef']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SmileWelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 190,
    height: 100,
    top: 20,
    resizeMode: 'contain',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  smile: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 28,
  },
  emoji: {
    fontSize: 28,
    color: '#6a11cb',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 15,
    fontFamily: fonts.ROBOTO_MEDIUM
  },
  docsImage: {
    width: 250,
    height: 230,
    resizeMode: 'stretch',
    marginVertical: 30,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
    fontFamily: fonts.ROBOTO_MEDIUM,
    marginBottom: 30, letterSpacing: 0.5
  },
  button: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.ROBOTO_BOLD,
  },
});
