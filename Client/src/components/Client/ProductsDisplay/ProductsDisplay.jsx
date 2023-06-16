import styles from './ProductsDisplay.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setFilteredProductsToEmpty,
    getAllProducts
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductCard from '../ProductCard/ProductCard';

const ProductsDisplay = () => {
    const [allProductsByCategoryId, setAllProductsByCategoryId] = useState([]);

    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.clientProducts.allProducts);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const filteredProducts = useSelector(state => state.clientProducts.filteredProducts);
    let productsToBeDisplayed = [];

    useEffect(() => {
        dispatch(setFilteredProductsToEmpty([]));
    }, []);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        if (allProducts && idCategory) {
            const filteredProductsByCategoryId = allProducts.filter(product => product.categoryId === idCategory);
            setAllProductsByCategoryId(filteredProductsByCategoryId);
        }
    }, [allProducts, idCategory]);

    if (filteredProducts.length > 0) {
        productsToBeDisplayed = filteredProducts;
    } else {
        productsToBeDisplayed = allProductsByCategoryId;
    }

    return (
        <div className={ styles.productsDisplay__container }>
            { productsToBeDisplayed.map(product => (
                <ProductCard
                    key={ product.id }
                    id={ product.id }
                    e_product_type={ product.e_product_type }
                    photo={ product.photo && product.photo[0] }
                    name={ product.name }
                    price={ product.price }
                />
            )) }
        </div>
    );
};

export default ProductsDisplay;