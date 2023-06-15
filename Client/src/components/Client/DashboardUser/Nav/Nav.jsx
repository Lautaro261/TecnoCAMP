import { HomeOutlined, PhoneOutlined, FieldTimeOutlined, QuestionCircleOutlined, CustomerServiceFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; 

const items = [
  {
    label: 'Inicio',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Todos los productos',
    key: '/categories/all',
    icon: <PhoneOutlined />,
  },
  /* {
    label: 'Celulares',
    key: '/categories/smartphones',
    icon: <PhoneOutlined />,
  },
  {
    label: 'SmartWatch',
    key: '/categories/smartwatches',
    icon: <FieldTimeOutlined />,
  },
    {
    label: 'Audifonos',
    key: '/categories/earphones',
    /* icon: <CustomerServiceFilled />, 
  }, */
 /*  {
    label: 'Quienes somos',
    key: 'Quienes somos',
    icon: <QuestionCircleOutlined />,
  }, */
];
 //   items = [{label, key}]
 // allCategories = [{id, name, is_available}]

const  Nav = ()=>{
  const navigate=useNavigate()
  const current = window.localStorage.getItem("current")
  const allCategories = useSelector((state)=>state.productsClient.allCategories); 
  useEffect(()=>{
    console.log(allCategories, 'useEffect')
    if(allCategories.length>0){
      allCategories.forEach(category => {
        items.push({
          label: category.name,
          key: `/categories/${category.name}`,
         
        });
      });      
      console.log(items);
    }else{
      
    }
  },[allCategories])




  //console.log(allCategories);
/*   const onClick = (e) => {

    console.log('click ', e);
    window.localStorage.setItem("current", e.key)
    navigate(e.key) 
  }; */



  return( 
    <Menu 
   /*  onClick={onClick}  */
    selectedKeys={[current]} 
    mode="horizontal" 
    items={items} />
    
    )
};
  //const ComponentDemo = App;


export default Nav