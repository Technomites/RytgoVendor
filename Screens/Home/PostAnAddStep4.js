import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';

import MyInput from '../../Components/UISupport/MyInput';
import AuthButton from '../../Components/UISupport/AuthButton';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import { BaseURL } from '../../Constants/BaseUrl';

import PopUpModel from '../../Components/UISupport/PopUpModel';
import { Picker } from '@react-native-picker/picker';
import PickerContainer from '../../Components/UISupport/PickerContainer';
import PickerModelContainer from '../../Components/UISupport/PickerModelContainer';
import PickerModel from '../../Components/UISupport/PickerModel';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { FontFamily } from '../../Constants/Fonts';
import MapLocationContainer from '../../Components/UISupport/MapLocationContainer';

const PostAnAddStep4 = props => {
  const [successModelShow, setSuccessShow] = useState(false);
  const [allCountries, setAllCountries] = useState();
  const [allCities, setAllCities] = useState();
  const prevFormData = props.route.params.formData;
  const data = props.route.params.data ? props.route.params.data : null;
  const update = props.route.params.update;

  //LOCATION SEARCH
  const [locationSearch, setLocationSearch] = useState('');
  const [locationModal, setLocationModal] = useState(false);
  const [location, setLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [errorMessage, setMessgae] = useState('');

  const [mapLong, setMapLog] = useState(
    data?.longitude ? data?.longitude : '55.2708',
  );
  const [mapLat, setMapLat] = useState(
    data?.latitude ? data?.latitude : '25.2048',
  );

  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [area, setarea] = useState('');
  const [pickerSearch, setPickerSearch] = useState('');
  const [modalShown, setModalShown] = useState(false);
  const [formFields, setFormFields] = useState({
    country: '',
    city: '',
    area: data?.area ? data?.area : '',
    state: data?.city ? data?.city : null,
    zipCode: data?.zipCode ? data?.zipCode : '',
    address: data?.address ? data?.address : '',
    country: data?.country ? data?.country : null,
    city: null,
    prevFormData,
    mapLat: mapLat,
    mapLong: mapLong,

    // mapCordinates: {
    //   lat: mapLat,
    //   long: mapLong,
    // },
  });

  // console.log(mapCordinates);
  useEffect(() => {
    const getAllCountry = async () => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      await fetch(`${BaseURL}//api/v1/en/countries`, requestOptions)
        .then(response => response.json())
        .then(result => setAllCountries(result?.countries))
        .catch(error => console.log('error', error));
    };
    const getAllCites = async () => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      await fetch(`${BaseURL}//api/v1/en/cities`, requestOptions)
        .then(response => response.json())
        .then(result => setAllCities(result?.cities))
        .catch(error => console.log('error', error));
    };
    getAllCountry();
    getAllCites();
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBk__F0NhYVnD78LJKl-BnfXv3V67NKldQ&input=${locationSearch}&inputtype=textquery`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => setLocation(result.results))
      .catch(error => console.log('error', error));
  }, [locationSearch]);

  const nextHandler = () => {
    if (!formFields.state) {
      setMessgae('Select City first');
      setModalShown(true);
    } else if (formFields.address.length === 0) {
      setMessgae('Address is required');
      setModalShown(true);
    } else if (formFields.area == "") {
      setMessgae('Enter Area');
      setModalShown(true);
    }

    else {
      props.navigation.navigate('addProperFeature', {
        formData: formFields,
        data: data,
        update: update,
        latitude: mapLat,
        longitude: mapLong,
        area: formFields.area
      });

    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <ScrollView style={{ height: '100%', width: '100%' }}>
        <BackHeader
          title="Post an Ad"
          onPress={() => props.navigation.goBack()}
        />
        {/* TOP HEADING */}
        <View
          style={{
            height: 70,
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '10%',
              width: '20%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.blue,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.gray,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.gray,
                borderRadius: 10,
              }}></View>
          </View>

          <View
            style={{
              height: '70%',
              width: '55%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                textAlign: 'center',
                fontFamily: FontFamily.Bold
              }}>
              Address Information
            </Text>
            {/* <Text style={{ fontSize: 15, color: "gray", fontWeight: "400" }}>Select one of the option</Text> */}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <View style={{ width: '90%' }}>
            <View style={{ width: '100%' }}></View>

            <View style={{ width: '100%' }}>
              {/* State MODEL PICKER */}

              <PickerModelContainer
                valueHave={formFields?.state?.name ? true : false}

                pickValue={
                  formFields?.state?.name
                    ? formFields?.state.name
                    : 'Select state here'
                }
                onPicker={() => setOpenStatePicker(true)}
                formTitle={'City'}></PickerModelContainer>

              <View style={{ width: '100%', marginTop: 5 }}>
                <MyInput
                  // value={area}

                  // onChangeText={text =>
                  // setarea(text)
                  // }
                  value={formFields.area}
                  onChangeText={text =>
                    setFormFields({
                      ...formFields,
                      area: text,
                    })
                  }
                  formTitle={"Area"}
                  placeHolder="Enter Area"
                />
              </View>
              <PickerModel
                cloneModalPopUp={() => setOpenStatePicker(false)}
                modalPopUp={openStatePicker}
                pickerSearch={text => setPickerSearch(text)}
                onCancel={() => setOpenStatePicker(false)}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={allCities}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    if (item.name.includes(pickerSearch.trim())) {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setFormFields({
                              ...formFields,
                              state: item,
                            });
                            setOpenStatePicker(false);
                          }}
                          style={{
                            height: 50,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 0.5,
                            fontFamily: FontFamily.Light

                          }}>
                          <Text>{item?.name}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </PickerModel>
            </View>

            {/* ADDRESS */}
            <MapLocationContainer
              valueHave={formFields.address ? true : false}
              formTitle="Address"
              pickValue={
                formFields.address ? formFields.address : 'Select address'
              }
              onPicker={() => setLocationModal(true)}
            />

            <PickerModel
              cloneModalPopUp={() => setLocationModal(false)}
              modalPopUp={locationModal}
              pickerSearch={text => setLocationSearch(text.trim())}
              onCancel={() => setLocationModal(false)}>
              <FlatList
                style={{ height: 20 }}
                showsVerticalScrollIndicator={false}
                data={location}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setFormFields({
                          ...formFields,
                          address: itemData.item.formatted_address,
                        });
                        // setMapCordinates({
                        //   ...mapCordinates,
                        //   latitude: itemData.item.geometry.location.lat,
                        //   longitude: itemData.item.geometry.location.lng,
                        // });
                        setSelectedLocation(itemData.item);
                        setLocationModal(false);
                      }}
                      style={{
                        marginVertical: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'lightgray',
                      }}>
                      <Text style={{ paddingVertical: 10, fontFamily: FontFamily.Light }}>
                        {itemData.item.formatted_address}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </PickerModel>

            {/* <MyInput
                            value={formFields.address}
                            onChangeText={(text) => setFormFields({
                                ...formFields,
                                address: text
                            })}
                            formTitle="Address" placeHolder="Enter address here" desc

                        /> */}
            {/* MAP VIEW */}
            <View
              style={{
                height: 300,
                width: '100%',
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <MapView
                style={{ height: 300, width: '100%', borderRadius: 20 }}
                scrollEnabled={true}
                zoomEnabled
                region={{
                  latitude: Number(mapLat),
                  longitude: Number(mapLong),
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}>
                {/* <MapView.Marker.Animated
                  draggable
                  coordinate={{
                    latitude: Number(mapLat),
                    longitude: Number(mapLong),
                  }}
                  onDragEnd={e => {
                    // console.log(e.nativeEvent.coordinate);

                    setMapLat(e.nativeEvent.coordinate.latitude);
                    setMapLog(e.nativeEvent.coordinate.longitude);

                    var requestOptions = {
                      method: 'GET',
                      redirect: 'follow',
                    };

                    fetch(
                      `https://maps.googleapis.com/maps/api/geocode/json?address=${Number(
                        e.nativeEvent.coordinate.latitude,
                      )},${Number(
                        e.nativeEvent.coordinate.longitude,
                      )}&key=AIzaSyBk__F0NhYVnD78LJKl-BnfXv3V67NKldQ`,
                      requestOptions,
                    )
                      .then(response => response.json())
                      .then(result => {
                        setFormFields({
                          ...formFields,
                          address: result.results[0].formatted_address,
                        });
                      })
                      .catch(error => console.log('error', error));
                  }}>
                  <Image
                    resizeMode="cover"
                    source={require('../../Assets/Images/mapMarker.png')}
                    style={{ height: 35, width: 35, resizeMode: 'contain' }}
                  />
                </MapView.Marker.Animated> */}
              </MapView>
            </View>

            <View style={{ marginTop: 10 }}>
              <AuthButton onPress={nextHandler} title="NEXT" />
              {/* <AuthButton onPress={() => props.navigation.navigate("addProperFeature")} title="Next" /> */}
            </View>
          </View>
        </View>

        <SuccessModal
          modelOff={() => {
            setSuccessShow(false);
            props.navigation.navigate('Home');
          }}
          visible={successModelShow}
        />
      </ScrollView>
      <PopUpModel
        visible={modalShown}
        message={errorMessage}
        onPress={() => setModalShown(false)}
      />
    </SafeAreaView >
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 70,
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '600',
  },
  imagePickTile: {
    height: 100,
    width: 100,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
    borderStyle: 'dashed',
  },
});

export default PostAnAddStep4;
