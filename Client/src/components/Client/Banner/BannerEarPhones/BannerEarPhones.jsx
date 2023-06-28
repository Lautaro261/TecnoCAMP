import React from 'react';
import { Row, Col } from 'antd'
import image from '../../../../img/banner/Earphones.png'


const BannerEarPhones = () => {
    return(
        <Row style={{ backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
            <Col span={24} style={{ color: '#fff', textAlign: 'center',fontSize: '1rem', fontWeight: 'bold' }}>
            Sumérgete en el sonido | Disfruta de la música con nuestros earphones de calidad.
        </Col>
    </Row>
    )

}

export default BannerEarPhones;