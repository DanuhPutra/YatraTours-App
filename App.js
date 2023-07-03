import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import MainNavigator from './src/navigations/MainNavigator';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {profileReducer} from './store/reducers/LoginReducer';

const rootReducer = combineReducers({
  profileReducer: profileReducer,
});
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
