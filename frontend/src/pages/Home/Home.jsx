import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClock, FaGavel, FaShieldAlt, FaTrophy } from 'react-icons/fa';
import './Home.css';

const featuredItems = [
  {
    id: 1,
    name: 'Vintage Rolex Watch',
    currentBid: 2599,
    minBid: 50,
    timeLeft: '2h 45m',
    category: 'Luxury Watches',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e'
  },
  {
    id: 2,
    name: 'Rare Art Collection',
    currentBid: 3299,
    minBid: 50,
    timeLeft: '4h 30m',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1578500351865-d6c3706f46bc'
  },
  {
    id: 3,
    name: 'Classic Car 1965',
    currentBid: 15999,
    minBid: 50,
    timeLeft: '1d 5h',
    category: 'Vintage Cars',
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128'
  },
  {
    id: 4,
    name: 'Diamond Necklace',
    currentBid: 4599,
    minBid: 50,
    timeLeft: '6h 15m',
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section text-center py-5">
        <Container>
          <h1>AuctionHub</h1>
          <p className="lead">
            Your premier destination for online auctions. Discover unique items and participate in exciting bidding experiences.
          </p>
          <Link to="/bidding">
            <Button variant="primary" size="lg">Start Bidding</Button>
          </Link>
        </Container>
      </section>

      <section className="featured-items py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Auctions</h2>
          <Row>
            {featuredItems.map(item => (
              <Col key={item.id} lg={3} md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <div className="bid-info">
                      <p>Current Bid: ${item.currentBid}</p>
                      <p>Min Bid: ${item.minBid}</p>
                      <p>Time Left: {item.timeLeft}</p>
                      <small>{item.category}</small>
                    </div>
                    <Link to="/bidding">
                      <Button variant="outline-primary" className="w-100">
                        Bid Now
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="features-section py-5 bg-light">
        <Container>
          <Row>
            <Col md={3} className="text-center mb-4">
              <FaGavel className="feature-icon" />
              <h4>Live Bidding</h4>
              <p>Real-time auction updates</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaShieldAlt className="feature-icon" />
              <h4>Secure Payments</h4>
              <p>Safe and protected transactions</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaClock className="feature-icon" />
              <h4>24/7 Support</h4>
              <p>Always here to help you</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaTrophy className="feature-icon" />
              <h4>Expert Verification</h4>
              <p>Authenticated items</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home; 