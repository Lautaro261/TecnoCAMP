import React from "react";
import { Row, Col, Badge, Tooltip } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import IconCart from "./IconCart";
import IconFavorite from "./IconFavorite";
import IconProfile from "./IconProfile";
import IconHistory from "./iconHistory";
import IconLogin from "./IconLogin";
import Logout from "../../../Logout/Logout";
import LogoutAuth from "../../../LogoutAuth/LogoutAuth";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateCart, Fill } from "../../../../Redux/Features/cart/cartSlice";

const Icons = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch=useDispatch()
  const rol = window.localStorage.getItem('rol');
  const token = window.localStorage.getItem('token');
  const favorites = useSelector(state => state.clientProducts.favorites);
  const cart = useSelector(state => state.cart.cartFill);

  useEffect(()=>{
    dispatch(CreateCart(token)).then(dispatch(Fill(token)))
  }, [token, dispatch])
  

  return (
    <div>
      {rol && rol === 'client' && token
        ? (
          <Row justify="center">
            <Col span={4}>
              <Badge count={cart?cart.length:null}> {/* FALTA ESTADO DE CARRITO */}
              <IconCart/>
              </Badge>
            </Col>
            <Col span={4}><IconHistory /></Col>
            <Col span={4}><IconProfile /></Col>
            <Col span={4}>
              <Badge count={favorites.length}>
                <IconFavorite/>
              </Badge>
            </Col>
            {isAuthenticated ? <Col span={4}><LogoutAuth /></Col> : <Col span={4}><Logout /></Col>}
          </Row>
        )
        : (
          <Row justify='end' align="top">
            <Col span={6}><IconLogin /></Col>
          </Row>
        )
      }
    </div>
  )
}

export default Icons;
