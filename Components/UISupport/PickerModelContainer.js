import React from "react"
import {
    Text, View, TextInput, TouchableOpacity, StyleSheet
} from "react-native"

import IoIcon from "../Icon/IoIcon"
import Colors from "../../Constants/Colors"
import {
    fontSize,
    scalableWidth,
    scalableheight,
} from '../../Constants/Scalables';
import { FontFamily } from "../../Constants/Fonts";


const PickerModelContainer = props => {
    return (
        <View style={{ marginVertical: 5, }}>
            <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17, marginBottom: 5 }}>{props.formTitle}</Text>
            <TouchableOpacity onPress={props.onPicker} style={Styles.container}>
                <View style={{ height: 50, width: props.small ? "76%" : "85%", justifyContent: "center", }}>
                    <Text style={{ fontSize: 15, color: props.valueHave ? Colors.black : "gray", marginLeft: 10, fontFamily: FontFamily.Medium }}>{props.pickValue}</Text>
                </View>

                <View style={{ height: 50, width: "15%", justifyContent: "center", alignItems: "center" }}>
                    <IoIcon name="caret-down" size={15} color="black" />
                </View>
            </TouchableOpacity>
        </View>

    )
}
const Styles = StyleSheet.create({
    container: {
        height: scalableheight.seven, //50
        backgroundColor: Colors.inputBg,
        width: '100%',
        flexDirection: 'row',
        borderRadius: scalableWidth.twoPointNine, //10
        marginTop: 5,
        // paddingTop: scalableheight.pointFour

    },
    textInput: {
        marginLeft: 10,
        height: 50,
        width: "95%",
        marginRight: 20,
        color: Colors.black
    },
    clickStyle: {
        height: 50,
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    containerDescription: {
        height: 80,
        width: "100%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgray",
        flexDirection: "row",
        marginTop: 5
    }
})
export default PickerModelContainer