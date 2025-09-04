import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';

import AuthButton from '../../Components/UISupport/AuthButton';
import SuccessModal from '../../Components/UISupport/SuccessModal';

import { useSelector, useDispatch } from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as DataAction from '../../Store/Action/DataAction';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import { FontFamily } from '../../Constants/Fonts';
const AddsPropertyFeatureScreen = props => {
  const prevFormData = props.route.params.formData;
  const update = props.route.params.update;
  const longitude = props.route.params.longitude;
  const latitude = props.route.params.latitude;
  const area = props.route.params.area;
  const allFeature = useSelector(state => state.data.allFeature);

  const userInfo = useSelector(state => state.auth.userInfo);
  const data = props.route.params.data ? props.route.params.data : null;

  const [modalShown, setModalShown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllFeature = async () => {
      await dispatch(
        DataAction.addFeatureAction(
          userInfo?.access_token,
          prevFormData.prevFormData.type,
          data?.features ? data?.features : [],
        ),
      );
    };
    getAllFeature();
  }, []);
  const nextHandler = () => {
    const SelectFeatureList = allFeature.filter(item => item.select);
    if (SelectFeatureList.length === 0) {
      setModalShown(true);
    } else {
      if (
        prevFormData.prevFormData.type === 'Car' ||
        prevFormData.prevFormData.type === 'car'
      ) {
        props.navigation.navigate('postAddCar5', {
          formData: prevFormData,
          SelectFeatureList: SelectFeatureList,
          data: data,
          longitude: longitude,
          latitude: latitude,
          area: area
        });
      } else {
        props.navigation.navigate('postAdd5', {
          formData: prevFormData,
          SelectFeatureList: SelectFeatureList,
          data: data,
          update: update,
          longitude: longitude,
          latitude: latitude,
          area: area
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Select Features
            </Text>
            {/* <Text style={{ fontSize: 15, color: "gray", fontWeight: "400" }}>Select one of the option</Text> */}
          </View>
        </View>
        <View
          style={{
            width: '90%',
            marginTop: 30,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              // width: "50%", height: "75%",
              flexDirection: 'row',
              // flex: 1,
              flexWrap: 'wrap',
              marginBottom: 10,
            }}>
            {allFeature?.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    dispatch(DataAction.addFeature(item.id));
                  }}
                  style={{
                    margin: 5,
                    backgroundColor: item.select ? Colors.blue : Colors.inputBg,
                    padding: 12,
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{ color: item.select ? Colors.white : "gray", fontFamily: FontFamily.Medium }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <PopUpModel
          visible={modalShown}
          message="Select atleast one feature"
          onPress={() => setModalShown(false)}
        />
      </ScrollView>
      <View
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', marginBottom: 20 }}>
          <AuthButton onPress={nextHandler} title="NEXT" />
        </View>
      </View>
    </SafeAreaView>
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

export default AddsPropertyFeatureScreen;
