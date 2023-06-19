import { Row, Col } from "antd";
import Logo from"./../../../img/LogoSolo.png"

const FooterUser= ()=>{
    return(
        <div style={{backgroundColor:"#2D2D2D", width:"100vw", height:"20vh"}}>
            <Row gutter={[16,16]}>
                <Col span={8} >
                    <Col span={12} >
                    <img src={Logo} style={{width:"2vw", height:"auto", margin:"5%"}} />
                    </Col>
                    <Col span={12} >
                    <p>Tecnocamp 2023</p>
                    </Col>
                </Col>


                <Col span={8}>

                </Col>

                <Col span={8}>

                </Col>

            </Row>

        </div>
    )

}

export default FooterUser;