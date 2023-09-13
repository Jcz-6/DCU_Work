import { useState } from 'react';
import {useLocation, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


  
    export default function CohortForm() {
        
        const [id, setId] = useState("");
        const [year, setYear] = useState(1);
        const [degree, setDegree] = useState("");

        function handelReset(e) {
          e.preventDefault()
          setYear(1)
          setId("")
          setDegree("")
        }

        function handleSubmit(e) {
          // Prevent the browser from reloading the page
          e.preventDefault();
            
          //console.log(full_name);
          //console.log(shortcode);

          // Read the form data
          //const form = e.target;
          //const formData = new FormData(form);
      
          // You can pass formData as a fetch body directly

          fetch("http://127.0.0.1:8000/api/cohort/",{
            method:"POST",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id,
                'year': year,
                'degree': "http://127.0.0.1:8000/api/degree/"+ degree + "/",
            })
          })
      
          // Or you can work with it as a plain object:
          //const formJson = Object.fromEntries(formData.entries());
          //console.log(formJson);
        }
      
        return (
          <div>
          <Container fluid>
          <Row>
              <Col className='vh-100' style={{ background: 'linear-gradient(to right, grey, black' }}>
              </Col>
              <Col xs={9}>
                  <div className='mx-auto'>
                      <Container fluid="lg">
                          <Row className="justify-content-md-center">
                              <Col md lg="2">
                              <ButtonGroup>   
                              <Link to={"/"}>
                                  <Button lg="3" size="lg" variant="secondary">Home Page </Button>
                              </Link>
                              </ButtonGroup> 
                              </Col>
                          </Row>
                          <hr />
                      </Container>
                      <Container fuild>
                        <Row className="justify-content-md-center">
                              <Col xs={9}>
                                <Form method="post" onSubmit={handleSubmit} onReset={handelReset}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>
                                      ID: <Form.Control value={id} onChange={e => setId(e.target.value)}/>
                                    </Form.Label>
                                  <Form.Group/>
                                  <Form.Group/>
                                    <Form.Label>
                                      Year: <Form.Control value={year} onChange={e => setYear(e.target.value)}/>
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>
                                      Deegre: <Form.Control value={degree} onChange={e => setDegree(e.target.value)}/>
                                    </Form.Label>
                                  </Form.Group>
                                  <Container fluid="lg">
                                    <hr />
                                    <Row className="justify-content-md-center">
                                        <Col></Col>
                                        <Col md xs={9}>
                                        <ButtonGroup>   
                                          <Button type="reset">Reset form</Button>
                                          <Button type="submit">Submit form</Button>
                                        </ButtonGroup> 
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                  </Container>
                                </Form>
                              </Col>
                          </Row>
                      </Container>
                      <hr />
                      <Container fluid="md">
                          <Row className="justify-content-md-center">
                              <Col md lg="8">
                                  <Link to={"/cohorts"}>
                                  <Button lg="3" size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>Cohorts </Button>
                                  </Link>
                              </Col>
                          </Row>
                          <br />
                      </Container>
                  </div>
              </Col>
              <Col style={{ background: 'linear-gradient(to left, grey, black' }}>
              </Col>
          </Row>
          </Container>
          </div>
        );
      }