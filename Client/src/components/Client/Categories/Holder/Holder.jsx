import { Divider, Col, Row } from 'antd';
import SmartPhones from"../../../../img/SmartPhones.png"
import SmartWatches from"../../../../img/SmartWatches.png"
import Earphones from"../../../../img/Earphones.png"

const styles={width:"20vw", Height: '90px',}
const Holder = () => (
  <div style={{ background:"linear-gradient(0deg, rgba(20,34,103,1) 0%, rgba(88,181,194,1) 100%)",}}>
    <Row gutter={16}>
    <Col span={24}>
    <Divider style={{color:"white",}}>Compre Fácil Y Seguro </Divider>
    <p>
    Acceda por categorías a los mejores dispositivos del mercado
    </p>

    </Col>
    </Row>
  <Row gutter={16}>
    
    <Col span={8}>
    <img alt="SmartPhones" src={SmartPhones} style={styles}/>
    </Col>
    <Col span={8}>
    <img alt="SmartPhones" src={SmartWatches} style={styles}/>
    </Col>
    <Col span={8}>
    <img alt="SmartPhones" src={Earphones} style={styles}/>
    </Col>
  </Row>
  </div>
);
export default Holder;