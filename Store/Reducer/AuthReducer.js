import {
  UserLoginConst,
  SaveDataReduxConst,
  ChangePasswordConst,
  UserSignUpConst,
  LogoutActionConst,
  clearMessageConst,
  networkRequestFailConst,
} from '../Action/ActionConstants';
const initialState = {
  userInfo: null,
  loader: false,
  loginErroMessage: null,


  changePassMessage: null,

  signUpMessage: null,

  logout: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UserLoginConst.LOGIN_REQ:
      state = {
        ...state,
        loader: true,
        loginErroMessage: null,
      };
      break;

    case UserLoginConst.LOGIN_SUCC:
      state = {
        ...state,
        loader: false,
        userInfo: action.userData,
        loginErroMessage: null,
        logout: false,
      };
      break;

    case UserLoginConst.LOGIN_FAIL:
      state = {
        ...state,
        loader: false,
        loginErroMessage: action.errorMessage,
      };
      break;

    case SaveDataReduxConst.SAVE_DATA_TO_REDUX:
      state = {
        ...state,
        loader: false,
        userInfo: action.userData,
        loginErroMessage: null,
      };
      break;

    case SaveDataReduxConst.CLEAR_DATA_TO_REDUX:
      state = {
        ...state,
        loader: false,
        userInfo: null,
        loginErroMessage: null,
      };
      break;

    case ChangePasswordConst.CHANGE_PASSWORD_REQ:
      state = {
        ...state,
        loader: true,
        changePassMessage: null,
      };
      break;

    case ChangePasswordConst.CHANGE_PASSWORD_SUCC:
      state = {
        ...state,
        loader: false,
        changePassMessage: action.message,
      };
      break;

    case ChangePasswordConst.CHANGE_PASSWORD_FAIL:
      state = {
        ...state,
        loader: false,
        changePassMessage: action.message,
      };
      break;

    case UserSignUpConst.SIGNUP_REQ:
      state = {
        ...state,
        loader: true,
        signUpMessage: null,
      };
      break;

    case UserSignUpConst.SIGNUP_SUCC:
      state = {
        ...state,
        loader: false,
        signUpMessage: action.message,
      };
      break;

    case UserSignUpConst.SIGNUP_FAIL:
      state = {
        ...state,
        loader: false,
        signUpMessage: action.errMessage,
      };
      break;
    case LogoutActionConst.LOGOUT_REQ:
      state = {
        ...state,
        loader: true,
      };
      break;

    case LogoutActionConst.LOGOUT_SUCC:
      state = {
        ...state,
        loader: false,
        logout: true,
        userInfo: null,
        loginErroMessage: null,
        changePassMessage: null,
        signUpMessage: null,
        loginErroMessage: null,
      };
      break;

    case LogoutActionConst.LOGOUT_FAIL:
      state = {
        ...state,
        loader: false,
        logout: false,
      };
      break;

    case clearMessageConst.CLEAR_MESSAGE_CONST:
      state = {
        ...state,
        signUpMessage: null,
        localStorage: null,
        changePassMessage: null,
      };
      break;

    case networkRequestFailConst.NETWORD_REQ_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
  }
  return state;
};
