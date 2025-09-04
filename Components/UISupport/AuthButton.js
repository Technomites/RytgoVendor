import React from "react"
import {
    TouchableOpacity, Text, StyleSheet
} from "react-native"
import Colors from "../../Constants/Colors"
import { FontFamily } from "../../Assets/Fonts"
const AuthButton = props => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={Styles.mainContainer}>
            <Text style={{ fontSize: 15, color: Colors.white, fontFamily: FontFamily.Medium }}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: "100%",
        backgroundColor: Colors.blue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

    }
})
export default AuthButton