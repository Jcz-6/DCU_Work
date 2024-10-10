import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import { load_vet_schedule, change_schedule_time, delete_vet_schedule, make_new_schedules, make_new_schedule } from "../actions/vet";
import { load_free_times } from "../actions/time";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import {Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

const VetSchedules = ({
    available_global,
    booked_global,
    load_vet_schedule,
    delete_vet_schedule,
    change_schedule_time,
    load_free_times,
    free_times_global,
    make_new_schedules,
    make_new_schedule
}) => {

    //console.log(Cookies.get('csrftoken'));
    const available = useSelector((state) => state.vet.available);
    const booked = useSelector((state) => state.vet.booked);
    const free_times = useSelector((state) => state.time.free_times);
    const [date, setDate] = useState("")
    const [dateTwo, setDateTwo] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        load_vet_schedule(date)
        load_free_times(date)
      }, [date]);

      console.log(booked)

    const onSubmit = e => {
        e.preventDefault();

        make_new_schedules(dateTwo)

    };

    const onSubmitTwo = e => {
        e.preventDefault();

        make_new_schedule(date, time)
        load_vet_schedule(date)
        load_free_times(date)
    };

    function refreshPage() {
        window.location.reload(false);
      }

    const handleClick = (e, id) => {
        delete_vet_schedule(id)
        refreshPage()
    }


    const schedulesForm = () => {
            return (
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Create a available day</Accordion.Header>
                  <Accordion.Body>
                        <Form onSubmit={e => onSubmit(e)}>
                            <Form.Group className="mt-3 mb-3" controlId="validationCustom01">
                                <Form.Label className="mt-3" >Date</Form.Label>
                                <Form.Control type="date" value={dateTwo} onChange={e => setDateTwo(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Pick a date
                                </Form.Text>
                            </Form.Group>
                            <ButtonGroup className="d-flex mt-3">
                                <Button className="mb-3" variant="primary" type="submit">Add a day of Bookings</Button>
                            </ButtonGroup>
                        </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
    }


    const displayBooked = () => {
        return(
                <Row xs={1} md={3}>

                    {booked.map((item, index) => (
                                <Col key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Booking Number: {item.id} <hr></hr> Date: {item.date}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>User: {item.user.first_name}</ListGroup.Item>
                                            <ListGroup.Item>Time: {item.time.time}</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Text>
                                                {item.report.species}: {item.report.breed}<br></br>
                                                {item.report.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Link to={`/chat/${item.id}`}>
                                            <ButtonGroup className="d-flex mt-3">
                                              <Button className="mb-3" >Communicate</Button>
                                            </ButtonGroup>
                                        </Link>
                                    </Card>
                                </Col>
                        
                    ))}
                </Row>
     )
    }

    const displayAvailable = () => {
        return(
                    <Row xs={1} md={3}>
                        {available.map((item, index) => (
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
                                                    <Button className="mb-3" variant="danger" onClick={e => handleClick(e,item.id)}>Delete</Button>
                                                </ButtonGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            
                        ))}
                    </Row>
        )
    }

    const scheduleForm = () => {
        return (    
            <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                <Accordion.Header>Add a new time slot</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={e => onSubmitTwo(e)}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="mt-3">Available Times</Form.Label>
                            <Form.Select
                                value={time}
                                onChange={e => {setTime(e.target.value);
                                }} required minLength={6} >
                                    <option value={""}>Select a time</option>
                                    {free_times.map((item, index) => (
                                        <option key={index} value={item.time}>{item.time}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <ButtonGroup className="d-flex mt-3">
                            <Button className="mb-3" variant="primary" type="submit">Add Time</Button>
                        </ButtonGroup>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>   
        );
    }

    return(
        <Container fluid className="justify-content-center">
            <h1 className="mt-3">Here is your Schedule</h1>
            <Row>
                <Col xs={1}></Col>
                <Col>
                <Row>
                    <Col xs={2}></Col>
                        <Col>
                        <Form onSubmit={e => onSubmit(e)}>
                            <Form.Group className="mt-3 mb-3" controlId="validationCustom01">
                                <Form.Label className="mt-3" >Date</Form.Label>
                                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Pick a date
                                </Form.Text>
                            </Form.Group>
                        </Form>
                        </Col>
                <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                    {schedulesForm()}
                    {scheduleForm()}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <h1>Bookings</h1>
                <hr></hr>
                {booked !== undefined ? displayBooked() : <p></p>}
                <h1>Available</h1>
                <hr></hr>
                {available !== undefined ? displayAvailable() : <p></p>}
                </Col>
                <Col xs={1}></Col>
            </Row>
        </Container>
    )
};    
    //if (isAuthenticated){
    //    navigate('/', { replace: true });
    //}

    //<Button className="mb-3" variant="primary" onClick={addTime} >Add a time</Button>
    //{showTime && <p>Hey</p>}

const mapStateToProps = state => ({
    available_global: state.vet.available,
    booked_global: state.vet.booked,
    free_times_global: state.time.free_times
});


export default connect(mapStateToProps, { load_vet_schedule, change_schedule_time, delete_vet_schedule, load_free_times, make_new_schedules, make_new_schedule})(VetSchedules);