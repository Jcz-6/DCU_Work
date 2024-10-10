import{
    UPDATE_VET_SCHEDULE_FAIL,
    UPDATE_VET_SCHEDULE_SUCCESS,
    LOAD_VET_SCHEDULE_SUCCESS,
    LOAD_VET_SCHEDULE_FAIL,
    DELETE_SCHEDULE_FAIL,
    DELETE_SCHEDULE_SUCCESS,
    MAKE_BOOKING_FAIL,
    MAKE_BOOKING_SUCCESS,
    LOAD_VET_SCHEDULE_USER_FAIL,
    LOAD_VET_SCHEDULE_USER_SUCCESS,
    LOAD_ALL_BOOKED_FAIL,
    LOAD_ALL_BOOKED_SUCCESS,
    LOAD_USER_BOOKED_SUCCESS,
    LOAD_USER_BOOKED_FAIL,
} from '../actions/types';

const initailSate = {
    available: [],
    booked: [],
}

export default function(state = initailSate, action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_VET_SCHEDULE_SUCCESS:
        case LOAD_VET_SCHEDULE_SUCCESS:
            return {
                ...state,
                available: payload.available,
                booked: payload.booked
            }
        case LOAD_VET_SCHEDULE_USER_SUCCESS:
            return {
                ...state,
                available: payload.available,
            }
        case LOAD_ALL_BOOKED_SUCCESS:
            return {
                ...state,
                booked: payload.booked,
            }
        case LOAD_USER_BOOKED_SUCCESS:
            return {
                ...state,
                user_bookings: payload.user_bookings,
            }
        case LOAD_VET_SCHEDULE_FAIL:
        case MAKE_BOOKING_SUCCESS:
        case DELETE_SCHEDULE_SUCCESS:
        case LOAD_VET_SCHEDULE_USER_FAIL:
        case LOAD_ALL_BOOKED_FAIL:
        case LOAD_USER_BOOKED_FAIL:
            return {
                ...state,
            }
        case MAKE_BOOKING_FAIL:
        case UPDATE_VET_SCHEDULE_FAIL:
        case LOAD_VET_SCHEDULE_FAIL:
        case DELETE_SCHEDULE_FAIL:
            return {
                ...state
            }
        default:
            return{
                ...state
            }
    }
};