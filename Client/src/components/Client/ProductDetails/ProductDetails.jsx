import React,{ useEffect } from "react";
import { Row, Col, Space, Modal, notification } from "antd";
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails, clearDetails} from "../../../Redux/Features/products/clientProductsSlice";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, InputNumber} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AddtoCart } from "../../../Redux/Features/cart/cartSlice";



const ProductDetails = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const productDetails = useSelector( state => state.clientProducts.productDetails) 
  const { id } = useParams();
  const category=  useSelector( state => state.clientProducts.category) 
  const [value, setValue] = useState('1');
  const [selected, setSelected]=useState([])
  
  const token = window.localStorage.getItem("token")
  const openmodal=()=>{
    Modal.confirm({
      title: 'Debes Iniciar sesión',
      icon: <ExclamationCircleOutlined />,
      content: 'Para agregar un producto a tu carrito debes de iniciar sesión en Tecnocamp',
      okText: 'Iniciar Sesión',
      cancelText: 'Entendido',
      onOk:(()=>navigate("/login"))
  
    })
  }

  const notificationRed=(quantity)=>{
    notification.open({
        message: 'Agregado al carrito',
        description: quantity>1? `se han agregado ${quantity} productos al carrito`: `se ha agregado ${quantity} producto al carrito`,
        placement:"top"
      });
}

  const selector=(e)=>{
    console.log(e.target.id)
    const array=e.target.id.split(",")
    console.log(array)
    setSelected(array)
  }

  const AddToCart=()=>{
    if(token){
      const id=productDetails.id
      const invId=selected[0]
      const val = value
      
      console.log([id, invId,val, token])
      notificationRed(val)
      dispatch(AddtoCart([id, invId,val, token]))
    }
    else{
      openmodal()
    }
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
                <img style={{ maxHeight:"40vh", width:"auto", marginLeft:"40%"}}src={productDetails.photo && productDetails.photo[0]}/>
            </Col>
            <Col span={12} style={{color: '#000000', textAlign: 'left', fontSize: '2vw', fontWeight: 'bold'}}>
            <p>{productDetails.name}</p>
              <Col span={24} style={{color: '#000000', textAlign: 'left', fontSize: '2vw', fontWeight: 'bold'}}>
              <p>${productDetails.price}</p>
              <p  style={{color: 'grey', fontSize: '1vw'}}>Disponibles: {productDetails.total_quantity_inventory}</p>
              </Col>
              <Col>
              Colores Disponibles:  
              {productDetails.inventories ? productDetails.inventories.map((item)=>{
                return (<Button key={ item.id } onClick={selector} id={[`${item.id}`,item.quantity_inventory]} style={{background:`${item.color}`, border:"border: 20px solid black", margin: "5px", borderColor: `${selected[0]===item.id? "green":"transparent"}`}}>{item.quantity_inventory}</Button>)
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