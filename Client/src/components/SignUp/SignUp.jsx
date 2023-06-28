
import React, { useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../Redux/Features/login/logInAndSignUpSlice";

const { Text } = Typography;


const SignUp = () => {
  const dispatch = useDispatch();
  const errorCreate = useSelector((state) => state.logInAndSignUp.errorCreate);
  const userCreated = useSelector((state) => state.logInAndSignUp.userCreated);

  useEffect(() => {
    if (userCreated && userCreated.message === "¡Usuario creado correctamente!") {
      showSuccessMessage();
    }
  }, [userCreated])

  const showSuccessMessage = () => {
    message.success(userCreated.message)
  };

  let onFinish = (values) => {
    values.sub = values.email;
    console.log("Success:", "Enviandooo...", values); //{name, email, password } {sub, name, email, password}
    dispatch(signUpUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const notificationSuccess = (values) => {

  //     notification.open({
  //         message: 'Usuario Registrado',
  //          description: "Usuario creado correctamente",
  //          placement:"top"

  //         }) 

  // }

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
              pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/,
              message: 'La contraseña debe tener al menos 1 número y 1 mayúscula'
            },
            {
              min: 7, max: 20,
              message: 'La contraseña debe tener entre 7 y 20 caracteres'
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

        <Form.Item>
          {errorCreate && <Text type="danger">{errorCreate}</Text>}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;

