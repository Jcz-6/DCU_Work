
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer(){
    return(
<Container fluid>
        <Row>
            <Col style={{ background: 'linear-gradient(to right, grey, black' }}>
            </Col>
            <Col xs={9}>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                        <h2>Made by Jakub 2023</h2>
                        </Col>
                        <Col></Col>
                        <br />
                        <hr />
                    </Row>
                </Container>
            </Col>
            <Col style={{ background: 'linear-gradient(to left, grey, black' }}>
            </Col>
        </Row>
        </Container>
        
    )
}