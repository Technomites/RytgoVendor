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
} from 'react-native';

import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import { myNotoficationData } from '../../Data/DummyData';
import * as AllNotification from '../../Store/Action/DataAction';
import { useDispatch, useSelector } from 'react-redux';
import { BaseURL } from '../../Constants/BaseUrl';
import Loading from '../../Components/UISupport/Loader';
import { FontFamily } from '../../Constants/Fonts';
const MyAlert = props => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const allNotification = useSelector(state => state.data.allNotifiction);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   dispatch(AllNotification.clearNotificationAction());
  //   dispatch(AllNotification.getRequestCount(userInfo.access_token));

  //   setPage(1);
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllNotification.getRequestCount(userInfo.access_token));
  }, []);

  //GET ALL NOTIFICATION URL Trigger in every page changes
  useEffect(() => {
    dispatch(AllNotification.getAllNotification(userInfo?.access_token, page));
  }, [page]);

  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = () => {
    setPage(1);
    dispatch(AllNotification.clearNotificationAction());
    setIsFetching(true);
    dispatch(AllNotification.getAllNotification(userInfo?.access_token, 1));
    setIsFetching(false);
  };

  const renderList = itemData => {
    const readRequestHandler = () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userInfo?.access_token}`);
      setLoad(true);
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `${BaseURL}/api/v1/notifications/${itemData.item.id}/read`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result.status === 'success') {
            dispatch(
              AllNotification.getAllNotificationUpdate(itemData.item.id),
            );

            setLoad(false);
          } else {
            setLoad(false);
          }
        })
        .catch(error => console.log('error', error));
    };

    return (
      <TouchableOpacity
        onPress={readRequestHandler}
        disabled={itemData.item.isRead}
        style={Styles.tileContainer}>
        <View
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../Assets/Images/notificationIcon.png')}
            style={{ height: 50, width: 50, resizeMode: 'cover' }}
          />
        </View>
        <View style={{ height: '100%', width: '70%', marginTop: 10 }}>
          <Text style={{ fontFamily: FontFamily.Bold, color: Colors.black }}>
            {itemData.item.title}
          </Text>
          <Text
            style={{

              color: 'gray',
              fontSize: 12,
              width: '100%',
              fontFamily: FontFamily.Medium
            }}>
            {itemData.item.description}
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.Regular,
              color: Colors.gray,
              fontSize: 10,
              marginTop: 5,
            }}>
            {itemData.item.date}
          </Text>
        </View>
        <View style={{ height: '100%', width: '10%' }}>
          {!itemData.item.isRead && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors.blue,
                borderRadius: 50,
              }}></View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <BackHeader title="My Alerts" onPress={() => props.navigation.goBack()} />
      <Loading successModalShown={load} />
      <View
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '95%', marginTop: 10, paddingBottom: 50 }}>
          <FlatList
            onEndReached={() => setPage(page + 1)}
            showsVerticalScrollIndicator={false}
            data={allNotification}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
            onRefresh={onRefresh}
            refreshing={isFetching}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 90,
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

export default MyAlert;
