import { Row, Col, Slider, Button } from 'antd';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMinPrice,
    setMaxPrice,
} from '../../../Redux/Features/products/clientProductsSlice';

const marks = {
  1: 'min',
  4000000: '$ 4.000.000',
  8000000: 'max'
};

const ProductsSliderFilter = () => {
    const dispatch = useDispatch();
    const minPrice = useSelector(state => state.clientProducts.minPrice);
    const maxPrice = useSelector(state => state.clientProducts.maxPrice);

    const handleChange = (e) => {
        dispatch(setMinPrice(e[0]));
        dispatch(setMaxPrice(e[1]));
    };

    const removePriceFilter = () => {
        dispatch(setMinPrice(1));
        dispatch(setMaxPrice(8000000));
    };

    return (
        <Row justify="center">
            <Col>
                <h4>Filtro de Productos por Precio</h4>
                <Slider
                    range
                    marks={ marks }
                    max={ 8000000 }
                    value={ [minPrice, maxPrice] }
                    tooltip={{ open: true }}
                    onChange={ handleChange }
                />
                <Row justify="center">
                    <Button type='primary' danger onClick={ removePriceFilter }>
                        Remover filtro de precio
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductsSliderFilter;
