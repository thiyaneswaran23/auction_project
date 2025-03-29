import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getBids();
        setOrders(response.data || []); // Ensure we always have an array
      } catch (error) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="info">Please sign in to view your orders.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">You haven't placed any bids yet.</Alert>
      </Container>
    );
  }

  return (
    <div className="orders-page">
      <Container className="py-5">
        <h2 className="text-center mb-4">My Bids</h2>
        <Row>
          {orders.map(order => (
            <Col key={order._id} lg={4} md={6} className="mb-4">
              <Card className="h-100 order-card">
                <Card.Img 
                  variant="top" 
                  src={order.itemId.imageUrl} 
                  className="order-image"
                />
                <Card.Body>
                  <Card.Title>{order.itemId.name}</Card.Title>
                  <div className="mb-3">
                    <Badge bg={order.amount === order.itemId.currentPrice ? 'success' : 'warning'}>
                      {order.amount === order.itemId.currentPrice ? 'Highest Bid' : 'Outbid'}
                    </Badge>
                  </div>
                  <div className="bid-details">
                    <p>Your Bid: ${order.amount}</p>
                    <p>Current Price: ${order.itemId.currentPrice}</p>
                    <p>Status: {order.itemId.status}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Orders; 