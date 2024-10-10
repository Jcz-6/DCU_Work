import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { update_profile } from "../actions/profile";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import { delete_account } from '../actions/auth';


const Dashboard = ({
    delete_account,
    update_profile,
    first_name_global,
    second_name_global,
    age_global,
}) => {


    //console.log(Cookies.get('csrftoken'));
    const [ first_name, setFirst_name] = useState("");
    const [ second_name, setSecond_name] = useState("");
    const [ age, setAge] = useState(0);


    const onSubmit = e => {
        e.preventDefault();

        update_profile(first_name, second_name, age);
    };

    useEffect(() =>{
        setFirst_name(first_name_global),
        setSecond_name(second_name_global),
        setAge(age_global)

    },[first_name_global])
     
    //if (isAuthenticated){
    //    navigate('/', { replace: true });
    //}

    return(
        <Container fluid className="justify-content-center">
            <h1 className="mt-3">Welcome to your Dashboard</h1>
            <Row>
                <Col xs={3}></Col>
                <Col>
                <p className="mt-3 mb-2">Update your profile below:</p>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mt-3" controlId="validationCustom01">
                        <Form.Label className="mt-3">First Name</Form.Label>
                        <Form.Control type="text" placeholder={`${first_name_global}`} value={first_name} onChange={e => setFirst_name(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicPassword01">
                        <Form.Label className="mt-3">Second Name</Form.Label>
                        <Form.Control type="text" placeholder={`${second_name_global}`} value={second_name} onChange={e => setSecond_name(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicNumber01">
                        <Form.Label className="mt-3">Age</Form.Label>
                        <Form.Control type="number" placeholder={`${age_global}`} value={age} onChange={e => setAge(e.target.value)} required/>
                    </Form.Group>
        
                    <Button className="mt-3 mb-3" variant="primary" type="submit">Update Profile</Button>
                </Form>
                <p className="mt-6 mr-3">Press this button to delete your account:  <Button className="ml-3" variant="danger" onClick={delete_account}>Delete Account</Button></p>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </Container>
    )
};

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    second_name_global: state.profile.second_name,
    age_global: state.profile.age,
});


export default connect(mapStateToProps, { update_profile, delete_account })(Dashboard);