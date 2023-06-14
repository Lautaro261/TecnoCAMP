import React from 'react';
import { Row, Col } from 'antd'


const BannerAllProducts = () => {
    return(
        <Row style={{ background: 'linear-gradient(#332B47, #4B5DEF)', backgroundSize: 'contain', backgroundPosition: 'center' }}>
            <Col span={24} style={{ color: '#fff', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            Descubre la innovación en cada detalle | Encuentra la mejor selección de smartphones, smartwatches y earphones en un solo lugar.
        </Col>
    </Row>
    )

}

export default BannerAllProducts;