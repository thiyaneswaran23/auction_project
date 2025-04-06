import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import api from '../../services/api';
import { motion } from 'framer-motion';
import './Bidding.css';

const Bidding = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidAmounts, setBidAmounts] = useState({});
  const [bidErrors, setBidErrors] = useState({});

  useEffect(() => {
    const socket = io('http://localhost:5000');

    const fetchItems = async () => {
      try {
        const response = await api.getItems();
        setItems(response.items || []);
        const initialBidAmounts = {};
        response.items.forEach(item => {
          initialBidAmounts[item._id] = item.currentPrice + 1;
        });
        setBidAmounts(initialBidAmounts);
      } catch (error) {
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    socket.on('bidUpdate', (data) => {
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === data.itemId
            ? {
                ...item,
                currentPrice: data.currentPrice,
                highestBidder: data.highestBidder
              }
            : item
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleBidChange = (itemId, value) => {
    setBidAmounts(prev => ({
      ...prev,
      [itemId]: value
    }));
    setBidErrors(prev => ({
      ...prev,
      [itemId]: ''
    }));
  };

  const handleBid = async (itemId) => {
    try {
      const amount = Number(bidAmounts[itemId]);
      const item = items.find(i => i._id === itemId);

      if (!amount || amount <= item.currentPrice) {
        setBidErrors(prev => ({
          ...prev,
          [itemId]: `Bid must be higher than $${item.currentPrice}`
        }));
        return;
      }

      await api.placeBid(itemId, amount);
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === itemId
            ? { ...item, currentPrice: amount, highestBidder: user._id }
            : item
        )
      );
      setBidErrors(prev => ({
        ...prev,
        [itemId]: ''
      }));
    } catch (error) {
      setBidErrors(prev => ({
        ...prev,
        [itemId]: error.response?.data?.message || 'Failed to place bid'
      }));
    }
  };

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

  return (
    <div className="bidding-page" style={{ background: 'linear-gradient(to right, #2c3e50, #4ca1af)', minHeight: '100vh', color: 'white' }}>
      <Container className="py-5">
        <motion.h2 className="text-center mb-5 fw-bold" style={{ color: '#fff', fontSize: '2.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Live Auctions
        </motion.h2>
        <Row>
          {items.map(item => (
            <Col key={item._id} lg={4} md={6} className="mb-4">
              <motion.div whileHover={{ scale: 1.03 }}>
                <Card className="shadow-lg border-0 rounded-4" style={{ background: '#1c1c1e', color: '#fff' }}>
                  <Card.Img variant="top" src={item.imageUrl} style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', maxHeight: '250px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="text-center fs-4 fw-semibold">{item.name}</Card.Title>
                    <Card.Text className="text-center text-muted" style={{ color: '#ccc !important' }}>{item.description}</Card.Text>
                    <div className="text-center my-3">
                      <p className="mb-1">Current Bid: <strong>${item.currentPrice}</strong></p>
                      {item.highestBidder === user?._id && (
                        <p className="text-success">You are the highest bidder!</p>
                      )}
                    </div>
                    {user ? (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="number"
                            className="rounded-pill text-center"
                            style={{ backgroundColor: '#2f2f2f', border: 'none', color: '#fff' }}
                            value={bidAmounts[item._id] || ''}
                            onChange={(e) => handleBidChange(item._id, e.target.value)}
                            min={item.currentPrice + 1}
                            step="1"
                            placeholder="Enter your bid"
                          />
                        </Form.Group>
                        {bidErrors[item._id] && (
                          <Alert variant="danger">{bidErrors[item._id]}</Alert>
                        )}
                        <Button variant="warning" onClick={() => handleBid(item._id)} className="w-100 rounded-pill fw-bold">
                          Place Bid
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline-light" href="/signin" className="w-100 rounded-pill">
                        Sign in to bid
                      </Button>
                    )}
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

export default Bidding;