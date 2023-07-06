import style from "./Landing.module.css"
import React from 'react';
import logo from "../../img/LogoTienda.png"
import { useSpring, animated } from 'react-spring';
import { Link } from "react-router-dom";
const Landing = () => {
    const styles = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: { duration: 2000 } });

    const rol = window.localStorage.getItem('rol');

    return (
        <animated.div style={styles}>
            <div className={style.bg}></div>
            <div className={style.cont}>

                <img src={logo} alt="logo Tecnocamp" className={style.imgs} />
                <p className={style.linktext}>Tenemos lo que buscas.</p>
                {/* token && */ rol && rol === 'superAdmin' ?
                    <div className={style.Link}>
                        <Link to="/superadmin/admins" className={style.linktext}>Ingresar</Link>
                    </div>
                    : rol && rol === 'admin' ?
                    <div className={style.Link}>
                        <Link to="/admin/home" className={style.linktext}>Ingresar</Link>
                    </div>
                    :
                    <div className={style.Link}>
                        <Link to="/home" className={style.linktext}>Ingresar</Link>
                    </div>
                }
            </div>
        </animated.div>
    )

}

export default Landing