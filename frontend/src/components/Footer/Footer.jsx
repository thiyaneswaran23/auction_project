import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>AuctionHub</h5>
            <p>Your premier destination for online auctions. Discover unique items and participate in exciting bidding experiences.</p>
          </Col>
          <Col md={2}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@auctionhub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Auction Street</li>
              <li>New York, NY 10001</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 