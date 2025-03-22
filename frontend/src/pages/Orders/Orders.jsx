import { Container, Alert } from 'react-bootstrap';

const Orders = () => {
  return (
    <div className="page-container">
      <Container className="py-5">
        <Alert variant="info" className="text-center">
          <Alert.Heading>No Orders Found</Alert.Heading>
          <p className="mb-0">
            You haven't placed any orders yet. Start bidding to see your orders here!
          </p>
        </Alert>
      </Container>
    </div>
  );
};

export default Orders; 