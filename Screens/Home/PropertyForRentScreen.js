import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native"

import Colors from "../../Constants/Colors"
import BackHeader from '../../Components/UISupport/BackHeader'
import { rantAddList } from "../../Data/DummyData"
import { BaseURL } from "../../Constants/BaseUrl"
import { useSelector, useDispatch } from "react-redux"
import { FontFamily } from '../../Constants/Fonts'
const PropertyForRentScreen = (props) => {
    const type = props.route.params.type
    const rent = props.route.params.rent




    const userInfo = useSelector((state) => state.auth.userInfo)
    const [category, SetCategory] = useState()

    useEffect(() => {
        const getcategory = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer $${userInfo?.access_token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BaseURL}//api/v1/${type}/filter/en/categories`, requestOptions)
                .then(response => response.json())
                .then(result => SetCategory(result?.data))
                .catch(error => console.log('error', error));
        }

        getcategory()

    }, [type])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
            <ScrollView style={{ height: "100%", width: "100%" }}>
                <BackHeader title="Post an Ad" onPress={() => props.navigation.goBack()} />
                {/* TOP HEADING */}
                <View style={{ height: 70, marginTop: 20, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: "10%", width: "20%", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.blue, borderRadius: 10 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.blue, borderRadius: 10 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.gray, borderRadius: 10 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.gray, borderRadius: 10 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.gray, borderRadius: 10 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: Colors.gray, borderRadius: 10 }}></View>
                    </View>

                    <View style={{ height: "70%", width: "55%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: Colors.black, fontFamily: FontFamily.Bold, textAlign: "center" }}>Select the right category for your Ad</Text>
                        {/* <Text style={{ fontSize: 14, color: "gray", fontWeight: "400" }}>Select one of the option</Text> */}
                    </View>

                </View>

                <View style={{ width: "100%", marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "90%", }}>
                        {
                            category?.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item?.id} onPress={() =>

                                        props.navigation.navigate("postAdd3", {
                                            type: type,
                                            catId: item.id,
                                            rent: rent
                                        })
                                    } style={Styles.tileContainer} >
                                        <Text style={Styles.listTextStyle}>{item?.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </View>





            </ScrollView>
        </SafeAreaView >
    )
}

const Styles = StyleSheet.create({
    tileContainer: {
        height: 55,
        width: "100%",
        backgroundColor: "lightgray",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"




    },
    listTextStyle: {
        fontSize: 15,
        color: Colors.black,
        fontFamily: FontFamily.Medium


    }

})


export default PropertyForRentScreen
