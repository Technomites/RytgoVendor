import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Constants/Colors';
import AuthButton from '../UISupport/AuthButton';
import MaIcon from '../Icon/MaIcon';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ValidPaymenModal = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '70%',
              width: '90%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '95%',
                width: '90%',
              }}>
              <View
                style={{
                  height: '20%',

                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.gray,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '50%',

                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: Colors.black,
                    }}>
                    {props.title}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '800',
                      color: Colors.gray,
                    }}>
                    {props.propertyLimit} properties
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '800',
                      color: Colors.gray,
                    }}>
                    {props.motorLimit} Motors
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '50%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: Colors.blue,
                    }}>
                    {props.price} AED
                  </Text>
                </View>
              </View>

              <View
                style={{
                  height: '30%',

                  width: '100%',
                }}>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: Colors.black,
                    }}>
                    Details
                  </Text>
                </View>

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: Colors.black,
                      }}>
                      Days Left
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,

                        color: 'gray',
                      }}>
                      {props.daysLeft}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: Colors.black,
                      }}>
                      Price Per Day
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,

                        color: 'gray',
                      }}>
                      {props.pricePerDay}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: Colors.black,
                      }}>
                      Package Price
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,

                        color: 'gray',
                      }}>
                      {props.packagePrice}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: Colors.black,
                      }}>
                      Compensation Amount
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,

                        color: 'gray',
                      }}>
                      {props.comAmount}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: Colors.blue,
                      }}>
                      Price Payable
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: Colors.blue,
                      }}>
                      {props.pricePaybell}
                    </Text>
                  </View>
                </View>
         
              </View>

         

              <View style={{marginTop: 50}}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {props.pay && (
                    <View style={{width: '100%'}}>
                      {props.loader ? (
                        <ActivityIndicator size={'large'} color={Colors.blue} />
                      ) : (
                        <AuthButton onPress={props.onPayNow} title="PAY NOW" />
                      )}
                    </View>
                  )}

                  {props.getStarted && (
                    <View style={{width: '100%'}}>
                      {props.loader ? (
                        <ActivityIndicator size={'large'} color={Colors.blue} />
                      ) : (
                        <AuthButton onPress={props.onGetStarted} title="GET STARTED" />
                      )}
                    </View>
                  )}

             

                  {props.msg ? (
                <View
                  style={{
                  
                    padding: 20,
                    marginTop: 20,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'red',
                      textAlign: 'center',
                    }}>
                    {props.msg}
                  </Text>
                </View>
              ) : null}

              {props.msgCar ? (
                <View
                  style={{
                    paddingHorizontal: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'red',
                      textAlign: 'center',
                    }}>
                    {props.msgCar}
                  </Text>
                </View>
              ) : null}

              {props.allowMsg ? (
                <View
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'red',
                      textAlign: 'center',
                    }}>
                    The package can't be updated/downgraded
                  </Text>
                </View>
              ) : null}

<TouchableOpacity
                    disabled={props.disabled}
                    onPress={props.onCancel}
                    style={{
                      height: 50,
                      width: '100%',

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 15, color: Colors.blue}}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ValidPaymenModal;
