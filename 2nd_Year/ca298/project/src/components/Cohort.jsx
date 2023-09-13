
import { useEffect, useState } from "react";
import {useLocation, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Cohort(){
    const location = useLocation();
    const cohort = location.state.cohort;
    const [students, setStudents] = useState([]); // cohorsts wish default value

    useEffect(()=>{
        if(students.length===0){
            // if cohorts hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setStudents(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
    
    const displayStudents = () =>{
        //console.log(students.length/3)
        return students.map((s)=>
            <li key={s.student_id}> 
               {s.student_id} - {s.first_name} - {s.last_name}
            </li>
        )
    }


    return (
        <div>
            <Container fluid>
        <Row>
            <Col style={{ background: 'linear-gradient(to right, grey, black' }}>
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
                       <h1>{cohort.year} - {cohort.name}</h1>
                        <h3>{cohort.degree}</h3>
                        <hr />
                        <Row className="justify-content-md-center">
                            <Col>
                            </Col>
                            <Col lg="">
                                <h3>Students</h3>
                                {displayStudents()}
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
        
                    <Container fluid="md">
                        <Row className="justify-content-md-center">
                            <Col md lg="8">
                                <Link to={"/cohorts"}>
                                <Button lg="3" size="lg" variant="secondary" style={{ width: "600px", height: "50px",}}>Cohorts </Button>
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
    )
}