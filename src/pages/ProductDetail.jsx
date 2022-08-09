import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const allProducts = useSelector(state => state.products);
    const [productDetail, setProductDetail] = useState({});
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    useEffect(() => {
        const products = allProducts.find(productItem => productItem.id === Number(id))
        console.log(products);
        setProductDetail(products);

        const filteredProducts = allProducts.filter(productItem =>
            productItem.category.id === products.category.id)
        setSuggestedProducts(filteredProducts);
    }, [allProducts, id])



    return (
        <div>
            <h1>{productDetail?.title}</h1>
            <img src={productDetail?.productImgs} alt="" />
            <p>{productDetail?.description}</p>

            <ul>
                {
                    suggestedProducts.map(product => (
                        <li
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            {product?.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductDetail;