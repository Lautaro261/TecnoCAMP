import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import FooterUser from '../../../components/Client/Footer/FooterUser';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  paddingInline: "0px",
  height: 220,
  lineHeight: '60px',
  width:"100vw"
};

const contentStyle = {
  width:"100vw",
  color: '#0000',
  minHeight:"60vh"
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px"
};

const PaymentViewLayout = ({ children }) => (
  <Layout >
    <Header style={ headerStyle }><DashboardUser /></Header>
    <Content style={ contentStyle }>
        { children }
    </Content>
    <Footer style={ footerStyle }><FooterUser /></Footer>
  </Layout>
);

export default PaymentViewLayout;