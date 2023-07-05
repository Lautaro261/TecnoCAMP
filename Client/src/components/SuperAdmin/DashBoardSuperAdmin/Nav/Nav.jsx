import {
  TeamOutlined,
    // HomeOutlined,
    // InboxOutlined,
    // PlusCircleOutlined,
    // SendOutlined,
    // CommentOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useState } from "react";
  import { useNavigate } from "react-router";
  
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
    getItem("Administradores", "/superadmin/admins", <TeamOutlined />),
    // getItem("Inicio", "/superadmin/home", <HomeOutlined />),
    // getItem("Inventario", "/admin/inventary", <InboxOutlined />),
    // getItem("Crear Producto", "/admin/createproduct", <PlusCircleOutlined />),
    // getItem("Pedido en curso", "/admin/orders", <SendOutlined />),
    // getItem("Reviews", "/admin/reviews", <CommentOutlined />),
  ];
  const Nav = () => {
    const navigate = useNavigate();
    const current = window.localStorage.getItem("current");
    const onClick = (e) => {
      console.log("click ", e);
      window.localStorage.setItem("current", e.key);
      navigate(e.key);
    };
    
    return (
      <div
        style={{
          width: 200,
          // backgroundColor: "#1d1d1d",
        }}
      >
        <Menu
        style={{
          width: 200,
          backgroundColor: "#1a1a1a",
        }}
          onClick={onClick}
          selectedKeys={[current]}
          items={items}
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
          theme="dark"
        />
      </div>
    );
  };
  export default Nav;
  