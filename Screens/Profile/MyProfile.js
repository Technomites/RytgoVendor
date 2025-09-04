import React, { useState, useEffect } from "react"
import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import BackHeader from "../../Components/UISupport/BackHeader"
import Colors from "../../Constants/Colors"
import MaIcon from "../../Components/Icon/MaIcon"
import MyInput from "../../Components/UISupport/MyInput"
import AuthButton from "../../Components/UISupport/AuthButton"
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from "react-redux"
import *as UserAction from "../../Store/Action/DataAction"
import PopUpModel from "../../Components/UISupport/PopUpModel"
import SuccessModal from "../../Components/UISupport/SuccessModal"

const MyProfile = props => {

    const userInfo = useSelector((state) => state.auth.userInfo)
    const userInformation = useSelector((state) => state.data.userProfile)
    const loader = useSelector((state) => state.data.loader)
    const resMessage = useSelector((state) => state.data.profileMessage)


    const dispatch = useDispatch()

    const [pickImge, setPickImage] = useState()

    const pickProfileImage = async () => {
        ImagePicker.openPicker({

            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 10,
            mediaType: "photo",
            includeBase64: true

        }).then(response => { setPickImage(response) })
            .catch(e => console.log(e, "Error"))
    }

    const [formData, setFormData] = useState({
        name: userInformation?.name,
        email: userInformation?.emailAddress,
        phoneNumber: userInformation?.mobileNo
    })

    const [message, setMessage] = useState()
    const [popUpModal, setPopUpModal] = useState(false)




    const profileHandler = async () => {
        if (pickImge) {
            dispatch(UserAction.updateUserProfile(
                userInfo.access_token,
                formData.name,
                formData.email,
                formData.phoneNumber
            ))


            dispatch(UserAction.userProfileImage(
                userInfo.access_token,
                pickImge
            ))

        }
        dispatch(UserAction.updateUserProfile(
            userInfo.access_token,
            formData.name,
            formData.email,
            formData.phoneNumber
        ))

    }

    useEffect(() => {
        if (resMessage) {
            setMessage(resMessage)
            setPopUpModal(true)
        }
    }, [resMessage])



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
            <ScrollView>
                <BackHeader onPress={() => props.navigation.goBack()} title="My Profile" />
                <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={{ width: "85%", justifyContent: "center", alignItems: "center" }}>
                        {/* USER IMAGE CONTAINER */}

                        <View style={{ height: 200, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={{ uri: pickImge?.path ? pickImge?.path : userInformation?.image }}
                                style={{ height: 120, width: 120, borderRadius: 60, resizeMode: "cover" }}
                            />

                            <View style={{ height: 50, width: 50, backgroundColor: "white", borderRadius: 50, bottom: 20, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={pickProfileImage} style={{ height: 45, width: 45, backgroundColor: Colors.blue, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                                    <MaIcon name="camera-plus" color={Colors.white} size={20} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View >
                            <MyInput
                                formTitle="Name"
                                placeHolder="Enter name here"
                                onChangeText={(text) => setFormData({
                                    ...formData,
                                    name: text
                                })}
                                value={formData.name}
                            />
                        </View>
                        <View >
                            <MyInput
                                editable={false}
                                formTitle="Email"
                                placeHolder="Enter email here"
                                value={formData.email}
                                onChangeText={(text) => setFormData({
                                    ...formData,
                                    email: text
                                })}
                            />
                        </View>
                        <View >
                            <MyInput
                                formTitle="Phone Number"
                                placeHolder="Enter phone number here"
                                value={formData.phoneNumber}
                                onChangeText={(text) => setFormData({
                                    ...formData,
                                    phoneNumber: text
                                })}
                                number

                            />
                        </View>

                        <View style={{ width: "100%", marginTop: 20 }}>
                            {
                                loader ? <ActivityIndicator size="large" color={Colors.blue} /> : <AuthButton onPress={profileHandler} title="SAVE CHANGES" />
                            }
                        </View>



                    </View>
                </View>
            </ScrollView>
            <SuccessModal title="OK" msg={resMessage} modelOff={async () => {
                dispatch(UserAction.deleteResMessage())
                dispatch(UserAction.getUserProfileInfo(userInfo?.access_token))
                setPopUpModal(false)
                setMessage()
                
            }} visible={popUpModal} message={message} />
        </SafeAreaView>
    )
}
export default MyProfile