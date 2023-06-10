import { HomeOutlined, PhoneOutlined, FieldTimeOutlined, QuestionCircleOutlined, CustomerServiceFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Inicio',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
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
    icon: <CustomerServiceFilled />,
  },
  {
    label: 'Quienes somos',
    key: 'Quienes somos',
    icon: <QuestionCircleOutlined />,
  },
];


const  Nav= ()=>{
  const navigate=useNavigate()
    const [current, setCurrent] = useState('Inicio');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key); 
    navigate(e.key) 

  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
  //const ComponentDemo = App;


export default Nav