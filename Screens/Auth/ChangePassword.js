import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import AuthButton from '../../Components/UISupport/AuthButton';
import MyFormInput from '../../Components/UISupport/MyFormInput';
import * as AuthAction from '../../Store/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import MyFormInputTile from '../../Components/UISupport/MyFormInputTile';
import { FontFamily } from '../../Constants/Fonts';
import { Safeareacontext } from '../../Constants/SafeAreaContext';
const ChangePassword = props => {
  const userToken = useSelector(state => state.auth.userInfo?.access_token);
  const loader = useSelector(state => state.auth.loader);
  const resMessage = useSelector(state => state.auth.changePassMessage);
  const [currnetPass, setCurrentPass] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    oldPass: '',
    newPassword: '',
    conPassword: '',
  });

  const [message, setMessage] = useState();
  const [popUpModal, setPopUpModal] = useState(false);
  const [succModal, setSUccessModal] = useState(false);

  useEffect(() => {
    if (resMessage === 'Password saved successfully') {
      setMessage(resMessage);
      setSUccessModal(true);
    } else {
      setMessage(resMessage);
      setPopUpModal(true);
    }
  }, [resMessage]);

  const changePasswordHandler = async () => {
    var passwordreg = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*/+(){}=!.<>|:-?_<>";'~`]{8,}$/,
    );
    if (
      formData.oldPass.length === 0 ||
      formData.newPassword.length === 0 ||
      formData.conPassword.length === 0
    ) {
      setMessage('Input Field required');
      setPopUpModal(true);
    } else if (formData.newPassword !== formData.conPassword) {
      setMessage("Password dones't matched");
      setPopUpModal(true);
    } else if (formData.newPassword !== passwordreg) {
      setMessage(
        'Min. 8 characters, at least one uppercase letter, one lowercase letter, and one number',
      );
      setPopUpModal(true);
    } else if (formData.oldPass === formData.newPassword) {
      setMessage("You can't enter an old password");
      setPopUpModal(true);
    } else {
      setMessage(null);
      dispatch(
        AuthAction.changePassword(
          userToken,
          formData.oldPass,
          formData.newPassword,
        ),
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray,

                     paddingTop: Safeareacontext.top
      
     }}>
      <ScrollView>
        <BackHeader
          title="Change Password"
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ width: '90%', marginTop: 20 }}>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17, marginBottom: 5 }}>
                Current Password
              </Text>
              <MyFormInputTile
                value={formData.oldPass}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    oldPass: text,
                  })
                }
                placeHolder="Enter current password here"
                secure={currnetPass ? true : false}
                onIconPress={() => setCurrentPass(prev => !prev)}
                iconName={!currnetPass ? 'eye' : 'eye-off'}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17, marginBottom: 5 }}>
                New Password
              </Text>
              <MyFormInputTile
                value={formData.newPassword}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    newPassword: text,
                  })
                }
                placeHolder="Enter new password here"
                secure={newPass ? true : false}
                onIconPress={() => setNewPass(prev => !prev)}
                iconName={!newPass ? 'eye' : 'eye-off'}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17, marginBottom: 5 }}>
                Confirm Password
              </Text>
              <MyFormInputTile
                value={formData.conPassword}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    conPassword: text,
                  })
                }
                placeHolder="Enter confirm password here"
                secure={confirmPass ? true : false}
                onIconPress={() => setConfirmPass(prev => !prev)}
                iconName={!confirmPass ? 'eye' : 'eye-off'}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              {loader ? (
                <ActivityIndicator size={'large'} color={Colors.blue} />
              ) : (
                <AuthButton
                  title="SAVE CHANGES"
                  onPress={changePasswordHandler}
                />
              )}
            </View>
          </View>
        </View>
        {/* <PopUpModel
          onPress={() => {
            setPopUpModal(false);
            setMessage(null);
          }}
          visible={popUpModal}
          message={message}
        /> */}

        <SuccessModal
          modelOff={() => {
            if (resMessage === 'Password saved successfully') {
              setFormData({
                ...formData,
                oldPass: '',
                newPassword: '',
                conPassword: '',
              });
            }
            setPopUpModal(false);
            setSUccessModal(false);
            setMessage(null);
          }}
          visible={succModal}
          msg={message}
          title="OK"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 70,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '600',
  },
});

export default ChangePassword;
