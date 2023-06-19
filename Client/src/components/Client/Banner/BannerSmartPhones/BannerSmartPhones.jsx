import React from 'react';
import { Row, Col } from 'antd';
import image from '../../../../img/banner/Smartphones.png';


const BannerSmartPhones = () => {

    return (
        <Row style={{ backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
            <Col span={24} style={{ color: '#fff', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>
            Conectividad sin límites | Encuentra el smartphone perfecto para ti.
            </Col>
        </Row>
    )
}

export default BannerSmartPhones;