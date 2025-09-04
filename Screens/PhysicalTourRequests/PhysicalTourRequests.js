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
import StatusChangeModal from '../../Components/UISupport/StatusChangeModal';

const PhysicalTourRequests = props => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const allGetInTouchData = useSelector(state => state.data.getInTuchData);
  const GetPhysicalTour = useSelector(state => state.data.GetPhysicalTour);
  const requestingstatusloader = useSelector(state => state.data.requestingstatusloader);
  const requestresponse = useSelector(state => state.data.requestresponse);
  
  const [page, setPage] = useState(1);
  const [successModal, setSucessModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalloader, setmodalloader] = useState(false);
  const [selectstatus, setselectstatus] = useState(false);
  const [status, setstatus] = useState("Pending");
  const [descriptionPopup, setDescriptionPopup] = useState(false);
  const [editindex, seteditindex] = useState(false);
  const [description, setDescription] = useState(false);
  const [itemid, setitemid] = useState(false);
  const dispatch = useDispatch();

  //GET ALL NOTIFICATION URL Trigger in every page changes
  useEffect(() => {
    const getAllNtification = async () => {
      await dispatch(
        AllNotification.getPhysicalTourRequests(userInfo?.access_token, page),
      );
    };
    getAllNtification();
  }, [page]);


  useEffect(() => {
    if(requestresponse == "success" ){
      console.log("suxxessfull")
      setselectstatus(false)
      let data = [...GetPhysicalTour]

      for(const index in data){
        if(index == editindex){
          console.log(data[index].status)
          console.log(status)
          data[index].status = status
          console.log(data[index].status)
        }
      }
      dispatch(
        AllNotification.storePhysicalTour(data)
      );
       dispatch(
        AllNotification.clearrequestresponse()
      );
   
    }
  }, [requestresponse]);

  
  const renderList = itemData => {
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
              setDescription(itemData.item.description);
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
             
              }}>{itemData.item.bookedDate}</Text>
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
              {itemData.item.description}
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
  };
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    dispatch(AllNotification.getPhysicalTourRequests(userInfo?.access_token, 1));
    setIsFetching(false);
  };
  const onRefresh = () => {
    dispatch(AllNotification.ClearPhysicalTourRequests());
    

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
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.bgGray}}>
      <Loader successModalShown={loader} />
      <BackHeader
        title="PHYSICAL TOURS"
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '95%', marginTop: 10, paddingBottom: 50}}>

        {GetPhysicalTour.length == 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, color: 'black'}}>
           No Data Available
          </Text>
        </View>
      ) : (
          <FlatList
            onEndReached={() => setPage(page + 1)}
            showsVerticalScrollIndicator={false}
            data={GetPhysicalTour}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
            onRefresh={onRefresh}
            refreshing={isFetching}
          />)}
        </View>
      </View>
      <GetInTouchModal
        onCross={() => setDescriptionPopup(false)}
        description={description}
        visible={descriptionPopup}
      />
   <StatusChangeModal
        onCross={() => setselectstatus(false)}
        description={""}
        visible={selectstatus}
        statusofitem= {status}
        loader={requestingstatusloader}
        onPress={(status) => {
        setstatus(status)
            dispatch(AllNotification.updateRequestsstatus(userInfo?.access_token, "PhysicalTourStatus", status, itemid));
       
       

        }}


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

export default PhysicalTourRequests;
