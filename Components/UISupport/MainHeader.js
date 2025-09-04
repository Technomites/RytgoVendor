import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { BaseURL } from '../../Constants/BaseUrl';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import MaIcon from '../Icon/MaIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as AllNotification from '../../Store/Action/DataAction';

const MainHeader = props => {
  const count = useSelector(state => state.data.requestCount);
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllNotification.getRequestCount(userInfo.access_token));
  }, []);

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
      }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IoIcon name="reorder-three" size={35} color="black" />
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          width: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{ height: 50, width: 120, resizeMode: 'contain' }}
          source={require('../../Assets/Images/logo.png')}
        />
      </View>
      <TouchableOpacity
        onPress={props.onNotification}
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <MaIcon name="bell-outline" size={25} color="black" />
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: Colors.blue,
            borderRadius: 50,
            bottom: 10,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 8, fontWeight: 'bold', color: Colors.white }}>
            {count}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default MainHeader;
