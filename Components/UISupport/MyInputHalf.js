import React from "react"
import {
    Text, View, TextInput, StyleSheet
} from "react-native"

import IoIcon from "../Icon/IoIcon"
import Colors from "../../Constants/Colors"
const MyInput = props => {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{ color: Colors.black, fontWeight: "600" }}>{props.formTitle}</Text>
            <View style={props.desc ? Styles.containerDescription : Styles.container}>
                <TextInput style={{ color: Colors.black }} placeholderTextColor={Colors.gray} placeholder={props.placeHolder} style={Styles.textInput} />
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
        width: "100%"
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