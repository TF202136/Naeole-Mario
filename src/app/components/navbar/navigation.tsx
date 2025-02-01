"use client"; // Certifique-se de que este é um Client Component

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { usePathname } from "next/navigation"; // Use o usePathname do Next.js
import "../../../styles/nav.css"; // Importe o arquivo de estilos

const Navigation: React.FC = () => {
  const pathname = usePathname(); // Hook para obter o caminho atual
  const [activeLink, setActiveLink] = useState<string>("/"); // Estado para o link ativo

  // Atualiza o link ativo apenas no cliente
  useEffect(() => {
    if (pathname) {
      setActiveLink(pathname);
    }
  }, [pathname]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant="light">
      <Container fluid>
        <Navbar.Brand href="/">
          Naeole <span style={{ color: "rgb(237, 190, 119)" }}>&</span> Mario
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0" // Alinhar à direita
            navbarScroll
          >
            <Nav.Link
              href="/"
              className={activeLink === "/" ? "is-active" : ""}
            >
              Início
            </Nav.Link>
            <Nav.Link
              href="/galeria"
              className={activeLink === "/galeria" ? "is-active" : ""}
            >
              Galeria de fotos
            </Nav.Link>
            <Nav.Link
              href="/formulario"
              className={activeLink === "/formulario" ? "is-active" : ""}
            >
              Confirme a sua presença
            </Nav.Link>
            <Nav.Link
              href="/info"
              className={activeLink === "/info" ? "is-active" : ""}
            >
              Informações do casamento
            </Nav.Link>
          </Nav>
          <Nav className="ms-3">
            <Button href="/admin/login" variant="outline-primary" id="btn-1">
              Admin
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;