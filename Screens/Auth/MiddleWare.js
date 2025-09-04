import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Colors from '../../Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthAction from '../../Store/Action/AuthAction';

import { useDispatch } from 'react-redux';

const MiddleWare = props => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   Listner();
  // }, []);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     alert(remoteMessage.data.Module);
  //     console.log('data  quit state Moddle ware:', remoteMessage.data.Module);

  //     //navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         alert(remoteMessage.data.Module);
  //         console.log(
  //           'data  quit state Moddle ware::',
  //           remoteMessage.data.Module,
  //         );

  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       //setLoading(false);
  //     });
  // }, []);

  useEffect(async () => {
    const userData = await AsyncStorage.getItem('userData');
    const getStarted = await AsyncStorage.getItem('getStarted');
    const data = await JSON.parse(userData);
    const getStartedJson = await JSON.parse(getStarted);


    if (data) {
      dispatch(AuthAction.saveUserInfoToRedux(data));
      // AsyncStorage.clear()
      props.navigation.replace('home');
    } else {
      props.navigation.replace('auth', {
        screen: 'login',
      });
    }

    // if (getStartedJson) {
    //   if (data) {
    //     dispatch(AuthAction.saveUserInfoToRedux(data));
    //     // AsyncStorage.clear()
    //     props.navigation.replace('home');
    //   } else {
    //     props.navigation.replace('auth', {
    //       screen: 'login',
    //     });
    //   }
    // } else {
    //   await AsyncStorage.setItem('getStarted', 'true');
    //   props.navigation.replace('startUp');
    // }
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color={Colors.blue} />
    </View>
  );
};
export default MiddleWare;
