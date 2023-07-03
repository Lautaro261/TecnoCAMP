import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import Brands from '../../../components/Client/Brands/Brands';
import ConteinerProductsSearched from '../../../components/Client/ConteinerProductsSearched/ConteinerProductSearched';

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
  backgroundColor: '#7dbcea',
};
const brands = ["Apple", "Huawei", "Nokia", "Amazfit", "Samsung", "Xiaomi", "All"];

const SearchedResultsView = () => (

  <Layout >
    <Header style={headerStyle}> <DashboardUser /></Header>
    <Content style={contentStyle}>
    
        <Brands brands={brands}/>
   
        <ConteinerProductsSearched /> 


    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>


);
export default SearchedResultsView;