import React, { useState, useEffect } from "react";
import { login } from "../actions/auth";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import CSRFToken from './CSRFToken';
import { useNavigate } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {

    const navigate = useNavigate();

    //console.log(Cookies.get('csrftoken'));
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");


    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    }

    useEffect(() => {
        if(isAuthenticated){
            return navigate("/", { replace: true });
        }

      }, [isAuthenticated]);


    return (
        <Container fluid className="justify-content-center">
            <h1>Login Now</h1>
            <p>Login with an account that has session auth</p>
            <Row>
                <Col xs={3}></Col>
                <Col>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mt-3" controlId="validationCustom04">
                        <CSRFToken/>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="validationCustom01">
                        <Form.Label className="mt-3">Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required/>
                        <Form.Text className="text-muted">
                        Enter your login.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicPassword">
                        <Form.Label className="mt-3">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required minLength={6} />
                        <Form.Text className="text-muted">
                        Enter your password.
                        </Form.Text>
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">Login</Button>
                </Form>
                </Col>
                <Col xs={3}></Col>
            </Row>
            <p className="mt-3">
                Don't have an Account? <Link to="/register">Sign Up</Link>
            </p>
        </Container>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, { login } )(Login);