

import React, { useEffect, useSta, useState } from 'react';
import type { Node } from 'react';
import { Text } from "react-native"

import Navigator from './Navigator/Navigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AuthReducer from './Store/Reducer/AuthReducer';
import DataReducer from './Store/Reducer/DataReducer';
import SplashScreen from './Screens/SplashScreen';
import AddReducer from './Store/Reducer/AddReducer';
import NetworkRequesReducer from './Store/Reducer/NetworkRequesReducer';
import { useSelector } from 'react-redux';
import { NotificationListner } from "./Constants/NotificationListner"

import TestScreen from './Screens/TestScreen';

const App: () => Node = () => {
  const [splash, setSplash] = useState(true);

  const rootReducer = combineReducers({
    auth: AuthReducer,
    data: DataReducer,
    add: AddReducer,
    network: NetworkRequesReducer,
  });

  const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  useEffect(() => {
    // NotificationListner()
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }, [])
  useEffect(() => {
    setInterval(() => {
      setSplash(false);
    }, 4400);
  }, []);

  return (

    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
  // if (splash) {
  //   return <SplashScreen />;
  // } else {
  //   return (
  //     <Provider store={Store}>
  //       <Navigator />
  //     </Provider>
  //   );
  // }
};

export default App;
