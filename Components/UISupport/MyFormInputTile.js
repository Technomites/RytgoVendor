import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import IoIcon from '../Icon/IoIcon';
import Color from '../../Constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/Feather';
import { FontFamily } from '../../Constants/Fonts';
import {
  fontSize,
  scalableWidth,
  scalableheight,
} from '../../Constants/Scalables';

const MyFormInputTile = props => {
  return (


    <View style={{ ...Styles.container, ...props.containerStyle }}>
      <View style={{ height: '100%', width: '85%', }}>
        {/* {props?.date ? (
          <Text style={Styles.textInput}>{props.value.toString()}</Text>
        ) : ( */}
        <TextInput
          editable={props.disable ? false : true}
          autoCapitalize={props.capitalize ? props.capitalize : 'sentences'}
          numberOfLines={props.inputLine}
          keyboardType={props.keyboardType}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholderTextColor={
            props.placeholderTextColor ? props.placeholderTextColor : 'grey'
          }
          secureTextEntry={props.secure}
          placeholder={props.placeHolder}
          style={Styles.textInput}
          maxLength={props.textLength ? props.textLength : null}
        />
        {/* )} */}
      </View>
      <TouchableOpacity
        onPress={props.onIconPress}
        style={Styles.clickStyle}>
        {props.percentage && props.percentage ? (
          <Feather
            name={'percent'}
            color={Color.otptextColor}
            size={fontSize.twentytwo}></Feather>
        ) : props?.date ? (
          <FontAwesome5
            name={props.iconName}
            color={props.color ? props.color : Color.btnBgColor}
            size={fontSize.twentytwo}
          />
        ) : (
          <IoIcon
            name={props.iconName}
            color={props.color ? props.color : Color.btnBgColor}
            size={fontSize.twentytwo}
          />
        )}
      </TouchableOpacity>
    </View>


  );
};

export default MyFormInputTile;

const Styles = StyleSheet.create({
  container: {
    height: scalableheight.seven, //50
    backgroundColor: Color.inputBg,
    width: '100%',
    flexDirection: 'row',
    borderRadius: scalableWidth.twoPointNine, //10
    marginTop: 5
  },
  textInput: {
    marginLeft: scalableWidth.twoPointNine, //10
    width: '100%',
    height: '100%',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: fontSize.fifteen,
    fontFamily: FontFamily.Medium

  },
  clickStyle: {
    height: scalableheight.seven, //50
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
