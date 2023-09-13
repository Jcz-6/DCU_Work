import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const { useState, useEffect } = require("react");


export default function Students(){
    const [students, setStudents] = useState([])

    useEffect(()=>{
        if(students.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            // if degrees is an empty array , only then we want to make the fetch request
            fetch(`http://127.0.0.1:8000/api/student/?cohort=COMBUS1`)
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    setStudents(data) 
                })
        }
    })

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
    const displayStudents = () =>{
        //console.log(modules)
        return students.map((student)=>
        <div key={student.student_id}>
            <br />
                <h4>{student.first_name} - {student.last_name}</h4>
                <hr />
                <Link to={`/student/${student.student_id}`} state={{student:student}}>
                    <Button lg="3" size="lg" variant="secondary">View Student {student.student_id} Details</Button>
                </Link>
                <hr />
        </div>
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
                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        <Col md lg="8">
                            <Link to={"/newStudent"}>
                                <Button size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>Add a Student</Button>
                            </Link>
                        </Col>
                    </Row>
                    <br />
                </Container>
                <Container fluid="sm">
                <h1>COMBUS1 Students</h1>
                {displayStudents()}
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