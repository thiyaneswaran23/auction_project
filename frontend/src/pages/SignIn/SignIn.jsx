import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <Container>
        <Card className="auth-card mx-auto">
          <h2 className="auth-title text-center">Welcome Back</h2>
          <Form>
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
                  placeholder="Enter your password"
                  size="lg"
                />
                <div 
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" size="lg">
              Sign In
            </Button>
            
            <p className="text-center mb-0 auth-link-text">
              Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn; 