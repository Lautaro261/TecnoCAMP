import React from "react";
import { LogoutOutlined } from '@ant-design/icons'
import { Row, Col} from 'antd'
// import { Link } from "react-router-dom";

const IconLogout = () =>{

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('rol')
    }

    return(
        <Row >
        <Col span={24}>
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer'}}>
                <LogoutOutlined style={{ fontSize: '28px', color: '#6699FF' }} />
            </button>
        </Col>
    </Row>
    )
}

export default IconLogout;