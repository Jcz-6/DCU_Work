
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import {useLocation, Link } from "react-router-dom";

export default function Student(){
    const location = useLocation();
    const student = location.state.student;
    const [grades, setGrades] = useState([]); // cohorsts wish default value
    const [modules, setModules] = useState([]);
    

    useEffect(()=>{
        if(grades.length===0){
            // if cohorts hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/grade/?student=${student.student_id}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setGrades(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        if(modules.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            let id = student.cohort.split("/");
            fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id[5]}`)
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    setModules(data) 
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })/*
                <p key={cohort.id}>
                {cohort.year} - {cohort.name} - {cohort.degree} 
                <Link to={`/cohorts`}>
                    <br></br>
                    <button>View Cohorts</button>
                </Link> 
            </p>
        const displayDelivered = (delivered) =>{
        return delivered.map((delivery) =>
            <li key={delivery}>
                {delivery}
            </li>
        )
    }
        return grades.map((grade)=>
        <div key={grade.module}>
        {displayModule(grade.module)}
        <br />
        CA Mark{grade.ca_mark} - Exam Mark{grade.exam_mark} - Total Mark{grade.code}
        </div>
        )

    

    */
    const displayModules = () =>{
        return modules.map((module)=>
        <div key={module.code}>
            <br />
            {module.full_name} - CA Split {module.ca_split} - {module.code}
            {displayGrades(module.code)}
                <hr />
            <ButtonGroup>
                <Link to={`/setGrade`} state={{module:module, student:student}}>
                   <Button lg="3" size="lg" variant="dark">Set {module.code} Grade</Button>
                </Link>            
                <Link to={`/module/${module.code}`} state={{module:module}}>
                    <Button lg="3" size="lg" variant="dark">View {module.code}</Button>
                </Link>
            </ButtonGroup>
                <hr />

        </div>
        
        )
    }

    const displayGrades = (code) =>{
        //console.log(code)
        let module_1;
        let ca_mark;
        let exam_mark;
        let total_grade;
        grades.forEach(grade => {
            let module = grade.module.split("/")
            //console.log(code)
            if (module[5] === code) {
                //console.log(grade.module);
                ca_mark = grade.ca_mark;
                exam_mark = grade.exam_mark;
                total_grade = grade.total_grade;
            }
        })
        return(
            <div key={module_1}>
            CA Mark: {ca_mark} - Exam Mark: {exam_mark} - Total Mark: {total_grade}
            </div>
        )
    }


    const displayStudent = () =>{
        //console.log(grades)
        //console.log(modules)
        //console.log(student) {displayGrades()}<DisplayModules/>
        
        return(
        <div key={student.student_id}>
            <h2>Student Details</h2>
            ID: {student.student_id}
            <br />
            {student.first_name} - {student.last_name} - {student.email}
            <br />
            {student.cohort}
            <br />
            <br />
            <h2>Modules {student.first_name} is registered for</h2>
            {displayModules()} 
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
                <Container fluid="sm">
                    {displayStudent()}
                </Container>


                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        <Col md lg="8">
                            <Link to={"/students"}>
                                <Button size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>Students</Button>
                            </Link>
                        </Col>
                    </Row>
                    <hr />
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