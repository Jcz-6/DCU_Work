import {Link, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const { useState, useEffect } = require("react");


export default function ModuleCohort(){
    const [modules, setModules] = useState([])

    let params = useParams()
    useEffect(()=>{
        if(modules.length === 0){ // you have to check if the default value has been changed (i.e. the fecth request already happened) to avoid infinite loops
            // if degrees is an empty array , only then we want to make the fetch request
            fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${params.id}`)
                .then(resp=>resp.json())
                .then(data=>{
                    // save the json array into degrees
                    // setDegrees will automatically re-render the entire component
                    setModules(data) 
                })
        }
        
    })
    /*
    const displayDelivered = (delivered) =>{
        return delivered.map((delivery) =>
        <div key={delivery}>
            <br />
                {delivery}
                <br />
                {displayButtons(delivery)}
        </div>
        )
    }*/

    const displayButtons = (delivery) => {
        let dn = delivery.split("/")
        //fetchCohort(dn[5])
        return (
        <div>
            <Link to={`/cohort/fetch/${dn[5]}`} params={{id:dn[5]}}>
                    <button>View {dn[5]}</button>
            </Link>
        </div>
        )
    }

    // function to return a degree list using map 
    // to pass data across Links you must use state - see here https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4
    const displayModules = () =>{
        console.log(modules)
        return modules.map((module)=>
        <div key={module.code}>
            <br />
            {module.full_name} - {module.ca_split} - {module.code}
            <br />
                <hr />
                <Link to={`/module/${module.code}`} state={{module:module}}>
                <Button lg="3" size="lg" variant="secondary">View {module.code} </Button>
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
                    <Container fluid="sm">
                        {displayModules()}
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
// style={{backgroundImage: `url(${background})` }} important