import styles from "./IconAdmin.module.css";
import Logo from '../../../../img/LogoTienda.png';
import Logout from "../../../Logout/Logout";
import { Row, Col } from 'antd';
import IconAdminProfile from "./IconAdminProfile";
import { Link } from "react-router-dom";

const IconsAdmin = () => {
    return (
        <Row>
            <Col span={24}><Link to='/admin/home'><img src={Logo} alt="Logo" className={styles.icon__image} /></Link></Col>
            <Col span={24}>
                <IconAdminProfile />
                <div>Jorge</div>
            </Col>
            <Col span={24}><Logout /></Col>

        </Row>
    );
};

export default IconsAdmin;