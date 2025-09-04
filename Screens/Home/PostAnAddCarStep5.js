import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Switch,
} from 'react-native';
// import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import IoIcon from '../../Components/Icon/IoIcon';
import MaIcon from '../../Components/Icon/MaIcon';
import MyInput from '../../Components/UISupport/MyInput';
import AuthButton from '../../Components/UISupport/AuthButton';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from "react-native-document-picker"
import Video from 'react-native-video';
import DeleteButton from '../../Components/UISupport/DeleteButton';
import * as AddAction from '../../Store/Action/AddsAction';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import { BaseURL } from '../../Constants/BaseUrl';

import PickerModelContainer from '../../Components/UISupport/PickerModelContainer';
import PickerModel from '../../Components/UISupport/PickerModel';
import SelectSlider from '../../Components/UISupport/SelectSlider';
import { YearsData } from '../../Data/DummyData';
import { FontFamily } from '../../Constants/Fonts';

const PostAnAddCarStep5 = props => {
  const data = props.route.params.data ? props.route.params.data : null;

  const dispatch = useDispatch();

  const [successModelShow, setSuccessShow] = useState(false);
  const [thumbNailImage, setThumbNail] = useState(data?.thumbnail);

  const [images, setImages] = useState(data?.images ? data?.images : []);
  const [floorImages, setFloorImages] = useState(
    data?.document ? data?.document : [],
  );
  // const [inspectionImages, setinspectionImages] = useState(
  //   data?.carInspection ? 
  //   [
  //     {
  //     image: data?.carInspection}
  //   ] : [],
  // );
  const [inspectionImages, setinspectionImages] = useState(
    data?.inspection ? [data?.inspection] : [],
  );
  const [pickVedio, setPickVedio] = useState(data?.video?.video);
  const [videoPuse, setVideo] = useState(false);
  const prevFormDataComplete = props.route.params.formData;
  const longitude = props.route.params.longitude;
  const latitude = props.route.params.latitude;
  const area = props.route.params.area;


  const updateCase = prevFormDataComplete?.prevFormData?.updateAddId
    ? true
    : false;
  const updateCarId = prevFormDataComplete?.prevFormData?.updateAddId;

  const SelectFeatureList = props.route.params.SelectFeatureList;
  const userInfo = useSelector(state => state.auth.userInfo);
  const loader = useSelector(state => state.add.loader);
  const adPost = useSelector(state => state.add.carAd);
  const message = useSelector(state => state.add.carMessage);

  const Succmessage = useSelector(state => state.add.carAddSuccMessage);
  const carId = useSelector(state => state.add.addCatCarId);

  const [modalShown, setModalShown] = useState(false);
  const [masterData, setMasterData] = useState();

  const [selectMake, setSelectMake] = useState(
    data?.carMake ? data?.carMake : null,
  );
  const [hoursePower, setHorsePower] = useState();
  const [transmission, setTransmisstion] = useState(
    data?.transmission?.name ? data?.transmission?.name : null,
  );

  const [modal, setModal] = useState(data?.carModel ? data?.carModel : null);
  const [type, setType] = useState(data?.bodyType ? data?.bodyType : null);

  const [openMakePicker, setOpenMakePicker] = useState(false);
  const [openModalPicker, setOpenModalPicker] = useState(false);
  const [openHorsePowerPicker, setOpenHorsePowerPicker] = useState(false);

  const [openTypePicker, setOpenTypePicker] = useState(false);
  const [regionalSpacModal, setRegionalSpacModal] = useState(false);

  const [pickerSearch, setPickerSearch] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [yearModel, setYearModel] = useState(false);

  const [formFirlds, setFormFields] = useState({
    chesis: data?.sku ? data?.sku : '',
    license: data?.licensePlate ? data?.licensePlate : '',
    year: data?.year ? data?.year : '',
    door: data?.doors?.name ? data?.doors?.name : '',
    cylinders: data?.cylinders ? data?.cylinders : '',
    door: data?.doors?.name ? data?.doors?.name : '',
    prevFormDataComplete,
    SelectFeatureList: SelectFeatureList,
    size: data?.capacity ? data?.capacity : '',
    categoryID: data?.categoryID
      ? data?.categoryID
      : prevFormDataComplete?.prevFormData?.catId,
    selectMake: selectMake,
    hoursePower: data?.horsePower ? data?.horsePower : null,
    transmission: data?.transmission?.name ? data?.transmission?.name : '',
    modal: modal,
    type: type,
    condition: data?.condition ? data?.condition : null,
    capacity: data?.capacity?.name ? data?.capacity?.name : '',
    fueltype: data?.fueltype?.name ? data?.fueltype.name : '',
    cylinders: data?.cylinders?.name ? data?.cylinders?.name : '',
    CATEGORYID: data?.category?.id ? data?.category?.id : null,
    machanicalCondition: data?.mechanicalCondition
      ? data?.mechanicalCondition
      : '',
    wheel: data?.wheels ? data?.wheels : '',
    steeringSide: data?.steeringSide ? data?.steeringSide : '',
    warranty: data?.warranty ? data?.warranty : false,
    serviceHistory: data?.serviceHistory ? data?.serviceHistory : false,
    regionalSpec: data?.regionalSpecification
      ? data?.regionalSpecification
      : '',
    bodyCondition: data?.condition?.name ? data?.condition?.name : '',
    engineCC: data?.engineDisplacement ? data?.engineDisplacement : '',
    fuelEconomy: data?.fueleconomy ? data?.fueleconomy : '',
  });

  const AddPosthandler = async () => {
    const data = {
      formFirlds,
      selectMake,
      hoursePower,
      type,
      transmission,
      modal,
    };

    let GellImgSeperator = [];
    for (const key in images) {
      if (images[key].path) {
        GellImgSeperator.push({
          id: images[key].id,
          path: images[key].path,
          mime: images[key].mime,
        });
      }
    }
    let FloorImages = [];
    for (const key in floorImages) {
      if (floorImages[key].path) {
        FloorImages.push({
          id: floorImages[key].id,
          path: floorImages[key].path,
          mime: floorImages[key].mime,
          name: floorImages[key].name,
        });
      }
    }

    let InspectionImagess = [];
    for (const key in inspectionImages) {
      if (inspectionImages[key].path) {
        InspectionImagess.push({
          id: inspectionImages[key].id,
          path: inspectionImages[key].path,
          mime: inspectionImages[key].mime,
          name: inspectionImages[key].name,
        });
      }
    }



    if (formFirlds?.year.length == 0) {
      setModalShown(true);
      setErrorMessage('Year is required');
    } else if (formFirlds?.door.length == 0) {
      setModalShown(true);
      setErrorMessage('Doors is required');
    } else if (!formFirlds?.cylinders) {
      setModalShown(true);
      setErrorMessage('Cylinders is required');
    } else if (!formFirlds?.capacity) {
      setModalShown(true);
      setErrorMessage('Capacity is required');
    } else if (!selectMake) {
      setModalShown(true);
      setErrorMessage('Make is required');
    } else if (!formFirlds.hoursePower) {
      setModalShown(true);
      setErrorMessage('Hourse Power is required');
    } else if (!formFirlds.fueltype) {
      setModalShown(true);
      setErrorMessage('Hourse Power is required');
    } else if (!modal) {
      setModalShown(true);
      setErrorMessage('Model is required');
    } else if (!type) {
      setModalShown(true);
      setErrorMessage('Body Type is required');
    } else if (!thumbNailImage) {
      setModalShown(true);
      setErrorMessage('Thumbnail is required');
    } else if (images.length > 4) {
      setModalShown(true);
      setErrorMessage('Gallery Images not more then 4');
    } else if (floorImages.length > 4) {
      setModalShown(true);
      setErrorMessage('Document Images not more then 4');
    } else if (formFirlds.year.length > 4) {
      setModalShown(true);
      setErrorMessage('Year not be more the 4 charecter');
    } else if (updateCase) {
      dispatch(
        AddAction.updateCarAdd(
          userInfo.access_token,
          data,
          updateCarId,
          latitude,
          longitude,
          area
        ),
      );
      dispatch(
        AddAction.carImagesAction(
          userInfo.access_token,
          thumbNailImage,
          updateCarId,
          GellImgSeperator,
          FloorImages,
          pickVedio,
          InspectionImagess
        ),
      );
    } else {

      dispatch(
        AddAction.postCarAdd(userInfo.access_token, data, latitude, longitude, area),
      );
    }
  };

  useEffect(() => {
    if (carId) {
      dispatch(
        AddAction.carImagesAction(
          userInfo.access_token,
          thumbNailImage,
          carId,
          images,
          floorImages,
          pickVedio,
          inspectionImages
        ),
      );
    }
  }, [carId]);

  useEffect(() => {
    setSuccessShow(false);
    setModalShown(false);
  }, []);
  useEffect(() => {
    if (message) {
      setModalShown(true);
      setErrorMessage(message);
    }
  }, [message]);
  useEffect(() => {
    if (Succmessage) {
      setSuccessShow(true);
      setErrorMessage(message);
    }
  }, [Succmessage]);

  useEffect(() => {
    const getMasterData = async () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${userInfo.access_token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      await fetch(`${BaseURL}//api/v1/vendor/masterdata`, requestOptions)
        .then(response => response.json())
        .then(result => setMasterData(result))
        .catch(error => console.log('error', error));
    };
    getMasterData();
  }, []);

  const imagePicker = async () => {
    let imagePick = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.2,
      maxFiles: 2,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        response.map(image => {
          imagePick.push({
            mime: image.mime,
            path: image.path,
            id: Math.random(),
          });
        });
        setImages([...images, ...imagePick]);
      })
      .catch(e => console.log(e, 'Error'));
  };

  const floorPlansPick = async () => {
    let imagePick = [];
    const response = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
      copyTo: "cachesDirectory"
    })

    console.log(response)
    console.log(response.type)
    imagePick.push({
      mime: response.type,
      path: response.fileCopyUri,
      name: response.name,
      id: Math.random(),
    });

    setFloorImages([...floorImages, ...imagePick]);

    // .then(response => {
    //   console.log(response)
    //     response.map(image => {
    //       imagePick.push({
    //         mime: image.type,
    //         path: image.fileCopyUri,
    //         id: Math.random(),
    //       });
    //     });

    //     setFloorImages([...floorImages, ...imagePick]);
    //   })
    //   .catch(e => console.log(e, 'Error'));


    //   setplatformpicturedata1(response)
    // setplatformpicture1(response.uri)


  };





  const inspectionPick = async () => {
    let imagePick = [];
    const response = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
      copyTo: "cachesDirectory"
    })

    console.log(response)
    console.log(response.type)
    imagePick.push({
      mime: response.type,
      path: response.fileCopyUri,
      name: response.name,
      id: Math.random(),
    });

    setinspectionImages(imagePick);

    // .then(response => {
    //   console.log(response)
    //     response.map(image => {
    //       imagePick.push({
    //         mime: image.type,
    //         path: image.fileCopyUri,
    //         id: Math.random(),
    //       });
    //     });

    //     setFloorImages([...floorImages, ...imagePick]);
    //   })
    //   .catch(e => console.log(e, 'Error'));


    //   setplatformpicturedata1(response)
    // setplatformpicture1(response.uri)


  };
  console.log(data);
  const pickThumbNail = async () => {
    let imagePick = [];
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => setThumbNail(response))
      .catch(e => console.log(e, 'Error'));
  };

  const vedioPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      if (video.size / 1024 > 20000) {
        setErrorMessage('Video should not be morethen 20MB');
        setModalShown(true);
      } else {
        setPickVedio(video);
      }
    });
  };

  const thumbNailImageDelete = () => {
    if (updateCase) {
      dispatch(
        AddAction.carThumbNailDeleteAction(
          userInfo.access_token,
          prevFormDataComplete?.prevFormData?.updateAddId,
        ),
      );
    }
    setThumbNail();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgGray }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%', width: '100%' }}>
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
              Main Information
            </Text>
            {/* <Text style={{ fontSize: 15, color: "gray", fontWeight: "400" }}>Select one of the option</Text> */}
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
            {/* ROW 1 */}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '100%' }}>
                <MyInput
                  value={formFirlds.chesis}
                  onChangeText={text =>
                    setFormFields({
                      ...formFirlds,
                      chesis: text,
                    })
                  }
                  formTitle="VIN / Chassis No."
                  placeHolder="Enter chassis no."
                />
              </View>

              {/* <View style={{ width: "48%" }}>
                                <MyInput
                                    value={formFirlds.license}
                                    onChangeText={(text) => setFormFields({
                                        ...formFirlds,
                                        license: text
                                    })}
                                    formTitle="License Plate" placeHolder="ABCD-123" />
                            </View> */}
            </View>

            <View style={{ width: '100%' }}>
              {/* Year PICKER */}
              <PickerModelContainer
                pickValue={
                  formFirlds.year ? formFirlds.year : 'Enter year here'
                }
                onPicker={() => {
                  setYearModel(true);
                }}
                formTitle={'Year'}></PickerModelContainer>
              <PickerModel
                modalPopUp={yearModel}
                pickerSearch={text =>
                  setPickerSearch(text.toLowerCase().trim())
                }
                onCancel={() => setYearModel(false)}>
                <FlatList
                  showsVerticalScrollIBuidndicator={false}
                  data={YearsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setFormFields({
                            ...formFirlds,
                            year: item.name,
                          });
                          setYearModel(false);
                          setPickerSearch('');
                        }}
                        style={{
                          height: 50,
                          width: '100%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </PickerModel>
            </View>

            <View style={{ width: '100%' }}>
              {/* Make Make PICKER */}

              <PickerModelContainer
                pickValue={
                  selectMake?.name
                    ? selectMake?.name
                    : masterData?.motors?.makes?.find(
                      i => i.id == data?.carMakeID,
                    )?.name
                      ? masterData?.motors?.makes?.find(
                        i => i.id == data.carMakeID,
                      )?.name
                      : 'Select make here'
                }
                onPicker={() => setOpenMakePicker(true)}
                formTitle={'Make'}></PickerModelContainer>
              <PickerModel
                cloneModalPopUp={() => setOpenPicker(false)}
                modalPopUp={openMakePicker}
                pickerSearch={text =>
                  setPickerSearch(text.toLowerCase().trim())
                }
                onCancel={() => setOpenMakePicker(false)}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={masterData?.motors?.makes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    if (item.name.includes(pickerSearch)) {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectMake(item);
                            setOpenMakePicker(false);
                            setPickerSearch('');
                          }}
                          style={{
                            height: 50,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 0.5,
                          }}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </PickerModel>
            </View>
            {selectMake?.id && (
              <View style={{ width: '100%' }}>
                {/* Make MODEL PICKER */}

                <PickerModelContainer
                  pickValue={modal?.name ? modal?.name : 'Select model here'}
                  onPicker={() => setOpenModalPicker(true)}
                  formTitle={'Model'}></PickerModelContainer>
                <PickerModel
                  cloneModalPopUp={() => setOpenPicker(false)}
                  modalPopUp={openModalPicker}
                  pickerSearch={text =>
                    setPickerSearch(text.toLowerCase().trim())
                  }
                  onCancel={() => setOpenModalPicker(false)}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={masterData?.motors.models.filter(
                      i => i?.carmakeID === selectMake?.id,
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      if (item.name.includes(pickerSearch)) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setModal(item);
                              setOpenModalPicker(false);
                              setPickerSearch('');
                            }}
                            style={{
                              height: 50,
                              width: '100%',
                              justifyContent: 'center',
                              alignContent: 'center',
                              borderBottomColor: 'lightgray',
                              borderBottomWidth: 0.5,
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                </PickerModel>
              </View>
            )}

            {/*Fuel type */}
            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <Icon name="gas-pump" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Fuel Type
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors?.fueltype}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          fueltype: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.fueltype
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.fueltype
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Trans mission */}
            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <Icon name="tools" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Transmission
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors?.transmission}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          transmission: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.transmission
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.transmission
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*DOOR SLIDER */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <Icon name="car" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Doors
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors.doors}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          door: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.door
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.door
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Number of wheels */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <Icon name="ring" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Number of wheels
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors?.wheels}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          wheel: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.wheel
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.wheel
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Capacity */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <MaIcon name="account-group" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Capacity
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors.capacity}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          capacity: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.capacity
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.capacity
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Capacity */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <MaIcon name="car" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17,
                  }}>
                  Stearing side
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors?.steeringSide}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          steeringSide: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.steeringSide
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.steeringSide
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/*Machenical CONDITION PICKER */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <Icon name="tags" size={15} color="black" style={{ top: 2 }} />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Body Condition
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors.condition}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          bodyCondition: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,
                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.bodyCondition
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.bodyCondition
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium
                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <View style={{ width: '100%' }}>
              {/*Machenical CONDITION PICKER */}

              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 20,
                    marginVertical: 10,
                  }}>
                  <Icon name="tags" size={15} color="black" style={{ top: 2 }} />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17
                    }}>
                    Mechanical Condition
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={masterData?.motors.mechanicalCondition}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            machanicalCondition: itemData.item.name,
                          })
                        }
                        style={{
                          height: 40,
                          padding: 10,
                          backgroundColor:
                            itemData.item.name ===
                              formFirlds.machanicalCondition
                              ? Colors.blue
                              : Colors.inputBg,
                          marginHorizontal: 5,

                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{

                            color:
                              itemData.item.name === formFirlds.machanicalCondition
                                ? Colors.white
                                : "gray",
                            fontFamily: FontFamily.Medium
                          }}>
                          {itemData.item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              {/* 
              <PickerModelContainer
                pickValue={
                  formFirlds?.condition?.name
                    ? formFirlds?.condition?.name
                    : 'Select condition here'
                }
                onPicker={() => setOpenConditionPickerModal(true)}
                formTitle={'Mechanical Condition'}></PickerModelContainer>
              <PickerModel
                cloneModalPopUp={() => setOpenConditionPickerModal(false)}
                modalPopUp={openConditionModalPicker}
                pickerSearch={text =>
                  setPickerSearch(text.toLowerCase().trim())
                }
                F
                onCancel={() => setOpenConditionPickerModal(false)}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={masterData?.motors.condition}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                    if (item.name.includes(pickerSearch)) {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setFormFields({
                              ...formFirlds,
                              condition: item,
                            });

                            setOpenConditionPickerModal(false);
                            setPickerSearch('');
                          }}
                          style={{
                            height: 50,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 0.5,
                          }}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </PickerModel> */}
            </View>

            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
               
              </View> */}

            {/* DOORS PICKER */}
            {/* 
              <View style={{width: '48%'}}>
                <PickerModelContainer
                  small
                  pickValue={
                    formFirlds?.door?.name
                      ? formFirlds?.door?.name
                      : 'Select doors'
                  }
                  onPicker={() => setOpenDoorModalPicker(true)}
                  formTitle={'Doors'}></PickerModelContainer>
                <PickerModel
                  cloneModalPopUp={() => setOpenDoorModalPicker(false)}
                  modalPopUp={openDoorModalPicker}
                  pickerSearch={text =>
                    setPickerSearch(text.toLowerCase().trim())
                  }
                  onCancel={() => setOpenDoorModalPicker(false)}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={masterData?.motors?.doors}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      if (item.name.includes(pickerSearch)) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setFormFields({
                                ...formFirlds,
                                door: item,
                              });
                              setOpenDoorModalPicker(false);
                              setPickerSearch('');
                            }}
                            style={{
                              height: 50,
                              width: '100%',
                              justifyContent: 'center',
                              alignContent: 'center',
                              borderBottomColor: 'lightgray',
                              borderBottomWidth: 0.5,
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                </PickerModel>

              </View> */}
            {/* </View> */}

            {/*DOOR SLIDER */}

            <View style={{ width: '100%', height: 90 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 20,
                  marginVertical: 10,
                }}>
                <MaIcon name="tools" size={15} color="black" />
                <Text
                  style={{
                    color: Colors.black,
                    fontFamily: FontFamily.Medium,
                    marginLeft: 5,
                    fontSize: 17
                  }}>
                  Cylinders
                </Text>
              </View>

              <FlatList
                horizontal
                data={masterData?.motors?.cylinders}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setFormFields({
                          ...formFirlds,
                          cylinders: itemData.item.name,
                        })
                      }
                      style={{
                        height: 40,

                        padding: 10,
                        backgroundColor:
                          itemData.item.name === formFirlds.cylinders
                            ? Colors.blue
                            : Colors.inputBg,
                        marginHorizontal: 5,

                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{

                          color:
                            itemData.item.name === formFirlds.cylinders
                              ? Colors.white
                              : "gray",
                          fontFamily: FontFamily.Medium,

                        }}>
                        {itemData.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* ROW 3 */}
            {/* 
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <PickerModelContainer
                pickValue={
                  formFirlds.cylinders?.name
                    ? formFirlds.cylinders?.name
                    : 'Select cylinders here'
                }
                onPicker={() => setOpenCylindersModalPicker(true)}
                formTitle={'Cylinders'}></PickerModelContainer>
              <PickerModel
                cloneModalPopUp={() => setOpenCylindersModalPicker(false)}
                modalPopUp={openCylindersModalPicker}
                pickerSearch={text =>
                  setPickerSearch(text.toLowerCase().trim())
                }
                onCancel={() => setOpenCylindersModalPicker(false)}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={masterData?.motors?.cylinders}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                    if (item.name.includes(pickerSearch)) {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setFormFields({
                              ...formFirlds,
                              cylinders: item,
                            });
                            setOpenCylindersModalPicker(false);
                            setPickerSearch('');
                          }}
                          style={{
                            height: 50,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 0.5,
                          }}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </PickerModel> */}

            {/* ROW 4 */}

            {/* TRANSMISSION PICKER

            <PickerModelContainer
              pickValue={
                transmission?.name
                  ? transmission?.name
                  : transmission
                  ? transmission
                  : 'Select transmission here'
              }
              onPicker={() => setOpenTransmissionPicker(true)}
              formTitle={'Transmission'}></PickerModelContainer>
            <PickerModel
              cloneModalPopUp={() => setOpenTransmissionPicker(false)}
              modalPopUp={openTransmissionPicker}
              pickerSearch={text => setPickerSearch(text.toLowerCase().trim())}
              onCancel={() => setOpenTransmissionPicker(false)}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={masterData?.motors?.transmission}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  if (item.name.includes(pickerSearch)) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setTransmisstion(item);
                          setOpenTransmissionPicker(false);
                          setPickerSearch('');
                        }}
                        style={{
                          height: 50,
                          width: '100%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            </PickerModel> */}

            {/* <PickerModelContainer
              pickValue={
                formFirlds?.fueltype?.name
                  ? formFirlds?.fueltype?.name
                  : 'Select fuel type here'
              }
              onPicker={() => setOpenFuelTypeModalPicker(true)}
              formTitle={'Fuel type'}></PickerModelContainer>
            <PickerModel
              cloneModalPopUp={() => setOpenFuelTypeModalPicker(false)}
              modalPopUp={openFuelTypeModalPicker}
              pickerSearch={text => setPickerSearch(text.toLowerCase().trim())}
              onCancel={() => setOpenFuelTypeModalPicker(false)}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={masterData?.motors?.fueltype}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  if (item.name.includes(pickerSearch)) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setFormFields({
                            ...formFirlds,
                            fueltype: item,
                          });
                          setOpenFuelTypeModalPicker(false);
                          setPickerSearch('');
                        }}
                        style={{
                          height: 50,
                          width: '100%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            </PickerModel> */}

            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <PickerModelContainer
                  pickValue={
                    formFirlds.capacity?.name
                      ? formFirlds.capacity?.name
                      : 'Select capacity here'
                  }
                  onPicker={() => setOpenCapacityModalPicker(true)}
                  formTitle={'Capacity'}></PickerModelContainer>
                <PickerModel
                  cloneModalPopUp={() => setOpenCapacityModalPicker(false)}
                  modalPopUp={openCapacityModalPicker}
                  pickerSearch={text =>
                    setPickerSearch(text.toLowerCase().trim())
                  }
                  onCancel={() => setOpenCapacityModalPicker(false)}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={masterData?.motors?.capacity}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      if (item.name.includes(pickerSearch)) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setFormFields({
                                ...formFirlds,
                                capacity: item,
                              });

                              setOpenCapacityModalPicker(false);
                              setPickerSearch('');
                            }}
                            style={{
                              height: 50,
                              width: '100%',
                              justifyContent: 'center',
                              alignContent: 'center',
                              borderBottomColor: 'lightgray',
                              borderBottomWidth: 0.5,
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                </PickerModel>
              </View>
            </View> */}

            <View
              style={{
                height: 50,
                width: '100%',

                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ width: '50%' }}>
                <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                  Warranty
                </Text>
              </View>

              <View style={{ width: '50%' }}>
                <Switch
                  trackColor={{ false: '#767577', true: Colors.gray }}
                  thumbColor={Colors.blue}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={async () => {
                    setFormFields({
                      ...formFirlds,
                      warranty: !formFirlds.warranty,
                    });
                  }}
                  value={formFirlds.warranty}
                />
              </View>
            </View>

            {/* WARANTY */}

            <View
              style={{
                height: 50,
                width: '100%',

                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ width: '50%' }}>
                <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                  Service History
                </Text>
              </View>

              <View style={{ width: '50%' }}>
                <Switch
                  trackColor={{ false: '#767577', true: Colors.gray }}
                  thumbColor={Colors.blue}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={async () => {
                    setFormFields({
                      ...formFirlds,
                      serviceHistory: !formFirlds.serviceHistory,
                    });
                  }}
                  value={formFirlds.serviceHistory}
                />
              </View>
            </View>

            {/* HORSE POWER PICKER */}

            <PickerModelContainer
              valueHave={formFirlds.hoursePower?.name ? true : false}
              pickValue={
                formFirlds.hoursePower?.name
                  ? formFirlds.hoursePower?.name
                  : 'Select horse power here'
              }
              onPicker={() => setOpenHorsePowerPicker(true)}
              formTitle={'Horse Power'}></PickerModelContainer>
            <PickerModel
              cloneModalPopUp={() => setOpenHorsePowerPicker(false)}
              modalPopUp={openHorsePowerPicker}
              pickerSearch={text => setPickerSearch(text.toLowerCase().trim())}
              onCancel={() => setOpenHorsePowerPicker(false)}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={masterData?.motors?.horsePower}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if (item.name.includes(pickerSearch)) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setFormFields({
                            ...formFirlds,
                            hoursePower: item,
                          });
                          setOpenHorsePowerPicker(false);
                          setPickerSearch('');
                        }}
                        style={{
                          height: 50,
                          width: '100%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          borderBottomColor: 'lightgray',
                          borderBottomWidth: 0.5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            </PickerModel>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '100%' }}>
                {/* Type PICKER */}

                <PickerModelContainer
                  valueHave={type?.name ? true : false}
                  pickValue={type?.name ? type?.name : 'Select type here'}
                  onPicker={() => setOpenTypePicker(true)}
                  formTitle={'Body type'}></PickerModelContainer>
                <PickerModel
                  cloneModalPopUp={() => setOpenTypePicker(false)}
                  modalPopUp={openTypePicker}
                  pickerSearch={text =>
                    setPickerSearch(text.toLowerCase().trim())
                  }
                  onCancel={() => setOpenTypePicker(false)}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={masterData?.motors.bodyTypes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      if (item.name.includes(pickerSearch)) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setType(item);
                              setOpenTypePicker(false);
                              setPickerSearch('');
                            }}
                            style={{
                              height: 50,
                              width: '100%',
                              justifyContent: 'center',
                              alignContent: 'center',
                              borderBottomColor: 'lightgray',
                              borderBottomWidth: 0.5,
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                </PickerModel>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '100%' }}>
                {/* Type PICKER */}

                <PickerModelContainer
                  valueHave={type?.name ? true : false}
                  pickValue={
                    formFirlds.regionalSpec
                      ? formFirlds.regionalSpec
                      : 'Select regional spac here'
                  }
                  onPicker={() => setRegionalSpacModal(true)}
                  formTitle={'Regional Speacs'}></PickerModelContainer>
                <PickerModel
                  cloneModalPopUp={() => setRegionalSpacModal(false)}
                  modalPopUp={regionalSpacModal}
                  pickerSearch={text =>
                    setPickerSearch(text.toLowerCase().trim())
                  }
                  onCancel={() => setRegionalSpacModal(false)}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={masterData?.motors?.regionalSpecification}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      if (item.name.includes(pickerSearch)) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setFormFields({
                                ...formFirlds,
                                regionalSpec: item.name,
                              });
                              setRegionalSpacModal(false);
                              setPickerSearch('');
                            }}
                            style={{
                              height: 50,
                              width: '100%',
                              justifyContent: 'center',
                              alignContent: 'center',
                              borderBottomColor: 'lightgray',
                              borderBottomWidth: 0.5,
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                </PickerModel>
              </View>
            </View>

            <MyInput
              value={formFirlds.fuelEconomy}
              number
              onChangeText={text =>
                setFormFields({
                  ...formFirlds,
                  fuelEconomy: text,
                })
              }
              formTitle="Fuel Economy"
              placeHolder="Enter fuel economy here"
            />

            <MyInput
              value={formFirlds.engineCC}
              number
              onChangeText={text =>
                setFormFields({
                  ...formFirlds,
                  engineCC: text,
                })
              }
              formTitle="Engine CC"
              placeHolder="Enter engine cc here"
            />

            {/* THUMBNAIL IMAGE */}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Thumbnail Image
              </Text>

              {!thumbNailImage && (
                <TouchableOpacity
                  onPress={pickThumbNail}
                  style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 10,
                    borderColor: Colors.gray,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <MaIcon name="camera-plus" size={30} />
                  <Text style={{ fontSize: 10, fontWeight: '600' }}>
                    Set Thumbnail
                  </Text>
                </TouchableOpacity>
              )}

              {thumbNailImage ? (
                <View
                  style={{
                    width: '100%',
                    height: 150,
                    overflow: 'hidden',
                    borderRadius: 10,
                    borderColor: Colors.gray,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <ImageBackground
                    source={{
                      uri: thumbNailImage.path
                        ? thumbNailImage.path
                        : thumbNailImage,
                    }}
                    style={{
                      resizeMode: 'cover',
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <DeleteButton onDelete={thumbNailImageDelete} />
                  </ImageBackground>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            {/* PROPERTY GALERY */}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Gallery Images
              </Text>
              <View
                style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                {/* Upload Images */}
                {
                  <TouchableOpacity
                    onPress={imagePicker}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      borderColor: Colors.gray,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaIcon name="camera-plus" size={30} />
                    <Text style={{ fontSize: 10, fontFamily: FontFamily.Medium, }}>
                      Upload Image
                    </Text>
                  </TouchableOpacity>
                }

                <View style={{ width: '70%', height: 100 }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      const deleteGeImgHandler = async () => {
                        if (updateCase) {
                          dispatch(
                            AddAction.ImagesDeleteAction(
                              userInfo.access_token,
                              item.id,
                            ),
                          );
                        }

                        const filterData = images.filter(i => i.id !== item.id);
                        setImages(filterData);
                        if (images.length === 1) {
                          setImages([]);
                        }
                      };

                      return (
                        <View
                          style={{
                            width: 100,
                            flexDirection: 'row',
                            height: 100,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderStyle: images ? 'dashed' : '',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <ImageBackground
                            source={{ uri: item.image ? item.image : item.path }}
                            style={{
                              resizeMode: 'cover',
                              height: 100,
                              width: 100,
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}>
                            <DeleteButton onDelete={deleteGeImgHandler} />
                          </ImageBackground>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Video Picker*/}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Video
              </Text>
              {pickVedio ? (
                <View>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => setVideo(prev => !prev)}
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: Colors.blue,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 60,
                        zIndex: 10,
                        left: 10,
                      }}>
                      <IoIcon
                        name={videoPuse ? 'play' : 'pause'}
                        color="white"
                        size={20}
                      />
                    </TouchableOpacity>
                    <View style={{ top: 50, right: 10, zIndex: 10 }}>
                      <DeleteButton onDelete={() => setPickVedio()} />
                    </View>
                  </View>

                  <Video
                    resizeMode="cover"
                    paused={videoPuse}
                    style={{
                      height: 150,
                      width: '100%',
                      borderRadius: 20,
                      marginTop: 10,
                    }}
                    source={{
                      uri: pickVedio.path ? pickVedio.path : pickVedio,
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={vedioPicker}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    height: 150,
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaIcon name="video-plus-outline" size={50} />
                </TouchableOpacity>
              )}
            </View>

            {/* Floor Images */}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Document{' '}
              </Text>
              <View
                style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                {/* Floor Images */}
                {
                  <TouchableOpacity
                    onPress={floorPlansPick}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      borderColor: Colors.gray,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaIcon name="camera-plus" size={30} />
                    <Text style={{ fontSize: 10, fontFamily: FontFamily.Medium }}>
                      Upload Document
                    </Text>
                  </TouchableOpacity>
                }

                <View style={{ width: '70%', height: 100 }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={floorImages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      const deleteGeImgHandler = async () => {
                        if (updateCase) {
                          dispatch(
                            AddAction.deleteCarDocImgAction(
                              userInfo.access_token,
                              item.id,
                            ),
                          );
                        }

                        const filterData = floorImages.filter(
                          i => i.id !== item.id,
                        );
                        setFloorImages(filterData);
                        if (images.length === 1) {
                          setFloorImages([]);
                        }
                      };

                      return (
                        <View
                          style={{
                            width: 100,
                            flexDirection: 'row',
                            height: 100,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderStyle: images ? 'dashed' : '',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>

                          {item?.image?.includes('.jpg') || item?.image?.includes('.png') || item?.path?.includes('.jpg') || item?.path?.includes('.png') ?
                            <ImageBackground
                              source={{ uri: item.image ? item.image : item.path }}
                              style={{
                                resizeMode: 'cover',
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                                overflow: 'hidden',

                              }}>
                              <DeleteButton onDelete={deleteGeImgHandler} />
                            </ImageBackground>
                            :
                            <View
                              style={{

                                height: 100,
                                width: 100,
                                borderRadius: 10,


                              }}
                            >
                              <View style={{ position: "absolute", left: 0, zIndex: 10, top: 0 }}>
                                <DeleteButton onDelete={deleteGeImgHandler} />
                              </View>
                              {item.image ?

                                <ImageBackground

                                  source={require('../../Assets/Images/pdf.png')}

                                  style={{
                                    resizeMode: 'cover',
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                  }}
                                />
                                :
                                <></>
                                // <Pdf
                                //   source={{ uri: item.image ? item.image : item.path }}


                                //   style={{
                                //     resizeMode: 'cover',
                                //     height: 100,
                                //     width: 100,
                                //     borderRadius: 10,
                                //     overflow: 'hidden',
                                //   }} />
                                  
                                  }

                            </View>
                          }
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Inspection Report */}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Inspection Report{' '}
              </Text>
              <View
                style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                {/* inspection Images */}
                {
                  inspectionImages.length == 0 &&
                  <TouchableOpacity
                    onPress={inspectionPick}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      borderColor: Colors.gray,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaIcon name="camera-plus" size={30} />
                    <Text style={{ fontSize: 10, fontWeight: '600' }}>
                      Upload Document
                    </Text>
                  </TouchableOpacity>
                }

                <View style={{ width: '70%', height: 100 }}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={inspectionImages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      const deleteGeImgHandler = async () => {
                        if (updateCase) {
                          dispatch(
                            AddAction.deleteCarInspectionImgAction(
                              userInfo.access_token,
                              item.id,
                            ),
                          );
                        }

                        const filterData = inspectionImages.filter(
                          i => i.id !== item.id,
                        );
                        setinspectionImages(filterData);
                        if (images.length === 1) {
                          setinspectionImages([]);
                        }


                      };

                      return (
                        <View
                          style={{
                            width: 100,
                            flexDirection: 'row',
                            height: 100,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderStyle: images ? 'dashed' : '',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>

                          {item?.image?.includes('.jpg') || item?.image?.includes('.png') || item?.path?.includes('.jpg') || item?.path?.includes('.png') ?
                            <ImageBackground
                              source={{ uri: item.image ? item.image : item.path }}
                              style={{
                                resizeMode: 'cover',
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                                overflow: 'hidden',
                              }}>
                              <DeleteButton onDelete={deleteGeImgHandler} />
                            </ImageBackground>
                            :
                            <View
                              style={{

                                height: 100,
                                width: 100,
                                borderRadius: 10,

                              }}
                            >
                              <View style={{ position: "absolute", left: 0, zIndex: 10, top: 0 }}>
                                <DeleteButton onDelete={deleteGeImgHandler} />
                              </View>
                              {item.image ?

                                <ImageBackground

                                  source={require('../../Assets/Images/pdf.png')}

                                  style={{
                                    resizeMode: 'cover',
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                  }}
                                />
                                :
                                <></>
                                // <Pdf
                                //   source={{ uri: item.image ? item.image : item.path }}


                                //   style={{
                                //     resizeMode: 'cover',
                                //     height: 100,
                                //     width: 100,
                                //     borderRadius: 10,
                                //     overflow: 'hidden',
                                //   }} />
                              }


                            </View>
                          }
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              {/* <AuthButton onPress={AddPosthandler} title="Next" /> */}
              {loader ? (
                <ActivityIndicator size="large" color={Colors.blue} />
              ) : (
                <AuthButton onPress={AddPosthandler} title="SUBMIT" />
                // console.log("yo" + JSON.stringify(data))
              )}
            </View>
          </View>
        </View>

        <SuccessModal
          modelOff={() => {
            dispatch(AddAction.clearMessageAction());
            setSuccessShow(false);
            setModalShown(false);

            props.navigation.navigate('Home');
          }}
          visible={successModelShow}
        />

        <PopUpModel
          visible={modalShown}
          message={errorMessage}
          onPress={() => setModalShown(false)}
        />
      </ScrollView>
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default PostAnAddCarStep5;
