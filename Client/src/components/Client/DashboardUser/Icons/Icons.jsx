import React from "react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconLogin from "./IconLogin";
import IconLogout from "./IconLogout";
import { Row, Col } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutAuth from "../../../LogoutAuth/LogoutAuth";


const Icons = () => {
  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {rol && rol === 'client' && token || isAuthenticated
        ? <Row justify="center" >
          <Col span={4} ><IconCart /></Col>
          <Col span={4}><IconFavorite /></Col>
          <Col span={4}><IconProfile /></Col>
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