import React from 'react';
import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import Statistics from '../../../components/Admin/Statistics/Statistics';

import { Layout, Space, Divider } from 'antd';
import EditProfile from '../../../components/EditProfile/editProfile';
const { Header, Sider, Content } = Layout;
const headerStyle = {
  // width:'100vh',
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  
  color: '#0000',
  backgroundColor: '#ffff',
};
const siderStyle = {
  width:'300px',
  textAlign: 'center',
  lineHeight: '40px',
  color: '#fff',
  backgroundColor: '#001529',
  minHeight:"100vh",
};



const AdminProfileView= ()=>{

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
        <Header style={headerStyle}><Divider style={{color:"black",}}>Bienvenido </Divider></Header>
        <Content style={contentStyle}>
        <EditProfile />
        </Content>
      </Layout>
    </Layout>
  </Space>
        </div>
    )
}

export default AdminProfileView;