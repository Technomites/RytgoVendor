import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import BackHeader from '../../Components/UISupport/BackHeader';
import Colors from '../../Constants/Colors';
import { myPackagesData } from '../../Data/DummyData';
import IoIcon from '../../Components/Icon/IoIcon';
import { useDispatch, useSelector } from 'react-redux';

import HTMLView from 'react-native-htmlview';
import * as PackageAction from '../../Store/Action/DataAction';
import { handlePayment } from '../../Components/Payment/HandlePayment';

import AuthButton from '../../Components/UISupport/AuthButton';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import ValidPaymenModal from '../../Components/UISupport/ValidPaymenModal';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import { BaseURL } from '../../Constants/BaseUrl';
import { FontFamily } from '../../Constants/Fonts';
const MyPackage = props => {
  const userInfo = useSelector(state => state.auth.userInfo);

  // const allPackages = useSelector(state => state.data.allPackages);
  const [popUp, setPopup] = useState(false);
  const [paymentValidData, setPaymentValidData] = useState();
  const [validPopup, setValidPopup] = useState(false);
  const [proceedLoader, setProceedLoader] = useState(false);

  const userInformation = useSelector(state => state.data.userProfile);
  const [packagePrice, setPackagePrice] = useState();
  const [orderId, setOrderId] = useState();
  const [loader, setLoader] = useState(false);
  const [allPackages, setAllPackages] = useState();
  const [succPaymentModal, setSuccPaymentModal] = useState(false);
  const [selected, setSelected] = useState();
  const [patmentMessage, setPaymentMessage] = useState(
    'Please select any package first.',
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const preItem = allPackages?.find(i => i.isSelected == true);
  //   if (allPackages) {
  //     setSelected(preItem.id);
  //   }
  // }, [allPackages]);

  const getAllPackages = async () => {
    setAllPackages(null);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userInfo.access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/v1/vendor/packages`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.packages) {
          setAllPackages(result.packages);
        } else {
          setPopup(true);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  useEffect(() => {
    setValidPopup(false);
    setLoader(false);
  }, []);

  const apiAction = (orderId, orderNo, invoiceId) => {
    setLoader(false);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userInfo.access_token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${BaseURL}/api/v1/vendor/package/paid/${orderId}?CompensationAmount=${paymentValidData?.package?.costForDaysLeft}&invoiceId=${invoiceId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          setSuccPaymentModal(true);
          setPaymentMessage(result.message);
          setValidPopup(false);
          getAllPackages();
        } else {
          setPopup(true);
          setPaymentMessage(result.message);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView>
        <BackHeader
          onPress={() => props.navigation.goBack()}
          title="Package Upgrade"
        />
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '90%', justifyContent: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontSize: 15, fontFamily: FontFamily.Bold, color: Colors.black }}>
                Select a Package
              </Text>
            </View>

            {allPackages?.map((item, index) => (
              <TouchableOpacity
                disabled={item.isSelected}
                onPress={() => {
                  setSelected(item.id);
                  setPackagePrice(item.price);
                  setOrderId(item.id);
                }}
                style={{

                  width: '100%',
                  backgroundColor: Colors.white,
                  marginVertical: 10,
                  borderRadius: 5,

                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderColor: 'lightgray',
                  backgroundColor: item.isSelected ? '#f0525224' : Colors.white,

                }}
                key={index}>
                <View
                  style={{
                    // height: '100%',
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!item.isSelected && (
                    <IoIcon
                      name="ios-checkmark-circle"
                      size={25}
                      color={selected === item.id ? Colors.blue : Colors.bgGray}
                    />
                  )}
                </View>

                <View style={{
                  // height: '100%', 
                  width: '95%', padding: 10
                }}>
                  <View
                    style={{
                      // height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // height: '80%',
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View style={{ width: '70%' }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: Colors.blue,
                            fontFamily: FontFamily.Bold,
                          }}>
                          PACKAGE {index + 1}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,

                            color: Colors.black,
                            fontFamily: FontFamily.Bold
                          }}>
                          {item?.name} Package
                        </Text>
                        <HTMLView
                          value={item?.description}
                          stylesheet={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: 'gray',
                          }}
                        />
                      </View>

                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Colors.blue,
                            fontFamily: FontFamily.Bold
                          }}>
                          AED {item?.price}
                        </Text>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {item?.billingPeriod}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ width: '90%', marginTop: 5 }}>
            {!proceedLoader ? (
              <AuthButton
                onPress={() => {
                  if (orderId) {
                    var myHeaders = new Headers();
                    myHeaders.append(
                      'Authorization',
                      `Bearer ${userInfo.access_token}`,
                    );

                    var requestOptions = {
                      method: 'GET',
                      headers: myHeaders,
                      redirect: 'follow',
                    };

                    fetch(
                      `${BaseURL}/api/v1/vendor/package/${orderId}/IsAllowed`,
                      requestOptions,

                    )
                      .then(response => response.json())
                      .then(result => {
                        console.log(result)
                        if (result.status === 'success') {
                          setPaymentValidData(result);
                          setValidPopup(true);
                        }
                      })
                      .catch(error => console.log('error', error));
                  } else {
                    setPopup(true);
                  }
                }}
                title="PROCEED TO PAYMENT"
              />
            ) : (
              <ActivityIndicator size="large" color={Colors.blue} />
            )}
          </View>
        </View>
        <PopUpModel
          onPress={() => {
            setPopup(false);
          }}
          visible={popUp}
          message={patmentMessage}
        />
        <SuccessModal
          msg="Package successfully created"
          modelOff={() => {
            setSuccPaymentModal(false);
            setPopup(false);
            setPaymentMessage('Please select any package first.');
            props.navigation.navigate('home');
          }}
          visible={succPaymentModal}
        />

        <ValidPaymenModal
          propertyLimit={paymentValidData?.package?.propertyLimit}
          motorLimit={paymentValidData?.package?.motorLimit}
          title={paymentValidData?.package?.name}
          price={paymentValidData?.package?.packagePrice}
          daysLeft={paymentValidData?.package?.noOfDaysLeft}
          pricePerDay={paymentValidData?.package?.costPerDay}
          packagePrice={paymentValidData?.package?.packagePrice}
          comAmount={paymentValidData?.package?.costForDaysLeft}
          pricePaybell={paymentValidData?.package?.priceToPay}
          msg={
            !paymentValidData?.package?.isAllowed
              ? paymentValidData?.package?.propOverflowMessage
              : ''
          }
          msgCar={
            !paymentValidData?.package?.isAllowed
              ? paymentValidData?.package?.carOverflowMessage
              : ''
          }
          allowMsg={!paymentValidData?.package?.isAllowed}
          onPayNow={() => {
            setLoader(true);
            setValidPopup(false);
            handlePayment(
              paymentValidData?.package?.priceToPay,
              { orderId: orderId, orderNo: '0001' },
              {
                email: userInformation.emailAddress.trim(),
                name: userInformation.name,
                contact: userInformation.mobileNo,
                address: 'test123',
              },
              props.navigation,

              apiAction,
            );
          }}
          onCancel={() => {
            setValidPopup(false);
          }}
          visible={validPopup}
          pay={
            paymentValidData?.package?.isAllowed &&
            !paymentValidData?.package?.isFree
          }
          loader={loader}
          getStarted={
            paymentValidData?.package?.isAllowed &&
            paymentValidData?.package?.isFree
          }
          onGetStarted={() => {
            setLoader(false);
            var myHeaders = new Headers();
            myHeaders.append(
              'Authorization',
              `Bearer ${userInfo.access_token}`,
            );

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              redirect: 'follow',
            };

            fetch(
              `${BaseURL}/api/v1/vendor/package/paid/${orderId}?CompensationAmount=00&invoiceId=null`,
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                if (result.status === 'success') {
                  setSuccPaymentModal(true);
                  setPaymentMessage(result.message);
                  setValidPopup(false);
                  getAllPackages();
                  setSelected(null);
                  setOrderId(null);
                  setPaymentMessage('Please select any package first.');
                } else {
                  setPopup(true);
                  setPaymentMessage(result.message);
                }
              })
              .catch(error => console.log('error', error));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.white,
    marginVertical: 10,
    borderRadius: 5,

    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
});
export default MyPackage;
