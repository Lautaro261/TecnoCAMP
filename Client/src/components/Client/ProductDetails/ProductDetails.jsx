import React from "react";
import { Row, Col, Space } from "antd";

const ProductDetails = () => {
    return(
        <div>
        <Space
            direction="vertical"
            size="middle"
            
        >
          <Row style={{border: 'solid #000000'}}>
            <Col span={24} style={{color: '#000000', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>
                Por aqui va imagen, por alli info de compra y por abajo descripción y demas, tenemos que hacer varios componentes y esquematizarlos en este con row y col. Desde aquí sale la petición al back y pasamos las respectivas props a los componentes mas pequeños como imagen, descripción , precio o info de compra.
            </Col>
          </Row>
        </Space>
    </div>

    )

}

export default ProductDetails