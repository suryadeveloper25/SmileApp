import { Platform, Dimensions, StatusBar } from 'react-native';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight;


// import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 390;   // base screen width (iPhone 12)
const guidelineBaseHeight = 844;  // base screen height (iPhone 12)

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;



export const wp = (percent: number) => (width * percent) / 100;
export const hp = (percent: number) => (height * percent) / 100;

export const normalize = (size: number) => {
  return size * (width / 375);   // Best for Android scaling
};
/*** Change ON DEV Start ***/

// export const API_URL = 'http://192.168.0.115:3002/';

/*** Change ON QA Start ***/

//  export const API_URL = 'https://qa-api.bookmyslot.io/';
// export const API_URL = 'https://qa-new-api.bookmyslot.io/';


/*** Change ON PROD Start ***/

//  export const API_URL = 'https://vtsmile.in/app/';


// export const WEBSITE_URL = 'APP_URL';

export const PRIMARY_COLOR = '#1a0049ff'; 
export const SECONDARY_COLOR = '#FAE075';
export const PRIMARY_FONT_COLOR = '#000000';
export const SECONDARY_BG_COLOR = '#E5E5E5';
export const PRIMARY_BG_COLOR = '#f2f0f0';
export const PRIMARY_HEADER_TEXT_COLOR = '#000000';
export const PRIMARY_HEADER_BG_COLOR = 'white';

export const fonts = {
    FONT_BOLD: 'Poppins-Bold',
    FONT_BOLD_ITALIC :'Poppins-BoldItalic',
    FONT_ITALIC: 'Poppins-Italic',
    FONT_LIGHT: 'Poppins-Light',
    FONT_LIGHT_ITALIC: 'Poppins-LightItalic',
    FONT_MEDIUM: 'Poppins-Medium',
    FONT_MEDIUM_ITALIC: 'Poppins-MediumItalic',
    FONT_REGULAR: 'Poppins-Regular',
    ROBOTO_BOLD: 'Roboto-Bold',
    ROBOTO_ITALIC: 'Roboto-Italic',
    ROBOTO_MEDIUM: 'Roboto-Medium',
    ROBOTO_REGULAR: 'Roboto-Regular',
    LATO_BOLD:'Lato-Bold',
    LATO_ITALIC: 'Lato-Italic',
    LATO_LIGHT: 'Lato-Light',
    LATO_MEDIUM: 'Lato-Medium',
    LATO_REGULAR: 'Lato-Regular',
    LATO_SEMIBOLD: 'Lato-Semibold',



}

