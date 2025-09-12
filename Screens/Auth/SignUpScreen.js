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
  Touchable,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../Constants/Colors';
import AuthButton from '../../Components/UISupport/AuthButton';

import CheckBox from '@react-native-community/checkbox';
import * as AuthAction from '../../Store/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import IoIcon from '../../Components/Icon/IoIcon';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import { FontFamily } from '../../Constants/Fonts';
import MyFormInput from '../../Components/UISupport/MyFormInputTile';
import { Safeareacontext } from '../../Constants/SafeAreaContext';
const SignUpScreen = props => {
  const loader = useSelector(state => state.auth.loader);
  const resMessage = useSelector(state => state.auth.signUpMessage);
  const [secure, setSecure] = useState(true);
  const [ConSecure, setConSecure] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    conformPass: '',
  });

  const [message, setMessage] = useState();
  const [popUpModal, setPopUpModal] = useState(false);

  useEffect(() => {
    if (resMessage === 'Account created successfully') {
      setSuccessModal(true);
    } else if (resMessage) {
      setMessage(resMessage);
      setPopUpModal(true);
    }
  }, [resMessage]);

  const signUpHandler = () => {
    var passwordreg = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*/+(){}=!.<>|:-?_<>";'~`]{8,}$/,
    );
    if (
      formData.name.length === 0 ||
      formData.mobileNumber.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.conformPass.length === 0
    ) {
      setMessage('Input Field required');
      setPopUpModal(true);
    } else if (formData.password !== formData.conformPass) {
      setMessage("Password doesn't match");
      setPopUpModal(true);
    } else if (formData.mobileNumber.length > 9) {
      setMessage('Contact number should be 9 digit');
      setPopUpModal(true);
    } else if (formData.password !== formData.conformPass) {
      setMessage("Password doesn't match");
      setPopUpModal(true);
    } else if (passwordreg.test(formData.password) === false) {


      setMessage(
        'Min. 8 characters, at least one uppercase letter, one lowercase letter, and one number',
      );
      setPopUpModal(true);
    } else if (!toggleCheckBox) {
      setMessage('Please accept the Terms & Conditions');
      setPopUpModal(true);
    } else {
      setMessage(null);

      dispatch(
        AuthAction.UserSignUp(
          formData.name,
          `917${formData.mobileNumber}`,
          formData.email,
          formData.password,
        ),
      );
    }
    // dispatch(AuthAction.UserSignUp(formData))
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      style={Styles.mainContainer}>
      <SafeAreaView style={{
        paddingTop: Safeareacontext.top
        
      }}>
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

        <KeyboardAvoidingView>
          <View
            source={require('../../Assets/Images/authBgWhite.png')}
            resizeMode="stretch"
            style={{
              height: 150,
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

                    fontSize: 20,
                    fontFamily: FontFamily.Bold
                  }}>
                  Become a Vendor
                </Text>
              </View>

              {/* Name */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: FontFamily.Medium }}>
                  Legal Name as per Trade License
                </Text>
                <MyFormInput
                  value={formData.name}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      name: text,
                    })
                  }
                  placeHolder="Enter name here"
                />
              </View>
              {/* Mobile Number */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: FontFamily.Medium }}>
                  Email Address
                </Text>
                <MyFormInput
                  value={formData.email}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      email: text,
                    })
                  }
                  placeHolder="Enter email here"
                />
              </View>

              {/* Mobile Number */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: FontFamily.Medium }}>
                  Contact Number
                </Text>
                <MyFormInput
                  phone
                  keyboardType="number-pad"
                  value={formData.mobileNumber}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      mobileNumber: text,
                    })
                  }
                  placeHolder="Enter mobile number here"
                />
              </View>

              {/*  Password */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: FontFamily.Medium }}>Password</Text>
                <MyFormInput
                  value={formData.password}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      password: text,
                    })
                  }
                  placeHolder="Enter password here"
                  secure={secure ? true : false}
                  onIconPress={() => setSecure(prev => !prev)}
                  iconName={!secure ? 'eye' : 'eye-off'}
                />
              </View>
              {/* Confirm Password */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: FontFamily.Medium }}>
                  Confirm Password
                </Text>
                <MyFormInput
                  value={formData.conformPass}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      conformPass: text,
                    })
                  }
                  placeHolder="Enter confirm password here"
                  secure={ConSecure ? true : false}
                  onIconPress={() => setConSecure(prev => !prev)}
                  iconName={!ConSecure ? 'eye' : 'eye-off'}
                />
              </View>

              <View
                style={{ width: '100%', marginTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => setToggleCheckBox(prev => !prev)}
                  style={{
                    width: '10%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IoIcon
                    name={toggleCheckBox ? 'checkbox' : 'checkbox-outline'}
                    color={toggleCheckBox ? Colors.blue : 'black'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '80%',
                    height: 50,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{ fontSize: 15, color: Colors.black, fontFamily: FontFamily.Medium }}>
                    I accept the{' '}
                  </Text>
                  <Text style={{ fontSize: 15, color: Colors.blue, fontFamily: FontFamily.Medium }}>
                    Terms & Conditions{' '}
                  </Text>
                </View>
              </View>
              {loader ? (
                <ActivityIndicator size={'large'} color={Colors.blue} />
              ) : (
                <AuthButton onPress={signUpHandler} title="SIGN UP" />
              )}
            </View>
          </View>
          <PopUpModel
            onPress={() => {
              setPopUpModal(false);
              setMessage(null);
            }}
            visible={popUpModal}
            message={message}
          />

          <SuccessModal
            title="BACK TO LOGIN"
            msg={resMessage}
            modelOff={() => {
              setFormData({
                ...formData,
                name: '',
                mobileNumber: '',
                email: '',
                password: '',
                conformPass: '',
              });
              setToggleCheckBox(false);
              dispatch(AuthAction.clearMessageAction());
              setSuccessModal(false);
              props.navigation.navigate('login');
            }}
            visible={successModal}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default SignUpScreen;
