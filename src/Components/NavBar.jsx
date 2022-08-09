import React from 'react';
import { Navbar, Container,  Nav } from "react-bootstrap";

const NavBar = () => {
    return (
        <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">e-Commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#/products/:id">Products</Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            <Nav.Link href="/#/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />


    </>
    );
};

export default NavBar;