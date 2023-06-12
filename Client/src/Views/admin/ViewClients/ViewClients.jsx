import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Divider, } from 'antd';
import { useEffect } from 'react';
import { getClientsback } from '../../../Redux/Features/admin/adminSlice';
import TableClients from '../../../components/Admin/TableClients/TableClients';
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
  color: '#fff',
  backgroundColor: '#fff',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '40px',
  color: '#fff',
  backgroundColor: '#001529',
  height:"100vh",
};


const ViewClients = ()=>{
  const token =window.localStorage.getItem("token")
  const dispach= useDispatch()
  const clientes = useSelector(state=>state.admin.clients)
  useEffect(()=>{
    dispach(getClientsback({token}))
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
        <div><TableClients clients={clientes}/></div>
        </Content>
      </Layout>
    </Layout>
  </Space>
        </div>
    )
}

export default ViewClients;