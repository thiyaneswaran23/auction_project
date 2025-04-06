import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { motion } from 'framer-motion';
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
        setOrders(response.data || []);
      } catch (error) {
        setError('Failed to load your bids.');
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
        <Alert variant="info" className="text-center">
          Please sign in to view your bids.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
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

  if (!orders.length) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">You haven't placed any bids yet.</Alert>
      </Container>
    );
  }

  return (
    <div className="orders-page">
      <Container className="py-5">
        <motion.h2
          className="text-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          My Bids
        </motion.h2>
        <Row>
          {orders.map((order) => (
            <Col key={order._id} lg={4} md={6} className="mb-4">
              <motion.div whileHover={{ scale: 1.03 }} className="h-100">
                <Card className="order-card shadow rounded-4">
                  <Card.Img
                    variant="top"
                    src={order.itemId.imageUrl}
                    className="order-image"
                    style={{ height: '220px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-center">{order.itemId.name}</Card.Title>

                    <div className="text-center my-2">
                      <Badge
                        bg={
                          order.amount === order.itemId.currentPrice
                            ? 'success'
                            : 'secondary'
                        }
                        className="px-3 py-2 rounded-pill"
                      >
                        {order.amount === order.itemId.currentPrice
                          ? 'Highest Bid'
                          : 'Outbid'}
                      </Badge>
                    </div>

                    <div className="bid-details text-center text-muted small mt-3">
                      <p className="mb-1">Your Bid: <strong>${order.amount}</strong></p>
                      <p className="mb-1">Current Price: <strong>${order.itemId.currentPrice}</strong></p>
                      <p className="mb-0">Status: <em>{order.itemId.status}</em></p>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
