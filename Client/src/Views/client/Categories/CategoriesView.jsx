import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import Banner from '../../../components/Client/Banner/Banner';
import Brands from '../../../components/Client/Brands/Brands';
import ConteinerProductsByCategory from '../../../components/Client/ConteinerProductsByCategory/ConteinerProductsByCategory';
import { useEffect } from 'react';

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
  color: '#0000',
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const CategoriesView = () => {
  
  const brands = ["Apple", "Huawei", "Motorola", "Realme", "Samsung", "Xiaomi"];
  let  current = window.localStorage.getItem('current');
  let idCategory = window.localStorage.getItem('category');
/* 
  useEffect(()=>{
    console.log("HOLA! CATEGORIA ", idCategory);
  },[idCategory]) */

  return(

  <Layout >
    <Header style={headerStyle}> <DashboardUser /></Header>
    <Content style={contentStyle}>
        
        <Banner categoria={current}/> 
        <Brands brands={brands}/>
        <ConteinerProductsByCategory categoria={idCategory}  />



    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>
  )

};
export default CategoriesView;