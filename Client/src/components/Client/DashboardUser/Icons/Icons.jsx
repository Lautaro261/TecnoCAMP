import React from "react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconLogin from "./IconLogin";
import IconLogout from "./IconLogout";
import { Row, Col } from "antd";

const Icons = () => {
  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');


  return (
    <div>
      {rol && rol === 'client' && token
        ? <Row justify="center" >
          <Col span={4} ><IconCart /></Col>
          <Col span={4}><IconFavorite /></Col>
          <Col span={4}><IconProfile /></Col>
          <Col span={4}><IconLogout /></Col>
          <Col span={4}><IconLogout /></Col>
        </Row>
        : <Row justify='end' align="top">
          <Col span={6}><IconLogin /></Col>
        </Row>
      }

    </div>
  )

}
export default Icons;