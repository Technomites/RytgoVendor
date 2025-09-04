import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import AuthButton from './AuthButton';
import Icon from 'react-native-vector-icons/Entypo';

const StatusChangeModal = props => {
    const [statuses, setstatuses] = useState([
        {status: "Pending"},
        {status: "Confirmed"},
        {status: "Completed"},
        {status: "Canceled"},
    ]);
  
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                width:"70%"
              }}>
              <TouchableOpacity
                    onPress={props.onCross}
                style={{
               
            
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  position:"absolute",
                  top:5,
                  right:5,
                  zIndex:5
            
                }}>
              
              <Icon
                    name="circle-with-cross"
                    size={20}
                    color={Colors.blue}
                  />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#191919',
                  textAlign: 'center',
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 0.5,
               
                  paddingBottom: 5,
                }}>
                Status
              </Text>
              <View style={{width: '100%'}}>
                {props.loader == false ?
              statuses.map(item => {
              {
                return (
                    <TouchableOpacity
                    style={{width:"100%", alignItems:"center", paddingVertical:5, backgroundColor: props.statusofitem.toLowerCase() == item.status.toLowerCase() ? "#0989B8" : null, borderRadius: 15}}
                    onPress={() => props.onPress(item.status)}
                    >
                <Text 
                style={{
                    fontSize:14,
                    fontWeight:"bold",
                    color: props.statusofitem.toLowerCase() == item.status.toLowerCase() ? "white" : "black"
                }}
                >{item.status}</Text>
                </TouchableOpacity>
                );
              }
            })
            : 
            <View style={{paddingVertical: 10}}>
            <ActivityIndicator size={'large'} color="#0989B8" />
            </View>
            
            }
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

export default StatusChangeModal;
