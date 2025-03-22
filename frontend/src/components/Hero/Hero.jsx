import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaGavel, FaClock, FaArrowUp } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      id: 1,
      name: "Vintage Rolex Watch",
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500",
      currentBid: 2599,
      timeLeft: "2h 45m",
      category: "Luxury Watches"
    },
    {
      id: 2,
      name: "Rare Art Collection",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500",
      currentBid: 3299,
      timeLeft: "4h 30m",
      category: "Fine Art"
    },
    {
      id: 3,
      name: "Classic Car 1965",
      image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?w=500",
      currentBid: 15999,
      timeLeft: "1d 5h",
      category: "Vintage Cars"
    },
    {
      id: 4,
      name: "Diamond Necklace",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
      currentBid: 4599,
      timeLeft: "6h 15m",
      category: "Jewelry"
    }
  ];

  return (
    <>
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="hero-content">
              <div className="hero-content-wrapper">
                <h1 className="hero-text-gradient">
                  Discover & Bid on Exclusive Auctions
                </h1>
                <p className="hero-subtitle">
                  Join our premier auction platform where extraordinary items meet passionate bidders.
                  Experience real-time bidding on unique collectibles, art, and luxury items.
                </p>
                <div className="d-flex hero-buttons">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => navigate('/signup')}
                    className="hero-btn hero-btn-primary"
                  >
                    Start Bidding Now
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    className="hero-btn hero-btn-outline"
                  >
                    Explore Auctions
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={5} className="text-center d-none d-md-block">
              <div className="hero-image-wrapper">
                <img 
                  src="https://th.bing.com/th/id/OIP.CFgRDJYc8TD5M6kzTsV_ZQHaFl?rs=1&pid=ImgDetMain"
                  alt="Auction Platform" 
                  className="hero-image"
                />
                <div className="hero-image-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="featured-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">
            Featured Auctions
          </h2>
          
          <Row>
            {featuredItems.map((item) => (
              <Col key={item.id} lg={3} md={6} className="mb-4">
                <Card className="auction-card">
                  <div className="auction-card-image-wrapper">
                    <Card.Img variant="top" src={item.image} className="auction-card-image" />
                    <div className="auction-card-overlay">
                      <Button variant="light" className="bid-now-btn">
                        Bid Now <FaGavel className="ms-2" />
                      </Button>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="auction-card-title">{item.name}</Card.Title>
                    <div className="auction-card-details">
                      <div className="current-bid">
                        <span className="label">Current Bid</span>
                        <span className="value">${item.currentBid.toLocaleString()}</span>
                        <small className="trend">
                          <FaArrowUp className="me-1" />$50
                        </small>
                      </div>
                      <div className="time-left">
                        <span className="label">Time Left</span>
                        <span className="value">
                          <FaClock className="me-2" />{item.timeLeft}
                        </span>
                      </div>
                    </div>
                    <div className="category-badge">{item.category}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Hero; 