import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import FooterUser from '../../../components/Client/Footer/FooterUser';
import AboutUsData from '../../../components/Client/AboutUsData/AboutusData';


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
  
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px"
};

const AboutUs = () => (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
     <AboutUsData/>
    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>


);
export default AboutUs;