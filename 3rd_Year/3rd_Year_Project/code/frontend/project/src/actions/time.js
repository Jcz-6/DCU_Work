import Cookies from "js-cookie";
import axios from 'axios';
import{
    LOAD_FREE_TIME_FAIL,
    LOAD_FREE_TIME_SUCCESS,
} from './types';

export const load_free_times = (date) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/free_times?date=${date}`, config);

        if(res.data.error){
            dispatch({
                type: LOAD_FREE_TIME_FAIL
            });
        } else {
            dispatch({
                type: LOAD_FREE_TIME_SUCCESS,
                payload: {
                    'free_times': res.data.free_times
                }
            })
        }

    }catch{
        dispatch({
            type: LOAD_FREE_TIME_FAIL
        });
    }

}