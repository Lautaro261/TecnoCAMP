import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin'
import FormProductos from '../../../components/Admin/FormProductos/FormProductos';
import { Layout, Space, Divider } from 'antd';
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
  // maxWidth:'100%',
  // height:"100vh",
};


const CreateProductVew = () => {

  return (

      <Layout>
        <Sider style={siderStyle}><DashboardAdmin /></Sider>
        <Layout>
          <Header style={headerStyle}><Divider style={{ color: "black", }}>Crear producto </Divider></Header>
          <Content style={contentStyle}>
            <FormProductos />
          </Content>
        </Layout>
      </Layout>

  )
}

export default CreateProductVew;