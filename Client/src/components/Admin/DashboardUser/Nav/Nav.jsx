import {
  HomeOutlined,
  InboxOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  SendOutlined,
  CommentOutlined,

} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Inicio', '1', <HomeOutlined />),
  getItem('Clientes', '2', <TeamOutlined />),
  getItem('Inventario', '3', <InboxOutlined />),
  getItem('Crear Producto', '4', <PlusCircleOutlined /> ),
  getItem('Pedido en curso', '5', <SendOutlined />),
  getItem('Comentarios', '6', <CommentOutlined />),
  
 
];
const Nav = () => {
  const [current, setCurrent] = useState('Inicio');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        onClick={onClick} 
        selectedKeys={[current]}
        items={items} 
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
       
        
      />
    </div>
  );
};
export default Nav;

// import { HomeOutlined, PhoneOutlined, FieldTimeOutlined, QuestionCircleOutlined, CustomerServiceFilled } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { useState } from 'react';
// const items = [
//   {
//     label: 'Inicio',
//     key: 'Inicio',
//     icon: <HomeOutlined />,
//   },
//   {
//     label: 'Celulares',
//     key: 'Celulares',
//     icon: <PhoneOutlined />,
//   },
//   {
//     label: 'SmartWatch',
//     key: 'SmartWatch',
//     icon: <FieldTimeOutlined />,
//   },
//     {
//     label: 'Audifonos',
//     key: 'Audifonos',
//     icon: <CustomerServiceFilled />,
//   },
//   {
//     label: 'Quienes somos',
//     key: 'Quienes somos',
//     icon: <QuestionCircleOutlined />,
//   },
// ];


// const  Nav= ()=>{
//     const [current, setCurrent] = useState('Inicio');
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   return <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />;
// };
//   //const ComponentDemo = App;


// export default Nav