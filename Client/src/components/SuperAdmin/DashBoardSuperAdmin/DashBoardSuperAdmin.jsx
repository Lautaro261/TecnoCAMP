import React from "react";
import Nav from "./Nav/Nav";
import IconsSuperAdmin from "./IconsSuperAdmin/IconsSuperAdmin";
import ContactIconsSuperAdmin from "./ContactIconsSuperAdmin/ContactIconsSuperAdmin";
import { Row, Col, Space } from "antd";

function DashBoardSuperAdmin() {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Row>
        <Col span={24}>
          <ContactIconsSuperAdmin />
        </Col>
        <Col span={24} style={{ marginBottom: "10vh" }}>
          <IconsSuperAdmin />
        </Col>
        <Col span={24}>
          <Nav style={{ bottom: 0, width: "100%" }} />
        </Col>
      </Row>
    </Space>
  );
}

export default DashBoardSuperAdmin;