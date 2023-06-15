import { HomeOutlined, PhoneOutlined, FieldTimeOutlined, QuestionCircleOutlined, CustomerServiceFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; 

/* const items = [
  {
    label: 'Inicio',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Todos los productos',
    key: '/all-categories',
    icon: <PhoneOutlined />,
  },
  /* {
    label: 'Celulares',
    key: '/categories/f2f573c2-3278-4f3e-888d-7fbde488e645',
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
  }, 
]; */
 //   items = [{label, key}]
 // allCategories = [{id, name, is_available}]

const  Nav = ()=>{
  const navigate=useNavigate()
  const current = window.localStorage.getItem("current")
  const items = useSelector((state)=>state.productsClient.items);
  /* const allCategories = useSelector((state)=>state.productsClient.allCategories);  */
 /*  useEffect(()=>{
    /* console.log(allCategories, 'useEffect')


    if(allCategories.length===2){
      return(<div>
        <h3>Cargando...</h3>
      </div>)
    }


    if(allCategories.length>0){
      allCategories.forEach(category => {
        items.push({
          label: category.name,
          key: `/categories/${category.name}`,
         
        });
      });      
      console.log(items);
    } 
  },[allCategories]) */




  //console.log(allCategories);
   const onClick = (e) => {

    console.log('click ', e);
    window.localStorage.setItem("current", e.key)
    navigate(e.key) 
  }; 



  return( 
    <Menu 
     onClick={onClick} 
    selectedKeys={[current]} 
    mode="horizontal" 
    items={items} />
    
    )
};
  //const ComponentDemo = App;


export default Nav