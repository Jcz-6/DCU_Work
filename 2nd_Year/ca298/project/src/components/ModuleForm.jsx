import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


  
    export default function ModuleForm() {
        
        const [isChecked, setIsChecked] = useState(false);
        const [code, setCode] = useState("");
        const [full_name, setFullName] = useState("");
        const [ca_split, setCaSplit] = useState(0);
        const [delivered_to, setDeliveredTo] = useState([]);
        const [cohorts, setCohorts] = useState([]);

        useEffect(()=>{
            if(cohorts.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
                // if degrees is an empty array , only then we want to make the fetch request
                fetch("http://127.0.0.1:8000/api/cohort/")
                    .then(resp=>resp.json())
                    .then(data=>{
                        // save the json array into degrees
                        // setDegrees will automatically re-render the entire component
                        setCohorts(data) 
                    })
            }
        })

        
        function handelReset(e) {
          e.preventDefault()
          setCode("")
          setCaSplit(0)
          setFullName("")
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

          fetch("http://127.0.0.1:8000/api/module/",{
            method:"POST",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'code': code,
                'full_name': full_name,
                'delivered_to': delivered_to,
                'ca_split': ca_split,
            })

          })
          // Or you can work with it as a plain object:
          //const formJson = Object.fromEntries(formData.entries());
          //console.log(formJson);
        }

        const handleCheck = (event, id) => {
            if (event.target.checked) {
                setDeliveredTo(delivered_to.concat(`http://127.0.0.1:8000/api/cohort/${id}/`))
                //console.log('✅ Checkbox is checked');
            } else {
                setDeliveredTo(delivered_to.filter(item => item !== `http://127.0.0.1:8000/api/cohort/${id}/`))
                //console.log('⛔️ Checkbox is NOT checked');
            }
            setIsChecked(current => !current);
            //console.log(isChecked);
            //updateDeliveredTo();
        }
        
        const displayCheckboxes = () => {
            return cohorts.map((cohort) =>
            <div key={cohort.id}>
                <br />
                <Form.Group className="mb-3">
                <Form.Label>
                    {cohort.id} <Form.Check type="checkbox" value={isChecked} onChange={e => handleCheck(e, cohort.id)} id="checked" name="checked"/>  
                </Form.Label>
                </Form.Group>
            </div>
            )
        }

        /*const updateDeliveredTo = () => {
            //console.log(isChecked)
            if (isChecked) {
                setDeliveredTo(delivered_to.concat("dn"))
                console.log(delivered_to)
            }
            else
                setDeliveredTo(delivered_to.filter(item => item !== "dn"))
                console.log(delivered_to)
        }
        <label htmlFor="isChecked">
              Test: <input type="checkbox" value={isChecked} onChange={e => handleCheck(e)} id="checked" name="checked"/>  
            </label>
            <p>{delivered_to}</p>
        */
      
        return (
          <div>
          <Container fluid>
          <Row>
              <Col  style={{ background: 'linear-gradient(to right, grey, black' }}>
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
                                      CODE: <Form.Control value={code} onChange={e => setCode(e.target.value)}/>
                                    </Form.Label>
                                  <Form.Group/>
                                  <Form.Group/>
                                    <Form.Label>
                                      CA-Split: <Form.Control value={ca_split} onChange={e => setCaSplit(e.target.value)}/>
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>
                                      Full Name: <Form.Control value={full_name} onChange={e => setFullName(e.target.value)}/>
                                    </Form.Label>
                                  </Form.Group>
                                  <h3>Pick Cohorts</h3>
                                  {displayCheckboxes()}
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
                                  <Link to={"/modules"}>
                                  <Button lg="3" size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>Modules</Button>
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
