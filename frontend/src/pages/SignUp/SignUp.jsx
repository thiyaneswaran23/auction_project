import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <Container>
        <Card className="auth-card mx-auto">
          <h2 className="auth-title text-center">Create Account</h2>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter first name"
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter last name"
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email"
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <div className="password-input-wrapper">
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  size="lg"
                />
                <div 
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" size="lg">
              Create Account
            </Button>
            
            <p className="text-center mb-0 auth-link-text">
              Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp; 