import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { load_user_bookings } from "../actions/vet";
import {load_user_reports } from "../actions/org";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'


const Message = ({load_user_reports, load_user_bookings, state_global}) => {
  const userBooking = useSelector((state) => state.vet.user_bookings);
  const userReports = useSelector((state) => state.org.user_reports);
  const [vetType, setVetType] = useState(false)
  const [orgType, setOrgType] = useState(false)

  console.log(state_global)
  const handleClickTwo = (e) => {
        load_user_bookings()
        setOrgType(false)
        setVetType(true)
    }

    const handleClick = (e) => {
        load_user_reports()
        setVetType(false)
        setOrgType(true)
    }

    useEffect(() => {
    }, [vetType, orgType]);

  const displayBookingList = () => {
    return (
      <Row xs={1} md={1}>
        <h3>My reports</h3>
        <ul>
          {bookings.map((booking) => (
            <Card className="mt-3" key={booking.id}>
              <li>
                <Card.Body>
                  <Card.Title>{booking.vet_profile.name}- {booking.date} </Card.Title>
                </Card.Body>
                <h6>Report Details</h6>
                {Object.entries(booking.report).map(([key, value]) => (
                  key !== "id" && key !== "reporter" && key !== "location_found" && (
                    <ListGroup className="list-group-flush" key={key}>
                      <p>{key}: {value}</p>
                    </ListGroup>
                  )
                ))}
              </li>
              <Link to={`/chat/${booking.id}`}>
              <ButtonGroup className="d-flex mt-3">
                <Button className="mb-3" >Communicate</Button>
              </ButtonGroup>
              </Link>
            </Card>
          ))}
        </ul>
      </Row>
    )
  }
 
  return (
    <Container fluid className="justify-content-center">
            <h1 className="mt-3">Make a vet Report</h1>
            <Row>
                <Col xs={1}></Col>
                <Col>
                <ButtonGroup className="d-flex mt-3">
                  <Button className="mb-3 mt-3" variant="primary" onClick={e => handleClick(e)}>Show your Reports</Button>
                  <Button className="mt-3 mb-3" variant="primary" onClick={e => handleClickTwo(e)}>Show your Bookings</Button>
                </ButtonGroup>
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                    {userBooking !== undefined && vetType === true && displayBookingList()}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                </Row>
                </Col>
                <Col xs={1}></Col>
            </Row>
        </Container>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  type: state.auth.type,
  state_global: state
});

export default connect(mapStateToProps, {load_user_bookings, load_user_reports})(Message);