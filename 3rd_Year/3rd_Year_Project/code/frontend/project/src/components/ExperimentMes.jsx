import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { load_all_booked } from "../actions/vet";
import { load_user_bookings } from "../actions/vet";
import {load_user_reports } from "../actions/org";
import {load_reports} from "../actions/org";
import { Row, Col, Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

const ExperimentMes = ({ isAuthenticated, load_all_booked, load_reports, type, load_user_reports, load_user_bookings, state_global}) => {
    const booked = useSelector((state) => state.vet.booked);
    const orgReports = useSelector((state) => state.org.org_reports);
    const userBooking = useSelector((state) => state.vet.user_bookings);
    const userReports = useSelector((state) => state.org.user_reports);
    const [vetType, setVetType] = useState(false)
    const [orgType, setOrgType] = useState(false)

    //console.log(state_global)

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
        if(type === 'org'){
            load_reports()
        }
        if(type === 'vet'){
            load_all_booked()
        }
        

      }, [type]);
    
      const displayBookingList = () => {
        return (
          <Row xs={1} md={1}>
            <ul>
              {userBooking.map((booking) => (
                <Card className="mt-3" key={booking.id}>
                    <Card.Body>
                      <Card.Title>{booking.vet_profile.name} - {booking.date} </Card.Title>
                      <Card.Title>Booking: {booking.id}</Card.Title>
                    </Card.Body>
                    <h6>Report Details</h6>
                    {Object.entries(booking.report).map(([key, value]) => (
                      key !== "id" && key !== "reporter" && key !== "location_found" && (
                        <ListGroup className="list-group-flush" key={key}>
                          <p>{key}: {value}</p>
                        </ListGroup>
                      )
                    ))}
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

      const displayReportList = () => {
        return (
          <Row xs={1} md={1}>
              {userReports.map((booking) => (
                <Card className="mt-3" key={booking.id}>
                    <Card.Body>
                      <Card.Title>Org: {booking.org.name}</Card.Title>
                      <Card.Title>Report: {booking.report.id}</Card.Title>
                    </Card.Body>
                    <h6>Report Details</h6>
                    {Object.entries(booking.report).map(([key, value]) => (
                      key !== "id" && key !== "reporter" && key !== "location_found" && (
                        <ListGroup className="list-group-flush" key={key}>
                          <p>{key}: {value}</p>
                        </ListGroup>
                      )
                    ))}
                  <Link to={`/chat/${booking.id}`}>
                  <ButtonGroup className="d-flex mt-3">
                    <Button className="mb-3" >Communicate</Button>
                  </ButtonGroup>
                  </Link>
                </Card>
              ))}
          </Row>
        )
      }
    
    
    const message = () => {
        return (
            <Container fluid className="justify-content-center">
                    <h1 className="mt-3">Your Reports and Bookings</h1>
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
                            {userReports !== undefined && orgType === true && displayReportList()}
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

    const links = () => {
        if (isAuthenticated && type === 'user') {
            return message();
        } else if (isAuthenticated && type === 'vet' && booked !== undefined) { // Only show if user is a vet
            return renderBookedAppointments(); // Call the displayBooked function
        } else if (isAuthenticated && type === 'org' && orgReports !== undefined) { // Only show if user is a vet
            return renderReport(); // Call the displayBooked function
        }
    };

    const renderReport = () => {
        return(
                <Row xs={1} md={3}>
                {orgReports.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Report Number: {item.id} <hr/> Species: {item.report.species}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>From: {item.user.first_name}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Text>
                                    Breed: {item.report.breed}<br />
                                    {item.report.description}
                                </Card.Text>
                            </Card.Body>
                            <Link to={`/chat/${item.report.id}`}>
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

    const renderBookedAppointments = () => {
        return (
            <Row xs={1} md={3}>
                {booked.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Booking Number: {item.id} <hr /> Date: {item.date}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>User: {item.user.first_name}</ListGroup.Item>
                                <ListGroup.Item>Time: {item.time.time}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Text>
                                    {item.report.species}: {item.report.breed}<br />
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
        );
    };

    return (
        <div>
            {links()}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.type,
    state_global: state
});

export default connect(mapStateToProps, {load_all_booked, load_reports, load_user_reports, load_user_bookings})(ExperimentMes);
