import React, {Fragment, useEffect} from "react";
import MyNavbar from "../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated } from "../actions/auth";
import { load_user } from "../actions/profile";
import Footer from "../components/Footer";


const Layout = ({ children, checkAuthenticated, load_user}) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return(
        <Fragment>
            <MyNavbar/>
            {children}
            <Footer/>
        </Fragment>
    )
};

export default connect(null, { checkAuthenticated, load_user}) (Layout);