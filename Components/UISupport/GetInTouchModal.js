import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import AuthButton from './AuthButton';
import Icon from 'react-native-vector-icons/Entypo';

const GetInTouchModal = props => {
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
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{margin: 20, width: '100%', width: '90%'}}>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 20,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <View style={{width: '90%'}}></View>
                <TouchableOpacity
                  onPress={props.onCross}
                  style={{
                    width: '10%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="circle-with-cross"
                    size={20}
                    color={Colors.blue}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#191919',
                  textAlign: 'center',
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 0.5,
                  marginBottom: 5,
                  paddingBottom: 5,
                }}>
                Description
              </Text>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#19191966',
                    textAlign: 'justify',
                  }}>
                  {props.description}
                </Text>
              </View>
            </View>
          </ScrollView>
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

export default GetInTouchModal;
