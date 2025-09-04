import React from 'react';
import { Modal, StyleSheet, Text, View, StatusBar } from 'react-native';
import Colors from '../../Constants/Colors';
import IoIcon from '../Icon/IoIcon';
import AuthButton from './AuthButton';
import { FontFamily } from '../../Constants/Fonts';
const AccountDeleteWarning = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={'#00000099'}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000099',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{

              width: '80%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20
            }}>


            <Text
              style={{

                fontSize: 15,
                color: Colors.black,
                textAlign: 'center',
                width: '95%',
                fontFamily: FontFamily.Medium
              }}>
              {"Are you sure you want to delete this accoung?"}
            </Text>
            <View style={{ width: '90%', marginTop: 15, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ width: "45%", }}>
                <AuthButton
                  bgColor={"green"}
                  onPress={props.onPressYes}
                  title={'Yes'}
                />

              </View>
              <View style={{ width: "45%", }}>
                <AuthButton
                  onPress={props.onPressNo}
                  title={"No"}
                />
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

export default AccountDeleteWarning;
