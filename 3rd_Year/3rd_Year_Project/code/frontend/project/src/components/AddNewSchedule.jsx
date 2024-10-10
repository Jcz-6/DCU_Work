import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import {make_new_schedule} from "../actions/vet";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { load_free_times } from "../actions/time";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import {Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddNewSchedule = ({make_new_schedule, load_free_times}) =>{
    const free_times = useSelector((state) => state.time.free_times);
    const date = new Date().toISOString().slice(0, 10);
    const [time, setTime] = useState("")
    const [made, setMade] = useState(false)

    function refreshPage() {
        window.location.reload(false);
      }


    const onSubmit = e => {
        e.preventDefault();
        make_new_schedule(date, time)
        refreshPage()
        
    };


    const scheduleForm = () => {
        return (    
                    <Form onSubmit={e => onSubmit(e)}>
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
                    
        );
    }

    if (free_times !== undefined) {
    return(
        <Container fluid className="justify-content-center">
            <h1 className="mt-3">Add booking slot for {date}</h1>
            <Row>
                <Col xs={1}></Col>
                <Row>
                    <Col xs={3}></Col>
                        <Col>
                            {scheduleForm()}
                        </Col>
                <Col xs={3}></Col>
                </Row>
                <Col xs={1}></Col>
            </Row>
        </Container>
    )
}
}

const mapStateToProps = state => ({
    available_global: state.vet.available,
    booked_global: state.vet.booked,
    free_times_global: state.time.free_times
});

export default connect(mapStateToProps, { make_new_schedule, load_free_times })(AddNewSchedule);