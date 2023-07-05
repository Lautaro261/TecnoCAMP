import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Typography, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewAdmin,
  setUserCreated,
  getAllAdmins,
  clearError,
} from "../../../Redux/Features/SuperAdmin/createAdmin/createAdminSlice";

const { Text } = Typography;

const CreateAdminComponent = () => {
  const dispatch = useDispatch();
  const userCreated = useSelector((state) => state.createAdmin.userCreated);
  const errorCreate = useSelector((state) => state.createAdmin.errorCreate);
  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [form] = Form.useForm(); // Estado del formulario


  useEffect(()=>{
    dispatch(getAllAdmins())
  },[userCreated.message])

  useEffect(() => {
    if (userCreated.message === "¡Administrador creado correctamente!") {
      dispatch(getAllAdmins());
      dispatch(setUserCreated({}));
      showSuccessMessage();
      handleCloseModal(); // Cerrar el modal en caso de éxito
      form.resetFields(); // Restablecer los campos del formulario en caso de éxito
    }
  }, [userCreated.message]);

  useEffect(() => {
    if (errorCreate) {
      showErrorMessage();
      // showModal(); // Cerrar el modal en caso de éxito
    }
  }, [errorCreate]);

  const showSuccessMessage = () => {
    message.success(userCreated.message);
  };

  const showErrorMessage = () => {
    message.error(errorCreate);
  };

  const showModal = () => {
    setOpen(true); // Mostrar el modal
    dispatch(clearError());
  };

  const handleCloseModal = () => {
    setOpen(false); // Ocultar el modal
  };

  let onFinish = (values) => {
    values.sub = values.email;
    console.log("Success:", "Enviando...", values);
    dispatch(createNewAdmin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    showErrorMessage();
  };

  const handleCancel = () => {
    setOpen(false); // Ocultar el modal al cancelar
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  return (
    <div
      align="right"
      style={{
        paddingRight: "77px",
      }}
    >
      <Button type="primary" onClick={showModal}>
        Crear Administrador
      </Button>
      <Modal
        title="Crear Nuevo Administrador"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form} // Pasar la instancia del formulario al componente Form
          name="createAdmin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            align="left"
            style={{
              paddingTop: "22px",
            }}
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
            align="left"
            style={{
              paddingTop: "13px",
            }}
            name="password"
            label="Contraseña"
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu contraseña!",
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/,
                message:
                  "La contraseña debe tener al menos 1 número y 1 mayúscula",
              },
              {
                min: 7,
                max: 20,
                message: "La contraseña debe tener entre 7 y 20 caracteres",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            align="left"
            style={{
              paddingTop: "13px",
            }}
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
                    new Error(
                      "¡La nueva contraseña que ingresaste no coincide!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              marginTop: "31px",
            }}
          >
            {errorCreate && <Text type="danger">{errorCreate}</Text>}
          </div>

          <Form.Item
            wrapperCol={{ span: 24, offset: 1 }}
            style={{
              marginTop: "31px",
              marginBottom: "13px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#C74040",
                color: "#ffff",
                marginRight: "163px",
              }}
              onClick={handleClearForm}
            >
              Limpiar
            </Button>
            <Button
              style={{
                marginRight: "13px",
              }}
              onClick={handleCancel}
            >
              Atras
            </Button>
            <Button type="primary" htmlType="submit">
              Crear Nuevo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAdminComponent;
