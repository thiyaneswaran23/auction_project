import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import api from '../../services/api';
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
        
        // Initialize bid amounts
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

    // Listen for bid updates
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
    // Clear any previous error for this item
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
      
      // Update local state
      setItems(prevItems =>
        prevItems.map(item =>
          item._id === itemId
            ? { ...item, currentPrice: amount, highestBidder: user._id }
            : item
        )
      );

      // Clear bid error
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

  return (
    <div className="bidding-page">
      <Container className="py-5">
        <h2 className="text-center mb-4">Active Auctions</h2>
        <Row>
          {items.map(item => (
            <Col key={item._id} lg={4} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={item.imageUrl} 
                  className="item-image"
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <div className="bid-info">
                    <p>Current Bid: ${item.currentPrice}</p>
                    {item.highestBidder === user?._id && (
                      <p className="text-success">You are the highest bidder!</p>
                    )}
                  </div>
                  {user ? (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="number"
                          value={bidAmounts[item._id] || ''}
                          onChange={(e) => handleBidChange(item._id, e.target.value)}
                          min={item.currentPrice + 1}
                          step="1"
                        />
                      </Form.Group>
                      {bidErrors[item._id] && (
                        <Alert variant="danger" className="mb-3">
                          {bidErrors[item._id]}
                        </Alert>
                      )}
                      <Button
                        variant="primary"
                        onClick={() => handleBid(item._id)}
                        className="w-100"
                      >
                        Place Bid
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-primary"
                      href="/signin"
                      className="w-100"
                    >
                      Sign in to bid
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Bidding; 