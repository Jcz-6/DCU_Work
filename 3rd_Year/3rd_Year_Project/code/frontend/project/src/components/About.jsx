import '../About.css'; // import the image
import Container from 'react-bootstrap/Container'
import {Row, Col} from 'react-bootstrap';

function About() {
    return (
        <Container fluid className="bg">
            <h1 class="h1">About us</h1>
            <p></p>
            <Row>
                <Col xs={2}></Col>
                <Col>
                <p>Our main goal is to provide you all with an easy to use system that allows you
                to seek and get the help you need for your pets. We also provide the option
                for you to provide support for other stray or abused animals. Upon creating a 
                report our vets and organisation will handle the situation as best they can.</p>
                </Col>
                <Col xs={2}></Col>
            </Row>
        </Container>

    );
}

export default About;
