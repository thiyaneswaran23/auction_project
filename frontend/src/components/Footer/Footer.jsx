import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-title">AuctionHub</h5>
            <p className="footer-text">
              Your premier destination for online auctions. Discover unique items and 
              participate in exciting bidding experiences.
            </p>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-title">Contact Us</h5>
            <ul className="footer-links">
              <li>Email: support@auctionhub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Auction Street</li>
              <li>New York, NY 10001</li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="footer-title">Follow Us</h5>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebookF /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <hr className="footer-divider" />
          <div className="text-center py-3">
            <p className="mb-0">
              © {currentYear} AuctionHub. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 