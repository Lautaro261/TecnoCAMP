import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import SearchBar from '../SearchBar/SearchBar'
import Icons from "../Icons/Icons";
import Logo from "../../../../img/LogoTienda.png"
import styles from "./MenuDash.module.css"


const MenuDash = () => {
    return(
    <Row justify="space-around" align="middle">
        <Col span={5}><Link to='/home'><img className={styles.logo} src={Logo} /></Link></Col>
        <Col span={13}><SearchBar /></Col>
        <Col span={6}><Icons /></Col> 
    </Row>

    )

}

export default MenuDash