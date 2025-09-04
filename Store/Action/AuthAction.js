import {
  UserLoginConst,
  SaveDataReduxConst,
  networkRequestFailConst,
  UserSignUpConst,
  ChangePasswordConst,
  LogoutActionConst,
  clearMessageConst,
} from './ActionConstants';
import qs from 'qs';
import { BaseURL } from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserLogin = (email, password, deviceId) => {
  return async dispatch => {
    dispatch({
      type: UserLoginConst.LOGIN_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const data = qs.stringify({
      grant_type: 'password',
      username: email,
      password: password,
      deviceId: deviceId,
      type: 'Vendor',
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };

    await fetch(`${BaseURL}/api/security/token`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          dispatch({
            type: UserLoginConst.LOGIN_SUCC,
            userData: result,
          });
        } else if (result.error_description) {
          dispatch({
            type: UserLoginConst.LOGIN_FAIL,
            errorMessage: result.error_description,
          });
        }
      })
      .catch(error => {
        if (error) {
          dispatch({
            type: networkRequestFailConst.NETWORD_REQ_FAIL,
          });
        }
      });
  };
};

export const UserSignUp = (name, number, email, password) => {
  return async dispatch => {
    dispatch({
      type: UserSignUpConst.SIGNUP_REQ,
    });
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: name,
      Email: email,
      Contact: number,
      Password: password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BaseURL}/api/v1/vendor/register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, "OoOpooppoo")
        if (result.status === 'error') {
          dispatch({
            type: UserSignUpConst.SIGNUP_FAIL,
            errMessage: result.message,
          });
        } else if (result.status === 'success') {
          dispatch({
            type: UserSignUpConst.SIGNUP_SUCC,
            message: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

export const changePassword = (userToken, oldPass, newPass) => {
  return async dispatch => {
    dispatch({
      type: ChangePasswordConst.CHANGE_PASSWORD_REQ,
    });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      CurrentPassword: oldPass,
      NewPassword: newPass,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(
      `${BaseURL}/api/v1/vendor/changepassword`,
      requestOptions,
    );

    if (response.status === 200) {
      const resData = await response.json();
      dispatch({
        type: ChangePasswordConst.CHANGE_PASSWORD_SUCC,
        message: resData?.message,
      });
    } else if (response.status === 400) {
      const resData = await response.json();
      dispatch({
        type: ChangePasswordConst.CHANGE_PASSWORD_FAIL,
        message: resData.message,
      });
    }
  };
};

export const clearMessageAction = () => {
  return async dispatch => {
    dispatch({
      type: clearMessageConst.CLEAR_MESSAGE_CONST,
    });
  };
};

export const saveUserInfoToRedux = userData => {
  return async dispatch => {
    dispatch({
      type: SaveDataReduxConst.SAVE_DATA_TO_REDUX,
      userData: userData,
    });
  };
};

export const clearUserInfoToRedux = userData => {
  console.log('clear info');
  return async dispatch => {
    dispatch({
      type: SaveDataReduxConst.CLEAR_DATA_TO_REDUX,
    });
  };
};
export const logOutAction = deviceId => {
  return async dispatch => {
    dispatch({
      type: LogoutActionConst.LOGOUT_REQ,
    });
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      DeviceID: deviceId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BaseURL}//api/v1/vendor/logout`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Session invalid or expired !') {
          dispatch({
            type: LogoutActionConst.LOGOUT_SUCC,
          });
        } else {
          dispatch({
            type: LogoutActionConst.LOGOUT_FAIL,
          });
        }
      })
      .catch(error => console.log('error', error));
  };
};

const saveDataIntoStorage = userData => {
  AsyncStorage.setItem('userData', JSON.stringify(userData));
};

export const firebaseSessionAction = (userToken, fbToken, dId) => {
  return async dispatch => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    var raw = JSON.stringify({
      FirebaseToken: fbToken,
      DeviceID: dId,
      AccessToken: userToken,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BaseURL}//api/v1/vendor/sessions`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result, 'FIREBAWE'))
      .catch(error => console.log('error', error));
  };
};
