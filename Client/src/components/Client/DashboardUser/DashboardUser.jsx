import React from "react";
import { Row, Col } from 'antd';
import Contacticons from "./Contacticons/Contacticons"
import MenuDash from "./MenuDash/MenuDash";
import Nav from "./Nav/Nav";

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


  // <div className={style.contenedor}>
        //     <div className={style.Contact}>
        //         <Contacticons/>
        //     </div>

        //     <div className={style.body}>
        //         <img src={logo} className={style.logo}/>
        //         <SearchBar/>
        //         <div>
        //         <Icons className={style.Icons}/>
        //         </div>
        //     </div>

        //     <div className={style.NavigationBar}>
        //     <Nav/>
        //     </div>
        // </div>