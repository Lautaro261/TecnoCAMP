

import { Route, Routes } from "react-router";
import "./App.css";
import ClientHome from "./Views/client/ClientHome/ClientHome";
import LoginView from "./Views/login/loginView";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import SuperAdminHome from "./Views/superAdmin/SuperAdminHome/SuperAdminHome";
import AdminHome from "./Views/admin/AdminHome/AdminHome";
import CartView from "./Views/client/Cart/CartView";
import CreateProductVew from "./Views/admin/CreateProduct/CreateProductView";
import { useState } from "react";
import CategoriesView from "./Views/client/Categories/CategoriesView";
import ViewClients from "./Views/admin/ViewClients/ViewClients";


function App() {
  //NO TOCAR
  const [token,setToken]=useState("")
  const [rol,setRol]=useState("")
  const rolA =rol? rol:localStorage.getItem("rol")
  const tokenA =token? token:localStorage.getItem("token")
  const redirect= {
    client:"/home",
    admin:"/admin/home",
    superAdmin:"/super/admins",
  }
// TOCAR
 

  return (

    <div> 

      <Routes >
        {/* RUTAS PARA TODOS ---SIN REGISTRO--- */}
        <Route path="/login"  element={<LoginView setToken={setToken} setRol={setRol}/>}/>
        <Route path="/home"  element={<ClientHome/>}/>
        <Route path="/categories/smartphones"  element={<CategoriesView/>}/>
        <Route path="/admin/createproduct" element={<CreateProductVew/>}/>

        
        


      {/* RUTAS PROTEGIDAS CLIENTE */}
        <Route element={<ProtectedRoutes logged={!!tokenA} allowed= {rolA==='client'} redirect={rolA==="admin"? redirect.admin:redirect.superAdmin}/>}>
          <Route path="/cart"  element={<CartView/>}/>
        </Route>


      {/* RUTAS PROTEGIDAS ADMIN*/}
        <Route element={<ProtectedRoutes logged={!!tokenA} allowed= {rolA==='admin'} redirect={rolA==="client"? redirect.client:redirect.superAdmin}/>}>
          <Route path="/admin/home"  element={<AdminHome/>}/>
         {/*  <Route path="/admin/createproduct" element={<CreateProductVew/>}/>  */}
          <Route path="/admin/clients" element={<ViewClients/>}/> 

        </Route>
          

      {/* RUTAS PROTEGIDAS SUPER ADMIN*/}
        <Route element={<ProtectedRoutes logged={!!tokenA} allowed= {rolA==='superAdmin'} redirect={rolA==="client"? redirect.client:redirect.admin}/>}>
          <Route path="/super/admins"  element={<SuperAdminHome/>}/>
       </Route>
  
        
      </Routes>


    </div>
  )
}

export default App;
