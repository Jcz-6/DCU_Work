import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const CSRFToken = () => {

    const [csrfToken, setcsrfToken] = useState("")

    const getCookie = (name) => {
        let cookieValue = "";
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/accounts/csrf_cookie`).then(res =>  res.status === 200 ? true : false)
                .catch(err => false);
            } catch (e) {
                console.log('Error');
            }
        };
        //console.log(document.cookie);
        fetchData();
        setcsrfToken(getCookie('csrftoken'));
    }, [csrfToken]);

    return (
        <Form.Control type='hidden' name='csrfmiddlewaretoken' value={csrfToken}></Form.Control>
    )
};

export default CSRFToken;