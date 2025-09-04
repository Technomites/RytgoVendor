import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import Color from '../../Constants/Colors';
import MainHeader from '../../Components/UISupport/MainHeader';
import { HomeTopTole } from '../../Data/DummyData';
import ListTile from '../../Components/UISupport/ListTile';
import IoIcon from '../../Components/Icon/IoIcon';
import Colors from '../../Constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as DataAction from '../../Store/Action/DataAction';
import { BaseURL } from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontFamily } from "../../Constants/Fonts"
const HomeScreen = props => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const sessionExpire = useSelector(state => state.data.sessionExpire);

  useEffect(() => {
    const ApiCall = async () => {
      if (sessionExpire) {
        await AsyncStorage.removeItem('userData');
        props.navigation.replace('auth');
      }
    }
    ApiCall()
  }, [sessionExpire]);

  const allRequest = useSelector(state => state.data.allRequest);

  const carRequest = useSelector(state => state.data.carRequest);
  const propertyReq = useSelector(state => state.data.propertyRequest);
  const userInformation = useSelector(state => state.data.userProfile);

  const paymentSetting = useSelector(state => state.data.paymentSetting);

  const [stats, setStats] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getALlRequest = async () => {
      await dispatch(DataAction.getAllRequest(userInfo.access_token));
    };
    const getUserInformation = async () => {
      await dispatch(DataAction.getUserProfileInfo(userInfo?.access_token));
    };

    const paymentSetting = async () => {
      await dispatch(DataAction.paymentSettingAction(userInfo?.access_token));
    };

    getUserInformation();

    getALlRequest();

    paymentSetting();
  }, []);

  useEffect(() => {
    if (userInfo) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userInfo.access_token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BaseURL}//api/v1/vendor/dashboard/stats`, requestOptions)
        .then(response => response.json())
        .then(result => setStats(result?.stats))
        .catch(error => console.log('error', error));
    }
  }, [userInfo]);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );

  //     console.log('data  quit state Moddle ware:', remoteMessage.data.Module);

  //     //navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         alert(remoteMessage?.data?.Module);
  //         console.log(remoteMessage?.data?.Module);
  //         if (remoteMessage?.data?.Module === 'GetInTouchRequest') {
  //           props.navigation.navigate('GetInTouch');
  //         } else if (remoteMessage?.data?.Module === 'MotorRequest') {
  //           props.navigation.navigate('My Requests', {
  //             route: 'Motors',
  //           });
  //         } else if (remoteMessage?.data?.Module === 'PropertyRequest') {
  //           props.navigation.navigate('My Requests', {
  //             route: 'Properties',
  //           });
  //         } else if (remoteMessage?.data?.Module === 'Motor') {
  //           props.navigation.navigate('manageAdd', {
  //             route: 'Motors',
  //           });
  //         } else if (remoteMessage?.data?.Module === 'Property') {
  //           props.navigation.navigate('manageAdd', {
  //             route: 'Properties',
  //           });
  //         }
  //         // console.log(
  //         //   'Notification caused app to open from quit state:',
  //         //   remoteMessage.notification,
  //         // );

  //         // console.log(
  //         //   'data  quit state Moddle ware::',
  //         //   remoteMessage.data.Module,
  //         // );

  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       //setLoading(false);
  //     });
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: Color.white }}>
        {/* <Button
          title="Clear"
          onPress={() => {
            AsyncStorage.removeItem('userData');
          }}
        /> */}
        <View style={{ height: 160, width: '100%' }}>
          <MainHeader
            onPress={() => props.navigation.openDrawer()}
            onNotification={() => {
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                `Bearer ${userInfo.access_token}`,
              );

              var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(`${BaseURL}api/v1/notifications/seen`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
              props.navigation.navigate('My Notification');
            }}
          />
          <View
            style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
            <View
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'white',
                borderRadius: 50,
              }}>
              {
                console.log(userInformation?.image, "userInformation?.image")
              }
              <Image
                source={{
                  uri: userInformation?.image
                    ? userInformation?.image
                    : 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
                }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  resizeMode: 'cover',
                }}
              />
            </View>

            <View
              style={{
                height: 70,
                width: 150,
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,

                  color: Color.blue,
                  letterSpacing: 1,
                  fontFamily: FontFamily.Bold
                }}>
                Welcome
              </Text>
              <Text style={{ fontSize: 15, fontFamily: FontFamily.Medium, color: 'black' }}>
                {userInformation?.name}
              </Text>
            </View>
          </View>
        </View>
        {/* HOME TILE */}
        <View
          style={{
            height: '78%',
            width: '100%',
            backgroundColor: Color.bgGray,
            marginTop: 15,
          }}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ width: '100%', top: -30 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <View style={Styles.topTileCont}>
                  <View
                    style={{
                      height: '100%',
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',

                    }}>
                    <Image
                      source={require('../../Assets/Images/car.png')}
                      style={{ height: 40, width: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: Color.black,
                        textAlign: 'center',
                        fontFamily: FontFamily.Bold
                      }}>
                      Total Motors
                    </Text>
                    <Text
                      style={{
                        color: Color.black,
                        textAlign: 'center',
                        fontFamily: FontFamily.Bold,
                        fontSize: 15
                      }}>
                      {stats?.noOfMotors}
                    </Text>
                  </View>
                </View>

                <View style={Styles.topTileCont}>
                  <View
                    style={{
                      height: '100%',
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../Assets/Images/building.png')}
                      style={{ height: 40, width: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '55%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{

                        fontSize: 15,
                        color: Color.black,
                        textAlign: 'center',
                        fontFamily: FontFamily.Bold
                      }}>
                      Total Properties
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.Bold,
                        color: Color.black,
                        textAlign: 'center',
                        fontSize: 15
                      }}>
                      {stats?.noOfProperties}
                    </Text>
                  </View>
                </View>

                <View style={Styles.topTileCont}>
                  <View
                    style={{
                      height: '100%',
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../Assets/Images/comment.png')}
                      style={{ height: 40, width: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      width: '50%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{

                        fontSize: 15,
                        color: Color.black,
                        textAlign: 'center',
                        fontFamily: FontFamily.Bold
                      }}>
                      Total Requests
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.Bold,
                        color: Color.black,
                        textAlign: 'center',
                        fontSize: 15
                      }}>
                      {stats?.totalRequest}
                    </Text>
                  </View>
                </View>
              </ScrollView>

              {/* {console.log(stats)} */}

              {/* <FlatList
                data={HomeTopTole}
                horizontal={true}
                renderItem={homeTopTile}
                showsHorizontalScrollIndicator={false}
              /> */}
            </View>
          </View>
          {/* List Heading */}
          <View
            style={{
              height: '10%',
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              bottom: 50,
              marginTop: 15,
            }}>
            <View
              style={{
                height: '100%',
                width: '35%',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{ fontFamily: FontFamily.Bold, color: Color.black, fontSize: 15 }}>
                My Requests
              </Text>
              {/* <Text style={{ fontWeight: "400", color: "gray", fontSize: 12 }}>{allRequest?.length} New Requests</Text> */}
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('My Requests')}
              style={{ height: '100%', justifyContent: 'center' }}>
              <Text
                style={{ fontFamily: FontFamily.Bold, color: Color.blue, fontSize: 13 }}>
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>
          {/* RENDER LIST */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: '65%',
              bottom: 50,
              marginHorizontal: 20,
              borderBottomColor: 'gray',
            }}>
            {allRequest?.lenght === 0 ? (
              <Text>No request found</Text>
            ) : (
              allRequest?.map((item, index) => {
                if (index < 3) {
                  return (
                    <ListTile
                      home
                      onPress={() => {
                        props.navigation.navigate('requestDetail', {
                          reqData: item,
                        });
                      }}
                      time={item.createdOn}
                      key={index}
                      imageUrl={item?.customer.image}
                      name={item?.customer?.name}
                      landName={item?.title}
                      flag={item.isFlaged ? true : false}
                    />
                  );
                }
              })
            )}
          </ScrollView>

          {/* BOTTOM TABS TILE */}

          <View style={{ height: '20%', bottom: 50, marginHorizontal: 20 }}>
            {/* POST ADD TILE */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate('postAdd')}
              style={{
                height: '50%',
                width: '100%',
                flexDirection: 'row',
                borderTopColor: 'lightgray',
                borderTopWidth: 1,
              }}>
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '15%',
                }}>
                <IoIcon color={Colors.blue} size={25} name="add-sharp" />
              </View>

              <View
                style={{
                  height: '100%',
                  width: '70%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: FontFamily.Bold,
                    letterSpacing: 1,
                  }}>
                  POST AN AD
                </Text>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IoIcon color={Colors.blue} size={25} name="arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>

            {/* POST ADD TILE */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate('manageAdd')}
              style={{
                height: '50%',
                width: '100%',
                flexDirection: 'row',
                borderTopColor: 'lightgray',
                borderTopWidth: 1,
              }}>
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '15%',
                }}>
                <IoIcon color={Colors.blue} size={25} name="pricetag-outline" />
              </View>

              <View
                style={{
                  height: '100%',
                  width: '70%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: FontFamily.Bold,
                    letterSpacing: 1,
                  }}>
                  MANAGE MY ADS
                </Text>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IoIcon color={Colors.blue} size={20} name="arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  containerTile: {
    height: 100,
    width: 200,
    backgroundColor: Color.white,
    borderRadius: 10,
    margin: 10,
  },
  topTileCont: {
    height: 80,
    width: 209,
    backgroundColor: Colors.white,
    marginLeft: 10,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
