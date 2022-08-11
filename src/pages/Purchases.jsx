import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);


    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    console.log(purchases);

    return (
        <div>
            <h1>Purchases: </h1>

            <div className='purchases-card'>
                    {purchases.map(purchase => (
                        <div key={purchase.id} className="border">
                            <ListGroup variant="flush">
                                <ListGroup.Item> <b>Id:</b> {purchase.id}</ListGroup.Item>
                                <ListGroup.Item> <b>Date:</b> {purchase.createdAt}.</ListGroup.Item>
                            </ListGroup>
                            <Card  className="m-5">
                                {purchase.cart?.products.map(purch => (
                                    
                                        <ListGroup variant="flush" key={purch.id}>
                                            <Card.Header> <b>Name:</b> {purch.title}</Card.Header>
                                            <ListGroup.Item> <b>Brand:</b> {purch.brand}</ListGroup.Item>
                                            <ListGroup.Item> <b>Price:</b> ${purch.price}.</ListGroup.Item>
                                        </ListGroup>
                                    
                                ))
                                }
                            </Card>
                        </div>

                    ))
                    }
            </div>

        </div>
    );
};

export default Purchases;