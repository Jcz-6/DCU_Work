import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const { useState, useEffect } = require("react");


export default function ModuleList(){
    const [modules, setModules] = useState([])
    const [cohorts, setCohorts] = useState([])
    const [delivered, setDelivered] = useState([])
    const [cohort, setCohort] = useState([])

    useEffect(()=>{
        if(modules.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            // if degrees is an empty array , only then we want to make the fetch request
            fetch("http://127.0.0.1:8000/api/module/")
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    setModules(data)
                })
        }
    })

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
    const displayModules = () =>{
        return modules.map((module)=>
        <div key={module.code}>
            <br />
            {module.full_name} - {module.ca_split} - {module.code}
            <br />
                    {displayDelivered(module.delivered_to)}
                <hr />
                <Link to={`/module/${module.code}`} state={{module:module}}>
                    <Button lg="3" variant="secondary">{module.code}</Button>
                </Link>
                <hr />
        </div>
        )
    }

    const displayDelivered = (delivered) =>{
        return delivered.map((delivery) =>
        <div key={delivery}>
            <br />
                {delivery}
                <br />
                {displayButtons(delivery)}
        </div>
        )
    }

    /*                {displayButtons(delivery)}
    const fetchCohort = (id) => {
        if(cohorts.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            // if degrees is an empty array , only then we want to make the fetch request
            fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    cohorts.forEach(element => {
                        if (!cohorts.includes(data)) {
                            setCohorts(cohorts.concat(data))
                        }
                    });
                    
                })
        }
    }]
                    <Link to={`/cohort/${dn[5]}`} state={{cohort:cohorts}}>
                    <button>View {dn[5]}</button>
                </Link>
    */

    const displayButtons = (delivery) => {
        let dn = delivery.split("/")
        //fetchCohort(dn[5])
        return (
        <div>
            <Link to={`/module/cohort/${dn[5]}`} params={{id:dn[5]}}>
            <Button lg="3" variant="secondary">View {dn[5]}</Button>
            </Link>
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
                            <Link to={"/newModule"}>
                                <Button size="lg" variant="dark" style={{ width: "600px", height: "50px",}}>New Module</Button>
                            </Link>
                        </Col>
                    </Row>
                    <br />
                </Container>
                <Container fluid="sm">
                {displayModules()}
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
// style={{backgroundImage: `url(${background})` }} important