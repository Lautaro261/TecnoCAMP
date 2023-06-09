import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import style from "./ClientHome.module.css"
import Slider from '../../../components/Client/Slider/Slider';

import Categories from '../../../components/Client/Categories/Holder/Holder';
import Holder from '../../../components/Client/Categories/Holder/Holder';
const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  paddingInline: "0px",
  // color: '#fff',
  height: 220,
  // display:"flex",
  // width: "100vw",
  // lineHeight: '60px',
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 200,
  lineHeight: '8',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
const ClientHome = () => (

  <Layout className={style.layout}>
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
      <Slider/>
      <Holder/>

    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>


);
export default ClientHome;