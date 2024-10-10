import Cookies from "js-cookie";
import axios from 'axios';
import{
    MAKE_REPORT_FAIL,
    MAKE_REPORT_SUCCESS,
    LOAD_ORG_REPORTS_FAIL,
    LOAD_ORG_REPORTS_SUCCESS,
    LOAD_USER_REPORTS_SUCCESS,
    LOAD_USER_REPORTS_FAIL,
} from './types';

export const load_user_reports = () => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/user_reports`, config);
        if(res.data.error){
            dispatch({
                type: LOAD_USER_REPORTS_FAIL
            });
        } else {
            dispatch({
                type: LOAD_USER_REPORTS_SUCCESS,
                payload: {
                    'user_reports': res.data.user_reports
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_USER_REPORTS_FAIL
        });
    }

}


export const load_reports = () => async dispatch => {

    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/reports_all`, config);
        console.log(res.data.org_reports)
        if(res.data.error){
            dispatch({
                type: LOAD_ORG_REPORTS_FAIL
            });
        } else {
            dispatch({
                type: LOAD_ORG_REPORTS_SUCCESS,
                payload: {
                    'org_reports': res.data.org_reports
                }
            })    
        }

    }catch{
        dispatch({
            type: LOAD_ORG_REPORTS_FAIL
        });
    }

}

export const make_org_report = (species, breed, description, id) => async dispatch => {
    const config = {
        withCredentials : true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Access-Control-Allow-Origin': '*'
        }
    };
    const body = JSON.stringify({species, breed, description, id});

    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/make_org_report`, body, config);
        if (res.data.success){
            dispatch({
                type: MAKE_REPORT_SUCCESS
            });
        }
        else{
            dispatch({
                type: MAKE_REPORT_FAIL
            })
        }
    }catch{
        dispatch({
            type: MAKE_REPORT_FAIL
        })
    }

};

