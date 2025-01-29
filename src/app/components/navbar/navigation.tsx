import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import NavLink from 'react-bootstrap/NavLink'


const Navigation: React.FC = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavbarBrand href="#">Naeole <span style={{ color: "rgb(237, 190, 119)" }}>&</span> Mario</NavbarBrand>
        <NavbarToggle aria-controls="navbarScroll" />
        <NavbarCollapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink href="/">Home</NavLink>
            <NavLink href="#action2">Link</NavLink>
            <NavLink href="#" disabled>
              Link
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
