import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { filterCategoryThunk, filterNameThunk, getProductsThunk } from "../store/slices/products.slice"
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, InputGroup, Form, Button, ListGroup } from "react-bootstrap"
import { useNavigate } from 'react-router';
import { addCartThunk } from '../store/slices/cart.slice';

const Home = () => {

    const products = useSelector(state => state.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(" ");
    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, []);

    const addCart = (id) =>{
        alert("adding to cart")
       const cart = {
        id: id, 
        quantity: 1
       }
       dispatch(addCartThunk(cart));
       console.log(cart)
    }

    console.log(categories);

    return (
        <div className='App'>
            <Row style={{width: "99%"}}>
                <h1>Home</h1>
                <Col lg={3}>
                    <ListGroup className="m-3">
                       <ListGroup.Item> <h4>Categories</h4> </ListGroup.Item>
                        {
                            categories.map(category => (
                                <ListGroup.Item className='cursor'
                                    key={category.id}
                                    onClick = {() => dispatch(filterCategoryThunk(category.id))}
                                    >
                                    {category.name}
                                    
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3 mt-3">
                        <Form.Control
                            placeholder="type here what you are looking for"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => dispatch(filterNameThunk(searchValue))}>
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={4} className="g-4 cursor" >
                        {
                            products.map(product => (
                                <Col key={product.id} >
                                    <Card style={{height:"350px"}}>
                                        <Card.Img variant="top" src={product.productImgs} style={{ objectFit: "contain", height: "200px" }} onClick={() => navigate(`/products/${product.id}`)}/>
                                        <Card.Body >
                                            <Card.Title>{product.title}</Card.Title>
                                            <p><b>${product.price}</b></p>
                                        </Card.Body>
                                        <button onClick={() => addCart(product.id) }> <i className="fa-solid fa-cart-plus"></i></button>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;