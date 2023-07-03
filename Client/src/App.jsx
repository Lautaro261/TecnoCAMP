import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./App.css";
import ClientHome from "./Views/client/ClientHome/ClientHome";
import LoginView from "./Views/login/LoginView";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AdminHome from "./Views/admin/AdminHome/AdminHome";
import CartView from "./Views/client/CartView/CartView";
import CreateProductVew from "./Views/admin/CreateProduct/CreateProductView";
import AllCategoriesView from "./Views/client/Categories/AllCategoriesView";
import ViewClients from "./Views/admin/ViewClients/ViewClients";
import ProductDetailsView from "./Views/client/ProductDetails/ProductDetailsView";
import ErrorView from "./Views/Error/ErrorView";
import CategoriesView from "./Views/client/Categories/CategoriesView";
import Landing from "./Views/Landing/Landing";
import SearchedResultsView from "./Views/client/SearchedResultView/SearchedResultView";
import AboutUs from "./Views/client/AboutUs/AboutUs";
import Inventary from "./Views/admin/Inventary/Inventary";
import SearchedResultViewAdmin from "./components/Admin/SearchedResultViewAdmin/SearchedResultViewAdmin";
import SuccessPaymentView from "./Views/client/PaymentView/SuccessPaymentView";
import FailurePaymentView from "./Views/client/PaymentView/FailurePaymentView";
import HistoryView from "./Views/client/HistoryView/HistoryView";
import OngoingOrdersView from './Views/admin/OngoingOrdersView/OngoingOrdersView.jsx';
import AdminReviewsView from "./Views/admin/AdminReviewsView/AdminReviewsView";
import ProfileView from "./Views/client/Profile/Profile";
import CategoryAndBrandCreateView from "./Views/admin/CategoryAndBrandCreateView/CategoryAndBrandCreateView";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const navigate = useNavigate();
  const userSession = useSelector((state) => state.logInAndSignUp.userSession)
  //NO TOCAR
  // const [token, setToken] = useState("");
  // const [rol, setRol] = useState("");


 // Ahora si NO tocar. real real  
  const rol = window.localStorage.getItem('rol'); 
  const token = window.localStorage.getItem('token'); 

  const redirect = {
    client: "/home",
    admin: "/admin/home",
    superAdmin: "/super/admins",
  };


  useEffect(() => { 

    if (userSession?.rol) {
      switch (userSession.rol) {
        case 'client':
          navigate('/profile');
          break;
        case 'admin':
          navigate('/admin/home');
          break;
        case 'superAdmin':
          navigate('/super/admins');
          break;
        default:
          navigate('/home');
          break;
      }
    }
  }, [userSession?.rol])

  // TOCAR

  return (

    <Routes>
      {/* RUTAS PARA TODOS ---SIN REGISTRO--- */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/home" element={<ClientHome />} />
      <Route path="/all-categories" element={<AllCategoriesView />} />
      <Route path='/categories/:category' element={<CategoriesView />} />
      <Route path="/categories/product/:id" element={<ProductDetailsView />} />
      <Route path="/searchedProducts" element={<SearchedResultsView />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path='/success-payment' element={<SuccessPaymentView />} />
      <Route path='/failure-payment' element={<FailurePaymentView />} />
      <Route path="/shopping-history" element={<HistoryView />} />
// cami cami
      {/* RUTAS PROTEGIDAS CLIENTE */}
      <Route element={<ProtectedRoutes logged={!!token} allowed={rol === 'client'} redirect={rol === "admin" ? redirect.admin : redirect.superAdmin} />}>
        <Route path="/shoppinghistory" element={<HistoryView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/cart" element={<CartView />} />
      </Route>

// camicamicami
      {/* RUTAS PROTEGIDAS ADMIN*/}
      <Route element={<ProtectedRoutes logged={!!token} allowed={rol === "admin"} redirect={rol === "client" ? redirect.client : redirect.superAdmin} />} >
        <Route path="/admin/home" element={<AdminHome />} />

        <Route path="/admin/createproduct" element={<CreateProductVew />} />
        <Route path="/admin/clients" element={<ViewClients />} />
        <Route path="/admin/inventary" element={<Inventary />} />
        <Route path="/searchedProductsAdmin" element={<SearchedResultViewAdmin />} />
        <Route path="/admin/reviews" element={<AdminReviewsView />} />
        <Route path="/admin/createcategorybrand" element={<CategoryAndBrandCreateView/>} />
      </Route>
      {/* RUTA DE CONSTRUCCION*/}
      <Route path="*" element={<ErrorView />} />
    </Routes>

  );
}

export default App;