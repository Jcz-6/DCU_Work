import axios from 'axios'
import { load_user } from './profile';
import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS,
    AUTHENTICATED_FAIL, AUTHENTICATED_SUCCESS, DELETE_USER_FAIL, DELETE_USER_SUCCESS} from './types'
import Cookies from 'js-cookie'


export const checkAuthenticated = () => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/authenticated`, config);
        
        if(res.data.error || res.data.isAuthenticated === 'error'){
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: {'status': false, 'u_type': res.data.u_type}
            });
        }
        else if (res.data.isAuthenticated === 'success'){
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: {'status': true, 'u_type': res.data.u_type}

            }); 
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: {'status': false, 'u_type': res.data.u_type}
            });
        }  
    }catch{
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: {'status': false, 'u_type': "none"}
        });
    }


};

export const login = (username, password) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    const body = JSON.stringify({username, password});

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/login`, body, config);
        console.log(res.data.u_type)
        if (res.data.success){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {'u_type': res.data.u_type}
            });

            // action creator for loading the user load
        }
        else{
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }catch{
        dispatch({
            type: LOGIN_FAIL
        })
    }

};

export const logout = () => async dispatch => {
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
        'withCredentials': true
    });

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/logout`, body, config);
        if (res.data.success){
            dispatch({
                type: LOGOUT_SUCCESS,
            });

        }
        else{
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    }catch{
        dispatch({
            type: LOGOUT_FAIL
        })
    }

};

export const registers = (username, password, re_password, user_type) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    }

    const body = JSON.stringify({username, password, re_password, user_type});

    try{
        //console.log(config);
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/register`, body, config)
        if (res.data.error){
            dispatch({
                type: REGISTER_FAIL
            }
            );
        }
        else {
            dispatch({
                type: REGISTER_SUCCESS
            }
            );
        }
    } catch{
        dispatch({
            type: REGISTER_FAIL
        }
        );
    }

}

export const delete_account = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try{
        const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/delete`, config, body);
        //Need to pass the config first otherwise the cookie in not sent !!! when deleting !!! ***IMPORTANT***

        if(res.data.success){
            dispatch({
                type: DELETE_USER_SUCCESS
            })
        }
        else{
            dispatch({
                type: DELETE_USER_FAIL
            })  
        }
    }catch{
        dispatch({
            type: DELETE_USER_FAIL
        })  
    }
};