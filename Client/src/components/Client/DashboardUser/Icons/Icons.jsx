import React from "react";
import { Row, Col} from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconHistory from "./iconHistory";
import IconLogin from "./IconLogin";
import Logout from "../../../Logout/Logout";
import LogoutAuth from "../../../LogoutAuth/LogoutAuth";


const Icons = () => {
  const {isAuthenticated} = useAuth0()
  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');

  return (
    <div>
      {rol && rol === 'client' && token // cuando se corrija la ruta de login para usuarios auth0 esta consulta 'isAuthenticated' se borra de aqui.
        ? <Row justify="center" >
          <Col span={4} ><IconCart /></Col>
          <Col span={4}><IconHistory/></Col>
          <Col span={4}><IconProfile /></Col>
          <Col span={4}><IconFavorite /></Col>

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