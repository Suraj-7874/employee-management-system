import { useState } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Form,
  Button

} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchName.trim()) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchName)}`);
  };

  return (
    <>
      <BsNavbar
        expand="md"
        bg="light"
        variant="light"
        className="shadow-sm sticky-top w-100"
      >
        <Container>
          <BsNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
            Employee Management
          </BsNavbar.Brand>

          <BsNavbar.Toggle aria-controls="main-navbar" />

          <BsNavbar.Collapse id="main-navbar">
            <Nav className="ms-auto gap-2 align-items-center">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add-employee" className="fw-semibold">
                Add Employee
              </Nav.Link>

              
              <Form className="d-flex ms-3" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search by Name"
                  className="me-2"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <Button type="submit" variant="outline-primary">
                  <i className="bi bi-search"></i>
                </Button>
              </Form>
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

    </>
  );
}
