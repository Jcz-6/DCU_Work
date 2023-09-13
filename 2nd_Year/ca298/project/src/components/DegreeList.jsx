import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const { useState, useEffect } = require("react");


export default function DegreeList(){
    const [degrees, setDegrees] = useState([])

    useEffect(()=>{
        if(degrees.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            // if degrees is an empty array , only then we want to make the fetch request
            fetch("http://127.0.0.1:8000/api/degree/")
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    setDegrees(data) 
                })
        }
    })

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
    const displayDegrees = () =>{
        return degrees.map((degree)=>
        <Row className="justify-content-md-center">
            <Col sm lg="3" key={degree.shortcode}>
                {degree.full_name} - {degree.shortcode}
            </Col>
            <Col sm lg="2" key={degree.shortcode}>
                <Link to={`/deegres/degree/${degree.shortcode}`} state={{degree:degree}}>
                    <Button size="sm" variant="secondary">View {degree.shortcode}</Button>
                </Link> 
                <hr/>
            </Col>
        </Row>
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
                    {displayDegrees()}
                    <hr />
                </Container>


                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        <Col md lg="8">
                            <Link to={"/newDegree"}>
                                <Button size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>New Degree</Button>
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