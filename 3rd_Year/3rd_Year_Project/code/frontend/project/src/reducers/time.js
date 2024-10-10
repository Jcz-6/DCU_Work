import{
    LOAD_FREE_TIME_FAIL,
    LOAD_FREE_TIME_SUCCESS,
} from '../actions/types';

const initailSate = {
    free_times:[]
}

export default function(state = initailSate, action) { 
    const {type, payload} = action;

    switch (type) {
        case LOAD_FREE_TIME_SUCCESS:
            return {
                ...state,
                free_times: payload.free_times
            }
        case LOAD_FREE_TIME_FAIL:
            return {
                ...state
            }
        default:
            return{
                ...state
            }
    }
};