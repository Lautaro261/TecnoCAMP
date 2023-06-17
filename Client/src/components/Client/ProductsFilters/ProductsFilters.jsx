import { Row, Col, Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllCategories } from '../../../Redux/Features/categories/clientCategoriesSlice';
import {
    setIdCategory,
    getFilteredProducts
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductsByBrandFilter from "../ProductsByBrandFilter/ProductsByBrandFilter";
import ProductsSliderFilter from "../ProductsSliderFilter/ProductsSliderFilter";
import ProductsDisplay from '../ProductsDisplay/ProductsDisplay';

const ProductsFilters = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const searchedCategory = pathname.split('/').pop();
    const dispatch = useDispatch();

    const allCategories = useSelector(state => state.clientCategories.allCategories);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const idBrand = useSelector(state => state.clientProducts.idBrand);
    const minPrice = useSelector(state => state.clientProducts.minPrice);
    const maxPrice = useSelector(state => state.clientProducts.maxPrice);
    const filteredProducts = useSelector(state => state.clientProducts.filteredProducts);

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

    const filter = () => {
        const data = {
            idCategory,
            idBrand,
            minPrice,
            maxPrice
        };
        dispatch(getFilteredProducts(data));
    }

    return (
        <Row>
            <Col span={ 6 }>
                <ProductsSliderFilter />
                <ProductsByBrandFilter />
                <Button type='primary' onClick={ filter } style={{ margin: '20px' }}>
                    Filtrar
                </Button>
            </Col>
            <Row><ProductsDisplay /></Row>
        </Row>
    );
};

export default ProductsFilters;