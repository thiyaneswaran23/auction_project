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
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800'
  },
  {
    id: 2,
    name: 'Rare Art Collection',
    currentBid: 3299,
    minBid: 50,
    timeLeft: '4h 30m',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?w=800'
  },
  {
    id: 3,
    name: 'Classic Car 1965',
    currentBid: 15999,
    minBid: 50,
    timeLeft: '1d 5h',
    category: 'Vintage Cars',
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800'
  },
  {
    id: 4,
    name: 'Diamond Necklace',
    currentBid: 4599,
    minBid: 50,
    timeLeft: '6h 15m',
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <section
        className="hero-section text-center text-white d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '90vh'
        }}
      >
        <Container>
          <h1 className="display-3 fw-bold mb-4">AuctionHub</h1>
          <p className="lead mb-4">
            Your premier destination for online auctions. Discover unique items and participate in exciting bidding experiences.
          </p>
          <Link to="/bidding">
            <Button variant="warning" size="lg" className="px-4 py-2 fw-bold shadow">
              Start Bidding
            </Button>
          </Link>
        </Container>
      </section>

      <section className="featured-items py-5 bg-dark text-white">
        <Container>
          <h2 className="text-center mb-5 text-warning fw-bold">Featured Auctions</h2>
          <Row>
            {featuredItems.map(item => (
              <Col key={item.id} lg={3} md={6} className="mb-4">
                <Card className="h-100 shadow-lg border-0">
                  <div className="position-relative">
                    <Card.Img variant="top" src={item.image} className="rounded-top" />
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                      {item.category}
                    </span>
                  </div>
                  <Card.Body className="bg-light text-dark">
                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                    <div className="mb-3">
                      <p className="mb-1"><strong>Current Bid:</strong> ${item.currentBid}</p>
                      <p className="mb-1"><strong>Min Bid:</strong> ${item.minBid}</p>
                      <p className="mb-1"><FaClock className="me-1 text-muted" /> {item.timeLeft}</p>
                    </div>
                    <Link to="/bidding">
                      <Button variant="dark" className="w-100">
                        Bid Now <FaGavel className="ms-2" />
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="features-section py-5 bg-warning text-dark">
        <Container>
          <h2 className="text-center fw-bold mb-5">Why Choose AuctionHub?</h2>
          <Row>
            <Col md={3} className="text-center mb-4">
              <FaGavel size={40} className="mb-3" />
              <h4>Live Bidding</h4>
              <p>Real-time auction updates</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaShieldAlt size={40} className="mb-3" />
              <h4>Secure Payments</h4>
              <p>Safe and protected transactions</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaClock size={40} className="mb-3" />
              <h4>24/7 Support</h4>
              <p>Always here to help you</p>
            </Col>
            <Col md={3} className="text-center mb-4">
              <FaTrophy size={40} className="mb-3" />
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