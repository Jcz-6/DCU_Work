import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { update_org_profile } from "../actions/profile";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import {Button, ButtonGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import { delete_account } from '../actions/auth';
import { update_org_location } from "../actions/profile";
import { load_user } from "../actions/profile";


const OrgDashboard = ({
    delete_account,
    update_org_profile,
    update_org_location,
    name_global,
    bio_global,
    specialty_global,
    location_global
}) => {


    //console.log(Cookies.get('csrftoken'));
    const [ name, setName] = useState("");
    const [ bio, setBio] = useState("");
    const [ specialty, setSpeciality] = useState("");
    const [location, setLocation] = useState(null);

    function handleLocationClick() {
        var requestOptions = {
            method: 'GET',
          };

          
          fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${import.meta.env.VITE_REACT_LOCATION_API_KEY}`, requestOptions)
            .then(response => response.json())
            .then(positionData => {
                success(positionData)});
        

    }

    function success(positionData) {
        const latitude = positionData.location.latitude;
        const longitude = positionData.location.longitude;
        setLocation({ latitude, longitude });
        

        // Show alert with location details
        alert(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Call update_profile with location details
        update_org_location(latitude, longitude);
    }

    function error(error) {
        console.log("Geolocation error:", error);
        alert("Error getting location.");
    }


    const onSubmit = e => {
        e.preventDefault();

        update_org_profile(name, specialty, bio);
    };

    useEffect(() =>{
        setName(name_global),
        setBio(bio_global),
        setSpeciality(specialty_global)
    },[name_global, location_global])


    
    //if (isAuthenticated){
    //    navigate('/', { replace: true });
    //}

    return(
        <Container fluid className="justify-content-center">
            <h1 className="mt-3">Welcome to your Profile</h1>
            <Row>
                <Col xs={3}></Col>
                <Col>
                <p className="mt-3 mb-2">Update your profile below:</p>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mt-3" controlId="validationCustom01">
                        <Form.Label className="mt-3">Name</Form.Label>
                        <Form.Control type="text" placeholder={`${name_global}`} value={name} onChange={e => setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicPassword01">
                        <Form.Label className="mt-3">Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={`${bio_global}`} value={bio} onChange={e => setBio(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicNumber01">
                        <Form.Label className="mt-3">Speciality</Form.Label>
                        <Form.Control type="text" placeholder={`${specialty_global}`} value={specialty} onChange={e => setSpeciality(e.target.value)} required/>
                    </Form.Group>
                    <ButtonGroup className="d-flex mt-3">
                        <Button className="mt-3 mb-3" variant="primary" type="submit">Update Org Profile</Button>
                        <Button className="mt-3 mb-3" variant="primary" onClick={handleLocationClick}>Update Org Location</Button>
                    </ButtonGroup>
                </Form>
                <hr></hr>
                <p className="mt-6 mr-3">Press this button to delete your account:  <Button className="ml-3" variant="danger" onClick={delete_account}>Delete Account</Button></p>
                <hr></hr>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </Container>
    )
};

const mapStateToProps = state => ({
    name_global: state.profile.name,
    bio_global: state.profile.bio,
    specialty_global: state.profile.specialty,
    location_global: state.profile.location,
});


export default connect(mapStateToProps, { update_org_profile, delete_account, update_org_location })(OrgDashboard);


