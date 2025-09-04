import React, {useState, useEffect} from 'react';
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
import ListTile from '../../Components/UISupport/ListTile';
import StatusChangeModal from '../../Components/UISupport/StatusChangeModal';

import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import {myNotoficationData} from '../../Data/DummyData';
import * as AllNotification from '../../Store/Action/DataAction';
import {useDispatch, useSelector} from 'react-redux';
import IoIcon from '../../Components/Icon/IoIcon';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BaseURL} from '../../Constants/BaseUrl';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import Loader from '../../Components/UISupport/Loader';
import GetInTouchModal from '../../Components/UISupport/GetInTouchModal';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


const PropertyScreen = props => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const dispatch = useDispatch();
    const GetPropertData = useSelector(state => state.data.GetPropertData);
  const GetMotorData = useSelector(state => state.data.GetMotorData);
    const propertyReq = useSelector(state => state.data.propertyRequest);

    const requestingstatusloader = useSelector(state => state.data.requestingstatusloader);
    const requestresponse = useSelector(state => state.data.requestresponse);

    const [page, setPage] = useState(1);




  
    const [successModal, setSucessModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [description, setDescription] = useState(false);
    const [modalloader, setmodalloader] = useState(false);
    const [selectstatus, setselectstatus] = useState(false);
    const [status, setstatus] = useState("Pending");
    const [editindex, seteditindex] = useState(false);
    const [itemid, setitemid] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const getAllNtification = async () => {
    
            
          await dispatch(
            AllNotification.getallProperties(userInfo?.access_token, page),
          );
    

    
    
        };
        getAllNtification();
      }, [page]);
  
      useEffect(() => {
        if(requestresponse == "success" ){
          console.log("suxxessfull")
          setselectstatus(false)
          let data = [...GetPropertData]
    
          for(const index in data){
            if(index == editindex){
              console.log(data[index].status)
              console.log(status)
              data[index].status = status
              console.log(data[index].status)
            }
          }
          dispatch(
            AllNotification.storepropertydata(data)
          );
           dispatch(
            AllNotification.clearrequestresponse()
          );
       
        }
      }, [requestresponse]);
  
    const fetchData = () => {
        dispatch(
            AllNotification.getallProperties(userInfo?.access_token, page),
          );
      setIsFetching(false);
    };
    const onRefresh = () => {
    

      dispatch(AllNotification.clearGetPropertydata());
      setIsFetching(true);
 
      if(page == 1){
        fetchData();
        setPage(1);
      }else{
        setPage(1);
        setIsFetching(false);
      }
    };
  
    return (
      <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
        {GetPropertData?.length !== 0 ? (
          <View style={{width: '90%', marginTop: 10, marginBottom: 10}}>
            <FlatList
              onEndReached={() => setPage(page + 1)}
              showsVerticalScrollIndicator={false}
              data={GetPropertData}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={onRefresh}
              refreshing={isFetching}
              renderItem={itemData => {
                return (
                    <View style={Styles.tileContainer}>
                    <View style={{height: '100%', width: '100%'}}>
                      <TouchableOpacity
                     
                        onPress={() => {
                         setstatus(itemData.item.status)
                            seteditindex(itemData.index)
                            setselectstatus(true)
                            setitemid(itemData.item.id)
                          
                            console.log(itemData.item)
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
                            borderWidth:0.5, borderColor:'lightgray', borderRadius: 5,
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
                                itemData.item.property !== null
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
                             <Text style={{fontSize: 10, color: '#19191966'}}>
                            {`Ad Reference Code: ${
                              itemData.item.property !== null
                                ? itemData.item.property.adsReferenceCode
                                : ''
                            }`}
                          </Text>
                          <Text
                            style={{fontSize: 12, fontWeight: 'bold', color: '#191919'}}>
                            {itemData.item.property !== null
                              ? itemData.item.property.name
                              : ''}
                          </Text>
            
                         
                        </View>
            
                        <View
           
              style={{
                height: '100%',
           
                alignItems: 'center',
                right: 2,
                position:"absolute"
              }}>
              <Text
                style={{
                
color: Colors.blue,
fontSize:12,
top: -2
             
                 
                }}>
                  {itemData.item.status}
                </Text>
            </View>
                      </TouchableOpacity>
            
                      <TouchableOpacity
                        onPress={() => {
                          setDescriptionPopup(true);
                          setDescription(itemData.item.message);
                        }}
                        style={{
                          height: '45%',
                          width: '100%',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        
                        }}>
                          <View style={{flexDirection:"row",    height: '50%', }}>
                        <View
                          style={{
                            height: '100%',
                            width: '40%',
                        
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View style={{width: '100%'}}>
                            <Text
                            numberOfLines={1}
                              style={{
                                fontSize: 13,
                                color: '#191919',
                                fontWeight: 'bold',
                              }}>
                             {itemData.item?.customer?.customerName}
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
                        <View style={{ flexDirection:"row", width:"60%", justifyContent:"flex-end"}}>
                        <View
                          style={{
                            height: '100%',
                    
                          
                         
                    
                          }}>
                      
                         <Text   style={{
                            fontSize: 14,
                            color: '#0989B8',
                            fontWeight: 'bold',
                         
                          }}>{itemData.item.meetingDate}</Text>
                         <Text style={{
                           fontSize: 10,
                           color: 'black',
                           fontWeight: 'bold',
                         }}>{itemData.item.bookedTime}</Text>


                        </View>
                        <View
                          style={{
                            height: '100%',
              marginLeft: 5,
                  justifyContent:"center"
                         
                    
                          }}>
                      
                      <Image
                                    resizeMode="cover"
                                    source={require('../../Assets/Images/time.png')}
                                    style={{height: "90%", width: 35, resizeMode: 'contain'}}
                                  />
                        </View>
                        </View>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 10,
                            color: '#19191966',
                            fontWeight: 'bold',
                          }}>
                          {itemData.item.message}
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
                              `tel:${
                                itemData.item.customer !== null
                                  ? itemData.item.customer.customerPhone
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
                            {itemData.item.customer !== null
                              ? itemData.item.customer.customerPhone
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
                                {itemData.item.customer !== null
                              ? itemData.item.customer.customerEmail
                              : ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
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


<StatusChangeModal
        onCross={() => setselectstatus(false)}
        description={""}
        visible={selectstatus}
        statusofitem= {status}
        loader={requestingstatusloader}
        onPress={(status) => {
        setstatus(status)
            dispatch(AllNotification.updateRequestsstatus(userInfo?.access_token, "VideoTourStatus", status, itemid));
       
       

        }}


      />
            <GetInTouchModal
        onCross={() => setDescriptionPopup(false)}
        description={description}
        visible={descriptionPopup}
      />
      </View>
    );
  };
  
  const MotorScreen = props => {
    const carRequest = useSelector(state => state.data.carRequest);
    const GetMotorData = useSelector(state => state.data.GetMotorData);
    const requestingstatusloader = useSelector(state => state.data.requestingstatusloader);
    const requestresponse = useSelector(state => state.data.requestresponse);

  
    const [successModal, setSucessModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [description, setDescription] = useState(false);
    const [modalloader, setmodalloader] = useState(false);
    const [selectstatus, setselectstatus] = useState(false);
    const [status, setstatus] = useState("Pending");
    const [editindex, seteditindex] = useState(false);
    const [itemid, setitemid] = useState(false);

    const userInfo = useSelector(state => state.auth.userInfo);
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
  
    const [page, setPage] = useState(1);
  
    useEffect(() => {
        const getAllNtification = async () => {
    
    
          await dispatch(
            AllNotification.getallmotors(userInfo?.access_token, page),
          );
    
    
        };
        getAllNtification();
      }, [page]);
  
      useEffect(() => {
        if(requestresponse == "success" ){
          console.log("suxxessfull")
          setselectstatus(false)
          let data = [...GetMotorData]
    
          for(const index in data){
            if(index == editindex){
              console.log(data[index].status)
              console.log(status)
              data[index].status = status
              console.log(data[index].status)
            }
          }
          dispatch(
            AllNotification.storegetmotordata(data)
          );
           dispatch(
            AllNotification.clearrequestresponse()
          );
       
        }
      }, [requestresponse]);
  
    const fetchData = () => {
        dispatch(
            AllNotification.getallmotors(userInfo?.access_token, 1),
          );
      setIsFetching(false);
    };
    const onRefresh = () => {


    
    
      dispatch(AllNotification.clearGetmotordata());
      setIsFetching(true);
 
      if(page == 1){
        fetchData();
        setPage(1);
      }else{
        setPage(1);
        setIsFetching(false);
      }
  
    };
    return (
      <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
        {GetMotorData?.length !== 0 ? (
          <View style={{width: '90%', marginTop: 10, marginBottom: 10}}>
            <FlatList
              onEndReached={() => setPage(page + 1)}
              showsVerticalScrollIndicator={false}
              data={GetMotorData}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={onRefresh}
              refreshing={isFetching}
              renderItem={itemData => {
                return (
                    <View style={Styles.tileContainer}>
                    <View style={{height: '100%', width: '100%'}}>
                      <TouchableOpacity
                        disabled={itemData.item.markRead}
                        onPress={() => {
                            setstatus(itemData.item.status)
                            seteditindex(itemData.index)
                            setselectstatus(true)
                            setitemid(itemData.item.id)
                          
                            console.log(itemData.item)
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
                            borderWidth:0.5, borderColor:'lightgray', borderRadius: 5,
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
                              <Text style={{fontSize: 10, color: '#19191966'}}>
                            {`Ad Reference Code: ${
                              itemData.item.motor !== null
                                ? itemData.item.motor.adsReferenceCode
                                : itemData.item.property !== null
                                ? itemData.item.property.adsReferenceCode
                                : ''
                            }`}
                          </Text>
                          <Text
                            style={{fontSize: 12, fontWeight: 'bold', color: '#191919'}}>
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
        
             alignItems: 'center',
             right: 2,
             position:"absolute"
           }}>
           <Text
             style={{
             
color: Colors.blue,
fontSize:12,
top: -2
          
              
             }}>
               {itemData.item.status}
             </Text>
         </View>
                      </TouchableOpacity>
            
                      <TouchableOpacity
                        onPress={() => {
                          setDescriptionPopup(true);
                          setDescription(itemData.item.message);
                        }}
                        style={{
                          height: '45%',
                          width: '100%',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        
                        }}>
                          <View style={{flexDirection:"row",    height: '50%', }}>
                        <View
                          style={{
                            height: '100%',
                            width: '40%',
                        
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View style={{width: '100%'}}>
                            <Text
                            numberOfLines={1}
                              style={{
                                fontSize: 13,
                                color: '#191919',
                                fontWeight: 'bold',
                              }}>
                             {itemData.item?.customer?.customerName}
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
                        <View style={{ flexDirection:"row", width:"60%", justifyContent:"flex-end"}}>
                        <View
                          style={{
                            height: '100%',
                    
                          
                         
                    
                          }}>
                      
                         <Text   style={{
                            fontSize: 14,
                            color: '#0989B8',
                            fontWeight: 'bold',
                         
                          }}>{itemData.item.meetingDate}</Text>
                         <Text style={{
                           fontSize: 10,
                           color: 'black',
                           fontWeight: 'bold',
                         }}>{itemData.item.bookedTime}</Text>
                        </View>
                        <View
                          style={{
                            height: '100%',
              marginLeft: 5,
                  justifyContent:"center"
                         
                    
                          }}>
                      
                      <Image
                                    resizeMode="cover"
                                    source={require('../../Assets/Images/time.png')}
                                    style={{height: "90%", width: 35, resizeMode: 'contain'}}
                                  />
                        </View>
                        </View>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 10,
                            color: '#19191966',
                            fontWeight: 'bold',
                          }}>
                          {itemData.item.message}
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
                              `tel:${
                                itemData.item.customer !== null
                                  ? itemData.item.customer.customerPhone
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
                            {itemData.item.customer !== null
                              ? itemData.item.customer.customerPhone
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
                                {itemData.item.customer !== null
                              ? itemData.item.customer.customerEmail
                              : ''}
                          </Text>
                        </View>
                      </View>
                    </View>


                  </View>
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

<StatusChangeModal
        onCross={() => setselectstatus(false)}
        description={""}
        visible={selectstatus}
        statusofitem= {status}
        loader={requestingstatusloader}
        onPress={(status) => {
        setstatus(status)
            dispatch(AllNotification.updateRequestsstatus(userInfo?.access_token, "VideoTourStatus", status, itemid));
       
       

        }}


      />

<GetInTouchModal
        onCross={() => setDescriptionPopup(false)}
        description={description}
        visible={descriptionPopup}
      />
      </View>
    );
  };


const VideoTourRequests = props => {
  const userInfo = useSelector(state => state.auth.userInfo);

  
  const route = props?.route?.params?.route;
  const [page, setPage] = useState(1);
  const [successModal, setSucessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [descriptionPopup, setDescriptionPopup] = useState(false);
  const [description, setDescription] = useState(false);

  const Top = createMaterialTopTabNavigator();
  const dispatch = useDispatch();


 

  //GET ALL NOTIFICATION URL Trigger in every page changes


 



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgGray}}>
    <BackHeader
      title="VIDEO TOURS"
      onPress={() => {
        props.navigation.navigate('Properties');
        props.navigation.navigate('Home');
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

export default VideoTourRequests;
