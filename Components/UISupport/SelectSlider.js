import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Constants/Colors';
const SelectSlider = props => {
  return (
    <View style={{width: '100%', height: 80}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 30,
          marginVertical: 10,
        }}>
        <Icon name={props.iconName} size={12} color="black" />
        <Text
          style={{
            color: Colors.black,
            fontWeight: '600',
            marginLeft: 5,
          }}>
          {props.heading}
        </Text>
      </View>

      <FlatList
        horizontal
        data={props.data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={props.renderItem}
        // renderItem={itemData => {
        //   return (
        //     <TouchableOpacity
        //       onPress={props.onPress}
        //       style={{
        //         height: 40,
        //         width: 40,
        //         marginHorizontal: 5,
        //         borderRadius: 50,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         ...props.style,
        //       }}>
        //       <Text style={props.textStyle}>{props.value}</Text>
        //     </TouchableOpacity>
        //   );
        // }}
      />
    </View>
  );
};
export default SelectSlider;
