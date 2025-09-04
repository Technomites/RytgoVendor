import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import Colors from "../../Constants/Colors"
import IoIcon from "../Icon/IoIcon"
const ListTile = props => {
    return (
        <View>
            {
                props.home ? <View style={Styles.container}>
                    <View style={{ height: "100%", width: "20%", justifyContent: "center", alignItems: "center" }}>
                        <Image source={{ uri: props.imageUrl }} style={{ height: 50, width: 50, borderRadius: 50, resizeMode: "cover" }} />
                    </View>
                    <View style={{ height: "100%", width: "75%", justifyContent: "center", marginLeft: 6 }}>
                        <Text style={{ color: Colors.black, fontSize: 12 }}>
                            <Text style={{ fontWeight: "600" }}>{props.name}</Text>
                            <Text> is interested in your </Text>
                            <Text style={{ fontWeight: "600" }}>{props.landName}</Text>
                        </Text>
                        <View style={{ width: "100%", marginTop: 5, justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{ fontSize: 10, color: "gray" }}>{props.time}</Text>
                            <TouchableOpacity style={{ height: 20, width: 20, justifyContent: "center", alignItems: "center" }}>
                                {
                                    props.flag && <IoIcon name="flag" color={Colors.blue} size={20} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
                    :
                    <TouchableOpacity onPress={props.onPress} style={Styles.container}>
                        <View style={{ height: "100%", width: "20%", justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: props.imageUrl }} style={{ height: 50, width: 50, borderRadius: 50, resizeMode: "cover" }} />
                        </View>
                        <View style={{ height: "100%", width: "75%", justifyContent: "center", marginLeft: 6 }}>
                            <Text style={{ color: Colors.black, fontSize: 12 }}>
                                <Text style={{ fontWeight: "600" }}>{props.name}</Text>
                                <Text> is interested in your </Text>
                                <Text style={{ fontWeight: "600" }}>{props.landName}</Text>
                            </Text>
                            <View style={{ width: "100%", marginTop: 5, justifyContent: "space-between", flexDirection: "row" }}>
                               
                                <Text style={{ fontSize: 10, color: "gray" }}>{props.time}</Text>
                                <TouchableOpacity style={{ height: 20, width: 20, justifyContent: "center", alignItems: "center" }}>
                                    {
                                        props.flag && <IoIcon name="flag" color={Colors.blue} size={20} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity >
            }
        </View>

    )
}
// {`${props.name}  is interested in your ${props.landName}`}
const Styles = StyleSheet.create({
    container: {
        height: 80,
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,


        flexDirection: "row",
        // borderColor: "lightgray",
        // borderWidth: 0.5,
        elevation: 0.5
    }
})
export default ListTile