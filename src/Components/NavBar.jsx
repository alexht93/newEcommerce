import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token){
      setShow(true);
    } else {
      navigate("/login")
    }
  }


  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login")
  };

 

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="/">Changarro Tech</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            {token ? (
              <Nav.Link as={Button} onClick={logout}>Log Out</Nav.Link>
            ) : (
              <Nav.Link href="/#/login">Login</Nav.Link>
            )}
            <Nav.Link as={Button} onClick={handleShow} style={{background:"black", border:"black"}} ><i className="fa-solid fa-cart-shopping" ></i></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     <Cart show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;