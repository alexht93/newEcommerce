import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login")
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">e-Commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            {token ? (
              <Nav.Link as={Button} onClick={logout}>Log Out</Nav.Link>
            ) : (
              <Nav.Link href="/#/login">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;