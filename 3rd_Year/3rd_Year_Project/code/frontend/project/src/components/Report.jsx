import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { update_user_location } from "../actions/profile";
import { make_report } from "../actions/vet";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import {Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { load_available } from "../actions/vet";
import { Link } from 'react-router-dom';


const socket = io('http://172.20.10.3:3000');

function Report({location_global, update_user_location, make_report, load_available}) {

    const [location, setLocation] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("")
    const [myData, setMyData] = useState([]);
    const [check, setCheck] = useState(true);

    const navigate = useNavigate()
    const [made, setMade] = useState(false)

    const handleClick = (e, species, breed, description, id) => {
        make_report(species, breed, description, id)
        setMade(true)
    }




    function handleLocationClick() {
        var requestOptions = {
            method: 'GET',
          };

          setCheck(true)
          setMyData([])
          
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
        update_user_location(latitude, longitude);
        sendLocationToFlask(latitude, longitude);
    }

    function error(error) {
        console.log("Geolocation error:", error);
        alert("Error getting location.");
    }

    async function sendLocationToFlask(latitude, longitude) {
        try {
            const config = {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                }
            };

            const body = JSON.stringify({
                lat: latitude,
                lng: longitude,
            });

            // Emit location data via WebSocket
            socket.emit('locationData', body);

        } catch (error) {
            console.error("Error sending location to backend:", error);
        }
    }

    // Function to update profile with location
    useEffect(() => {
        // Event listener for 'formattedData'
        socket.on('formattedData', (data) => {
            setFormattedData(data);
            console.log(data);
        });

        if(made){
            return navigate("/", { replace: true })
        }

        // Cleanup the event listener
        return () => {
            socket.off('formattedData');
        };
    }, [location_global, check, made]);

    const reportForm = () => {
        return (
                    <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mt-3" controlId="validationCustom01">
                        <Form.Label className="mt-3">Species</Form.Label>
                        <Form.Control type="text" placeholder="Species" value={species} onChange={e => setSpecies(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicPassword01">
                        <Form.Label className="mt-3">Breed</Form.Label>
                        <Form.Control type="text" placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicNumber01">
                        <Form.Label className="mt-3">Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Describe the condition of your pet" value={description} onChange={e => setDescription(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3" controlId="validationCustom013">
                        <Form.Label className="mt-3" >Date</Form.Label>
                            <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required/>
                            <Form.Text className="text-muted">
                                    Pick a date
                            </Form.Text>
                    </Form.Group>
                    </Form>
        );
    }

    const displayNearestVets = () => {
        return(
                    <Row xs={1} md={1}>
                        {formattedData.map((item, index) => (
                                    <Col key={index}>
                                        <Card className="mt-3">
                                            <Card.Body>
                                                <Card.Title>Vet Profile ID: {item.id}</Card.Title>
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroup.Item>Name: {item.name}</ListGroup.Item>
                                                <ListGroup.Item>Bio: {item.bio}</ListGroup.Item>
                                                <ListGroup.Item>Distance: {item.distance} miles</ListGroup.Item>
                                            </ListGroup>
                                            <Card.Body>
                                                <ButtonGroup className="d-flex mt-3">
                                                    <Button className="mb-3" variant="success" onClick={e => handleAvailable(e, date, item.id)}>Make a Booking</Button>
                                                </ButtonGroup>
                                            </Card.Body>
                                            <Card.Body>
                                                <Link to={`https://maps.google.com/?q=${item.lat},${item.lng}`}>
                                                <ButtonGroup className="d-flex mt-3">
                                                    <Button className="mb-3" variant="success">View on map</Button>
                                                </ButtonGroup>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            
                        ))}
                    </Row>
        )
    }


    const displaySchedules = () => {
        return(
            <Row xs={1} md={1}>
                    {
                    myData.map((item, index) => (
                        <Col key={index}>
                        <Card className="mt-3">
                            <Card.Body>
                                <Card.Title>Booking Number: {item.id}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Date: {item.date}</ListGroup.Item>
                                <ListGroup.Item>Time: {item.time.time}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <ButtonGroup className="d-flex mt-3">
                                    <Button className="mb-3 mt-3" variant="success" onClick={e => handleClick(e,species, breed, description,item.id)}>Confirm the booking</Button>
                                    <Button className="mt-3 mb-3" variant="primary" onClick={e => handleDisplayVets(e)}>Show Nearest Vets</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                        </Col>
                ))}
                </Row>
        )
    }

    const handleDisplayVets = (e) =>{
        setCheck(true)
        setMyData([])
    }

    const handleAvailable = (e, date, id) =>{
        console.log(id)
        var requestOptions = {
            method: 'GET',
            };
        
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/available_user?date=${date}&id=${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setMyData(data.vet_schedules)
                setCheck(false)
                });
        


    }

    return (
        <Container fluid className="justify-content-center">
            <h1 className="mt-3">Make a vet Report</h1>
            <Row>
                <Col xs={1}></Col>
                <Col>
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                    {reportForm()}
                    <ButtonGroup className="d-flex mt-3">
                        <Button className="mt-3 mb-3" variant="primary" onClick={handleLocationClick}>Show Nearest Vets</Button>
                    </ButtonGroup>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                    {formattedData.length > 0 && check === true && displayNearestVets()}
                    {myData.length > 0 && check === false && displaySchedules()}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                </Col>
                <Col xs={1}></Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({
    location_global: state.profile.location,
});



export default connect(mapStateToProps, { update_user_location, make_report, load_available })(Report);

/*<div>
            {reportForm()}
            {!location && <button onClick={handleLocationClick}>Show Nearest Vets</button>}
            <hr/>
            {formattedData.length > 0 && (
                <div>
                    <h2>Nearby vets</h2>
                    <ul>
                        {formattedData.map((item, index) => (
                            <li key={index}>
                                <hr/>
                                <h5>Name: {item.name}</h5>
                                <h6>Bio: {item.bio}</h6>
                                <h6>Distance: {item.distance}</h6>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            )}
        </div>
        <ButtonGroup className="d-flex mt-3">
            <Button className="mb-3" variant="success" onClick={e => handleClick(e,species, breed, description,item.id)}>Make a Booking</Button>
        </ButtonGroup>
                ))}

                
    
        */
