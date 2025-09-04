import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';

import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import { myNotoficationData } from '../../Data/DummyData';
import * as AllNotification from '../../Store/Action/DataAction';
import { useDispatch, useSelector } from 'react-redux';
import IoIcon from '../../Components/Icon/IoIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseURL } from '../../Constants/BaseUrl';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import Loader from '../../Components/UISupport/Loader';
import GetInTouchModal from '../../Components/UISupport/GetInTouchModal';
import GetinTouchModalWithRemarks from '../../Components/UISupport/GetinTouchModalWithRemarks';
import { FontFamily } from '../../Constants/Fonts';
const GetInTouch = props => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const allGetInTouchData = useSelector(state => state.data.getInTuchData);

  const [page, setPage] = useState(1);
  const [successModal, setSucessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [id, setid] = useState(0);
  const [descriptionPopup, setDescriptionPopup] = useState(false);
  const [description, setDescription] = useState(false);

  const dispatch = useDispatch();

  //GET ALL NOTIFICATION URL Trigger in every page changes
  useEffect(() => {
    const getAllNtification = async () => {
      await dispatch(
        AllNotification.getInTouchAction(userInfo?.access_token, page),
      );
    };
    getAllNtification();
  }, [page]);

  const renderList = itemData => {
    return (
      <View style={Styles.tileContainer}>
        <View style={{ height: '100%', width: '100%' }}>
          <TouchableOpacity
            disabled={itemData.item.markRead}
            onPress={() => {
              setLoader(true);
              var myHeaders = new Headers();
              myHeaders.append(
                'Authorization',
                `Bearer ${userInfo?.access_token}`,
              );

              var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                redirect: 'follow',
              };

              fetch(
                `${BaseURL}/api/v1/vendor/GetInTouch/${itemData.item.id}/MarkRead`,
                requestOptions,
              )
                .then(response => response.json())
                .then(result => {
                  if (result.status === 'success') {
                    setLoader(false);
                    setSucessModal(true);
                  } else {
                    setLoader(false);
                  }
                })
                .catch(error => console.log('error', error));
            }}
            style={{
              height: '38%',
              width: '100%',

              flexDirection: 'row',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <View
              style={{
                height: '95%',
                width: '25%',

                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5, borderColor: 'lightgray', borderRadius: 5,


              }}>
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={{
                  uri:
                    itemData.item.motor !== null
                      ? itemData.item.motor.thumbnail
                      : itemData.item.property !== null
                        ? itemData.item.property.thumbnail
                        : '',
                }}
              />
            </View>

            <View
              style={{
                height: '100%',
                width: '70%',
                marginLeft: 10,
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 10, color: '#19191966' }}>
                {`Ad Reference Code: ${itemData.item.motor !== null
                    ? itemData.item.motor.adsReferenceCode
                    : itemData.item.property !== null
                      ? itemData.item.property.adsReferenceCode
                      : ''
                  }`}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: 'bold', color: '#191919' }}>
                {itemData.item.motor !== null
                  ? itemData.item.motor.name
                  : itemData.item.property !== null
                    ? itemData.item.property.name
                    : ''}
              </Text>


            </View>

            <View
              style={{
                height: '100%',
                width: '2%',
                alignItems: 'center',
                marginRight: 7,
              }}>
              <View
                style={{
                  height: 10,
                  width: 10,

                  backgroundColor: itemData.item.markRead
                    ? Colors.white
                    : Colors.blue,
                  borderRadius: 50,
                }}></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {

              setid(itemData.item.id)
              setDescriptionPopup(true);
              setDescription(
                itemData.item.motor !== null
                  ? itemData.item.comments
                  : itemData.item.property !== null
                    ? itemData.item.comments
                    : '',
              );
            }}
            style={{
              height: '45%',
              width: '100%',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <View
              style={{
                height: '50%',
                width: '100%',

                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{ width: '50%' }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#191919',
                    fontWeight: 'bold',
                  }}>
                  {itemData.item.motor !== null
                    ? itemData.item.name
                    : itemData.item.property !== null
                      ? itemData.item.name
                      : ''}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#19191966',
                  }}>
                  {itemData.item.motor !== null
                    ? itemData.item.createdOn
                    : itemData.item.property !== null
                      ? itemData.item.createdOn
                      : ''}
                </Text>
              </View>
            </View>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 10,
                color: '#19191966',
                fontWeight: 'bold',
              }}>
              {itemData.item.motor !== null
                ? itemData.item.comments
                : itemData.item.property !== null
                  ? itemData.item.comments
                  : ''}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: '15%',
              width: '100%',
              marginTop: 5,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `tel:${itemData.item.motor !== null
                    ? itemData.item.phoneNo
                    : itemData.item.property !== null
                      ? itemData.item.phoneNo
                      : ''
                  }`,
                );
              }}
              style={{
                width: '30%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Icon name="phone" size={20} color={Colors.blue} />
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',

                  marginLeft: 10,
                  color: '#191919',
                }}>
                {itemData.item.motor !== null
                  ? itemData.item.phoneNo
                  : itemData.item.property !== null
                    ? itemData.item.phoneNo
                    : ''}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IoIcon name="md-mail-outline" size={20} color={Colors.blue} />
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',

                  marginLeft: 10,
                  color: '#191919',
                }}>
                {itemData.item.motor !== null
                  ? itemData.item.email
                  : itemData.item.property !== null
                    ? itemData.item.email
                    : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    dispatch(AllNotification.getInTouchAction(userInfo?.access_token, page));
    setIsFetching(false);
  };
  const onRefresh = () => {
    setPage(1);
    dispatch(AllNotification.clearGetInTouchAction());
    setIsFetching(true);
    fetchData();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <Loader successModalShown={loader} />
      <BackHeader
        title="CUSTOMER ENQUIRIES"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '95%', marginTop: 10, paddingBottom: 50 }}>
          {allGetInTouchData.length == 0 ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13, color: 'black', fontFamily: FontFamily.Medium }}>
                No Data Available
              </Text>
            </View>
          ) : (
            <FlatList
              onEndReached={() => setPage(page + 1)}
              showsVerticalScrollIndicator={false}
              data={allGetInTouchData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderList}
              onRefresh={onRefresh}
              refreshing={isFetching}
            />
          )}
        </View>
      </View>
      {/* <GetInTouchModal
        onCross={() => setDescriptionPopup(false)}
        description={description}
        visible={descriptionPopup}
      /> */}

      <GetinTouchModalWithRemarks
        onCross={() => setDescriptionPopup(false)}
        description={description}
        visible={descriptionPopup}
        id={id}
        token={userInfo?.access_token}
      />

      <SuccessModal
        modelOff={() => {
          onRefresh();
          setSucessModal(false);
        }}
        visible={successModal}
        msg="Marked as read."
        title="OK"
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,

    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  listTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '600',
  },
});

export default GetInTouch;
