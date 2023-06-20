import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Empty, Space } from 'antd';
import { getProductsByCategory, clearProductsByCategory} from '../../../Redux/Features/products/clientProductsSlice';
import ProductCard from '../ProductCard/ProductCard';
import {
    getAllProducts,
    setFilteredProducts, 
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductsPagination from '../ProductsPagination/ProductsPagination';
// import { useParams } from 'react-router-dom';

const ConteinerProductsByCategory = () => {

    const dispatch = useDispatch()
    const productsByCategory = useSelector( state => state.clientProducts.productsByCategory)
    const idProduct = window.localStorage.getItem('category_id')

   // console.log('idparams en productcategori componente', idProduct)
   // console.log('estoy en conteinerProductByCategory', productsByCategory)

    useEffect(() => {
        dispatch(getProductsByCategory(idProduct))
        // return function clean(){
        //     dispatch(clearProductsByCategory())
        // }
    }, [idProduct])

    const allProducts = useSelector(state => state.clientProducts.allProducts);
    const idCategory = useSelector(state => state.clientProducts.idCategory);
    const currentFilteredProducts = useSelector(state => state.clientProducts.currentFilteredProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        if (allProducts.length > 0 && idCategory) {
            const filteredProductsByCategoryId = allProducts.filter(product => product.categoryId === idCategory);
            dispatch(setFilteredProducts(filteredProductsByCategoryId));
        }
    }, [allProducts, idCategory]);

    return (
        <div>

            <Space
                direction="vertical"
                size="middle"
            >
                <ProductsPagination />

                <Row justify='center' gutter={[16, 16]}>
                    {currentFilteredProducts.length ? currentFilteredProducts.map(product => {
                        return (
                            <Col span={6} key={product.id}>
                                <ProductCard
                                e_product_type={product.e_product_type}
                                name={product.name}
                                price={product.price}
                                id={product.id}
                                photo={product.photo}
                                />
                            </Col>
                        )
                    })
                        :
                        <Col span={24}>
                            <Empty description={false} />
                        </Col>}
                </Row>

            </Space>
        </div>
    )
}

export default ConteinerProductsByCategory;
