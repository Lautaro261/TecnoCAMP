import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Pagination,Row, Col } from 'antd';
import { getAllProducts } from '../../../Redux/Features/productsClient/productsClientSlice';
import ProductCard from '../ProductCard/ProductCard';

const ContainerProducts = () => {

    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.productsClient.allProducts)
    const token = window.localStorage.getItem('token')
    console.log('estoy en conteinerProduct', allProducts)

    useEffect(() => {
        dispatch(getAllProducts({ token }))
    }, [dispatch])
    return (
        <div>
            <Pagination defaultCurrent={1} total={50} />

            <Row gutter={[16, 16]}>
            {allProducts.length && allProducts.map(product => {
                return (
                    <Col span={6} key={product.id}>
                        <ProductCard photo={product.photo} e_product_type={product.e_product_type} name={product.name} price={product.price} id={product.id} />
                    </Col>
                )
            })}
            </Row>
            
            <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}

export default ContainerProducts;
