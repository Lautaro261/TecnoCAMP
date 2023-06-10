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

/*   const onSubmit = (values) => {
    console.log('Success:', values); 
    
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */


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
      
      <Form.Item label="Nombre ">

        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item label="Marca">
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

        <Form.Item label='Precio Unitario'>
          <Input placeholder="Precio" />
        </Form.Item>
        
        <Form.Item label='Precio Oferta'>
          <Input placeholder="Precio" />
        </Form.Item >
        
        <Form.Item label='Colores'>
        <ColorPicker value={color} onChange={setColor} />   
        </Form.Item>  {/* <label>Seleccionar Color</label> */}

        <Form.Item label='Descripcion'>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label='Fotos'>
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
          </Form.Item>

        <Form.Item label='En Stock'>
          <Input placeholder="Unidades" />
        </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">Guardar</Button>
      </Form.Item>
    </Form>
  );
}

export default ProductForm;
