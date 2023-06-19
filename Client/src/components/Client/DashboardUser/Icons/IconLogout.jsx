import React from "react";
import { LogoutOutlined } from '@ant-design/icons'
// import { Link } from "react-router-dom";

const IconLogout = () =>{
    return(
        <Row >
        <Col span={24}>
            <Link>
                <LogoutOutlined style={{ fontSize: '28px'}} />
            </Link>
        </Col>
    </Row>
    )
}

export default IconLogout;