import React, { useEffect } from 'react';
import { load_user } from "../actions/profile";
import { connect } from "react-redux";
import "../Home.css";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';

const Home = ({ load_user }) => {
  useEffect(() => {
    load_user();
  }, []);

  return (
            <Container fluid className="home-bg">
            <Row>
                <Col>
                  <Row>
                  <h1 className="mt-5">Our mission</h1>
                  <h3>For our users we wish to provide a system where they can book vet appointments
                    with ease, look for nearby vets based on how far away they are to save you from
                    searching yourself
                  </h3>
                  </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>

  );
};

export default connect(null, { load_user })(Home);

/*     <div className="home-bg">
      <h1 class="home-h1"> Saving Animals</h1>
      <h5 class="h5">Welcome to Saving animals, here we provide you with the 
        assistance of booking vet appointments
      </h5>
      <div class="footer">Contact Info: Josh Casey</div>
    </div> */