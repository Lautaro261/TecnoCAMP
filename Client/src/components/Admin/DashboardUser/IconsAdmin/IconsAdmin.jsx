import styles from "./IconAdmin.module.css";
import Logo from '../../../../img/LogoTienda.png';
import Logout from "../../../Logout/Logout";
import { Row, Col } from 'antd';
import IconAdminProfile from "./IconAdminProfile";

const IconsAdmin = () => {
    return (
        <Row>
            <Col span={24}>
                <div className={styles.icon__container}>
                    <img src={Logo} alt="Logo" className={styles.icon__image} />
                </div>
            </Col>
            <Col span={24}>
                <IconAdminProfile />
                <div>Jorge</div>
            </Col>
            <Col span={24}>
                <Logout />
            </Col>

        </Row>
    );
};

export default IconsAdmin;