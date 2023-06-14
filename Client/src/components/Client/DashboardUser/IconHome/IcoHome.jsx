import Logo from "../../../../img/LogoTienda.png"

const IcoHome=()=>{
    return(
        <Link to='/home'>
        <img className={styles.logo} src={Logo} /> 
        </Link>
    )

}

export default IcoHome;