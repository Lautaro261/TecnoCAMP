import React, {useEffect } from 'react';
import { Layout } from "antd";
import DashboardUser from "../../../components/Client/DashboardUser/DashboardUser";
import style from "./ClientHome.module.css";
import Slider from "../../../components/Client/Slider/Slider";
import FooterUser from "../../../components/Client/Footer/FooterUser";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../Redux/Features/login/logInAndSignUpSlice";
import Holder from "../../../components/Client/Categories/Holder/Holder";
import { CreateCart } from '../../../Redux/Features/cart/cartSlice';

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

  const { user, isAuthenticated } = useAuth0();

  const userSub = user?.sub;
  const emailAuth = user?.email;
  const token=window.localStorage.getItem("token")

  useEffect(()=>{
    if (user&& isAuthenticated) {
      dispatch(
        createUser({
          sub: userSub,
          email: emailAuth,
        })
      )
    };  
    
  },[user, isAuthenticated]);

  useEffect(()=>{
    if(token){
      dispatch(CreateCart(token));
    }
  }, [token])


  if(user){
    window.localStorage.setItem('sub', userSub);
    window.localStorage.setItem('email', emailAuth)
  }
  
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
