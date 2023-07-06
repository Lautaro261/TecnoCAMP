import React from 'react'
import { useSelector } from 'react-redux';
import { Pagination, Row, Col, Empty, Space } from 'antd';
import ProductCard from '../ProductCard/ProductCard';

const ConteinerProductsSearched = () => {


    const searchedResult = useSelector(state => state.clientProducts.searchedResult)
    const token = window.localStorage.getItem("token");
    console.log('searchedresult', searchedResult)
    return (
        <div>

            <Space
                direction="vertical"
                size="middle"
            >

                <Row gutter={[16, 16]}>
                    {typeof searchedResult === "string" ?
                        <Col span={24}>
                            <Empty description={<span>No se encuentran resultados</span>} />
                        </Col>
                        :

                        searchedResult.map(product => {
                            return (

                                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                    <ProductCard
                                        e_product_type={product.e_product_type}
                                        name={product.name}
                                        price={product.price}
                                        id={product.id}
                                        photo={product.photo}
                                        is_available={product.is_available}
                                        token={token}
                                    />
                                </Col>

                            )
                        })
                    }


                </Row>


            </Space>
        </div>
    )
}

export default ConteinerProductsSearched;
