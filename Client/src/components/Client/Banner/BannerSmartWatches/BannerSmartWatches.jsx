import React from 'react';
import { Row, Col } from 'antd';
import image from '../../../../img/banner/Smartwatches.png';


const BannerSmartWatches = () => {

    return (
        <Row>
            <Col span={24} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                Tecnología en tu muñeca | Descubre la última colección de smartwatches.
            </Col>
        </Row>
    )

}

export default BannerSmartWatches