import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases);

    useEffect(() =>{
        dispatch(getPurchasesThunk());
    }, [])

    console.log(purchases)
    
    return (
        <div>
        <h1>Purchases</h1>
        <p>No pude acceder a los productos alojados en purchases</p>
        <ul>
        {
            purchases.map(purchase =>(
                <li key={purchase.id}>
                   
                </li>
            ))
        }
        </ul>
        </div>
    );
};

export default Purchases;