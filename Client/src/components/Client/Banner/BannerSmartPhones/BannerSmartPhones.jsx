import React from 'react';
import { Row, Col } from 'antd';
import image from '../../../../img/banner/Smartphones.png';


const BannerSmartPhones = () => {

    return (
        <Row>
            <Col span={24} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
            Conectividad sin límites | Encuentra el smartphone perfecto para ti.
            </Col>
        </Row>
    )
}

export default BannerSmartPhones