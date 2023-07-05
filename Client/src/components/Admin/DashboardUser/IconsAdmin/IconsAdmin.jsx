import styles from "./IconAdmin.module.css";
import Logo from '../../../../img/LogoTienda.png';
import Logout from "../../../Logout/Logout";
import { Row, Col } from 'antd';
import IconAdminProfile from "./IconAdminProfile";
import { Link } from "react-router-dom";

const IconsAdmin = () => {
    return (
        <Row>
            <Col span={24} style={{ marginBottom: '10vh'}} ><Link to='/admin/home'><img src={Logo} alt="Logo" style={{height: 'auto', width:'20vh'}}/></Link></Col>
            <Col span={24}>
                <IconAdminProfile />
            </Col>
            <Col span={24}><Logout /></Col>

        </Row>
    );
};

export default IconsAdmin;