import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS,
    AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS} from '../actions/types'

const initailSate = {
    isAuthenticated: null,
    type: '',
}

export default function(state = initailSate, action) {
    const {type, payload} = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated: payload.status,
                type: payload.u_type
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                type: payload.u_type
            }
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                isAuthenticated: false,
                type: ""
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case DELETE_USER_FAIL:
            return{
                ...state
            }
        default:
            return {
                ...state
            }
    };
};