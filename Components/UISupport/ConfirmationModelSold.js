import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import AuthButton from './AuthButton';
import Icon from 'react-native-vector-icons/Entypo';

const ConfirmationModelSold = props => {
 
  
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
    

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#191919',
                  textAlign: 'center',
            
               
                  paddingBottom: 5,
                }}>
                {`Are you sure you want to mark this ${props.Motor ? "Motor" : "Property"} as sold ?`}
              </Text>
              <View style={{flexDirection:"row", justifyContent: "center"}}>
              <TouchableOpacity
                    onPress={props.onPress}
                style={{
               
            
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
              
                  zIndex:5,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius:5,
            backgroundColor:'#0989B8'
            
                }}>
              
              <Text style={{fontSize:12, fontWeight:"500", color:"white"}}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                    onPress={props.onCross}
                style={{
               
            
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius:5,
                  zIndex:5
            
                }}>
              
              <Text style={{fontSize:12, fontWeight:"500", color:"black"}}>Cancel</Text>
              </TouchableOpacity>
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

export default ConfirmationModelSold;
