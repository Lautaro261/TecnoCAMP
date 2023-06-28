import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Checkbox, message, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Features/login/logInAndSignUpSlice';

const { Text } = Typography;

const Login = ({ setToken, setRol }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (userSession.token && userSession.rol) {
      const token = userSession.token;
      const rol = userSession.rol;
      console.log('logueado en el front como: ', rol, 'token: ', token);
      setToken(token);
      setRol(rol);
      window.localStorage.setItem('rol', rol);
      window.localStorage.setItem('token', token);

      if (rol === 'client') {
        navigate('/home');
      } else if (rol === 'admin') {
        navigate('/admin/home');
      } else if (rol === 'superAdmin') {
        navigate('/super/admins');
      }
    }

    if (userSession.message === '¡Credenciales Incorrectas!') {
      messageApi.error(userSession.message);
    }
  }, [userSession, setToken, setRol, navigate, messageApi])

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