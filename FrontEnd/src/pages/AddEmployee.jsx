import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
    email: "",
    phone: "",
    position: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

   
    if (!formData.name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }
    if (!formData.department.trim()) {
      setError("Department is required");
      setLoading(false);
      return;
    }
    if (!formData.salary || formData.salary <= 0) {
      setError("Salary must be greater than 0");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/employee/addemp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Employee added successfully!");
        setFormData({
          name: "",
          department: "",
          salary: "",
          email: "",
          phone: "",
          position: ""
        });
        
       
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.text();
        setError(`Failed to add employee: ${errorData || "Unknown error"}`);
      }
    } catch (err) {
      setError(`Error adding employee: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      department: "",
      salary: "",
      email: "",
      phone: "",
      position: ""
    });
    setError("");
    setSuccess("");
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <h2 className="mb-0 fw-bold">Add New Employee</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              {success && <Alert variant="success" className="mb-4">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Full Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter employee's full name"
                        required
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Department <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="e.g., Engineering, HR, Marketing"
                        required
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Position
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Developer, Manager"
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Salary <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="Enter salary amount"
                        min="0"
                        step="0.01"
                        required
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="employee@company.com"
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+11 123 4567 890"
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 justify-content-center mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="px-5"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding Employee...
                      </>
                    ) : (
                      "Add Employee"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    size="lg"
                    onClick={handleReset}
                    disabled={loading}
                    className="px-5"
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="button"
                    variant="outline-info"
                    size="lg"
                    onClick={() => navigate("/")}
                    disabled={loading}
                    className="px-5"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center text-muted bg-light">
              <small>
                Fields marked with <span className="text-danger">*</span> are required
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEmployee;