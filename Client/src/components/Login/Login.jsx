import React, { useEffect } from 'react';
import { Button, Form, Input, message, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Features/login/logInAndSignUpSlice';
import { useAuth0 } from '@auth0/auth0-react';

const { Text } = Typography;

const Login = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const { userSession, error } = useSelector((state) => state.logInAndSignUp);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    values.sub = values.email;
    console.log('Success:', values); //{email, password, remember } {sub, email, password}
    dispatch(loginUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const openmodal = () => {
    Modal.warning({
      title: 'Lo sentimos mucho😕',
      icon: <ExclamationCircleOutlined />,
      content: 'Este usuario se encuentra restringido de nuestra plataforma. Si crees que esto es un error, ponte en contacto con nosotros',
      okText: 'Aceptar',
    })
  }

  useEffect(()=>{
    if(userSession.message === '¡Has ingresado correctamente!'){
      if( !user && userSession.token && userSession.rol){
        const token = userSession.token;
        const rol = userSession.rol;
        const banned = userSession.erased;
        if (banned){
                openmodal()
                console.log("te banearon puto")
              }else{
        
              console.log('logueado en el front como: ', rol, 'token: ' ,token,'banned: ', banned);
              
              window.localStorage.setItem('rol', rol);
              window.localStorage.setItem('token', token);
            }
      }
  }
  },[userSession?.token])

  useEffect(() => {

    if (userSession.message === '¡Credenciales Incorrectas!') {
      messageApi.error(userSession.message);
    }
  }, [userSession, /*navigate messageApi*/ ])

  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { required: true, message: '¡Por favor ingrese su correo electrónico!' },
            { type: 'email', message: 'Por favor ingrese un correo electrónico válido.' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: '¡Por favor ingrese su contraseña!' },
          { pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/, message: 'La contraseña debe tener al menos 1 número y 1 mayúscula' },
          { min: 7, max: 20, message: 'La contraseña debe tener entre 7 y 20 caracteres' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          {error && <Text type="danger">{error}</Text>}
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login