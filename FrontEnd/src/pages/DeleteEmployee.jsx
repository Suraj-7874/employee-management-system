import { Modal, Button } from "react-bootstrap";

const DeleteEmployee = ({ 
  show, 
  onHide, 
  employee, 
  onDelete, 
  onError 
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/employee/${employee.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onDelete(employee.id);
        onHide();
      } else {
        onError("Failed to delete employee");
      }
    } catch (err) {
      onError("Error deleting employee: " + err.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete employee "{employee?.name}"? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Employee
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployee;