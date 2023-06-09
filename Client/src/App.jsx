import Link from "antd/es/typography/Link";
import "./App.css";
import ClientHome from "./Views/client/ClientHome/ClientHome";
import DashboardUser from "./components/Client/DashboardUser/DashboardUser";
import Contacticons from "./components/Client/DashboardUser/Contacticons/Contacticons";
import ContacticonsAdmin from './components/Admin/DashboardUser/Contacticons/ContacticonsAdmin'
import DashboardAdmin from './components/Admin/DashboardUser/DashboardAdmin'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div> 
      <DashboardAdmin/>

      
      {/* <ClientHome/> */}
    </div>
  )
}

export default App;
