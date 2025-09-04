import React from "react"
import {
    Text, View, TextInput, TouchableOpacity, StyleSheet
} from "react-native"

import IoIcon from "../Icon/IoIcon"
import Colors from "../../Constants/Colors"
import { FontFamily } from "../../Assets/Fonts"
const MyInput = props => {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{ color: Colors.black, fontFamily:FontFamily.Bold }}>{props.formTitle}</Text>
            <View style={props.desc ? Styles.containerDescription : Styles.container}>
                {
                    props.children
                }

            </View>
        </View>

    )
}
const Styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "lightgray",
        flexDirection: "row",
        marginTop: 5
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
export default MyInput