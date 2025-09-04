
import { networkRequestFailConst } from "../Action/ActionConstants"

const initialState = {
    requestFail: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case networkRequestFailConst.NETWORD_REQ_FAIL:
            state = {
                ...state,
                requestFail: true

            }
            break

        case networkRequestFailConst.NETWORD_REQ_FAIL_CLEAR:
            state = {
                ...state,
                requestFail: false

            }
            break
    }
    return state
}