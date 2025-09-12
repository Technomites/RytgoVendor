import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import BackHeader from '../../Components/UISupport/BackHeader';
import Colors from '../../Constants/Colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HomeScreenListData} from '../../Data/DummyData';
import ListTile from '../../Components/UISupport/ListTile';
import {useSelector, useDispatch} from 'react-redux';
import * as ManageCarAction from '../../Store/Action/DataAction';
import { FontFamily } from '../../Constants/Fonts';
import { Safeareacontext } from '../../Constants/SafeAreaContext';
const Top = createMaterialTopTabNavigator();

const PropertyScreen = props => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();

  const propertyReq = useSelector(state => state.data.propertyRequest);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllManageCar = async () => {
      dispatch(
        ManageCarAction.getAllManagePropSep(userInfo.access_token, page),
      );
    };
    getAllManageCar();
  }, [page]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    dispatch(ManageCarAction.getAllManagePropSep(userInfo.access_token, page));
    dispatch(ManageCarAction.getAllManageCarSep(userInfo.access_token, page));
    setIsFetching(false);
  };
  const onRefresh = () => {
    setPage(1);
    dispatch(ManageCarAction.clearALlManagePropSep());
    setIsFetching(true);
    fetchData();
  };

  return (
    <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
      {propertyReq?.length !== 0 ? (
        <View style={{width: '90%', marginTop: 10, marginBottom: 10}}>
          <FlatList
            onEndReached={() => setPage(page + 1)}
            showsVerticalScrollIndicator={false}
            data={propertyReq}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={onRefresh}
            refreshing={isFetching}
            renderItem={itemData => {
              return (
                <ListTile
                  onPress={() => {
                    props?.navigation?.navigate('requestDetail', {
                      reqData: itemData.item,
                    });
                  }}
                  time={itemData?.item?.createdOn}
                  flag={itemData?.item?.isFlaged ? true : false}
                  imageUrl={itemData?.item?.customer?.image}
                  name={itemData?.item?.customer?.name}
                  landName={itemData?.item?.title}
                />
              );
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '90%',
            marginTop: 10,
            height: '90%',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: Colors.blue}}>
            No request found
          </Text>
        </View>
      )}
    </View>
  );
};

const MotorScreen = props => {
  const carRequest = useSelector(state => state?.data?.carRequest);

  const userInfo = useSelector(state => state?.auth?.userInfo);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllManageCar = async () => {
      await dispatch(
        ManageCarAction.getAllManageCarSep(userInfo.access_token, page),
      );
    };
    getAllManageCar();
  }, [page]);

  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    dispatch(ManageCarAction.getAllManagePropSep(userInfo.access_token, page));
    dispatch(ManageCarAction.getAllManageCarSep(userInfo.access_token, page));
    setIsFetching(false);
  };
  const onRefresh = () => {
    setPage(1);
    dispatch(ManageCarAction.clearALlManageCarSep());
    setIsFetching(true);
    fetchData();
  };
  return (
    <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
      {carRequest?.length !== 0 ? (
        <View style={{width: '90%', marginTop: 10, marginBottom: 10}}>
          <FlatList
            onEndReached={() => setPage(page + 1)}
            showsVerticalScrollIndicator={false}
            data={carRequest}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={onRefresh}
            refreshing={isFetching}
            renderItem={itemData => {
              return (
                <ListTile
                  onPress={() => {
                    props?.navigation?.navigate('requestDetail', {
                      reqData: itemData.item,
                    });
                  }}
                  time={itemData.item?.createdOn}
                  imageUrl={itemData.item?.customer.image}
                  flag={itemData.item?.isFlaged ? true : false}
                  name={itemData.item?.customer?.name}
                  landName={itemData.item?.title}
                />
              );
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '90%',
            marginTop: 10,
            height: '90%',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: Colors.blue}}>
            No request found
          </Text>
        </View>
      )}
    </View>
  );
};

const TopNavigator = () => {
  return (
    <Top.Navigator
      initialRouteName="Properties"
      tabBarOptions={{
        activeTintColor: Colors.blue,
        tabStyle: {height: 50},
        labelStyle: {fontSize: 12, fontWeight: 'bold', letterSpacing: 1},
        indicatorStyle: {
          height: 3,
          backgroundColor: Colors.blue,
          borderRadius: 5,
        },
      }}>
      <Top.Screen name="Properties" component={PropertyScreen} />
      <Top.Screen name="Motors" component={MotorScreen} />
    </Top.Navigator>
  );
};
const ManScreen = props => {
  const route = props?.route?.params?.route;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgGray,

      paddingTop: Safeareacontext.top

    }}>
      <BackHeader
        title="CUSTOM REQUESTS"
        onPress={() => {
          props?.navigation?.navigate('Properties');
          props?.navigation?.navigate('Home');
        }}
      />
      <Top.Navigator
        initialRouteName={route ? route : null}
        tabBarOptions={{
          activeTintColor: Colors.blue,
          tabStyle: {height: 50},
          labelStyle: {fontSize: 12, fontWeight: 'bold', letterSpacing: 1},
          indicatorStyle: {
            height: 3,
            backgroundColor: Colors.blue,
            borderRadius: 5,
          },
        }}>
        <Top.Screen name="Properties" component={PropertyScreen} />
        <Top.Screen name="Motors" component={MotorScreen} />
      </Top.Navigator>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  listContainer: {
    height: 70,
    width: '100%',
    backgroundColor: Colors.white,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ManScreen;
