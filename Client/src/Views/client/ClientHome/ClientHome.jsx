import React, { useEffect } from 'react';
import { Layout } from "antd";
import DashboardUser from "../../../components/Client/DashboardUser/DashboardUser";
import style from "./ClientHome.module.css";
import Slider from "../../../components/Client/Slider/Slider";
import FooterUser from "../../../components/Client/Footer/FooterUser";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "../../../Redux/Features/login/logInAndSignUpSlice";
import Holder from "../../../components/Client/Categories/Holder/Holder";
import { CreateCart } from '../../../Redux/Features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  paddingInline: "0px",
  // color: '#fff',
  height: 220,
  // display:"flex",
  width: "100vw",
  // lineHeight: '60px',
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: "center",
  minHeight: 200,
  lineHeight: "8",
  color: "#fff",
  backgroundColor: "#ffff",
  width: "100vw",

  marginTop: "1.4%",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  margin: "0px",
  padding: "0px",
};
const ClientHome = () => {
  const dispatch = useDispatch();

  const navigate= useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const userSession = useSelector((state) => state.logInAndSignUp.userSession)
  const errorCreated = useSelector(state => state.logInAndSignUp.errorCreated) 

  const userValues = {
    sub: user?.sub,
    email: user?.email
  }

  useEffect(() => {
    if(user && isAuthenticated){
      if( !userSession.token && !userSession.rol){
        dispatch(signUpUser(userValues))
        console.log('if 1', userValues);
      }
      if(typeof errorCreated === 'string'){
        dispatch(loginUser(userValues));
        console.log('if 2, intento loguearme', userValues);
      }
      if(userSession.token && userSession.rol){
        console.log('if 3, token :', userSession.token, 'rol: ',userSession.rol)
        const token = userSession.token
        const rol = userSession.rol
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('rol', rol); 
      }
    }
  },[userSession, userValues,user, isAuthenticated,navigate, errorCreated])


  const token = window.localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      dispatch(CreateCart(token));
    }
  }, [token])


   console.log(user);

  return (
    <Layout className={style.layout}>
      <Header style={headerStyle}>
        <DashboardUser />
      </Header>
      <Content style={contentStyle}>
        <Slider />
        <Holder />
      </Content>
      <Footer style={footerStyle}>
        <FooterUser />
      </Footer>
    </Layout>
  );
};
export default ClientHome;
