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

import IoIcon from '../../Components/Icon/IoIcon';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import { FontFamily } from '../../Assets/Fonts';
import MyFormInputTile from '../../Components/UISupport/MyFormInputTile';
import { BaseURL } from '../../Constants/BaseUrl';
const ForgotPassword = props => {
  const [successModal, setSuccessModat] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');

  const [reqModal, setReqModal] = useState(false);

  const [message, setMessage] = useState('');

  const submitHandler = async () => {
    console.log("forgot")
    if (email !== '') {
      console.log("forgot2")
      setLoader(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        EmailAddress: email,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${BaseURL}/api/v1/vendor/forgotpassword`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.status === 'success') {
            setMessage(result.message);
            setSuccessModat(true);
            setLoader(false);
          } else {
            setMessage(result.message);
            setReqModal(true);
            setLoader(false);
          }
        })
        .catch(error => console.log('error', error));
    } else {
      console.log('No');
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
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <KeyboardAvoidingView>
        <SafeAreaView>
          <View
            style={{
              height: 50,
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              <IoIcon name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View
            source={require('../../Assets/Images/authBgWhite.png')}
            resizeMode="stretch"
            style={{
              height: 250,
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
              <View style={{ height: 30, width: '100%', marginTop: 20 }}>
                <Text
                  style={{
                    color: Colors.headingColor,
                    fontFamily: FontFamily.Bold,
                    fontSize: 20,
                  }}>
                  Forgot Password
                </Text>
              </View>

              {/* Name */}

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 17, color: 'black', fontFamily: FontFamily.Medium, marginBottom: 5 }}>Password</Text>
                <MyFormInputTile
                  value={""}
                  onChangeText={text => setEmail(text)}
                  placeHolder="Enter emere here"


                />
              </View>


              <View style={{ marginVertical: 20 }}>
                {loader ? (
                  <ActivityIndicator size="large" color={Colors.blue} />
                ) : (
                  <AuthButton onPress={submitHandler} title="PROCEED" />
                )}
              </View>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('login')}
                style={{
                  height: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 15, color: Colors.black, fontFamily: FontFamily.Medium, }}>
                  Login with different account
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: FontFamily.Bold,
                    color: Colors.blue,
                  }}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <PopUpModel
          visible={reqModal}
          message={message}
          onPress={() => {
            setReqModal(false);
          }}
        />
        <SuccessModal
          title="Ok"
          modelOff={() => {
            setEmail('');
            setSuccessModat(false);
          }}
          msg={message}
          visible={successModal}
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
export default ForgotPassword;
