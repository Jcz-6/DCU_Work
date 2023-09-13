import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const { useState, useEffect } = require("react");


export default function HomePage(){

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4

    return (
    <Container fluid>
    <Row>
        <Col className='vh-75' style={{ background: 'linear-gradient(to right, grey, black' }}>
        </Col>
        <Col xs={9}>
            <div className='mx-auto'>
               <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col md lg="8">
                        <ButtonGroup>
                            <Link to={"/"}>
                                <Button size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>Home Page</Button>
                            </Link>
                         </ButtonGroup>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row className="justify-content-md-center">
                        <Col md lg="6">
                        <ButtonGroup>
                            <Link to={"/degrees"}>
                                <Button lg="3" size="lg" variant="secondary">Degrees </Button>
                            </Link>
                            <br></br>
                            <Link to={"/cohorts"}>
                                <Button lg="3" size="lg" variant="secondary">Cohorts </Button>
                            </Link>
                            <br />
                            <Link to={"/modules"}>
                                <Button lg="3" size="lg" variant="secondary">Modules </Button>
                            </Link>
                            <br />
                            <Link to={"/students"}>
                                <Button lg="3" size="lg" variant="secondary">Students</Button>
                            </Link>
                            </ButtonGroup>
                        </Col>
                        <hr />
                    </Row>
                    <br />
                </Container>
            </div>
        </Col>
        <Col style={{ background: 'linear-gradient(to left, grey, black' }}>
        </Col>
    </Row>
    </Container>
    )
}