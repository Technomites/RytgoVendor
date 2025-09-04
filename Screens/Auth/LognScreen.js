import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StatusBar,

} from 'react-native';
import Colors from '../../Constants/Colors';
import AuthButton from '../../Components/UISupport/AuthButton';
import MyFormInput from '../../Components/UISupport/MyFormInput';
import * as AuthAction from '../../Store/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NetWorkActioin from '../../Store/Action/NewqorkReqActon';

import * as DataAction from '../../Store/Action/DataAction';
import { FontFamily } from '../../Assets/Fonts';
import MyFormInputTile from '../../Components/UISupport/MyFormInputTile';

const LoginScreen = props => {
  const loader = useSelector(state => state.auth.loader);
  const loginErroMessage = useSelector(state => state.auth.loginErroMessage);
  const userData = useSelector(state => state.auth.userInfo);
  const request = useSelector(state => state.network.requestFail);

  const [secure, setSecure] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState(DeviceInfo.getUniqueId());

  const [errorModal, setErrorModal] = useState(false);
  const [reqModal, setReqModal] = useState(false);

  const userInformation = useSelector(state => state.data.userProfile);

  // const [fbTOken, setFbToken] = useState("")

  const dispatch = useDispatch();
  const saveDataIntoStorage = userData => {
    AsyncStorage.setItem('userData', JSON.stringify(userData));
  };
  useEffect(() => {
    if (loginErroMessage) {
      setErrorModal(true);
    }
  }, [loginErroMessage]);





  useEffect(() => {
    if (request) {
      setReqModal(true);
    }
  }, [request]);

  const loginHandler = async () => {
    dispatch(AuthAction.clearUserInfoToRedux());
    await AsyncStorage.removeItem('userData');

    if (email !== '') {
      dispatch(AuthAction.UserLogin(email, password, deviceId));
    } else {

    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      bounces={false}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      showsVerticalScrollIndicator={false}
      style={Styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAvoidingView>
        <SafeAreaView>
          <View
            resizeMode="stretch"
            style={{
              height: 200,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 100, width: 200, resizeMode: 'contain' }}
              source={require('../../Assets/Images/logo.png')}
            />
          </View>
          <View>
            <View
              style={{ width: '90%', marginHorizontal: 20, marginBottom: 20 }}>


              {/* Name */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 17, color: 'black', fontFamily: FontFamily.Medium, marginBottom: 5 }}>Email</Text>


                <MyFormInputTile
                  value={email}
                  onChangeText={text => setEmail(text)}
                  placeHolder="Enter email here"
                />
              </View>

              {/*  Password */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 17, color: 'black', fontFamily: FontFamily.Medium, marginBottom: 5 }}>Password</Text>
                <MyFormInputTile
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeHolder="Enter password here"
                  secure={secure ? true : false}
                  onIconPress={() => setSecure(prev => !prev)}
                  iconName={!secure ? 'eye' : 'eye-off'}
                />
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    height: 50,
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>

                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('forgotPassword');
                  }}
                  style={{
                    height: 50,
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: Colors.blue,
                      fontFamily: FontFamily.Bold,
                      left: "10%"

                    }}>
                    FORGOT PASSWORD
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 20 }}>
                {loader ? (
                  <ActivityIndicator size="large" color={Colors.blue} />
                ) : (
                  <AuthButton
                    disabled={
                      email.length === 0 || password.length === 0 ? true : false
                    }
                    onPress={loginHandler}
                    title="LOGIN"
                  />
                )}
              </View>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('signUp')}
                style={{
                  height: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 17, color: Colors.black, fontFamily: FontFamily.Bold }}>
                  Don't have an account?
                </Text>
                <Text
                  style={{
                    fontSize: 14,

                    color: Colors.blue,
                    fontFamily: FontFamily.Bold
                  }}>
                  BECOME A VENDOR?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <Text
                style={{ fontSize: 17, fontFamily: FontFamily.Regular }}
              >
                Powered By
              </Text>
              <Image
                style={{
                  height: 50,
                  width: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../Assets/Images/logo.png')}
              />

            </View>
          </View>
        </SafeAreaView>
        <PopUpModel
          visible={errorModal}
          message={loginErroMessage}
          onPress={() => setErrorModal(false)}
        />
        <PopUpModel
          visible={reqModal}
          message="Newwork request Failed"
          onPress={() => {
            dispatch(NetWorkActioin.networkReqActioin());
            setReqModal(false);
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default LoginScreen;
