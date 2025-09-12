import React, { useEffect } from 'react';
import { View, Image, StatusBar, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../Constants/Colors';

import Video from 'react-native-video';
const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      screenManager();
    }, 3000);
  }, []);

  const screenManager = async () => {
    props.navigation.replace('middleWare')
  };
  return (
    <View
      style={styles.imageBackground}
    // source={require('../../shared/assets/backgroundImage.png')}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
      />
      <View style={styles.logoView}>
        <Image
          style={styles.logoStyle}
          source={require('../Assets/Images/logo.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;
export const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,

  },
  logoStyle: {
    height: "100%",
    width: "100%",
  },
  logoView: {
    width: "65%",
    height: "15%",
    // backgroundColor: "red",
  },
});