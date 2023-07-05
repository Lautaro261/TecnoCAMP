import React from 'react'
import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import EditInventarycomponent from '../../../components/Admin/FormEditInventary/FormEditInventary';

import { Layout, Space, Divider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#0000',
  backgroundColor: '#ffff',
};
const siderStyle = {
  width:'300px',
  textAlign: 'center',
  lineHeight: '40px',
  color: '#fff',
  backgroundColor: '#001529',
  
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

function EditInventary() {
    return(
        <div>
             <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
    size={[0, 48]}
  >
    <Layout>
      <Sider style={siderStyle}><DashboardAdmin/></Sider>
      <Layout>
        <Header style={headerStyle}><Divider style={{color:"black",}}> Bienvenido </Divider></Header>
        <Content style={contentStyle}>
            <EditInventarycomponent/>
        
        </Content>
      </Layout>
    </Layout>
  </Space>
        </div>
    )
}

export default EditInventary