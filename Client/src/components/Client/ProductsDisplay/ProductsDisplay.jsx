import { Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProducts,
    setFilteredProducts
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductCard from '../ProductCard/ProductCard';

const ProductsDisplay = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.clientProducts.allProducts);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const filteredProducts = useSelector(state => state.clientProducts.filteredProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        if (allProducts.length > 0 && idCategory) {
            const filteredProductsByCategoryId = allProducts.filter(product => product.categoryId === idCategory);
            dispatch(setFilteredProducts(filteredProductsByCategoryId));
        }
    }, [allProducts, idCategory]);

    return (
        <Row justify='center' gutter={ [16, 16] }>
            { Array.isArray(filteredProducts) && filteredProducts.length > 0 ?
                filteredProducts.map(product => (
                    <ProductCard
                        key={ product.id }
                        id={ product.id }
                        e_product_type={ product.e_product_type }
                        photo={ product.photo && product.photo[0] }
                        name={ product.name }
                        price={ product.price }
                    />
                )) :
                <Row>No hay productos para mostrar</Row>
            }
        </Row>
    );
};

export default ProductsDisplay;