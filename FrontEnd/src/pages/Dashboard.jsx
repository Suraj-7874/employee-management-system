import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import UpdateEmp from "./UpdateEmp";
import DeleteEmployee from "./DeleteEmployee";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch("/api/employee") 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = (employeeId, updatedData) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, ...updatedData }
        : emp
    ));
    setError("");
  };

  const handleDeleteSuccess = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    setError("");
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center fw-bold text-primary">Employee Dashboard</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive className="shadow-md">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdateClick(emp)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(emp)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

     
      <UpdateEmp
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        employee={selectedEmployee}
        onUpdate={handleUpdateSuccess}
        onError={handleError}
      />

    
      <DeleteEmployee
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        employee={selectedEmployee}
        onDelete={handleDeleteSuccess}
        onError={handleError}
      />
    </Container>
  );
}
