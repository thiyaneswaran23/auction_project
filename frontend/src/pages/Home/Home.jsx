import Hero from '../../components/Hero/Hero';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      <Container className="py-5">
        <h2 className="text-center mb-4">Featured Auctions</h2>
        <Row>
          {[1, 2, 3].map((item) => (
            <Col key={item} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/300x200`} />
                <Card.Body>
                  <Card.Title>Auction Item {item}</Card.Title>
                  <Card.Text>
                    Current Bid: $199
                    <br />
                    Time Left: 2d 5h
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home; 