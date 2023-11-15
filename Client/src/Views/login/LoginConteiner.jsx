import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { Divider } from 'antd';
import LoginAuth from '../../components/LoginAuth/LoginAuth';
import { Row, Col } from 'antd';

const LoginContainer = () => {
  return (
    <Row
      justify="center"
      // align="middle"
      style={{
        background: "#0000",
        minHeight: "80vh",
        // padding: '5px',
        marginTop: '30px',
        marginBottom:'30px'
      }}
    >
      <Col span={24} style={{ maxWidth: "95vw", background: "white" }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <Divider orientation='left' style={{ color: "black" }}>Ingresar o registrarse con Google</Divider>
          </Col>
          <Col span={24} align="middle">
            <LoginAuth />
          </Col>
          <Col span={11} >
            <Divider orientation="left" style={{ color: "black" }}>Iniciar sesión:</Divider>
            <Login />
          </Col>
          <Col span={2} >
            <Divider type="vertical" style={{ height: '100%', color: 'black' }} />
          </Col>
          <Col span={11} >
            <Divider orientation="left" style={{ color: "black" }}>Registrarse:</Divider>
            <SignUp />
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

export default LoginContainer;
