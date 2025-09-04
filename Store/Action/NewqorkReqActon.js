import { networkRequestFailConst } from "../Action/ActionConstants"

export const networkReqActioin = () => {
    return async dispatch => {
        dispatch({
            type: networkRequestFailConst.NETWORD_REQ_FAIL_CLEAR
        })
    }
}