import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Empty, Space } from 'antd';
import { 
    getAllProducts, 
    setFilteredProducts 
} from '../../../Redux/Features/products/clientProductsSlice';
import ProductCard from '../ProductCard/ProductCard';
import ProductsPagination from '../ProductsPagination/ProductsPagination';

const ContainerAllProducts = () => {

    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.clientProducts.allProducts)
    const categoryName = window.localStorage.getItem('category_name');
    //console.log('estoy en conteinerProduct', allProducts)

    const currentFilteredProducts = useSelector(state => state.clientProducts.currentFilteredProducts);

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch, categoryName])

    useEffect(() => {
        if (allProducts.length > 0) {
            dispatch(setFilteredProducts(allProducts));
        }
    }, [allProducts, dispatch]);

    return (
        <div>
            <Space
                direction="vertical"
                size="middle"    
            >
               {/*  <Pagination defaultCurrent={1} total={50} /> */}
               <ProductsPagination/>

                <Row gutter={[16, 16]}>
                    {currentFilteredProducts.length ? currentFilteredProducts.map(product => {
                        return (
                            <Col span={6} key={product.id}>
                                <ProductCard 
                                e_product_type={product.e_product_type} 
                                name={product.name} 
                                price={product.price} 
                                id={product.id} 
                                photo={product.photo}
                                />
                            </Col>
                        )
                    })
                        :
                        <Col span={24}>
                            <Empty description={false} />
                        </Col>}
                </Row>

                {/* <Pagination defaultCurrent={1} total={50}  style={{ marginBottom: '20px' }}/> */}
                
            </Space>
        </div>
    )
}

export default ContainerAllProducts;
