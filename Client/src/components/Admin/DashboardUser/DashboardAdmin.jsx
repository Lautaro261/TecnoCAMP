import React from 'react'
import ContacticonsAdmin from './Contacticons/ContacticonsAdmin'
import Nav from './Nav/Nav'
import IconsAdmin from './IconsAdmin/IconsAdmin'
import { Row, Col, Space } from 'antd';

function DashboardAdmin() {
  return (

    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
    >
      <Row >
        <Col span={24} >
          <ContacticonsAdmin />
        </Col>
        <Col span={24} style={{ marginBottom: '10vh' }}>
          <IconsAdmin />
        </Col>
        <Col span={24}>
          <Nav style={{ bottom: 0, width: '100%'}} />
        </Col>
      </Row>
    </Space>

  )
}

export default DashboardAdmin