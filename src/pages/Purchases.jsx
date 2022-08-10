import React, { useEffect, useState } from 'react';
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
        <section>
            <h1>Purchases</h1>
            <div>
                {purchases.map(purchase => (
                    <div key={purchase.id}>
                        <p><strong>Id:</strong> {purchase.id}</p>
                        <p><strong>Date:</strong> {purchase.createdAt}</p>
                        <div>
                            {purchase.cart?.products.map(purch => (
                                    <section key={purch.id}>
                                        <p><strong>Brand : </strong></p>
                                         <p>{purch.brand}.</p>
                                        <p><strong>Title : </strong></p>
                                         <p>{purch.title}.</p>
                                        <p><strong>Price : </strong></p>
                                         <p>${purch.price}.</p>
                                    </section>
                                ))
                            }
                        </div>
                    </div>

                ))
                }
            </div>
        </section>
    );
};

export default Purchases;