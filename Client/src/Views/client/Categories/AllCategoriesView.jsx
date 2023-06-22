import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import Banner from '../../../components/Client/Banner/Banner';
import Brands from '../../../components/Client/Brands/Brands';
import ContainerAllProducts from '../../../components/Client/ContainerAllProducts/ContainerAllProducts';
import FooterUser from '../../../components/Client/Footer/FooterUser';

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
  minHeight: 220,
  lineHeight: '8',
  color: '#0000',
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px"
};
const brands = ["Apple", "Huawei", "Motorola", "Realme", "Samsung", "Xiaomi"];
let  current = window.localStorage.getItem('current');

const AllCategoriesView = () => {

  return (
  <Layout >
    <Header style={headerStyle}> <DashboardUser /></Header>
    <Content style={contentStyle}>
        
        <Banner categoria={current} /> 
        <Brands brands={brands}/>
   
        <ContainerAllProducts  />



    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>

  )
};


export default AllCategoriesView;