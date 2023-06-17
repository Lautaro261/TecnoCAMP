import styles from './ProductsByBrandFilter.module.css';
import { Col, Button, Checkbox } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../Redux/Features/brands/clientBrandsSlice';
import { setIdBrand } from '../../../Redux/Features/products/clientProductsSlice';

const ProductsByBrandFilter = () => {
    const [checkedValues, setCheckedValues] = useState([]);

    const dispatch = useDispatch();
    const allBrands = useSelector(state => state.clientBrands.allBrands);
    const allBrandsIds = allBrands.map(brand => brand.id);

    const plainOptions = allBrands.map(brand => brand.name);

    useEffect(() => {
        dispatch(getAllBrands());
    }, []);

    const onChange = (checkedValues) => {
        setCheckedValues(checkedValues);
        const brandsIds = checkedValues.map(name => {
            const brand = allBrands.find(brand => brand.name === name);
            return brand ? brand.id : null
        });
        if (brandsIds.length === 0) {
            dispatch(setIdBrand(''));
        } else {
            dispatch(setIdBrand(brandsIds));
        }
    };

    const resetFilter = () => {
        setCheckedValues([]);
        dispatch(setIdBrand(allBrandsIds));
    };

    return (
        <Col className={ styles.productsByBrandFilter__container}>
            <Checkbox.Group options={ plainOptions } value={ checkedValues } onChange={ onChange }  />
            <Button type='primary' danger onClick={ resetFilter }>Remover filtro de marcas</Button>
        </Col>
    );
};

export default ProductsByBrandFilter;
