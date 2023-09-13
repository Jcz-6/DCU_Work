import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const { useState, useEffect } = require("react");


export default function Header(){

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4

    return (
    <Container fluid>
    <Row>
        <Col className='shadow-4' style={{ background: 'linear-gradient(to right, gray, black'}} >
        </Col>
        <Col xs={9}>
        <div className='mx-auto'>
        <Container>
            <Row className="justify-content-md-center">
                <Col></Col>
                <Col >
                    <img src="ball.gif" className="App-logo" alt="logo"/>
                    <br />
                    <br />
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
        </div>
        </Col>
        <Col style={{ background: 'linear-gradient(to left, gray, black'}}>
        </Col>
        <br />
    </Row>
    </Container>
    )
}