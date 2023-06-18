import { Row, Col, Slider, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(8000000);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setMinValue(e[0]);
        setMaxValue(e[1]);
    };

    const removePriceFilter = () => {
        setMinValue(1);
        setMaxValue(8000000);
    };

    useEffect(() => {
        dispatch(setMinPrice(minValue));
    }, [minValue, dispatch]);

    useEffect(() => {
        dispatch(setMaxPrice(maxValue));
    }, [maxValue, dispatch]);

    return (
        <Col>
            <h4>Filtro de Productos por Precio</h4>
            <Slider
                range
                marks={ marks }
                max={ 8000000 }
                value={ [minValue, maxValue] }
                onChange={ handleChange }
            />
            <p>Rango seleccionado: $ { minValue } - $ { maxValue }</p>
            <Row>
                <Button type='primary' danger onClick={ removePriceFilter }>
                    Remover filtro de precio
                </Button>
            </Row>
        </Col>
    );
};

export default ProductsSliderFilter;