import Cookies from "js-cookie";
import axios from 'axios';
import{
    LOAD_PROFILE_FAIL,
    LOAD_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    LOAD_VET_PROFILE_SUCCESS,
    LOAD_ORG_PROFILE_SUCCESS,
    UPDATE_VET_PROFILE_SUCCESS, UPDATE_VET_PROFILE_FAIL,
    UPDATE_ORG_PROFILE_SUCCESS, UPDATE_ORG_PROFILE_FAIL,
} from './types';

export const update_vet_profile = (name, specialty, bio) => async dispatch => {

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
        name,
        specialty,
        bio,
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/update_vet`, body ,config);

        if (res.data.vet_profile){
            dispatch({
                type: UPDATE_VET_PROFILE_SUCCESS,
                payload: res.data
            });
        }
        else{
            dispatch({
                type: UPDATE_VET_PROFILE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_VET_PROFILE_FAIL,
        });
    }
}

export const update_vet_location = (latitude, longitude, vet_profile_id) => async dispatch => {
    const locationString = `SRID=4326;POINT (${longitude} ${latitude})`;

    try {
        const config = {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Access-Control-Allow-Origin": "*"
            }
        };

        const body = JSON.stringify({
            'withCredentials': true,
            location: locationString,
            vet_profile_id,
        });

        const res = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API_URL}/profile/vet_location`,
            body,
            config
        );

        if (res.data.vet_profile) {
            dispatch({
                type: UPDATE_VET_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_VET_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        dispatch({
            type: UPDATE_VET_PROFILE_FAIL
        });
    }
}

export const update_user_location = (latitude, longitude) => async dispatch => {
    const locationString = `SRID=4326;POINT (${longitude} ${latitude})`;
    try {
        const config = {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Accept-Language"
            }
        };

        const body = JSON.stringify({
            withCredentials: true,
            location: locationString,
        });

        const res = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API_URL}/profile/location`,
            body,
            config
        );

        if (res.data.profile && res.data.username) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        });
    }
}

export const load_user = () => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/user`, config);

        if(res.data.error){
            dispatch({
                type: LOAD_PROFILE_FAIL
            });
        } else if(res.data.type === "user") {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        } else if(res.data.type === "vet") {
            dispatch({
                type: LOAD_VET_PROFILE_SUCCESS,
                payload: res.data
            });
        } else if(res.data.type === "org") {
            dispatch({
                type: LOAD_ORG_PROFILE_SUCCESS,
                payload: res.data
            });
        }

    }catch{
        dispatch({
            type: LOAD_PROFILE_FAIL
        });
    }

}

export const update_profile = (first_name, second_name, age) => async dispatch => {

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
        first_name,
        second_name,
        age
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/update`, body ,config);

        if (res.data.profile && res.data.username){
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        }
        else{
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
        });
    }
}

export const update_org_profile = (name, specialty, bio) => async dispatch => {

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
        name,
        specialty,
        bio,
    });

    try{
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/update_org`, body ,config);

        if (res.data.org_profile){
            dispatch({
                type: UPDATE_ORG_PROFILE_SUCCESS,
                payload: res.data
            });
        }
        else{
            dispatch({
                type: UPDATE_ORG_PROFILE_FAIL,
            });
        }
    }catch{
        dispatch({
            type: UPDATE_ORG_PROFILE_FAIL,
        });
    }
}

export const update_org_location = (latitude, longitude) => async dispatch => {
    const locationString = `SRID=4326;POINT (${longitude} ${latitude})`;

    try {
        const config = {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Access-Control-Allow-Origin": "*"
            }
        };

        const body = JSON.stringify({
            'withCredentials': true,
            location: locationString,
        });

        const res = await axios.put(
            `${import.meta.env.VITE_REACT_APP_API_URL}/profile/org_location`,
            body,
            config
        );

        if (res.data.org_profile) {
            dispatch({
                type: UPDATE_ORG_PROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_ORG_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        dispatch({
            type: UPDATE_ORG_PROFILE_FAIL
        });
    }
}