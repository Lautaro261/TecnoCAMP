import React from "react";
import { LoginOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { Row,Col } from 'antd'

const IconLogin = () => {
    return (
        <Row align='top'>
            <Col span={24}>
                <Link to='/login'>
                    <LoginOutlined style={{ fontSize: '28px', color: '#6699FF'}} />
                </Link>
            </Col>
        </Row>
    )
}

export default IconLogin;