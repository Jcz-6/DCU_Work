
import {useLocation, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Module(){
    const location = useLocation();
    const module = location.state.module;
    //const [students, setStudents] = useState([]); // cohorsts wish default value

    /*useEffect(()=>{
        if(students.length===0){
            // if cohorts hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/student/?cohort=${module.code}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setStudents(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
                <p key={cohort.id}>
                {cohort.year} - {cohort.name} - {cohort.degree} 
                <Link to={`/cohorts`}>
                    <br></br>
                    <button>View Cohorts</button>
                </Link> 
            </p>
    */

    const displayDelivered = (delivered) =>{
        return delivered.map((delivery) =>
            <li key={delivery}>
                {delivery}
            </li>
        )
    }


    const displayModule = () =>{
        
        return(
        <div>
            {module.full_name} - {module.ca_split} - {module.code}
            <br />
            Delivered to:
            {displayDelivered(module.delivered_to)}
        </div>
        )
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
                    <Container fluid="sm">
                        {displayModule()}
                        <hr />
                    </Container>
    
    
                    <Container fluid="md">
                        <Row className="justify-content-md-center">
                            <Col md lg="8">
                                <Link to={"/modules"}>
                                <Button lg="3" size="lg" variant="secondary" style={{ width: "600px", height: "50px",}}>Modules </Button>
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