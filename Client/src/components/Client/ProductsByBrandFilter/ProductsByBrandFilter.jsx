import { Row, Col, Space, Button, Checkbox } from "antd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../Redux/Features/brands/clientBrandsSlice';
import {
    setIdBrand,
    setCheckedBrands
} from '../../../Redux/Features/products/clientProductsSlice';

const ProductsByBrandFilter = () => {
    const dispatch = useDispatch();
    const checkedBrands = useSelector(state => state.clientProducts.checkedBrands);
    const allBrands = useSelector(state => state.clientBrands.allBrands);

    const plainOptions = allBrands.map(brand => brand.name);

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(setIdBrand(''));
        dispatch(setCheckedBrands([]));
    }, []);

    const onChange = (checkedValues) => {
        dispatch(setCheckedBrands(checkedValues));
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
        dispatch(setIdBrand(''));
        dispatch(setCheckedBrands([]));
    };

    return (
        <Row justify="center">
            <Col>
                <Row justify="center">
                    <Col span={ 6 }>
                        <Checkbox.Group options={ plainOptions } value={ checkedBrands } onChange={ onChange }  />
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
