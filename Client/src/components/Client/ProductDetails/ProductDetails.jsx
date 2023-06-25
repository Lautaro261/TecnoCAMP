import React,{ useEffect } from "react";
import { Row, Col, Space } from "antd";
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails, clearDetails} from "../../../Redux/Features/products/clientProductsSlice";
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, InputNumber} from 'antd';


const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector( state => state.clientProducts.productDetails) 
  const { id } = useParams();
  const category=  useSelector( state => state.clientProducts.category) 
  const [value, setValue] = useState('1');


  useEffect(()=> {
    dispatch(getProductDetails(id))
    return function clean(){
      dispatch(clearDetails())
    }
  }, [])


 
    return(
        <div style={{width: "100vw"}}>
        <Space
            direction="vertical"
            size="middle"
            
        >
        <Row gutter={16} style={{width: "98vw"}}>
            <Col span={6} >
                <p style={{color:"grey"}}>Categorias / {category}</p>
            </Col>    
          </Row>
          <Row justify="space-between" gutter={16}>
            <Col span={12} >
                <img style={{width:"20vw", marginLeft:"40%"}}src={productDetails.photo}/>
            </Col>
            <Col span={12} style={{color: '#000000', textAlign: 'left', fontSize: '2vw', fontWeight: 'bold'}}>
            <p>{productDetails.name}</p>
              <Col span={24} style={{color: '#000000', textAlign: 'left', fontSize: '1vw', fontWeight: 'bold'}}>
              <p>${productDetails.price}</p>
              <p  style={{color: 'grey', fontSize: '0.7vw'}}>Disponibles: {productDetails.total_quantity_inventory}</p>

              </Col>
            </Col>
          </Row>
          <Row>
          <Col span={24} style={{width:"15vw", marginLeft:"40%"}}>
          <InputNumber min={1} max={productDetails.total_quantity_inventory} value={value} onChange={setValue} />
            <Button type="primary" onClick={() => {setValue(1);}}> AGREGAR AL CARRITO</Button>
            </Col>
          </Row>
          <Row>
          <Col span={24} >
                <h3 style={{color: '#000000', textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>Descripción del artículo</h3>
                <p style={{marginLeft:"20%",backgroundColor: '#E8E8E8', color:"black", textAlign: 'center', width:"50%"}}>{productDetails.product_description}</p>
                
            </Col>
          </Row>


        </Space>
    </div>

    )

}

export default ProductDetails