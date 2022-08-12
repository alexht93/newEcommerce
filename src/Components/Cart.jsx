import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { buyCartThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    const getTotal = (products) => {
        let total = 0
        cart.forEach(cart => {
            total += Number(cart.price)
        });
        return total
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title> <h1>Shopping Cart</h1> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='cursor'>
                <div >
                    {cart.map(cart => (
                        <Card
                            key={cart.id}
                            style={{ width: '18rem', backgroundColor: "black", color: "white" }}
                            className="mb-2 mt-3"
                            onClick={() => navigate(`/products/${cart.productsInCart.productId}`)}
                        >
                            <Card.Header style={{borderBottom:"white 1px solid"}}>Brand: {cart.brand}</Card.Header>
                            <Card.Body>
                                <Card.Title>Name: {cart.title}</Card.Title>
                                <Card.Text>
                                   Price: ${cart.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))

                    }
                </div>
                <div>
                    <strong>Total: </strong> 
                    <p><b>${getTotal(cart.price)}.00</b></p>
                </div>
                <Button onClick={() => dispatch(buyCartThunk())} className="mt-2">
                    CHECKOUT
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;