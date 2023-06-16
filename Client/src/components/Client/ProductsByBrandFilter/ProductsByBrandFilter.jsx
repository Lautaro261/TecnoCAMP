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

    const plainOptions = allBrands.map(brand => brand.name);

    useEffect(() => {
        dispatch(getAllBrands());
    }, []);

    // useEffect(() => {
    //     if (allBrands > 0) {
    //         const allBrandsIds = allBrands.map(brand => brand.id);
    //         dispatch(setIdBrand(allBrandsIds));
    //         console.log('brands ids', allBrandsIds);
    //     }
    // }, []);

    const onChange = (checkedValues) => {
        setCheckedValues(checkedValues);
        const brandsIds = checkedValues.map(name => {
            const brand = allBrands.find(brand => brand.name === name);
            return brand ? brand.id : null
        });
        dispatch(setIdBrand(brandsIds));
    };

    const resetFilter = () => {
        setCheckedValues([]);
    };

    return (
        <Col className={ styles.productsByBrandFilter__container}>
            <Checkbox.Group options={ plainOptions } value={ checkedValues } onChange={ onChange }  />
            <Button danger onClick={ resetFilter }>Eliminar filtro de marcas</Button>
        </Col>
    );
};

export default ProductsByBrandFilter;
