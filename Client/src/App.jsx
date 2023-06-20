import { Route, Routes } from "react-router";
import axios from "axios";
import "./App.css";
import ClientHome from "./Views/client/ClientHome/ClientHome";
//import LoginView from "./Views/Login/LoginView";
import LoginView from "./Views/Login2/LoginView";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import SuperAdminHome from "./Views/superAdmin/SuperAdminHome/SuperAdminHome";
import AdminHome from "./Views/admin/AdminHome/AdminHome";
import CartView from "./Views/client/Cart/CartView";
import CreateProductVew from "./Views/admin/CreateProduct/CreateProductView";
import { useState } from "react";
import AllCategoriesView from "./Views/client/Categories/AllCategoriesView";
import ViewClients from "./Views/admin/ViewClients/ViewClients";
import ProductDetailsView from "./Views/client/ProductDetails/ProductDetailsView";
import ErrorView from "./Views/Error/ErrorView";
import CategoriesView from "./Views/client/Categories/CategoriesView";
import Landing from "./Views/Landing/Landing";
import SearchedResultsView from "./Views/client/SearchedResultView/SearchedResultView";
import AboutUs from "./Views/client/AboutUs/AboutUs";

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://tecnocamp-back-production.up.railway.app";


function App() {
  //NO TOCAR
  const [token, setToken] = useState("")
  const [rol, setRol] = useState("")
  const rolA = rol ? rol : localStorage.getItem("rol")
  const tokenA = token ? token : localStorage.getItem("token")
  const redirect = {
    client: "/home",
    admin: "/admin/home",
    superAdmin: "/super/admins",
  }
  // TOCAR


  return (

    <div>

      <Routes >
        {/* RUTAS PARA TODOS ---SIN REGISTRO--- */}
        <Route path="/" element={<Landing/>} />
        <Route path="login" element={<LoginView setToken={setToken} setRol={setRol} />}/>
        {/* <Route path="/login" element={<LoginView setToken={setToken} setRol={setRol} />} /> */}
        <Route path="/home" element={<ClientHome />} />
        {/* <Route path="/admin/createproduct" element={<CreateProductVew />} /> */}
        <Route path="/all-categories" element={<AllCategoriesView />} />
        <Route path='/categories/:category' element={<CategoriesView />} />
        <Route path="/categories/product/:id" element={<ProductDetailsView />} />
        <Route path="/searchedProducts" element={ <SearchedResultsView /> } />
       {/*  <Route path="/developers" element={< div/>} /> */}
        <Route path="/about" element={<AboutUs/>} />


        {/* RUTAS PROTEGIDAS CLIENTE */}
        <Route element={<ProtectedRoutes logged={!!tokenA} allowed={rolA === 'client'} redirect={rolA === "admin" ? redirect.admin : redirect.superAdmin} />}>
          {/* <Route path="/cart" element={<CartView />} /> */}
        </Route>

        {/* RUTAS PROTEGIDAS ADMIN*/}
        <Route element={<ProtectedRoutes logged={!!tokenA} allowed={rolA === 'admin'} redirect={rolA === "client" ? redirect.client : redirect.superAdmin} />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/createproduct" element={<CreateProductVew />} />
          <Route path="/admin/clients" element={<ViewClients />} />

        </Route>
       {/* RUTA DE CONSTRUCCION*/}
         <Route path="*" element={<ErrorView/>} /> 

      </Routes>

    </div>
  )
}

export default App;
