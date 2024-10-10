import Cookies from "js-cookie";
import axios from 'axios';
import{
    UPDATE_VET_SCHEDULE_FAIL,
    UPDATE_VET_SCHEDULE_SUCCESS,
    LOAD_VET_SCHEDULE_SUCCESS,
    LOAD_VET_SCHEDULE_FAIL,
    DELETE_SCHEDULE_FAIL,
    DELETE_SCHEDULE_SUCCESS,
    NEW_SCHEDULE_FAIL,
    NEW_SCHEDULE_SUCCESS,
    MAKE_BOOKING_FAIL,
    MAKE_BOOKING_SUCCESS,
    LOAD_VET_SCHEDULE_USER_FAIL,
    LOAD_VET_SCHEDULE_USER_SUCCESS,
    LOAD_ALL_BOOKED_FAIL,
    LOAD_ALL_BOOKED_SUCCESS,
    LOAD_USER_BOOKED_SUCCESS,
    LOAD_USER_BOOKED_FAIL,
} from './types';

export const load_user_bookings = () => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/user_bookings`, config);
        console.log(res.data)
        if(res.data.error){
            dispatch({
                type: LOAD_USER_BOOKED_FAIL
            });
        } else {
            dispatch({
                type: LOAD_USER_BOOKED_SUCCESS,
                payload: {
                    'user_bookings': res.data.user_bookings
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_ALL_BOOKED_FAIL
        });
    }

}

export const load_all_booked = () => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/booked_all`, config);

        if(res.data.error){
            dispatch({
                type: LOAD_ALL_BOOKED_FAIL
            });
        } else {
            dispatch({
                type: LOAD_ALL_BOOKED_SUCCESS,
                payload: {
                    'booked': res.data.vet_schedules
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_ALL_BOOKED_FAIL
        });
    }

}

export const load_available = (date,id) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res_available = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/available_user?date=${date}&id=${id}`, config);

        if(res_booked.data.error || res_available.data.error){
            dispatch({
                type: LOAD_VET_SCHEDULE_USER_FAIL
            });
        } else {
            dispatch({
                type: LOAD_VET_SCHEDULE_USER_SUCCESS,
                payload: {
                    'available': res_available.data.vet_schedules
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_VET_SCHEDULE_USER_FAIL
        });
    }

}

export const make_report = (species, breed, description, schedule_id) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    const body = JSON.stringify({species, breed, description, schedule_id});

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/make_report`, body, config);
        if (res.data.success){
            dispatch({
                type: MAKE_BOOKING_SUCCESS
            });
        }
        else{
            dispatch({
                type: MAKE_BOOKING_FAIL
            })
        }
    }catch{
        dispatch({
            type: MAKE_BOOKING_FAIL
        })
    }

};


export const make_new_schedules = (date) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    const body = JSON.stringify({date});

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/make_schedules`, body, config);
        if (res.data.success){
            dispatch({
                type: NEW_SCHEDULE_SUCCESS
            });
        }
        else{
            dispatch({
                type: NEW_SCHEDULE_FAIL
            })
        }
    }catch{
        dispatch({
            type: NEW_SCHEDULE_FAIL
        })
    }

};

export const change_schedule_time = (vet_schedule_id, time) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const body = JSON.stringify({
        'withCredentials': true,
        vet_schedule_id,
        time,
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/cancel_booking`, body ,config);

        if (res.data.vet_schedule){
            dispatch({
                type: UPDATE_VET_SCHEDULE_SUCCESS,
            });
        }
        else{
            dispatch({
                type: UPDATE_VET_SCHEDULE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_VET_SCHEDULE_FAIL,
        });
    }
}


export const make_new_schedule = (date, time) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    const body = JSON.stringify({date, time});

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/make_schedule`, body, config);
        console.log(res.data)
        if (res.data.success){
            dispatch({
                type: NEW_SCHEDULE_SUCCESS
            });
        }
        else{
            dispatch({
                type: NEW_SCHEDULE_FAIL
            })
        }
    }catch{
        dispatch({
            type: NEW_SCHEDULE_FAIL
        })
    }

};

export const cancel_booking = (vet_schedule_id) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const body = JSON.stringify({
        'withCredentials': true,
        vet_schedule_id,
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/cancel_booking`, body ,config);

        if (res.data.vet_schedule){
            dispatch({
                type: UPDATE_VET_SCHEDULE_SUCCESS,
            });
        }
        else{
            dispatch({
                type: UPDATE_VET_SCHEDULE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_VET_SCHEDULE_FAIL,
        });
    }
}

export const make_booking = (vet_schedule_id, report_id, user_profile_id) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    
    const body = JSON.stringify({
        'withCredentials': true,
        vet_schedule_id,
        report_id,
        user_profile_id
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/make_booking`, body ,config);

        if (res.data.vet_schedule){
            dispatch({
                type: UPDATE_VET_SCHEDULE_SUCCESS,
            });
        }
        else{
            dispatch({
                type: UPDATE_VET_SCHEDULE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_VET_SCHEDULE_FAIL,
        });
    }
}

export const load_vet_schedule = (date) => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res_booked = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/booked?date=${date}`, config);
        const res_available = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/available?date=${date}`, config);

        if(res_booked.data.error || res_available.data.error){
            dispatch({
                type: LOAD_VET_SCHEDULE_FAIL
            });
        } else {
            dispatch({
                type: LOAD_VET_SCHEDULE_SUCCESS,
                payload: {
                    'booked': res_booked.data.vet_schedules,
                    'available': res_available.data.vet_schedules
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_VET_SCHEDULE_FAIL
        });
    }

}

export const delete_vet_schedule = (id) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };

    const body = JSON.stringify({
        'withCredentials': true,
    });

    try{
        const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/delete_booking?id=${id}`, config, body);
        //Need to pass the config first otherwise the cookie in not sent !!! when deleting !!! ***IMPORTANT***

        if(res.data.success){
            dispatch({
                type: DELETE_SCHEDULE_SUCCESS
            })
        }
        else{
            dispatch({
                type: DELETE_SCHEDULE_FAIL
            })  
        }
    }catch{
        dispatch({
            type: DELETE_SCHEDULE_FAIL
        })  
    }
};