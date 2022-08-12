import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';



const ProductDetail = () => {

    const allProducts = useSelector(state => state.products);
    const [productDetail, setProductDetail] = useState({});
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);


    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    useEffect(() => {
        const products = allProducts.find(productItem => productItem.id === Number(id))
        // console.log(products);
        setProductDetail(products);

        const filteredProducts = allProducts.filter(productItem =>
            productItem.category.id === products.category.id)
        setSuggestedProducts(filteredProducts);
        console.log(suggestedProducts)
    }, [allProducts, id])

    const addCart = () => {
        alert("adding to cart")
        const cart = {
            id: productDetail.id,
            quantity: quantity
            
        }
        dispatch(addCartThunk(cart));
        console.log(cart)
    }

 



    return (
        <div >
            <h1 style={{ textAlign: "center" }}>Product Details</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div >
                    <InputGroup className="mb-3" style={{width:"150px"}}>
                        <Form.Control
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={addCart}
                        >
                            Add to Cart
                        </Button>
                    </InputGroup>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Card style={{ width: '40%' }}>
                    <Carousel variant='dark'>
                        {
                            productDetail?.productImgs?.map(img => (
                                <Carousel.Item key={img}  >
                                    <img
                                        src={img}
                                        alt="First slide"
                                        style={{ objectFit: "contain", height: "500px", width: "500px", display: "block", margin: "auto" }}
                                    />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                    <Card.Body>
                        <Card.Title>{productDetail?.title}</Card.Title>
                        <Card.Text> <b>Description:</b> <br />
                            {productDetail?.description}
                        </Card.Text>
                        <Card.Title>Price:${productDetail?.price}</Card.Title>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </div>

            <h2>
                Similar Products:
            </h2>

            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {
                    suggestedProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            <Card className='mb-5 cursor'>
                                <Card.Img variant="top" src={product.productImgs} style={{ objectFit: "contain", height: "200px" }} />
                                <Card.Body>
                                    <Card.Title>{product?.title}</Card.Title>
                                    <Card.Text> <b>Price:</b> ${product?.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductDetail;



{/* <Carousel>
{
    productDetail?.productImgs?.map(img => (
        <Carousel.Item key={img} style={{objectFit: "contain", height:"500px"}}>
            <img
                
                src={img}
                alt="First slide"
            />
        </Carousel.Item>
    ))
}

</Carousel> */}