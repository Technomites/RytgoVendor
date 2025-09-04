import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar
  
} from 'react-native';
import Colors from '../../Constants/Colors';
import AuthButton from '../../Components/UISupport/AuthButton';
import { useDispatch } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import *as AuthAction from "../../Store/Action/AuthAction"

const StartUpScreen = props => {
  const dispatch = useDispatch()

  const asyncHandler = async () => {
    const userData = await AsyncStorage.getItem('userData')
    const data = await JSON.parse(userData)
    if (data) {
      dispatch(AuthAction.saveUserInfoToRedux(data))
      // AsyncStorage.clear()
      props.navigation.replace("home")
    } else {
      props.navigation.replace("auth", {
        screen: "login"
      })
    }
  }

  return (
    <View style={Styles.mainContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={Styles.mainSubCont}>
        <Image
          style={{ height: 140, width: 200, resizeMode: 'contain' }}
          source={require('../../Assets/Images/logo.png')}
        />
      </View>
      <ImageBackground source={require("../../Assets/Images/buildingImageBg.png")} style={Styles.bgImageContainer}>
        <View style={Styles.subContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#191919", opacity: 0.8 }}>Welcome to</Text>
          <Image
            style={{ height: 40, width: 120, resizeMode: 'contain', marginTop: 5, marginBottom: 15 }}
            source={require('../../Assets/Images/logo.png')}
          />
          <AuthButton onPress={asyncHandler} title="GET STARTED" />

        </View>
      </ImageBackground>
    </View>
  );
};
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {

    width: "90%",
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  mainSubCont: {
    height: '45%',
    justifyContent: "center",
    alignItems: "center"
  }
});
export default StartUpScreen;
