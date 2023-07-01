import Logo from "../../../../img/LogoTienda.png";
import Logout from "../../../Logout/Logout";
import { Row, Col } from "antd";
import IconSuperAdminProfile from "./IconSuperAdminProfile";
import { Link } from "react-router-dom";
import styles from "./IconSuperAdmin.module.css";

const IconsSuperAdmin = () => {
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
        <IconSuperAdminProfile />
        <div>Armando</div>
      </Col>
      <Col span={24}>
        <Logout />
      </Col>
    </Row>
  );
};

export default IconsSuperAdmin;
