import React from 'react';
import { Row, Col } from 'antd';
import image from '../../../../img/banner/Smartwatches.png';


const BannerSmartWatches = () => {

    return (
        <Row style={{ backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
            <Col span={24} style={{ color: '#fff', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold'}}>
                Tecnología en tu muñeca | Descubre la última colección de smartwatches.
            </Col>
        </Row>
    )

}

export default BannerSmartWatches