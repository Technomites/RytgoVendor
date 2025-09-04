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
import DocumentPicker from "react-native-document-picker"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Constants/Colors';
import BackHeader from '../../Components/UISupport/BackHeader';
import IoIcon from '../../Components/Icon/IoIcon';
import MaIcon from '../../Components/Icon/MaIcon';
import MyInput from '../../Components/UISupport/MyInput';
import AuthButton from '../../Components/UISupport/AuthButton';
import SuccessModal from '../../Components/UISupport/SuccessModal';
import ImagePicker from 'react-native-image-crop-picker';
import MyFormInput from '../../Components/UISupport/MyFormInput';
import Video from 'react-native-video';
import DeleteButton from '../../Components/UISupport/DeleteButton';
import * as AddAction from '../../Store/Action/AddsAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  RoomData,
  LaundryData,
  DiningData,
  BathData,
  GarageData,
} from '../../Data/PickerData';
import PopUpModel from '../../Components/UISupport/PopUpModel';
import { YearsData } from '../../Data/DummyData';
import PickerModelContainer from '../../Components/UISupport/PickerModelContainer';
import PickerModel from '../../Components/UISupport/PickerModel';
import { FontFamily } from '../../Constants/Fonts';
const PostAnAddStep5 = props => {
  const data = props.route.params.data ? props.route.params.data : null;
  const AddCatId = useSelector(state => state.add.addCatId);

  const [successModelShow, setSuccessShow] = useState(false);
  const [thumbNailImage, setThumbNail] = useState(data?.thumbnail);
  const [errorMessage, setMessage] = useState('');

  const [images, setImages] = useState(data?.images ? data?.images : []);
  const [pickerSearch, setPickerSearch] = useState('');

  const [floorImages, setFloorImages] = useState(
    data?.floorPlans ? data?.floorPlans : [],
  );

  const [inspectionImages, setinspectionImages] = useState(
    data?.inspection ? [data?.inspection] : [],
  );

  const [pickVedio, setPickVedio] = useState(data?.video?.video);
  const [videoPuse, setVideo] = useState(false);
  const prevFormDataComplete = props.route.params.formData;
  const longitude = props.route.params.longitude;
  const latitude = props.route.params.latitude;
  const area = props.route.params.area;

  const update = props?.route?.params?.update;
  const adPost = useSelector(state => state.add.propertyAd);

  const SelectFeatureList = props.route.params.SelectFeatureList;
  const userInfo = useSelector(state => state.auth.userInfo);
  const loader = useSelector(state => state.add.loader);
  const message = useSelector(state => state.add.message);
  const propSuccMessage = useSelector(state => state.add.propSuccMessage);
  const [modalShown, setModalShown] = useState(false);
  const [yearModel, setYearModel] = useState(false);

  const [formFirlds, setFormFields] = useState({
    buildYear: data?.buildYear ? data?.buildYear.toString() : '',
    size: data?.size ? data?.size.toString() : '',
    noOfRooms: data?.rooms ? data?.rooms.toString() : '',
    noOfLaundries: data?.noOfLaundry ? data?.noOfLaundry : '',
    noOfGarages: data?.garages ? data?.garages.toString() : '',
    prevFormDataComplete,
    SelectFeatureList: SelectFeatureList,
    categoryId: data?.categoryId ? data?.categoryId.toString() : null,
    noOfDining: data?.noOfLaundry ? data?.noOfLaundry.toString() : '',
    noOfBaths: data?.baths ? data?.baths.toString() : '',
    isFurnished: data?.isFurnished ? data?.isFurnished : false,
  });

  const updatedProId =
    formFirlds?.prevFormDataComplete?.prevFormData?.updateAddId;

  const dispatch = useDispatch();

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
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
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

        setFloorImages([...floorImages, ...imagePick]);
      })
      .catch(e => console.log(e, 'Error'));
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
      console.log(video.size);
      if (video.size / 1024 > 20000) {
        setMessage('Video should not be greather then 2MB');
        setModalShown(true);
      } else {
        setPickVedio(video);
      }
    });
  };

  useEffect(() => {
    if (message) {
      setModalShown(true);
      setMessage(message);
    }
  }, [message]);

  useEffect(() => {
    if (propSuccMessage) {
      setSuccessShow(true);
      setMessage(propSuccMessage);
    }
  }, [propSuccMessage]);

  useEffect(() => {
    setMessage(false);
    setModalShown(false);
  }, []);

  useEffect(() => {
    if (AddCatId) {
      dispatch(
        AddAction.addThumbNailImage(
          userInfo.access_token,
          thumbNailImage,
          AddCatId,
          images,
          floorImages,
          pickVedio,
          inspectionImages
        ),
      );
    }
  }, [AddCatId]);

  const AddPosthandler = async () => {
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

    if (formFirlds.size.length === 0) {
      setMessage('Size is required');
      setModalShown(true);
    } else if (formFirlds.buildYear.length === 0) {
      setMessage('Build year is required');
      setModalShown(true);
    } else if (formFirlds.buildYear.length > 4) {
      setMessage('Invalid year type');
      setModalShown(true);
    } else if (formFirlds.noOfRooms.length === 0) {
      setMessage('Room is required');
      setModalShown(true);
    } else if (formFirlds.noOfLaundries.length === 0) {
      setMessage('Laundries is required');
      setModalShown(true);
    } else if (formFirlds.noOfDining.length === 0) {
      setMessage('Dining is required');
      setModalShown(true);
    } else if (formFirlds.noOfBaths.length === 0) {
      setMessage('Bath is required');
      setModalShown(true);
    } else if (formFirlds.noOfGarages.length === 0) {
      setMessage('Garages is required');
      setModalShown(true);
    } else if (formFirlds.noOfGarages.length === 0) {
      setMessage('Garages is required');
      setModalShown(true);
    } else if (!thumbNailImage) {
      setMessage('Thubmnail is required');
      setModalShown(true);
    } else if (images.length > 4) {
      setMessage('Gallery images not morethen 4');
      setModalShown(true);
    } else if (floorImages.length > 4) {
      setMessage('Floor images not morethen 4');
      setModalShown(true);
    } else if (update) {
      dispatch(
        AddAction.UpdateAnAdd(
          userInfo.access_token,
          formFirlds,
          updatedProId,
          latitude,
          longitude,
          area
        ),
      );
      dispatch(
        AddAction.addThumbNailImage(
          userInfo.access_token,
          thumbNailImage,
          updatedProId,
          GellImgSeperator,
          FloorImages,
          pickVedio,
          InspectionImagess
        ),
      );
    } else {
      dispatch(
        AddAction.PostAnAdd(
          userInfo.access_token,
          formFirlds,
          latitude,
          longitude,
          area
        ),
      );
    }
  };

  const thumbNailImageDelete = () => {
    if (update) {
      dispatch(
        AddAction.thumbNailDeleteAction(userInfo.access_token, updatedProId),
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
            <View style={{ width: '100%' }}>
              <PickerModelContainer
                valueHave={formFirlds.buildYear ? true : false}
                pickValue={
                  formFirlds.buildYear
                    ? formFirlds.buildYear
                    : 'Enter year here'
                }
                onPicker={() => {
                  setYearModel(true);
                }}
                formTitle={'Build Year'}></PickerModelContainer>
              <PickerModel
                modalPopUp={yearModel}
                pickerSearch={text =>
                  setPickerSearch(text.toLowerCase().trim())
                }
                onCancel={() => setYearModel(false)}>
                <FlatList

                  showsVerticalScrollIBuidndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={YearsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setFormFields({
                            ...formFirlds,
                            buildYear: item.name,
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
                        <Text style={{ fontFamily: FontFamily.Medium }}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </PickerModel>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* <View style={{width: '48%'}}>
                <MyInput
                  value={data?.buildYear?.toString()}
                  number
                  onChangeText={text =>
                    setFormFields({
                      ...formFirlds,
                      buildYear: text,
                    })
                  }
                  formTitle="Build Year"
                  placeHolder="Enter year here"
                />
              </View> */}

              <View style={{ width: '100%' }}>
                <MyInput
                  value={formFirlds?.size}
                  number
                  onChangeText={text =>
                    setFormFields({
                      ...formFirlds,
                      size: text,
                    })
                  }
                  formTitle="Size (sq. ft.)"
                  placeHolder="Enter size here"
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',

                justifyContent: 'space-between',
              }}>
              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <Icon name="bed" size={12} color="black" />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17

                    }}>
                    Total Rooms
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={RoomData}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            noOfRooms: itemData.item.value,
                          })
                        }
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor:
                            formFirlds.noOfRooms == itemData.item.value
                              ? Colors.blue
                              : '#f0525224',
                          marginHorizontal: 5,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color:
                              formFirlds.noOfRooms == itemData.item.value
                                ? 'white'
                                : Colors.gray,
                          }}>
                          {itemData.item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <Icon name="bath" size={12} color="black" />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17
                    }}>
                    Total Baths
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={BathData}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            noOfBaths: itemData.item.value,
                          })
                        }
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor:
                            formFirlds.noOfBaths == itemData.item.value
                              ? Colors.blue
                              : '#f0525224',
                          marginHorizontal: 5,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color:
                              formFirlds.noOfBaths == itemData.item.value
                                ? 'white'
                                : Colors.gray,
                          }}>
                          {itemData.item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <Icon name="tshirt" size={12} color="black" />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17
                    }}>
                    Total laundries
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={LaundryData}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            noOfLaundries: itemData.item.value,
                          })
                        }
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor:
                            formFirlds.noOfLaundries == itemData.item.value
                              ? Colors.blue
                              : '#f0525224',
                          marginHorizontal: 5,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color:
                              formFirlds.noOfLaundries == itemData.item.value
                                ? 'white'
                                : Colors.gray,
                          }}>
                          {itemData.item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <Icon name="utensils" size={12} color="black" />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17
                    }}>
                    Total Dining
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={DiningData}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            noOfDining: itemData.item.value,
                          })
                        }
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor:
                            formFirlds.noOfDining == itemData.item.value
                              ? Colors.blue
                              : '#f0525224',
                          marginHorizontal: 5,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color:
                              formFirlds.noOfDining == itemData.item.value
                                ? 'white'
                                : Colors.gray,
                          }}>
                          {itemData.item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ width: '100%', height: 90 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    marginVertical: 10,
                  }}>
                  <Icon name="bath" size={12} color="black" />
                  <Text
                    style={{
                      color: Colors.black,
                      fontFamily: FontFamily.Medium,
                      marginLeft: 5,
                      fontSize: 17
                    }}>
                    Total Garage
                  </Text>
                </View>

                <FlatList
                  horizontal
                  data={GarageData}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={itemData => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          setFormFields({
                            ...formFirlds,
                            noOfGarages: itemData.item.value,
                          })
                        }
                        style={{
                          height: 40,
                          width: 40,
                          backgroundColor:
                            formFirlds.noOfGarages == itemData.item.value
                              ? Colors.blue
                              : '#f0525224',
                          marginHorizontal: 5,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color:
                              formFirlds.noOfGarages == itemData.item.value
                                ? 'white'
                                : Colors.gray,
                          }}>
                          {itemData.item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

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
                  Is Furnished
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
                      isFurnished: !formFirlds.isFurnished,
                    });
                  }}
                  value={formFirlds.isFurnished}
                />
              </View>
            </View>
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
                  <Text style={{ fontSize: 10, fontFamily: FontFamily.Medium, }}>
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
                        if (update) {
                          dispatch(
                            AddAction.deleteGeImgAction(
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
                Floor Plans
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
                    <Text style={{ fontSize: 10, fontFamily: FontFamily.Medium, }}>
                      Upload Image
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
                        if (update) {
                          dispatch(
                            AddAction.deleteFloorImgAction(
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

            {/* Inspection Report */}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.black, fontFamily: FontFamily.Medium, fontSize: 17 }}>
                Inspection Report
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
                    <Text style={{ fontSize: 10, fontFamily: FontFamily.Medium, }}>
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
                        if (update) {
                          dispatch(
                            AddAction.deletePropertyInspectionImgAction(
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
              {loader ? (
                <ActivityIndicator size="large" color={Colors.blue} />
              ) : (
                <AuthButton onPress={AddPosthandler} title="SUBMIT" />
              )}
            </View>
          </View>
        </View>

        <SuccessModal
          modelOff={async () => {
            const refresh = true;
            setSuccessShow(false);

            await dispatch(AddAction.clearMessageAction());

            setSuccessShow(false);
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

export default PostAnAddStep5;
