import { Layout, Space, Divider, Row, Col } from 'antd';
import DashboardAdmin from '../../../components/Admin/DashboardUser/DashboardAdmin';
import OngoingOrders from '../../../components/Admin/OngoingOrders/OngoingOrders';

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
  width: '300px',
  textAlign: 'center',
  lineHeight: '40px',
  minHeight:"100vh",
  color: '#fff',
  backgroundColor: '#001529',
  // height: "100vh",
};

const AdminReviewsView = () => {
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      >
        <Layout>
          <Sider style={siderStyle}><DashboardAdmin /></Sider>
          <Layout>
            <Header style={headerStyle}><Divider style={{ color: "black", }}>Pedidos en Curso</Divider></Header>
            <Content style={contentStyle}>

              <OngoingOrders />

            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  )
}

export default AdminReviewsView;