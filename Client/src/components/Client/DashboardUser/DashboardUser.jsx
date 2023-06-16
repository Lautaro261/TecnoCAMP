import React from "react";
import { Row, Col } from 'antd';
import Contacticons from "./Contacticons/Contacticons"
import MenuDash from "./MenuDash/MenuDash";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../Redux/Features/productsClient/productsClientSlice";

const DashboardUser = () => {
    return (
 
        <Row>
            <Col span={24}><Contacticons/></Col>
            <Col span={24}><MenuDash/></Col>
            <Col span={24}><Nav/></Col>
        </Row>
 

    )

}

export default DashboardUser
