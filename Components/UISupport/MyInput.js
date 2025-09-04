import React from "react"
import {
    Text, View, TextInput, TouchableOpacity, StyleSheet
} from "react-native"
import Colors from "../../Constants/Colors"
import {
    scalableWidth,
    scalableheight,
} from '../../Constants/Scalables';
import { FontFamily } from "../../Constants/Fonts";
const MyInput = props => {
    return (
        <View style={{

        }}>
            <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17, marginBottom: 5 }}>{props.formTitle}</Text>
            <View style={props.desc ? Styles.containerDescription : Styles.container}>
                <TextInput
                    editable={props.editable}
                    value={props.value}
                    keyboardType={props.number ? "numeric" : "default"}
                    onChangeText={props.onChangeText}
                    placeholderTextColor={"grey"}
                    placeholder={props.placeHolder}
                    style={Styles.textInput} />
            </View>
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
        fontSize: 17, color: 'black', fontFamily: FontFamily.Medium, marginBottom: 5
    },
    textInput: {
        marginLeft: 10,
        height: scalableheight.seven,
        width: "95%",
        marginRight: 20,
        color: Colors.black,
        fontFamily: FontFamily.Medium,
        fontSize: 17

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