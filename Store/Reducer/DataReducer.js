import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {act} from 'react-test-renderer';
import {
  GetAllRequestConst,
  GetAllPackagesConst,
  GetAllNotificationConst,
  FlatDataConst,
  paymentSettingConst,
  addFeatureFilterConst,
  getAllFeatureConst,
  manageAllCarSepConst,
  GetUserProfileConst,
  UpdateUserProfile,
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


const initialState = {
  loader: false,

  allRequest: null,
  carRequest: [],
  propertyRequest: [],

  allPackages: null,

  allNotifiction: [],

  userProfile: null,

  loader: false,
  profileMessage: null,

  allFeature: null,

  paymentSetting: null,

  getInTuchData: [],
  sessionExpire: false,

  requestCount: 0,
  gettestdrivedata: [],
  GetPhysicalTour: [],
  GetPropertData: [],
  GetMotorData: [],
  requestingstatusloader: false,
  requestresponse: ""
};

export default (state = initialState, action) => {
  switch (action.type) {

 
    case  UpdateRequestResponse.Replace_Request_ResponseProperty:
      state = {
        ...state,
        GetPropertData: action.payload,
        
      };
      break;

      case  UpdateRequestResponse.Replace_Request_ResponseMotor:
        state = {
          ...state,
          GetMotorData: action.payload,
          
        };
        break;

    case  UpdateRequestResponse.Replace_Request_ResponseTestDrive:
      state = {
        ...state,
        gettestdrivedata: action.payload,
        
      };
      break;

    case  UpdateRequestResponse.Replace_Request_Response:
      state = {
        ...state,
        GetPhysicalTour: action.payload,
        
      };
      break;

    case  UpdateRequestResponse.Update_Request_Response:
      state = {
        ...state,
        requestresponse: action.statusupdationpayload,
        
      };
      break;

    case Requestingloader.Request_Loader:
      state = {
        ...state,
        requestingstatusloader: action.payload,
        
      };
      break;


    case GetVideoTours.Get_All_Properties:
      state = {
        ...state,
        GetPropertData:  [...state.GetPropertData, ...action.payloadpropertydata]
        

        
      };
      break;

      case GetVideoTours.Get_All_Motors:
        state = {
          ...state,
          GetMotorData:  [...state.GetMotorData, ...action.payloadmotordata]
      
          
        };
        break;
  



    case GetPhysicalTour.GetPhysicalTourRequests:
      state = {
        ...state,
        GetPhysicalTour: [...state.GetPhysicalTour, ...action.payloadgetPhysicalTourRequests]

        
      };
      break;

    case GetTestDrive.GetTestDrive:
      state = {
        ...state,
        gettestdrivedata:  [...state.gettestdrivedata, ...action.payloadtestdrive]
   
        
      };
      break;

    case GetAllRequestConst.GET_ALL_REQUEST:
      state = {
        ...state,
        allRequest: action.allRequest,
        // carRequest: action.carRequest,
        // propertyRequest: action.propertyRequest
      };
      break;

    case GetAllPackagesConst.GET_ALL_PACKAGE:
      state = {
        ...state,
        allPackages: action.allPackages,
      };
      break;

    case GetRequestCountConst.GET_REQ_COUNT:
      state = {
        ...state,
        requestCount: action.count,
      };
      break;

    case GetInTouchConst.GET_ALL_GET_IN_TOUCH:
      state = {
        ...state,
        getInTuchData: [...state.getInTuchData, ...action.getInTuchData],
      };
      break;
    case ClearGetInTouchConst.CLEAR_GET_ALL_GET_IN_TOUCH:
      state = {
        ...state,
        getInTuchData: [],
      };
      break;




      case ClearGetInTouchConst.ClearProperty_Data:
        state = {
          ...state,
          GetPropertData: [],
        };
        break;

        case ClearGetInTouchConst.ClearMotor_Data:
          state = {
            ...state,
            GetMotorData: [],
          };
          break;
  
  

      case ClearGetInTouchConst.Clear_Get_TestDrive:
        state = {
          ...state,
          gettestdrivedata: [],
        };
        break;


      case ClearGetInTouchConst.Clear_Physical_Tour:
        state = {
          ...state,
          GetPhysicalTour: [],
        };
        break;

 

 

    case GetAllNotificationConst.GET_ALL_NOTIFICATON:
      state = {
        ...state,
        allNotifiction: [...state.allNotifiction, ...action.allNotifiction],
      };
      break;

    case GetAllNotificationConst.GET_ALL_NOTIFICATON_UPDATE:
      const RId = action.id;
      state = {
        ...state,
        allNotifiction: state.allNotifiction.map(i => {
          if (i.id == RId) {
            console.log(i, 'YAHOOOOOOOO');
            i.isRead = !i.isRead;
          }
          return i;
        }),
      };
      break;
    // allFeature: state.allFeature.map(i => {
    //   if (i.id === id) {
    //     i.select = !i.select;
    //   }

    case GetAllNotificationConst.CLEAR_GET_ALL_NOTIFICATON:
      state = {
        ...state,
        allNotifiction: [],
      };
      break;

    case GetUserProfileConst.GET_USER_PROFILE:
      state = {
        ...state,
        userProfile: action.userProfile,
      };
      break;

    case UpdateUserProfile.UPDATE_PROFILE_REQUEST:
      state = {
        ...state,
        loader: true,
        profileMessage: null,
      };
      break;

    case UpdateUserProfile.UPDATE_PROFILE_SUCC:
      state = {
        ...state,
        loader: false,
        profileMessage: action.message,
      };
      break;

    case UpdateUserProfile.UPDATE_PROFILE_FAIL:
      state = {
        ...state,
        loader: false,
        profileMessage: action.message,
      };
      break;

    case getAllFeatureConst.GET_ALL_FEATURE_REQ:
      state = {
        ...state,
        loader: true,
      };
      break;

    case getAllFeatureConst.GET_ALL_FEATURE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;

    case setelectFeature.SELECT_FEATURE:
      const id = action.id;
      state = {
        ...state,
        allFeature: state.allFeature.map(i => {
          if (i.id === id) {
            i.select = !i.select;
          }
          return i;
        }),
      };
    case 'DELETE_RES_RESSAGE':
      state = {
        ...state,
        profileMessage: null,
      };
      break;

    case paymentSettingConst.PAYMENT_SETT_SUCC:
      state = {
        ...state,
        paymentSetting: action.paymentSetting,
      };
      break;

    case FlatDataConst.FLAG_DATA_REQ:
      state = {
        ...state,
        loader: true,
      };
      break;

    case FlatDataConst.FLAG_DATA_SUCC:
      if (action.typed === 'Car') {
        state = {
          ...state,
          loader: false,
          carRequest: state.carRequest.map(i => {
            if (i.id === action.id) {
              i.isFlaged = !i.isFlaged;
            }
            return i;
          }),
        };
      } else {
        state = {
          ...state,
          loader: false,
          propertyRequest: state.propertyRequest.map(i => {
            if (i.id === action.id) {
              i.isFlaged = !i.isFlaged;
            }
            return i;
          }),
        };
      }

      break;

    case FlatDataConst.FLAG_DATA_FAIl:
      state = {
        ...state,
        loader: false,
      };
      break;

    case manageAllCarSepConst.MANAGE_ALL_CAR_SUCC:
      state = {
        ...state,
        carRequest: [...state.carRequest, ...action.result],
      };
      break;
    case manageAllCarSepConst.CLEAR_MANAGE_ALL_CAR_REQ:
      state = {
        ...state,
        carRequest: [],
      };
      break;

    case manageAllPropSepConst.MANAGE_ALL_PROP_SUCC:
      state = {
        ...state,
        propertyRequest: [...state.propertyRequest, ...action.result],
      };
      break;
    case manageAllPropSepConst.CLEAR_ALL_PROP_REQ:
      state = {
        ...state,
        propertyRequest: [],
      };
      break;

    // case addFeatureFilterConst.ADD_FEATURE_FILTER_CONST:

    //     console.log(JSON.stringify(state.allFeature), "MIAN STATE")
    //     state = {
    //         ...state,
    //         allFeature: state.allFeature
    //     }
    //     break

    case getAllFeatureConst.GET_ALL_FEATURE_SUCC:
      const allFeatureData = action.result;
      const filterData = action.filterData;

      for (const i in filterData) {
        for (const j in allFeatureData) {
          if (allFeatureData[j].id === filterData[i].id) {
            allFeatureData[j].select = true;
          }
        }
      }

      state = {
        ...state,
        loader: false,
        allFeature: allFeatureData,
      };
      break;
  }
  return state;
};
