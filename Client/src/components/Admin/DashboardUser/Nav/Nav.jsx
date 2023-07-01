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
import { useNavigate } from 'react-router';

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
  getItem('Inicio', '/admin/home', <HomeOutlined />, ),
  getItem('Clientes', '/admin/clients', <TeamOutlined />),
  getItem('Inventario', '/admin/inventary', <InboxOutlined />),
  getItem('Crear Producto', '/admin/createproduct', <PlusCircleOutlined /> ),
  getItem('Pedido en curso', '/admin/orders', <SendOutlined />),
  getItem('Reviews', '/admin/reviews', <CommentOutlined />),
  
 
];
const Nav = () => {
  const navigate=useNavigate()
  const current = window.localStorage.getItem("current")
  const onClick = (e) => {
    console.log('click ', e);
    window.localStorage.setItem("current", e.key)
    navigate(e.key) 
  };
  return (
    <div
      style={{
        width: 200,
        backgroundColor:"#111D43"
        
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