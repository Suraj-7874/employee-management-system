import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const UpdateEmp = ({ 
  show, 
  onHide, 
  employee, 
  onUpdate, 
  onError 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: ""
  });

 
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        department: employee.department || "",
        salary: employee.salary || ""
      });
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/employee/${employee.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onUpdate(employee.id, formData);
        onHide();
        setFormData({ name: "", department: "", salary: "" });
      } else {
        onError("Failed to update employee");
      }
    } catch (err) {
      onError("Error updating employee: " + err.message);
    }
  };

  const handleClose = () => {
    onHide();
    setFormData({ name: "", department: "", salary: "" });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Employee
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateEmp;
