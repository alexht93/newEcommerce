import React from 'react';
import "../styles/loadingScreen.css";
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {

    return (
        <div className='overlay'>
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
            <Spinner animation="grow" size="sm" />
        </div>
    );
};

export default LoadingScreen;