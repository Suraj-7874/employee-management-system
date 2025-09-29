import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3 fw-bold text-danger">404</h1>
      <h2 className="fw-semibold">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary">
        Go Back Home
      </Button>
    </Container>
  );
}
