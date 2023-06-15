import React from "react";
import { Row, Col } from 'antd';
import Contacticons from "./Contacticons/Contacticons"
import MenuDash from "./MenuDash/MenuDash";
import Nav from "./Nav/Nav";
import { useEffect } from "react";
import { getAllCategories } from "../../../Redux/Features/productsClient/productsClientSlice";
import { useDispatch, useSelector } from "react-redux"; 

const DashboardUser = () => {
    const dispatch = useDispatch();
    //const allCategories = useSelector((state)=>state.productsClient.allCategories); 

    useEffect(()=>{
        dispatch(getAllCategories());
    }, [dispatch])
    return (
 
        <Row>
            <Col span={24}><Contacticons/></Col>
            <Col span={24}><MenuDash/></Col>
            <Col span={24}><Nav /* allCategories={allCategories} *//></Col>
        </Row>
 

    )

}

export default DashboardUser
