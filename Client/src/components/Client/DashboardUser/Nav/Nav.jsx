import { HomeOutlined, PhoneOutlined, FieldTimeOutlined, QuestionCircleOutlined, CustomerServiceFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
  {
    label: 'Inicio',
    key: 'Inicio',
    icon: <HomeOutlined />,
  },
  {
    label: 'Celulares',
    key: 'Celulares',
    icon: <PhoneOutlined />,
  },
  {
    label: 'SmartWatch',
    key: 'SmartWatch',
    icon: <FieldTimeOutlined />,
  },
    {
    label: 'Audifonos',
    key: 'Audifonos',
    icon: <CustomerServiceFilled />,
  },
  {
    label: 'Quienes somos',
    key: 'Quienes somos',
    icon: <QuestionCircleOutlined />,
  },
];


const  Nav= ()=>{
    const [current, setCurrent] = useState('Inicio');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
  //const ComponentDemo = App;


export default Nav