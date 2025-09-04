import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, View, ActivityIndicator} from 'react-native';

import Colors from '../../Constants/Colors';
const Loader = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.successModalShown}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    </Modal>
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
    height: 250,
    width: '90%',

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
});

export default Loader;
