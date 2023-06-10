import React from 'react';
import { Row, Col } from 'antd'
import image from '../../../../img/banner/Earphones.png'


const BannerEarPhones = () => {
    return(
    <Row>
        <Col span={24} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
            Sumérgete en el sonido | Disfruta de la música con nuestros earphones de calidad.
        </Col>
    </Row>
    )

}

export default BannerEarPhones;