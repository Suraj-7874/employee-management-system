import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Spinner, Alert, Table, Button } from "react-bootstrap";
import UpdateEmp from "./UpdateEmp";
import DeleteEmployee from "./DeleteEmployee";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const SearchEmp = () => {
  const query = useQuery();
  const name = query.get("q") || "";

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (!name.trim()) {
      setResults([]);
      setError("Please enter a name to search");
      return;
    }
    setLoading(true);
    setResults([]);
    setError("");

    fetch(`/api/employee/${encodeURIComponent(name)}`, { redirect: "follow" })
      .then(async (res) => {
        const raw = await res.text();
        if (res.ok || res.status === 302) {
          try {
            return raw ? JSON.parse(raw) : null;
          } catch (e) {
            throw new Error(`Invalid JSON response: ${raw}`);
          }
        }
        throw new Error(`HTTP ${res.status}: ${raw || "Employee not found"}`);
      })
      .then((data) => {
        const normalized = Array.isArray(data) ? data : data ? [data] : [];
        if (normalized.length === 0) {
          setError("Employee not found");
        }
        setResults(normalized);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [name]);

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = (employeeId, updatedData) => {
    setResults(results.map(emp => 
      emp.id === employeeId 
        ? { ...emp, ...updatedData }
        : emp
    ));
    setError("");
  };

  const handleDeleteSuccess = (employeeId) => {
    setResults(results.filter(emp => emp.id !== employeeId));
    setError("");
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center fw-bold text-primary">Searched Employees Result</h2>

      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((emp, index) => (
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
};

export default SearchEmp;