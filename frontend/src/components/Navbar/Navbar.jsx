import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaGavel, FaHeadset, FaShoppingBag } from 'react-icons/fa';

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/">AuctionHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/bidding" className="d-flex align-items-center">
              <FaGavel className="me-2" /> Bidding
            </Nav.Link>
            <Nav.Link as={Link} to="/my-orders" className="d-flex align-items-center">
              <FaShoppingBag className="me-2" /> My Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/support" className="d-flex align-items-center">
              <FaHeadset className="me-2" /> Support
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="btn btn-primary ms-2">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 