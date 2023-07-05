import { Row, Col, Button, Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import Banner from '../../../components/Client/Banner/Banner';
import Brands from '../../../components/Client/Brands/Brands';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ConteinerProductsByCategory from '../../../components/Client/ConteinerProductsByCategory/ConteinerProductsByCategory';
import ProductsSliderFilter from '../../../components/Client/ProductsSliderFilter/ProductsSliderFilter';
import ProductsByBrandFilter from '../../../components/Client/ProductsByBrandFilter/ProductsByBrandFilter';
import ProductsSorting from '../../../components/Client/ProductsSorting/ProductsSorting';
import { getAllCategories } from '../../../Redux/Features/categories/clientCategoriesSlice';
import {
  setIdCategory,
  getFilteredProducts,
  setCurrentPage,
  setSelectedValueToFilter
} from '../../../Redux/Features/products/clientProductsSlice';
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
  minHeight: 200,
  lineHeight: '8',
  color: '#0000',
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px",
  width: '100%'
};

const CategoriesView = () => {
  let nameCategory = window.localStorage.getItem('category_name');

  // useEffect(()=>{

  // },[nameCategory])

  const brands = ["Apple", "Huawei", "Nokia", "Amazfit", "Samsung", "Xiaomi", "All"];
  let  current = window.localStorage.getItem('current');

/*
  useEffect(()=>{
    console.log("HOLA! CATEGORIA ", idCategory);
  },[idCategory]) */

  const location = useLocation();
  const pathname = location.pathname;
  const searchedCategory = pathname.split('/').pop();
  const dispatch = useDispatch();

  const allCategories = useSelector(state => state.clientCategories.allCategories);
  const idCategory = useSelector(state => state.clientProducts.idCategory);
  const idBrand = useSelector(state => state.clientProducts.idBrand);
  const minPrice = useSelector(state => state.clientProducts.minPrice);
  const maxPrice = useSelector(state => state.clientProducts.maxPrice);

  const currentCategory = allCategories.find(category => category.name === searchedCategory);
  const currentCategoryId = currentCategory ? currentCategory.id : null;

  useEffect(() => {
      dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
      if (currentCategoryId) {
          dispatch(setIdCategory(currentCategoryId));
      }
  }, [currentCategoryId, dispatch]);

  const filterCards = () => {
      const data = {
          idCategory,
          idBrand,
          minPrice,
          maxPrice
      };
      dispatch(getFilteredProducts(data));
      dispatch(setCurrentPage(1));
      dispatch(setSelectedValueToFilter(null));
  };

  return(

  <Layout >
    <Header style={headerStyle}> <DashboardUser /></Header>
    <Content style={contentStyle}>
        
        <Banner /> 
        <Brands brands={brands}/>

        <Row justify="end">
          <ProductsSorting />
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <ProductsSliderFilter />
            <ProductsByBrandFilter />
            <Button
              type="primary"
              onClick={ filterCards }
            >
              Aplicar filtros
            </Button>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <ConteinerProductsByCategory />
          </Col>
        </Row>

    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>
  )

};
export default CategoriesView;
