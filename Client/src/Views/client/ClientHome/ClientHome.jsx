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
  width: "100vw",
  padding: "0px",
};
const ClientHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const userSession = useSelector((state) => state.logInAndSignUp.userSession)
  const userCreated = useSelector((state) => state.logInAndSignUp.userCreated)


  useEffect(() => {
    const userValues = {
      sub: user?.sub,
      email: user?.email
    }

    const signUpAndLogin = async () => {
      if (user && !userSession.token) {
        if (!userSession.token && !userSession.rol) {
          dispatch(signUpUser(userValues))
          console.log('if 1', userValues);
        }
      }
    };
    signUpAndLogin();

  }, [user])

  useEffect(() => {
    const userValues = {
      sub: user?.sub,
      email: user?.email
    };
    if (user && userCreated.message === '¡Usuario creado correctamente!' || user && userCreated.message === `El usuario con el email ${userValues.email}, ya existe`) {
      dispatch(loginUser(userValues));
      console.log('if 2, intento loguearme', userValues);
      // navigate('/login')
    }
   
  }, [userCreated])

  const openmodal = () => {
    Modal.warning({
      title: 'Lo sentimos mucho😕',
      icon: <ExclamationCircleOutlined />,
      content: 'Este usuario se encuentra restringido de nuestra plataforma. Si crees que esto es un error, ponte en contacto con nosotros',
      okText: 'Aceptar',
    })
  }

  useEffect(() => {
    if(userSession.message === '¡Has ingresado correctamente! (Auth)'){
        if( user && userSession.token && userSession.rol){
          const token = userSession.token;
          const rol = userSession.rol;
          const banned = userSession.erased;
          if (banned){
                  openmodal()
                  console.log("te banearon puto")
                }else{
          
                console.log('logueado en el front como: ', rol, 'token: ' ,token,'banned: ', banned);
                // setToken(token);
                // setRol(rol);
                window.localStorage.setItem('rol', rol);
                window.localStorage.setItem('token', token);
              }
        }
    }
  }, [userSession.token])
 
  const token = window.localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      dispatch(CreateCart(token));
    }
  }, [token])


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
