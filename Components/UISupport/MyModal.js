import React, { useState } from "react";
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from "../../Constants/Colors";

const MyModal = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visible}


            >
                <View style={{ flex: 1, backgroundColor: "#00000099", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: "35%", width: "90%", backgroundColor: Colors.white, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                        {
                            props.children
                        }
                    </View>
                </View>

            </Modal>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default MyModal;