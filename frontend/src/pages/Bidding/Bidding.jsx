import { Container, Alert } from 'react-bootstrap';

const Bidding = () => {
  return (
    <div className="page-container">
      <Container className="py-5">
        <Alert variant="info" className="text-center">
          <Alert.Heading>No Active Auctions</Alert.Heading>
          <p className="mb-0">
            There are no bidding items available at the moment. Please check back later!
          </p>
        </Alert>
      </Container>
    </div>
  );
};

export default Bidding; 