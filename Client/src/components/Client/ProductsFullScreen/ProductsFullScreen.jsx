import { Row, Col, Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllCategories } from '../../../Redux/Features/categories/clientCategoriesSlice';
import {
    setIdCategory,
    getFilteredProducts
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductsSliderFilter from "../ProductsSliderFilter/ProductsSliderFilter";
import ProductsByBrandFilter from "../ProductsByBrandFilter/ProductsByBrandFilter";
import ProductsSorting from "../ProductsSorting/ProductsSorting";
import ProductsDisplay from '../ProductsDisplay/ProductsDisplay';

const ProductsFullScreen = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const searchedCategory = pathname.split('/').pop();
    const dispatch = useDispatch();

    const allCategories = useSelector(state => state.clientCategories.allCategories);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const idBrand = useSelector(state => state.clientProducts.idBrand);
    const minPrice = useSelector(state => state.clientProducts.minPrice);
    const maxPrice = useSelector(state => state.clientProducts.maxPrice);

    const currentCategory = allCategories.find(category => category.name === searchedCategory);
    const currentCategoryId = currentCategory ? currentCategory.id : null;

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    useEffect(() => {
        if (currentCategoryId) {
            dispatch(setIdCategory(currentCategoryId));
        }
    }, [currentCategoryId, dispatch]);

    const filterCards = () => {
        const data = {
            idCategory,
            idBrand,
            minPrice,
            maxPrice
        };
        dispatch(getFilteredProducts(data));
    }
    return (
        <Row gutter={ 32 }>
            <Col><ProductsSliderFilter /></Col>
            <Col>
                <Button type='primary' onClick={ filterCards }>
                    Filtrar
                </Button>
            </Col>
            <Col><ProductsByBrandFilter /></Col>
            <Col><ProductsSorting /></Col>
            <Col><ProductsDisplay /></Col>
        </Row>
    );
};

export default ProductsFullScreen;