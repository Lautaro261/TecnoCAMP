import React from "react";
import { Row, Col } from 'antd';
import SearchBar from '../SearchBar/SearchBar'
import Icons from "../Icons/Icons";
import Logo from "../../../../img/LogoTienda.png"
import styles from "./MenuDash.module.css"


const MenuDash = () => {
    return(
    <Row>
        <Col span={5}><img className={styles.logo} src={Logo} /> </Col>
        <Col span={11}><SearchBar /></Col>
        {/* <Col span={5}><Icons /></Col> */}
    </Row>

    )

}

export default MenuDash