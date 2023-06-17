import React from 'react'
import ContacticonsAdmin from './Contacticons/ContacticonsAdmin'
import Nav from './Nav/Nav'
import ProductForm from '../ProductForm/ProductForm'
import IconAdmin from './IconAdmin/IconAdmin'
import { Row, Col } from 'antd';

function DashboardAdmin() {
  return (
    <>
    <Row >
      <Col span={24} >
    <ContacticonsAdmin/>
      </Col>
      <Col span={24}>
    <IconAdmin/>
      </Col>
      <Col span={24}>
    <Nav/>
      </Col>
    </Row>
    
    </>
  )
}

export default DashboardAdmin