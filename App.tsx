/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './root/store';
import MainScreen from './Screen';
import usePushNotification from './Screen/PushNotification';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  usePushNotification()
	return (
		<Provider store={store}>
			<MainScreen />
			  <FlashMessage position="bottom" />
		</Provider>
	);
}

export default App;