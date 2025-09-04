import React from "react"
import {
    View, Text, TouchableOpacity

} from "react-native"
import Colors from "../../Constants/Colors"
import { FontFamily } from "../../Constants/Fonts"
import IoIcon from "../Icon/IoIcon"

const BackHeader = props => {
    return (
        <View style={{ height: 50, width: "100%", justifyContent: "center", flexDirection: "row" }}>
            <TouchableOpacity onPress={props.onPress} style={{ height: 50, width: "15%", justifyContent: "center", alignItems: "center" }}>
                <IoIcon name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ height: 50, width: "70%", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: FontFamily.Bold, color: Colors.black, fontSize: 15 }}>{props.title}</Text>
            </View>
            <TouchableOpacity style={{ height: 50, width: "15%", justifyContent: "center", alignItems: "center" }}>

            </TouchableOpacity>
        </View>
    )
}
export default BackHeader