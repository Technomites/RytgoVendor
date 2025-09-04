import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import IoIcon from '../Icon/IoIcon';
import Colors from '../../Constants/Colors';
const MyFormInput = props => {
  return (
    <View style={Styles.container}>
      {props.phone && (
        <View style={{height: '100%', justifyContent: 'center', marginLeft: 10}}>
          <Text style={{color: 'black'}}>+917</Text>
        </View>
      )}

      <TextInput
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={Colors.gray}
        secureTextEntry={props.secure}
        placeholder={props.placeHolder}
        style={Styles.textInput}
      />
      <TouchableOpacity onPress={props.onIconPress} style={Styles.clickStyle}>
        <IoIcon name={props.iconName} color={Colors.blue} />
      </TouchableOpacity>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    flexDirection: 'row',
    marginTop: 5,
  },
  textInput: {
    marginLeft: 10,
    height: 50,
    width: '80%',
    color: Colors.black,
  },
  clickStyle: {
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MyFormInput;
