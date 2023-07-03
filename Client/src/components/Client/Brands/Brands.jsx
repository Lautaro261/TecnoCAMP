import { Row, Col } from "antd";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../Redux/Features/brands/clientBrandsSlice';
import {
    setCheckedBrands, 
    getFilteredProducts,
    setCurrentPage,
    setSelectedValueToFilter,
    setIdBrand
} from '../../../Redux/Features/products/clientProductsSlice';

const Brands = ({ brands }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const endpoint = pathname.split('/').pop();
    const allBrands = useSelector(state => state.clientBrands.allBrands);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const minPrice = useSelector(state => state.clientProducts.minPrice);
    const maxPrice = useSelector(state => state.clientProducts.maxPrice);
    const finalIdCategory = endpoint === 'all-categories' ? '' : idCategory;

    useEffect(() => {
        dispatch(getAllBrands());
    }, []);

    const filterCards = (brand) => {
        const brandObject = allBrands.find(brandItem => brandItem.name === brand);
        const idBrand = brandObject.id;
        dispatch(setCheckedBrands([brand]));
        dispatch(setIdBrand([idBrand]));
        const data = {
            idCategory: finalIdCategory,
            idBrand,
            minPrice,
            maxPrice
        };
        dispatch(getFilteredProducts(data));
        dispatch(setCurrentPage(1));
        dispatch(setSelectedValueToFilter(null));
    }

    return (
        <Row justify='space-evenly' align='middle' gutter={ 96 } style={{ marginBlockStart: '10px' }}>
            { brands.map((brand) => (
                <button 
                    key={ brand } 
                    onClick={ () => filterCards(brand) } 
                    style={{ all: 'unset', cursor: 'pointer' }} 
                >
                    <Col span={ 4 }>
                        <Row align='middle'>
                        <img
                            src={ `/img/Smartphones/${ brand }.png` }
                            alt={ brand }
                            style={{ inlineSize: '80px' }}
                        />
                        </Row>
                    </Col>
                </button>
            )) }
        </Row>
    );
};

export default Brands;