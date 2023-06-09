import React from 'react';
import {Button, Form, Input, Checkbox} from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({setToken, setRol}) => {
  const navigate = useNavigate();

    const LoginBack = async(values)=>{
        const response = await axios.post('http://localhost:3001/login', values)
        console.log(response.data)
        if(response.data.token && response.data.rol){
          const token= response.data.token;
          const rol = response.data.rol;
          console.log("logeado en el front como: ", rol, "token: ", token)


          setToken(token)
          setRol(rol)
          window.localStorage.setItem("rol",rol)
          window.localStorage.setItem("token", token)

          
          if(rol==="client"){
            navigate("/home");
          }
          if(rol==="admin"){
            console.log( window.localStorage.getItem("rol"), 'desde login')
            navigate("/admin/home");
          }
          if(rol==="superAdmin"){
            navigate("/super/admins");
          }
          //
        }else{
          alert(response.data.message) //{message}
        }
        
    }

    const onFinish = (values) => {
        values.sub = values.email;
        console.log('Success:', values); //{email, password, remember } {sub, email, password}
        LoginBack(values)
        
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <div>
            <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </div>
    )
}

export default Login