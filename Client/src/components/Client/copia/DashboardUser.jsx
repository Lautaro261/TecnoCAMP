import style from "./DashboardUser.module.css"  
import Contacticons from "./Contacticons/Contacticons"
import SearchBar from "./SearchBar/SearchBar";
import Icons from "./Icons/Icons";
import logo from "../../../../public/img/LOGO-FONDO-BLANCO.png"
import Nav from "./Nav/Nav";

const DashboardUser =()=>{
    return(
        <div className={style.contenedor}>
            <div className={style.Contact}>
                <Contacticons/>
            </div>

            <div className={style.body}>
                <img src={logo} className={style.logo}/>
                <SearchBar/>
                <div>
                <Icons className={style.Icons}/>
                </div>
            </div>

            <div className={style.NavigationBar}>
            <Nav/>
            </div>
        </div>
    )

}

export default DashboardUser