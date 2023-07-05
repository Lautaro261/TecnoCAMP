import Logo from "../../../../img/LogoTienda.png";
import Logout from "../../../Logout/Logout";
import { Row, Col } from "antd";
import IconSuperAdminProfile from "./IconSuperAdminProfile";
import { Link } from "react-router-dom";
import styles from "./IconSuperAdmin.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Tooltip, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Fill } from "../../../../Redux/Features/profile/profileSlice";

const IconsSuperAdmin = () => {
  const dispatch=useDispatch();
  const profile=useSelector(state=>state.profile.profiledat)
  const token=window.localStorage.getItem("token")
  useEffect(()=>{
      dispatch(Fill(token))
  },[])

  return (
    <Row>
      <Col span={24} style={{ marginBottom: "10vh" }}>
        <Link to="/superadmin/admins">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "auto", width: "20vh" }}
          />
        </Link>
      </Col>
      <Col span={24}>
      <Link to='/superadmin/profile'>
      <Tooltip title='Ir a perfil'>
            <Avatar shape="circle" size={115} icon={<UserOutlined />} src={profile.photo}/>
            <div style={{color:"white"}}>{profile.name?profile.name:null}</div>
            <div style={{color:"gray"}}>{profile.mail}</div>
            </Tooltip>
      </Link>
      </Col>
      <Col span={24}>
      <Logout/>
      </Col>
    </Row>
  );
};

export default IconsSuperAdmin;
