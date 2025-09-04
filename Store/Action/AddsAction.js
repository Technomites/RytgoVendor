import { BaseURL } from '../../Constants/BaseUrl';
import {
  addPostConst,
  postCarAddConst,
  manegeAddConst,
  publishedAddActionConst,
  UpdateAddPostConst,
  clearAddMessageCOnst,
  updateCarDataConst,
  AddThumbnailImage,
  ClearManageAdd,
  MARKSOLD
} from './ActionConstants';

// import RNFetchBlob from 'rn-fetch-blob';

export const PostAnAdd = (token, formData, latitude, longitude, area) => {
  return async dispatch => {
    dispatch({
      type: addPostConst.POST_ADD_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      CategoryID: formData.prevFormDataComplete.prevFormData.catId,
      Title: formData.prevFormDataComplete.prevFormData.title,
      TitleAr: formData.prevFormDataComplete.prevFormData.arTitle,

      Price: Number(formData.prevFormDataComplete.prevFormData.newPrice),
      Description: formData.prevFormDataComplete.prevFormData.description,
      DescriptionAr: formData.prevFormDataComplete.prevFormData.arDescription,

      CityID: formData.prevFormDataComplete.state.id,

      Address: formData.prevFormDataComplete.address,
      PropertyFeatures: formData.SelectFeatureList,
      BuildYear: formData.buildYear,
      Size: formData.size,
      NoOfRooms: formData.noOfRooms,
      ForSale: !formData.prevFormDataComplete.prevFormData.rent,
      NoOfLaundry: formData.noOfLaundries,
      NoOfGarage: formData.noOfGarages,
      latitude: latitude,
      longitude: longitude,
      NoOfDinings: formData.noOfDining,
      NoOfBaths: formData.noOfBaths,
      zipCode: formData.prevFormDataComplete.zipCode,
      IsFurnished: formData.isFurnished,
      area: area
    });


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/v1/vendor/properties`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'yyyy');
        if (result.property) {
          dispatch({
            type: addPostConst.POST_ADD_SUCC,
            message: result.message,
            catId: result.property.id,
          });
        } else {
          dispatch({
            type: addPostConst.POST_ADD_FAIL,
            message: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};
export const UpdateAnAdd = (
  userToken,
  formData,
  proId,
  latitude,
  longitude,
  area
) => {
  return async dispatch => {
    dispatch({
      type: UpdateAddPostConst.UPDATE_PRO_ADD_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      CategoryID: Number(formData.categoryId),
      Title: formData.prevFormDataComplete.prevFormData.title,
      TitleAr: formData.prevFormDataComplete.prevFormData.arTitle,
      //   OldPrice: Number(formData.prevFormDataComplete.prevFormData.oldPrice),
      Price: Number(formData.prevFormDataComplete.prevFormData.newPrice),
      Description: formData.prevFormDataComplete.prevFormData.description,
      DescriptionAr: formData.prevFormDataComplete.prevFormData.arDescription,
      //   CountryID: formData.prevFormDataComplete.country.id,
      CityID: formData.prevFormDataComplete.state.id,
      //   Area: formData.prevFormDataComplete.area,
      //   State: 'Dubai',
      Address: formData.prevFormDataComplete.address,
      PropertyFeatures: formData.SelectFeatureList,
      BuildYear: formData.buildYear,
      Size: formData.size,
      NoOfRooms: formData.noOfRooms,
      ForSale: !formData.prevFormDataComplete.prevFormData.rent,
      NoOfLaundry: formData.noOfLaundries,
      NoOfGarage: formData.noOfGarages,
      latitude: latitude,
      longitude: longitude,
      NoOfDinings: formData.noOfDining,
      NoOfBaths: formData.noOfBaths,
      zipCode: formData.prevFormDataComplete.zipCode,
      IsFurnished: formData.isFurnished,
      area: area
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/v1/vendor/properties/${proId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'PROPERTY');
        if (result.status === 'success') {
          dispatch({
            type: UpdateAddPostConst.UPDATE_PRO_ADD_SUCC,
            message: result.message,
          });
        } else {
          dispatch({
            type: UpdateAddPostConst.UPDATE_PRO_ADD_FAIL,
            message: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const addThumbNailImage = (
  token,
  thumbNailImg,
  addId,
  GImage,
  FImages,
  pickVedio,
  InspectionImagess
) => {
  let GelleryImage = [];
  let FloorImages = [];
  let InspectImages = [];

  for (let key in GImage) {
    GelleryImage.push({
      name: 'gallery',
      filename: 'nbs.jpg',
      type: GImage[key].mime,
      data: GImage[key].path,
    });
  }

  for (let key in FImages) {
    FloorImages.push({
      name: 'plan',
      filename: 'nbs.jpg',
      type: FImages[key].mime,
      data: FImages[key].path,
    });
  }

  for (let key in InspectionImagess) {
    InspectImages.push({
      name: 'inspection',
      filename: InspectionImagess[key].name,
      type: InspectionImagess[key].mime,
      data: InspectionImagess[key].path,
    });
  }

  const thumbNailObj = thumbNailImg?.path
    ? [
      {
        name: 'thumbnail',
        filename: 'nbs.jpg',
        type: thumbNailImg.mime,
        data: thumbNailImg.path,
      },
    ]
    : [];

  const Video = pickVedio?.path
    ? [
      {
        name: 'video',
        filename: 'nbs.mp4',
        type: pickVedio.mime,
        data: pickVedio.path,
      },
    ]
    : [];

  const finalArray = [
    ...thumbNailObj,
    ...GelleryImage,
    ...FloorImages,
    ...Video,
    ...InspectImages,
  ];

  return async (dispatch) => {
    if (finalArray.length > 0) {
      try {
        let formData = new FormData();

        finalArray.forEach((file) => {
          formData.append(file.name, {
            uri: file.data,
            name: file.filename,
            type: file.type,
          });
        });

        let response = await fetch(
          `${BaseURL}/api/v1/vendor/properties/${addId}/Image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token,
            },
            body: formData,
          }
        );

        let res = await response.json();
        console.log(res, 'PROPERTY IMAGE --');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No hit');
    }

    return;
  };
};


export const postCarImages = (token, pickImage) => {
  return async (dispatch) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      var formdata = new FormData();
      formdata.append('thumbnail', {
        uri: pickImage.path,
        type: 'image/jpeg',
        name: 'asdfdsf.jpg',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      let response = await fetch(
        `${BaseURL}/api/v1/vendor/cars/109/Images`,
        requestOptions
      );

      console.log(response.status); // Log the HTTP response status

      if (response.ok) {
        let result = await response.json();
        console.log(result); // Log the JSON response
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
};

export const carImagesAction = (
  token,
  thumbNailImg,
  addId,
  GImage,
  FImages,
  pickVedio,
  InspectionImagess
) => {
  let GelleryImage = [];
  let FloorImages = [];
  let InspectImages = [];

  for (let key in GImage) {
    GelleryImage.push({
      name: 'gallery',
      filename: 'nbs.jpg',
      type: GImage[key].mime,
      data: GImage[key].path,
    });
  }

  for (let key in FImages) {
    FloorImages.push({
      name: 'plan',
      filename: FImages[key].name,
      type: FImages[key].mime,
      data: FImages[key].path,
    });
  }

  for (let key in InspectionImagess) {
    InspectImages.push({
      name: 'inspection',
      filename: InspectionImagess[key].name,
      type: InspectionImagess[key].mime,
      data: InspectionImagess[key].path,
    });
  }

  const thumbNailObj = thumbNailImg?.path
    ? [
        {
          name: 'thumbnail',
          filename: 'nbs.jpg',
          type: thumbNailImg.mime,
          data: thumbNailImg.path,
        },
      ]
    : [];

  const Video = pickVedio?.path
    ? [
        {
          name: 'video',
          filename: 'nbs.mp4',
          type: pickVedio.mime,
          data: pickVedio.path,
        },
      ]
    : [];

  const finalArray = [
    ...thumbNailObj,
    ...GelleryImage,
    ...FloorImages,
    ...Video,
    ...InspectImages,
  ];

  return async (dispatch) => {
    if (finalArray.length > 0) {
      try {
        let formData = new FormData();

        finalArray.forEach((file) => {
          formData.append(file.name, {
            uri: file.data,
            name: file.filename,
            type: file.type,
          });
        });

        let response = await fetch(
          `${BaseURL}/api/v1/vendor/cars/${addId}/Images`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token,
            },
            body: formData,
          }
        );

        let res = await response.json();
        console.log(res, 'CAR IMAGE CREATE');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No hit');
    }

    return;
  };
};


export const postCarAdd = (token, data, latitude, longitude, area) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    dispatch({
      type: postCarAddConst.POST_CAR_ADD_REQ,
    });
    console.log("id" + JSON.stringify(data.formFirlds.prevFormDataComplete.prevFormData.newPrice))
    var raw = JSON.stringify({
      CategoryID: data.formFirlds.categoryID,
      Name: data.formFirlds.prevFormDataComplete.prevFormData.title,
      NameAr: data.formFirlds.prevFormDataComplete.prevFormData.arTitle,
      CarMakeID: Number(data.selectMake.id),
      CarModelID: Number(data.modal.id),

      SalePrice: Number(
        data.formFirlds.prevFormDataComplete.prevFormData.newPrice,
      ),
      LongDescription:
        data.formFirlds.prevFormDataComplete.prevFormData.arDescription,
      LongDescriptionAr:
        data.formFirlds.prevFormDataComplete.prevFormData.arDescription,
      CarFeatures: data.formFirlds.SelectFeatureList,
      SKU: data.formFirlds.chesis,

      BodyTypeID: Number(data.type.id),
      Year: data.formFirlds.year,
      Doors: data.formFirlds.door,
      Cylinders: data.formFirlds.cylinders,
      HorsePower: data.formFirlds.hoursePower.name,
      Capacity: data.formFirlds.capacity,
      RegionalSpecification: data.formFirlds.regionalSpec,

      Transmission: data.formFirlds.transmission,

      CityID: Number(data.formFirlds.prevFormDataComplete.state.id),
      Address: data.formFirlds.prevFormDataComplete.address,

      latitude: latitude,
      longitude: longitude,
      Condition: data.formFirlds.bodyCondition,
      FuelType: data.formFirlds.fueltype,
      ServiceHistory: data.formFirlds.serviceHistory,
      Warranty: data.formFirlds.warranty,
      SteeringSide: data.formFirlds.steeringSide,
      Wheels: data.formFirlds.wheel,
      MechanicalCondition: data.formFirlds.machanicalCondition,
      EngineDisplacementVolumes: data.formFirlds.engineCC,
      FuelEconomy: data.formFirlds.fuelEconomy,
      area: area
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/cars`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("result")
        console.log(result)
        if (result.car) {
          dispatch({
            type: postCarAddConst.POST_CAR_ADD_SUCC,
            resMessage: result.message,
            carId: result.car.id,
          });
        } else {
          dispatch({
            type: postCarAddConst.POST_CAR_ADD_FAIL,
            resMessage: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const updateCarAdd = (toke, data, carId, latitude, longitude, area) => {
  return async dispatch => {
    dispatch({
      type: updateCarDataConst.UPDATE_CAR_DATA_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${toke}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      CategoryID: data.formFirlds.CATEGORYID,
      Name: data.formFirlds.prevFormDataComplete.prevFormData.title,
      NameAr: data.formFirlds.prevFormDataComplete.prevFormData.arTitle,
      CarMakeID: Number(data.selectMake.id),
      CarModelID: Number(data.modal.id),
      RegularPrice: Number(
        data.formFirlds.prevFormDataComplete.prevFormData.newPrice,
      ),
      SalePrice: Number(
        data.formFirlds.prevFormDataComplete.prevFormData.newPrice,
      ),
      LongDescription:
        data.formFirlds.prevFormDataComplete.prevFormData.arDescription,
      LongDescriptionAr:
        data.formFirlds.prevFormDataComplete.prevFormData.arDescription,
      CarFeatures: data.formFirlds.SelectFeatureList,
      SKU: data.formFirlds.chesis,
      // LicensePlate: data.formFirlds.license,
      BodyTypeID: Number(data.type.id),
      Year: data.formFirlds.year,
      Doors: data.formFirlds.door,
      Cylinders: data.formFirlds.cylinders,
      HorsePower: data.formFirlds.hoursePower.name,
      Capacity: data.formFirlds.capacity,
      RegionalSpecification: data.formFirlds.regionalSpec,

      Transmission: data.formFirlds.transmission,
      // FuelEconomy: data.formFirlds.milage,
      // CountryID: Number(data.formFirlds.prevFormDataComplete.country.id),
      CityID: Number(data.formFirlds.prevFormDataComplete.state.id),
      Address: data.formFirlds.prevFormDataComplete.address,
      // Area: data.formFirlds.prevFormDataComplete.area,
      MechanicalCondition: data.formFirlds.machanicalCondition,
      latitude: latitude,
      longitude: longitude,
      Condition: data.formFirlds.bodyCondition,
      FuelType: data.formFirlds.fueltype,
      ServiceHistory: data.formFirlds.serviceHistory,
      Warranty: data.formFirlds.warranty,
      SteeringSide: data.formFirlds.steeringSide,
      Wheels: data.formFirlds.wheel,
      EngineDisplacementVolumes: data.formFirlds.engineCC,
      FuelEconomy: data.formFirlds.fuelEconomy,
      area: area
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/cars/${carId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          console.log(result.message, 'hee');
          dispatch({
            type: updateCarDataConst.UPDATE_CAR_DATA_SUCC,
            resMessage: result.message,
          });
        } else {
          dispatch({
            type: updateCarDataConst.UPDATE_CAR_DATA_FAIL,
            resMessage: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const manageAddClear = () => {
  return async dispatch => {
    dispatch({
      type: ClearManageAdd.CLEAR_MANAGE_ADD,
    });
  };
};

export const manageAddClearmotors = () => {
  return async dispatch => {
    dispatch({
      type: ClearManageAdd.CLEAR_MANAGE_ADDMOTOR,
    });
  };
};

export const manageAddClearproperties = () => {
  return async dispatch => {
    dispatch({
      type: ClearManageAdd.CLEAR_MANAGE_ADDPROPERTIES,
    });
  };
};


export const manageCarAdd = (token, page) => {
  return async dispatch => {
    dispatch({
      type: manegeAddConst.GET_MANAGE_CAR_ADD_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/cars?pg=${page}`, requestOptions)
      .then(response => response.json())

      .then(result => {
        if (result.cars) {
          dispatch({
            type: manegeAddConst.GET_MANAGE_CAR_ADD,
            result: result.cars,
          });
        }
      })
      .catch(error => console.log('Here at CAR catch', error));
  };
};


export const markitemsold = (token, type, id) => {
  return async dispatch => {
    dispatch({
      type: MARKSOLD.MARKSOLD_LOADER,
      result: true,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}api/v1/vendor/${type}/${id}/Sold`, requestOptions)
      .then(response => response.json())

      .then(result => {
        console.log("markitemsold")
        console.log(JSON.stringify(result))
        if (result.status == "success") {
          if (type == "cars") {

            dispatch({
              type: MARKSOLD.MARKSOLD_MOTOR,
              result: "success",
            });
          } else {
            dispatch({
              type: MARKSOLD.MARKSOLD_Property,
              result: "success",
            });
          }


        } else {
          dispatch({
            type: MARKSOLD.MARKSOLD_Property,
            result: "fail",
          });
          dispatch({
            type: MARKSOLD.MARKSOLD_MOTOR,
            result: "fail",
          });


        }
        dispatch({
          type: MARKSOLD.MARKSOLD_LOADER,
          result: false,
        });
      })
      .catch(error => {
        dispatch({
          type: MARKSOLD.MARKSOLD_LOADER,
          result: false,
        });
        console.log('Here at CAR catch', error)
      });
  };
};



export const managePropertyAdd = (token, page) => {
  return async dispatch => {
    dispatch({
      type: manegeAddConst.GET_MANAGE_PROP_ADD_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/properties?pg=${page}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result?.properties) {
          console.log("         console.log(result?.properties)")
          console.log(JSON.stringify(result?.properties))
          dispatch({
            type: manegeAddConst.GET_MANAGE_PROP_ADD,
            result: result.properties,
          });
        }
      })
      .catch(error => console.log('Here at property catch', error));
  };
};

export const propertyPublish = (token, proId, active) => {
  return async dispatch => {
    dispatch({
      type: publishedAddActionConst.PUBLISHED_ADD_PROPERTY_REQ,
      id: proId,
      active: !active,
    });
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/properties/${proId}/publish?isPublished=${!active}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result, 'Published');
        if (result.status === 'success') {
          dispatch({
            type: publishedAddActionConst.PUBLISHED_ADD_PROPERTY,
            id: proId,
            active: !active,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const carPublish = (token, proId, active) => {
  return async dispatch => {
    dispatch({
      type: publishedAddActionConst.PUBLISHED_ADD_CAR_REQ,
      id: proId,
      active: !active,
    });
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/cars/${proId}/publish?isPublished=${!active}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === 'success') {
          dispatch({
            type: publishedAddActionConst.PUBLISHED_ADD_CAR,
            id: proId,
            active: !active,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const deleteGeImgAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,

      redirect: 'follow',
    };

    fetch(`${BaseURL}//api/v1/vendor/propertyImages/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};

export const deleteFloorImgAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/propertyFloorPlanImages/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};

export const thumbNailDeleteAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/properties/Thumbnail/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};

export const deleteCarDocImgAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/carDocuments/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};


export const deleteCarInspectionImgAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };


    await fetch(`${BaseURL}//api/v1/vendor/cars/inspection/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};


export const deletePropertyInspectionImgAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };


    await fetch(`${BaseURL}//api/v1/vendor/properties/inspection/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};


export const carThumbNailDeleteAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/cars/${id}/thumbnail`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};

export const ImagesDeleteAction = (token, id) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/carImages/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
};

export const clearMessageAction = () => {
  return async dispatch => {
    dispatch({
      type: clearAddMessageCOnst.CLEAR_MESSAGE,
    });
  };
};


export const clearmarkitemsold = () => {
  return async dispatch => {
    dispatch({
      type: clearAddMessageCOnst.CLEAR_MARKITEMSOLD,
    });
  };
};



export const updatedproertydata = (data) => {
  return async dispatch => {
    dispatch({
      type: MARKSOLD.MARKSOLD_UPDATE,
      payload: data
    });
  };
};

export const updatedmotordata = (data) => {
  return async dispatch => {
    dispatch({
      type: MARKSOLD.MARKMOTORSOLD_UPDATE,
      payload: data
    });
  };
};





