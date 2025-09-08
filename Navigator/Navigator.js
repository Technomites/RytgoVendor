import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Image,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Touchable,
  StatusBar
} from 'react-native';
import Colors from '../Constants/Colors';
import IoIcon from '../Components/Icon/IoIcon';
import MaIcon from '../Components/Icon/MaIcon';
import { FontFamily } from '../Assets/Fonts';


import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import AccountDeleteWarning from '../Components/UISupport/AccountDeleteWarning';
import * as AuthAction from '../Store/Action/AuthAction';
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { MFWebView, MFSettings, MFTheme } from 'myfatoorah-reactnative';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Start up screnn
import StartUpScreen from '../Screens/Auth/StartUpScreen';

import LoginScreen from '../Screens/Auth/LognScreen';
import MiddleWare from '../Screens/Auth/MiddleWare';
import ChangePassword from '../Screens/Auth/ChangePassword';

import HomeScreen from '../Screens/Home/HomeScreen';


//My Adds
import PostAnAddScreen from '../Screens/Home/PostAnAddScreen';
import PropertyForRentScreen from '../Screens/Home/PropertyForRentScreen';
import PostAnAddStep3 from '../Screens/Home/PostAnAddStep3';
import ManageMyAddScreen from '../Screens/Home/ManageAdd/ManageMyAddScreen';
import PostAnAddStep4 from '../Screens/Home/PostAnAddStep4';
import AddsPropertyFeatureScreen from '../Screens/Home/AddsPropertyFeatureScreen';
import PostAnAddStep5 from '../Screens/Home/PostAnAddStep5';
import RequestDetailScreen from '../Screens/Home/RequestDetailScreen';
import PostAnAddCarStep5 from '../Screens/Home/PostAnAddCarStep5';
import ManageDetailScreen from '../Screens/Home/ManageAdd/ManageDetailScreen';
import GetInTouchScreen from '../Screens/GetInTouch/GetInTouchScreen';
import TestDriveRequests from '../Screens/TestDriveRequests/TestDriveRequests';
import PhysicalTourRequests from '../Screens/PhysicalTourRequests/PhysicalTourRequests';
import VideoTourRequests from '../Screens/VideoTourRequests/VideoTourRequests';

import ForgotPassword from '../Screens/Auth/ForgotPassword';

//My Alert
import MyAlert from '../Screens/Alert/MyAlert';

//My package
import MyPackage from '../Screens/Packages/MyPackage';

//My Request
import MyRequest from '../Screens/Request/MyRequest';

//My Profile
import MyProfile from '../Screens/Profile/MyProfile';

import SignUpScreen from '../Screens/Auth/SignUpScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login" headerMode={false}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} />
      <Stack.Screen name="myPackage" component={MyPackage} />
      {/* <Stack.Screen
        name="MFWebView"
        component={MFWebView}
        options={MFWebView.navigationOptions}
      /> */}
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="postAdd" component={PostAnAddScreen} />
      <Stack.Screen name="properRent" component={PropertyForRentScreen} />
      <Stack.Screen name="postAdd3" component={PostAnAddStep3} />
      <Stack.Screen name="postAdd4" component={PostAnAddStep4} />
      <Stack.Screen name="postAdd5" component={PostAnAddStep5} />
      <Stack.Screen name="postAddCar5" component={PostAnAddCarStep5} />
      <Stack.Screen name="My Notification" component={MyAlert} />

      <Stack.Screen
        name="addProperFeature"
        component={AddsPropertyFeatureScreen}
      />
      <Stack.Screen name="requestDetail" component={RequestDetailScreen} />
      <Stack.Screen name="manageAdd" component={ManageMyAddScreen} />
      <Stack.Screen name="manageAddDetail" component={ManageDetailScreen} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen
        name="MFWebView"
        component={MFWebView}
        options={MFWebView.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = props => {
  const loader = useSelector(state => state.auth.loader);
  const logout = useSelector(state => state.auth.logout);
  const userInformation = useSelector(state => state.data.userProfile);

  const dispatch = useDispatch();
  const [deviceId, setDeviceId] = useState(DeviceInfo.getUniqueId());
  const [showDelete, setShowDelete] = useState(false);

  const logOutHandler = async () => {
    dispatch(AuthAction.clearUserInfoToRedux());
    dispatch(AuthAction.logOutAction(deviceId));
    await AsyncStorage.removeItem('userData');
    props.navigation.replace('auth', { screen: 'login' });
  };
  if (logout) {
    AsyncStorage.removeItem('userData');
  }

  const CustomDrawerStyle = props => {
    return (
      <View style={{ flex: 1 }}>

        <ImageBackground
          resizeMode="cover"
          source={require('../Assets/Images/DrawerBg.png')}
          style={{ flex: 1 }}>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 40, width: 120, resizeMode: 'contain' }}
              source={require('../Assets/Images/logoWhite.png')}
            />
          </View>

          <View
            style={{
              height: '20%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: userInformation?.image
                  ? userInformation?.image
                  : 'https://aecsp.qc.ca/wp-content/uploads/2021/03/person_icon-icons.com_50075.png',
              }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 15,

                  letterSpacing: 1,
                  fontFamily: FontFamily.Bold
                }}>
                {userInformation?.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                props.navigation.navigate('MyProfile');
              }}
              style={{
                marginTop: 5,
                width: '50%',
                height: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ color: Colors.white, fontSize: 13, letterSpacing: 1, fontFamily: FontFamily.Regular }}>
                Account Info
              </Text>
              <View>
                <IoIcon name="chevron-forward" color={Colors.blue} size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginTop: 50 }}>
            <DrawerItemList {...props} />
            <TouchableOpacity
              onPress={() => {
                setShowDelete(true)
              }}
              style={{
                height: 50,
                width: '100%',
                alignItems: 'center',
                marginLeft: 18,
                flexDirection: 'row',
              }}>
              <View style={{
                width: "11.5%",
                justifyContent: "center", alignItems: "flex-start"
              }}>
                <MaIcon size={22} name="delete-outline" color={Colors.blue} />
              </View>
              <View style={{ marginLeft: 33 }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 15,
                    fontFamily: FontFamily.Bold
                  }}>
                  Account Delete
                </Text>
              </View>
            </TouchableOpacity>
            {loader ? (
              <View
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Colors.blue} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={logOutHandler}
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  marginLeft: 18,
                  flexDirection: 'row',
                }}>
                <View style={{
                  width: "11.5%",
                  justifyContent: "center", alignItems: "flex-start"
                }}>
                  <MaIcon size={22} name="logout" color={Colors.blue} />
                </View>
                <View style={{ marginLeft: 33 }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 15,
                      fontFamily: FontFamily.Bold
                    }}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
          <AccountDeleteWarning
            onPressNo={() => {
              setShowDelete(false)
            }}
            onPressYes={() => {
              logOutHandler()
              setShowDelete(false)

            }}
            visible={showDelete} />
        </ImageBackground>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#f0525224"
      }}


      drawerContent={CustomDrawerStyle}
      initialRouteName="dashboard"
      headerMode={false}>
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>

              <IoIcon name="home-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (

            <Text
              style={{ fontFamily: FontFamily.Bold, fontSize: 15, color: Colors.white }}>
              Home
            </Text>

          ),
        }}
        name="dashboard"
        component={HomeNavigator}
      />

      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <IoIcon name="newspaper-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontFamily: FontFamily.Bold, fontSize: 15, color: Colors.white }}>
              My Ads
            </Text>
          ),
        }}
        name="My Ads"
        component={PostAnAddScreen}
      />
      {/* 
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <MaIcon name="email-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontWeight: 'bold', fontSize: 15, color: Colors.white }}>
              Customer Enquiries
            </Text>
          ),
        }}
        name="GetInTouch"
        component={GetInTouchScreen}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{ width:"13%",
            justifyContent:"center",alignItems:"flex-start", 
            }}>
            <MaterialCommunityIcons name="steering" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 12, color: Colors.white}}>
              TEST DRIVES
            </Text>
          ),
        }}
        name="TestDriveRequests"
        component={TestDriveRequests}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{ width:"13%",
            justifyContent:"center",alignItems:"flex-start",
            }}>
            <FontAwesome5 name="users" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{fontWeight: 'bold', fontSize: 12, color: Colors.white}}>
              PHYSICAL TOURS
            </Text>
          ),
        }}
        name="PhysicalTourRequests"
        component={PhysicalTourRequests}
      /> */}
      {/* 
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <AntDesign name="videocamera" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontWeight: 'bold', fontSize: 12, color: Colors.white }}>
              VIDEO TOURS
            </Text>
          ),
        }}
        name="VideoTourRequests"
        component={VideoTourRequests}
      /> */}


      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <MaIcon name="bell-ring-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <View style={{ width: "100%", }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 12, color: Colors.white }}>
                MY ALERTS
              </Text>
            </View>
          ),
        }}
        name="My Notification"
        component={MyAlert}
      /> */}

      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <MaIcon name="message-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontFamily: FontFamily.Bold, fontSize: 15, color: Colors.white }}>
              Customer Requests
            </Text>
          ),
        }}
        name="My Requests"
        component={MyRequest}
      />

      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <IoIcon name="md-gift-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontFamily: FontFamily.Bold, fontSize: 15, color: Colors.white }}>
              Upgrade Your Package
            </Text>
          ),
        }}
        name="My Package"
        component={MyPackage}
      />

      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <View style={{
              width: "13%",
              justifyContent: "center", alignItems: "flex-start",
            }}>
              <IoIcon name="lock-closed-outline" size={22} color={Colors.blue} />
            </View>
          ),
          drawerLabel: () => (
            <Text
              style={{ fontFamily: FontFamily.Bold, fontSize: 15, color: Colors.white }}>
              Change Password
            </Text>
          ),
        }}
        name="ChangePassword"
        component={ChangePassword}
      />




    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode={false}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="middleWare" component={MiddleWare} />
        <Stack.Screen name="startUp" component={StartUpScreen} />
        <Stack.Screen name="auth" component={AuthNavigator} />
        <Stack.Screen name="home" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
