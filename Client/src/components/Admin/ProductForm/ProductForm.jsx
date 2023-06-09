import {
  Button,
  Cascader,
  Form,
  Input,
  Space
} from "antd";

import { PlusSquareOutlined } from '@ant-design/icons';


import { ColorPicker, theme  } from "antd";

import { useState } from "react";

const { TextArea } = Input;

function ProductForm() {

    const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };


  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { token } = theme.useToken();
  const [color, setColor] = useState(token.colorPrimary);
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      
      <Form.Item>
        <label>Nombre del Producto</label>
        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item label="Cascader">
        <Cascader
          placeholder="Selecciona producto"
          options={[
            {
              value: "celulares",
              label: "Celulares",
              children: [
                {
                  value: "Samsumg",
                  label: "Samsumg",
                },
                {
                  value: "iphone",
                  label: "iphone",
                },
              ],
            },
            {
              value: "smartwatch",
              label: "smartwhact",
              children: [
                {
                  value: "xiaomi",
                  label: "xiaomi",
                },
                {
                  value: "nokia",
                  label: "nokia",
                },
              ],
            },
          ]}
        />
        </Form.Item>

        <Form.Item>
          <label>$ Precio Unitario</label>
          <Input placeholder="Precio" />
        </Form.Item>
        <Form.Item>
          <label>$ Precio Oferta</label>
          <Input placeholder="Precio" />
        </Form.Item>
          <label>Seleccionar Color</label>
        <ColorPicker value={color} onChange={setColor} />

        <div>
          <label>Descripcion</label>
          <TextArea rows={4} />
        </div>

        <Form.Item>
          <Button>Agregar Foto</Button>
        </Form.Item>
        <Space direction="vertical">
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Agragar Foto
        </Button>
      </Space>

        <Form.Item>
          <label>En Stock</label>
          <Input placeholder="Unidades" />
        </Form.Item>

      

      <Form.Item >
        <Button>Guardar</Button>
      </Form.Item>



     
    



    </Form>
  );
}

export default ProductForm;
