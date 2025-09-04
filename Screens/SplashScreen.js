import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';
const SplashScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Animatable.View
        animation="slideInDown"
        duration={1500}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: Colors.white,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../Assets/Images/lootie2.json')}
          autoPlay
          loop={false}
        // onAnimationFinish={() => getuserDeatils()}
        ></LottieView>
        {/* <Image
          style={{height: 150, width: 300, resizeMode: 'contain'}}
          source={require('../Assets/Images/logo.png')}
        /> */}
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
