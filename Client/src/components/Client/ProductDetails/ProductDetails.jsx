import React,{ useEffect } from "react";
import { Row, Col, Space } from "antd";
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails, clearDetails, getCategory } from "../../../Redux/Features/productsClient/productsClientSlice";
import { useParams } from 'react-router-dom';
import axios from "axios";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector( state => state.productsClient.productDetails) 
  const { id } = useParams();
  const category=  useSelector( state => state.productsClient.category) 


  useEffect(()=> {
    dispatch(getProductDetails(id))
    dispatch( getCategory(id))
 

    return function clean(){
      dispatch(clearDetails())
    }
  }, [])
  console.log(category)
    return(
        <div>
        <Space
            direction="vertical"
            size="middle"
            
        >
        <Row >
            <Col span={6} >
                <p style={{color:"grey"}}>categorias/{category}</p>
            </Col>    
          </Row>
          <Row justify="space-between">
            <Col span={12} >
                <img style={{width:"20vw"}}src={productDetails.photo}/>
            </Col>
            <Col span={12} style={{color: '#000000', textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>
            <p>{productDetails.name}</p>
              <Col span={24}>
              <p>${productDetails.price}</p>
              <p>Disponibles: {productDetails.total_quantity_inventory}</p>
              </Col>
            </Col>
          </Row>
          <Row>
          <Col span={12} style={{color: '#000000', textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>
                <h2>Descripción</h2>
                <p>{productDetails.product_description}</p>
                
            </Col>
          </Row>


        </Space>
    </div>

    )

}

export default ProductDetails