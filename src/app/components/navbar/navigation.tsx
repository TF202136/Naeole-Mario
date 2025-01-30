import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavLink from "react-bootstrap/NavLink";
import "../../../styles/nav.css"

const Navigation: React.FC = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavbarBrand href="/">
          Naeole <span style={{ color: "rgb(237, 190, 119)" }}>&</span> Mario
        </NavbarBrand>
        <NavbarToggle aria-controls="navbarScroll" />
        <NavbarCollapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink href="/">Início</NavLink>
            <NavLink href="/galeria">Galeria de fotos</NavLink>
            <NavLink href="/formulario">Confirme a sua presença </NavLink>
            <NavLink href="/info">Informações do casamento</NavLink>
          </Nav>
          <Nav className="d-flex">
            <Button href="admin" variant="outline-primary" id="btn-1" >Admin</Button>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
