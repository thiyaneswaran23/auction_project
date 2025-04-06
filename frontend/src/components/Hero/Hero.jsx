import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaGavel, FaClock, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      id: 1,
      name: "Vintage Rolex Watch",
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800",
      currentBid: 2599,
      timeLeft: "2h 45m",
      category: "Luxury Watches"
    },
    {
      id: 2,
      name: "Rare Art Collection",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
      currentBid: 3299,
      timeLeft: "4h 30m",
      category: "Fine Art"
    },
    {
      id: 3,
      name: "Classic Car 1965",
      image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?w=800",
      currentBid: 15999,
      timeLeft: "1d 5h",
      category: "Vintage Cars"
    },
    {
      id: 4,
      name: "Diamond Necklace",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      currentBid: 4599,
      timeLeft: "6h 15m",
      category: "Jewelry"
    }
  ];

  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1602526212354-9e73c2871688?w=1600') no-repeat center center`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          color: 'white',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2' }}>
                  Discover & Bid on <span style={{ color: '#ffc107' }}>Exclusive Auctions</span>
                </h1>
                <p className="mt-3" style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
                  Join our premier auction platform where extraordinary items meet passionate bidders. 
                  Experience real-time bidding on unique collectibles, art, and luxury items.
                </p>
                <div className="d-flex gap-3 mt-4">
                  <Button variant="warning" size="lg" onClick={() => navigate('/signup')}>
                    Start Bidding Now
                  </Button>
                  <Button variant="outline-light" size="lg">
                    Explore Auctions
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col md={5} className="text-center d-none d-md-block">
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                src="https://th.bing.com/th/id/OIP.CFgRDJYc8TD5M6kzTsV_ZQHaFl?rs=1&pid=ImgDetMain"
                alt="Auction Platform"
                style={{ maxHeight: '400px', borderRadius: '2rem', width: '100%', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <section style={{ background: '#f8f9fa', padding: '4rem 0' }}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            Featured Auctions
          </h2>

          <Row>
            {featuredItems.map((item) => (
              <Col key={item.id} lg={3} md={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '1rem' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                    <Card.Img src={item.image} alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                    <Button 
                      variant="dark" 
                      style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
                    >
                      Bid Now <FaGavel className="ms-2" />
                    </Button>
                  </div>
                  <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold' }}>{item.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <small className="text-muted">Current Bid</small>
                        <div className="fw-bold">${item.currentBid.toLocaleString()}</div>
                        <small className="text-success"><FaArrowUp className="me-1" /> $50</small>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Time Left</small>
                        <div><FaClock className="me-2" />{item.timeLeft}</div>
                      </div>
                    </div>
                    <div className="badge bg-warning text-dark">{item.category}</div>
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
