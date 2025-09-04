import {
  addPostConst,
  postCarAddConst,
  manegeAddConst,
  publishedAddActionConst,
  UpdateAddPostConst,
  clearAddMessageCOnst,
  updateCarDataConst,
  ClearManageAdd,
  MARKSOLD
} from '../Action/ActionConstants';

const initilState = {
  loader: false,
  message: null,
  propSuccMessage: null,

  addCatId: null,
  addCatCarId: null,

  carMessage: null,
  carAddSuccMessage: null,

  manageCarAdd: [],
  managePropertyAdd: [],
  manageCarLoder: false,
  managePropertyLoder: false,
  propertyAd: null,
  carAd: null,
  marksoldloader: false,
  marksoldpropertresult: "",
  marksoldmotorresult: ""
};

export default (state = initilState, action) => {


  switch (action.type) {


    case MARKSOLD.MARKMOTORSOLD_UPDATE:
    
      state = {
        ...state,
        manageCarAdd: action.payload
      };
      break;

    case MARKSOLD.MARKSOLD_MOTOR:
    
      state = {
        ...state,
        marksoldmotorresult: action.result
      };
      break;



    case MARKSOLD.MARKSOLD_UPDATE:
    
      state = {
        ...state,
        managePropertyAdd: action.payload
      };
      break;

    case clearAddMessageCOnst.CLEAR_MARKITEMSOLD:
    
      state = {
        ...state,
        marksoldpropertresult: "",
        marksoldmotorresult: ""

        
      };
      break;
 
    case MARKSOLD.MARKSOLD_Property:
    
      state = {
        ...state,
        marksoldpropertresult: action.result
      

        
      };
      break;

      case MARKSOLD.MARKSOLD_LOADER:
        state = {
          ...state,
          marksoldloader: action.result,
          
        };
        break;

    case addPostConst.POST_ADD_REQ:
      state = {
        loader: true,
        propSuccMessage: null,
        message: null,
      };
      break;

    case addPostConst.POST_ADD_SUCC:
      state = {
        loader: false,
        propSuccMessage: action.message,
        addCatId: action.catId,
      };
      break;

    case addPostConst.POST_ADD_FAIL:
      state = {
        loader: false,
        message: action.message,
        addSuccResult: null,
      };
      break;

    case UpdateAddPostConst.UPDATE_PRO_ADD_REQ:
      state = {
        loader: true,
        message: null,
        propSuccMessage: null,
      };
      break;

    case UpdateAddPostConst.UPDATE_PRO_ADD_FAIL:
      state = {
        loader: false,
        message: action.message,
      };
      break;

    case UpdateAddPostConst.UPDATE_PRO_ADD_SUCC:
      state = {
        loader: false,

        propSuccMessage: action.message,
        addSuccResult: null,
      };
      break;

    case postCarAddConst.POST_CAR_ADD_REQ:
      state = {
        loader: true,
        addCatCarId: null,
        carAd: null,
        carMessage: null,
      };
      break;

    case postCarAddConst.POST_CAR_ADD_SUCC:
      state = {
        loader: false,
        carAddSuccMessage: action.resMessage,
        addCatCarId: action.carId,
        carAd: true,
      };
      break;

    case postCarAddConst.POST_CAR_ADD_FAIL:
      state = {
        loader: false,
        carMessage: action.resMessage,
        carAd: false,
      };
      break;

    case ClearManageAdd.CLEAR_MANAGE_ADD:
      state = {
        ...state,
        manageCarAdd: [],
        managePropertyAdd: [],
      };
      break;

      case ClearManageAdd.CLEAR_MANAGE_ADDMOTOR:
        state = {
          ...state,
          manageCarAdd: [],
        };
        break;
  
        case ClearManageAdd.CLEAR_MANAGE_ADDPROPERTIES:
          state = {
            ...state,
            managePropertyAdd: [],
          };
          break;




    case manegeAddConst.GET_MANAGE_CAR_ADD:
      state = {
        ...state,
        manageCarAdd: [...state.manageCarAdd, ...action.result],
        manageCarLoder: false,
      };
      break;

    case manegeAddConst.GET_MANAGE_CAR_ADD_REQ:
      state = {
        ...state,
        manageCarLoder: true,
      };
      break;

    case manegeAddConst.GET_MANAGE_PROP_ADD:
      state = {
        ...state,
        managePropertyAdd: [...state.managePropertyAdd, ...action.result],
        managePropertyLoder: false,
      };
      break;
    case manegeAddConst.GET_MANAGE_PROP_ADD_REQ:
      state = {
        ...state,
        managePropertyLoder: true,
      };
      break;

    case publishedAddActionConst.PUBLISHED_ADD_PROPERTY_REQ:
      state = {
        ...state,
        managePropertyAdd: state.managePropertyAdd.map(i => {
          if (i.id === action.id) {
            i.isPublished = action.active;
          }
          return i;
        }),
      };
      break;

    case publishedAddActionConst.PUBLISHED_ADD_PROPERTY:
      state = {
        ...state,
        managePropertyAdd: state.managePropertyAdd.map(i => {
          if (i.id === action.id) {
            i.isPublished = action.active;
          }
          return i;
        }),
      };
      break;

    case publishedAddActionConst.PUBLISHED_ADD_CAR_REQ:
      state = {
        ...state,
        manageCarAdd: state.manageCarAdd.map(i => {
          if (i.id === action.id) {
            i.isPublished = action.active;
          }
          return i;
        }),
      };
      break;

    case publishedAddActionConst.PUBLISHED_ADD_CAR:
      state = {
        ...state,
        manageCarAdd: state.manageCarAdd.map(i => {
          if (i.id === action.id) {
            i.isPublished = action.active;
          }
          return i;
        }),
      };
      break;

    case clearAddMessageCOnst.CLEAR_MESSAGE:
      state = {
        message: null,
        carMessage: null,
        manageCarAdd: [],
        managePropertyAdd: [],
        carAddSuccMessage: null,
      };
      break;

    case updateCarDataConst.UPDATE_CAR_DATA_REQ:
      state = {
        loader: true,

        carAd: null,
        carMessage: null,
      };
      break;
    case updateCarDataConst.UPDATE_CAR_DATA_SUCC:
      state = {
        loader: false,
        carAddSuccMessage: action.resMessage,
        addCatCarId: action.carId,
        carAd: true,
      };
      break;
    case updateCarDataConst.UPDATE_CAR_DATA_FAIL:
      state = {
        loader: false,
        carMessage: action.resMessage,
        carAd: false,
      };
      break;
  }

  return state;
};
