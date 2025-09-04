import { BaseURL } from '../../Constants/BaseUrl';
// import RNFetchBlob from 'rn-fetch-blob';
import {
  GetAllRequestConst,
  GetAllPackagesConst,
  getAllFeatureConst,
  FlatDataConst,
  GetAllNotificationConst,
  addFeatureFilterConst,
  paymentSettingConst,
  manageAllCarSepConst,
  GetUserProfileConst,
  UpdateUserProfile,
  UpdateUserImage,
  setelectFeature,
  manageAllPropSepConst,
  GetInTouchConst,
  ClearGetInTouchConst,
  GetRequestCountConst,
  GetTestDrive,
  GetPhysicalTour,
  GetVideoTours,
  Requestingloader,
  UpdateRequestResponse
} from '../Action/ActionConstants';
import {
  MFCountry,
  MFEnvironment,
  MFSettings,
  MFTheme,
} from 'myfatoorah-reactnative';

export const getAllRequest = token => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}/api/v1/vendor/customerrequest?take=10`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const carRequest = result?.carRequests;

        const properTyRequest = result?.propertyRequests;
        let allMergeRequest = [];
        for (const key in carRequest) {
          allMergeRequest.push(carRequest[key]);
        }
        for (const key in properTyRequest) {
          allMergeRequest.push(properTyRequest[key]);
        }

        dispatch({
          type: GetAllRequestConst.GET_ALL_REQUEST,
          allRequest: allMergeRequest,
          carRequest: carRequest,
          propertyRequest: properTyRequest,
        });
      })
      .catch(error => console.log('abcd', error));
  };
};

export const getAllPackages = token => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/v1/vendor/packages`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.packages) {
          dispatch({
            type: GetAllPackagesConst.GET_ALL_PACKAGE,
            allPackages: result.packages,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const getAllNotification = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}//api/v1/en/notifications?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.notifications) {
          dispatch({
            type: GetAllNotificationConst.GET_ALL_NOTIFICATON,
            allNotifiction: result.notifications,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};
export const getAllNotificationUpdate = id => {
  return async dispatch => {
    dispatch({
      type: GetAllNotificationConst.GET_ALL_NOTIFICATON_UPDATE,
      id: id,
    });
  };
};

export const clearNotificationAction = () => {
  return async dispatch => {
    dispatch({
      type: GetAllNotificationConst.CLEAR_GET_ALL_NOTIFICATON,
    });
  };
};

export const getInTouchAction = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/GetInTouch?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          const getInTuchData = result.getInTouchRequests;

          dispatch({
            type: GetInTouchConst.GET_ALL_GET_IN_TOUCH,
            getInTuchData: getInTuchData,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const getallProperties = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/VideoTourProperty?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          const getpropertydata = result.videoTourPropertyRequests;
          console.log("getPhysicalTourRequests")
          console.log(getpropertydata)



          dispatch({
            type: GetVideoTours.Get_All_Properties,
            payloadpropertydata: getpropertydata,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const getallmotors = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/VideoTourMotor?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          const getmotordata = result.videoTourMotorRequests;
          console.log("videoTourMotorRequests")
          console.log(getmotordata)



          dispatch({
            type: GetVideoTours.Get_All_Motors,
            payloadmotordata: getmotordata,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};



export const getTestdriverequests = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/TestDrive?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          const TestDrive = result.testDriveRequests;
          console.log("TestDrive")
          console.log("page" + page)
          console.log(TestDrive)
          dispatch({
            type: GetTestDrive.GetTestDrive,
            payloadtestdrive: TestDrive,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const getPhysicalTourRequests = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/PhysicalTour?pg=${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          const getPhysicalTourRequests = result.physicalTourRequests;
          console.log("getPhysicalTourRequests")
          console.log("page" + page)
          console.log(getPhysicalTourRequests)
          dispatch({
            type: GetPhysicalTour.GetPhysicalTourRequests,
            payloadgetPhysicalTourRequests: getPhysicalTourRequests,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};



export const storePhysicalTour = (data) => {
  return async dispatch => {
    dispatch({
      type: UpdateRequestResponse.Replace_Request_Response,
      payload: data,
    });
  };
};

export const storegettestdrivedata = (data) => {
  return async dispatch => {
    dispatch({
      type: UpdateRequestResponse.Replace_Request_ResponseTestDrive,
      payload: data,
    });
  };
};



export const storegetmotordata = (data) => {
  return async dispatch => {
    dispatch({
      type: UpdateRequestResponse.Replace_Request_ResponseMotor,
      payload: data,
    });
  };
};

export const storepropertydata = (data) => {
  return async dispatch => {
    dispatch({
      type: UpdateRequestResponse.Replace_Request_ResponseProperty,
      payload: data,
    });
  };
};






export const getRequestCount = (token, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/notifications/count`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          dispatch({
            type: GetRequestCountConst.GET_REQ_COUNT,
            count: result.newNotifications,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const clearGetInTouchAction = () => {
  return async dispatch => {
    dispatch({
      type: ClearGetInTouchConst.CLEAR_GET_ALL_GET_IN_TOUCH,
    });
  };
};

export const clearGetPropertydata = () => {
  return async dispatch => {
    dispatch({
      type: ClearGetInTouchConst.ClearProperty_Data,
    });
  };
};
export const clearGetmotordata = () => {
  return async dispatch => {
    dispatch({
      type: ClearGetInTouchConst.ClearMotor_Data,
    });
  };
};

export const clearTestdriveRequests = () => {
  return async dispatch => {
    dispatch({
      type: ClearGetInTouchConst.Clear_Get_TestDrive,
    });
  };
};

export const ClearPhysicalTourRequests = () => {
  return async dispatch => {
    dispatch({
      type: ClearGetInTouchConst.Clear_Physical_Tour,
    });
  };
};






export const getUserProfileInfo = token => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/account/profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.profile) {
          dispatch({
            type: GetUserProfileConst.GET_USER_PROFILE,
            userProfile: result.profile,
          });
        } else if (
          result.message === 'Authorization has been denied for this request.'
        ) {
          dispatch({
            type: GetUserProfileConst.SESSION_IS_EXPIRE,
            sessionExpire: true,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const updateUserProfile = (token, name, email, mobileNo) => {
  return async dispatch => {
    dispatch({
      type: UpdateUserProfile.UPDATE_PROFILE_REQUEST,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      Name: name,
      EmailAddress: email,
      MobileNo: mobileNo,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/account/profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.profile) {
          dispatch({
            type: UpdateUserProfile.UPDATE_PROFILE_SUCC,
            message: result.message,
          });
        } else {
          dispatch({
            type: UpdateUserProfile.UPDATE_PROFILE_FAIL,
            message: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const updateRequestsstatus = (token, requesttype, status, id) => {
  return async dispatch => {
    dispatch({
      type: Requestingloader.Request_Loader,
      payload: true
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/v1/vendor/${requesttype}?ID=${id}&Status=${status}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("status result")
        console.log(result)
        if (result.status == "success") {
          dispatch({
            type: UpdateRequestResponse.Update_Request_Response,
            statusupdationpayload: "success",
          });
          dispatch({
            type: Requestingloader.Request_Loader,
            payload: false
          });
        } else {
          dispatch({
            type: Requestingloader.Request_Loader,
            payload: false
          });
        }
      })
      .catch(error => {
        dispatch({
          type: Requestingloader.Request_Loader,
          payload: false
        });
        console.log('error', error)
      });
  };
};

export const clearrequestresponse = () => {
  return async dispatch => {
    dispatch({
      type: UpdateRequestResponse.Update_Request_Response,
      statusupdationpayload: "",
    });
  };
};


export const deleteResMessage = () => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_RES_RESSAGE',
    });
  };
};

export const userProfileImage = (token, pickImage) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      formData.append('profile', {
        uri: pickImage.path,
        name: 'abc.jpg',
        type: pickImage.mime,
      });

      let response = await fetch(
        `${BaseURL}/api/v1/vendor/account/profile/photo`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
          },
          body: formData,
        }
      );

      let res = await response.json();

      if (res.status === 'success') {
        dispatch({
          type: UpdateUserImage.UPDATE_IMAGE_SUCC,
        });
      } else {
        dispatch({
          type: UpdateUserImage.UPDATE_IMAGE_FAIL,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
}

export const addFeature = id => {
  return async dispatch => {
    dispatch({
      type: setelectFeature.SELECT_FEATURE,
      id: id,
    });
  };
};

export const paymentSettingAction = userToken => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/vendor/paymentsettings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'ACTION');
        if (result.status === 'success') {
          // dispatch({
          //     type: paymentSettingConst.PAYMENT_SETT_SUCC,
          //     paymentSetting: result.paymentSetting

          // })

          let baseURL = null;
          let token = null;

          if (result.paymentSetting.isLive) {
            baseURL = result.paymentSetting.liveEndpoint;
            token = result.paymentSetting.apiKey;
          } else {
            baseURL = result.paymentSetting.testEndpoint;
            token = result.paymentSetting.apiKey;
          }
          let theme = new MFTheme('transparent', 'red', 'Payment', 'X');
          console.log('baseURL', baseURL, '\n token', token);
          MFSettings.sharedInstance.setTheme(theme);
          // MFSettings.sharedInstance.configure(baseURL, token);
          MFSettings.sharedInstance.configure(
            token,
            MFCountry.UNITEDARABEMIRATES,
            BaseURL,
          );
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const flagData = (token, type, id) => {
  return async dispatch => {
    dispatch({
      type: FlatDataConst.FLAG_DATA_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/customerrequest/${id}/${type}/flag`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success == true) {
          dispatch({
            type: FlatDataConst.FLAG_DATA_SUCC,
            id: id,
            typed: type,
          });
        } else {
          dispatch({
            type: FlatDataConst.FLAG_DATA_FAIl,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const getAllManageCarSep = (userToken, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}/api/v1/vendor/car/customerrequests?take=10&pg=${page}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          dispatch({
            type: manageAllCarSepConst.MANAGE_ALL_CAR_SUCC,
            result: result.carRequests,
          });
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  };
};
export const clearALlManageCarSep = () => {
  return async dispatch => {
    dispatch({
      type: manageAllCarSepConst.CLEAR_MANAGE_ALL_CAR_REQ,
    });
  };
};

export const getAllManagePropSep = (userToken, page) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}//api/v1/vendor/property/customerrequests?take=10&pg=${page}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          dispatch({
            type: manageAllPropSepConst.MANAGE_ALL_PROP_SUCC,
            result: result.propertyRequests,
          });
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  };
};
export const clearALlManagePropSep = () => {
  return async dispatch => {
    dispatch({
      type: manageAllPropSepConst.CLEAR_ALL_PROP_REQ,
    });
  };
};

export const addFeatureAction = (token, type, filterData) => {
  return async dispatch => {
    dispatch({
      type: getAllFeatureConst.GET_ALL_FEATURE_REQ,
    });
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}//api/v1/${type}/filter/en/features`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status) {
          const data = result.data;
          for (const key in data) {
            data[key]['select'] = false;
            data[key]['FeatureID'] = data[key].id;
          }

          dispatch({
            type: getAllFeatureConst.GET_ALL_FEATURE_SUCC,
            result: data,
            filterData: filterData,
          });
        } else {
          dispatch({
            type: getAllFeatureConst.GET_ALL_FEATURE_FAIL,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const addFeatureFilterAction = feature => {
  return dispatch => {
    dispatch({
      type: addFeatureFilterConst.ADD_FEATURE_FILTER_CONST,
      feature: feature,
    });
  };
};
