import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Button, Form, Input, Select, InputNumber, Space  } from 'antd';
import { getAllProducts } from '../../../Redux/Features/admin/products/adminProductsSlice';


function FormEditInventary() {

  const dispatch = useDispatch()
     const token = window.localStorage.getItem("token");
    const allProducts = useSelector((state) => state.adminProducts.allProducts)

//    console.log("soy all", allProducts);
    

     useEffect(()=>{
         dispatch(getAllProducts(token))
     },[dispatch])

    const data = allProducts.map((d)=>{
      return(
        {
          key: d.id,
          name: d.name,
          total_quantity_inventory: d.total_quantity_inventory,
          inventories: d.inventories.map((c)=>{
            return(
              {
                color: c.color,
                quantity_inventory: c.quantity_inventory
              }
            )
          })
        }
      )

     })

     //console.log("soy data", data);
     const { Search } = Input;
const onSearch = (name) => console.log(name);
console.log(onSearch);


    //  const onChange = (value: quantity_inventory) => {
    //   console.log('changed', value);
    // };
  

  return (


    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
   
  >
    <Form.Item
      label="Nombre del Producto"
      name="name"
      rules={[
        {
          required: true,
          message: 'porfavor introduce el nombre del artículo',
        },
      ]}
    >
      <Input  />
    </Form.Item>
    <InputNumber min={1} max={10} defaultValue={3}  />

    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />




  </Form>
  )
}

export default FormEditInventary