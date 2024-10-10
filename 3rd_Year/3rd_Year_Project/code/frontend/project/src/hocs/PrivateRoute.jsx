import React from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { Fragment } from "react";


const PrivateRoute = ({ isAuthenticated, type }) => {
    
    const navigate = useNavigate();

    return(
        isAuthenticated && type ==='user' ? <Outlet /> : navigate('/login', {replace:true})
    )
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.type
});

export default connect(mapStateToProps, {})(PrivateRoute);