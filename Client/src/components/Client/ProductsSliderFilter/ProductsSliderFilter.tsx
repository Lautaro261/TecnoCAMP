import styles from './ProductsSlider.module.css';
import React, { useState } from 'react';
import { Row, Col, Slider, Button } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { CloseCircleFilled } from '@ant-design/icons';

const marks: SliderMarks = {
  0: 'min',
  2000: '$ 2000',
  4000: '$ 4000',
  6000: '$ 6000',
  8000: 'max'
};

const ProductsSliderFilter: React.FC = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(8000);

    const handleChange = (e) => {
        setMinValue(e[0]);
        setMaxValue(e[1]);
    };

    const applyPriceFilter = () => {
        console.log(`${ minValue } and ${ maxValue} `);
    };

    const removePriceFilter = () => {
        setMinValue(0);
        setMaxValue(8000);
        console.log(`${ minValue } and ${ maxValue} `);
    };

    return (
        <Col span={ 6 }>
            <h4>Filtro de Productos por Precio</h4>
            <Slider
                range
                marks={ marks }
                max={ 8000 }
                value={ [minValue, maxValue] }
                onChange={ handleChange }
            />
            <p>Valores escogidos: { minValue } y { maxValue }</p>
            <Row>
                <Button type='primary' onClick={ applyPriceFilter }>
                    Filtrar
                </Button>
                <Button type='primary' danger onClick={ removePriceFilter }>
                    Quitar Filtro
                </Button>
            </Row>
        </Col>
    );
};

export default ProductsSliderFilter;
