
import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import axios from "axios";
import { notification } from "antd";




const SignUp = () => {

  const signupBack = async (values) => {
    const response = await axios.post("http://localhost:3001/signup", values);
    console.log(response.data);
  };

  let onFinish = (values) => {
    values.sub = values.email;
    console.log("Success:", "Enviandooo...", values); //{name, email, password } {sub, name, email, password}
    signupBack(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const notificationSuccess = (values) => {
    
      notification.open({
          message: 'Usuario Registrado',
           description: "Usuario creado correctamente",
           placement:"top"

          })
    

        
  
  }

  return (
    <div>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      

       <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { 
              type: "email", 
              message: "¡El correo electrónico ingresado no es válido!", 
            }, 
            { 
              required: true, 
              message: "¡Por favor ingresa tu correo electrónico!", 
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña!",
            },
            {
              min: 7, max: 20,
              message: 'La contraseña debe tener entre 7 y 20 caracteres'
            },
            { pattern: /^[a-zA-Z0-9]+$/,
             message: 'La contraseña solo puede contener letras y números'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar Contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "¡Por favor, confirma tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("¡La nueva contraseña que ingresaste no coincide!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={notificationSuccess} >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;

