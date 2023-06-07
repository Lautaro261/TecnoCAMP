import { Layout, Space } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import style from"./ClientHome.module.css"
const { Header, Footer, Content } = Layout;
// const headerStyle = {
//   textAlign: 'center',
//   // color: '#fff',
//   height: '300px',
//     display: "flex",
//   // lineHeight: '64px',
//   // backgroundColor: '#7dbcea',
// };
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
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
      <Header ><DashboardUser /></Header>
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

 
);
export default ClientHome;