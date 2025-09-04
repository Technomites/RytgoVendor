import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';

import MyInput from '../../Components/UISupport/MyInput';
import AuthButton from '../../Components/UISupport/AuthButton';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import { useSelector } from 'react-redux';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { FontFamily } from '../../Constants/Fonts';
import MyFormInputTile from "../../Components/UISupport/MyFormInputTile"
const PostAnAddStep3 = props => {
  const type = props.route.params.type;

  const catId = props?.route?.params?.catId;
  const rent = props.route.params.rent;

  const data = props.route.params.data ? props.route.params.data : null;

  const update = props.route.params.update ? props.route.params.update : false;

  const [successModelShow, setSuccessShow] = useState(false);
  const [formFields, setFormFields] = useState({
    title: data?.name ? data?.name : data?.title ? data?.title : '',
    arTitle: data?.nameAr ? data?.nameAr : data?.titleAr ? data?.titleAr : '',

    newPrice: data?.price
      ? data?.price?.toString()
      : data?.salePrice
        ? data?.salePrice?.toString()
        : '',
    description: data?.longDescription
      ? data?.longDescription
      : data?.description
        ? data?.description
        : '',
    arDescription: data?.longDescriptionAr
      ? data?.longDescriptionAr
      : data?.descriptionAr
        ? data?.descriptionAr
        : '',
    catId: catId,
    type: type,
    rent: rent,
    updateAddId: data?.id ? data?.id : null,
    latitude: data?.latitude ? data?.latitude : null,
    longitude: data?.longitude ? data?.longitude : null,
  });
  const richText = useRef();
  const richTextAR = useRef();

  const [modalShown, setModalShown] = useState(false);
  const [errorMessage, setMessage] = useState('');

  const nextHandler = () => {
    if (formFields.title.length === 0) {
      setMessage('Title is required');
      setModalShown(true);
    } else if (formFields.arTitle.length === 0) {
      setMessage('Title (Arabic) is required');
      setModalShown(true);
    } else if (formFields.newPrice.length === 0) {
      setMessage('Price is required');
      setModalShown(true);
    } else {
      console.log(data)
      props.navigation.navigate('postAdd4', {
        formData: formFields,
        data: data,
        update: update,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%', width: '100%' }}>
        <KeyboardAvoidingView>
          <BackHeader
            title="Post an Ad"
            onPress={() => props.navigation.goBack()}
          />
          {/* TOP HEADING */}
          <View
            style={{
              height: 70,
              marginTop: 20,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '10%',
                width: '20%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.blue,
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.blue,
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.blue,
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                }}></View>
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                }}></View>
            </View>

            <View
              style={{
                height: '70%',
                width: '55%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  textAlign: 'center',
                  fontFamily: FontFamily.Bold
                }}>
                General Information
              </Text>
              {/* <Text style={{ fontSize: 15, color: 'gray', fontWeight: '400' }}>
                
              </Text> */}
            </View>
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{ width: '90%' }}>
              <MyInput
                value={formFields.title}
                onChangeText={text =>
                  setFormFields({
                    ...formFields,
                    title: text,
                  })
                }
                formTitle="Title"
                placeHolder="Enter title here"
              />

              <MyInput
                value={formFields.arTitle}
                onChangeText={text =>
                  setFormFields({
                    ...formFields,
                    arTitle: text,
                  })
                }
                formTitle="Title (Arabic)"
                placeHolder="أدخل العنوان هنا"
              />

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* <View style={{width: '48%'}}>
                  <MyInput
                    value={formFields.oldPrice}
                    number
                    onChangeText={text =>
                      setFormFields({
                        ...formFields,
                        oldPrice: text,
                      })
                    }
                    formTitle="Old Price"
                    placeHolder="AED  د.إ"
                  />
                </View> */}

                <View style={{ width: '100%' }}>
                  <MyInput
                    value={formFields.newPrice}
                    number
                    onChangeText={text =>
                      setFormFields({
                        ...formFields,
                        newPrice: text,
                      })
                    }
                    formTitle={rent ? 'Rent (Yearly)' : 'Price'}
                    placeHolder="AED  د.إ"
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: Colors.black,
                    marginVertical: 8,
                    fontFamily: FontFamily.Medium,
                    fontSize: 17
                  }}>
                  Description
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  borderRadius: 10,
                  borderColor: 'lightgray',
                  borderWidth: 2,
                  paddingVertical: 5,
                }}>
                <ScrollView>
                  <RichEditor
                    androidHardwareAccelerationDisabled={true}
                    placeholder="Enter description here"
                    editorStyle={{
                      backgroundColor: Colors.bgGray,
                      borderColor: 'black',
                      borderWidth: 1,
                    }}
                    disabled={false}
                    initialContentHTML={
                      formFields?.description ? formFields?.description : ''
                    }
                    containerStyle={{ borderRadius: 10 }}
                    ref={richText}
                    onChange={descriptionText => {

                      setFormFields({
                        ...formFields,
                        description: descriptionText,
                      });
                    }}
                  />
                </ScrollView>
              </View>

              <RichToolbar
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                ]}
              />
              {/* <MyInput
                value={formFields.description}
                onChangeText={text =>
                  setFormFields({
                    ...formFields,
                    description: text,
                  })
                }
                placeHolder="Enter description here"
                formTitle="Description"
                desc
              /> */}

              <View>
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginVertical: 8,
                    fontSize: 17
                  }}>
                  Description (Arabic)
                </Text>

                <View
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    borderWidth: 2,
                    paddingVertical: 5,
                  }}>
                  <ScrollView>
                    <RichEditor
                      androidHardwareAccelerationDisabled={true}
                      placeholder="Enter arabic description here"
                      editorStyle={{
                        backgroundColor: Colors.bgGray,
                        borderColor: 'black',
                        borderWidth: 1,
                        color: "gray"
                      }}
                      initialContentHTML={
                        formFields?.arDescription
                          ? formFields?.arDescription
                          : null
                      }
                      containerStyle={{ borderRadius: 10 }}
                      ref={richTextAR}
                      onChange={descriptionText => {
                        setFormFields({
                          ...formFields,
                          arDescription: descriptionText,
                        });
                      }}
                    />
                  </ScrollView>
                </View>

                <RichToolbar
                  editor={richTextAR}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                  ]}
                />
              </View>

              {/* <MyInput
                value={formFields.arDescription}
                onChangeText={text =>
                  setFormFields({
                    ...formFields,
                    arDescription: text,
                  })
                }
                formTitle="Description (Arabic)"
                placeHolder="أدخل الوصف هنا"
                desc
              /> */}
              <View style={{ marginTop: 10 }}>
                <AuthButton onPress={nextHandler} title="NEXT" />
              </View>
            </View>
          </View>

          <SuccessModal
            modelOff={() => {
              setSuccessShow(false);
              props.navigation.navigate('Home');
            }}
            visible={successModelShow}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <PopUpModel
        visible={modalShown}
        message={errorMessage}
        onPress={() => setModalShown(false)}
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    height: 70,
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextStyle: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '600',
  },
  imagePickTile: {
    height: 100,
    width: 100,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
    borderStyle: 'dashed',
  },
});

export default PostAnAddStep3;
