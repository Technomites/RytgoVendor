import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Switch,
  ActivityIndicator,
  StatusBar,
  
} from 'react-native';
import BackHeader from '../../../Components/UISupport/BackHeader';
import Colors from '../../../Constants/Colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useSelector, useDispatch} from 'react-redux';
import * as AddAction from '../../../Store/Action/AddsAction';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaIcon from '../../../Components/Icon/MaIcon';
import Loader from '../../../Components/UISupport/Loader';
import ConfirmationModelSold from '../../../Components/UISupport/ConfirmationModelSold';

const Top = createMaterialTopTabNavigator();

const PropertyScreen = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.userInfo);
  const managePropertyAdd = useSelector(state => state.add.managePropertyAdd);
  const loader = useSelector(state => state.add.managePropertyLoder);

  const marksoldloader = useSelector(state => state.add.marksoldloader);
  const marksoldpropertresult = useSelector(state => state.add.marksoldpropertresult);

  const [page, setPage] = useState(1);
const [soldindex, setsoldindex] = useState(0)
const [confirmationmodelvisible, setconfirmationmodelvisible] = useState(false)
const [itemid, setitemid] = useState(0)


  useEffect(() => {
    const getAllProperty = async () => {
      await dispatch(AddAction.managePropertyAdd(userInfo.access_token, page));
    };
    getAllProperty();
  }, [page]);

  useEffect(() => {
if(marksoldpropertresult == "success"){
  let data = [...managePropertyAdd]


data[soldindex].isSold = true
data[soldindex].soldDate = "Sold just a minute ago"

dispatch(AddAction.updatedproertydata(data))
  
}
dispatch(AddAction.clearmarkitemsold())
  }, [marksoldpropertresult]);



  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    setPage(1);

    dispatch(AddAction.managePropertyAdd(userInfo.access_token, page));

    setIsFetching(false);
  };
  const onRefresh = () => {
    dispatch(AddAction.manageAddClearproperties());
    setIsFetching(true);
    fetchData();
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',

        alignItems: 'center',
      }}>
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList
          onEndReached={() => setPage(page + 1)}
          showsVerticalScrollIndicator={false}
          data={managePropertyAdd}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={itemData => (
            <View style={{...Styles.listContainer, paddingHorizontal: 5, backgroundColor: itemData?.item?.isActive ? "white" :'lightgrey' }}>
              <View
                style={{
                  height: 80,
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
          
                }}>
                {itemData.item?.thumbnail ? (
                  <Image
                    source={{
                      uri: itemData?.item?.thumbnail
                        ? itemData?.item?.thumbnail
                        : 'https://www.freeiconspng.com/thumbs/building-icon/office-building-icon-32.png',
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      resizeMode: 'contain',
                      borderRadius: 5,
                    }}
                  />
                ) : (
                  <MaIcon name="office-building" size={50} />
                )}
              </View>

              <View
                style={{height: 80, width: '50%', justifyContent: 'center',  paddingHorizontal: 5, }}>
                <TouchableOpacity
                disabled={itemData?.item?.isActive ? false : true}
                  onPress={() =>
               
                    props.navigation.navigate('manageAddDetail', {
                      data: itemData.item,
                      type: 'Property',
                      rent: false,
                    })
                  }
                  style={{width: '100%', height:"100%",  justifyContent:"center", }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      color:
                        itemData?.item?.approvalStatus === 3
                          ? Colors.blue
                          : itemData?.item?.approvalStatus === 1
                          ? 'oranges'
                          : itemData?.item?.approvalStatus === 2
                          ? 'orange'
                          : 'red',
                    }}>
                    {itemData?.item?.approvalStatus === 3
                      ? 'APPROVED'
                      : itemData?.item?.approvalStatus === 1
                      ? 'NEW'
                      : itemData?.item?.approvalStatus === 2
                      ? 'PENDING APPROVAL'
                      : 'REJECTED'}
                  </Text>

                

                  <Text
                  numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {itemData?.item?.title.trim()}
                  </Text>
                  {itemData?.item?.isPremium == true || itemData?.item?.isVerified == true || itemData?.item?.isFeatured == true ?
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                    {itemData?.item?.isPremium ? "Premium" : null}
                  </Text>
                  {itemData?.item?.isPremium &&
                 <View style={{height:3, width:3, borderRadius:45, backgroundColor:"grey", marginHorizontal:3}}></View>}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                   {itemData?.item?.isVerified ? "Verified": null}
                  </Text>
                  {itemData?.item?.isVerified &&
                  <View style={{height:3, width:3, borderRadius:45, backgroundColor:"grey", marginHorizontal:3}}></View>
          }
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                    {itemData?.item?.isFeatured ? "Featured" : null}
                  </Text>
                  </View> : null}
                  {/* <Text style={{fontSize: 10, color: 'gray'}}>
                    {itemData?.item?.licensePlate}
                  </Text> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 80,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {itemData?.item?.approvalStatus === 3 ? (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>
                      {itemData?.item?.isPublished !== true
                        ? 'Unpublished'
                        : 'Published'}
                    </Text>
                    <Switch
                      disabled={itemData?.item?.isActive ? false : true}
                      trackColor={{false: '#767577', true: Colors.gray}}
                      thumbColor={
                        itemData?.item?.isActive ? Colors.blue : '#f4f3f4'
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={async () => {
                        await dispatch(
                          AddAction.propertyPublish(
                            userInfo?.access_token,
                            itemData?.item.id,
                            itemData?.item.isPublished,
                          ),
                        );
                      }}
                      value={itemData?.item?.isPublished}
                    />
                    {itemData?.item?.isSold ?
                    <Text  style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>{itemData?.item?.soldDate}</Text>
                    :

                    marksoldloader == true && itemData?.index == soldindex ? 

                      <ActivityIndicator size={'small'} color="#0989B8" />
                      
                      :
                <TouchableOpacity
                disabled={itemData?.item?.isActive ? false : true}
                style={{marginTop: 5}}
               
                onPress={() => {
                  console.log(itemData?.index)
                  setsoldindex(itemData?.index)
               setitemid(itemData?.item?.id)
               setconfirmationmodelvisible(true)
             
                  // {{Endpoint}}/api/v1/vendor/properties/{{propertyId}}/Sold
                  // {{Endpoint}}/api/v1/vendor/cars/{{carId}}/Sold
                }}
                >
                   <Text  style={{fontSize: 10, fontWeight: "bold", color: Colors.blue}}>MARK SOLD</Text>
                  </TouchableOpacity>
                
              
              }
                  </View>
                ) : (
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                )}
              </View>
            </View>
          )}
        />
      </View>
      {/* <Loader successModalShown={loader} /> */}


      <ConfirmationModelSold
        onCross={() => setconfirmationmodelvisible(false)}
        description={""}
        visible={confirmationmodelvisible}
        onPress={() => {
          setconfirmationmodelvisible(false)
          dispatch(AddAction.markitemsold(userInfo.access_token, "properties", itemid,  ))

        }}


      />
      
    </View>
  );
};

const MotorScreen = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.userInfo);
  const manageCar = useSelector(state => state.add.manageCarAdd);
  const loader = useSelector(state => state.add.manageCarLoder);
  const [page, setPage] = useState(1);

  const marksoldloader = useSelector(state => state.add.marksoldloader);
  const marksoldmotorresult = useSelector(state => state.add.marksoldmotorresult);


const [soldindex, setsoldindex] = useState(0)
const [confirmationmodelvisible, setconfirmationmodelvisible] = useState(false)
const [itemid, setitemid] = useState(0)
  useEffect(() => {
    const getAllCars = async () => {
      await dispatch(AddAction.manageCarAdd(userInfo.access_token, page));
    };
    getAllCars();
  }, [page]);


  useEffect(() => {
    if(marksoldmotorresult == "success"){
      let data = [...manageCar]
    
    
    data[soldindex].isSold = true
    data[soldindex].soldDate = "Sold just a minute ago"
    
   
    dispatch(AddAction.updatedmotordata(data))
      
    }
    dispatch(AddAction.clearmarkitemsold())
      }, [marksoldmotorresult]);
  

  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    setPage(1);
    dispatch(AddAction.manageCarAdd(userInfo.access_token, page));
    setIsFetching(false);
  };
  const onRefresh = () => {
    dispatch(AddAction.manageAddClearmotors());

 
    setIsFetching(true);
    fetchData();
  };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',

        alignItems: 'center',
      }}>
      <View style={{width: '90%', marginTop: 10}}>
        {/* <Loader successModalShown={loader} /> */}
        <FlatList
          onEndReached={() => setPage(page + 1)}
          showsVerticalScrollIndicator={false}
          data={manageCar}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={onRefresh}
          refreshing={isFetching}
          renderItem={itemData => (
            <View style={{...Styles.listContainer, justifyContent:"center", alignItems:"center",  backgroundColor: itemData?.item?.isActive ? "white" :'lightgrey' }}>
              <View
                style={{
                  height: 80,
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
               
                }}>
                {itemData.item.thumbnail ? (
                  <Image
                    source={{
                      uri: itemData?.item?.thumbnail
                        ? itemData?.item?.thumbnail
                        : 'https://www.freeiconspng.com/thumbs/building-icon/office-building-icon-32.png',
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      resizeMode: 'contain',
                      borderRadius: 5,
                    }}
                  />
                ) : (
                  <MaIcon name="car" size={50} />
                )}
              </View>

              <View
                style={{height: 80, width: '50%', justifyContent: 'center', }}>
                <TouchableOpacity
                   disabled={itemData?.item?.isActive ? false : true}
                  onPress={() =>
               
                    props.navigation.navigate('manageAddDetail', {
                      data: itemData.item,
                      type: 'Car',
                      rent: false,
                    })
                  }
                  style={{width: '100%', height: "100%", justifyContent:"center", }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      color:
                        itemData?.item?.approvalStatus === 3
                          ? Colors.blue
                          : itemData?.item?.approvalStatus === 1
                          ? 'oranges'
                          : itemData?.item.approvalStatus === 2
                          ? 'orange'
                          : 'red',
                    }}>
                    {itemData?.item?.approvalStatus === 3
                      ? 'APPROVED'
                      : itemData?.item?.approvalStatus === 1
                      ? 'NEW'
                      : itemData?.item?.approvalStatus === 2
                      ? 'PENDING APPROVAL'
                      : 'REJECTED'}
                  </Text>
             
                  <Text
                  numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: Colors.black,
                    }}>
                    {itemData?.item?.name}
                  </Text>
                  {itemData?.item?.isPremium == true || itemData?.item?.isVerified == true || itemData?.item?.isFeatured == true ?
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                    {itemData?.item?.isPremium ? "Premium" : null}
                  </Text>
                  {itemData?.item?.isPremium &&
                 <View style={{height:3, width:3, borderRadius:45, backgroundColor:"grey", marginHorizontal:3}}></View>}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                   {itemData?.item?.isVerified ? "Verified": null}
                  </Text>
                  {itemData?.item?.isVerified &&
                  <View style={{height:3, width:3, borderRadius:45, backgroundColor:"grey", marginHorizontal:3}}></View>
          }
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      
                      color: "grey"
                    }}>
                    {itemData?.item?.isFeatured ? "Featured" : null}
                  </Text>
                  </View>
                  : null}
                  {/* <Text style={{fontSize: 10, color: 'gray'}}>
                    {itemData?.item?.licensePlate}
                  </Text> */}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 80,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {itemData.item.approvalStatus === 3 ? (
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>
                      {itemData?.item?.isPublished !== true
                        ? 'Unpublished'
                        : 'Published'}
                    </Text>
                    <Switch
                       disabled={itemData?.item?.isActive ? false : true}
                      trackColor={{false: '#767577', true: Colors.gray}}
                      thumbColor={
                        itemData.item.isActive ? Colors.blue : '#f4f3f4'
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={async () => {
                        await dispatch(
                          AddAction.carPublish(
                            userInfo.access_token,
                            itemData?.item.id,
                            itemData?.item?.isPublished,
                          ),
                        );
                      }}
                      value={itemData?.item?.isPublished}
                    />
                           {itemData?.item?.isSold ?
                    <Text  style={{fontSize: 10, fontWeight: '500', color: 'gray'}}>{itemData?.item?.soldDate}</Text>
                    :

                    marksoldloader == true && itemData?.index == soldindex ? 

                      <ActivityIndicator size={'small'} color="#0989B8" />
                      
                      :
                <TouchableOpacity
                style={{marginTop: 5}}
                disabled={itemData?.item?.isActive ? false : true}
                onPress={() => {
                  console.log(itemData?.index)
                  setsoldindex(itemData?.index)
               setitemid(itemData?.item?.id)
               setconfirmationmodelvisible(true)
             
                  // {{Endpoint}}/api/v1/vendor/properties/{{propertyId}}/Sold
                  // {{Endpoint}}/api/v1/vendor/cars/{{carId}}/Sold
                }}
                >
                   <Text  style={{fontSize: 10, fontWeight: "bold", color: Colors.blue}}>MARK SOLD</Text>
                  </TouchableOpacity>
                
              
              }
                  </View>
                ) : (
                  <View
                    style={{
                      height: '100%',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                )}
              </View>
            </View>
          )}
        />
      </View>
      <ConfirmationModelSold
        onCross={() => setconfirmationmodelvisible(false)}
        description={""}
        visible={confirmationmodelvisible}
        Motor = {true}
        onPress={() => {
          setconfirmationmodelvisible(false)
          dispatch(AddAction.markitemsold(userInfo.access_token, "cars", itemid,  ))

        }}


      />
    </View>
  );
};

// const TopNavigator = props => {
//   return (
//     <Top.Navigator
//       tabBarOptions={{
//         activeTintColor: Colors.blue,
//         tabStyle: {height: 50},
//         labelStyle: {fontSize: 12, fontWeight: 'bold', letterSpacing: 1},
//         indicatorStyle: {
//           height: 3,
//           backgroundColor: Colors.blue,
//           borderRadius: 5,
//         },
//       }}>
//       <Top.Screen name="Properties" component={PropertyScreen} />
//       <Top.Screen name="Motors" component={MotorScreen} />
//     </Top.Navigator>
//   );
// };
const ManScreen = props => {
  const route = props?.route?.params?.route;

  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgGray}}>
      <StatusBar backgroundColor={Colors.bgGray} barStyle="dark-content" />
      <BackHeader
        title="Manage Ads"
        onPress={async () => {
          await dispatch(AddAction.manageAddClear());
          props.navigation.goBack();
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
    height: 80,
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

    elevation: 0.5,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listContainerTouch: {
    height: 70,
    width: '90%',
    backgroundColor: Colors.white,
    marginVertical: 10,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ManScreen;
