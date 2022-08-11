import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
import { getCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='cursor'>
               <ul >
               {cart.map(cart => (
                    <li key={cart.id}
                    onClick={() => navigate(`/products/${cart.productsInCart.productId}`)}>
                        <b>Brand: </b>
                        <h6>{cart.brand}</h6>
                        <b>Name: </b>
                        <h6>{cart.title}</h6>
                        <b>Price: </b>
                        <h6>${cart.price}</h6>
                    </li>
                ))

                }
               </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;