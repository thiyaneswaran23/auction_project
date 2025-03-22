import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Support = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    setMessage('');
  };

  return (
    <div className="page-container">
      <Container className="py-5">
        <Card className="support-card">
          <Card.Header className="bg-transparent border-0">
            <h4 className="mb-0">Customer Support</h4>
          </Card.Header>
          <Card.Body className="chat-body">
            <div className="chat-messages">
              <div className="message support">
                <p>Hello! How can we help you today?</p>
                <small>Support Team • Just now</small>
              </div>
            </div>
            <Form onSubmit={handleSubmit} className="chat-input">
              <Form.Group className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  <FaPaperPlane />
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Support; 