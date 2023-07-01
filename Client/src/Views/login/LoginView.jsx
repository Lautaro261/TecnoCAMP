import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { Divider } from 'antd';
import LoginAuth from '../../components/LoginAuth/LoginAuth';
import { Row, Col, Button } from 'antd';


const LoginView =({setToken, setRol})=>{
    const goToBack = () => {
        window.history.back();
    }
    return(
        <Row
        justify="center"
        align="middle"
        style={{
          background: "linear-gradient(0deg, rgba(20,34,103,1) 0%, rgba(88,181,194,1) 100%)",
          minHeight: "100vh",
          padding: '20px'
        }}
      >
        <Col span={24}><Button type='primary' onClick={goToBack}>Volver</Button></Col>
        <Col span={24} style={{ maxWidth: "50vw", background: "white", boxShadow: "-43px 30px 49px -4px rgba(0,0,0,0.59)", borderRadius: "30px"}}>
          <Row justify="center">
            <Col span={24}>
              <Divider orientation='left' style={{ color: "black" }}>Iniciar sesión:</Divider>
            </Col>
            <Col span={24}>
              <Login setToken={setToken} setRol={setRol} />
            </Col>
            <Col span={24}>
              <Divider orientation="left" style={{ color: "black" }}>Ingresar ó registrarse con Google</Divider>
            </Col>
            <Col span={24}  align="middle">
              <LoginAuth />
            </Col>
            <Col span={24}>
              <Divider orientation="left" style={{ color: "black" }}>Registrarse:</Divider>
            </Col>
            <Col span={24}>
              <SignUp />
            </Col>
          </Row>
        </Col>
      </Row>

    )
} 



export default LoginView;