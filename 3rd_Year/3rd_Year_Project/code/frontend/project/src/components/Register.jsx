import React, { useState, useEffect } from "react";
import { registers } from "../actions/auth";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, ButtonGroup, ToggleButton} from 'react-bootstrap';
import CSRFToken from './CSRFToken';
import { useNavigate } from "react-router-dom";


const Register = ({ registers, isAuthenticated }) => {

    //console.log(Cookies.get('csrftoken'));
    const [ accountCreated, setAccountCreated] = useState(false);

    const navigate = useNavigate();

    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [ repassword, setRepassword] = useState("");
    const [ user_type, setUser_type] = useState("user");

    const radios = [
        { name: 'Vet', value: 'vet' },
        { name: 'User', value: 'user' },
        { name: 'Org', value: 'org' },
      ];


    const onSubmit = e => {
        e.preventDefault();

        if(password === repassword){       
            registers(username, password, repassword, user_type);
            setAccountCreated(true);
        }

    }

    useEffect(() => {
        if(isAuthenticated){
            return navigate("/", { replace: true });
        }
        else if(accountCreated){
            return navigate('/login', { replace: true });
        }

      }, [isAuthenticated, accountCreated]);


    

    return (
        <Container fluid className="justify-content-center">
            <h1>Register now</h1>
            <p>Create an account with session auth</p>
            <Row>
                <Col xs={3}></Col>
                <Col>
                    <ButtonGroup className="d-flex">
                        {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={'outline-success'}
                            name="radio"
                            value={radio.value}
                            checked={user_type === radio.value}
                            onChange={(e) => setUser_type(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col xs={3}></Col>
            </Row>
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
                        Be creative.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formBasicPassword">
                        <Form.Label className="mt-3">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required minLength={6} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicPassword2">
                        <Form.Label className="mt-3">Re-Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-Password" onChange={e => setRepassword(e.target.value)} required minLength={6} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="validationCustom05">
                        <Form.Control type='hidden' name='user_type'></Form.Control>
                    </Form.Group>
                
                    <Button className="mt-3" variant="primary" type="submit">Register</Button>
                </Form>
                </Col>
                <Col xs={3}></Col>
            </Row>
            <p className="mt-3">
                Already have an Account? <Link to="/login">Sign In</Link>
            </p>
        </Container>
    
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { registers })(Register);