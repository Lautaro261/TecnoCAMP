import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Row, Col, Empty, Space } from 'antd';
import { getProductsByCategory, clearProductsByCategory } from '../../../Redux/Features/productsClient/productsClientSlice';
import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom';

const ConteinerProductsByCategory = () => {

    const dispatch = useDispatch()
    const productsByCategory = useSelector( state => state.productsClient.productsByCategory)
    const {id} = useParams();

    console.log('estoy en conteinerProductByCategory', productsByCategory)

    useEffect(() => {
        dispatch(getProductsByCategory(id))
        return function clean(){
            dispatch(clearProductsByCategory())
        }
    }, [dispatch, id])

    return (
        <div>
            <Space
                direction="vertical"
                size="middle"    
            >
                <Pagination defaultCurrent={1} total={50} />

                <Row gutter={[16, 16]}>
                    {productsByCategory.length ? productsByCategory.map(product => {
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

                <Pagination defaultCurrent={1} total={50}  style={{ marginBottom: '20px' }}/>
                
            </Space>
        </div>
    )
}

export default ConteinerProductsByCategory;
