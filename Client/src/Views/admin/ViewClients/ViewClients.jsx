import React from 'react';
import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Divider, } from 'antd';
import { useEffect } from 'react';
import { getAllClients } from '../../../Redux/Features/admin/clients/clientsSlice';
import CustomerTable from '../../../components/Admin/TableClients/CustomerTable';

const { Header, Footer, Sider, Content } = Layout;
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
  // height:"100vh",
};




const ViewClients = ()=>{
  const token =window.localStorage.getItem("token")
  const dispatch= useDispatch()
  const clientes = useSelector(state=>state.clients.allClients)
  useEffect(()=>{
    dispatch(getAllClients({token}))
    console.log(clientes)
  },[])
  

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
        <Header style={headerStyle}><Divider style={{color:"black",}}>Clientes</Divider></Header>
        <Content style={contentStyle}>
       <CustomerTable/>
        </Content>
      </Layout>
    </Layout>
  </Space>
        </div>
    )
}

export default ViewClients;