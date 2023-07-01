import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import FooterUser from '../../../components/Client/Footer/FooterUser';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  paddingInline: "0px",
  // color: '#fff',
  height: 220,
  // display:"flex",
  // width: "100vw",
  lineHeight: '60px',
  width:"100vw"
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  width:"100vw",
  color: '#0000',
  minHeight:'60vh'
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px"
};

const ProfileView = () => (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
    
    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>


);
export default ProfileView ;