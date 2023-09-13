
import { useEffect, useState } from "react";
import {useLocation, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Degree(){
    const location = useLocation();
    const degree = location.state.degree;
    const [cohorts, setCohorts] = useState([]); // cohorsts wish default value

    useEffect(()=>{
        if(cohorts.length===0){
            // if cohorts hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degree.shortcode}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setCohorts(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
    
    const displayCohorts = () =>{
        return cohorts.map((c)=>
            <p key={c.id}> {c.name} </p>
        )
    }

    return (
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
                    <Container fluid="sm">
                        <h1>{degree.full_name} - {degree.shortcode}</h1>
                        <h3>Cohorts</h3>
                        {displayCohorts()}
                        <hr />
                    </Container>
    
    
                    <Container fluid="md">
                        <Row className="justify-content-md-center">
                            <Col md lg="8">
                                <Link to={"/degrees"}>
                                <Button lg="3" size="lg" variant="secondary" style={{ width: "600px", height: "50px",}}>Degrees </Button>
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
        
    )
}