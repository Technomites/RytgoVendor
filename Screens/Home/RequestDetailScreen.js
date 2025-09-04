import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import BackHeader from '../../Components/UISupport/BackHeader';
import Colors from '../../Constants/Colors';
import AuthButton from '../../Components/UISupport/AuthButton';
import MyModal from '../../Components/UISupport/MyModal';
import {useDispatch, useSelector} from 'react-redux';
import * as RequestAction from '../../Store/Action/DataAction';
import MapView from 'react-native-maps';
const RequestDetailScreen = props => {
  const requestData = props.route.params.reqData;
  const userInfo = useSelector(state => state.auth.userInfo);
  const loader = useSelector(state => state.data.loader);

  const [show, setShow] = useState(false);
  const [modelShown, setModelShown] = useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgGray}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeader
          onPress={() => props.navigation.navigate('My Requests')}
          title="Request Details"
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <View style={Styles.ProfileContainer}>
              <View style={{marginLeft: 20}}>
                <Image
                  source={{uri: requestData.customer.image}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View style={{marginLeft: 20}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: Colors.black,
                  }}>
                  {requestData.customer.name}
                </Text>
                <Text style={{fontSize: 10, color: Colors.black}}>
                  {requestData.createdOn}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 50,
                width: '100%',
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: Colors.black,
                  }}>
                  Looking Property for
                </Text>
              </View>
              <View
                style={{
                  height: 30,
                  width: 60,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.blue,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 10,
                    color: Colors.white,
                    letterSpacing: 1,
                  }}>
                  {requestData.forSale ? 'Sale' : 'Rent'}
                </Text>
              </View>
            </View>

            <Text
              style={{fontSize: 15, fontWeight: 'bold', color: Colors.black}}>
              Description
            </Text>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  textAlign: 'justify',
                  color: Colors.black,
                  fontSize: 12,
                  justifyContent: 'center',
                }}>
                {requestData.description}
              </Text>
            </View>
            <View
              style={{
                borderTopColor: Colors.gray,
                borderTopWidth: 1,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => setShow(prev => !prev)}
                style={{
                  height: 40,
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: Colors.blue,
                  }}>
                  {show ? 'HIDE DETAILS' : 'VIEW DETAILS'}
                </Text>
              </TouchableOpacity>
              {console.log(requestData)}
              {show && (
                <View style={{marginBottom: 10}}>
                  {requestData.type === 'Car' && (
                    <View>
                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            MAKE
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.make?.name}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            MODEL
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.model?.name}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            COLOR
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.color}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            DOOR
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.doors}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            TRANSMISSION
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.transmission}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            KILOMETERS
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.minKilometer} KM -
                            {requestData.minKilometer} KM
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            CYLINDERS
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData?.cylinders}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            PRICE
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            AED {requestData.minPrice} - AED{' '}
                            {requestData.maxPrice}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            YEAR
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.minYear} - {requestData.maxYear}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            REGIONAL SPACS
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.regionalSpecification}
                          </Text>
                        </View>
                      </View>

                      <View style={{width: '50%', height: 50}}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: Colors.black,
                          }}>
                          WARRANTY
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '500',
                            color: 'gray',
                          }}>
                          {requestData.warranty == true ? 'Yes' : 'No'}
                        </Text>
                      </View>
                    </View>
                  )}

                  {requestData.type === 'Property' && (
                    <View>
                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            NO. OF ROOMS
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.noOfRooms}
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            NO. OF BATHS
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.noOfBathRooms}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            SIZE
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            {requestData.size} Sq. ft
                          </Text>
                        </View>
                        <View style={{width: '50%', height: 50}}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Colors.black,
                            }}>
                            PRICE
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '500',
                              color: 'gray',
                            }}>
                            AED {requestData.maxPrice} - AED{' '}
                            {requestData.minPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {/* <View style={{ flexDirection: "row", width: "100%" }}>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "PRICE" : "PRICE"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>AED {requestData.type === "Property" ? requestData.price : requestData.price}</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "SIZE" : "COLOR"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.type === "Property" ? requestData.size + " " + "sq. ft" : requestData.color} </Text>
                                        </View>
                                    </View> */}

                  {/* <View style={{ flexDirection: "row", width: "100%" }}>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "NO. OF BEDS" : "CYLINDERS"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.noOfBedRooms ? requestData.noOfBedRooms : requestData.cylinders}</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "BUILD YEAR" : "MODEL"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.type === "Property" ? requestData.buildYear : requestData.model.name} </Text>
                                        </View>
                                    </View> */}

                  {/* <View style={{ flexDirection: "row", width: "100%" }}>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "COUNTRY" : "DOORS"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.type === "Property" ? requestData.country : requestData.doors}</Text>
                                        </View>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "CITY" : "HORSEPOWER"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.type === "Property" ? requestData.city : requestData.horsepower} </Text>
                                        </View>
                                    </View> */}

                  {/* <View style={{ flexDirection: "row", width: "100%" }}>
                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>{requestData.type === "Property" ? "AREA" : "TRANSMISSION"}</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.type === "Property" ? requestData.area : requestData.transmission}</Text>
                                        </View>

                                        <View style={{ width: "50%", height: 50, }}>
                                            <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.black }}>CONTACT</Text>
                                            <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>{requestData.customer.contact}</Text>
                                        </View>

                                    </View> */}
                </View>
              )}
              {requestData.type === 'Property' && (
                <View style={{width: '100%', height: 50}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: Colors.black,
                    }}>
                    LOCATION
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '500',
                      color: 'gray',
                    }}>
                    {requestData.address}
                  </Text>
                </View>
              )}

              {requestData.type === 'Property' && (
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    marginBottom: 10,
                  }}>
                  <MapView
                    style={{height: 200, width: '100%', borderRadius: 20}}
                    scrollEnabled={true}
                    zoomEnabled
                    region={{
                      latitude: Number(requestData.latitude),
                      longitude: Number(requestData.longitude),
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}>
                    <MapView.Marker.Animated
                      draggable
                      coordinate={{
                        latitude: Number(requestData.latitude),
                        longitude: Number(requestData.longitude),
                      }}>
                      <Image
                        resizeMode="cover"
                        source={require('../../Assets/Images/mapMarker.png')}
                        style={{height: 35, width: 35, resizeMode: 'contain'}}
                      />
                    </MapView.Marker.Animated>
                  </MapView>
                </View>
              )}

              <View style={{marginBottom: 20}}>
                <View style={{marginTop: 5}}>
                  {loader ? (
                    <ActivityIndicator size={'large'} color={Colors.blue} />
                  ) : (
                    <AuthButton
                      onPress={() => {
                        dispatch(
                          RequestAction.flagData(
                            userInfo.access_token,
                            requestData.type,
                            requestData.id,
                          ),
                        );
                        dispatch(
                          RequestAction.getAllRequest(userInfo.access_token),
                        );
                      }}
                      title={
                        requestData.isFlaged
                          ? 'UN FLAG REQUEST'
                          : 'FLAG REQUEST'
                      }
                    />
                  )}
                </View>

                <View style={{marginTop: 10}}>
                  <AuthButton
                    onPress={() => setModelShown(true)}
                    title="CONTACT"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <MyModal visible={modelShown}>
          <Image
            source={{uri: requestData.customer.image}}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: Colors.black,
              marginTop: 10,
            }}>
            {requestData.customer.name}
          </Text>
          <Text style={{fontSize: 20, fontWeight: '600', color: Colors.gray}}>
            {requestData.customer.contact}
          </Text>

          <View style={{width: '90%', marginTop: 15}}>
            <AuthButton
              onPress={() => {
                Linking.openURL(`tel:${requestData.customer.contact}`);
                setModelShown(false);
              }}
              title="CALL"
            />
          </View>
          <TouchableOpacity
            onPress={() => setModelShown(false)}
            style={{
              height: 30,
              width: 200,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: Colors.blue, fontSize: 12, fontWeight: 'bold'}}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </MyModal>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  ProfileContainer: {
    height: 80,
    width: '100%',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    borderRadius: 10,
    flexDirection: 'row',

    alignItems: 'center',
  },
});
export default RequestDetailScreen;
