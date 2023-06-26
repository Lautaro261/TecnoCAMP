import React,{ useEffect } from "react";
import { Row, Col, Space } from "antd";
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails, clearDetails} from "../../../Redux/Features/products/clientProductsSlice";
import { AddCart } from "../../../Redux/Features/cart/cartSlice";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, InputNumber} from 'antd';
import { AddtoCart } from "../../../Redux/Features/cart/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector( state => state.clientProducts.productDetails) 
  const { id } = useParams();
  const category=  useSelector( state => state.clientProducts.category) 
  const [value, setValue] = useState('1');
  const [selected, setSelected]=useState([])
  
  const token = window.localStorage.getItem("token")
  console.log(productDetails)

  const selector=(e)=>{
    console.log(e.target.id)
    const array=e.target.id.split(",")
    console.log(array)
    setSelected(array)
  }

  const AddToCart=()=>{
 const id=productDetails.id
 const invId=selected[0]
 const val = value
 
 console.log([id, invId,val, token])
 dispatch(AddtoCart([id, invId,val, token]))
  }

  useEffect(()=> {
    dispatch(getProductDetails(id))
    console.log(productDetails)
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
              <Col>
              Colores Disponibles:  
              {productDetails.inventories ? productDetails.inventories.map((item)=>{
                return (<button onClick={selector} id={[`${item.id}`,item.quantity_inventory]} style={{background:`${item.color}`, border:"border: 20px solid black", borderColor: `${selected[0]===item.id? "green":"transparent"}`}}>{item.quantity_inventory}</button>)
              }): "??"} 
              </Col>
            </Col>

          </Row>
          <Row>
          <Col span={24} style={{width:"15vw", marginLeft:"40%"}}>
            {selected[0]?null:<p style={{color:"grey"}}>seleccione un color para continuar</p>}
          <InputNumber disabled={selected[0]? false : true} min={1} max={selected[1]} value={value} onChange={setValue} />
            <Button type="primary" onClick={AddToCart} disabled={selected[0] && value<= selected[1]?false:true}> AGREGAR AL CARRITO</Button>
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