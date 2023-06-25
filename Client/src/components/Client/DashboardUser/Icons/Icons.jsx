import React from "react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconLogin from "./IconLogin";
import { Row, Col } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutAuth from "../../../LogoutAuth/LogoutAuth";
import Logout from "../../../Logout/Logout";
const Icons = () => {
  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {rol && rol === 'client' && token || isAuthenticated // cuando se corrija la ruta de login para usuarios auth0 esta consulta 'isAuthenticated' se borra de aqui.
        ? <Row justify="center" >
          <Col span={4} ><IconCart /></Col>
          <Col span={4}><IconFavorite /></Col>
          <Col span={4}><IconProfile /></Col>
          {isAuthenticated ? <Col span={4}><LogoutAuth /></Col> : <Col span={4}><Logout /></Col>}
        </Row>
        : <Row justify='end' align="top">
          <Col span={6}><IconLogin /></Col>
        </Row>
      }
    </div>
  )
}
export default Icons;