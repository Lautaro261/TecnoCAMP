import { Row, Col, Space, Button, Checkbox } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../Redux/Features/brands/clientBrandsSlice';
import { setIdBrand } from '../../../Redux/Features/products/clientProductsSlice';

const ProductsByBrandFilter = () => {
    const [checkedValues, setCheckedValues] = useState([]);

    const dispatch = useDispatch();
    const allBrands = useSelector(state => state.clientBrands.allBrands);

    const plainOptions = allBrands.map(brand => brand.name);

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(setIdBrand(''));
    }, []);

    const onChange = (checkedValues) => {
        setCheckedValues(checkedValues);
        if (checkedValues.length === 0) {
            dispatch(setIdBrand(''));
        } else {
            const brandsIds = checkedValues.map(name => {
                const brand = allBrands.find(brand => brand.name === name);
                return brand ? brand.id : null
            });
            dispatch(setIdBrand(brandsIds));
        }
    };

    const resetFilter = () => {
        setCheckedValues([]);
        dispatch(setIdBrand(''));
    };

    return (
        <Row justify="center">
            <Col>
                <Row justify="center">
                    <Col span={ 6 }>
                        <Checkbox.Group options={ plainOptions } value={ checkedValues } onChange={ onChange }  />
                    </Col>
                </Row>
                <Row justify="center">
                    <Button type='primary' danger onClick={ resetFilter }>
                        Remover filtro de marcas
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductsByBrandFilter;
