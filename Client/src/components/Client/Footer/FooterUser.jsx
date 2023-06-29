import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Logo from"./../../../img/LogoSolo.png"
import Fb from"./../../../img/facebook.png"
import Ig from"./../../../img/instagram.png"
import {  notification } from 'antd';

const notificationRed=()=>{
    notification.open({
        message: 'Ups! 😅',
        description: "Estamos trabajando en nuestras redes sociales todavia",
        placement:"top"
      });
}


const FooterUser= ()=>{
    const styleLinks={
        color: "white",
        textDecoration:"disabled",
        backgroundColor: "transparent",
        border: "none"
    }
    

    return(
        <div style={{backgroundColor:"#2D2D2D", height:"20vh"}}>
            <Row gutter={[8,1]}>
                <Col span={8} >
                    <Link to="https://web.whatsapp.com"><p>Contactanos</p></Link>
                </Col>


                <Col span={8}>
                    <p style={{fontSize:"2.5vh"}}>La tecnologia a tu alcance</p>
                </Col>

                <Col span={8}>
                    
                    <Link to="/developers"><p>Nuestro Equipo</p></Link>
                </Col>

                <Col span={8}>
                <Link to="/about"><p>Acerca de Nosotros</p></Link>

                </Col>


                <Col span={8}>
                    <img src={Logo} style={{width:"2vw", height:"auto", }} />
                    <p>Tecnocamp 2023 Ⓡ</p> 
                </Col>

                <Col span={8}>
                <p>Sigenos en nuestras redes</p>
                <button style={styleLinks} onClick={notificationRed}>
                <img src={Fb} style={{width:"2vw", height:"auto", }} />
                <img src={Ig} style={{width:"2vw", height:"auto", }} />
                </button>

                </Col>

            </Row>

        </div>
    )

}

export default FooterUser;