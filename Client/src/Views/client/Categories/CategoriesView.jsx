import { Layout, Pagination } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import Banner from '../../../components/Client/Banner/Banner';

const { Header, Footer, Content } = Layout;
const trendingBrands=[];
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
const CategoriesView = () => (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
        
        <Banner categoria="earphones" ></Banner>
        <Pagination defaultCurrent={1} total={50}/>



    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>


);
export default CategoriesView;